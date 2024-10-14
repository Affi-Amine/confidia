import React, { Suspense, useEffect, useRef } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import "./App.css";
// Azure
import { AuthenticatedTemplate } from "@azure/msal-react";
import useMsalEventCallback from "./hooks/useMsalEventCallback.jsx";
// Pages
import {
  About,
  ActivityDetail,
  Advantages,
  Blogs,
  CGU,
  ConfidiaBoard,
  Contact,
  Dashboard,
  DocScript,
  DocTechnic,
  Evenements,
  Expositions,
  Freebies,
  HomeConfidia,
  HomeLogin,
  HomePage,
  LegalNotice,
  NotFound,
  Offer,
  QuizForm,
  Reglement24Q3,
  TechnicalSpecification,
  UserGuide,
  VideoDemo,
  WhiteBook,
  TestPage,
  PrivacyPolicy,
  DataProcessingInfoPage,
  FurtherDataInfoPage,
  TechnicalCookiesPage,
  OtherTypesCookiesPage,
} from "./Pages/indexFiles";
// Utils
import ScrollTop from "./Utils/ScrollTop";
// JSON
// Contexts
// Components
import { Footer, Header, HeaderLogin } from "./Components/index";
// Store
import useConfidiaDoc from "./Store/useConfidiaDoc.js";
import useGlobalParam from "./Store/useGlobalParam.js";
// Hooks
import usePageSession from "./hooks/usePageSession.jsx";
import useUserProfileWithReq from "./hooks/useUserProfileWithReq.jsx";

// Contents ConfidiaBoard
import { BrowserRouter as Router } from 'react-router-dom';
import AddConnector from "./Contents/ConfidiaBoard/AddConnector.js";
import AddNotification from "./Contents/ConfidiaBoard/AddNotification.js";
import AddUser from "./Contents/ConfidiaBoard/AddUser.js";
import Connectors from "./Contents/ConfidiaBoard/Connectors.js";
import EditConnector from "./Contents/ConfidiaBoard/EditConnector.js";
import EditProject from "./Contents/ConfidiaBoard/EditProject.js";
import EditUser from "./Contents/ConfidiaBoard/EditUser.js";
import NewProject from "./Contents/ConfidiaBoard/NewProject.js";
import Notifications from "./Contents/ConfidiaBoard/Notifications.js";
import Plans from "./Contents/ConfidiaBoard/Plans.js";
import Projects from "./Contents/ConfidiaBoard/Projects.js";
import Users from "./Contents/ConfidiaBoard/Users.js";
import ViewConnector from "./Contents/ConfidiaBoard/ViewConnector.js";
import ViewProject from "./Contents/ConfidiaBoard/ViewProject.js";
import ViewUser from "./Contents/ConfidiaBoard/ViewUser.js";


// Icon fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import ModalsContainer from "./Modals/ModalsContainer.js";

import { fontAwesomeIcons } from "./assets/awesomeIcon";
import VideoEvenements from "./Pages/Advantages/VideoEvenements.js";

library.add(fontAwesomeIcons);

export default function Pages() {
  useMsalEventCallback();
  useUserProfileWithReq();
  usePageSession();
  let accesEnv = ["TEST", "DEV"];
  const location = useLocation();
  const introRef = useRef();
  const currentHomePagePromiseOfValueRef = useRef();
  const currentHomePageOurteamsRef = useRef();
  const participateRef = useRef();

  const { dataKeepChoice } = useGlobalParam();

  // const { accounts } = useMsal();
  // console.log("accounts: ", accounts);

  const resetDocTechnic = useConfidiaDoc((s) => s.resetDocTechnic);

  useEffect(() => {
    // Efface les données en sortie de Confidia
    // Choix utilisateur a ne pas conservé les données
    const allowedPaths = [
      "/dashboard",
      "/documentation-technique",
      "/documentation-script",
      "/home-confidia",
      "/homeLogin-confidia",
    ];
    if (!dataKeepChoice && !allowedPaths.includes(location.pathname)) {
      resetDocTechnic([]);
    }
  }, [location.pathname, dataKeepChoice, resetDocTechnic]);

  const validPages = [
    "/",
    "/offer",
    "/CGU",
    "/contact",
    "/mentions-legal",
    "/specification-technique",
    "/Quiz",
    "/about",
    "/video-demonstration",
  ]; // Afficher le Header non login pour ces pages

  const validStartPages = ["Quiz", "QuizReglement"]; // Pages qui commencent par ces préfixes

  // Vérifie si le chemin est exactement dans la liste ou commence par un préfixe dans validStartPages
  let headerCondition =
    validPages.includes(location.pathname) ||
    validStartPages.some((prefix) =>
      location.pathname.startsWith(`/${prefix}`)
    );
  return (
    <div className="App">
      <ModalsContainer />
      <Suspense fallback={<p>Chargement...</p>}>
        {!headerCondition ? (
          <HeaderLogin />
        ) : (
          <Header
            currentHomePagePromiseOfValueRef={currentHomePagePromiseOfValueRef}
            currentHomePageOurteamsRef={currentHomePageOurteamsRef}
          />
        )}
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomePage
                introRef={introRef}
                participateRef={participateRef}
                currentHomePagePromiseOfValueRef={
                  currentHomePagePromiseOfValueRef
                }
                currentHomePageOurteamsRef={currentHomePageOurteamsRef}
              />
            )}
          />
          <Route path="/data-processing-info" component={DataProcessingInfoPage} />
          <Route path="/further-data-info" component={FurtherDataInfoPage} />
          <Route path="/technical-cookies" component={TechnicalCookiesPage} />
          <Route path="/other-types-cookies" component={OtherTypesCookiesPage} />
          <Route path="/policy" render={() => <PrivacyPolicy />} />
          <Route path="/testpage" component={TestPage} />
          <Route path="/offer" render={() => <Offer />} />
          <Route path="/CGU" render={() => <CGU />} />
          <Route path="/contact" render={() => <Contact />} />
          <Route path="/mentions-legal" render={() => <LegalNotice />} />
          <Route
            path="/specification-technique"
            render={() => <TechnicalSpecification />}
          />
          {/* <Route path="/privacy-policy" render={() => <Privacy />} /> */}

          <Route path="/about" render={() => <About />} />
          {/* <Route
                path="/confidia-demo"
                render={() => (
               
                    <Demo  /> 
                )}
              /> */}
          <Route path="/video-demonstration" render={() => <VideoDemo />} />
          <Route path="/Quiz/:id" render={() => <QuizForm />} />
          <Route path="/Quiz/24Q3-reglement" render={() => <Reglement24Q3 />} />
          <AuthenticatedTemplate>
            {accesEnv.includes(process.env.REACT_APP_ENVNAME) && (
              <Route path="/confidia-board/:path?">
                <ConfidiaBoard>
                  <Switch>
                    {/* Redirect root to /projects */}
                    <Route
                      exact
                      path="/confidia-board"
                      render={() => <Redirect to="/confidia-board/projects" />}
                    />
                    <Route
                      exact
                      path="/confidia-board/projects"
                      render={() => <Projects />}
                    />
                    <Route
                      exact
                      path="/confidia-board/projects/view/1"
                      render={() => <ViewProject />}
                    />
                    <Route
                      exact
                      path="/confidia-board/projects/edit/1"
                      render={() => <EditProject />}
                    />
                    <Route
                      path="/confidia-board/projects/new"
                      render={() => <NewProject />}
                    />
                    <Route
                      exact
                      path="/confidia-board/users"
                      render={() => <Users />}
                    />
                    <Route
                      exact
                      path="/confidia-board/notifications"
                      render={() => <Notifications />}
                    />
                    <Route
                      path="/confidia-board/notifications/new"
                      render={() => <AddNotification />}
                    />
                    <Route
                      path="/confidia-board/users/add"
                      render={() => <AddUser />}
                    />
                    <Route
                      path="/confidia-board/users/view/1"
                      render={() => <ViewUser />}
                    />
                    <Route
                      path="/confidia-board/users/edit/1"
                      render={() => <EditUser />}
                    />
                    <Route
                      exact
                      path="/confidia-board/connectors"
                      render={() => <Connectors />}
                    />
                    <Route
                      path="/confidia-board/connectors/add"
                      render={() => <AddConnector />}
                    />
                    <Route
                      path="/confidia-board/connectors/view/1"
                      render={() => <ViewConnector />}
                    />
                    <Route
                      path="/confidia-board/connectors/edit/1"
                      render={() => <EditConnector />}
                    />
                    <Route
                      path="/confidia-board/plan"
                      render={() => <Plans />}
                    />
                  </Switch>
                </ConfidiaBoard>
              </Route>
            )}
            <Route
              exact
              path="/community/expositions"
              render={() => <Expositions />}
            />
            <Route
              exact
              path="/community/expositions/activity/:id"
              render={() => <ActivityDetail />}
            />
            <Route exact path="/advantages" render={() => <Advantages />} />
            <Route
              exact
              path="/advantages/evenements"
              render={() => <Evenements />}
            />
            <Route exact path="/advantages/blogs" render={() => <Blogs />} />
            <Route
              exact
              path="/advantages/freebies"
              render={() => <Freebies />}
            />
            <Route
              exact
              path="/advantages/white-paper"
              render={() => <WhiteBook />}
            />
            <Route
              exact
              path="/advantages/videos-evenements/:id"
              render={() => <VideoEvenements />}
            />
            <Switch>
              {/* Route menant à HomeLogin.js */}
              <Route path="/homelogin" render={() => <HomeLogin />} />
              {/* Optionnel : rediriger tout le reste vers homelogin */}
              <Route path="/" exact component={HomeLogin} />
            </Switch>
            <Route path="/homeLogin-confidia" render={() => <HomeLogin />} />
            <Route path="/home-confidia" render={() => <HomeConfidia />} />
            <Route
              path="/dashboard"
              render={() => (
                <Dashboard
                  props={{
                    dataKeepChoice,
                  }}
                />
              )}
            />
            <Route
              path="/documentation-technique"
              render={() => (
                <DocTechnic
                  props={{
                    dataKeepChoice,
                  }}
                />
              )}
            />
            <Route
              path="/documentation-script"
              render={() => <DocScript props={{ dataKeepChoice }} />}
            />
            <Route path="/user-guide" render={() => <UserGuide />} />
          </AuthenticatedTemplate>
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
        <ScrollTop />
      </Suspense>
    </div>
  );
}
