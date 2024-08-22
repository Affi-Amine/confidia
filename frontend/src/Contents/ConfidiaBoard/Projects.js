import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../sass/Contents/ConfidiaBoard/BoardLayout.scss";
import "../../sass/Components/Table.scss";
import useModalStore from "../../Store/useModalStore";
import { useTranslation } from "react-i18next";

const mockProjects = [
  {
    name: "Project 1",
    language: "English",
    users: 3,
  },
  {
    name: "Project 2",
    language: "Spanish",
    users: 2,
  },
  {
    name: "Project 3",
    language: "French",
    users: 1,
  },
  {
    name: "Project 4",
    language: "German",
    users: 4,
  },
];

const ActionButton = (props) => {
  const history = useHistory();
  const { setSeeDeleteProject } = useModalStore();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation(["ConfidiaBoard"]);
  return (
    <div className="ActionButton">
      <span onClick={() => setOpen(!open)}>...</span>
      {open && (
        <div className="DropDown">
          <button onClick={() => history.push("/confidia-board/projects/view/1")}>{t("ActionButton.view")}</button>
          <button onClick={() => history.push("/confidia-board/projects/edit/1")}>{t("ActionButton.edit")}</button>
          <button onClick={() => {
            setSeeDeleteProject(true)
            setOpen(false)
          }}>{t("ActionButton.delete")}</button>
        </div>
      )}
    </div>
  );
};

export default function Projects(props) {
  let history = useHistory();
  const { t } = useTranslation(["ConfidiaBoard"]);
  return (
    <>
      <div className="MainContentHeader">
        <h4>{t("Projects.projects")}</h4>
        <button
          className="NewProject"
          onClick={() => history.push("/confidia-board/projects/new")}
        >
          <FontAwesomeIcon className="icon" icon="fa-solid fa-plus" />
          {t("Projects.newProject")}
        </button>
      </div>
      <div className="TableContainer">
        <table className="StyledTable">
          <thead>
            <tr>
              <th>{t("Projects.table.project")}</th>
              <th>{t("Projects.table.language")}</th>
              <th>{t("Projects.table.users")}</th>
              <th className="TableHeadEnd"></th>
            </tr>
          </thead>
          <tbody>
            {mockProjects.map((project) => (
              <tr key={project.name}>
                <td>{project.name}</td>
                <td>{project.language}</td>
                <td>{project.users}</td>
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
}
