"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import HandTracker from "./HandTracker";

import { usePortfolio } from "@/stores/portfolio-store";

import type { Gesture } from "./GestureClassifier";

export default function GestureController() {
  const { gesturesEnabled } =
    usePortfolio();

  const [gesture, setGesture] =
    useState<Gesture>("UNKNOWN");

  const [cursorPosition, setCursorPosition] =
    useState({
      x: 50,
      y: 50,
    });

  /*
   * ==========================================
   * CURSOR SMOOTHING
   * ==========================================
   */

  const smoothCursor = useRef({
    x: 50,
    y: 50,
  });

  /*
   * ==========================================
   * THUMBS UP CLICK CONTROL
   * ==========================================
   */

  const thumbsUpActive =
    useRef(false);

  const lastClickTime =
    useRef(0);

  const CLICK_COOLDOWN = 700;

  /*
   * ==========================================
   * PINCH SCROLL CONTROL
   * ==========================================
   *
   * We use two thresholds.
   *
   * ENTER:
   *   distance < 0.055
   *
   * EXIT:
   *   distance > 0.070
   *
   * This prevents the pinch state from
   * flickering when MediaPipe coordinates
   * move slightly from frame to frame.
   */

  const pinchActive =
    useRef(false);

  const lastPinchY =
    useRef<number | null>(null);

  const PINCH_ENTER_DISTANCE = 0.055;

  const PINCH_EXIT_DISTANCE = 0.070;

  /*
   * ==========================================
   * SCROLL TUNING
   * ==========================================
   */

  const SCROLL_DEAD_ZONE = 0.0035;

  const SCROLL_SPEED = 1800;

  /*
   * ==========================================
   * SCROLL FRAME QUEUE
   * ==========================================
   *
   * We don't call window.scrollBy()
   * directly from every MediaPipe frame.
   *
   * Instead, we collect the movement and
   * apply it once per browser animation frame.
   */

  const pendingScroll =
    useRef(0);

  const scrollFrame =
    useRef<number | null>(null);

  const queueScroll =
    useCallback((amount: number) => {
      pendingScroll.current += amount;

      if (
        scrollFrame.current !== null
      ) {
        return;
      }

      scrollFrame.current =
        requestAnimationFrame(() => {
          const amount =
            pendingScroll.current;

          pendingScroll.current = 0;

          scrollFrame.current = null;

          if (
            Math.abs(amount) < 0.01
          ) {
            return;
          }

          /*
           * Prevent a single noisy frame
           * from producing a huge jump.
           */

          const limitedAmount =
            Math.max(
              -40,
              Math.min(40, amount)
            );

          window.scrollBy({
            top: limitedAmount,
            behavior: "auto",
          });
        });
    }, []);

  /*
   * ==========================================
   * GESTURE HANDLER
   * ==========================================
   */

  const handleGesture = useCallback(
    (nextGesture: Gesture) => {
      /*
       * Don't cause a React render if the
       * gesture hasn't actually changed.
       */

      setGesture((current) =>
        current === nextGesture
          ? current
          : nextGesture
      );

      /*
       * ----------------------------------------
       * THUMBS UP = CLICK
       * ----------------------------------------
       */

      if (
        nextGesture === "THUMBS_UP"
      ) {
        const now =
          performance.now();

        if (
          !thumbsUpActive.current &&
          now -
            lastClickTime.current >
            CLICK_COOLDOWN
        ) {
          thumbsUpActive.current =
            true;

          lastClickTime.current =
            now;

          performVirtualClick();
        }

        /*
         * Reset pinch when changing to
         * thumbs-up.
         */

        pinchActive.current =
          false;

        lastPinchY.current =
          null;

        return;
      }

      /*
       * Leaving THUMBS_UP.
       */

      thumbsUpActive.current =
        false;
    },
    []
  );

  /*
   * ==========================================
   * CURSOR MOVEMENT
   * ==========================================
   */

  const handleCursorMove =
    useCallback(
      (
        x: number,
        y: number
      ) => {
        const targetX =
          (1 - x) * 100;

        const targetY =
          y * 100;

        /*
         * Keep the exact cursor smoothing
         * that was already working.
         */

        const smoothing = 0.75;

        smoothCursor.current.x +=
          (targetX -
            smoothCursor.current.x) *
          smoothing;

        smoothCursor.current.y +=
          (targetY -
            smoothCursor.current.y) *
          smoothing;

        setCursorPosition({
          x: smoothCursor.current.x,
          y: smoothCursor.current.y,
        });
      },
      []
    );

  /*
   * ==========================================
   * PINCH MOVEMENT
   * ==========================================
   *
   * Thumb tip = landmark 4
   * Index tip = landmark 8
   */

  const handlePinchMove =
    useCallback(
      (
        thumbX: number,
        thumbY: number,
        indexX: number,
        indexY: number
      ) => {
        /*
         * Calculate thumb/index distance.
         */

        const dx =
          thumbX - indexX;

        const dy =
          thumbY - indexY;

        const distance = Math.sqrt(
          dx * dx + dy * dy
        );

        /*
         * ----------------------------------------
         * PINCH ENTER
         * ----------------------------------------
         */

        if (
          !pinchActive.current &&
          distance <
            PINCH_ENTER_DISTANCE
        ) {
          pinchActive.current =
            true;

          /*
           * Start from current position.
           */

          lastPinchY.current =
            indexY;

          return;
        }

        /*
         * ----------------------------------------
         * PINCH EXIT
         * ----------------------------------------
         *
         * Notice that the exit threshold is
         * larger than the enter threshold.
         */

        if (
          pinchActive.current &&
          distance >
            PINCH_EXIT_DISTANCE
        ) {
          pinchActive.current =
            false;

          lastPinchY.current =
            null;

          return;
        }

        /*
         * Not pinching yet.
         */

        if (
          !pinchActive.current
        ) {
          return;
        }

        /*
         * Safety check.
         */

        if (
          lastPinchY.current === null
        ) {
          lastPinchY.current =
            indexY;

          return;
        }

        /*
         * ----------------------------------------
         * VERTICAL MOVEMENT
         * ----------------------------------------
         */

        const delta =
          indexY -
          lastPinchY.current;

        /*
         * Always update the reference,
         * even when the movement is too small.
         *
         * This prevents accumulated movement
         * from suddenly causing a large jump.
         */

        lastPinchY.current =
          indexY;

        /*
         * Ignore camera noise.
         */

        if (
          Math.abs(delta) <
          SCROLL_DEAD_ZONE
        ) {
          return;
        }

        /*
         * Queue the scroll instead of
         * executing it immediately.
         */

        queueScroll(
          delta * SCROLL_SPEED
        );
      },
      [queueScroll]
    );

  /*
   * ==========================================
   * VIRTUAL CLICK
   * ==========================================
   */

  const performVirtualClick =
    () => {
      const x =
        (smoothCursor.current.x /
          100) *
        window.innerWidth;

      const y =
        (smoothCursor.current.y /
          100) *
        window.innerHeight;

      const element =
        document.elementFromPoint(
          x,
          y
        );

      if (!element) {
        return;
      }

      /*
       * Prefer actual interactive
       * elements.
       */

      const clickable =
        element.closest(
          "button, a, [role='button'], [data-gesture-target]"
        ) as HTMLElement | null;

      if (clickable) {
        clickable.click();

        console.log(
          "[Gesture] THUMBS_UP CLICK:",
          clickable
        );

        return;
      }

      /*
       * Fallback.
       */

      if (
        element instanceof
        HTMLElement
      ) {
        element.click();

        console.log(
          "[Gesture] THUMBS_UP CLICK:",
          element
        );
      }
    };

  /*
   * ==========================================
   * CLEANUP
   * ==========================================
   */

  useEffect(() => {
    return () => {
      if (
        scrollFrame.current !== null
      ) {
        cancelAnimationFrame(
          scrollFrame.current
        );

        scrollFrame.current = null;
      }

      pendingScroll.current = 0;
    };
  }, []);

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
      {/* ======================================
          HAND TRACKER
          ====================================== */}

      <HandTracker
        compact
        onGesture={handleGesture}
        onCursorMove={
          handleCursorMove
        }
        onPinchMove={
          handlePinchMove
        }
      />

      {/* ======================================
          VIRTUAL CURSOR
          ====================================== */}

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

      {/* ======================================
          PINCH INDICATOR
          ====================================== */}

      {pinchActive.current && (
        <div
          className="
            pointer-events-none
            fixed
            bottom-5
            left-5
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
            text-white/60
            backdrop-blur-xl
          "
        >
          Pinch · Scroll
        </div>
      )}

      {/* ======================================
          GESTURE STATUS
          ====================================== */}

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
        Gesture:{" "}
        <span className="text-white/80">
          {gesture}
        </span>
      </div>
    </>
  );
}