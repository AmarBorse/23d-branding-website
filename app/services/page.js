import Link from "next/link";
import { services } from "@/content/services";
import { site } from "@/content/site";
import FadeIn from "@/components/FadeIn";
import ServicesAccordion from "@/components/ServicesAccordion";

export const metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero container">
        <FadeIn as="h1" className="page-title">What we do</FadeIn>
        <FadeIn as="p" className="lead" delay={0.1}>{site.intro.text}</FadeIn>
      </section>
      <section className="container section--top0 section"><ServicesAccordion services={services} /></section>
      <section className="section container cta">
        <FadeIn as="h2" className="sec-title">{site.cta.ask}</FadeIn>
        <FadeIn as="p" className="lead">{site.cta.line}</FadeIn>
        <FadeIn><Link href="/contact" className="btn btn--orange">Start a Project</Link></FadeIn>
      </section>
    </>
  );
}
