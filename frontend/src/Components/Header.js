// DLO-1007
import React, { useEffect, useState } from "react";
import "../sass/Components/Header.scss";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import logo from "../assets/img/Logo.png";

import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Language from "./Language";
import PolicyIubenda from "./PolicyIubenda";

import User from "./User";
import { useAuthenticationActions } from "../Utils/useAuthenticationActions";
import useModalStore from "../Store/useModalStore";
import MenuBurger from "./MenuBurger";
import GlobalNav from "./GlobalNav";
import { scrollToMyComponent } from "../Utils/ScrollTo";

function Header(props) {
  let history = useHistory();
  const location = useLocation();
  const { t } = useTranslation(["header"]);

  const { currentHomePagePromiseOfValueRef, currentHomePageOurteamsRef } =
    props;

  const { handleLoginPopup } = useAuthenticationActions();

  const {
    openConfiguration,
    setOpenConfiguration,
    setSeeEarlyAdopterM,
    setSeeDataLostModal,
    setSeeBadVersion,
  } = useModalStore();

  const [seeMenu, setSeeMenu] = useState(false);
  useEffect(() => {
    setSeeMenu(false);
  }, [location.pathname]);
  return (
    <div className="Header">
      <div
        className="Logo"
        onClick={() => {
          history.push("/");
        }}
      >
        <img src={logo} loading="lazy" alt="Logo" />
      </div>
      {/* <GlobalNav /> */}
      {/* <MenuBurger /> */}
      <div className="HeaderBox">
        <button className="seeMenu" onClick={() => setSeeMenu(!seeMenu)}>
          <FontAwesomeIcon icon="fa-solid fa-bars" size="2x" />
        </button>
        <div
          className={
            seeMenu === true
              ? "AllBox allBox-Activate"
              : "AllBox allBox-Disable"
          }
        >
          <AuthenticatedTemplate>
            <User />
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <button
              className="BConnect"
              onClick={() => {
                handleLoginPopup();
              }}
            >
              <FontAwesomeIcon className="Usericon" icon="fa-user" />
              <span>{t("registerLogin")}</span>
            </button>
          </UnauthenticatedTemplate>

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
            <button
              className="acceuil order1"
              onClick={() => history.push("/")}
            >
              {t("home")}
            </button>
            <button
              className="seeInfos"
              onClick={() => {
                if (location.pathname === "/") {
                  scrollToMyComponent({
                    scrollToCurrentComposantRef: currentHomePageOurteamsRef,
                  });
                } else {
                  history.push("/about");
                }
              }}
            >
              {t("infos")}
            </button>
            <button
              onClick={() => {
                if (location.pathname === "/") {
                  scrollToMyComponent({
                    scrollToCurrentComposantRef:
                      currentHomePagePromiseOfValueRef,
                  });
                } else {
                  history.push("specification-technique");
                }
              }}
            >
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
    </div>
  );
}

export default Header;
