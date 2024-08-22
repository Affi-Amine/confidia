import React from "react";
import { useTranslation } from "react-i18next";
import "../sass/Modals/NewFeature.scss";
import useModalStore from "../Store/useModalStore";

function NewFeature() {
  const { t } = useTranslation(["Modal"]);
  const { seeNewFeature, setSeeNewFeature } = useModalStore();
  if (!seeNewFeature) return null;
  return (
    <div className={seeNewFeature ? "boxNewFeature" : "None"}>
      <div className="NewFeature">
        <p>{t("NewFeature.message")}</p>
      </div>
      <div className="boxButtons">
        <a href="/contact" target="_blank" rel="noopener noreferrer">
          {t("NewFeature.contactUs")}
        </a>

        <button onClick={() => setSeeNewFeature(false)}>OK</button>
      </div>
    </div>
  );
}
export default NewFeature;
