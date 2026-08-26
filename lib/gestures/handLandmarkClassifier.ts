export type NormalizedLandmark = {
  x: number;
  y: number;
  z: number;
};

export type HandGestureType =
  | 'CURSOR_POINT'
  | 'THUMBS_UP'
  | 'SWIPE_DOWN'
  | 'SWIPE_UP'
  | 'SWIPE_RIGHT'
  | 'SWIPE_LEFT'
  | 'CLOSED_FIST'
  | 'CALL_ME'
  | 'ROCK_SIGN'
  | 'OPEN_PALM'
  | 'NONE';

export interface FingerStates {
  thumb: boolean;
  index: boolean;
  middle: boolean;
  ring: boolean;
  pinky: boolean;
}

export interface VelocityVector {
  vx: number;
  vy: number;
}

// MediaPipe Landmark Index Map:
// 0: Wrist
// 1-4: Thumb (CMC, MCP, IP, Tip)
// 5-8: Index (MCP, PIP, DIP, Tip)
// 9-12: Middle (MCP, PIP, DIP, Tip)
// 13-16: Ring (MCP, PIP, DIP, Tip)
// 17-20: Pinky (MCP, PIP, DIP, Tip)

export function getFingerStates(landmarks: NormalizedLandmark[]): FingerStates {
  if (!landmarks || landmarks.length < 21) {
    return { thumb: false, index: false, middle: false, ring: false, pinky: false };
  }

  const wrist = landmarks[0];

  // Helper distance check
  const dist = (a: NormalizedLandmark, b: NormalizedLandmark) =>
    Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);

  // Finger extension is calculated by comparing tip distance to wrist vs MCP distance to wrist
  const indexExtended = dist(landmarks[8], wrist) > dist(landmarks[6], wrist) && landmarks[8].y < landmarks[6].y;
  const middleExtended = dist(landmarks[12], wrist) > dist(landmarks[10], wrist) && landmarks[12].y < landmarks[10].y;
  const ringExtended = dist(landmarks[16], wrist) > dist(landmarks[14], wrist) && landmarks[16].y < landmarks[14].y;
  const pinkyExtended = dist(landmarks[20], wrist) > dist(landmarks[18], wrist) && landmarks[20].y < landmarks[18].y;

  // Thumb is extended if tip is far from index MCP (landmark 5) and extended outward
  const thumbExtended = dist(landmarks[4], landmarks[17]) > dist(landmarks[3], landmarks[17]);

  return {
    thumb: thumbExtended,
    index: indexExtended,
    middle: middleExtended,
    ring: ringExtended,
    pinky: pinkyExtended,
  };
}

export function classifyStaticGesture(
  landmarks: NormalizedLandmark[],
  fingers: FingerStates
): HandGestureType {
  if (!landmarks || landmarks.length < 21) return 'NONE';

  const wrist = landmarks[0];
  const thumbTip = landmarks[4];

  const { thumb, index, middle, ring, pinky } = fingers;

  // 1. Thumbs Up (👍) - Select / Confirm
  // Thumb extended upward (y < wrist.y), other 4 fingers folded
  const thumbPointingUp = thumbTip.y < landmarks[2].y && thumbTip.y < wrist.y;
  if (thumbPointingUp && !index && !middle && !ring && !pinky) {
    return 'THUMBS_UP';
  }

  // 2. Closed Fist (✊) - Go Home / Close Overlay
  // All fingers folded close to palm
  if (!thumb && !index && !middle && !ring && !pinky) {
    return 'CLOSED_FIST';
  }

  // 4. Call-Me Sign (🤙) - Go to Contact
  // Thumb and Pinky extended, Index, Middle, Ring folded
  if (thumb && pinky && !index && !middle && !ring) {
    return 'CALL_ME';
  }

  // 5. Rock Sign (🤘) - Developer Mode Easter Egg
  // Index and Pinky extended, Middle and Ring folded
  if (index && pinky && !middle && !ring) {
    return 'ROCK_SIGN';
  }

  // 6. Open Palm - Candidate for Scroll Swipes
  if (index && middle && ring && pinky) {
    return 'OPEN_PALM';
  }

  // 7. Point (Index extended) - Candidate for Cursor & Point Swipes
  if (index && !middle && !ring && !pinky) {
    return 'CURSOR_POINT';
  }

  return 'NONE';
}

export class SwipeDetector {
  private history: { x: number; y: number; time: number }[] = [];

  public update(point: { x: number; y: number }): VelocityVector {
    const now = performance.now();
    this.history.push({ x: point.x, y: point.y, time: now });

    // Keep history for last 300ms
    this.history = this.history.filter((h) => now - h.time < 300);

    if (this.history.length < 3) return { vx: 0, vy: 0 };

    const first = this.history[0];
    const last = this.history[this.history.length - 1];
    const dt = (last.time - first.time) / 1000;

    if (dt <= 0) return { vx: 0, vy: 0 };

    return {
      vx: (last.x - first.x) / dt,
      vy: (last.y - first.y) / dt,
    };
  }

  public clear() {
    this.history = [];
  }
}
