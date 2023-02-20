import React, { useRef, useEffect } from "react";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-backend-cpu";
import {
  SupportedModels,
  createDetector,
} from "@tensorflow-models/face-landmarks-detection";
import * as tfjsWasm from "@tensorflow/tfjs-backend-wasm";
import * as tf from "@tensorflow/tfjs-core";
import { drawResults } from "./utils";
import styles from "./styles.module.scss";

tfjsWasm.setWasmPaths(
  `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${tfjsWasm.version_wasm}/dist/`
);

const GREEN = "#32EEDB";

let stopRendering = false;

// https://github.com/tensorflow/tfjs-models/blob/master/face-landmarks-detection/demo/index.js
export default function Section() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    (async function () {
      const VIDEO_SIZE = 500;
      const mobile = false;

      async function setupCamera() {
        // video = document.getElementById('video');
        video = webcamRef.current;

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: "user",
            // Only setting the video to a specified size in order to accommodate a
            // point cloud, so on mobile devices accept the default size.
            width: mobile ? undefined : VIDEO_SIZE,
            height: mobile ? undefined : VIDEO_SIZE,
          },
        });
        video.srcObject = stream;

        return new Promise((resolve) => {
          video.onloadedmetadata = () => {
            resolve(video);
          };
        });
      }

      async function renderPrediction() {
        if (stopRendering) {
          return;
        }

        // stats.begin();

        const faces = await detector.estimateFaces(video, {
          returnTensors: false,
          flipHorizontal: false,
          predictIrises: state.predictIrises,
        });
        ctx.drawImage(
          video,
          0,
          0,
          videoWidth,
          videoHeight,
          0,
          0,
          canvas.width,
          canvas.height
        );

        if (faces.length > 0) {
          drawResults(ctx, faces, state.triangulateMesh, state.boundingBox);
        }

        // stats.end();
        rafID = requestAnimationFrame(renderPrediction);
      }

      const state = {
        backend: "webgl",
        maxFaces: 1,
        triangulateMesh: true,
        predictIrises: true,
        boundingBox: true,
      };

      let detector, ctx, videoWidth, videoHeight, video, canvas, rafID;

      async function main() {
        await tf.setBackend(state.backend);
        // setupDatGui();

        // stats.showPanel(0);  // 0: fps, 1: ms, 2: mb, 3+: custom
        // document.getElementById('main').appendChild(stats.dom);

        await setupCamera();
        video.play();
        videoWidth = video.videoWidth;
        videoHeight = video.videoHeight;
        video.width = videoWidth;
        video.height = videoHeight;

        // canvas = document.getElementById('output');
        canvas = canvasRef.current;
        canvas.width = videoWidth;
        canvas.height = videoHeight;
        // const canvasContainer = document.querySelector('.canvas-wrapper');
        const canvasContainer = canvasRef.current.parentElement;
        canvasContainer.style = `width: ${videoWidth}px; height: ${videoHeight}px`;

        ctx = canvas.getContext("2d");
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.fillStyle = GREEN;
        ctx.strokeStyle = GREEN;
        ctx.lineWidth = 0.5;

        detector = await createDetector(SupportedModels.MediaPipeFaceMesh, {
          maxFaces: state.maxFaces,
          runtime: "tfjs",
        });
        renderPrediction();
      }

      main();
    })();
  }, [webcamRef, canvasRef]);

  return (
    <section className={styles.Section}>
      <h2>Face</h2>
      <div className={styles.Container}>
        <video ref={webcamRef} className={styles.Webcam} />
        <canvas ref={canvasRef} className={styles.Canvas} />
      </div>
      <div id="scatter-gl-container"></div>
    </section>
  );
}
