import ImageHeading from "./ImageHeading";
import FadeIn from "./FadeIn";
import LineDraw from "./LineDraw";

// A heading row laid out exactly like the PDF (positions in PDF points, page width 1024).
// Everything is placed in % of the row, so the sketch, heading and line always meet,
// whatever the screen size.
const PAGE = 1024;
const pct = (v, total) => `${(v / total) * 100}%`;

export default function HeadRow({ y0, y1, heading, art, rule, ruleFrom = "left", light = false }) {
  const H = y1 - y0;
  const box = ([x0, ya, x1, yb]) => ({ left: pct(x0, PAGE), top: pct(ya - y0, H), width: pct(x1 - x0, PAGE), height: pct(yb - ya, H) });
  return (
    <div className={`headrow ${light ? "headrow--light" : "headrow--dark"}`} style={{ aspectRatio: `${PAGE} / ${H}` }}>
      {rule && (
        <LineDraw className="headrow__rule" origin={ruleFrom}
          style={{ left: pct(rule[0], PAGE), width: pct(rule[1] - rule[0], PAGE), top: pct(rule[2] - y0, H) }} />
      )}
      {art && (
        <div className="headrow__art" style={box(art.box)}>
          <FadeIn y={0}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={art.src} alt="" loading="lazy" />
          </FadeIn>
        </div>
      )}
      <div className="headrow__title" style={box(heading.box)}>
        <ImageHeading src={heading.src} alt={heading.alt} width={heading.w} height={heading.h} />
      </div>
    </div>
  );
}
