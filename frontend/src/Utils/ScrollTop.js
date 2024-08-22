import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../sass/ScroollTop.scss";

function ScrollTop() {
  function activeScroll() {
    const scrollTopElement = document.getElementById("ScrollTop");
    if (scrollTopElement) {
      if (document.documentElement.scrollTop > 200) {
        scrollTopElement.className = "Activate";
      } else {
        scrollTopElement.className = "Disable";
      }
    }
  }
  window.onscroll = function () {
    activeScroll();
  };
  function handleClickScrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <div
      id="ScrollTop"
      className="Activate Disable"
      onClick={handleClickScrollTop}
    >
      <FontAwesomeIcon
        icon="fa-solid fa-chevron-up"
        className="Icon"
        size="1x"
        color="white"
      />
    </div>
  );
}

export default ScrollTop;
