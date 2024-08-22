import React from "react";
import { useTranslation } from "react-i18next";
import "../sass/Modals/LearnMoreDocM.scss";
import useModalStore from "../Store/useModalStore";
export default function LearnMoreDocM() {
  const { t } = useTranslation(["Modal"]);
  const { seeLearnMoreDocM, setSeeLearnMoreDocM } = useModalStore();

  if (!seeLearnMoreDocM) return null;
  return (
    <div className="LearnMoreDocM">
      <div className="close" onClick={() => setSeeLearnMoreDocM(false)}>
        X
      </div>
      <h2>{t("LearnMoreDocM.title")}</h2>
      <br />
      <ul>{t("LearnMoreDocM.texts.1")}</ul>
      <p>{t("LearnMoreDocM.texts.2")}</p> <br />
      <ul>{t("LearnMoreDocM.texts.3")}</ul>
      <p> {t("LearnMoreDocM.texts.4")} </p> <br />
      <ul>{t("LearnMoreDocM.texts.5")}</ul>
      <p>{t("LearnMoreDocM.texts.6")}</p>
    </div>
  );
}
