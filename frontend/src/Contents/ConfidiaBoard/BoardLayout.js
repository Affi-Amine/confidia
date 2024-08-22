import React, { useEffect, useState } from "react";
import "../../sass/Contents/ConfidiaBoard/BoardLayout.scss";
import "../../sass/Components/Table.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { useTranslation } from "react-i18next";

const Sidebar = (props) => {
  const { t } = useTranslation(["ConfidiaBoard"]);
  return (
    <div className="HomeSidebar">
      {!props.mobile && <h5 className="OrgName">{props.orgName}</h5>}
      <ul className="SidebarNav">
        <li>
          <NavLink to={"/confidia-board/projects"}>
            <FontAwesomeIcon className="icon" icon="fa-solid fa-folder" />
            {!props.mobile && t("BoardLayout.projects")}
          </NavLink>
        </li>
        <li>
          <NavLink to={"/confidia-board/users"}>
            <FontAwesomeIcon className="icon" icon="fa-solid fa-user" />
            {!props.mobile && t("BoardLayout.users")}
          </NavLink>
        </li>
        <li>
          <NavLink to={"/confidia-board/connectors"}>
            <FontAwesomeIcon className="icon" icon="fa-solid fa-cubes" />
            {!props.mobile && t("BoardLayout.connectors")}
          </NavLink>
        </li>
        <li>
          <NavLink to={"/confidia-board/plan"}>
            <FontAwesomeIcon className="icon" icon="fa-solid fa-credit-card" />
            {!props.mobile && "Plan"}
          </NavLink>
        </li>
        <li>
          <NavLink to={"/confidia-board/documentation"}>
            <FontAwesomeIcon className="icon" icon="fa-solid fa-book" />
            {!props.mobile && "Documentation"}
          </NavLink>
        </li>
        <li>
          <NavLink to={"/confidia-board/notifications"}>
            <FontAwesomeIcon className="icon" icon="fa-solid fa-bell" />
            {!props.mobile && t("BoardLayout.notifications")}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default function BoardLayout({ children }) {
  const [mobile, setMobile] = useState(false);
  const { t } = useTranslation(["ConfidiaBoard"]);
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth <= 768) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return (
    <div className="BoardLayout">
      <Sidebar orgName="Organization" mobile={mobile} />
      <div className="HomeMain">
        <div className="MainTitle">
          <h3>{t("BoardLayout.dashboard")}</h3>
        </div>
        <div className="MainContent">
          {/* Content from here should depend on the section */}
          {children}
        </div>
      </div>
    </div>
  );
}
