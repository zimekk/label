import React, { useCallback, useEffect, useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import cx from "classnames";
import styles from "./styles.module.scss";

import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import * as model from "./model";
import { MnistData } from "./data";

function PredContainer({ children }) {
  return <div className={cx(styles.PredContainer)}>{children}</div>;
}

function Pred({ correct, children: prediction }) {
  return (
    <div
      className={cx(
        styles.Pred,
        correct ? styles.Pred__Correct : styles.Pred__Incorrect
      )}
    >{`pred: ${prediction}`}</div>
  );
}

function getImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", (err) => reject(err));
    img.src = url;
    img.setAttribute("crossorigin", "anonymous");
  });
}

function predict(pixels) {
  const tensor = tf.browser
    .fromPixels(pixels)
    .resizeNearestNeighbor([28, 28])
    .mean(2)
    .expandDims(2)
    .expandDims()
    .toFloat();
  return model.predict(tensor.div(255.0))[0];
}

function Canvas({ children: data, width = 28, height = 28 }) {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = Object.assign(canvasRef.current, {
      width,
      height,
    });
    const ctx = canvas.getContext("2d");
    const imageData = new ImageData(width, height);
    for (let i = 0; i < height * width; ++i) {
      const j = i * 4;
      imageData.data[j + 0] = data[i] * 255;
      imageData.data[j + 1] = data[i] * 255;
      imageData.data[j + 2] = data[i] * 255;
      imageData.data[j + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
  }, [canvasRef]);

  const handleClick = useCallback(
    () => predict(canvasRef.current),
    [canvasRef]
  );

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onClick={handleClick}
    />
  );
}

const subject$ = new Subject();

// https://github.com/vinothpandian/react-sketch-canvas
// https://vinoth.info/react-sketch-canvas/
export default function Section() {
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("Loading data...");
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);
  const [predicted, setPredicted] = useState(null);

  const handleClickReset = useCallback(
    () => (canvasRef.current.resetCanvas(), setPredicted(null)),
    [canvasRef]
  );

  const handleClickUndo = useCallback(
    () => canvasRef.current.undo(),
    [canvasRef]
  );

  const handleClickRedo = useCallback(
    () => canvasRef.current.redo(),
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

  const handleClickPredict = useCallback(
    () =>
      canvasRef.current
        .exportImage("png")
        .then(getImage)
        .then(predict)
        .then(setPredicted),
    [canvasRef]
  );

  const handleStroke = useCallback(() => console.log(["stroke"]), [canvasRef]);

  const handleChange = useCallback(
    () => console.log(["change"]) || subject$.next(null),
    [canvasRef]
  );

  useEffect(() => {
    const subscription = subject$.pipe(debounceTime(400)).subscribe(() => {
      canvasRef.current
        .exportImage("png")
        .then(getImage)
        .then(predict)
        .then((predicted) => console.log({ predicted }) || predicted)
        .then(setPredicted);
    });
    return subscription.unsubscribe;
  }, [canvasRef]);

  useEffect(() => {
    // https://github.com/tensorflow/tfjs-examples/blob/master/mnist-core/ui.js
    function isTraining() {
      setStatus("Training...");
    }

    const lossArr = [];

    function trainingLog(loss, iteration) {
      setMessage(`loss[${iteration}]: ${loss}`);
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
      setStatus("Testing...");

      const images = batch.xs.arraySync().map((image, i) => {
        const prediction = predictions[i];
        const label = labels[i];
        const correct = prediction === label;
        return {
          image,
          correct,
          prediction,
        };
      });

      setImages(images);

      const testExamples = images.length;
      const totalCorrect = images.filter(({ correct }) => correct).length;

      const accuracy = (100 * totalCorrect) / testExamples;
      const displayStr = `Accuracy: ${accuracy.toFixed(
        2
      )}% (${totalCorrect} / ${testExamples})`;
      setMessage(`${displayStr}\n`);
      // messageElement.innerText = `${displayStr}\n`;
      console.log(displayStr);
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
  }, []);

  return (
    <section className={styles.Section}>
      <h2>Draw</h2>

      <button onClick={handleClickReset}>Reset</button>
      <button onClick={handleClickUndo}>Undo</button>
      <button onClick={handleClickRedo}>Redo</button>
      <button onClick={handleClickExport}>Export</button>
      <button onClick={handleClickPredict}>Predict</button>
      {predicted !== null && <span>pred: {predicted}</span>}

      <ReactSketchCanvas
        ref={canvasRef}
        className={styles.Canvas}
        width="100"
        height="100"
        strokeWidth={24}
        strokeColor="white"
        canvasColor="black"
        onStroke={handleStroke}
        onChange={handleChange}
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
        <div id="status">{status}</div>
        <div id="message">{message}</div>
      </section>

      <section>
        <p className="section-head">Test Samples</p>
        <div id="images">
          {images.map(({ correct, image, prediction }, key) => (
            <PredContainer key={key}>
              <Pred correct={correct}>{prediction}</Pred>
              <Canvas>{image}</Canvas>
            </PredContainer>
          ))}
        </div>
      </section>
    </section>
  );
}
