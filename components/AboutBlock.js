import { site } from "@/content/site";
import FadeIn from "./FadeIn";

export default function AboutBlock({ as = "h2" }) {
  const { title, text, text2 } = site.about;
  const H = as;
  return (
    <div className="about">
      <FadeIn><H className={as === "h1" ? "page-title" : "sec-title"}>{title}</H></FadeIn>
      <div className="about__text">
        <FadeIn as="p" className="about__big" delay={0.1}>{text}</FadeIn>
        <FadeIn as="p" delay={0.2}>{text2.before}<strong>{text2.strong}</strong>{text2.after}</FadeIn>
      </div>
    </div>
  );
}
