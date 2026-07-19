"use client";

type ScrollButtonProps = {
  targetId: string;
  children: React.ReactNode;
  variant?: "light" | "dark";
  expanded?: boolean;
  controls?: string;
  onClick?: () => void;
};

export function ScrollButton({
  targetId,
  children,
  variant = "dark",
  expanded,
  controls,
  onClick,
}: ScrollButtonProps) {
  const scrollToTarget = () => {
    onClick?.();

    const target = document.getElementById(targetId);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button
      type="button"
      aria-expanded={expanded}
      aria-controls={controls}
      onClick={scrollToTarget}
      className={`story-button ${variant === "light" ? "story-button-light" : ""}`}
    >
      {children}
    </button>
  );
}
