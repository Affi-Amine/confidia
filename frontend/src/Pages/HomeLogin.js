import { useMsal } from "@azure/msal-react";
import React, { useEffect } from "react";  // Import useEffect for the redirection logic
import { useTranslation } from "react-i18next";
import HomeAccess from "../Contents/HomeLogin/HomeAccess";
import HomeNotAcsess from "../Contents/HomeLogin/HomeNotAccess";
import useUserProfile from "../Store/useUserProfile";
import { freeTrialAuthEmail } from "../Utils/isEmailAuthorized";
import { useHistory } from 'react-router-dom';  // Utilise useHistory
import "../sass/Pages/HomeLogin.scss";

export default function HomeLogin() {
  const { t } = useTranslation(["HomeLogin", "Dashboard"]);

  const { accounts } = useMsal();
  const { userData, AccessType } = useUserProfile();
  const history = useHistory();  // Utilise useHistory

  const accountData = accounts[0]?.idTokenClaims || userData[0]?.idTokenClaims;

  useEffect(() => {
    if (accounts.length > 0) {
      // Commenter cette ligne si tu ne veux pas rediriger immédiatement
      // history.push('/home');
    }
  }, [accounts, history]);  // Dependency array to trigger the effect on account state changes

  if (!accountData) return <div>Loading...</div>;  // Ajout d'un message de chargement
  if (!AccessType) return <HomeNotAcsess />;

  return (
    <div className="HomeLogin">
      {freeTrialAuthEmail(accountData.emails[0]) === true ||
      AccessType.AccessType?.confidia?.access === "noLimit" ? (
        <>
          <h5 className="headband">{t("headband")}</h5>
          <HomeAccess />
        </>
      ) : (
        <HomeNotAcsess />
      )}
    </div>
  );
}
