import type { CSSProperties } from "react";

import Image from "next/image";

import type { SceneImage as SceneImageType } from "@/types/story";

type SceneImageProps = {
  image: SceneImageType;
  priority?: boolean;
};

export function SceneImage({
  image,
  priority = false,
}: SceneImageProps) {
  return (
    <figure
      className={`scene-frame scene-frame-${image.presentation.mode} scene-frame-${image.presentation.orientation}`}
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
        priority={priority}
        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 92vw, 54vw"
        className="scene-image"
      />
      <span aria-hidden="true" className="scene-overlay" />
    </figure>
  );
}
