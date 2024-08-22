import React from "react";
import { useTranslation } from "react-i18next";
import "../sass/Modals/BadVersion.scss";
import useModalStore from "../Store/useModalStore";
function BadVersion() {
  const { t } = useTranslation(["Modal"]);
  const { seeBadVersion, setSeeBadVersion } = useModalStore();
  if (!seeBadVersion) return null;
  return (
    <div className="BadVersion">
      <button className="X" onClick={() => setSeeBadVersion(false)}>
        X
      </button>
      <div className="texts">
        <p>{t("BadVersion.messages.1")}</p>
        <p>{t("BadVersion.messages.2")}</p>
      </div>
      <div className="buttons">
        <a
          href="/contact"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            setSeeBadVersion(false);
          }}
        >
          {t("BadVersion.buttons.offer")}
          <p className="alertRedirect">{t("BadVersion.alert")}</p>
        </a>
      </div>
    </div>
  );
}
export default BadVersion;
