import Image from "next/image";
import {
  contactDetails,
  evidenceItems,
  featuredProject,
} from "../../data/portfolio";

export function Hero() {
  const featuredTags = featuredProject.tags.slice(0, 3).join(" · ");

  return (
    <>
      <section className="hero section-shell" id="top">
        <div className="hero-copy">
          <p className="kicker">
            <span aria-hidden="true" />
            Software developer &amp; information systems professional
          </p>
          <h1>
            Practical technology.
            <br />
            Reliable <em>systems.</em>
            <br />
            Human-centred
            <br />
            outcomes.
          </h1>
          <p className="hero-intro">
            I build and improve production software across{" "}
            <strong>.NET, React, APIs, and PostgreSQL</strong>—bringing together
            technical experience, psychology and counselling, and more than a
            decade of professional interpretation.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              View selected work <span aria-hidden="true">↓</span>
            </a>
            <a
              className="button button-secondary"
              href={contactDetails.resumeHref}
              download
            >
              Download résumé (PDF) <span aria-hidden="true">↓</span>
            </a>
          </div>
          <p className="availability">
            <span aria-hidden="true">+</span>
            {contactDetails.location} · Open to on-site, hybrid, or remote
            opportunities
          </p>
        </div>

        <div className="hero-visual">
          <div className="signal-arc" aria-hidden="true" />

          <div className="portrait-frame">
            <Image
              src="/images/erich-assuncao-portrait.webp"
              width={978}
              height={1254}
              alt={`Portrait of ${contactDetails.name}`}
              priority
              quality={82}
              sizes="(max-width: 430px) 75vw, (max-width: 680px) 72vw, 432px"
            />
          </div>

          <a
            className="featured-float"
            href={featuredProject.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Read the ${featuredProject.title} case study PDF (opens in a new tab)`}
          >
            <span className="featured-label">Featured production work</span>
            <span className="featured-index">
              Case study {featuredProject.number} · PDF
            </span>
            <strong>{featuredProject.title}</strong>
            <small>{featuredProject.featuredSummary}</small>
            <span className="tag-line">{featuredTags}</span>
            <span className="featured-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </section>

      <section className="evidence-band" aria-label="Key qualifications">
        {evidenceItems.map((item) => (
          <div key={item.label}>
            <small>{item.label}</small>
            <strong>{item.value}</strong>
            <span>{item.detail}</span>
          </div>
        ))}
      </section>
    </>
  );
}
