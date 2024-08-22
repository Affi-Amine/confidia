import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import BtnLogoLink from "../Components/BtnLogoLink";
import AvenirJson from "../JSON/Evenement/Avenir.json";
import AdvantagesModal from "../Modals/Advantages.modal";
import useOpenLink from "../hooks/useOpenLink";

import { default as BtnNavigate } from "../Components/BtnNavigate";
import useGlobalParam from "../Store/useGlobalParam";
import "../sass/Pages/Advantages.scss";

dayjs.extend(customParseFormat); // Utiliser le plugin de format personnalisé

function afficherProchainsEvenements(events) {
  const eventsWithDates = events.filter(
    (event) => event.date && dayjs(event.date, "DD/MM/YYYY", true).isValid()
  );

  const sortedEvents = eventsWithDates.sort((a, b) => {
    return dayjs(a.date, "DD/MM/YYYY").diff(dayjs(b.date, "DD/MM/YYYY"));
  });

  // Ajouter le premier événement sans date si nous n'avons pas 3 événements
  if (sortedEvents.length < 3) {
    const eventsWithoutDates = events.filter(
      (event) => !event.date || !dayjs(event.date, "DD/MM/YYYY", true).isValid()
    );

    while (sortedEvents.length < 3 && eventsWithoutDates.length > 0) {
      sortedEvents.push(eventsWithoutDates.shift());
    }
  }

  return sortedEvents.slice(0, 3);
}

export default function Advantages() {
  const { t } = useTranslation(["Advantages"]);

  const { language } = useGlobalParam();
  const [seeAdvantageModal, setSeeAdvantageModal] = useState(false);
  const [sendValidType, setSendValidType] = useState("");
  const [userSubScribe, setUserSubScribe] = useState(false);

  const dataEvents = afficherProchainsEvenements(AvenirJson);

  const offerConsulting = [
    { title: t("Desc.1"), desc: t(" ") }, // , spaceLine: true
    { title: t("Desc.2"), desc: t(" ") },
    { title: t("Desc.3"), desc: t(" ") },
  ];
  const openLinkInNewPageByLangue = useOpenLink();
  return (
    <div className="Advantages">
      {seeAdvantageModal && (
        <AdvantagesModal
          setSeeAdvantageModal={setSeeAdvantageModal}
          sendValidType={sendValidType}
          userSubScribe={userSubScribe}
          setUserSubScribe={setUserSubScribe}
        />
      )}
      <div className="AdvantagesDetailBlock">
        <h1>{t("T.1")}</h1>
        <h1>{t("T.2")}</h1>
        <div className="BoxButtons">
          <BtnNavigate
            path="/advantages/evenements"
            label={t("buttons.event")}
          />
          <BtnNavigate path="/advantages/blogs" label={t("buttons.blog")} />
          <BtnNavigate
            path="/advantages/freebies"
            label={t("buttons.freebies")}
          />
          <BtnNavigate
            path="/advantages/white-paper"
            label={t("buttons.whiteBook")}
          />
        </div>
      </div>
      <div className="EventBlock">
        <article>
          <h3>{t("T-event.1")}</h3>
          <div className="texts">
            {dataEvents.map((evenement) => {
              return (
                <div className="line" key={evenement.id}>
                  <span>
                    {evenement.date ? evenement.date : evenement.time}
                  </span>
                  <p>{evenement.eventName[language]}</p>
                </div>
              );
            })}
            {Array.from({ length: 3 - dataEvents.length }, (_, i) => (
              <div key={i} className="tranlateNoSelect line">
                <span>invisible</span>
                <p>invisible</p>
              </div>
            ))}
          </div>

          <div className="BoxButtons">
            <button
              onClick={() => {
                setSeeAdvantageModal(true);
                setSendValidType("email_newsletter");
              }}
            >
              <FontAwesomeIcon className="icon" icon="fa-solid fa-envelope" />
              {t("buttons.subNewsletters")}
            </button>
          </div>
        </article>
        <article>
          <h3>{t("T-event.2")}</h3>
          <div className="texts">
            {offerConsulting.map((offer, i) => {
              return (
                <div key={i} className="line">
                  <p>{offer.title}</p>
                  <span>
                    {offer.desc}
                    {offer.spaceLine && (
                      <span className="tranlateNoSelect">
                        <br />.
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="BoxButtons secondBTN">
            <button onClick={() => openLinkInNewPageByLangue("consulting")}>
              <FontAwesomeIcon className="icon" icon="fa-solid fa-chart-line" />
              {t("buttons.consulting")}
            </button>
          </div>
        </article>
      </div>
      <div className="boxLogo">
        <BtnLogoLink namelogo="meetup" />
        <BtnLogoLink namelogo="linkedin" />
      </div>
    </div>
  );
}
