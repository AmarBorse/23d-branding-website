import Link from "next/link";
import { services } from "@/content/services";
import { site } from "@/content/site";
import FadeIn from "@/components/FadeIn";
import ServiceGallery from "@/components/ServiceGallery";
import ServicesAccordion from "@/components/ServicesAccordion";

export const metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <FadeIn as="h1" className="page-title">What we do</FadeIn>
          <FadeIn as="p" className="lead" delay={0.1}>{site.intro.text}</FadeIn>
        </div>
      </section>
      <section className="dark section section--top0">
        <div className="container"><ServiceGallery services={services} /></div>
      </section>
      <section className="container section"><ServicesAccordion services={services} /></section>
      <section className="section container cta">
        <FadeIn as="h2" className="sec-title">{site.cta.ask}</FadeIn>
        <FadeIn as="p" className="lead">{site.cta.line}</FadeIn>
        <FadeIn><Link href="/contact" className="btn btn--green">{site.cta.button}<span aria-hidden="true">➔</span></Link></FadeIn>
      </section>
    </>
  );
}
