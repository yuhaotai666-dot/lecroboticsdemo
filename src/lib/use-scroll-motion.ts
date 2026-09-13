import { useEffect, useRef, useState, type RefObject } from "react";

type Gsap = (typeof import("gsap"))["gsap"];
type ScrollTriggerType = (typeof import("gsap/ScrollTrigger"))["ScrollTrigger"];

export type MotionBuilder = (
  gsap: Gsap,
  ScrollTrigger: ScrollTriggerType,
  scope: HTMLElement,
) => void;

/**
 * A pinned section inserts a spacer that pushes every trigger below it further
 * down the document. Each caller registers from its own dynamic import, so the
 * order is not fixed: whichever registers first measures a document that later
 * pins will change under it. Left uncorrected the capability strip pinned itself
 * roughly 1300 px early — the height of the hero pin — and drew over the section
 * above it.
 *
 * So every registration schedules the same debounced refresh. Whoever finishes
 * last wins, and by then every pin exists.
 */
let refreshTimer: number | undefined;
function scheduleRefresh(ScrollTrigger: ScrollTriggerType) {
  if (refreshTimer !== undefined) window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(() => {
    refreshTimer = undefined;
    ScrollTrigger.refresh();
  }, 120);
}

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

      if (!cancelled) scheduleRefresh(ScrollTrigger);
      // Webfonts swapping in after that shift everything again.
      void document.fonts?.ready.then(() => {
        if (!cancelled) scheduleRefresh(ScrollTrigger);
      });
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [scopeRef]);

  return staticState;
}
