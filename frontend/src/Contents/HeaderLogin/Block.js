import React from "react";
import Card from "./Card";
import { ReactComponent as ImgDashboard } from "../../assets/icons/SVG/dashboard.svg";
import { ReactComponent as ImgBalise } from "../../assets/icons/SVG/balise.svg";
import { ReactComponent as ImgPapers } from "../../assets/icons/SVG/papers.svg";
import { ReactComponent as ImgTesting } from "../../assets/icons/SVG/testing.svg";

function Block(props) {
  const { button, datafilter, title, infos, type, imgType, progress, finish } =
    props;
  return (
    <div className="Block">
      <div className="desc">
        {imgType === "dashboard" && <ImgDashboard className="imgTitle" />}
        {imgType === "balise" && <ImgBalise className="imgTitle" />}
        {imgType === "papers" && <ImgPapers className="imgTitle" />}
        {imgType === "testing" && <ImgTesting className="imgTitle" />}
        <h1>{title}</h1>
      </div>

      {datafilter.map((select, i) => {
        const { id_project, name, update, Testing, date } = select;
        const { status } = Testing;
        let detail;
        if (type === "update") {
          detail = infos + " " + update;
        }
        if (type === "date") {
          detail = infos + " " + date;
        }
        if (type === "status") {
          if (status) {
            detail = finish + " " + date;
          } else {
            detail = progress + " " + date;
          }
        }
        return (
          <Card
            key={id_project}
            select={select}
            name={name}
            dashboard={true}
            infos={detail}
            imgType={imgType}
          />
        );
      })}
      <button>{button}</button>
    </div>
  );
}

export default Block;
