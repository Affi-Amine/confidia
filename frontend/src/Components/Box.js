import React from "react";

function Box({ title, text1, text2, text3, text4, text5, image, button }) {
  return (
    <div className="Box">
      <h2>{title}</h2>
      {image && (
        <div className="imgBox">
          <img src={image} loading="lazy" alt={title} />
        </div>
      )}
      <div className="description">
        <p>{text1}</p>
        <p>{text2}</p>
        <p>{text3}</p>
        <p>{text4}</p>
        <p>{text5}</p>
      </div>
    </div>
  );
}

export default Box;
