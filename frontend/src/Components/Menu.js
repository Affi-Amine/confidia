import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import "../sass/Components/Menu.scss";

import { ReactComponent as DashboardImg } from "../assets/icons/SVG/dashboard.svg";
import { ReactComponent as BaliseImg } from "../assets/icons/SVG/balise.svg";
import { ReactComponent as PapersImg } from "../assets/icons/SVG/papers.svg";
import { ReactComponent as TestingImg } from "../assets/icons/SVG/testing.svg";
import useModalStore from "../Store/useModalStore";

function Menu() {
  let history = useHistory();
  const location = useLocation();
  const { t } = useTranslation(["HeaderLogin"]);
  const setSeeNewFeature = useModalStore((s) => s.setSeeNewFeature);
  const setSeeBadVersion = useModalStore((s) => s.setSeeBadVersion);

  let colorEnter = { fill: "#155E75", stroke: "white" };
  let colorLeave = { fill: "white", stroke: "#155E75" };
  const [dashboardColor, setDashBoardColor] = useState(colorLeave);
  const [baliseColor, setBaliseColor] = useState(colorLeave);
  const [paperColor, setPaperColor] = useState(colorLeave);
  const [testingColor, setTestingColor] = useState(colorLeave);
  return (
    <div className="Menu">
      <div
        className="buttonDashboard"
        onMouseEnter={() => setDashBoardColor(colorEnter)}
        onMouseLeave={() => setDashBoardColor(colorLeave)}
        onClick={() => {
          history.push("/dashboard");
        }}
      >
        <DashboardImg
          className="icon"
          fill={
            location.pathname === "/dashboard"
              ? colorEnter.fill
              : dashboardColor.fill
          }
          stroke={
            location.pathname === "/dashboard"
              ? colorEnter.stroke
              : dashboardColor.stroke
          }
        />
        <p className="menuText">{t("Menu.dashboard")}</p>
      </div>
      <div
        className="buttonDocTechnic"
        onMouseEnter={() => setBaliseColor(colorEnter)}
        onMouseLeave={() => setBaliseColor(colorLeave)}
        onClick={() => {
          history.push("/documentation-technique");
        }}
      >
        <BaliseImg
          className="icon"
          fill={
            location.pathname === "/documentation-technique"
              ? colorEnter.fill
              : baliseColor.fill
          }
          stroke={
            location.pathname === "/documentation-technique"
              ? colorEnter.stroke
              : baliseColor.stroke
          }
        />
        <p className="menuText">{t("Menu.docTechnic")}</p>
      </div>
      <div
        className="buttonUserGuide"
        onMouseEnter={() => setPaperColor(colorEnter)}
        onMouseLeave={() => setPaperColor(colorLeave)}
        onClick={() => {
          //  history.push("/user-guide");
          setSeeNewFeature(true);
        }}
      >
        <PapersImg
          className="icon"
          fill={
            location.pathname === "user-guide"
              ? colorEnter.fill
              : paperColor.fill
          }
          stroke={
            location.pathname === "user-guide"
              ? colorEnter.stroke
              : paperColor.stroke
          }
        />
        <p className="menuText">{t("Menu.userGuide")}</p>
      </div>
      <div
        onMouseEnter={() => setTestingColor(colorEnter)}
        onMouseLeave={() => setTestingColor(colorLeave)}
        onClick={() => {
          //  history.push("/dashboard");
          setSeeNewFeature(true);
        }}
      >
        <TestingImg
          className="icon"
          fill={testingColor.fill}
          stroke={testingColor.stroke}
        />
        <p className="menuText">{t("Menu.testing")}</p>
      </div>
    </div>
  );
}

export default Menu;
