import { SimpleParallaxSection } from "@/components/SimpleParallaxSection";
import type { StoryChapter } from "@/types/story";

type StorySectionProps = {
  chapter: StoryChapter;
  index: number;
};

export function StorySection({ chapter, index }: StorySectionProps) {
  const reversed = index % 2 === 1;

  return (
    <SimpleParallaxSection
      id={chapter.id}
      variant="story"
      title={chapter.title}
      chapterLabel={chapter.label}
      paragraphs={chapter.paragraphs}
      image={chapter.image}
      chatMessages={chapter.chatMessages}
      featuredDate={chapter.featuredDate}
      layout={chapter.layout}
      reversed={reversed}
    />
  );
}
