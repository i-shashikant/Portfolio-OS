"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import HandTracker from "./HandTracker";
import DeveloperMode from "./DeveloperMode";

import { usePortfolio } from "@/stores/portfolio-store";
import { socials } from "@/data/socials";

import type { Gesture } from "./GestureClassifier";

/*
 * ==========================================
 * SECTION ORDER
 * ==========================================
 *
 * Used for OPEN_PALM swipe-to-scroll, so a
 * swipe always snaps to the next/previous
 * section in visual order.
 */

const SECTION_ORDER = [
  "home",
  "projects",
  "about",
  "skills",
  "lab",
  "contact",
] as const;

const GESTURE_LABELS: Record<Gesture, string> = {
  POINT: "Point · Cursor",
  THUMBS_UP: "Thumbs Up · Select",
  OPEN_PALM: "Open Palm · Swipe to Scroll",
  FIST: "Fist · Home",
  PEACE: "Peace · GitHub",
  CALL_ME: "Call Me · Contact",
  ROCK: "Rock · Dev Mode",
  UNKNOWN: "—",
};

export default function GestureController() {
  const {
    section,
    gesturesEnabled,
    goHome,
    openSection,
    nextProject,
    previousProject,
  } = usePortfolio();

  const [gesture, setGesture] = useState<Gesture>("UNKNOWN");

  const [cursorPosition, setCursorPosition] = useState({
    x: 50,
    y: 50,
  });

  const [devModeOn, setDevModeOn] = useState(false);

  /*
   * ==========================================
   * CURSOR SMOOTHING
   * ==========================================
   */

  const smoothCursor = useRef({ x: 50, y: 50 });

  /*
   * ==========================================
   * LATEST GESTURE (readable from callbacks
   * that don't receive it directly, like
   * handleCursorMove)
   * ==========================================
   */

  const gestureRef = useRef<Gesture>("UNKNOWN");

  /*
   * ==========================================
   * GESTURE STABILIZER (lightweight)
   * ==========================================
   *
   * Raw per-frame classification is noisy — a
   * borderline finger reading can flip a gesture
   * for a single frame. We require a NEW gesture
   * to repeat for 2 consecutive frames before we
   * treat it as real. This is intentionally light
   * (not a multi-frame majority vote) because it
   * also gates the POINT cursor — anything heavier
   * makes the cursor feel laggy.
   */

  const pendingGestureRef = useRef<Gesture>("UNKNOWN");
  const pendingCountRef = useRef(0);
  const stableGestureRef = useRef<Gesture>("UNKNOWN");

  const CONFIRM_FRAMES = 2;

  const stabilizeGesture = useCallback(
    (raw: Gesture): Gesture => {
      if (raw === pendingGestureRef.current) {
        pendingCountRef.current += 1;
      } else {
        pendingGestureRef.current = raw;
        pendingCountRef.current = 1;
      }

      if (pendingCountRef.current >= CONFIRM_FRAMES) {
        stableGestureRef.current = raw;
      }

      return stableGestureRef.current;
    },
    []
  );

  /*
   * ==========================================
   * THUMBS UP CLICK CONTROL
   * ==========================================
   */

  const thumbsUpActive = useRef(false);
  const lastClickTime = useRef(0);
  const CLICK_COOLDOWN = 700;

  /*
   * ==========================================
   * DISCRETE GESTURE TRIGGERS
   * ==========================================
   *
   * Shared "hold + cooldown" logic for
   * FIST / PEACE / CALL_ME / ROCK, so a
   * gesture has to be held briefly (kills
   * transient misclassification) and can't
   * re-fire immediately while still shown.
   */

  const discreteState = useRef<
    Partial<Record<Gesture, { enteredAt: number; firedAt: number }>>
  >({});

  const prevGestureRef = useRef<Gesture>("UNKNOWN");

  const DISCRETE_HOLD = 150;
  const DISCRETE_COOLDOWN = 900;

  const tryFireDiscrete = useCallback(
    (target: Gesture, action: () => void) => {
      const rec = discreteState.current[target];

      if (!rec) return;

      const now = performance.now();

      const heldFor = now - rec.enteredAt;
      const sinceLastFire = now - rec.firedAt;

      if (
        heldFor >= DISCRETE_HOLD &&
        sinceLastFire >= DISCRETE_COOLDOWN
      ) {
        rec.firedAt = now;
        action();
      }
    },
    []
  );

  /*
   * ==========================================
   * OPEN PALM SWIPE = SCROLL (SECTION SNAP)
   * ==========================================
   *
   * Replaces the old pinch-distance scroll,
   * which lagged because it mapped a noisy
   * two-point distance to a continuous scroll
   * offset every frame.
   *
   * Instead: while OPEN_PALM is held, we track
   * the index fingertip's Y position against a
   * fixed baseline. Once it moves far enough in
   * one direction, we fire ONE section-snap and
   * reset the baseline. This is a discrete event,
   * not a continuous drag, so there's nothing to
   * smooth or lag.
   */

  const palmSwipe = useRef<{
    baselineY: number | null;
    lastSnapAt: number;
  }>({ baselineY: null, lastSnapAt: 0 });

  const PALM_SWIPE_THRESHOLD = 0.11;
  const PALM_SWIPE_COOLDOWN = 600;

  /*
   * ==========================================
   * POINT SWIPE = NEXT / PREV PROJECT
   * ==========================================
   *
   * Same discrete-threshold approach as the
   * palm swipe, but horizontal, and only while
   * POINT is held. Threshold is wide (~18% of
   * frame width) so ordinary pointing/clicking
   * doesn't accidentally trigger it.
   */

  const pointSwipe = useRef<{
    baselineX: number | null;
    lastSwipeAt: number;
  }>({ baselineX: null, lastSwipeAt: 0 });

  const POINT_SWIPE_THRESHOLD = 0.14;
  const POINT_SWIPE_COOLDOWN = 600;

  /*
   * ==========================================
   * SECTION SNAP HELPER
   * ==========================================
   *
   * Declared before handleGesture/handleCursorMove
   * since both reference it.
   */

  const currentSectionRef = useRef<
    (typeof SECTION_ORDER)[number]
  >("home");

  /*
   * Keep the ref in sync with the store's actual
   * section — the user might scroll manually, click
   * a nav link, or select a project card, and the
   * next swipe should step from wherever they really
   * are, not from a stale gesture-only position.
   */

  useEffect(() => {
    if (
      (SECTION_ORDER as readonly string[]).includes(section)
    ) {
      currentSectionRef.current =
        section as (typeof SECTION_ORDER)[number];
    }
  }, [section]);

  const snapSection = useCallback(
    (direction: 1 | -1) => {
      const index = SECTION_ORDER.indexOf(
        currentSectionRef.current
      );

      const nextIndex = Math.max(
        0,
        Math.min(SECTION_ORDER.length - 1, index + direction)
      );

      const next = SECTION_ORDER[nextIndex];

      currentSectionRef.current = next;

      openSection(next);
    },
    [openSection]
  );

  /*
   * ==========================================
   * VIRTUAL CLICK
   * ==========================================
   *
   * Also declared before handleGesture, which
   * fires it on THUMBS_UP.
   */

  const performVirtualClick = useCallback(() => {
    const x = (smoothCursor.current.x / 100) * window.innerWidth;
    const y = (smoothCursor.current.y / 100) * window.innerHeight;

    const element = document.elementFromPoint(x, y);

    if (!element) return;

    const clickable = element.closest(
      "button, a, [role='button'], [data-gesture-target]"
    ) as HTMLElement | null;

    if (clickable) {
      clickable.click();
      console.log("[Gesture] THUMBS_UP CLICK:", clickable);
      return;
    }

    if (element instanceof HTMLElement) {
      element.click();
      console.log("[Gesture] THUMBS_UP CLICK:", element);
    }
  }, []);

  /*
   * ==========================================
   * GESTURE HANDLER
   * ==========================================
   */

  const handleGesture = useCallback(
    (rawGesture: Gesture) => {
      const nextGesture = stabilizeGesture(rawGesture);

      setGesture((current) =>
        current === nextGesture ? current : nextGesture
      );

      gestureRef.current = nextGesture;

      /*
       * ----------------------------------------
       * GESTURE CHANGED: reset per-gesture entry
       * timers so discrete actions require a
       * fresh hold, and reset swipe baselines
       * when leaving OPEN_PALM / POINT.
       * ----------------------------------------
       */

      if (nextGesture !== prevGestureRef.current) {
        const leaving = prevGestureRef.current;

        delete discreteState.current[leaving];

        discreteState.current[nextGesture] = {
          enteredAt: performance.now(),
          firedAt:
            discreteState.current[nextGesture]?.firedAt ?? 0,
        };

        if (leaving === "OPEN_PALM") {
          palmSwipe.current.baselineY = null;
        }

        if (leaving === "POINT") {
          pointSwipe.current.baselineX = null;
        }

        prevGestureRef.current = nextGesture;
      }

      /*
       * ----------------------------------------
       * THUMBS UP = CLICK
       * ----------------------------------------
       */

      if (nextGesture === "THUMBS_UP") {
        const now = performance.now();

        if (
          !thumbsUpActive.current &&
          now - lastClickTime.current > CLICK_COOLDOWN
        ) {
          thumbsUpActive.current = true;
          lastClickTime.current = now;

          performVirtualClick();
        }

        return;
      }

      thumbsUpActive.current = false;

      /*
       * ----------------------------------------
       * FIST = HOME
       * ----------------------------------------
       */

      if (nextGesture === "FIST") {
        tryFireDiscrete("FIST", () => {
          goHome();
        });

        return;
      }

      /*
       * ----------------------------------------
       * PEACE = OPEN GITHUB
       * ----------------------------------------
       */

      if (nextGesture === "PEACE") {
        tryFireDiscrete("PEACE", () => {
          if (socials.github) {
            window.open(
              socials.github,
              "_blank",
              "noopener,noreferrer"
            );
          }
        });

        return;
      }

      /*
       * ----------------------------------------
       * CALL ME = GO TO CONTACT
       * ----------------------------------------
       */

      if (nextGesture === "CALL_ME") {
        tryFireDiscrete("CALL_ME", () => {
          openSection("contact");
        });

        return;
      }

      /*
       * ----------------------------------------
       * ROCK = TOGGLE DEVELOPER MODE
       * ----------------------------------------
       */

      if (nextGesture === "ROCK") {
        tryFireDiscrete("ROCK", () => {
          setDevModeOn((current) => !current);
        });

        return;
      }
    },
    [tryFireDiscrete, goHome, openSection, performVirtualClick, stabilizeGesture]
  );

  /*
   * ==========================================
   * CURSOR MOVEMENT + SWIPE TRACKING
   * ==========================================
   *
   * HandTracker calls this every frame a hand
   * is detected, regardless of gesture — so we
   * reuse the same index-fingertip stream for
   * both the visible cursor dot (POINT) and the
   * swipe detectors (OPEN_PALM / POINT).
   */

  const handleCursorMove = useCallback(
    (x: number, y: number) => {
      const targetX = (1 - x) * 100;
      const targetY = y * 100;

      const smoothing = 0.75;

      smoothCursor.current.x +=
        (targetX - smoothCursor.current.x) * smoothing;

      smoothCursor.current.y +=
        (targetY - smoothCursor.current.y) * smoothing;

      setCursorPosition({
        x: smoothCursor.current.x,
        y: smoothCursor.current.y,
      });

      /*
       * ----------------------------------------
       * OPEN PALM: vertical swipe → scroll
       * ----------------------------------------
       */

      if (gestureRef.current === "OPEN_PALM") {
        if (palmSwipe.current.baselineY === null) {
          palmSwipe.current.baselineY = y;
        } else {
          const delta = y - palmSwipe.current.baselineY;

          const now = performance.now();

          const cooledDown =
            now - palmSwipe.current.lastSnapAt >
            PALM_SWIPE_COOLDOWN;

          if (
            Math.abs(delta) > PALM_SWIPE_THRESHOLD &&
            cooledDown
          ) {
            const direction = delta > 0 ? 1 : -1;

            snapSection(direction);

            palmSwipe.current.baselineY = y;
            palmSwipe.current.lastSnapAt = now;
          }
        }
      }

      /*
       * ----------------------------------------
       * POINT: horizontal swipe → prev/next project
       * ----------------------------------------
       */

      if (gestureRef.current === "POINT") {
        if (pointSwipe.current.baselineX === null) {
          pointSwipe.current.baselineX = x;
        } else {
          const delta = x - pointSwipe.current.baselineX;

          const now = performance.now();

          const cooledDown =
            now - pointSwipe.current.lastSwipeAt >
            POINT_SWIPE_COOLDOWN;

          if (
            Math.abs(delta) > POINT_SWIPE_THRESHOLD &&
            cooledDown
          ) {
            /*
             * Camera image is mirrored (selfie view),
             * so a physical swipe right shows as
             * decreasing x in raw landmark space.
             */

            if (delta < 0) {
              nextProject();
            } else {
              previousProject();
            }

            pointSwipe.current.baselineX = x;
            pointSwipe.current.lastSwipeAt = now;
          }
        }
      }
    },
    [nextProject, previousProject, snapSection]
  );

  /*
   * ==========================================
   * DISABLED
   * ==========================================
   */

  if (!gesturesEnabled) {
    return null;
  }

  /*
   * ==========================================
   * UI
   * ==========================================
   */

  return (
    <>
      <HandTracker
        compact
        onGesture={handleGesture}
        onCursorMove={handleCursorMove}
      />

      <DeveloperMode
        active={devModeOn}
        onClose={() => setDevModeOn(false)}
      />

      {/* VIRTUAL CURSOR */}
      {gesture === "POINT" && (
        <div
          className="
            pointer-events-none
            fixed
            z-[99999]
            h-6
            w-6
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border-2
            border-white
            bg-white/10
            shadow-[0_0_20px_rgba(255,255,255,0.8)]
          "
          style={{
            left: `${cursorPosition.x}%`,
            top: `${cursorPosition.y}%`,
          }}
        >
          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-1.5
              w-1.5
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-white
            "
          />
        </div>
      )}

      {/* GESTURE STATUS */}
      <div
        className="
          pointer-events-none
          fixed
          bottom-5
          right-5
          z-[99990]
          rounded-full
          border
          border-white/10
          bg-black/70
          px-4
          py-2
          font-mono
          text-[10px]
          uppercase
          tracking-[0.18em]
          text-white/50
          backdrop-blur-xl
        "
      >
        {GESTURE_LABELS[gesture]}
      </div>
    </>
  );
}
