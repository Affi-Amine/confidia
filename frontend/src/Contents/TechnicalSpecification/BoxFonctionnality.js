import React from "react";
import { useTranslation } from "react-i18next";

function BoxFonctionnality({ boxData, jsonPart, BoxId }) {
  const { t } = useTranslation(["LandingPage"]);

  return (
    <div className="BoxFonctionnality">
      {boxData.map((elem, i) => {
        return (
          <div key={i}>
            <div className="imgBox">
              <img
                src={elem.image}
                loading="lazy"
                alt={t(`${jsonPart}.${elem.title}.title`)}
              />
            </div>
            <h2>{t(`${jsonPart}.${elem.title}.title`)}</h2>
            <div
              id={BoxId}
              className={
                elem.seeScrollBar === true ? "Activate" : "Desactivate"
              }
            >
              {elem.desc.map((numDesc, a) => {
                return (
                  <p key={a}>{t(`${jsonPart}.${elem.title}.${numDesc}`)}</p>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BoxFonctionnality;
