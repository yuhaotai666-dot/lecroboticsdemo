import { useEffect, useRef, useState, type RefObject } from "react";

type Gsap = (typeof import("gsap"))["gsap"];
type ScrollTriggerType = (typeof import("gsap/ScrollTrigger"))["ScrollTrigger"];

export type MotionBuilder = (
  gsap: Gsap,
  ScrollTrigger: ScrollTriggerType,
  scope: HTMLElement,
) => void;

/**
 * Scroll-driven motion, loaded only when it will actually run.
 *
 * GSAP + ScrollTrigger is ~43 kB gzip. Touch devices and anyone who asked for
 * reduced motion get the resolved end state instead, and never download it —
 * so the import sits behind that check rather than at module scope.
 *
 * Returns `true` when motion is off, so the caller can apply its static class.
 */
export function useScrollMotion(
  scopeRef: RefObject<HTMLElement | null>,
  build: MotionBuilder,
): boolean {
  const [staticState, setStaticState] = useState(false);
  // Kept in a ref so an inline builder closure does not retrigger the effect.
  const buildRef = useRef(build);
  buildRef.current = build;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || isTouch) {
      setStaticState(true);
      return;
    }

    const scope = scopeRef.current;
    if (!scope) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    void (async () => {
      let gsap, ScrollTrigger;
      try {
        [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
      } catch {
        // Without the timeline elements keep their pre-animation state, which
        // for a reveal means invisible. Resolve to the end state instead.
        if (!cancelled) setStaticState(true);
        return;
      }
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => buildRef.current(gsap, ScrollTrigger, scope), scope);

      // Pin offsets are measured at build time. Webfonts swapping in after that
      // shift every trigger below them, so re-measure once they land.
      void document.fonts?.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [scopeRef]);

  return staticState;
}
