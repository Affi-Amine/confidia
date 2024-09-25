import React from "react";
import { useMsal } from "@azure/msal-react";
import { useHistory } from "react-router-dom";
import useUserProfile from "../Store/useUserProfile";

export default function TestPage() {

  let history = useHistory();
  const { accounts } = useMsal();
  const { userData } = useUserProfile();
  const accountData = accounts[0]?.idTokenClaims || userData[0]?.idTokenClaims;

  return (
    <div>
      <h1>{JSON.stringify(accountData)}</h1>
      <h1>THIS PAGE WORKS</h1>
    </div>
  );
}
