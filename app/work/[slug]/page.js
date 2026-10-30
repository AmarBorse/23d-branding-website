import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/data";
import FadeIn from "@/components/FadeIn";
import CaseImage from "@/components/CaseImage";
import CtaSpotlight from "@/components/CtaSpotlight";

export async function generateStaticParams() {
  return (await getAllProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = await getProjectBySlug(params.slug);
  return p ? { title: p.title, description: p.description, openGraph: { images: [p.hero] } } : {};
}

// Project page: title, main image, short description, then all the brand boards.
export default async function ProjectPage({ params }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <>
      <article className="case2">
        <div className="case2__wrap">
          <FadeIn as="h1" className="case2__title">{project.name || project.title}</FadeIn>
          <CaseImage src={project.hero || project.cover} alt={`${project.title} by 23D Branding`} eager />
          {project.description && <FadeIn as="p" className="case2__text" delay={0.1}>{project.description}</FadeIn>}
          {(project.gallery || []).map((src, i) => (
            <CaseImage key={src} src={src} alt={`${project.title}, image ${i + 1}`} />
          ))}
        </div>
      </article>
      <CtaSpotlight />
    </>
  );
}
