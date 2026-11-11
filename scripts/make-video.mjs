// Builds video/samudra-manthan.mp4 (1920x1080, two minutes) from the img/manthan paintings.
// Needs ffmpeg and Playwright:  PLAYWRIGHT_PATH=$(npm root -g)/playwright node scripts/make-video.mjs
import { createRequire } from 'node:module'
import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_PATH || 'playwright')
const root = join(dirname(fileURLToPath(import.meta.url)), '..'), tmp = join(root, 'video', '.build')
mkdirSync(tmp, { recursive: true })
const ff = (args) => execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' })
const FPS = 24, L = 10.92, X = 1, W = 1920, H = 1080

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: W, height: H } })
await page.setContent('<body style="margin:0;background:transparent"></body>')
for (const f of ['engine.js', 'ramayana.js', 'mahabharata.js', 'portraits.js', 'special.js', 'manthan.js']) await page.addScriptTag({ path: join(root, f) })
const scenes = await page.evaluate(() => Epic.scenes.manthan.map(s => ({ title: s.title, cap: s.cap, src: s.kanda, tall: (s.h || 0) > (s.w || 1) })))
const card = async (html, file) => {
  await page.evaluate((h) => { document.body.innerHTML = h }, html)
  writeFileSync(file, await page.screenshot({ omitBackground: true }))
}
const serif = "font-family:Georgia,'Times New Roman',serif;color:#f6ecd8"
for (let i = 0; i < scenes.length; i++) {
  const s = scenes[i]
  await card(`<div style="position:absolute;left:0;right:0;bottom:0;padding:150px 120px 54px;background:linear-gradient(transparent,rgba(8,5,14,.9));${serif}">
    <div style="font-size:22px;letter-spacing:.2em;text-transform:uppercase;color:#f0c66a">${i + 1} of ${scenes.length} &middot; ${s.title}</div>
    <div style="font-size:38px;line-height:1.42;margin-top:14px;max-width:1560px">${s.cap}</div>
    <div style="font-size:19px;margin-top:14px;color:#c8b8c0">${s.src}</div></div>`, join(tmp, `cap${i}.png`))
}
await card(`<div style="position:absolute;inset:0;background:rgba(8,5,14,.62);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;${serif}">
  <div style="font-size:26px;letter-spacing:.34em;text-transform:uppercase;color:#f0c66a">The Churning of the Ocean of Milk</div>
  <div style="font-size:132px;margin-top:18px">Samudra Manthan</div>
  <div style="font-size:34px;margin-top:22px;color:#e2d6d0">and how Shiva came to be called Neelakantha</div></div>`, join(tmp, 'title.png'))
await card(`<div style="position:absolute;inset:0;background:rgba(8,5,14,.5);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;${serif}">
  <div style="font-size:96px">Om Namah Shivaya</div>
  <div style="font-size:26px;margin-top:26px;color:#e2d6d0;max-width:1300px;line-height:1.5">Told after the Bhagavata Purana, Book 8, with the Mahabharata and the Vishnu Purana.<br>Every picture was painted by code.</div></div>`, join(tmp, 'end.png'))
await browser.close()

// one clip per painting: slow pan across the picture, caption faded in and out
for (let i = 0; i < scenes.length; i++) {
  const img = join(root, 'img', 'manthan', String(i + 1).padStart(2, '0') + '.jpg'), fwd = i % 2 === 0, first = i === 0, last = i === scenes.length - 1
  const pan = scenes[i].tall
    ? `scale=${W * 2}:-2,crop=${W * 2}:${H * 2}:0:'(ih-${H * 2})*${fwd ? `(0.62-0.28*t/${L})` : `(0.34+0.28*t/${L})`}',scale=${W}:${H}`
    : `scale=-2:${H * 2 * 1.06},crop=${W * 2}:${H * 2}:'(iw-${W * 2})*${fwd ? `t/${L}` : `(1-t/${L})`}':'(ih-${H * 2})/2',scale=${W}:${H}`
  const c0 = first ? 4.6 : 0.9, c1 = last ? 5.2 : L - 1.3
  let fc = `[0:v]${pan},fps=${FPS},format=yuv420p[bg];[1:v]format=rgba,fade=in:st=${c0}:d=0.7:alpha=1,fade=out:st=${c1}:d=0.7:alpha=1[cp];[bg][cp]overlay=0:0[v1]`
  const inputs = ['-loop', '1', '-t', String(L), '-i', img, '-loop', '1', '-t', String(L), '-i', join(tmp, `cap${i}.png`)]
  if (first || last) {
    inputs.push('-loop', '1', '-t', String(L), '-i', join(tmp, first ? 'title.png' : 'end.png'))
    fc += first ? `;[2:v]format=rgba,fade=in:st=0.3:d=0.8:alpha=1,fade=out:st=3.6:d=0.8:alpha=1[tt];[v1][tt]overlay=0:0[v]` : `;[2:v]format=rgba,fade=in:st=6.2:d=1:alpha=1[tt];[v1][tt]overlay=0:0[v]`
  } else fc += ';[v1]null[v]'
  ff([...inputs, '-filter_complex', fc, '-map', '[v]', '-t', String(L), '-r', String(FPS), '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '16', join(tmp, `clip${i}.mp4`)])
  console.log('clip', i + 1)
}
// crossfade the clips together
let fc = '', prev = '[0:v]'
const ins = []
for (let i = 0; i < scenes.length; i++) ins.push('-i', join(tmp, `clip${i}.mp4`))
for (let i = 1; i < scenes.length; i++) { fc += `${prev}[${i}:v]xfade=transition=fade:duration=${X}:offset=${(i * (L - X)).toFixed(3)}[x${i}];`; prev = `[x${i}]` }
const total = scenes.length * L - (scenes.length - 1) * X
fc += `${prev}fade=in:st=0:d=1,fade=out:st=${(total - 1.5).toFixed(2)}:d=1.5[v]`
// soundtrack, all synthesised: a tanpura-like drone, a bell at each scene and a conch call at the start
const bells = Array.from({ length: scenes.length }, (_, i) => Math.round(i * (L - X) * 1000) + 300)
const drone = `aevalsrc='0.20*sin(2*PI*138.59*t)*(0.75+0.25*sin(2*PI*0.11*t))+0.13*sin(2*PI*207.65*t)*(0.7+0.3*sin(2*PI*0.07*t+1))+0.11*sin(2*PI*277.18*t)*(0.7+0.3*sin(2*PI*0.09*t+2))+0.05*sin(2*PI*415.3*t)*(0.5+0.5*sin(2*PI*0.05*t))+0.04*sin(2*PI*554.4*t)*(0.5+0.5*sin(2*PI*0.13*t+1))+0.09*sin(2*PI*69.3*t)':s=44100:d=${total}`
const bell = `aevalsrc='(0.5*sin(2*PI*830.6*t)+0.3*sin(2*PI*1661*t)+0.2*sin(2*PI*2218*t)+0.12*sin(2*PI*3322*t))*exp(-1.6*t)':s=44100:d=4`
const conch = `aevalsrc='0.35*sin(2*PI*(233+18*t)*t+0.6*sin(2*PI*5*t))*min(1\\,t/0.5)*min(1\\,(3.6-t)/1.2)+0.15*sin(2*PI*(466+36*t)*t)*min(1\\,t/0.5)*min(1\\,(3.6-t)/1.2)':s=44100:d=3.6`
const af = `${drone}[d];${bell},asplit=${bells.length}${bells.map((_, i) => `[b${i}]`).join('')};${bells.map((ms, i) => `[b${i}]adelay=${ms}:all=1[c${i}]`).join(';')};${conch},adelay=400:all=1[cn];[d]${bells.map((_, i) => `[c${i}]`).join('')}[cn]amix=inputs=${bells.length + 2}:normalize=0,aecho=0.8:0.7:90|180:0.25|0.18,lowpass=f=5200,afade=in:st=0:d=2,afade=out:st=${(total - 3).toFixed(2)}:d=3,volume=1.5[a]`
ff([...ins, '-filter_complex', fc + ';' + af, '-map', '[v]', '-map', '[a]', '-t', String(total), '-c:v', 'libx264', '-preset', 'slow', '-crf', '23', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-c:a', 'aac', '-b:a', '160k', join(root, 'video', 'samudra-manthan.mp4')])
rmSync(tmp, { recursive: true, force: true })
console.log('done', total + 's')
