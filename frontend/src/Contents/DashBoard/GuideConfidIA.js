import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import "../../sass/Contents/Dashboard/GuideConfidIA.scss";

import useModalStore from "../../Store/useModalStore";
import { ReactComponent as NewsPaper } from "../../assets/icons/SVG/newsPaper.svg";
import { ReactComponent as Page } from "../../assets/icons/SVG/page.svg";

function GuideConfidIA() {
  const { t } = useTranslation(["Dashboard"]);
  const setSeeNewFeature = useModalStore((s) => s.setSeeNewFeature);
  return (
    <div className="GuideConfidIA">
      <div>
        <div className="Image">
          <NewsPaper className="picture" />
        </div>
        <div className="text">
          <h2>{t("GuideconfidIA.platform")}</h2>
          <h1>{t("GuideconfidIA.embark")}</h1>
          <p>{t("GuideconfidIA.learn")}</p>
        </div>
        <div className="Download">
          <Page style={{ backgroundColor: "#F9F6F6" }} stroke="black" />

          <p
            onClick={() => {
              setSeeNewFeature(true);
            }}
          >
            {t("GuideconfidIA.download")}
          </p>
        </div>
      </div>
      <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />
    </div>
  );
}

export default GuideConfidIA;
