import React, { Suspense, lazy, useEffect, useState } from "react";
import history from "history/browser";
import styles from "./App.module.scss";

const Spinner = () => <span>Loading...</span>;

const PAGES = {
  coco: lazy(() => import("./Coco")),
  draw: lazy(() => import("./Draw")),
  face: lazy(() => import("./Face")),
  llama: lazy(() => import("./Llama")),
  pose: lazy(() => import("./Pose")),
  reader: lazy(() => import("./Reader")),
  shoe: lazy(() => import("./Shoe")),
  toxicity: lazy(() => import("./Toxicity")),
  track: lazy(() => import("./Track")),
  hello: lazy(() => import("./Hello")),
} as const;

const getPage = (location: { hash: string }) => {
  const [, hash = Object.keys(PAGES).pop()] =
    decodeURI(location.hash).match(/^#(.+)/) || [];
  return hash;
};

export default function App() {
  const [page, setPage] = useState(getPage(history.location));

  useEffect(() =>
    // location is an object like window.location
    history.listen(({ location }) => setPage(getPage(location)))
  );

  const Page = PAGES[page];

  return (
    <section className={styles.App}>
      <h1 className={styles.Nav}>
        Hello
        {Object.keys(PAGES).map((page) => (
          <a key={page} href={`#${page}`}>
            {page}
          </a>
        ))}
        [{page}]
      </h1>
      <Suspense fallback={<Spinner />}>
        <Page />
      </Suspense>
    </section>
  );
}
