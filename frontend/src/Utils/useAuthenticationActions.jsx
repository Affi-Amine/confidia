import { useHistory } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest, b2cPolicies } from '../authConfig'; 
import { clearStorage } from './storageUtils.jsx'; // Assuming you still need storage management

export function useAuthenticationActions() {
  const { instance, inProgress } = useMsal(); // Keep if you plan to use Azure in other places
  const history = useHistory();
  let activeAccount;

  if (instance) {
    activeAccount = instance.getActiveAccount();
  }

  // Update the handleLoginPopup to redirect to Django backend
  const handleLoginPopup = () => {
    window.location.href = "http://127.0.0.1:8000/auth/sign_in"; // Redirect to Django backend for login
  };

  // Update the handleLoginRedirect to also redirect to Django backend
  const handleLoginRedirect = () => {
    window.location.href = "http://127.0.0.1:8000/auth/sign_in"; // Redirect to Django backend for login
  };

  // Handle logout with Azure (if still needed)
  const handleLogoutRedirect = () => {
    instance.logoutRedirect(); // Keep this logic if Azure logout is still required
  };

  // Logout via popup
  const handleLogoutPopup = () => {
    clearStorage(activeAccount); // Clear any stored session data
    instance.logoutPopup({
      mainWindowRedirectUri: '/', // Redirect back to home page after logout
      account: instance.getActiveAccount(),
    }).catch((error) => console.log(error));
  };

  // Handle profile edit (optional - Azure logic)
  const handleProfileEdit = () => {
    if (inProgress === InteractionStatus.None) {
      instance.acquireTokenRedirect(b2cPolicies.authorities.editProfile); // Azure profile edit
    }
  };

  return {
    handleLoginPopup,
    handleLoginRedirect,
    handleLogoutRedirect,
    handleLogoutPopup,
    handleProfileEdit,
  };
}