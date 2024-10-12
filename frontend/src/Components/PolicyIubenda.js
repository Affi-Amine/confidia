import React from "react";
import { useHistory } from "react-router-dom";

function PolicyIubenda({ text }) {
  const history = useHistory();

  const handleNavigate = () => {
    history.push("/policy");
  };

  return (
    <button onClick={handleNavigate}>
      {!text ? "Privacy Policy" : text}
    </button>
  );
}

export default PolicyIubenda;
