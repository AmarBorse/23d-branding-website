import { about, team } from "@/content/about";
import AboutHero from "@/components/AboutHero";
import ImageHeading from "@/components/ImageHeading";
import FadeIn from "@/components/FadeIn";
import HeadRow from "@/components/HeadRow";
import LineDraw from "@/components/LineDraw";
import TeamSlider from "@/components/TeamSlider";
import CtaSpotlight from "@/components/CtaSpotlight";

export const metadata = { title: "About" };

export default function About() {
  return (
    <>
      <AboutHero />

      {/* Who we are */}
      <section className="who">
        <div className="pdfwrap">
          <HeadRow light y0={405} y1={560}
            art={{ src: "/images/about/illustration-who.png", box: [0, 410, 356, 556] }}
            heading={{ src: "/images/who-we-are.png", alt: "Who we are", w: 1519, h: 215, box: [438.33, 479.33, 944.67, 551] }} />
          <FadeIn className="pdftext pdftext--right who__text" delay={0.15}>
            {about.who.map((p, i) => (
              <p key={i}>{p.text ?? <>{p.before}<strong className="accent">{p.highlight}</strong>{p.after}</>}</p>
            ))}
          </FadeIn>
          <LineDraw className="pdfrule pdfrule--light" origin="right" style={{ marginLeft: "5.47%", width: "90.72%" }} />
        </div>
      </section>

      {/* Vision + Mission */}
      <section className="dark vm">
        <div className="pdfwrap">
          <HeadRow y0={812} y1={936}
            art={{ src: "/images/about/illustration-vision.png", box: [678, 817, 881, 933] }}
            heading={{ src: "/images/our-vision.png", alt: "Our Vision", w: 1103, h: 193, box: [63.67, 832, 431.33, 896.33] }}
            rule={[58, 678.5, 919.5]} ruleFrom="right" />
          <FadeIn as="p" className="pdftext vm__text" delay={0.15}>{about.vision}</FadeIn>

          <div className="vm__gap" />
          <HeadRow y0={1042} y1={1186}
            art={{ src: "/images/about/illustration-mission.png", box: [58, 1047, 252, 1183] }}
            heading={{ src: "/images/our-mission.png", alt: "Our Mission", w: 1242, h: 195, box: [551.33, 1084, 965.33, 1149] }}
            rule={[251.5, 968, 1171.5]} />
          <FadeIn as="p" className="pdftext pdftext--right vm__text" delay={0.15}>{about.mission}</FadeIn>
        </div>
      </section>

      {/* Core values */}
      <section className="values">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/about/values-wave-right.jpg" alt="" className="values__wave values__wave--r" aria-hidden="true" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/about/values-wave-left.jpg" alt="" className="values__wave values__wave--l" aria-hidden="true" />
        <div className="container values__inner">
          <div className="values__intro">
            <ImageHeading src="/images/our-core-values.png" alt="Our Core Values" width={837} height={723} className="values__title" />
            <FadeIn as="p" className="values__tag" delay={0.2}>{about.valuesTagline}</FadeIn>
          </div>
          <span className="values__divider" aria-hidden="true" />
          <ul className="values__grid">
            {about.values.map((v, i) => (
              <FadeIn as="li" key={v.title} className="value" delay={0.1 + i * 0.1}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.icon} alt="" className="value__icon" loading="lazy" />
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="dark aprocess">
        <div className="pdfwrap">
          <HeadRow y0={1764} y1={1918}
            art={{ src: "/images/about/illustration-process.png", box: [28, 1769, 229, 1916] }}
            heading={{ src: "/images/our-process.png", alt: "Our Process", w: 1470, h: 213, box: [478.33, 1811, 968.33, 1882] }}
            rule={[228.5, 967, 1895.5]} />
          <FadeIn className="aprocess__diagram" y={0} delay={0.1}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/about/process-diagram.png" alt="" width={684} height={260} loading="lazy" />
          </FadeIn>
          <p className="sr-only">Vision and problem lead to a concept; the concept goes through repeated design and build cycles until it becomes the product.</p>
        </div>
      </section>

      {/* Team */}
      <section className="ateam">
        <div className="pdfwrap">
          <HeadRow light y0={2270} y1={2402}
            art={{ src: "/images/about/illustration-team.png", box: [650, 2275, 967, 2400] }}
            heading={{ src: "/images/our-team.png", alt: "Our Team", w: 1020, h: 188, box: [57, 2277.33, 397, 2340] }}
            rule={[58, 650.5, 2362.5]} ruleFrom="right" />
        </div>
        <TeamSlider team={team} />
      </section>

      <CtaSpotlight />
    </>
  );
}