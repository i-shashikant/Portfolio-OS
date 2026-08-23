"use client";

import { useCallback, useRef, useState } from "react";

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
    });

  const lastGestureRef =
    useRef<Gesture>("UNKNOWN");

  const lastEventTimeRef =
    useRef(0);

  /*
   * Prevent gestures from firing
   * continuously every frame.
   */

  const EVENT_COOLDOWN = 700;

  const processGesture = useCallback(
    (
      gesture: Gesture,
      cursor?: CursorPosition
    ) => {
      const now = performance.now();

      setState((previous) => ({
        ...previous,
        gesture,
        cursor:
          cursor ?? previous.cursor,
      }));

      /*
       * POINT is continuous cursor mode,
       * so it doesn't need a click cooldown.
       */

      if (gesture === "POINT") {
        setState((previous) => ({
          ...previous,
          active: true,
        }));

        lastGestureRef.current =
          gesture;

        return;
      }

      /*
       * Ignore UNKNOWN.
       */

      if (gesture === "UNKNOWN") {
        return;
      }

      /*
       * Don't repeatedly trigger the
       * same gesture.
       */

      if (
        gesture ===
        lastGestureRef.current &&
        now - lastEventTimeRef.current <
          EVENT_COOLDOWN
      ) {
        return;
      }

      const event =
        gestureToEvent(gesture);

      lastGestureRef.current =
        gesture;

      lastEventTimeRef.current =
        now;

      setState((previous) => ({
        ...previous,

        active:
          gesture === "OPEN_PALM"
            ? true
            : previous.active,

        lastEvent: event,
      }));

      /*
       * Development logging.
       */

      console.log(
        "[Gesture Control]",
        event
      );
    },
    []
  );

  const deactivate = useCallback(() => {
    setState((previous) => ({
      ...previous,
      active: false,
    }));
  }, []);

  return {
    ...state,
    processGesture,
    deactivate,
  };
}