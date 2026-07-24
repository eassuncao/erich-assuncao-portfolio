import { contactDetails, profileLinks } from "../../data/portfolio";

export function Contact() {
  return (
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
        <a className="button button-primary" href={contactDetails.emailHref}>
          Email Erich <span aria-hidden="true">↗</span>
        </a>
        {profileLinks.map((link) => (
          <a
            className="button button-secondary"
            href={link.href}
            target="_blank"
            rel="noreferrer"
            key={link.label}
          >
            {link.label} <span aria-hidden="true">↗</span>
            <span className="sr-only"> Opens in a new tab.</span>
          </a>
        ))}
      </div>
      <a className="email-line" href={contactDetails.emailHref}>
        {contactDetails.email}
      </a>
    </section>
  );
}
