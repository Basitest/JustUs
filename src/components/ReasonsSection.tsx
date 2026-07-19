import type { Reason } from "@/types/story";

type ReasonsSectionProps = {
  reasons: Reason[];
};

export function ReasonsSection({ reasons }: ReasonsSectionProps) {
  return (
    <section className="story-band reasons-section" aria-labelledby="reasons-title">
      <div className="story-container">
        <p className="section-kicker">Five Things</p>
        <h2 id="reasons-title" className="section-title">
          Five Things I Love About You
        </h2>

        <ol className="reasons-list">
          {reasons.map((reason, index) => (
            <li key={reason.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
