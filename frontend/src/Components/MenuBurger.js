import React from "react";
import "../sass/Components/MenuBurger.scss";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import Language from "./Language";
import PolicyIubenda from "./PolicyIubenda";
function MenuBurger() {
  let history = useHistory();
  const { t } = useTranslation(["header"]);
  const [seeMenu, setSeeMenu] = useState(false);
  // const [seeSearch, setSeeSearch] = useState(false);
  // const [seeInfos, setSeeInfos] = useState(false);
  return (
    <div className="MenuBurger">
      <button className="seeMenu" onClick={() => setSeeMenu(!seeMenu)}>
        <FontAwesomeIcon icon="fa-solid fa-bars" size="2x" />
      </button>
      <div
        className={
          seeMenu === true ? "AllBox allBox-Activate" : "AllBox allBox-Disable"
        }
        onClick={() => setSeeMenu(!seeMenu)}
      >
        {/* Anciens emplacement de div BoxSearch */}
        <div className="BoxLanguage">
          <Language setSeeMenu={setSeeMenu} />
        </div>

        <div
          id="Header-BoxMenu"
          className={
            seeMenu === true
              ? "boxMenu Header-Activate"
              : "boxMenu Header-Disable"
          }
        >
          <button className="acceuil order1" onClick={() => history.push("/")}>
            {t("home")}
          </button>
          <button className="seeInfos" onClick={() => history.push("/about")}>
            {t("infos")}
          </button>
          <button onClick={() => history.push("specification-technique")}>
            {t("speTech")}
          </button>
          <button
            onClick={() => {
              history.push("/contact");
              // alert(t("askmore.text"));
            }}
          >
            {t("contact")}
          </button>
          <div className="buttonsCondition">
            <button>
              {t("consultCondition.T")}
              <FontAwesomeIcon
                className="Icon"
                icon="fa-solid fa-chevron-down"
              />
            </button>

            <div className="DeroulanteListe">
              <p>
                <PolicyIubenda text={t("consultCondition.B1")} />
              </p>
              <p onClick={() => history.push("/CGU")}>
                {t("consultCondition.B2")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MenuBurger;
