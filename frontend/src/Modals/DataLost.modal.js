import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import "../sass/Modals/DataLost.scss";
import useModalStore from "../Store/useModalStore";

function DataLost() {
  const { t } = useTranslation(["Modal"]);
  let history = useHistory();
  const { seeDataLostModal, setSeeDataLostModal } = useModalStore();

  if (!seeDataLostModal) return null;
  return (
    <div className="DataLost">
      <h2>{t("Datalost.title")}</h2>
      <div className="Texts">
        <p>
          {t("Datalost.text.1")} <span>{t("Datalost.text.span1")}</span>
        </p>
        <p>
          {t("Datalost.text.2")} <span>{t("Datalost.text.span2")}</span>
        </p>
        <p>{t("Datalost.text.3")}</p>
      </div>

      <div className="buttons">
        <button onClick={() => setSeeDataLostModal(false)}>
          {t("Datalost.buttons.stay")}
        </button>
        <button
          onClick={() => {
            setSeeDataLostModal(false);
            history.push("/");
          }}
        >
          {t("Datalost.buttons.quit")}
        </button>
      </div>
    </div>
  );
}
export default DataLost;
