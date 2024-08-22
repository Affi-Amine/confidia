import React from "react";
import "../../sass/Contents/Dashboard/Demonstration.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

import image from "../../assets/img/code.jpg";
import ImgBox from "../../Components/ImgBox";
import { ReactComponent as Play } from "../../assets/icons/SVG/play-outline.svg";
import { useHistory } from "react-router-dom";
function Demonstration() {
  let history = useHistory();
  const { t } = useTranslation(["Dashboard"]);
  return (
    <div className="Demonstration">
      <ImgBox image={image} descImage="ligne de codes" />
      <section>
        <FontAwesomeIcon
          className="icon"
          icon="fa-solid fa-ellipsis-vertical"
        />
        <div className="texts">
          <h2>{t("Video.platform")}</h2>
          <h1>{t("Video.demo")}</h1>
          <p>{t("Video.learn")}</p>
          <div className="button">
            <Play />
            <p
              onClick={() => {
                history.push("/video-demonstration");
              }}
            >
              {t("Video.visio")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Demonstration;
