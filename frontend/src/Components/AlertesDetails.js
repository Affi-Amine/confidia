import React from "react";
import useModalStore from "../Store/useModalStore";
function AlertesDetails({ number, title, consult }) {
  const setSeeNewFeature = useModalStore((s) => s.setSeeNewFeature);
  return (
    <div className="AlertesDetails">
      <p className="number">{number}</p>
      <div>
        <h2>{title}</h2>
        <p
          className="consult"
          onClick={() => {
            setSeeNewFeature(true);
          }}
        >
          {consult}
        </p>
      </div>
    </div>
  );
}

export default AlertesDetails;
