import React from "react";
import { useHistory } from "react-router-dom";

export default function BtnNavigate({ path, label }) {
  const history = useHistory();

  return (
    <button
      onClick={() => {
        history.push(path);
      }}
    >
      {label}
    </button>
  );
}
