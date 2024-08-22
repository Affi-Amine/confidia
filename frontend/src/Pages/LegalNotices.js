import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import PolicyIubenda from "../Components/PolicyIubenda";
import "../sass/Pages/LegalNotice.scss";
export default function LegalNotice() {
  const { t } = useTranslation(["LegalNotice"]);
  let history = useHistory();
  return (
    <div className="LegalNotice">
      <h1>{t("T")}</h1>

      <div className="Edit">
        <h2>{t("Edit.t")}</h2>
        <p>
          DS FOR DS
          <br /> <br />
          2, rue Gustave Eiffel 10430 ROSIERES-PRES-TROYES <br />
          France
          <br /> <br />
          https://dsfords.com (confidia.dsfords.com)
          <br /> <br />
          {t("Edit.desc.1")}
        </p>
      </div>

      <div className="DirectPublish">
        <h2>{t("DirectPublish.t")}</h2>
        <p>
          Mme Giulia CERNICCHIARO
          <br /> <br />
          {t("DirectPublish.desc.1")} confidia@dsfords.com <br /> <br />
          https://dsfords.com (confidia.dsfords.com)
        </p>
      </div>

      <div className="CreatGraphic">
        <h2>{t("CreatGraphic.t")}</h2>
        <p>
          {t("CreatGraphic.desc.1")} Mme Lollia Doriane
          <br /> <br />
          {t("CreatGraphic.desc.2")} Mr Jonathan Nicaud
        </p>
      </div>

      <div className="Hebergement">
        <h2>{t("Hebergement.t")}</h2>
        <p>
          o2switch – SARL au capital de 100 000 Euros
          <br /> <br />
          222 Boulevard Gustave Flaubert – 63000 CLERMONT-FERRAND – France
          <br /> <br />
          Tél. : +33 (0)4 44 44 60 40
          <br /> <br />
          https://www.o2switch.fr
        </p>
      </div>

      <div className="LN_CGU">
        <h2>{t("LN_CGU.t")}</h2>
        <button onClick={() => history.push("/CGU")}>
          {t("buttons.learnMore")}
        </button>
      </div>

      <div className="Cookies">
        <h2>{t("Cookies.t")}</h2>
        <p>
          <li>
            Internet Explorer :
            http://windows.microsoft.com/fr-FR/windows-vista/Block-or-allow-cookies
          </li>
          <li> Firefox : http://support.mozilla.org/fr Safari :</li>
          <li>Safari : http://docs.info.apple.com/ Google Chrome :</li>
          <li>Google Chrome : https://support.google.com/chrome/ Opéra :</li>
          <li>Opéra : http://help.opera.com/Windows/10.20/fr/cookies.html</li>
        </p>
        <button>
          <PolicyIubenda text={t("buttons.learnMore")} />
        </button>
      </div>

      <div className="LNContact">
        <h2>{t("LNContact.t")}</h2>
        <p>{t("LNContact.desc.1")}</p>
        <button onClick={() => history.push("/contact")}>
          {t("buttons.learnMore")}
        </button>
      </div>
    </div>
  );
}
