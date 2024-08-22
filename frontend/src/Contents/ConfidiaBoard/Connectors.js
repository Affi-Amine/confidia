import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../sass/Contents/ConfidiaBoard/BoardLayout.scss";
import "../../sass/Components/Table.scss";
import { useTranslation } from "react-i18next";
import useModalStore from "../../Store/useModalStore";

const mockConnectors = [
  {
    id: 1,
    type: "Jira",
    entities: 1564,
    projectsUsing: "Project 1, Project 2",
  },
  {
    id: 2,
    type: "Slack",
    entities: 1543,
    projectsUsing: "Project 1, Project 3",
  },
  {
    id: 3,
    type: "Github",
    entities: 164,
    projectsUsing:
      "Project 2, Project 3, Project 2, Project 3, Project 2, Project 3, Project 2, Project 3",
  },
];

const ActionButton = (props) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const { t } = useTranslation(["ConfidiaBoard"]);
  const { setSeeDeleteProject } = useModalStore()
  return (
    <div className="ActionButton">
      <span onClick={() => setOpen(!open)}>...</span>
      {open && (
        <div className="DropDown">
          <button
            onClick={() => history.push("/confidia-board/connectors/view/1")}
          >
            {t("ActionButton.view")}
          </button>
          <button onClick={() => {
            setSeeDeleteProject(true)
            setOpen(false)
          }}>{t("ActionButton.delete")}</button>
        </div>
      )}
    </div>
  );
};

export default function Connectors(props) {
  const history = useHistory();
  const { t } = useTranslation(["ConfidiaBoard"]);
  return (
    <>
      <div className="MainContentHeader">
        <h4>{t("Connectors.connectors")}</h4>
        <button
          className="NewProject"
          onClick={() => history.push("/confidia-board/connectors/add")}
        >
          <FontAwesomeIcon className="icon" icon="fa-solid fa-plus" />
          {t("Connectors.addConnector")}
        </button>
      </div>
      <div className="TableContainer">
        <table className="StyledTable">
          <thead>
            <tr>
              <th>{t("Connectors.table.connectorId")}</th>
              <th>{t("Connectors.table.type")}</th>
              <th>{t("Connectors.table.entities")}</th>
              <th>{t("Connectors.table.projectUsing")}</th>
              <th className="TableHeadEnd"></th>
            </tr>
          </thead>
          <tbody>
            {mockConnectors.map((connector) => (
              <tr key={connector.id}>
                <td>{connector.id}</td>
                <td>{connector.type}</td>
                <td>{connector.entities}</td>
                <td>{connector.projectsUsing}</td>
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
