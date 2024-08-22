// import "";
import React from "react";
import ImgBox from "../../Components/ImgBox";
import { openInNewTab } from "../../Utils/OpenInNewTab";
import "../../sass/Contents/Advantages/YoutubeLink.scss";

export default function YoutubeLink({
  textButon,
  youtubeLink,
  image,
  descImage,
}) {
  return (
    <div className="YoutubeLink">
      <ImgBox image={image} descImage={descImage} />
      <div className="BoxButtons">
        <button onClick={() => openInNewTab(youtubeLink)}>{textButon}</button>
      </div>
    </div>
  );
}
