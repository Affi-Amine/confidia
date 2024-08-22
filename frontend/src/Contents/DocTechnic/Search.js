import React from "react";
import { useTranslation } from "react-i18next";
import "../../sass/Contents/DocTechnic/Search.scss";

import { ReactComponent as Plus } from "../../assets/icons/SVG/plus.svg";
import { ReactComponent as Save } from "../../assets/icons/SVG/save.svg";
import { ReactComponent as Searchsvg } from "../../assets/icons/SVG/search.svg";
import useModalStore from "../../Store/useModalStore";

function Search({ propsSearch }) {
  const {
    selectInput,
    setSelectInput,
    selectOutput,
    setSelectOutput,
    seeSearch,
    setSeeSearch,
    seeFilters,
    setSeeFilters,
    setSearchBoard,
    resumFilters,
    setResumFilters,
    statusFilter,
  } = propsSearch;
  const { t } = useTranslation(["DocTechnic"]);
  const setSeeNewFeature = useModalStore((s) => s.setSeeNewFeature);
  const setSeeBadVersion = useModalStore((s) => s.setSeeBadVersion);

  function handleCheckChange(key, isChecked) {
    setResumFilters((prevFilters) => {
      let newFilters = { ...prevFilters[0] };
      if (newFilters[key]) {
        newFilters[key] = {
          ...newFilters[key],
          appliq: isChecked,
        };
      }
      return [newFilters];
    });
  }
  return (
    <div className="Search" style={{ minWidth: !seeSearch && "100px" }}>
      <button onClick={() => setSeeSearch(!seeSearch)}>
        {t("Search.explo")}
      </button>
      {seeSearch && (
        <>
          <div className="boxISearch">
            <input
              className="inputSearch"
              type="search"
              placeholder={t("Search.search")}
              onChange={(e) => setSearchBoard(e.target.value)}
            />
            <Searchsvg />
          </div>
          <div className="SelectInOutPut">
            <button>
              <input
                type="checkbox"
                checked={selectInput}
                onChange={(e) => {
                  if (selectOutput === false && selectInput === true) {
                    setSelectOutput(true);
                    setSelectInput(false);
                  } else {
                    setSelectInput(!selectInput);
                  }
                }}
              />
              Input
            </button>
            <button>
              <input
                type="checkbox"
                checked={selectOutput}
                onChange={(e) => {
                  if (selectInput === false && selectOutput === true) {
                    setSelectInput(true);
                    setSelectOutput(false);
                  } else {
                    setSelectOutput(!selectOutput);
                  }
                }}
              />
              Output
            </button>
          </div>
          <div className="ResumeFilterBox">
            {resumFilters.length > 0 && (
              <>
                <h6>{t("Search.resum")}</h6>
                <div className="Listes">
                  {Object.entries(resumFilters[0]).map(([key, value], i) => {
                    const { listes, appliq } = value;
                    return (
                      <div key={i} className="BoxType">
                        <div className="BoxTC">
                          <input
                            type="checkbox"
                            checked={appliq}
                            onChange={(e) =>
                              handleCheckChange(key, e.target.checked)
                            }
                          />
                          <p>{key}</p>
                          <span></span>
                        </div>

                        <div className="options">
                          {listes.map((list, index) => (
                            <option key={index}>{list} | </option>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
          <div className="boxCS">
            <p onClick={() => setSeeFilters(!seeFilters)}>
              <Plus />
              <span>
                {resumFilters.length > 0 && t("Search.edit")}
                {resumFilters.length === 0 &&
                  statusFilter &&
                  t("Search.create")}
                {resumFilters.length === 0 &&
                  !statusFilter &&
                  seeFilters &&
                  t("Search.hidden")}
                {resumFilters.length === 0 &&
                  !statusFilter &&
                  !seeFilters &&
                  t("Search.takeResum")}
              </span>
            </p>
            {resumFilters.length > 0 && (
              <p
                onClick={() => {
                  setSeeNewFeature(true);
                }}
              >
                <Plus />
                <span>{t("Search.create")}</span>
              </p>
            )}
            <p
              onClick={() => {
                setSeeNewFeature(true);
              }}
            >
              <Save /> <span>{t("Search.sauv")}</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Search;
