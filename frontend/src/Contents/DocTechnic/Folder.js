import React, { useState } from "react";
import { ReactComponent as PaperSVG } from "../../assets/icons/SVG/paper.svg";
import { ReactComponent as FolderSVG } from "../../assets/icons/SVG/folder.svg";

function Folder({ folder, level }) {
  let randomNum = Math.floor(Math.random() * 100000);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="Folder" key={folder._id_ex + randomNum}>
      <div
        className="Item"
        onClick={handleClick}
        style={{
          paddingLeft: 30 * level,
        }}
      >
        <span>
          <FolderSVG className="icon" /> {folder.name}
        </span>
      </div>
      {isOpen &&
        folder.children.map((item) =>
          item.type === "folder" ? (
            <Folder key={item._id_ex} folder={item} level={level + 1} />
          ) : (
            <div
              className="Item"
              key={item._id_ex}
              style={{
                paddingLeft: 30 * (level + 1),
              }}
            >
              <span>
                <PaperSVG className="icon" />
                {item.name}
              </span>
            </div>
          )
        )}
    </div>
  );
}

export default Folder;
