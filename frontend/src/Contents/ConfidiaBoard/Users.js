import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../sass/Contents/ConfidiaBoard/BoardLayout.scss";
import "../../sass/Components/Table.scss";
import useModalStore from "../../Store/useModalStore";
import { useTranslation } from "react-i18next";

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
  },
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
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
  },
  // Add more users as needed
];

const ActionButton = (props) => {
  const history = useHistory();
  const { setSeeRemoveUser } = useModalStore();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation(["ConfidiaBoard"]);
  return (
    <div className="ActionButton">
      <span onClick={() => setOpen(!open)}>...</span>
      {open && (
        <div className="DropDown">
          <button onClick={() => history.push("/confidia-board/users/view/1")}>{t("ActionButton.view")}</button>
          <button onClick={() => history.push("/confidia-board/users/edit/1")}>{t("ActionButton.edit")}</button>
          <button onClick={() => {
            setSeeRemoveUser(true)
            setOpen(false)
          }}>{t("ActionButton.remove")}</button>
        </div>
      )}
    </div>
  );
};

export default function Users(props) {
  const history = useHistory();
  const { t } = useTranslation(["ConfidiaBoard"]);
  return (
    <>
      <div className="MainContentHeader">
        <h4>{t("Users.users")}</h4>
        <button
          className="NewProject"
          onClick={() => history.push("/confidia-board/users/add")}
        >
          <FontAwesomeIcon className="icon" icon="fa-solid fa-plus" />
          {t("Users.addUser")}
        </button>
      </div>
      <div className="TableContainer">
        <table className="StyledTable">
          <thead>
            <tr>
              <th>{t("Users.table.userId")}</th>
              <th>{t("Users.table.name")}</th>
              <th>Email</th>
              <th className="TableHeadEnd"></th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
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
