// Placeholder artwork until real project photos are added (see README).
export default function Cover({ project, variant = 0, src, className = "" }) {
  const { bg, fg, accent } = project.palette;
  const image = src ?? (variant === 0 ? project.cover : project.gallery?.[variant - 1]);
  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image} alt={`${project.title} project image`} className={`cover cover--img ${className}`} />;
  }
  const shapes = ["circle", "arch", "grid", "stripe", "blob", "diamond"];
  const shape = shapes[(shapes.indexOf(project.shape) + variant) % shapes.length];
  const alt = variant % 2 === 1;
  return (
    <div className={`cover cover--${shape} ${className}`} role="img" aria-label={`${project.title} artwork`}
      style={{ "--c-bg": alt ? accent : bg, "--c-fg": alt ? bg : fg, "--c-accent": alt ? fg : accent }}>
      <div className="cover__shape" />
      <span className="cover__mark">{project.title}</span>
    </div>
  );
}
