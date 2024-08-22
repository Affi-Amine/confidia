import React from "react";
import { useTranslation } from "react-i18next";
import "../../sass/Contents/HomePage/Stat.scss";

function NumTitle({ num, title }) {
  return (
    <div>
      <p>{num}</p>
      <h2>{title}</h2>
    </div>
  );
}
export default function Stat() {
  const { t } = useTranslation(["HomePage"]);

  return (
    <div className="Stat">
      <NumTitle num={"50"} title={t("Stat.t1")} />
      <NumTitle num={"3"} title={t("Stat.t2")} />
      <NumTitle num={"6"} title={t("Stat.t3")} />
      <NumTitle num={"900"} title={t("Stat.t4")} />
    </div>
  );
}
