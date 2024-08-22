import React from "react";
import "../../sass/Contents/HomePage/BoxIntro.scss";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

function BoxIntro() {
  let history = useHistory();
  const { t } = useTranslation(["HomePage", "Modal"]);

  return (
    <div className="AllIntroduction">
      <h1>ConfidIA</h1>
      <div className="NeedOnlyIA">
        <div className="title">
          <h1>{t("NeedOnlyIA.title1")}</h1>
          <h1>{t("NeedOnlyIA.title2")}</h1>
        </div>

        <p>
          {t("BoxIntro.desc1.1")} <br />
          {t("BoxIntro.desc1.2")} <br />
          {t("BoxIntro.desc1.3")} <br />
          {t("BoxIntro.desc1.4")}
        </p>
        <p>
          {t("BoxIntro.desc2.1")} <br />
          {t("BoxIntro.desc2.2")} <br />
          {t("BoxIntro.desc2.3")} <br />
          {t("BoxIntro.desc2.4")}
          <br />
          {t("BoxIntro.desc2.5")}
          <br />
          {t("BoxIntro.desc2.6")}
        </p>
        <button
          onClick={() => {
            // alert(t("askmore.text"));
            history.push("/contact");
            //  history.push("/offer");
          }}
        >
          {t("BoxIntro.button")}
          <p className="alertRedirect">{t("Modal:BadVersion.alert")}</p>
        </button>
      </div>
    </div>
  );
}

export default BoxIntro;
