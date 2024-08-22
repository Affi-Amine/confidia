import React from "react";
import { useTranslation } from "react-i18next";
import ImgBox from "../../Components/ImgBox";
import "../../sass/Contents/HomePage/PromiseOfValue.scss";
// Image
import dashboarimg from "../../assets/HomePage/dashboard.png";
import docTechnicIMG from "../../assets/HomePage/docTechnic.png";
import glassesLaptop from "../../assets/HomePage/glassesLaptopo.png";
// Store
// Utils
import { useHistory } from "react-router-dom";
import useOpenLink from "../../hooks/useOpenLink";

export default function PromiseOfValue({ currentHomePagePromiseOfValueRef }) {
  const { t } = useTranslation(["Homepage", "translation"]);
  let history = useHistory();
  const openLinkInNewPageByLangue = useOpenLink();

  return (
    <div className="PromiseOfValue" ref={currentHomePagePromiseOfValueRef}>
      <h2>CONFIDIA</h2>
      <section>
        <article className="block1">
          <BlockA
            title={t("PromiseOfValue.B1.T")}
            texts={[
              t("PromiseOfValue.B1.t1"),
              t("PromiseOfValue.B1.t2"),
              t("PromiseOfValue.B1.t3"),
              t("PromiseOfValue.B1.t4"),
            ]}
          />
          <button
            onClick={() => history.push("/specification-technique")}
            className="AllSiteGlobalButtonUnderline"
          >
            {t("translation:ButtonsGlobals.LearnMore")}
          </button>
        </article>
        <div className="block2">
          <div className="BoxBlock">
            <Block
              image={docTechnicIMG}
              titles={[t("PromiseOfValue.B4.T.1"), t("PromiseOfValue.B4.T.2")]}
              texts={[t("PromiseOfValue.B4.t1")]}
            />
            <Block
              image={dashboarimg}
              titles={[t("PromiseOfValue.B2.T.1"), t("PromiseOfValue.B2.T.2")]}
              texts={[t("PromiseOfValue.B2.t1")]}
            />
            <Block
              image={glassesLaptop}
              titles={[t("PromiseOfValue.B3.T.1"), t("PromiseOfValue.B3.T.2")]}
              texts={[t("PromiseOfValue.B3.t1")]}
            />
          </div>
        </div>
      </section>
      <div className="BoxButtons">
        <button
          className="ReqDemo"
          onClick={() => openLinkInNewPageByLangue("demo")}
        >
          {t("ButtonsGlobals.RequestDemo")}
        </button>
      </div>
    </div>
  );
}
function Block({ image, titles, texts }) {
  return (
    <article>
      {image && <ImgBox image={image} openImg={true} />}
      <div className="Text">
        <div className="titles">
          {titles.map((line, i) => (
            <h6 key={`title-line-${i}`}>{line}</h6>
          ))}
        </div>

        {texts.map((ligne, i) => {
          return <p key={i}>{ligne}</p>;
        })}
      </div>
    </article>
  );
}
function BlockA({ image, title, texts }) {
  return (
    <article>
      {image && <ImgBox image={image} />}
      <div className="Text">
        <h3>{title}</h3>
        {texts.map((ligne, i) => {
          return <p key={i}>{ligne}</p>;
        })}
      </div>
    </article>
  );
}
