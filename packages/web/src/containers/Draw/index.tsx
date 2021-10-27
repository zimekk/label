import React, { useRef, useCallback } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import styles from "./styles.module.scss";

// https://github.com/vinothpandian/react-sketch-canvas
// https://vinoth.info/react-sketch-canvas/
export default function Section() {
  const canvasRef = useRef(null);

  const handleClickClear = useCallback(
    () => canvasRef.current.clearCanvas(),
    [canvasRef]
  );
  const handleClickExport = useCallback(
    () =>
      canvasRef.current
        .exportImage("png")
        .then(console.log)
        .catch(console.error),
    [canvasRef]
  );

  return (
    <section className={styles.Section}>
      <h2>Draw</h2>
      <button onClick={handleClickClear}>Clear</button>
      <button onClick={handleClickExport}>Export</button>
      <ReactSketchCanvas
        ref={canvasRef}
        className={styles.Canvas}
        width="100"
        height="100"
        strokeWidth={10}
        strokeColor="red"
      />
    </section>
  );
}
