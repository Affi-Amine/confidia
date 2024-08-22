import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ImgBox from "../../Components/ImgBox";
import useConfidiaDoc from "../../Store/useConfidiaDoc";
import "../../sass/Contents/Dashboard/UpdateProjectInfos.scss";

function UpdateProjectInfos({
  openUpdateProjectInfos,
  setOpenUpdateProjectInfos,
}) {
  const { t } = useTranslation(["Dashboard"]);
  const { dashboard, setDashboard } = useConfidiaDoc();

  const [title, setTitle] = useState(dashboard.name);
  const [desc, setDesc] = useState(dashboard.desc);
  const [newImage, setNewImage] = useState(null);
  let Bcondition =
    title !== dashboard.name || desc !== dashboard.desc || newImage !== null;

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setNewImage(URL.createObjectURL(selectedFile));
    }
  };
  function handleSubmit(e) {
    e.preventDefault();
    try {
      setDashboard((prevState) => ({
        ...prevState,
        name: title,
        desc: desc,
        projectImg: newImage ? newImage : prevState.projectImg,
      }));

      setOpenUpdateProjectInfos(false);
    } catch (error) {
      console.log("error: ", error);
    }
  }
  return (
    <div className="UpdateProjectInfos">
      <ImgBox
        image={
          newImage !== null
            ? newImage
            : dashboard.projectImg !== null
            ? dashboard.projectImg
            : dashboard.image
        }
      />

      <form>
        <label className="newImg">
          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <p>{t("UpdateProjectInfos.change")}</p>
          <FontAwesomeIcon className="icon" icon="fa-solid fa-image" />
        </label>
        <div>
          <label>
            <input
              className="title"
              type="text"
              value={title}
              aria-label="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            <textarea
              className="Desc"
              // rows="6"
              aria-label="description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </label>
        </div>
        {Bcondition && (
          <button className="Bsubmit" onClick={handleSubmit}>
            <FontAwesomeIcon
              className="icon"
              icon=" fa-paper-plane"
              data-fa-transform="rotate-90"
            />
          </button>
        )}
      </form>
    </div>
  );
}
export default UpdateProjectInfos;
