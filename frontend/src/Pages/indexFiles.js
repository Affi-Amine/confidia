import React from "react";
import About from "./About";
import Contact from "./Contact";
import HomePage from "./HomePage";
import TechnicalSpecification from "./TechnicalSpecification";

// Lazy imports pour les autres composants

const Demo = React.lazy(() => import("./Demo"));
const Dashboard = React.lazy(() => import("./Dashboard"));
const DocTechnic = React.lazy(() => import("./DocTechnic"));
const NotFound = React.lazy(() => import("./NotFound"));
const Privacy = React.lazy(() => import("./Privacy"));
const UserGuide = React.lazy(() => import("./UserGuide"));
const VideoDemo = React.lazy(() => import("./VideoDemo"));
const DocScript = React.lazy(() => import("./DocScript"));
const CGU = React.lazy(() => import("./CGU"));
const HomeConfidia = React.lazy(() => import("./HomeConfidia"));
const HomeLogin = React.lazy(() => import("./HomeLogin"));
const Offer = React.lazy(() => import("./Offer"));
const LegalNotice = React.lazy(() => import("./LegalNotices"));
const ConfidiaBoard = React.lazy(() => import("./ConfidiaBoard"));
const Advantages = React.lazy(() => import("./Advantages"));
const Blogs = React.lazy(() => import("./Advantages/Blogs"));
const Evenements = React.lazy(() => import("./Advantages/Evenements"));
const Freebies = React.lazy(() => import("./Advantages/Freebies"));
const WhiteBook = React.lazy(() => import("./Advantages/WhiteBook"));
const VideoEvenements = React.lazy(() =>
  import("./Advantages/VideoEvenements")
);
const Expositions = React.lazy(() => import("./Community/Expositions"));
const ActivityDetail = React.lazy(() =>
  import("./Community/ActivityDetail.js")
);
const QuizForm = React.lazy(() => import("./Quiz/QuizForm.js"));
const Reglement24Q3 = React.lazy(() =>
  import("./Quiz/Reglements/Reglement24Q3.js")
);
const TestPage = React.lazy(() => import("./TestPage"));

export {
  About,
  ActivityDetail,
  Advantages,
  Blogs,
  CGU,
  ConfidiaBoard,
  Contact,
  Dashboard,
  Demo,
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
  Privacy,
  QuizForm,
  Reglement24Q3,
  TechnicalSpecification,
  UserGuide,
  VideoDemo,
  VideoEvenements,
  WhiteBook,
  TestPage
};
