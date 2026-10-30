import { about, team } from "@/content/about";
import AboutHero from "@/components/AboutHero";
import ImageHeading from "@/components/ImageHeading";
import FadeIn from "@/components/FadeIn";
import Rule from "@/components/Rule";
import DrawReveal from "@/components/DrawReveal";
import TeamSlider from "@/components/TeamSlider";
import CtaSpotlight from "@/components/CtaSpotlight";

export const metadata = { title: "About" };

export default function About() {
  return (
    <>
      <AboutHero />

      {/* Who we are */}
      <section className="who">
        <DrawReveal className="who__art" src="/images/about/illustration-team-talk.png" width={594} height={182} />
        <div className="container who__inner">
          <ImageHeading src="/images/who-we-are.png" alt="Who we are" width={1517} height={216} className="who__title" />
          <FadeIn className="who__text" delay={0.15}>
            {about.who.map((p, i) => (
              <p key={i}>{p.text ?? <>{p.before}<strong className="accent">{p.highlight}</strong>{p.after}</>}</p>
            ))}
          </FadeIn>
        </div>
        <div className="container"><Rule className="who__rule" /></div>
      </section>

      {/* Vision + Mission */}
      <section className="dark vm">
        <div className="container">
          <div className="vm__block">
            <div className="vm__head">
              <ImageHeading src="/images/our-vision.png" alt="Our Vision" width={1104} height={194} className="vm__title vm__title--vision" />
              <DrawReveal className="vm__art vm__art--vision" src="/images/about/illustration-vision.png" width={332} height={187} delay={0.2} />
            </div>
            <Rule className="rule--light vm__rule" />
            <FadeIn as="p" className="vm__text" delay={0.2}>{about.vision}</FadeIn>
          </div>

          <div className="vm__block vm__block--right">
            <div className="vm__head">
              <DrawReveal className="vm__art vm__art--mission" src="/images/about/illustration-mission.png" width={478} height={290} delay={0.2} />
              <ImageHeading src="/images/our-mission.png" alt="Our Mission" width={1243} height={193} className="vm__title vm__title--mission" />
            </div>
            <Rule className="rule--light vm__rule vm__rule--full" origin="right" />
            <FadeIn as="p" className="vm__text" delay={0.2}>{about.mission}</FadeIn>
          </div>
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
        <div className="container">
          <div className="aprocess__head">
            <DrawReveal className="aprocess__art" src="/images/about/illustration-process.png" width={478} height={271} />
            <div className="aprocess__titlebox">
              <ImageHeading src="/images/our-process.png" alt="Our Process" width={1469} height={213} className="aprocess__title" />
            </div>
          </div>
          <Rule className="rule--light aprocess__rule" origin="right" />
          <DrawReveal className="aprocess__diagram" src="/images/about/process-diagram.png" width={684} height={260} delay={0.2} />
          <p className="sr-only">Vision and problem lead to a concept; the concept goes through repeated design and build cycles until it becomes the product.</p>
        </div>
      </section>

      {/* Team */}
      <section className="ateam">
        <div className="container">
          <div className="ateam__head">
            <div className="ateam__titlebox">
              <ImageHeading src="/images/our-team.png" alt="Our Team" width={1020} height={188} className="ateam__title" />
            </div>
            <DrawReveal className="ateam__art" src="/images/about/illustration-team-talk.png" width={594} height={182} delay={0.2} />
          </div>
          <Rule className="ateam__rule" />
        </div>
        <TeamSlider team={team} />
      </section>

      <CtaSpotlight />
    </>
  );
}