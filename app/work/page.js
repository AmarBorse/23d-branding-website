import { workIntro } from "@/content/work";
import { getWorkCategories } from "@/lib/data";
import WorkHero from "@/components/WorkHero";
import WorkTabs from "@/components/WorkTabs";
import CtaSpotlight from "@/components/CtaSpotlight";

export const metadata = { title: "Work" };

export const revalidate = 300;

export default async function WorkPage() {
  const categories = await getWorkCategories();
  return (
    <>
      <WorkHero text={workIntro} />
      <section className="dark wsection">
        <div className="pdfwrap">
          <WorkTabs categories={categories} />
        </div>
      </section>
      <CtaSpotlight />
    </>
  );
}
