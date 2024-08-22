import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import React from "react";
import { useTranslation } from "react-i18next";
import useCheckAccessAndRedirect from "../../hooks/useCheckAccessAndRedirect";
import "../../sass/Contents/HomePage/Introduc.scss";
import { useAuthenticationActions } from "../../Utils/useAuthenticationActions";
export default function Introduc() {
  const { t } = useTranslation(["HomePage"]);
  const checkAccessAndRedirect = useCheckAccessAndRedirect();
  const { handleLoginPopup } = useAuthenticationActions();

  return (
    <div className="Introduc">
      <div className="background-image"></div>
      <h1 className="Title">
        CONFID
        <span>IA</span>
      </h1>
      <h2 className="Subtitle">
        <span>{t("Introduction.subtitle.1")}</span>
        <br />
        {t("Introduction.subtitle.2")}
      </h2>
      <div className="button-container">
        <UnauthenticatedTemplate>
          <button onClick={() => handleLoginPopup()}>
            {t("ButtonsGlobals.FreePlay")}
          </button>
        </UnauthenticatedTemplate>
        <AuthenticatedTemplate>
          <button onClick={() => checkAccessAndRedirect()}>
            {t("translation:ButtonsConnect.docScript")}
          </button>
        </AuthenticatedTemplate>
      </div>
    </div>
  );
}
