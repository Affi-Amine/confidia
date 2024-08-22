import React from "react";
import { useTranslation } from "react-i18next";

export default function BoxQuestions() {
  const { t } = useTranslation(["Offer"]);
  const dataQuestions = [
    { title: "Q1.T", text: ["Q1.p1"] },
    { title: "Q2.T", text: ["Q2.p1"] },
    { title: "Q3.T", text: ["Q3.p1", "Q3.p2", "Q3.p3"] },
    { title: "Q4.T", text: ["Q4.p1"] },
    { title: "Q5.T", text: ["Q5.p1", "Q5.p2"] },
  ];
  return (
    <div className="BoxQuestions">
      <h2>{t("boxQuestion.H2")}</h2>
      <SeeDataQ jsonpart={"boxQuestion."} data={dataQuestions} />
    </div>
  );
}
function SeeDataQ({ data, jsonpart }) {
  const { t } = useTranslation(["Offer"]);

  return (
    <div>
      {data.map((elm, i) => {
        return (
          <div className="box" key={i}>
            <h3>{t(`${jsonpart}${elm.title}`)}</h3>
            {elm.text.map((text, index) => {
              return <p key={index}>{t(`${jsonpart}${text}`)}</p>;
            })}
          </div>
        );
      })}
    </div>
  );
}
