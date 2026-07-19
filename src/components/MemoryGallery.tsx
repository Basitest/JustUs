import Image from "next/image";

import type { Memory } from "@/types/story";

type MemoryGalleryProps = {
  memories: Memory[];
};

export function MemoryGallery({ memories }: MemoryGalleryProps) {
  const memoriesWithImages = memories.filter((memory) => memory.imageSrc);

  return (
    <section className="story-band memory-section" aria-labelledby="memories-title">
      <div className="story-container memory-shell">
        <div>
          <p className="section-kicker">Five Months</p>
          <h2 id="memories-title" className="section-title">
            Five Months of Us
          </h2>
        </div>

        {memoriesWithImages.length > 0 ? (
          <div className="memory-grid">
            {memoriesWithImages.map((memory) => (
              <figure key={memory.id} className="memory-item">
                <Image
                  src={memory.imageSrc ?? ""}
                  alt={memory.description}
                  fill
                  sizes="(max-width: 767px) 100vw, 33vw"
                  className="memory-image"
                />
                <figcaption>
                  <strong>{memory.title}</strong>
                  <span>{memory.description}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <p className="editable-note">
            Memory photos can be added here later from the story data.
          </p>
        )}
      </div>
    </section>
  );
}
