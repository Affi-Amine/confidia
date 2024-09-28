import React, { useEffect, useState } from "react";  // Import useState for state management
import { useTranslation } from "react-i18next";
import HomeAccess from "../Contents/HomeLogin/HomeAccess";
import HomeNotAccess from "../Contents/HomeLogin/HomeNotAccess";  // Import the new component for users without access
import { useHistory } from 'react-router-dom';
import "../sass/Pages/HomeLogin.scss";
import { useMsal } from "@azure/msal-react";  // Import useMsal to get user account data
import useUserProfile from "../Store/useUserProfile";  // Custom hook to get user profile data
import axios from 'axios';

const HomeLogin = () => {
  const { t } = useTranslation(["HomeLogin", "Dashboard"]);
  const history = useHistory();
  const { accounts } = useMsal();
  const accountData = accounts[0]?.idTokenClaims;
  
  // State to manage subscription status and loading
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(null);

  useEffect(() => {
    const checkSubscription = async () => {
      if (accountData) {
        const email = accountData.emails[0]; // Extract email from account data

        try {
          // Check subscription status from the backend
          const response = await axios.get('/api/check-subscription', {
            params: { email },
          });

          // Set the access state based on the subscription status
          setHasAccess(response.data.subscription_active);
        } catch (error) {
          console.error("Error checking subscription:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.error("No account data available");
        setLoading(false);
      }
    };

    checkSubscription();
  }, [accountData]); // Run effect when accountData changes

  // Show loading state while checking subscription
  if (loading) return <div>Loading...</div>;

  // Conditional rendering based on access status
  return (
    <div className="HomeLogin">
      <h5 className="headband">{t("headband")}</h5>
      {hasAccess ? <HomeAccess /> : <HomeNotAccess />}
    </div>
  );
  /*const history = useHistory();

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
      history.push('/homelogin-confidia');  // Redirect to /home if subscribed
    }
    // Add more redirection logic if needed based on your app requirements
  }, [isSubscribed, history]);

  return (
    <div className="HomeLogin">
      <h5 className="headband">{t("headband")}</h5>
      {/* Conditional rendering based on subscription status}
      {isSubscribed ? <HomeAccess /> : <HomeNotAccess />}
    </div>
  );*/
}

export default HomeLogin;