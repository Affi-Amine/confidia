import React from "react";
import { useHistory } from "react-router-dom";
import useModalStore from "../Store/useModalStore";

export default function ImgBox({ image, descImage, openImg, navImgHistory }) {
  const { setImgSrc } = useModalStore();
  const history = useHistory();
  return (
    <div
      className="ImageBox"
      style={openImg || navImgHistory ? { cursor: "pointer" } : {}}
      onClick={() => {
        if (openImg) {
          setImgSrc(image);
        }
        if (navImgHistory !== null) {
          history.push(navImgHistory);
        }
      }}
    >
      <img src={image} loading="lazy" alt={descImage} />
    </div>
  );
}
