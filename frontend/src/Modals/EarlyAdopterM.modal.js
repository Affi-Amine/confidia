import { useMsal } from "@azure/msal-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import "../sass/Modals/EarlyAdopterM.scss";
import useGlobalParam from "../Store/useGlobalParam";
import useModalStore from "../Store/useModalStore";
import useUserProfile from "../Store/useUserProfile";
import { isEmailEarlyAdopterAuthorized } from "../Utils/isEmailAuthorized";

export default function EarlyAdopterM() {
  let history = useHistory();
  const { t } = useTranslation(["Modal"]);
  const { accounts } = useMsal();
  const { userData } = useUserProfile();
  const accountData = accounts[0]?.idTokenClaims || userData[0]?.idTokenClaims;
  const { seeEarlyAdopterM, setSeeEarlyAdopterM } = useModalStore();
  const setUserEarlyAdopterCode = useGlobalParam(
    (s) => s.setUserEarlyAdopterCode
  );
  const [access, setAccess] = useState("");
  const redirectToSite = () => {
    window.location.href = process.env.REACT_APP_REDIRECT_URL;
  };
  const { language } = useGlobalParam();
  const urlsEarlyAdopter = {
    fr: "https://outlook.office.com/bookwithme/user/3a63d369006d454c8577a1533ba92701@dsfords.fr/meetingtype/DAw70g7AeU25QCV4pabobw2?anonymous&ep=mCardFromTile",
    en: "https://outlook.office.com/bookwithme/user/3a63d369006d454c8577a1533ba92701@dsfords.fr/meetingtype/n_XUQaV5yEehRPDHe9isCA2?anonymous&ep=mCardFromTile",
    it: "https://outlook.office.com/bookwithme/user/3a63d369006d454c8577a1533ba92701@dsfords.fr/meetingtype/eFLPxXA-4EuVMn0M2WTWrQ2?anonymous&ep=mCardFromTile",
  };
  if (!seeEarlyAdopterM || !accountData) return null;
  function Submit(e) {
    e.preventDefault();
    console.log(
      "ici : ",
      isEmailEarlyAdopterAuthorized(accountData.emails[0], access)
    );
    if (isEmailEarlyAdopterAuthorized(accountData.emails[0], access) === true) {
      console.log("ici : ");
      setUserEarlyAdopterCode(access);
      setSeeEarlyAdopterM(false);
      history.push("/documentation-script");
    }
  }
  return (
    <div className="EarlyAdopterM">
      <button className="close" onClick={() => setSeeEarlyAdopterM(false)}>
        X
      </button>
      <h3>{t("EarlyAdopterM.T.1")}</h3>
      <h4>{t("EarlyAdopterM.message")}</h4>
      <form>
        <input
          type="password"
          aria-label="key access"
          value={access}
          onChange={(e) => setAccess(e.target.value)}
        />
        <button onClick={Submit}>OK</button>
      </form>
      <div className="texts">
        <p>{t("EarlyAdopterM.T.2")}</p>
        <p>{t("EarlyAdopterM.T.4")}</p>
      </div>

      <div className="buttons">
        <button
          onClick={() => {
            setSeeEarlyAdopterM(false);
            redirectToSite();
          }}
        >
          {t("EarlyAdopterM.buttons.1")}
        </button>
        <a
          className="link"
          href={urlsEarlyAdopter[language]}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("EarlyAdopterM.buttons.2")}
        </a>
      </div>
      <div className="buttonsText">
        <p>{t("EarlyAdopterM.T.5")} </p>
        <p>{t("EarlyAdopterM.T.3")}</p>
      </div>
    </div>
  );
}
