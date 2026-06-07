import { useRef, type MouseEvent } from "react";

function setParallax(node: HTMLDivElement | null, x: number, y: number) {
  if (!node) {
    return;
  }

  node.style.setProperty("--auth-parallax-x", x.toFixed(4));
  node.style.setProperty("--auth-parallax-y", y.toFixed(4));
}

export function useAuthParallax() {
  const rootRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    setParallax(rootRef.current, x, y);
  };

  const handleMouseLeave = () => {
    setParallax(rootRef.current, 0, 0);
  };

  return {
    rootRef,
    handleMouseMove,
    handleMouseLeave
  };
}
