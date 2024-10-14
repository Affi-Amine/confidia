import React from "react";
import InfoPage from "./InfoPage";

function OtherTypesCookiesPage() {
  return (
    <InfoPage 
      endpoint="http://127.0.0.1:8000/api/other-types-cookies/"
      title="Autres Types de Cookies"
    />
  );
}

export default OtherTypesCookiesPage;