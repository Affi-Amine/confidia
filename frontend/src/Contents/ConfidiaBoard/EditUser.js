import { useState } from "react";
import "../../sass/Components/Form.scss";
import "../../sass/Components/Table.scss";
import { useTranslation } from "react-i18next";

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
};

export default function EditUser() {
  const [data, setData] = useState(mockUserData);
  const { t } = useTranslation(["ConfidiaBoard"]);
  function handleRoleChange(projectId, newRole) {
    setData(prevData => {
      const updatedProjects = prevData.projects.map(project => {
        if (project.id === projectId) {
          return { ...project, role: newRole };
        }
        return project;
      });
      return { ...prevData, projects: updatedProjects };
    });
  }
  return (
    <>
      <div className="MainContentHeader">
        <h3>{t("Users.editUser")}</h3>
      </div>
      <div className="Form">
        <label>{t("Users.table.userId")}:</label>
        <input type="text" value={data.id} disabled/>
        <label>Email:</label>
        <input type="text" value={data.email} disabled/>
        <label>{t("Users.userName")}:</label>
        <input type="text" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value})} />
        <div className="TableContainer">
          <table className="StyledTable">
            <thead>
              <tr>
                <th>{t("Users.table.projectId")}</th>
                <th>{t("Users.table.name")}</th>
                <th>{t("Users.table.role")}</th>
              </tr>
            </thead>
            <tbody>
              {data.projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.id}</td>
                  <td>{project.name}</td>
                  <td>
                    <select onChange={(e) => handleRoleChange(project.id, e.target.value)} defaultValue={project.role}>
                      <option
                        value="admin"
                      >
                        {t("Users.table.admin")}
                      </option>
                      <option
                        value="viewer"
                      >
                        {t("Users.table.viewer")}
                      </option>
                      <option
                        value="contributor"
                      >
                        {t("Users.table.contributor")}
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <input type="submit" value={t("Users.submit")} onClick={() => console.log(data)} />
      </div>
    </>
  );
}
