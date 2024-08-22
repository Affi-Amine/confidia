import React from "react";
import "../sass/ScroollTo.scss";

export function ScrollTo({ text, scrollToElement }) {
  return (
    <div
      className="scrollButton"
      onClick={() =>
        scrollToElement.current.scrollIntoView({ behavior: "smooth" })
      }
    >
      {text}
    </div>
  );
}
export const scrollToMyComponent = ({ scrollToCurrentComposantRef }) => {
  if (scrollToCurrentComposantRef && scrollToCurrentComposantRef.current) {
    scrollToCurrentComposantRef.current.scrollIntoView({ behavior: "smooth" });
  }
};
