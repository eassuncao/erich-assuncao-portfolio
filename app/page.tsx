import { Approach } from "../components/sections/Approach";
import { Contact } from "../components/sections/Contact";
import { Hero } from "../components/sections/Hero";
import { Profile } from "../components/sections/Profile";
import { Work } from "../components/sections/Work";
import {
  contactDetails,
  navigationItems,
  personSchema,
} from "../data/portfolio";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <header className="site-header">
        <a
          className="brand"
          href="#top"
          aria-label={`${contactDetails.name}, home`}
        >
          <span className="brand-mark" aria-hidden="true">
            {contactDetails.initials}
          </span>
          <span>
            <strong>{contactDetails.name}</strong>
            <small>{contactDetails.brandSubtitle}</small>
          </span>
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          {navigationItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="header-status" href="#contact">
          <span aria-hidden="true" />
          Let&apos;s connect
        </a>
      </header>

      <main id="main">
        <Hero />
        <Work />
        <Approach />
        <Profile />
        <Contact />
      </main>

      <footer className="site-footer">
        <div>
          <span className="brand-mark" aria-hidden="true">
            {contactDetails.initials}
          </span>
          <p>
            Practical technology.
            <br />
            Thoughtfully delivered.
          </p>
        </div>
        <p>{contactDetails.location} · 2026</p>
        <a href="#top">Back to top ↑</a>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}
