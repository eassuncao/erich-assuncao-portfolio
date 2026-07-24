import Image from "next/image";
import type { Project } from "../data/portfolio";

type ProjectCardProps = {
  readonly project: Project;
  readonly isDesktopRightColumn: boolean;
};

export function ProjectCard({
  project,
  isDesktopRightColumn,
}: ProjectCardProps) {
  return (
    <article
      className={[
        "project-card",
        project.featured ? "project-featured" : "",
        isDesktopRightColumn ? "project-card-desktop-right" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <a
        className="project-cover"
        href={project.href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.title} case study PDF (opens in a new tab)`}
      >
        <Image
          src={project.cover}
          alt={`Cover of the ${project.title} case study`}
          width={1082}
          height={1400}
          quality={75}
          sizes={
            project.featured
              ? "(max-width: 680px) calc(100vw - 2rem), (max-width: 1180px) calc(100vw - 9rem), min(32vw, 460px)"
              : "(max-width: 680px) calc(100vw - 2rem), (max-width: 900px) calc(100vw - 7.4rem), (max-width: 1180px) calc(50vw - 6rem), 224px"
          }
        />
        <span className="project-number">{project.number}</span>
        <span className="cover-action" aria-hidden="true">
          Open PDF ↗
        </span>
      </a>
      <div className="project-content">
        <p className="project-eyebrow">{project.eyebrow}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <p className="project-result">
          <span aria-hidden="true">+</span>
          {project.result}
        </p>
        <ul className="tag-list" aria-label="Technologies and methods">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <a
          className="text-link"
          href={project.href}
          target="_blank"
          rel="noreferrer"
        >
          Read case study (PDF)
          <span aria-hidden="true">↗</span>
          <span className="sr-only"> Opens in a new tab.</span>
        </a>
      </div>
    </article>
  );
}
