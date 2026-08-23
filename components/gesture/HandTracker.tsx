"use client";

import { useEffect, useRef, useState } from "react";

import {
  FilesetResolver,
  HandLandmarker,
  HandLandmarkerResult,
} from "@mediapipe/tasks-vision";

import {
  classifyGesture,
  type Gesture,
} from "./GestureClassifier";

interface HandTrackerProps {
  onGesture?: (
    gesture: Gesture
  ) => void;

  onCursorMove?: (
    x: number,
    y: number
  ) => void;
}

export default function HandTracker({
    onGesture,
    onCursorMove,
}: HandTrackerProps) {
  const videoRef =
    useRef<HTMLVideoElement | null>(null);

  const canvasRef =
    useRef<HTMLCanvasElement | null>(null);

  const handLandmarkerRef =
    useRef<HandLandmarker | null>(null);

  const animationFrameRef =
    useRef<number | null>(null);

  const streamRef =
    useRef<MediaStream | null>(null);

  const [status, setStatus] =
    useState("Starting...");

  const [error, setError] =
    useState<string | null>(null);

  const [handDetected, setHandDetected] =
    useState(false);

  const [gesture, setGesture] =
    useState<Gesture>("UNKNOWN");

  useEffect(() => {
    let mounted = true;

    const start = async () => {
      try {
        /*
         * ==========================================
         * 1. CAMERA
         * ==========================================
         */

        setStatus("Requesting camera...");

        if (
          !navigator.mediaDevices ||
          !navigator.mediaDevices.getUserMedia
        ) {
          throw new Error(
            "Camera API is not available in this browser."
          );
        }

        const stream =
          await navigator.mediaDevices.getUserMedia({
            video: {
              width: {
                ideal: 1280,
              },
              height: {
                ideal: 720,
              },
              facingMode: "user",
            },
            audio: false,
          });

        if (!mounted) {
          stream
            .getTracks()
            .forEach((track) =>
              track.stop()
            );

          return;
        }

        streamRef.current = stream;

        const video = videoRef.current;

        if (!video) {
          throw new Error(
            "Video element is not available."
          );
        }

        video.srcObject = stream;

        await new Promise<void>(
          (resolve) => {
            if (
              video.readyState >= 1
            ) {
              resolve();
              return;
            }

            video.onloadedmetadata = () => {
              resolve();
            };
          }
        );

        await video.play();

        if (!mounted) {
          return;
        }

        console.log(
          "[Gesture] Camera started"
        );

        /*
         * ==========================================
         * 2. MEDIAPIPE WASM
         * ==========================================
         */

        setStatus(
          "Loading hand tracking..."
        );

        const vision =
          await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
          );

        if (!mounted) {
          return;
        }

        console.log(
          "[Gesture] Vision runtime loaded"
        );

        /*
         * ==========================================
         * 3. HAND LANDMARKER
         * ==========================================
         *
         * CPU is intentionally used first.
         *
         * We already confirmed this configuration
         * successfully initializes in your browser.
         */

        const handLandmarker =
          await HandLandmarker.createFromOptions(
            vision,
            {
              baseOptions: {
                modelAssetPath:
                  "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",

                delegate: "CPU",
              },

              runningMode: "VIDEO",

              numHands: 1,

              minHandDetectionConfidence: 0.5,

              minHandPresenceConfidence: 0.5,

              minTrackingConfidence: 0.5,
            }
          );

        if (!mounted) {
          handLandmarker.close();
          return;
        }

        handLandmarkerRef.current =
          handLandmarker;

        console.log(
          "[Gesture] Hand landmarker initialized"
        );

        setStatus("Tracking active");

        /*
         * ==========================================
         * 4. DETECTION LOOP
         * ==========================================
         */

        let lastVideoTime = -1;

        const detect = () => {
          if (!mounted) {
            return;
          }

          const currentVideo =
            videoRef.current;

          const landmarker =
            handLandmarkerRef.current;

          /*
           * If something isn't ready yet,
           * keep the loop alive.
           */

          if (
            !currentVideo ||
            !landmarker
          ) {
            animationFrameRef.current =
              requestAnimationFrame(
                detect
              );

            return;
          }

          /*
           * Only process a new video frame.
           */

          if (
            currentVideo.readyState >= 2 &&
            currentVideo.currentTime !==
              lastVideoTime
          ) {
            lastVideoTime =
              currentVideo.currentTime;

            try {
              /*
               * Run MediaPipe.
               */

              const result: HandLandmarkerResult =
                landmarker.detectForVideo(
                  currentVideo,
                  performance.now()
                );

              /*
               * Draw landmarks.
               */

              drawResults(result);

              /*
               * Determine whether a hand
               * exists in the frame.
               */

              const detected =
                result.landmarks.length > 0;

              setHandDetected(
                detected
              );

              /*
               * Classify the gesture.
               */

              if (detected) {
  const landmarks =
    result.landmarks[0];

  const detectedGesture =
    classifyGesture(
      landmarks
    );

  setGesture(
    detectedGesture
  );

  /*
   * Send gesture to parent.
   */

  onGesture?.(
    detectedGesture
  );

  /*
   * Index fingertip = landmark 8.
   */

  const indexTip =
    landmarks[8];

  onCursorMove?.(
    indexTip.x,
    indexTip.y
  );
} else {
  setGesture(
    "UNKNOWN"
  );
}
            } catch (
              trackingError
            ) {
              console.error(
                "[Gesture] Detection error:",
                trackingError
              );
            }
          }

          /*
           * Continue tracking.
           */

          animationFrameRef.current =
            requestAnimationFrame(
              detect
            );
        };

        detect();
      } catch (err) {
        console.error(
          "[Gesture] STARTUP ERROR:",
          err
        );

        const message =
          err instanceof Error
            ? err.message
            : String(err);

        if (mounted) {
          setError(message);
          setStatus("Failed");
        }
      }
    };

    void start();

    /*
     * ==========================================
     * CLEANUP
     * ==========================================
     */

    return () => {
      mounted = false;

      /*
       * Stop animation loop.
       */

      if (
        animationFrameRef.current !==
        null
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );

        animationFrameRef.current =
          null;
      }

      /*
       * Close MediaPipe.
       */

      if (
        handLandmarkerRef.current
      ) {
        try {
          handLandmarkerRef.current.close();
        } catch {
          // Ignore cleanup errors.
        }

        handLandmarkerRef.current =
          null;
      }

      /*
       * Stop camera.
       */

      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) =>
            track.stop()
          );

        streamRef.current = null;
      }

      /*
       * Detach video.
       */

      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.srcObject =
          null;
      }
    };
  }, []);

  /*
   * ==========================================
   * DRAW HAND LANDMARKS
   * ==========================================
   */

  const drawResults = (
    result: HandLandmarkerResult
  ) => {
    const video =
      videoRef.current;

    const canvas =
      canvasRef.current;

    if (!video || !canvas) {
      return;
    }

    const ctx =
      canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    /*
     * Match canvas to actual camera
     * resolution.
     */

    canvas.width =
      video.videoWidth;

    canvas.height =
      video.videoHeight;

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    /*
     * Hand connections.
     */

    const connections: [
      number,
      number
    ][] = [
      // Thumb
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],

      // Index
      [0, 5],
      [5, 6],
      [6, 7],
      [7, 8],

      // Middle
      [5, 9],
      [9, 10],
      [10, 11],
      [11, 12],

      // Ring
      [9, 13],
      [13, 14],
      [14, 15],
      [15, 16],

      // Pinky
      [13, 17],
      [17, 18],
      [18, 19],
      [19, 20],

      // Palm
      [0, 17],
    ];

    /*
     * Draw every detected hand.
     */

    for (
      const landmarks of result.landmarks
    ) {
      /*
       * Connections
       */

      ctx.beginPath();

      ctx.lineWidth = 3;

      ctx.strokeStyle =
        "#ffffff";

      for (
        const [start, end] of connections
      ) {
        const startPoint =
          landmarks[start];

        const endPoint =
          landmarks[end];

        if (
          !startPoint ||
          !endPoint
        ) {
          continue;
        }

        ctx.moveTo(
          startPoint.x *
            canvas.width,
          startPoint.y *
            canvas.height
        );

        ctx.lineTo(
          endPoint.x *
            canvas.width,
          endPoint.y *
            canvas.height
        );
      }

      ctx.stroke();

      /*
       * Landmark points
       */

      for (
        const point of landmarks
      ) {
        ctx.beginPath();

        ctx.fillStyle =
          "#ffffff";

        ctx.arc(
          point.x *
            canvas.width,
          point.y *
            canvas.height,
          6,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }
    }
  };

  /*
   * ==========================================
   * UI
   * ==========================================
   */

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#050505",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "min(100%, 1100px)",
        }}
      >
        {/* HEADER */}

        <div
          style={{
            marginBottom: "20px",
            fontFamily:
              "monospace",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              opacity: 0.5,
              marginBottom: "8px",
            }}
          >
            PORTFOLIO OS / GESTURE SYSTEM
          </div>

          <div
            style={{
              fontSize: "24px",
              fontWeight: 600,
            }}
          >
            Hand Tracking Test
          </div>
        </div>

        {/* CAMERA */}

        <div
          style={{
            position:
              "relative",

            width: "100%",

            aspectRatio:
              "16 / 9",

            overflow:
              "hidden",

            background:
              "#111",

            border:
              "1px solid #333",
          }}
        >
          {/* VIDEO */}

          <video
            ref={videoRef}
            muted
            playsInline
            autoPlay
            style={{
              position:
                "absolute",

              inset: 0,

              width: "100%",

              height: "100%",

              objectFit:
                "cover",

              transform:
                "scaleX(-1)",
            }}
          />

          {/* LANDMARK CANVAS */}

          <canvas
            ref={canvasRef}
            style={{
              position:
                "absolute",

              inset: 0,

              width: "100%",

              height: "100%",

              objectFit:
                "cover",

              transform:
                "scaleX(-1)",

              pointerEvents:
                "none",
            }}
          />

          {/* STATUS */}

          <div
            style={{
              position:
                "absolute",

              left: "16px",

              bottom: "16px",

              padding:
                "10px 14px",

              background:
                "rgba(0,0,0,0.75)",

              border:
                "1px solid #333",

              fontFamily:
                "monospace",

              fontSize: "13px",
            }}
          >
            STATUS: {status}
          </div>

          {/* HAND + GESTURE STATUS */}

          <div
            style={{
              position:
                "absolute",

              right: "16px",

              bottom: "16px",

              padding:
                "10px 14px",

              background:
                "rgba(0,0,0,0.75)",

              border:
                "1px solid #333",

              fontFamily:
                "monospace",

              fontSize: "13px",

              textAlign:
                "right",

              minWidth:
                "180px",
            }}
          >
            <div>
              HAND:{" "}
              {handDetected
                ? "DETECTED"
                : "NOT DETECTED"}
            </div>

            <div
              style={{
                marginTop:
                  "6px",

                fontSize:
                  "18px",

                fontWeight: 700,
              }}
            >
              {gesture}
            </div>
          </div>
        </div>

        {/* ERROR */}

        {error && (
          <div
            style={{
              marginTop:
                "20px",

              padding:
                "16px",

              background:
                "#160808",

              border:
                "1px solid #5c2020",

              color:
                "#ff8a8a",

              fontFamily:
                "monospace",

              fontSize:
                "13px",

              whiteSpace:
                "pre-wrap",
            }}
          >
            <strong>
              ERROR
            </strong>

            {"\n\n"}

            {error}
          </div>
        )}

        {/* GESTURE GUIDE */}

        <div
          style={{
            marginTop:
              "20px",

            display:
              "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(140px, 1fr))",

            gap: "10px",

            fontFamily:
              "monospace",
          }}
        >
          <div
            style={{
              padding:
                "14px",

              border:
                "1px solid #222",

              background:
                "#0b0b0b",
            }}
          >
            ✋
            <br />
            OPEN_PALM
          </div>

          <div
            style={{
              padding:
                "14px",

              border:
                "1px solid #222",

              background:
                "#0b0b0b",
            }}
          >
            ✊
            <br />
            FIST
          </div>

          <div
            style={{
              padding:
                "14px",

              border:
                "1px solid #222",

              background:
                "#0b0b0b",
            }}
          >
            ☝️
            <br />
            POINT
          </div>

          <div
            style={{
              padding:
                "14px",

              border:
                "1px solid #222",

              background:
                "#0b0b0b",
            }}
          >
            ✌️
            <br />
            PEACE
          </div>

          <div
            style={{
              padding:
                "14px",

              border:
                "1px solid #222",

              background:
                "#0b0b0b",
            }}
          >
            👍
            <br />
            THUMBS_UP
          </div>
        </div>
      </div>
    </div>
  );
}