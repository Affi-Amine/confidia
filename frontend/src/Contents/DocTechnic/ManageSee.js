// DLO-1007
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../../sass/Contents/DocTechnic/ManageSee.scss";

import { useTranslation } from "react-i18next";
import useModalStore from "../../Store/useModalStore";
import { ReactComponent as FolderSVG } from "../../assets/icons/SVG/folder.svg";
import { ReactComponent as TreeStructSVG } from "../../assets/icons/SVG/tree-structure.svg";

function ManageSee({ allAffichage }) {
  const {
    seeCode,
    setSeeCode,
    seeCom,
    setSeeCom,
    seePC,
    setSeePC,
    seeICodePC,
    setSeeIcodePC,
    seeBoard,
    setSeeBoard,
    seeExplorerFile,
    setExplorerFile,
    injectCode,
    seeEditDocTech,
    setSeeEditDocTech,
  } = allAffichage;
  const setSeeNewFeature = useModalStore((s) => s.setSeeNewFeature);
  const setSeeBadVersion = useModalStore((s) => s.setSeeBadVersion);
  const { t } = useTranslation(["DocTechnic"]);
  let accesEnv = ["TEST", "DEV"];
  return (
    <div className="ManageSee">
      <div className="boxManageSee">
        <button className="boxButton">
          <FontAwesomeIcon
            className={seeBoard ? "icon ActivateT" : "icon ActivateF"}
            onClick={() => setSeeBoard(!seeBoard)}
            icon="fa-solid fa-table"
          />
          <p className="descIcon">{t("ButtonDesc.1")}</p>
        </button>
        <button className="boxButton">
          <div
            className={
              seeExplorerFile
                ? "Fusionicon Viewer ActivateT"
                : "Fusionicon Viewer ActivateF"
            }
            onClick={() => {
              if (accesEnv.includes(process.env.REACT_APP_ENVNAME)) {
                setExplorerFile(!seeExplorerFile);
              } else {
                setSeeNewFeature(true);
              }
            }}
          >
            <FolderSVG className="icon" />
            <TreeStructSVG className="icon" />
          </div>
          <p className="descIcon">{t("ButtonDesc.2")}</p>
        </button>

        <button className="boxButton">
          <FontAwesomeIcon
            icon="fa-solid fa-pen-nib"
            className={seeEditDocTech ? "icon ActivateT" : "icon ActivateF"}
            onClick={() => {
              setSeeEditDocTech(!seeEditDocTech);
            }}
          />
          <p className="descIcon">{t("ButtonDesc.3")}</p>
        </button>
        {injectCode && (
          <button className="boxButton">
            <div
              className={
                seeICodePC ? "Fusionicon ActivateT" : "Fusionicon ActivateF"
              }
              onClick={() => setSeeIcodePC(!seeICodePC)}
            >
              <FontAwesomeIcon
                className="icon FAIicon"
                icon="fa-solid fa-file"
              />
              <FontAwesomeIcon
                className="icon FAIicon"
                icon="fa-solid fa-code"
              />
            </div>
            <p className="descIcon">{t("ButtonDesc.11")}</p>
          </button>
        )}
        {!injectCode && (
          <>
            <button className="boxButton">
              <FontAwesomeIcon
                className={seeCode ? "icon ActivateT" : "icon ActivateF"}
                onClick={() => setSeeCode(!seeCode)}
                icon="fa-solid fa-code"
              />
              <p className="descIcon">{t("ButtonDesc.4")}</p>
            </button>
            <button className="boxButton">
              <FontAwesomeIcon
                className={seePC ? "icon ActivateT" : "icon ActivateF"}
                onClick={() => setSeePC(!seePC)}
                icon="fa-solid fa-file"
              />
              <p className="descIcon">{t("ButtonDesc.5")}</p>
            </button>
            <button className="boxButton">
              <FontAwesomeIcon
                className={seeCom ? "icon ActivateT" : "icon ActivateF"}
                onClick={() => {
                  setSeeCom(!seeCom);
                }}
                icon="fa-solid fa-comment"
              />
              <p className="descIcon">{t("ButtonDesc.6")}</p>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
export default ManageSee;
