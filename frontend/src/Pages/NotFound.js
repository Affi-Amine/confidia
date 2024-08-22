import React from "react";
import "../sass/Pages/NotFound.scss";
import { useTranslation } from "react-i18next";

function NotFound() {
  const { t } = useTranslation(["NotFound"]);
  return (
    <div className="NotFound">
      <h1> Oh Oh...</h1>
      <p className="text">{t("text")}</p>
      <p className="num">404</p>
    </div>
  );
}

export default NotFound;
