// DLO-1007
import React, { useEffect, useState } from "react";
import "../../sass/Contents/DocTechnic/Scripts.scss";

import { useTranslation } from "react-i18next";

import { ReactComponent as ArrowLeft } from "../../assets/icons/SVG/arrow-left.svg";
import { ReactComponent as Balise } from "../../assets/icons/SVG/balise.svg";
import { ReactComponent as CircularArrow } from "../../assets/icons/SVG/refresh-circular.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { postScript } from "../../Requests/scriptDocTech";

import { useMsal } from "@azure/msal-react";

import i18next from "i18next";

import IsLoading from "../../Components/IsLoading";

import useConfidiaDoc from "../../Store/useConfidiaDoc";
import useDocTechParam from "../../Store/useDocTechParam";
import useUserProfile from "../../Store/useUserProfile";
import CodeScriptComposant from "./CodeScriptComposant";
import CommentaryScript from "./CommentaryScript";
import InjectCodePseudo from "./InjectCodePseudo";
import PseudoCodeScript from "./PseudoCodeScript";

export default function Scripts({ propsScript }) {
  const {
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
  } = propsScript;
  const { t } = useTranslation(["DocTechnic"]);
  const { accounts } = useMsal();
  const { userData } = useUserProfile();
  const accountData = accounts[0]?.idTokenClaims || userData[0]?.idTokenClaims;

  const { docTechnic, setDocTechnic } = useConfidiaDoc(); // setDocTechnic servira à enregistrer les modification ou non

  const [pcLangue, setPcLangue] = useState(i18next.language);
  const {
    injcodeSeeCom,
    injcodeSeePC,
    setVerifInjcodeSeeCom,
    setVerifInjcodeSeePC,
  } = useDocTechParam();
  const [copieDocTechnic, setCopieDocTechnic] = useState(
    JSON.parse(JSON.stringify(docTechnic))
  ); // copie de docTechnic pour eviter de modifier l'original directement
  useEffect(() => {
    setCopieDocTechnic(JSON.parse(JSON.stringify(docTechnic)));
    setSeeEditButton(true);
  }, [docTechnic, setCopieDocTechnic]);
  const [editDocTech, setEditDocTech] = useState("");

  // const [scrollSynchr, setScrollSynchr] = useState(true); // Shynchronise Code / Pseudo code / Commentaire /Code fusionner

  const [activeColor, setActiveColor] = useState(true);
  const [selectLine, setSelectLine] = useState(true); // Colore la ligne ou le mot
  const [activeCompact, setActiveCompact] = useState(true); // Permet enlever les espaces dans le code
  // Affichage
  const [seeEditButton, setSeeEditButton] = useState(false); // button X et v editeur
  const [isLoading, setIsLoading] = useState(false);
  // const [superCompact, setSuperCompact] = useState(false);
  // const [selectShow, setSelectShow] = useState("Show");
  // const [openSelectShow, setOpenSelectShow] = useState(false); // Ouvre le menu Show compact

  const Scripts = Object.values(copieDocTechnic.techDoc.scriptDoc);

  let scriptCode;
  if (activeCompact) {
    if (seeScriptCom) {
      scriptCode = Scripts.filter((box) => box.show_compact);
    } else {
      scriptCode = Scripts.filter(
        (box) => box.show_compact && !box.is_comments
      );
    }
  } else {
    scriptCode = Scripts;
  }

  let options = [
    { name: "show_original" },
    { name: "show_com" },
    { name: "show_compact" },
  ];
  useEffect(() => {
    let scripts = Object.values(copieDocTechnic.techDoc.scriptDoc);
    let codes = scripts
      .map((script) => script.row.map((row) => row.code || "").join(""))
      .join("");
    setEditDocTech(codes);
  }, [copieDocTechnic, docTechnic]);
  let conditionCode = seeCode === seePC;
  let condtionnIjectCode = injectCode && seeICodePC;

  function handleDocScriptChange(whriteIn, rid, newText, rowId) {
    if (whriteIn === "comment") {
      const index = Scripts.findIndex((item) => item.rid === rid);
      if (index !== -1) {
        const updatedScripts = [...Scripts];
        updatedScripts[index].user_comment = newText;

        setCopieDocTechnic((prevState) => ({
          ...prevState,
          techDoc: {
            ...prevState.techDoc,
            scriptDoc: updatedScripts,
          },
        }));
      }
    }
  }

  let buttonScriptCode = (
    <>
      <div className="boxButtonNav">
        {tabSBoard.length === 0 ? null : (
          <button
            className={
              selectLine
                ? "BoxBarred SelectLine ActiveT"
                : "BoxBarred SelectLine"
            }
            onClick={() => setSelectLine(!selectLine)}
          >
            <FontAwesomeIcon icon="fa-solid fa-highlighter" />
            <span className="BarHighlighterr">_</span>
            <p className="descIcon">{t("ButtonDesc.6")}</p>
          </button>
        )}
        <button
          className={
            activeColor ? "BoxBarred paint ActiveT" : "BoxBarred paint"
          }
          onClick={() => setActiveColor(!activeColor)}
        >
          <FontAwesomeIcon icon="fa-solid fa-palette" />
          <p className="descIcon">{t("ButtonDesc.10")}</p>
        </button>
        <button
          className={activeCompact ? "BoxBarred  ActiveT" : "BoxBarred"}
          onClick={() => setActiveCompact(!activeCompact)}
        >
          <FontAwesomeIcon icon="fa-text-height" />
          <p className="descIcon">{t("ButtonDesc.9")}</p>
        </button>
        <button
          className={seeScriptCom ? "BoxBarred Com  ActiveT" : "BoxBarred Com"}
          onClick={() => setseeScriptCom(!seeScriptCom)}
        >
          # <p className="descIcon">{t("ButtonDesc.8")}</p>
        </button>
      </div>

      <p>{t("Scripts.code")}</p>
    </>
  );

  const handleChangeLangue = (lang) => {
    setPcLangue(lang);
    SubmitNewDoc(lang);
  };

  async function SubmitNewDoc(lang, event) {
    if (event) event.preventDefault();
    setIsLoading(true);
    const allowedLangs = ["fr", "it", "en"];
    const appLang = allowedLangs.includes(lang) ? lang : pcLangue;
    try {
      const newDocTech = await postScript({
        content: editDocTech,
        demoAlias: docTechnic.dashboardDoc.name,
        demoUserAlias: `${accountData.family_name} ${accountData.given_name}`,
        demoDescription: docTechnic.dashboardDoc.desc,
        projectImg: docTechnic.dashboardDoc.image,
        frontCompactOption: "compact",
        appLan: appLang,
        sriptLang: "py3",
      });
      setDocTechnic(newDocTech.data);
      setCopieDocTechnic(JSON.parse(JSON.stringify(newDocTech.data)));
      setSeeEditButton(false);
      setTabSBoard([]);
    } catch (error) {
      console.log("ERREUR :", error.response.data);
    }
    setIsLoading(false);
  }

  return (
    <div className="Scripts">
      {/* Navigation */}
      <div className="NavScriptsBars">
        {seeEditDocTech && (
          <div className="EditCode" style={{ justifyContent: "space-between" }}>
            <p>EDITEUR</p> <div className="bar"></div>
            <div className={`boxButtonNav  ${seeEditButton ? "active" : ""}`}>
              <button
                className="x"
                onClick={() => {
                  setCopieDocTechnic(JSON.parse(JSON.stringify(docTechnic)));
                  setSeeEditButton(false);
                }}
              >
                X <p className="descIcon">{t("ButtonDesc.12")}</p>
              </button>
              <button className="v" onClick={SubmitNewDoc}>
                V <p className="descIcon">{t("ButtonDesc.13")}</p>
              </button>
            </div>
          </div>
        )}
        {/* Inject Code et Retour au code */}
        {!injectCode ? (
          <div className="InCode" style={{ justifyContent: "space-between" }}>
            <div className="bar"></div>
            <button onClick={() => setInjetCode(true)}>
              <Balise stroke="white" /*className="balise"*/ />
              {/* {t("Scripts.inject")} */}
              <p className="descIcon">{t("ButtonDesc.11")}</p>
            </button>
            {buttonScriptCode}
          </div>
        ) : (
          <div className="InCode" style={{ justifyContent: "space-between" }}>
            <div className="bar"></div>
            <button onClick={() => setInjetCode(false)}>
              <ArrowLeft stroke="white" className="balise" />
              {t("Scripts.returnC")}
            </button>
            <div className="SeePscomfunc">
              <button
                className={
                  injcodeSeeCom ? "BoxBarred paint ActiveT" : "BoxBarred paint"
                }
                onClick={() => setVerifInjcodeSeeCom(!injcodeSeeCom)}
              >
                <FontAwesomeIcon icon="fa-solid fa-comment" />
              </button>
              <button
                className={
                  injcodeSeePC ? "BoxBarred paint ActiveT" : "BoxBarred paint"
                }
                onClick={() => setVerifInjcodeSeePC(!injcodeSeePC)}
              >
                <FontAwesomeIcon icon="fa-solid fa-file" />
              </button>
            </div>
            {buttonScriptCode}
          </div>
        )}
        {/* Pseudo code nav */}
        {!injectCode && (
          <>
            <div className="PsCode">
              <div className="bar"></div>
              <button
                className={scrollSynchr ? "ActiveT" : ""}
                onClick={() => setScrollSynchr(!scrollSynchr)}
              >
                <CircularArrow />
                <p className="descIcon">{t("ButtonDesc.7")}</p>
              </button>
              <p>{t("Scripts.pseudoCode")}</p>
              <div className="BoxPcLang">
                <p>
                  {pcLangue}
                  <FontAwesomeIcon
                    className="icon"
                    icon="fa-solid fa-chevron-down"
                  />
                </p>
                <div className="selectLangPC">
                  {pcLangue !== "fr" && (
                    <button
                      onClick={() => {
                        handleChangeLangue("fr");
                      }}
                    >
                      FR
                    </button>
                  )}
                  {pcLangue !== "it" && (
                    <button onClick={() => handleChangeLangue("it")}>IT</button>
                  )}
                  {pcLangue !== "en" && (
                    <button onClick={() => handleChangeLangue("en")}>EN</button>
                  )}
                </div>
              </div>
            </div>
            {seeCom && (
              <div className="NavCom">
                <p>{t("Scripts.comment")}</p> <div className="bar"></div>
              </div>
            )}
          </>
        )}
      </div>
      {isLoading && <IsLoading text={t("isLoading.title")} />}
      {!isLoading && (
        <div className="BoxScriptsCodes">
          {/* Edit script code */}
          {seeEditDocTech && (
            <div className="boxScript">
              <textarea
                ref={editScriptRef}
                onScroll={HandleScrollSynchr}
                className="EditDocScript codeTheme"
                spellCheck="false"
                aria-label="script à modifier"
                value={editDocTech}
                onChange={(e) => {
                  setEditDocTech(e.target.value);
                  setSeeEditButton(true);
                }}
              />
            </div>
          )}
          {/* Script Injectcode (code fusioner) */}
          {condtionnIjectCode && (
            <InjectCodePseudo
              props={{
                injCodeRef,
                HandleScrollSynchr,
                scriptCode,
                activeCompact,
                selectLine,
                tabSBoard,
                seeScriptCom,
                activeColor,
                selectOutput,
                selectInput,
              }}
            />
          )}

          {injectCode === false && (
            <>
              {/* Script du Code  */}
              {seeCode && (
                <CodeScriptComposant
                  props={{
                    scriptCode,
                    tabSBoard,
                    inCodeRef,
                    HandleScrollSynchr,
                    activeCompact,
                    seeCode,
                    seeScriptCom,
                    selectLine,
                    selectOutput,
                    selectInput,
                    activeColor,
                    lineScriptCodeRefs,
                  }}
                />
              )}
              {/* Script du Pseudo code  */}
              {seePC && (
                <PseudoCodeScript
                  props={{
                    psCodeRef,
                    HandleScrollSynchr,
                    activeCompact,
                    selectLine,
                    scriptCode,
                    tabSBoard,
                    selectOutput,
                    selectInput,
                    activeColor,
                    seeScriptCom,
                    linePsCodeRefs,
                  }}
                />
              )}
              {/* Commentaire */}
              {seeCom && (
                <CommentaryScript
                  props={{
                    boxComRef,
                    HandleScrollSynchr,
                    scriptCode,
                    condtionnIjectCode,
                    handleDocScriptChange,
                    activeCompact,
                    Scripts,
                  }}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
