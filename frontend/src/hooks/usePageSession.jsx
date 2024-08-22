import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";

function usePageSession() {
  const { accounts } = useMsal();
  // console.log(accounts);
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      const userId = accounts[0].localAccountId;
      // console.log("userId :", userId);
      const sessionId = uuidv4();
      // console.log("sessionId :", sessionId);
    } else {
      // console.log("NON auth :");
    }

    //   const sessionId = uuidv4();
    //   sessionStorage.setItem("currentSessionId", sessionId);

    //   // Enregistrez la nouvelle session dans la base de données avec Axios
    //   axios
    //     .post("/api/sessions", { sessionId, userId })
    //     .then((response) => console.log("Session enregistrée", response))
    //     .catch((error) =>
    //       console.error("Erreur lors de l'enregistrement de la session", error)
    //     );

    //   // Fonction pour fermer la session à la fermeture de la page
    //   const closeSession = () => {
    //     axios
    //       .put(`/api/sessions/${sessionId}/close`)
    //       .then((response) => console.log("Session fermée", response))
    //       .catch((error) =>
    //         console.error("Erreur lors de la fermeture de la session", error)
    //       );
    //   };

    //   window.addEventListener("beforeunload", closeSession);

    //   // Nettoyage
    //   return () => {
    //     window.removeEventListener("beforeunload", closeSession);
    //     closeSession(); // Gère également les changements de route dans SPA
    //   };
  }, [isAuthenticated]);
}

export default usePageSession;
