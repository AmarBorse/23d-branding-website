import { workCategories, workIntro } from "@/content/work";
import WorkHero from "@/components/WorkHero";
import WorkTabs from "@/components/WorkTabs";
import CtaSpotlight from "@/components/CtaSpotlight";

export const metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <>
      <WorkHero text={workIntro} />
      <section className="dark wsection">
        <div className="pdfwrap">
          <WorkTabs categories={workCategories} />
        </div>
      </section>
      <CtaSpotlight />
    </>
  );
}