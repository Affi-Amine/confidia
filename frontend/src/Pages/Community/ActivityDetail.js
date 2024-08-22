import React, { useState } from "react";
import { useParams } from "react-router-dom";

import ActivityJson from "../../JSON/Activity/Activities.json";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import ImgBox from "../../Components/ImgBox";
import useGlobalParam from "../../Store/useGlobalParam";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../sass/Pages/Community/ActivityDetail.scss";

export default function ActivityDetail() {
  const { t } = useTranslation(["Community"]);
  const { id } = useParams();
  const history = useHistory();
  const { language } = useGlobalParam();
  const [currentIndex, setCurrentIndex] = useState(0);

  const activity = ActivityJson.find((e) => e.id === id);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === activity.participants.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? activity.participants.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="ActivityDetail">
      <h1>{activity.NameActivity}</h1>

      <section className="Activity">
        <ImgBox
          image={`/images/Activity/${activity.image}`}
          descImage={activity.NameActivity}
        />

        <div className="description">
          {Array.isArray(activity.descDetail[language]) ? (
            activity.descDetail[language].map((line, i) => {
              return <pre key={i}>{line}</pre>;
            })
          ) : (
            <pre>{activity.descDetail[language]}</pre>
          )}
        </div>
      </section>

      {activity.winner && (
        <section className="BoxWinner">
          <h4>{activity.winner[language]}</h4>

          {activity.idReplayVideos && (
            <div className="BoxButton">
              <button
                onClick={() =>
                  history.push(
                    `/advantages/videos-evenements/${activity.idReplayVideos}`
                  )
                }
              >
                <FontAwesomeIcon icon="fa-brands fa-youtube" />
              </button>
            </div>
          )}
        </section>
      )}

      <section className="BoxParticipants">
        <div className="carrouselParticipant">
          <ImgBox
            image={`/images/Activity/Participants/${activity.participants[currentIndex].image}`}
            descImage={activity.participants[currentIndex].name}
          />

          <div className="BoxButton">
            <button className="arrow left" onClick={handlePrev}>
              <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
            </button>

            <div className="BoxCircle">
              {activity.participants.map((elem, i) => {
                return (
                  <FontAwesomeIcon
                    key={elem.id}
                    className="circle"
                    icon="fa-solid fa-circle"
                    style={
                      elem.id === activity.participants[currentIndex].id
                        ? { color: "white", cursor: "default" }
                        : { color: "gray" }
                    }
                    onClick={() => setCurrentIndex(i)}
                  />
                );
              })}
            </div>

            <button className="arrow right" onClick={handleNext}>
              <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
            </button>
          </div>
        </div>

        <div className="BoxTexts">
          <h3>{activity.participants[currentIndex].name}</h3>

          <div className="description">
            {Array.isArray(activity.participants[currentIndex].text) ? (
              activity.participants[currentIndex].text.map((line, i) => {
                return <pre key={i}>{line}</pre>;
              })
            ) : (
              <pre>{activity.participants[currentIndex].text}</pre>
            )}
          </div>
        </div>
      </section>

      {ActivityJson.length >= 2 && (
        <section className="boxOtherActivity">
          <h5>{t("Expositions.otherActivity")}</h5>
          <div className="listeActivities">
            {ActivityJson.filter((e) => e.id !== id).map((elm) => {
              const { id, desc, NameActivity } = elm;
              return (
                <article
                  key={id}
                  onClick={() =>
                    history.push(`/community/expositions/activity/${id}`)
                  }
                >
                  <p>{NameActivity}</p>{" "}
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
        </section>
      )}
    </div>
  );
}
