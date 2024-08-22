import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

function Ready({ title, leftbutton, rightbutton }) {
  let history = useHistory();
  const { t } = useTranslation(["HomePage"]);

  return (
    <div className="Ready">
      <h1>{title}</h1>
      <div>
        <button
          onClick={() => {
            // alert(t("askmore.text"));
            history.push("/contact");
          }}
        >
          {leftbutton}
        </button>
        <button
          onClick={() => {
            // alert(t("askmore.text"));
            history.push("/contact");
          }}
        >
          {rightbutton}
          <p className="alertRedirect">{t("Modal:BadVersion.alert")}</p>
        </button>
      </div>
    </div>
  );
}

export default Ready;
