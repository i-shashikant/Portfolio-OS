"use client";

import {
  useCallback,
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
   *
   * THUMBS_UP = SELECT
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
   * Thumb + index close together
   * = scrolling mode.
   */

  const pinchActive =
    useRef(false);

  const lastPinchY =
    useRef<number | null>(null);

  /*
   * Distance required for pinch.
   *
   * MediaPipe coordinates are normalized
   * between 0 and 1.
   */

  const PINCH_DISTANCE = 0.055;

  /*
   * Ignore tiny movements caused by
   * camera noise.
   */

  const SCROLL_DEAD_ZONE = 0.004;

  /*
   * Increase this for faster scrolling.
   */

  const SCROLL_SPEED = 1800;

  /*
   * ==========================================
   * GESTURE HANDLER
   * ==========================================
   */

  const handleGesture = useCallback(
    (nextGesture: Gesture) => {
      setGesture(nextGesture);

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

        /*
         * Only click once while
         * thumbs-up is held.
         */

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
         * Leaving any previous pinch
         * state when thumbs-up appears.
         */

        pinchActive.current =
          false;

        lastPinchY.current = null;

        return;
      }

      /*
       * Leaving THUMBS_UP allows the
       * next thumbs-up to click again.
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
        /*
         * MediaPipe X is mirrored
         * relative to the screen.
         */

        const targetX =
          (1 - x) * 100;

        const targetY =
          y * 100;

        /*
         * Higher = faster
         * Lower = smoother
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
         * Calculate distance between
         * thumb and index finger.
         */

        const dx =
          thumbX - indexX;

        const dy =
          thumbY - indexY;

        const distance = Math.sqrt(
          dx * dx + dy * dy
        );

        const isPinching =
          distance <
          PINCH_DISTANCE;

        /*
         * ----------------------------------------
         * NOT PINCHING
         * ----------------------------------------
         */

        if (!isPinching) {
          pinchActive.current =
            false;

          lastPinchY.current =
            null;

          return;
        }

        /*
         * ----------------------------------------
         * ENTER PINCH MODE
         * ----------------------------------------
         */

        if (!pinchActive.current) {
          pinchActive.current =
            true;

          /*
           * Use the current index position
           * as the starting reference.
           */

          lastPinchY.current =
            indexY;

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
         * CALCULATE VERTICAL MOVEMENT
         * ----------------------------------------
         */

        const delta =
          indexY -
          lastPinchY.current;

        /*
         * Ignore tiny movements.
         */

        if (
          Math.abs(delta) >
          SCROLL_DEAD_ZONE
        ) {
          /*
           * Positive MediaPipe Y =
           * hand moving downward.
           *
           * Therefore:
           *
           * hand down  → page down
           * hand up    → page up
           */

          window.scrollBy({
            top:
              delta *
              SCROLL_SPEED,

            behavior: "auto",
          });
        }

        /*
         * Store current position.
         */

        lastPinchY.current =
          indexY;
      },
      []
    );

  /*
   * ==========================================
   * VIRTUAL CLICK
   * ==========================================
   */

  const performVirtualClick =
    () => {
      /*
       * Convert percentage cursor
       * coordinates into pixels.
       */

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
            left-5
            bottom-5
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