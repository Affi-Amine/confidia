import React from "react";
import "../../sass/Contents/LandingPage/Testimony.scss";
import { useTranslation } from "react-i18next";
import Box from "../../Components/Box";

function Testimony() {
  const { t } = useTranslation(["LandingPage"]);
  return (
    <div className="Testimony">
      <h1>{t("Testimony.Title")}</h1>
      <div className="Allbox">
        <Box
          title={t("Testimony.Company.title")}
          text1={t("Testimony.Company.desc")}
        />
        <Box
          title={t("Testimony.Independant.title")}
          text1={t("Testimony.Independant.desc")}
        />
        <Box
          title={t("Testimony.User.title")}
          text1={t("Testimony.User.desc")}
        />
      </div>
      <button>{t("Testimony.button")}</button>
    </div>
  );
}

export default Testimony;
