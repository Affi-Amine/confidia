import { useState } from "react";
import "../../sass/Components/Form.scss";
import "../../sass/Contents/ConfidiaBoard/Tabs.scss";
import useModalStore from "../../Store/useModalStore";
import { useTranslation } from "react-i18next";

const mockProjectNames = [
  "Project 1",
  "Project 2",
  "Project 3",
]

function Activity() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedProject, setSelectedProject] = useState(mockProjectNames[0])
  const { t } = useTranslation(["Modal"]);
  return (
    <>
      <div className="Form">
        <label>{t("SendActivity.project")}:</label>
        <select
          value={selectedProject} 
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          {mockProjectNames.map((project) => (
            <option value={project} key={project}>
              {project}
            </option>
          ))}
        </select>
        <label>{t("SendActivity.notifTitle")}:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>{t("SendActivity.message")}:</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input type="submit" value={t("SendActivity.buttons.send")} />
      </div>
    </>
  );
}

function Message() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const { t } = useTranslation(["Modal"]);
  return (
    <>
      <div className="Form">
        <label>Email :</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>{t("SendMessage.notifTitle")}:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>{t("SendMessage.message")}:</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input type="submit" value={t("SendMessage.buttons.send")} />
      </div>
    </>
  );
}

function Alert() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [context, setContext] = useState("");
  const [selectedProject, setSelectedProject] = useState(mockProjectNames[0])
  const { setSeeSendAlert } = useModalStore();
  const { t } = useTranslation(["Modal"]);
  return (
    <>
      <div className="Form">
        <label>{t("SendAlert.project")}:</label>
        <select
          value={selectedProject} 
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          {mockProjectNames.map((project) => (
            <option value={project} key={project}>
              {project}
            </option>
          ))}
        </select>
        <label>{t("SendAlert.notifTitle")}:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>{t("SendAlert.message")}:</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <label>{t("SendAlert.context")}:</label>
        <input
          type="text"
          value={context}
          onChange={(e) => setContext(e.target.value)}
        />
        <input type="submit" value={t("SendAlert.buttons.send")} />
        <button onClick={() => setSeeSendAlert(true)}>Test Send Alert Modal</button>
      </div>
    </>
  );
}

function Report() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [context, setContext] = useState("");
  const [selectedProject, setSelectedProject] = useState(mockProjectNames[0])
  const { setSeeSendReport } = useModalStore();
  const { t } = useTranslation(["Modal"]);
  return (
    <>
      <div className="Form">
        <label>{t("SendReport.project")}:</label>
        <select
          value={selectedProject} 
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          {mockProjectNames.map((project) => (
            <option value={project} key={project}>
              {project}
            </option>
          ))}
        </select>
        <label>{t("SendReport.notifTitle")}:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>{t("SendReport.notifMessage")}:</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <label>{t("SendReport.notifContext")}:</label>
        <input
          type="text"
          value={context}
          onChange={(e) => setContext(e.target.value)}
        />
        <input type="submit" value={t("SendReport.buttons.reportBoth")} />
        <input type="submit" value={t("SendReport.buttons.reportConfidia")} />
        <button onClick={() => setSeeSendReport(true)}>Test Send Alert Modal</button>
      </div>
    </>
  );
}

export default function AddNotification() {
  const [notificationType, setNotificationType] = useState("activity");
  return (
    <>
      <div className="MainContentHeader">
        <h3>Add Notification</h3>
      </div>
      <div className="Form">
        <label>Select notification type:</label>
        <div className="TabSelect">
          <div className="Tabs">
            <button
              className={notificationType === "activity" ? "active" : ""}
              onClick={() => setNotificationType("activity")}
            >
              Activity
            </button>
            <button
              className={notificationType === "message" ? "active" : ""}
              onClick={() => setNotificationType("message")}
            >
              Message
            </button>
            <button
              className={notificationType === "alert" ? "active" : ""}
              onClick={() => setNotificationType("alert")}
            >
              Alert
            </button>
            <button
              className={notificationType === "report" ? "active" : ""}
              onClick={() => setNotificationType("report")}
            >
              Report
            </button>
          </div>
          <div className="ActiveTab">
            {notificationType === "activity" && <Activity />}
            {notificationType === "message" && <Message />}
            {notificationType === "alert" && <Alert />}
            {notificationType === "report" && <Report />}
          </div>
        </div>
      </div>
    </>
  );
}
