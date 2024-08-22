import { useState } from "react";
import "../../sass/Components/Form.scss";
import "../../sass/Contents/ConfidiaBoard/Tabs.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const ActionButton = (props) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation(["ConfidiaBoard"]);
  const { id, transferUser } = props;
  return (
    <div className="ActionButton">
      <span onClick={() => setOpen(!open)}>...</span>
      {open && (
        <div className="DropDown">
          <button onClick={() => transferUser(id)}>{t("ActionButton.delete")}</button>
        </div>
      )}
    </div>
  );
};

const mockUsers = [
  {
    id: 2,
    name: "Jane Doe",
    email: "jane.doe@example.com",
  },
  {
    id: 3,
    name: "Bob Smith",
    email: "bob.smith@example.com",
  },
  {
    id: 4,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
  },
];

const GitHubTab = () => {
  const [connectorName, setConnectorName] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState(mockUsers[0].email);
  const [repoUser, setRepoUser] = useState("");
  const [repoName, setRepoName] = useState("");

  const [usersInProject, setUsersInProject] = useState(mockUsers);
  const [usersNotInProject, setUsersNotInProject] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

  const { t } = useTranslation(["ConfidiaBoard"]);

  const transferUser = (id) => {
    const userNot = usersNotInProject.find((user) => user.id == id);
    const userIn = usersInProject.find((user) => user.id == id);
    if (userNot) {
      setUsersInProject([...usersInProject, userNot]);
      const filtered = usersNotInProject.filter((user) => user.id != id);
      setUsersNotInProject(filtered);
      if (usersNotInProject.length === 1) {
        setSelectedUser();
      } else {
        setSelectedUser(filtered[0].id);
      }
    }
    if (userIn) {
      setUsersNotInProject([...usersNotInProject, userIn]);
      setUsersInProject(usersInProject.filter((user) => user.id != id));
      setSelectedUser(userIn.id);
    }
  };
  return (
    <div className="Form">
      <label>{t("Connectors.GitHub.name")}:</label>
      <input
        type="text"
        value={connectorName}
        onChange={(e) => setConnectorName(e.target.value)}
      />
      <label>{t("Connectors.GitHub.user")}:</label>
      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <label>{t("Connectors.GitHub.password")}:</label>
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label>{t("Connectors.GitHub.token")}:</label>
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <label>{t("Connectors.GitHub.connectorAdmin")}:</label>
      <select
        value={selectedAdmin}
        onChange={(e) => setSelectedAdmin(e.target.value)}
      >
        {mockUsers.map((user) => (
          <option value={user.email} key={user.email}>
            {user.email}
          </option>
        ))}
      </select>
      <label>{t("Connectors.GitHub.connectorUsers")}:</label>
      <div className="TableContainer">
        <table className="StyledTable">
          <thead>
            <tr>
              <th>{t("Connectors.GitHub.userId")}</th>
              <th>{t("Connectors.GitHub.name")}</th>
              <th>Email</th>
              <th className="TableHeadEnd"></th>
            </tr>
          </thead>
          <tbody>
            {usersInProject.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="TableRowEnd">
                  <ActionButton id={user.id} transferUser={transferUser} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <label>{t("Connectors.GitHub.selectUserToAdd")}:</label>
      <div>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          {usersNotInProject.map((user) => (
            <option value={user.id} key={user.id}>
              {user.email}
            </option>
          ))}
        </select>
        <button
          className="FormButton"
          onClick={() => selectedUser && transferUser(selectedUser)}
        >
          <FontAwesomeIcon className="icon" icon="fa-solid fa-plus" /> Add User
        </button>
      </div>
      <label>{t("Connectors.GitHub.reposToInclude")}:</label>
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
                <input name="owner" type="radio" />
              </td>
              <td>
                <input name="forked" type="radio" />
              </td>
              <td>
                <input name="private" type="radio" />
              </td>
            </tr>
            <tr>
              <td>{t("Connectors.GitHub.table.yes")}</td>
              <td>
                <input name="owner" type="radio" />
              </td>
              <td>
                <input name="forked" type="radio" />
              </td>
              <td>
                <input name="private" type="radio" />
              </td>
            </tr>
            <tr>
              <td>{t("Connectors.GitHub.table.no")}</td>
              <td>
                <input name="owner" type="radio" />
              </td>
              <td>
                <input name="forked" type="radio" />
              </td>
              <td>
                <input name="private" type="radio" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <label>{t("Connectors.GitHub.repoUser")}:</label>
      <input
        type="text"
        value={repoUser}
        onChange={(e) => setRepoUser(e.target.value)}
      />
      <label>{t("Connectors.GitHub.repoName")}:</label>
      <input
        type="text"
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
      />
      <input type="submit" value={t("Connectors.GitHub.submit")} />
    </div>
  );
};

export default function AddConnector() {
  const [connectorType, setConnectorType] = useState("GitHub");
  const { t } = useTranslation(["ConfidiaBoard"]);
  return (
    <>
      <div className="MainContentHeader">
        <h3>{t("Connectors.addConnector")}</h3>
      </div>
      <div className="Form">
        <label>{t("Connectors.selectConnectorType")}:</label>
        <div className="TabSelect">
          <div className="Tabs">
            <button
              className={connectorType === "GitHub" ? "active" : ""}
              onClick={() => setConnectorType("GitHub")}
            >
              GitHub
            </button>
            <button
              className={connectorType === "GitLab" ? "active" : ""}
              onClick={() => setConnectorType("GitLab")}
            >
              GitLab
            </button>
            <button
              className={connectorType === "Local" ? "active" : ""}
              onClick={() => setConnectorType("Local")}
            >
              Local
            </button>
          </div>
          <div className="ActiveTab">
            {connectorType === "GitHub" && <GitHubTab />}
          </div>
        </div>
      </div>
    </>
  );
}
