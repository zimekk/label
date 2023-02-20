import React, { useRef, useEffect } from "react";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-cpu";
import * as cocossd from "@tensorflow-models/coco-ssd";
import { CLASSES } from "@tensorflow-models/coco-ssd/dist/classes";
import Webcam from "react-webcam";
import styles from "./styles.module.scss";

const drawRect = (detections, ctx) => {
  // Loop through each prediction
  detections.forEach((prediction) => {
    // Extract boxes and classes
    const [x, y, width, height] = prediction["bbox"];
    const text = prediction["class"];

    // Set styling
    const color = Math.floor(Math.random() * 16777215).toString(16);
    ctx.strokeStyle = "#" + color;
    ctx.font = "18px Arial";

    // Draw rectangles and text
    ctx.beginPath();
    ctx.fillStyle = "#" + color;
    ctx.fillText(text, x, y);
    ctx.rect(x, y, width, height);
    ctx.stroke();
  });
};

// https://github.com/nicknochnack/ReactComputerVisionTemplate/blob/main/src/App.js
export default function Section() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const detect = async (net) => {
    if (!webcamRef.current?.video || !canvasRef.current) {
      return;
    }

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
      // Make Detections
      const obj = await net.detect(video);
      console.log(
        { period: Date.now() - now },
        obj.map(({ class: label, score }) => `${label}: ${score}`)
      );
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);
      setTimeout(() => detect(net), 1000);
    }
  };

  useEffect(() => {
    // Main function
    (async function () {
      const net = await cocossd.load();
      detect(net);
    })();
  }, []);

  return (
    <section className={styles.Section}>
      <h2>Coco</h2>
      <div className={styles.Container}>
        <Webcam ref={webcamRef} className={styles.Webcam} muted={true} />
        <canvas ref={canvasRef} className={styles.Canvas} />
      </div>
      <ul>
        {Object.values(CLASSES).map(({ id, displayName }) => (
          <li key={id}>{displayName}</li>
        ))}
      </ul>
    </section>
  );
}
