import React from "react";
import "../sass/Modals/ImageModal.scss";
import useModalStore from "../Store/useModalStore";
import ImgBox from "../Components/ImgBox";

export default function ImageModal() {
  const { seeImageModalM, setSeeImageModalM, imgSrcModalM } = useModalStore();
  if (!seeImageModalM) return null;
  return (
    <div className="ImageModal">
      <button className="close" onClick={() => setSeeImageModalM(false)}>
        X
      </button>
      <ImgBox image={imgSrcModalM} />
    </div>
  );
}
