import { UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import ImgBox from "../Components/ImgBox";
import { useAuthenticationActions } from "../Utils/useAuthenticationActions";
// Store
import useGlobalParam from "../Store/useGlobalParam";
import useModalStore from "../Store/useModalStore";
import useUserProfile from "../Store/useUserProfile";

// IMG
import enPrelauchcer from "../assets/img/PreLaunch/enBaseOffer.png";
import frPrelauchcer from "../assets/img/PreLaunch/frBaseOffer.png";
import itPrelauchcer from "../assets/img/PreLaunch/itBaseOffer.png";

import "../sass/Modals/PreLaunchOfferM.scss";

export default function PreLaunchOfferM() {
  const { t } = useTranslation(["Modal"]);
  const { handleLoginPopup } = useAuthenticationActions();
  const { seePreLaunchOfferM, setPreLauncherOfferM, setSeeLimitedOfferM } =
    useModalStore();
  const { language } = useGlobalParam();
  const { accounts } = useMsal();
  const { userData } = useUserProfile();
  const accountData = accounts[0]?.idTokenClaims || userData[0]?.idTokenClaims;
  const imagePrelaunch = {
    fr: frPrelauchcer,
    it: itPrelauchcer,
    en: enPrelauchcer,
  };

  if (!seePreLaunchOfferM || accountData) return null;

  return (
    <UnauthenticatedTemplate>
      <div className="PreLaunchOfferM">
        <div className="close" onClick={() => setPreLauncherOfferM(false)}>
          X
        </div>
        <ImgBox image={imagePrelaunch[language]} desc={"offre basic"} />
        <div className="boxButtons">
          <button
            onClick={() => {
              setPreLauncherOfferM(false);
              // setSeeLimitedOfferM(true);
              handleLoginPopup();
            }}
          >
            {t("PreLaunchOfferM.registerLogin")}
            <FontAwesomeIcon className="Usericon" icon="fa-user" />
          </button>
        </div>
      </div>
    </UnauthenticatedTemplate>
  );
}
