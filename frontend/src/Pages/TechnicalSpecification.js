import React, { useTransition } from "react";
import "../sass/Pages/TechnicalSpecification.scss";

import Promote from "../Contents/TechnicalSpecification/Promote.js";
import Explanation from "../Contents/TechnicalSpecification/Explanation.js";
import { useTranslation } from "react-i18next";

export default function TechnicalSpecification() {
  const { t } = useTranslation(["TechnicalSpecification"]);
  return (
    <div className="TechnicalSpecification">
      <div className="Title">
        <h1>
          CONFID<span>IA</span>
        </h1>
        <h2>
          {t("T.1")} <br /> {t("T.2")}
        </h2>
      </div>

      <Promote />
      <Explanation />
    </div>
  );
}
