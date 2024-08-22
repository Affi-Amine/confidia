import ReactPlayer from "react-player";
import { useHistory, useParams } from "react-router-dom";

import ReplayJson from "../../JSON/Evenement/Replay.json";
import useGlobalParam from "../../Store/useGlobalParam";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import AdvantageBtnNavtop from "../../Contents/Advantages/AdvantageBtnNavtop";
import "../../sass/Pages/Advantages/VideoEvenements.scss";

export default function VideoEvenements() {
  const { t } = useTranslation(["Advantages"]);
  const { id } = useParams();
  const { language } = useGlobalParam();
  const history = useHistory();
  const event = ReplayJson.find((e) => e.id === id);

  return (
    <div className="VideoEvenements">
      <AdvantageBtnNavtop namePage={"VideoEvenements"} />
      {event && event.replayUrl && (
        <section>
          <div className="videoContainer">
            <ReactPlayer
              url={event.replayUrl}
              width="100%"
              height="100%"
              controls
            />
          </div>
          <div className="detailsVideo">
            <article>
              <h3>{event.eventName[language]}</h3>
              <p className="theme">{event.theme[language]}</p>
              <TextDesc nameClass={"desciptionEvent"} Desc={event.descDetail} />
              <div className="box">
                {event.textActivityBTN && event.id_activity && (
                  <button
                    className="AllSiteGlobalButtonUnderline"
                    onClick={() =>
                      history.push(
                        `/community/expositions/activity/${event.id_activity}`
                      )
                    }
                  >
                    <FontAwesomeIcon
                      className="icon "
                      icon="fa-solid fa-burst"
                      color="#f64060"
                    />
                    {event.textActivityBTN[language]}
                  </button>
                )}
                <p className="dateEvent">
                  {event.date && (
                    <>
                      {event.date} <br />
                    </>
                  )}
                  {event.time && <span>{event.time}</span>}
                </p>
              </div>
            </article>
          </div>
        </section>
      )}
      <div className="boxReplay">
        <h6>{t("eventReplay.T")}</h6>
        <div className="listReplay">
          {ReplayJson.filter((e) => e.id !== id && e.replayUrl).map((elm) => {
            const { id, desc, date, time, eventName } = elm;

            return (
              <article
                key={elm.id}
                onClick={() =>
                  history.push(`/advantages/videos-evenements/${id}`)
                }
              >
                <p>{eventName[language]}</p>

                <div className="description">
                  {Array.isArray(desc[language]) ? (
                    desc[language].map((line, i) => {
                      return <pre key={i}>{line}</pre>;
                    })
                  ) : (
                    <pre>{desc[language]}</pre>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );

  function TextDesc({ nameClass, Desc }) {
    return (
      <div className="desciptionEvent">
        {Array.isArray(Desc[language]) ? (
          Desc[language].map((line, i) => {
            let firstChar = line[0];
            let secondChar = line[1];
            let paddingLeftValue = 0;
            let styles = {};

            if (!isNaN(firstChar) && secondChar === "•") {
              paddingLeftValue = Number(firstChar);
              line = line.substring(1).trim();

              styles = {
                paddingLeft: `${paddingLeftValue + 2}em`,
                paddingTop: "7px",
                textIndent: `-${paddingLeftValue + 10}px`,
              };
            }
            return (
              <pre style={styles} key={i}>
                {line === "" ? <br /> : <>{line}</>}
              </pre>
            );
          })
        ) : (
          <pre>{Desc[language]}</pre>
        )}
      </div>
    );
  }
}
