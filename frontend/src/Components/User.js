import { useMsal } from "@azure/msal-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useHistory } from "react-router-dom";
import "../sass/Components/User.scss";

import Configuration from "../Contents/HeaderLogin/Configuration";
import useConfidiaDoc from "../Store/useConfidiaDoc";
import useModalStore from "../Store/useModalStore";
import useUserProfile from "../Store/useUserProfile";
import ImgBox from "./ImgBox";

export default function User() {
  let history = useHistory();
  const { accounts } = useMsal();
  const { userData } = useUserProfile();
  const accountData = accounts[0]?.idTokenClaims || userData[0]?.idTokenClaims;

  const { user } = useConfidiaDoc();
  const { setOpenConfiguration, openConfiguration } = useModalStore();

  if (!accountData) return null;

  const initials = accountData.given_name
    ? accountData.given_name[0] + accountData.family_name[0]
    : "";
  const fullName = accountData.given_name + " " + accountData.family_name;
  return (
    <div className="HeaderLoginUser">
      <div onClick={() => history.push("/homeLogin-confidia")}>
        {user.image ? (
          <ImgBox
            image={user.image}
            descImage={[accountData.given_name, accountData.family_name]}
          />
        ) : (
          <div className="initial">{initials}</div>
        )}
      </div>
      <div
        className="boxUsername"
        onClick={() => setOpenConfiguration(!openConfiguration)}
      >
        <p>
          {fullName}
          <FontAwesomeIcon className="icon" icon="fa-solid fa-chevron-down" />
        </p>
        <Configuration />
      </div>
    </div>
  );
}
