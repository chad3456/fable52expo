/* Chhaya: shadow cinema. The Ramayana, Krishna's leela, the dice hall, the Vishvarupa and the
   eighteen days of Kurukshetra as wide film frames (2400 x 1000) made of layered silhouettes in fog,
   lit from behind, with rim light, shafts, bloom and an anamorphic flare. No brush pass is used. */
(function () {
  'use strict';
  const { mix, lite, dark, css } = Epic;
  const { F, scr, hut, boat, vimana, ARCH, PRAY, KNEEL, SIT, SAGE, HANU } = Epic.kit;
  const { vishva, stars, deity } = Epic.front;
  const W = 2400, H = 1000, FLAT = { layers: [], crisp: 1 };
  const PAL = {
    dawn: { sky: ['#2a2050', '#a8506a', '#f6a058', '#fde2a0'], fog: '#f0a878', rim: '#ffe6b0' },
    gold: { sky: ['#241606', '#8a5614', '#e8a630', '#fff2c0'], fog: '#e0a848', rim: '#fff8d8' },
    ember: { sky: ['#140606', '#56120e', '#c63c18', '#f8a030'], fog: '#c84a24', rim: '#ffc868' },
    blood: { sky: ['#100204', '#52080c', '#c01a14', '#f66a28'], fog: '#b02418', rim: '#ffb070' },
    night: { sky: ['#03061a', '#0e1a48', '#26407c', '#5c7cae'], fog: '#34568e', rim: '#c4dcff' },
    teal: { sky: ['#03121a', '#0a3842', '#288886', '#c0ead2'], fog: '#369694', rim: '#e4fff2' },
    violet: { sky: ['#08051e', '#281256', '#783896', '#f088ae'], fog: '#76489e', rim: '#ffcce8' },
    ash: { sky: ['#0e0e12', '#383842', '#868690', '#dadade'], fog: '#84848e', rim: '#ffffff' }
  };
  const T = (pal, d) => mix(pal.fog, '#05030a', d);
  // one depth plane: everything drawn by fn becomes a single-tone shape with a lit edge
  function L(p, pal, d, fn, rim) {
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H; const cx = cv.getContext('2d'), q = new Epic.Painter(cx, 1 + Math.floor(p.r() * 1e6), p.lx);
    fn(q); cx.setTransform(1, 0, 0, 1, 0, 0); cx.globalAlpha = 1; cx.globalCompositeOperation = 'source-atop'; cx.fillStyle = css(T(pal, d), d > 0.8 ? 0.86 : 1); cx.fillRect(0, 0, W, H);
    if (rim) { const rc = document.createElement('canvas'); rc.width = W; rc.height = H; const r2 = rc.getContext('2d'); r2.drawImage(cv, 0, 0); r2.globalCompositeOperation = 'source-in'; r2.fillStyle = css(pal.rim); r2.fillRect(0, 0, W, H); p.c.globalAlpha = 0.9; p.c.drawImage(rc, typeof rim === 'number' ? rim : -p.lx * -4, -4); p.c.globalAlpha = 1; }
    p.c.drawImage(cv, 0, 0);
  }
  const bg = (p, pal, o) => { o = o || {}; p.sky(pal.sky); if (o.stars) stars(p, o.stars, 620); if (o.clouds) p.clouds({ n: o.clouds, y0: 30, y1: 380, size: 260, col: T(pal, 0.35), shadow: T(pal, 0.6), light: pal.rim }); if (o.disc) { const d = o.disc; scr(p, () => p.glow(d[0], d[1], d[2] * 5, d[3] || pal.rim, 0.75)); p.circ(d[0], d[1], d[2], d[4] || '#fffbe8'); } };
  const haze = (p, pal, a, y0, y1) => { if (y0 == null) p.fade(pal.fog, a); else p.mist(y0, y1, pal.fog, a); };
  const shafts = (p, x, y, pal, a, a0, a1) => scr(p, () => p.rays(x, y, 30, 2600, pal.rim, a || 0.14, a0, a1));
  const sparks = (p, n, col, x0, y0, x1, y1, s) => { for (let i = 0; i < n; i++) p.rect(p.rr(x0, x1), p.rr(y0, y1), p.rr(2, s || 7), p.rr(2, s || 7), Array.isArray(col) ? col[i % col.length] : col, p.rr(0.4, 1)); };
  const rain = (p, n, col) => { for (let i = 0; i < n; i++) { const x = p.rr(-100, W), y = p.rr(-50, H); p.line(x, y, x + 26, y + 90, p.rr(1, 3), col, p.rr(0.2, 0.6)); } };
  const bolt = (p, x, y0, y1) => { const pts = [[x, y0]]; let cx = x; for (let y = y0 + 60; y < y1; y += 60) { cx += p.rr(-70, 70); pts.push([cx, y]); } scr(p, () => p.glow(x, (y0 + y1) / 2, 700, '#cfe0ff', 0.6)); for (let i = 1; i < pts.length; i++) { p.line(pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1], 9, '#ffffff'); if (i % 3 === 0) p.line(pts[i][0], pts[i][1], pts[i][0] + p.rr(-160, 160), pts[i][1] + 130, 4, '#ffffff', 0.8); } };
  const army = (q, x0, x1, y, h, n, dir, o) => q.crowd(Object.assign({ x0: x0, x1: x1, y: y, jit: h * 0.25, h: h, n: n, col: '#000', spears: 0.7, banners: 0.07, bannerCol: '#000', dir: dir || 1 }, o || {}));
  const jumbo = (q, x, y, h, f) => q.quad(x, y, h, { kind: 'elephant', f: f, col: '#555', cloth: '#333' });
  const earth = (q, y, seed, amp) => q.ridge({ y: y, amp: amp == null ? 14 : amp, col: '#000', seed: seed || 3, freq: 0.004 });
  const pillars = (q, xs, base, w, h) => { for (const x of xs) q.pillar(x, base, w, h, '#444'); };
  function field(p, pal, seed) { L(p, pal, 0.3, q => { earth(q, 700, seed, 22); army(q, 0, W, 705, 40, 280); for (let i = 0; i < 6; i++) jumbo(q, 180 + i * 410 + q.rr(-60, 60), 716, 96, i % 2 ? 1 : -1); }); haze(p, pal, 0.5, 520, 780); }
  // cast (colours only tint the darkest planes)
  const RAMA = { skin: '#5f86b8', cloth: '#f0b93a', cloth2: '#e8703a', crown: 'bun', hair: '#1f1a2a' }, SITA = { skin: '#e7b991', robe: '#d9483b', drape: '#f0b93a', longhair: true, crown: 'none', sash: false };
  const RAVAN = { skin: '#8f6f9c', cloth: '#6b2f4f', cloth2: '#c9463a', heads: 4, broad: 1.45, crown: 'mukut' }, KR = { skin: '#4a69a8', cloth: '#f2c23a', cloth2: '#e8703a', crown: 'mukut', feather: true };
  const WAR = { skin: '#b98866', cloth: '#7a4a4a', cloth2: '#aa3333', crown: 'mukut' }, BIG = Object.assign({}, WAR, { broad: 1.5 }), OLD = Object.assign({}, WAR, { beard: '#f6f1ea', beardLen: 2.6 }), WOM = { skin: '#b98866', robe: '#b8323a', drape: '#f0b93a', longhair: true, crown: 'none', sash: false };
  const KID = { skin: '#4a69a8', cloth: '#f2c23a', cloth2: '#e8703a', crown: 'bun', feather: true, headScale: 1.5, broad: 0.9 }, VILL = { skin: '#b98866', cloth: '#ddd', cloth2: '#a33', crown: 'bun', plain: true };
  const BOW = { type: 'bow', hand: 'F', ang: 176, drawn: true, len: 0.46 }, UP = { aN: [160, 174], aF: [150, 170] }, RUN = { lean: 18, lN: [40, -4], lF: [-30, -44] }, LIE = { fly: true, lean: 84, lN: [84, 90], lF: [78, 84], aN: [70, 90], aF: [100, 96] }, BOWED = { head: 30, lean: 12 };
  const car = (q, x, y, h, f, o) => q.chariot(x, y, h, Object.assign({ f: f, horses: 3 }, o || {}));
  const S = [];
  function post(sc) { return function (c, w, h) {
    const b = document.createElement('canvas'); b.width = w; b.height = h; const bc = b.getContext('2d'); bc.filter = 'blur(22px) contrast(1.9) brightness(0.8)'; bc.drawImage(c.canvas, 0, 0); c.globalCompositeOperation = 'screen'; c.globalAlpha = 0.5; c.drawImage(b, 0, 0); c.globalAlpha = 1;
    if (sc.flare) for (const k of [0.02, 0.1]) { c.save(); c.translate(sc.flare[0], sc.flare[1]); c.scale(1, k); const g = c.createRadialGradient(0, 0, 0, 0, 0, 1300); g.addColorStop(0, css(sc.pal.rim, k < 0.05 ? 0.9 : 0.3)); g.addColorStop(1, css(sc.pal.rim, 0)); c.fillStyle = g; c.beginPath(); c.arc(0, 0, 1300, 0, 6.3); c.fill(); c.restore(); }
    c.globalCompositeOperation = 'source-over'; const g2 = c.createLinearGradient(0, h - 260, 0, h); g2.addColorStop(0, 'rgba(0,0,0,0)'); g2.addColorStop(1, 'rgba(0,0,0,0.7)'); c.fillStyle = g2; c.fillRect(0, h - 260, w, 260);
    c.fillStyle = '#000'; c.fillRect(0, 0, w, 44); c.fillRect(0, h - 44, w, 44); c.textBaseline = 'alphabetic'; c.textAlign = 'left';
    try { c.letterSpacing = '7px'; } catch (e) { } c.font = "22px Georgia, 'Times New Roman', serif"; c.fillStyle = css(sc.pal.rim); c.fillText(sc.kanda.toUpperCase(), 84, h - 128);
    try { c.letterSpacing = '2px'; } catch (e) { } c.font = "54px Georgia, 'Times New Roman', serif"; c.fillStyle = '#fbf4e4'; c.fillText(sc.title, 82, h - 72); try { c.letterSpacing = '0px'; } catch (e) { }
  }; }
  function shot(title, kanda, text, pal, o, draw) { const sc = { title: title, kanda: kanda, text: text, pal: pal, w: W, h: H, seed: 1001 + S.length * 7, light: o.light || -1, flare: o.flare, paint: FLAT, draw: p => draw(p, pal) }; sc.after = post(sc); S.push(sc); }

  // ============================ RAMAYANA ============================
  shot('The Bow Breaks', 'Ramayana · Bala Kanda', 'In the hall of Mithila the bow of Shiva snaps like a thunderclap in the hands of a boy.', PAL.gold, { flare: [1200, 430] }, (p, pal) => {
    bg(p, pal); L(p, pal, 0.3, q => { pillars(q, [200, 560, 920, 1480, 1840, 2200], 900, 120, 900); q.rect(0, 0, W, 70, '#000'); }); haze(p, pal, 0.4); scr(p, () => { p.glow(1200, 430, 900, pal.rim, 0.9); p.rays(1200, 430, 40, 1800, pal.rim, 0.22); });
    L(p, pal, 0.65, q => { earth(q, 860, 2, 4); army(q, 0, 820, 880, 170, 26, 1, { spears: 0.2, arms: 0.4 }); army(q, 1620, W, 880, 170, 26, -1, { spears: 0.2, arms: 0.4 }); }); haze(p, pal, 0.25, 600, 900);
    L(p, pal, 1, q => { earth(q, 900, 4, 4); F(q, 1200, 900, 460, RAMA, { aN: [160, 176], aF: [128, 150], lN: [20, 4], lF: [-22, -8] }); F(q, 1660, 900, 320, SITA, { f: -1, aN: [60, 96], aF: [50, 92] }); pillars(q, [70, 2330], 1000, 280, 1000); }, true);
    for (const s of [[[1180, 500], [1040, 360], [950, 190], [1010, 50]], [[1230, 520], [1420, 610], [1600, 640], [1780, 560]]]) { p.curve(s, 30, '#b8822e'); p.curve(s, 10, pal.rim); } sparks(p, 260, pal.rim, 700, 60, 1700, 800);
  });
  shot('Into the Forest', 'Ramayana · Ayodhya Kanda', 'Three figures walk out of the light of the city and under the first trees of fourteen years.', PAL.teal, { flare: [1500, 300], light: 1 }, (p, pal) => {
    bg(p, pal, { disc: [1500, 300, 80] }); L(p, pal, 0.25, q => q.forest({ x0: -100, x1: W + 100, base: 760, jit: 20, h: 900, n: 16, col: '#333', trunk: '#222', kind: 'pine' })); haze(p, pal, 0.45); shafts(p, 1500, 300, pal, 0.2, 60, 170);
    L(p, pal, 0.6, q => q.forest({ x0: -100, x1: W + 100, base: 840, jit: 20, h: 1100, n: 9, col: '#333', trunk: '#222' })); haze(p, pal, 0.3, 500, 900);
    L(p, pal, 1, q => { earth(q, 880, 5, 20); F(q, 1300, 880, 330, RAMA, { f: 1, lN: [22, 5], lF: [-20, -26], prop: { type: 'bow', hand: 'N', ang: 176 } }); F(q, 1150, 884, 280, SITA, { f: 1, lN: [16, 4], lF: [-12, -16] }); F(q, 1010, 888, 310, RAMA, { f: 1, lN: [22, 5], lF: [-20, -26], prop: { type: 'bow', hand: 'N', ang: 176 } }); q.tree(160, 1060, 1500, { col: '#111', trunk: '#111', spread: 0.3 }); q.tree(2250, 1080, 1600, { col: '#111', trunk: '#111', spread: 0.3 }); q.grass(0, W, 880, 50, '#000', 260); }, 4);
    sparks(p, 160, pal.rim, 800, 200, 2200, 800, 5);
  });
  shot('The Golden Deer', 'Ramayana · Aranya Kanda', 'The only bright thing in the forest is the lie.', PAL.night, { flare: [1500, 560], light: 1 }, (p, pal) => {
    bg(p, pal, { stars: 200 }); L(p, pal, 0.3, q => q.forest({ x0: -100, x1: W + 100, base: 780, jit: 20, h: 800, n: 14, col: '#333', trunk: '#222' })); haze(p, pal, 0.4);
    scr(p, () => { p.glow(1500, 560, 620, '#ffd060', 0.95); p.rays(1500, 560, 26, 900, '#ffe08a', 0.25); }); p.quad(1500, 780, 420, { kind: 'deer', f: -1, col: '#ffd870', gait: 'leap', spots: '#fffbe0', antler: '#fff0b0', mane: '#fff0c0' }); sparks(p, 200, '#ffe8a0', 1100, 200, 1900, 820);
    L(p, pal, 1, q => { earth(q, 880, 5, 16); hut(q, 300, 890, 380); F(q, 640, 884, 270, SITA, { f: 1, aN: [70, 100], aF: [40, 70] }); F(q, 860, 884, 330, RAMA, { f: 1, lN: [16, 2], lF: [-16, -8], aF: [78, 84], aN: [20, 70], prop: { type: 'bow', hand: 'F', ang: 172 } }); q.tree(2300, 1060, 1500, { col: '#111', trunk: '#111' }); q.grass(0, W, 880, 46, '#000', 240); }, 4);
  });
  shot('The Abduction', 'Ramayana · Aranya Kanda', 'Ten heads against the dusk, and an old vulture who would not look away.', PAL.blood, { flare: [700, 520] }, (p, pal) => {
    bg(p, pal, { disc: [700, 520, 120], clouds: 7 }); L(p, pal, 0.35, q => { q.ridge({ y: 760, amp: 60, col: '#000', seed: 8 }); q.forest({ x0: 0, x1: W, base: 780, jit: 10, h: 260, n: 30, col: '#000', trunk: '#000' }); }); haze(p, pal, 0.4);
    L(p, pal, 0.7, q => { F(q, 1500, 960, 1000, RAVAN, { f: -1, lean: 4, aN: [70, 100], aF: [95, 120], arms: [[150, 170], [120, 150], [30, 80], [-40, 30]] }); vimana(q, 2050, 330, 230, -1); }, true); haze(p, pal, 0.2, 500, 900);
    L(p, pal, 1, q => { earth(q, 900, 3, 14); hut(q, 360, 906, 340); F(q, 700, 900, 250, SITA, { f: 1, lean: -14, aN: [120, 150], aF: [100, 140] }); q.eagle(1050, 300, 420, { f: 1, col: '#444', head: '#444', gold: '#444', tip: '#333', up: 0.6, spread: 0.6 }); q.grass(0, W, 900, 40, '#000', 200); }, true);
    p.curve([[520, 950], [700, 916], [900, 950]], 8, pal.rim); p.birds(26, 100, 80, 2300, 420, '#05030a', 11);
  });
  shot("Hanuman's Leap", 'Ramayana · Sundara Kanda', 'For one moment he is larger than the sun.', PAL.dawn, { flare: [1300, 470], light: 1 }, (p, pal) => {
    bg(p, pal, { disc: [1300, 470, 300], clouds: 6 }); p.sea(700, T(pal, 0.1), T(pal, 0.6), pal.rim, 1300); haze(p, pal, 0.25, 560, 760);
    L(p, pal, 0.5, q => { q.ridge({ y: 706, amp: 6, col: '#000', peak: [2150, 150, 110], seed: 4, x0: 1800, bottom: 702 }); q.city({ x0: 2060, x1: 2240, base: 610, h: 110, n: 12, col: '#000', gold: '#000' }); });
    L(p, pal, 0.95, q => F(q, 1250, 430, 760, HANU, { fly: true, lean: 68, head: -42, lN: [-78, -86], lF: [-48, -118], aF: [104, 96], aN: [-40, -75], prop: { type: 'mace', hand: 'N', ang: -112, len: 0.34 } }), 5);
    L(p, pal, 1, q => { q.ridge({ y: 1010, amp: 60, col: '#000', peak: [200, 320, 330], seed: 9, freq: 0.012 }); for (const [x, y] of [[330, 720], [400, 760], [470, 800], [540, 840]]) q.mini(x, y, 60, '#000', { tail: -1, arms: true }); q.tree(110, 720, 300, { col: '#000', trunk: '#000' }); }); p.birds(30, 300, 300, 2000, 700, '#05030a', 9);
  });
  shot('Lanka Burns', 'Ramayana · Sundara Kanda', 'They lit his tail. He lit their city.', PAL.ember, { flare: [1200, 600] }, (p, pal) => {
    bg(p, pal, { clouds: 8 }); L(p, pal, 0.3, q => q.city({ x0: -50, x1: W + 50, base: 760, h: 520, n: 34, col: '#000', gold: '#000', peakX: 1200, peakW: 700 })); for (let i = 0; i < 12; i++) p.fire(100 + i * 200 + p.rr(-60, 60), p.rr(520, 740), p.rr(100, 220), p.rr(220, 460), { sway: 0.3 }); haze(p, pal, 0.3);
    L(p, pal, 0.9, q => { const J = F(q, 1250, 400, 620, HANU, { fly: true, f: -1, lean: 40, head: -20, lN: [70, -30], lF: [-60, -100], aN: [130, 160], aF: [60, 100], tail: 1.4, prop: { type: 'mace', hand: 'N', ang: 190, len: 0.36 } }); }, true); p.fire(1450, 150, 110, 240, { sway: 0.5 });
    L(p, pal, 1, q => { q.city({ x0: -50, x1: W + 50, base: 1000, h: 330, n: 18, col: '#000', gold: '#000' }); army(q, 0, W, 940, 60, 60, 1, { arms: 0.5 }); }); sparks(p, 420, ['#ffd070', '#ff8a3a'], 0, 0, W, 900);
  });
  shot('The Bridge', 'Ramayana · Yuddha Kanda', 'Stones that should sink, carrying an army that should not exist.', PAL.dawn, { flare: [1200, 560] }, (p, pal) => {
    bg(p, pal, { disc: [1200, 560, 150], clouds: 5 }); p.sea(640, T(pal, 0.1), T(pal, 0.65), pal.rim, 1200);
    L(p, pal, 0.5, q => { q.ridge({ y: 646, amp: 6, col: '#000', peak: [1200, 170, 70], seed: 4, bottom: 642, x0: 900, x1: 1500 }); q.city({ x0: 1110, x1: 1290, base: 588, h: 70, n: 9, col: '#000', gold: '#000' }); });
    L(p, pal, 0.55, q => q.poly([[1190, 644], [1212, 644], [1760, 1000], [640, 1000]], '#000'), true); L(p, pal, 1, q => { for (let i = 0; i < 110; i++) { const t = Math.pow(q.r(), 0.7), y = 650 + t * 300, hw = 8 + t * 480; q.mini(1200 + q.rr(-1, 1) * hw, y, 12 + t * 80, '#000', { tail: q.r() < 0.5 ? 1 : -1, arms: q.r() < 0.4, spear: q.r() < 0.3 }); } }, true);
    L(p, pal, 1, q => { F(q, 420, 980, 420, RAMA, { f: 1, back: true, prop: { type: 'bow', hand: 'F', ang: 176, len: 0.46 } }); F(q, 240, 990, 380, HANU, { f: 1, back: true }); q.tree(2300, 1040, 900, { kind: 'palm', col: '#000', trunk: '#000' }); }, 4); p.birds(24, 300, 200, 2100, 520, '#05030a', 9);
  });
  shot('Kumbhakarna', 'Ramayana · Yuddha Kanda', 'Woken after six months, he steps over the wall, and the monkey host looks up.', PAL.ash, { flare: [1750, 300] }, (p, pal) => {
    bg(p, pal, { disc: [1750, 300, 70], clouds: 7 }); L(p, pal, 0.25, q => { q.wall(0, W, 760, 170, '#000'); q.gopuram(600, 770, 300, 560, '#000', '#000'); q.gopuram(2000, 770, 240, 420, '#000', '#000'); }); haze(p, pal, 0.5);
    L(p, pal, 0.55, q => F(q, 1250, 980, 1080, BIG, { f: -1, lean: 6, lN: [28, 6], lF: [-24, -12], aN: [20, 60], aF: [70, 110], prop: { type: 'trident', hand: 'F', ang: 172, len: 0.42 } }), true); haze(p, pal, 0.35); shafts(p, 1750, 300, pal, 0.12, 100, 200);
    L(p, pal, 1, q => { earth(q, 900, 3); army(q, 0, 1000, 910, 70, 90, 1, { tail: 1, arms: 0.6, spears: 0.1 }); army(q, 1500, W, 910, 70, 50, -1); for (let i = 0; i < 8; i++) q.rock(q.rr(200, 900), q.rr(300, 600), q.rr(30, 60), q.rr(20, 40), '#000'); }, true); p.birds(30, 300, 60, 2100, 400, '#05030a', 10);
  });
  shot('Rama and Ravana', 'Ramayana · Yuddha Kanda', 'The last arrow is already on the string.', PAL.blood, { flare: [640, 560] }, (p, pal) => {
    bg(p, pal, { disc: [400, 330, 90], clouds: 7 }); L(p, pal, 0.3, q => q.city({ x0: 1300, x1: W, base: 740, h: 300, n: 18, col: '#000', gold: '#000' })); for (const x of [1500, 1900, 2250]) p.fire(x, 700, 130, 220, { sway: -0.3 }); haze(p, pal, 0.4);
    L(p, pal, 0.6, q => F(q, 1800, 960, 860, RAVAN, { f: -1, lean: 6, lN: [22, 6], lF: [-24, -10], aN: [124, 156], aF: [80, 40], arms: [[150, 176], [100, 124], [56, 96], [156, 120]], prop: [{ type: 'sword', hand: 'N', ang: 168, len: 0.44 }] }), true); haze(p, pal, 0.2, 500, 900);
    let hand; L(p, pal, 1, q => { earth(q, 900, 8); army(q, 1000, W, 910, 50, 90, -1); army(q, 0, 300, 910, 50, 30, 1, { tail: -1 }); const d = car(q, 520, 890, 230, 1); const R = F(q, d.x + 6, d.y, 290, RAMA, ARCH, { f: 1, lean: -6, prop: BOW }); hand = R.hF; }, 4);
    scr(p, () => { p.glow(hand[0] + 60, hand[1], 260, '#fff3b0', 0.95); p.rays(hand[0] + 60, hand[1], 14, 1300, '#fff0b0', 0.4, -18, 14); }); p.volley(40, 800, 300, 1500, 700, -6, 110, pal.rim, 3, 10);
  });
  shot('The Return', 'Ramayana · Yuddha Kanda', 'A lamp in every window, and a throne that waited fourteen years.', PAL.violet, { flare: [1200, 520] }, (p, pal) => {
    bg(p, pal, { stars: 260 }); L(p, pal, 0.35, q => q.city({ x0: -50, x1: W + 50, base: 760, h: 520, n: 40, col: '#000', gold: '#000', peakX: 1200, peakW: 600 })); for (let i = 0; i < 520; i++) p.rect(p.rr(0, W), p.rr(330, 760), 5, 7, '#ffd98a'); haze(p, pal, 0.25);
    scr(p, () => p.glow(1200, 560, 520, '#ffd070', 0.8)); L(p, pal, 0.8, q => { q.rect(960, 880, 480, 30, '#000'); q.pillar(1020, 880, 40, 420, '#000'); q.pillar(1380, 880, 40, 420, '#000'); q.c.fillStyle = '#000'; q.c.beginPath(); q.c.ellipse(1200, 430, 260, 90, 0, Math.PI, 6.283); q.c.fill(); q.line(1200, 430, 1200, 640, 8, '#000'); F(q, 1130, 880, 330, RAMA, SIT, { f: 1, crown: 'mukut' }); F(q, 1290, 880, 290, SITA, SIT, { f: -1 }); F(q, 1200, 960, 240, HANU, KNEEL, PRAY, { f: -1, head: -30 }); }, true);
    L(p, pal, 1, q => { earth(q, 960, 3, 6); army(q, 0, 900, 980, 150, 30, 1, { spears: 0, arms: 0.7 }); army(q, 1500, W, 980, 150, 30, -1, { spears: 0, arms: 0.7 }); }); for (let i = 0; i < 160; i++) p.lamp(p.rr(0, W), p.rr(880, 990), 7); sparks(p, 200, ['#ffd98a', '#ffc8e8'], 0, 0, W, 800, 5);
  });

  // ============================ KRISHNA LEELA ============================
  shot('The Night Crossing', "Krishna's Leela · Birth", 'Chains fall, guards sleep, and a father carries a newborn through the flooded Yamuna under a serpent\'s hood.', PAL.night, { flare: [1200, 420] }, (p, pal) => {
    bg(p, pal, { clouds: 9 }); L(p, pal, 0.3, q => { q.wall(0, 800, 640, 220, '#000'); q.gopuram(300, 650, 260, 420, '#000', '#000'); q.forest({ x0: 1500, x1: W, base: 660, jit: 10, h: 280, n: 12, col: '#000', trunk: '#000' }); }); p.sea(640, T(pal, 0.2), T(pal, 0.8), pal.rim, 1200); haze(p, pal, 0.3); bolt(p, 1900, 0, 560);
    scr(p, () => p.glow(1200, 440, 360, '#fff6d0', 0.9)); L(p, pal, 0.95, q => { q.serpent([[1500, 900], [1560, 700], [1440, 520], [1330, 330], [1210, 300]], 90, 60, '#333', { hood: true, headW: 110 }); const J = F(q, 1200, 900, 440, VILL, { f: 1, aN: [165, 178], aF: [150, 174], lN: [22, 5], lF: [-20, -26] }); q.ell(J.hN[0] - 10, J.hN[1] - 20, 110, 44, '#000'); }, true);
    scr(p, () => p.glow(1190, 380, 120, '#ffffff', 1)); p.waves(760, 990, T(pal, 0.75), 50, pal.rim); rain(p, 700, '#c4dcff');
  });
  shot('The Butter Thief', "Krishna's Leela · Gokul", 'A pot hung out of reach, a pyramid of friends, and one hand already inside.', PAL.gold, { flare: [1700, 300], light: 1 }, (p, pal) => {
    bg(p, pal, { disc: [1700, 300, 90] }); L(p, pal, 0.3, q => { for (const x of [300, 900, 2000]) hut(q, x, 800, 460); q.forest({ x0: 1100, x1: 1700, base: 800, h: 500, n: 4, col: '#000', trunk: '#000' }); }); haze(p, pal, 0.45); shafts(p, 1700, 300, pal, 0.2, 110, 200);
    L(p, pal, 1, q => { earth(q, 900, 3, 4); q.rect(0, 0, W, 40, '#000'); for (const x of [700, 1200, 1560]) { q.line(x, 0, x, 300, 5, '#000'); q.ell(x, 350, 80, 70, '#000'); q.rect(x - 40, 280, 80, 30, '#000'); }
      const A = F(q, 1200, 900, 300, KID, { f: 1, feather: false, aN: [120, 150], lN: [12, 2], lF: [-12, -4] }); const B = F(q, 1200, A.sh[1] + 20, 280, KID, { f: 1, aN: [165, 178], aF: [150, 172], lN: [30, 10], lF: [-30, -10] }); F(q, 980, 900, 260, KID, { f: 1, feather: false, aN: [140, 160] }); F(q, 1420, 900, 250, KID, { f: -1, feather: false, aN: [150, 170] });
      F(q, 2080, 900, 420, WOM, { f: -1, aN: [120, 100], aF: [100, 80], lean: -6 }); q.quad(420, 900, 260, { kind: 'horse', f: 1, col: '#444', gait: 'stand' }); }, 4);
    p.curve([[1250, 420], [1290, 520], [1270, 640]], 14, '#fffbe6'); sparks(p, 120, pal.rim, 600, 100, 2000, 800, 5);
  });
  shot('The Dance on Kaliya', "Krishna's Leela · Yamuna", 'The river\'s poison has a hundred heads. A child dances on them until it begs for its life.', PAL.teal, { flare: [1200, 300] }, (p, pal) => {
    bg(p, pal, { disc: [1200, 300, 220, null, '#f4fff8'], stars: 120 }); L(p, pal, 0.3, q => q.forest({ x0: -50, x1: W + 50, base: 700, jit: 10, h: 420, n: 22, col: '#000', trunk: '#000' })); p.sea(690, T(pal, 0.15), T(pal, 0.8), pal.rim, 1200); haze(p, pal, 0.3);
    L(p, pal, 0.95, q => { for (const i of [-3, 3, -2, 2, -1, 1, 0]) { const hx = 1200 + i * 150, hy = 520 + Math.abs(i) * 50; q.serpent([[1200 + i * 60, 1000], [1200 + i * 110, 800], [hx - i * 20, hy + 130], [hx, hy]], 110, 80, '#333', { hood: true, headW: 100, tongue: true }); } q.serpent([[200, 900], [500, 820], [800, 900], [1000, 960]], 90, 120, '#333', { head: false }); q.serpent([[2300, 880], [2000, 800], [1700, 900], [1400, 960]], 60, 120, '#333', { head: false }); F(q, 1200, 470, 360, KR, { f: 1, lN: [70, -40], lF: [-10, -6], aN: [150, 110], aF: [70, 120], lean: -6, prop: { type: 'flute', hand: 'F' } }); }, true);
    p.waves(800, 990, T(pal, 0.7), 60, pal.rim); L(p, pal, 1, q => { q.ridge({ y: 1000, amp: 30, col: '#000', seed: 5, peak: [150, 300, 150], x1: 700 }); army(q, 20, 420, 880, 120, 12, 1, { spears: 0, arms: 0.9 }); q.tree(2330, 1040, 1200, { col: '#000', trunk: '#000' }); });
  });
  shot('Govardhan', "Krishna's Leela · Vraja", 'Seven days of storm from an angry heaven, and one small finger under the mountain.', PAL.night, { flare: [1200, 640] }, (p, pal) => {
    bg(p, pal, { clouds: 12 }); bolt(p, 500, 0, 420); bolt(p, 2000, 0, 380); haze(p, pal, 0.25); scr(p, () => p.glow(1200, 700, 620, '#ffd890', 0.8));
    L(p, pal, 0.9, q => { q.blob([[200, 470], [500, 250], [900, 130], [1300, 90], [1700, 190], [2100, 380], [2250, 480], [1700, 520], [1200, 500], [700, 520]], '#000'); q.forest({ x0: 500, x1: 1900, base: x => 300 - 150 * Math.exp(-Math.pow((x - 1250) / 500, 2)), h: 150, n: 22, col: '#000', trunk: '#000' }); }, true);
    L(p, pal, 1, q => { earth(q, 900, 3, 6); const K = F(q, 1200, 900, 400, KR, { f: 1, aN: [170, 180], aF: [30, 60], lN: [12, 14], lF: [14, -8] }); q.line(K.hN[0], K.hN[1], K.hN[0] + 4, 500, 10, '#000'); army(q, 300, 1000, 910, 160, 18, 1, { spears: 0, arms: 0.3 }); army(q, 1400, 2100, 910, 160, 18, -1, { spears: 0, arms: 0.3 }); for (const [x, f] of [[760, 1], [1560, -1], [1760, -1], [520, 1]]) q.quad(x, 910, 190, { kind: 'horse', f: f, col: '#333', gait: 'stand' }); }, 4);
    rain(p, 900, '#c4dcff'); p.rect(260, 520, 1960, 400, '#000', 0);
  });
  shot('The Flute under the Moon', "Krishna's Leela · Rasa", 'On the autumn full moon the forest hears a flute, and no one who hears it stays at home.', PAL.violet, { flare: [1200, 330] }, (p, pal) => {
    bg(p, pal, { disc: [1200, 330, 260, null, '#fff6fa'], stars: 240 }); L(p, pal, 0.3, q => q.forest({ x0: -50, x1: W + 50, base: 780, jit: 10, h: 500, n: 18, col: '#000', trunk: '#000' })); haze(p, pal, 0.4); shafts(p, 1200, 330, pal, 0.12, 20, 160);
    L(p, pal, 0.7, q => { for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283, x = 1200 + Math.cos(a) * 700, y = 800 + Math.sin(a) * 70; if (Math.sin(a) < 0.2) F(q, x, y, 230, WOM, { f: Math.cos(a) > 0 ? -1 : 1, aN: [130, 160], aF: [100, 140], lean: 8 }); } }, true); haze(p, pal, 0.2, 600, 900);
    L(p, pal, 1, q => { earth(q, 900, 3, 8); F(q, 1200, 900, 430, KR, { f: 1, lN: [10, 14], lF: [14, -8], aN: [60, 130], aF: [70, 126], head: 6, prop: { type: 'flute', hand: 'N' } }); for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283, x = 1200 + Math.cos(a) * 700, y = 880 + Math.sin(a) * 70; if (Math.sin(a) >= 0.2) F(q, x, y + 60, 290, WOM, { f: Math.cos(a) > 0 ? -1 : 1, aN: [130, 160], aF: [100, 140], lean: 8 }); } q.quad(1560, 900, 200, { kind: 'horse', f: -1, col: '#333', gait: 'stand' }); q.tree(120, 1060, 1500, { col: '#000', trunk: '#000', spread: 0.4 }); q.tree(2300, 1060, 1400, { col: '#000', trunk: '#000', spread: 0.4 }); }, 4);
    sparks(p, 300, ['#ffc8e8', '#fff6d0'], 0, 0, W, 900, 6);
  });
  shot('The End of Kamsa', "Krishna's Leela · Mathura", 'The tyrant who killed six infants to stop one is pulled from his throne by that one.', PAL.ember, { flare: [1500, 360] }, (p, pal) => {
    bg(p, pal); L(p, pal, 0.3, q => { pillars(q, [160, 520, 880, 1900, 2260], 860, 130, 860); for (let t = 0; t < 4; t++) army(q, 0, W, 560 + t * 60, 60, 110, 1, { spears: 0.1, arms: 0.6, jit: 3 }); }); haze(p, pal, 0.45); scr(p, () => { p.glow(1500, 360, 700, pal.rim, 0.8); p.rays(1500, 360, 30, 1700, pal.rim, 0.2); });
    L(p, pal, 1, q => { for (let i = 0; i < 6; i++) q.rect(1300 + i * 60, 600 + i * 60, 900 - i * 60, 64, '#000'); q.rect(1640, 280, 320, 330, '#000'); q.shikhara(1800, 300, 200, 260, '#000', '#000'); F(q, 1380, 600, 380, KR, { f: 1, lean: -20, aN: [80, 60], aF: [70, 50], lN: [30, 10], lF: [-30, -20] }); F(q, 1620, 640, 420, BIG, { fly: true, f: -1, lean: -50, head: 20, aN: [150, 170], aF: [130, 160], lN: [60, 20], lF: [20, -30] }); q.ell(1250, 880, 60, 44, '#000'); q.poly([[1220, 850], [1280, 850], [1250, 780]], '#000'); earth(q, 940, 3, 4); army(q, 0, 1100, 960, 130, 20, 1, { arms: 0.8, spears: 0.1 }); }, true);
    sparks(p, 200, pal.rim, 800, 0, 2200, 800);
  });

  // ============================ THE DICE HALL ============================
  const hall = (p, pal, glowX) => { bg(p, pal); L(p, pal, 0.25, q => { pillars(q, [140, 460, 780, 1100, 1420, 1740, 2060, 2380], 820, 110, 820); q.rect(0, 0, W, 90, '#000'); }); haze(p, pal, 0.5); for (const x of [620, 1260, 1900]) { p.line(x, 0, x, 190, 4, T(pal, 0.9)); p.lamp(x, 230, 26); scr(p, () => p.glow(x, 230, 420, '#ffb860', 0.5)); } };
  const elders = (q, n, y) => { for (let i = 0; i < n; i++) { const x = 120 + i * (W - 240) / (n - 1); F(q, x, y, 250, i % 3 ? WAR : OLD, SIT, { f: x < 1200 ? 1 : -1, head: 24, lean: 10 }); } };
  function die(p, x, y, s, a) { const c = p.c; c.save(); c.translate(x, y); c.rotate(a); p.poly([[-s, -s], [s, -s], [s, s], [-s, s]], '#f6ead0'); p.poly([[s, -s], [s * 1.4, -s * 1.3], [s * 1.4, s * 0.7], [s, s]], '#b8a680'); p.poly([[-s, -s], [-s * 0.6, -s * 1.3], [s * 1.4, -s * 1.3], [s, -s]], '#fffaf0'); for (const [u, v] of [[-0.5, -0.5], [0.5, 0.5], [0, 0], [-0.5, 0.5], [0.5, -0.5]]) p.circ(u * s, v * s, s * 0.15, '#7a1c1c'); c.restore(); }
  shot('The Throw', 'Mahabharata · The Game of Dice', 'Shakuni\'s dice are carved from his father\'s bones, and they have never once fallen against him.', PAL.ember, { flare: [1200, 470] }, (p, pal) => {
    hall(p, pal); L(p, pal, 0.6, q => elders(q, 9, 800), true); haze(p, pal, 0.3, 500, 900); scr(p, () => { p.glow(1200, 470, 520, '#ffe0a0', 0.9); p.rays(1200, 470, 26, 1100, '#ffe8b0', 0.2); }); die(p, 1080, 430, 110, 0.4); die(p, 1380, 540, 86, -0.3);
    L(p, pal, 1, q => { q.poly([[500, 900], [1900, 900], [2200, 1000], [200, 1000]], '#000'); F(q, 760, 900, 330, WAR, SIT, { f: 1, lean: 20, head: 20, aN: [40, 60], aF: [30, 50] }); F(q, 1700, 900, 330, OLD, SIT, { f: -1, lean: 16, aN: [110, 140], aF: [60, 100], beardLen: 1.6 }); F(q, 1900, 900, 340, BIG, SIT, { f: -1, aN: [130, 160] });
      q.cap(2400, -60, 1820, 190, 330, 200, '#000'); q.ell(1730, 240, 170, 130, '#000', 1, 0.5); for (const [dx, dy, l] of [[-150, 30, 190], [-100, 110, 210], [-20, 150, 200], [60, 150, 170]]) q.cap(1730 + dx * 0.5, 240 + dy * 0.5, 1730 + dx - 60, 240 + dy + l * 0.5, 62, 44, '#000'); q.cap(1800, 160, 1660, 90, 70, 46, '#000'); }, true);
    sparks(p, 160, pal.rim, 700, 100, 1700, 800, 5);
  });
  shot('Everything', 'Mahabharata · The Game of Dice', 'Jewels, army, kingdom, brothers, himself. Then the hall hears him name his wife.', PAL.ash, { flare: [1260, 230] }, (p, pal) => {
    hall(p, pal); L(p, pal, 0.6, q => elders(q, 9, 800)); haze(p, pal, 0.4, 480, 900); shafts(p, 1260, 230, pal, 0.14, 50, 130);
    L(p, pal, 1, q => { earth(q, 920, 3, 2); F(q, 1200, 920, 420, WAR, KNEEL, { f: 1, lean: 34, head: 40, aN: [30, 50], aF: [20, 40], crown: 'bun' }); for (const [x, c] of [[820, BIG], [640, WAR], [470, WAR], [320, WAR]]) F(q, x, 920, 330, c, SIT, { f: 1, head: 34, lean: 16 }); F(q, 1900, 920, 360, BIG, SIT, { f: -1, aN: [150, 170], aF: [130, 160] }); F(q, 2100, 920, 340, OLD, SIT, { f: -1, beardLen: 1.6, aN: [100, 130] }); }, true);
    p.poly([[1500, 930], [1640, 930], [1620, 870], [1570, 820], [1520, 870]], '#f3c65a'); p.circ(1570, 812, 14, '#fff0a8'); scr(p, () => p.glow(1570, 880, 150, '#ffe08a', 0.9)); die(p, 1380, 930, 40, 0.3); die(p, 1450, 950, 34, 1.1);
    p.poly([[1400, 960], [1900, 1000], [1300, 1000]], '#05030a', 0.5);
  });
  shot('Dragged into the Hall', 'Mahabharata · Draupadi\'s Humiliation', 'She is pulled by the hair past kings and teachers, and asks them a question none of them can answer.', PAL.blood, { flare: [1260, 230] }, (p, pal) => {
    hall(p, pal); L(p, pal, 0.55, q => elders(q, 11, 790), true); haze(p, pal, 0.35, 480, 900);
    L(p, pal, 1, q => { earth(q, 930, 3, 2); const D = F(q, 1000, 930, 460, BIG, { f: -1, lean: 14, lN: [40, -4], lF: [-30, -40], aN: [20, 40], aF: [-70, -40] }); const W2 = F(q, 1420, 930, 380, WOM, { f: -1, lean: 36, lN: [50, -20], lF: [-10, -60], aN: [130, 160], aF: [110, 150], longhair: false, head: -30 }); q.tube([[W2.head[0], W2.head[1] - 10], [W2.head[0] - 130, W2.head[1] - 60], D.hF], 46, 20, '#000'); q.blob([[1440, 760], [1640, 800], [1900, 930], [1500, 930]], '#000'); pillars(q, [60, 2340], 1000, 240, 1000); }, true);
    p.ribbon([[1500, 800], [1700, 860], [1950, 900], [2200, 930]], 60, '#c9302c', 0.9); sparks(p, 80, pal.rim, 600, 200, 1900, 800, 4);
  });
  shot('The Cloth That Would Not End', 'Mahabharata · Draupadi\'s Humiliation', 'When every human protector has failed her she lets go and calls one name. The cloth keeps coming.', PAL.gold, { flare: [1200, 120] }, (p, pal) => {
    hall(p, pal); scr(p, () => { p.glow(1200, 60, 1000, '#fff6d8', 0.95); p.rays(1200, 20, 40, 1700, '#fff8e0', 0.26, 30, 150); }); L(p, pal, 0.5, q => elders(q, 11, 800)); haze(p, pal, 0.35);
    const cols = ['#e8503a', '#f6c040', '#f08a3a', '#fbe090', '#d83a3a', '#fff4d0']; for (let k = 0; k < 6; k++) { const Q = []; for (let i = 0; i <= 18; i++) { const t = i / 18, a = t * 10 + k * 1.05, r = 60 + t * 760; Q.push([1200 + Math.cos(a) * r, 760 - t * 760 + Math.sin(a) * r * 0.16]); } p.tube(Q, t => 60 + 46 * Math.sin(t * 12 + k), 0, cols[k], 10); p.tube(Q.map(q => [q[0], q[1] - 14]), 12, 12, lite(cols[k], 0.5), 10); }
    for (let i = 0; i < 30; i++) { const x = p.rr(500, 1000), y = p.rr(860, 960); p.blob([[x - 100, y + 24], [x - 30, y - p.rr(20, 80)], [x + 40, y - p.rr(10, 60)], [x + 110, y + 26]], cols[i % 6]); }
    L(p, pal, 1, q => { earth(q, 940, 3, 2); F(q, 1200, 900, 400, WOM, { f: 1, aN: [164, 178], aF: [158, 176], head: -24 }); F(q, 760, 950, 400, BIG, { f: 1, lean: 50, aN: [80, 100], aF: [70, 96], lN: [70, -10], lF: [10, -70] }); pillars(q, [60, 2340], 1000, 240, 1000); }, true);
    scr(p, () => p.glow(1200, 620, 300, '#fff6d0', 0.6)); sparks(p, 260, '#fff8e0', 500, 0, 1900, 800, 6);
  });
  shot('The Vow', 'Mahabharata · Draupadi\'s Humiliation', 'Her hair will stay unbound until it is washed in the blood of this day. Jackals howl in the king\'s fire-room, and Bhima swears.', PAL.night, { flare: [1500, 420] }, (p, pal) => {
    hall(p, pal); bolt(p, 1500, 0, 620); L(p, pal, 0.55, q => elders(q, 9, 800)); haze(p, pal, 0.3, 480, 900);
    L(p, pal, 1, q => { earth(q, 930, 3, 2); F(q, 1100, 930, 460, WOM, { f: 1, aN: [20, 40], aF: [-10, 20] }); F(q, 1560, 930, 520, BIG, { f: -1, aN: [165, 178], aF: [40, 70], lN: [24, 4], lF: [-24, -8], prop: { type: 'mace', hand: 'N', ang: 180, len: 0.3 } }); for (const x of [400, 560, 720]) F(q, x, 930, 330, WAR, SIT, { f: 1, head: 30 }); pillars(q, [60, 2340], 1000, 240, 1000); }, 4);
    sparks(p, 100, pal.rim, 700, 100, 1900, 800, 4);
  });

  // ============================ VISHVARUPA ============================
  function cosmic(p, pal, fn, tint) {
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H; const cx = cv.getContext('2d'), q = new Epic.Painter(cx, 77 + Math.floor(p.r() * 1e6), p.lx); fn(q);
    cx.setTransform(1, 0, 0, 1, 0, 0); cx.globalAlpha = 1; cx.globalCompositeOperation = 'source-atop'; cx.fillStyle = css(tint || '#070a2c', 0.8); cx.fillRect(0, 0, W, H);
    for (let i = 0; i < 60; i++) q.ell(q.rr(0, W), q.rr(0, H), q.rr(80, 300), q.rr(30, 100), ['#3a2a9a', '#7a2a8a', '#1c5a9a', '#c8507a'][i % 4], 0.22, q.rr(-1, 1)); for (let i = 0; i < 2600; i++) { const r = q.rr(0.8, 3.4); q.circ(q.rr(0, W), q.rr(0, H), r, i % 9 ? '#ffffff' : '#ffe0a0', q.rr(0.5, 1)); }
    const rc = document.createElement('canvas'); rc.width = W; rc.height = H; const r2 = rc.getContext('2d'); r2.drawImage(cv, 0, 0); r2.globalCompositeOperation = 'source-in'; r2.fillStyle = css(pal.rim); r2.fillRect(0, 0, W, H);
    for (const d of [[-5, -3], [5, -3], [0, -6]]) { p.c.globalAlpha = 0.8; p.c.drawImage(rc, d[0], d[1]); } p.c.globalAlpha = 1; p.c.drawImage(cv, 0, 0);
  }
  shot('The Universe in One Body', 'Bhagavad Gita 11 · Vishvarupa', 'Arjuna asks to see him as he is. The charioteer becomes a doorway, and through it is everything.', PAL.night, { flare: [1200, 300] }, (p, pal) => {
    bg(p, pal, { stars: 300 }); scr(p, () => { p.glow(1200, 330, 900, '#ffd890', 0.7); p.rays(1200, 300, 60, 1800, '#fff0c0', 0.2); }); for (const r of [260, 360, 480]) { p.c.strokeStyle = 'rgba(255,240,190,0.4)'; p.c.lineWidth = 4; p.c.beginPath(); p.c.arc(1200, 300, r, 0, 6.3); p.c.stroke(); }
    cosmic(p, pal, q => vishva(q, { x: 1200 - 600 * 0.56, y: -6, k: 0.56, auraA: 0.004, rayA: 0.002 })); L(p, pal, 0.5, q => { earth(q, 860, 4, 20); army(q, 0, 900, 866, 40, 160, 1); army(q, 1500, W, 866, 40, 160, -1); }); haze(p, pal, 0.2, 700, 950);
    L(p, pal, 1, q => { earth(q, 940, 3, 8); const d = car(q, 520, 930, 190, 1, { gait: 'stand', horses: 4 }); F(q, d.x + 10, d.y, 220, WAR, KNEEL, PRAY, { f: 1, head: -40 }); }, 4); sparks(p, 260, ['#fff0a0', '#ff9a3a'], 600, 300, 1800, 950, 6);
  });
  shot('I Am Time', 'Bhagavad Gita 11.32 · Vishvarupa', '"I am Time, grown mighty to destroy the worlds." He sees both armies streaming into the blazing mouths.', PAL.blood, { flare: [1200, 360] }, (p, pal) => {
    bg(p, pal, { stars: 200 }); scr(p, () => { p.glow(1200, 360, 1100, '#ffb050', 0.8); p.rays(1200, 360, 70, 1900, '#ffd890', 0.24); });
    cosmic(p, pal, q => vishva(q, { x: 1200 - 600 * 1.5, y: -420, k: 1.5, auraA: 0.004, rayA: 0.002 }), '#1c0612');
    for (const s of [-1, 1]) for (let i = 0; i < 90; i++) { const t = i / 90, x = 1200 + s * (1150 - t * 1000) + p.rr(-30, 30), y = 960 - Math.pow(t, 1.6) * 520 + p.rr(-20, 20); p.mini(x, y, 54 - t * 40, mix(pal.rim, '#ff5a1a', t), { spear: i % 3 === 0, arms: i % 2 === 0 }); }
    for (const x of [1000, 1200, 1400]) p.fire(x, 480, 110, 200); L(p, pal, 1, q => { earth(q, 960, 3, 8); F(q, 300, 955, 260, WAR, KNEEL, PRAY, { f: 1, head: -50 }); }, 4); sparks(p, 400, ['#ffe08a', '#ff7a2a'], 200, 100, 2200, 950, 7);
  });
  shot('Brighter than a Thousand Suns', 'Bhagavad Gita 11.12 · Vishvarupa', 'Against that light the form is only an outline, and the outline has no edge he can find.', PAL.gold, { flare: [1200, 400] }, (p, pal) => {
    p.sky(['#fff8e0', '#ffe8a8', '#f8c050', '#c87818']); scr(p, () => { p.glow(1200, 400, 1300, '#ffffff', 1); p.rays(1200, 400, 90, 2000, '#ffffff', 0.3); }); p.circ(1200, 400, 430, '#ffffff'); for (let k = 0; k < 60; k++) { const a = k / 60 * 6.283; p.line(1200 + Math.cos(a) * 450, 400 + Math.sin(a) * 450, 1200 + Math.cos(a) * p.rr(560, 900), 400 + Math.sin(a) * p.rr(560, 900), 7, '#ffffff', 0.8); }
    L(p, pal, 1, q => vishva(q, { x: 1200 - 600 * 0.6, y: -40, k: 0.6, auraA: 0.004, rayA: 0.002 }), 4); L(p, pal, 0.6, q => { earth(q, 900, 4, 16); army(q, 0, 950, 906, 50, 150, 1); army(q, 1450, W, 906, 50, 150, -1); for (const x of [200, 600, 1800, 2200]) jumbo(q, x, 916, 130, x < 1200 ? 1 : -1); });
    L(p, pal, 1, q => { earth(q, 960, 3, 6); const d = car(q, 1200, 955, 150, 1, { gait: 'stand', horses: 4 }); F(q, d.x, d.y, 180, WAR, KNEEL, PRAY, { f: 1, head: -40 }); });
  });

  // ============================ EIGHTEEN DAYS ============================
  const day = (n, title, text, pal, o, draw) => shot(title, 'Kurukshetra · Day ' + n, text, pal, o, draw);
  day('1', 'The Conches', 'Two armies of kinsmen. Between them one chariot stops, and a warrior lays down his bow to ask why.', PAL.dawn, { flare: [1200, 560] }, (p, pal) => {
    bg(p, pal, { disc: [1200, 560, 110], clouds: 6 }); field(p, pal, 3); shafts(p, 1200, 560, pal, 0.14, 180, 360);
    L(p, pal, 1, q => { earth(q, 900, 5); const d = car(q, 1130, 890, 260, 1, { gait: 'stand', horses: 4 }); F(q, d.x - 60, d.y + 6, 280, WAR, SIT, { f: 1, lean: 24, head: 30, aN: [30, 60], aF: [20, 50] }); F(q, d.x + 100, d.y, 340, KR, { f: -1, aN: [70, 120], aF: [30, 60] }); army(q, -40, 620, 990, 220, 22, 1); army(q, 1800, W + 40, 990, 220, 22, -1); }, 4);
  });
  day('2', 'The Grandsire', 'Bhishma\'s white chariot goes through the Pandava ranks like fire through dry grass.', PAL.ash, { flare: [500, 420] }, (p, pal) => {
    bg(p, pal, { disc: [500, 420, 80], clouds: 8 }); field(p, pal, 5);
    L(p, pal, 1, q => { earth(q, 900, 6); const d = car(q, 620, 880, 270, 1, { horses: 4 }); F(q, d.x, d.y, 340, OLD, ARCH, { f: 1, prop: BOW }); for (const x of [1500, 1700, 1950, 2200]) F(q, x, 900 + q.rr(-10, 10), 260, WAR, q.r() < 0.5 ? LIE : { lean: -30, aN: [150, 170], lN: [30, 10], lF: [-20, -30], f: -1 }, { y: 0 }); army(q, 1300, W, 990, 150, 14, -1); }, 4);
    p.volley(90, 900, 200, 2300, 760, 8, 130, pal.rim, 3, 9);
  });
  day('3', 'The Broken Promise', 'He swore to carry no weapon. Watching Arjuna hold back, Krishna leaps down and runs at Bhishma himself.', PAL.gold, { flare: [1050, 330] }, (p, pal) => {
    bg(p, pal, { clouds: 6 }); field(p, pal, 7); let wh; L(p, pal, 1, q => { earth(q, 900, 6); const K = F(q, 1000, 900, 520, KR, RUN, UP, { f: 1 }); wh = [(K.hN[0] + K.hF[0]) / 2 + 30, K.hN[1] - 110]; F(q, 1750, 900, 380, OLD, PRAY, { f: -1, head: -14 }); F(q, 640, 900, 300, WAR, { f: 1, lean: 30, aN: [90, 100], aF: [80, 96], lN: [50, 0], lF: [-20, -50] }); car(q, 240, 900, 220, 1, { horses: 2, gait: 'stand' }); }, 4);
    scr(p, () => { p.glow(wh[0], wh[1], 420, '#fff0b0', 0.95); p.rays(wh[0], wh[1], 24, 900, '#fff6c8', 0.25); }); p.wheel(wh[0], wh[1], 150, '#3a2410', '#fff0a8'); sparks(p, 200, pal.rim, 500, 100, 1700, 800);
  });
  day('4', 'Bhima among the Elephants', 'An elephant division is sent to crush him. He gets down from his chariot with the mace.', PAL.blood, { flare: [1200, 300] }, (p, pal) => {
    bg(p, pal, { disc: [1200, 300, 90], clouds: 8 }); field(p, pal, 9); L(p, pal, 0.7, q => { earth(q, 860, 4); for (const [x, f] of [[420, 1], [900, 1], [1560, -1], [2050, -1]]) jumbo(q, x, 870, 460, f); }, true); haze(p, pal, 0.3, 560, 920);
    L(p, pal, 1, q => { earth(q, 920, 6); F(q, 1200, 920, 470, BIG, { f: 1, lN: [34, 0], lF: [-30, -34], aN: [150, 170], aF: [130, 160], prop: { type: 'mace', hand: 'N', ang: 150, len: 0.34 } }); jumbo(q, 2300, 990, 520, -1); }, 4); for (let i = 0; i < 26; i++) p.circ(p.rr(200, 2200), p.rr(760, 920), p.rr(50, 130), pal.fog, 0.25);
  });
  day('5', 'A Sea of Spears', 'Formation answers formation: the crocodile against the hawk. From inside it is only iron and dust.', PAL.gold, { flare: [1200, 480] }, (p, pal) => {
    bg(p, pal, { disc: [1200, 480, 140] }); field(p, pal, 11); L(p, pal, 0.65, q => { earth(q, 840, 4); army(q, 0, W, 860, 120, 90, 1, { spears: 1, banners: 0.12 }); }, true); haze(p, pal, 0.35, 500, 900);
    L(p, pal, 1, q => { for (let i = 0; i < 46; i++) { const x = i * 54 + q.rr(-20, 20), top = q.rr(120, 520); q.line(x, 1000, x + q.rr(-30, 30), top, q.rr(6, 12), '#000'); q.poly([[x - 14, top + 50], [x + 14, top + 50], [x, top - 30]], '#000'); if (i % 6 === 0) q.ribbon([[x, top + 60], [x + 80, top + 80], [x + 160, top + 50], [x + 240, top + 90]], 70, '#000'); } army(q, 0, W, 1010, 200, 30, 1, { spears: 0 }); }, 4);
  });
  day('6', 'Mud', 'By the sixth day the field is a marsh. Chariots stick; men fight on foot with whatever is left in their hands.', PAL.teal, { flare: [1800, 260] }, (p, pal) => {
    bg(p, pal, { clouds: 12 }); field(p, pal, 13); L(p, pal, 1, q => { earth(q, 900, 8, 26); q.c.save(); q.c.translate(700, 900); q.c.rotate(-0.14); car(q, 0, 0, 260, 1, { horses: 0 }); q.c.restore(); q.quad(1000, 900, 200, { kind: 'horse', f: 1, col: '#333', gait: 'leap' }); F(q, 1450, 900, 400, WAR, { f: 1, lean: 16, aN: [140, 160], lN: [34, 0], lF: [-30, -34], prop: { type: 'sword', hand: 'N', ang: 160, len: 0.44 } }); F(q, 1760, 900, 400, WAR, { f: -1, lean: 16, aN: [120, 150], lN: [34, 0], lF: [-30, -34], prop: { type: 'sword', hand: 'N', ang: 150, len: 0.44 } }); F(q, 2100, 904, 300, WAR, LIE, { f: 1 }); q.wheel(300, 930, 110, '#000', '#000'); }, 4); rain(p, 1100, '#e4fff2');
  });
  day('7', 'Seven Duels', 'The battle breaks into pairs: teacher and pupil, uncle and nephew, each man seeking the one he was born to meet.', PAL.violet, { flare: [1200, 520] }, (p, pal) => {
    bg(p, pal, { disc: [1200, 520, 100], clouds: 6 }); field(p, pal, 15); const pair = (q, x, y, h) => { F(q, x - h * 0.5, y, h, WAR, ARCH, { f: 1, prop: BOW }); F(q, x + h * 0.5, y, h, WAR, ARCH, { f: -1, prop: BOW }); };
    L(p, pal, 0.5, q => { earth(q, 780, 3); pair(q, 500, 786, 110); pair(q, 1500, 790, 120); pair(q, 2100, 786, 100); }); haze(p, pal, 0.3, 560, 840); L(p, pal, 0.75, q => { earth(q, 850, 4); pair(q, 900, 856, 200); pair(q, 1900, 860, 210); }, true); haze(p, pal, 0.2, 640, 920);
    L(p, pal, 1, q => { earth(q, 930, 5); pair(q, 1200, 934, 380); pair(q, 260, 950, 300); }, 4); p.volley(20, 1050, 600, 1350, 660, 0, 90, pal.rim, 3, 30);
  });
  day('8', 'Sorcery', 'Ghatotkacha, son of Bhima and a forest demoness, fills the sky with phantoms, and a whole wing of the Kaurava army runs.', PAL.night, { flare: [1200, 300] }, (p, pal) => {
    bg(p, pal, { stars: 200, clouds: 8 }); L(p, pal, 0.3, q => { for (const [x, y, h, f] of [[500, 300, 520, 1], [1250, 240, 700, -1], [1950, 320, 480, -1]]) F(q, x, y, h, BIG, { fly: true, f: f, crown: 'horns', lean: 30, aN: [150, 110], aF: [120, 160], lN: [-30, -70], lF: [10, -50], longhair: true }); }); haze(p, pal, 0.35); for (const x of [500, 1250, 1950]) scr(p, () => p.glow(x, 200, 90, '#ff5a3a', 0.9)); field(p, pal, 17);
    L(p, pal, 1, q => { earth(q, 900, 6); for (let i = 0; i < 16; i++) F(q, 150 + i * 145, 900 + q.rr(-8, 8), 250, WAR, RUN, { f: 1, aN: [150, 170], aF: [120, 160], crown: 'helmet' }); }, 4); for (let i = 0; i < 40; i++) p.fire(p.rr(0, W), p.rr(700, 780), 16, 40);
  });
  day('9', 'The Question', 'That night the Pandavas walk unarmed into the enemy camp and ask their grandfather how he can be killed. He tells them.', PAL.ember, { flare: [1200, 600] }, (p, pal) => {
    bg(p, pal, { stars: 200 }); L(p, pal, 0.4, q => { earth(q, 780, 3); for (let i = 0; i < 12; i++) q.poly([[i * 220 - 60, 790], [i * 220 + 40, 620], [i * 220 + 140, 790]], '#000'); }); for (let i = 0; i < 30; i++) p.lamp(p.rr(0, W), p.rr(740, 790), 6); haze(p, pal, 0.25, 500, 860);
    scr(p, () => p.glow(1200, 640, 620, '#ffb050', 0.9)); L(p, pal, 0.85, q => q.poly([[600, 940], [1200, 200], [1800, 940]], '#000')); p.poly([[760, 940], [1200, 330], [1640, 940]], T(pal, 0.25)); scr(p, () => p.glow(1200, 700, 420, '#ffc070', 0.9)); p.lamp(1200, 880, 22);
    L(p, pal, 1, q => { earth(q, 940, 3, 3); F(q, 1420, 940, 380, OLD, SIT, { f: -1, aN: [70, 110] }); for (let i = 0; i < 5; i++) F(q, 1040 - i * 110, 940, 300 - i * 6, WAR, KNEEL, PRAY, { f: 1, head: -10, crown: 'bun' }); F(q, 440, 940, 380, KR, { f: 1 }); }, 4);
  });
  day('10', 'The Bed of Arrows', 'He falls with so many shafts in him that his body never touches the earth. Both armies stop.', PAL.dawn, { flare: [1700, 560] }, (p, pal) => {
    bg(p, pal, { disc: [1700, 560, 130], clouds: 8 }); field(p, pal, 19); L(p, pal, 1, q => { earth(q, 920, 5); for (let i = 0; i < 80; i++) { const x = 820 + i * 10 + q.rr(-5, 5); q.line(x, 930, x + q.rr(-26, 26), 730 + q.rr(-20, 20), 4, '#000'); } F(q, 1200, 760, 620, OLD, LIE, { f: 1, head: -18 }); for (let i = 0; i < 30; i++) { const x = 900 + i * 22; q.arrow(x + q.rr(-40, 40), 560 + q.rr(-40, 20), x, 720 + q.rr(-10, 16), '#000', 4); }
      for (const [x, f] of [[300, 1], [460, 1], [620, 1], [1860, -1], [2020, -1], [2180, -1]]) F(q, x, 930, 330, WAR, { f: f }, BOWED); }, 4);
    scr(p, () => p.glow(1640, 760, 140, '#d6f0ff', 0.9)); p.tube([[1650, 930], [1640, 780], [1590, 720], [1540, 750]], 16, 5, '#e6f6ff'); p.birds(24, 200, 60, 2200, 380, '#05030a', 10);
  });
  day('11', 'The Teacher Commands', 'Drona takes the army and promises to bring Yudhishthira back alive. Only Arjuna stands in the way of that promise.', PAL.ember, { flare: [1900, 380] }, (p, pal) => {
    bg(p, pal, { disc: [1900, 380, 90], clouds: 7 }); field(p, pal, 21); L(p, pal, 1, q => { earth(q, 900, 6); const d = car(q, 1750, 890, 260, -1, { horses: 4 }); F(q, d.x, d.y, 320, OLD, ARCH, { f: -1, crown: 'bun', prop: BOW }); const e = car(q, 420, 890, 220, -1, { horses: 3 }); F(q, e.x, e.y, 270, WAR, { f: 1, aN: [150, 170] }); const a = car(q, 1050, 900, 240, 1, { horses: 4 }); F(q, a.x, a.y, 300, WAR, ARCH, { f: 1, prop: BOW }); }, 4);
    p.volley(50, 1250, 400, 1600, 760, 0, 110, pal.rim, 3, 14); p.volley(50, 1250, 400, 1600, 760, 180, 110, '#ff9a5a', 3, 14);
  });
  day('12', 'The Garland', 'Bhagadatta on his war elephant hurls a weapon no one can survive. Krishna steps in front of Arjuna, and it falls on his chest as flowers.', PAL.violet, { flare: [1020, 520] }, (p, pal) => {
    bg(p, pal, { clouds: 8 }); field(p, pal, 23); let K; L(p, pal, 1, q => { earth(q, 910, 6); const e = jumbo(q, 1800, 910, 640, -1); F(q, e.back[0], e.back[1] + 30, 260, OLD, SIT, { f: -1, aN: [150, 120] }); const d = car(q, 560, 900, 250, 1, { horses: 4 }); F(q, d.x - 40, d.y, 300, WAR, { f: 1, lean: -10 }); K = F(q, d.x + 110, d.y, 330, KR, { f: 1, aN: [20, 40], aF: [-20, 10], lean: -6 }); }, 4);
    scr(p, () => { p.glow(K.sh[0] + 30, K.sh[1] + 60, 300, '#ffc8e8', 0.95); p.rays(K.sh[0] + 30, K.sh[1] + 60, 20, 700, '#ffe0f0', 0.25); }); for (let i = 0; i < 22; i++) { const a = i / 22 * 6.283; p.circ(K.sh[0] + 20 + Math.cos(a) * 60, K.sh[1] + 90 + Math.sin(a) * 100, 14, i % 2 ? '#fff6fa' : '#ff8ab8'); } p.curve([[1500, 420], [1200, 440], [900, 520]], 6, '#fff0f8', 0.7); sparks(p, 160, ['#ffc8e8', '#ffffff'], 500, 300, 1500, 800, 6);
  });
  day('13', 'The Wheel', 'Abhimanyu, sixteen, knows the way into the spinning formation and not the way out. Disarmed, he lifts a chariot wheel.', PAL.blood, { flare: [1200, 420] }, (p, pal) => {
    bg(p, pal, { clouds: 6 }); for (let r = 5; r >= 1; r--) { L(p, pal, 0.25 + (5 - r) * 0.12, q => { const rx = 260 + r * 230, ry = 60 + r * 46, n = 20 + r * 14; for (let i = 0; i < n; i++) { const a = i / n * 6.283; if (Math.sin(a) > 0.25) continue; q.mini(1200 + Math.cos(a) * rx, 760 + Math.sin(a) * ry, 150 - r * 18, '#000', { spear: true, banner: i % 9 === 0 ? '#000' : null, dir: 1 }); } }); haze(p, pal, 0.1); }
    let wh; L(p, pal, 1, q => { earth(q, 900, 4, 4); const A = F(q, 1200, 900, 400, WAR, UP, { f: 1, lN: [24, 4], lF: [-22, -8] }); wh = [(A.hN[0] + A.hF[0]) / 2, A.hN[1] - 96]; for (const [x, f] of [[620, 1], [860, 1], [1560, -1], [1800, -1]]) F(q, x, 910, 330, WAR, ARCH, { f: f, prop: BOW }); q.poly([[900, 900], [1080, 880], [1100, 930], [920, 950]], '#000'); for (let r = 0; r < 2; r++) army(q, r ? 1900 : -40, r ? W + 40 : 500, 1000, 220, 14, r ? -1 : 1); }, 4);
    scr(p, () => { p.glow(wh[0], wh[1], 380, '#fff0b8', 0.95); p.rays(wh[0], wh[1], 30, 800, '#fff3c0', 0.3); }); p.wheel(wh[0], wh[1], 120, '#2a1408', '#fff0a8'); for (let i = 0; i < 14; i++) { const a = Math.PI + i / 13 * Math.PI; p.arrow(1200 + Math.cos(a) * 560, 640 + Math.sin(a) * 300, 1200 + Math.cos(a) * 250, 700 + Math.sin(a) * 130, pal.rim, 3); }
  });
  day('14', 'The Sun Goes Out', 'Arjuna has sworn to kill Jayadratha before sunset or burn. Krishna darkens the sun; the hidden man looks up.', PAL.night, { flare: [1500, 330] }, (p, pal) => {
    bg(p, pal, { stars: 200, clouds: 7 }); scr(p, () => p.glow(1500, 330, 700, '#ffb070', 0.8)); p.circ(1500, 330, 190, '#ffe6a8'); p.circ(1470, 330, 192, '#070a20'); p.c.strokeStyle = '#fff6c8'; p.c.lineWidth = 14; p.c.beginPath(); p.c.arc(1470, 330, 200, 0, 6.3); p.c.stroke(); for (let i = 0; i < 28; i++) { const a = i / 28 * 6.283; p.line(1470 + Math.cos(a) * 208, 330 + Math.sin(a) * 208, 1470 + Math.cos(a) * p.rr(250, 340), 330 + Math.sin(a) * p.rr(250, 340), 6, '#fff0b0'); }
    field(p, pal, 25); L(p, pal, 1, q => { earth(q, 900, 6); const d = car(q, 520, 890, 260, 1, { horses: 4 }); F(q, d.x + 10, d.y, 320, WAR, ARCH, { f: 1, lean: -10, prop: BOW }); F(q, d.x + 130, d.y, 300, KR, { f: 1, aN: [150, 170] }); F(q, 1900, 900, 360, WAR, { f: -1, head: -36, aN: [150, 170], lean: -6 }); army(q, 2050, W, 990, 180, 10, -1); }, 4);
  });
  day('14 · night', 'Torches', 'For the first time the war does not stop at dark. Ghatotkacha grows mountainous, and Karna spends the one spear he was saving.', PAL.night, { flare: [1300, 360] }, (p, pal) => {
    bg(p, pal, { stars: 300 }); L(p, pal, 0.55, q => F(q, 1250, 380, 900, BIG, { fly: true, f: -1, crown: 'horns', lean: -62, head: 30, lN: [60, 20], lF: [20, -30], aN: [176, 150], aF: [130, 176], longhair: true }), true);
    scr(p, () => { p.glow(1300, 360, 500, '#ffffff', 0.95); p.rays(1300, 360, 30, 1000, '#ffffff', 0.3); }); p.line(2050, 820, 1310, 366, 14, '#fff6c0'); p.line(2050, 820, 1310, 366, 5, '#ffffff'); field(p, pal, 27); for (let i = 0; i < 260; i++) p.lamp(p.rr(0, W), p.rr(690, 800), 5);
    L(p, pal, 1, q => { earth(q, 910, 6); const d = car(q, 2060, 900, 220, -1, { gait: 'stand', horses: 3 }); F(q, d.x, d.y, 280, WAR, { f: -1, aN: [120, 140], aF: [70, 30] }); army(q, 0, 1500, 990, 160, 30, 1, { arms: 0.5 }); }, 4); for (let i = 0; i < 40; i++) p.lamp(p.rr(0, 1500), p.rr(820, 900), 10);
  });
  day('15', 'A Half-Truth', '"Ashvatthama is dead," says the man who never lied, and under his breath, "the elephant." Drona lays down his bow.', PAL.ash, { flare: [900, 300] }, (p, pal) => {
    bg(p, pal, { disc: [900, 300, 80], clouds: 9 }); field(p, pal, 29); shafts(p, 900, 300, pal, 0.14, 40, 140);
    L(p, pal, 1, q => { earth(q, 910, 6); q.blob([[1700, 910], [1800, 760], [2050, 720], [2300, 800], [2380, 910]], '#000'); q.tube([[1720, 880], [1620, 900], [1560, 870]], 60, 24, '#000'); const d = car(q, 1050, 900, 270, 1, { gait: 'stand', horses: 0 }); F(q, d.x + 20, d.y + 10, 330, OLD, SIT, { f: 1, crown: 'bun', aN: [60, 110], aF: [50, 104] }); F(q, 760, 904, 380, WAR, { f: 1, aN: [160, 174], lN: [34, 0], lF: [-30, -34], prop: { type: 'sword', hand: 'N', ang: 190, len: 0.44 } }); q.curve([[1300, 910], [1340, 800], [1300, 700]], 12, '#000'); const y = car(q, 300, 906, 200, 1, { gait: 'stand', horses: 2 }); F(q, y.x, y.y, 240, WAR, { f: 1 }, BOWED); }, 4);
  });
  day('16', 'The Oath Kept', 'Thirteen years after the dice hall, Bhima finds Dushasana on the field.', PAL.blood, { flare: [1200, 300] }, (p, pal) => {
    bg(p, pal, { clouds: 12 }); bolt(p, 1200, 0, 520); field(p, pal, 31); L(p, pal, 1, q => { earth(q, 910, 6, 20); F(q, 1200, 900, 560, BIG, UP, { f: 1, lN: [26, 2], lF: [-26, -6], head: -20 }); F(q, 1300, 930, 420, BIG, LIE, { f: 1 }); q.cap(900, 930, 1020, 880, 30, 70, '#000'); q.circ(1040, 870, 60, '#000'); q.wheel(600, 940, 120, '#000', '#000'); army(q, -40, 420, 1000, 220, 10, 1, { spears: 0.3 }); army(q, 1980, W + 40, 1000, 220, 10, -1, { spears: 0.3 }); }, 4); rain(p, 700, '#ffb070');
  });
  day('17', "Karna's Wheel", 'The earth takes his chariot wheel and a curse takes his memory of the weapons. He climbs down, with his father the Sun going under behind him.', PAL.dawn, { flare: [1650, 560] }, (p, pal) => {
    bg(p, pal, { disc: [1650, 560, 330], clouds: 6 }); field(p, pal, 33); L(p, pal, 1, q => { earth(q, 900, 6); q.c.save(); q.c.translate(1650, 900); q.c.rotate(0.17); car(q, 0, 0, 250, -1, { gait: 'stand', horses: 0 }); q.c.restore(); q.ell(1700, 925, 190, 40, '#000'); q.wheel(1710, 880, 84, '#000', '#000'); F(q, 1850, 940, 360, WAR, KNEEL, { f: -1, lean: 30, aN: [60, 70], aF: [50, 60], head: -30 }); q.quad(1300, 900, 170, { kind: 'horse', f: -1, col: '#333', gait: 'gallop' }); const d = car(q, 460, 890, 260, 1, { horses: 4 }); F(q, d.x + 10, d.y, 320, WAR, ARCH, { f: 1, prop: BOW }); F(q, d.x + 130, d.y, 290, KR, { f: 1, aN: [96, 100] }); }, 4); p.birds(26, 200, 60, 2200, 380, '#05030a', 10);
  });
  day('18', 'The Lake', 'Of eleven armies one man is left, hiding under the water. He comes out to fight Bhima with the mace, as an equal.', PAL.teal, { flare: [1200, 500] }, (p, pal) => {
    bg(p, pal, { disc: [1200, 500, 90], clouds: 7 }); L(p, pal, 0.3, q => { q.ridge({ y: 600, amp: 70, col: '#000', seed: 16 }); q.forest({ x0: 0, x1: W, base: 640, jit: 6, h: 160, n: 40, col: '#000', trunk: '#000' }); }); p.sea(642, T(pal, 0.1), T(pal, 0.7), pal.rim, 1200, 800); haze(p, pal, 0.3, 480, 800);
    let a, b; L(p, pal, 1, q => { earth(q, 900, 6); const B = F(q, 980, 900, 520, BIG, { f: 1, lean: 14, lN: [34, 0], lF: [-30, -34], aN: [150, 170], aF: [130, 160], prop: { type: 'mace', hand: 'N', ang: 150, len: 0.34 } }); const D = F(q, 1430, 900, 510, BIG, { f: -1, lean: 10, lN: [30, 0], lF: [-28, -30], aN: [120, 150], aF: [100, 130], prop: { type: 'mace', hand: 'N', ang: 140, len: 0.34 } }); a = B.hN; F(q, 340, 900, 300, KR, { f: 1, aN: [40, 20] }); for (const x of [1960, 2110, 2250]) F(q, x, 900, 280, WAR, { f: -1 }); q.tree(70, 1040, 1100, { col: '#000', trunk: '#000' }); }, 4);
    scr(p, () => { p.glow(1210, 360, 200, '#ffffff', 0.95); p.rays(1210, 360, 18, 420, '#ffffff', 0.5); });
  });
  shot('After', 'Kurukshetra · The Nineteenth Morning', 'A mother of a hundred sons walks the field and curses the god who let it happen. He bows his head and accepts.', PAL.ash, { flare: [1200, 560] }, (p, pal) => {
    bg(p, pal, { disc: [1200, 560, 70], clouds: 10 }); L(p, pal, 0.3, q => { earth(q, 720, 3, 20); for (let i = 0; i < 30; i++) { const x = q.rr(0, W); q.line(x, 730, x + q.rr(-30, 30), 600 + q.rr(0, 80), 4, '#000'); } }); for (const x of [300, 700, 1500, 1900, 2200]) { p.fire(x, 720, 70, 130); p.smoke(x, 610, 50, 500, T(pal, 0.4), 0.3); } haze(p, pal, 0.45, 420, 800);
    L(p, pal, 1, q => { earth(q, 910, 6, 16); for (let i = 0; i < 22; i++) { const x = q.rr(0, W); q.line(x, 960 + q.rr(-30, 30), x + q.rr(-40, 40), 800 + q.rr(-40, 80), 6, '#000'); } q.wheel(500, 940, 120, '#000', '#000'); q.wheel(2000, 950, 100, '#000', '#000'); F(q, 1040, 910, 430, { skin: '#d9b494', robe: '#f1ece4', drape: '#dcd4cc', longhair: true, crown: 'none', sash: false }, { f: 1, aN: [100, 96], aF: [20, 50], lean: 6 }); F(q, 1400, 910, 460, KR, { f: -1, aN: [36, 126], aF: [30, 120] }, BOWED); }, 4); p.birds(40, 100, 80, 2300, 520, '#05030a', 12);
  });

  Epic.scenes.chhaya = S;
})();
