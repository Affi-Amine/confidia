import React from "react";
import InfoPage from "./InfoPage";

function TechnicalCookiesPage() {
  return (
    <InfoPage 
      endpoint="http://127.0.0.1:8000/api/technical-cookies/"
      title="Cookies Techniques"
    />
  );
}

export default TechnicalCookiesPage;