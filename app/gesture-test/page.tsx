"use client";

import { useRef, useState } from "react";

import HandTracker from "@/components/gesture/HandTracker";

import {
  useGestureControl,
} from "@/hooks/useGestureControl";

export default function GestureTestPage() {
  const {
    active,
    gesture,
    lastEvent,
    processGesture,
  } = useGestureControl();

  const [cursorPosition, setCursorPosition] =
    useState({
      x: 50,
      y: 50,
    });

  /*
   * Smoothed cursor position.
   *
   * We keep this in a ref so the smoothing
   * value survives between frames without
   * causing extra React renders.
   */
  const smoothCursor = useRef({
    x: 50,
    y: 50,
  });

  /*
   * ==========================================
   * CURSOR MOVEMENT
   * ==========================================
   */

  const handleCursorMove = (
    x: number,
    y: number
  ) => {
    /*
     * MediaPipe X is opposite to our
     * mirrored camera preview.
     *
     * Therefore:
     *
     *     targetX = 1 - x
     *
     * Y does not need to be inverted.
     */

    const targetX =
      (1 - x) * 100;

    const targetY =
      y * 100;

    /*
     * Exponential smoothing.
     *
     * Lower = smoother/slower
     * Higher = faster/more responsive
     */

    const smoothing = 0.25;

    smoothCursor.current.x +=
      (targetX -
        smoothCursor.current.x) *
      smoothing;

    smoothCursor.current.y +=
      (targetY -
        smoothCursor.current.y) *
      smoothing;

    /*
     * Update the visible cursor.
     */

    setCursorPosition({
      x: smoothCursor.current.x,
      y: smoothCursor.current.y,
    });
  };

  /*
   * ==========================================
   * PAGE
   * ==========================================
   */

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#050505",
      }}
    >
      {/* =====================================
          HAND TRACKER
          ===================================== */}

      <HandTracker
        onGesture={processGesture}
        onCursorMove={handleCursorMove}
      />

      {/* =====================================
          VIRTUAL CURSOR
          ===================================== */}

      {active &&
        gesture === "POINT" && (
          <div
            style={{
              position: "fixed",

              left:
                `${cursorPosition.x}%`,

              top:
                `${cursorPosition.y}%`,

              width: "24px",
              height: "24px",

              border:
                "2px solid white",

              borderRadius:
                "50%",

              transform:
                "translate(-50%, -50%)",

              pointerEvents:
                "none",

              zIndex: 99999,

              boxShadow:
                "0 0 20px rgba(255,255,255,0.8)",

              transition:
                "transform 0.05s linear",
            }}
          />
        )}

      {/* =====================================
          DEBUG PANEL
          ===================================== */}

      <div
        style={{
          position: "fixed",

          top: "20px",

          right: "20px",

          padding: "16px",

          background:
            "rgba(0,0,0,0.85)",

          border:
            "1px solid #333",

          color: "white",

          fontFamily:
            "monospace",

          fontSize: "13px",

          lineHeight: 1.7,

          zIndex: 100000,

          minWidth: "220px",
        }}
      >
        <div>
          GESTURE:{" "}
          {gesture}
        </div>

        <div>
          ACTIVE:{" "}
          {active
            ? "YES"
            : "NO"}
        </div>

        <div>
          CURSOR:{" "}
          {Math.round(
            cursorPosition.x
          )}
          % ×{" "}
          {Math.round(
            cursorPosition.y
          )}
          %
        </div>

        <div>
          EVENT:{" "}
          {lastEvent?.type ??
            "NONE"}
        </div>
      </div>
    </div>
  );
}