const projects = [
  {
    number: "01",
    title: "User Connections & Discovery",
    eyebrow: "Production full-stack feature",
    description:
      "Built iQuirium’s social graph from the database up: a privacy-aware relationship model, complete invitation lifecycle, discovery experience, typed API integration, and multi-layer test suite.",
    result: "Delivered independently and running in production",
    tags: ["C# / .NET", "PostgreSQL", "Next.js / React", "CQRS", "220+ tests"],
    href: "/projects/user-connections-discovery.pdf",
    cover: "/project-covers/user-connections-discovery.png",
    featured: true,
  },
  {
    number: "02",
    title: "PostgreSQL Database Design",
    eyebrow: "Data architecture & SQL",
    description:
      "Designed a normalized relational system for a retail and café operation, then carried it through reporting queries, indexing, execution-plan analysis, access control, and transaction design.",
    result: "From ERD and 3NF to operational reporting",
    tags: ["PostgreSQL", "SQL", "ERD", "Indexing", "Transactions"],
    href: "/projects/postgresql-database-design.pdf",
    cover: "/project-covers/postgresql-database-design.png",
  },
  {
    number: "03",
    title: "Learning Analytics & Sentiment",
    eyebrow: "Python analytics pipeline",
    description:
      "Turned six weeks of Brightspace discussion exports into structured evidence about participation, timing, replies, length, and sentiment using a reusable extraction and analysis workflow.",
    result: "Earlier posts correlated with more replies (r = −0.35, p = .008)",
    tags: ["Python", "pandas", "VADER", "Tableau", "Statistics"],
    href: "/projects/learning-analytics-sentiment.pdf",
    cover: "/project-covers/learning-analytics-sentiment.png",
  },
  {
    number: "04",
    title: "Data Mining with Weka",
    eyebrow: "Applied machine learning",
    description:
      "Compared association rules, supervised classifiers, and clustering methods across retail and scientific datasets—pairing parameter choices with quantitative evaluation and practical interpretation.",
    result: "96% cross-validation accuracy across three Iris classifiers",
    tags: ["Weka", "Apriori", "Classification", "Clustering", "Evaluation"],
    href: "/projects/data-mining-weka.pdf",
    cover: "/project-covers/data-mining-weka.png",
  },
  {
    number: "05",
    title: "Interactive Dashboards with Python",
    eyebrow: "Learning technology",
    description:
      "Created a hands-on learning resource that moves from Python fundamentals to interactive dashboards and purposeful data storytelling through practical examples and guided activities.",
    result: "A complete learning path from syntax to visual narrative",
    tags: ["Python", "Plotly", "Streamlit", "pandas", "Altair"],
    href: "/projects/interactive-dashboards-python.pdf",
    cover: "/project-covers/interactive-dashboards-python.png",
  },
  {
    number: "06",
    title: "Beyond Pointsification",
    eyebrow: "MSc research & framework design",
    description:
      "Examined how gamified learning can support motivation beyond points and rewards, then proposed the Activation–Transition–Internalization–Durability framework.",
    result: "A practical lens for designing motivation that lasts",
    tags: ["Research", "Learning systems", "SDT", "ATID", "Synthesis"],
    href: "/projects/beyond-pointsification-atid.pdf",
    cover: "/project-covers/beyond-pointsification-atid.png",
  },
] as const;

const skillGroups = [
  {
    label: "Build",
    items: "C#, ASP.NET Core, TypeScript, JavaScript, React, Next.js, Python",
  },
  {
    label: "Connect",
    items:
      "REST APIs, Entity Framework Core, PostgreSQL, SQL, OpenAPI, TanStack Query",
  },
  {
    label: "Design",
    items:
      "Domain modelling, CQRS, relational data design, clean architecture, systems analysis",
  },
  {
    label: "Prove",
    items:
      "xUnit, WebApplicationFactory, Vitest, Testing Library, API and integration testing",
  },
] as const;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Erich Assuncao",
  jobTitle: "Software Developer and Information Systems Professional",
  email: "mailto:erichassuncao@gmail.com",
  knowsLanguage: ["English", "Portuguese"],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Athabasca University",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Trent University",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/in/erich-a-69a9b01bb",
    "https://github.com/eassuncao",
  ],
};

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Erich Assuncao, home">
          <span className="brand-mark" aria-hidden="true">
            EA
          </span>
          <span>
            <strong>Erich Assuncao</strong>
            <small>Systems / software / people</small>
          </span>
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#approach">Approach</a>
          <a href="#background">Background</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="header-status" href="#contact">
          <span aria-hidden="true" />
          Edmonton bound
        </a>
      </header>

      <main id="main">
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
              <strong>.NET, React, APIs, and PostgreSQL</strong>—from architecture
              through delivery. Canadian–Brazilian dual citizen, relocating to
              Edmonton.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                View selected work <span aria-hidden="true">↓</span>
              </a>
              <a
                className="button button-secondary"
                href="/erich-assuncao-resume.pdf"
                download
              >
                Download résumé <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p className="availability">
              <span aria-hidden="true">+</span>
              Open to software, systems, implementation, and quality roles
            </p>
          </div>

          <div className="hero-visual" aria-label="Portrait and featured work">
            <div className="signal-orbit orbit-one" aria-hidden="true" />
            <div className="signal-orbit orbit-two" aria-hidden="true" />
            <span className="signal-node node-one" aria-hidden="true" />
            <span className="signal-node node-two" aria-hidden="true" />
            <p className="coordinate-label" aria-hidden="true">
              53.5461° N / 113.4937° W
            </p>

            <div className="portrait-frame">
              <img
                src="/images/erich-assuncao.png"
                width="1254"
                height="1254"
                alt="Portrait of Erich Assuncao"
                fetchPriority="high"
              />
            </div>

            <a
              className="featured-float"
              href="/projects/user-connections-discovery.pdf"
              target="_blank"
              rel="noreferrer"
              aria-label="Read the User Connections and Discovery case study PDF"
            >
              <span className="featured-label">Featured production work</span>
              <span className="featured-index">Case study 01</span>
              <strong>User Connections &amp; Discovery</strong>
              <small>
                A tested, full-stack social discovery capability designed around
                useful human connections.
              </small>
              <span className="tag-line">
                C# / .NET · PostgreSQL · Next.js / React
              </span>
              <span className="featured-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </section>

        <section className="evidence-band" aria-label="Key qualifications">
          <div>
            <small>Quality signal</small>
            <strong>220+ automated tests</strong>
            <span>Confidence across every layer</span>
          </div>
          <div>
            <small>Delivery scope</small>
            <strong>End-to-end ownership</strong>
            <span>Data model to production release</span>
          </div>
          <div>
            <small>Academic foundation</small>
            <strong>MSc Computing &amp; IS</strong>
            <span>3.97 / 4.00 graduate GPA</span>
          </div>
          <div>
            <small>Communication</small>
            <strong>English + Portuguese</strong>
            <span>Fluent, cross-cultural practice</span>
          </div>
        </section>

        <section className="work-section section-shell" id="work">
          <div className="section-heading">
            <div>
              <p className="section-index">01 / Selected work</p>
              <h2>Evidence, not just a tool list.</h2>
            </div>
            <p>
              Six case studies showing how I frame a problem, make technical
              decisions, and translate the result into something useful.
            </p>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article
                className={`project-card${project.featured ? " project-featured" : ""}`}
                key={project.number}
              >
                <a
                  className="project-cover"
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${project.title} case study PDF`}
                >
                  <img
                    src={project.cover}
                    alt={`Cover of the ${project.title} case study`}
                    width="990"
                    height="1400"
                    loading="lazy"
                    decoding="async"
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
                    Read case study <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="approach-section section-shell" id="approach">
          <div className="approach-copy">
            <p className="section-index">02 / How I work</p>
            <h2>From ambiguity to an accountable system.</h2>
            <p>
              My strongest work connects technical depth with operational clarity.
              I want the model, interface, test suite, and explanation to tell the
              same story.
            </p>
          </div>

          <div className="delivery-map" aria-label="Delivery approach">
            <div className="map-track" aria-hidden="true" />
            <article>
              <span>01</span>
              <div className="approach-icon">M</div>
              <h3>Model the system</h3>
              <p>
                Clarify the actors, states, data, constraints, and success criteria
                before code spreads assumptions.
              </p>
            </article>
            <article>
              <span>02</span>
              <div className="approach-icon">B</div>
              <h3>Build across boundaries</h3>
              <p>
                Connect database, domain, API, interface, and documentation as one
                coherent delivery.
              </p>
            </article>
            <article>
              <span>03</span>
              <div className="approach-icon">P</div>
              <h3>Prove the behaviour</h3>
              <p>
                Test the rules and journeys that matter, then leave the work easier
                for the next person to understand.
              </p>
            </article>
          </div>
        </section>

        <section className="profile-section section-shell" id="background">
          <div className="profile-heading">
            <p className="section-index">03 / Profile</p>
            <h2>Technology, thoughtfully delivered.</h2>
          </div>

          <div className="profile-grid">
            <div className="profile-story">
              <p className="profile-lead">
                I am an early-career software and information-systems professional
                with production full-stack experience and a broader background in
                psychology, research, interpretation, client work, and operations.
              </p>
              <p>
                That combination makes me especially effective where code meets
                people and process: application and systems analysis, software
                development, implementation, integration, QA automation, and
                technically substantive product support.
              </p>
              <p>
                I value clear standards, useful outcomes, privacy-conscious design,
                dependable follow-through, and communication that helps different
                stakeholders understand the same system.
              </p>

              <div className="seeking-card">
                <span className="seeking-status" aria-hidden="true" />
                <div>
                  <small>Currently seeking</small>
                  <strong>
                    Sustainable technology work with ownership and room to grow
                  </strong>
                  <p>
                    Alberta first · Ontario second · Canada-wide remote
                  </p>
                </div>
              </div>
            </div>

            <div className="skills-panel">
              <p className="panel-label">Working toolkit</p>
              {skillGroups.map((group) => (
                <div className="skill-row" key={group.label}>
                  <strong>{group.label}</strong>
                  <span>{group.items}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="timeline-grid">
            <div className="timeline-column">
              <p className="panel-label">Selected experience</p>
              <article className="timeline-item">
                <span>2024—2026</span>
                <div>
                  <h3>Software Engineer · iQuirium</h3>
                  <p>
                    Part-time, remote. Built production features across C#, ASP.NET
                    Core, REST APIs, PostgreSQL, TypeScript, Next.js, and React.
                  </p>
                </div>
              </article>
              <article className="timeline-item">
                <span>2014—Now</span>
                <div>
                  <h3>Interpreter &amp; independent client work</h3>
                  <p>
                    Professional English–Portuguese interpretation and structured,
                    confidential client support across complex contexts.
                  </p>
                </div>
              </article>
            </div>

            <div className="timeline-column">
              <p className="panel-label">Education</p>
              <article className="timeline-item">
                <span>2024—2026</span>
                <div>
                  <h3>MSc Computing &amp; Information Systems</h3>
                  <p>
                    Athabasca University · All requirements completed · 3.97 / 4.00
                    GPA.
                  </p>
                </div>
              </article>
              <article className="timeline-item">
                <span>2019—2023</span>
                <div>
                  <h3>BA Psychology &amp; Information Systems</h3>
                  <p>
                    Trent University · A average · President’s and Dean’s Honour
                    Rolls.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="contact-section section-shell" id="contact">
          <div className="contact-glow" aria-hidden="true" />
          <p className="section-index">04 / Start a conversation</p>
          <h2>
            Looking for someone who can connect
            <br />
            systems, software, and people?
          </h2>
          <p>
            I’m ready to contribute careful analysis, hands-on delivery, and clear
            communication to a Canadian technology team.
          </p>
          <div className="contact-actions">
            <a
              className="button button-primary"
              href="mailto:erichassuncao@gmail.com"
            >
              Email Erich <span aria-hidden="true">↗</span>
            </a>
            <a
              className="button button-secondary"
              href="https://www.linkedin.com/in/erich-a-69a9b01bb"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <a
              className="button button-secondary"
              href="https://github.com/eassuncao"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
          <a className="email-line" href="mailto:erichassuncao@gmail.com">
            erichassuncao@gmail.com
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <span className="brand-mark" aria-hidden="true">
            EA
          </span>
          <p>
            Practical technology.
            <br />
            Thoughtfully delivered.
          </p>
        </div>
        <p>Edmonton, Alberta · 2026</p>
        <a href="#top">Back to top ↑</a>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}
