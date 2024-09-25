import { useHistory } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest, b2cPolicies } from '../authConfig';
import { clearStorage } from './storageUtils.jsx';

export function useAuthenticationActions() {
  const { instance, inProgress } = useMsal();
  const history = useHistory();
  let activeAccount;

  if (instance) {
    activeAccount = instance.getActiveAccount();
  }

  const handleLoginPopup = () => {
    instance.loginPopup({
      scopes: ["openid", "profile", "user.read"],
      redirectUri: "http://localhost:3000/testpage" // Explicit redirect URI for after login
    })
    .catch(error => {
      console.error(error);
    });
  };

// Update the handleLoginRedirect to also redirect to Django backend
const handleLoginRedirect = () => {
  instance.loginRedirect({
    scopes: ["openid", "profile", "user.read"],
  })
    .then(response => {
      // On successful login, redirect to TestPage
      history.push("/testpage");
    })
    .catch(error => {
      console.error(error);
    });
};

// Handle logout with Azure (if still needed)
const handleLogoutRedirect = () => {
  instance.logoutRedirect();
};

// Logout via popup
const handleLogoutPopup = () => {
  clearStorage(activeAccount);
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