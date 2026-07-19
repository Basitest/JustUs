import type { EndingSceneContent } from "@/types/story";

import { SimpleParallaxSection } from "@/components/SimpleParallaxSection";

type EndingSceneProps = {
  content: EndingSceneContent;
};

export function EndingScene({ content }: EndingSceneProps) {
  return (
    <SimpleParallaxSection
      variant="ending"
      title={content.title}
      titleId="ending-title"
      paragraphs={[{ id: "ending-subtitle", text: content.subtitle }]}
      image={content.image}
      button={{ label: content.buttonLabel, targetId: "top" }}
    />
  );
}
