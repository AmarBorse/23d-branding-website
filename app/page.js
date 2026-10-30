import { site } from "@/content/site";
import { getShowcaseItems } from "@/lib/data";
import { services } from "@/content/services";
import HeroHome from "@/components/HeroHome";
import ImageHeading from "@/components/ImageHeading";
import FadeIn from "@/components/FadeIn";
import ServiceGallery from "@/components/ServiceGallery";
import WorkShowcase from "@/components/WorkShowcase";
import ClientGrid from "@/components/ClientGrid";
import CtaSpotlight from "@/components/CtaSpotlight";
import Rule from "@/components/Rule";
import DrawReveal from "@/components/DrawReveal";

export const revalidate = 300; // also refreshed right away when the admin saves

export default async function Home() {
  const showcase = await getShowcaseItems();
  return (
    <>
      <HeroHome />

      {/* ── Our approach (white) ── */}
      <section className="approach">
        <DrawReveal className="approach__art" src="/images/illustration-approach.png" width={442} height={251} />
        <div className="container approach__inner">
          <ImageHeading src="/images/our-approach.png" alt={site.approach.title} width={1993} height={321} className="approach__title" />
          <FadeIn className="approach__text" delay={0.15}>
            <p>{site.approach.text}</p>
            <p>{site.approach.text2}</p>
          </FadeIn>
          <Rule className="rule--right" origin="right" delay={0.3} />
        </div>
      </section>

      {/* ── What we do (black) ── */}
      <section className="dark wwd">
        <div className="container">
          <div className="wwd__head">
            <div>
              <ImageHeading src="/images/what-we-do.png" alt="What we do" width={1515} height={218} className="wwd__title" />
              <Rule className="rule--light" delay={0.2} />
            </div>
            <DrawReveal className="wwd__art" src="/images/illustration-puzzle.png" width={442} height={278} delay={0.2} />
          </div>
          <ServiceGallery services={services} />
        </div>
      </section>

      {/* ── Our Work (white) ── */}
      <section className="ourwork">
        <div className="container">
          <ImageHeading src="/images/our-work.png" alt="Our Work" width={1208} height={216} className="ourwork__title" />
          <WorkShowcase projects={showcase} />
        </div>
      </section>

      {/* ── Our clients (black + smoke) ── */}
      <section className="dark clients">
        <div className="clients__bg" aria-hidden="true" />
        <div className="container clients__inner">
          <ImageHeading src="/images/our-clients.png" alt="Our clients" width={1107} height={190} className="clients__title" />
          <FadeIn as="p" className="clients__tag" delay={0.2}>{site.clientsTagline}</FadeIn>
          <Rule className="rule--light clients__rule" origin="center" delay={0.3} />
          <ClientGrid clients={site.clients} />
        </div>
      </section>

      <CtaSpotlight />
    </>
  );
}
