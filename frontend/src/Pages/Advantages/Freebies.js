import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import AdvantageBtnNav from "../../Contents/Advantages/AdvantageBtnNav";
import AdvantageBtnNavtop from "../../Contents/Advantages/AdvantageBtnNavtop";
import Description from "../../Contents/Advantages/Description.advantages";
import YoutubeLink from "../../Contents/Advantages/YoutubeLink.advantages";
import DSforDS_Logo_v2 from "../../assets/Pages/Advantages/DSforDS_Logo_v2.jpg";
import "../../sass/Pages/Advantages/Freebies.scss";

export default function Freebies() {
  const { t } = useTranslation(["Advantages"]);

  const [userSubScribe, setUserSubScribe] = useState(false);
  return (
    <div className="Freebies">
      <AdvantageBtnNavtop />
      <h1>{t("freebies.T")}</h1>
      <Description
        sendValidType="email_freebies"
        userSubScribe={userSubScribe}
        setUserSubScribe={setUserSubScribe}
      />
      <div className="BoxYoutubes">
        <YoutubeLink
          textButon={t("blog.articles.1.T")}
          youtubeLink={"https://www.linkedin.com/company/dsfords/"}
          image={DSforDS_Logo_v2}
          descImage={"DSFORDS LOGO v2"}
        />
      </div>
      <AdvantageBtnNav namePage="freebies" />
    </div>
  );
}
