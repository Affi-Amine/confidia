import React, { useState } from "react";
import "../../sass/Contents/TechnicalSpecification/Explanation.scss";
import { useTranslation } from "react-i18next";

import BoxExplanation from "./BoxExplanation";
import connector from "../../assets/HomePage/Explanation/Connecteurs.png";
import docCode from "../../assets/HomePage/Explanation/DocumentationCode.png";
import docproject from "../../assets/HomePage/Explanation/DocumentationProjet.png";
import docTecfonc from "../../assets/HomePage/Explanation/DocumentationTechniqueFonctionnelle.png";
import enrichissementfunc from "../../assets/HomePage/Explanation/Enrichissementfonctionnel.png";
import equipe from "../../assets/HomePage/Explanation/Equipe.png";
import gestionProject from "../../assets/HomePage/Explanation/GestionProjet.png";
import semiStruct from "../../assets/HomePage/Explanation/SemiStructuré.png";
import struct from "../../assets/HomePage/Explanation/Structuré.png";

function Explanation() {
  const { t } = useTranslation(["TechnicalSpecification"]);
  const documentationTechnique = [
    {
      state: useState(false),
      title: "DocCode",
      titles: ["1", "2"],
      desc: [
        "desc1",
        "desc2",
        "desc3",
        "space",
        "desc4",
        "desc5",
        "space",
        "desc6",
        "desc7",
        "desc8",
        "desc9",
      ],
      image: docCode,
    },
    {
      state: useState(false),
      title: "DocDataStruct",
      titles: ["1", "2"],
      desc: ["desc1", "desc2", "desc3"],
      image: struct,
    },
    {
      state: useState(false),
      title: "DocSemiStructData",
      titles: ["1", "2"],
      desc: ["desc1", "desc2", "desc3", "desc4"],
      image: semiStruct,
    },
    {
      state: useState(false),
      title: "DocProject",
      titles: ["1", "2"],
      desc: ["desc1", "desc2", "desc3", "space", "desc4", "desc5"],
      image: docproject,
    },
    {
      state: useState(false),
      title: "FunctionaEnrichment",
      titles: ["1", "2"],
      desc: ["desc1", "desc2", "desc3"],
      image: enrichissementfunc,
    },
  ];
  const ProjectManagement = [
    {
      state: useState(false),
      title: "Teams",
      titles: ["1"],
      desc: ["desc1", "desc2"],
      image: equipe,
    },
    {
      state: useState(false),
      title: "Connector",
      titles: ["1"],
      desc: ["desc1", "desc2", "desc3", "desc4", "desc5"],
      image: connector,
    },
  ];
  const ProjectManager = [
    {
      state: useState(false),
      title: "ProjectManagement",
      titles: ["1"],
      desc: ["desc1", "desc2", "desc3", "desc4", "desc5", "desc6"],
      image: gestionProject,
    },
    {
      state: useState(false),
      title: "TFDocumentation",
      titles: ["1", "2"],
      desc: ["desc1", "desc2"],
      image: docTecfonc,
    },
  ];

  return (
    <div className="Explanation">
      {/* <div className="borderTop"></div> */}
      <BoxExplanation
        Title={t("DocTechnic.title")}
        jsonPart={"DocTechnic"}
        boxes={documentationTechnique}
      />
      <hr />
      <div className="bottomBar"></div>
      <BoxExplanation
        Title={t("ProjectManagement.title")}
        jsonPart={"ProjectManagement"}
        boxes={ProjectManagement}
      />
      <hr />
      <BoxExplanation
        Title={t("ProjectManager.title")}
        jsonPart={"ProjectManager"}
        boxes={ProjectManager}
      />
    </div>
  );
}
export default Explanation;
