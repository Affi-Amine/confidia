import React from "react";
import "../sass/Modals/DataKeepChoice.scss";
import { useTranslation } from "react-i18next";
import useModalStore from "../Store/useModalStore";
import useGlobalParam from "../Store/useGlobalParam";
function DataKeepChoice() {
  const { t } = useTranslation(["Modal"]);
  const { seeDataKeepChoice, setSeeDataKeepChoice } = useModalStore();
  const setDataKeepChoice = useGlobalParam((s) => s.setDataKeepChoice);
  if (!seeDataKeepChoice) return null;
  return (
    <div className="DataKeepChoice">
      <p>{t("DataKeepChoice.message")}</p>
      <div className="buttons">
        <button
          onClick={() => {
            setDataKeepChoice(false);
            setSeeDataKeepChoice(false);
          }}
        >
          {t("DataKeepChoice.buttons.notKeep")}
        </button>
        <button
          onClick={() => {
            setDataKeepChoice(true);
            setSeeDataKeepChoice(false);
          }}
        >
          {t("DataKeepChoice.buttons.keep")}
        </button>
      </div>
    </div>
  );
}
export default DataKeepChoice;
