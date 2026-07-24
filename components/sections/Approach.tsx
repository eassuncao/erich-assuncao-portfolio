import { approachSteps } from "../../data/portfolio";

export function Approach() {
  return (
    <section className="approach-section section-shell" id="approach">
      <div className="approach-copy">
        <p className="section-index">02 / How I work</p>
        <h2>From human context to an accountable system.</h2>
        <p>
          My strongest work connects technical depth with an understanding of
          how people communicate, decide, and navigate complex situations. I
          want the model, interface, test suite, and explanation to tell the
          same clear story.
        </p>
      </div>

      <div className="delivery-map">
        <div className="map-track" aria-hidden="true" />
        {approachSteps.map((step) => (
          <article key={step.number}>
            <span>{step.number}</span>
            <div className="approach-icon" aria-hidden="true">
              {step.icon}
            </div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
