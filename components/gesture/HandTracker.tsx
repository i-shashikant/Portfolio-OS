"use client";

import { useEffect, useRef, useState } from "react";

import {
  FilesetResolver,
  HandLandmarker,
  type HandLandmarkerResult,
} from "@mediapipe/tasks-vision";

import {
  classifyGesture,
  type Gesture,
} from "./GestureClassifier";

interface HandTrackerProps {
  onGesture?: (gesture: Gesture) => void;

  onCursorMove?: (
    x: number,
    y: number
  ) => void;

  onPinchMove?: (
    thumbX: number,
    thumbY: number,
    indexX: number,
    indexY: number
  ) => void;

  compact?: boolean;
}

export default function HandTracker({
  onGesture,
  onCursorMove,
  onPinchMove,
  compact = false,
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

  const lastVideoTimeRef =
    useRef(-1);

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

    const createLandmarker =
      async (
        vision: Awaited<
          ReturnType<
            typeof FilesetResolver.forVisionTasks
          >
        >
      ) => {
        /*
         * ==========================================
         * TRY GPU FIRST
         * ==========================================
         */

        try {
          console.log(
            "[Gesture] Trying GPU..."
          );

          const gpuLandmarker =
            await HandLandmarker.createFromOptions(
              vision,
              {
                baseOptions: {
                  modelAssetPath:
                    "/models/hand_landmarker.task",

                  delegate: "GPU",
                },

                runningMode: "VIDEO",

                numHands: 1,

                minHandDetectionConfidence:
                  0.5,

                minHandPresenceConfidence:
                  0.5,

                minTrackingConfidence:
                  0.5,
              }
            );

          console.log(
            "[Gesture] GPU initialized"
          );

          return gpuLandmarker;
        } catch (gpuError) {
          console.warn(
            "[Gesture] GPU unavailable. Falling back to CPU.",
            gpuError
          );
        }

        /*
         * ==========================================
         * CPU FALLBACK
         * ==========================================
         */

        console.log(
          "[Gesture] Trying CPU..."
        );

        const cpuLandmarker =
          await HandLandmarker.createFromOptions(
            vision,
            {
              baseOptions: {
                modelAssetPath:
                  "/models/hand_landmarker.task",

                delegate: "CPU",
              },

              runningMode: "VIDEO",

              numHands: 1,

              minHandDetectionConfidence:
                0.5,

              minHandPresenceConfidence:
                0.5,

              minTrackingConfidence:
                0.5,
            }
          );

        console.log(
          "[Gesture] CPU initialized"
        );

        return cpuLandmarker;
      };

    const start = async () => {
      try {
        /*
         * ==========================================
         * CAMERA
         * ==========================================
         */

        setStatus(
          "Requesting camera..."
        );

        if (
          !navigator.mediaDevices ||
          !navigator.mediaDevices.getUserMedia
        ) {
          throw new Error(
            "Camera API is not available in this browser."
          );
        }

        const stream =
          await navigator.mediaDevices.getUserMedia(
            {
              video: {
                width: {
                  ideal: 1280,
                },

                height: {
                  ideal: 720,
                },

                facingMode: "user",

                /*
                 * Prefer a reasonable frame rate.
                 * We don't need 60fps for hand
                 * tracking if the model cannot
                 * process it that quickly.
                 */

                frameRate: {
                  ideal: 30,
                  max: 30,
                },
              },

              audio: false,
            }
          );

        if (!mounted) {
          stream
            .getTracks()
            .forEach((track) =>
              track.stop()
            );

          return;
        }

        streamRef.current =
          stream;

        const video =
          videoRef.current;

        if (!video) {
          throw new Error(
            "Video element is not available."
          );
        }

        video.srcObject =
          stream;

        /*
         * Wait for video metadata.
         */

        await new Promise<void>(
          (resolve) => {
            if (
              video.readyState >= 1
            ) {
              resolve();
              return;
            }

            video.onloadedmetadata =
              () => {
                resolve();
              };
          }
        );

        if (!mounted) {
          return;
        }

        await video.play();

        if (!mounted) {
          return;
        }

        console.log(
          "[Gesture] Camera started"
        );

        /*
         * ==========================================
         * MEDIAPIPE VISION RUNTIME
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
         * HAND LANDMARKER
         * ==========================================
         */

        const handLandmarker =
          await createLandmarker(
            vision
          );

        if (!mounted) {
          handLandmarker.close();
          return;
        }

        handLandmarkerRef.current =
          handLandmarker;

        setStatus(
          "Tracking active"
        );

        /*
         * ==========================================
         * DETECTION LOOP
         * ==========================================
         */

        const detect = () => {
          if (!mounted) {
            return;
          }

          const currentVideo =
            videoRef.current;

          const landmarker =
            handLandmarkerRef.current;

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
           * Only process when the camera
           * has produced a new frame.
           */

          if (
            currentVideo.readyState >=
              2 &&
            currentVideo.currentTime !==
              lastVideoTimeRef.current
          ) {
            lastVideoTimeRef.current =
              currentVideo.currentTime;

            try {
              const result: HandLandmarkerResult =
                landmarker.detectForVideo(
                  currentVideo,
                  performance.now()
                );

              /*
               * Draw only on testing page.
               */

              if (!compact) {
                drawResults(
                  result,
                  currentVideo,
                  canvasRef.current
                );
              }

              const detected =
                result.landmarks.length >
                0;

              /*
               * Avoid unnecessary state
               * updates when possible.
               */

              setHandDetected(
                detected
              );

              if (detected) {
                const landmarks =
                  result.landmarks[0];

                /*
                 * ==================================
                 * GESTURE
                 * ==================================
                 */

                const detectedGesture =
                  classifyGesture(
                    landmarks
                  );

                setGesture(
                  detectedGesture
                );

                onGesture?.(
                  detectedGesture
                );

                /*
                 * ==================================
                 * INDEX FINGERTIP
                 * ==================================
                 *
                 * Landmark 8.
                 */

                const indexTip =
                  landmarks[8];

                if (indexTip) {
                  onCursorMove?.(
                    indexTip.x,
                    indexTip.y
                  );
                }

                /*
                 * ==================================
                 * PINCH LANDMARKS
                 * ==================================
                 *
                 * Thumb tip = 4
                 * Index tip = 8
                 */

                const thumbTip =
                  landmarks[4];

                if (
                  thumbTip &&
                  indexTip
                ) {
                  onPinchMove?.(
                    thumbTip.x,
                    thumbTip.y,
                    indexTip.x,
                    indexTip.y
                  );
                }
              } else {
                setGesture(
                  "UNKNOWN"
                );

                /*
                 * Reset pinch state on
                 * hand loss.
                 */

                onPinchMove?.(
                  0,
                  0,
                  1,
                  1
                );
              }
            } catch (trackingError) {
              console.error(
                "[Gesture] Detection error:",
                trackingError
              );
            }
          }

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

      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) =>
            track.stop()
          );

        streamRef.current =
          null;
      }

      if (videoRef.current) {
        videoRef.current.pause();

        videoRef.current.srcObject =
          null;
      }
    };
  }, [
    compact,
    onGesture,
    onCursorMove,
    onPinchMove,
  ]);

  /*
   * ==========================================
   * DRAW RESULTS
   * ==========================================
   */

  const drawResults = (
    result: HandLandmarkerResult,
    video: HTMLVideoElement,
    canvas: HTMLCanvasElement | null
  ) => {
    if (!canvas) {
      return;
    }

    const ctx =
      canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    if (
      video.videoWidth === 0 ||
      video.videoHeight === 0
    ) {
      return;
    }

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
     * MediaPipe hand connections.
     */

    const connections: [
      number,
      number
    ][] = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],

      [0, 5],
      [5, 6],
      [6, 7],
      [7, 8],

      [5, 9],
      [9, 10],
      [10, 11],
      [11, 12],

      [9, 13],
      [13, 14],
      [14, 15],
      [15, 16],

      [13, 17],
      [17, 18],
      [18, 19],
      [19, 20],

      [0, 17],
    ];

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
   * COMPACT MODE
   * ==========================================
   *
   * The camera remains available to
   * MediaPipe but is completely hidden.
   */

  if (compact) {
    return (
      <div
        style={{
          position: "fixed",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none",
          zIndex: -1,
        }}
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          muted
          playsInline
          autoPlay
          style={{
            width: "1px",
            height: "1px",
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            display: "none",
          }}
        />
      </div>
    );
  }

  /*
   * ==========================================
   * TESTING PAGE
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
          width:
            "min(100%, 1100px)",
        }}
      >
        <div
          style={{
            marginBottom: "20px",
            fontFamily: "monospace",
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

        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            overflow: "hidden",
            background: "#111",
            border: "1px solid #333",
          }}
        >
          <video
            ref={videoRef}
            muted
            playsInline
            autoPlay
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform:
                "scaleX(-1)",
            }}
          />

          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform:
                "scaleX(-1)",
              pointerEvents:
                "none",
            }}
          />

          <div
            style={{
              position: "absolute",
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

          <div
            style={{
              position: "absolute",
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
              textAlign: "right",
              minWidth: "180px",
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
                marginTop: "6px",
                fontSize: "18px",
                fontWeight: 700,
              }}
            >
              {gesture}
            </div>
          </div>
        </div>

        {error && (
          <div
            style={{
              marginTop: "20px",
              padding: "16px",
              background: "#160808",
              border:
                "1px solid #5c2020",
              color: "#ff8a8a",
              fontFamily:
                "monospace",
              fontSize: "13px",
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

        <div
          style={{
            marginTop: "20px",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "10px",
            fontFamily:
              "monospace",
          }}
        >
          <div
            style={{
              padding: "14px",
              border:
                "1px solid #222",
              background: "#0b0b0b",
            }}
          >
            ☝️
            <br />
            POINT
          </div>

          <div
            style={{
              padding: "14px",
              border:
                "1px solid #222",
              background: "#0b0b0b",
            }}
          >
            👍
            <br />
            THUMBS_UP
          </div>

          <div
            style={{
              padding: "14px",
              border:
                "1px solid #222",
              background: "#0b0b0b",
            }}
          >
            🤏
            <br />
            PINCH
          </div>
        </div>
      </div>
    </div>
  );
}