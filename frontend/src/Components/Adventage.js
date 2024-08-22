import React from "react";

function Adventage({ title, image, text1, text2, text3, image2, title2 }) {
  return (
    <div className="Adventage">
      <p className="description">
        <p>{text1}</p> <p>{text2}</p> <p>{text3}</p>
      </p>

      <div>
        {image && (
          <div className="imgBox">
            <img src={image} loading="lazy" alt={title} />
          </div>
        )}
        {title && <h2>{title}</h2>}
      </div>
      <div>
        {image2 && (
          <div className="imgBox">
            <img src={image2} loading="lazy" alt={title2} />
          </div>
        )}
        {title2 && <h2>{title2}</h2>}
      </div>
    </div>
  );
}

export default Adventage;
