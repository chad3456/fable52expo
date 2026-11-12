/* Bharat: portraits of India (epic capitals, royalty, festivals, heritage),
   and "Trimurti", a code recreation of a three-faced divine portrait with a software shader pass. */
(function () {
  'use strict';
  const { mix, lite, dark, css } = Epic;
  const { F, scr, hut, boat, PRAY, KNEEL, SIT, SAGE, KING, HANU } = Epic.kit;
  const { stars, DET, deity, attr } = Epic.front;
  const GOLD = '#f3c65a', GOLD2 = '#fff0a8';

  // ---------- architecture ----------
  function dome(p, x, base, r, col, gold) {
    const s = p.lx < 0 ? 1 : -1;
    p.blob([[x - r, base], [x - r * 1.08, base - r * 0.6], [x - r * 0.55, base - r * 1.25], [x, base - r * 1.6], [x + r * 0.55, base - r * 1.25], [x + r * 1.08, base - r * 0.6], [x + r, base]], dark(col, 0.15));
    p.blob([[x - s * r * 0.85, base], [x - s * r * 0.95, base - r * 0.6], [x - s * r * 0.45, base - r * 1.2], [x, base - r * 1.5], [x - s * r * 0.1, base - r * 0.6], [x - s * r * 0.1, base]], lite(col, 0.28));
    p.line(x, base - r * 1.55, x, base - r * 2.1, Math.max(2, r * 0.06), gold); p.circ(x, base - r * 1.75, r * 0.1, gold);
  }
  function chhatri(p, x, base, s, col, gold) { for (const k of [-1, -0.33, 0.33, 1]) p.rect(x + k * s * 0.42 - s * 0.035, base - s * 0.7, s * 0.07, s * 0.7, k < 0 ? lite(col, 0.2) : col); p.rect(x - s * 0.6, base - s * 0.78, s * 1.2, s * 0.1, lite(col, 0.3)); dome(p, x, base - s * 0.78, s * 0.42, col, gold); }
  function arches(p, x0, x1, base, h, n, col) { const w = (x1 - x0) / n; for (let i = 0; i < n; i++) { const cx = x0 + (i + 0.5) * w; p.rect(cx - w * 0.3, base - h * 0.7, w * 0.6, h * 0.7, col); p.ell(cx, base - h * 0.7, w * 0.3, h * 0.3, col); } }
  function palace(p, x, base, w, h, col, gold, o) {
    o = o || {}; const t = o.tiers || 3; let y = base, ww = w;
    for (let i = 0; i < t; i++) {
      const th = h * (0.42 - i * 0.08); p.rect(x - ww / 2, y - th, ww, th, i % 2 ? lite(col, 0.08) : col); p.rect(p.lx < 0 ? x : x - ww / 2, y - th, ww / 2, th, dark(col, 0.1), 0.6); p.rect(x - ww / 2 - 8, y - th, ww + 16, th * 0.07, lite(col, 0.35));
      arches(p, x - ww * 0.46, x + ww * 0.46, y - th * 0.12, th * 0.62, Math.max(3, Math.round(ww / (o.aw || 70))), o.win || dark(col, 0.45));
      for (const s of [-1, 1]) chhatri(p, x + s * ww * 0.44, y - th, th * 0.5, col, gold); y -= th; ww *= 0.7;
    }
    dome(p, x, y, ww * 0.3, o.domeCol || col, gold); for (const s of [-1, 1]) dome(p, x + s * ww * 0.38, y, ww * 0.13, o.domeCol || col, gold);
    if (o.flag) { p.line(x, y - ww * 0.6, x, y - ww * 0.95, 4, gold); p.ribbon([[x, y - ww * 0.93], [x + 60, y - ww * 0.97], [x + 120, y - ww * 0.9], [x + 170, y - ww * 0.95]], 40, o.flag); }
  }
  function turban(p, J, col, plume) { const r = J.h * 0.058, x = J.head[0], y = J.head[1]; p.ell(x, y - r * 0.85, r * 1.3, r * 0.82, dark(col, 0.2)); p.ell(x + p.lx * r * 0.2, y - r * 0.95, r * 1.05, r * 0.6, col); for (let k = -2; k <= 2; k++) p.curve([[x - r * 1.1, y - r * 0.6 + k * r * 0.1], [x, y - r * 1.3 + k * r * 0.16], [x + r * 1.1, y - r * 0.7]], r * 0.07, lite(col, 0.3), 0.7); p.circ(x, y - r * 1.0, r * 0.2, GOLD); if (plume) p.curve([[x, y - r * 1.1], [x + r * 0.2, y - r * 2], [x - r * 0.4, y - r * 2.6]], r * 0.16, plume); }
  function peacock(p, x, y, s) {
    for (let i = -10; i <= 10; i++) { const a = -1.5708 + i * 0.15, ex = x + Math.cos(a) * s, ey = y + Math.sin(a) * s; p.line(x, y, ex, ey, s * 0.012, '#2f7a5a'); p.ell(ex, ey, s * 0.075, s * 0.11, '#2f9a6a', 1, a + 1.5708); p.ell(ex, ey, s * 0.05, s * 0.07, '#e8c04a', 1, a + 1.5708); p.circ(ex, ey, s * 0.034, '#2a4fb8'); p.circ(ex, ey, s * 0.015, '#17131f'); }
    for (let i = -8; i <= 8; i++) { const a = -1.5708 + i * 0.18, ex = x + Math.cos(a) * s * 0.62, ey = y + Math.sin(a) * s * 0.62; p.ell(ex, ey, s * 0.06, s * 0.09, '#3fb07a', 1, a + 1.5708); p.circ(ex, ey, s * 0.03, '#2a4fb8'); }
    p.ell(x, y + s * 0.02, s * 0.15, s * 0.24, '#1f3f9a'); p.ell(x + p.lx * s * 0.03, y - s * 0.02, s * 0.1, s * 0.18, '#2f5fd0');
    p.tube([[x, y - s * 0.12], [x + s * 0.03, y - s * 0.3], [x - s * 0.02, y - s * 0.44]], s * 0.11, s * 0.05, '#2f5fd0'); p.circ(x - s * 0.03, y - s * 0.46, s * 0.045, '#2f5fd0'); p.poly([[x - s * 0.07, y - s * 0.47], [x - s * 0.14, y - s * 0.44], [x - s * 0.07, y - s * 0.43]], '#e8d8b0'); p.circ(x - s * 0.045, y - s * 0.47, s * 0.01, '#17131f');
    for (let k = -1; k <= 1; k++) { p.line(x - s * 0.02, y - s * 0.5, x - s * 0.02 + k * s * 0.04, y - s * 0.6, s * 0.008, '#2f5fd0'); p.circ(x - s * 0.02 + k * s * 0.04, y - s * 0.6, s * 0.014, '#3fb07a'); }
    for (const k of [-1, 1]) p.line(x + k * s * 0.05, y + s * 0.22, x + k * s * 0.06, y + s * 0.36, s * 0.014, '#8a7a5a');
  }
  const petals = (p, n, cols) => { for (let i = 0; i < n; i++) p.ell(p.rr(0, p.W), p.rr(0, p.H), p.rr(5, 11), p.rr(3, 6), cols[i % cols.length], 0.95, p.rr(0, 3)); };
  // software shader: relief lighting from the luminance gradient, then bloom
  function shade(c, w, h, o) {
    o = o || {}; const im = c.getImageData(0, 0, w, h), d = im.data, L = new Float32Array(w * h), k = o.relief == null ? 0.5 : o.relief;
    for (let i = 0; i < w * h; i++) L[i] = d[i * 4] * 0.3 + d[i * 4 + 1] * 0.59 + d[i * 4 + 2] * 0.11;
    for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) { const i = y * w + x, v = ((L[i - 1] - L[i + 1]) * 0.6 + (L[i - w] - L[i + w]) * 0.8) * k, j = i * 4; d[j] = Math.max(0, Math.min(255, d[j] + v)); d[j + 1] = Math.max(0, Math.min(255, d[j + 1] + v)); d[j + 2] = Math.max(0, Math.min(255, d[j + 2] + v * 0.9)); }
    c.putImageData(im, 0, 0);
    const b = document.createElement('canvas'); b.width = w; b.height = h; const bc = b.getContext('2d'); bc.filter = 'blur(' + Math.round(w / 60) + 'px) contrast(1.7) brightness(0.85)'; bc.drawImage(c.canvas, 0, 0);
    c.globalCompositeOperation = 'screen'; c.globalAlpha = o.bloom == null ? 0.4 : o.bloom; c.drawImage(b, 0, 0); c.globalCompositeOperation = 'source-over'; c.globalAlpha = 1;
  }
  const glowAfter = (c, w, h) => shade(c, w, h, { relief: 0.25, bloom: 0.35 });
  const MAHARAJA = { skin: '#d9a070', cloth: '#f4ead8', cloth2: '#c9302c', top: '#f0c85a', crown: 'none', hair: '#17131f', gold: GOLD };
  const S = [], add = o => S.push(Object.assign({ light: -1, paint: DET }, o));

  // ================= the epic capitals =================
  add({ title: 'Ayodhya on the Sarayu', kanda: 'Kosala: capital of the Ikshvakus', seed: 901,
    text: 'Valmiki\'s Ayodhya: twelve yojanas long, with broad watered roads, seven-storeyed palaces set with gems, gardens of mango, and a river that carries its lamps.',
    draw(p) {
      p.sky(['#6f8fd4', '#b0b4e4', '#f6d4c0', '#fde8b8']); p.sun(1500, 330, 70, '#fff6d0', '#ffd8a0'); p.rays(1500, 330, 30, 1700, '#fff0c8', 0.16); p.clouds({ n: 8, y0: 30, y1: 280, size: 180, col: '#fdf2e8', shadow: '#a8a4d8' });
      p.city({ x0: 0, x1: 2000, base: 560, h: 260, n: 30, col: '#e6cfa8', col2: '#dcb0b0', gold: GOLD2 }); p.fade('#f8e0c8', 0.3);
      palace(p, 1000, 600, 900, 560, '#f0dcb8', GOLD, { tiers: 4, flag: '#e8703a', domeCol: '#f6c85a' }); palace(p, 360, 600, 420, 300, '#e8c8a8', GOLD, { domeCol: '#f0b060' }); palace(p, 1640, 600, 420, 300, '#e8c8a8', GOLD, { domeCol: '#f0b060' });
      for (let i = 0; i < 7; i++) p.rect(0, 600 + i * 12, 2000, 7, i % 2 ? '#d8b898' : '#f0d8b8'); p.crowd({ x0: 0, x1: 2000, y: 640, jit: 8, h: 34, n: 120, col: '#c9463a', col2: '#f0c060', arms: 0.2 });
      p.sea(690, '#f0d0b8', '#5a7ab0', '#fff6d8', 1500); for (const x of [300, 760, 1300, 1750]) boat(p, x, 760 + p.rr(-20, 30), 200, '#6a4638'); for (let i = 0; i < 60; i++) p.lamp(p.rr(0, 2000), p.rr(700, 850), 5);
      for (const x of [80, 1930]) p.tree(x, 880, 620, { col: '#4f7a5a', trunk: '#2a1c22', flowers: '#f6c0d0' }); p.birds(14, 200, 60, 1800, 260, '#5a5880', 8);
    } });
  add({ title: 'Mithila, the Court of Janaka', kanda: 'Videha', seed: 902,
    text: 'The city of the philosopher-king Janaka, where sages debated in open court and a princess was found in a furrow of the earth.',
    draw(p) {
      p.sky(['#d8c8e4', '#f2dcd4', '#fbeacc', '#f8e0b4']); p.sun(400, 260, 80, '#fffbe6', '#ffe8b0'); p.clouds({ n: 6, y0: 30, y1: 240, size: 160, col: '#fff6ee', shadow: '#c8b8d8' });
      p.ridge({ y: 470, amp: 60, col: '#c0c8b8', col2: '#d8d8c0', seed: 4 }); p.forest({ x0: 0, x1: 2000, base: 540, jit: 8, h: 150, n: 34, col: '#9fc09a', col2: '#b8cc90', trunk: '#8a7c74', flowers: '#f6c8d8' });
      palace(p, 1000, 640, 1000, 480, '#f6e8d8', GOLD, { tiers: 3, aw: 90, flag: '#f0c85a', domeCol: '#e8a8b8', win: '#b88a98' });
      for (let i = 0; i < 12; i++) p.ribbon([[420 + i * 100, 420], [440 + i * 100, 470], [420 + i * 100, 520]], 30, i % 2 ? '#f08a1e' : '#f4a0bc', 0.9);
      p.rect(0, 640, 2000, 220, '#e0c8a8'); for (let i = 0; i < 16; i++) p.poly([[1000 + (i - 8) * 70, 640], [1000 + (i - 7) * 70, 640], [1000 + (i - 7) * 300, 860], [1000 + (i - 8) * 300, 860]], i % 2 ? '#d8bc9a' : '#ecd8b8');
      const J = F(p, 1000, 730, 230, KING, { f: 1, robe: '#f1ead8', drape: '#f0c85a', aN: [70, 100] });
      for (let i = 0; i < 5; i++) F(p, 560 + i * 80, 770 + (i % 2) * 14, 190, SAGE, SIT, { f: 1, robe: ['#e88f3c', '#f1ead8', '#c9463a'][i % 3] }); for (let i = 0; i < 5; i++) F(p, 1440 - i * 80, 770 + (i % 2) * 14, 190, SAGE, SIT, { f: -1, robe: ['#f1ead8', '#e88f3c'][i % 2] });
      p.rect(960, 760, 80, 14, '#8a5a3a'); p.rect(950, 746, 100, 16, '#f6ecd0'); for (const x of [140, 1860]) p.tree(x, 880, 640, { col: '#5f8a66', trunk: '#3a2a30', flowers: '#f6c0d0' }); petals(p, 120, ['#fbd0dc', '#fff3c0']);
    } });
  add({ title: 'Lanka of Gold', kanda: 'Kingdom of Ravana', seed: 903, light: 1,
    text: 'Built by Vishvakarma on the triple peak of Trikuta: walls and gateways of gold, towers like autumn clouds, and the sea on every side.',
    draw(p) {
      p.sky([[0, '#1c1c4a'], [0.4, '#5a3a78'], [0.7, '#d87858'], [1, '#fbc878']]); stars(p, 120, 300); p.sun(420, 560, 90, '#fff0c0', '#ff9a60'); p.clouds({ n: 8, y0: 30, y1: 330, size: 210, col: '#6a4a80', shadow: '#2a2050', light: '#f0a070' });
      p.sea(600, '#f0a878', '#33306a', '#ffe0a0', 420);
      const g = p.ridge({ y: 640, amp: 30, col: '#5a4a6a', col2: '#2a2238', seed: 7, x0: 500, x1: 1900, peak: [1200, 420, 300], bottom: 640 }); p.ridge({ y: 640, amp: 20, col: '#4a3a5a', col2: '#2a2238', seed: 8, x0: 500, x1: 1900, peak: [820, 180, 170], bottom: 640 }); p.ridge({ y: 640, amp: 20, col: '#4a3a5a', col2: '#2a2238', seed: 9, x0: 500, x1: 1900, peak: [1580, 180, 190], bottom: 640 });
      scr(p, () => p.glow(1200, 330, 560, '#ffc060', 0.6));
      p.city({ x0: 700, x1: 1700, base: x => g(x) + 30, h: 200, n: 40, col: '#f0c050', col2: '#e89a3a', gold: GOLD2, peakX: 1200, peakW: 260 }); palace(p, 1200, 400, 380, 330, '#f6cc5a', GOLD2, { tiers: 4, flag: '#b8323a', domeCol: '#fff0a0', win: '#8a4a2a' });
      for (let i = 0; i < 140; i++) p.rect(p.rr(720, 1680), p.rr(300, 620), 5, 7, '#fff6c0'); p.wall(560, 1840, 640, 40, '#d8a040'); for (const x of [700, 1200, 1700]) p.gopuram(x, 640, 90, 150, '#e8b048', GOLD2);
      p.waves(680, 840, '#3a3a78', 40, '#ffd8b0'); for (const x of [200, 380]) { boat(p, x, 740, 220, '#2a1c2c'); p.poly([[x, 730], [x, 600], [x + 90, 700]], '#b8323a'); }
      p.birds(16, 100, 80, 1900, 300, '#17121f', 9);
    }, after: glowAfter });
  add({ title: 'Kishkindha', kanda: 'Kingdom of the Vanaras', seed: 904, light: 1,
    text: 'The monkey capital in its country of balanced boulders: a cave city with terraces, orchards and the river Pampa below.',
    draw(p) {
      p.sky(['#7fa8d8', '#b8cce4', '#f0e0c8', '#f8e4b0']); p.sun(1600, 250, 70, '#fff8d8', '#ffe2a8'); p.clouds({ n: 7, y0: 30, y1: 260, size: 170, col: '#fdf6ec', shadow: '#a8b0d4' });
      p.ridge({ y: 520, amp: 120, col: '#b8a488', col2: '#d0bc98', seed: 14, lit: '#e8d6b0' });
      for (let i = 0; i < 90; i++) { const x = p.rr(0, 2000), t = p.r(); p.rock(x, 470 + t * 230, p.rr(60, 200) * (0.5 + t), p.rr(50, 150) * (0.5 + t), mix('#b89a78', '#d8b890', p.r())); }
      p.ell(1000, 560, 190, 150, '#2a1c1c'); p.ell(1000, 580, 150, 120, '#17101a'); scr(p, () => p.glow(1000, 600, 160, '#ffb060', 0.7));
      for (let k = 0; k < 4; k++) { p.rect(700 + k * 50, 640 + k * 30, 600 - k * 100, 30, k % 2 ? '#c8a880' : '#b89870'); } for (const s of [-1, 1]) { p.pavilion(1000 + s * 330, 640, 200, 220, '#c8a070', GOLD); p.shikhara(1000 + s * 520, 660, 90, 260, '#b89068', GOLD); }
      p.sea(760, '#c8dcd8', '#4f8a98', '#fff8dc', 1600); const g = p.ridge({ y: 760, amp: 16, col: '#a8a868', col2: '#6a7448', seed: 5, freq: 0.004, x1: 1100 });
      p.crowd({ x0: 500, x1: 1500, y: 720, jit: 20, h: 60, n: 50, col: '#b07a4a', col2: '#8a6a4a', tail: 1, arms: 0.4 }); F(p, 1000, 716, 150, HANU, { f: 1, aN: [150, 170] });
      for (let i = 0; i < 9; i++) p.tree(p.rr(0, 2000), p.rr(700, 760), p.rr(200, 300), { kind: i % 2 ? 'palm' : 'broad', col: '#5f8a5a', trunk: '#5a4638', flowers: '#f0b040' }); p.birds(12, 100, 60, 1900, 240, '#5a5880', 8);
    } });
  add({ title: 'Hastinapura', kanda: 'Capital of the Kurus', seed: 905,
    text: 'The elephant city on the Ganga, seat of the Kuru throne for which the great war was fought.',
    draw(p) {
      p.sky(['#5a6ab4', '#a89cd4', '#f0c0a8', '#fde0a8']); p.sun(1000, 300, 110, '#fffbe6', '#ffd8a0'); p.rays(1000, 300, 40, 1500, '#fff0c8', 0.18); p.clouds({ n: 8, y0: 20, y1: 260, size: 190, col: '#f6dcd8', shadow: '#9088c4' });
      p.city({ x0: 0, x1: 2000, base: 540, h: 240, n: 30, col: '#c8a8b8', col2: '#d8b8a0', gold: GOLD }); p.fade('#f0c8b0', 0.3);
      palace(p, 1000, 620, 1100, 600, '#d8a888', GOLD, { tiers: 4, aw: 80, flag: '#b8323a', domeCol: '#c9705a', win: '#5a3a44' });
      p.wall(0, 2000, 660, 70, '#b88a70'); p.gopuram(1000, 664, 220, 260, '#c89878', GOLD);
      for (const s of [-1, 1]) for (let k = 0; k < 3; k++) { const e = p.quad(1000 + s * (300 + k * 240), 760 + k * 10, 170 + k * 20, { kind: 'elephant', f: -s, col: '#8a8494', cloth: k % 2 ? '#f0c85a' : '#b8323a' }); }
      p.rect(0, 760, 2000, 100, '#d8b890'); p.crowd({ x0: 0, x1: 2000, y: 800, jit: 20, h: 70, n: 60, col: '#5a4a6a', col2: '#c9a060', spears: 0.5, banners: 0.1, bannerCol: '#b8323a' });
      p.birds(14, 100, 60, 1900, 240, '#3a3055', 8);
    } });
  add({ title: 'Indraprastha', kanda: 'City of the Pandavas', seed: 906, light: 1,
    text: 'Raised on the cleared Khandava forest: white as cloud, moated like the sea, with the crystal assembly hall built by the architect Maya.',
    draw(p) {
      p.sky(['#5f9ad8', '#a8cce8', '#e8f0e8', '#f8f0d0']); p.sun(500, 200, 70, '#ffffff', '#f6f6d8'); p.rays(500, 200, 30, 1600, '#ffffff', 0.16); p.clouds({ n: 8, y0: 30, y1: 300, size: 190, col: '#ffffff', shadow: '#a8c0dc' });
      p.city({ x0: 0, x1: 2000, base: 560, h: 280, n: 34, col: '#dcecf0', col2: '#e8e0f0', gold: '#fff6c8' }); p.fade('#eef6f0', 0.3);
      palace(p, 1000, 620, 960, 600, '#f4fafa', '#f6e0a0', { tiers: 4, aw: 76, flag: '#f0c85a', domeCol: '#a8dce0', win: '#6fa8c0' }); for (const s of [-1, 1]) palace(p, 1000 + s * 700, 620, 360, 300, '#e8f4f6', '#f6e0a0', { domeCol: '#b8e0e0', win: '#6fa8c0' });
      for (let i = 0; i < 90; i++) { const x = p.rr(500, 1500), y = p.rr(100, 600); p.poly([[x, y - 8], [x + 5, y], [x, y + 8], [x - 5, y]], '#ffffff', 0.9); }
      p.sea(640, '#c8e8ec', '#3f8aa8', '#ffffff', 500); for (let i = 0; i < 26; i++) { const x = p.rr(0, 2000), y = p.rr(680, 840); p.ell(x, y, 34, 10, '#6fa890'); if (i % 2) { p.poly([[x - 10, y - 3], [x, y - 30], [x + 10, y - 3]], '#f6a8c0'); } }
      p.rect(880, 640, 240, 220, '#eef6f4'); for (let i = 0; i < 9; i++) p.rect(880, 640 + i * 26, 240, 5, '#c8dcdc');
      for (let i = 0; i < 5; i++) p.eagle(p.rr(200, 1800), p.rr(140, 380), 50, { f: i % 2 ? 1 : -1, col: '#ffffff', crane: true, gold: '#f6c84a', head: '#ffffff', spread: 0.5 });
    } });
  add({ title: 'Dvaraka, the Sea Gate', kanda: 'City of Krishna', seed: 907,
    text: 'The many-gated city Krishna raised on land won from the western ocean, its harbour crowded with ships.',
    draw(p) {
      p.sky(['#4a5aa8', '#8f8cd0', '#f0b8a8', '#fde0a8']); p.sun(1000, 470, 130, '#fff3c0', '#ffb880'); p.rays(1000, 470, 40, 1500, '#ffe6b8', 0.2); p.clouds({ n: 8, y0: 20, y1: 300, size: 200, col: '#f0d0d8', shadow: '#7a74b8', light: '#fff0d8' });
      p.sea(560, '#f6c8a8', '#3a5a98', '#fff2c8', 1000);
      for (const s of [-1, 1]) { p.ridge({ y: 570, amp: 10, col: '#8a7aa0', x0: s < 0 ? 0 : 1250, x1: s < 0 ? 750 : 2000, bottom: 566, seed: 3 }); p.city({ x0: s < 0 ? 0 : 1280, x1: s < 0 ? 720 : 2000, base: 566, h: 300, n: 22, col: '#e8cf8c', col2: '#c9a8c4', gold: GOLD2 }); palace(p, 1000 + s * 560, 566, 420, 420, '#f0d898', GOLD2, { flag: '#f0c85a', domeCol: '#e8a060' }); }
      for (const s of [-1, 1]) { p.gopuram(1000 + s * 230, 600, 150, 420, '#e0b870', GOLD2); p.rect(1000 + s * 230 - 90, 600, 180, 60, '#b89060'); } p.rect(770, 196, 460, 34, '#e0b870'); p.ribbon([[1000, 150], [1080, 130], [1160, 160], [1240, 130]], 50, '#f0c85a'); p.line(1000, 196, 1000, 140, 6, GOLD);
      for (const [x, y, w] of [[1000, 650, 360], [520, 720, 300], [1500, 740, 320], [240, 800, 380]]) { boat(p, x, y, w, '#5a3a34'); p.line(x, y - w * 0.04, x, y - w * 0.7, 6, '#4a3028'); p.poly([[x + 6, y - w * 0.66], [x + w * 0.36, y - w * 0.2], [x + 6, y - w * 0.12]], '#fbf0dc'); p.poly([[x + 6, y - w * 0.66], [x + w * 0.2, y - w * 0.42], [x + 6, y - w * 0.4]], '#f0c85a'); }
      p.waves(700, 850, '#4a6aa8', 36, '#fff0dc'); p.birds(20, 100, 80, 1900, 400, '#f6f1e6', 9);
    } });

  // ================= royalty =================
  add({ title: 'The Royal Procession', kanda: 'Royal India', seed: 908,
    text: 'A king rides out beneath a parasol: elephants in painted cloth, horsemen, drummers and the fort on its hill.',
    draw(p) {
      p.sky(['#6f8fd4', '#b8b8e4', '#f8d0b8', '#fde4a8']); p.sun(300, 300, 70, '#fff6d0', '#ffd8a0'); p.clouds({ n: 7, y0: 30, y1: 260, size: 180, col: '#fdf2e8', shadow: '#a8a4d8' });
      const g = p.ridge({ y: 520, amp: 60, col: '#c8a888', col2: '#d8b898', seed: 12, peak: [1300, 500, 170], lit: '#e8cca8' }); p.wall(900, 1700, 380, 60, '#d8a878'); palace(p, 1300, 360, 520, 300, '#e8b888', GOLD, { flag: '#f08a1e', domeCol: '#f0c890' });
      p.rect(0, 660, 2000, 200, '#e0c090'); p.ridge({ y: 664, amp: 8, col: '#e6c898', col2: '#b89868', seed: 3 });
      for (let k = 0; k < 3; k++) { const x = 1500 - k * 520, e = p.quad(x, 760, 300, { kind: 'elephant', f: -1, col: ['#8a8494', '#7a7486', '#9a94a0'][k], cloth: ['#c9302c', '#2f6f8a', '#f0a030'][k] });
        p.rect(e.back[0] - 80, e.back[1] - 150, 160, 100, ['#f0c85a', '#c9302c', '#2f8f7a'][k]); dome(p, e.back[0], e.back[1] - 150, 70, GOLD, GOLD2); const J = F(p, e.back[0], e.back[1] - 60, 150, MAHARAJA, SIT, { f: -1 }); turban(p, J, ['#c9302c', '#f08a1e', '#f4a0bc'][k], '#fbf6ee');
        if (k === 1) { p.line(e.back[0] + 110, e.back[1] - 40, e.back[0] + 130, e.back[1] - 300, 6, GOLD); p.c.fillStyle = '#fbf0dc'; p.c.beginPath(); p.c.ellipse(e.back[0] + 130, e.back[1] - 300, 130, 56, 0, Math.PI, 6.283); p.c.fill(); } }
      for (let i = 0; i < 5; i++) { const q = p.quad(180 + i * 90, 800 + (i % 2) * 20, 150, { kind: 'horse', f: -1, col: i % 2 ? '#f1ebe0' : '#8a5a3a', gait: 'walk' }); const J = F(p, q.back[0], q.back[1] + 20, 120, MAHARAJA, SIT, { f: -1, prop: { type: 'flag', hand: 'N', ang: 176, len: 0.9, col: i % 2 ? '#f08a1e' : '#c9302c' } }); turban(p, J, '#f0c85a'); }
      p.crowd({ x0: 0, x1: 2000, y: 840, jit: 12, h: 90, n: 40, col: '#c9463a', col2: '#f0c060', arms: 0.4, banners: 0.1, bannerCol: '#f08a1e', head: '#3a2a22' }); petals(p, 200, ['#fbd0dc', '#fff3c0', '#f08a1e']);
    } });
  add({ title: 'The Maharaja and the Maharani', kanda: 'Royal India', w: 1200, h: 1800, seed: 909,
    text: 'A royal portrait in the palace window: jewels, brocade, a sword of state and a lotus.',
    draw(p) {
      p.sky(['#f6c8a0', '#fbdcb8', '#fdeccc', '#fff4dc']); p.sun(600, 520, 300, '#fffbe6', '#ffe0a8'); palace(p, 600, 1200, 1000, 700, '#f0d0b0', GOLD, { tiers: 3, domeCol: '#f0b878' }); p.fade('#f8e0c8', 0.5);
      for (const x of [110, 1090]) p.pillar(x, 1620, 140, 1400, '#c9705a'); const c = p.c; c.strokeStyle = css('#c9705a'); c.lineWidth = 110; c.beginPath(); c.ellipse(600, 300, 490, 250, 0, Math.PI, 6.283); c.stroke(); c.strokeStyle = css(GOLD); c.lineWidth = 14; c.beginPath(); c.ellipse(600, 300, 432, 200, 0, Math.PI, 6.283); c.stroke(); for (let k = 0; k < 9; k++) p.ell(250 + k * 88, 130 - Math.sin(k / 8 * Math.PI) * 60, 26, 36, GOLD);
      p.rect(0, 1560, 1200, 240, '#b8323a'); for (let k = 0; k < 14; k++) p.poly([[k * 90, 1560], [k * 90 + 45, 1620], [k * 90 + 90, 1560]], GOLD); p.rect(0, 1560, 1200, 12, GOLD);
      deity(p, 410, 1600, 1060, { skin: '#d9a070', cloth: '#f4ead8', sash: '#c9302c', mantle: '#2f6f5a', garland: '#fbf6ee', gem: '#c9342f', face: { crown: 'crown', tilak: 'dot', must: '#17131f', hair: '#17131f' }, arms: [{ s: -1, th: 70, ph: 56 }, { s: 1, th: 66, ph: 40, kind: 'sword', k: 1.2 }] });
      deity(p, 800, 1600, 940, { fem: true, skin: '#e8b890', cloth: '#b8244a', top: '#f0c85a', border: GOLD, long: true, hair: '#17131f', garland: '#f4a0bc', face: { crown: 'crown', tilak: 'dot', long: true }, arms: [{ s: -1, th: 70, ph: 56 }, { s: 1, th: 50, ph: -30, kind: 'lotus', k: 0.8 }] });
      petals(p, 120, ['#fbd0dc', '#fff3c0']);
    } });
  add({ title: 'The Lake Palace and the Peacock', kanda: 'Heritage', w: 1200, h: 1800, seed: 910,
    text: 'A white palace afloat on its lake at dusk, and the national bird displaying on the terrace.',
    draw(p) {
      p.sky([[0, '#2a2a6a'], [0.35, '#7a5a98'], [0.6, '#f08a70'], [1, '#fbd088']]); stars(p, 80, 400); p.sun(820, 760, 110, '#fff0c0', '#ff9a60'); p.clouds({ n: 7, y0: 60, y1: 600, size: 200, col: '#8a6a98', shadow: '#3a306a', light: '#f8b080' });
      p.ridge({ y: 860, amp: 120, col: '#6a5a88', col2: '#9a6a88', seed: 6 }); p.sea(880, '#f8b890', '#3a3a7a', '#ffe8b0', 820, 1500);
      palace(p, 560, 940, 760, 420, '#fbf4ea', GOLD, { tiers: 3, domeCol: '#f6e6d0', win: '#8a6a8a' }); p.c.globalAlpha = 0.35; p.c.save(); p.c.translate(0, 1880); p.c.scale(1, -1); palace(p, 560, 940, 760, 300, '#f0d8d0', GOLD, { tiers: 2, win: '#8a6a8a' }); p.c.restore(); p.c.globalAlpha = 1;
      for (let i = 0; i < 40; i++) p.lamp(p.rr(200, 920), p.rr(960, 1100), 5); boat(p, 950, 1180, 220, '#2a1c2c');
      p.rect(0, 1500, 1200, 300, '#e8d0c0'); for (let k = 0; k < 14; k++) { p.rect(20 + k * 88, 1420, 22, 90, '#f6e6d8'); p.ell(31 + k * 88, 1460, 16, 30, '#f6e6d8'); } p.rect(0, 1400, 1200, 26, '#fbf0e4'); p.rect(0, 1500, 1200, 14, '#fbf0e4');
      peacock(p, 600, 1380, 560); for (const x of [80, 1120]) p.lamp(x, 1390, 18);
    }, after: glowAfter });

  // ================= festivals and living culture =================
  add({ title: 'Diwali', kanda: 'Festival of lamps', w: 1200, h: 1800, seed: 911,
    text: 'The night Ayodhya lit a lamp for every step of its king\'s road home, kept ever since in every doorway.',
    draw(p) {
      p.sky([[0, '#0c1038'], [0.5, '#2a2470'], [0.8, '#7a3a70'], [1, '#c8605a']]); stars(p, 200, 900);
      for (const [x, y, c2] of [[250, 260, '#ffb0d0'], [900, 200, '#ffe08a'], [620, 420, '#a8e0ff'], [1040, 520, '#c0ffb0']]) scr(p, () => { p.glow(x, y, 190, c2, 0.8); p.rays(x, y, 30, 220, c2, 0.7); });
      palace(p, 600, 1150, 1100, 700, '#5a3a78', GOLD, { tiers: 3, domeCol: '#8a4a80', win: '#ffc860' }); for (let i = 0; i < 200; i++) p.lamp(p.rr(60, 1140), p.rr(560, 1150), 5);
      p.rect(0, 1150, 1200, 650, '#3a2450'); for (let i = 0; i < 7; i++) p.rect(0, 1150 + i * 26, 1200, 12, '#5a3a70');
      const c = p.c; for (let r = 6; r >= 1; r--) { c.fillStyle = css(['#f08a1e', '#f6e08a', '#e8508a', '#3fa07a', '#fbf6ee', '#c9302c'][r - 1]); c.beginPath(); for (let k = 0; k < 16; k++) { const a = k / 16 * 6.283, rr = r * 44 * (k % 2 ? 1 : 0.8); c.lineTo(600 + Math.cos(a) * rr * 1.5, 1640 + Math.sin(a) * rr * 0.55); } c.fill(); }
      const J = deity(p, 600, 1560, 860, { fem: true, skin: '#e8b890', cloth: '#c9302c', top: '#f0a030', border: GOLD, long: true, hair: '#17131f', halo: '#ffc860', face: { crown: 'none', tilak: 'dot', long: true }, arms: [{ s: -1, th: 60, ph: -10 }, { s: 1, th: 60, ph: -10 }] });
      const hx = 600, hy = J.hands[0][1] + 6; p.ell(hx, hy, 150, 34, '#b8863a'); p.ell(hx, hy - 8, 130, 22, GOLD); for (let k = -2; k <= 2; k++) p.lamp(hx + k * 50, hy - 12, 14); scr(p, () => p.glow(hx, hy - 60, 300, '#ffc060', 0.8));
      for (let i = 0; i < 26; i++) p.lamp(p.rr(40, 1160), p.rr(1580, 1780), 12);
    }, after: glowAfter });
  add({ title: 'Holi', kanda: 'Festival of colours', seed: 912,
    text: 'Spring arrives as a cloud of colour in the lanes of Braj, where it is still played as Krishna played it.',
    draw(p) {
      p.sky(['#8fb8e8', '#c8d8f0', '#f6e6d8', '#fdeed0']); palace(p, 1000, 600, 1500, 520, '#f0d8b8', GOLD, { tiers: 2, aw: 90, domeCol: '#e8a070' }); p.rect(0, 600, 2000, 260, '#e8d0b0');
      const C = ['#f0408a', '#f6c81e', '#3fb06a', '#3f7ae0', '#f0701e', '#a04ad0'];
      for (let i = 0; i < 70; i++) p.circ(p.rr(0, 2000), p.rr(200, 760), p.rr(60, 200), C[i % 6], 0.3);
      for (let r = 0; r < 3; r++) for (let i = 0; i < 14; i++) { const x = 70 + i * 140 + r * 46, y = 700 + r * 60; F(p, x, y, 170 + r * 30, { skin: '#c98d62', cloth: '#fbf6ee', cloth2: C[(i + r) % 6], top: '#fbf6ee', crown: 'bun', plain: true, hair: '#17131f' }, { f: i % 2 ? 1 : -1, aN: [p.rr(110, 170), p.rr(120, 175)], aF: [p.rr(60, 150), p.rr(80, 160)], lN: [22, 5], lF: [-20, -26], lean: p.rr(-10, 14) }); p.circ(x + p.rr(-40, 40), y - 150 - r * 30, p.rr(30, 60), C[(i * 2 + r) % 6], 0.5); }
      for (let i = 0; i < 50; i++) p.circ(p.rr(0, 2000), p.rr(300, 860), p.rr(40, 130), C[i % 6], 0.28); for (let i = 0; i < 500; i++) p.rect(p.rr(0, 2000), p.rr(100, 860), p.rr(3, 9), p.rr(3, 9), C[i % 6], 0.9);
    } });
  add({ title: 'The Dancer', kanda: 'Classical arts', w: 1200, h: 1800, seed: 913,
    text: 'A temple dancer before the gateway tower: a living tradition older than the stone behind her.',
    draw(p) {
      p.sky(['#f08a5a', '#f8b078', '#fbd4a0', '#fdeac4']); p.sun(600, 700, 360, '#fffbe6', '#ffd890'); p.rays(600, 700, 50, 1700, '#fff6d0', 0.2);
      p.gopuram(600, 1500, 620, 1380, '#c98a6a', GOLD); for (const s of [-1, 1]) { p.gopuram(600 + s * 460, 1500, 260, 700, '#b87a60', GOLD); p.tree(600 + s * 540, 1560, 700, { kind: 'palm', col: '#4f7a4a', trunk: '#5a4030' }); } p.fade('#f8c890', 0.35);
      p.rect(0, 1500, 1200, 300, '#a86a50'); for (let i = 0; i < 6; i++) p.rect(0, 1500 + i * 30, 1200, 14, '#c88a68');
      const J = deity(p, 600, 1620, 1040, { fem: true, skin: '#d9a078', cloth: '#c9302c', top: '#2f8f5a', border: GOLD, long: false, garland: null, halo: '#fff0c0', face: { crown: 'crown', tilak: 'dot', hair: '#17131f' }, arms: [{ s: -1, th: -24, ph: -110, L2: 150 }, { s: 1, th: 30, ph: -50, L2: 150 }] });
      for (let k = -4; k <= 4; k++) p.poly([[600 + k * 30, 1180], [600 + k * 62 - 22, 1500], [600 + k * 62 + 22, 1500]], k % 2 ? GOLD : '#f08a1e'); for (const hd of J.hands) { p.circ(hd[0], hd[1], 30, '#d9a078'); p.circ(hd[0], hd[1], 12, '#c9302c'); }
      p.blob([[J.head[0] + 50, J.head[1] - 20], [J.head[0] + 120, J.head[1] + 60], [J.head[0] + 100, J.head[1] + 330], [J.head[0] + 60, J.head[1] + 200]], '#17131f'); for (let k = 0; k < 9; k++) p.circ(J.head[0] + 96 - k * 2, J.head[1] + 60 + k * 30, 12, k % 2 ? '#fbf6ee' : '#f08a1e');
      for (const x of [160, 1040]) { p.rect(x - 14, 1300, 28, 300, '#b8863a'); for (let k = 0; k < 4; k++) { p.ell(x, 1300 + k * 70, 60 - k * 6, 12, GOLD); p.lamp(x - 30, 1292 + k * 70, 9); p.lamp(x + 30, 1292 + k * 70, 9); } } petals(p, 160, ['#fbd0dc', '#fff3c0', '#f08a1e']);
    } });
  add({ title: 'Ganga Aarti', kanda: 'Kashi', seed: 914,
    text: 'Evening worship on the steps of the oldest living city: fire offered to the river that carries the lamps away.',
    draw(p) {
      p.sky([[0, '#0c1038'], [0.5, '#2c2a78'], [0.8, '#8a4a80'], [1, '#f09a60']]); stars(p, 260, 400);
      for (let i = 0; i < 16; i++) { const x = 60 + i * 126; if (i % 3 === 0) p.shikhara(x, 470, 90, p.rr(260, 380), '#6a4a78', GOLD); else if (i % 3 === 1) palace(p, x, 470, 150, p.rr(200, 300), '#7a5a80', GOLD, { tiers: 2, win: '#ffc860' }); else p.block(x, 470, 120, p.rr(140, 240), '#5a4470'); }
      for (let i = 0; i < 120; i++) p.rect(p.rr(0, 2000), p.rr(200, 460), 5, 7, '#ffd98a'); for (let i = 0; i < 9; i++) p.rect(0, 470 + i * 16, 2000, 9, i % 2 ? '#6a4a78' : '#8a6088');
      p.crowd({ x0: 0, x1: 2000, y: 560, jit: 30, h: 46, n: 200, col: '#3a2a5a', col2: '#7a4a5a', arms: 0.3 });
      for (let i = 0; i < 7; i++) { const x = 220 + i * 260; p.rect(x - 70, 600, 140, 26, '#c9705a'); const J = F(p, x, 600, 190, { skin: '#c98d62', cloth: '#f08a1e', cloth2: '#f6e08a', top: '#c9302c', crown: 'bun', hair: '#17131f' }, { f: i % 2 ? 1 : -1, aN: [150, 170], aF: [130, 160] }); scr(p, () => p.glow(J.hN[0], J.hN[1] - 60, 150, '#ffb050', 0.9)); for (let k = 0; k < 3; k++) p.ell(J.hN[0], J.hN[1] - 10 - k * 22, 34 - k * 8, 7, GOLD); p.fire(J.hN[0], J.hN[1] - 60, 40, 80); p.smoke(J.hN[0], J.hN[1] - 130, 26, 220, '#6a5a80', 0.2); }
      p.sea(640, '#c8708a', '#1c1c50', '#ffd98a', 1000); for (let i = 0; i < 160; i++) { const y = p.rr(660, 850); p.lamp(p.rr(0, 2000), y, 4 + (y - 660) / 26); } for (const x of [300, 1000, 1650]) { boat(p, x, 760, 300, '#17101f'); p.crowd({ x0: x - 110, x1: x + 110, y: 756, h: 46, n: 9, col: '#17101f' }); }
    }, after: glowAfter });
  add({ title: 'Rath Yatra', kanda: 'Chariot festival', w: 1200, h: 1800, seed: 915,
    text: 'Once a year the god leaves the temple on a chariot as tall as a house, and anyone at all may take the rope.',
    draw(p) {
      p.sky(['#5f8fd8', '#a8c8ec', '#f0e4d8', '#fde8c0']); p.clouds({ n: 8, y0: 40, y1: 520, size: 210, col: '#ffffff', shadow: '#a8b8dc' }); p.shikhara(1010, 900, 300, 760, '#e0d0c0', GOLD); p.fade('#eef0f0', 0.35);
      const cx = 560; for (let k = 0; k < 9; k++) { const t = k / 9, w = 560 * (1 - t * 0.86), y = 1200 - t * 860, h2 = 860 / 9 + 2; p.poly([[cx - w / 2, y], [cx + w / 2, y], [cx + w * 0.44, y - h2], [cx - w * 0.44, y - h2]], k % 2 ? '#f6c81e' : '#c9302c'); p.poly([[cx - w / 2, y], [cx - w * 0.2, y], [cx - w * 0.18, y - h2], [cx - w * 0.44, y - h2]], k % 2 ? '#fbe07a' : '#e0503a'); p.rect(cx - w / 2, y - 8, w, 8, GOLD); }
      p.ell(cx, 330, 50, 40, GOLD); p.line(cx, 300, cx, 180, 8, GOLD); p.ribbon([[cx, 190], [cx + 90, 170], [cx + 180, 210], [cx + 270, 180]], 70, '#f08a1e');
      p.rect(cx - 330, 1200, 660, 130, '#8a4a2a'); p.rect(cx - 350, 1190, 700, 24, GOLD); arches(p, cx - 300, cx + 300, 1320, 110, 7, '#3a1c14'); scr(p, () => p.glow(cx, 1260, 160, '#ffd070', 0.8)); p.circ(cx, 1262, 40, '#17131f'); for (const s of [-1, 1]) p.circ(cx + s * 14, 1256, 11, '#ffffff');
      for (let k = 0; k < 5; k++) p.wheel(cx - 280 + k * 140, 1400, 82, '#5a2f1c', GOLD); for (let k = 0; k < 20; k++) p.ribbon([[cx - 320 + k * 34, 1190], [cx - 316 + k * 34, 1130]], 26, k % 2 ? '#2f8f5a' : '#f6c81e');
      for (const s of [-1, 0, 1]) p.curve([[cx + s * 200, 1380], [cx + s * 330, 1560], [cx + s * 520, 1800]], 12, '#d8c090');
      for (let r = 0; r < 6; r++) p.crowd({ x0: -20, x1: 1220, y: 1500 + r * 56, jit: 20, h: 90 + r * 26, n: 30, col: ['#c9463a', '#f0a030', '#fbf6ee', '#3f7a8a'][r % 4], col2: '#f0d0a0', arms: 0.7, head: '#3a2a22' }); petals(p, 300, ['#fbd0dc', '#fff3c0', '#f08a1e', '#ffffff']);
    } });
  add({ title: 'Nalanda', kanda: 'Civilisation', seed: 916,
    text: 'For seven centuries students crossed Asia to study here: nine storeys of library, and a debate at the gate before you were let in.',
    draw(p) {
      p.sky(['#7fa8d8', '#c0cce4', '#f6dcc0', '#fde4a8']); p.sun(1600, 320, 90, '#fff6d0', '#ffd8a0'); p.rays(1600, 320, 30, 1700, '#fff0c8', 0.16); p.clouds({ n: 6, y0: 30, y1: 240, size: 170, col: '#fdf2e8', shadow: '#a8acd8' });
      p.ridge({ y: 500, amp: 60, col: '#a8b8a8', col2: '#c8c8a8', seed: 4 }); p.forest({ x0: 0, x1: 2000, base: 560, jit: 8, h: 160, n: 30, col: '#8fb08a', col2: '#a8bc80', trunk: '#7a6c64' });
      for (let k = 0; k < 6; k++) { const w = 700 - k * 100, y = 640 - k * 70; p.rect(1000 - w / 2, y - 70, w, 70, k % 2 ? '#b8603a' : '#a8502e'); p.rect(1000 - w / 2, y - 70, w, 9, '#d88a5a'); arches(p, 1000 - w * 0.46, 1000 + w * 0.46, y - 6, 56, Math.max(3, Math.round(w / 80)), '#5a2a1c'); } dome(p, 1000, 220, 90, '#c8703a', GOLD);
      for (const s of [-1, 1]) { for (let k = 0; k < 4; k++) { const x = 1000 + s * (480 + k * 150); p.rect(x - 60, 520, 120, 120, '#b0583a'); p.rect(x - 66, 512, 132, 12, '#d88a5a'); dome(p, x, 512, 46, '#c06a40', GOLD); } }
      p.rect(0, 640, 2000, 220, '#d8b890'); p.poly([[900, 640], [1100, 640], [1300, 860], [700, 860]], '#e8ccA0'.toLowerCase());
      for (let i = 0; i < 12; i++) { const x = 160 + i * 150, sit = i % 3 !== 0; F(p, x, sit ? 790 : 780, sit ? 190 : 230, SAGE, sit ? SIT : {}, { f: i < 6 ? 1 : -1, robe: i % 2 ? '#8a2a2a' : '#e88f3c', beard: null, hair: '#3a2a22', aN: sit ? [70, 100] : [20, 50] }); if (sit) { p.rect(x + (i < 6 ? 30 : -90), 770, 60, 8, '#f6ecd0'); } }
      for (const x of [60, 1940]) p.tree(x, 880, 660, { col: '#4f7a5a', trunk: '#2a1c22' }); p.birds(12, 100, 60, 1900, 240, '#5a5880', 8);
    } });

  // ================= Trimurti: a code recreation =================
  function fpath(c, pts) { const n = pts.length; c.beginPath(); c.moveTo((pts[n - 1][0] + pts[0][0]) / 2, (pts[n - 1][1] + pts[0][1]) / 2); for (let i = 0; i < n; i++) { const a = pts[i], b = pts[(i + 1) % n]; c.quadraticCurveTo(a[0], a[1], (a[0] + b[0]) / 2, (a[1] + b[1]) / 2); } c.closePath(); }
  // a shaded three-quarter profile, facing left, eyes lowered
  function profile(p, x, y, s, o) {
    const c = p.c, sk = o.skin, M = q => [x + q[0] * s, y + q[1] * s], dk = o.line || dark(sk, 0.72);
    const O = [[-0.1, -1.02], [-0.5, -0.8], [-0.64, -0.46], [-0.62, -0.3], [-0.8, -0.06], [-0.94, 0.1], [-0.74, 0.19], [-0.78, 0.3], [-0.7, 0.38], [-0.74, 0.5], [-0.64, 0.6], [-0.63, 0.8], [-0.42, 0.97], [0.05, 0.84], [0.42, 0.5], [0.56, 0], [0.5, -0.6], [0.2, -0.98]].map(M);
    p.blob([M([-0.22, 0.78]), M([0.46, 0.34]), M([0.62, 1.0]), M([0.5, 1.3]), M([0.0, 1.34]), M([-0.12, 1.1])], dark(sk, 0.42)); p.blob([M([-0.2, 0.84]), M([0.1, 0.72]), M([0.12, 1.3]), M([-0.02, 1.32]), M([-0.12, 1.1])], dark(sk, 0.22));
    c.save(); fpath(c, O); c.fillStyle = css(sk); c.fill(); c.clip();
    const g = c.createLinearGradient(x - 0.95 * s, y - 0.2 * s, x + 0.6 * s, y + 0.3 * s); g.addColorStop(0, css(lite(sk, 0.34))); g.addColorStop(0.3, css(sk)); g.addColorStop(0.7, css(dark(sk, 0.28))); g.addColorStop(1, css(dark(sk, 0.55))); c.fillStyle = g; c.fillRect(x - s * 1.3, y - s * 1.3, s * 2.6, s * 2.6);
    p.ell(x - 0.28 * s, y - 0.7 * s, 0.42 * s, 0.2 * s, lite(sk, 0.3), 0.55, -0.35); p.ell(x - 0.34 * s, y + 0.18 * s, 0.24 * s, 0.3 * s, lite(sk, 0.24), 0.6, 0.25); p.ell(x - 0.5 * s, y + 0.74 * s, 0.14 * s, 0.1 * s, lite(sk, 0.2), 0.5);
    p.poly([M([-0.64, -0.42]), M([-0.02, -0.38]), M([0.04, -0.1]), M([-0.5, -0.12])], dark(sk, 0.32), 0.55); p.poly([M([-0.1, 0.1]), M([0.3, -0.3]), M([0.5, 0.5]), M([0.1, 0.8]), M([-0.2, 0.6])], dark(sk, 0.3), 0.45);
    p.poly([M([-0.64, 0.64]), M([0.1, 0.56]), M([0.3, 1.1]), M([-0.5, 1.1])], dark(sk, 0.45), 0.55);
    p.poly([M([-0.62, -0.3]), M([-0.94, 0.1]), M([-0.74, 0.15]), M([-0.56, -0.05])], lite(sk, 0.4), 0.75); p.poly([M([-0.56, -0.05]), M([-0.74, 0.15]), M([-0.54, 0.18]), M([-0.46, 0.02])], dark(sk, 0.32), 0.6);
    p.poly([M([-0.52, -0.2]), M([-0.3, -0.3]), M([-0.1, -0.2]), M([-0.3, -0.14])], lite(sk, 0.26), 0.7);
    c.restore();
    p.curve([M([-0.62, -0.45]), M([-0.36, -0.54]), M([-0.02, -0.42])], s * 0.05, o.brow || dk); p.curve([M([-0.54, -0.2]), M([-0.34, -0.13]), M([-0.1, -0.2])], s * 0.045, dk); p.curve([M([-0.52, -0.27]), M([-0.32, -0.32]), M([-0.12, -0.27])], s * 0.018, dk, 0.6);
    for (let k = 0; k < 5; k++) p.line(x + (-0.48 + k * 0.08) * s, y - 0.15 * s, x + (-0.5 + k * 0.08) * s, y - 0.09 * s, s * 0.014, dk, 0.8);
    p.curve([M([-0.63, -0.2]), M([-0.6, -0.16]), M([-0.56, -0.2])], s * 0.03, dk); p.circ(x - 0.72 * s, y + 0.13 * s, s * 0.026, dk);
    p.blob([M([-0.79, 0.3]), M([-0.62, 0.29]), M([-0.44, 0.38]), M([-0.62, 0.41]), M([-0.71, 0.385])], o.lips || dark(sk, 0.34)); p.blob([M([-0.73, 0.5]), M([-0.7, 0.4]), M([-0.48, 0.4]), M([-0.58, 0.51])], o.lips2 || mix(sk, '#e0708a', 0.42)); p.curve([M([-0.72, 0.39]), M([-0.58, 0.4]), M([-0.44, 0.38])], s * 0.016, dk);
    p.curve([M([-0.5, -0.8]), M([-0.64, -0.46]), M([-0.62, -0.3]), M([-0.94, 0.1])], s * 0.022, lite(sk, 0.65), 0.85); p.curve([M([-0.74, 0.5]), M([-0.64, 0.6]), M([-0.63, 0.8]), M([-0.42, 0.97])], s * 0.018, lite(sk, 0.5), 0.7);
    p.ell(x + 0.36 * s, y + 0.02 * s, 0.1 * s, 0.2 * s, dark(sk, 0.3)); p.ell(x + 0.35 * s, y + 0.02 * s, 0.05 * s, 0.12 * s, dark(sk, 0.5));
    return M;
  }
  function tripundra(p, M, s, col) { for (let k = 0; k < 3; k++) p.curve([M([-0.56, -0.62 - k * 0.1]), M([-0.3, -0.78 - k * 0.09]), M([0.24, -0.72 - k * 0.1])], s * 0.05, col, 0.92); }
  function facLotus(p, x, y, r, pal) {
    const pet = (a, len, w, i) => { const tx = x + Math.cos(a) * len, ty = y + Math.sin(a) * len, nx = -Math.sin(a) * w, ny = Math.cos(a) * w, mx = x + Math.cos(a) * len * 0.5, my = y + Math.sin(a) * len * 0.5; p.poly([[x, y], [mx + nx, my + ny], [tx, ty]], pal[i % pal.length]); p.poly([[x, y], [mx - nx, my - ny], [tx, ty]], pal[(i + 2) % pal.length]); p.poly([[mx + nx, my + ny], [tx, ty], [mx + nx * 0.3 + Math.cos(a) * len * 0.2, my + ny * 0.3 + Math.sin(a) * len * 0.2]], pal[(i + 4) % pal.length], 0.9); };
    for (let i = 0; i < 9; i++) pet(-Math.PI + (i + 0.5) / 9 * Math.PI, r, r * 0.3, i); for (let i = 0; i < 7; i++) pet(-Math.PI * 0.9 + (i + 0.5) / 7 * Math.PI * 0.8, r * 0.8, r * 0.26, i + 3); for (let i = 0; i < 5; i++) pet(-Math.PI * 0.8 + (i + 0.5) / 5 * Math.PI * 0.6, r * 0.62, r * 0.22, i + 1);
    for (let i = 0; i < 6; i++) pet(Math.PI * 0.05 + i / 5 * Math.PI * 0.9, r * 0.5, r * 0.24, i + 2);
  }
  add({ title: 'Trimurti', kanda: 'Recreated in code', w: 1600, h: 1450, seed: 917, paint: Object.assign({}, DET, { crisp: 0.5 }),
    text: 'Three faces of the one: Shiva with the crescent and the three lines of ash, Vishnu-Krishna in blue, white-bearded Brahma. Serpent hoods, a raised hand, lotuses, and far below, Krishna and Arjuna in a pool of light. Every shape, shadow and highlight here is drawn by code, then lit by a relief-and-bloom shader.',
    draw(p) {
      const c = p.c;
      p.sky([[0, '#14103a'], [0.35, '#3a2a6e'], [0.68, '#c8506a'], [1, '#2a1650']]);
      const W1 = ['#f6a04a', '#f0703a', '#fbd0a0', '#e8503a', '#f8c890', '#f6b8a0'];
      for (let i = 0; i < 90; i++) { const a = i * 0.47, r = 40 + i * 8.5, x = 360 + Math.cos(a) * r * 0.95, y = 760 + Math.sin(a) * r; if (x > 980) continue; p.ell(x, y, p.rr(110, 210), p.rr(34, 70), W1[i % 6], 0.6, a + 1.57); }
      for (const q of [[150, 90, 300, 110], [520, 60, 260, 80], [60, 330, 150, 200]]) p.ell(q[0], q[1], q[2], q[3], '#1c1848', 0.85, -0.2);
      p.circ(1090, 300, 470, '#e89a3a'); p.circ(1060, 260, 400, '#f6b860', 0.8); for (let k = 0; k < 14; k++) p.curve([[760 + k * 50, 40], [900 + k * 44, 140 + (k % 3) * 30], [1000 + k * 46, 60]], 26, k % 2 ? '#fbd088' : '#d8822a', 0.7);
      c.strokeStyle = css('#f0a040'); c.lineWidth = 70; c.beginPath(); c.arc(520, -60, 250, 0.2, 2.9); c.stroke(); c.strokeStyle = css('#fbd088'); c.lineWidth = 16; c.beginPath(); c.arc(520, -60, 286, 0.2, 2.9); c.stroke();
      scr(p, () => { p.glow(660, 960, 470, '#7fe0ff', 0.95); p.glow(660, 900, 220, '#ffffff', 0.7); }); for (let i = 0; i < 16; i++) p.ell(p.rr(480, 860), p.rr(700, 1150), p.rr(80, 160), p.rr(30, 60), i % 2 ? '#8fdcf8' : '#4fa8e8', 0.45, p.rr(-1, 1));
      // serpent hoods
      const snake = (x, y, len, rot) => { c.save(); c.translate(x, y); c.rotate(rot); p.blob([[-len * 0.5, 0], [-len * 0.36, -len * 0.09], [0, -len * 0.19], [len * 0.4, -len * 0.14], [len * 0.52, 0], [len * 0.4, len * 0.14], [0, len * 0.15], [-len * 0.36, len * 0.07]], '#26262e'); p.blob([[-len * 0.46, -len * 0.01], [-len * 0.34, -len * 0.07], [0, -len * 0.15], [len * 0.36, -len * 0.1], [len * 0.2, -len * 0.02], [-len * 0.2, 0]], '#4a4a56'); p.ell(-len * 0.1, -len * 0.06, len * 0.3, len * 0.035, '#7a7a88', 0.8); for (let k = 0; k < 4; k++) p.curve([[-len * 0.1 + k * len * 0.11, -len * 0.02], [-len * 0.05 + k * len * 0.11, len * 0.05], [k * len * 0.11, -len * 0.02]], len * 0.016, '#e8e4dc', 0.9); p.curve([[-len * 0.36, len * 0.02], [-len * 0.2, len * 0.07], [len * 0.2, len * 0.08]], len * 0.014, '#d8d4cc', 0.8); p.circ(-len * 0.34, -len * 0.02, len * 0.02, '#e8e4dc'); c.restore(); };
      snake(350, 285, 440, -0.06); snake(335, 505, 460, 0.07); p.tube([[520, 300], [760, 360], [900, 520]], 110, 150, '#26262e'); p.tube([[520, 520], [760, 560], [900, 640]], 110, 150, '#33333c');
      // body and shawl
      p.blob([[700, 760], [900, 560], [1200, 610], [1600, 560], [1640, 1500], [680, 1500], [620, 1040]], '#1f55c8'); p.blob([[700, 800], [880, 620], [1080, 660], [1000, 1000], [820, 1300], [660, 1100]], '#3f8ae8'); p.blob([[690, 860], [800, 760], [880, 900], [800, 1100], [690, 1040]], '#8fd0f8', 0.8); p.blob([[1300, 700], [1640, 640], [1640, 1500], [1200, 1500]], '#17409a', 0.8);
      p.blob([[1010, 650], [1180, 600], [1340, 700], [1300, 980], [1170, 1230], [1030, 1060], [1060, 820]], '#c8963a'); p.blob([[1030, 660], [1170, 620], [1240, 720], [1160, 980], [1060, 1000], [1080, 800]], '#f0cc78'); for (let k = 0; k < 9; k++) p.curve([[1040 + k * 32, 650], [1070 + k * 26, 860], [1050 + k * 22, 1100]], 7, k % 2 ? '#fbe6a8' : '#a87028', 0.8);
      p.blob([[900, 580], [1010, 640], [1040, 900], [960, 1000], [880, 760]], '#2a2230', 0.9);
      // raised hand
      const B = '#2f6fe0'; p.limb(790, 1010, 620, 612, 170, 116, B, 0.2); p.ell(588, 476, 86, 128, dark(B, 0.25), 1, -0.12); p.ell(580, 470, 72, 112, B, 1, -0.12); p.ell(566, 450, 40, 70, lite(B, 0.25), 0.8, -0.12);
      p.limb(552, 380, 546, 92, 50, 36, B, 0.1); p.limb(596, 372, 618, 200, 48, 36, B, 0.1); p.limb(634, 392, 662, 256, 44, 32, dark(B, 0.1), 0.1); p.limb(664, 430, 694, 320, 38, 28, dark(B, 0.18), 0.1); p.limb(530, 500, 462, 400, 52, 36, B, 0.15);
      for (const q of [[546, 92], [618, 200], [662, 256], [694, 320], [462, 400]]) p.circ(q[0], q[1], 13, '#f6b8b0', 0.9); for (const q of [[540, 300, 536, 130], [600, 350, 612, 230], [500, 470, 472, 420]]) p.line(q[0], q[1], q[2], q[3], 9, '#f8c0b0', 0.55);
      p.tube([[540, 590], [612, 640], [700, 610]], 78, 78, '#b8822e'); p.tube([[540, 580], [612, 630], [700, 600]], 46, 46, GOLD); p.tube([[550, 566], [612, 612], [690, 588]], 12, 12, GOLD2); for (let k = 0; k < 6; k++) p.line(552 + k * 26, 590 + Math.sin(k * 0.7) * 26, 558 + k * 26, 650 + Math.sin(k * 0.7) * 20, 4, '#8a5a1c', 0.7);
      // Shiva
      let s = 240, x = 990, y = 420; p.blob([[x - 0.3 * s, y - 1.25 * s], [x + 0.5 * s, y - 1.2 * s], [x + 0.9 * s, y - 0.2 * s], [x + 0.8 * s, y + 1.4 * s], [x + 0.2 * s, y + 1.1 * s], [x + 0.4 * s, y], [x - 0.3 * s, y - 0.9 * s]], '#221a28'); p.ell(x + 0.1 * s, y - 1.3 * s, 0.42 * s, 0.34 * s, '#2a2030'); for (let k = 0; k < 6; k++) p.curve([[x - 0.3 * s + k * 0.12 * s, y - 1.0 * s], [x + k * 0.1 * s, y - 1.4 * s], [x + 0.3 * s + k * 0.04 * s, y - 1.5 * s]], s * 0.03, '#4a3a4a', 0.8);
      let M = profile(p, x, y, s, { skin: '#3a8f98', lips: '#256a74', lips2: '#5aa8a8' }); tripundra(p, M, s, '#eef2f0'); p.ell(x - 0.32 * s, y - 0.72 * s, 0.045 * s, 0.11 * s, '#c9342f'); p.ell(x - 0.32 * s, y - 0.72 * s, 0.02 * s, 0.06 * s, '#17131f');
      c.strokeStyle = css('#f6f2ea'); c.lineWidth = s * 0.07; c.lineCap = 'round'; c.beginPath(); c.arc(x - 0.5 * s, y - 1.12 * s, s * 0.3, 1.9, 4.9); c.stroke(); c.strokeStyle = css(GOLD); c.lineWidth = s * 0.03; c.beginPath(); c.arc(x - 0.86 * s, y + 0.2 * s, s * 0.09, 0, 6.3); c.stroke();
      // Vishnu-Krishna
      s = 258; x = 1215; y = 350; p.blob([[x - 0.75 * s, y - 0.9 * s], [x - 0.5 * s, y - 1.35 * s], [x + 0.3 * s, y - 1.4 * s], [x + 0.9 * s, y - 1.0 * s], [x + 0.7 * s, y - 0.5 * s], [x - 0.4 * s, y - 0.7 * s]], '#d88a2a'); p.blob([[x - 0.7 * s, y - 0.95 * s], [x - 0.45 * s, y - 1.3 * s], [x + 0.2 * s, y - 1.34 * s], [x + 0.5 * s, y - 1.0 * s], [x - 0.3 * s, y - 0.8 * s]], '#f6b84a'); for (let k = 0; k < 6; k++) p.curve([[x - 0.66 * s + k * 0.2 * s, y - 0.92 * s], [x - 0.4 * s + k * 0.2 * s, y - 1.2 * s], [x - 0.1 * s + k * 0.18 * s, y - 1.34 * s]], s * 0.035, k % 2 ? '#fbe0a0' : '#a8621c', 0.8);
      p.blob([[x + 0.3 * s, y - 0.9 * s], [x + 0.7 * s, y - 0.3 * s], [x + 0.6 * s, y + 0.9 * s], [x + 0.2 * s, y + 0.7 * s], [x + 0.45 * s, y]], '#17131f');
      M = profile(p, x, y, s, { skin: '#2a6fe6', lips: '#8a4a9a', lips2: '#d87aa8' }); p.curve([M([-0.56, -0.86]), M([-0.5, -0.56]), M([-0.42, -0.5]), M([-0.36, -0.58]), M([-0.34, -0.9])], s * 0.05, '#f6f2ea'); p.line(M([-0.45, -0.86])[0], M([-0.45, -0.86])[1], M([-0.43, -0.58])[0], M([-0.43, -0.58])[1], s * 0.045, '#d8307a');
      // Brahma
      s = 268; x = 1505; y = 300; p.blob([[x - 0.75 * s, y - 0.85 * s], [x - 0.5 * s, y - 1.3 * s], [x + 0.6 * s, y - 1.3 * s], [x + 0.7 * s, y - 0.4 * s], [x - 0.3 * s, y - 0.75 * s]], '#d8d0c8'); p.blob([[x - 0.7 * s, y - 0.9 * s], [x - 0.45 * s, y - 1.26 * s], [x + 0.3 * s, y - 1.28 * s], [x - 0.2 * s, y - 0.82 * s]], '#fbf8f2'); for (let k = 0; k < 5; k++) p.curve([[x - 0.66 * s + k * 0.2 * s, y - 0.9 * s], [x - 0.3 * s + k * 0.2 * s, y - 1.14 * s], [x + k * 0.2 * s, y - 1.26 * s]], s * 0.03, '#a8a4b0', 0.7);
      M = profile(p, x, y, s, { skin: '#c89a70', brow: '#f1ece4', lips: '#9a6a50', lips2: '#b87a68' }); tripundra(p, M, s, '#f6f2ea');
      p.blob([M([-0.8, 0.3]), M([-0.5, 0.2]), M([0.2, 0.3]), M([0.5, 0.9]), M([0.3, 1.9]), M([-0.2, 2.5]), M([-0.6, 2.0]), M([-0.4, 1.4]), M([-0.75, 0.9]), M([-0.66, 0.56])], '#d0ccd8'); p.blob([M([-0.76, 0.34]), M([-0.5, 0.26]), M([0, 0.4]), M([0.2, 1.0]), M([0, 1.8]), M([-0.3, 2.2]), M([-0.5, 1.9]), M([-0.3, 1.3]), M([-0.66, 0.9])], '#fbf8f4');
      for (let k = 0; k < 9; k++) p.curve([M([-0.6 + k * 0.1, 0.5]), M([-0.5 + k * 0.1, 1.0 + (k % 3) * 0.1]), M([-0.62 + k * 0.1, 1.5 + (k % 2) * 0.3]), M([-0.4 + k * 0.08, 1.9])], s * 0.03, k % 2 ? '#a8a8c0' : '#e0dce8', 0.8); p.tube([M([-0.8, 0.3]), M([-0.55, 0.24]), M([-0.3, 0.36])], s * 0.1, s * 0.05, '#fbf8f4');
      // lotuses, and the two small figures in the light
      const PK = ['#e8508a', '#c8307a', '#f08aa8', '#a8287a', '#7a2a8a', '#f4a0b8'], PB = ['#5a3a9a', '#3a2a7a', '#8a5ab8', '#2a2260', '#c8508a', '#6a4aa8'];
      p.rect(0, 1330, 1600, 120, '#1a1440', 0.8); facLotus(p, 330, 1400, 190, PB); facLotus(p, 900, 1430, 170, PB);
      const A = F(p, 448, 1250, 250, { skin: '#c98a5a', cloth: '#8a3a2a', cloth2: '#f0c85a', top: '#b06a3a', crown: 'mukut', gold: '#f6c84a', hair: '#3a2a22' }, KNEEL, PRAY, { f: 1, head: -32 });
      p.ribbon([[690, 1010], [760, 1090], [820, 1150], [880, 1170]], 70, '#b88a2a', 0.95);
      F(p, 668, 1262, 420, { skin: '#3f8ae0', robe: '#f0c040', drape: '#f6dc80', longhair: true, crown: 'mukut', gold: '#f6c84a', hair: '#3a2a30', sash: false, robeW: 0.12 }, { f: -1, aN: [40, 70], aF: [50, 100], lean: -3 });
      facLotus(p, 620, 1440, 150, PK); facLotus(p, 1240, 1170, 300, PK); p.blob([[1150, 1000], [1240, 880], [1330, 1000], [1240, 1090]], '#e8508a'); p.poly([[1240, 880], [1330, 1000], [1240, 1090]], '#b8287a'); p.poly([[1190, 960], [1240, 880], [1250, 1000]], '#f8a8c0');
      for (let i = 0; i < 140; i++) { const q = [p.rr(60, 1000), p.rr(500, 1400)]; p.rect(q[0], q[1], p.rr(3, 8), p.rr(3, 8), i % 3 ? '#fff0c0' : '#bfefff', p.rr(0.4, 0.9)); }
    }, after: (c, w, h) => shade(c, w, h, { relief: 0.55, bloom: 0.42 }) });

  Epic.scenes.bharat = S;
})();
