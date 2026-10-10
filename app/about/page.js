import { process } from "@/content/services";
import AboutBlock from "@/components/AboutBlock";
import FadeIn from "@/components/FadeIn";
import Process from "@/components/Process";

export const metadata = { title: "About" };

export default function About() {
  return (
    <>
      <section className="page-hero container"><AboutBlock as="h1" /></section>
      <section className="section container section--top0">
        <FadeIn as="h2" className="sec-title">How we work</FadeIn>
        <Process steps={process} />
      </section>
    </>
  );
}
