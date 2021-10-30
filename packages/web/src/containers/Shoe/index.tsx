import React, { useRef, useEffect } from "react";
import { BOX_CONNECTIONS, Objectron, Point2D } from "@mediapipe/objectron";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import Webcam from "react-webcam";
import styles from "./styles.module.scss";

const drawingUtils = { drawConnectors, drawLandmarks };

// https://google.github.io/mediapipe/solutions/objectron#javascript-solution-api
// https://codepen.io/mediapipe/pen/BaWvzdY
export default function Section() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    (async function () {
      const canvasElement = canvasRef.current;

      const canvasCtx = canvasElement.getContext("2d");

      async function onFrame() {
        const { video } = webcamRef.current;

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
          await objectron.send({ image: video });
          console.log({ period: Date.now() - now });
        }
        setTimeout(() => onFrame(), 100);
      }

      function onResults(results) {
        canvasCtx.save();
        canvasCtx.drawImage(
          results.image,
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );
        if (!!results.objectDetections) {
          for (const detectedObject of results.objectDetections) {
            // Reformat keypoint information as landmarks, for easy drawing.
            const landmarks: Point2D[] = detectedObject.keypoints.map(
              (x) => x.point2d
            );
            // Draw bounding box.
            drawingUtils.drawConnectors(canvasCtx, landmarks, BOX_CONNECTIONS, {
              color: "#FF0000",
            });
            // Draw centroid.
            drawingUtils.drawLandmarks(canvasCtx, [landmarks[0]], {
              color: "#FFFFFF",
            });
          }
        }
        canvasCtx.restore();
      }

      const objectron = new Objectron({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/objectron/${file}`;
        },
      });
      objectron.setOptions({
        modelName: "Shoe",
        maxNumObjects: 3,
      });
      objectron.onResults(onResults);

      onFrame();
    })();
  }, [webcamRef]);

  return (
    <section className={styles.Section}>
      <h2>Shoe</h2>
      <div className={styles.Container}>
        <Webcam ref={webcamRef} className={styles.Webcam} muted={true} />
        <canvas ref={canvasRef} className={styles.Canvas} />
      </div>
    </section>
  );
}
