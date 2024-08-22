import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import BoxDetail from "../../Components/BoxDetail";
import ImgBox from "../../Components/ImgBox";

function BoxExplanation({ Title, boxes, jsonPart }) {
  const { t } = useTranslation(["TechnicalSpecification"]);
  const seeDetails = useRef(null);
  const [seeTextDesc, setTextDesc] = useState(false); // Permets de voir le texte d'explication
  const [selectCard, setSelectCard] = useState(null); // Permets de dire quelle carte est sélectionné
  function handleSee(index) {
    boxes.forEach((box, i) => {
      if (i === index) {
        box.state[1](true);
      } else {
        box.state[1](false);
      }
    });
  }

  return (
    <div className="BoxExplanation">
      <h2>{Title}</h2>
      <div className="ListText">
        <div className="Liste">
          {boxes.map((box, index) => {
            const { title, titles } = box;

            return (
              <div
                key={index}
                onClick={() => {
                  handleSee(index);
                  if (selectCard === index) {
                    setTextDesc(false);
                    setSelectCard(null);
                  } else {
                    setTextDesc(true);
                    setSelectCard(index);
                  }
                }}
                className={selectCard === index ? "selectCard" : ""}
              >
                <ImgBox image={box.image} descImage={box.title} />
                <div className="BoxTitles">
                  {titles.map((elm, i) => {
                    return (
                      <h6 key={i}>{t(`${jsonPart}.${title}.titles.${elm}`)}</h6>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        {seeTextDesc && (
          <div className="TextDesc" ref={seeDetails}>
            {boxes.map((box, index) => {
              return box.state[0] ? (
                <BoxDetail
                  // className={selectCard === index ? "selectCard" : ""}
                  key={index}
                  title={t(`${jsonPart}.${box.title}.title`)}
                  desc={box.desc.map((desc) =>
                    t(`${jsonPart}.${box.title}.${desc}`)
                  )}
                />
              ) : null;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default BoxExplanation;
