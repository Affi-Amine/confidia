import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { send } from "@emailjs/browser";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import CheckboxText from "../Components/CheckboxText";
import PolicyIubenda from "../Components/PolicyIubenda";
import useModalStore from "../Store/useModalStore";
import useUserProfile from "../Store/useUserProfile";
import { useUpdateAzureAdUserExtension } from "../Utils/updateAzureAdUserExtension";
import axios from "axios";

import "../sass/Modals/LimitedOfferM.scss";

function LimitedOfferM() {
  const { t } = useTranslation(["Modal", "CG"]);
  const history = useHistory();
  const isAuthenticated = useIsAuthenticated();
  const { accounts } = useMsal();
  const { userData, AccessType } = useUserProfile();
  const { seeLimitedOfferM, setSeeLimitedOfferM } = useModalStore();

  const accountData = accounts[0]?.idTokenClaims || userData[0]?.idTokenClaims;
  const extensionInscrite = accountData?.extension_inscrite !== undefined
    ? accountData.extension_inscrite
    : null;
  console.log(extensionInscrite)
  console.log(accountData)
  const [checkPrivacyPolicy, setCheckPrivacyPolicy] = useState(false);
  const [checkDemoCondition, setCheckDemoCondition] = useState(false);
  const [emailSend, setEmailSend] = useState(false);

  // Call your hook here
  const updateUserExtension = useUpdateAzureAdUserExtension();

  if (!seeLimitedOfferM || !isAuthenticated || !accountData) return null;

  let today = new Date();
  let date = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;

  const validCondition = checkDemoCondition && checkPrivacyPolicy;

  const templateParams = {
    add_mailJSON: accountData.emails[0],
    add_dateJSON: date,
  };

  const SendMail = () => {
    send("service_146ts5y", "template_2si3lar", templateParams, "2ihFj7ftOhdJ3OYtG")
      .then(response => {
        console.log("SUCCESS!", response.status, response.text);
      })
      .catch(error => {
        console.log("FAILED...", error);
      });
  };

  const handleButtonClick = async () => {
    if (validCondition || accountData) {
      const email = accountData.emails[0];
      console.log(email)
      try {
        // Make an API call to your backend to subscribe the user
        const response = await axios.get(`http://127.0.0.1:8000/api/subscribe-user/?email=${email}`);

        if (response.status === 200 || response.status === 201) {
          // Subscription succeeded, perform other actions
          SendMail();
          setEmailSend(true);
          updateUserExtension();
          console.log(accountData);
          // The backend will handle the redirection, no need for history.push
        } else {
          console.error("Subscription failed with status:", response.status);
        }
      } catch (error) {
        console.error("API call failed:", error);
      }
    }
  };

  return (
    <div className="LimitedOfferM">
      <div className="close" onClick={() => setSeeLimitedOfferM(false)}>X</div>
      {emailSend ? (
        <>
          <h2>{t("LimitedOfferM.emailSendTitle")}</h2>
          <p>{t("LimitedOfferM.emailSendMessage")}</p>
        </>
      ) : (
        <>
          {!AccessType || AccessType.key_freeTrial?.freeTrial_Activate === "sub" ? (
            <>
              <h2>{t("LimitedOfferM.title")}</h2>
              <p>{t("LimitedOfferMActivate.message.1")} 1{t("LimitedOfferMActivate.message.2")}</p>
            </>
          ) : (
            <>
              <h2>{t("LimitedOfferMActivate.title")}</h2>
              <p>{t("LimitedOfferMActivate.message.1")}{!AccessType || AccessType.AccessType?.confidia?.duration}{t("LimitedOfferMActivate.message.2")}</p>
            </>
          )}

          <div className="validChecks">
            <CheckboxText
              value={checkPrivacyPolicy}
              setValue={setCheckPrivacyPolicy}
              text={t("CG:Policy.readA") + t("CG:Policy.la")}
              children={<PolicyIubenda />}
            />
            <CheckboxText
              value={checkDemoCondition}
              setValue={setCheckDemoCondition}
              text={t("CG:Policy.readA") + t("CG:Policy.les")}
              children={<span onClick={() => history.push("/CGU")}>{t("CG:Policy.DemoC")}</span>}
            />
          </div>

          <div className="boxButtons">
            <button
              className={!validCondition ? "blocked" : ""}
              onClick={handleButtonClick}
            >
              {!AccessType || AccessType.key_freeTrial?.freeTrial_Activate === "sub"
                ? t("LimitedOfferM.button")
                : t("translation:ButtonsConnect.activateOffer")}
            </button>
          </div>
          <p className="earlyhave">{t("LimitedOfferM.alreadyhave")}</p>
        </>
      )}
    </div>
  );
}

export default LimitedOfferM;