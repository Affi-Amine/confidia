import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import "../../sass/Contents/HomePage/SpecializingIA.scss";

export default function SpecializingIA({ currentHomePageOurteamsRef }) {
  const { t } = useTranslation(["HomePage"]);
  let history = useHistory();
  return (
    <div className="SpecializingIA" ref={currentHomePageOurteamsRef}>
      <h2>{t("SpecializingIA.title")}</h2>
      <section className="Texts">
        <div className="block1">
          <p>{t("SpecializingIA.text1")}</p>
          <p>{t("SpecializingIA.text2")}</p>
        </div>
        <div className="block2">
          <p>{t("SpecializingIA.text3")}</p>
          <p>{t("SpecializingIA.text4")}</p>
        </div>
      </section>
      <div className="BoxButtons">
        <button className="WhoAreWe" onClick={() => history.push("/about")}>
          {t("ButtonsGlobals.WhoAreWe")}
        </button>
      </div>
    </div>
  );
}
