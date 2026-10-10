import Link from "next/link";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { services, process } from "@/content/services";
import HeroHome from "@/components/HeroHome";
import Masonry from "@/components/Masonry";
import ServiceRows from "@/components/ServiceRows";
import ScrollWords from "@/components/ScrollWords";
import Process from "@/components/Process";
import FadeIn from "@/components/FadeIn";
import AboutBlock from "@/components/AboutBlock";

export default function Home() {
  return (
    <>
      <HeroHome />

      <section className="container section--work">
        <Masonry projects={projects.slice(0, 6)} />
        <FadeIn className="center"><Link href="/work" className="btn btn--outline">View All Work</Link></FadeIn>
      </section>

      <section className="section container intro">
        <FadeIn as="h2" className="sec-title">{site.intro.title}</FadeIn>
        <FadeIn as="p" className="lead" delay={0.1}>{site.intro.text}</FadeIn>
      </section>

      <section className="section container">
        <FadeIn as="h2" className="sec-title">What we do</FadeIn>
        <ServiceRows services={services} />
      </section>

      <section className="section container statement">
        <ScrollWords text={site.statement.title} className="statement__title" />
        <FadeIn as="p" className="lead">{site.statement.text}</FadeIn>
      </section>

      <section className="section container"><AboutBlock /></section>

      <section className="section container">
        <FadeIn as="h2" className="sec-title">How we work</FadeIn>
        <Process steps={process} />
      </section>

      <section className="section container cta">
        <FadeIn as="h2" className="sec-title">{site.cta.ask}</FadeIn>
        <FadeIn as="p" className="lead" delay={0.1}>{site.cta.line}</FadeIn>
        <FadeIn delay={0.2}><Link href="/contact" className="btn btn--orange">Start a Project</Link></FadeIn>
      </section>
    </>
  );
}
