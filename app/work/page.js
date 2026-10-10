import { projects, categories } from "@/content/projects";
import { site } from "@/content/site";
import FadeIn from "@/components/FadeIn";
import Masonry from "@/components/Masonry";

export const metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <>
      <section className="page-hero container">
        <FadeIn as="h1" className="page-title">{site.work.title}</FadeIn>
        <FadeIn as="p" className="lead" delay={0.1}>{site.work.text}</FadeIn>
      </section>
      <section className="container section--work">
        <Masonry projects={projects} categories={categories} />
      </section>
    </>
  );
}
