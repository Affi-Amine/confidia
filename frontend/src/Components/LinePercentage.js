import React from "react";

function LinePercentage({ title, number, keyLinePercentage }) {
  let color = "#da1e28";
  if (number >= 25) {
    color = "#00b3ff";
  }
  if (number >= 50) {
    color = "#002231";
  }
  if (number >= 75) {
    color = "green";
  }
  return (
    <div
      key={`${keyLinePercentage + title + number}`}
      className="LinePercentage"
    >
      <p>{title}</p>
      <div className="BoxPN">
        <p className="percentageNumber"> {number} % </p>
        <div className="percentage">
          <div
            className="number"
            style={{ width: `${number}%`, backgroundColor: `${color}` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default LinePercentage;
