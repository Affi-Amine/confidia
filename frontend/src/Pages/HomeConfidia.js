import { useMsal } from "@azure/msal-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import MobileWarningM from "../Modals/MobileWarningM.modal";
import useConfidiaDoc from "../Store/useConfidiaDoc";
import useModalStore from "../Store/useModalStore";
import useUserProfile from "../Store/useUserProfile";
import { isEmailAuthorized } from "../Utils/isEmailAuthorized";
import useCheckAccessAndRedirect from "../hooks/useCheckAccessAndRedirect";
import "../sass/Pages/HomeConfidia.scss";

export default function HomeConfidia() {
  const checkAccessAndRedirect = useCheckAccessAndRedirect();
  let history = useHistory();
  const { t } = useTranslation(["HomeConfidia"]);
  const { accounts } = useMsal();

  const { docTechnic } = useConfidiaDoc();
  const setSeeLimitedOfferM = useModalStore((s) => s.setSeeLimitedOfferM);
  const { userData } = useUserProfile();
  const [seeBox, setSeeBox] = useState("");
  const accountData = accounts[0]?.idTokenClaims || userData[0]?.idTokenClaims;

  const handleCheckAccessRedirectClick = () => {
    checkAccessAndRedirect();
  };

  useEffect(() => {
    if (accountData && isEmailAuthorized(accountData.emails[0])) {
      setSeeLimitedOfferM(false);
    }
  }, [accountData, setSeeLimitedOfferM]);
  if (!accountData) return null;
  return (
    <div className="HomeConfidia">
      <MobileWarningM />
      <div className="boxButtons">
        <button onClick={() => setSeeBox("manageAcces")}>
          {t("nav.title.t1")}
          <FontAwesomeIcon className="icon" icon="fa-solid fa-lock" />
        </button>
        <button onClick={() => setSeeBox("manageFolders")}>
          {t("nav.title.t2")}
          <FontAwesomeIcon className="icon" icon="fa-solid fa-folder" />
        </button>
        <button onClick={handleCheckAccessRedirectClick}>
          {t("nav.title.t7")}
          <FontAwesomeIcon className="icon" icon="fa-solid fa-pen-nib" />
        </button>
        <button onClick={() => setSeeBox("manageProjects")}>
          {t("nav.title.t3")}
          <FontAwesomeIcon className="icon" icon="fa-solid fa-bars-progress" />
        </button>
        <button onClick={() => setSeeBox("manageLanguages")}>
          {t("nav.title.t5")}
          <FontAwesomeIcon className="icon" icon="fa-solid fa-language" />
        </button>
        {docTechnic.length !== 0 && (
          <button onClick={() => history.push("/documentation-technique")}>
            {t("nav.title.t6")} <p className=" icon balise">{"</>"}</p>
          </button>
        )}
        {!isEmailAuthorized(accountData.emails[0]) && (
          <button onClick={() => setSeeLimitedOfferM(true)}>
            {t("nav.title.t9")}
          </button>
        )}
      </div>
      {seeBox === "manageAcces" && "gestion des acces"}
      {seeBox === "manageFolders" && "gestion des fichier"}
      {seeBox === "manageProjects" && "gestion des projects"}
      {seeBox === "manageOffers" && "gestion des offres"}
      {seeBox === "manageLanguages" && "gestion des languages"}
    </div>
  );
}
