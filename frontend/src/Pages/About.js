import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import "../sass/Pages/About.scss";
// IMG
import imgCheck from "../assets/About/Check.png";
import imgCode from "../assets/About/Code.png";
import imgDS from "../assets/About/Data.png";
import imgIntro from "../assets/About/Fondbleu-2.png";
import imgGeneral from "../assets/About/P&S2022-J1-LD-9.jpg";

// Components
import ImgBox from "../Components/ImgBox";
// Contents
import OurTeamsBox from "../Contents/About/OurTeamsBox";
// Utils
import { openInNewTab } from "../Utils/OpenInNewTab";

export default function About() {
  let history = useHistory();
  const { t } = useTranslation(["About"]);

  return (
    <div className="About">
      <div className="imgBox">
        <h1>DS FOR DS</h1>
        <img src={imgIntro} loading="lazy" alt={t("intro.title")} />
      </div>
      <div className="Intro">
        <h2>{t("intro.title")}</h2>
        <div className="Block1">
          <ImgBox
            image={imgGeneral}
            descImage={
              "Site-Web-de-Photographie-Generale-et-Editoriale-Organise"
            }
          />
          <div className="texts">
            <p>{t("intro.text1")}</p>
            <p>{t("intro.text2")}</p>
            <p>{t("intro.text3")}</p>
            <p>{t("intro.text4")}</p>
            <p>{t("intro.text6")}</p>
            <p>{t("intro.text5")}</p>
          </div>
        </div>
        <div className="BoxButtons">
          <button className="ReqDemo" onClick={() => history.push("/contact")}>
            {t("translation:ButtonsGlobals.OurContacts")}
          </button>
        </div>
      </div>
      <div className="ourValue">
        <h2>{t("ourValue.title")}</h2>
        <div className="imgtitle">
          <p>{t("ourValue.text")}</p>
          <div className="ImgBox">
            <img src={imgDS} loading="lazy" alt="Data Science" />
          </div>
        </div>
      </div>
      <div className="blocks">
        <div className="BlocksImg_TD">
          <div className="block">
            <img src={imgCheck} loading="lazy" alt="Carrer cocher" />
            <div>
              <h3>{t("blocks.techno.title")}</h3>
              <p>{t("blocks.techno.text")}</p>
            </div>
          </div>
          <div className="block">
            <img src={imgCheck} loading="lazy" alt="Carrer cocher" />
            <div>
              <h3>{t("blocks.ethic.title")}</h3>
              <p>{t("blocks.ethic.text")}</p>
            </div>
          </div>
          <div className="block">
            <img src={imgCheck} loading="lazy" alt="Carrer cocher" />
            <div>
              <h3>{t("blocks.environment.title")}</h3>
              <p>{t("blocks.environment.text")}</p>
            </div>
          </div>
          <div className="block">
            <img src={imgCheck} loading="lazy" alt="Carrer cocher" />
            <div>
              <h3>{t("blocks.future.title")}</h3>
              <p>{t("blocks.future.text")}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="tools">
        <h2>{t("tools.title")}</h2>
        <div>
          <div className="block">
            <p>{t("tools.text")}</p>
          </div>
          <ImgBox image={imgCode} descImage={"Line code"} />
        </div>
        <div className="BoxButtons">
          <button
            onClick={() => {
              history.push("/contact");
            }}
          >
            {t("tools.offers")}
            <p className="alertRedirect">{t("Modal:BadVersion.alert")}</p>
          </button>
        </div>
      </div>
      <OurTeamsBox />
    </div>
  );
}
function ArticleTeam({ title, image, texts, boxLinks }) {
  return (
    <article>
      <ImgBox image={image} descImage={title} />
      <div className="blockTexts">
        <h4>{title}</h4>
        {texts.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
        {boxLinks && (
          <div className="boxLink">
            {boxLinks.map((elem, i) => (
              <button
                className="AllSiteGlobalButtonUnderline"
                key={i}
                onClick={() => openInNewTab(elem.url)}
              >
                {elem.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
