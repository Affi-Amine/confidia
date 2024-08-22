import { Viewer, Worker } from "@react-pdf-viewer/core";
import React from "react";
import "../../../sass/Pages/Quiz/Reglements/R24Q3.scss";

import jsonR14Q3 from "../../../PDF/Quiz/Reglements/JEU_CONCOURS_DSFORDS.pdf";

export default function Reglement24Q3() {
  return (
    <div
      className="Reglement R24Q3"
      style={{
        margin: "0 auto",
        width: "80%",
      }}
    >
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
      >
        <Viewer fileUrl={jsonR14Q3} style={{ height: "100%", width: "100%" }} />
      </Worker>
    </div>
  );
}
