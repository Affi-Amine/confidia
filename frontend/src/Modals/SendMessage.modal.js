import React from "react";
import "../sass/Modals/SendMessage.scss";
import "../sass/Components/Form.scss";
import useModalStore from "../Store/useModalStore";
import { useTranslation } from "react-i18next";

function SendMessage() {
  const { seeSendMessage, setSeeSendMessage, prefillMessage } = useModalStore();
  const { t } = useTranslation(["Modal"]);
  if (!seeSendMessage) return null;
  return (
    <div className={seeSendMessage ? "boxSendMessage" : "None"}>
      <div className="SendMessage">
        <p>{t("SendMessage.title")}</p>
        <form className="Form">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" defaultValue={prefillMessage ?? ""} />
          <label htmlFor="message">{t("SendMessage.message")}:</label>
          <textarea id="message" name="message" />
        </form>
      </div>
      <div className="boxButtons">
        <button onClick={() => setSeeSendMessage(false)}>{t("SendMessage.buttons.close")}</button>
        <button>{t("SendMessage.buttons.send")}</button>
      </div>
    </div>
  );
}
export default SendMessage;
