import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import LinePercentage from "../../Components/LinePercentage";
import "../../sass/Contents/Dashboard/Quality.scss";

import useConfidiaDoc from "../../Store/useConfidiaDoc";
import useModalStore from "../../Store/useModalStore";
import { ReactComponent as ClickMain } from "../../assets/icons/SVG/open-select-hand-gesture.svg";
import { ReactComponent as StarMedal } from "../../assets/icons/SVG/star-medal.svg";
import KPI from "./KPI";

function Quality() {
  const { t } = useTranslation(["Dashboard"]);
  const { dashboard } = useConfidiaDoc();
  const setSeeNewFeature = useModalStore((s) => s.setSeeNewFeature);
  const [seeKPI, setSeeKPI] = useState(false);
  const dataElements = dashboard.Quality;
  const [page, setPage] = useState(0);
  return (
    <div className="Quality">
      <div className="intro">
        <h5>
          {page > 0 && (
            <FontAwesomeIcon
              className="icon"
              onClick={() => setPage(page - 1)}
              icon="fa-solid fa-arrow-left"
            />
          )}
          Quality
        </h5>
        <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />
      </div>
      {/* <div className="Block">
        <h1>{t("Quality.quality")}</h1>
        <p>{t("Quality.param")}</p>
      </div> */}

      {page === 0 && (
        <div className="page1">
          <StarMedal className="img" />
          <p>{t("Quality.evaluation")}</p>
          <button onClick={() => setPage(1)}>
            <ClickMain className="hand" />
            {t("Quality.buttonConf")}
          </button>
        </div>
      )}
      {page === 1 && (
        <div className="page2">
          <div className="title">
            <StarMedal className="icon" />
            <h6>{t("Quality.indicator")}</h6>
          </div>
          <h6>{t("Quality.select")}</h6>
          {/* <p className="suggestion">{t("Quality.suggestion")}</p> */}
          <button
            onClick={() => {
              setSeeNewFeature(true);
            }}
          >
            {t("Quality.completion")}
          </button>
          <p className="where">{t("Quality.where")}</p>
          <p
            className="create"
            onClick={() => {
              setSeeKPI(true);
            }}
          >
            {t("Quality.create")}
          </p>
          <button className="buttValid" onClick={() => setPage(2)}>
            {t("Quality.buttonValidate")}
          </button>
        </div>
      )}

      {page === 2 && (
        <div className="page3">
          <div className="title">
            <StarMedal className="icon" /> <h6>{t("Quality.quality")}</h6>
          </div>
          <p>{t("Quality.param")}</p>
          <div className="Elements">
            {dataElements.map((elem, i) => {
              return (
                <LinePercentage
                  keyLinePercentage={i}
                  title={elem.title}
                  number={elem.number}
                />
              );
            })}
          </div>
        </div>
      )}
      {seeKPI && <KPI props={{ seeKPI, setSeeKPI }} />}
    </div>
  );
}

export default Quality;
