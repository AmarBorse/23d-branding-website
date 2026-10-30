// Reads a project PDF (exported from the 23D page design) and finds:
//   • the project name (the biggest text near the top)
//   • the description (the other text, outside the site's menu/footer)
//   • the project images (their visible area, top to bottom)
// Works with pdf.js; no rendering happens here, only measuring.

const SITE_TEXT = /^(work|services|about|about us|contact|contact us|start the project|➔|facebook|instagram|pintrest|pinterest|linkedin|book a call|branding|23d|branding 23d|we bring strategy, design,|& digital creativity together to help businesses)$/i;
const CTA_TEXT = /let.s make it happen|have brand in mind|book a call|all rights reserved|website design & manag/i;

const mul = (m, n) => [
  m[0] * n[0] + m[2] * n[1], m[1] * n[0] + m[3] * n[1],
  m[0] * n[2] + m[2] * n[3], m[1] * n[2] + m[3] * n[3],
  m[0] * n[4] + m[2] * n[5] + m[4], m[1] * n[4] + m[3] * n[5] + m[5],
];
const apply = (m, x, y) => [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]];
const boxOf = (m, x0, y0, x1, y1) => {
  const pts = [apply(m, x0, y0), apply(m, x1, y0), apply(m, x0, y1), apply(m, x1, y1)];
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
};
const intersect = (a, b) => (!a ? b : !b ? a : [Math.max(a[0], b[0]), Math.max(a[1], b[1]), Math.min(a[2], b[2]), Math.min(a[3], b[3])]);
const area = (r) => Math.max(0, r[2] - r[0]) * Math.max(0, r[3] - r[1]);

export async function analyzePage(page, OPS) {
  const viewport = page.getViewport({ scale: 1 });
  const W = viewport.width;
  const VT = viewport.transform; // PDF units -> screen units (y going down)
  const toView = (r) => boxOf(VT, r[0], r[1], r[2], r[3]);

  // ── images and the area each one really shows (after clipping) ──
  const ops = await page.getOperatorList();
  let ctm = [1, 0, 0, 1, 0, 0], clip = null, pendingClip = false;
  const stack = [], raw = [];
  for (let i = 0; i < ops.fnArray.length; i++) {
    const fn = ops.fnArray[i], a = ops.argsArray[i];
    if (fn === OPS.save) stack.push([ctm, clip]);
    else if (fn === OPS.restore) { const s = stack.pop(); if (s) [ctm, clip] = s; }
    else if (fn === OPS.transform) ctm = mul(ctm, a);
    else if (fn === OPS.clip || fn === OPS.eoClip) pendingClip = true;
    else if (fn === OPS.constructPath) {
      if (pendingClip) {
        const mm = a && a[2];
        if (mm && mm.length >= 4 && isFinite(mm[0])) clip = intersect(clip, boxOf(ctm, mm[0], mm[1], mm[2], mm[3]));
        pendingClip = false;
      }
    } else if (fn === OPS.endPath) pendingClip = false;
    else if (fn === OPS.paintImageXObject || fn === OPS.paintInlineImageXObject || fn === OPS.paintImageXObjectRepeat) {
      const r = intersect(clip, boxOf(ctm, 0, 0, 1, 1));
      if (area(r) > 0) raw.push(toView(r));
    }
  }

  // ── text lines ──
  const tc = await page.getTextContent();
  const pieces = tc.items.filter((it) => it.str && it.str.trim()).map((it) => {
    const [x, y] = apply(VT, it.transform[4], it.transform[5]);
    return { x, y, size: Math.hypot(it.transform[2], it.transform[3]) || it.height, str: it.str };
  }).sort((a, b) => a.y - b.y || a.x - b.x);
  const lines = [];
  pieces.forEach((p) => {
    const line = lines.find((l) => Math.abs(l.y - p.y) < Math.max(2, p.size * 0.35));
    if (line) { line.parts.push(p); line.size = Math.max(line.size, p.size); }
    else lines.push({ y: p.y, size: p.size, parts: [p] });
  });
  lines.forEach((l) => {
    l.parts.sort((a, b) => a.x - b.x);
    l.text = l.parts.map((p) => p.str).join("").replace(/\s+/g, " ").trim();
    l.x = l.parts[0].x;
  });
  // the same text drawn twice (e.g. a shadow copy) counts once
  const uniq = lines.filter((l, i) => lines.findIndex((m) => m.text === l.text && Math.abs(m.y - l.y) < 3) === i);

  const ctaY = Math.min(...uniq.filter((l) => CTA_TEXT.test(l.text)).map((l) => l.y), Infinity);
  const HEADER = Math.min(150, viewport.height * 0.05);
  const content = uniq.filter((l) => l.y > HEADER && l.y < ctaY - 20 && !SITE_TEXT.test(l.text) && l.text.length > 1);

  // ── keep real project images ──
  let images = raw
    .map(([x0, y0, x1, y1]) => [Math.max(0, x0), Math.max(0, y0), Math.min(W, x1), Math.min(viewport.height, y1)])
    .filter((r) => r[2] - r[0] >= W * 0.28 && r[3] - r[1] >= 80)          // big enough
    .filter((r) => r[3] > HEADER + 20)                                      // not the header
    .filter((r) => !(r[1] <= ctaY && r[3] >= ctaY) && r[1] < ctaY);         // not the "Have brand in mind?" banner / footer
  // an image fully inside another one is already part of it
  images = images.filter((r, i) => !images.some((o, j) => j !== i && area(intersect(r, o)) >= area(r) * 0.9 && area(o) > area(r)));
  // drop exact duplicates
  images = images.filter((r, i) => images.findIndex((o) => Math.abs(o[0] - r[0]) < 2 && Math.abs(o[1] - r[1]) < 2 && Math.abs(o[2] - r[2]) < 2 && Math.abs(o[3] - r[3]) < 2) === i);
  images.sort((a, b) => a[1] - b[1] || a[0] - b[0]);

  // text sitting on top of an image belongs to the image, not the description
  const onImage = (l) => images.some((r) => l.y > r[1] && l.y < r[3] && l.x > r[0] && l.x < r[2]);
  const textLines = content.filter((l) => !onImage(l));

  // ── name + description ──
  const firstImageTop = images.length ? images[0][1] : Infinity;
  const titleCandidates = textLines.filter((l) => l.y < firstImageTop + 10);
  const title = (titleCandidates.length ? titleCandidates : textLines).reduce((best, l) => (!best || l.size > best.size + 0.5 ? l : best), null);
  const body = textLines.filter((l) => l !== title);
  const paragraphs = [];
  body.forEach((l, i) => {
    const prev = body[i - 1];
    if (prev && l.y - prev.y < prev.size * 2.2 && Math.abs(l.size - prev.size) < 1.5) paragraphs[paragraphs.length - 1] += " " + l.text;
    else paragraphs.push(l.text);
  });

  return {
    width: W, height: viewport.height,
    name: title ? title.text : "",
    description: paragraphs.join("\n\n"),
    images: images.map(([x0, y0, x1, y1]) => ({ x: x0, y: y0, w: x1 - x0, h: y1 - y0 })),
  };
}
