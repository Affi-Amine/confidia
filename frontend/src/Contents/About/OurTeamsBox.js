import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import ImgBox from "../../Components/ImgBox";
import "../../sass/Contents/About/OurTeamsBox.scss";

import { openInNewTab } from "../../Utils/OpenInNewTab";

import DLO from "../../assets/Teams/DLO.png";
import GC from "../../assets/Teams/GC.png";
import JD from "../../assets/Teams/JD.png";
import JN from "../../assets/Teams/JN.png";
import NC from "../../assets/Teams/NC.png";

export default function OurTeamsBox() {
  const { t } = useTranslation(["HomePage"]);
  let history = useHistory();
  const [selectedTeam, setSelectedTeam] = useState(null);
  return (
    <div className="OurTeamsBox">
      <h2>{t("OurTeams.T")}</h2>
      <p className="desc">{t("OurTeams.desc1")}</p>
      <div className="Box">
        <BlockArt
          onClick={() =>
            setSelectedTeam(
              selectedTeam === "Jordan Deliessche" ? null : "Jordan Deliessche"
            )
          }
          image={JD}
          text={t("OurTeams.IAcitation.2")}
          name={"Jordan Deliessche"}
          job={t("OurTeams.job.coFond")}
        />
        <BlockArt
          onClick={() =>
            setSelectedTeam(
              selectedTeam === "Giulia Cernicchiaro"
                ? null
                : "Giulia Cernicchiaro"
            )
          }
          image={GC}
          text={t("OurTeams.IAcitation.1")}
          name={"Giulia Cernicchiaro"}
          job={`${t("OurTeams.job.dsFond")} - CTO`}
        />
        <BlockArt
          onClick={() =>
            setSelectedTeam(
              selectedTeam === "Nathalie Chauchard"
                ? null
                : "Nathalie Chauchard"
            )
          }
          image={NC}
          text={t("OurTeams.IAcitation.3")}
          name={"Nathalie Chauchard"}
          job={t("OurTeams.job.futurAssos")}
        />
      </div>
      {selectedTeam !== null && (
        <div className="BlockTeams">
          {selectedTeam === "Giulia Cernicchiaro" && (
            <ArticleTeam
              title={`${t("About:teams.jobs.president")}`}
              texts={[t("About:teams.Desc.1"), t("About:teams.Desc.2")]}
              boxLinks={[
                {
                  url: "https://www.sciencedirect.com/science/article/pii/S2352146516308560",
                  text: "- Constructing a Synthetic Population of Establishments for the Simmobility Microsimulation Platform",
                },
                {
                  url: "https://www.sciencedirect.com/science/article/abs/pii/S026499931200137X",
                  text: "- A dynamic discrete choice model to explain holding duration and driven mileage",
                },
                {
                  url: "https://link.springer.com/article/10.1007/s10614-014-9449-4",
                  text: "- Un modèle de choix dynamique discret...",
                },
              ]}
            />
          )}
          {selectedTeam === "Jordan Deliessche" && (
            <ArticleTeam
              title={`${t("About:teams.jobs.cofond")}`}
              texts={[t("About:teams.Desc.3")]}
            />
          )}
          {selectedTeam === "Nathalie Chauchard" && (
            <ArticleTeam
              title={`${t("About:teams.jobs.partner")}`}
              texts={[t("About:teams.Desc.4"), t("About:teams.Desc.5")]}
            />
          )}
        </div>
      )}
      <div className="Box">
        <BlockArt
          image={DLO}
          text={t("OurTeams.IAcitation.4")}
          notHover={true}
          name={"Doriane Lollia"}
          job={t("OurTeams.job.dsDev")}
        />
        <BlockArt
          image={JN}
          notHover={true}
          text={t("OurTeams.IAcitation.5")}
          name={"Jonathan Nicaud"}
          job={t("OurTeams.job.dsComMark")}
        />
      </div>
      <div className="BoxButtons">
        <button className="ReqDemo" onClick={() => history.push("/contact")}>
          {t("translation:ButtonsGlobals.OurContacts")}
        </button>
      </div>
    </div>
  );
}
function BlockArt({ onClick, image, text, name, job, notHover }) {
  return (
    <article className={notHover && "notHover"} onClick={onClick}>
      <ImgBox image={image} descImage={name} />
      <section>
        <p className="text">{text}</p>
        <h6>
          <span>{name}</span>
        </h6>
        <p>{job} , DS for DS</p>
      </section>
    </article>
  );
}
function ArticleTeam({ title, image, texts, boxLinks }) {
  return (
    <article>
      {/* <ImgBox image={image} descImage={title} /> */}
      <div className="blockTexts">
        {/* <h4>{title}</h4> */}
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
