import React, { useContext } from "react";
import "../../sass/Contents/HomePage/Introduction.scss";

import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAuthenticationActions } from "../../Utils/useAuthenticationActions";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { isEmailAuthorized } from "../../Utils/isEmailAuthorized";
import useModalStore from "../../Store/useModalStore";
import useCheckAccessAndRedirect from "../../hooks/useCheckAccessAndRedirect";

function Introduction() {
  const checkAccessAndRedirect = useCheckAccessAndRedirect();
  let history = useHistory();
  const { t } = useTranslation(["HomePage"]);

  const { accounts } = useMsal();

  const { openConfiguration, setSeeBadVersion, setSeeLimitedOfferM } =
    useModalStore();

  const { handleLoginPopup } = useAuthenticationActions();
  function LoginClick() {
    handleLoginPopup();
  }
  const handleCheckAccessRedirectClick = () => {
    checkAccessAndRedirect();
  };
  return (
    <div className="Introduction">
      {/* <img src={ImgIntrodution} loading="lazy" alt="robot hand and humain hand" /> */}
      <div>
        <h1>
          CONFID
          <span>IA</span>
        </h1>
        {/* <p>
          {t("SubTitle.title1")} <br></br> {t("SubTitle.title2")} <br></br>
          {t("SubTitle.title3")}
        </p> */}
        <h2>
          <span>{t("Introduction.subtitle.1")}</span>
          {t("Introduction.subtitle.2")}
        </h2>
        <div className="button-container">
          <UnauthenticatedTemplate>
            <button onClick={LoginClick}>{t("RequestDemo")}</button>
          </UnauthenticatedTemplate>

          <AuthenticatedTemplate>
            <button onClick={handleCheckAccessRedirectClick}>
              {t("CreatDoc")}
            </button>
          </AuthenticatedTemplate>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
