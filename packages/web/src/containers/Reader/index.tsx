import React, {
  type ChangeEvent,
  type ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createWorker } from "tesseract.js";
import styles from "./styles.module.scss";

function Data() {
  const [text, setText] = useState("");

  const onChangeText = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    ({ target }) => setText(target.value),
    []
  );

  const [imageSrc, setImageSrc] = useState(
    require("./images/eng_bw.png").default
  );

  const doOCR = async () => {
    // https://github.com/naptha/tesseract.js
    // https://github.com/jeromewu/tesseract.js-react-app/blob/master/src/App.js
    const worker = await createWorker({
      logger: (m) => console.log(m),
    });
    // await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    // const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
    const {
      data: { text },
    } = await worker.recognize(imageSrc);
    setText(text);
    await worker.terminate();
  };

  useEffect(() => {
    console.log({ imageSrc });
    doOCR();
  }, [imageSrc]);

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const readImage = (file: File) => {
      // Check if the file is an image.
      if (file.type && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.addEventListener(
          "load",
          (e) =>
            // console.log(['load'], e.target)
            setImageSrc(e.target?.result)
          // setFrames((frames) => frames.concat(e.target.result))
        );
        reader.readAsDataURL(file);
      }
    };

    const handleChange = ({ target }: { target: HTMLInputElement }) => {
      [...target.files].forEach(readImage);
      target.value = "";
    };

    if (fileRef.current) {
      fileRef.current.addEventListener("change", handleChange);
    }
    return () => {
      if (fileRef.current) {
        fileRef.current.removeEventListener("change", handleChange);
      }
    };
  }, [setImageSrc, fileRef]);

  return (
    <div className={styles.Container}>
      <button onClick={() => fileRef.current && fileRef.current.click()}>
        Select File
      </button>{" "}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
      />
      <img src={imageSrc} />
      <textarea
        rows={4}
        className={styles.Text}
        value={text}
        onChange={onChangeText}
      />
    </div>
  );
}

export default function Section() {
  return (
    <div className={styles.Section}>
      <h2>Reader</h2>
      <Data />
    </div>
  );
}
