import React from "react";
import "../sass/Components/HeaderLogin.scss";

import TeamsProject from "../Contents/HeaderLogin/TeamsProject";

import NavBars from "../Contents/HeaderLogin/NavBars";
import Image from "../assets/img/Logo.png";

import { useHistory } from "react-router-dom";
import Notifications from "../Contents/HeaderLogin/Notifications";
import ProjectDetail from "../Contents/HeaderLogin/ProjectDetail";
import useConfidiaDoc from "../Store/useConfidiaDoc";
import useModalStore from "../Store/useModalStore";
import useNotifications from "../Store/useNotifications";
import { ReactComponent as BellIcon } from "../assets/icons/SVG/bell.svg";
import { ReactComponent as Green } from "../assets/icons/SVG/circle-green.svg";
import { ReactComponent as ElipseMenu } from "../assets/icons/SVG/elipseMenu.svg";
import MenuBurger from "./MenuBurger";
import User from "./User";

function HeaderLogin(props) {
  let history = useHistory();
  const {
    openProjectInfos,
    setOpenProjectInfos,
    openUpdateProjectInfos,
    setOpenUpdateProjectInfos,
    openNotifications,
    setOpenNotifications,
    openProjectSelect,
    setOpenProjectSelect,
    setSeeNewFeature,
    setSeeBadVersion,
  } = useModalStore();
  let accesEnv = ["TEST", "DEV"];
  const { user, users, allProjects } = useConfidiaDoc();
  const { dashboard } = useConfidiaDoc();
  const { notifications } = useNotifications();
  return (
    <div className="HeaderLogin">
      <div className="block1">
        <div className="ImageBox" onClick={() => history.push("/")}>
          <img src={Image} loading="lazy" alt="Logo confidia" />
        </div>
        <div
          className="navProject"
          onClick={() => {
            setSeeBadVersion(true);
            // setOpenProjectSelect(true);
          }}
        >
          <ElipseMenu />
          {openProjectSelect && <NavBars />}
        </div>
        {Object.keys(dashboard).length !== 0 && (
          <ProjectDetail project={dashboard} title={dashboard.name} />
        )}
      </div>
      <div className="block2">
        <TeamsProject />
        <div className="BoxNotif">
          <div
            className="BoxBell"
            onClick={() => {
              if (accesEnv.includes(process.env.REACT_APP_ENVNAME)) {
                setOpenNotifications(!openNotifications);
              } else {
                setSeeNewFeature(true);
              }
            }}
          >
            <BellIcon />
            {notifications && <Green className="green" />}
          </div>

          {openNotifications && (
            <Notifications
              openNotifications={openNotifications}
              setOpenNotifications={setOpenNotifications}
            />
          )}
        </div>
        <User />
        {/* <GlobalNav /> */}
        <MenuBurger />
      </div>
    </div>
  );
}

export default HeaderLogin;
