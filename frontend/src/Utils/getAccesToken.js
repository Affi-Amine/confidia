import React from "react";
import { useMsal } from "@azure/msal-react";
import { useHistory } from "react-router-dom";
import useUserProfile from "../Store/useUserProfile";

export default function getAccessToken() {
  let history = useHistory();
  const { accounts } = useMsal();
  const { userData } = useUserProfile();

  // Récupération des données d'utilisateur à partir du token ou des données utilisateur
  const accountData = accounts[0]?.idTokenClaims || userData[0]?.idTokenClaims;

  // Récupération du champ "extension_inscrite" si disponible
  const extensionInscrite = accountData?.extension_inscrite ? accountData.extension_inscrite : "non renseigné";

  return extensionInscrite
}
