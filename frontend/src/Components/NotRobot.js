import React, { useEffect, useState } from "react";
import "../sass/Components/NotRobot.scss";
import { RandomCalc } from "../Utils/RandomCalc";
import { useTranslation } from "react-i18next";

// const [verifNotRobot, setVerifNotRobot] = useState(false); Reçus depuis le parent
function NotRobot({ setVerifNotRobot, alerteNR }) {
  const { t } = useTranslation(["CG"]);
  const [verifResult, setVerifResult] = useState("");
  const [numbers, setNumbers] = useState(RandomCalc());
  useEffect(() => {
    setNumbers(RandomCalc());
  }, [alerteNR]);
  const calculateResult = (num1, num2, op) => {
    switch (op) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 > num2 ? num1 - num2 : num2 - num1;
      case "*":
        return num1 * num2;
      default:
        throw new Error(`Unknown operator: '${op}'`);
    }
  };
  const handleInputChange = (e) => {
    setVerifResult(e.target.value);

    const correctResult = calculateResult(
      numbers.num1,
      numbers.num2,
      numbers.op
    );
    if (Number(e.target.value) === correctResult) {
      setVerifNotRobot(true);
    } else {
      setVerifNotRobot(false);
    }
  };
  let orderNumCalc =
    numbers.num1 > numbers.num2
      ? `${numbers.num1} ${numbers.op} ${numbers.num2} = ?`
      : `${numbers.num2} ${numbers.op} ${numbers.num1} = ?`;
  return (
    <div className="NotRobot">
      <p>{t("NotRobot.ques")}</p>
      <p>{orderNumCalc}</p>
      <div>
        <input
          type="text"
          value={verifResult}
          placeholder="Result"
          onChange={handleInputChange}
        />
        {alerteNR && <p>* {t("NotRobot.alerte.calc1")}</p>}
      </div>
    </div>
  );
}
export default NotRobot;
