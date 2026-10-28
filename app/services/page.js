import { services } from "@/content/services";
import { site } from "@/content/site";
import ServicesHero from "@/components/ServicesHero";
import ServiceList from "@/components/ServiceList";
import CtaSpotlight from "@/components/CtaSpotlight";

export const metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <>
      <ServicesHero text={site.servicesIntro} />
      <section className="dark svc-section">
        <div className="container">
          <ServiceList services={services} />
        </div>
      </section>
      <CtaSpotlight />
    </>
  );
}
