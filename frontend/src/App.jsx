import React from "react";
import "./App.css";

// Azure
import { MsalProvider } from "@azure/msal-react";

// Icon fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fontAwesomeIcons } from "./assets/awesomeIcon";

import Pages from "./Pages.jsx";

library.add(fontAwesomeIcons);

const App = ({ instance }) => {
  return (
    <MsalProvider instance={instance}>
      <Pages />
    </MsalProvider>
  );
};

export default App;
