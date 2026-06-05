interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const containerClass = align === "center" ? "section-header" : "section-header items-start text-left";
  const headingClass = align === "center" ? "section-heading" : "section-heading text-left";
  const subtitleClass = align === "center" ? "section-subheading" : "section-subheading mx-0 text-left";

  return (
    <div className={containerClass}>
      <h2 className={headingClass}>
        {title}
      </h2>
      {subtitle && (
        <p className={subtitleClass}>{subtitle}</p>
      )}
    </div>
  );
}
