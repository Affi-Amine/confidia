import { useMsal } from "@azure/msal-react";
import { send } from "@emailjs/browser";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useUserProfile from "../../Store/useUserProfile";
import { openInNewTab } from "../../Utils/OpenInNewTab";
import "../../sass/Contents/Advantages/Description.scss";

const getInitialCheckboxes = (type, t) => {
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

export default function Description({
  sendValidType,
  userSubScribe,
  setUserSubScribe,
}) {
  const { t, i18n } = useTranslation(["Advantages"]);
  const { accounts } = useMsal();
  const { userData } = useUserProfile();
  const accountData = accounts[0]?.idTokenClaims || userData[0]?.idTokenClaims;

  const [title, setTitle] = useState("");
  const [avantageDesc, setAvantageDesc] = useState([]);
  const [btnText, setBtnText] = useState("");
  const [checkboxes, setCheckboxes] = useState(
    getInitialCheckboxes(sendValidType, t)
  );

  useEffect(() => {
    setCheckboxes(getInitialCheckboxes(sendValidType, t));
  }, [sendValidType, t, i18n.language]);

  useEffect(() => {
    switch (sendValidType) {
      case "email_newsletter":
        setTitle(t("newsletters.T"));
        setAvantageDesc([
          t("newsletters.L-1.1"),
          t("newsletters.L-2.1"),
          t("newsletters.L-3.1"),
        ]);
        setBtnText(t("newsletters.btn"));
        break;
      case "link_linkdin":
        setTitle(t("blog.T"));
        setAvantageDesc([
          t("blog.L-1.1"),
          t("blog.L-2.1"),
          t("blog.L-3.1"),
          t("blog.L-4.1"),
        ]);
        setBtnText(t("blog.btn"));
        break;
      case "email_freebies":
        setTitle(t("freebies.T"));
        setAvantageDesc([
          t("freebies.L-1.1"),
          t("freebies.L-2.1"),
          t("freebies.L-3.1"),
          t("freebies.L-4.1"),
          t("freebies.L-5.1"),
        ]);
        setBtnText(t("freebies.btn"));
        break;
      case "email_whiteBook":
        setTitle(t("whiteBook.T"));
        setAvantageDesc([
          t("whiteBook.L-1.1"),
          t("whiteBook.L-2.1"),
          t("whiteBook.L-3.1"),
          t("whiteBook.L-4.1"),
        ]);
        setBtnText(t("whiteBook.btn"));
        break;
      default:
        setTitle("Default Title");
        setAvantageDesc([]);
        setBtnText("Submit");
        break;
    }
  }, [sendValidType, t, i18n.language]);

  function handleCheckboxChange(index) {
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox, i) =>
        i === index ? { ...checkbox, checked: !checkbox.checked } : checkbox
      )
    );
  }

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const date = `${day}/${month}/${year}`;
  const templateParams = {
    user_email: accountData?.emails[0],
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
  }
  function SendMailNewsletter() {
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

  return (
    <div className="Description">
      <div className="BoxText">
        {avantageDesc.length > 0 &&
          avantageDesc.map((text, i) => <p key={i}>{text}</p>)}
      </div>
      <section>
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
          <div className="BoxButtons">
            <button className="btn-Valid" onClick={ValidAdvantage}>
              {btnText}
            </button>
          </div>
        ) : (
          <div className="boxMessages">
            {sendValidType === "email_newsletter" && userSubScribe && (
              <p>{t("checkMessage.1")}</p>
            )}
            {(sendValidType === "email_freebies" ||
              (sendValidType === "email_whiteBook" && userSubScribe)) && (
              <p>{t("checkMessage.2")}</p>
            )}
            {sendValidType === "link_linkdin" && userSubScribe && (
              <p>{t("checkMessage.3")}</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
