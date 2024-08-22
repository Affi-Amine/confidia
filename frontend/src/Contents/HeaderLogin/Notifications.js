import React, { useState } from "react";
import { ReactComponent as BellIcon } from "../../assets/icons/SVG/bell.svg";
import "../../sass/Contents/HeaderLogin/Notifications.scss";

import { useTranslation } from "react-i18next";


import NotifCard from "./NotifCard";
import useNotifications from "../../Store/useNotifications";

function Notifications() {
  const { t } = useTranslation(["HeaderLogin"]);
  const { notifications } = useNotifications();
  const [filterNotif, setFilterNotif] = useState(notifications);
  const options = [
    { label: t("Notifications.types.all"), value: "all" },
    { label: "Activity", value: "activity" },
    { label: "Alert", value: "alert" },
    { label: "Message", value: "message" },
    { label: "Report", value: "report" },
  ];

  function SelectTypes(e) {
    let select = e.target.value;
    let filter;
    if (select === "all") {
      setFilterNotif(notifications);
    }
    if (select === "activity") {
      filter = notifications.filter((object) => object.type === "activity");
      setFilterNotif(filter);
    }
    if (select === "alert") {
      filter = notifications.filter((object) => object.type === "alert");
      setFilterNotif(filter);
    }
    if (select === "message") {
      filter = notifications.filter((object) => object.type === "message");
      setFilterNotif(filter);
    }
    if (select === "report") {
      filter = notifications.filter((object) => object.type === "report");
      setFilterNotif(filter);
    }
  }
  return (
    <div
      className="Notifications"
      // onMouseEnter={() => setFreezeOpenNotification(true)}
      // onMouseLeave={() => setFreezeOpenNotification(false)}
    >
      <div className="intro">
        <BellIcon className="bell" />

        <h2>{t("Notifications.title")}</h2>
        <h2>ALERTES</h2>
      </div>
      <p>{t("Notifications.consult")}</p>
      <div className="TypeSelect">
        <select name="TypeSelect" defaultValue="Types" onChange={SelectTypes}>
          {options.map((elm, i) => {
            const { label, value } = elm;
            return (
              <option className="option" key={i} value={value}>
                {label}
              </option>
            );
          })}
        </select>
      </div>

      {Array.isArray(filterNotif) && filterNotif.length > 0 ? (
        <NotifCard filterNotif={filterNotif} />
      ) : (
        <p className="NotNotif">{t("Notifications.notNotif")}</p>
      )}
    </div>
  );
}

export default Notifications;
