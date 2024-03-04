import React, { useCallback, useState } from "react";
// import { LlamaCpp } from "./llama-st/llama.js";
import styles from "./styles.module.scss";

// https://github.com/tangledgroup/llama-cpp-wasm
export default function Section() {
  const [prompt, setPrompt] = useState(
    () =>
      `Suppose Alice originally had 3 apples, then Bob gave Alice 7 apples, then Alice gave Cook 5 apples, and then Tim gave Alice 3x the amount of apples Alice had. How many apples does Alice have now? Let’s think step by step.`
  );
  const [result, setResult] = useState(() => ``);
  const [status, setStatus] = useState<
    "" | "loading" | "loaded" | "generating" | "completed"
  >(() => ``);

  // let app;
  // const buttonRun = document.querySelector("#run");
  // const buttonRunProgressLoadingModel = document.querySelector("#run-progress-loading-model");
  // const buttonRunProgressLoadedModel = document.querySelector("#run-progress-loaded-model");
  // const buttonRunProgressGenerating = document.querySelector("#run-progress-generating");
  // const selectModel = document.querySelector("select#model");
  // const modelProgress = document.querySelector("#model-progress");
  // const textareaPrompt = document.querySelector("textarea#prompt");
  // const textareaResult = document.querySelector("#result");

  const onModelLoaded = () => {
    // const prompt = textareaPrompt.value;
    // buttonRunProgressLoadingModel.setAttribute("hidden", "hidden");
    // buttonRunProgressLoadedModel.removeAttribute("hidden");
    console.debug("model: loaded");

    setStatus("loaded");

    // app.run({
    //     prompt: prompt,
    //     ctx_size: 2048,
    //     temp: 0.8,
    //     top_k: 40,
    //     no_display_prompt: true,
    // });
  };

  const onMessageChunk = (text: string) => {
    console.log(text);

    // if (buttonRunProgressGenerating.hasAttribute("hidden")) {
    //   buttonRunProgressLoadingModel.setAttribute("hidden", "hidden");
    //   buttonRunProgressLoadedModel.setAttribute("hidden", "hidden");
    //   buttonRunProgressGenerating.removeAttribute("hidden");
    // }

    // textareaResult.value += text;
    // textareaResult.innerText += text;
    setResult((result) => result + text);
  };

  const onComplete = () => {
    console.debug("model: completed");

    setStatus("completed");

    // buttonRun.removeAttribute("hidden");
    // buttonRunProgressLoadingModel.setAttribute("hidden", "hidden");
    // buttonRunProgressLoadedModel.setAttribute("hidden", "hidden");
    // buttonRunProgressGenerating.setAttribute("hidden", "hidden");
    // modelProgress.setAttribute("hidden", "hidden");
  };

  const handleClickRun = useCallback(() => {
    setStatus("loading");

    // buttonRun.setAttribute("hidden", "hidden");
    // buttonRunProgressLoadingModel.removeAttribute("hidden");
    // modelProgress.removeAttribute("hidden");
    // textareaResult.value = "";
    // textareaResult.innerText = "";

    // if (app && app.url == selectModel.value) {
    //   onModelLoaded();
    //   return;
    // }

    // app = new LlamaCpp(
    //   selectModel.value,
    //   onModelLoaded,
    //   onMessageChunk,
    //   onComplete,
    // );

    setTimeout(() => onModelLoaded(), 400);
    setTimeout(() => onMessageChunk("Result"), 800);
    setTimeout(() => onComplete(), 1200);
  }, []);

  return (
    <section className={styles.Section}>
      <h2>Llama</h2>
      <main className={styles.Container}>
        <section>
          <h2> Demo </h2>
          <div>
            <label> Model: </label>

            <select id="model" name="model" aria-label="Select model" required>
              <option value="https://huggingface.co/Qwen/Qwen1.5-0.5B-Chat-GGUF/resolve/main/qwen1_5-0_5b-chat-q3_k_m.gguf">
                Qwen/Qwen1.5-0.5B-Chat Q3_K_M (350 MB)
              </option>
              <option value="https://huggingface.co/afrideva/TinyMistral-248M-SFT-v4-GGUF/resolve/main/tinymistral-248m-sft-v4.q8_0.gguf">
                tinymistral-248m-sft-v4 q8_0 (265.26 MB)
              </option>
              <option value="https://huggingface.co/TheBloke/TinyLlama-1.1B-Chat-v1.0-GGUF/resolve/main/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf">
                TinyLlama/TinyLlama-1.1B-Chat-v1.0 Q4_K_M (669 MB)
              </option>
              <option value="https://huggingface.co/Qwen/Qwen1.5-1.8B-Chat-GGUF/resolve/main/qwen1_5-1_8b-chat-q3_k_m.gguf">
                Qwen/Qwen1.5-1.8B-Chat Q3_K_M (1.02 GB)
              </option>
              <option value="https://huggingface.co/stabilityai/stablelm-2-zephyr-1_6b/resolve/main/stablelm-2-zephyr-1_6b-Q4_1.gguf">
                stabilityai/stablelm-2-zephyr-1_6b Q4_1 (1.07 GB)
              </option>
              <option value="https://huggingface.co/TKDKid1000/phi-1_5-GGUF/resolve/main/phi-1_5-Q4_K_M.gguf">
                microsoft/phi-1_5 Q4_K_M (918 MB)
              </option>
              <option value="https://huggingface.co/TheBloke/phi-2-GGUF/resolve/main/phi-2.Q3_K_M.gguf">
                microsoft/phi-2 Q3_K_M (1.48 GB)
              </option>
            </select>
          </div>

          <div>
            <label> Prompt: </label>

            <textarea
              id="prompt"
              name="prompt"
              rows={5}
              value={prompt}
              onChange={({ target }) => setPrompt(target.value)}
            />
          </div>

          <div>
            <label> Result: </label>

            <pre id="result">{result}</pre>
          </div>
        </section>

        {["", "completed"].includes(status) && (
          <section>
            <button onClick={handleClickRun}> Run </button>
          </section>
        )}

        <section>
          {status === "loading" ? (
            <button id="run-progress-loading-model" aria-busy="true">
              {" "}
              Loading model...{" "}
            </button>
          ) : status === "loaded" ? (
            <button id="run-progress-loaded-model" aria-busy="true">
              {" "}
              Loaded model{" "}
            </button>
          ) : (
            status === "generating" && (
              <button id="run-progress-generating" aria-busy="true">
                {" "}
                Generating...{" "}
              </button>
            )
          )}
        </section>

        {["loading", "loaded"].includes(status) && (
          <section>
            <progress id="model-progress" />
          </section>
        )}
      </main>
    </section>
  );
}
