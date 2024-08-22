import React from "react";
import "../../sass/Contents/HomePage/TrustedUs.scss";
import { useTranslation } from "react-i18next";

import NameCompagny from "../../Components/NameCompany";

function TrustedUs() {
  const { t } = useTranslation(["HomePage"]);
  return (
    <div className="TrustedUs">
      <h1>{t("TrustedUs.title")}</h1>
      <div className="BoxCompany">
        <NameCompagny />
        <NameCompagny />
        <NameCompagny />
      </div>
    </div>
  );
}

export default TrustedUs;
