import React, { useEffect, useMemo, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import "../sass/Pages/DocScript.scss";

import useGlobalParam from "../Store/useGlobalParam";
import useModalStore from "../Store/useModalStore";

import { useMsal } from "@azure/msal-react";
import Menu from "../Components/Menu";
import { postScript } from "../Requests/scriptDocTech";
import useConfidiaDoc from "../Store/useConfidiaDoc";
import useUserProfile from "../Store/useUserProfile";

function DocScript({ props }) {
  let history = useHistory();
  const { accounts } = useMsal();
  const { userData } = useUserProfile();
  const accountData = accounts[0]?.idTokenClaims || userData[0]?.idTokenClaims;
  const { t } = useTranslation(["DocScript", "CG"]);

  const { dataKeepChoice } = props;

  const { language } = useGlobalParam();
  const { docTechnic, setDocTechnic, getDocTechnic } = useConfidiaDoc();

  const setSeeDataKeepChoice = useModalStore((s) => s.setSeeDataKeepChoice);
  const [alerte, setAlerte] = useState({ see: false, message: "" });

  const [title, setTitle] = useState(t("form.title"));
  const [desc, setDesc] = useState(t("form.desc"));
  const [content, setContent] = useState(""); // Contenu du script
  const [frontCompactOption, setFrontCompactOption] = useState("compact");
  const [selectedImage, setSelectedImage] = useState(null); // Image de l'utilisateur pour son script

  const [isLoading, setIsLoading] = useState(false); // Ouvre le loader et le status de comunication avec le back

  const [openSelectLang, setOpenSelectLang] = useState(false); // Ouvre la liste des Languages si true
  const [optionDetail, setOptionDetail] = useState({ progress: "", desc: "" }); // detail des lang à afficher au survol

  const [numLines, setNumLines] = useState(0);
  const [selectLang, setSelectLang] = useState({
    name: "Python 3",
    val: "py3",
  });
  const options = [
    { name: "Python 3", val: "py3", dispo: true, progress: "", desc: "" },
    {
      name: "JavaScript",
      val: "js",
      dispo: false,
      progress: t("option.progress.2"),
      desc: "",
    },
    {
      name: "Python 2",
      val: "py2",
      dispo: false,
      progress: t("option.progress.1"),
      desc: "",
    },
    {
      name: "Python",
      val: "py",
      dispo: false,
      progress: t("option.progress.1"),
      desc: t("option.python.py"),
    },
  ];
  const TimeSelectOption = useRef(null);
  let limitLines = 1000;
  function handleSelectLang(obj) {
    if (obj.val !== "py2") {
      setSelectLang(obj);
    }
    setOpenSelectLang(false);
  }
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
  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setSelectedImage(URL.createObjectURL(selectedFile));
    }
  };
  useEffect(() => {
    return () => {
      if (TimeSelectOption.current) {
        clearTimeout(TimeSelectOption.current);
      }
      // setBlockModal({ page: "documentation-script", block: false });
    };
  }, []);
  useEffect(() => {
    if (dataKeepChoice === null) setSeeDataKeepChoice(true);
  }, [dataKeepChoice, setSeeDataKeepChoice]);
  const sourceRef = useRef();

  async function handleSumit(e) {
    e.preventDefault();
    setAlerte({ see: false, message: "" });

    // a envoyer au back demoAlias, demoUserAlias, demoDescription
    setIsLoading(true);
    let finalTitle = title;
    let finalDesc = desc;

    if (title === t("form.title")) finalTitle = t("form.DefTitle");
    if (desc === t("form.desc")) finalDesc = t("form.DefDesc");
    const CancelToken = axios.CancelToken;
    sourceRef.current = CancelToken.source();
    try {
      if (numLines <= limitLines) {
        const reqpost = await postScript({
          content,
          demoAlias: finalTitle,
          demoUserAlias: `${accountData.family_name} ${accountData.given_name}`,
          demoDescription: finalDesc,
          projectImg: selectedImage,
          frontCompactOption,
          appLan: language,
          sriptLang: selectLang.val,
          cancelToken: sourceRef.current.token,
        });
        if (reqpost && reqpost.data) {
          getDocTechnic(reqpost?.data);
          setDocTechnic(reqpost?.data);
          setIsLoading(false);
          history.push("/documentation-technique");
        } else {
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log("ERREUR :", error.response?.data);
      if (axios.isCancel(error)) {
        console.log("Requête annulée:", error.message);
      } else {
        // Gérer les autres erreurs ici
        console.log("Erreur:", error.message);
      }
      setAlerte({ see: true, message: error.message });
      setIsLoading(false);
    }
  }
  let conditionOpenDetail =
    optionDetail.progress !== "" || optionDetail.desc !== "";
  return (
    <div className="DocScript">
      {docTechnic.length !== 0 && <Menu />}
      <section
        style={
          docTechnic.length === 0
            ? {
                marginLeft: "75px",
              }
            : {}
        }
      >
        {isLoading ? (
          <div className="isLoading">
            <div className="boxIntro">
              <h2>{t("isLoading.title")}</h2>
              <FontAwesomeIcon
                className="icon"
                icon="fa-solid fa-spinner fa-spin"
              />
            </div>
            <LogReq />
            <button
              onClick={() => {
                if (sourceRef.current) {
                  sourceRef.current.cancel();
                  setIsLoading(false);
                }
              }}
            >
              {t("isLoading.cancel")}
            </button>
          </div>
        ) : (
          <form>
            {docTechnic.length !== 0 && (
              <p>
                <span></span>
                {t("form.replaceData")} <span></span>
              </p>
            )}

            <div className="Box">
              <div className="BoxImg">
                <label className="ImageLabel" htmlFor="imageInput">
                  <span>Choisir une image</span>
                  <input
                    id="imageInput"
                    className="ImageUp"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
                {selectedImage && (
                  <div className="SelectedImage">
                    <img src={selectedImage} loading="lazy" alt="Selected" />
                  </div>
                )}
              </div>

              <div className="Infos">
                <label>
                  <input
                    type="text"
                    className="title"
                    aria-label="title"
                    placeholder={t("form.title")}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </label>
                <textarea
                  className="Desc"
                  rows="6"
                  aria-label="description"
                  placeholder={t("form.desc")}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
            </div>

            <div className="BoxCode">
              <textarea
                rows="8"
                aria-label="script à documenter"
                placeholder={t("form.write")}
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  const lines = e.target.value.split("\n");
                  setNumLines(lines.length);
                }}
              />
              <p className="line">{numLines}</p>
            </div>

            <div className="blockLB">
              <div className="Alertes">
                {numLines > limitLines && <p>{t("alerte.limite")}</p>}
                {content.length === 0 && <p>{t("alerte.code")}</p>}
                {alerte.see && <p>{alerte.message}</p>}
              </div>
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

                      let index = (i + 1) * 30;
                      if (selectLang.val === val) return null;
                      return (
                        <div
                          key={i}
                          className={dispo ? "option" : "option disable"}
                          onClick={() => {
                            if (dispo) {
                              handleSelectLang({ name, val });
                            }
                          }}
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
                className={
                  content.length <= 0 ? "boxButton off" : "boxButton on"
                }
                disabled={content.length <= 0}
                onClick={handleSumit}
              >
                <p>{t("form.button")}</p>
                <FontAwesomeIcon
                  className="icon"
                  icon=" fa-paper-plane"
                  data-fa-transform="rotate-90"
                />
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

function LogReq() {
  const setSeeLearnMoreDocM = useModalStore((s) => s.setSeeLearnMoreDocM);
  const { t } = useTranslation(["DocScript"]);
  const logsReq = useMemo(
    () => [
      // "Génération de graphiques de flux pour illustrer la logique du code...",
      // "",
      t("Logs.1"),
      t("Logs.2"),
      t("Logs.3"),
      t("Logs.4"),
      t("Logs.5"),
      t("Logs.6"),
      t("Logs.7"),
      t("Logs.8"),
      t("Logs.9"),
      t("Logs.10"),
      t("Logs.11"),
      t("Logs.12"),
      t("Logs.13"),
      t("Logs.14"),
      t("Logs.15"),
      t("Logs.16"),
      t("Logs.17"),
      t("Logs.18"),
      t("Logs.19"),
    ],
    [t]
  );
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [loggedMessages, setLoggedMessages] = useState([]);

  useEffect(() => {
    if (currentLogIndex >= logsReq.length) {
      return;
    }

    const intervalId = setInterval(() => {
      const newMessage = {
        text: logsReq[currentLogIndex],
        timestamp: new Date(),
      };

      setLoggedMessages((loggedMessages) => [...loggedMessages, newMessage]);
      setCurrentLogIndex(currentLogIndex + 1);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [currentLogIndex, logsReq]);

  const formatTimestamp = (date) => {
    const pad = (num) => num.toString().padStart(2, "0");
    return `${pad(date.getDate())}/${pad(
      date.getMonth() + 1
    )}/${date.getFullYear()} - ${pad(date.getHours())}:${pad(
      date.getMinutes()
    )}:${pad(date.getSeconds())}`;
  };

  return (
    <div className="Log">
      <div className="boxLogs">
        {loggedMessages.map((message, index) => (
          <p key={index}>
            {formatTimestamp(message.timestamp)} : {message.text}
          </p>
        ))}
      </div>
      <p className="learnMore" onClick={() => setSeeLearnMoreDocM(true)}>
        {t("Logs.buttons.learnMore")}
      </p>
    </div>
  );
}

export default DocScript;
