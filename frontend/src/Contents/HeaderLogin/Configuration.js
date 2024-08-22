import { useMsal } from "@azure/msal-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import useCheckAccessAndRedirect from "../../hooks/useCheckAccessAndRedirect";
import "../../sass/Contents/HeaderLogin/Configuration.scss";
import useModalStore from "../../Store/useModalStore";
import useUserProfile from "../../Store/useUserProfile";
import { checkAccess } from "../../Utils/accessUtils";
import { useAuthenticationActions } from "../../Utils/useAuthenticationActions";

function Configuration() {
  const checkAccessAndRedirect = useCheckAccessAndRedirect();
  let history = useHistory();
  const { t } = useTranslation(["HeaderLogin", "translation"]);
  const { accounts } = useMsal();
  const {
    openConfiguration,
    setSeeBadVersion,
    setSeeLimitedOfferM,
    setSeeEarlyAdopterM,
  } = useModalStore();

  const setSeeNewFeature = useModalStore((s) => s.setSeeNewFeature);

  const { userData, AccessType } = useUserProfile();

  const { handleLogoutPopup } = useAuthenticationActions();

  const accountData = accounts[0]?.idTokenClaims || userData[0]?.idTokenClaims;
  if (!accountData) return null;
  if (!openConfiguration) return null;

  const handleCheckAccessRedirectClick = () => {
    checkAccessAndRedirect();
  };

  function Disconnect() {
    history.push("/");
    handleLogoutPopup();
  }

  return (
    <div className="Configuration">
      <div onClick={() => history.push("/video-demonstration")}>
        <FontAwesomeIcon className="icon" icon=" fa-solid fa-paste" />
        <p>{t("Configuration.userGuide")}</p>
      </div>
      {checkAccess(AccessType) ? (
        <>
          <div onClick={handleCheckAccessRedirectClick}>
            <FontAwesomeIcon className="icon" icon="fa-solid fa-qrcode" />
            <p>{t("translation:ButtonsConnect.docScript")}</p>
          </div>
          <div
            onClick={() => {
              history.push("/homeLogin-confidia");
              setSeeNewFeature(true);
            }}
          >
            <FontAwesomeIcon className="icon" icon="fa-solid fa-circle" />
            <p>{t("Configuration.offer")}</p>
          </div>
        </>
      ) : (
        <div onClick={() => setSeeLimitedOfferM(true)}>
          <FontAwesomeIcon
            className="icon"
            icon="fa-solid fa-hand-point-right"
          />
          <p>{t("translation:ButtonsConnect.subscrib")}</p>
        </div>
      )}
      <div
        onClick={() => {
          history.push("/advantages");
        }}
      >
        <FontAwesomeIcon className="icon" icon="fa-solid fa-circle-info" />
        <p>{t("translation:ButtonsGlobals.Advantages")}</p>
      </div>

      <div
        onClick={() => {
          history.push("/community/expositions");
        }}
      >
        <FontAwesomeIcon className="icon" icon="fa-solid fa-burst" />
        <p>{t("translation:ButtonsGlobals.expositions")}</p>
      </div>

      {checkAccess(AccessType) && (
        <div
          onClick={() => {
            history.push("/homeLogin-confidia");
            setSeeNewFeature(true);
          }}
        >
          <FontAwesomeIcon className="icon" icon="fa-solid fa-gear" />
          <p>{t("Configuration.setting")}</p>
        </div>
      )}
      <div onClick={Disconnect}>
        <FontAwesomeIcon
          className="icon"
          icon="fa-solid fa-arrow-right-from-bracket"
        />
        <p>{t("Configuration.disconnect")}</p>
      </div>
    </div>
  );
}

export default Configuration;
