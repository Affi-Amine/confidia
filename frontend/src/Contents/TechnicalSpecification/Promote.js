import React from "react";
import "../../sass/Contents/TechnicalSpecification/Promote.scss";
import PromoteFonctionality from "./PromoteFonctionality";
import { useTranslation } from "react-i18next";

import demoImg from "../../assets/HomePage/Demo.png";
import dashboardImg from "../../assets/HomePage/dashboard.png";
import docTechImg from "../../assets/HomePage/docTechnic.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function Promote() {
  const { t } = useTranslation(["TechnicalSpecification"]);
  let history = useHistory();
  let SubtitlesDemo = [
    t("Promote.Demo.subTitles.1"),
    t("Promote.Demo.subTitles.2"),
  ];
  let boxDemo = [
    t("Promote.Demo.desc1"),
    t("Promote.Demo.desc2"),
    t("Promote.Demo.desc3"),
    t("Promote.Demo.desc4"),
    t("Promote.Demo.desc5"),
    t("Promote.Demo.desc6"),
  ];
  let SubtitlesDashboard = [
    t("Promote.Dashboard.subTitles.1"),
    t("Promote.Dashboard.subTitles.2"),
  ];
  let boxDashboard = [
    t("Promote.Dashboard.desc1"),
    t("Promote.Dashboard.desc2"),
    t("Promote.Dashboard.desc3"),
    t("Promote.Dashboard.desc4"),
    t("Promote.Dashboard.desc5"),
    t("Promote.Dashboard.desc6"),
  ];
  let SubtitlesDocTech = [
    t("Promote.DocTech.subTitles.1"),
    t("Promote.DocTech.subTitles.2"),
  ];
  let boxDocTech = [
    t("Promote.DocTech.desc1"),
    t("Promote.DocTech.desc2"),
    t("Promote.DocTech.desc3"),
    t("Promote.DocTech.desc4"),
    t("Promote.DocTech.desc5"),
    t("Promote.DocTech.desc6"),
  ];
  return (
    <div className="Promote">
      <PromoteFonctionality
        right={true}
        title={t("Promote.Demo.title")}
        // subtitle={t("Promote.Demo.subTitle")}
        subtitles={SubtitlesDemo}
        textes={boxDemo}
        Image={demoImg}
      />
      <PromoteFonctionality
        right={false}
        title={t("Promote.Dashboard.title")}
        // subtitle={t("Promote.Dashboard.subTitle")}
        subtitles={SubtitlesDashboard}
        textes={boxDashboard}
        Image={dashboardImg}
      />
      <PromoteFonctionality
        right={true}
        title={t("Promote.DocTech.title")}
        // subtitle={t("Promote.DocTech.subTitle")}
        subtitles={SubtitlesDocTech}
        textes={boxDocTech}
        Image={docTechImg}
      />
      <div className="BoxButtons">
        <button onClick={() => history.push("video-demonstration")}>
          {t("translation:ButtonsGlobals.quicktourC")}
        </button>
      </div>
    </div>
  );
}

export default Promote;
