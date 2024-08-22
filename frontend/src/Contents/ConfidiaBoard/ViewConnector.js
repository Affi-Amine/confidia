import "../../sass/Components/Table.scss";
import "../../sass/Components/Form.scss";
import { useTranslation } from "react-i18next";

const mockConnector = {
  id: 1,
  name: "Connector 1",
  type: "GitHub",
  entities: 1564,
  projectsUsing: "Project 1, Project 2",
  adminEmail: "alice@mail.com",
  users: [
    {
      id: 1,
      name: "Alice",
      email: "alice@mail.com",
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@example.com",
    },
  ],
  repos: {
    owner: "A",
    forked: "N",
    private: "Y",
  },
  repoUser: "Alan",
  repoName: "Repo 1",
};

export default function ViewConnector() {
  const { t } = useTranslation(["ConfidiaBoard"]);
  return (
    <>
      <div className="MainContentHeader">
        <h3>{t("Connectors.viewConnector")}</h3>
      </div>
      <div className="Form">
        <label>{t("Connectors.connectorId")}:</label>
        <input type="text" value={mockConnector.id} disabled />
        <label>{t("Connectors.connectorName")}:</label>
        <input type="text" value={mockConnector.name} disabled />
        <label>{t("Connectors.connectorType")}:</label>
        <input type="text" value={mockConnector.type} disabled />
        <label>{t("Connectors.table.entities")}:</label>
        <input type="text" value={mockConnector.entities} disabled />
        <label>{t("Connectors.table.projectUsing")}:</label>
        <input type="text" value={mockConnector.projectsUsing} disabled />
        <label>{t("Connectors.adminId")}:</label>
        <input type="text" value={mockConnector.adminEmail} disabled />
        <label>{t("Connectors.users")}:</label>
        <div className="TableContainer">
          <table className="StyledTable">
            <thead>
              <tr>
                <th>{t("Connectors.GitHub.userId")}</th>
                <th>{t("Connectors.GitHub.name")}</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {mockConnector.users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <label>{t("Connectors.repo")}:</label>
        <div className="TableContainer">
          <table className="StyledTable">
            <thead>
              <tr>
                <th></th>
                <th>{t("Connectors.GitHub.table.owner")}</th>
                <th>{t("Connectors.GitHub.table.forked")}</th>
                <th>{t("Connectors.GitHub.table.private")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{t("Connectors.GitHub.table.all")}</td>
                <td>
                  <input
                    name="owner"
                    type="radio"
                    checked={mockConnector.repos.owner === "A" ? true : false}
                    disabled
                  />
                </td>
                <td>
                  <input
                    name="forked"
                    type="radio"
                    checked={mockConnector.repos.forked === "A" ? true : false}
                    disabled
                  />
                </td>
                <td>
                  <input
                    name="private"
                    type="radio"
                    checked={mockConnector.repos.private === "A" ? true : false}
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <td>{t("Connectors.GitHub.table.yes")}</td>
                <td>
                  <input
                    name="owner"
                    type="radio"
                    checked={mockConnector.repos.owner === "Y" ? true : false}
                    disabled
                  />
                </td>
                <td>
                  <input
                    name="forked"
                    type="radio"
                    checked={mockConnector.repos.forked === "Y" ? true : false}
                    disabled
                  />
                </td>
                <td>
                  <input
                    name="private"
                    type="radio"
                    checked={mockConnector.repos.private === "Y" ? true : false}
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <td>{t("Connectors.GitHub.table.no")}</td>
                <td>
                  <input
                    name="owner"
                    type="radio"
                    checked={mockConnector.repos.owner === "N" ? true : false}
                    disabled
                  />
                </td>
                <td>
                  <input
                    name="forked"
                    type="radio"
                    checked={mockConnector.repos.forked === "N" ? true : false}
                    disabled
                  />
                </td>
                <td>
                  <input
                    name="private"
                    type="radio"
                    checked={mockConnector.repos.private === "N" ? true : false}
                    disabled
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <label>{t("Connectors.GitHub.repoUser")}:</label>
        <input type="text" value={mockConnector.repoUser} disabled />
        <label>{t("Connectors.GitHub.repoName")}:</label>
        <input type="text" value={mockConnector.repoName} disabled />
      </div>
    </>
  );
}
