"use client";

import type { CSSProperties, ReactNode } from "react";
import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import { ChatMemory } from "@/components/ChatMemory";
import { ScrollButton } from "@/components/ScrollButton";
import type {
  ChatMessage,
  SceneImage,
  StoryChapterLayout,
  StoryParagraph,
} from "@/types/story";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type SimpleParallaxSectionProps = {
  id?: string;
  variant?: "opening" | "story" | "night" | "ending";
  chapterLabel?: string;
  title: string;
  titleId?: string;
  paragraphs?: StoryParagraph[];
  image?: SceneImage;
  imagePriority?: boolean;
  chatMessages?: ChatMessage[];
  featuredDate?: string;
  layout?: StoryChapterLayout;
  button?: {
    label: string;
    targetId: string;
  };
  reversed?: boolean;
  customContent?: ReactNode;
};

export function SimpleParallaxSection({
  id,
  variant = "story",
  chapterLabel,
  title,
  titleId,
  paragraphs = [],
  image,
  imagePriority = false,
  chatMessages,
  featuredDate,
  layout,
  button,
  reversed = false,
  customContent,
}: SimpleParallaxSectionProps) {
  const root = useRef<HTMLElement>(null);
  const resolvedTitleId = titleId ?? (id ? `${id}-title` : undefined);
  const isOpening = variant === "opening";
  const isEnding = variant === "ending";
  const isNight = variant === "night";
  const layoutVariant =
    layout?.variant ??
    (isNight
      ? "textFocused"
      : image?.presentation.orientation === "portrait"
        ? "portraitEditorial"
        : reversed
          ? "imageLeft"
          : "imageRight");
  const sectionClassName =
    variant === "story"
      ? `story-band story-section parallax-section story-layout-${layoutVariant} ${reversed ? "story-section-reversed" : ""}`
      : `${variant === "night" ? `story-band night-section story-layout-${layoutVariant}` : `${variant}-scene`} parallax-section`;
  const sceneStyle = image
    ? ({
        "--scene-text-alignment": image.presentation.textAlignment,
        "--scene-heading-max-width": image.presentation.headingMaxWidth,
      } as CSSProperties)
    : undefined;
  const sectionStyle = {
    ...(sceneStyle ?? {}),
    "--chapter-image-width": layout?.imageWidth,
    "--chapter-content-width": layout?.contentWidth,
    "--chapter-image-alignment": layout?.imageAlignment,
    "--chapter-heading-max-width": layout?.headingMaxWidth,
    "--chapter-min-height": layout?.sectionMinHeight,
  } as CSSProperties;

  useGSAP(
    () => {
      const section = root.current;
      if (!section) {
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set(section.querySelectorAll("[data-reveal]"), {
          autoAlpha: 1,
          clearProps: "transform",
        });
        gsap.set(section.querySelectorAll("[data-parallax-image]"), {
          clearProps: "all",
        });
        gsap.set(section.querySelectorAll("[data-parallax-frame]"), {
          clearProps: "all",
        });
        gsap.set(section.querySelectorAll("[data-parallax-text]"), {
          clearProps: "all",
        });
        return;
      }

      gsap.delayedCall(0.25, () => ScrollTrigger.refresh());

      const reveal = gsap.timeline({ paused: true });
      const revealKicker = Array.from(
        section.querySelectorAll<HTMLElement>('[data-reveal="kicker"]'),
      );
      const revealHeading = Array.from(
        section.querySelectorAll<HTMLElement>('[data-reveal="heading"]'),
      );
      const revealParagraphs = Array.from(
        section.querySelectorAll<HTMLElement>('[data-reveal="paragraph"]'),
      );
      const revealChats = Array.from(
        section.querySelectorAll<HTMLElement>('[data-reveal="chat"]'),
      );
      const revealDetails = Array.from(
        section.querySelectorAll<HTMLElement>('[data-reveal="detail"]'),
      );
      const revealButtons = Array.from(
        section.querySelectorAll<HTMLElement>('[data-reveal="button"]'),
      );

      if (revealKicker.length) {
        reveal.fromTo(
          revealKicker,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
        );
      }

      if (revealHeading.length) {
        reveal.fromTo(
          revealHeading,
          { autoAlpha: 0, y: isOpening ? 38 : 45 },
          {
            autoAlpha: 1,
            y: 0,
            duration: isOpening ? 0.75 : 0.8,
            ease: "power2.out",
          },
          reveal.duration() > 0 ? (isOpening ? "-=0.18" : "-=0.2") : 0,
        );
      }

      if (revealParagraphs.length) {
        reveal.fromTo(
          revealParagraphs,
          { autoAlpha: 0, y: isOpening ? 28 : 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            ease: "power2.out",
            stagger: 0.15,
          },
          reveal.duration() > 0 ? "-=0.24" : 0,
        );
      }

      if (revealDetails.length) {
        reveal.fromTo(
          revealDetails,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.14,
          },
          reveal.duration() > 0 ? "-=0.2" : 0,
        );
      }

      if (revealChats.length) {
        reveal.fromTo(
          revealChats,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
            stagger: 0.14,
          },
          reveal.duration() > 0 ? (isOpening ? "-=0.18" : "-=0.12") : 0,
        );
      }

      if (revealButtons.length) {
        reveal.fromTo(
          revealButtons,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          reveal.duration() > 0 ? "-=0.1" : 0,
        );
      }

      if (isOpening) {
        const overlay = section.querySelector<HTMLElement>(".scene-overlay");
        const opening = gsap.timeline();
        if (overlay) {
          opening.fromTo(
            overlay,
            { autoAlpha: 0.72 },
            { autoAlpha: 1, duration: 0.45, ease: "power1.out" },
          );
        }
        reveal.paused(false);
        opening.add(reveal, overlay ? "-=0.1" : 0);
      } else if (
        revealKicker.length ||
        revealHeading.length ||
        revealParagraphs.length ||
        revealChats.length ||
        revealDetails.length ||
        revealButtons.length
      ) {
        ScrollTrigger.create({
          trigger: section,
          start: "top 72%",
          end: "bottom 28%",
          animation: reveal,
          toggleActions: "play none none reverse",
        });
      }

      if (!image?.parallax.enabled || isNight) {
        return;
      }

      const imageEl = section.querySelector<HTMLElement>("[data-parallax-image]");
      const imageFrame = section.querySelector<HTMLElement>(
        "[data-parallax-frame]",
      );
      const textEl = section.querySelector<HTMLElement>("[data-parallax-text]");
      const parallaxEl =
        image.presentation.orientation === "portrait" ? imageFrame : imageEl;
      if (!parallaxEl) {
        return;
      }

      const desktopDistance = image.parallax.intensity * 100;
      const mobileDistance = image.parallax.mobileIntensity * 100;
      const isPortrait = image.presentation.orientation === "portrait";
      const isFullBleed = image.presentation.mode === "fullBleed";
      const isBackgroundLayout = layoutVariant === "imageBackground";
      const desktopStartScale = image.parallax.scale;
      const desktopEndScale = isFullBleed ? 1.02 : isPortrait ? 1 : 1.01;
      const desktopTextStart = isFullBleed ? 34 : isBackgroundLayout ? 32 : 28;
      const desktopTextEnd = isFullBleed ? -14 : isBackgroundLayout ? -14 : -12;
      const mobileY = isFullBleed ? 30 : isPortrait ? 22 : 28;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          parallaxEl,
          {
            yPercent: isPortrait ? 0 : -desktopDistance / 2,
            y: isPortrait ? -22 : isBackgroundLayout ? -8 : -18,
            scale: desktopStartScale,
          },
          {
            yPercent: isPortrait ? 0 : desktopDistance / 2,
            y: isPortrait ? 22 : isBackgroundLayout ? 8 : 18,
            scale: desktopEndScale,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: isFullBleed ? 1.1 : 1,
              invalidateOnRefresh: true,
            },
          },
        );

        if (textEl) {
          gsap.fromTo(
            textEl,
            { y: desktopTextStart },
            {
              y: desktopTextEnd,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: isFullBleed ? 1.2 : 1.1,
                invalidateOnRefresh: true,
              },
            },
          );
        }
      });

      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          parallaxEl,
          {
            yPercent: isFullBleed ? -mobileDistance / 2 : 0,
            y: isFullBleed ? 0 : -mobileY / 2,
            scale: image.parallax.mobileScale,
          },
          {
            yPercent: isFullBleed ? mobileDistance / 2 : 0,
            y: isFullBleed ? 0 : mobileY / 2,
            scale: image.parallax.mobileScale,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );

        if (textEl) {
          gsap.fromTo(
            textEl,
            { y: 24 },
            {
              y: -10,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            },
          );
        }
      });

      return () => {
        mm.revert();
      };
    },
    {
      scope: root,
      dependencies: [
        image?.src,
        image?.parallax.enabled,
        image?.parallax.intensity,
        image?.parallax.scale,
      ],
    },
  );

  const imageFrame = image ? (
    <figure
      className={`scene-frame parallax-frame scene-frame-${image.presentation.mode} scene-frame-${image.presentation.orientation} ${
        image.parallax.sticky ? "scene-frame-sticky" : ""
      }`}
      data-parallax-frame
      style={
        {
          "--scene-overlay": image.overlay,
          "--desktop-position": image.desktopPosition.objectPosition,
          "--tablet-position":
            image.tabletPosition?.objectPosition ??
            image.desktopPosition.objectPosition,
          "--mobile-position": image.mobilePosition.objectPosition,
          "--scene-fit": image.presentation.fit,
          "--scene-aspect-ratio": image.presentation.aspectRatio,
          "--scene-background": image.presentation.background,
          "--scene-desktop-width": image.presentation.desktopImageWidth,
          "--scene-mobile-width": image.presentation.mobileImageWidth,
          "--scene-alignment": image.presentation.imageAlignment,
          "--scene-text-alignment": image.presentation.textAlignment,
          "--scene-heading-max-width": image.presentation.headingMaxWidth,
        } as CSSProperties
      }
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        unoptimized
        priority={imagePriority}
        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 92vw, 54vw"
        className="scene-image"
        data-parallax-image
        onLoad={() => ScrollTrigger.refresh()}
      />
      <span aria-hidden="true" className="scene-overlay" />
    </figure>
  ) : null;

  if (isOpening) {
    return (
      <section
        id={id}
        ref={root}
        className={sectionClassName}
        style={sectionStyle}
        aria-labelledby={resolvedTitleId}
      >
        {imageFrame}
        <div className="opening-copy" data-parallax-text>
          {chapterLabel ? (
            <p className="opening-dedication" data-reveal="kicker">
              {chapterLabel}
            </p>
          ) : null}
          <h1 id={resolvedTitleId} data-reveal="heading">
            {title}
          </h1>
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph.id}
              className="opening-subtitle"
              data-reveal="paragraph"
            >
              {paragraph.text}
            </p>
          ))}
          {featuredDate ? (
            <p className="opening-dates" data-reveal="detail">
              {featuredDate}
            </p>
          ) : null}
          {button ? (
            <span data-reveal="button">
              <ScrollButton targetId={button.targetId} variant="light">
                {button.label}
              </ScrollButton>
            </span>
          ) : null}
        </div>
      </section>
    );
  }

  if (isEnding) {
    return (
      <section
        id={id}
        ref={root}
        className={sectionClassName}
        style={sectionStyle}
        aria-labelledby={resolvedTitleId}
      >
        {imageFrame}
        <div className="ending-copy" data-parallax-text>
          <h2 id={resolvedTitleId} data-reveal="heading">
            {title}
          </h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph.id} data-reveal="paragraph">
              {paragraph.text}
            </p>
          ))}
          {button ? (
            <span data-reveal="button">
              <ScrollButton targetId={button.targetId} variant="light">
                {button.label}
              </ScrollButton>
            </span>
          ) : null}
        </div>
      </section>
    );
  }

  if (isNight) {
    return (
      <section
        id={id}
        ref={root}
        className={sectionClassName}
        style={sectionStyle}
        aria-labelledby={resolvedTitleId}
      >
        <div className="night-glow" aria-hidden="true" />
        <div className="story-container night-content">
          <div data-parallax-text>
            {chapterLabel ? (
              <p className="section-kicker" data-reveal="kicker">
                {chapterLabel}
              </p>
            ) : null}
            <h2
              id={resolvedTitleId}
              className="section-title"
              data-reveal="heading"
            >
              {title}
            </h2>
            <div className="chapter-prose">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.id} data-reveal="paragraph">
                  {paragraph.text}
                </p>
              ))}
            </div>
          </div>
          {chatMessages ? (
            <div>
              <ChatMemory messages={chatMessages} />
            </div>
          ) : null}
          {customContent}
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      ref={root}
      className={sectionClassName}
      style={sectionStyle}
      aria-labelledby={resolvedTitleId}
    >
      <div className="story-container story-section-grid">
        <div className="story-section-copy" data-parallax-text>
          {chapterLabel ? (
            <p className="section-kicker" data-reveal="kicker">
              {chapterLabel}
            </p>
          ) : null}
          <h2
            id={resolvedTitleId}
            className="section-title"
            data-reveal="heading"
          >
            {title}
          </h2>
          <div className="chapter-prose">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.id} data-reveal="paragraph">
                {paragraph.text}
              </p>
            ))}
          </div>
          {featuredDate ? (
            <p className="featured-date" data-reveal="detail">
              {featuredDate}
            </p>
          ) : null}
          {chatMessages ? (
            <div className="story-section-chat story-section-chat-inline">
              <ChatMemory messages={chatMessages} />
            </div>
          ) : null}
        </div>

        {imageFrame}

        {customContent}
      </div>
    </section>
  );
}
