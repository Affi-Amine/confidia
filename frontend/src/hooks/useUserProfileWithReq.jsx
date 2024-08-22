import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import useUserProfile from "../Store/useUserProfile";

const useUserProfileWithReq = () => {
  const { accounts } = useMsal();
  const { userData, setUserData, loadUserData } = useUserProfile();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (
      isAuthenticated &&
      userData.length <= 0
      // &&
      // !accounts[0]?.idTokenClaims &&
      // !userData[0]?.idTokenClaims
    ) {
      const keyPrefix = `msal.token.keys.d4983a08-45dc-4861-b57c-2b897e74509f`;
      const storedValue = JSON.parse(localStorage.getItem(keyPrefix));

      if (storedValue.idToken && storedValue.idToken.length > 0) {
        const idTokenValue = storedValue.idToken[0];
        const storedSecretBox = JSON.parse(localStorage.getItem(idTokenValue));

        if (storedSecretBox && storedSecretBox.secret) {
          try {
            const decodedToken = jwtDecode(storedSecretBox.secret);
            // Structure userData de manière similaire à accounts
            const formattedUserData = [{ idTokenClaims: decodedToken }];

            setUserData(formattedUserData);
            loadUserData(formattedUserData[0]?.idTokenClaims?.emails[0]);
          } catch (error) {
            console.error("Erreur lors du décodage du JWT :", error);
          }
        }
      }
    }
  }, [isAuthenticated, accounts, setUserData, userData, loadUserData]);
};

export default useUserProfileWithReq;
