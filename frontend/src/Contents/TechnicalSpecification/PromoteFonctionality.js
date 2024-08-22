import React from "react";
import ImgBox from "../../Components/ImgBox";

function PromoteFonctionality({
  right,
  title,
  subtitle,
  Image,
  subtitles,
  DesImage,
  textes,
}) {
  return (
    <div
      className={[
        right === true
          ? "PromoteFonctionality PF-BoxRigt"
          : "PromoteFonctionality PF-BoxLeft",
      ]}
      styles={right === true ? "PF-BoxRigt" : "PF-BoxLeft"}
    >
      <div>
        <h2>{title}</h2>

        {subtitles.map((subtitle, i) => {
          return <h3 key={i}>{subtitle}</h3>;
        })}
        <div className="boxTexts">
          {textes.map((text, i) => {
            return <p key={i}>{text}</p>;
          })}
        </div>
      </div>

      <ImgBox image={Image} descImage={title} openImg={true} />
    </div>
  );
}

export default PromoteFonctionality;
