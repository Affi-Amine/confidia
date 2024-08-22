import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import "../../sass/Contents/Dashboard/Alertes.scss";

import AlertesDetails from "../../Components/AlertesDetails";
import useConfidiaDoc from "../../Store/useConfidiaDoc";

function Alertes() {
  const { t } = useTranslation(["Dashboard"]);
  const { dashboard } = useConfidiaDoc();
  let Alertes = dashboard.Alertes || [];
  let compteur = Alertes.functionning + Alertes.folders + Alertes.Ethics;
  let consult = t("Alertes.consult");
  return (
    <div className="Alertes">
      <div className="icons">
        <FontAwesomeIcon
          icon="fa-solid fa-triangle-exclamation"
          color="#F8CC34"
        />
        <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />
      </div>
      <section>
        <div className="compteur">
          <p className="number">{compteur}</p>
          <p className="text">{t("Alertes.alertes")}</p>
        </div>
        <div className="details">
          <AlertesDetails
            number={Alertes.functionning}
            title={t("Alertes.operation")}
            consult={consult}
          />
          <AlertesDetails
            number={Alertes.folders}
            title={t("Alertes.files")}
            consult={consult}
          />
          <AlertesDetails
            number={Alertes.Ethics}
            title={t("Alertes.ethic")}
            consult={consult}
          />
        </div>
      </section>
    </div>
  );
}

export default Alertes;
