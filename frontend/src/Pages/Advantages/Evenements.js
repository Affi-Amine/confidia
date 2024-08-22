import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { openInNewTab } from "../../Utils/OpenInNewTab";

import ImgBox from "../../Components/ImgBox";
import AdvantageBtnNav from "../../Contents/Advantages/AdvantageBtnNav";
import AdvantageBtnNavtop from "../../Contents/Advantages/AdvantageBtnNavtop";
import AvenirJson from "../../JSON/Evenement/Avenir.json";
import ReplayJson from "../../JSON/Evenement/Replay.json";
import useGlobalParam from "../../Store/useGlobalParam";

import "../../sass/Pages/Advantages/Evenements.scss";

export default function Evenements() {
  const { t } = useTranslation(["Advantages"]);
  const { language } = useGlobalParam();
  const [seePart, setSeePart] = useState("Avenir");
  const history = useHistory();

  const activeButtonStyle = (part) => ({
    backgroundColor: seePart === part ? "#0c71c3" : undefined,
    color: seePart === part ? "white" : undefined,
    cursor: seePart === part ? "default" : undefined,
  });

  const renderEventDetails = (events) =>
    events.map((elem) => (
      <EventDetail
        key={elem.id}
        keyArticle={elem.id}
        seePart={seePart}
        timeEvent={elem.time}
        title={elem.eventName[language]}
        linkBlog={elem.adress}
        descEvent={elem.desc[language]}
        dateEvent={elem.date}
        lieuEvent={elem.lieu}
        video={elem.video}
        meetuplink={elem.meetuplink}
        imagesEvent={elem.image}
        replayUrl={elem.replayUrl}
        history={history}
        id_activity={elem.id_activity}
        redirectLinkSubscribe={elem.redirectLinkSubscribe}
      />
    ));

  return (
    <div className="Evenements">
      <AdvantageBtnNavtop />
      <h1>{t("T-event.3")}</h1>
      <div className="BoxButtons eventNav">
        <button
          style={activeButtonStyle("Avenir")}
          onClick={() => setSeePart("Avenir")}
        >
          {t("T-event.5")}
        </button>
        <button
          style={activeButtonStyle("replay")}
          onClick={() => setSeePart("replay")}
        >
          {t("T-event.4")}
        </button>
      </div>
      {seePart === "Avenir" && (
        <section>{renderEventDetails(AvenirJson)}</section>
      )}
      {seePart === "replay" && (
        <section>{renderEventDetails(ReplayJson)}</section>
      )}
      <AdvantageBtnNav namePage="event" />
    </div>
  );
}

function EventDetail({
  keyArticle,
  title,
  linkBlog,
  descEvent,
  dateEvent,
  lieuEvent,
  seePart,
  timeEvent,
  meetuplink,
  imagesEvent,
  replayUrl,
  history,
  id_activity,
  redirectLinkSubscribe,
}) {
  const { t } = useTranslation(["Advantages"]);
  let urlnavVideo = replayUrl
    ? `/advantages/videos-evenements/${keyArticle}`
    : null;
  let accesEnv = ["TEST", "DEV"];
  return (
    <article key={keyArticle}>
      {imagesEvent && (
        <ImgBox
          image={`/images/Evenements/${imagesEvent}`}
          navImgHistory={urlnavVideo}
        />
      )}
      <div className="texts">
        <div className="top">
          <p className="dateEvent">
            {dateEvent} <br />
            {timeEvent && <span>{timeEvent}</span>}
          </p>
          <p className="lieu">
            {lieuEvent}
            {linkBlog && (
              <FontAwesomeIcon
                onClick={() => openInNewTab(linkBlog)}
                className="icon"
                icon="fa-solid fa-location-dot"
              />
            )}

            {seePart === "replay" && replayUrl && (
              <FontAwesomeIcon
                className="icon"
                icon="fa-solid fa-video"
                onClick={() =>
                  history.push(`/advantages/videos-evenements/${keyArticle}`)
                }
              />
            )}
          </p>
        </div>

        <h6>{title}</h6>

        <div className="description">
          {Array.isArray(descEvent) ? (
            descEvent.map((line, i) => {
              return <pre key={i}>{line}</pre>;
            })
          ) : (
            <pre>{descEvent}</pre>
          )}
        </div>

        {redirectLinkSubscribe && seePart !== "replay" && (
          <button
            className="AllSiteGlobalButtonUnderline BTNsubscrib"
            onClick={() => openInNewTab(redirectLinkSubscribe)}
          >
            {t("translation:ButtonsConnect.subscrib")}
          </button>
        )}

        <div className="boxLogo">
          {meetuplink && (
            <button>
              <FontAwesomeIcon
                className="icon meetup"
                icon="fa-brands fa-meetup"
              />
            </button>
          )}
          {id_activity && accesEnv.includes(process.env.REACT_APP_ENVNAME) && (
            <button
              className="icon activity"
              onClick={() =>
                history.push(`/community/expositions/activity/${id_activity}`)
              }
            >
              <FontAwesomeIcon
                className="icon "
                icon="fa-solid fa-burst"
                color="#f64060"
              />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
