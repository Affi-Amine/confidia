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
  const { userData } = useUserProfile();
  const { accounts } = useMsal();
  const accountData = accounts[0]?.idTokenClaims || userData[0]?.idTokenClaims;

  // State to manage subscription status and loading
  const [loading, setLoading] = useState(true);
  let isSubbed = false;
  const [hasAccess, setHasAccess] = useState(null);

  useEffect(() => {
    const checkSubscription = async () => {
      if (accountData) {
        const email = accountData.emails[0]; // Extract email from account data
        console.log(email);

        const token = "21b7013def364268cb93b54466c30934c08bd695";  // Ajoutez ici votre token
        /*const response = await axios.post('http://127.0.0.1:8000/api-token-auth/', {
          username: 'your_username',
          password: 'your_password'
      });
      
      const token = response.data.token;*/

        try {
          const response = await axios.get('http://127.0.0.1:8000/api/check-subscription/', {
            params: { email },
            headers: {
              'Authorization': `Token ${token}`  // Ajoutez le token dans l'en-tête
            }
          });
          console.log('Subscription data:', response.data);
          console.log('Subscription data var:', response.data.is_subscribed);
          isSubbed = response.data.is_subscribed;
          // Set the access state based on the subscription status
          setHasAccess(response.data.subscription_active);
        } catch (error) {
          if (error.response && error.response.status === 201) {
            console.log('Nouvel abonnement créé.');
            setHasAccess(true);  // L'utilisateur est ajouté automatiquement
            isSubbed = true
          } else if (error.response && error.response.status === 404) {
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

    checkSubscription();
  }, [accountData]); // Run effect when accountData changes

  // Show loading state while checking subscription
  if (loading) return <div>Loading...</div>;

  // Conditional rendering based on access status
  return (
    <div className="HomeLogin">
      <h5 className="headband">{t("headband")}</h5>
      {isSubbed ? <HomeAccess /> : <HomeNotAccess />}
    </div>
  );
}

export default HomeLogin;

