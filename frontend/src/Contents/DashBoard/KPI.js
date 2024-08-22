import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useConfidiaDoc from "../../Store/useConfidiaDoc";
import "../../sass/Contents/Dashboard/KPI.scss";
export default function KPI({ props }) {
  const { t } = useTranslation(["Dashboard"]);
  const { setSeeKPI } = props;
  const { dashboard } = useConfidiaDoc();
  const [nameIndicator, setNameIndicator] = useState("");
  const [message, setMessage] = useState("");
  const [tabResum, setTabResum] = useState([]);
  let numStatement = dashboard.statement || [];
  let operators = ["/", "*", "-", "+", "%"];
  let symbols = ["C", "(", ")", ","];
  let numbers = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0"];

  function getType(item) {
    if (operators.includes(item)) return "operator";
    if (symbols.includes(item)) return "symbol";
    if (numbers.includes(item)) return "number";
    return "statement";
  }

  function handleClick(item, type) {
    if (item === "C") {
      setTabResum([]);
    } else {
      const lastItem = tabResum[tabResum.length - 1];
      const lastType = lastItem ? getType(lastItem) : null;

      const isDuplicate =
        (type === "statement" && lastType === "statement") ||
        (type === "operator" && lastType === "operator") ||
        (type === "symbol" && lastType === "symbol");

      if (!isDuplicate || type === "number") {
        setTabResum((prevState) => [...prevState, item]);
      } else {
        setMessage(
          "Un élément du même type ne peut pas être ajouté consécutivement"
        );
      }
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    try {
      if (nameIndicator === "") {
        return setMessage(t("kpi.message.3"));
      }
      if (tabResum.length >= 3) {
        console.log("supérieur");
        setMessage("");
      } else {
        setMessage(t("kpi.message.1"));
      }
    } catch (error) {
      console.log(error);
    }
  }
  function handleRemoveLast() {
    if (tabResum.length > 0) {
      setTabResum((prevState) => prevState.slice(0, -1));
    }
  }
  return (
    <div className="KPI">
      <h3>{t("kpi.T")}</h3>
      <button className="x" onClick={() => setSeeKPI(false)}>
        X
      </button>
      <section className="calculator">
        <div className="boxStatement">
          {numStatement.map((num, i) => {
            return (
              <button
                key={i}
                onClick={() => handleClick(num.title, "statement")}
              >
                {num.title}
              </button>
            );
          })}
        </div>
        <div>
          <input
            className="nameIndicator"
            type="text"
            aria-label={t("kpi.1")}
            placeholder={t("kpi.1")}
            value={nameIndicator}
            onChange={(e) => setNameIndicator(e.target.value)}
          />
          <div className="resumCalc">
            {tabResum.map((elem, i) => {
              let textes = ` ${elem} `;
              if (numbers.includes(elem)) {
                textes = elem;
              }
              return <pre key={i}>{textes}</pre>;
            })}
          </div>

          <div className="boxOperator">
            <div className="boxNumOp">
              <div className="symbols">
                {symbols.map((symb, i) => (
                  <button key={i} onClick={() => handleClick(symb, "symbols")}>
                    {symb}
                  </button>
                ))}
              </div>
              <div className="Numbers">
                {numbers.map((symb, i) => (
                  <button key={i} onClick={() => handleClick(symb, "numbers")}>
                    {symb}
                  </button>
                ))}
              </div>
            </div>

            <div className="operator">
              {operators.map((symb, i) => (
                <button key={i} onClick={() => handleClick(symb, "operator")}>
                  {symb}
                </button>
              ))}
            </div>
            <button className="sup" onClick={handleRemoveLast}>
              <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
            </button>
          </div>
          <div className="boxButtons">
            <p className="message">{message}</p>
            <button className="btn-create" onClick={(e) => handleSubmit(e)}>
              {t("kpi.btn.1")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
