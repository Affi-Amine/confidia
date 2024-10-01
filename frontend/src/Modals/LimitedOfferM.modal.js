import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { send } from "@emailjs/browser";
import axios from "axios";

import CheckboxText from "../Components/CheckboxText";
import PolicyIubenda from "../Components/PolicyIubenda";

import useModalStore from "../Store/useModalStore";
import useUserProfile from "../Store/useUserProfile";

import "../sass/Modals/LimitedOfferM.scss";

function LimitedOfferM() {
  const { t } = useTranslation(["Modal", "CG"]);
  const history = useHistory();
  const isAuthenticated = useIsAuthenticated();
  const { accounts } = useMsal();
  const { userData, AccessType } = useUserProfile();
  const { seeLimitedOfferM, setSeeLimitedOfferM } = useModalStore();

  const [checkPrivacyPolicy, setCheckPrivacyPolicy] = useState(false);
  const [checkDemoCondition, setCheckDemoCondition] = useState(false);
  const [emailSend, setEmailSend] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const accountData = accounts[0]?.idTokenClaims || userData[0]?.idTokenClaims;

  useEffect(() => {
    if (!seeLimitedOfferM || !isAuthenticated || !accountData) {
      return;
    }

    if (isSubscribed) {
      setSeeLimitedOfferM(false);
      history.push("/homelogin");
    }
  }, [seeLimitedOfferM, isAuthenticated, accountData, isSubscribed, history, setSeeLimitedOfferM]);

  if (!seeLimitedOfferM || !isAuthenticated || !accountData) {
    return null;
  }

  const today = new Date();
  const date = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;

  const validCondition = checkDemoCondition && checkPrivacyPolicy;

  const templateParams = {
    add_mailJSON: accountData.emails[0],
    add_dateJSON: date,
  };

  const SendMail = () => {
    send("service_146ts5y", "template_2si3lar", templateParams, "2ihFj7ftOhdJ3OYtG")
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
      })
      .catch((error) => {
        console.log("FAILED...", error);
      });
  };

  const handleButtonClick = async () => {
    if (validCondition || accountData) {
      const email = accountData.emails[0];
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/subscribe-user/?email=${email}`
        );

        window.location.reload();
        
        if (response.status === 200 || response.status === 201) {
          SendMail();
          setEmailSend(true);
          setIsSubscribed(true);
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
      <div className="close" onClick={() => setSeeLimitedOfferM(false)}>
        X
      </div>
      {emailSend ? (
        <>
          <h2>{t("LimitedOfferM.emailSendTitle")}</h2>
          <p>{t("LimitedOfferM.emailSendMessage")}</p>
        </>
      ) : (
        <>
          <h2>
            {!AccessType || AccessType.key_freeTrial?.freeTrial_Activate === "sub"
              ? t("LimitedOfferM.title")
              : t("LimitedOfferMActivate.title")}
          </h2>
          <p>
            {!AccessType || AccessType.key_freeTrial?.freeTrial_Activate === "sub"
              ? `${t("LimitedOfferMActivate.message.1")} 1 ${t("LimitedOfferMActivate.message.2")}`
              : `${t("LimitedOfferMActivate.message.1")} ${AccessType.AccessType?.confidia?.duration} ${t("LimitedOfferMActivate.message.2")}`}
          </p>

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
            <button className={!validCondition ? "blocked" : ""} onClick={handleButtonClick}>
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