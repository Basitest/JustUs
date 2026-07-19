import type { SceneImage, Story } from "@/types/story";

type SceneImageConfig = {
  src: string;
  alt: string;
  desktopPosition: string;
  tabletPosition?: string;
  mobilePosition: string;
  overlay: string;
  textTone: SceneImage["textTone"];
  mode: SceneImage["presentation"]["mode"];
  orientation: SceneImage["presentation"]["orientation"];
  fit: SceneImage["presentation"]["fit"];
  aspectRatio?: string;
  background?: string;
  desktopLayout?: SceneImage["presentation"]["desktopLayout"];
  mobileLayout?: SceneImage["presentation"]["mobileLayout"];
  desktopImageWidth?: string;
  mobileImageWidth?: string;
  imageAlignment?: SceneImage["presentation"]["imageAlignment"];
  textAlignment?: SceneImage["presentation"]["textAlignment"];
  headingMaxWidth?: string;
  intensity?: number;
  scale?: number;
  mobileIntensity?: number;
  mobileScale?: number;
  sticky?: boolean;
};

const sceneImage = ({
  src,
  alt,
  desktopPosition,
  tabletPosition,
  mobilePosition,
  overlay,
  textTone,
  mode,
  orientation,
  fit,
  aspectRatio = orientation === "portrait" ? "9 / 16" : "16 / 9",
  background = "#eadfcc",
  desktopLayout = mode === "fullBleed" ? "background" : "twoColumn",
  mobileLayout = mode === "fullBleed" ? "background" : "stacked",
  desktopImageWidth = orientation === "portrait"
    ? "clamp(20rem, 32vw, 26.875rem)"
    : "min(100%, 38rem)",
  mobileImageWidth = orientation === "portrait" ? "min(86vw, 22rem)" : "100%",
  imageAlignment = "center",
  textAlignment,
  headingMaxWidth,
  intensity = mode === "fullBleed" ? 0.09 : orientation === "portrait" ? 0.035 : 0.12,
  scale = mode === "fullBleed" ? 1.08 : orientation === "portrait" ? 1.01 : 1.06,
  mobileIntensity = mode === "fullBleed" ? 0.025 : orientation === "portrait" ? 0.018 : 0.028,
  mobileScale = 1,
  sticky = mode === "editorial" && orientation === "landscape",
}: SceneImageConfig): SceneImage => ({
  src,
  alt,
  desktopPosition: { objectPosition: desktopPosition },
  tabletPosition: tabletPosition
    ? { objectPosition: tabletPosition }
    : undefined,
  mobilePosition: { objectPosition: mobilePosition },
  presentation: {
    mode,
    orientation,
    fit,
    aspectRatio,
    background,
    desktopLayout,
    mobileLayout,
    desktopImageWidth,
    mobileImageWidth,
    imageAlignment,
    textAlignment,
    headingMaxWidth,
  },
  overlay,
  textTone,
  parallax: {
    enabled: true,
    intensity,
    scale,
    mobileIntensity,
    mobileScale,
    sticky,
  },
});

export const story: Story = {
  metadata: {
    names: {
      him: "Aru",
      her: "Ash",
    },
    relationshipDate: "2026-02-20",
    anniversaryDate: "2026-07-20",
    anniversaryLabel: "Five months",
  },
  opening: {
    dedication: "For Ash",
    title: "Five Months of Us",
    subtitle:
      "One conversation quietly became one of the best parts of my life.",
    dateRange: "February 20, 2026 - July 20, 2026",
    buttonLabel: "Begin Our Story",
    image: sceneImage({
      src: "/images/scenes/hero.webp",
      alt: "A quiet illustrated anniversary scene for Aru and Ash.",
      desktopPosition: "66% center",
      tabletPosition: "62% center",
      mobilePosition: "58% center",
      overlay: "rgba(43, 31, 22, 0.42)",
      textTone: "light",
      mode: "fullBleed",
      orientation: "fullBleed",
      fit: "cover",
      intensity: 0.09,
      scale: 1.08,
      mobileIntensity: 0.02,
      mobileScale: 1,
    }),
  },
  chapters: [
    {
      id: "where-our-story-really-began",
      label: "Chapter One",
      title: "Where Our Story Really Began",
      layout: {
        variant: "portraitEditorial",
        contentWidth: "minmax(18rem, 0.42fr)",
        imageWidth: "clamp(20rem, 31vw, 24rem)",
        headingMaxWidth: "8.5ch",
        sectionMinHeight: "min(50rem, 104svh)",
      },
      image: sceneImage({
        src: "/images/scenes/college-event.webp",
        alt: "A college event scene where Aru and Ash first found a meaningful connection.",
        desktopPosition: "center center",
        mobilePosition: "center center",
        overlay: "rgba(42, 32, 24, 0.1)",
        textTone: "dark",
        mode: "editorial",
        orientation: "portrait",
        fit: "contain",
        background: "#f1e8d8",
        aspectRatio: "9 / 16",
        desktopImageWidth: "clamp(20rem, 34vw, 26.875rem)",
        mobileImageWidth: "min(86vw, 22rem)",
        intensity: 0.02,
        scale: 1.01,
        mobileIntensity: 0.006,
        mobileScale: 1,
      }),
      paragraphs: [
        {
          id: "college-event-start",
          text: "It started with an ordinary college event.",
        },
        {
          id: "sat-and-talked",
          text: "After everything had nearly finished, we sat down and talked.",
        },
        {
          id: "nothing-dramatic",
          text: "Nothing dramatic happened.",
        },
        {
          id: "talking-felt-easy",
          text: "But talking to you felt easier than I expected it to.",
        },
      ],
    },
    {
      id: "the-message-i-was-looking-for",
      label: "Chapter Two",
      title: "The Message I Was Looking For",
      layout: {
        variant: "imageLeft",
        imageWidth: "minmax(0, 1.65fr)",
        contentWidth: "minmax(20rem, 1fr)",
        headingMaxWidth: "9.5ch",
        sectionMinHeight: "min(48rem, 104svh)",
      },
      image: sceneImage({
        src: "/images/scenes/message-reason.webp",
        alt: "Aru in his room at night finding a reason to message Ash.",
        desktopPosition: "48% center",
        tabletPosition: "46% center",
        mobilePosition: "center center",
        overlay: "rgba(30, 24, 20, 0.1)",
        textTone: "light",
        mode: "editorial",
        orientation: "landscape",
        fit: "contain",
        background: "#30251e",
        sticky: false,
        intensity: 0.05,
        scale: 1.025,
      }),
      paragraphs: [
        {
          id: "wanted-to-talk-again",
          text: "After that day, I wanted to talk to you again.",
        },
        {
          id: "did-not-know-how",
          text: "I just did not know how to begin.",
        },
        {
          id: "found-presentation",
          text: "Then I found our presentation video.",
        },
        {
          id: "not-only-video",
          text: "It was not only a video.",
        },
        {
          id: "reason-to-message",
          text: "It was finally a reason to message you.",
        },
      ],
      chatMessages: [
        {
          id: "presentation-found",
          sender: "Aru",
          text: "Found this legendary presentation.",
        },
        {
          id: "delete-that",
          sender: "Ash",
          text: "DELETE THAT RIGHT NOW.",
        },
        {
          id: "no",
          sender: "Aru",
          text: "No.",
        },
      ],
    },
    {
      id: "conversations-that-kept-going",
      label: "Chapter Three",
      title: "Conversations That Kept Going",
      layout: {
        variant: "imageRight",
        imageWidth: "minmax(0, 1.45fr)",
        contentWidth: "minmax(20rem, 1fr)",
        headingMaxWidth: "9ch",
      },
      image: sceneImage({
        src: "/images/scenes/conversations.webp",
        alt: "Aru and Ash looking at a presentation together.",
        desktopPosition: "center center",
        mobilePosition: "center center",
        overlay: "rgba(246, 238, 222, 0.06)",
        textTone: "dark",
        mode: "editorial",
        orientation: "landscape",
        fit: "contain",
        background: "#efe4d0",
        sticky: false,
        intensity: 0.05,
        scale: 1.025,
      }),
      paragraphs: [
        {
          id: "one-video",
          text: "What began with one presentation video did not end there.",
        },
        {
          id: "one-reply",
          text: "One reply became another.",
        },
        {
          id: "longer",
          text: "The conversations became longer.",
        },
        {
          id: "awkwardness",
          text: "The awkwardness slowly disappeared.",
        },
        {
          id: "looked-forward",
          text: "Before I realised it, talking to you had become something I looked forward to.",
        },
      ],
    },
    {
      id: "the-ride-that-almost-did-not-happen",
      label: "Chapter Four",
      title: "The Ride That Almost Did Not Happen",
      layout: {
        variant: "imageLeft",
        imageWidth: "minmax(0, 1.55fr)",
        contentWidth: "minmax(20rem, 1fr)",
        headingMaxWidth: "9ch",
      },
      image: sceneImage({
        src: "/images/scenes/missed-ride.webp",
        alt: "A tea shop scene after an exam.",
        desktopPosition: "center center",
        mobilePosition: "center center",
        overlay: "rgba(66, 46, 31, 0.08)",
        textTone: "dark",
        mode: "editorial",
        orientation: "landscape",
        fit: "contain",
        background: "#eadbc4",
        sticky: false,
        intensity: 0.05,
        scale: 1.025,
      }),
      paragraphs: [
        {
          id: "exam-finished",
          text: "The exam had finished, and I waited outside while drinking tea with friends.",
        },
        {
          id: "ash-left",
          text: "You thought I had already gone home, so you left on your scooter.",
        },
        {
          id: "message-returned",
          text: "Then I messaged you, and you came back.",
        },
      ],
      chatMessages: [
        {
          id: "you-left",
          sender: "Aru",
          text: "You left?",
        },
        {
          id: "thought-home",
          sender: "Ash",
          text: "I thought you already went home.",
        },
        {
          id: "waiting-outside",
          sender: "Aru",
          text: "I was waiting outside.",
        },
        {
          id: "really",
          sender: "Ash",
          text: "...really?",
        },
        {
          id: "yeah",
          sender: "Aru",
          text: "Yeah.",
        },
        {
          id: "coming-back",
          sender: "Ash",
          text: "I'm coming back.",
        },
      ],
    },
    {
      id: "our-first-scooter-ride",
      label: "Chapter Five",
      title: "Our First Scooter Ride",
      layout: {
        variant: "imageBackground",
        contentWidth: "min(28rem, 100%)",
        headingMaxWidth: "8.5ch",
        sectionMinHeight: "min(50rem, 108svh)",
      },
      image: sceneImage({
        src: "/images/scenes/scooter-ride.webp",
        alt: "Aru and Ash on their first scooter ride.",
        desktopPosition: "center center",
        mobilePosition: "center center",
        overlay: "rgba(38, 31, 24, 0.34)",
        textTone: "light",
        mode: "editorial",
        orientation: "landscape",
        fit: "cover",
        background: "#eadfca",
        sticky: false,
        intensity: 0.05,
        scale: 1.035,
      }),
      paragraphs: [
        {
          id: "nervous-first",
          text: "At first, the ride felt slightly nervous.",
        },
        {
          id: "comfortable-conversation",
          text: "The conversation slowly became comfortable.",
        },
        {
          id: "being-together",
          text: "Where we were going mattered less than finally being together.",
        },
      ],
    },
    {
      id: "the-hill",
      label: "Chapter Six",
      title: "The Hill",
      layout: {
        variant: "imageBackground",
        contentWidth: "min(30rem, 100%)",
        headingMaxWidth: "7ch",
        sectionMinHeight: "min(52rem, 110svh)",
      },
      image: sceneImage({
        src: "/images/scenes/hill.webp",
        alt: "A quiet hill at sunset.",
        desktopPosition: "center center",
        mobilePosition: "center center",
        overlay: "rgba(57, 42, 28, 0.32)",
        textTone: "light",
        mode: "editorial",
        orientation: "landscape",
        fit: "cover",
        background: "#e9dcc6",
        sticky: false,
        intensity: 0.05,
        scale: 1.035,
      }),
      paragraphs: [
        {
          id: "quiet-hill",
          text: "We stopped at a quiet hill.",
        },
        {
          id: "evening-darker",
          text: "Evening became darker while we talked.",
        },
        {
          id: "held-hand",
          text: "Then, naturally and calmly, you held my hand.",
        },
      ],
      chatMessages: [
        {
          id: "nervous-coming-back",
          sender: "Ash",
          text: "I was actually really nervous coming back.",
        },
        {
          id: "why",
          sender: "Aru",
          text: "Why?",
        },
        {
          id: "joking",
          sender: "Ash",
          text: "I thought maybe you were joking before.",
        },
        {
          id: "was-not",
          sender: "Aru",
          text: "I wasn't.",
        },
        {
          id: "good",
          sender: "Ash",
          text: "...good.",
        },
      ],
    },
    {
      id: "calls-we-did-not-want-to-end",
      label: "Chapter Seven",
      title: "Calls We Did Not Want to End",
      layout: {
        variant: "textFocused",
        contentWidth: "min(44rem, 100%)",
        headingMaxWidth: "9ch",
        sectionMinHeight: "min(36rem, 86svh)",
      },
      paragraphs: [
        {
          id: "neither-ended",
          text: "Neither of us ended the call.",
        },
      ],
      chatMessages: [
        {
          id: "should-sleep",
          sender: "Ash",
          text: "We should sleep.",
        },
        {
          id: "yeah-call",
          sender: "Aru",
          text: "Yeah.",
        },
      ],
    },
    {
      id: "bhaktapur",
      label: "Chapter Eight",
      title: "Bhaktapur",
      featuredDate: "February 20, 2026",
      layout: {
        variant: "imageRight",
        imageWidth: "minmax(0, 1.45fr)",
        contentWidth: "minmax(20rem, 1fr)",
        headingMaxWidth: "8ch",
      },
      image: sceneImage({
        src: "/images/scenes/bhaktapur.webp",
        alt: "An evening in Bhaktapur.",
        desktopPosition: "center center",
        mobilePosition: "center center",
        overlay: "rgba(45, 33, 24, 0.08)",
        textTone: "dark",
        mode: "editorial",
        orientation: "landscape",
        fit: "contain",
        background: "#eadcca",
        sticky: false,
        intensity: 0.05,
        scale: 1.025,
      }),
      paragraphs: [
        {
          id: "told-ash",
          text: "In Bhaktapur, I finally told you that I liked being with you.",
        },
        {
          id: "become-real",
          text: "I wanted the connection between us to become real.",
        },
      ],
      chatMessages: [
        {
          id: "wanted-to-say",
          sender: "Aru",
          text: "There's something I've wanted to say for a while.",
        },
        {
          id: "like-being",
          sender: "Aru",
          text: "I really like being with you.",
        },
        {
          id: "something-real",
          sender: "Aru",
          text: "And I want this to become something real.",
        },
        {
          id: "nervous",
          sender: "Ash",
          text: "I'm nervous.",
        },
        {
          id: "me-too",
          sender: "Aru",
          text: "Me too.",
        },
        {
          id: "okay",
          sender: "Ash",
          text: "...okay.",
        },
      ],
    },
  ],
  reasons: [
    {
      id: "reason-1",
      title: "Reason one",
      text: "Editable placeholder for a real reason.",
    },
    {
      id: "reason-2",
      title: "Reason two",
      text: "Editable placeholder for a real reason.",
    },
    {
      id: "reason-3",
      title: "Reason three",
      text: "Editable placeholder for a real reason.",
    },
    {
      id: "reason-4",
      title: "Reason four",
      text: "Editable placeholder for a real reason.",
    },
    {
      id: "reason-5",
      title: "Reason five",
      text: "Editable placeholder for a real reason.",
    },
  ],
  letter: [
    {
      id: "letter-to-ash",
      text: "To Ash",
    },
    {
      id: "letter-dear-ash",
      text: "Dear Ash,",
    },
    {
      id: "letter-happy-five-months",
      text: "Happy five months, maya.",
    },
    {
      id: "letter-time",
      text: "Kati chado time bitdo raicha, hai? Kahile orientation ma timilai first time notice gareko, kahile college event pachi kura suru bhayo, kahile presentation video bhetera message garne bahana khoje, ani kahile timi mero life ko sabai bhanda important manche bhayau... sabai kura sapana jastai lagcha.",
    },
    {
      id: "letter-nervous",
      text: "Honestly, tyo din message pathauda ma ali nervous nai thiye. K kura bata start garne, k reply aauchha, ignore garchhau ki bhanera dherai sochya thiye. Tara timro message dekheko moment dekhi, hami bich ko kura haru kahile rokiye nai jasto lagena.",
    },
    {
      id: "letter-memories",
      text: "Tespachi ta message haru, call haru, scooter ride, tea pachi ko tyo ride, hill ma baseko tyo beluka, ani Bhaktapur ko tyo din... sabai memories le mero life lai completely change gardiyo.",
    },
    {
      id: "letter-accepted",
      text: "Timi sanga huda ma afulai arko manche banauna pardaina. Ma jasari chu, tesari nai accept gareko feeling timile diyau. Tyo feeling ko value ma words le explain garna sakdina.",
    },
    {
      id: "letter-thank-you",
      text: "Thank you for listening to my random talks, mero overthinking sahera, mero excitement share garera, ani sano sano kura ma pani khusi banaidiyeko ma.",
    },
    {
      id: "letter-coincidence",
      text: "Sometimes ma sochchu, kati sano coincidence le yo sabai suru bhayo. Euta presentation video... that's all it took. Tara tyo sano message le mero life ko biggest story start garayo.",
    },
    {
      id: "letter-safe-place",
      text: "mutu, thank you for becoming my safe place.",
    },
    {
      id: "letter-every-smile",
      text: "Thank you for every smile.",
    },
    {
      id: "letter-every-ride",
      text: "Thank you for every ride.",
    },
    {
      id: "letter-every-call",
      text: "Thank you for every late night call.",
    },
    {
      id: "letter-every-memory",
      text: 'Thank you for every memory that became "our" memory.',
    },
    {
      id: "letter-happy-again",
      text: "Happy five months, maya.",
    },
    {
      id: "letter-love",
      text: "I love you.",
    },
    {
      id: "letter-always",
      text: "Always.",
    },
    {
      id: "letter-signature",
      text: "- Aru",
    },
  ],
  memories: [
    {
      id: "memory-1",
      title: "Memory placeholder",
      description: "No image assigned yet.",
    },
  ],
  ending: {
    title: "Happy five months, Ash.",
    subtitle: "This is only the beginning.",
    buttonLabel: "Relive Our Story",
    image: sceneImage({
      src: "/images/scenes/bhaktapur.webp",
      alt: "A calm illustrated Bhaktapur evening scene for the ending.",
      desktopPosition: "34% center",
      tabletPosition: "38% center",
      mobilePosition: "68% center",
      overlay: "rgba(34, 25, 19, 0.42)",
      textTone: "light",
      mode: "fullBleed",
      orientation: "fullBleed",
      fit: "cover",
      intensity: 0.08,
      scale: 1.08,
      mobileIntensity: 0.018,
      mobileScale: 1,
      textAlignment: "start",
      headingMaxWidth: "14ch",
    }),
  },
};
