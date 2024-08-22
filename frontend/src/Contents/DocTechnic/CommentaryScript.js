import React, { Fragment } from "react";

export default function CommentaryScript({ props }) {
  const {
    boxComRef,
    HandleScrollSynchr,
    scriptCode,
    condtionnIjectCode,
    handleDocScriptChange,
    activeCompact,
    Scripts,
  } = props;
  return (
    <div className="BoxCom">
      <div ref={boxComRef} onScroll={HandleScrollSynchr}>
        {Object.values(scriptCode).map((Com, i) => {
          const { rid, split_list, user_comment, row, is_comments, is_blank } =
            Com;

          let lineSpace = (
            <div className="line" style={{ minHeight: "18px" }}></div>
          );
          if (!condtionnIjectCode) {
            if (row[0].code === "\n" || row[0].code === " \n" || is_comments) {
              return lineSpace;
            }
          }

          let WriteCom = (
            <input
              style={{ minWidth: `${user_comment.length + 1}ch` }}
              type="text"
              value={user_comment || " "}
              onChange={(e) =>
                handleDocScriptChange("comment", rid, e.target.value)
              }
            />
          );
          if (activeCompact && split_list) {
            let tab = Scripts.filter((script) =>
              split_list.includes(script.rid)
            );
            if (tab.length !== 0) {
              WriteCom = tab.map((elm, index) => {
                return (
                  <input
                    key={`Cominpmap-${Com.rid}-${index}`}
                    type="text"
                    style={{ minWidth: `${elm.user_comment.length}ch` }}
                    value={elm.user_comment || " "}
                    onChange={(e) =>
                      handleDocScriptChange("comment", elm.rid, e.target.value)
                    }
                  />
                );
              });
            }
          }

          return (
            <React.Fragment key={`ComFragment-${Com.rid}`}>
              {condtionnIjectCode ? (
                <div>
                  <div className="line">
                    <p
                      className="num"
                      styles={
                        i === 0
                          ? { color: "red ", minHeight: "18px" }
                          : undefined
                      }
                    >
                      {is_blank || is_comments ? "" : i * 2 + 1}
                    </p>
                    {is_blank || is_comments ? lineSpace : WriteCom}
                  </div>
                  {lineSpace}
                </div>
              ) : (
                <div className="line">
                  <p
                    className="num"
                    styles={i === 0 ? { color: "red " } : undefined}
                  >
                    {rid}
                  </p>
                  {WriteCom}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
