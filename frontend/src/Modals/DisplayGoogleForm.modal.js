import React from "react";
import { useTranslation } from "react-i18next";
import useGlobalParam from "../Store/useGlobalParam";
import useModalStore from "../Store/useModalStore";
import "../sass/Modals/DisplayGoogleForm.scss";

export default function DisplayGoogleForm() {
  const { t } = useTranslation(["Modal"]);
  const {
    seeDisplayGoogleform,
    setSeeDisplayGoogleform,
    nameGoogleForm,
    setNameGoogleForm,
  } = useModalStore();

  const { language } = useGlobalParam();

  // Stockage centralisé des URLs des formulaires
  const forms = {
    formTopicIdeas: {
      fr: "https://forms.office.com/e/vwGykqDn43?origin=lprLink",
      en: "https://forms.office.com/e/vTLmjmqDzM?origin=lprLink",
      it: "https://forms.office.com/e/yHD9HyzzZx?origin=lprLink",
    },
    questionnaireSondage: {
      fr: "https://forms.office.com/pages/responsepage.aspx?id=7zUEgJ3edkaEp39KUeFlluG79CH451xAjeNUFhzcRWhUMElKMjA3SjY5MzlKMUFBQlBMMDM2NVBCNS4u&origin=lprLink",
      en: "https://forms.office.com/pages/responsepage.aspx?id=7zUEgJ3edkaEp39KUeFlluG79CH451xAjeNUFhzcRWhURUI5TTdMR0paVFo5ODNPQ0lTWVRTMVZVUy4u&origin=lprLink",
      it: "https://forms.office.com/pages/responsepage.aspx?id=7zUEgJ3edkaEp39KUeFlluG79CH451xAjeNUFhzcRWhUQkxUSzk2N0RCQllKMElJRDdFMUFQV0xSSi4u&origin=lprLink",
    },
  };

  if (!seeDisplayGoogleform) return null;

  const formUrl = forms[nameGoogleForm]?.[language];

  return (
    <div className="DisplayGoogleForm">
      <button
        className="close"
        onClick={() => {
          setNameGoogleForm("");
          setSeeDisplayGoogleform(false);
        }}
      >
        X
      </button>
      {formUrl && (
        <iframe
          title={t("QuestionnaireM.title")}
          src={formUrl}
          width="800"
          height="600"
          style={{ border: "none" }}
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}
