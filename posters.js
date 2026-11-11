/* Fifty Ramayana posters: Rama and Sita in four print treatments.
   woodcut  : carved three-ink prints, some as tall registers with banners
   blood    : red, black and gold, with colossal shadows
   ember    : figures glowing out of black
   colour   : full-colour paintings, front-facing icons and festival crowds */
(function () {
  'use strict';
  const { mix, lite, dark, css } = Epic;
  const { F, scr, hut, ARCH, PRAY, KNEEL, SIT, SAGE, HANU } = Epic.kit;
  const { face, attr, stars, DET, deity, vishva } = Epic.front;
  const RS = Epic.scenes.ramayana, RP = Epic.scenes.rama, GOLD = '#f3c65a', GOLD2 = '#fff0a8';
  const hexv = c => Array.isArray(c) ? c : [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];

  // ---------- treatments, applied to the flat reference before or instead of the brush pass ----------
  const GR = {
    blood: { stops: [[0, '#0a0305'], [0.22, '#330709'], [0.48, '#a8120d'], [0.7, '#ea3a17'], [0.9, '#ffac3c'], [1, '#fff2b8']], gamma: 1.05, keep: 0.06 },
    ember: { stops: [[0, '#020101'], [0.28, '#0e0705'], [0.52, '#6e2810'], [0.74, '#d27226'], [0.9, '#f8c868'], [1, '#fff8d8']], gamma: 1.7, keep: 0.1 },
    indigo: { stops: [[0, '#03051a'], [0.35, '#101a52'], [0.62, '#3f55aa'], [0.84, '#e8b860'], [1, '#fff6d4']], gamma: 1.15, keep: 0.12 },
    moss: { stops: [[0, '#07100c'], [0.35, '#1f3f33'], [0.62, '#6f9a62'], [0.85, '#f0cf78'], [1, '#fff8dc']], gamma: 1.05, keep: 0.14 }
  };
  function grade(c, w, h, g) {
    const im = c.getImageData(0, 0, w, h), d = im.data, st = g.stops.map(s => [s[0], hexv(s[1])]), lut = [];
    for (let i = 0; i < 256; i++) { const t = Math.pow(i / 255, g.gamma || 1); let k = 0; while (k < st.length - 2 && t > st[k + 1][0]) k++; const a = st[k], b = st[k + 1], u = Math.max(0, Math.min(1, (t - a[0]) / (b[0] - a[0]))); lut.push([a[1][0] + (b[1][0] - a[1][0]) * u, a[1][1] + (b[1][1] - a[1][1]) * u, a[1][2] + (b[1][2] - a[1][2]) * u]); }
    const kp = g.keep || 0;
    for (let i = 0; i < d.length; i += 4) { const l = (d[i] * 0.3 + d[i + 1] * 0.59 + d[i + 2] * 0.11) | 0, q = lut[l]; d[i] = q[0] + (d[i] - l) * kp; d[i + 1] = q[1] + (d[i + 1] - l) * kp; d[i + 2] = q[2] + (d[i + 2] - l) * kp; }
    c.putImageData(im, 0, 0);
  }
  const INK = {
    inferno: { paper: '#f1e6cc', mid: '#3d686c', dark: '#151515', accent: '#e6432a' },
    gold: { paper: '#f3ead2', mid: '#2f5a5a', dark: '#181818', accent: '#c9a23a', accent2: '#e6432a' },
    saffron: { paper: '#f6ecd2', mid: '#28356e', dark: '#12121e', accent: '#f08a1e' },
    forest: { paper: '#f2ecd6', mid: '#3f6a48', dark: '#141a14', accent: '#d8482e' },
    rose: { paper: '#f6e9dc', mid: '#5a3f6e', dark: '#17121c', accent: '#e8546a' }
  };
  function lino(c, w, h, ink) {
    const im = c.getImageData(0, 0, w, h), d = im.data, n = w * h, L = new Float32Array(n), Wm = new Uint8Array(n);
    for (let i = 0; i < n; i++) { const r = d[i * 4], g = d[i * 4 + 1], b = d[i * 4 + 2]; L[i] = r * 0.3 + g * 0.59 + b * 0.11; Wm[i] = (r - b > 62 && r > 150) ? 1 : 0; }
    const P = hexv(ink.paper), M = hexv(ink.mid), K = hexv(ink.dark), A = hexv(ink.accent), A2 = ink.accent2 ? hexv(ink.accent2) : null;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = y * w + x, l = L[i], e = (x > 2 && x < w - 3 && y > 2 && y < h - 3) ? Math.abs(L[i + 2] - L[i - 2]) + Math.abs(L[i + 2 * w] - L[i - 2 * w]) : 0;
      const wob = Math.sin(x * 0.013 + y * 0.007) * 6 + Math.sin(y * 0.021 - x * 0.004) * 5; let col;
      if (e > 44) col = K;
      else if (Wm[i] && l > 95) { col = A; if (A2 && l < 150) col = A2; if (Math.sin((x + y + wob) * 0.55) > 0.88) col = P; else if (l < 135 && Math.sin((x - y) * 0.6 + wob) > 0.55) col = K; else if (l > 222 && Math.sin((x * 0.3 + y) * 0.7 + wob) > 0.2) col = P; }
      else if (l < 62) { col = K; if (Math.sin((x * 0.34 + y * 0.94 + wob) * 0.5) > 0.955) col = M; }
      else if (l < 160) { col = M; const steep = l < 110; if (Math.sin((x * (steep ? 0.8 : 0.2) + y * (steep ? 0.6 : 0.98) + wob) * 0.62) > 0.25 + (160 - l) / 150) col = P; else if (l < 90 && Math.sin((x * 0.9 - y * 0.45 + wob) * 0.5) > 0.6) col = K; }
      else { col = P; if (l < 204 && Math.sin((x * 0.5 + y * 0.86 + wob) * 0.7) > 0.9) col = M; }
      d[i * 4] = col[0]; d[i * 4 + 1] = col[1]; d[i * 4 + 2] = col[2];
    }
    c.putImageData(im, 0, 0);
  }
  const FLAT = { layers: [], crisp: 1 };
  const SERIF = "Georgia, 'Times New Roman', serif", HIN = 'RamNaam, "Noto Serif Devanagari", serif';
  function txt(c, s, x, y, size, col, o) { o = o || {}; c.font = (o.w || 400) + ' ' + size + 'px ' + (o.hin ? HIN : SERIF); c.textAlign = o.al || 'center'; c.textBaseline = 'middle'; try { c.letterSpacing = (o.ls || 0) + 'px'; } catch (e) { } c.fillStyle = col; c.fillText(s, x, y); try { c.letterSpacing = '0px'; } catch (e) { } }
  // poster lettering over a graded or painted picture
  const lettering = (title, hin, sub, col) => function (c, w, h) {
    const g = c.createLinearGradient(0, h * 0.74, 0, h); g.addColorStop(0, 'rgba(6,3,8,0)'); g.addColorStop(1, 'rgba(6,3,8,0.86)'); c.fillStyle = g; c.fillRect(0, h * 0.74, w, h * 0.26);
    const k = Math.min(w, h * 1.2) / 1200; if (hin) txt(c, hin, w / 2, h - 178 * k, 64 * k, col || '#ffd27a', { hin: true, w: 700 });
    txt(c, title.toUpperCase(), w / 2, h - 104 * k, 40 * k, '#fff4dc', { ls: 9 * k }); if (sub) txt(c, sub, w / 2, h - 54 * k, 22 * k, '#e0cfc4', { ls: 3 * k });
    c.strokeStyle = col || '#ffd27a'; c.lineWidth = 3 * k; c.strokeRect(22 * k, 22 * k, w - 44 * k, h - 44 * k);
  };
  // lettering for the carved prints: a paper banner with ink type
  const banner = (title, hin, sub, ink) => function (c, w, h) {
    const k = w / 1200, y0 = h - 190 * k; c.fillStyle = ink.paper; c.fillRect(0, y0, w, 190 * k); c.fillStyle = ink.accent; c.fillRect(0, y0, w, 8 * k); c.fillRect(0, y0 + 14 * k, w, 3 * k);
    if (hin) txt(c, hin, w / 2, y0 + 62 * k, 58 * k, ink.accent, { hin: true, w: 700 }); txt(c, title.toUpperCase(), w / 2, y0 + (hin ? 122 : 80) * k, 36 * k, ink.dark, { ls: 8 * k }); if (sub) txt(c, sub, w / 2, y0 + 162 * k, 20 * k, ink.mid, { ls: 2 * k });
    c.strokeStyle = ink.dark; c.lineWidth = 10 * k; c.strokeRect(5 * k, 5 * k, w - 10 * k, h - 10 * k);
  };
  const cover = (c, img, w, h, fx, fy) => { const s = Math.max(w / img.width, h / img.height), dw = img.width * s, dh = img.height * s; c.drawImage(img, -(dw - w) * (fx == null ? 0.5 : fx), -(dh - h) * (fy == null ? 0.5 : fy), dw, dh); };
  const S = [], add = o => S.push(Object.assign({ light: -1, paint: DET }, o));

  // ---------- cast ----------
  const RAMA = { skin: '#5f86b8', cloth: '#f0b93a', cloth2: '#e8703a', crown: 'bun', hair: '#1f1a2a', thread: true };
  const RAVAN = { skin: '#3a2a30', cloth: '#221a22', cloth2: '#5a2a2a', heads: 4, broad: 1.45, fangs: true, hair: '#0c080c', gold: '#8a6a3a' };
  const RAMF = { skin: '#4f78c0', cloth: '#f4c93a', sash: '#e8703a', thread: true, garland: '#f6f0e6', long: true, hair: '#17131f', face: { crown: 'mukut', tilak: 'U', lips: '#2a3f8a' } };
  const RAMX = Object.assign({}, RAMF, { cloth: '#d8a85a', sash: '#b8742a', garland: null, plain: true, band: '#8a5a3a', face: { crown: 'bun', hair: '#17131f', tilak: 'U', lips: '#2a3f8a', long: true } });
  const SITF = { fem: true, skin: '#f0c8a0', cloth: '#c9302c', top: '#2f8f5a', border: GOLD, long: true, hair: '#17131f', face: { crown: 'crown', tilak: 'dot', long: true } };
  const SITX = Object.assign({}, SITF, { cloth: '#e0a04a', top: '#b8742a', border: '#8a5a3a', plain: true, band: '#8a5a3a', face: { crown: 'none', tilak: 'dot', long: true } });
  const LAKF = Object.assign({}, RAMF, { skin: '#e8c090', cloth: '#5d8fb5', sash: '#f0b93a', garland: null });
  const bowR = { s: 1, th: 66, ph: 30, kind: 'bow', k: 1.5 }, palmL = { s: -1, th: 40, ph: -50, kind: 'palm' }, restL = { s: -1, th: 70, ph: 56 }, restR = { s: 1, th: 70, ph: 56 };
  const petals = (p, n, cols, w, h) => { for (let i = 0; i < n; i++) p.ell(p.rr(0, w), p.rr(0, h), p.rr(5, 11), p.rr(3, 6), cols[i % cols.length], 0.95, p.rr(0, 3)); };
  const lotusSeat = (p, x, y, r) => { for (let i = -5; i <= 5; i++) { const a = -1.5708 + i * 0.27; p.blob([[x, y], [x + Math.cos(a - 0.2) * r * 0.58, y + Math.sin(a - 0.2) * r * 0.34], [x + Math.cos(a) * r, y + Math.sin(a) * r * 0.6], [x + Math.cos(a + 0.2) * r * 0.58, y + Math.sin(a + 0.2) * r * 0.34]], Math.abs(i) % 2 ? '#f4a0bc' : '#fbd0de'); } p.ell(x, y + r * 0.03, r, r * 0.18, '#e8789a'); p.ell(x, y, r * 0.76, r * 0.11, '#f6c84a'); };
  const archway = (p, col, gold) => { p.pillar(110, 1560, 130, 1320, col); p.pillar(1090, 1560, 130, 1320, col); const c = p.c; c.strokeStyle = css(col); c.lineWidth = 90; c.beginPath(); c.ellipse(600, 300, 490, 240, 0, Math.PI, 6.283); c.stroke(); c.strokeStyle = css(gold); c.lineWidth = 12; c.beginPath(); c.ellipse(600, 300, 440, 200, 0, Math.PI, 6.283); c.stroke(); };

  // ================= 1-8: Rama and Sita, front-facing, in full colour =================
  add({ title: 'Sita-Rama', kanda: 'Icon', hin: 'सीताराम', w: 1200, h: 1800, seed: 801,
    text: 'The two names are said as one. Rama with the Kodanda bow and Sita beside him, under a single sun.',
    draw(p) {
      p.sky(['#f6b890', '#fbd0a8', '#fde6c0', '#fff2d4']); p.sun(600, 640, 400, '#fffbe6', '#ffd890'); p.rays(600, 640, 60, 1700, '#fff6d0', 0.2); archway(p, '#b8705a', GOLD);
      p.rect(0, 1540, 1200, 260, '#c88a6a'); lotusSeat(p, 600, 1560, 520);
      deity(p, 440, 1540, 940, Object.assign({}, RAMF, { halo: '#fff6c8', arms: [restL, bowR] })); deity(p, 800, 1540, 840, Object.assign({}, SITF, { halo: '#fff6c8', garland: '#f4a0bc', arms: [{ s: -1, th: 70, ph: 56, kind: 'lotus', k: 0.8 }, palmL && { s: 1, th: 50, ph: -30, kind: 'palm' }] }));
      petals(p, 160, ['#fbd0dc', '#fff3c0', '#f6a8b8'], 1200, 1800); p.lamp(150, 1700, 22); p.lamp(1050, 1700, 22);
    }, after: lettering('Sita-Rama', 'सीताराम', 'Two names said as one') });
  add({ title: 'The Garland', kanda: 'Bala Kanda', w: 1200, h: 1800, seed: 802,
    text: 'The great bow lies broken at his feet. Sita lifts the victory garland, and it is she who chooses.',
    draw(p) {
      p.sky(['#7a1c2c', '#b8323a', '#e8703a', '#f8c060']); scr(p, () => { p.glow(600, 700, 900, '#fff0b0', 0.8); p.rays(600, 700, 50, 1500, '#fff0c0', 0.2); });
      for (let i = 0; i < 8; i++) p.ribbon([[80 + i * 150, 0], [110 + i * 150, 160], [80 + i * 150, 320], [120 + i * 150, 470]], 60, i % 2 ? '#f6d77a' : '#fbeede', 0.85);
      p.rect(0, 1500, 1200, 300, '#6a1c2c'); p.poly([[200, 1500], [1000, 1500], [1200, 1800], [0, 1800]], '#f0c060');
      p.curve([[120, 1700], [300, 1600], [470, 1640]], 30, '#b8863a'); p.curve([[1080, 1690], [900, 1610], [740, 1660]], 30, '#b8863a'); p.curve([[120, 1700], [300, 1600], [470, 1640]], 9, GOLD2); p.curve([[1080, 1690], [900, 1610], [740, 1660]], 9, GOLD2);
      deity(p, 400, 1560, 900, Object.assign({}, RAMF, { halo: '#fff6c8', arms: [restL, restR] }));
      const J = deity(p, 800, 1560, 800, Object.assign({}, SITF, { cloth: '#f6c84a', top: '#c9302c', border: '#c9302c', halo: '#fff6c8', arms: [{ s: -1, th: -30, ph: -60, L2: 170 }, { s: 1, th: -50, ph: -100 }] }));
      const a = J.hands[0], b = J.hands[1]; for (let i = 0; i <= 26; i++) { const t = i / 26, x = a[0] + (b[0] - a[0]) * t - Math.sin(t * Math.PI) * 60, y = a[1] + (b[1] - a[1]) * t + Math.sin(t * Math.PI) * 250; p.circ(x, y, 17, i % 3 ? '#fbf6ee' : '#e0507a'); p.circ(x - 3, y - 3, 8, i % 3 ? '#ffffff' : '#f8a8b8'); }
      petals(p, 200, ['#fbd0dc', '#fff3c0', '#ffffff'], 1200, 1800);
    }, after: lettering('The Garland', 'स्वयंवर', 'Mithila, the bow of Shiva broken') });
  add({ title: 'Ram Darbar', kanda: 'Yuddha Kanda', w: 1200, h: 1800, seed: 803,
    text: 'The court of Rama: the king and queen enthroned, Lakshmana at their side, Hanuman at their feet.',
    draw(p) {
      p.sky(['#2a2466', '#5a4a98', '#c88a90', '#f8d0a0']); stars(p, 120, 500); scr(p, () => { p.glow(600, 700, 800, '#fff0b8', 0.8); p.rays(600, 700, 44, 1400, '#fff4c8', 0.18); }); archway(p, '#7a5a88', GOLD);
      p.rect(0, 1500, 1200, 300, '#5a3f6a'); for (let i = 0; i < 5; i++) p.rect(200 - i * 40, 1380 + i * 32, 800 + i * 80, 32, i % 2 ? '#c9a0b0' : '#a8809a');
      p.rect(300, 760, 600, 640, '#b8323a'); p.rect(280, 720, 640, 54, GOLD); p.pillar(320, 1400, 44, 680, GOLD); p.pillar(880, 1400, 44, 680, GOLD); p.line(600, 420, 600, 720, 9, GOLD); p.c.fillStyle = '#fff6e0'; p.c.beginPath(); p.c.ellipse(600, 420, 300, 100, 0, Math.PI, 6.283); p.c.fill(); p.rect(300, 410, 600, 18, GOLD); for (let k = 0; k < 13; k++) p.circ(310 + k * 48, 440, 9, '#c9302c');
      deity(p, 470, 1330, 760, Object.assign({}, RAMF, { seat: true, halo: '#fff6c8', arms: [{ s: -1, th: 50, ph: -40, kind: 'palm', k: 0.8 }, { s: 1, th: 70, ph: 30, kind: 'bow', k: 1.2 }] }));
      deity(p, 770, 1330, 680, Object.assign({}, SITF, { seat: true, halo: '#fff6c8', arms: [{ s: -1, th: 70, ph: 40 }, { s: 1, th: 70, ph: 40, kind: 'lotus', k: 0.7 }] }));
      deity(p, 1010, 1640, 620, Object.assign({}, LAKF, { arms: [restL, { s: 1, th: 66, ph: 30, kind: 'bow', k: 1.2 }] })); deity(p, 190, 1640, 600, Object.assign({}, LAKF, { skin: '#6f8fc0', cloth: '#b98a5a', arms: [{ s: -1, th: 40, ph: -60 }, { s: 1, th: 40, ph: -60 }] }));
      F(p, 600, 1720, 360, HANU, KNEEL, PRAY, { f: -1, head: -30 }); petals(p, 200, ['#fbd0dc', '#fff3c0', '#ffffff'], 1200, 1800); p.lamp(90, 1760, 20); p.lamp(1110, 1760, 20);
    }, after: lettering('Ram Darbar', 'राम दरबार', 'Rama, Sita, Lakshmana, Bharata and Hanuman') });
  add({ title: 'Sita in the Grove of Sorrow', kanda: 'Sundara Kanda', w: 1200, h: 1800, seed: 804, light: 1,
    text: 'Offered every wealth of Lanka, she sets a blade of grass between herself and its king and will not look at him.',
    draw(p) {
      p.sky(['#1c2450', '#3a4484', '#6a70a8', '#a898b4']); stars(p, 240, 900); p.sun(900, 300, 110, '#f8f6e4', '#b4c0ea');
      p.c.globalAlpha = 0.55; F(p, 330, 1500, 1500, RAVAN, { f: 1, lean: 6, aN: [60, 100], aF: [90, 120], cape: '#0c0810' }); p.c.globalAlpha = 1; p.fade('#3a4484', 0.35);
      p.forest({ x0: -60, x1: 1260, base: 1300, jit: 20, h: 700, n: 9, col: '#3f5a70', col2: '#4f6a6a', trunk: '#2a2a48', flowers: '#c9463a' });
      p.tree(700, 1560, 1300, { col: '#3f6a6a', trunk: '#2a2238', spread: 0.46, flowers: '#e8503a' });
      const g = p.ridge({ y: 1480, amp: 20, col: '#5a6a80', col2: '#2a3450', seed: 6, freq: 0.004 });
      deity(p, 640, 1560, 760, Object.assign({}, SITX, { seat: true, cloth: '#e6c85a', top: '#c9a23a', halo: '#e6e8ff', arms: [{ s: -1, th: 70, ph: 40 }, { s: 1, th: 60, ph: -20 }] }));
      p.line(430, 1600, 470, 1500, 5, '#a8d08a'); scr(p, () => p.glow(450, 1550, 70, '#d8ffb0', 0.8)); p.lamp(880, 1620, 16);
      for (let i = 0; i < 90; i++) p.rect(p.rr(300, 1100), p.rr(500, 1700), 8, 6, '#e8503a', 0.9); p.grass(0, 1200, g, 26, '#4a6a70', 100);
    }, after: lettering('Sita in the Grove of Sorrow', 'अशोक वाटिका', 'A blade of grass between them') });
  add({ title: 'Unburnt', kanda: 'Yuddha Kanda', w: 1200, h: 1800, seed: 805, light: 1,
    text: 'The ordeal seen from within the fire. The flames stand back from her; the doubt was never hers to answer.',
    draw(p) {
      p.sky(['#2a0c12', '#7a1c14', '#d8502a', '#f8b040']); scr(p, () => { p.glow(600, 900, 1000, '#ffb050', 0.8); p.rays(600, 800, 50, 1600, '#ffe0a0', 0.2); });
      p.fire(600, 1800, 1200, 1500); p.fire(250, 1800, 420, 900); p.fire(950, 1800, 420, 900);
      scr(p, () => p.glow(600, 760, 520, '#fffbe6', 0.95)); lotusSeat(p, 600, 1500, 380);
      deity(p, 600, 1480, 1000, Object.assign({}, SITF, { cloth: '#fbe6b0', top: '#f6d77a', border: GOLD, halo: '#fffbe6', garland: '#fff6d8', arms: [{ s: -1, th: 50, ph: -70 }, { s: 1, th: 50, ph: -70 }] }));
      p.fire(600, 1800, 900, 420); for (let i = 0; i < 260; i++) p.rect(p.rr(0, 1200), p.rr(0, 1700), p.rr(3, 8), p.rr(3, 8), p.r() < 0.5 ? '#ffe08a' : '#ff9a3a', p.rr(0.5, 1));
    }, after: lettering('Unburnt', 'अग्नि परीक्षा', 'The fire stands back from her') });
  add({ title: 'Sita Returns to the Earth', kanda: 'Uttara Kanda', w: 1200, h: 1800, seed: 806,
    text: 'Asked to prove herself a second time, Sita calls on her mother the Earth to receive her. The ground opens, a throne rises, and she is gone.',
    draw(p) {
      p.sky(['#c8d8c0', '#e6e8c8', '#f6eccc', '#e8d0a0']); p.sun(600, 300, 120, '#fffbe6', '#fff0b8'); p.rays(600, 300, 40, 1700, '#fff6d0', 0.2);
      p.forest({ x0: -60, x1: 1260, base: 900, jit: 20, h: 520, n: 12, col: '#a0b898', col2: '#b8c690', trunk: '#8f8480' }); p.fade('#f3e8c0', 0.4);
      const g = p.ridge({ y: 1000, amp: 20, col: '#b8b078', col2: '#7a7450', seed: 6, freq: 0.004 });
      p.blob([[240, 1010], [600, 960], [960, 1010], [1040, 1800], [160, 1800]], '#3a2a22'); p.blob([[300, 1030], [600, 990], [900, 1030], [960, 1800], [240, 1800]], '#5a3f2e');
      scr(p, () => { p.glow(600, 1300, 620, '#ffe0a0', 0.9); p.rays(600, 1500, 30, 900, '#fff0c0', 0.3, 200, 340); });
      p.rect(380, 1380, 440, 300, '#8a5a3a'); p.rect(360, 1350, 480, 44, GOLD); for (const x of [400, 800]) p.pillar(x, 1680, 40, 320, GOLD); lotusSeat(p, 600, 1700, 360);
      for (const s of [-1, 1]) p.serpent([[600 + s * 300, 1790], [600 + s * 360, 1600], [600 + s * 300, 1450], [600 + s * 330, 1330]], 50, 36, '#4f7a5a', { hood: true });
      deity(p, 600, 1640, 820, Object.assign({}, SITF, { seat: true, cloth: '#e0a04a', top: '#8a5a3a', halo: '#fff6d0', arms: [{ s: -1, th: 50, ph: -70 }, { s: 1, th: 50, ph: -70 }] }));
      F(p, 190, g(190) + 6, 300, RAMA, { f: 1, crown: 'mukut', lean: 20, aN: [96, 100], aF: [84, 96], lN: [40, 0], lF: [-20, -40] });
      for (const x of [960, 1060]) F(p, x, g(x) + 6, 190, RAMA, { f: -1, skin: '#7f9ad0', aN: [130, 150] }); F(p, 1130, g(1130) + 6, 260, SAGE, { f: -1 });
      for (let i = 0; i < 60; i++) p.rock(p.rr(180, 1020), p.rr(1040, 1300), p.rr(14, 50), p.rr(10, 30), '#6a4a36'); p.grass(0, 1200, g, 26, '#98a45c', 90);
    }, after: lettering('Sita Returns to the Earth', 'भूमि प्रवेश', 'She asks her mother to take her home') });
  add({ title: 'Mother of Lava and Kusha', kanda: 'Uttara Kanda', w: 1200, h: 1800, seed: 807, light: 1,
    text: 'In Valmiki\'s hermitage Sita raises her twin sons alone. They will learn the Ramayana by heart and sing it to their father without knowing who he is.',
    draw(p) {
      p.sky(['#a8c8d0', '#d6e0cc', '#f6ecc8', '#f6dca8']); p.sun(880, 380, 100, '#fffbe0', '#fff0b4');
      p.forest({ x0: -60, x1: 1260, base: 1150, jit: 20, h: 760, n: 10, col: '#9ab89a', col2: '#b0c48a', trunk: '#8a7c76', flowers: '#f6cad8' }); p.fade('#f4ecc8', 0.4); p.rays(880, 380, 24, 1900, '#fff6cc', 0.22, 60, 170);
      const g = p.ridge({ y: 1480, amp: 26, col: '#c0bc7c', col2: '#7a8a54', seed: 6, freq: 0.004 }); hut(p, 240, 1480, 420); p.tree(1060, 1560, 1300, { col: '#5f8a66', trunk: '#3a2a30', spread: 0.34 });
      deity(p, 620, 1620, 900, Object.assign({}, SITX, { halo: '#fff6d0', arms: [{ s: -1, th: 70, ph: 80, L2: 150 }, { s: 1, th: 70, ph: 80, L2: 150 }] }));
      for (const s of [-1, 1]) deity(p, 620 + s * 240, 1680, 470, Object.assign({}, RAMX, { skin: '#7f9ad0', arms: [{ s: -s, th: 60, ph: 40 }, { s: s, th: 60, ph: 20, kind: 'bow', k: 1.0 }] }));
      F(p, 1060, 1700, 300, SAGE, SIT, { f: -1, aN: [60, 100] }); p.quad(180, 1720, 150, { kind: 'deer', f: 1, col: '#c9a070', spots: '#f6e6c8' });
      p.grass(0, 1200, g, 28, '#98a45c', 140); for (let i = 0; i < 60; i++) p.circ(p.rr(0, 1200), p.rr(1500, 1780), p.rr(4, 8), p.r() < 0.5 ? '#f8d0dc' : '#fff4c4');
    }, after: lettering('Mother of Lava and Kusha', 'लव कुश', 'In the hermitage of Valmiki') });
  add({ title: 'Kodanda Rama', kanda: 'Icon', w: 1200, h: 1800, seed: 808,
    text: 'Rama of the bow, alone before the storm sea, in the bark and matted hair of the forest years.',
    draw(p) {
      p.sky(['#1c2a5a', '#3f5a98', '#8fa0c8', '#e6d8c0']); p.clouds({ n: 10, y0: 40, y1: 700, size: 230, col: '#6a7aa8', shadow: '#2a3466', light: '#e6e0d8' }); scr(p, () => { p.glow(600, 620, 760, '#e6f0ff', 0.6); p.rays(600, 500, 30, 1500, '#f0f6ff', 0.16); });
      p.sea(1040, '#a8c0cc', '#24507a', '#eef6f0', 600, 1560); p.waves(1150, 1540, '#2f6088', 50, '#f6fbf6');
      p.ridge({ y: 1580, amp: 30, col: '#c9b890', col2: '#5a4a44', seed: 9, freq: 0.005 });
      deity(p, 600, 1640, 1240, Object.assign({}, RAMX, { halo: '#f0f6ff', arms: [{ s: -1, th: 60, ph: -30, L2: 150 }, { s: 1, th: 60, ph: 20, kind: 'bow', k: 1.9 }] }));
      p.birds(20, 60, 200, 1140, 900, '#f0f4f6', 10);
    }, after: lettering('Kodanda Rama', 'कोदण्ड राम', 'Rama of the bow') });

  // ================= 9-12: blood-red posters, new compositions =================
  add({ title: 'The Rain of Arrows', kanda: 'Yuddha Kanda', w: 1080, h: 1920, seed: 809, light: 1,
    text: 'One man with a bow on the plain before Lanka, and the ten-headed king filling the sky.',
    draw(p) {
      const c = p.c; p.rect(0, 0, 1080, 1920, '#9a9a9a'); for (let i = 0; i < 60; i++) p.ell(p.rr(0, 1080), p.rr(0, 1500), p.rr(100, 300), p.rr(30, 90), p.r() < 0.5 ? '#a8a8a8' : '#868686', 0.5, -0.9);
      for (let i = 0; i < 230; i++) { const x = p.rr(0, 470), y0 = p.rr(-200, 900), l = p.rr(200, 700); p.line(x, y0, x, y0 + l, p.rr(1.5, 4), '#3a3a3a', 0.8); if (i % 3 === 0) p.poly([[x - 7, y0 + l - 30], [x + 7, y0 + l - 30], [x, y0 + l]], '#1a1a1a'); }
      scr(p, () => p.glow(520, 1250, 420, '#ffffff', 0.9)); p.city({ x0: 300, x1: 760, base: 1380, h: 300, n: 22, col: '#f0f0f0', col2: '#d8d8d8', gold: '#ffffff', peakX: 520, peakW: 160 }); for (const x of [360, 520, 680]) p.fire(x, 1300, 120, 220, { cols: ['#c8c8c8', '#e0e0e0', '#f4f4f4', '#ffffff'] });
      F(p, 900, 1560, 1640, RAVAN, { f: -1, lean: 8, head: 10, aN: [40, 90], aF: [70, 110], cape: '#141014', lN: [14, 4], lF: [-14, -6] });
      p.smoke(900, 1500, 200, 500, '#8a8a90', -0.3); p.rect(0, 1640, 1080, 280, '#6a6a6a'); p.ridge({ y: 1660, amp: 14, col: '#7a7a78', col2: '#3a3a3a', seed: 4, freq: 0.004 });
      p.wheel(900, 1760, 90, '#141414', '#3a3a3a'); for (const x of [460, 560, 700]) { p.ell(x, 1800, 40, 30, '#1a1a1a'); p.poly([[x - 10, 1774], [x + 10, 1774], [x, 1730]], '#1a1a1a'); }
      p.crowd({ x0: 0, x1: 300, y: 1660, jit: 10, h: 60, n: 20, col: '#1c1c1c', spears: 0.6 });
      grade(c, 1080, 1920, GR.blood);
      F(p, 240, 1790, 380, RAMA, { f: 1, back: true, cloth: '#f4f0e6', cloth2: '#c9302c', aN: [20, 40], aF: [40, 70], prop: { type: 'bow', hand: 'F', ang: 176, len: 0.46, col: '#3a2a22' } });
    }, after: lettering('The Rain of Arrows', 'रामायण', 'Yuddha Kanda', '#ffb040') });
  add({ title: 'Dashanan: Ten Heads, Twenty Arms', kanda: 'Yuddha Kanda', w: 1080, h: 1920, seed: 810,
    text: 'Ravana as his enemies saw him: scholar, king, devotee of Shiva, and ruin.',
    draw(p) {
      const c = p.c; p.rect(0, 0, 1080, 1920, '#5a5a5a'); stars(p, 100, 600);
      const hd = (m) => ({ type: 'human', skin: '#4a4a4a', crown: 'crown', must: '#0c0c0c', hair: '#0c0c0c', iris: '#ffffff', gold: '#bdbdbd', gem: '#ffffff', lips: '#1a1a1a', tilak: m ? 'tri' : 'dot' });
      vishva(p, { x: -60, y: 60, k: 1.0, noHood: true, skin: '#3a3a3a', red: '#1c1c1c', yellow: '#2a2a2a', aura: '#ffffff', auraA: 0.9, rayA: 0.24, ray: '#ffffff', heads: [0, 1, 2, 3, 4].map(i => [hd(i % 2), hd(!(i % 2))]), mainFace: Object.assign(hd(1), { crown: 'mukut', skin: '#4a4a4a' }), left: ['sword', 'trident', 'axe', 'bow', 'flame', 'mace'], right: ['sword', 'trident', 'axe', 'chakra', 'flame', 'mace'] });
      p.ridge({ y: 1700, amp: 20, col: '#2a2a2a', col2: '#0c0c0c', seed: 3, freq: 0.004 }); grade(c, 1080, 1920, GR.blood);
      F(p, 540, 1860, 200, RAMA, ARCH, { f: 1, lean: -30, aF: [150, 152], aN: [154, -30], prop: { type: 'bow', hand: 'F', ang: 240, drawn: true, glow: '#fff0a0' } });
    }, after: lettering('Dashanan', 'दशानन', 'Ten heads, twenty arms', '#ffb040') });
  add({ title: 'Lanka Burns', kanda: 'Sundara Kanda', w: 1080, h: 1920, seed: 811, light: 1,
    text: 'The messenger they tried to humiliate crosses the rooftops with his tail alight.',
    draw(p) {
      const c = p.c; p.rect(0, 0, 1080, 1920, '#8a8a8a'); p.clouds({ n: 10, y0: 40, y1: 800, size: 260, col: '#6a6a6a', shadow: '#2a2a2a', light: '#b8b8b8' });
      scr(p, () => p.glow(540, 1400, 900, '#ffffff', 0.7)); p.city({ x0: -40, x1: 1120, base: 1500, h: 560, n: 30, col: '#eeeeee', col2: '#cfcfcf', gold: '#ffffff', peakX: 540, peakW: 400 });
      for (let i = 0; i < 9; i++) p.fire(60 + i * 120, p.rr(1100, 1400), p.rr(100, 200), p.rr(260, 520), { cols: ['#bdbdbd', '#dcdcdc', '#f2f2f2', '#ffffff'], sway: 0.3 });
      const J = F(p, 560, 560, 700, HANU, { fly: true, f: -1, lean: 44, head: -24, lN: [70, -30], lF: [-60, -100], aN: [130, 160], aF: [60, 100], tail: 1.5, skin: '#2a2a2a', cloth: '#1a1a1a', cloth2: '#1a1a1a', gold: '#3a3a3a', muzzle: '#3a3a3a', prop: { type: 'mace', hand: 'N', ang: 190, len: 0.36, col: '#3a3a3a' } });
      p.fire(J.hip[0] + 200, J.hip[1] - 330, 120, 260, { cols: ['#c8c8c8', '#e0e0e0', '#f4f4f4', '#ffffff'], sway: 0.5 });
      p.city({ x0: -40, x1: 1120, base: 1700, h: 300, n: 16, col: '#2a2a2a', col2: '#1a1a1a', gold: '#4a4a4a' }); p.crowd({ x0: 0, x1: 1080, y: 1730, jit: 16, h: 50, n: 60, col: '#0c0c0c', spears: 0.5, arms: 0.4 });
      for (let i = 0; i < 300; i++) p.rect(p.rr(0, 1080), p.rr(0, 1700), p.rr(3, 8), p.rr(3, 8), '#ffffff', p.rr(0.4, 1)); grade(c, 1080, 1920, GR.blood);
    }, after: lettering('Lanka Burns', 'लंका दहन', 'Sundara Kanda', '#ffb040') });
  add({ title: 'The Bridge at Sunset', kanda: 'Yuddha Kanda', w: 1080, h: 1920, seed: 812,
    text: 'An army of monkeys and bears walks out across the sea on stones that float.',
    draw(p) {
      const c = p.c; p.rect(0, 0, 1080, 1920, '#7a7a7a'); scr(p, () => p.glow(540, 760, 900, '#ffffff', 0.8)); p.circ(540, 760, 330, '#ffffff'); p.streaks({ n: 16, y0: 500, y1: 1000, col: '#5a5a5a', a: 0.6 });
      p.sea(1000, '#b8b8b8', '#3a3a3a', '#ffffff', 540); p.ridge({ y: 1006, amp: 8, col: '#2a2a2a', peak: [540, 150, 70], seed: 4, bottom: 1002 }); p.city({ x0: 460, x1: 620, base: 950, h: 70, n: 8, col: '#1a1a1a', gold: '#1a1a1a' });
      p.poly([[530, 1004], [552, 1004], [900, 1920], [180, 1920]], '#1c1c1c');
      for (let i = 0; i < 80; i++) { const t = Math.pow(p.r(), 0.7), y = 1010 + t * 800, hw = 8 + t * 330; p.mini(540 + p.rr(-1, 1) * hw, y, 14 + t * 90, '#0c0c0c', { tail: p.r() < 0.5 ? 1 : -1, arms: p.r() < 0.4, spear: p.r() < 0.3, head: '#0c0c0c' }); }
      p.waves(1100, 1900, '#4a4a4a', 40, '#e0e0e0'); grade(c, 1080, 1920, GR.blood);
      F(p, 540, 1900, 330, RAMA, { f: 1, back: true, cloth: '#f4f0e6', prop: { type: 'bow', hand: 'F', ang: 176, len: 0.46, col: '#3a2a22' } });
    }, after: lettering('The Bridge at Sunset', 'सेतु बन्धन', 'Five days to cross the sea', '#ffb040') });

  // ================= 13-14: ember on black, new compositions =================
  add({ title: 'The Mountain in His Palm', kanda: 'Yuddha Kanda', seed: 813, light: 1,
    text: 'Hanuman over the night ocean with the herb mountain blazing in one hand and the mace in the other.',
    draw(p) {
      const c = p.c; p.rect(0, 0, 2000, 860, '#050505'); p.sea(720, '#141414', '#050505', '#5a5a5a', 400);
      p.clouds({ n: 8, y0: 420, y1: 780, size: 240, col: '#7a7a7a', shadow: '#1c1c1c', light: '#b8b8b8', x0: 200, x1: 1500 });
      const J = F(p, 1120, 470, 820, HANU, { fly: true, f: -1, lean: 24, head: -6, lN: [60, -20], lF: [30, -70], aN: [70, 20], aF: [100, 130], tail: 1.4, skin: '#b06a3a', cloth: '#f0c070', cloth2: '#ffe0a0', gold: '#ffd070', crown: 'bun', hair: '#1a1210', tilak: '#ffffff', prop: { type: 'mace', hand: 'N', ang: 30, len: 0.5, col: '#ffd070' } });
      const mx = J.hF[0] - 60, my = J.hF[1] - 10; p.blob([[mx - 260, my], [mx - 190, my - 130], [mx - 40, my - 250], [mx + 110, my - 190], [mx + 220, my - 70], [mx + 240, my], [mx, my + 50]], '#1c1612');
      scr(p, () => { for (let i = 0; i < 60; i++) p.glow(mx + p.rr(-220, 220), my - p.rr(10, 220), p.rr(14, 46), '#ffe0a0', 0.95); p.glow(mx, my - 100, 420, '#ffb060', 0.5); p.glow(J.hN[0] + 200, J.hN[1] + 330, 200, '#ffd070', 0.6); });
      for (let i = 0; i < 6; i++) p.ribbon([[J.hip[0], J.hip[1] + i * 10], [J.hip[0] + 240, J.hip[1] - 60 + i * 50], [J.hip[0] + 480, J.hip[1] + i * 60], [J.hip[0] + 700, J.hip[1] - 80 + i * 70]], 60, '#ffd890', 0.7);
      p.clouds({ n: 6, y0: 700, y1: 860, size: 220, col: '#5a5a5a', shadow: '#141414', light: '#9a9a9a' }); grade(c, 2000, 860, Object.assign({}, GR.ember, { gamma: 0.95 }));
    }, after: lettering('The Mountain in His Palm', 'संजीवनी', 'Before the sun rises', '#f8c868') });
  add({ title: 'The Vigil', kanda: 'Yuddha Kanda', seed: 814,
    text: 'The night before the bridge. Rama keeps a small fire on the beach and watches the lights of Lanka.',
    draw(p) {
      const c = p.c; p.rect(0, 0, 2000, 860, '#040404'); stars(p, 200, 420); p.sea(470, '#1a1a1a', '#050505', '#6a6a6a', 1500);
      p.ridge({ y: 474, amp: 6, col: '#101010', peak: [1500, 160, 50], seed: 4, bottom: 472, x0: 1200 }); for (let i = 0; i < 40; i++) scr(p, () => p.glow(p.rr(1400, 1600), p.rr(420, 470), p.rr(6, 14), '#ffd890', 0.9));
      const g = p.ridge({ y: 740, amp: 20, col: '#2a2420', col2: '#0a0806', seed: 9, freq: 0.004 });
      scr(p, () => p.glow(820, 640, 520, '#ffa040', 0.85)); p.fire(820, 740, 110, 200);
      F(p, 620, 750, 330, RAMA, SIT, { f: 1, skin: '#c8784a', cloth: '#f0c070', cloth2: '#ffd890', aN: [50, 70], head: -6, prop: { type: 'bow', hand: 'F', ang: 176, col: '#ffd070' } });
      F(p, 1030, 752, 300, RAMA, SIT, { f: -1, skin: '#b06a3a', cloth: '#d8a060' }); F(p, 1200, 756, 320, HANU, SIT, { f: -1, skin: '#a8603a', cloth: '#d8a060' });
      p.crowd({ x0: 0, x1: 460, y: g, h: 70, n: 30, col: '#141010', tail: 1 }); p.tree(1900, 880, 760, { col: '#0c0c0c', trunk: '#080808', kind: 'palm' }); grade(c, 2000, 860, Object.assign({}, GR.ember, { gamma: 0.95 }));
    }, after: lettering('The Vigil', 'रामेश्वरम्', 'The night before the bridge', '#f8c868') });

  // ================= 15-16: festival crowds =================
  add({ title: 'The Homecoming', kanda: 'Yuddha Kanda', w: 1600, h: 1600, seed: 815, light: 1, paint: Object.assign({}, DET, { vary: 1.4 }),
    text: 'Ayodhya turns out to the last child. Above the street hangs the flying palace Pushpaka, painted with swans.',
    draw(p) {
      p.sky(['#2f5fb8', '#5f8fd8', '#a8c8e8', '#f0e0c8']); p.clouds({ n: 9, y0: 40, y1: 700, size: 240, col: '#f6e6d0', shadow: '#a89ab8', light: '#fff6e0', x0: -100, x1: 900 });
      const c = p.c, dx = 860, dy = 520; p.clouds({ n: 5, y0: 560, y1: 660, size: 200, col: '#f0d8c8', shadow: '#a890b0', x0: 500, x1: 1200 });
      c.fillStyle = css('#8a4a6a'); c.beginPath(); c.ellipse(dx, dy, 430, 330, 0, Math.PI, 6.283); c.fill(); c.fillStyle = css('#c9708a'); c.beginPath(); c.ellipse(dx - 30, dy, 380, 300, 0, Math.PI, 6.283); c.fill();
      for (let k = 0; k < 5; k++) { c.strokeStyle = css(k % 2 ? GOLD : '#f6e6c0'); c.lineWidth = 14; c.beginPath(); c.ellipse(dx, dy, 420 - k * 70, 320 - k * 56, 0, Math.PI, 6.283); c.stroke(); }
      for (let k = -4; k <= 4; k++) { const x = dx + k * 84, y = dy - 110 - Math.cos(k * 0.36) * 80; p.ell(x, y, 30, 18, '#fbf6ee'); p.curve([[x + 20, y - 6], [x + 34, y - 34], [x + 22, y - 50]], 9, '#fbf6ee'); p.poly([[x + 22, y - 54], [x + 40, y - 48], [x + 24, y - 44]], GOLD); }
      p.rect(dx - 440, dy - 6, 880, 46, GOLD); p.poly([[dx - 440, dy + 40], [dx + 440, dy + 40], [dx + 330, dy + 130], [dx - 330, dy + 130]], '#6a3a5a'); p.shikhara(dx, dy - 300, 110, 240, GOLD, GOLD2); for (const s of [-1, 1]) p.shikhara(dx + s * 150, dy - 250, 60, 130, GOLD, GOLD2);
      for (const s of [-1, 1]) for (let k = 0; k < 6; k++) { const t = k / 6, x = 800 + s * (760 - t * 560), w = 300 - t * 200, h = 900 - t * 560, base = 1180 - t * 150; p.block(x, base, w, h, mix(s < 0 ? '#c88a6a' : '#e0b088', '#d8a8b8', t)); p.rect(x - w / 2, base - h * 0.5, w, 12, GOLD); p.crowd({ x0: x - w / 2, x1: x + w / 2, y: base - h * 0.5, jit: 2, h: 60 - t * 34, n: 12, col: '#c9463a', col2: '#f0c060', arms: 0.6 }); }
      for (const s of [-1, 1]) for (let k = 0; k < 7; k++) { const t = k / 7, x = 800 + s * (700 - t * 560), y0 = 200 + t * 520, l = 760 - t * 520; p.line(x, y0, x, y0 + l + 300 * (1 - t), 8 - t * 5, '#5a3a2a'); p.ribbon([[x, y0], [x + s * 14, y0 + l * 0.35], [x - s * 10, y0 + l * 0.7], [x + s * 8, y0 + l]], 110 - t * 80, k % 2 ? '#f08a1e' : '#f6e0b0', 0.95); }
      p.poly([[740, 1060], [860, 1060], [1500, 1600], [100, 1600]], '#d8b070'); p.poly([[770, 1060], [830, 1060], [1100, 1600], [500, 1600]], '#5a7ab8', 0.6);
      for (let r = 0; r < 7; r++) { const t = r / 6, y = 1070 + t * t * 470, hw = 60 + t * 760; for (const s of [-1, 1]) p.crowd({ x0: 800 + s * hw * 0.34, x1: 800 + s * (hw + 200), y: y, jit: 10 + t * 26, h: 34 + t * 110, n: 26, col: ['#c9463a', '#e8a03a', '#7a4a8a', '#3f7a8a'][r % 4], col2: '#f0d0a0', arms: 0.6, banners: 0.04, bannerCol: '#f08a1e', head: '#3a2a22' }); }
      p.quad(170, 1330, 430, { kind: 'elephant', f: 1, col: '#7a7480', cloth: '#c9463a' }); p.quad(1470, 1250, 300, { kind: 'elephant', f: -1, col: '#8a8490', cloth: '#f0c060' });
      scr(p, () => p.glow(800, 1040, 170, '#fff6c8', 0.9)); const d = p.chariot(790, 1130, 90, { f: 1, col: '#b0763a', horse: '#ffffff', canopyCol: '#f0c85a', horses: 2, gait: 'walk' }); deity(p, 800, 1090, 150, Object.assign({}, RAMF, { arms: [palmL, restR] }));
      p.line(1160, 1150, 1180, 1560, 9, '#5a3a2a'); c.fillStyle = '#fbf6ea'; c.beginPath(); c.ellipse(1160, 1150, 150, 80, 0, Math.PI, 6.283); c.fill(); p.rect(1010, 1146, 300, 12, '#e0d4c0'); for (let k = 0; k < 14; k++) p.line(1016 + k * 22, 1158, 1016 + k * 22, 1180, 3, '#f0e6d0');
      F(p, 1190, 1600, 330, { skin: '#8a5a3c', cloth: '#f4f0e6', cloth2: '#f4f0e6', crown: 'bun', plain: true }, { f: -1, back: true, aN: [150, 170] });
      for (let i = 0; i < 700; i++) p.ell(p.rr(0, 1600), p.rr(700, 1600), p.rr(4, 9), p.rr(3, 6), ['#fbd0dc', '#fff3c0', '#f08a1e', '#ffffff'][i % 4], 0.9, p.rr(0, 3));
    }, after: lettering('The Homecoming', 'अयोध्या', 'Fourteen years are over') });
  add({ title: 'The Wedding at Mithila', kanda: 'Bala Kanda', w: 1600, h: 1600, seed: 816, paint: Object.assign({}, DET, { vary: 1.4 }),
    text: 'Janaka gives his daughter with the words: this is Sita, my child; she will walk with you in dharma.',
    draw(p) {
      p.sky(['#7a1c3a', '#c9463a', '#f08a3a', '#fbd890']); p.city({ x0: 0, x1: 1600, base: 1000, h: 700, n: 16, col: '#e8b890', col2: '#d898a0', gold: GOLD }); p.fade('#f8c890', 0.4);
      for (const x of [220, 520, 1080, 1380]) p.pillar(x, 1150, 100, 1000, '#e8c0a0'); p.rect(140, 110, 1320, 70, '#c98a70'); for (let i = 0; i < 12; i++) p.ribbon([[190 + i * 110, 180], [220 + i * 110, 300], [190 + i * 110, 420]], 70, ['#f08a1e', '#f6e0b0', '#c9302c'][i % 3], 0.9);
      for (let i = 0; i < 40; i++) { p.circ(160 + i * 33, 200 + Math.sin(i * 0.6) * 22, 12, i % 2 ? '#f08a1e' : '#fff0a0'); }
      p.rect(0, 1150, 1600, 450, '#b8704a'); p.poly([[360, 1170], [1240, 1170], [1440, 1600], [160, 1600]], '#c9302c'); p.poly([[420, 1170], [1180, 1170], [1340, 1600], [260, 1600]], '#e0583a');
      scr(p, () => p.glow(800, 1100, 520, '#fff0a0', 0.8)); p.rect(720, 1300, 160, 60, '#8a5a3a'); p.fire(800, 1300, 110, 220);
      deity(p, 610, 1290, 620, Object.assign({}, RAMF, { halo: '#fff6c8', arms: [restL, { s: 1, th: 40, ph: 0 }] })); deity(p, 990, 1290, 560, Object.assign({}, SITF, { halo: '#fff6c8', garland: '#f4a0bc', arms: [{ s: -1, th: 40, ph: 0 }, restR] }));
      F(p, 1240, 1320, 300, { skin: '#d9a77c', robe: '#8f3f5a', drape: '#f0c85a', crown: 'mukut', sash: false, beard: '#e9e4dc' }, { f: -1, aN: [80, 100] }); F(p, 370, 1320, 280, SAGE, { f: 1, aN: [80, 110] });
      for (const s of [-1, 1]) for (let r = 0; r < 3; r++) p.crowd({ x0: 800 + s * 520, x1: 800 + s * 800, y: 1250 + r * 110, jit: 16, h: 110 + r * 40, n: 10, col: ['#7a4a8a', '#e8a03a', '#3f7a8a'][r], col2: '#f0d0a0', arms: 0.5, head: '#3a2a22' });
      petals(p, 600, ['#fbd0dc', '#fff3c0', '#ffffff', '#f08a1e'], 1600, 1600); for (const x of [120, 1480]) p.lamp(x, 1540, 26);
    }, after: lettering('The Wedding at Mithila', 'विवाह', 'Bala Kanda') });

  // ================= 17-28: carved registers, three scenes to a poster =================
  const KANDA = [
    ['Bala Kanda', 'बालकाण्ड', [2, 3, 5], INK.gold, 'The book of youth'], ['Ayodhya Kanda', 'अयोध्याकाण्ड', [6, 7, 8], INK.inferno, 'The book of the city'],
    ['Aranya Kanda', 'अरण्यकाण्ड', [9, 10, 11], INK.forest, 'The book of the forest'], ['Kishkindha Kanda', 'किष्किन्धाकाण्ड', [12, 13, 14], INK.saffron, 'The book of the monkey kingdom'],
    ['Sundara Kanda', 'सुन्दरकाण्ड', [15, 16, 17], INK.inferno, 'The beautiful book'], ['Yuddha Kanda I', 'युद्धकाण्ड', [18, 19, 20], INK.saffron, 'The book of war: the crossing'],
    ['Yuddha Kanda II', 'युद्धकाण्ड', [21, 22, 23], INK.inferno, 'The book of war: the field'], ['The Return', 'उत्तरकाण्ड', [24, 25, 1], INK.gold, 'Fire, homecoming, and the poem itself'],
    ['The Book of Hanuman', 'हनुमान', [13, 15, 22], INK.saffron, 'Strength in the service of another'], ['The Book of Sita', 'सीता', [5, 16, 24], INK.rose, 'Chosen, taken, tested'],
    ['The Book of Demons', 'राक्षस', [3, 10, 20], INK.forest, 'Tataka, Ravana, Kumbhakarna'], ['The Book of Brothers', 'भ्राता', [8, 14, 21], INK.gold, 'Bharata, Vali and Sugriva, Lakshmana']
  ];
  KANDA.forEach((k, n) => {
    const ink = k[3], idx = k[2];
    add({ title: k[0] + ' (woodcut)', kanda: 'Carved register', w: 1200, h: 2000, seed: 820 + n, paint: FLAT,
      text: k[4] + '. Three scenes carved one above another in three inks: ' + idx.map(i => RS[i - 1].title).join('; ') + '.',
      draw(p) {
        const c = p.c; c.fillStyle = '#f4f4f4'; c.fillRect(0, 0, 1200, 2000);
        idx.forEach((i, r) => { const im = Epic.compose(RS[i - 1]); c.drawImage(im, 40, 210 + r * 572, 1120, 482); });
        for (let i = 0; i < 26; i++) { c.fillStyle = i % 2 ? '#ff8040' : '#f4f4f4'; c.beginPath(); c.ellipse(60 + i * 45, 110, 26, 60, 0.4, 0, 6.3); c.fill(); }
        lino(c, 1200, 2000, ink); c.fillStyle = ink.paper; c.fillRect(0, 0, 1200, 40); c.fillRect(0, 692, 1200, 90); c.fillRect(0, 1264, 1200, 90); c.fillRect(0, 1836, 1200, 164); c.fillRect(0, 0, 40, 2000); c.fillRect(1160, 0, 40, 2000);
      },
      after(c) {
        c.fillStyle = ink.paper; c.fillRect(150, 40, 900, 150); txt(c, k[1], 600, 96, 78, ink.accent, { hin: true, w: 700 }); txt(c, k[0].toUpperCase(), 600, 160, 30, ink.dark, { ls: 12 });
        idx.forEach((i, r) => { const y = 737 + r * 572; if (r < 2) { c.fillStyle = ink.accent; c.fillRect(40, y - 34, 1120, 4); c.fillRect(40, y + 30, 1120, 4); txt(c, RS[idx[r + 1] - 1].title.toUpperCase(), 600, y, 30, ink.dark, { ls: 8 }); for (const x of [90, 1110]) { c.fillStyle = ink.accent; c.beginPath(); c.arc(x, y, 12, 0, 6.3); c.fill(); } } });
        c.fillStyle = ink.accent; c.fillRect(40, 1846, 1120, 4); txt(c, 'RAMAYANA', 600, 1900, 54, ink.accent, { ls: 26 }); txt(c, k[4].toUpperCase(), 600, 1956, 22, ink.dark, { ls: 6 });
        c.strokeStyle = ink.dark; c.lineWidth = 12; c.strokeRect(6, 6, 1188, 1988); c.lineWidth = 3; c.strokeRect(26, 26, 1148, 1948);
      } });
  });

  // ================= 29-36: single carved prints =================
  const PR = [[1, INK.gold, 'राम', 'Prince of Ayodhya'], [2, INK.forest, 'वनवास', 'Into the Forest'], [3, INK.saffron, 'पंचवटी', 'The Moonlit Hermitage'], [4, INK.inferno, 'भक्ति', 'Rama and Hanuman'], [5, INK.saffron, 'शरणागति', 'Refuge for Vibhishana'], [6, INK.inferno, 'युद्ध', 'The Archer and the King'], [7, INK.rose, 'अन्त्येष्टि', 'The Last Rites of an Enemy'], [8, INK.gold, 'पट्टाभिषेक', 'Pattabhisheka']];
  PR.forEach((q, n) => add({ title: q[3] + ' (woodcut)', kanda: 'Carved print', w: 1200, h: 1800, seed: 840 + n, paint: FLAT, text: RP[q[0] - 1].text,
    draw(p) { p.c.drawImage(Epic.compose(RP[q[0] - 1]), 0, 0); lino(p.c, 1200, 1800, q[1]); }, after: banner(q[3], q[2], 'Ramayana', q[1]) }));

  // ================= 37-50: existing scenes re-graded as posters =================
  const RE = [
    ['ramayana', 23, 'blood', 'युद्ध', 'Rama and Ravana', 1080, 1920, 0.72], ['ramayana', 20, 'blood', 'कुम्भकर्ण', 'Kumbhakarna Wakes', 1080, 1920, 0.4], ['ramayana', 24, 'blood', 'अग्नि', 'The Trial by Fire', 1080, 1920, 0.5], ['ramayana', 10, 'blood', 'हरण', 'The Abduction', 1080, 1920, 0.55],
    ['ramayana', 15, 'ember', 'हनुमान', "Hanuman's Leap", 2000, 860], ['ramayana', 17, 'ember', 'लंका दहन', 'Lanka in Flames', 2000, 860], ['ramayana', 11, 'ember', 'जटायु', 'Jatayu', 2000, 860], ['ramayana', 21, 'ember', 'गरुड़', 'Garuda Descends', 2000, 860], ['rama', 4, 'ember', 'भक्ति', 'Rama and Hanuman', 1200, 1800], ['rama', 6, 'ember', 'धनुर्धर', 'The Archer', 1200, 1800],
    ['ramayana', 16, 'indigo', 'अशोक वाटिका', 'The Ring in the Grove', 2000, 860], ['ramayana', 7, 'indigo', 'गंगा', 'Crossing the Ganga', 2000, 860], ['ramayana', 25, 'indigo', 'दीपावली', 'The Night of Lamps', 2000, 860], ['ramayana', 9, 'moss', 'मारीच', 'The Golden Deer', 2000, 860]
  ];
  RE.forEach((q, n) => { const src = Epic.scenes[q[0]][q[1] - 1]; add({ title: q[4] + ' (' + q[2] + ')', kanda: src.kanda, w: q[5], h: q[6], seed: 860 + n, text: src.text,
    draw(p) { cover(p.c, Epic.compose(src), q[5], q[6], q[7]); grade(p.c, q[5], q[6], GR[q[2]]); }, after: lettering(q[4], q[3], src.kanda, q[2] === 'indigo' ? '#f0c878' : q[2] === 'moss' ? '#f0d880' : '#ffb040') }); });

  Epic.scenes.posters = S;
})();
