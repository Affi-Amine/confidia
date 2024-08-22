import React, { useEffect, useState } from "react";

export default function CodeScriptComposant({ props }) {
  const {
    scriptCode,
    tabSBoard,
    inCodeRef,
    HandleScrollSynchr,
    activeCompact,
    seeCode,
    seeScriptCom,
    selectLine,
    selectOutput,
    selectInput,
    activeColor,
    lineScriptCodeRefs,
  } = props;

  return (
    <div className="boxScript">
      <div className="Script codeTheme">
        <div ref={inCodeRef} onScroll={HandleScrollSynchr}>
          {Object.values(scriptCode).map((Block, i) => {
            const { row, row_compact, rid, str, elms_output, elms_input } =
              Block;
            let CodesBlock;
            if (activeCompact === true) {
              CodesBlock = row_compact;
            } else {
              CodesBlock = row;
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

            const nonNullElemIds = CodesBlock.filter(
              (obj) => obj.elem_id !== null
            ).map((obj) => obj.elem_id);
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
                  lineScriptCodeRefs.current[`sc-${rid}`] = el;
                }}
                style={
                  selectLine && surline ? { backgroundColor: appThisStyle } : {}
                }
              >
                <p className="num">{rid}</p>
                <div className="boxBodeLine">
                  {CodesBlock.map((elm, index) => {
                    const { code, color, is_comment, id1, elem_id } = elm;
                    let write;
                    if (is_comment === true && seeScriptCom === false) {
                      write = "\n";
                    } else {
                      write = code;
                    }
                    let surline;

                    if (!selectLine) {
                      surline = tabSBoard.find((obj) => {
                        let match = false;
                        if (obj.rows) {
                          match = parseInt(obj.id_b) === parseInt(elem_id);
                        }
                        return match;
                      });
                    }

                    let appThisStyle;

                    if (selectOutput === true && selectInput === false) {
                      if (elms_output.includes(elem_id)) {
                        appThisStyle = surline !== undefined && surline.color;
                      }
                    } else if (selectInput === true && selectOutput === false) {
                      if (elms_input.includes(elem_id)) {
                        appThisStyle = surline !== undefined && surline.color;
                      }
                    } else {
                      appThisStyle = surline !== undefined && surline.color;
                    }
                    return (
                      <pre
                        className="word"
                        key={id1}
                        style={
                          !selectLine && surline
                            ? {
                                backgroundColor: appThisStyle,
                                color: activeColor ? color : "white",
                              }
                            : {
                                color: activeColor ? color : "white",
                              }
                        }
                      >
                        {write}
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
