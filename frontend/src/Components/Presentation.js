import React from "react";

function Presentation(props) {
  const {
    title,
    question,
    image,
    button,
    text1,
    text2,
    text3,
    text4,
    text5,
    center,
  } = props;
  return (
    <div className="Presentation">
      <h1>{title}</h1>
      <div>
        <div className="imgBox">
          <img src={image} loading="lazy" alt={title} />
        </div>
        <div className="description">
          <h2>{question}</h2>
          <p>{text1}</p>
          <p>{text2}</p>
          <p>{text3}</p>
          <p>{text4}</p>
          <p>{text5}</p>
          <p className="center">{center}</p>
          {button && <button>{button}</button>}
        </div>
      </div>
    </div>
  );
}

export default Presentation;
