import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../../sass/Contents/HeaderLogin/ProjectDetail.scss";
import useModalStore from "../../Store/useModalStore";
export default function ProjectDetail({ project, title }) {
  const {
    openProjectInfos,
    setOpenProjectInfos,
    openUpdateProjectInfos,
    setOpenUpdateProjectInfos,
  } = useModalStore();
  if (!project) return null;
  return (
    <div className="ProjectDetail">
      <h3>{title}</h3>
      {openProjectInfos === false && (
        <p onClick={(e) => setOpenProjectInfos(true)} className="DescProject">
          i
        </p>
      )}
      <FontAwesomeIcon
        className="pen"
        icon="fa-solid fa-pencil"
        onClick={() => {
          setOpenUpdateProjectInfos(!openUpdateProjectInfos);
        }}
      />
    </div>
  );
}
