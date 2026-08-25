import type { Gesture } from "./GestureClassifier";

export type GestureEventType =
  | "ACTIVATE"
  | "SELECT"
  | "CURSOR"
  | "OPEN_INTERFACE"
  | "GO_CONTACT"
  | "DEV_MODE"
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
    /*
     * OPEN PALM
     * Used for scrolling/navigation.
     */

    case "OPEN_PALM":
      return {
        type: "ACTIVATE",
        gesture,
        timestamp,
      };

    /*
     * THUMBS UP
     * Used for selection/click.
     */

    case "THUMBS_UP":
      return {
        type: "SELECT",
        gesture,
        timestamp,
      };

    /*
     * POINT
     * Used for cursor movement.
     */

    case "POINT":
      return {
        type: "CURSOR",
        gesture,
        timestamp,
      };

    /*
     * PEACE
     * Reserved for future interaction.
     */

    case "PEACE":
      return {
        type: "OPEN_INTERFACE",
        gesture,
        timestamp,
      };

    /*
     * FIST
     * No longer used as a click.
     */

    case "FIST":
      return {
        type: "NONE",
        gesture,
        timestamp,
      };

    /*
     * CALL ME
     * Jumps to the contact section.
     */

    case "CALL_ME":
      return {
        type: "GO_CONTACT",
        gesture,
        timestamp,
      };

    /*
     * ROCK
     * Toggles the developer-mode easter egg.
     */

    case "ROCK":
      return {
        type: "DEV_MODE",
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