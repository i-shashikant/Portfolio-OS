"use client";

import {
  useCallback,
  useRef,
  useState,
} from "react";

import type { Gesture } from "@/components/gesture/GestureClassifier";

import {
  gestureToEvent,
  type GestureEvent,
} from "@/components/gesture/GestureEvents";

interface CursorPosition {
  x: number;
  y: number;
}

interface GestureControlState {
  active: boolean;
  gesture: Gesture;
  cursor: CursorPosition;
  lastEvent: GestureEvent | null;
  clickCount: number;
}

export function useGestureControl() {
  const [state, setState] =
    useState<GestureControlState>({
      active: false,

      gesture: "UNKNOWN",

      cursor: {
        x: 0.5,
        y: 0.5,
      },

      lastEvent: null,

      clickCount: 0,
    });

  /*
   * ==========================================
   * GESTURE STABILITY
   * ==========================================
   */

  const currentGestureRef =
    useRef<Gesture>("UNKNOWN");

  const gestureStartTimeRef =
    useRef(0);

  /*
   * ==========================================
   * CLICK CONTROL
   * ==========================================
   */

  const lastClickTimeRef =
    useRef(0);

  const fistTriggeredRef =
    useRef(false);

  /*
   * FIST must remain stable for this
   * amount of time before clicking.
   */

  const FIST_HOLD_TIME = 180;

  /*
   * Minimum time between clicks.
   */

  const CLICK_COOLDOWN = 800;

  /*
   * ==========================================
   * PROCESS GESTURE
   * ==========================================
   */

  const processGesture = useCallback(
    (
      gesture: Gesture,
      cursor?: CursorPosition
    ) => {
      const now =
        performance.now();

      /*
       * Update visible state.
       */

      setState((previous) => ({
        ...previous,

        gesture,

        cursor:
          cursor ??
          previous.cursor,
      }));

      /*
       * ========================================
       * POINT
       * ========================================
       *
       * Pointing means cursor mode.
       */

      if (gesture === "POINT") {
        setState((previous) => ({
          ...previous,

          active: true,
        }));

        /*
         * Reset fist trigger so that the
         * next fist can click.
         */

        fistTriggeredRef.current =
          false;

        /*
         * Reset gesture stability timer.
         */

        currentGestureRef.current =
          gesture;

        gestureStartTimeRef.current =
          now;

        return;
      }

      /*
       * ========================================
       * UNKNOWN
       * ========================================
       */

      if (gesture === "UNKNOWN") {
        return;
      }

      /*
       * ========================================
       * GESTURE CHANGE
       * ========================================
       */

      if (
        gesture !==
        currentGestureRef.current
      ) {
        currentGestureRef.current =
          gesture;

        gestureStartTimeRef.current =
          now;

        /*
         * When leaving fist, allow a
         * future fist to click again.
         */

        if (
          gesture !== "FIST"
        ) {
          fistTriggeredRef.current =
            false;
        }
      }

      /*
       * ========================================
       * OPEN PALM
       * ========================================
       */

      if (
        gesture === "OPEN_PALM"
      ) {
        setState((previous) => ({
          ...previous,

          active: true,
        }));

        return;
      }

      /*
       * ========================================
       * FIST = SELECT
       * ========================================
       */

      if (
        gesture === "FIST"
      ) {
        const heldFor =
          now -
          gestureStartTimeRef.current;

        /*
         * Don't trigger repeatedly while
         * the fist is being held.
         */

        if (
          fistTriggeredRef.current
        ) {
          return;
        }

        /*
         * Require the fist to remain
         * stable for a short period.
         */

        if (
          heldFor <
          FIST_HOLD_TIME
        ) {
          return;
        }

        /*
         * Click cooldown.
         */

        if (
          now -
            lastClickTimeRef.current <
          CLICK_COOLDOWN
        ) {
          return;
        }

        /*
         * Mark click as triggered.
         */

        fistTriggeredRef.current =
          true;

        lastClickTimeRef.current =
          now;

        const event =
          gestureToEvent(
            "FIST"
          );

        /*
         * Fire browser click at the
         * current virtual cursor.
         */

        const element =
          document.elementFromPoint(
            state.cursor.x *
              window.innerWidth,

            state.cursor.y *
              window.innerHeight
          );

        if (
          element instanceof
          HTMLElement
        ) {
          element.click();
        }

        /*
         * Update UI.
         */

        setState((previous) => ({
          ...previous,

          lastEvent: event,

          clickCount:
            previous.clickCount +
            1,
        }));

        console.log(
          "[Gesture Control] CLICK",
          {
            x:
              state.cursor.x,

            y:
              state.cursor.y,
          }
        );

        return;
      }

      /*
       * ========================================
       * OTHER EVENTS
       * ========================================
       */

      const event =
        gestureToEvent(
          gesture
        );

      if (
        event.type !== "NONE"
      ) {
        setState((previous) => ({
          ...previous,

          lastEvent: event,
        }));

        console.log(
          "[Gesture Control]",
          event
        );
      }
    },
    [state.cursor]
  );

  /*
   * ==========================================
   * DEACTIVATE
   * ==========================================
   */

  const deactivate =
    useCallback(() => {
      setState((previous) => ({
        ...previous,

        active: false,
      }));

      currentGestureRef.current =
        "UNKNOWN";

      fistTriggeredRef.current =
        false;
    }, []);

  return {
    ...state,

    processGesture,

    deactivate,
  };
}