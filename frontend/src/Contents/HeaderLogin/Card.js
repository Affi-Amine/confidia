import React from "react";
import useConfidiaDoc from "../../Store/useConfidiaDoc";
import { ReactComponent as ImgBalise } from "../../assets/icons/SVG/balise.svg";
import { ReactComponent as ImgDashboard } from "../../assets/icons/SVG/dashboard.svg";
import { ReactComponent as ImgPapers } from "../../assets/icons/SVG/papers.svg";
import { ReactComponent as ImgTesting } from "../../assets/icons/SVG/testing.svg";
function Card({ name, select, infos, imgType }) {
  const { setProject } = useConfidiaDoc();
  return (
    <div className="Card">
      {imgType === "dashboard" && <ImgDashboard className="imgicon" />}
      {imgType === "balise" && <ImgBalise className="imgicon" />}
      {imgType === "papers" && <ImgPapers className="imgicon" />}
      {imgType === "testing" && <ImgTesting className="imgicon" />}

      <div className="detail">
        <h1 onClick={() => setProject(select)}>{name}</h1>
        <p>{infos}</p>
      </div>
    </div>
  );
}

export default Card;
