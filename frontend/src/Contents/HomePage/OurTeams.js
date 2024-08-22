import React from "react";
import { useTranslation } from "react-i18next";
import ImgBox from "../../Components/ImgBox";
import "../../sass/Contents/HomePage/OurTeams.scss";

import { useHistory } from "react-router-dom";
import GC from "../../assets/Teams/GC.png";
import JD from "../../assets/Teams/JD.png";

export default function OurTeams() {
  const { t } = useTranslation(["HomePage"]);
  let history = useHistory();
  return (
    <div className="OurTeams">
      <h2>{t("OurTeams.T")}</h2>
      <p className="desc">
        {t("OurTeams.desc1")}«
        <button
          onClick={() => history.push("/about")}
          className="AllSiteGlobalButtonUnderline"
        >
          {t("OurTeams.LearnMore")}
        </button>
        » !
      </p>
      <div className="Box">
        <BlockArt
          image={GC}
          text={t("OurTeams.IAcitation.1")}
          name={"Giulia Cernicchiaro"}
          job={t("OurTeams.job.dsFond")}
        />
        <BlockArt
          image={JD}
          text={t("OurTeams.IAcitation.2")}
          name={"Jordan Deliessche"}
          job={t("OurTeams.job.coFond")}
        />
      </div>
    </div>
  );
}
function BlockArt({ image, text, name, job }) {
  return (
    <article>
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
