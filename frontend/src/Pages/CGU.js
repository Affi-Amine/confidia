import React, { useEffect, useContext } from "react";
import "../sass/Pages/CGU.scss";
import FRPolicy from "../PDF/FR-DS-for-DS-CG1.pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import useGlobalParam from "../Store/useGlobalParam";

export default function CGU() {
  const { language } = useGlobalParam();
  const languagePolicy = { fr: FRPolicy, en: FRPolicy, it: FRPolicy };

  return (
    <div
      className="CGU"
      style={{
        margin: "0 auto",
        width: "80%",
      }}
    >
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
      >
        <Viewer
          fileUrl={languagePolicy[language]}
          style={{ height: "100%", width: "100%" }}
        />
      </Worker>
    </div>
  );
}
