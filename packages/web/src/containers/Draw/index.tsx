import React, { useEffect, useRef, useCallback } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import styles from "./styles.module.scss";

import { MnistData } from "./data";
import * as model from "./model";
// import * as ui from './ui';

import * as tfvis from "@tensorflow/tfjs-vis";

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

  useEffect(() => {
    // https://github.com/tensorflow/tfjs-examples/blob/master/mnist-core/ui.js
    const statusElement = document.getElementById("status");
    const messageElement = document.getElementById("message");
    const imagesElement = document.getElementById("images");

    function isTraining() {
      statusElement.innerText = "Training...";
    }

    const lossArr = [];
    function trainingLog(loss, iteration) {
      messageElement.innerText = `loss[${iteration}]: ${loss}`;
      lossArr.push({ x: iteration, y: loss });
      const container = { name: "Loss", tab: "Training" };
      const options = {
        xLabel: "Training Step",
        yLavel: "Loss",
      };
      const data = { values: lossArr, series: ["loss"] };
      tfvis.render.linechart(container, data, options);
    }

    function showTestResults(batch, predictions, labels) {
      statusElement.innerText = "Testing...";

      const testExamples = batch.xs.shape[0];
      let totalCorrect = 0;
      for (let i = 0; i < testExamples; i++) {
        const image = batch.xs.slice([i, 0], [1, batch.xs.shape[1]]);

        const div = document.createElement("div");
        div.className = "pred-container";

        const canvas = document.createElement("canvas");
        draw(image.flatten(), canvas);

        const pred = document.createElement("div");

        const prediction = predictions[i];
        const label = labels[i];
        const correct = prediction === label;
        if (correct) {
          totalCorrect++;
        }

        pred.className = `pred ${correct ? "pred-correct" : "pred-incorrect"}`;
        pred.innerText = `pred: ${prediction}`;

        div.appendChild(pred);
        div.appendChild(canvas);

        imagesElement.appendChild(div);
      }

      const accuracy = (100 * totalCorrect) / testExamples;
      const displayStr = `Accuracy: ${accuracy.toFixed(
        2
      )}% (${totalCorrect} / ${testExamples})`;
      messageElement.innerText = `${displayStr}\n`;
      console.log(displayStr);
    }

    function draw(image, canvas) {
      const [width, height] = [28, 28];
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      const imageData = new ImageData(width, height);
      const data = image.dataSync();
      for (let i = 0; i < height * width; ++i) {
        const j = i * 4;
        imageData.data[j + 0] = data[i] * 255;
        imageData.data[j + 1] = data[i] * 255;
        imageData.data[j + 2] = data[i] * 255;
        imageData.data[j + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);
    }

    const ui = {
      isTraining,
      trainingLog,
      showTestResults,
    };

    let data;
    async function load() {
      data = new MnistData();
      await data.load();
    }

    async function train() {
      ui.isTraining();
      await model.train(data, ui.trainingLog);
    }

    async function test() {
      const testExamples = 50;
      const batch = data.nextTestBatch(testExamples);
      const predictions = model.predict(batch.xs);
      const labels = model.classesFromLabel(batch.labels);

      ui.showTestResults(batch, predictions, labels);
    }

    async function mnist() {
      await load();
      await train();
      test();
    }

    mnist();

    console.log({ canvasRef });
  }, []);

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

      <section className="title-area">
        <h1>TensorFlow.js: Train MNIST with the Core API</h1>
      </section>

      <section>
        <p className="section-head">Description</p>
        <p>
          This examples demonstrates training a handwritten digit recognizer
          using a Convolutional Neural Network implemented with TensorFlow.js'
          lower level API.
        </p>
        <p>The MNIST dataset is used as training data.</p>
      </section>

      <section>
        <p className="section-head">Status</p>
        <div id="status">Loading data...</div>
        <div id="message"></div>
      </section>

      <section>
        <p className="section-head">Test Samples</p>
        <div id="images"></div>
      </section>
    </section>
  );
}
