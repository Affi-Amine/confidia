import { EventType, PublicClientApplication } from "@azure/msal-browser";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min.js";
import App from "./App.jsx";
import { msalConfig } from "./authConfig.jsx";
import "./i18n";
import "./index.css";

const msalInstance = new PublicClientApplication(msalConfig);

if (
  !msalInstance.getActiveAccount() &&
  msalInstance.getAllAccounts().length > 0
) {
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

msalInstance.addEventCallback((event) => {
  if (
    (event.eventType === EventType.LOGIN_SUCCESS ||
      event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS ||
      event.eventType === EventType.SSO_SILENT_SUCCESS) &&
    event.payload.account
  ) {
    msalInstance.setActiveAccount(event.payload.account);
  }
});
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <React.Suspense fallback="loading">
        <App instance={msalInstance} />
      </React.Suspense>
    </BrowserRouter>
  </StrictMode>
);
