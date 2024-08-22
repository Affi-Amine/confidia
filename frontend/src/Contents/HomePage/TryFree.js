import React from "react";
import "../../sass/Contents/HomePage/TryFree.scss";
import Image from "../../assets/HomePage/linewhite.png";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useAuthenticationActions } from "../../Utils/useAuthenticationActions";
function TryFree() {
  let history = useHistory();
  const { t } = useTranslation(["HomePage", "Modal"]);
  const { handleLoginPopup } = useAuthenticationActions();
  return (
    <div className="TryFree">
      <img src={Image} loading="lazy" alt="brume blanche et grise" />

      <div>
        <h1>{t("TryFree.title")}</h1>
        <div>
          <button
            onClick={() => {
              // alert(t("askmore.text"));
              history.push("/contact");
            }}
          >
            {t("TryFree.request")}
          </button>
          <button onClick={() => handleLoginPopup()}>
            {t("TryFree.register")}
          </button>
          <button
            onClick={() => {
              // alert(t("askmore.text"));
              history.push("/contact");
            }}
          >
            {t("TryFree.seeOffers")}
            <p className="alertRedirect">{t("Modal:BadVersion.alert")}</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TryFree;
