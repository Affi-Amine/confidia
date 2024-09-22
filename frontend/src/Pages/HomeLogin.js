import { useMsal } from "@azure/msal-react";
import React from "react";
import { useTranslation } from "react-i18next";
import HomeAccess from "../Contents/HomeLogin/HomeAccess";
import HomeNotAcsess from "../Contents/HomeLogin/HomeNotAccess";
import useUserProfile from "../Store/useUserProfile";
import { freeTrialAuthEmail } from "../Utils/isEmailAuthorized";
import "../sass/Pages/HomeLogin.scss";

export default function HomeLogin() {
  const { t } = useTranslation(["HomeLogin", "Dashboard"]);

  const { accounts } = useMsal();
  const { userData, AccessType } = useUserProfile();

  const accountData = accounts[0]?.idTokenClaims || userData[0]?.idTokenClaims;

  if (!accountData) return null;
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
