import { projects, categories } from "@/content/projects";
import { site } from "@/content/site";
import FadeIn from "@/components/FadeIn";
import Masonry from "@/components/Masonry";

export const metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <FadeIn as="h1" className="page-title">{site.work.title}</FadeIn>
          <FadeIn as="p" className="lead" delay={0.1}>{site.work.text}</FadeIn>
        </div>
      </section>
      <section className="container section section--work">
        <Masonry projects={projects} categories={categories.length > 2 ? categories : null} />
      </section>
    </>
  );
}
