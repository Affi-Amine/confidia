import React, { useEffect, useState } from "react";  // Import useState for state management
import { useTranslation } from "react-i18next";
import HomeAccess from "../Contents/HomeLogin/HomeAccess";
import HomeNotAccess from "../Contents/HomeLogin/HomeNotAccess";  
import { useHistory } from 'react-router-dom';
import "../sass/Pages/HomeLogin.scss";
import { useMsal } from "@azure/msal-react";  // Import useMsal to get user account data
import useUserProfile from "../Store/useUserProfile";  // Custom hook to get user profile data
import axios from 'axios';

const HomeLogin = () => {
  const { t } = useTranslation(["HomeLogin", "Dashboard"]);
  const history = useHistory();
  const { userData } = useUserProfile();
  const { accounts } = useMsal();
  const accountData = accounts[0]?.idTokenClaims || userData[0]?.idTokenClaims;

  // State to manage subscription status, loading, and token
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(null);
  const [userToken, setUserToken] = useState(null);  // New state for user token

  useEffect(() => {
    const fetchTokenAndCheckSubscription = async () => {
      if (accountData) {
        const email = accountData.emails[0]; // Extract email from account data

        try {
          // Generate token for the user
          const tokenResponse = await axios.post('http://127.0.0.1:8000/api/generate-user-token/', {
            email,
          });

          const token = tokenResponse.data.access;
          setUserToken(token);  // Save the token to state

          // Now check the subscription status
          const subscriptionResponse = await axios.get('http://127.0.0.1:8000/api/check-subscription/', {
            params: { email },
          });
          setHasAccess(subscriptionResponse.data.is_subscribed);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            console.log('Abonnement non trouvé pour cet e-mail.');
            setHasAccess(false);
          } else {
            console.log('Erreur lors de la requête:', error.message);
          }
        } finally {
          setLoading(false);
        }
      } else {
        console.error("No account data available");
        setLoading(false);
      }
    };

    fetchTokenAndCheckSubscription();
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
}

export default HomeLogin;