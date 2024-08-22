import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import "../../sass/Contents/Advantages/AdvantageBtnNav.scss";

export default function AdvantageBtnNav({ namePage }) {
  const { t } = useTranslation(["Advantages"]);
  const history = useHistory();
  return (
    <div className="BoxButtons Btn_nav">
      {namePage !== "blog" && (
        <button
          className="blog"
          onClick={() => history.push("/advantages/blogs")}
        >
          <FontAwesomeIcon className="iconLeft" icon="fa-solid fa-left-long" />
          {t("blog.T")}
        </button>
      )}

      {namePage !== "event" && (
        <button
          className="event"
          onClick={() => history.push("/advantages/evenements")}
        >
          {t("buttons.event")}
        </button>
      )}

      {namePage !== "freebies" && (
        <button
          className="freebies"
          onClick={() => history.push("/advantages/freebies")}
        >
          {namePage !== "whiteBook" && namePage !== "event" && (
            <FontAwesomeIcon
              className="iconLeft"
              icon="fa-solid fa-left-long"
            />
          )}
          {t("freebies.T")}
          {namePage === "whiteBook" && namePage !== "event" && (
            <FontAwesomeIcon
              className="iconRight"
              icon="fa-solid fa-right-long"
            />
          )}
        </button>
      )}

      {namePage !== "whiteBook" && (
        <button
          className="whiteBook"
          onClick={() => history.push("/advantages/white-paper")}
        >
          {t("whiteBook.T")}
          <FontAwesomeIcon
            className="iconRight"
            icon="fa-solid fa-right-long"
          />
        </button>
      )}
    </div>
  );
}
