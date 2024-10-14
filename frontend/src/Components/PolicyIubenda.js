import React from "react";
import { useHistory } from "react-router-dom";

function PolicyIubenda() {
  const history = useHistory();

  const handleNavigate = (path) => {
    history.push(path);
  };

  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      <button onClick={() => handleNavigate("/data-processing-info")}>
        Clauses et Services
      </button>
      <button onClick={() => handleNavigate("/further-data-info")}>
        Clauses et Services Personnalisés
      </button>
      <button onClick={() => handleNavigate("/technical-cookies")}>
        Cookies Techniques
      </button>
      <button onClick={() => handleNavigate("/other-types-cookies")}>
        Autres Types de Cookies
      </button>
    </div>
  );
}

export default PolicyIubenda;