import React, { useRef, useEffect } from "react";
import { Pose, POSE_CONNECTIONS } from "@mediapipe/pose";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import Webcam from "react-webcam";
import styles from "./styles.module.scss";

const drawResults = (results, canvasElement) => {
  const canvasCtx = canvasElement.getContext("2d");

  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  // canvasCtx.drawImage(results.segmentationMask, 0, 0,
  //                     canvasElement.width, canvasElement.height);

  // Only overwrite existing pixels.
  canvasCtx.globalCompositeOperation = "source-in";
  canvasCtx.fillStyle = "#00FF00";
  canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

  // Only overwrite missing pixels.
  canvasCtx.globalCompositeOperation = "destination-atop";
  canvasCtx.drawImage(
    results.image,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );

  canvasCtx.globalCompositeOperation = "source-over";
  drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
    color: "#00FF00",
    lineWidth: 4,
  });
  drawLandmarks(canvasCtx, results.poseLandmarks, {
    color: "#FF0000",
    lineWidth: 2,
  });
  canvasCtx.restore();

  // // Draw the overlays.
  // canvasCtx.save();
  // canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  // if (results.segmentationMask) {
  //   canvasCtx.drawImage(
  //       results.segmentationMask, 0, 0, canvasElement.width,
  //       canvasElement.height);

  //   // Only overwrite existing pixels.
  //   if (activeEffect === 'mask' || activeEffect === 'both') {
  //     canvasCtx.globalCompositeOperation = 'source-in';
  //     // This can be a color or a texture or whatever...
  //     canvasCtx.fillStyle = '#00FF007F';
  //     canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
  //   } else {
  //     canvasCtx.globalCompositeOperation = 'source-out';
  //     canvasCtx.fillStyle = '#0000FF7F';
  //     canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
  //   }

  //   // Only overwrite missing pixels.
  //   canvasCtx.globalCompositeOperation = 'destination-atop';
  //   canvasCtx.drawImage(
  //       results.image, 0, 0, canvasElement.width, canvasElement.height);

  //   canvasCtx.globalCompositeOperation = 'source-over';
  // } else {
  //    canvasCtx.drawImage(
  //        results.image, 0, 0, canvasElement.width, canvasElement.height);
  // }

  // if (results.poseLandmarks) {
  //   drawingUtils.drawConnectors(
  //       canvasCtx, results.poseLandmarks, mpPose.POSE_CONNECTIONS,
  //       {visibilityMin: 0.65, color: 'white'});
  //   drawingUtils.drawLandmarks(
  //       canvasCtx,
  //       Object.values(mpPose.POSE_LANDMARKS_LEFT)
  //           .map(index => results.poseLandmarks[index]),
  //       {visibilityMin: 0.65, color: 'white', fillColor: 'rgb(255,138,0)'});
  //   drawingUtils.drawLandmarks(
  //       canvasCtx,
  //       Object.values(mpPose.POSE_LANDMARKS_RIGHT)
  //           .map(index => results.poseLandmarks[index]),
  //       {visibilityMin: 0.65, color: 'white', fillColor: 'rgb(0,217,231)'});
  //   drawingUtils.drawLandmarks(
  //       canvasCtx,
  //       Object.values(mpPose.POSE_LANDMARKS_NEUTRAL)
  //           .map(index => results.poseLandmarks[index]),
  //       {visibilityMin: 0.65, color: 'white', fillColor: 'white'});
  // }
  // canvasCtx.restore();

  // if (results.poseWorldLandmarks) {
  //   grid.updateLandmarks(results.poseWorldLandmarks, mpPose.POSE_CONNECTIONS, [
  //     {list: Object.values(mpPose.POSE_LANDMARKS_LEFT), color: 'LEFT'},
  //     {list: Object.values(mpPose.POSE_LANDMARKS_RIGHT), color: 'RIGHT'},
  //   ]);
  // } else {
  //   grid.updateLandmarks([]);
  // }
};

// https://google.github.io/mediapipe/solutions/pose.html#javascript-solution-api
// https://codepen.io/mediapipe/pen/jOMbvxw MediaPipe - Pose
export default function Section() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    (async function () {
      async function onFrame() {
        const { video } = webcamRef.current;

        console.log(["onFrame"], { video });

        // Check data is available
        if (video.readyState === 4) {
          // Get Video Properties
          const { videoWidth, videoHeight } = video;

          // Set video width
          Object.assign(video, {
            width: videoWidth,
            height: videoHeight,
          });

          // Set canvas height and width
          Object.assign(canvasRef.current, {
            width: videoWidth,
            height: videoHeight,
          });

          const now = Date.now();
          await pose.send({ image: video });

          console.log({ period: Date.now() - now });
        }
        setTimeout(() => onFrame(), 1000);
      }

      // const grid = new LandmarkGrid(landmarkContainer);

      function onResults(results) {
        console.log(["onResults"], { results });
        if (!results.poseLandmarks) {
          //   grid.updateLandmarks([]);
          return;
        }
        drawResults(results, canvasRef.current);

        // grid.updateLandmarks(results.poseWorldLandmarks);
      }

      const pose = new Pose({
        // https://github.com/google/mediapipe/issues/1812
        locateFile: (file) => {
          console.log({ file });
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        },
      });
      pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: true,
        smoothSegmentation: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });
      pose.onResults(onResults);
      onFrame();

      // const camera = new Camera(videoElement, {
      //   onFrame: async () => {
      //     await pose.send({image: videoElement});
      //   },
      //   width: 1280,
      //   height: 720
      // });
      // camera.start();
    })();
  }, []);

  return (
    <section className={styles.Section}>
      <h2>Pose</h2>
      <div className={styles.Container}>
        <Webcam ref={webcamRef} className={styles.Webcam} muted={true} />
        <canvas ref={canvasRef} className={styles.Canvas} />
      </div>
    </section>
  );
}
