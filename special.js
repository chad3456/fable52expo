/* Two special collections.
   1. Vishvarupa: a detailed, front-facing universal form of Krishna.
   2. Ram-naam: Ramayana scenes drawn with nothing but the word "राम". */
(function () {
  'use strict';
  const { mix, lite, dark, css } = Epic;
  const { F, scr, ARCH, PRAY, KNEEL } = Epic.kit;
  const GOLD = '#f3c65a', GOLD2 = '#fff0a8', GOLDD = '#b8822e';

  // ---------- frontal faces ----------
  function crown(p, x, y, r, kind, o) {
    const g = o.gold || GOLD;
    if (kind === 'mukut') {
      p.poly([[x - r * 1.0, y - r * 0.62], [x + r * 1.0, y - r * 0.62], [x + r * 1.12, y - r * 1.0], [x - r * 1.12, y - r * 1.0]], dark(g, 0.15));
      const T = [[1.0, 1.0, 0.82, 1.55], [0.8, 1.55, 0.6, 2.05], [0.58, 2.05, 0.36, 2.5], [0.34, 2.5, 0.08, 3.05]];
      T.forEach((t, i) => { p.poly([[x - r * t[0], y - r * t[1]], [x + r * t[0], y - r * t[1]], [x + r * t[2], y - r * t[3]], [x - r * t[2], y - r * t[3]]], i % 2 ? g : lite(g, 0.2)); p.poly([[x + p.lx * r * t[0], y - r * t[1]], [x + p.lx * r * t[0] * 0.45, y - r * t[1]], [x + p.lx * r * t[2] * 0.45, y - r * t[3]], [x + p.lx * r * t[2], y - r * t[3]]], lite(g, 0.5), 0.8); p.rect(x - r * t[0], y - r * t[1] - r * 0.06, r * t[0] * 2, r * 0.09, GOLDD); });
      for (const s of [-1, 1]) { p.blob([[x + s * r * 0.95, y - r * 0.95], [x + s * r * 1.5, y - r * 1.25], [x + s * r * 1.35, y - r * 1.8], [x + s * r * 0.85, y - r * 1.5]], g); p.circ(x + s * r * 1.2, y - r * 1.4, r * 0.12, '#c9342f'); }
      p.circ(x, y - r * 3.1, r * 0.14, GOLD2); p.circ(x, y - r * 1.28, r * 0.2, o.gem || '#c9342f'); p.circ(x, y - r * 1.28, r * 0.09, '#ffd0c0'); p.circ(x, y - r * 1.8, r * 0.13, '#2f8f7a'); p.circ(x, y - r * 2.28, r * 0.1, '#c9342f');
      for (let k = -3; k <= 3; k++) p.circ(x + k * r * 0.28, y - r * 0.8, r * 0.07, k % 2 ? '#c9342f' : GOLD2);
      if (o.feather) { p.ell(x + r * 0.5, y - r * 3.0, r * 0.3, r * 0.8, '#2e8f7a', 1, 0.35); p.ell(x + r * 0.55, y - r * 3.15, r * 0.18, r * 0.42, '#3b4fa8', 1, 0.35); p.circ(x + r * 0.58, y - r * 3.2, r * 0.1, '#f0c85a'); }
    } else if (kind === 'crown') {
      p.poly([[x - r * 0.95, y - r * 0.6], [x + r * 0.95, y - r * 0.6], [x + r * 1.05, y - r * 1.05], [x - r * 1.05, y - r * 1.05]], g);
      for (let k = -2; k <= 2; k++) p.poly([[x + k * r * 0.42 - r * 0.2, y - r * 1.02], [x + k * r * 0.42 + r * 0.2, y - r * 1.02], [x + k * r * 0.42, y - r * (1.75 - Math.abs(k) * 0.18)]], k % 2 ? lite(g, 0.3) : g);
      p.circ(x, y - r * 0.84, r * 0.14, o.gem || '#c9342f'); p.rect(x - r * 1.0, y - r * 0.66, r * 2, r * 0.08, GOLDD);
    } else if (kind === 'jata') {
      const h = o.hair || '#4a3428';
      for (const q of [[0, -1.1, 0.75], [-0.45, -1.0, 0.5], [0.45, -1.0, 0.5], [0, -1.7, 0.55], [0.1, -2.15, 0.36]]) { p.circ(x + q[0] * r, y + q[1] * r, r * q[2], h); p.circ(x + q[0] * r + p.lx * r * 0.1, y + q[1] * r - r * 0.1, r * q[2] * 0.6, lite(h, 0.18)); }
      for (let k = 0; k < 5; k++) p.curve([[x - r * 0.6 + k * r * 0.3, y - r * 0.7], [x - r * 0.5 + k * r * 0.28, y - r * 1.3], [x - r * 0.1 + k * r * 0.1, y - r * 1.9]], r * 0.05, dark(h, 0.3));
      p.c.strokeStyle = css('#f6f6ee'); p.c.lineWidth = r * 0.12; p.c.lineCap = 'round'; p.c.beginPath(); p.c.arc(x - r * 0.75, y - r * 1.5, r * 0.42, -1.9, 0.9); p.c.stroke();
    } else if (kind === 'bun') { const h = o.hair || '#f1ece4'; p.circ(x, y - r * 1.25, r * 0.5, h); p.circ(x + p.lx * r * 0.1, y - r * 1.35, r * 0.28, lite(h, 0.4)); p.rect(x - r * 0.4, y - r * 0.98, r * 0.8, r * 0.1, '#b98a5a'); }
  }
  function face(p, x, y, r, o) {
    const sk = o.skin, c = p.c, lx = p.lx, t = o.type || 'human';
    if (t === 'elephant') {
      for (const s of [-1, 1]) { p.blob([[x + s * r * 0.55, y - r * 0.75], [x + s * r * 1.5, y - r * 1.05], [x + s * r * 1.95, y - r * 0.2], [x + s * r * 1.6, y + r * 0.75], [x + s * r * 0.7, y + r * 0.55]], dark(sk, 0.18)); p.blob([[x + s * r * 0.7, y - r * 0.55], [x + s * r * 1.4, y - r * 0.8], [x + s * r * 1.65, y - r * 0.1], [x + s * r * 1.35, y + r * 0.5], [x + s * r * 0.75, y + r * 0.4]], lite(sk, 0.2)); }
      p.ell(x, y, r * 0.85, r * 0.98, dark(sk, 0.12)); p.ell(x + lx * r * 0.1, y - r * 0.05, r * 0.7, r * 0.88, sk); p.ell(x + lx * r * 0.2, y - r * 0.4, r * 0.4, r * 0.3, lite(sk, 0.3));
      const tr = [[x, y + r * 0.05], [x - r * 0.12, y + r * 0.9], [x + r * 0.05, y + r * 1.6], [x + r * 0.5, y + r * 1.75], [x + r * 0.62, y + r * 1.35]];
      p.tube(tr, r * 0.62, r * 0.22, dark(sk, 0.1)); p.tube(tr.map(q => [q[0] + lx * r * 0.06, q[1]]), r * 0.4, r * 0.14, lite(sk, 0.15));
      for (let k = 1; k < 8; k++) p.line(x - r * 0.26 + k * r * 0.01, y + r * (0.2 + k * 0.17), x + r * 0.2 + k * r * 0.015, y + r * (0.22 + k * 0.17), r * 0.03, dark(sk, 0.3), 0.6);
      for (const s of [-1, 1]) { p.tube([[x + s * r * 0.36, y + r * 0.45], [x + s * r * 0.55, y + r * 0.8], [x + s * r * 0.5, y + r * 1.15]], r * 0.17, r * 0.05, '#fbf6e8'); p.ell(x + s * r * 0.4, y - r * 0.12, r * 0.13, r * 0.07, '#fbf6e8'); p.circ(x + s * r * 0.4, y - r * 0.12, r * 0.06, '#1a1420'); }
      p.poly([[x - r * 0.07, y - r * 0.62], [x + r * 0.07, y - r * 0.62], [x, y - r * 0.25]], '#c9342f'); crown(p, x, y, r * 0.9, 'crown', o); return;
    }
    if (t === 'lion') {
      for (let k = 0; k < 18; k++) { const a = k / 18 * 6.283, rr = r * (1.45 + (k % 2) * 0.25); p.poly([[x + Math.cos(a - 0.22) * r * 0.8, y + Math.sin(a - 0.22) * r * 0.8], [x + Math.cos(a + 0.22) * r * 0.8, y + Math.sin(a + 0.22) * r * 0.8], [x + Math.cos(a) * rr, y + Math.sin(a) * rr]], k % 2 ? '#c8742a' : '#9a5420'); }
      p.circ(x, y, r * 0.95, '#b8682a'); p.ell(x, y + r * 0.02, r * 0.74, r * 0.84, sk); p.ell(x + lx * r * 0.12, y - r * 0.3, r * 0.42, r * 0.3, lite(sk, 0.3));
      p.ell(x, y + r * 0.42, r * 0.42, r * 0.34, lite(sk, 0.45)); p.poly([[x - r * 0.16, y + r * 0.12], [x + r * 0.16, y + r * 0.12], [x, y + r * 0.34]], '#3a2420'); p.line(x, y + r * 0.34, x, y + r * 0.52, r * 0.04, '#3a2420');
      p.curve([[x - r * 0.3, y + r * 0.5], [x, y + r * 0.62], [x + r * 0.3, y + r * 0.5]], r * 0.05, '#3a2420');
      for (const s of [-1, 1]) { p.ell(x + s * r * 0.34, y - r * 0.14, r * 0.15, r * 0.09, '#ffe27a', 1, s * 0.3); p.circ(x + s * r * 0.34, y - r * 0.14, r * 0.05, '#1a1420'); p.line(x + s * r * 0.14, y - r * 0.32, x + s * r * 0.54, y - r * 0.28, r * 0.07, '#7a4418'); p.poly([[x + s * r * 0.14, y + r * 0.56], [x + s * r * 0.2, y + r * 0.82], [x + s * r * 0.27, y + r * 0.56]], '#fbf6e8'); }
      return;
    }
    if (t === 'boar') {
      for (const s of [-1, 1]) p.poly([[x + s * r * 0.4, y - r * 0.75], [x + s * r * 0.95, y - r * 1.25], [x + s * r * 0.9, y - r * 0.45]], dark(sk, 0.2));
      p.ell(x, y, r * 0.82, r * 0.95, dark(sk, 0.15)); p.ell(x + lx * r * 0.1, y - r * 0.08, r * 0.66, r * 0.82, sk); p.ell(x + lx * r * 0.2, y - r * 0.42, r * 0.36, r * 0.26, lite(sk, 0.25));
      p.ell(x, y + r * 0.5, r * 0.46, r * 0.42, lite(sk, 0.2)); p.ell(x, y + r * 0.66, r * 0.34, r * 0.2, lite(sk, 0.4));
      for (const s of [-1, 1]) { p.circ(x + s * r * 0.13, y + r * 0.66, r * 0.07, '#1a1420'); p.tube([[x + s * r * 0.38, y + r * 0.62], [x + s * r * 0.6, y + r * 0.4], [x + s * r * 0.56, y + r * 0.05]], r * 0.14, r * 0.04, '#fbf6e8'); p.ell(x + s * r * 0.34, y - r * 0.16, r * 0.12, r * 0.07, '#ffe9b0'); p.circ(x + s * r * 0.34, y - r * 0.16, r * 0.05, '#1a1420'); }
      crown(p, x, y, r * 0.85, 'crown', o); return;
    }
    const hair = o.hair || '#17131f';
    if (t === 'monkey') { p.circ(x, y, r * 1.08, dark(sk, 0.3)); for (const s of [-1, 1]) { p.circ(x + s * r * 0.98, y - r * 0.05, r * 0.26, sk); p.circ(x + s * r * 0.98, y - r * 0.05, r * 0.14, '#e9b9a0'); } }
    else { p.ell(x, y - r * 0.12, r * 0.92, r * 1.04, hair); if (o.long) for (const s of [-1, 1]) p.blob([[x + s * r * 0.6, y - r * 0.5], [x + s * r * 1.05, y], [x + s * r * 1.15, y + r * 0.9], [x + s * r * 0.85, y + r * 1.5], [x + s * r * 0.6, y + r * 0.8]], hair); for (const s of [-1, 1]) { p.ell(x + s * r * 0.8, y + r * 0.08, r * 0.14, r * 0.26, dark(sk, 0.15)); p.circ(x + s * r * 0.82, y + r * 0.46, r * 0.15, o.gold || GOLD); p.circ(x + s * r * 0.82, y + r * 0.46, r * 0.06, '#c9342f'); } }
    p.rect(x - r * 0.34, y + r * 0.6, r * 0.68, r * 0.7, dark(sk, 0.3));
    p.ell(x, y + r * 0.08, r * 0.76, r * 0.94, dark(sk, 0.2)); p.ell(x + lx * r * 0.1, y + r * 0.06, r * 0.64, r * 0.88, sk); p.ell(x + lx * r * 0.22, y - r * 0.28, r * 0.3, r * 0.34, lite(sk, 0.22)); p.ell(x + lx * r * 0.3, y + r * 0.3, r * 0.2, r * 0.16, lite(sk, 0.14));
    if (o.beard) { p.blob([[x - r * 0.74, y + r * 0.1], [x - r * 0.7, y + r * 0.75], [x - r * 0.3, y + r * (1.2 + (o.beardLen || 0.6))], [x, y + r * (1.45 + (o.beardLen || 0.6))], [x + r * 0.3, y + r * (1.2 + (o.beardLen || 0.6))], [x + r * 0.7, y + r * 0.75], [x + r * 0.74, y + r * 0.1], [x + r * 0.4, y + r * 0.42], [x, y + r * 0.36], [x - r * 0.4, y + r * 0.42]], o.beard); for (let k = -3; k <= 3; k++) p.curve([[x + k * r * 0.17, y + r * 0.6], [x + k * r * 0.15, y + r * 1.0], [x + k * r * 0.08, y + r * (1.25 + (o.beardLen || 0.6) * 0.8)]], r * 0.035, dark(o.beard, 0.22), 0.7); }
    if (t === 'monkey') { p.ell(x, y + r * 0.42, r * 0.5, r * 0.42, '#edc3a8'); p.ell(x + lx * r * 0.08, y + r * 0.34, r * 0.3, r * 0.2, '#f8dcc8'); for (const s of [-1, 1]) p.circ(x + s * r * 0.09, y + r * 0.3, r * 0.045, '#3a2622'); p.curve([[x - r * 0.3, y + r * 0.56], [x, y + r * 0.66], [x + r * 0.3, y + r * 0.56]], r * 0.045, '#5a2f2a'); }
    else {
      p.curve([[x + r * 0.02, y - r * 0.02], [x - r * 0.03, y + r * 0.28], [x - r * 0.1, y + r * 0.36]], r * 0.045, dark(sk, 0.4)); p.curve([[x - r * 0.12, y + r * 0.38], [x, y + r * 0.42], [x + r * 0.12, y + r * 0.38]], r * 0.04, dark(sk, 0.45));
      p.ell(x, y + r * 0.6, r * 0.2, r * 0.065, o.lips || mix(sk, '#b03a4a', 0.55)); p.line(x - r * 0.2, y + r * 0.6, x + r * 0.2, y + r * 0.6, r * 0.022, dark(sk, 0.55));
      if (o.must) for (const s of [-1, 1]) p.tube([[x + s * r * 0.04, y + r * 0.5], [x + s * r * 0.3, y + r * 0.5], [x + s * r * 0.52, y + r * 0.36]], r * 0.12, r * 0.03, o.must);
    }
    for (const s of [-1, 1]) {
      const ex = x + s * r * 0.32, ey = y - r * 0.03;
      p.ell(ex, ey, r * 0.17, r * 0.085, '#fbf8f0'); p.circ(ex + s * r * 0.01, ey, r * 0.075, o.iris || '#2a1c22'); p.circ(ex + lx * r * 0.025, ey - r * 0.025, r * 0.022, '#ffffff');
      p.curve([[ex - s * r * 0.2, ey + r * 0.01], [ex, ey - r * 0.11], [ex + s * r * 0.22, ey - r * 0.01]], r * 0.04, '#1a1420'); p.curve([[ex - s * r * 0.22, ey - r * 0.2], [ex, ey - r * 0.3], [ex + s * r * 0.26, ey - r * 0.2]], r * 0.055, o.brow || hair);
    }
    if (o.tilak === 'U') { p.curve([[x - r * 0.13, y - r * 0.62], [x - r * 0.12, y - r * 0.28], [x, y - r * 0.16], [x + r * 0.12, y - r * 0.28], [x + r * 0.13, y - r * 0.62]], r * 0.06, '#fbf8f0'); p.line(x, y - r * 0.58, x, y - r * 0.26, r * 0.05, '#c9342f'); }
    if (o.tilak === 'tri') { for (let k = 0; k < 3; k++) p.line(x - r * 0.36, y - r * (0.62 - k * 0.11), x + r * 0.36, y - r * (0.62 - k * 0.11), r * 0.045, '#f1ece4'); p.ell(x, y - r * 0.5, r * 0.06, r * 0.14, '#c9342f'); }
    if (o.tilak === 'dot') p.circ(x, y - r * 0.42, r * 0.07, '#c9342f');
    crown(p, x, y, r, o.crown || 'mukut', o);
  }

  // ---------- attributes held in the hands ----------
  function attr(p, kind, x, y, s, k) {
    const c = p.c;
    if (kind === 'chakra') { scr(p, () => p.glow(x, y - 70 * k, 190 * k, '#fff0a0', 0.9)); for (let i = 0; i < 16; i++) { const a = i * 0.3927; p.poly([[x + Math.cos(a - 0.12) * 62 * k, y - 70 * k + Math.sin(a - 0.12) * 62 * k], [x + Math.cos(a + 0.12) * 62 * k, y - 70 * k + Math.sin(a + 0.12) * 62 * k], [x + Math.cos(a) * 88 * k, y - 70 * k + Math.sin(a) * 88 * k]], GOLD2); } c.strokeStyle = css(GOLD); c.lineWidth = 16 * k; c.beginPath(); c.arc(x, y - 70 * k, 56 * k, 0, 6.3); c.stroke(); for (let i = 0; i < 8; i++) p.line(x, y - 70 * k, x + Math.cos(i * 0.785) * 52 * k, y - 70 * k + Math.sin(i * 0.785) * 52 * k, 5 * k, GOLD2); p.circ(x, y - 70 * k, 14 * k, '#fffbe6'); }
    else if (kind === 'conch') { p.blob([[x - 30 * k, y - 20 * k], [x - 10 * k, y - 78 * k], [x + 34 * k, y - 96 * k], [x + 50 * k, y - 48 * k], [x + 30 * k, y - 4 * k], [x - 4 * k, y + 10 * k]], '#fbf6ea'); p.blob([[x - 6 * k, y - 66 * k], [x + 30 * k, y - 84 * k], [x + 40 * k, y - 50 * k], [x + 12 * k, y - 34 * k]], '#e2d8cc'); p.curve([[x + 34 * k, y - 96 * k], [x + 52 * k, y - 122 * k], [x + 44 * k, y - 140 * k]], 8 * k, '#fbf6ea'); for (let i = 0; i < 4; i++) p.curve([[x - 20 * k + i * 12 * k, y - 16 * k], [x - 4 * k + i * 12 * k, y - 50 * k], [x + 6 * k + i * 10 * k, y - 80 * k]], 2.5 * k, '#c9b8a8'); p.circ(x + 6 * k, y - 4 * k, 9 * k, GOLD); }
    else if (kind === 'lotus') { p.line(x, y, x, y - 50 * k, 6 * k, '#4f8a5a'); for (let i = -3; i <= 3; i++) { const a = -1.5708 + i * 0.38; p.blob([[x, y - 50 * k], [x + Math.cos(a - 0.25) * 46 * k, y - 50 * k + Math.sin(a - 0.25) * 46 * k], [x + Math.cos(a) * 84 * k, y - 50 * k + Math.sin(a) * 84 * k], [x + Math.cos(a + 0.25) * 46 * k, y - 50 * k + Math.sin(a + 0.25) * 46 * k]], Math.abs(i) % 2 ? '#f4a0bc' : '#fbd0de'); } p.circ(x, y - 58 * k, 12 * k, GOLD); }
    else if (kind === 'sword') { p.poly([[x - 9 * k, y - 10 * k], [x + 9 * k, y - 10 * k], [x + s * 30 * k + 6 * k, y - 240 * k], [x + s * 34 * k, y - 270 * k], [x + s * 22 * k - 6 * k, y - 236 * k]], '#e8eef4'); p.line(x, y - 14 * k, x + s * 28 * k, y - 250 * k, 2.5 * k, '#a8b4c4'); p.line(x - 34 * k, y - 8 * k, x + 34 * k, y - 12 * k, 10 * k, GOLD); p.line(x, y - 6 * k, x - s * 4 * k, y + 34 * k, 10 * k, GOLDD); }
    else if (kind === 'trident') { p.line(x - s * 10 * k, y + 150 * k, x + s * 14 * k, y - 230 * k, 9 * k, GOLDD); const tx = x + s * 14 * k, ty = y - 230 * k; for (const d of [-1, 0, 1]) p.curve([[tx, ty], [tx + d * 46 * k, ty - 30 * k], [tx + d * 40 * k, ty - (d ? 96 : 120) * k]], 9 * k, GOLD); p.circ(tx, ty, 12 * k, GOLD2); }
    else if (kind === 'axe') { p.line(x, y + 60 * k, x + s * 8 * k, y - 200 * k, 9 * k, '#6a4634'); const ax = x + s * 8 * k, ay = y - 170 * k; p.blob([[ax, ay - 34 * k], [ax + s * 70 * k, ay - 64 * k], [ax + s * 92 * k, ay], [ax + s * 70 * k, ay + 58 * k], [ax, ay + 30 * k]], '#dfe6ee'); p.blob([[ax + s * 60 * k, ay - 54 * k], [ax + s * 84 * k, ay], [ax + s * 62 * k, ay + 48 * k], [ax + s * 70 * k, ay]], '#ffffff'); }
    else if (kind === 'bow') { p.curve([[x + s * 10 * k, y - 170 * k], [x - s * 56 * k, y - 80 * k], [x - s * 60 * k, y + 20 * k], [x + s * 10 * k, y + 130 * k]], 9 * k, GOLD); p.line(x + s * 10 * k, y - 170 * k, x + s * 10 * k, y + 130 * k, 2 * k, '#fff6dc'); }
    else if (kind === 'mace') { p.line(x, y - 40 * k, x + s * 40 * k, y + 330 * k, 16 * k, GOLDD); p.line(x + 3 * k, y - 40 * k, x + s * 40 * k + 3 * k, y + 330 * k, 5 * k, GOLD2); const mx = x + s * 48 * k, my = y + 400 * k; scr(p, () => p.glow(mx, my, 190 * k, '#ffe08a', 0.5)); p.ell(mx, my, 92 * k, 108 * k, GOLDD); p.ell(mx + p.lx * 10 * k, my - 8 * k, 76 * k, 92 * k, GOLD); for (let i = -2; i <= 2; i++) p.curve([[mx + i * 30 * k, my - 96 * k], [mx + i * 46 * k, my], [mx + i * 30 * k, my + 96 * k]], 5 * k, GOLDD, 0.8); p.ell(mx + p.lx * 30 * k, my - 40 * k, 20 * k, 30 * k, GOLD2, 0.8); p.ell(mx, my - 108 * k, 44 * k, 16 * k, GOLD2); p.circ(mx, my + 120 * k, 20 * k, GOLD); p.circ(x - s * 4 * k, y - 60 * k, 18 * k, GOLD); }
    else if (kind === 'palm') { p.ell(x, y - 30 * k, 40 * k, 48 * k, lite(Epic.palmSkin || '#4a69c8', 0.12)); for (let i = 0; i < 4; i++) p.cap(x - 27 * k + i * 18 * k, y - 60 * k, x - 30 * k + i * 20 * k, y - (118 + (i === 1 || i === 2 ? 14 : 0)) * k, 17 * k, 13 * k, lite(Epic.palmSkin || '#4a69c8', 0.12)); p.cap(x + s * 34 * k, y - 24 * k, x + s * 62 * k, y - 60 * k, 18 * k, 13 * k, lite(Epic.palmSkin || '#4a69c8', 0.12)); p.circ(x, y - 26 * k, 13 * k, '#f6a0a8'); p.circ(x, y - 26 * k, 6 * k, GOLD2); }
    else if (kind === 'flame') { p.fire(x, y, 70 * k, 190 * k); }
    else if (kind === 'book') { p.poly([[x - 40 * k, y - 80 * k], [x + 40 * k, y - 92 * k], [x + 46 * k, y - 10 * k], [x - 34 * k, y + 2 * k]], '#f0d06a'); p.poly([[x - 30 * k, y - 70 * k], [x + 32 * k, y - 80 * k], [x + 36 * k, y - 18 * k], [x - 26 * k, y - 8 * k]], '#fff6c8'); }
  }

  // ---------- the universal form, drawn on a 1200 x 1800 design space ----------
  function vishva(p, o) {
    const c = p.c, cx = 600, sk = o.skin || '#3f64c4', skd = dark(sk, 0.32), lx = p.lx, red = o.red || '#c9302c', yel = o.yellow || '#f4c93a';
    c.save(); c.translate(o.x || 0, o.y || 0); c.scale(o.k || 1, o.k || 1);
    // aura
    scr(p, () => { p.glow(cx, 620, 1050, o.aura || '#ffd070', o.auraA || 0.5); p.rays(cx, 560, 72, 1500, o.ray || '#fff0b8', o.rayA || 0.12); p.glow(cx, 520, 420, '#ffffff', 0.4); });
    for (const r of [330, 430, 540]) { c.strokeStyle = 'rgba(255,240,190,0.4)'; c.lineWidth = 4; c.beginPath(); c.arc(cx, 560, r, 0, 6.3); c.stroke(); }
    // Shesha: seven hoods
    const hc = o.hood || '#4a5a78';
    for (const i of [-3, 3, -2, 2, -1, 1, 0]) {
      const a = i * 0.36, hx = cx + Math.sin(a) * 360, hy = 560 - Math.cos(a) * 330 + Math.abs(i) * 18;
      p.tube([[cx + i * 22, 640], [cx + Math.sin(a) * 190, 560 - Math.cos(a) * 150], [hx, hy + 60]], 70, 54, dark(hc, 0.2));
      p.ell(hx, hy, 88, 112, dark(hc, 0.25), 1, a); p.ell(hx + lx * 6, hy - 4, 74, 98, hc, 1, a); p.ell(hx, hy + 14, 50, 72, lite(hc, 0.35), 1, a);
      for (let k = 0; k < 6; k++) p.curve([[hx - 40, hy - 30 + k * 18], [hx, hy - 22 + k * 18], [hx + 40, hy - 30 + k * 18]], 2.5, dark(hc, 0.3), 0.7);
      p.ell(hx + Math.sin(a) * 10, hy + 40, 34, 28, dark(hc, 0.1)); p.ell(hx + Math.sin(a) * 10, hy + 34, 26, 18, lite(hc, 0.15));
      for (const s of [-1, 1]) { p.circ(hx + Math.sin(a) * 10 + s * 15, hy + 32, 6, '#ffe27a'); p.circ(hx + Math.sin(a) * 10 + s * 15, hy + 32, 2.6, '#1a1420'); }
      p.curve([[hx - 13, hy - 46], [hx - 12, hy - 18], [hx, hy - 8], [hx + 12, hy - 18], [hx + 13, hy - 46]], 5, '#fbf8f0'); p.curve([[hx + Math.sin(a) * 10, hy + 58], [hx + Math.sin(a) * 14, hy + 78]], 3, '#c9342f');
    }
    // the red mantle, behind the body
    for (const s of [-1, 1]) {
      p.blob([[cx + s * 150, 668], [cx + s * 250, 760], [cx + s * 300, 1000], [cx + s * 430, 1300], [cx + s * 600, 1600], [cx + s * 470, 1640], [cx + s * 330, 1420], [cx + s * 230, 1150], [cx + s * 150, 900]], dark(red, 0.25));
      p.blob([[cx + s * 160, 680], [cx + s * 240, 780], [cx + s * 280, 1000], [cx + s * 400, 1300], [cx + s * 540, 1570], [cx + s * 440, 1560], [cx + s * 320, 1350], [cx + s * 220, 1100], [cx + s * 170, 900]], s * lx > 0 ? lite(red, 0.12) : red);
      p.curve([[cx + s * 250, 760], [cx + s * 300, 1000], [cx + s * 430, 1300], [cx + s * 600, 1600]], 9, GOLD); for (let k = 0; k < 14; k++) p.circ(cx + s * (215 + k * 22 + p.rr(-10, 10)), 820 + k * 52, 7, GOLD2, 0.8);
      for (let k = 0; k < 5; k++) p.curve([[cx + s * (170 + k * 14), 720], [cx + s * (220 + k * 26), 1000], [cx + s * (330 + k * 34), 1400]], 3, dark(red, 0.35), 0.6);
    }
    // arms
    const AN = [-10, 10, 30, 50, 68, 84], LA = o.left || ['chakra', 'bow', 'trident', 'lotus', 'flame', 'mace'], RA = o.right || ['conch', 'sword', 'axe', 'book', 'palm', 'mace'];
    for (let i = 0; i < 6; i++) for (const s of [-1, 1]) {
      const th = AN[i] * Math.PI / 180, ph = (AN[i] * (i === 5 ? 1 : 0.9) - (i === 5 ? -4 : 30)) * Math.PI / 180, L1 = 196 - i * 6, L2 = 168 - i * 4, col = i % 2 ? skd : sk;
      const sx = cx + s * (150 - i * 6), sy = 706 + i * 12, ex = sx + s * Math.cos(th) * L1, ey = sy + Math.sin(th) * L1, hx = ex + s * Math.cos(ph) * L2, hy = ey + Math.sin(ph) * L2;
      const kind = (s < 0 ? LA : RA)[i];
      if (kind === 'mace') attr(p, kind, hx, hy, s, 1);
      p.limb(sx, sy, ex, ey, 66, 52, col, 0.26); p.limb(ex, ey, hx, hy, 50, 36, col, 0.2);
      const mx = (sx + ex) / 2, my = (sy + ey) / 2, pa = Math.atan2(ey - sy, ex - sx) + 1.5708;
      p.line(mx - Math.cos(pa) * 31, my - Math.sin(pa) * 31, mx + Math.cos(pa) * 31, my + Math.sin(pa) * 31, 20, GOLD); p.line(mx - Math.cos(pa) * 31, my - Math.sin(pa) * 31, mx + Math.cos(pa) * 31, my + Math.sin(pa) * 31, 6, GOLD2); p.circ(mx, my, 9, '#c9342f');
      const wa = Math.atan2(hy - ey, hx - ex) + 1.5708, wx = hx - (hx - ex) * 0.2, wy = hy - (hy - ey) * 0.2;
      p.line(wx - Math.cos(wa) * 22, wy - Math.sin(wa) * 22, wx + Math.cos(wa) * 22, wy + Math.sin(wa) * 22, 24, GOLD); p.line(wx - Math.cos(wa) * 22, wy - Math.sin(wa) * 22, wx + Math.cos(wa) * 22, wy + Math.sin(wa) * 22, 7, GOLDD);
      p.circ(hx, hy, 25, lite(col, 0.1)); if (kind !== 'mace') attr(p, kind, hx, hy, s, 1);
    }
    // legs and dhoti
    for (const s of [-1, 1]) { p.ell(cx + s * 72, 1520, 62, 24, skd); p.ell(cx + s * 72 + lx * 6, 1514, 50, 17, sk); p.line(cx + s * 30, 1490, cx + s * 112, 1490, 16, GOLD); }
    for (const s of [-1, 1]) {
      p.blob([[cx + s * 128, 1040], [cx + s * 150, 1250], [cx + s * 128, 1480], [cx + s * 20, 1490], [cx + s * 4, 1250], [cx, 1040]], dark(yel, 0.22));
      p.blob([[cx + s * 118, 1050], [cx + s * 136, 1250], [cx + s * 116, 1470], [cx + s * 34, 1478], [cx + s * 22, 1250], [cx + s * 16, 1050]], s * lx > 0 ? lite(yel, 0.25) : yel);
      for (let k = 0; k < 5; k++) p.curve([[cx + s * (30 + k * 20), 1070], [cx + s * (36 + k * 22), 1260], [cx + s * (30 + k * 20), 1470]], 4, dark(yel, 0.3), 0.6);
      p.blob([[cx + s * 126, 1060], [cx + s * 200, 1180], [cx + s * 170, 1330], [cx + s * 132, 1240]], dark(yel, 0.1)); p.line(cx + s * 22, 1474, cx + s * 126, 1470, 12, red);
    }
    p.poly([[cx - 46, 1050], [cx + 46, 1050], [cx + 84, 1400], [cx, 1470], [cx - 84, 1400]], dark(red, 0.2)); p.poly([[cx - 34, 1050], [cx + 34, 1050], [cx + 66, 1392], [cx, 1452], [cx - 66, 1392]], red);
    for (let k = -3; k <= 3; k++) p.line(cx + k * 9, 1056, cx + k * 20, 1400, 3, dark(red, 0.35), 0.7); p.curve([[cx - 80, 1398], [cx, 1466], [cx + 80, 1398]], 10, GOLD); for (let k = 0; k < 22; k++) p.circ(cx + p.rr(-50, 50) * (0.5 + k / 30), 1090 + k * 14, 5, GOLD2, 0.9);
    // torso
    p.blob([[cx - 60, 640], [cx - 178, 690], [cx - 158, 810], [cx - 104, 980], [cx - 128, 1056], [cx + 128, 1056], [cx + 104, 980], [cx + 158, 810], [cx + 178, 690], [cx + 60, 640]], skd);
    p.blob([[cx - 50 + lx * 14, 650], [cx - 160 + lx * 14, 698], [cx - 140 + lx * 14, 810], [cx - 90 + lx * 14, 980], [cx - 110 + lx * 14, 1050], [cx + 110 + lx * 14, 1050], [cx + 90 + lx * 14, 980], [cx + 140 + lx * 14, 810], [cx + 160 + lx * 14, 698], [cx + 50 + lx * 14, 650]], sk);
    p.blob([[cx + lx * 40, 700], [cx + lx * 140, 720], [cx + lx * 120, 830], [cx + lx * 30, 850]], lite(sk, 0.2)); p.blob([[cx + lx * 30, 880], [cx + lx * 96, 880], [cx + lx * 84, 1000], [cx + lx * 30, 1010]], lite(sk, 0.12));
    for (const s of [-1, 1]) { p.circ(cx + s * 166, 706, 60, s * lx > 0 ? lite(sk, 0.15) : skd); p.curve([[cx + s * 14, 760], [cx + s * 80, 850], [cx + s * 140, 800]], 5, dark(sk, 0.4), 0.7); }
    p.line(cx, 720, cx, 1000, 4, dark(sk, 0.4), 0.6); for (const y of [900, 950]) p.curve([[cx - 60, y], [cx, y + 10], [cx + 60, y]], 3.5, dark(sk, 0.4), 0.5); p.ell(cx, 1004, 8, 12, dark(sk, 0.5));
    p.rect(cx - 44, 596, 88, 80, skd); p.rect(cx - 44 + (lx > 0 ? 30 : 0), 596, 58, 80, sk);
    p.curve([[cx + 150, 690], [cx + 20, 860], [cx - 96, 1010]], 5, '#fbf8f0');
    // belt
    p.rect(cx - 134, 1022, 268, 52, GOLDD); p.rect(cx - 134, 1028, 268, 34, GOLD); for (let k = -5; k <= 5; k++) p.circ(cx + k * 24, 1045, 7, k % 2 ? '#c9342f' : GOLD2); p.ell(cx, 1048, 50, 44, GOLDD); p.ell(cx, 1048, 40, 34, GOLD); p.ell(cx, 1048, 24, 20, '#c9342f'); p.ell(cx + lx * 6, 1042, 10, 8, '#ffb0a0');
    // jewellery
    p.curve([[cx - 60, 668], [cx, 716], [cx + 60, 668]], 16, GOLD); p.curve([[cx - 60, 668], [cx, 716], [cx + 60, 668]], 5, GOLD2); for (let k = -3; k <= 3; k++) p.poly([[cx + k * 17 - 8, 712 - Math.abs(k) * 7], [cx + k * 17 + 8, 712 - Math.abs(k) * 7], [cx + k * 17, 740 - Math.abs(k) * 8]], GOLD);
    p.curve([[cx - 104, 680], [cx - 50, 800], [cx, 838], [cx + 50, 800], [cx + 104, 680]], 9, GOLD); p.ell(cx, 850, 26, 30, GOLD); p.ell(cx, 850, 14, 17, '#2f8f7a'); p.curve([[cx - 124, 690], [cx - 70, 880], [cx, 950], [cx + 70, 880], [cx + 124, 690]], 5, GOLD2);
    // the long garland
    const G = [[cx - 138, 676], [cx - 176, 860], [cx - 150, 1100], [cx - 96, 1300], [cx, 1400], [cx + 96, 1300], [cx + 150, 1100], [cx + 176, 860], [cx + 138, 676]];
    const gp = (function (P) { const out = []; for (let i = 0; i < P.length - 1; i++) for (let t = 0; t < 1; t += 0.1) out.push([P[i][0] + (P[i + 1][0] - P[i][0]) * t, P[i][1] + (P[i + 1][1] - P[i][1]) * t]); return out; })(G);
    p.curve(G, 30, '#3f6a4a', 0.5);
    gp.forEach((q, i) => { const x = q[0] + Math.sin(i * 1.7) * 6, y = q[1]; if (i % 5 === 2) { p.circ(x, y, 23, '#b8324a'); p.circ(x, y, 15, '#e0607a'); p.circ(x + lx * 3, y - 3, 7, '#f8a8b8'); } else { p.circ(x, y, 17, '#e6e0d6'); p.circ(x + lx * 3, y - 3, 11, '#ffffff'); p.circ(x, y, 4, '#f0d890'); } });
    // the many faces
    const side = o.heads || [
      [{ type: 'human', skin: '#4f8f9a', hair: '#3a2c2a', crown: 'jata', tilak: 'tri', long: true, lips: '#3a6a7a' }, { type: 'human', skin: '#e8c8a0', crown: 'crown', beard: '#f4f0e8', beardLen: 0.9, brow: '#f4f0e8', tilak: 'U', gold: '#f6d77a' }],
      [{ type: 'elephant', skin: '#d9a0a8' }, { type: 'monkey', skin: '#c98a50', crown: 'crown' }],
      [{ type: 'human', skin: '#d9b494', crown: 'bun', hair: '#f1ece4', beard: '#f1ece4', beardLen: 1.3, brow: '#f1ece4', tilak: 'tri' }, { type: 'human', skin: '#e0a878', crown: 'crown', must: '#2a1c22', tilak: 'dot' }],
      [{ type: 'lion', skin: '#e8b050' }, { type: 'boar', skin: '#5a6a88' }],
      [{ type: 'human', skin: '#c9483a', crown: 'crown', must: '#3a1c1a', hair: '#5a1c14', tilak: 'dot' }, { type: 'human', skin: '#3a3f6a', crown: 'crown', must: '#f1ece4', tilak: 'tri', iris: '#c9342f' }]
    ];
    for (let i = side.length - 1; i >= 0; i--) for (const s of [-1, 1]) {
      const hx = cx + s * (148 + i * 98 - i * i * 3), hy = 512 + i * 10, r = 64 - i * 6, h = side[i][s < 0 ? 0 : 1];
      p.tube([[cx + s * (40 + i * 8), 650], [cx + s * (90 + i * 56), 606], [hx, hy + r * 0.7]], 34 - i * 4, 26 - i * 3, i % 2 ? skd : dark(sk, 0.15));
      face(p, hx, hy, r, h);
    }
    p.ell(cx, 520, 100, 116, '#17131f'); for (const s of [-1, 1]) p.blob([[cx + s * 70, 470], [cx + s * 118, 560], [cx + s * 126, 660], [cx + s * 90, 700], [cx + s * 60, 620]], '#17131f');
    face(p, cx, 520, 96, { skin: sk, crown: 'mukut', feather: true, tilak: 'U', hair: '#17131f', lips: '#2a3f8a', gem: '#c9342f' });
    c.restore();
  }
  const stars = (p, n, y1) => { for (let i = 0; i < n; i++) { const x = p.rr(0, p.W), y = p.rr(0, y1), r = p.rr(1, 3.6); p.circ(x, y, r, '#fffbe6', p.rr(0.5, 1)); if (r > 3) scr(p, () => p.glow(x, y, 18, '#cfe0ff', 0.8)); } };
  const DET = { crisp: 0.42, vary: 0.8, layers: [[70, 0], [34, 40], [16, 56], [8, 74], [4.5, 96], [2.5, 130]] };
  const V = [];

  V.push({ title: 'Vishvarupa: The Cosmic Night', kanda: 'Bhagavad Gita 11.10-13', seed: 601, light: -1, w: 1200, h: 1800, paint: DET,
    text: 'Many mouths and eyes, many wonders, many divine ornaments and upraised weapons. "If the light of a thousand suns rose at once in the sky, it might resemble the splendour of that great being."',
    draw(p) {
      p.sky([[0, '#0a1036'], [0.3, '#1c1f66'], [0.5, '#7a2a50'], [0.66, '#e8602a'], [0.84, '#fbb030'], [1, '#fff0a0']]); stars(p, 260, 800);
      for (let i = 0; i < 9; i++) p.ell(p.rr(0, 1200), p.rr(40, 620), p.rr(120, 320), p.rr(40, 100), ['#2a2f8a', '#4a2a7a', '#1c3a8a'][i % 3], 0.35, p.rr(-0.5, 0.5));
      p.circ(980, 150, 34, '#c96a4a'); p.circ(970, 142, 22, '#e89a6a'); p.circ(160, 260, 22, '#8fa8d8'); p.ell(160, 260, 40, 8, '#cfd8f0', 0.8, -0.3); p.circ(1090, 430, 14, '#f0d890');
      vishva(p, {});
      for (let i = 0; i < 420; i++) { const y = p.rr(900, 1800); p.rect(p.rr(0, 1200), y, p.rr(2, 7), p.rr(2, 7), p.r() < 0.5 ? '#fff0a0' : '#ff9a3a', p.rr(0.4, 1)); }
      p.c.fillStyle = '#0c0812'; p.c.beginPath(); p.c.ellipse(600, 2300, 1500, 640, 0, 0, 6.3); p.c.fill();
      const d = p.chariot(560, 1700, 62, { f: 1, col: '#0c0812', horse: '#0c0812', gold: '#0c0812', canopyCol: '#0c0812', flag: '#0c0812', mane: '#0c0812', horses: 3, gait: 'walk' });
      p.mini(d.x - 6, d.y, 40, '#0c0812', { arms: true, head: '#0c0812' }); p.mini(d.x + 24, d.y, 38, '#0c0812', { head: '#0c0812' });
    } });
  V.push({ title: 'Vishvarupa at Dawn', kanda: 'Bhagavad Gita 11.15-19', seed: 602, light: 1, w: 1200, h: 1800, paint: DET,
    text: '"I see all the gods in your body, O Lord, and hosts of every kind of being: Brahma on his lotus seat, all the sages and the serpents of heaven. I see you without beginning, middle or end."',
    draw(p) {
      p.sky(['#f6e6d8', '#fbd8c4', '#f8c0b0', '#f0a898', '#d87878']); p.clouds({ n: 9, y0: 60, y1: 900, size: 220, col: '#fff6ec', shadow: '#e8b0b0', light: '#ffffff' });
      vishva(p, { auraA: 0.85, rayA: 0.2, skin: '#8fa6e6', aura: '#fff4d8', ray: '#ffffff', hood: '#e0a078', red: '#e0483a', yellow: '#fbe0a0' });
      p.fade('#fff0e0', 0.2, 0, 1500); p.clouds({ n: 12, y0: 1400, y1: 1640, size: 210, col: '#fff0e6', shadow: '#e8a8a8' });
      const g = p.ridge({ y: 1600, amp: 40, col: '#b8403a', col2: '#5a1c28', seed: 5, tilt: -0.12, freq: 0.004 });
      p.crowd({ x0: 0, x1: 500, y: g, jit: 10, h: 40, n: 40, col: '#5a1c28', col2: '#8a2f34', spears: 0.6, banners: 0.08, bannerCol: '#f0c85a' });
      F(p, 760, g(760) + 6, 230, { skin: '#3a1c24', cloth: '#5a1c28', cloth2: '#8a2f34', top: '#3a1c24', gold: '#f0c85a', crown: 'mukut', hair: '#1c1018' }, KNEEL, PRAY, { f: -1, head: -40 });
      p.curve([[850, g(850)], [880, g(850) - 90], [850, g(850) - 180]], 8, '#3a1c24'); for (let i = 0; i < 80; i++) p.ell(p.rr(0, 1200), p.rr(0, 1800), 7, 4, '#fff6e0', 0.9, p.rr(0, 3));
    } });
  V.push({ title: 'The Light of a Thousand Suns', kanda: 'Bhagavad Gita 11.12', seed: 603, light: -1, paint: DET,
    text: 'Between the two armies the charioteer is no longer a man. Arjuna sees the whole universe, moving and unmoving, gathered in one place in the body of the god of gods, and bows with his hair standing on end.',
    draw(p) {
      p.sky([[0, '#0a1036'], [0.4, '#262a78'], [0.66, '#8a3a6a'], [0.86, '#f08a3a'], [1, '#ffd880']]); stars(p, 320, 520);
      for (let i = 0; i < 10; i++) p.ell(p.rr(0, 2000), p.rr(20, 420), p.rr(160, 420), p.rr(40, 110), ['#2a2f8a', '#4a2a7a', '#1c3a8a'][i % 3], 0.35, p.rr(-0.4, 0.4));
      p.circ(300, 130, 30, '#c96a4a'); p.circ(1760, 200, 22, '#8fa8d8'); p.ell(1760, 200, 40, 8, '#cfd8f0', 0.8, -0.3);
      vishva(p, { x: 730, y: -22, k: 0.45 });
      p.clouds({ n: 5, y0: 600, y1: 690, size: 170, col: '#8a5a8a', shadow: '#5a3f78', light: '#f8b888', x0: -100, x1: 680 }); p.clouds({ n: 5, y0: 600, y1: 690, size: 170, col: '#8a5a8a', shadow: '#5a3f78', light: '#f8b888', x0: 1330, x1: 2100 });
      p.ridge({ y: 700, amp: 26, col: '#6a4a78', col2: '#2a1c3a', seed: 6 });
      p.crowd({ x0: 0, x1: 760, y: 740, jit: 26, h: 34, n: 170, col: '#c9a060', col2: '#8a6a50', spears: 0.6, banners: 0.05, bannerCol: '#f0c85a' }); p.crowd({ x0: 1240, x1: 2000, y: 740, jit: 26, h: 34, n: 170, col: '#4a3a5a', col2: '#7a4a50', spears: 0.6, banners: 0.05, bannerCol: '#b8323a', dir: -1 });
      const d = p.chariot(430, 800, 150, { f: 1, col: '#b0763a', horse: '#ffffff', canopyCol: '#f0c85a', flag: '#f6e0a0', horses: 4, gait: 'stand' });
      F(p, d.x + 10, d.y, 170, { skin: '#d9a77c', cloth: '#f1ead8', cloth2: '#4f7fb5', crown: 'mukut', hair: '#1f1a2a', top: '#c9d2dc' }, KNEEL, PRAY, { f: 1, head: -34 });
      for (let i = 0; i < 200; i++) p.rect(p.rr(500, 1500), p.rr(300, 800), p.rr(2, 6), p.rr(2, 6), p.r() < 0.5 ? '#fff0a0' : '#ff9a3a', p.rr(0.4, 1)); p.ridge({ y: 850, amp: 14, col: '#140e1c', seed: 3, freq: 0.004 });
    } });
  V.push({ title: 'The Faces of the One', kanda: 'Bhagavad Gita 11.6', seed: 604, light: -1, paint: DET,
    text: '"See in me the Adityas, the Vasus, the Rudras, the Ashvins and the Maruts. See many wonders never seen before." Shiva, Brahma, the sages, the kings, the lion and the boar: every face is his.',
    draw(p) {
      p.sky([[0, '#0a1036'], [0.5, '#2a2470'], [0.8, '#a8405a'], [1, '#f08a3a']]); stars(p, 300, 860);
      for (let i = 0; i < 8; i++) p.ell(p.rr(0, 2000), p.rr(20, 700), p.rr(160, 420), p.rr(40, 110), ['#2a2f8a', '#4a2a7a', '#1c3a8a'][i % 3], 0.35, p.rr(-0.4, 0.4));
      vishva(p, { x: -56, y: -400, k: 1.76 });
    } });

  // ---------- Ram-naam: pictures written with one word ----------
  const WORD = 'राम';
  function textPaint(ref, out, seed, o) {
    o = o || {}; const w = ref.width, h = ref.height, src = ref.getContext('2d').getImageData(0, 0, w, h).data, oc = out.getContext('2d');
    let s = (seed || 1) * 7919; const r = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
    const boost = o.boost == null ? 1.12 : o.boost, base = Math.min(w, h);
    let mr = 0, mg = 0, mb = 0, mn = 0; for (let i = 0; i < src.length; i += 4 * 97) { mr += src[i]; mg += src[i + 1]; mb += src[i + 2]; mn++; }
    const mean = [mr / mn, mg / mn, mb / mn], bg = o.bg || css((mean[0] + mean[1] + mean[2]) / 3 > 140 ? mix(mean, '#fbf3e0', 0.5) : mix(mean, '#0e0a16', 0.55));
    oc.setTransform(1, 0, 0, 1, 0, 0); oc.globalAlpha = 1; oc.fillStyle = bg; oc.fillRect(0, 0, w, h); oc.textBaseline = 'alphabetic';
    const layers = o.layers || [[0.12, 0], [0.12, -1], [0.06, 96], [0.032, 100], [0.018, 110], [0.0105, 130]];
    for (const [f, thr] of layers) {
      const fs = Math.max(7, base * f), cur = thr > 0 ? oc.getImageData(0, 0, w, h).data : null;
      oc.font = '700 ' + fs + 'px RamNaam, "Noto Serif Devanagari", "Noto Sans Devanagari", serif';
      const ww = oc.measureText(WORD).width || fs * 1.6, rowH = fs * 0.74;
      for (let y = fs * (thr < 0 ? 0.13 : 0.5); y < h + fs; y += rowH) {
        for (let x = -r() * ww - (thr < 0 ? ww * 0.5 : 0); x < w; x += ww * 0.96) {
          const sx = Math.min(w - 1, Math.max(0, x + ww * 0.5)) | 0, sy = Math.min(h - 1, Math.max(0, y - fs * 0.42)) | 0, k = (sy * w + sx) * 4;
          let R = src[k], G = src[k + 1], B = src[k + 2];
          if (cur && Math.abs(cur[k] - R) + Math.abs(cur[k + 1] - G) + Math.abs(cur[k + 2] - B) < thr) continue;
          const m = (R + G + B) / 3, j = (r() - 0.5) * 14; R = m + (R - m) * boost + j; G = m + (G - m) * boost + j; B = m + (B - m) * boost + j;
          oc.fillStyle = 'rgb(' + (Math.max(0, Math.min(255, R)) | 0) + ',' + (Math.max(0, Math.min(255, G)) | 0) + ',' + (Math.max(0, Math.min(255, B)) | 0) + ')';
          oc.globalAlpha = thr > 0 ? 0.97 : 0.92; oc.fillText(WORD, x, y + (r() - 0.5) * fs * 0.06);
        }
      }
    }
    oc.globalAlpha = 1;
  }
  Epic.textPaint = textPaint;
  const RN = [], pick = (set, n, o) => { const sc = Epic.scenes[set][n - 1]; RN.push(Object.assign({}, sc, { ram: Object.assign({}, o || {}), seed: sc.seed + 900, text: sc.text + ' Written entirely in the word राम.' })); };
  pick('rama', 1); pick('ramayana', 15); pick('ramayana', 5); pick('rama', 2); pick('ramayana', 9); pick('ramayana', 7);
  pick('ramayana', 11); pick('rama', 4); pick('ramayana', 17); pick('ramayana', 19); pick('ramayana', 22); pick('ramayana', 23); pick('rama', 8); pick('ramayana', 25);
  // a calligram: the seated word itself, filled with the dawn over Ayodhya
  RN.push({ title: 'The Name', kanda: 'Rama-nama', seed: 990, light: -1, ram: { bg: '#f6ead2', boost: 1.25, layers: [[0.09, 0], [0.045, 60], [0.024, 80], [0.013, 100]] },
    text: 'Tradition holds that the name is greater than the one it names. Here the two syllables are themselves the picture, each stroke filled with smaller repetitions of the same word.',
    draw(p) {
      const c = p.c; c.fillStyle = '#f6ead2'; c.fillRect(0, 0, 2000, 860);
      const g = c.createLinearGradient(0, 120, 0, 760); g.addColorStop(0, '#5a2a8a'); g.addColorStop(0.35, '#d9483b'); g.addColorStop(0.7, '#f08a2a'); g.addColorStop(1, '#f6c23a');
      c.fillStyle = g; c.font = '700 640px RamNaam, "Noto Serif Devanagari", serif'; c.textAlign = 'center'; c.textBaseline = 'alphabetic'; c.fillText(WORD, 1000, 690); c.textAlign = 'start';
      for (let i = 0; i < 36; i++) { const a = i / 36 * 6.283; c.strokeStyle = 'rgba(217,120,43,0.5)'; c.lineWidth = 10; c.beginPath(); c.moveTo(1000 + Math.cos(a) * 880, 430 + Math.sin(a) * 400); c.lineTo(1000 + Math.cos(a) * 980, 430 + Math.sin(a) * 440); c.stroke(); }
    } });

  Epic.front = { face: face, crown: crown, attr: attr, vishva: vishva, stars: stars, DET: DET };
  Epic.scenes.vishvarupa = V; Epic.scenes.ramnaam = RN;
})();
