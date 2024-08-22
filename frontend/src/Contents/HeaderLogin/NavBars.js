import React from "react";
import { useTranslation } from "react-i18next";
import useConfidiaDoc from "../../Store/useConfidiaDoc";
import "../../sass/Contents/HeaderLogin/NavBars.scss";
import Block from "./Block";

function NavBars() {
  const { t } = useTranslation(["HeaderLogin"]);
  const { project, setProject, allProjects } = useConfidiaDoc();
  const datafilter = allProjects.filter(
    (elem) => elem.id_project !== project.id_project
  );
  return (
    <div className="NavBars">
      <Block
        title={t("Nav.myProjects.title")}
        datafilter={datafilter}
        infos={t("Nav.update")}
        button={t("Nav.myProjects.button")}
        type={"update"}
        imgType={"dashboard"}
      />
      <Block
        title={t("Nav.docTechnic.title")}
        datafilter={datafilter}
        infos={t("Nav.update")}
        button={t("Nav.docTechnic.button")}
        type={"update"}
        imgType={"balise"}
      />
      <Block
        title={t("Nav.useGuide.title")}
        datafilter={datafilter}
        infos={t("Nav.create")}
        button={t("Nav.useGuide.button")}
        type={"update"}
        imgType={"papers"}
      />
      <Block
        title={t("Nav.testing.title")}
        datafilter={datafilter}
        infos={t("Nav.create")}
        button={t("Nav.testing.button")}
        type={"status"}
        imgType={"testing"}
        progress={t("Nav.progress")}
        finish={t("Nav.finish")}
      />

      <div className="Block">
        <h1>{t("Nav.connecteur.title")}</h1>
        <button>{t("Nav.connecteur.button")}</button>
      </div>
    </div>
  );
}

export default NavBars;
