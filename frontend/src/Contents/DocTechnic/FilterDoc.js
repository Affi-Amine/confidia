import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useConfidiaDoc from "../../Store/useConfidiaDoc";
import "../../sass/Contents/DocTechnic/FilterDoc.scss";

function FilterDoc({ propsFilterDoc }) {
  const {
    resumFilters,
    setResumFilters,
    checkedFilters,
    setCheckedFilters,
    selectedFilters,
    setSelectedFilters,
    setSeeFilters,
  } = propsFilterDoc;

  const { t } = useTranslation(["DocTechnic"]);
  const { docTechnic } = useConfidiaDoc();
  const [openFilters, setOpenFilters] = useState({}); // Permet d'ouvrir la liste déroulante des filtres individiellements

  const DocTechfilterDocSectionRef = useRef(null);
  const filterElementsType = docTechnic.filterElemnts;
  let arrayFilters = Object.entries(filterElementsType);

  function ValidFilter() {
    let validFilters = {};

    for (const key in checkedFilters) {
      if (
        checkedFilters[key] === true &&
        selectedFilters[key] &&
        selectedFilters[key].length
      ) {
        validFilters[key] = {
          listes: selectedFilters[key],
          appliq: false,
        };
      }
    }
    if (Object.keys(validFilters).length) {
      setResumFilters([validFilters]);
      setSeeFilters(false);
    } else {
      setResumFilters([]);
      setSeeFilters(false);
    }
  }
  function handleCheckChange(key, isChecked) {
    if (isChecked) {
      const selectedOptions = selectedFilters[key] || [];
      setSelectedFilters((prevState) => ({
        ...prevState,
        [key]: selectedOptions,
      }));
      setCheckedFilters((prevState) => ({
        ...prevState,
        [key]: selectedOptions.length > 0,
      }));
    } else {
      setCheckedFilters((prevState) => {
        const { [key]: _, ...rest } = prevState;
        return rest;
      });
    }
  }
  function handleFilterSelect(key, option) {
    setSelectedFilters((prevState) => {
      const previousOptions = prevState[key] || [];

      let newOptions;
      if (previousOptions.includes(option)) {
        newOptions = previousOptions.filter(
          (existingOption) => existingOption !== option
        );
      } else {
        newOptions = [...previousOptions, option];
      }

      const isChecked = newOptions.length > 0;
      setCheckedFilters((prevState) => ({
        ...prevState,
        [key]: isChecked,
      }));
      return {
        ...prevState,
        [key]: newOptions,
      };
    });
  }
  function handleToggle(key) {
    setOpenFilters((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  }
  function renderSelectedCount(key) {
    const selectedOptions = selectedFilters[key] || [];
    return <span className="selectedCount">{selectedOptions.length}</span>;
  }
  useEffect(() => {
    if (DocTechfilterDocSectionRef.current) {
      DocTechfilterDocSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return (
    <div className="FilterDoc" ref={DocTechfilterDocSectionRef}>
      <div className="Listes">
        {arrayFilters.map(([key, value], i) => {
          return (
            <div className="box" key={i}>
              <div
                className={
                  openFilters[key] ? "BoxTC Types open" : "BoxTC Types close"
                }
              >
                {selectedFilters[key] && selectedFilters[key].length > 0 ? (
                  <input
                    type="checkbox"
                    checked={!!checkedFilters[key]}
                    onChange={(e) => handleCheckChange(key, e.target.checked)}
                  />
                ) : (
                  <p className="gray-checkbox">X</p>
                )}
                <h6 onClick={() => handleToggle(key)}>
                  {key} {renderSelectedCount(key)} / {value.length}
                  {openFilters[key] ? (
                    <FontAwesomeIcon className="icon" icon=" fa-chevron-up" />
                  ) : (
                    <FontAwesomeIcon className="icon" icon="fa-chevron-down" />
                  )}
                </h6>
              </div>
              {openFilters[key] && (
                <div className="options">
                  {value.map((elm, index) => {
                    const isSelected = selectedFilters[key]?.includes(elm.name);
                    return (
                      <p
                        key={index}
                        onClick={() => handleFilterSelect(key, elm.name)}
                        className={isSelected ? "selected" : "black"}
                      >
                        {elm.name}
                      </p>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="boxButtons">
        {Object.keys(selectedFilters).length > 0 && (
          <button onClick={ValidFilter}>{t("filterDoc.buttons.valid")}</button>
        )}
        <button
          onClick={() => {
            setResumFilters([]);
            setSelectedFilters({});
            setCheckedFilters({});
            setSeeFilters(false);
          }}
        >
          {resumFilters.length > 0
            ? t("filterDoc.buttons.sup")
            : t("filterDoc.buttons.cancel")}
        </button>
      </div>
    </div>
  );
}
export default FilterDoc;
