export type ImagePosition = {
  objectPosition: string;
};

export type ScenePresentation = {
  mode: "fullBleed" | "editorial";
  orientation: "portrait" | "landscape" | "square" | "fullBleed";
  fit: "cover" | "contain";
  aspectRatio: string;
  background: string;
  desktopLayout: "twoColumn" | "background";
  mobileLayout: "stacked" | "background";
  desktopImageWidth: string;
  mobileImageWidth: string;
  imageAlignment: "start" | "center" | "end";
  textAlignment?: "start" | "center" | "end";
  headingMaxWidth?: string;
};

export type ParallaxSettings = {
  enabled: boolean;
  intensity: number;
  scale: number;
  mobileIntensity: number;
  mobileScale: number;
  sticky: boolean;
};

export type SceneImage = {
  src: string;
  alt: string;
  desktopPosition: ImagePosition;
  tabletPosition?: ImagePosition;
  mobilePosition: ImagePosition;
  presentation: ScenePresentation;
  overlay: string;
  textTone: "light" | "dark";
  parallax: ParallaxSettings;
};

export type StoryParagraph = {
  id: string;
  text: string;
};

export type ChatMessage = {
  id: string;
  sender: "Aru" | "Ash";
  text: string;
};

export type StoryLayoutVariant =
  | "imageLeft"
  | "imageRight"
  | "imageBackground"
  | "portraitEditorial"
  | "textFocused";

export type StoryChapterLayout = {
  variant: StoryLayoutVariant;
  imageWidth?: string;
  contentWidth?: string;
  imageAlignment?: "start" | "center" | "end";
  headingMaxWidth?: string;
  sectionMinHeight?: string;
};

export type StoryChapter = {
  id: string;
  label: string;
  title: string;
  paragraphs: StoryParagraph[];
  image?: SceneImage;
  chatMessages?: ChatMessage[];
  featuredDate?: string;
  layout?: StoryChapterLayout;
};

export type Memory = {
  id: string;
  title: string;
  description: string;
  imageSrc?: string;
};

export type Reason = {
  id: string;
  title: string;
  text: string;
};

export type LetterParagraph = {
  id: string;
  text: string;
};

export type StoryMetadata = {
  names: {
    him: "Aru";
    her: "Ash";
  };
  relationshipDate: string;
  anniversaryDate: string;
  anniversaryLabel: string;
};

export type OpeningSceneContent = {
  dedication: string;
  title: string;
  subtitle: string;
  dateRange: string;
  buttonLabel: string;
  image: SceneImage;
};

export type EndingSceneContent = {
  title: string;
  subtitle: string;
  buttonLabel: string;
  image: SceneImage;
};

export type Story = {
  metadata: StoryMetadata;
  opening: OpeningSceneContent;
  chapters: StoryChapter[];
  reasons: Reason[];
  letter: LetterParagraph[];
  memories: Memory[];
  ending: EndingSceneContent;
};
