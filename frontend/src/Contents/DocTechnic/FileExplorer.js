import React, { useState } from "react";
// import AllData from "../../JSON/Bouygues/FileData.json";
import "../../sass/Contents/DocTechnic/FileExplorer.scss";

import Folder from "./Folder";

import { ReactComponent as PaperSVG } from "../../assets/icons/SVG/paper.svg";

// import SP from "../../JSON/Bouygues/SYSLOGparser/formatted_out.json";
// import SPinject from "../../JSON/Bouygues/SYSLOGparser_Inject/formatted_out.json";
// import SPudf from "../../JSON/Bouygues/SYSLOGparser_Udf/formatted_out.json";
// import SPudfOLT from "../../JSON/Bouygues/SYSLOGparser_UdfOLT/formatted_out.json";
import useConfidiaDoc from "../../Store/useConfidiaDoc";

function FileExplorer() {
  // const [files, setFiles] = useState(AllData);
  const [files, setFiles] = useState([]);
  const { docTechnic, setDocTechnic } = useConfidiaDoc();
  let nameFile = docTechnic.techDoc.name_file;

  function handleClickReadFile(id) {
    //  Temporaire pour changer de page
    // if (id === "fgrfhsetujeyterytrtsf") {
    //   setDocTechnic(SP);
    // }
    // if (id === "sdgrzegertgrezgtjhetyjykj") {
    //   setDocTechnic(SPinject);
    // }
    // if (id === "irughiugnkrjiughriughrrhg") {
    //   setDocTechnic(SPudf);
    // }
    // if (id === "ikfhgrbjnerkgjsiofghfhgber") {
    //   setDocTechnic(SPudfOLT);
    // }
  }

  return (
    <div className="FileExplorer">
      <h1>{nameFile}</h1>
      <div className="BoxFiles">
        {files.map((file) => {
          if (file.type === "file") {
            return (
              <div
                className="Item"
                key={file._id_ex}
                onClick={() => handleClickReadFile(file._id_ex)}
              >
                <span>
                  <PaperSVG className="icon" /> {file.name}
                </span>
              </div>
            );
          }
          if (file.type === "folder") {
            return <Folder key={file._id_ex} folder={file} level={0} />;
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default FileExplorer;
