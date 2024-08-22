import { useState } from "react";
import "../../sass/Components/Form.scss";
import "../../sass/Components/Table.scss";
import { useTranslation } from "react-i18next";

const mockProject = {
  name: "Project 1",
  description: "This is project 1",
  users: [
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
  ],
  connectors: [
    {
      id: 1,
      name: "Connector 1",
      type: "GitHub",
    },
  ],
};

export default function ViewUser() {
  const [data, setData] = useState(mockProject);
  const { t } = useTranslation(["ConfidiaBoard"]);
  return (
    <>
      <div className="MainContentHeader">
        <h3>{t("Projects.viewProject")}</h3>
      </div>
      <div className="Form">
        <label>{t("Projects.projectId")}:</label>
        <input type="text" disabled value={data.id} />
        <label>{t("Projects.projectName")}:</label>
        <input type="text" disabled value={data.name} />
        <label>{t("Projects.projectDescription")}:</label>
        <textarea type="text" disabled value={data.description} />
        <div className="TableContainer">
          <table className="StyledTable">
            <thead>
              <tr>
                <th>{t("Projects.table.userId")}</th>
                <th>{t("Projects.table.userName")}</th>
                <th>Email</th>
                <th>{t("Projects.table.role")}</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <select defaultValue={user.role} disabled>
                      <option value="admin">{t("Projects.table.admin")}</option>
                      <option value="viewer">{t("Projects.table.viewer")}</option>
                      <option value="contributor">{t("Projects.table.contributor")}</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <label>{t("Projects.selectedConnector")}:</label>
        <select
          defaultValue={data.connectors[0].id}
          disabled
        >
            <option value={data.connectors[0].id}>
              {data.connectors[0].name}
            </option>
        </select>
      </div>
    </>
  );
}
