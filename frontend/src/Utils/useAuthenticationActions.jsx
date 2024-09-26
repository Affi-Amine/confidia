import { useHistory } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest, b2cPolicies } from '../authConfig.jsx';
import { clearStorage } from './storageUtils.jsx';

export function useAuthenticationActions() {
  const { instance, inProgress } = useMsal();
  const history = useHistory();
  let activeAccount;

  if (instance) {
    activeAccount = instance.getActiveAccount();
  }

  const handleLoginPopup = () => {
    instance
      .loginPopup({
        ...loginRequest,
        redirectUri: `${window.location.origin}/.auth/login/aadb2c/callback`
      }).then(() => {
        history.push('/HomeLogin');
      })
      .catch((error) => console.log(error));
  };

  const handleLoginRedirect = () => {
    instance.loginRedirect(loginRequest).catch((error) => console.log(error));
  };

  const handleLogoutRedirect = () => {
    instance.logoutRedirect();
  };

  const handleLogoutPopup = () => {
    clearStorage(activeAccount);

    instance.logoutPopup({
      mainWindowRedirectUri: '/', // redirects the top level app after logout
      account: instance.getActiveAccount(),}).catch((error) => console.log(error));
  };

  const handleProfileEdit = () => {
    if (inProgress === InteractionStatus.None) {
      instance.acquireTokenRedirect(b2cPolicies.authorities.editProfile);
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