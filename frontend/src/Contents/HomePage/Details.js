import React from "react";
import "../../sass/Components/Details.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Box from "../../Components/Box";

import { slideLeft, slideRight } from "../../Utils/AllSlide";

function Details(props) {
  const { AllBoxId, Title, AllBoxData, nameRef } = props;

  return (
    <div ref={nameRef} className="Details">
      <h1>{Title}</h1>
      <div className="Arrows">
        <FontAwesomeIcon
          className="ArrowIcon"
          icon="fa-solid fa-chevron-left"
          size="3x"
          onClick={() => slideLeft(AllBoxId)}
        />
        <FontAwesomeIcon
          className="ArrowIcon"
          id="slide-arrow-next"
          icon="fa-solid fa-chevron-right"
          size="3x"
          onClick={() => slideRight(AllBoxId)}
        />
      </div>
      <div className="AllBox" id={AllBoxId}>
        {AllBoxData.map((elem, i) => {
          const { title, image, text1, text2, text3, text4, text5 } = elem;
          return (
            <Box
              key={i}
              image={image}
              title={title}
              text1={text1}
              text2={text2}
              text3={text3}
              text4={text4}
              text5={text5}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Details;
