import React from "react";
import { useTranslation } from "react-i18next";
import useConfidiaDoc from "../../Store/useConfidiaDoc";
import "../../sass/Contents/HeaderLogin/ProjectSelect.scss";

function ProjectSelect() {
  const { t } = useTranslation(["HeaderLogin"]);
  const { project, setProject, allProjects } = useConfidiaDoc();
  const datafilter = allProjects.filter(
    (elem) => elem.id_project !== project.id_project
  );
  return (
    <div className="ProjectSelect">
      <div className="Block">
        <h1>{t("Nav.myProjects.title")}</h1>
        {datafilter.map((select, i) => {
          const { id_project, name } = select;

          return (
            <div className="project" key={id_project}>
              <h1 onClick={() => setProject(select)}>{name}</h1>
            </div>
          );
        })}
        <button>{t("Nav.myProjects.button")}</button>
      </div>
      <div className="Block">
        <h1>{t("Nav.docTechnic.title")}</h1>
        {datafilter.map((select, i) => {
          const { id_project, name } = select;

          return (
            <div className="doc" key={id_project}>
              <h1 onClick={() => setProject(select)}>{name}</h1>
            </div>
          );
        })}
        <button>{t("Nav.docTechnic.button")}</button>
      </div>
      <div className="Block">
        <h1>{t("Nav.useGuide.title")}</h1>
        {datafilter.map((select, i) => {
          const { id_project, name } = select;

          return (
            <div className="guide" key={id_project}>
              <h1 onClick={() => setProject(select)}>{name}</h1>
            </div>
          );
        })}
        <button>{t("Nav.useGuide.button")}</button>
      </div>
      <div className="Block">
        <h1>{t("Nav.testing.title")}</h1>
        {datafilter.map((select, i) => {
          const { id_project, name } = select;

          return (
            <div className="testing" key={id_project}>
              <h1 onClick={() => setProject(select)}>{name}</h1>
            </div>
          );
        })}
        <button>{t("Nav.testing.button")}</button>
      </div>
      <div className="Block">
        <h1>{t("Nav.connecteur.title")}</h1>
        <button>{t("Nav.connecteur.button")}</button>
      </div>
    </div>
  );
}

export default ProjectSelect;
