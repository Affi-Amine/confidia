import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import "../../sass/Contents/HomeLogin/HomeAccess.scss";

import useModalStore from "../../Store/useModalStore";

import ParamPc from "../../assets/Pages/HomeLogin/ParamPc.png";
import tabMW from "../../assets/Pages/HomeLogin/tabMW.png";

import ImgBox from "../../Components/ImgBox";
import useStapeDisplayGoogleForm from "../../Modals/hooks/stapeDisplayGoogleForm.hook";

export default function HomeAccess() {
  const { t } = useTranslation(["HomeLogin", "translation"]);
  let history = useHistory();
  const stapeDisplayGoogleForm = useStapeDisplayGoogleForm();
  const setSeeNewFeature = useModalStore((s) => s.setSeeNewFeature);

  let accesEnv = ["TEST", "DEV"];

  // Define the function here
  const handleCheckAccessRedirectClick = () => {
    // Your redirect logic here
    history.push("/access-docs"); // Example route
  };

  return (
    <div className="HomeAccess">
      <h1>{t("T.1")}</h1>
      <h2 className="backC">{t("InscriDesc.1")}</h2>
      <section>
        <button className="BOffer" onClick={() => setSeeNewFeature(true)}>
          <h5>
            {t("myOffer.1")} <br />
            {t("myOffer.2")}
          </h5>
          <ImgBox
            image={tabMW}
            descImage={
              "Femme sur son pc assise sur un écran, et homme avec un stylo qui modifie le contenue de l'écran"
            }
          />
        </button>
        <div className="blockCenter">
          <h3>{t("InscriDesc.2.1") + t("InscriDesc.2.2")}</h3>
          <div className="BoxButtons">
            <button onClick={handleCheckAccessRedirectClick}>
              {t("translation:ButtonsConnect.docScript")}
            </button>
            {accesEnv.includes(process.env.REACT_APP_ENVNAME) && (
              <button onClick={() => history.push("/confidia-board")}>
                {t("Buttons.manageProjects")}
              </button>
            )}
          </div>
        </div>
        <button className="BSetting" onClick={() => setSeeNewFeature(true)}>
          <ImgBox
            image={ParamPc}
            descImage={"personnage qui regarde plusieurs page web"}
          />
          <h5>{t("translation:ButtonsConnect.mySetting")}</h5>
        </button>
      </section>
      <div className="BoxButtons HorizontalButtons">
        <button onClick={() => stapeDisplayGoogleForm("questionnaireSondage")}>
          {t("Buttons.shareExp")}
        </button>
        <button onClick={() => history.push("video-demonstration")}>
          {t("translation:ButtonsGlobals.quicktourC")}
        </button>
      </div>
    </div>
  );
}