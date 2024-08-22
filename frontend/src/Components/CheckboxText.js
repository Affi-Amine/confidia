import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "../sass/Components/CheckboxText.scss";
export default function CheckboxText({ value, setValue, text, children }) {
  const { t } = useTranslation(["CG"]);
  const history = useHistory();
  return (
    <div className="CheckboxText">
      <label>
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => setValue(e.target.checked)}
        />
        {text}
        {children}
      </label>
    </div>
  );
}
