/* Samudra Manthan: the churning of the ocean of milk, and Shiva as Neelakantha.
   Follows the account in the Bhagavata Purana (8.5-12), with the Mahabharata (Adi Parva 15-17)
   and the Vishnu Purana (1.9). `cap` is the line used in the two-minute film. */
(function () {
  'use strict';
  const { mix, lite, dark, css } = Epic;
  const { F, scr, PRAY, KNEEL, SIT, SAGE } = Epic.kit;
  const { face, attr, stars, DET } = Epic.front;
  const GOLD = '#f3c65a', GOLD2 = '#fff0a8', GOLDD = '#b8822e';
  const DEVA = { skin: '#f0cf9a', cloth: '#f6e2a0', cloth2: '#e8703a', crown: 'mukut', gold: '#fff0a8', hair: '#2a1c22' };
  const ASURA = { skin: '#6a7a8a', cloth: '#5a2f4a', cloth2: '#b8323a', crown: 'horns', hair: '#17131f', fangs: true, gold: '#c9a060', broad: 1.25 };
  const AS_COL = ['#6a7a8a', '#7a5a8a', '#4f7a6a', '#8a5a4a', '#5a5a7a'];
  const DV_COL = ['#f0cf9a', '#f6dcb0', '#e8c088', '#f8e0c0'];

  // a front-facing deity, standing or seated; h is roughly the full standing height
  function deity(p, x, y, h, o) {
    const u = h / 1000, c = p.c, sk = o.skin, skd = dark(sk, 0.3), lx = p.lx, cloth = o.cloth || '#f4c93a', B = o.seat ? 130 : 480, hipY = y - B * u, fem = o.fem;
    const X = v => x + v * u, T = v => hipY - v * u, sw = fem ? 0.84 : 1, hr = 68 * u, hy = T(408);
    if (o.halo) scr(p, () => { p.glow(x, hy, 420 * u, o.halo, 0.8); p.rays(x, hy, 36, 700 * u, o.halo, 0.14); });
    if (o.long) p.blob([[X(-70), T(470)], [X(-120), T(330)], [X(-150), T(120)], [X(-90), T(60)], [X(0), T(200)], [X(90), T(60)], [X(150), T(120)], [X(120), T(330)], [X(70), T(470)]], o.hair || '#17131f');
    if (o.mantle) for (const s of [-1, 1]) { p.blob([[X(s * 110), T(290)], [X(s * 190), T(160)], [X(s * 230), T(-150)], [X(s * 330), T(-B + 20)], [X(s * 200), T(-B + 10)], [X(s * 140), T(-100)], [X(s * 110), T(100)]], s * lx > 0 ? o.mantle : dark(o.mantle, 0.2)); p.curve([[X(s * 190), T(160)], [X(s * 230), T(-150)], [X(s * 330), T(-B + 20)]], 6 * u, GOLD); }
    const hands = [];
    (o.arms || []).forEach((a, i) => {
      const s = a.s, th = a.th * Math.PI / 180, ph = a.ph * Math.PI / 180, L1 = (a.L1 || 150) * u, L2 = (a.L2 || 135) * u, col = a.back ? skd : sk;
      const sx = X(s * 116 * sw), sy = T(262), ex = sx + s * Math.cos(th) * L1, ey = sy + Math.sin(th) * L1, hx = ex + s * Math.cos(ph) * L2, hY = ey + Math.sin(ph) * L2;
      p.limb(sx, sy, ex, ey, 50 * u * sw, 40 * u * sw, col, 0.25); p.limb(ex, ey, hx, hY, 38 * u * sw, 28 * u * sw, col, 0.2);
      if (!o.plain) { const mx = (sx + ex) / 2, my = (sy + ey) / 2, pa = Math.atan2(ey - sy, ex - sx) + 1.5708; p.line(mx - Math.cos(pa) * 24 * u, my - Math.sin(pa) * 24 * u, mx + Math.cos(pa) * 24 * u, my + Math.sin(pa) * 24 * u, 14 * u, o.band || GOLD); const wx = hx - (hx - ex) * 0.2, wy = hY - (hY - ey) * 0.2, wa = Math.atan2(hY - ey, hx - ex) + 1.5708; p.line(wx - Math.cos(wa) * 17 * u, wy - Math.sin(wa) * 17 * u, wx + Math.cos(wa) * 17 * u, wy + Math.sin(wa) * 17 * u, 16 * u, o.band || GOLD); }
      p.circ(hx, hY, 20 * u, lite(col, 0.1)); Epic.palmSkin = sk; if (a.kind) attr(p, a.kind, hx, hY, s, u * (a.k || 0.9)); hands.push([hx, hY]);
    });
    if (o.seat) {
      p.blob([[X(-310), T(-110)], [X(-270), T(20)], [X(-100), T(60)], [X(0), T(40)], [X(100), T(60)], [X(270), T(20)], [X(310), T(-110)], [X(130), T(-150)], [X(0), T(-130)], [X(-130), T(-150)]], dark(cloth, 0.25));
      p.blob([[X(-280), T(-100)], [X(-240), T(10)], [X(-90), T(46)], [X(0), T(24)], [X(90), T(46)], [X(240), T(10)], [X(280), T(-100)], [X(120), T(-134)], [X(0), T(-112)], [X(-120), T(-134)]], cloth);
      for (const s of [-1, 1]) { p.ell(X(s * 250), T(-60), 60 * u, 52 * u, s * lx > 0 ? lite(sk, 0.1) : skd); p.ell(X(s * 70), T(-104), 78 * u, 30 * u, sk, 1, s * -0.25); p.ell(X(s * 110), T(-112), 20 * u, 12 * u, lite(sk, 0.3)); }
      if (o.stripes) for (let k = -5; k <= 5; k++) p.curve([[X(k * 50 - 10), T(30)], [X(k * 50 + 10), T(-40)], [X(k * 50 - 6), T(-110)]], 9 * u, o.stripes, 0.85);
    } else if (fem) {
      p.blob([[X(-92), T(0)], [X(-150), T(-250)], [X(-190), T(-B)], [X(190), T(-B)], [X(150), T(-250)], [X(92), T(0)]], dark(cloth, 0.25)); p.blob([[X(-80), T(0)], [X(-130), T(-250)], [X(-166), T(-B + 6)], [X(166), T(-B + 6)], [X(130), T(-250)], [X(80), T(0)]], cloth);
      for (let k = -4; k <= 4; k++) p.curve([[X(k * 16), T(-20)], [X(k * 28), T(-250)], [X(k * 38), T(-B + 10)]], 4 * u, dark(cloth, 0.3), 0.6); p.rect(X(-172), T(-B + 40), 344 * u, 34 * u, o.border || GOLD); for (let k = -6; k <= 6; k++) p.circ(X(k * 26), T(-B + 23), 6 * u, '#c9342f');
      for (const s of [-1, 1]) p.ell(X(s * 60), y + 4 * u, 44 * u, 16 * u, sk);
    } else {
      for (const s of [-1, 1]) { p.ell(X(s * 62), y + 6 * u, 52 * u, 20 * u, skd); p.blob([[X(s * 100), T(0)], [X(s * 116), T(-240)], [X(s * 100), T(-B + 20)], [X(s * 18), T(-B + 12)], [X(s * 4), T(-240)], [X(0), T(0)]], s * lx > 0 ? lite(cloth, 0.15) : dark(cloth, 0.15)); for (let k = 0; k < 4; k++) p.curve([[X(s * (24 + k * 20)), T(-20)], [X(s * (30 + k * 22)), T(-240)], [X(s * (26 + k * 20)), T(-B + 20)]], 3.5 * u, dark(cloth, 0.3), 0.6); }
      p.poly([[X(-36), T(0)], [X(36), T(0)], [X(64), T(-330)], [X(0), T(-390)], [X(-64), T(-330)]], o.sash || '#c9302c'); for (let k = -2; k <= 2; k++) p.line(X(k * 10), T(-6), X(k * 22), T(-330), 3 * u, dark(o.sash || '#c9302c', 0.35), 0.7);
      if (o.stripes) for (let k = -3; k <= 3; k++) p.curve([[X(k * 30 - 8), T(-10)], [X(k * 30 + 8), T(-80)], [X(k * 30 - 6), T(-150)]], 9 * u, o.stripes, 0.85);
    }
    // torso
    const top = fem ? (o.top || '#c9302c') : sk, tp = k => [[-46, 322], [-124 * sw, 276], [-112 * sw, 190], [-72 * sw, 60], [-92, -10], [92, -10], [72 * sw, 60], [112 * sw, 190], [124 * sw, 276], [46, 322]].map(q => [X(q[0] * k + (k < 1 ? lx * 10 : 0)), T(q[1])]);
    p.blob(tp(1), skd); p.blob(tp(0.88), sk); if (fem) { p.blob([[X(-110 * sw), T(270)], [X(-106 * sw), T(170)], [X(0), T(140)], [X(106 * sw), T(170)], [X(110 * sw), T(270)], [X(0), T(240)]], top); p.curve([[X(-104 * sw), T(172)], [X(0), T(142)], [X(104 * sw), T(172)]], 6 * u, GOLD); }
    else { p.blob([[X(lx * 24), T(250)], [X(lx * 100), T(240)], [X(lx * 86), T(160)], [X(lx * 20), T(150)]], lite(sk, 0.18)); for (const s of [-1, 1]) p.curve([[X(s * 10), T(210)], [X(s * 56), T(150)], [X(s * 100), T(186)]], 4 * u, dark(sk, 0.4), 0.6); p.line(x, T(240), x, T(30), 3 * u, dark(sk, 0.4), 0.5); p.ell(x, T(28), 6 * u, 9 * u, dark(sk, 0.5)); }
    for (const s of [-1, 1]) p.circ(X(s * 118 * sw), T(266), 42 * u * sw, s * lx > 0 ? lite(sk, 0.12) : skd);
    p.rect(X(-32), T(350), 64 * u, 60 * u, o.throat || skd); p.rect(X(-32 + (lx > 0 ? 22 : 0)), T(350), 42 * u, 60 * u, o.throat ? lite(o.throat, 0.15) : sk);
    if (o.throat) scr(p, () => p.glow(x, T(320), 90 * u, '#6fa8ff', 0.8));
    if (o.thread) p.curve([[X(104), T(280)], [X(10), T(150)], [X(-70), T(20)]], 4 * u, '#fbf8f0');
    p.rect(X(-96), T(18), 192 * u, 38 * u, o.belt || GOLD); if (!o.plain) { p.ell(x, T(0), 30 * u, 26 * u, GOLDD); p.ell(x, T(0), 16 * u, 14 * u, '#c9342f'); }
    if (o.beads) { for (const q of [[86, 190, 50], [112, 100, 60]]) for (let k = 0; k <= 16; k++) { const t = k / 16 * Math.PI; p.circ(X(-Math.cos(t) * q[0]), T(300 - Math.sin(t) * (300 - q[1])), 9 * u, k % 2 ? '#6a3f2a' : '#8a5a3a'); } }
    else { p.curve([[X(-46), T(318)], [x, T(280)], [X(46), T(318)]], 12 * u, GOLD); p.curve([[X(-80), T(300)], [X(-40), T(200)], [x, T(170)], [X(40), T(200)], [X(80), T(300)]], 7 * u, GOLD); p.ell(x, T(160), 18 * u, 21 * u, GOLD); p.ell(x, T(160), 9 * u, 11 * u, o.gem || '#2f8f7a'); }
    if (o.garland) { const G = [[-100, 310], [-130, 150], [-90, -60], [0, -150], [90, -60], [130, 150], [100, 310]]; for (let i = 0; i < G.length - 1; i++) for (let t = 0; t < 1; t += 0.14) { const gx = X(G[i][0] + (G[i + 1][0] - G[i][0]) * t), gy = T(G[i][1] + (G[i + 1][1] - G[i][1]) * t); p.circ(gx, gy, 13 * u, o.garland); p.circ(gx + lx * 2, gy - 2, 7 * u, lite(o.garland, 0.5)); } }
    face(p, x, hy, hr, Object.assign({ skin: sk }, o.face || {}));
    return { head: [x, hy], r: hr, hands: hands, hip: [x, hipY], neck: [x, T(322)], u: u };
  }
  const SHIVA = { skin: '#c8d4ee', cloth: '#d98a3a', stripes: '#3a2a22', plain: true, band: '#6a3f2a', beads: true, throat: '#2f5fd0', belt: '#6a3f2a', sash: '#b8742a', thread: true, face: { crown: 'jata', tilak: 'tri', long: true, hair: '#3a2c2a', lips: '#8a6a8a' }, long: true, hair: '#3a2c2a' };
  const VISHNU = { skin: '#3f64c4', cloth: '#f4c93a', mantle: '#c9302c', thread: true, garland: '#f1ece4', face: { crown: 'mukut', tilak: 'U', lips: '#2a3f8a' }, long: true };
  function shivaExtras(p, J, o) {
    const u = J.u, x = J.head[0], hy = J.head[1], r = J.r;
    p.tube([[x - r * 0.2, hy - r * 2.0], [x + r * 0.9, hy - r * 2.5], [x + r * 2.2, hy - r * 1.4], [x + r * 2.6, hy + r * 1.5], [x + r * 2.4, hy + r * 5]], t => r * (0.16 + t * 0.5), 0, '#dff0ff'); scr(p, () => p.glow(x + r * 2.4, hy + r * 3, r * 2, '#cfe8ff', 0.5));
    const n = J.neck; p.tube([[n[0] - 60 * u, n[1] + 26 * u], [n[0], n[1] + 50 * u], [n[0] + 70 * u, n[1] + 20 * u], [n[0] + 120 * u, n[1] - 60 * u], [n[0] + 110 * u, n[1] - 130 * u]], 30 * u, 22 * u, '#3f5a4a'); p.tube([[n[0] - 60 * u, n[1] + 22 * u], [n[0], n[1] + 46 * u], [n[0] + 70 * u, n[1] + 16 * u], [n[0] + 120 * u, n[1] - 60 * u], [n[0] + 110 * u, n[1] - 130 * u]], 12 * u, 8 * u, '#8fb09a');
    p.ell(n[0] + 108 * u, n[1] - 150 * u, 36 * u, 46 * u, '#33483c'); p.ell(n[0] + 108 * u, n[1] - 146 * u, 24 * u, 32 * u, '#a8c4a8'); p.ell(n[0] + 108 * u, n[1] - 128 * u, 16 * u, 12 * u, '#3f5a4a'); for (const s of [-1, 1]) p.circ(n[0] + 108 * u + s * 7 * u, n[1] - 130 * u, 3 * u, '#ffe27a');
    if (o && o.trident) { const tx = o.trident[0], ty = o.trident[1], k = u * 1.5; attr(p, 'trident', tx, ty, 1, k); p.blob([[tx - 30 * k, ty - 150 * k], [tx, ty - 138 * k], [tx + 34 * k, ty - 150 * k], [tx + 18 * k, ty - 120 * k], [tx + 34 * k, ty - 90 * k], [tx, ty - 102 * k], [tx - 30 * k, ty - 90 * k], [tx - 14 * k, ty - 120 * k]], '#b8323a'); p.ell(tx - 32 * k, ty - 120 * k, 7 * k, 30 * k, '#f1e6d0'); p.ell(tx + 36 * k, ty - 120 * k, 7 * k, 30 * k, '#f1e6d0'); }
  }
  function nandi(p, x, y, h, f) { const q = p.quad(x, y, h, { kind: 'horse', f: f, col: '#f4f0ea', mane: '#f4f0ea', gait: 'stand' }); p.circ(q.cx - f * h * 0.1, q.cy - h * 0.26, h * 0.13, '#f4f0ea'); for (const s of [0, 1]) p.curve([[q.head[0] - f * h * 0.02 * s, q.head[1] - h * 0.06], [q.head[0] - f * h * 0.1, q.head[1] - h * 0.2], [q.head[0] + f * h * 0.02, q.head[1] - h * 0.3]], h * 0.035, '#e8d8b0'); p.curve([[q.head[0] - f * h * 0.1, q.head[1] + h * 0.1], [q.head[0], q.head[1] + h * 0.3], [q.head[0] + f * h * 0.1, q.head[1] + h * 0.1]], h * 0.03, GOLD); p.circ(q.head[0], q.head[1] + h * 0.3, h * 0.04, GOLD); }
  function kurma(p, cx, cy, w) {
    const sh = '#4f7a5a';
    for (const s of [-1, 1]) { p.blob([[cx + s * w * 0.3, cy + w * 0.06], [cx + s * w * 0.62, cy + w * 0.1], [cx + s * w * 0.7, cy + w * 0.22], [cx + s * w * 0.4, cy + w * 0.2]], '#7a9a6a'); p.blob([[cx + s * w * 0.1, cy + w * 0.12], [cx + s * w * 0.26, cy + w * 0.28], [cx + s * w * 0.1, cy + w * 0.3]], '#6a8a5a'); }
    p.tube([[cx - w * 0.42, cy + w * 0.04], [cx - w * 0.6, cy - w * 0.02], [cx - w * 0.7, cy - w * 0.08]], w * 0.14, w * 0.11, '#8aa878'); p.ell(cx - w * 0.72, cy - w * 0.09, w * 0.1, w * 0.075, '#9ab888'); p.circ(cx - w * 0.75, cy - w * 0.11, w * 0.018, '#17131f'); p.circ(cx - w * 0.7, cy - w * 0.15, w * 0.03, GOLD);
    const c = p.c; c.fillStyle = css(dark(sh, 0.25)); c.beginPath(); c.ellipse(cx, cy + w * 0.06, w * 0.5, w * 0.3, 0, Math.PI, 6.283); c.fill(); c.fillStyle = css(sh); c.beginPath(); c.ellipse(cx + p.lx * w * 0.02, cy + w * 0.05, w * 0.46, w * 0.26, 0, Math.PI, 6.283); c.fill();
    p.ell(cx, cy + w * 0.06, w * 0.5, w * 0.06, '#c9b070');
    for (let i = -3; i <= 3; i++) for (let j = 0; j < 3; j++) { const hx = cx + i * w * 0.115 + (j % 2) * w * 0.057, hy = cy - w * 0.03 - j * w * 0.07; if (Math.pow((hx - cx) / (w * 0.42), 2) + Math.pow((hy - cy - w * 0.05) / (w * 0.24), 2) < 1) { p.blob([[hx - w * 0.045, hy], [hx - w * 0.022, hy - w * 0.035], [hx + w * 0.022, hy - w * 0.035], [hx + w * 0.045, hy], [hx + w * 0.022, hy + w * 0.035], [hx - w * 0.022, hy + w * 0.035]], lite(sh, 0.18)); p.circ(hx, hy, w * 0.012, GOLD, 0.8); } }
  }
  function mandara(p, cx, base, w, h, o) {
    o = o || {}; const col = '#8a8a78';
    p.blob([[cx - w * 0.5, base], [cx - w * 0.42, base - h * 0.4], [cx - w * 0.3, base - h * 0.7], [cx - w * 0.1, base - h * 0.95], [cx + w * 0.05, base - h], [cx + w * 0.26, base - h * 0.78], [cx + w * 0.4, base - h * 0.45], [cx + w * 0.5, base]], dark(col, 0.2));
    p.blob([[cx - w * 0.44 + p.lx * w * 0.04, base], [cx - w * 0.36, base - h * 0.4], [cx - w * 0.24, base - h * 0.68], [cx - w * 0.06, base - h * 0.92], [cx + w * 0.04, base - h * 0.96], [cx, base - h * 0.5], [cx - w * 0.05, base]], p.lx < 0 ? lite(col, 0.25) : col);
    for (let i = 0; i < 26; i++) { const t = p.r(), y = base - h * t * 0.9, hw = w * 0.45 * (1 - t * 0.85), x = cx + p.rr(-1, 1) * hw; p.poly([[x, y], [x + p.rr(10, 40), y + p.rr(20, 60)], [x - p.rr(10, 40), y + p.rr(30, 70)]], p.r() < 0.5 ? lite(col, 0.2) : dark(col, 0.25), 0.7); }
    for (let i = 0; i < 16; i++) { const t = p.rr(0.1, 0.85), hw = w * 0.42 * (1 - t * 0.85); p.tree(cx + p.rr(-1, 1) * hw, base - h * t, h * 0.09, { col: '#5a8a5a', trunk: '#4a3a34' }); }
    return [cx + w * 0.02, base - h];
  }
  // Vasuki wound three times round the mountain, heads to the left
  function vasuki(p, cx, base, w, h, x0, x1, ry) {
    const col = '#3f7a6a', yb = base - h * 0.42;
    p.serpent([[x0, ry], [(x0 + cx - w * 0.4) / 2, ry + 26], [cx - w * 0.36, yb + 40]], 44, 46, col, { head: false }); p.serpent([[cx + w * 0.34, yb + 30], [(x1 + cx + w * 0.4) / 2, ry + 20], [x1 - 120, ry - 6], [x1, ry - 40]], 46, 14, col, { head: false });
    for (let k = 0; k < 3; k++) { const y = yb - k * h * 0.16, hw = w * 0.36 * (1 - (0.42 + k * 0.16) * 0.8) + w * 0.06; p.serpent([[cx - hw, y + 44], [cx, y + 70], [cx + hw, y + 22]], 46, 46, col, { head: false }); }
    for (const i of [-2, 2, -1, 1, 0]) { const hx = x0 - 30 - Math.abs(i) * 10, hy = ry - 60 + i * 44; p.tube([[x0 + 10, ry], [x0 - 10, ry - 20 + i * 20], [hx, hy]], 40, 30, dark(col, 0.2)); p.ell(hx, hy, 44, 56, dark(col, 0.25)); p.ell(hx - 4, hy, 30, 42, '#a8d0b0'); p.ell(hx - 20, hy + 6, 26, 18, col); p.circ(hx - 26, hy, 5, '#ffe27a'); p.fire(hx - 60, hy + 26, 30, 70, { sway: -0.9 }); p.smoke(hx - 70, hy - 10, 26, 150, '#4a4458', -0.9); }
  }
  const milk = (p, y, sx, b) => p.sea(y, '#f8f2e6', b || '#9fb8cc', '#ffffff', sx);
  const foam = (p, x0, x1, y0, y1, n) => { for (let i = 0; i < n; i++) { const x = p.rr(x0, x1), y = p.rr(y0, y1); p.blob([[x - 90, y + 24], [x - 30, y - p.rr(20, 70)], [x + 30, y - p.rr(10, 50)], [x + 100, y + 24]], p.r() < 0.6 ? '#ffffff' : '#c8d8e6', 0.92); } };
  const S = [];

  S.push({ title: 'The Gods Before Vishnu', kanda: 'Bhagavata Purana 8.5-6', seed: 701, light: -1, paint: DET,
    cap: 'Cursed by the sage Durvasa, the gods lose their strength and their fortune. They go to Vishnu, who tells them to make peace with the demons and churn the ocean of milk for the nectar of immortality.',
    text: 'After the curse of Durvasa the gods are beaten and their glory fades. Led by Brahma they come to the shore of the milk ocean. Vishnu advises a truce with the asuras: together they must churn the ocean for amrita, the nectar of immortality.',
    draw(p) {
      p.sky(['#8fa6da', '#c8c4e6', '#f6dccc', '#fdeccc']); p.sun(1000, 250, 150, '#fffbe6', '#ffe6b0'); p.rays(1000, 250, 40, 1400, '#fff6d8', 0.18); p.clouds({ n: 8, y0: 30, y1: 300, size: 180, col: '#fdf4ec', shadow: '#b0a8d8' });
      milk(p, 540, 1000); foam(p, 0, 2000, 560, 660, 20);
      for (const i of [-3, 3, -2, 2, -1, 1, 0]) { const a = i * 0.3, hx = 1000 + Math.sin(a) * 250, hy = 330 - Math.cos(a) * 190 + Math.abs(i) * 14; p.tube([[1000 + i * 14, 500], [hx, hy + 50]], 50, 40, '#3f4f6a'); p.ell(hx, hy, 62, 80, '#3f4f6a', 1, a); p.ell(hx, hy + 8, 40, 56, '#a8b8d0', 1, a); for (const s of [-1, 1]) p.circ(hx + s * 11, hy + 24, 4, '#ffe27a'); }
      for (let k = 0; k < 3; k++) { p.ell(1000, 690 - k * 46, 330 - k * 50, 46, '#33405a'); p.ell(1000, 684 - k * 46, 310 - k * 50, 34, '#5a6a8a'); p.ell(1000, 678 - k * 46, 250 - k * 50, 14, '#a8b8d0'); }
      deity(p, 1000, 610, 460, Object.assign({}, VISHNU, { halo: '#fff6c8', arms: [{ s: -1, th: -40, ph: -80, kind: 'chakra', back: true, k: 0.7 }, { s: 1, th: -40, ph: -80, kind: 'conch', back: true, k: 0.8 }, { s: -1, th: 60, ph: 40, kind: 'lotus', k: 0.8 }, { s: 1, th: 40, ph: -40, kind: 'palm', k: 0.8 }] }));
      const g = p.ridge({ y: 800, amp: 20, col: '#d8c8a0', col2: '#8a7a60', seed: 4, freq: 0.004 });
      [[300, 1, 0], [430, 1, 1], [560, 1, 2], [1440, -1, 3], [1570, -1, 0], [1700, -1, 1]].forEach(q => F(p, q[0], g(q[0]) + 4, 190, DEVA, KNEEL, PRAY, { f: q[1], skin: DV_COL[q[2]], head: -24 }));
      F(p, 170, g(170) + 4, 200, SAGE, PRAY, { f: 1, robe: '#f1ead8', head: -20 }); p.birds(12, 200, 80, 1800, 300, '#6a6890', 8);
    } });
  S.push({ title: 'Mandara Is Carried to the Sea', kanda: 'Bhagavata Purana 8.6', seed: 702, light: 1, paint: DET,
    cap: 'Gods and demons tear up Mount Mandara to use as the churning rod. It is too heavy and crushes them, so Vishnu lifts it onto the back of Garuda and sets it down in the ocean.',
    text: 'Devas and asuras uproot the golden Mount Mandara, but it falls and crushes many of them. Vishnu arrives on Garuda, revives the fallen with a glance, lifts the mountain with one hand and carries it to the sea.',
    draw(p) {
      p.sky(['#6f8fd4', '#a8b8e6', '#f0d8d0', '#fde8c0']); p.sun(1650, 300, 60, '#fff8d8', '#ffe2a8'); p.clouds({ n: 9, y0: 40, y1: 420, size: 190, col: '#fdf6ee', shadow: '#a0a8d6' });
      milk(p, 620, 1650); p.ridge({ y: 640, amp: 50, col: '#a8a0c0', col2: '#c8b8b8', seed: 9, x1: 700, peak: [200, 300, 120] });
      scr(p, () => p.glow(1000, 300, 520, '#fff0c8', 0.6));
      p.eagle(1120, 470, 620, { f: 1, col: '#e8a83a', head: '#fff3d0', gold: '#c9463a', tip: '#c9463a', up: 0.45, spread: 0.9 });
      const top = mandara(p, 940, 420, 420, 330); p.blob([[730, 418], [940, 470], [1150, 418], [940, 436]], '#5a5a4a');
      for (let i = 0; i < 16; i++) p.rock(p.rr(760, 1120), p.rr(470, 640), p.rr(8, 22), p.rr(6, 14), '#6a6a5a');
      deity(p, top[0] - 10, top[1] + 6, 170, Object.assign({}, VISHNU, { seat: true, mantle: null, garland: null, halo: '#fff6c8', arms: [{ s: -1, th: -50, ph: -80, kind: 'chakra', k: 0.6 }, { s: 1, th: -50, ph: -80, kind: 'conch', k: 0.7 }] }));
      const g = p.ridge({ y: 790, amp: 22, col: '#d0c098', col2: '#7a6a58', seed: 5, freq: 0.004 });
      for (let i = 0; i < 5; i++) F(p, 120 + i * 120, g(120 + i * 120) + 4, 170, ASURA, { f: 1, skin: AS_COL[i], aN: [150, 170], aF: [130, 160] });
      for (let i = 0; i < 5; i++) F(p, 1400 + i * 120, g(1400 + i * 120) + 4, 170, DEVA, { f: -1, skin: DV_COL[i % 4], aN: [150, 170], aF: [130, 160] });
      p.birds(14, 100, 80, 1900, 300, '#f6f6ee', 8);
    } });
  S.push({ title: 'The Churning of the Ocean', kanda: 'Bhagavata Purana 8.7', seed: 703, light: -1, paint: DET,
    cap: 'The serpent king Vasuki becomes the rope. The demons take his fiery heads and the gods his tail. When the mountain begins to sink, Vishnu becomes Kurma, the great tortoise, and bears it on his back.',
    text: 'Vasuki is wound round Mandara as the churning rope. The asuras, too proud to hold a tail, take the head end and are scorched by his breath; the devas take the tail. As the mountain sinks, Vishnu takes the form of Kurma the tortoise and supports it from below, while another form of him steadies the peak.',
    draw(p) {
      p.sky(['#5a6ab4', '#a89cd4', '#f0c4b0', '#fde4b4']); p.sun(1000, 150, 90, '#fffbe6', '#ffe0a8'); p.rays(1000, 150, 36, 1300, '#fff2c8', 0.18); p.clouds({ n: 8, y0: 30, y1: 280, size: 190, col: '#f6e2e0', shadow: '#9088c4' });
      milk(p, 500, 1000, '#7f9ec0');
      const top = mandara(p, 1000, 680, 460, 560);
      scr(p, () => p.glow(top[0], top[1] - 40, 220, '#fff6c8', 0.8));
      deity(p, top[0], top[1] + 10, 150, Object.assign({}, VISHNU, { seat: true, mantle: null, garland: null, arms: [{ s: -1, th: -50, ph: -80, kind: 'chakra', k: 0.55 }, { s: 1, th: -50, ph: -80, kind: 'conch', k: 0.6 }] }));
      vasuki(p, 1000, 680, 460, 560, 250, 1800, 560);
      foam(p, 560, 1440, 640, 720, 30);
      p.rect(0, 720, 2000, 140, '#3f6a8a', 0.55); kurma(p, 1000, 770, 560); for (let i = 0; i < 14; i++) { const x = p.rr(0, 2000), y = p.rr(740, 850); if (Math.abs(x - 1000) > 400) { p.ell(x, y, 22, 8, '#f0c85a'); p.poly([[x + 20, y], [x + 36, y - 9], [x + 36, y + 9]], '#f0c85a'); } }
      for (let i = 0; i < 6; i++) F(p, 300 + i * 78, 640 + i * 4, 220, ASURA, { f: 1, skin: AS_COL[i % 5], lean: -20, lN: [30, 10], lF: [-10, -20], aN: [64, 80], aF: [58, 76], cloth: i % 2 ? '#5a2f4a' : '#3a3f6a' });
      for (let i = 0; i < 6; i++) F(p, 1700 - i * 78, 630 + i * 4, 210, DEVA, { f: -1, skin: DV_COL[i % 4], lean: -20, lN: [30, 10], lF: [-10, -20], aN: [64, 80], aF: [58, 76], cloth: i % 2 ? '#f6e2a0' : '#f1ead8' });
      foam(p, 200, 800, 650, 700, 10); foam(p, 1200, 1800, 650, 700, 10); p.birds(14, 100, 60, 1900, 260, '#f6f6ee', 8);
    } });
  S.push({ title: 'Halahala, the Poison', kanda: 'Bhagavata Purana 8.7', seed: 704, light: 1, paint: DET,
    cap: 'The first thing to rise is not nectar. It is Halahala, a poison so fierce that it spreads in every direction and begins to burn the three worlds. Gods and demons drop the rope and run.',
    text: 'Before any treasure appears, the churning throws up Halahala (also called Kalakuta), a poison that spreads in all directions and threatens every living thing. Unprotected, all beings flee to Shiva on Mount Kailash.',
    draw(p) {
      p.sky(['#141228', '#2f1f4a', '#5a2f5a', '#8a5a70']); p.clouds({ n: 10, y0: 20, y1: 300, size: 220, col: '#3a2a50', shadow: '#17121f', light: '#7a4a7a' });
      milk(p, 560, 1000, '#4a5a7a'); mandara(p, 1000, 700, 380, 420); p.fade('#2a1c3a', 0.35);
      for (let i = 0; i < 46; i++) { const t = i / 46, a = t * 14, r = 40 + t * 520; p.circ(1000 + Math.cos(a) * r, 430 - t * 160 + Math.sin(a) * r * 0.45, 50 + t * 110, ['#1c1030', '#2f1a4a', '#3a2a6a', '#17202a'][i % 4], 0.75); }
      scr(p, () => { p.glow(1000, 470, 420, '#7a4aff', 0.5); p.glow(1000, 520, 200, '#4affc0', 0.5); });
      for (let i = 0; i < 9; i++) { const a = p.rr(0, 6.28); p.curve([[1000, 480], [1000 + Math.cos(a) * 200 + p.rr(-40, 40), 480 + Math.sin(a) * 120], [1000 + Math.cos(a) * 480, 440 + Math.sin(a) * 260]], 6, '#8affd0', 0.8); }
      for (let i = 0; i < 160; i++) p.rect(p.rr(300, 1700), p.rr(100, 760), p.rr(3, 8), p.rr(3, 8), p.r() < 0.5 ? '#8affd0' : '#b08aff', p.rr(0.4, 1));
      const g = p.ridge({ y: 790, amp: 18, col: '#5a4a5a', col2: '#1c1622', seed: 4, freq: 0.004 });
      for (let i = 0; i < 5; i++) F(p, 520 - i * 100, g(520 - i * 100) + 4, 180, ASURA, { f: -1, skin: AS_COL[i], lean: 22, lN: [40, -6], lF: [-30, -44], aN: [140, 160], aF: [100, 130] });
      for (let i = 0; i < 5; i++) F(p, 1480 + i * 100, g(1480 + i * 100) + 4, 180, DEVA, { f: 1, skin: DV_COL[i % 4], lean: 22, lN: [40, -6], lF: [-30, -44], aN: [140, 160], aF: [100, 130] });
      p.birds(20, 200, 60, 1800, 300, '#0c0812', 9);
    } });
  S.push({ title: 'Neelakantha: Shiva Drinks the Poison', kanda: 'Bhagavata Purana 8.7', seed: 705, light: -1, w: 1200, h: 1800, paint: DET,
    cap: 'They flee to Shiva on Mount Kailash. Moved by compassion, he gathers the poison in his palm and drinks it. Parvati holds his throat so it goes no further, and his neck turns blue for ever: Neelakantha.',
    text: '"It is the duty of the strong to protect those who suffer." Shiva takes the poison in his palm and drinks it. It stains his throat dark blue, a mark that becomes his ornament and his name, Neelakantha. In the later telling Parvati presses his throat so that the poison stays there.',
    draw(p) {
      p.sky([[0, '#0c1238'], [0.4, '#2a2f78'], [0.7, '#6a5aa0'], [1, '#c8b8d8']]); stars(p, 260, 900); p.sun(960, 190, 60, '#f8f8f0', '#b8c4f0');
      p.ridge({ y: 1050, amp: 420, col: '#c8d4f4', col2: '#7f8fc8', seed: 61, oct: 5, lit: '#ffffff', freq: 0.004, peak: [600, 300, 380] }); p.ridge({ y: 1300, amp: 200, col: '#a8b8e6', col2: '#6a7ab8', seed: 27, oct: 5, lit: '#f6f8ff', freq: 0.004 }); p.fade('#3a3f88', 0.25);
      for (let i = 0; i < 30; i++) { const t = i / 30; p.circ(160 + t * 330 + p.rr(-30, 30), 1500 - t * 760 + p.rr(-30, 30), 60 - t * 34, ['#1c1030', '#2f1a4a', '#3a2a6a'][i % 3], 0.8); }
      const J = deity(p, 600, 1460, 1150, Object.assign({}, SHIVA, { seat: true, halo: '#cfd8ff', arms: [{ s: -1, th: 40, ph: -76, L2: 190 }, { s: 1, th: 62, ph: 40 }] }));
      shivaExtras(p, J, { trident: [1010, 1420] });
      const h = J.hands[0]; scr(p, () => p.glow(h[0], h[1] - 20, 170, '#7a4aff', 0.9)); p.ell(h[0], h[1] - 4, 54, 26, '#b8c4e6'); p.ell(h[0], h[1] - 12, 44, 16, '#17102a'); p.curve([[h[0] + 20, h[1] - 20], [h[0] + 70, h[1] - 70], [J.head[0] - 20, J.head[1] + J.r * 0.62]], 10, '#2a1a4a'); p.curve([[h[0] + 20, h[1] - 20], [h[0] + 70, h[1] - 70], [J.head[0] - 20, J.head[1] + J.r * 0.62]], 4, '#8affd0');
      const Pv = deity(p, 940, 1500, 760, { fem: true, skin: '#f0c8a0', cloth: '#c9302c', top: '#2f8f7a', border: GOLD, long: true, hair: '#17131f', face: { crown: 'crown', tilak: 'dot', long: true }, arms: [{ s: -1, th: -30, ph: -64, L1: 170, L2: 200 }, { s: 1, th: 70, ph: 60 }] });
      nandi(p, 220, 1640, 230, 1);
      p.ridge({ y: 1640, amp: 24, col: '#f1f5ff', col2: '#8f9fd0', seed: 5, freq: 0.004 });
      [[90, 1], [200, 1], [1010, -1], [1120, -1]].forEach((q, i) => F(p, q[0], 1760, 170, i % 2 ? ASURA : DEVA, KNEEL, PRAY, { f: q[1], head: -30 })); for (let i = 0; i < 120; i++) p.circ(p.rr(0, 1200), p.rr(0, 1800), p.rr(1.5, 4), '#ffffff', 0.8);
    } });
  S.push({ title: 'The Treasures Rise', kanda: 'Bhagavata Purana 8.8', seed: 706, light: 1, paint: DET,
    cap: 'The churning begins again, and now wonders rise from the foam: Surabhi the cow of plenty, the white horse Ucchaihshravas, the elephant Airavata, the Kaustubha gem, the Parijata tree, and the Moon.',
    text: 'In turn the ocean yields Surabhi the wish-granting cow, the white horse Ucchaihshravas, the elephant Airavata, the Kaustubha jewel that Vishnu wears, the Parijata tree, the apsaras, and the Moon, which Shiva sets in his hair.',
    draw(p) {
      p.sky(['#4a5aa8', '#8f8cd0', '#f0b8b0', '#fde0b0']); stars(p, 80, 260); p.clouds({ n: 8, y0: 30, y1: 300, size: 190, col: '#f0d8e0', shadow: '#7a74b8' });
      scr(p, () => p.glow(1000, 190, 300, '#fffbe6', 0.9)); p.circ(1000, 190, 80, '#fffbe6'); p.circ(1020, 176, 30, '#f0ead8', 0.6); p.circ(976, 214, 18, '#f0ead8', 0.6);
      milk(p, 520, 1000, '#7f9ec0'); mandara(p, 1000, 640, 300, 330); p.fade('#f6dcc8', 0.2, 300, 700);
      const rise = (x, y, r) => { scr(p, () => p.glow(x, y - r * 0.4, r * 1.6, '#fff6d0', 0.7)); foam(p, x - r, x + r, y + 10, y + 50, 7); };
      rise(330, 640, 200); p.quad(330, 660, 210, { kind: 'horse', f: 1, col: '#ffffff', mane: '#f0e6d0', gait: 'gallop' });
      rise(720, 700, 150); const cw = p.quad(700, 720, 150, { kind: 'horse', f: 1, col: '#f6e6d0', mane: '#f6e6d0', gait: 'stand' }); for (const s of [0, 1]) p.curve([[cw.head[0] - 6 * s, cw.head[1] - 8], [cw.head[0] - 16, cw.head[1] - 34], [cw.head[0] + 6, cw.head[1] - 44]], 6, '#e8d8b0'); p.ell(cw.cx - 30, cw.cy + 40, 26, 18, '#f8c0c0');
      rise(1640, 650, 220); p.quad(1640, 670, 190, { kind: 'elephant', f: -1, col: '#fbf8f4', cloth: '#c9302c' });
      rise(1300, 700, 130); p.tree(1300, 720, 280, { col: '#5fa07a', trunk: '#8a6a4a', flowers: '#ffffff', spread: 0.4 });
      scr(p, () => { p.glow(1000, 330, 120, '#ff6a8a', 0.9); p.rays(1000, 330, 16, 220, '#ffb0c0', 0.6); }); p.poly([[1000, 290], [1034, 330], [1000, 372], [966, 330]], '#c9304a'); p.poly([[1000, 300], [1020, 330], [1000, 352], [984, 330]], '#ff9ab0');
      for (const [x, f] of [[520, 1], [1480, -1]]) F(p, x, 560, 150, { skin: '#f6d8c0', robe: '#f4a0bc', drape: '#fbe6a0', longhair: true, crown: 'mukut', sash: false, fly: true, f: f, lean: 20, aN: [140, 160], aF: [100, 130], lN: [-30, -60], lF: [-10, -50] });
      foam(p, 0, 2000, 760, 840, 20); for (let i = 0; i < 120; i++) p.rect(p.rr(0, 2000), p.rr(200, 800), p.rr(2, 6), p.rr(2, 6), '#fff6d0', p.rr(0.4, 1));
    } });
  S.push({ title: 'Lakshmi Rises from the Sea', kanda: 'Bhagavata Purana 8.8', seed: 707, light: -1, w: 1200, h: 1800, paint: DET,
    cap: 'Then comes Lakshmi, goddess of fortune, standing on a lotus. The elephants of the quarters bathe her with golden jars. She looks over gods and demons alike, and lays her garland on Vishnu.',
    text: 'Lakshmi appears on a lotus, lighting every direction. The elephants of the quarters bathe her from golden vessels. Passing over sages, gods and demons, each with some flaw, she chooses Vishnu and places her garland on him.',
    draw(p) {
      p.sky(['#f6c8b8', '#fbd8c0', '#fde8c8', '#fff0d0']); p.sun(600, 520, 330, '#fffbe6', '#ffe0a0'); p.rays(600, 520, 48, 1700, '#fff6d0', 0.22); p.clouds({ n: 7, y0: 60, y1: 500, size: 190, col: '#fff6ee', shadow: '#f0b8b0' });
      milk(p, 1180, 600, '#f0b8a8'); foam(p, 0, 1200, 1200, 1300, 16);
      for (const s of [-1, 1]) { p.clouds({ n: 2, x0: 600 + s * 380 - 120, x1: 600 + s * 380 + 120, y0: 560, y1: 600, size: 130, col: '#fff6ee', shadow: '#e8b0b0' }); const e = p.quad(600 + s * 400, 520, 230, { kind: 'elephant', f: -s, col: '#fbf8f4', cloth: '#c9302c' }); p.ell(e.head[0] - s * 110, e.head[1] - 40, 40, 34, GOLD); p.tube([[e.head[0] - s * 130, e.head[1] - 20], [600 + s * 150, 420], [600 + s * 60, 640]], 12, 34, '#dff0ff'); }
      for (let i = -5; i <= 5; i++) { const a = -1.5708 + i * 0.27; p.blob([[600, 1330], [600 + Math.cos(a - 0.2) * 190, 1330 + Math.sin(a - 0.2) * 110], [600 + Math.cos(a) * 330, 1330 + Math.sin(a) * 200], [600 + Math.cos(a + 0.2) * 190, 1330 + Math.sin(a + 0.2) * 110]], Math.abs(i) % 2 ? '#f4a0bc' : '#fbd0de'); }
      p.ell(600, 1340, 330, 60, '#e8789a'); p.ell(600, 1330, 250, 36, '#f6c84a');
      deity(p, 600, 1320, 880, { fem: true, skin: '#f6d4a8', cloth: '#c9302c', top: '#2f8f5a', border: GOLD, long: true, hair: '#17131f', halo: '#fff6c8', garland: '#f4a0bc', face: { crown: 'mukut', tilak: 'dot', long: true }, arms: [{ s: -1, th: -40, ph: -80, kind: 'lotus', back: true }, { s: 1, th: -40, ph: -80, kind: 'lotus', back: true }, { s: -1, th: 60, ph: 50, kind: 'palm' }, { s: 1, th: 60, ph: 50, kind: 'palm' }] });
      for (let i = 0; i < 60; i++) p.circ(p.rr(380, 820), p.rr(900, 1500), p.rr(5, 10), GOLD, 0.9);
      for (let i = 0; i < 9; i++) { const x = p.rr(40, 1160), y = p.rr(1420, 1700); p.ell(x, y, 70, 20, '#6fa07a'); p.poly([[x - 22, y - 6], [x, y - 60], [x + 22, y - 6]], '#f4a0bc'); p.poly([[x - 12, y - 6], [x, y - 46], [x + 12, y - 6]], '#fde0e8'); }
      deity(p, 1020, 1760, 420, Object.assign({}, VISHNU, { arms: [{ s: -1, th: 60, ph: 50 }, { s: 1, th: 60, ph: 50, kind: 'conch', k: 0.7 }] })); for (const x of [120, 240]) F(p, x, 1760, 200, x < 200 ? ASURA : DEVA, PRAY, { f: 1, head: -20 });
    } });
  S.push({ title: 'Dhanvantari and the Nectar', kanda: 'Bhagavata Purana 8.8', seed: 708, light: 1, paint: DET,
    cap: 'At last Dhanvantari, the physician of the gods, rises with a jar in his hands. It holds amrita, the nectar of immortality. The demons snatch it at once and fall to quarrelling over who drinks first.',
    text: 'Dhanvantari, dark, youthful and four-armed, source of the science of healing, rises bearing the vessel of amrita. The asuras seize it immediately, breaking the truce, and fall to arguing among themselves.',
    draw(p) {
      p.sky(['#5a6ab4', '#a89cd4', '#f0c4b0', '#fde4b4']); p.sun(1000, 260, 170, '#fffbe6', '#ffe0a0'); p.rays(1000, 260, 44, 1400, '#fff6d0', 0.22); p.clouds({ n: 8, y0: 30, y1: 300, size: 190, col: '#f6e2e0', shadow: '#9088c4' });
      milk(p, 540, 1000, '#7f9ec0'); mandara(p, 300, 660, 260, 300); p.fade('#f6dcc8', 0.2, 300, 700);
      const J = deity(p, 1000, 760, 640, Object.assign({}, VISHNU, { skin: '#4f7a9a', mantle: '#f0c85a', cloth: '#f6e2a0', halo: '#fff6c8', face: { crown: 'mukut', tilak: 'U' }, arms: [{ s: -1, th: -40, ph: -80, kind: 'conch', back: true, k: 0.8 }, { s: 1, th: -40, ph: -80, kind: 'chakra', back: true, k: 0.7 }, { s: -1, th: 64, ph: 12 }, { s: 1, th: 64, ph: 12 }] }));
      const kx = 1000, ky = J.hands[2][1] + 16; scr(p, () => { p.glow(kx, ky - 30, 260, '#fff0a0', 0.95); p.rays(kx, ky - 30, 24, 420, '#fff6c0', 0.4); }); p.ell(kx, ky, 62, 56, GOLDD); p.ell(kx - 6, ky - 5, 50, 46, GOLD); p.rect(kx - 26, ky - 76, 52, 28, GOLD); p.ell(kx, ky - 78, 36, 10, GOLD2); p.ell(kx, ky - 80, 26, 6, '#fffbe6'); for (let k = -2; k <= 2; k++) p.circ(kx + k * 26, ky + 6, 7, '#c9342f');
      foam(p, 700, 1300, 700, 780, 22);
      const g = p.ridge({ y: 800, amp: 16, col: '#d0c098', col2: '#7a6a58', seed: 5, freq: 0.004 });
      for (let i = 0; i < 4; i++) F(p, 520 - i * 110, g(520 - i * 110) + 4, 200, ASURA, { f: 1, skin: AS_COL[i], lean: 20, lN: [40, -6], lF: [-30, -44], aN: [110, 120], aF: [96, 110] });
      for (let i = 0; i < 4; i++) F(p, 1500 + i * 110, g(1500 + i * 110) + 4, 190, DEVA, PRAY, { f: -1, skin: DV_COL[i] }); p.birds(12, 100, 60, 1900, 260, '#f6f6ee', 8);
    } });
  S.push({ title: 'Mohini Shares Out the Nectar', kanda: 'Bhagavata Purana 8.9', seed: 709, light: -1, paint: DET,
    cap: 'Vishnu returns as Mohini, a woman of bewildering beauty. The demons, enchanted, hand her the jar and ask her to divide it. She seats the two sides in rows, and serves the gods first.',
    text: 'Vishnu takes the form of Mohini. The asuras, captivated, entrust her with the nectar and promise to accept however she divides it. She seats devas and asuras in separate rows and pours the amrita for the gods alone.',
    draw(p) {
      p.sky(['#f0c4c8', '#f8d8cc', '#fde8cc', '#fff0d4']); p.sun(1000, 300, 200, '#fffbe6', '#ffe0b0'); p.rays(1000, 300, 44, 1300, '#fff6d8', 0.2);
      for (const x of [240, 560, 1440, 1760]) p.pillar(x, 640, 80, 600, '#e8ccc0'); p.rect(180, 30, 1640, 50, '#dcb8ac'); for (let i = 0; i < 9; i++) p.ribbon([[230 + i * 190, 80], [260 + i * 190, 180], [230 + i * 190, 280]], 54, i % 2 ? '#f4a0bc' : '#f6d77a', 0.8);
      p.rect(0, 640, 2000, 220, '#e0c0a8'); p.poly([[700, 650], [1300, 650], [1500, 860], [500, 860]], '#c9302c', 0.9); p.poly([[740, 650], [1260, 650], [1440, 860], [560, 860]], '#e0583a', 0.9);
      const J = deity(p, 1000, 800, 660, { fem: true, skin: '#7f9ad8', cloth: '#f6c84a', top: '#c9302c', border: '#c9302c', long: true, hair: '#17131f', halo: '#fff6d8', garland: '#fbd0de', face: { crown: 'mukut', tilak: 'dot', long: true, lips: '#c9304a' }, arms: [{ s: -1, th: 30, ph: -10, L2: 150 }, { s: 1, th: 60, ph: 50, kind: 'lotus', k: 0.7 }] });
      const h = J.hands[0]; scr(p, () => p.glow(h[0] - 30, h[1], 170, '#fff0a0', 0.9)); p.ell(h[0] - 30, h[1] + 6, 58, 52, GOLDD); p.ell(h[0] - 36, h[1], 46, 42, GOLD); p.poly([[h[0] - 70, h[1] - 30], [h[0] - 120, h[1] - 10], [h[0] - 76, h[1] - 6]], GOLD); p.curve([[h[0] - 118, h[1] - 8], [h[0] - 190, h[1] + 60], [h[0] - 250, h[1] + 170]], 8, '#fffbe6');
      for (let i = 0; i < 5; i++) { const x = 700 - i * 130; F(p, x, 800 + i * 6, 250, DEVA, SIT, { f: 1, skin: DV_COL[i % 4], aN: [70, 110], aF: [60, 104], halo: i === 0 ? '#fff6c0' : null }); }
      for (let i = 0; i < 5; i++) { const x = 1300 + i * 130; F(p, x, 800 + i * 6, 260, ASURA, SIT, { f: -1, skin: AS_COL[i], head: -14, aN: [30, 60] }); }
      p.pillar(50, 900, 150, 900, '#b89088'); p.pillar(1950, 900, 150, 900, '#b89088'); for (let i = 0; i < 100; i++) p.ell(p.rr(0, 2000), p.rr(0, 860), 7, 4, i % 2 ? '#fbd0de' : '#fff3c0', 0.9, p.rr(0, 3));
    } });
  S.push({ title: 'Rahu and the Discus', kanda: 'Bhagavata Purana 8.9', seed: 710, light: 1, paint: DET,
    cap: 'One demon, Rahu, slips in among the gods and drinks. The Sun and Moon expose him, and Vishnu\'s discus takes his head. But the nectar has touched his throat: the head lives on and still hunts them, as the eclipse.',
    text: 'Rahu sits disguised between the Sun and the Moon and receives the nectar. They expose him, and Vishnu severs his head with the Sudarshana discus. Having tasted amrita, the head is immortal; it is given a place among the planets, and its enmity toward Sun and Moon is the eclipse.',
    draw(p) {
      p.sky([[0, '#0c1038'], [0.45, '#2c2a78'], [0.75, '#8a4a80'], [1, '#f09a60']]); stars(p, 260, 520); p.clouds({ n: 7, y0: 380, y1: 560, size: 200, col: '#5a4a88', shadow: '#231c50', light: '#f0a880' });
      scr(p, () => p.glow(1500, 230, 420, '#ffb060', 0.8)); p.circ(1500, 230, 110, '#ffe6a0'); for (let i = 0; i < 20; i++) p.line(1500 + Math.cos(i * 0.314) * 124, 230 + Math.sin(i * 0.314) * 124, 1500 + Math.cos(i * 0.314) * 170, 230 + Math.sin(i * 0.314) * 170, 8, '#ffd070');
      // Rahu's head, flying toward the Sun
      p.ribbon([[1180, 330], [1040, 400], [900, 380], [780, 470]], 90, '#3a2a5a', 0.8); p.circ(1250, 290, 96, '#2a1c44'); face(p, 1250, 290, 84, { skin: '#5a4a8a', crown: 'crown', must: '#17131f', hair: '#17131f', iris: '#c9342f', lips: '#8a2f3a' }); p.poly([[1210, 340], [1222, 372], [1236, 340]], '#fbf6e8'); p.poly([[1264, 340], [1278, 372], [1290, 340]], '#fbf6e8');
      // the discus
      attr(p, 'chakra', 800, 400, 1, 1.5); scr(p, () => { p.rays(800, 300, 20, 420, '#fff0a0', 0.4); }); for (let i = 0; i < 5; i++) p.curve([[420, 560 - i * 12], [600, 440 - i * 10], [760, 330 + i * 6]], 4, '#fff6c0', 0.5);
      deity(p, 330, 800, 620, { fem: true, skin: '#7f9ad8', cloth: '#f6c84a', top: '#c9302c', border: '#c9302c', long: true, hair: '#17131f', halo: '#fff6d8', face: { crown: 'mukut', tilak: 'U', long: true }, arms: [{ s: 1, th: -30, ph: -50, L2: 160 }, { s: -1, th: 60, ph: 50 }] });
      // Ketu: the headless serpent body
      p.serpent([[1160, 800], [1260, 700], [1180, 620], [1300, 560], [1240, 500]], 60, 24, '#4a3a6a', { head: false }); p.fire(1160, 800, 40, 60);
      const g = p.ridge({ y: 800, amp: 14, col: '#6a4a6a', col2: '#201830', seed: 4, freq: 0.004 });
      for (let i = 0; i < 4; i++) F(p, 620 + i * 110, g(620 + i * 110) + 30, 210, DEVA, SIT, { f: 1, skin: DV_COL[i], aN: [130, 110], head: -30 });
      for (let i = 0; i < 4; i++) F(p, 1500 + i * 120, g(1500 + i * 120) + 4, 200, ASURA, { f: -1, skin: AS_COL[i], aN: [150, 170], aF: [130, 160], lean: -10 });
    } });
  S.push({ title: 'Shiva, Lord of Kailash', kanda: 'Shiva as Neelakantha', seed: 711, light: 1, w: 1200, h: 1800, paint: DET,
    cap: 'The gods drink and win back heaven. But the story keeps its deepest honour for the one who asked for nothing: Shiva, who took the poison so that others could have the nectar.',
    text: 'Shiva seated in meditation on Kailash: the crescent moon born of the churning in his matted hair, the Ganga flowing from it, the third eye, the serpent at his neck, ash on his limbs, the tiger skin, the trident and drum, the bull Nandi, and the blue throat that holds the world\'s poison.',
    draw(p) {
      p.sky([[0, '#101a4a'], [0.35, '#3a4a98'], [0.65, '#9a8ac8'], [1, '#f6d8c8']]); stars(p, 200, 700); scr(p, () => { p.glow(600, 560, 760, '#cfd8ff', 0.7); p.rays(600, 560, 48, 1500, '#e6ecff', 0.16); });
      for (let i = 0; i < 6; i++) p.ribbon([[-50, 300 + i * 50], [300, 200 + i * 60], [700, 320 + i * 40], [1250, 220 + i * 50]], 70, ['#6fd0c0', '#8fa8ff', '#c08aff'][i % 3], 0.22);
      p.ridge({ y: 1000, amp: 460, col: '#d4dcf8', col2: '#8f9fd4', seed: 71, oct: 5, lit: '#ffffff', freq: 0.004, peak: [600, 260, 420] }); p.ridge({ y: 1280, amp: 220, col: '#b8c4ec', col2: '#7a8ac4', seed: 33, oct: 5, lit: '#f6f8ff', freq: 0.004 }); p.fade('#c8d0f4', 0.22);
      p.blob([[250, 1560], [330, 1470], [600, 1440], [870, 1470], [950, 1560], [600, 1600]], '#8a94b8'); p.blob([[280, 1552], [350, 1480], [600, 1452], [600, 1590]], '#b8c0dc');
      p.blob([[330, 1500], [420, 1440], [780, 1440], [870, 1500], [760, 1540], [440, 1540]], '#d98a3a'); for (let k = 0; k < 9; k++) p.curve([[380 + k * 56, 1456], [396 + k * 56, 1496], [376 + k * 56, 1530]], 8, '#3a2a22');
      const J = deity(p, 600, 1470, 1200, Object.assign({}, SHIVA, { seat: true, arms: [{ s: -1, th: 66, ph: 22, L1: 170, L2: 150 }, { s: 1, th: 66, ph: 22, L1: 170, L2: 150 }] }));
      shivaExtras(p, J, { trident: [1040, 1440] });
      for (const hd of J.hands) { p.ell(hd[0], hd[1], 30, 20, lite('#c8d4ee', 0.2)); p.circ(hd[0], hd[1] - 4, 9, '#f6a0a8'); }
      for (const s of [-1, 1]) for (let k = 0; k < 3; k++) p.line(J.head[0] + s * 210, J.neck[1] + 150 + k * 14, J.head[0] + s * 250, J.neck[1] + 138 + k * 14, 6, '#f6f6f0', 0.9);
      nandi(p, 180, 1700, 250, 1); p.ridge({ y: 1700, amp: 26, col: '#f6f8ff', col2: '#98a8d8', seed: 5, freq: 0.004 });
      for (let i = 0; i < 9; i++) { const x = p.rr(60, 1140), y = p.rr(1720, 1790); p.lamp(x, y, 9); } for (let i = 0; i < 160; i++) p.circ(p.rr(0, 1200), p.rr(0, 1800), p.rr(1.5, 4.5), '#ffffff', 0.85);
    } });
  S.push({ title: 'The Blue-Throated One', kanda: 'Neelakantha', seed: 712, light: -1, paint: DET,
    cap: 'Neelakantha, the blue-throated. Om Namah Shivaya.',
    text: 'A closer study of Shiva after the poison: the throat glowing blue, the eyes half closed, the gods and demons who fled to him bowing on either side, and the ocean quiet again.',
    draw(p) {
      p.sky([[0, '#0c1238'], [0.5, '#2a3080'], [0.8, '#7a6ab0'], [1, '#e0b8c0']]); stars(p, 300, 640); scr(p, () => { p.glow(1000, 330, 800, '#b8c8ff', 0.75); p.rays(1000, 330, 56, 1500, '#dfe6ff', 0.16); });
      p.circ(380, 170, 60, '#f8f8f0'); p.circ(404, 158, 54, '#16205a');
      p.ridge({ y: 640, amp: 300, col: '#c8d4f4', col2: '#7f8fc8', seed: 81, oct: 5, lit: '#ffffff', freq: 0.003, x1: 700 }); p.ridge({ y: 640, amp: 300, col: '#c8d4f4', col2: '#7f8fc8', seed: 82, oct: 5, lit: '#ffffff', freq: 0.003, x0: 1300 }); p.fade('#3a4090', 0.2);
      const J = deity(p, 1000, 1400, 1320, Object.assign({}, SHIVA, { arms: [{ s: -1, th: 70, ph: 60 }, { s: 1, th: 70, ph: 60 }] })); shivaExtras(p, J, {});
      milk(p, 760, 1000, '#5a6aa8'); foam(p, 0, 2000, 770, 840, 18);
      for (let i = 0; i < 4; i++) F(p, 120 + i * 120, 790, 190, DEVA, KNEEL, PRAY, { f: 1, skin: DV_COL[i], head: -34 }); for (let i = 0; i < 4; i++) F(p, 1880 - i * 120, 790, 190, ASURA, KNEEL, PRAY, { f: -1, skin: AS_COL[i], head: -34 });
      for (let i = 0; i < 160; i++) p.circ(p.rr(0, 2000), p.rr(0, 860), p.rr(1.5, 4), '#ffffff', 0.8);
    } });

  Epic.scenes.manthan = S;
})();
