import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Block({ number, text, style }) {
  return (
    <div className="Block">
      {/* <FontAwesomeIcon
        className="elipse"
        icon="fa-solid fa-ellipsis-vertical"
      /> */}

      <p className="number">{number}</p>
      <p style={style} className="text">
        {text}
      </p>
    </div>
  );
}

export default Block;
