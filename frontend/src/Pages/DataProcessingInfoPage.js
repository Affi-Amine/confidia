import React from "react";
import InfoPage from "./InfoPage";

function DataProcessingInfoPage() {
  return (
    <InfoPage 
      endpoint="http://127.0.0.1:8000/api/data-processing-info/"
      title="Clauses et Services"
    />
  );
}

export default DataProcessingInfoPage;