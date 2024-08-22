import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ImgBox from "../../Components/ImgBox.js";
import DSforDS_Logo_v2 from "../../assets/Pages/Advantages/DSforDS_Logo_v2.jpg";

import AdvantageBtnNav from "../../Contents/Advantages/AdvantageBtnNav.js";
import Description from "../../Contents/Advantages/Description.advantages.js";
import { openInNewTab } from "../../Utils/OpenInNewTab.js";

import AdvantageBtnNavtop from "../../Contents/Advantages/AdvantageBtnNavtop.js";
import "../../sass/Pages/Advantages/Blogs.scss";

export default function Blogs() {
  const { t } = useTranslation(["Advantages"]);

  const [userSubScribe, setUserSubScribe] = useState(false);
  return (
    <div className="Blogs">
      <AdvantageBtnNavtop />
      <h1>{t("blog.T")}</h1>
      <Description
        sendValidType="link_linkdin"
        userSubScribe={userSubScribe}
        setUserSubScribe={setUserSubScribe}
      />
      <div className="BoxArticles">
        {/* <Article
          image={oursPolaire}
          title="titre de l'article"
          descImage={"ours Polaire"}
          descs={[
            "Description de l'article du blog",
            "Description de l'article du blog",
            "Description de l'article du blog",
          ]}
        /> */}
        <Article
          image={DSforDS_Logo_v2}
          textButtonLink={t("blog.articles.1.T")}
          descImage={"DSFORDS LOGO v2"}
          // descs={["Blog en construction"]}
          buttonCenterLink={{
            text: t("blog.articles.1.T"),
            url: "https://www.linkedin.com/company/dsfords/",
          }}
        />
      </div>
      <AdvantageBtnNav namePage="blog" />
    </div>
  );
}

function Article({
  image,
  descImage,
  title,
  descs,
  linkBlog,
  textButtonLink,
  buttonCenterLink,
}) {
  return (
    <div className="Article">
      <ImgBox image={image} descImage={descImage} />
      <div className="texts">
        {title && <h3>{title}</h3>}
        {descs && (
          <div className="description">
            {descs && descs.map((text, i) => <p key={i}>{text}</p>)}
          </div>
        )}
        {buttonCenterLink && (
          <div className="AllBoxButtons">
            <button
              className="buttonCenterLink"
              onClick={() => openInNewTab(buttonCenterLink.url)}
            >
              {buttonCenterLink.text}
            </button>
          </div>
        )}
        {linkBlog && (
          <button
            className="AllSiteGlobalButtonUnderline"
            onClick={() => openInNewTab(linkBlog)}
          >
            {textButtonLink}
          </button>
        )}
      </div>
    </div>
  );
}
