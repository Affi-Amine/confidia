import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ImgBox from "../../Components/ImgBox";
import useConfidiaDoc from "../../Store/useConfidiaDoc";
import useModalStore from "../../Store/useModalStore";
import "../../sass/Contents/Dashboard/ProjectInfos.scss";

function ProjectInfos() {
  const { dashboard } = useConfidiaDoc();
  const { openProjectInfos, setOpenProjectInfos, setSeeNewFeature } =
    useModalStore();
  if (!openProjectInfos) return null;
  return (
    <div className="ProjectInfos">
      <div className="BoxImg">
        <FontAwesomeIcon
          className="pen"
          icon="fa-solid fa-pencil"
          onClick={() => {
            setSeeNewFeature(true);
          }}
        />
        {dashboard.image && (
          <ImgBox
            image={
              dashboard.projectImg === null
                ? dashboard.image
                : dashboard.projectImg
            }
          />
        )}
      </div>
      <div className="create">
        <p>
          crée par <span>{dashboard.creator}</span>
        </p>
        <p>
          le <span>{dashboard.date}</span>
        </p>
      </div>
      <p>{dashboard.desc}</p>

      <div className="close" onClick={(e) => setOpenProjectInfos(false)}>
        <FontAwesomeIcon className="icon" icon="fa-solid fa-x" />
      </div>
    </div>
  );
}

export default ProjectInfos;
