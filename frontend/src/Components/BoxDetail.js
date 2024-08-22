import React from "react";

function BoxDetail({ desc }) {
  return (
    <div className="BoxDetail">
      <div className="Img"></div>

      {desc.map((elem, i) => {
        return (
          <p style={elem === "" ? { marginBottom: "1.5em" } : {}} key={i}>
            {elem}
          </p>
        );
      })}
    </div>
  );
}

export default BoxDetail;
