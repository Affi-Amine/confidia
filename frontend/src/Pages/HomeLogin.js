import React, { useEffect } from "react";  // Import useEffect for the redirection logic
import { useTranslation } from "react-i18next";
import HomeAccess from "../Contents/HomeLogin/HomeAccess";
import { useHistory } from 'react-router-dom';  // Utilise useHistory
import "../sass/Pages/HomeLogin.scss";

export default function HomeLogin() {
  const { t } = useTranslation(["HomeLogin", "Dashboard"]);
  const history = useHistory();  // Utilise useHistory

  useEffect(() => {
    // Automatically redirect to '/home' after component loads
    history.push('/home');
  }, [history]);  // Dependency array to trigger the effect once on mount

  return (
    <div className="HomeLogin">
      <h5 className="headband">{t("headband")}</h5>
      <HomeAccess />
    </div>
  );
}