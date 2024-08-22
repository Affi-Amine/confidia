import { useTranslation } from "react-i18next";
import "../../sass/Components/Form.scss";
import "../../sass/Components/Table.scss";

const mockUserData = {
    id: 5,
    email: "pero@pero.com",
    name: "Pedro",
    projects: [
        {
            name: "Project 1",
            id: 1,
            role: "contributor",
        },
        {
            name: "Project 2",
            id: 2,
            role: "admin",
        },
        {
            name: "Project 3",
            id: 3,
            role: "viewer",
        },
    ],
}

export default function ViewUser() {
  const { t } = useTranslation(["ConfidiaBoard"]);
  return (
    <>
      <div className="MainContentHeader">
        <h3>{t("Users.viewUser")}</h3>
      </div>
      <div className="Form">
      <label>{t("Users.userId")}:</label>
        <input
          type="text"
          disabled
          value={mockUserData.id}
        />
      <label>Email:</label>
        <input
          type="text"
          disabled
          value={mockUserData.email}
        />
        <label>{t("Users.userName")}:</label>
        <input
          type="text"
          disabled
          value={mockUserData.name}
        />
        <div className="TableContainer">
          <table className="StyledTable">
            <thead>
              <tr>
                <th>{t("Users.table.projectId")}</th>
                <th>{t("Users.table.name")}</th>
                <th>{t("Users.role.role")}</th>
              </tr>
            </thead>
            <tbody>
              {mockUserData.projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.id}</td>
                  <td>{project.name}</td>
                  <td>
                    <select disabled>
                      <option value="admin" selected={project.role === "admin" ? true : false} >{t("Users.table.admin")}</option>
                      <option value="viewer" selected={project.role === "viewer" ? true : false}>{t("Users.table.viewer")}</option>
                      <option value="contributor" selected={project.role === "contributor" ? true : false}>{t("Users.table.contributor")}</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
