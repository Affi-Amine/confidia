import React, { useCallback, useContext, useEffect, useState } from "react";
// import "../Styles/Language.css";
import "../sass/Components/Languages.scss";
import { useTranslation } from "react-i18next";

import English from "../assets/flags/English.png";
import French from "../assets/flags/French.png";
import Italian from "../assets/flags/Italian.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Store
import useGlobalParam from "../Store/useGlobalParam";

const lngs = {
  fr: { nativeName: French, title: "Français", val: "fr" }, // Mention graphiste: IconMarketPK :https://www.flaticon.com/fr/auteurs/iconmarketpk
  en: { nativeName: English, title: "English", val: "en" }, // Mention graphiste: Freepik :https://www.freepik.com/?_gl=1*sxkhcv*test_ga*ODQ4MDUyNDYzLjE3MDI2NTU4Mzc.*test_ga_523JXC6VL7*MTcwMjY1NTgzOC4xLjEuMTcwMjY1NTk5Ny42MC4wLjA.*fp_ga*ODQ4MDUyNDYzLjE3MDI2NTU4Mzc.*fp_ga_1ZY8468CQB*MTcwMjY1NTgzOC4xLjEuMTcwMjY1NTk5Ny42MC4wLjA.
  it: { nativeName: Italian, title: "Italian", val: "it" }, // Mention graphiste: Creatype :https://www.flaticon.com/fr/auteurs/creatype
};

function Language() {
  const { t, i18n } = useTranslation("header");
  const [allLang, setAllLang] = useState(false);
  const setLanguage = useGlobalParam((s) => s.setLanguage);

  const Language = t("language");

  const onChangeLang = useCallback(
    (lng) => {
      i18n.changeLanguage(lng);
      setLanguage(lng);
      setAllLang(false);
    },
    [i18n, setLanguage]
  );

  useEffect(() => {
    const currentLanguage = i18n.language;
    if (Object.keys(lngs).includes(currentLanguage)) {
      onChangeLang(currentLanguage);
    }
  }, [i18n.language, onChangeLang]);

  return (
    <div className="Language">
      <button
        className="seeAllLang"
        onMouseEnter={() => setAllLang(true)}
        onMouseLeave={() => setAllLang(false)}
      >
        {Language === "Français" ? (
          <img src={French} loading="lazy" alt="Français" />
        ) : (
          ""
        )}
        {Language === "English" ? (
          <img src={English} loading="lazy" alt="English" />
        ) : (
          ""
        )}
        {Language === "Italian" ? (
          <img src={Italian} loading="lazy" alt="Italian" />
        ) : (
          ""
        )}
        <p>{t("language")}</p>
        <FontAwesomeIcon className="Icon" icon="fa-solid fa-chevron-down" />
      </button>
      <div
        className={allLang ? "Langbutton" : "hidden"}
        onMouseEnter={() => setAllLang(true)}
        onMouseLeave={() => setAllLang(false)}
      >
        {Object.keys(lngs).map((lng) => {
          const lang = lngs[lng].nativeName;
          const title = lngs[lng].title;

          return (
            <button
              className={allLang && Language !== lang ? "NButton" : "hidden"}
              type="submit"
              key={lng}
              onClick={() => onChangeLang(lng)}
              disabled={i18n.resolvedLanguage === lng}
            >
              {Language !== title && (
                <div>
                  <img src={lang} loading="lazy" alt={title} />
                  <p>{title}</p>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Language;
