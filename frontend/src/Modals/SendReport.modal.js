import React from "react";
import "../sass/Modals/SendReport.scss";
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

function SendReport() {
  const { seeSendReport, setSeeSendReport, prefillReport } = useModalStore();
  const { t } = useTranslation(["Modal"]);
  if (!seeSendReport) return null;
  return (
    <div className={seeSendReport ? "boxSendReport" : "None"}>
      <div className="SendReport">
        <p>{t("SendReport.title")}</p>
        <form className="Form">
          <label htmlFor="project">{t("SendReport.project")}:</label>
          <select id="project" name="project" defaultValue={prefillReport.projectId ?? mockProjects[0].id}>
            {mockProjects.map((project) => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
          <label htmlFor="title">{t("SendReport.notifTitle")}:</label>
          <input type="text" id="title" name="title" defaultValue={prefillReport.title ?? ""} />
          <label htmlFor="message">{t("SendReport.notifMessage")}:</label>
          <textarea id="message" name="message" defaultValue={prefillReport.message ?? ""} />
          <label htmlFor="context">{t("SendReport.notifContext")}:</label>
          <textarea id="context" name="context" defaultValue={prefillReport.context ?? ""} />
        </form>
      </div>
      <div className="boxButtons">
        <button onClick={() => setSeeSendReport(false)}>{t("SendReport.buttons.close")}</button>
        <button>{t("SendReport.buttons.reportConfidia")}</button>
        <button>{t("SendReport.buttons.reportBoth")}</button>
      </div>
    </div>
  );
}
export default SendReport;
