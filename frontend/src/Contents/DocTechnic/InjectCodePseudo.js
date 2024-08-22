import useDocTechParam from "../../Store/useDocTechParam";

export default function InjectCodePseudo({ props }) {
  const {
    injCodeRef,
    HandleScrollSynchr,
    scriptCode,
    activeCompact,
    selectLine,
    tabSBoard,
    seeScriptCom,
    activeColor,
    selectOutput,
    selectInput,
  } = props;
  const { injcodeSeeCom, injcodeSeePC } = useDocTechParam();
  return (
    <div className="boxScript">
      <div className="Script codeTheme ">
        <div ref={injCodeRef} onScroll={HandleScrollSynchr}>
          {Object.values(scriptCode).map((Block, i) => {
            const {
              row,
              row_compact,
              rid,
              str_pseudo,
              user_comment,
              pseudo,
              blkid,
              elms_output,
              elms_input,
            } = Block;
            let CodesBlock;
            if (activeCompact === true) {
              CodesBlock = row_compact;
            } else {
              CodesBlock = row;
            }
            let CodesBlockPS;
            if (activeCompact === true) {
              CodesBlockPS = pseudo;
            } else {
              CodesBlockPS = pseudo;
            }

            let surline;
            // if (selectLine) {
            surline = tabSBoard.find((obj) => {
              if (obj.rows) {
                let match = obj.rows.some(
                  (row) => parseInt(rid) === parseInt(row)
                );
                return match;
              }
              return false;
            });
            // }
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
            let numLine1 = i * 3 + 1;
            let numLine2 = i * 3 + 2;
            let numLine3 = i * 3 + 3;
            if (!injcodeSeeCom) {
              numLine2 = i * 3 + 1;
              numLine3 = i * 3 + 2;
              // numLine3 = i * 3 + 3;
            } else if (!injcodeSeePC) {
              numLine1 = i * 3 + 1;
              numLine3 = i * 3 + 2;
            }

            return (
              <div className="doubleLineInj" key={i}>
                {/* Commentaire fonctionnel */}
                {injcodeSeeCom ? (
                  <div
                    className="line"
                    // key={`${i + user_comment}-user_comment`}
                    style={
                      selectLine && surline
                        ? { backgroundColor: surline.color }
                        : {}
                    }
                  >
                    <p className="num">{numLine1}</p>
                    <p className="word" style={{ color: "#bababa" }}>
                      {`# ${user_comment}`}
                    </p>
                  </div>
                ) : null}
                {/* Pseudo code */}
                {injcodeSeePC ? (
                  <div
                    className="line"
                    // key={`${i}${rid}-${blkid}-pseudoCode`}
                    style={
                      selectLine && surline
                        ? { backgroundColor: appThisStyle, color: "white" }
                        : { color: "#bababa" }
                    }
                  >
                    <p className="num">{numLine2}</p>
                    <div className="boxBodeLine">
                      {CodesBlockPS &&
                        CodesBlockPS.map((elm, index) => {
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

                          if (selectOutput === true && selectInput === false) {
                            if (elms_output.includes(eid)) {
                              appThisStyle =
                                surline !== undefined && surline.color;
                            }
                          } else if (
                            selectInput === true &&
                            selectOutput === false
                          ) {
                            if (elms_input.includes(eid)) {
                              appThisStyle =
                                surline !== undefined && surline.color;
                            }
                          } else {
                            appThisStyle =
                              surline !== undefined && surline.color;
                          }
                          return (
                            <pre
                              className="word"
                              key={`${rid}-${blkid}-${index}`}
                              style={
                                !selectLine && surline
                                  ? {
                                      backgroundColor: surline.color,
                                      color: activeColor ? color : "white",
                                    }
                                  : {
                                      color: activeColor ? color : "white",
                                    }
                              }
                            >
                              {index === 0 && str_pseudo !== "." && `# `}
                              {index === 0 && blkid + " - "}
                              {write + " "}
                            </pre>
                          );
                        })}
                    </div>
                  </div>
                ) : null}
                {/* Script code */}
                <div
                  className="line"
                  style={
                    selectLine && surline
                      ? { backgroundColor: surline.color }
                      : {}
                  }
                >
                  <p className="num">{numLine3}</p>
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
                      return (
                        <pre
                          className="word"
                          key={id1}
                          style={
                            !selectLine && surline
                              ? {
                                  backgroundColor: surline.color,
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
