import React from "react";
import { useMsal } from "@azure/msal-react";
import { useHistory } from "react-router-dom";
import useUserProfile from "../Store/useUserProfile";

export default function TestPage() {
  let history = useHistory();
  const { accounts } = useMsal();
  const { userData } = useUserProfile();
  console.log(userData);

  // Récupération des données d'utilisateur à partir du token ou des données utilisateur
  const accountData = accounts[0]?.idTokenClaims || userData[0]?.idTokenClaims;
  console.log(accountData);

  // Récupération du champ "extension_inscrite" si disponible
  const extensionInscrite = accountData?.extension_inscrite ? accountData.extension_inscrite : "non renseigné";

  return (
    <div>
      {/* Affichage du contenu complet sous forme JSON */}
      <h1>{JSON.stringify(accountData)}</h1>

      {/* Phrase personnalisée avec le champ "extension_inscrite" */}
      <h2>Le champs inscription : {extensionInscrite}</h2>

      <h1>THIS PAGE WORKS</h1>
    </div>
  );
}
