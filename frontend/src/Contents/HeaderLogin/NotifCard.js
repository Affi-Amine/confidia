import React from "react";
import { useTranslation } from "react-i18next";
import ImgBox from "../../Components/ImgBox";
import useConfidiaDoc from "../../Store/useConfidiaDoc";
import { DiffDate } from "../../Utils/DateReq";
import { ReactComponent as WarningTriangle } from "../../assets/icons/SVG/warningTriangle.svg";
import { ReactComponent as X } from "../../assets/icons/SVG/x.svg";
import { useHistory } from "react-router-dom";
import useModalStore from "../../Store/useModalStore";

function NotifCard({ filterNotif }) {
  const { t } = useTranslation(["HeaderLogin"]);
  const { users } = useConfidiaDoc();
  const { setSeeSendMessage, setPrefillMessage } = useModalStore();
  const history = useHistory();
  return (
    <div className="CardsBox">
      {filterNotif.map((elem, idx) => {
        const { notification_title, created_at, notification_message, type, author_id } = elem;
        const durationText = DiffDate(created_at);
        const datafilter = users.find((user) => user.id_user === author_id);
        var message;
        var action;
        if (type === "activity") {
          message = t("Notifications.discover");
          action = () => history.push("/confidia-board/notifications");
        } else if (type === "message") {
          message = "Respond"
          action = () => {
            setSeeSendMessage(true);
            setPrefillMessage(datafilter.email);
          }
        } else if (type === "report") {
          message = ""
          action = () => history.push("/documentation-script");
        } else {
          message = t("Notifications.debug");
          action = () => history.push("/documentation-script");
        }
        return (
          <div className="Card" key={idx}>
            {type === "activity" || type === "message" ? ( 
              <ImgBox image={datafilter.image} />
            ) : (
              <WarningTriangle className="iconSvg" />
            )}

            <div>
              <h1>{notification_title}</h1>
              <p className="time">
                {t("Notifications.thereIs")}
                {" " + durationText}
              </p>
              <p className="message">{notification_message}</p>
              <button onClick={action}>
                {message}
              </button>
            </div>
            <X className="x" />
          </div>
        );
      })}
    </div>
  );
}

export default NotifCard;
