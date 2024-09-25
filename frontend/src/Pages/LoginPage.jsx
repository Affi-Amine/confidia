// src/Pages/LoginPage.jsx
import React from 'react';
import useAuthenticationActions from '../Utils/useAuthenticationActions';

const LoginPage = () => {
  const {
    handleLoginPopup,
    handleLoginRedirect,
    handleLogoutRedirect,
    handleLogoutPopup,
    handleProfileEdit,
  } = useAuthenticationActions();

  return (
    <div>
      <button onClick={handleLoginPopup}>Login with Popup</button>
      <button onClick={handleLoginRedirect}>Login with Redirect</button>
      <button onClick={handleLogoutRedirect}>Logout with Redirect</button>
      <button onClick={handleLogoutPopup}>Logout with Popup</button>
      <button onClick={handleProfileEdit}>Edit Profile</button>
    </div>
  );
};

export default LoginPage;