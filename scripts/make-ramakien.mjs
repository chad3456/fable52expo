// Builds video/ramakien.mp4: the Siam system animated frame by frame, with a synthesised score.
// Needs ffmpeg and Playwright:  PLAYWRIGHT_PATH=$(npm root -g)/playwright node scripts/make-ramakien.mjs
import { createRequire } from 'node:module'
import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_PATH || 'playwright')
const root = join(dirname(fileURLToPath(import.meta.url)), '..'), tmp = join(root, 'video', '.ramakien')
mkdirSync(tmp, { recursive: true })
const FPS = 24, W = 1280, H = 720, SR = 44100, BEAT = 0.6, SC = 9.6, TOTAL = 80.8

// ---------- the score: pentatonic, in the manner of a small piphat ensemble ----------
const N = Math.ceil(TOTAL * SR), Lb = new Float32Array(N), Rb = new Float32Array(N)
let sd = 7; const rnd = () => { sd = (sd * 16807) % 2147483647; return sd / 2147483647 }
const add = (i, v, pan) => { if (i >= 0 && i < N) { Lb[i] += v * (1 - pan) ; Rb[i] += v * pan } }
function pluck(f, t0, dur, amp, pan) { const n = Math.round(SR / f), buf = new Float32Array(n); for (let i = 0; i < n; i++) buf[i] = rnd() * 2 - 1; const i0 = Math.round(t0 * SR), len = Math.round(dur * SR); let k = 0, prev = 0; for (let i = 0; i < len; i++) { const v = buf[k]; buf[k] = (v + prev) * 0.4975; prev = v; k = (k + 1) % n; add(i0 + i, v * amp * Math.min(1, (len - i) / 2000), pan) } }
function bar(f, t0, amp, pan) { const i0 = Math.round(t0 * SR), len = Math.round(0.9 * SR); for (let i = 0; i < len; i++) { const t = i / SR; add(i0 + i, (Math.sin(6.2832 * f * t) * Math.exp(-6 * t) + 0.35 * Math.sin(6.2832 * f * 3.93 * t) * Math.exp(-16 * t)) * amp, pan) } }
function gong(f, t0, amp) { const i0 = Math.round(t0 * SR), len = Math.round(4.5 * SR); for (let i = 0; i < len; i++) { const t = i / SR, e = Math.exp(-1.1 * t) * Math.min(1, t * 200); add(i0 + i, (Math.sin(6.2832 * f * t + 0.6 * Math.sin(6.2832 * 3 * t) * Math.exp(-2 * t)) + 0.5 * Math.sin(6.2832 * f * 1.48 * t) + 0.3 * Math.sin(6.2832 * f * 2.02 * t) + 0.2 * Math.sin(6.2832 * f * 2.74 * t) * Math.exp(-3 * t)) * e * amp, 0.5) } }
function ching(t0, amp, open) { const i0 = Math.round(t0 * SR), len = Math.round((open ? 0.7 : 0.08) * SR); for (let i = 0; i < len; i++) { const t = i / SR, e = Math.exp(-(open ? 6 : 50) * t); add(i0 + i, (Math.sin(6.2832 * 2637 * t) + 0.7 * Math.sin(6.2832 * 3951 * t) + 0.5 * Math.sin(6.2832 * 5274 * t)) * e * amp, 0.7) } }
function drum(t0, amp, hi) { const i0 = Math.round(t0 * SR), len = Math.round(0.35 * SR); let ph = 0; for (let i = 0; i < len; i++) { const t = i / SR, f = (hi ? 210 : 95) * (1 + 1.4 * Math.exp(-40 * t)); ph += 6.2832 * f / SR; add(i0 + i, (Math.sin(ph) * Math.exp(-(hi ? 16 : 10) * t) + (rnd() - 0.5) * 0.5 * Math.exp(-90 * t)) * amp, 0.35) } }
const PENT = [146.83, 164.81, 185.0, 220.0, 246.94], note = d => PENT[((d % 5) + 5) % 5] * Math.pow(2, Math.floor(d / 5))
// each scene: 16 beats, an eighth-note line in scale degrees ('.' = rest), register and density
const LINES = [
  '5 . . . 7 . . . 9 . 8 7 5 . . . 5 . 7 . 9 . 10 . 12 . 10 9 10 . . .',
  '5 7 9 7 5 . 4 5 7 . 9 . 7 5 4 . 5 7 9 10 9 7 5 . 4 5 7 5 4 . 5 .',
  '4 . 4 5 4 . 2 . 4 5 7 5 4 2 0 . 4 . 4 5 7 . 9 . 7 5 4 2 4 . . .',
  '5 7 9 10 12 10 9 10 12 14 12 10 9 . 10 . 12 14 15 14 12 10 12 14 15 17 15 14 15 . . .',
  '9 9 7 9 10 9 7 5 9 9 7 9 10 12 10 9 7 7 5 7 9 7 5 4 7 9 10 9 7 5 4 .',
  '5 . 5 7 5 . 4 . 5 . 5 7 9 . 7 . 5 . 5 7 9 . 10 . 9 7 5 7 5 . . .',
  '9 10 12 10 9 7 9 10 12 . 14 . 12 10 9 . 9 10 12 14 15 14 12 10 12 . 14 . 15 . . .',
  '5 7 9 10 9 7 5 7 9 10 12 10 9 . 10 . 12 10 9 7 9 10 12 14 12 10 9 7 10 . 5 .'
]
LINES.forEach((ln, s) => {
  const t0 = s * SC, ds = ln.split(' '), fierce = s === 4 || s === 6, quiet = s === 0
  ds.forEach((d, i) => { if (d === '.') return; const t = t0 + i * BEAT / 2, f = note(+d); pluck(f, t, 1.4, 0.3, 0.3); if (!quiet || i % 4 === 0) bar(f * 2, t + 0.01, 0.2, 0.62); if (s === 3 || s === 7) bar(f * 4, t + BEAT / 4, 0.09, 0.7) })
  for (let b = 0; b < 16; b++) { const t = t0 + b * BEAT; if (b % 4 === 0) gong(b % 8 === 0 ? 73.42 : 110, t, quiet ? 0.5 : 0.4); if (!quiet) { ching(t, 0.05, b % 2 === 1); if (b % 2 === 0) drum(t, fierce ? 0.5 : 0.34, false); drum(t + BEAT * 0.5, fierce ? 0.3 : 0.18, true); if (fierce) drum(t + BEAT * 0.75, 0.22, true) } else if (b % 4 === 2) ching(t, 0.05, true) }
  if (s === 6) for (const h of [2.72, 5.92]) { gong(55, t0 + h, 0.7); drum(t0 + h, 0.8, false) }
})
gong(73.42, 76.8, 0.8); gong(110, 76.8, 0.5); for (const d of [5, 9, 12, 15]) { pluck(note(d), 76.8 + (d - 5) * 0.03, 3.5, 0.3, 0.4); bar(note(d) * 2, 76.9, 0.2, 0.6) }
for (const [dl, g] of [[0.11, 0.22], [0.19, 0.16], [0.31, 0.1]]) { const k = Math.round(dl * SR); for (let i = N - 1; i >= k; i--) { Lb[i] += Rb[i - k] * g; Rb[i] += Lb[i - k] * g } }
let pk = 0; for (let i = 0; i < N; i++) pk = Math.max(pk, Math.abs(Lb[i]), Math.abs(Rb[i]))
const wav = Buffer.alloc(44 + N * 4); wav.write('RIFF', 0); wav.writeUInt32LE(36 + N * 4, 4); wav.write('WAVEfmt ', 8); wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(2, 22); wav.writeUInt32LE(SR, 24); wav.writeUInt32LE(SR * 4, 28); wav.writeUInt16LE(4, 32); wav.writeUInt16LE(16, 34); wav.write('data', 36); wav.writeUInt32LE(N * 4, 40)
for (let i = 0; i < N; i++) { const fade = Math.min(1, (N - i) / (SR * 2)); wav.writeInt16LE(Math.round(Lb[i] / pk * 30000 * fade), 44 + i * 4); wav.writeInt16LE(Math.round(Rb[i] / pk * 30000 * fade), 46 + i * 4) }
writeFileSync(join(tmp, 'score.wav'), wav); console.log('score written')

// ---------- the picture ----------
const browser = await chromium.launch(), page = await browser.newPage()
await page.setContent(`<canvas id="c" width="${W}" height="${H}"></canvas>`)
await page.addScriptTag({ path: join(root, 'siam.js') })
const frames = Math.round(TOTAL * FPS)
for (let i = 0; i < frames; i++) {
  const url = await page.evaluate(([t, w]) => { const cv = document.getElementById('c'); Siam.frame(cv.getContext('2d'), Math.min(t, Siam.total() - 0.01), w); return cv.toDataURL('image/jpeg', 0.9) }, [i / FPS, W])
  writeFileSync(join(tmp, 'f' + String(i).padStart(5, '0') + '.jpg'), Buffer.from(url.split(',')[1], 'base64'))
  if (i % 240 === 0) console.log('frame', i, '/', frames)
}
await browser.close()
execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-framerate', String(FPS), '-i', join(tmp, 'f%05d.jpg'), '-i', join(tmp, 'score.wav'), '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-c:a', 'aac', '-b:a', '192k', '-shortest', join(root, 'video', 'ramakien.mp4')], { stdio: 'inherit' })
rmSync(tmp, { recursive: true, force: true }); console.log('done')
