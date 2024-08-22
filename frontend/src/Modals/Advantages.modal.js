import { useMsal } from "@azure/msal-react";
import { send } from "@emailjs/browser";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useUserProfile from "../Store/useUserProfile";
import { openInNewTab } from "../Utils/OpenInNewTab";
import "../sass/Modals/AdvantagesModal.scss";
import useStapeDisplayGoogleForm from "./hooks/stapeDisplayGoogleForm.hook";

export default function AdvantagesModal({
  setSeeAdvantageModal,
  sendValidType,
  userSubScribe,
  setUserSubScribe,
}) {
  const { t, i18n } = useTranslation(["Advantages"]);
  const { accounts } = useMsal();
  const { userData } = useUserProfile();
  const stapeDisplayGoogleForm = useStapeDisplayGoogleForm();
  const accountData = accounts[0]?.idTokenClaims || userData[0]?.idTokenClaims;

  const getInitialCheckboxes = (type) => {
    switch (type) {
      case "email_newsletter":
        return [
          { label: t("newsletters.check.1"), checked: false },
          { label: t("newsletters.check.2"), checked: false },
        ];
      case "link_linkdin":
        return [
          { label: t("blog.check.1"), checked: false },
          { label: t("blog.check.2"), checked: false },
          { label: t("blog.check.3"), checked: false },
        ];
      case "email_freebies":
        return [
          { label: t("freebies.check.1"), checked: false },
          { label: t("freebies.check.2"), checked: false },
          { label: t("freebies.check.3"), checked: false },
          { label: t("freebies.check.4"), checked: false },
          { label: t("freebies.check.5"), checked: false },
        ];
      case "email_whiteBook":
        return [
          { label: t("whiteBook.check.1"), checked: false },
          { label: t("whiteBook.check.2"), checked: false },
        ];
      default:
        return [];
    }
  };

  const [checkboxes, setCheckboxes] = useState(
    getInitialCheckboxes(sendValidType)
  );

  useEffect(() => {
    setCheckboxes(getInitialCheckboxes(sendValidType));
  }, [sendValidType, t]);

  useEffect(() => {
    setCheckboxes(getInitialCheckboxes(sendValidType));
  }, [i18n.language]);

  function handleCheckboxChange(index) {
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox, i) =>
        i === index ? { ...checkbox, checked: !checkbox.checked } : checkbox
      )
    );
  }

  let title;
  let avantageDesc;
  let btn_text;

  switch (sendValidType) {
    case "email_newsletter":
      title = t("newsletters.T");
      avantageDesc = [
        t("newsletters.L-1.1"),
        t("newsletters.L-2.1"),
        t("newsletters.L-3.1"),
      ];
      btn_text = t("newsletters.btn");
      break;
    case "link_linkdin":
      title = t("blog.T");
      avantageDesc = [
        t("blog.L-1.1"),
        t("blog.L-2.1"),
        t("blog.L-3.1"),
        t("blog.L-4.1"),
      ];
      btn_text = t("blog.btn");
      break;
    case "email_freebies":
      title = t("freebies.T");
      avantageDesc = [
        t("freebies.L-1.1"),
        t("freebies.L-2.1"),
        t("freebies.L-3.1"),
        t("freebies.L-4.1"),
        t("freebies.L-5.1"),
      ];
      btn_text = t("freebies.btn");
      break;
    case "email_whiteBook":
      title = t("whiteBook.T");
      avantageDesc = [
        t("whiteBook.L-1.1"),
        t("whiteBook.L-2.1"),
        t("whiteBook.L-3.1"),
        t("whiteBook.L-4.1"),
      ];
      btn_text = t("whiteBook.btn");
      break;
    default:
      title = "Default Title";
      avantageDesc = [];
      btn_text = "Submit";
      break;
  }

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const date = `${day}/${month}/${year}`;

  const templateParams = {
    user_email: accountData.emails[0],
    add_dateJSON: date,
    modal_name: sendValidType,
    result_checkbox: checkboxes
      .map(
        (checkbox) =>
          `${checkbox.label}: ${checkbox.checked ? "s'inscrire" : "refusé"}`
      )
      .join("   |  "),
  };

  function ValidAdvantage() {
    if (sendValidType === "link_linkdin") {
      SendMailAdvantage();
      openInNewTab("https://www.linkedin.com/company/dsfords/");
    }
    if (["email_freebies", "email_whiteBook"].includes(sendValidType)) {
      if (checkboxes.some((checkbox) => checkbox.checked)) {
        SendMailAdvantage();
      }
    }
    if (sendValidType === "email_newsletter") {
      if (checkboxes.some((checkbox) => checkbox.checked)) {
        SendMailNewsletter();
      }
    }
  }

  function ResponseSenMailValid() {
    setUserSubScribe(true);
    setTimeout(() => {
      CloseThisModal();
    }, 5000);
  }

  function SendMailNewsletter() {
    ResponseSenMailValid();

    send(
      "service_tu410bg",
      "template_u6xboi5",
      templateParams,
      "9bNQfzah9Y9kXqVIf"
    ).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        ResponseSenMailValid();
      },
      (error) => {
        console.log("FAILED...", error);
      }
    );
  }

  function SendMailAdvantage() {
    send(
      "service_og1kb8f",
      "template_i2wm32m",
      templateParams,
      "7lUTTV4AxezWgWpWK"
    ).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        ResponseSenMailValid();
      },
      (error) => {
        console.log("FAILED...", error);
      }
    );
  }

  function CloseThisModal() {
    stapeDisplayGoogleForm("formTopicIdeas");
    setSeeAdvantageModal(false);
  }

  return (
    <div className="AdvantagesModal">
      <button
        className="close"
        onClick={() => {
          CloseThisModal();
        }}
      >
        X
      </button>
      <h2>{title}</h2>
      <br />
      <div className="BoxText">
        {avantageDesc.length > 0 &&
          avantageDesc.map((text, i) => <p key={i}>{text}</p>)}
      </div>

      <div className="allCheckbox">
        {checkboxes.length > 0 &&
          checkboxes.map((item, index) => (
            <div key={index}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheckboxChange(index)}
              />
              <label>{item.label}</label>
            </div>
          ))}
      </div>
      {!userSubScribe ? (
        <button className="btn-Valid" onClick={ValidAdvantage}>
          {btn_text}
        </button>
      ) : (
        <div className="boxMessages">
          {sendValidType === "email_newsletter" && userSubScribe && (
            <p>{t("checkMessage.1")}</p>
          )}
        </div>
      )}
    </div>
  );
}
