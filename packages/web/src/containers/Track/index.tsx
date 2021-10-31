import React, { useCallback, useRef } from "react";
import objectTracker from "@cloud-annotations/object-tracking";
import styles from "./styles.module.scss";

// https://github.com/cloud-annotations/object-tracking-js/raw/master/demo/public/video/test.mp4
const VIDEO = require("./video/test.mp4").default;

// https://github.com/cloud-annotations/object-tracking-js/tree/master/demo
// https://codesandbox.io/s/cranky-keller-cp4ms
export default function Section() {
  const videoRef = useRef();
  const canvasRef = useRef();

  const renderBox = useCallback((box) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "yellow";
    ctx.strokeRect(box[0], box[1], box[2], box[3]);
  }, []);

  const trackAndRender = useCallback(
    async (tracker) => {
      requestAnimationFrame(async () => {
        const box = await tracker.next(videoRef.current);
        renderBox(box);
        trackAndRender(tracker);
      });
    },
    [renderBox]
  );

  const handleVideoLoad = useCallback(async () => {
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;

    const xmin = 256;
    const ymin = 137;
    const width = 84;
    const height = 145;
    renderBox([xmin, ymin, width, height]);

    videoRef.current.onseeked = () => {
      const tracker = objectTracker.init(videoRef.current, [
        xmin,
        ymin,
        width,
        height,
      ]);
      videoRef.current.play();
      trackAndRender(tracker);
    };

    videoRef.current.currentTime = 0;
  }, [renderBox, trackAndRender]);

  return (
    <section className={styles.Section}>
      <h2>Track</h2>
      <div className={styles.Container}>
        <video
          ref={videoRef}
          src={VIDEO}
          muted
          onLoadedData={handleVideoLoad}
          width="480"
          height="360"
        />
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", left: "0" }}
        ></canvas>
      </div>
    </section>
  );
}
