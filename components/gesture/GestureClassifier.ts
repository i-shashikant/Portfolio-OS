import type { NormalizedLandmark } from "@mediapipe/tasks-vision";

export type Gesture =
  | "OPEN_PALM"
  | "FIST"
  | "POINT"
  | "PEACE"
  | "THUMBS_UP"
  | "CALL_ME"
  | "ROCK"
  | "UNKNOWN";

const WRIST = 0;

const THUMB_IP = 3;
const THUMB_TIP = 4;

const INDEX_PIP = 6;
const INDEX_TIP = 8;

const MIDDLE_PIP = 10;
const MIDDLE_TIP = 12;

const RING_PIP = 14;
const RING_TIP = 16;

const PINKY_PIP = 18;
const PINKY_TIP = 20;

const INDEX_MCP = 5;

function distance(
  a: NormalizedLandmark,
  b: NormalizedLandmark
): number {
  return Math.sqrt(
    Math.pow(a.x - b.x, 2) +
      Math.pow(a.y - b.y, 2) +
      Math.pow(a.z - b.z, 2)
  );
}

function isFingerExtended(
  landmarks: NormalizedLandmark[],
  tipIndex: number,
  pipIndex: number
): boolean {
  const wrist = landmarks[WRIST];

  const tipDistance = distance(
    landmarks[tipIndex],
    wrist
  );

  const pipDistance = distance(
    landmarks[pipIndex],
    wrist
  );

  /*
   * Slightly relaxed ratio (was 1.15) — 1.15 was
   * borderline strict enough that a finger held at
   * a natural, not-perfectly-straight angle would
   * intermittently read as "not extended", causing
   * gesture flicker.
   */

  return tipDistance > pipDistance * 1.1;
}

function isThumbExtended(
  landmarks: NormalizedLandmark[]
): boolean {
  const thumbTip = landmarks[THUMB_TIP];
  const thumbIP = landmarks[THUMB_IP];
  const indexMCP = landmarks[INDEX_MCP];

  const tipDistance = distance(
    thumbTip,
    indexMCP
  );

  const ipDistance = distance(
    thumbIP,
    indexMCP
  );

  return tipDistance > ipDistance * 1.15;
}

export function classifyGesture(
  landmarks: NormalizedLandmark[]
): Gesture {
  if (!landmarks || landmarks.length < 21) {
    return "UNKNOWN";
  }

  const thumb = isThumbExtended(landmarks);

  const index = isFingerExtended(
    landmarks,
    INDEX_TIP,
    INDEX_PIP
  );

  const middle = isFingerExtended(
    landmarks,
    MIDDLE_TIP,
    MIDDLE_PIP
  );

  const ring = isFingerExtended(
    landmarks,
    RING_TIP,
    RING_PIP
  );

  const pinky = isFingerExtended(
    landmarks,
    PINKY_TIP,
    PINKY_PIP
  );

  /*
   * ✋ OPEN PALM
   *
   * Four main fingers extended. Thumb is
   * NOT required — thumb-extension is the
   * least reliable of the five signals, so
   * gating a 5-way AND on it made OPEN_PALM
   * nearly impossible to trigger consistently.
   */
  if (
    index &&
    middle &&
    ring &&
    pinky
  ) {
    return "OPEN_PALM";
  }

  /*
   * ✊ FIST
   *
   * All fingers closed.
   */
  if (
    !thumb &&
    !index &&
    !middle &&
    !ring &&
    !pinky
  ) {
    return "FIST";
  }

  /*
   * ☝️ POINT
   *
   * Only index finger extended.
   */
  if (
    index &&
    !middle &&
    !ring &&
    !pinky
  ) {
    return "POINT";
  }

  /*
   * ✌️ PEACE
   *
   * Index + middle extended.
   */
  if (
    index &&
    middle &&
    !ring &&
    !pinky
  ) {
    return "PEACE";
  }

  /*
   * 👍 THUMBS UP
   *
   * Only thumb extended.
   */
  if (
    thumb &&
    !index &&
    !middle &&
    !ring &&
    !pinky
  ) {
    return "THUMBS_UP";
  }

  /*
   * 🤙 CALL ME
   *
   * Thumb + pinky extended, index/middle/ring curled.
   */
  if (
    thumb &&
    !index &&
    !middle &&
    !ring &&
    pinky
  ) {
    return "CALL_ME";
  }

  /*
   * 🤟 ROCK
   *
   * Index + pinky extended, middle/ring curled.
   * (Thumb can be either way — some people tuck it,
   * some don't, so we don't gate on it.)
   */
  if (
    index &&
    !middle &&
    !ring &&
    pinky
  ) {
    return "ROCK";
  }

  return "UNKNOWN";
}