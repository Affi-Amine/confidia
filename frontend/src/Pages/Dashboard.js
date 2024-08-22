import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../sass/Pages/Dashboard.scss";

import Menu from "../Components/Menu";

import Alertes from "../Contents/DashBoard/Alertes";
import Demonstration from "../Contents/DashBoard/Demonstration";
import GuideConfidIA from "../Contents/DashBoard/GuideConfidIA";
import ProjectInfos from "../Contents/DashBoard/ProjectInfos";
import Quality from "../Contents/DashBoard/Quality";
import Statement from "../Contents/DashBoard/Statement";
import UpdateProjectInfos from "../Contents/DashBoard/UpdateProjectInfos";

import useConfidiaDoc from "../Store/useConfidiaDoc";
import useModalStore from "../Store/useModalStore";
import useCheckDocTechnic from "../hooks/useCheckDocTechnic";

export default function Dashboard({ props }) {
  const { t } = useTranslation(["Dashboard"]);

  const { dataKeepChoice } = props;
  const { dashboard } = useConfidiaDoc();

  const {
    setOpenProjectInfos,
    openUpdateProjectInfos,
    setOpenUpdateProjectInfos,
    setSeeNewFeature,
    setSeeDataKeepChoice,
  } = useModalStore();

  useCheckDocTechnic();

  let numStatement = dashboard?.statement || [];

  useEffect(() => {
    if (dataKeepChoice === null) setSeeDataKeepChoice(true);
  }, [dataKeepChoice, setSeeDataKeepChoice]);
  if (!dashboard || (Array.isArray(dashboard) && dashboard.length === 0)) {
    return <div>Chargement...</div>;
  }
  return (
    <div className="Dashboard">
      <ProjectInfos setOpenProjectInfos={setOpenProjectInfos} />
      {openUpdateProjectInfos === true && (
        <UpdateProjectInfos
          openUpdateProjectInfos={openUpdateProjectInfos}
          setOpenUpdateProjectInfos={setOpenUpdateProjectInfos}
        />
      )}
      <section>
        <Menu />
        <div className="AllBlock">
          <div
            className="Widget"
            onClick={() => {
              setSeeNewFeature(true);
            }}
          >
            {t("AddWidget")}
          </div>

          {numStatement.length <= 3 ? (
            <div className="page">
              <div className="Blocks">
                <Statement />
                <GuideConfidIA />
                <Quality />
              </div>
              <div className="Blocks2">
                <Alertes />
                <Demonstration />
              </div>
            </div>
          ) : (
            <div className="MultiStatement">
              <Statement />
              <div>
                <div className="Blocks">
                  <GuideConfidIA />
                  <Quality />
                </div>
                <div className="Blocks2">
                  <Alertes />
                  <Demonstration />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
