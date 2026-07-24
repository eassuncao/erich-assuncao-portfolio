import {
  contactDetails,
  educationItems,
  experienceItems,
  skillGroups,
} from "../../data/portfolio";

export function Profile() {
  return (
    <section className="profile-section section-shell" id="background">
      <div className="profile-heading">
        <p className="section-index">02 / Profile</p>
        <h2>Technology fluency. Human understanding.</h2>
      </div>

      <div className="profile-grid">
        <div className="profile-story">
          <p className="profile-lead">
            Three perspectives shape how I work: hands-on technology experience,
            the study and practice of psychology and counselling, and more than
            a decade of professional interpretation across complex human
            settings.
          </p>
          <p>
            Interpretation has shown me how healthcare, legal, community and
            social services, and education systems meet people at consequential
            moments. Psychology and counselling trained me to listen closely,
            recognize context, and explain complex information with care.
          </p>
          <p>
            Technology gives me the tools to turn that perspective into
            dependable software, thoughtful systems, clear analysis, and
            practical support. That combination is especially valuable wherever
            software, systems, and people intersect.
          </p>

          <div className="seeking-card">
            <span className="seeking-status" aria-hidden="true" />
            <div>
              <small>Currently seeking</small>
              <strong>
                Sustainable technology work with ownership and room to grow
              </strong>
              <p>{contactDetails.location} · On-site, hybrid, or remote</p>
            </div>
          </div>
        </div>

        <div className="skills-panel">
          <p className="panel-label">Working toolkit</p>
          {skillGroups.map((group) => (
            <div className="skill-row" key={group.label}>
              <strong>{group.label}</strong>
              <span>{group.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="timeline-grid">
        <div className="timeline-column">
          <p className="panel-label">Selected experience</p>
          {experienceItems.map((item) => (
            <article className="timeline-item" key={item.title}>
              <span>{item.period}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="timeline-column">
          <p className="panel-label">Education</p>
          {educationItems.map((item) => (
            <article className="timeline-item" key={item.title}>
              <span>{item.period}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
