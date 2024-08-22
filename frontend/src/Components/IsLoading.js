import React from "react";
import "../sass/Components/IsLoading.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function IsLoading({ text }) {
  return (
    <div className="IsLoading">
      <h2>{text}</h2>
      <FontAwesomeIcon className="icon" icon="fa-solid fa-spinner fa-spin" />
    </div>
  );
}
