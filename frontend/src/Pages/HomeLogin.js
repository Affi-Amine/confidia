import React, { useEffect, useState } from "react";  // Import useState for state management
import { useTranslation } from "react-i18next";
import HomeAccess from "../Contents/HomeLogin/HomeAccess";
import HomeNotAccess from "../Contents/HomeLogin/HomeNotAccess";  // Import the new component for users without access
import { useHistory } from 'react-router-dom';
import "../sass/Pages/HomeLogin.scss";
import { useMsal } from "@azure/msal-react";  // Import useMsal to get user account data
import useUserProfile from "../Store/useUserProfile";  // Custom hook to get user profile data

export default function HomeLogin() {
  const { t } = useTranslation(["HomeLogin", "Dashboard"]);
  const history = useHistory();

  const { accounts } = useMsal();  // Use MSAL to get accounts data
  const { userData } = useUserProfile();  // Custom hook to get user profile data

  // State to hold the 'extensionInscrite' status
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Retrieve account data and check the 'extensionInscrite' field
    const accountData = accounts[0]?.idTokenClaims || userData[0]?.idTokenClaims;
    const extensionInscrite = accountData?.extension_inscrite;

    // Check if the user is subscribed or not
    if (extensionInscrite) {
      setIsSubscribed(true);  // User is subscribed
    } else {
      setIsSubscribed(false); // User is not subscribed
    }
  }, [accounts, userData]);  // Dependency array to run when accounts or userData changes

  // Optional: Redirect logic if necessary
  useEffect(() => {
    if (isSubscribed) {
      history.push('/home');  // Redirect to /home if subscribed
    }
    // Add more redirection logic if needed based on your app requirements
  }, [isSubscribed, history]);

  return (
    <div className="HomeLogin">
      <h5 className="headband">{t("headband")}</h5>
      {/* Conditional rendering based on subscription status */}
      {isSubscribed ? <HomeAccess /> : <HomeNotAccess />}
    </div>
  );
}