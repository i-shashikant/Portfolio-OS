'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { usePortfolio } from '@/stores/portfolio-store';
import {
  getFingerStates,
  classifyStaticGesture,
  SwipeDetector,
  NormalizedLandmark,
  HandGestureType,
} from '@/lib/gestures/handLandmarkClassifier';
import GestureHUD from './GestureHUD';

export default function GestureController() {
  const {
    gesturesEnabled,
    section,
    openSection,
    nextProject,
    previousProject,
    goHome,
    toggleDevMode,
    toggleGitHubWidget,
    triggerGestureToast,
  } = usePortfolio();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const landmarkerRef = useRef<any>(null);
  const animFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const swipeDetectorRef = useRef<SwipeDetector>(new SwipeDetector());

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [activeGesture, setActiveGesture] = useState<string>('NONE');
  const [fps, setFps] = useState(0);

  // Virtual Laser Cursor state
  const cursorTargetRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const cursorCurrRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const cursorElemRef = useRef<HTMLDivElement | null>(null);

  // Cooldown timers for discrete gestures
  const cooldownRef = useRef<{ [key: string]: number }>({});
  const canTrigger = (gesture: string, cooldownMs = 1200) => {
    const now = performance.now();
    if (!cooldownRef.current[gesture] || now - cooldownRef.current[gesture] > cooldownMs) {
      cooldownRef.current[gesture] = now;
      return true;
    }
    return false;
  };

  // Helper to reliably stop camera stream tracks
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
        track.enabled = false;
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  }, []);

  // Dispatch Action for discrete gesture
  const handleGestureAction = useCallback(
    (gesture: HandGestureType, rawVelocity: { vx: number; vy: number }) => {
      // 1. Thumbs Up (👍) -> Select / Confirm Click
      if (gesture === 'THUMBS_UP') {
        if (canTrigger('THUMBS_UP', 1000)) {
          triggerGestureToast('👍 Select / Confirm Clicked');
          const cx = cursorCurrRef.current.x;
          const cy = cursorCurrRef.current.y;
          if (cx > 0 && cy > 0) {
            const targetEl = document.elementFromPoint(cx, cy) as HTMLElement | null;
            if (targetEl) targetEl.click();
          }
        }
        return;
      }

      // 2. Victory Sign (✌️) -> Open GitHub Analytics Widget
      if (gesture === 'VICTORY') {
        if (canTrigger('VICTORY', 2000)) {
          triggerGestureToast('✌️ GitHub Analytics Opened');
          toggleGitHubWidget();
        }
        return;
      }

      // 3. Closed Fist (✊) -> Go Home / Close Overlay
      if (gesture === 'CLOSED_FIST') {
        if (canTrigger('CLOSED_FIST', 1500)) {
          triggerGestureToast('✊ Go Home / Close');
          goHome();
        }
        return;
      }

      // 4. Call-Me Sign (🤙) -> Go to Contact
      if (gesture === 'CALL_ME') {
        if (canTrigger('CALL_ME', 1500)) {
          triggerGestureToast('🤙 Jumping to Contact');
          openSection('contact');
        }
        return;
      }

      // 5. Rock Sign (🤘) -> Developer Mode Easter Egg
      if (gesture === 'ROCK_SIGN') {
        if (canTrigger('ROCK_SIGN', 1800)) {
          triggerGestureToast('🤘 Developer Mode Matrix Activated!');
          toggleDevMode();
        }
        return;
      }

      // 6. Open Palm Swipes (Scroll Down / Scroll Up)
      if (gesture === 'OPEN_PALM') {
        if (rawVelocity.vy > 0.8 && canTrigger('SWIPE_DOWN', 1000)) {
          triggerGestureToast('🖐 Swipe Down: Next Section');
          if (section === 'home') openSection('projects');
          else if (section === 'projects') openSection('about');
          else if (section === 'about') openSection('skills');
          else if (section === 'skills') openSection('contact');
          else window.scrollBy({ top: 400, behavior: 'smooth' });
        } else if (rawVelocity.vy < -0.8 && canTrigger('SWIPE_UP', 1000)) {
          triggerGestureToast('🖐 Swipe Up: Previous Section');
          if (section === 'contact') openSection('skills');
          else if (section === 'skills') openSection('about');
          else if (section === 'about') openSection('projects');
          else if (section === 'projects') openSection('home');
          else window.scrollBy({ top: -400, behavior: 'smooth' });
        }
        return;
      }

      // 7. Pointing Swipes (Next Project / Previous Project)
      if (gesture === 'CURSOR_POINT') {
        if (rawVelocity.vx > 0.8 && canTrigger('SWIPE_RIGHT', 1000)) {
          triggerGestureToast('👉 Point Swipe Right: Next Project');
          nextProject();
        } else if (rawVelocity.vx < -0.8 && canTrigger('SWIPE_LEFT', 1000)) {
          triggerGestureToast('👈 Point Swipe Left: Previous Project');
          previousProject();
        }
      }
    },
    [section, openSection, nextProject, previousProject, goHome, toggleDevMode, triggerGestureToast]
  );

  // Initialize MediaPipe HandLandmarker & Webcam Stream Lifecycle
  useEffect(() => {
    let isMounted = true;

    if (!gesturesEnabled) {
      stopCamera();
      return;
    }

    async function initMediaPipe() {
      try {
        const { HandLandmarker, FilesetResolver } = await import('@mediapipe/tasks-vision');
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
        );

        if (!isMounted) return;

        landmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
            delegate: 'GPU',
          },
          runningMode: 'VIDEO',
          numHands: 1,
        });

        // Start Webcam
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480, frameRate: { ideal: 30 } },
          });

          if (!isMounted) {
            stream.getTracks().forEach((t) => t.stop());
            return;
          }

          streamRef.current = stream;

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {
              videoRef.current?.play();
              setIsCameraActive(true);
            };
          }
        }
      } catch (err) {
        console.error('Failed to initialize MediaPipe HandLandmarker:', err);
      }
    }

    initMediaPipe();

    return () => {
      isMounted = false;
      stopCamera();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [gesturesEnabled, stopCamera]);

  // Main Animation Loop
  useEffect(() => {
    if (!gesturesEnabled || !isCameraActive) return;

    let lastTime = performance.now();
    let frameCount = 0;

    const processFrame = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const landmarker = landmarkerRef.current;

      if (video && video.readyState >= 2 && landmarker) {
        const results = landmarker.detectForVideo(video, performance.now());

        frameCount++;
        const now = performance.now();
        if (now - lastTime >= 1000) {
          setFps(frameCount);
          frameCount = 0;
          lastTime = now;
        }

        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            canvas.width = video.videoWidth || 320;
            canvas.height = video.videoHeight || 240;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            if (results.landmarks && results.landmarks.length > 0) {
              const landmarks: NormalizedLandmark[] = results.landmarks[0];

              ctx.strokeStyle = '#8b5cf6';
              ctx.lineWidth = 2;
              const connections = [
                [0,1],[1,2],[2,3],[3,4],
                [0,5],[5,6],[6,7],[7,8],
                [5,9],[9,10],[10,11],[11,12],
                [9,13],[13,14],[14,15],[15,16],
                [13,17],[17,18],[18,19],[19,20],[0,17]
              ];
              connections.forEach(([i, j]) => {
                ctx.beginPath();
                ctx.moveTo(landmarks[i].x * canvas.width, landmarks[i].y * canvas.height);
                ctx.lineTo(landmarks[j].x * canvas.width, landmarks[j].y * canvas.height);
                ctx.stroke();
              });

              ctx.fillStyle = '#34d399';
              landmarks.forEach((pt) => {
                ctx.beginPath();
                ctx.arc(pt.x * canvas.width, pt.y * canvas.height, 3, 0, 2 * Math.PI);
                ctx.fill();
              });

              const fingerStates = getFingerStates(landmarks);
              const gesture = classifyStaticGesture(landmarks, fingerStates);
              setActiveGesture(gesture);

              const indexTip = landmarks[8];
              const targetX = (1 - indexTip.x) * window.innerWidth;
              const targetY = indexTip.y * window.innerHeight;

              cursorTargetRef.current = { x: targetX, y: targetY };
              setCursorVisible(gesture === 'CURSOR_POINT' || fingerStates.index);

              const vel = swipeDetectorRef.current.update({ x: indexTip.x, y: indexTip.y });
              handleGestureAction(gesture, vel);
            } else {
              setActiveGesture('NONE');
              setCursorVisible(false);
              swipeDetectorRef.current.clear();
            }
          }
        }
      }

      if (cursorVisible) {
        cursorCurrRef.current.x += (cursorTargetRef.current.x - cursorCurrRef.current.x) * 0.25;
        cursorCurrRef.current.y += (cursorTargetRef.current.y - cursorCurrRef.current.y) * 0.25;

        if (cursorElemRef.current) {
          cursorElemRef.current.style.transform = `translate3d(${cursorCurrRef.current.x}px, ${cursorCurrRef.current.y}px, 0)`;
        }
      }

      animFrameRef.current = requestAnimationFrame(processFrame);
    };

    animFrameRef.current = requestAnimationFrame(processFrame);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [gesturesEnabled, isCameraActive, cursorVisible, handleGestureAction]);

  const handleToggleCamera = () => {
    if (isCameraActive) {
      stopCamera();
    } else {
      setIsCameraActive(true);
    }
  };

  return (
    <>
      {/* Always mounted video source so videoRef persists during cleanup */}
      <video ref={videoRef} className="hidden" playsInline muted />

      {gesturesEnabled && (
        <>
          <GestureHUD
            canvasRef={canvasRef}
            activeGesture={activeGesture}
            isCameraActive={isCameraActive}
            fps={fps}
            onToggleCamera={handleToggleCamera}
          />

          {cursorVisible && (
            <div
              ref={cursorElemRef}
              className="pointer-events-none fixed left-0 top-0 z-[10002] -ml-4 -mt-4 flex h-8 w-8 items-center justify-center transition-opacity duration-200"
            >
              <span className="absolute h-8 w-8 rounded-full border border-violet-400/60 bg-violet-500/20 animate-ping opacity-75" />
              <span className="h-3 w-3 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,1)]" />
            </div>
          )}
        </>
      )}
    </>
  );
}
