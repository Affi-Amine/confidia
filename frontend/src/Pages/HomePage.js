import React from "react";
import "../sass/Pages/HomePage.scss";

import { UnauthenticatedTemplate } from "@azure/msal-react";
import { useTranslation } from "react-i18next";
// Utils
import { useAuthenticationActions } from "../Utils/useAuthenticationActions.jsx";
// Contents
import FromCustomer from "../Contents/HomePage/FromCustomer.js";
import Introduc from "../Contents/HomePage/Introduc.js";
import OurTeams from "../Contents/HomePage/OurTeams.js";
import PromiseOfValue from "../Contents/HomePage/PromiseOfValue.js";
import SpecializingIA from "../Contents/HomePage/SpecializingIA.js";

import useOpenLink from "../hooks/useOpenLink.js";

function HomePage({
  currentHomePagePromiseOfValueRef,
  currentHomePageOurteamsRef,
}) {
  const { t } = useTranslation(["HomePage"]);
  const { handleLoginPopup } = useAuthenticationActions();
  const openLinkInNewPageByLangue = useOpenLink();

  return (
    <div className="HomePage">
      <Introduc />
      <SpecializingIA currentHomePageOurteamsRef={currentHomePageOurteamsRef} />
      <PromiseOfValue
        currentHomePagePromiseOfValueRef={currentHomePagePromiseOfValueRef}
      />
      <OurTeams />
      <div className="AllBoxButtons">
        <button
          className="ReqDemo"
          onClick={() => openLinkInNewPageByLangue("demo")}
        >
          {t("ButtonsGlobals.reqRDV")}
        </button>
        <UnauthenticatedTemplate>
          <button className="FreePlay" onClick={() => handleLoginPopup()}>
            {t("ButtonsGlobals.FreePlay")}
          </button>
        </UnauthenticatedTemplate>
      </div>
      <FromCustomer />
    </div>
  );
}

export default HomePage;
