import React from "react";
import InfoPage from "./InfoPage";

function FurtherDataInfoPage() {
  return (
    <InfoPage 
      endpoint="http://127.0.0.1:8000/api/further-data-info/"
      title="Clauses et Services Personnalisés"
    />
  );
}

export default FurtherDataInfoPage;