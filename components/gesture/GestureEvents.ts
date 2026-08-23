import type { Gesture } from "./GestureClassifier";

export type GestureEventType =
  | "ACTIVATE"
  | "SELECT"
  | "CURSOR"
  | "OPEN_INTERFACE"
  | "NONE";

export interface GestureEvent {
  type: GestureEventType;
  gesture: Gesture;
  timestamp: number;
}

export function gestureToEvent(
  gesture: Gesture
): GestureEvent {
  const timestamp = performance.now();

  switch (gesture) {
    case "OPEN_PALM":
      return {
        type: "ACTIVATE",
        gesture,
        timestamp,
      };

    case "FIST":
      return {
        type: "SELECT",
        gesture,
        timestamp,
      };

    case "POINT":
      return {
        type: "CURSOR",
        gesture,
        timestamp,
      };

    case "PEACE":
      return {
        type: "OPEN_INTERFACE",
        gesture,
        timestamp,
      };

    case "THUMBS_UP":
      return {
        type: "NONE",
        gesture,
        timestamp,
      };

    default:
      return {
        type: "NONE",
        gesture,
        timestamp,
      };
  }
}