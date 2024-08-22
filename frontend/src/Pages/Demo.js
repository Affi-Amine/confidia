import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "../sass/Pages/Demo.scss";
//Contexts
// Page
import DocTechnic from "./DocTechnic";
//Components
import { useHistory } from "react-router-dom";
import NotRobot from "../Components/NotRobot";
import PolicyIubenda from "../Components/PolicyIubenda";
// Store
import useConfidiaDoc from "../Store/useConfidiaDoc";
import useGlobalParam from "../Store/useGlobalParam";
import useModalStore from "../Store/useModalStore";

function Demo({ setOpenRegister }) {
  let history = useHistory();
  const { t } = useTranslation(["Demo", "CG"]);

  const setSeeNewFeature = useModalStore((s) => s.setSeeNewFeature);
  const setSeeBadVersion = useModalStore((s) => s.setSeeBadVersion);

  const { setDocTechnic } = useConfidiaDoc((s) => s.setDocTechnic);

  const { language } = useGlobalParam();

  const [demoAlias, setDemoAlias] = useState("Demo Alias");
  const [demoUserAlias, setDemoUserAlias] = useState("Demo User");
  const [demoDescription, setDemoDescription] = useState("Demo Description");
  const [content, setContent] = useState(""); //contenu du script envoyer au server

  const [checkPrivacyPolicy, setCheckPrivacyPolicy] = useState(false);
  const [checkDemoCondition, setCheckDemoCondition] = useState(false);
  const [verifNotRobot, setVerifNotRobot] = useState(false); // Permet de vérifier si c'est un robot
  const [alerteNR, setAlerteNR] = useState(false); // Affiche une alerte pour dire que le calcule est faux dans NotRobot.js

  const [frontCompactOption, setFrontCompactOption] = useState("compact");
  let maxlengthAlias = 10;
  const [seeDemoDocTechnic, setSeeDemoDocTechnic] = useState(false); // Ouvre la documentation technique et ferme le formulaire si true
  const [seeForm, setSeeForm] = useState(true); // Ouvre le formulaire
  const [isLoading, setIsLoading] = useState(false); // Ouvre le loader et le status de comunication avec le back

  const [numCaract, setNumCaract] = useState(0); // nombre de caratère dans le code
  const [numLines, setNumLines] = useState(0); //nombre de ligne , limite maxLine = 100
  const maxLine = 100;
  const [alerte, setAlerte] = useState("Code manquant");
  const [openSelectLang, setOpenSelectLang] = useState(false); // Ouvre la liste des Languages si true
  const [optionDetail, setOptionDetail] = useState({ progress: "", desc: "" }); // detail des lang à afficher au survol
  const [selectLang, setSelectLang] = useState({
    name: "Python 3",
    val: "py3",
  });
  const options = [
    { name: "Python 3", val: "py3", dispo: true, progress: "", desc: "" },
    {
      name: "Python 2",
      val: "py2",
      dispo: false,
      progress: t("option.progress"),
      desc: "",
    },
    {
      name: "Python",
      val: "py",
      dispo: false,
      progress: t("option.progress"),
      desc: t("option.python.py"),
    },
  ];

  function handleSelectLang(obj) {
    if (obj.val !== "py2") {
      setSelectLang(obj);
    }
    setOpenSelectLang(false);
  }

  function handleTextareaChange(event) {
    const code = event.target.value;
    const lines = code.split("\n");
    setContent(code);
    if (code === "") {
      setNumCaract(0);
      setNumLines(0);
    } else {
      setNumCaract(code.length);
      setNumLines(lines.length);
    }
  }
  // Verification du nombre de ligne de code et de carractère
  useEffect(() => {
    if (numLines === 0 || numCaract === 0) {
      setAlerte(t("alerte.code"));
    } else if (numLines > maxLine) {
      setAlerte(t("alerte.limite"));
    } else {
      setAlerte("OK");
    }
  }, [numCaract, numLines, t]);
  // Méthode post pour l'envoie du code
  async function handleSumit(e) {
    setAlerteNR(false);
    try {
      e.preventDefault();
      if (checkPrivacyPolicy === false || checkDemoCondition === false) {
        setAlerte(t("CG:Policy.alerte"));
      }
      if (!verifNotRobot) {
        setAlerte(t("CG:NotRobot.alerte.calc"));
        setAlerteNR(true);
      }
      if (verifNotRobot && checkPrivacyPolicy && checkDemoCondition) {
        setSeeForm(false);
        setIsLoading(true);

        // a envoyer au back demoAlias, demoUserAlias, demoDescription
        const reqpost = await axios.post(
          process.env.REACT_APP_API_URL + "script/",
          {
            content,
            demoAlias,
            demoUserAlias,
            demoDescription,
            frontCompactOption,
            appLan: language,
            sriptLang: selectLang.val,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: process.env.REACT_APP_API_TOKEN,
            },
          }
        );
        setDocTechnic(reqpost.data);
        setSeeDemoDocTechnic(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("ERREUR :", error.response.data);
      setAlerte(error.message);
      setSeeForm(true);
      setIsLoading(false);
    }
  }

  // Permet d'afficher ou non les details des Lang stoker dans optionDetail
  const TimeSelectOption = useRef(null);
  function SelecLangMouseEnter(obj) {
    if (TimeSelectOption.current) clearTimeout(TimeSelectOption.current);
    TimeSelectOption.current = setTimeout(() => {
      setOptionDetail(obj);
    }, 500);
  }
  function SelectLangMouseLeave() {
    if (TimeSelectOption.current) {
      clearTimeout(TimeSelectOption.current);
      TimeSelectOption.current = null;
    }
    setOptionDetail({ progress: "", desc: "" });
  }
  useEffect(() => {
    return () => {
      if (TimeSelectOption.current) {
        clearTimeout(TimeSelectOption.current);
      }
    };
  }, []);
  let conditionOpenDetail =
    optionDetail.progress !== "" || optionDetail.desc !== "";

  return (
    <div className="Demo">
      <div className="title">
        <p>{t("title.sub1")}</p>
        <p>{t("title.sub2")}</p>
        <h1>{t("title.sub3")}</h1>
      </div>
      {seeForm && (
        <form>
          <div className="Infos">
            <div className="userInfos">
              <input
                type="text"
                className="DemoAlias"
                maxLength={maxlengthAlias}
                defaultValue={demoAlias}
                placeholder={t("form.alias")}
                onChange={(e) => {
                  // setBlockModal({ page: "Demo", block: false });
                  setDemoAlias(e.target.value);
                }}
              />
              <input
                type="text"
                className="DemoUserAlias"
                maxLength={maxlengthAlias}
                defaultValue={demoUserAlias}
                placeholder={t("form.userAlias")}
                onChange={(e) => {
                  // setBlockModal({ page: "Demo", block: false });
                  setDemoUserAlias(e.target.value);
                }}
              />
            </div>

            <textarea
              className="DemoDesc"
              placeholder={t("form.desc")}
              rows="4"
              onChange={(e) => {
                // setBlockModal({ page: "Demo", block: false });
                setDemoDescription(e.target.value);
              }}
            />
          </div>
          <div className="textarea">
            <textarea
              className="BoxCode"
              rows="30"
              placeholder={t("form.write")}
              onChange={handleTextareaChange}
              value={content}
            />
            <p className="line">{numLines}</p>
          </div>

          <div className="boxCG">
            <NotRobot setVerifNotRobot={setVerifNotRobot} alerteNR={alerteNR} />
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={checkPrivacyPolicy}
                  onChange={(e) => setCheckPrivacyPolicy(e.target.checked)}
                />
                {t("CG:Policy.readA")} {t("CG:Policy.la")}
                <PolicyIubenda />
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={checkDemoCondition}
                  onChange={(e) => setCheckDemoCondition(e.target.checked)}
                />
                {t("CG:Policy.readA")} {t("CG:Policy.les")}
                <span onClick={() => history.push("/CGU")}>
                  {t("CG:Policy.DemoC")}
                </span>
              </label>
            </div>
          </div>
          <div className="CodeInfo">
            {alerte !== "OK" && <p className="alerte">{alerte}</p>}
            <div className="SelectLang">
              {conditionOpenDetail && (
                <div className="detail" style={{ top: optionDetail.i }}>
                  <p>{optionDetail.progress}</p>
                  <p>{optionDetail.desc}</p>
                </div>
              )}
              <div
                className={openSelectLang ? "Lang open" : " Lang"}
                onClick={() => {
                  setOpenSelectLang(!openSelectLang);
                }}
              >
                {selectLang.name}
                {openSelectLang ? (
                  <FontAwesomeIcon className="icon" icon="chevron-up" />
                ) : (
                  <FontAwesomeIcon className="icon" icon="chevron-down" />
                )}
              </div>
              {openSelectLang && (
                <div className="Options">
                  {options.map((choice, i) => {
                    const { name, dispo, val, progress, desc } = choice;

                    let index = (i + 1) * 45;
                    return (
                      <div
                        key={i}
                        className={dispo ? "option" : "option disable"}
                        onClick={() => handleSelectLang({ name, val })}
                        onMouseEnter={() =>
                          SelecLangMouseEnter({ progress, desc, i: index })
                        }
                        onMouseLeave={SelectLangMouseLeave}
                      >
                        {name}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <button
              className={content.length > 0 ? "boxButton" : "boxButton off"}
              onClick={handleSumit}
              disabled={content.length < 0}
            >
              <p>{t("button")}</p>
              <FontAwesomeIcon
                className="icon"
                icon=" fa-paper-plane"
                data-fa-transform="rotate-90"
              />
            </button>
          </div>
        </form>
      )}

      <br />
      {seeDemoDocTechnic && (
        <div className="DemoDoc">
          <div className="BoxDocInfos">
            <p>{demoUserAlias}</p>
            <div>
              <h2>{demoAlias}</h2>
              <p>{demoDescription}</p>
            </div>
          </div>
          <DocTechnic
            props={{ openProjectInfos: false, openUpdateProjectInfos: false }}
          />
          <button
            className="DownloadButton"
            onClick={() => {
              setSeeBadVersion(true);
            }}
          >
            <FontAwesomeIcon className="icon" icon="fa-download" />
            <p>{t("download")}</p>
          </button>
        </div>
      )}
      {isLoading && (
        <div className="isLoading">
          <h2>{t("isLoading.title")}</h2>
          <FontAwesomeIcon
            className="icon"
            icon="fa-solid fa-spinner fa-spin"
          />
        </div>
      )}
    </div>
  );
}

export default Demo;
