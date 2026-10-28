import { process } from "@/content/services";
import { site } from "@/content/site";
import AboutBlock from "@/components/AboutBlock";
import FadeIn from "@/components/FadeIn";
import Process from "@/components/Process";

export const metadata = { title: "About" };

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container"><AboutBlock as="h1" /></div>
      </section>
      <section className="section container approach-lite">
        <FadeIn as="h2" className="sec-title">{site.approach.title}</FadeIn>
        <FadeIn className="approach-lite__text" delay={0.1}>
          <p>{site.approach.text}</p>
          <p>{site.approach.text2}</p>
        </FadeIn>
      </section>
      <section className="section container section--top0">
        <FadeIn as="h2" className="sec-title">How we work</FadeIn>
        <Process steps={process} />
      </section>
    </>
  );
}
