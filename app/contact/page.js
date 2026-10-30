import { site } from "@/content/site";
import FadeIn from "@/components/FadeIn";
import ContactForm from "@/components/ContactForm";
import SocialIcon from "@/components/SocialIcon";

export const metadata = { title: "Contact" };

export default function Contact() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <FadeIn as="h1" className="page-title">{site.contact.title}</FadeIn>
          <FadeIn as="p" className="lead" delay={0.1}>{site.contact.text}</FadeIn>
        </div>
      </section>
      <section className="section container contact">
        <FadeIn delay={0.1} className="contact__direct">
          <a className="contact__email" href={`mailto:${site.email}`}>{site.email}</a>
          <span>{site.location}</span>
          <span className="contact__socials">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label={`23D Branding on ${s.label}`} title={s.label}>
                <SocialIcon name={s.icon} />
              </a>
            ))}
          </span>
        </FadeIn>
        <FadeIn delay={0.2} className="contact__form"><ContactForm /></FadeIn>
      </section>
    </>
  );
}
