import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import "../../sass/Contents/Advantages/AdvantageBtnNavtop.scss";

export default function AdvantageBtnNavtop({ namePage }) {
  const { t } = useTranslation(["Advantages"]);
  const history = useHistory();

  return (
    <div className="AdvantageBtnNavtop">
      <button onClick={() => history.push("/advantages")}>
        <FontAwesomeIcon className="iconLeft" icon="fa-solid fa-left-long" />
        {t("buttons.advantage")}
      </button>
      {namePage && namePage === "VideoEvenements" && (
        <button onClick={() => history.push("/advantages/evenements")}>
          {/* <FontAwesomeIcon className="iconLeft" icon="fa-solid fa-left-long" /> */}
          {t("buttons.event")}
        </button>
      )}
      <button onClick={() => history.push("/homeLogin-confidia")}>
        {t("buttons.homeConfidia")}
        <FontAwesomeIcon className="iconRight" icon="fa-solid fa-right-long" />
      </button>
    </div>
  );
}
