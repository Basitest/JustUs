import { EndingScene } from "@/components/EndingScene";
import { LetterSection } from "@/components/LetterSection";
import { OpeningScene } from "@/components/OpeningScene";
import { StoryProgress } from "@/components/StoryProgress";
import { StorySection } from "@/components/StorySection";
import { TextOnlyStorySection } from "@/components/TextOnlyStorySection";
import type { Story } from "@/types/story";

type StoryPageProps = {
  story: Story;
};

export function StoryPage({ story }: StoryPageProps) {
  return (
    <>
      <StoryProgress chapters={story.chapters} />
      <OpeningScene content={story.opening} />
      <main>
        {story.chapters.map((chapter, index) =>
          chapter.image ? (
            <StorySection key={chapter.id} chapter={chapter} index={index} />
          ) : (
            <TextOnlyStorySection key={chapter.id} chapter={chapter} />
          ),
        )}
        <LetterSection paragraphs={story.letter} />
      </main>
      <EndingScene content={story.ending} />
    </>
  );
}
