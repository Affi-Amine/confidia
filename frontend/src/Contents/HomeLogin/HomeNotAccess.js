import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useModalStore from "../../Store/useModalStore";
import "../../sass/Contents/HomeLogin/HomeNotAccess.scss";

import { useMsal } from "@azure/msal-react";
import { useHistory } from "react-router-dom";
import BtnLogoLink from "../../Components/BtnLogoLink";
import ImgBox from "../../Components/ImgBox";
import AdvantagesModal from "../../Modals/Advantages.modal";
import useStapeDisplayGoogleForm from "../../Modals/hooks/stapeDisplayGoogleForm.hook";
import useGlobalParam from "../../Store/useGlobalParam";
import useUserProfile from "../../Store/useUserProfile";
import { openInNewTab } from "../../Utils/OpenInNewTab";
import profileUser from "../../assets/Pages/HomeLogin/profileUser.png";

export default function HomeNotAcsess() {
  const { t } = useTranslation(["HomeLogin", "Dashboard"]);
  let history = useHistory();

  const setSeeLimitedOfferM = useModalStore((s) => s.setSeeLimitedOfferM);
  const { language } = useGlobalParam();

  const stapeDisplayGoogleForm = useStapeDisplayGoogleForm();

  const [seeAdvantageModal, setSeeAdvantageModal] = useState(false);
  const [sendValidType, setSendValidType] = useState("");

  const urlsConsulting = {
    fr: "https://outlook.office365.com/owa/calendar/ConfidIA_FR@dsfords.fr/bookings/s/Eja_6BJgDEun7_yuG5NcCQ2",
    en: "https://outlook.office365.com/owa/calendar/ConfidIA_EN@dsfords.fr/bookings/s/MWgo0XGb5EKcXgOWEraA8w2",
    it: "https://outlook.office365.com/owa/calendar/ConfidIA_IT@dsfords.fr/bookings/s/14iLFRTha0i2Cc3mf5OOxQ2",
  };

  const { accounts } = useMsal();
  const { userData, AccessType } = useUserProfile();
  const accountData = accounts[0]?.idTokenClaims || userData[0]?.idTokenClaims;
  if (!accountData) return null;

  return (
    <div className="HomeNotAcsess">
      {seeAdvantageModal && (
        <AdvantagesModal
          setSeeAdvantageModal={setSeeAdvantageModal}
          sendValidType={sendValidType}
        />
      )}
      <section className="blockAdvantages">
        <h1>{t("T.1")}</h1>
        <h2>{t("T.2")}</h2>
        <div className="Blocks2">
          <div>
            <button
              className="BAdvantages"
              onClick={() => history.push("advantages")}
            >
              <ImgBox
                image={profileUser}
                descImage={"Personnage qui regarde plusieurs page web"}
              />
              <h5>{t("Buttons.myAdventage")}</h5>
            </button>
            <div className="boxLogo">
              <BtnLogoLink namelogo="meetup" />
              <BtnLogoLink namelogo="linkedin" />
            </div>
          </div>

          <div className="DetailAdvantages">
            <h5>{t("DescAdvantages.T1")}</h5>
            <p>{t("DescAdvantages.1")}</p>
            <p>{t("DescAdvantages.2")}</p>
            <p>
              {t("DescAdvantages.3")}
              <button
                className="AllSiteGlobalButtonUnderline"
                onClick={() => openInNewTab(urlsConsulting[language])}
              >
                {t("DescAdvantages.4b")}
              </button>
            </p>
            <div className="BoxButtons">
              <button
                onClick={() => {
                  setSeeAdvantageModal(true);
                  setSendValidType("email_newsletter");
                }}
              >
                {t("Buttons.subNewsletter")}
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="blockNoSubscrib">
        <h3 className="backC">{t("Desc.1")}</h3>
        <div className="boxTitleButt">
          <h3>
            {!AccessType ||
            AccessType.key_freeTrial?.freeTrial_Activate === "sub" ? (
              <>
                {t("InscriDesc.2.1")}
                <span className="textNoWrap"> {t("InscriDesc.2.2")}</span>
              </>
            ) : (
              t("InscriDesc.activate2.1")
            )}
          </h3>

          <button onClick={() => setSeeLimitedOfferM(true)}>
            {!AccessType ||
            AccessType.key_freeTrial?.freeTrial_Activate === "sub"
              ? t("translation:ButtonsConnect.subscrib")
              : t("translation:ButtonsConnect.activateOffer")}
          </button>
        </div>
        <div className="descOffer">
          <p>{t("OfferDesc.1")}</p>
          <p>{t("OfferDesc.2")}</p>
          <p>{t("OfferDesc.3")}</p>
          {/* <p className="limitOffer">{t("InscriDesc.3")}</p> */}
        </div>
        <div className="BoxButtons">
          <button
            onClick={() => stapeDisplayGoogleForm("questionnaireSondage")}
          >
            {t("translation:ButtonsConnect.yourOpinion")}
          </button>
          <button onClick={() => history.push("video-demonstration")}>
            {t("translation:ButtonsConnect.quicktour")}
          </button>
        </div>
      </section>
    </div>
  );
}
