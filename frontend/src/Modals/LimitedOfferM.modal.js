import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { send } from "@emailjs/browser";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
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

  const accountData = accounts[0]?.idTokenClaims || userData[0]?.idTokenClaims;
  const { seeLimitedOfferM, setSeeLimitedOfferM } = useModalStore();

  const [checkPrivacyPolicy, setCheckPrivacyPolicy] = useState(false);
  const [checkDemoCondition, setCheckDemoCondition] = useState(false);
  const [emailSend, setEmailSend] = useState(false);
  if (!seeLimitedOfferM || !isAuthenticated || !accountData) return null;

  let today = new Date();

  let day = String(today.getDate()).padStart(2, "0");
  let month = String(today.getMonth() + 1).padStart(2, "0");
  let year = today.getFullYear();
  let date = `${day}/${month}/${year}`;

  let validCondition =
    checkDemoCondition === true && checkPrivacyPolicy === true;

  var templateParams = {
    add_mailJSON: accountData.emails[0],
    add_dateJSON: date,
  };
  function SendMail() {
    send(
      "service_146ts5y",
      "template_2si3lar",
      templateParams,
      "2ihFj7ftOhdJ3OYtG"
    ).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
  }

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
          {!AccessType ||
          AccessType.key_freeTrial?.freeTrial_Activate === "sub" ? (
            <>
              <h2>{t("LimitedOfferM.title")}</h2>
              <p>
                {t("LimitedOfferMActivate.message.1")} 1
                {t("LimitedOfferMActivate.message.2")}
              </p>
            </>
          ) : (
            <>
              <h2>{t("LimitedOfferMActivate.title")}</h2>
              <p>
                {t("LimitedOfferMActivate.message.1")}
                {!AccessType || AccessType.AccessType?.confidia?.duration}
                {t("LimitedOfferMActivate.message.2")}
              </p>
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
              children={
                <span onClick={() => history.push("/CGU")}>
                  {t("CG:Policy.DemoC")}
                </span>
              }
            />
          </div>

          <div className="boxButtons">
            <button
              className={!validCondition ? "blocked" : ""}
              onClick={() => {
                if (validCondition) {
                  SendMail();
                  setEmailSend(true);
                }
              }}
            >
              {!AccessType ||
              AccessType.key_freeTrial?.freeTrial_Activate === "sub"
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
