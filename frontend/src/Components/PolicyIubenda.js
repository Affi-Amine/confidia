import React from "react";
import { useTranslation } from "react-i18next";
import Iubenda from "react-iubenda-policy";
function PolicyIubenda({ text }) {
  const { t } = useTranslation(["CG"]);
  const myPolicy = 90624318;
  return (
    <Iubenda id={myPolicy}>
      {!text ? <span>{t("Policy.privacy")}</span> : <span>{text}</span>}
    </Iubenda>
  );
}
export default PolicyIubenda;
