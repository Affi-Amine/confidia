import { useState } from "react";
import "../../sass/Components/Form.scss";
import "../../sass/Contents/ConfidiaBoard/Tabs.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const mockConnector = {
  id: 1,
  name: "Connector 1",
  type: "GitHub",
  entities: 1564,
  projectsUsing: "Project 1, Project 2",
  adminId: 1,
  users: [
    {
      id: 1,
      name: "Alice",
      email: "alice@mail.com",
    },
    {
      id: 90,
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

const ActionButton = (props) => {
  const [open, setOpen] = useState(false);
  const { id, transferUser } = props;
  return (
    <div className="ActionButton">
      <span onClick={() => setOpen(!open)}>...</span>
      {open && (
        <div className="DropDown">
          <button onClick={() => transferUser(id)}>Delete</button>
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
  const [connectorName, setConnectorName] = useState(mockConnector.name);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState(mockConnector.adminEmail);
  const [repoUser, setRepoUser] = useState(mockConnector.repoUser);
  const [repoName, setRepoName] = useState(mockConnector.repoName);

  const [usersInProject, setUsersInProject] = useState(mockConnector.users);
  const [usersNotInProject, setUsersNotInProject] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState(mockUsers[0].id);

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
      <label>Name :</label>
      <input
        type="text"
        value={connectorName}
        onChange={(e) => setConnectorName(e.target.value)}
      />
      <label>User :</label>
      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <label>Password :</label>
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label>Token :</label>
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <label>Connector Users :</label>
      <div className="TableContainer">
        <table className="StyledTable">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
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
      <label>Select user to add to this project :</label>
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
      <label>Connector Admin :</label>
      <select
        value={selectedAdmin}
        onChange={(e) => setSelectedAdmin(e.target.value)}
      >
        {usersInProject.map((user) => (
          <option value={user.email} key={user.email}>
            {user.email}
          </option>
        ))}
      </select>

      <label>Repos to include :</label>
      <div className="TableContainer">
        <table className="StyledTable">
          <thead>
            <tr>
              <th></th>
              <th>Owner</th>
              <th>Forked</th>
              <th>Private</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>All</td>
              <td>
                <input
                  name="owner"
                  type="radio"
                  defaultChecked={
                    mockConnector.repos.owner === "A" ? true : false
                  }
                />
              </td>
              <td>
                <input
                  name="forked"
                  type="radio"
                  defaultChecked={
                    mockConnector.repos.forked === "A" ? true : false
                  }
                />
              </td>
              <td>
                <input
                  name="private"
                  type="radio"
                  defaultChecked={
                    mockConnector.repos.private === "A" ? true : false
                  }
                />
              </td>
            </tr>
            <tr>
              <td>Yes</td>
              <td>
                <input
                  name="owner"
                  type="radio"
                  defaultChecked={
                    mockConnector.repos.owner === "Y" ? true : false
                  }
                />
              </td>
              <td>
                <input
                  name="forked"
                  type="radio"
                  defaultChecked={
                    mockConnector.repos.forked === "Y" ? true : false
                  }
                />
              </td>
              <td>
                <input
                  name="private"
                  type="radio"
                  defaultChecked={
                    mockConnector.repos.private === "Y" ? true : false
                  }
                />
              </td>
            </tr>
            <tr>
              <td>No</td>
              <td>
                <input
                  name="owner"
                  type="radio"
                  defaultChecked={
                    mockConnector.repos.owner === "N" ? true : false
                  }
                />
              </td>
              <td>
                <input
                  name="forked"
                  type="radio"
                  defaultChecked={
                    mockConnector.repos.forked === "N" ? true : false
                  }
                />
              </td>
              <td>
                <input
                  name="private"
                  type="radio"
                  defaultChecked={
                    mockConnector.repos.private === "N" ? true : false
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <label>Repo user :</label>
      <input
        type="text"
        value={repoUser}
        onChange={(e) => setRepoUser(e.target.value)}
      />
      <label>Repo name :</label>
      <input
        type="text"
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
      />
      <input type="submit" value="Submit" />
    </div>
  );
};

export default function EditConnector() {
  const [connectorType] = useState(mockConnector.type);
  return (
    <>
      <div className="MainContentHeader">
        <h3>Edit Connector</h3>
      </div>
      <div className="Form">
        <label>Connector type:</label>
        <div className="ConnectorSelect">
          <div className="Tabs">
            <button>{connectorType}</button>
          </div>
          <div className="ActiveTab">
            {connectorType === "GitHub" && <GitHubTab />}
          </div>
        </div>
      </div>
    </>
  );
}
