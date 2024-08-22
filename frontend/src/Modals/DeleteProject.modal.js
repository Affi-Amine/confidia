import React from "react";
import "../sass/Modals/DeleteProject.scss";
import "../sass/Components/Form.scss";
import useModalStore from "../Store/useModalStore";

function DeleteProject() {
  const { seeDeleteProject, setSeeDeleteProject } = useModalStore();
  if (!seeDeleteProject) return null;
  return (
    <div className={seeDeleteProject ? "boxDeleteProject" : "None"}>
      <div className="DeleteProject">
        <p>Are you sure you want to delete permanently this project?</p>
        </div>
      <div className="boxButtons">
        <button onClick={() => setSeeDeleteProject(false)}>No</button>
        <button onClick={() => setSeeDeleteProject(false)} className="Red">Yes</button>
      </div>
    </div>
  );
}
export default DeleteProject;
