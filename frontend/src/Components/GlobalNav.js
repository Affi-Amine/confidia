import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import "../sass/Components/GlobalNav.scss";
export default function GlobalNav() {
  let history = useHistory();
  const { t } = useTranslation(["header"]);
  const [seeMenu, setSeeMenu] = useState(true);
  const [seeSearch, setSeeSearch] = useState(false);
  const [seeInfos, setSeeInfos] = useState(false);
  return (
    <div className="GlobalNav">
      <button
        className="seeMenu"
        onMouseEnter={() => {
          setSeeMenu(true);
        }}
        onMouseLeave={() => {
          setSeeMenu(false);
        }}
      >
        <FontAwesomeIcon icon="fa-solid fa-bars" size="2x" />
      </button>
    </div>
  );
}
