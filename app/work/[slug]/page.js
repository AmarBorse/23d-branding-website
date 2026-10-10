import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/content/projects";
import FadeIn from "@/components/FadeIn";
import CaseCover from "@/components/CaseCover";

export function generateStaticParams() { return projects.map((p) => ({ slug: p.slug })); }
export function generateMetadata({ params }) {
  const p = getProject(params.slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default function CaseStudy({ params }) {
  const project = getProject(params.slug);
  if (!project) notFound();
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article>
      <section className="page-hero container">
        <FadeIn as="p" className="crumb"><Link href="/work">Work</Link> / {project.category}</FadeIn>
        <FadeIn as="h1" className="page-title" delay={0.05}>{project.title}</FadeIn>
        <FadeIn as="p" className="lead" delay={0.1}>{project.summary}</FadeIn>
      </section>

      <section className="container"><CaseCover project={project} className="case-cover--hero" /></section>

      <section className="container facts-wrap">
        <dl className="facts">
          <div><dt>Client</dt><dd>{project.client}</dd></div>
          <div><dt>Year</dt><dd>{project.year}</dd></div>
          <div><dt>Services</dt><dd>{project.services.join(", ")}</dd></div>
        </dl>
      </section>

      <section className="container gallery">
        <CaseCover project={project} variant={1} />
        <CaseCover project={project} variant={2} />
        <CaseCover project={project} variant={3} className="gallery__wide" />
      </section>

      <section className="container next">
        <p>Next project</p>
        <Link href={`/work/${next.slug}`} className="next__link">{next.title}</Link>
      </section>
    </article>
  );
}
