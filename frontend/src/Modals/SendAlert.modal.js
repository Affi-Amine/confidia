import React from "react";
import "../sass/Modals/SendAlert.scss";
import "../sass/Components/Form.scss";
import useModalStore from "../Store/useModalStore";
import { useTranslation } from "react-i18next";

const mockProjects = [
  {
    id: 1,
    name: "Project 1",
    description: "Description 1",
  },
  {
    id: 2,
    name: "Project 2",
    description: "Description 2",
  },
  {
    id: 3,
    name: "Project 3",
    description: "Description 3",
  },
]

function SendAlert() {
  const { seeSendAlert, setSeeSendAlert, prefillAlert } = useModalStore();
  const { t } = useTranslation(["Modal"]);
  if (!seeSendAlert) return null;
  return (
    <div className={seeSendAlert ? "boxSendAlert" : "None"}>
      <div className="SendAlert">
        <p>{t("SendAlert.title")}</p>
        <form className="Form">
          <label htmlFor="project">{t("SendAlert.project")}:</label>
          <select id="project" name="project" defaultValue={prefillAlert.projectId ?? mockProjects[0].id}>
            {mockProjects.map((project) => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
          <label htmlFor="title">{t("SendAlert.notifTitle")}:</label>
          <input type="text" id="title" name="title" defaultValue={prefillAlert.title ?? ""} />
          <label htmlFor="message">{t("SendAlert.message")}:</label>
          <textarea id="message" name="message" defaultValue={prefillAlert.message ?? ""} />
          <label htmlFor="context">{t("SendAlert.context")}:</label>
          <textarea id="context" name="context" defaultValue={prefillAlert.context ?? ""} />
        </form>
      </div>
      <div className="boxButtons">
        <button onClick={() => setSeeSendAlert(false)}>{t("SendAlert.buttons.close")}</button>
        <button>{t("SendAlert.buttons.send")}</button>
      </div>
    </div>
  );
}
export default SendAlert;
