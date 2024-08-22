import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import "../../sass/Contents/ConfidiaBoard/BoardLayout.scss";
import "../../sass/Components/Table.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const mockNotifications = [
  {
    author: "Author 1",
    type: "Alert",
    title: "Title 1",
    message: "This is a message from Author 1",
  },
  {
    author: "Author 2",
    type: "Alert",
    title: "Title 2",
    message: "This is a message from Author 2",
  },
  {
    author: "Author 3",
    title: "Title 3",
    type: "Message",
    message: "This is a message from Author 3",
  },
  {
    author: "Author 4",
    title: "Title 4",
    type: "Message",
    message: "This is a message from Author 4",
  },
];

const ActionButton = (props) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation(["ConfidiaBoard"]);
  return (
    <div className="ActionButton">
      <span onClick={() => setOpen(!open)}>...</span>
      {open && (
        <div className="DropDown">
          <button>{t("ActionButton.delete")}</button>
        </div>
      )}
    </div>
  );
};

const Notifications = () => {
  const history = useHistory();
  const { t } = useTranslation(["ConfidiaBoard"]);

  return (
    <>
      <div className="MainContentHeader">
        <h4>{t("Notifications.notifications")}</h4>
        <button
          className="NewProject"
          onClick={() => history.push("/confidia-board/notifications/new")}
        >
          <FontAwesomeIcon className="icon" icon="fa-solid fa-plus" />
          {t("Notifications.newNotification")}
        </button>
      </div>
      <div className="TableContainer">
        <table className="StyledTable">
          <thead>
            <tr>
              <th>{t("Notifications.table.author")}</th>
              <th>{t("Notifications.table.type")}</th>
              <th>{t("Notifications.table.title")}</th>
              <th>{t("Notifications.table.message")}</th>
              <th className="TableHeadEnd"></th>
            </tr>
          </thead>
          <tbody>
            {mockNotifications.map((notification, index) => (
              <tr key={index}>
                <td>{notification.author}</td>
                <td>{notification.type}</td>
                <td>{notification.title}</td>
                <td>{notification.message}</td>
                <td className="TableRowEnd">
                  <ActionButton />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Notifications;
