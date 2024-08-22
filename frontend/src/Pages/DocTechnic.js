import React, { useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import "../sass/Pages/DocTechnic.scss";

import Menu from "../Components/Menu";
import ProjectInfos from "../Contents/DashBoard/ProjectInfos";

import { ReactComponent as PenEdit } from "../assets/icons/SVG/edit-pencil.svg";
import { ReactComponent as FolderSVG } from "../assets/icons/SVG/folder.svg";
import { ReactComponent as TreeStructSVG } from "../assets/icons/SVG/tree-structure.svg";

import UpdateProjectInfos from "../Contents/DashBoard/UpdateProjectInfos";
import Board from "../Contents/DocTechnic/Board";
import FileExplorer from "../Contents/DocTechnic/FileExplorer";
import FilterDoc from "../Contents/DocTechnic/FilterDoc";
import ManageSee from "../Contents/DocTechnic/ManageSee";
import Scripts from "../Contents/DocTechnic/Scripts";
import Search from "../Contents/DocTechnic/Search";

import TreeStruct from "../Contents/DocTechnic/TreeStruct";
import useConfidiaDoc from "../Store/useConfidiaDoc";
import useModalStore from "../Store/useModalStore";
import { isObjectEmpty } from "../Utils/isObjectEmpty";
import useCheckDocTechnic from "../hooks/useCheckDocTechnic";

function DocTechnic({ props }) {
  const { t } = useTranslation(["DocTechnic"]);
  const history = useHistory();
  const { dataKeepChoice } = props;
  const {
    openProjectInfos,
    setSeeDataKeepChoice,
    setOpenProjectInfos,
    openUpdateProjectInfos,
    setOpenUpdateProjectInfos,
  } = useModalStore();
  const { docTechnic } = useConfidiaDoc();
  useCheckDocTechnic();

  useEffect(() => {
    if (dataKeepChoice === null) setSeeDataKeepChoice(true);
  }, [dataKeepChoice, setSeeDataKeepChoice]);

  const [allseeBoard, setAllseeBoard] = useState(false); // Table functionality to select which column displayed
  const [searchBoard, setSearchBoard] = useState(""); // Search name in board

  const [injectCode, setInjetCode] = useState(false); // Voir Code et peusdo code fusionner ou non

  const [tabSBoard, setTabSBoard] = useState([]); // Liste des sélection dans le board à Surligner dans le script

  const [frontCompactOption, setFrontCompactOption] = useState("compact"); // Envoie au back: 'compact' ou 'minimum'

  // Filter Script
  const [selectInput, setSelectInput] = useState(true);
  const [selectOutput, setSelectOutput] = useState(true);
  // FilterDoc state
  const [resumFilters, setResumFilters] = useState([]); // Resumer des filtres
  const [checkedFilters, setCheckedFilters] = useState({}); // Check des types de filtres selectionner
  const [selectedFilters, setSelectedFilters] = useState({}); // Stock les filtres selectionner dans la liste déroulante

  // Affichage ou non
  const [seeScriptCom, setseeScriptCom] = useState(false); // Affiche ou non les commentaires dans le script
  const [seeCom, setSeeCom] = useState(false); // Box Commentaire ajouter de l'utilisateur
  const [seeView, setSetView] = useState(false); // viewer folder or treeStruct
  const [seeFilters, setSeeFilters] = useState(false); // Voir les filtres
  const [seeCode, setSeeCode] = useState(true); // Voir code
  const [seePC, setSeePC] = useState(true); // Voir pseudo code
  const [seeICodePC, setSeeIcodePC] = useState(true); // Voir code fusionner
  const [seeBoard, setSeeBoard] = useState(true); // Voir le Board
  const [seeExplorerFile, setExplorerFile] = useState(false); // Explorateur de fichier
  const [seeSearch, setSeeSearch] = useState(true); // Explorer
  const [seeEditDocTech, setSeeEditDocTech] = useState(false); // Editeur de text
  const [scrollSynchr, setScrollSynchr] = useState(true); // Shynchronise Code / Pseudo code / Commentaire /Code fusionner

  const linePsCodeRefs = useRef({});
  const lineScriptCodeRefs = useRef({});
  const psCodeRef = useRef(null);
  const inCodeRef = useRef(null);
  const boxComRef = useRef(null);
  const injCodeRef = useRef(null);
  const editScriptRef = useRef(null);

  if (!docTechnic || docTechnic.length === 0) {
    return <div>Chargement...</div>;
  }
  function BoardScrollToElementScript(rid) {
    setScrollSynchr(false);

    const elementPs = linePsCodeRefs.current[`ps-${rid}`]; // pseudo code
    const elementSc = lineScriptCodeRefs.current[`sc-${rid}`]; // script code

    if (elementPs) {
      elementPs.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }

    setTimeout(() => {
      if (elementSc) {
        elementSc.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      setTimeout(() => {
        setScrollSynchr(true);
      }, 500);
    }, 100);
  }

  function HandleScrollSynchr(event) {
    if (!scrollSynchr) return; // Ignore le défilement si la synchronisation est désactivée

    const { target } = event;
    const otherDivs = [
      psCodeRef.current,
      inCodeRef.current,
      boxComRef.current,
      injCodeRef.current,
      editScriptRef.current,
    ].filter((div) => div && div !== target); // Filtre pour ne pas inclure la source du défilement

    otherDivs.forEach((div) => {
      div.scrollTop = target.scrollTop;
      div.scrollLeft = target.scrollLeft;
    });
  }
  // props envoyer a : ManageSee
  let allAffichage = {
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
  };
  let propsFilterDoc = {
    resumFilters,
    setResumFilters,
    checkedFilters,
    setCheckedFilters,
    selectedFilters,
    setSelectedFilters,
    setSeeFilters,
  };
  let propsBoard = {
    allseeBoard,
    searchBoard,
    tabSBoard,
    setTabSBoard,
    resumFilters,
    BoardScrollToElementScript,
  };
  let propsScript = {
    selectInput,
    setSelectInput,
    selectOutput,
    setSelectOutput,
    seeScriptCom,
    setseeScriptCom,
    seeCom,
    seeCode,
    seePC,
    seeICodePC,
    injectCode,
    setInjetCode,
    tabSBoard,
    setTabSBoard,
    seeEditDocTech,
    scrollSynchr,
    setScrollSynchr,
    linePsCodeRefs,
    lineScriptCodeRefs,
    psCodeRef,
    inCodeRef,
    boxComRef,
    injCodeRef,
    editScriptRef,
    HandleScrollSynchr,
  };
  let propsSearch = {
    selectInput,
    setSelectInput,
    selectOutput,
    setSelectOutput,
    seeSearch,
    setSeeSearch,
    seeFilters,
    setSeeFilters,
    setSearchBoard,
    resumFilters,
    setResumFilters,
    statusFilter: isObjectEmpty(selectedFilters),
  };

  let conditionSeeScripts =
    ((injectCode && seeICodePC) || !injectCode || seeEditDocTech || seeCom) &&
    (seeCode || seePC || seeEditDocTech || seeCom);

  return (
    <div className="DocTechnic">
      {openProjectInfos === true && (
        <ProjectInfos setOpenProjectInfos={setOpenProjectInfos} />
      )}
      {openUpdateProjectInfos === true && (
        <UpdateProjectInfos
          openUpdateProjectInfos={openUpdateProjectInfos}
          setOpenUpdateProjectInfos={setOpenUpdateProjectInfos}
        />
      )}
      <ManageSee allAffichage={allAffichage} />
      {seeFilters && <FilterDoc propsFilterDoc={propsFilterDoc} />}
      <section>
        <Menu />
        <div className="Page">
          <div className="Block1" style={{ height: !seeBoard && "inherit" }}>
            <Search propsSearch={propsSearch} />
            {seeBoard && (
              <>
                <Board propsBoard={propsBoard} />
                <div className="BoxPenEdit">
                  <PenEdit
                    className="PenEdit"
                    onClick={() => setAllseeBoard(!allseeBoard)}
                  />
                </div>
              </>
            )}
          </div>
          <div className="Block2">
            {seeExplorerFile && (
              <div className="boxViewer">
                <div className="Viewer">
                  <div className="bar"></div>
                  {seeView ? (
                    <p>{t("Viewer.file")}</p>
                  ) : (
                    <p>{t("Viewer.flow")}</p>
                  )}
                  <div>
                    <button onClick={() => setSetView(true)}>
                      <FolderSVG stroke="white" />
                    </button>
                    <button onClick={() => setSetView(false)}>
                      <TreeStructSVG />
                    </button>
                  </div>
                </div>
                {seeView ? <FileExplorer /> : <TreeStruct />}
              </div>
            )}

            {conditionSeeScripts && <Scripts propsScript={propsScript} />}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DocTechnic;
