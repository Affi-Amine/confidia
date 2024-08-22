// DLO-1007
import React, { useState } from "react";
import "../../sass/Contents/DocTechnic/Board.scss";

import useConfidiaDoc from "../../Store/useConfidiaDoc";
import { RandomColor } from "../../Utils/RandomColor";
import { ReactComponent as Circle } from "../../assets/icons/SVG/circle-red.svg";
import { ReactComponent as EyeClose } from "../../assets/icons/SVG/eye-close.svg";
import { ReactComponent as EyeOpen } from "../../assets/icons/SVG/eye-open.svg";

function Board({ propsBoard }) {
  const {
    allseeBoard,
    searchBoard,
    tabSBoard,
    setTabSBoard,
    resumFilters,
    BoardScrollToElementScript,
  } = propsBoard;

  const { docTechnic, setDocTechnic } = useConfidiaDoc();

  const [detailLinesCode, setDetailLinesCode] = useState([]);
  const [seeBoxDetailLineBlock, setSeeBoxDetailLineBlock] = useState(false);
  // const [listElemnts, setListElemnts] = useState([docTechnic.listElemnts]);

  // Permets de choisir quelle colonne affichée dans le tableau
  const [visibleColumn, setVisibleColumn] = useState(() => {
    const columns = docTechnic.listElemnts.map((columnName) => ({
      title: columnName,
      see: true,
    }));
    return columns;
  });
  const addtabelm = {
    0: Object.fromEntries(
      docTechnic.listElemnts.map((columnName) => [columnName, "NA"])
    ),
  };
  const scriptBoard = docTechnic.techDoc.elementsDoc;

  let tab = [];
  if (searchBoard !== "") {
    tab = [
      ...Object.values(scriptBoard).filter((elm) =>
        elm.name?.toLowerCase().includes(searchBoard.toLowerCase())
      ),
    ];
  } else {
    tab = [...Object.values(scriptBoard)];
  }
  const scriptBoardArray = [addtabelm, ...Object.values(tab)];
  let board = scriptBoardArray;

  // Vérifie si le tableau resumFilters contient au moins un filtre
  if (resumFilters.length > 0) {
    // Parcoure chaque filtre dans le tableau resumFilters
    resumFilters.forEach((filterObj) => {
      Object.entries(filterObj).forEach(([field, filterData]) => {
        if (filterData.appliq) {
          board = [
            addtabelm,
            ...board.filter((element) => {
              if (typeof element[field] === "string") {
                return filterData.listes.includes(element[field]);
              }
              if (Array.isArray(element[field])) {
                return element[field].some((item) =>
                  filterData.listes.includes(item)
                );
              }
              return false;
            }),
          ];
        }
      });
    });
  }

  function SeeColums(nameCol) {
    setVisibleColumn((prevState) =>
      prevState.map((column) =>
        column.title === nameCol ? { ...column, see: !column.see } : column
      )
    );
  }

  function HandleChangeNameBoard(e, eid, rows) {
    const newName = e.target.value;
    // Copie profonde de docTechnic
    const newDocTechnic = JSON.parse(JSON.stringify(docTechnic));

    // Filtrer et mettre à jour les scripts
    Object.keys(newDocTechnic.techDoc.scriptDoc).forEach((key) => {
      const script = newDocTechnic.techDoc.scriptDoc[key];

      if (rows.includes(script.rid)) {
        script.row = script.row.map((row) => {
          if (row.elem_id === eid.toString()) {
            return { ...row, code: newName };
          }
          return row;
        });
        script.row_compact = script.row_compact.map((row) => {
          if (row.elem_id === eid.toString()) {
            return { ...row, code: newName };
          }
          return row;
        });
        script.pseudo =
          script.pseudo &&
          script.pseudo.map((row) => {
            if (row.eid && row.eid === eid.toString()) {
              return { ...row, text: newName };
            }
            return row;
          });
      }
    });

    // Mettre à jour le nom dans elementsDoc, si applicable
    if (newDocTechnic.techDoc.elementsDoc) {
      Object.keys(newDocTechnic.techDoc.elementsDoc).forEach((key) => {
        const element = newDocTechnic.techDoc.elementsDoc[key];
        if (element.eid === eid.toString()) {
          element.name = newName;
        }
      });
    }
    setDocTechnic(newDocTechnic);
  }

  function newListeInDetailLinesCode(title, lineid) {
    const Scripts = Object.values(docTechnic.techDoc.scriptDoc);
    const key = title === "rows" ? "rid" : title === "blocks" ? "blkid" : null;

    let newDetailLinesCode = Scripts.filter(
      (item) => key && lineid.includes(item[key])
    );

    setDetailLinesCode(newDetailLinesCode);
  }
  return (
    <>
      {seeBoxDetailLineBlock && (
        <div className="BoxDetailLineBlock">
          <button
            className="close"
            onClick={() => setSeeBoxDetailLineBlock(false)}
          >
            X
          </button>
          <h3>Listes des lignes</h3>
          <div className="detailLinesCode">
            {detailLinesCode.map((lines) => {
              console.log(lines);
              return (
                <article
                  key={lines.rid}
                  onClick={() => BoardScrollToElementScript(lines.rid)}
                >
                  <div>
                    <p>Rows : {lines.rid}</p>
                    <p> Blocks : {lines.blkid}</p>
                  </div>
                  <br />
                  <p className="scriptLine">
                    <span>Code </span>
                    {lines.str_clean}
                  </p>
                  <br />
                  <p className="scriptLine">
                    <span>Pseudo code </span> {lines.str_pseudo}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      )}

      <div className="Board">
        {Object.values(board).map((items, i) => {
          const { eid, rows, blks } = items;
          const board = visibleColumn.map((column) => ({
            id: i,
            title: column.title,
            val: items[column.title.toLowerCase()],
            eid: eid,
            rows: rows,
          }));
          const getColumnByTitle = (searchTitle) => {
            return visibleColumn.find((column) => column.title === searchTitle);
          };
          const lineColor = tabSBoard.find((obj) => obj.id_b === eid);

          let rcolor = RandomColor();
          function columnClick() {
            if (lineColor) {
              const newArray = tabSBoard.filter((obj) => obj.id_b !== eid);
              setTabSBoard(newArray);
            } else {
              setTabSBoard([...tabSBoard, { id_b: eid, color: rcolor, rows }]);
            }
          }
          return (
            <div
              className="Colums"
              onClick={columnClick}
              key={i}
              style={
                lineColor
                  ? {
                      background: "none",
                      backgroundColor: lineColor.color,
                      color: "white",
                    }
                  : {}
              }
            >
              {board.map((elm, index) => {
                const { title, val, eid, rows } = elm;
                let poster = val;
                if (val === "NA" || val === false) {
                  poster = <Circle fill="#DA1E28" />;
                } else {
                  poster = <Circle fill="#11CF00" />;
                }
                if (
                  val !== "NA" &&
                  val !== "YES" &&
                  val !== false &&
                  val !== true
                ) {
                  poster = val;
                }

                let eye;
                const column = getColumnByTitle(title);
                if (title === "name") {
                  poster = (
                    <input
                      className="inputText"
                      type="text"
                      value={val}
                      onChange={(e) => HandleChangeNameBoard(e, eid, rows)}
                    />
                  );
                }
                if (column.see) {
                  eye = <EyeOpen />;
                } else {
                  eye = <EyeClose />;
                }

                return (
                  <div
                    className={i === 0 ? `${title} static` : " "}
                    style={{ display: column.see || allseeBoard ? "" : "none" }}
                    key={index + title}
                  >
                    {i === 0 && (
                      <div className="title">
                        <h6 className="fixed">{title}</h6>
                        <div
                          className="boxEyes"
                          onClick={() => SeeColums(title)}
                        >
                          {allseeBoard && eye}
                        </div>
                      </div>
                    )}

                    {i === 0 ? (
                      ""
                    ) : (
                      <div className="postbox">
                        {(title === "rows" || title === "blocks") &&
                        val?.length >= 3 ? (
                          <p
                            className="postArray"
                            onClick={() => {
                              setSeeBoxDetailLineBlock(true);
                              if (title === "rows") {
                                newListeInDetailLinesCode("rows", val);
                              }
                              if (title === "blocks") {
                                newListeInDetailLinesCode("blocks", val);
                              }
                            }}
                          >
                            {val[0]}
                            {val?.length === 2 ? (
                              <span>|</span>
                            ) : (
                              <span>&#123;..{val.length - 2} ..&#125;</span>
                            )}
                            {val[val.length - 1]}
                          </p>
                        ) : (
                          <p
                            onClick={() => {
                              if (title === "rows") {
                                BoardScrollToElementScript(val);
                              }
                            }}
                          >
                            {poster}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Board;
