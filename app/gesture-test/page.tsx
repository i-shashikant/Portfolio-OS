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

  const [clickFlash, setClickFlash] =
    useState(false);

  const [cursorPosition, setCursorPosition] =
    useState({
      x: 50,
      y: 50,
    });

  /*
   * ==========================================
   * SMOOTH CURSOR
   * ==========================================
   */

  const smoothCursor = useRef({
    x: 50,
    y: 50,
  });

  /*
   * ==========================================
   * GESTURE HANDLER
   * ==========================================
   */

  const handleGesture = (
    gesture: Parameters<
      typeof processGesture
    >[0]
  ) => {
    processGesture(gesture);

    /*
     * Visual feedback when FIST is detected.
     */

    if (gesture === "FIST") {
      setClickFlash(true);

      window.setTimeout(() => {
        setClickFlash(false);
      }, 180);
    }
  };

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
     * The camera preview is mirrored.
     *
     * Therefore we invert MediaPipe's X.
     */

    const targetX =
      (1 - x) * 100;

    const targetY =
      y * 100;

    /*
     * Cursor smoothing.
     *
     * 0.4 gives us a good balance between
     * responsiveness and stability.
     */

    const smoothing = 0.4;

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
  };

  /*
   * ==========================================
   * PAGE
   * ==========================================
   */

  return (
    <>
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
          onGesture={handleGesture}
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
            CLICK FLASH
            ===================================== */}

        {clickFlash && (
          <div
            style={{
              position: "fixed",

              left:
                `${cursorPosition.x}%`,

              top:
                `${cursorPosition.y}%`,

              width: "60px",

              height: "60px",

              border:
                "2px solid white",

              borderRadius:
                "50%",

              transform:
                "translate(-50%, -50%)",

              pointerEvents:
                "none",

              zIndex: 100000,

              animation:
                "gestureClick 180ms ease-out",
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

            zIndex: 100001,

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

      {/* =======================================
          CLICK ANIMATION
          ======================================= */}

      <style jsx>{`
        @keyframes gestureClick {
          0% {
            transform:
              translate(-50%, -50%)
              scale(0.4);

            opacity: 1;
          }

          100% {
            transform:
              translate(-50%, -50%)
              scale(1.4);

            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}