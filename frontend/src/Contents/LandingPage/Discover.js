import React from "react";
import "../../sass/Contents/LandingPage/Discover.scss";
import { useTranslation } from "react-i18next";
import Adventage from "../../Components/Adventage";

import image from "../../assets/HomePage/saas.png";
function Discover() {
  const { t } = useTranslation(["LandingPage"]);
  return (
    <div className="Discover">
      <h1>{t("DiscoverAdventage.Title")}</h1>
      <Adventage
        title={t("DiscoverAdventage.Ethique")}
        title2={t("DiscoverAdventage.Auto")}
        image2={image}
        image={image}
        text1={t("DiscoverAdventage.Desc.desc1")}
      />
      <Adventage
        title={t("DiscoverAdventage.Transparent")}
        title2={t("DiscoverAdventage.Productivity")}
        image2={image}
        image={image}
        text1={t("DiscoverAdventage.Desc.desc2")}
        text3={t("DiscoverAdventage.Desc.desc3")}
      />
      <button>{t("DiscoverAdventage.button")}</button>
    </div>
  );
}

export default Discover;
