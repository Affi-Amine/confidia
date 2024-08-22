import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../sass/Components/Form.scss";
import "../../sass/Components/Table.scss";
import { useTranslation } from "react-i18next";

const mockEmptyProject = {
  name: "Project 1",
  description: "This is project 1",
  users: [],
  availableUsers: [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      role: "admin",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "janedoe@hello.com",
      role: "viewer",
    },
    {
      id: 3,
      name: "Bob Smith",
      email: "bobsmith@hi.com",
      role: "contributor",
    },
    {
      id: 4,
      name: "Alice Johnson",
      email: "hi@il.com",
    },
    {
      id: 5,
      name: "Alice Johnson",
      email: "aa@aa.com",
    },
  ],
  connector: null,
  availableConnectors: [
    {
      id: 1,
      name: "Connector 1",
      type: "GitHub",
    },
    {
      id: 2,
      name: "Connector 2",
      type: "Jira",
    },
    {
      id: 3,
      name: "Connector 3",
      type: "Slack",
    },
  ],
};

const ActionButton = (props) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation(["ConfidiaBoard"]);
  const { data, setData, setSelectedUser, id } = props;
  const handleOnClick = (id) => {
    const user = data.users.find((user) => user.id === id);
    setData({
      ...data,
      users: data.users.filter((user) => user.id !== id),
      availableUsers: [
        ...data.availableUsers,
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      ],
    });
    setSelectedUser(user.id);
  };
  return (
    <div className="ActionButton">
      <span onClick={() => setOpen(!open)}>...</span>
      {open && (
        <div className="DropDown">
          <button onClick={() => handleOnClick(id)}>
            {t("ActionButton.remove")}
          </button>
        </div>
      )}
    </div>
  );
};

export default function NewProject() {
  const [data, setData] = useState(mockEmptyProject);
  const { t } = useTranslation(["ConfidiaBoard"]);
  const [selectedUser, setSelectedUser] = useState(
    mockEmptyProject.availableUsers[0].id
  );
  const handleAddUser = (id) => {
    console.log(id);
    if (!id || id === "-1") return;
    const user = data.availableUsers.find((user) => user.id === parseInt(id));
    const availableUsers = data.availableUsers.filter(
      (user) => user.id !== parseInt(id)
    );
    setData({
      ...data,
      users: [...data.users, user],
      availableUsers: availableUsers,
    });
    setSelectedUser(availableUsers[0] ? availableUsers[0].id : "-1");
  };
  return (
    <>
      <div className="MainContentHeader">
        <h3>{t("Projects.newProject")}</h3>
      </div>
      <form className="Form" onSubmit={(e) => e.preventDefault()}>
        <label>{t("Projects.projectName")}:</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <label>{t("Projects.projectDescription")}:</label>
        <textarea
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
        <div className="TableContainer">
          <table className="StyledTable">
            <thead>
              <tr>
                <th>{t("Projects.table.userId")}</th>
                <th>{t("Projects.table.userName")}</th>
                <th>Email</th>
                <th>{t("Projects.table.role")}</th>
                <th className="TableHeadEnd"></th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <select>
                      <option value="admin">{t("Projects.table.admin")}</option>
                      <option value="viewer">
                        {t("Projects.table.viewer")}
                      </option>
                      <option value="contributor">
                        {t("Projects.table.contributor")}
                      </option>
                    </select>
                  </td>
                  <td className="TableRowEnd">
                    <ActionButton
                      id={user.id}
                      data={data}
                      setData={setData}
                      setSelectedUser={setSelectedUser}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <label>{t("Projects.selectUserToAdd")}:</label>
        <div>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            {data.availableUsers.map((user) => (
              <option value={user.id} key={user.id}>
                {user.email}
              </option>
            ))}
          </select>
          <button
            className="FormButton"
            onClick={() => selectedUser && handleAddUser(selectedUser)}
          >
            <FontAwesomeIcon className="icon" icon="fa-solid fa-plus" />{" "}
            {t("Projects.addUser")}
          </button>
        </div>
        <label>{t("Projects.selectConnector")}:</label>
        <select
          value={data.availableConnectors[0].id}
          onChange={(e) => {
            const connector = data.availableConnectors.find(
              (connector) => connector.id === parseInt(e.target.value)
            );
            setData({ ...data, connector });
          }}
        >
          {data.availableConnectors.map((connector) => (
            <option value={connector.id} key={connector.id}>
              {connector.id + " - " + connector.type + " - " + connector.name}
            </option>
          ))}
        </select>
        <input
          type="submit"
          value={t("Projects.submit")}
          onClick={() => console.log(data)}
        />
      </form>
    </>
  );
}
