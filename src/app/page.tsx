import { StoryPage } from "@/components/StoryPage";
import { getStory } from "@/lib/story";

export default function Home() {
  return <StoryPage story={getStory()} />;
}
