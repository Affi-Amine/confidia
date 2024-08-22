import React, { useEffect, useState } from "react";
import Block from "../../Components/Block";
import "../../sass/Contents/Dashboard/Statement.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import useConfidiaDoc from "../../Store/useConfidiaDoc";
import useCheckDocTechnic from "../../hooks/useCheckDocTechnic";
function Statement() {
  const { t } = useTranslation(["Dashboard"]);
  useCheckDocTechnic();
  const { dashboard } = useConfidiaDoc();

  let statements = dashboard.statement || [];

  const [viewMode, setViewMode] = useState("scroll"); // 'scroll' ou 'pagination'
  const [itemsPerPage, setItemsPerPage] = useState(8); // nombre d'items par page
  const [currentPage, setCurrentPage] = useState(1); // la page actuelle pour la pagination
  const [openParam, setOpenParam] = useState(false);
  const totalPages = Math.ceil(statements.length / itemsPerPage);

  const handleItemsPerPageChange = (value) => {
    if (value > 0) {
      setItemsPerPage(value);
    }
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [itemsPerPage, totalPages, currentPage]);

  return (
    <div className="BoxStatements">
      <FontAwesomeIcon
        className="elipse"
        icon="fa-solid fa-ellipsis-vertical"
        onClick={() => setOpenParam(!openParam)}
      />
      <div
        className="Statement"
        style={
          viewMode === "scroll" ? { overflow: "auto", maxHeight: "79vh" } : {}
        }
      >
        {viewMode === "pagination" && (
          <>
            <label className="numMetricPage">
              <input
                // className="numMetricPage"
                type="number"
                // value={itemsPerPage}
                onChange={(e) =>
                  handleItemsPerPageChange(Number(e.target.value))
                }
              />
              <p>/ {statements.length}</p>
            </label>
            <button
              className="iconArrowL"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              style={
                currentPage === 1
                  ? {
                      backgroundColor: "rgba(21, 95, 117, 0.481)",
                      cursor: "not-allowed",
                    }
                  : { backgroundColor: "#155e75" }
              }
              disabled={currentPage === 1}
            >
              <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
            </button>
            <button
              className="iconArrowR"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              style={
                currentPage === totalPages
                  ? {
                      backgroundColor: "rgba(21, 95, 117, 0.481)",
                      cursor: "not-allowed",
                    }
                  : { backgroundColor: "#155e75" }
              }
              disabled={currentPage === totalPages}
            >
              <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
            </button>
          </>
        )}

        {(viewMode === "scroll"
          ? statements
          : statements.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )
        ).map((elem, i) => {
          return <Block key={i} number={elem.num} text={elem.title} />;
        })}
      </div>

      {openParam && (
        <div className="ParamStatement">
          <button className="X" onClick={() => setOpenParam(false)}>
            X
          </button>

          <div className="viewMetric">
            <h6>Mode de vue:</h6>
            <button>
              <FontAwesomeIcon
                className="icon"
                icon="fa-solid fa-up-down"
                onClick={() => setViewMode("scroll")}
              />
            </button>
            <button>
              <FontAwesomeIcon
                className="icon"
                icon="fa-solid fa-book-open"
                onClick={() => setViewMode("pagination")}
              />
            </button>
          </div>
          <div className="addMetric">
            <p>{t("Statement.param.addMetric")}</p>
            <button>
              <FontAwesomeIcon icon="fa-solid fa-plus" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Statement;
