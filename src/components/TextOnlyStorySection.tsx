import { SimpleParallaxSection } from "@/components/SimpleParallaxSection";
import type { StoryChapter } from "@/types/story";

type TextOnlyStorySectionProps = {
  chapter: StoryChapter;
};

export function TextOnlyStorySection({ chapter }: TextOnlyStorySectionProps) {
  return (
    <SimpleParallaxSection
      id={chapter.id}
      variant="night"
      title={chapter.title}
      chapterLabel={chapter.label}
      paragraphs={chapter.paragraphs}
      chatMessages={chapter.chatMessages}
      layout={chapter.layout}
    />
  );
}
