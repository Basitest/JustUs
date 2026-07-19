import type { OpeningSceneContent } from "@/types/story";

import { SimpleParallaxSection } from "@/components/SimpleParallaxSection";

type OpeningSceneProps = {
  content: OpeningSceneContent;
};

export function OpeningScene({ content }: OpeningSceneProps) {
  return (
    <SimpleParallaxSection
      id="top"
      variant="opening"
      title={content.title}
      titleId="opening-title"
      chapterLabel={content.dedication}
      paragraphs={[{ id: "opening-subtitle", text: content.subtitle }]}
      featuredDate={content.dateRange}
      image={content.image}
      imagePriority
      button={{
        label: content.buttonLabel,
        targetId: "where-our-story-really-began",
      }}
    />
  );
}
