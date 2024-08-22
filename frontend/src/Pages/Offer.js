import React from "react";
import { useTranslation } from "react-i18next";
import CubeBP from "../assets/img/CubeBluePurple.png";
import ImgBox from "../Components/ImgBox";
import BoxQuestions from "../Contents/Offer/BoxQuestions";
import DetailsOffers from "../Contents/Offer/DetailsOffers";
import "../sass/Pages/Offer.scss";

export default function Offer() {
  const { t } = useTranslation(["Offer"]);
  return (
    <div className="Offer">
      <h1>{t("h1")}</h1>
      <div className="borderTop"></div>
      <div className="Intro">
        <ImgBox image={CubeBP} descImage={"cube blue and purple"} />
        <div>
          <h2>{t("Intro.T")}</h2>
          <p>{t("Intro.t1")}</p>
        </div>
      </div>
      <div className="AllBoxButtons BoxButton">
        <button className="btn-dark">{t("Intro.b1")}</button>
      </div>
      <DetailsOffers />

      <BoxQuestions />
    </div>
  );
}
