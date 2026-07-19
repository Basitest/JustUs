"use client";

import { useId, useState } from "react";

import type { LetterParagraph } from "@/types/story";

type LetterSectionProps = {
  paragraphs: LetterParagraph[];
};

export function LetterSection({ paragraphs }: LetterSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const letterId = useId();

  return (
    <section className="story-band letter-section" aria-labelledby="letter-title">
      <div className="story-container letter-shell">
        <div>
          <p className="section-kicker">A Letter</p>
          <h2 id="letter-title" className="section-title">
            A Letter for Ash
          </h2>
        </div>

        <button
          type="button"
          className="story-button"
          aria-expanded={isOpen}
          aria-controls={letterId}
          onClick={() => setIsOpen((current) => !current)}
        >
          Read My Letter
        </button>

        <div id={letterId} className="letter-panel" hidden={!isOpen}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph.id}>{paragraph.text}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
