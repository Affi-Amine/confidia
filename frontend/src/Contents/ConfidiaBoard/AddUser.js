import { useState } from "react";
import "../../sass/Components/Form.scss";
import { useTranslation } from "react-i18next";

export default function AddUser() {
    const [userEmail, setUserEmail] = useState("");
    const { t } = useTranslation(["ConfidiaBoard"]);
  return (
    <>
      <div className="MainContentHeader">
        <h3>{t("Users.addUser")}</h3>
      </div>
      <div className="Form">
        <label>Email:</label>
        <input
          type="text"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <input type="submit" value={t("Users.sendInvitation")} />
      </div>
    </>
  );
}
