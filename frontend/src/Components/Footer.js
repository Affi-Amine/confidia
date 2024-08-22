// DLO-1007
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useAuthenticationActions } from "../Utils/useAuthenticationActions";
import Logo from "../assets/img/Logo.png";
import useOpenLink from "../hooks/useOpenLink";
import "../sass/Components/Footer.scss";
import BtnLogoLink from "./BtnLogoLink";
import PolicyIubenda from "./PolicyIubenda";

function Footer() {
  const { t } = useTranslation("translation");
  const { handleLoginPopup } = useAuthenticationActions();

  const openLinkInNewPageByLangue = useOpenLink();
  let history = useHistory();

  return (
    <div className="Footer">
      <div className="Block1">
        <div className="boxLogoButton">
          <img
            src={Logo}
            alt="Logo"
            loading="lazy"
            onClick={() => {
              history.push("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
          <div className="boxLogo">
            <BtnLogoLink namelogo="linkedin" />
          </div>
          <div className="Boxbuttons">
            <UnauthenticatedTemplate>
              <button onClick={() => handleLoginPopup()}>
                {t("ButtonsGlobals.FreeConfidia")} <span>ConfidIA</span>
              </button>
            </UnauthenticatedTemplate>
            <AuthenticatedTemplate>
              <button
                className="ReqDemo"
                onClick={() => openLinkInNewPageByLangue("demo")}
              >
                {t("ButtonsGlobals.reqRDV")}
              </button>
            </AuthenticatedTemplate>
          </div>
        </div>

        <div className="Info">
          <p>+33 647986571</p>
          <p>confidia@dsfords.com</p>
          <br />
          <p>DS for DS</p>
          <p>2, rue Gustave Eiffel</p>
          <p>10430 ROSIERES-PRES-TROYES</p>
          <p>(France)</p>
        </div>
      </div>
      <div className="BoxTextLink">
        <button className="AllSiteGlobalButtonUnderline">
          <PolicyIubenda />
        </button>
        <p>-</p>
        <button
          className="AllSiteGlobalButtonUnderline"
          onClick={() => history.push("/mentions-legal")}
        >
          {t("ButtonsGlobals.LegalNotices")}
        </button>
        <p>-</p>
        <button
          className="AllSiteGlobalButtonUnderline"
          onClick={() => history.push("/CGU")}
        >
          {t("ButtonsGlobals.CG")}
        </button>
      </div>
    </div>
  );
}

export default Footer;
