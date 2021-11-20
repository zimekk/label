import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-cpu";
import * as toxicity from "@tensorflow-models/toxicity";
import cx from "classnames";
import styles from "./styles.module.scss";

const samples = [
  {
    id: "002261b0415c4f9d",
    text: "We're dudes on computers, moron.  You are quite astonishingly stupid.",
  },
  {
    id: "0027160ca62626bc",
    text: "Please stop. If you continue to vandalize Wikipedia, as you did to Kmart, you will be blocked from editing.",
  },
  {
    id: "002fb627b19c4c0b",
    text: "I respect your point of view, and when this discussion originated on 8th April I would have tended to agree with you.",
  },
];

// https://github.com/tensorflow/tfjs-models/blob/master/toxicity/demo/index.js
export default function Section() {
  const inputRef = useRef(null);
  const [model, setModel] = useState();
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    (async () => setModel(await toxicity.load()))();
  }, []);

  const labels = useMemo(
    () => model && model.model.outputNodes.map((d) => d.split("/")[0]),
    [model]
  );

  const classify = useCallback(
    async (inputs) => {
      const results = await model.classify(inputs);
      return inputs.map((text, i) => ({
        text,
        match: results.reduce(
          (match, { label, results }) =>
            Object.assign(match, {
              [label]: results[i].match,
            }),
          {}
        ),
      }));
    },
    [model]
  );

  const predict = useCallback(
    async (texts) => {
      const predictions = await classify(texts);
      console.log({ predictions });
      setPredictions((list) => list.concat(predictions));
    },
    [model]
  );

  useEffect(() => {
    if (model) {
      predict(samples.map((d) => d.text));
    }
  }, [model]);

  // https://github.com/tensorflow/tfjs-models/blob/master/toxicity/demo/index.html
  return (
    <section className={styles.Section}>
      <h2>Toxicity</h2>
      <div className={styles.Container}>
        <h3>TensorFlow.js toxicity classifier demo</h3>
        <div className={styles.Description}>
          This is a demo of the TensorFlow.js toxicity model, which classifies
          text according to whether it exhibits offensive attributes (i.e.
          profanity, sexual explicitness). The samples in the table below were
          taken from this{" "}
          <a href="https://www.kaggle.com/c/jigsaw-toxic-comment-classification-challenge/data">
            Kaggle dataset
          </a>
          .
        </div>
        {labels && (
          <div id="table-wrapper" className={styles.TableWrapper}>
            <div className={styles.Row}>
              <div className={styles.Text}>TEXT</div>
              {labels.map((label, key) => (
                <div key={key} className={styles.Label}>
                  {label.replace("_", " ")}
                </div>
              ))}
            </div>
            {predictions.map((prediction, key) => (
              <div key={key} className={styles.Row}>
                <div className={styles.Text}>{prediction.text}</div>
                {labels.map((label, key) => (
                  <div
                    key={key}
                    className={cx(
                      styles.Label,
                      prediction.match[label] && styles.positive
                    )}
                  >
                    {prediction.match[label] ? "true" : "false"}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        <p>Enter text below and click 'Classify' to add it to the table.</p>
        <form
          id="classify-new"
          onSubmit={(e) => (
            e.preventDefault(),
            predict([inputRef.current.value]),
            (inputRef.current.value = "")
          )}
        >
          <input
            className={styles.ClassifyInput}
            ref={inputRef}
            id="classify-new-text-input"
            placeholder="i.e. 'you suck'"
            required
          />
          <button
            className={styles.ClassifyButton}
            id="classify-new-text"
            type="submit"
          >
            Classify
          </button>
        </form>
      </div>
    </section>
  );
}
