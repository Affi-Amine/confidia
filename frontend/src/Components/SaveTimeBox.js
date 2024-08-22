// DLO-1007
import React from "react";
import ImgBox from "./ImgBox";
import { useTranslation } from "react-i18next";

function SaveTimeBox({ image, imgdesc, boxTitle, boxText }) {
  const { t } = useTranslation(["HomePage"]);
  return (
    <div className="SaveTimeBox">
      <div className="BoxImg">
        <ImgBox image={image} descImage={imgdesc} />
      </div>

      <div>
        {boxTitle.map((title, i) => {
          return <h3 key={i}>{t(`SaveTime.${title}`)}</h3>;
        })}
        {boxText.map((text, i) => {
          return (
            <p key={i} className={i === 0 ? "margeTop" : ""}>
              {t(`SaveTime.${text}`)}
            </p>
          );
        })}
      </div>
    </div>
  );
}
export default SaveTimeBox;
