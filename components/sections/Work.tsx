import { projects } from "../../data/portfolio";
import { ProjectCard } from "../ProjectCard";

export function Work() {
  return (
    <section className="work-section section-shell" id="work">
      <div className="section-heading">
        <div>
          <p className="section-index">01 / Selected work</p>
          <h2>Evidence, not just a tool list.</h2>
        </div>
        <p>
          {projects.length} case studies showing how I frame a problem, make
          technical decisions, and translate the result into something useful.
        </p>
      </div>

      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            // Card 01 spans both desktop columns, so indexes 2, 4, and 6
            // are the cards that land in the right column.
            isDesktopRightColumn={index > 0 && index % 2 === 0}
          />
        ))}
      </div>
    </section>
  );
}
