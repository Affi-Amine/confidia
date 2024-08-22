import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react";
import throttle from "lodash/throttle";

import "../../sass/Contents/DocTechnic/PseudoCodeScript.scss";
export default function PseudoCodeScript({ props }) {
  const {
    psCodeRef,
    HandleScrollSynchr,
    activeCompact,
    selectLine,
    scriptCode,
    tabSBoard,
    selectOutput,
    selectInput,
    activeColor,
    seeScriptCom,
    linePsCodeRefs,
  } = props;
  const [tabSignalPS, setTabSignalPS] = useState([]); // Éléments sélectionnés dans le tableau
  const [seeResumSignalTan, setSeeResumSignalTab] = useState(false); // Voir la modal de résumer
  const [height, setHeight] = useState(340); // hauteur de la modal

  const updateHeight = (newHeight) => {
    if (newHeight >= 340 && newHeight <= window.innerHeight) {
      setHeight(newHeight);
    }
  };

  const handleResize = useCallback(
    throttle((event) => {
      const newHeight = event.clientY;
      if (newHeight >= 340 && newHeight <= window.innerHeight) {
        setHeight(newHeight);
      }
    }, 150),
    []
  );

  useEffect(() => {
    const handleWindowResize = () => {
      updateHeight(Math.min(height, window.innerHeight));
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [height]);

  function handleDocScriptChange(rid, newText, rowId) {
    const index = tabSignalPS.findIndex((item) => item.rid === rid);
    if (index !== -1) {
      const updatedTabSignalPS = [...tabSignalPS];
      updatedTabSignalPS[index].signal = newText;
      setTabSignalPS(updatedTabSignalPS);
    }
  }
  function handleRemoveItem(rid) {
    setTabSignalPS((currentTabSignalPS) =>
      currentTabSignalPS.filter((item) => item.rid !== rid)
    );
  }

  return (
    <div className="boxScript PseudoCodeScript">
      {tabSignalPS.length !== 0 && seeResumSignalTan && (
        <div
          className="boxResumTabSignalPs"
          style={{
            height: `${height}px`,
            display: "flex",
            flexDirection: "column",

            overflow: "hidden",
          }}
          onMouseDown={() => {
            document.addEventListener("mousemove", handleResize);
            document.addEventListener(
              "mouseup",
              () => {
                document.removeEventListener("mousemove", handleResize);
              },
              { once: true }
            );
          }}
        >
          <button className="close" onClick={() => setSeeResumSignalTab(false)}>
            X
          </button>
          <h4>Résumer des élèments signaler :</h4>
          <div
            className="listTab"
            style={{
              flexGrow: 1,
              overflowY: "auto",
            }}
          >
            {tabSignalPS.map((elem, i) => {
              return (
                <article key={elem.rid}>
                  <button
                    className="sup"
                    onClick={() => handleRemoveItem(elem.rid)}
                  >
                    <FontAwesomeIcon
                      className="icon"
                      icon="fa-solid fa-trash"
                    />
                  </button>
                  <div className="boxlines">
                    <p className="lineCode">{elem.rid + " | " + elem.code} </p>
                    <p className="linePsCode">
                      {elem.rid + " | " + elem.pseudo_code}
                    </p>
                  </div>
                  <textarea
                    value={elem.signal}
                    placeholder="Description"
                    onChange={(e) =>
                      handleDocScriptChange(elem.rid, e.target.value)
                    }
                  />
                </article>
              );
            })}
          </div>
          <div className="BoxButtons" style={{ marginTop: "auto" }}>
            <button
              className="validB"
              onClick={() => {
                setTabSignalPS([]);
                setSeeResumSignalTab(false);
              }}
            >
              Valider
            </button>
          </div>
        </div>
      )}
      {tabSignalPS.length !== 0 && (
        <div
          className="BoxCicleIcon"
          onClick={() => setSeeResumSignalTab(true)}
        >
          <FontAwesomeIcon
            className="icon"
            icon="fa-solid fa-circle-exclamation"
          />
        </div>
      )}
      <div className="Script pseudoTheme" style={{ color: "black" }}>
        <div ref={psCodeRef} onScroll={HandleScrollSynchr}>
          {Object.values(scriptCode).map((Block, i) => {
            const {
              row_compact,
              row,
              rid,
              elms_output,
              elms_input,
              pseudo,
              blkid,
            } = Block;
            let CodesBlock;
            if (activeCompact === true) {
              CodesBlock = pseudo;
            } else {
              CodesBlock = pseudo;
            }
            let surline;
            if (selectLine) {
              surline = tabSBoard.find((obj) => {
                if (obj.rows) {
                  let match = obj.rows.some(
                    (row) => parseInt(rid) === parseInt(row)
                  );
                  return match;
                }
                return false;
              });
            }
            let appThisStyle;

            const nonNullElemIds = activeCompact
              ? row_compact
                  .filter((obj) => obj.elem_id !== null)
                  .map((obj) => obj.elem_id)
              : row
                  .filter((obj) => obj.elem_id !== null)
                  .map((obj) => obj.elem_id);

            if (selectOutput === true && selectInput === false) {
              if (nonNullElemIds.some((id) => elms_output.includes(id))) {
                appThisStyle = surline !== undefined && surline.color;
              }
            } else if (selectInput === true && selectOutput === false) {
              if (nonNullElemIds.some((id) => elms_input.includes(id))) {
                appThisStyle = surline !== undefined && surline.color;
              }
            } else {
              appThisStyle = surline !== undefined && surline.color;
            }
            return (
              <div
                className="line"
                key={i}
                ref={(el) => {
                  linePsCodeRefs.current[`ps-${rid}`] = el;
                }}
                style={
                  selectLine && surline
                    ? { backgroundColor: appThisStyle, color: "white" }
                    : {
                        color: "black",
                      }
                }
              >
                <p className="num">
                  {tabSignalPS.some((objet) => objet.rid === rid) ? (
                    <button className="tabSelecSignalPS">
                      <p className="yesSignal"></p>
                    </button>
                  ) : (
                    <button
                      className="BtabSelecSignalPS"
                      onClick={() =>
                        setTabSignalPS([
                          ...tabSignalPS,
                          {
                            rid: rid,
                            code: row_compact
                              .map((row) => row.code || "")
                              .join(""),
                            pseudo_code:
                              pseudo !== null &&
                              blkid +
                                " - " +
                                pseudo.map((code) => code.text || "").join(" "),
                            signal: "",
                          },
                        ])
                      }
                    >
                      <p className="bSignalPS">!</p>
                    </button>
                  )}
                  {rid}
                </p>
                <div className="boxBodeLine">
                  {CodesBlock &&
                    CodesBlock.map((elm, index) => {
                      const { text, color, is_comment, id1, elem_id, eid } =
                        elm;
                      let write;
                      if (is_comment === true && seeScriptCom === false) {
                        write = "\n";
                      } else {
                        write = text;
                      }
                      let surline;

                      if (!selectLine) {
                        surline = tabSBoard.find((obj) => {
                          let match = false;
                          if (obj.rows) {
                            match = parseInt(obj.id_b) === parseInt(eid);
                          }
                          return match;
                        });
                      }

                      let appThisStyle;
                      let colorPstext = "black";

                      if (selectOutput === true && selectInput === false) {
                        if (elms_output.includes(eid)) {
                          appThisStyle = surline !== undefined && surline.color;
                          colorPstext = "white";
                        }
                      } else if (
                        selectInput === true &&
                        selectOutput === false
                      ) {
                        if (elms_input.includes(eid)) {
                          appThisStyle = surline !== undefined && surline.color;
                          colorPstext = "white";
                        }
                      } else {
                        appThisStyle = surline !== undefined && surline.color;
                        colorPstext = "white";
                      }
                      let appliqPSstyles = surline
                        ? {
                            background: appThisStyle,
                            color: colorPstext,
                          }
                        : {
                            color: "black",
                          };
                      return (
                        <pre
                          className="word"
                          key={`${rid}-${blkid}-${index}`}
                          style={
                            selectLine
                              ? { background: appThisStyle }
                              : appliqPSstyles
                          }
                        >
                          {index === 0 && blkid + " - "}
                          {write + " "}
                        </pre>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
