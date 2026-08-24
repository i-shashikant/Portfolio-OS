"use client";

import { useCallback, useRef, useState } from "react";

import HandTracker from "./HandTracker";

import {
  usePortfolio,
} from "@/stores/portfolio-store";

import type {
  Gesture,
} from "./GestureClassifier";

export default function GestureController() {
  const {
    gesturesEnabled,
  } = usePortfolio();

  const [gesture, setGesture] =
    useState<Gesture>("UNKNOWN");

  const [cursorPosition, setCursorPosition] =
    useState({
      x: 50,
      y: 50,
    });

  /*
   * Smoothed cursor position.
   *
   * Ref is used so we don't create
   * unnecessary state between frames.
   */
  const smoothCursor = useRef({
    x: 50,
    y: 50,
  });

  /*
   * Prevent FIST from clicking
   * continuously every frame.
   */
  const fistActive = useRef(false);

  /*
   * Last click timestamp.
   */
  const lastClickTime = useRef(0);

  /*
   * ==========================================
   * GESTURE
   * ==========================================
   */

  const handleGesture = useCallback(
    (nextGesture: Gesture) => {
      setGesture(nextGesture);

      /*
       * ----------------------------------------
       * FIST = CLICK
       * ----------------------------------------
       */

      if (nextGesture === "FIST") {
        const now = performance.now();

        /*
         * Only trigger once when entering FIST.
         */
        if (
          !fistActive.current &&
          now - lastClickTime.current > 500
        ) {
          fistActive.current = true;
          lastClickTime.current = now;

          performVirtualClick();
        }

        return;
      }

      /*
       * Once the fist is released,
       * allow another click.
       */
      fistActive.current = false;
    },
    []
  );

  /*
   * ==========================================
   * CURSOR MOVEMENT
   * ==========================================
   */

  const handleCursorMove = useCallback(
    (
      x: number,
      y: number
    ) => {
      /*
       * MediaPipe coordinates:
       *
       * x = 0 → left
       * x = 1 → right
       *
       * Our camera is mirrored,
       * so horizontal direction needs
       * to be reversed.
       */

      const targetX =
        (1 - x) * 100;

      const targetY =
        y * 100;

      /*
       * Cursor smoothing.
       *
       * Higher = faster
       * Lower  = smoother
       */
      const smoothing = 0.75;

      smoothCursor.current.x +=
        (
          targetX -
          smoothCursor.current.x
        ) * smoothing;

      smoothCursor.current.y +=
        (
          targetY -
          smoothCursor.current.y
        ) * smoothing;

      setCursorPosition({
        x: smoothCursor.current.x,
        y: smoothCursor.current.y,
      });
    },
    []
  );

  /*
   * ==========================================
   * VIRTUAL CLICK
   * ==========================================
   */

  const performVirtualClick = () => {
    const x =
      (smoothCursor.current.x / 100) *
      window.innerWidth;

    const y =
      (smoothCursor.current.y / 100) *
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
     * Prefer actual interactive elements.
     */
    const clickable =
      element.closest(
        "button, a, [role='button'], [data-gesture-target]"
      ) as HTMLElement | null;

    if (clickable) {
      clickable.click();

      console.log(
        "[Gesture] Virtual click:",
        clickable
      );

      return;
    }

    /*
     * Fallback:
     *
     * If the element itself has a
     * click listener.
     */
    if (
      element instanceof HTMLElement
    ) {
      element.click();

      console.log(
        "[Gesture] Virtual click:",
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
        onGesture={handleGesture}
        onCursorMove={handleCursorMove}
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