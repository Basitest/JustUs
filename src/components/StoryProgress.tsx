"use client";

import { useRef, useState } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { StoryChapter } from "@/types/story";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type StoryProgressProps = {
  chapters: StoryChapter[];
};

export function StoryProgress({ chapters }: StoryProgressProps) {
  const root = useRef<HTMLElement>(null);
  const progressLine = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!reduceMotion && progressLine.current) {
        gsap.fromTo(
          progressLine.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      const sections = ["top", ...chapters.map((chapter) => chapter.id)];

      sections.forEach((sectionId, index) => {
        const section = document.getElementById(sectionId);
        if (!section) {
          return;
        }

        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });

      gsap.delayedCall(0.3, () => ScrollTrigger.refresh());
    },
    { scope: root, dependencies: [chapters] },
  );

  return (
    <nav className="story-progress" aria-label="Story chapters" ref={root}>
      <span className="story-progress-track" aria-hidden="true">
        <span ref={progressLine} />
      </span>
      <span className="story-progress-count" aria-live="polite">
        {String(activeIndex + 1).padStart(2, "0")}
        <span>/</span>
        {String(chapters.length + 1).padStart(2, "0")}
      </span>
      <a
        href="#top"
        aria-label="Opening scene"
        aria-current={activeIndex === 0 ? "location" : undefined}
      />
      {chapters.map((chapter, index) => (
        <a
          key={chapter.id}
          href={`#${chapter.id}`}
          aria-label={chapter.title}
          aria-current={activeIndex === index + 1 ? "location" : undefined}
        />
      ))}
    </nav>
  );
}
