import React from "react";
import { useTranslation } from "react-i18next";
import "../../sass/Contents/DetailsOffers.scss";

export default function DetailsOffers() {
  const { t } = useTranslation(["Offer"]);
  const offer1 = [
    {
      name: t("DetailsOffer.O1.1.t"),
      target: t("DetailsOffer.O1.1.target"),
      price:
        t("DetailsOffer.O1.1.price") + " " + t("DetailsOffer.O1.1.typePrice"),
      elems: [t("DetailsOffer.O1.1.elm.1")],
    },
    {
      name: t("DetailsOffer.O1.2.t"),
      target: t("DetailsOffer.O1.2.target"),
      price:
        t("DetailsOffer.O1.2.price") + " " + t("DetailsOffer.O1.2.typePrice"),
      elems: [
        t("DetailsOffer.O1.2.elm.1"),
        t("DetailsOffer.O1.2.elm.2"),
        t("DetailsOffer.O1.2.elm.3"),
        t("DetailsOffer.O1.2.elm.4"),
        t("DetailsOffer.O1.2.elm.5"),
        [
          { color: "colorOffer1", text: t("DetailsOffer.O1.2.elm.6.1") },
          { text: t("DetailsOffer.O1.2.elm.6.2") },
        ],
      ],
    },
    {
      name: t("DetailsOffer.O1.3.t"),
      target: t("DetailsOffer.O1.3.target"),
      price:
        t("DetailsOffer.O1.3.price") + " " + t("DetailsOffer.O1.3.typePrice"),
      elems: [
        t("DetailsOffer.O1.3.elm.1"),
        t("DetailsOffer.O1.3.elm.2"),
        t("DetailsOffer.O1.3.elm.3"),
        t("DetailsOffer.O1.3.elm.4"),
        t("DetailsOffer.O1.3.elm.5"),
        [
          { color: "colorOffer1", text: t("DetailsOffer.O1.3.elm.6.1") },
          { text: t("DetailsOffer.O1.3.elm.6.2") },
        ],
        [
          { color: "colorOffer1", text: t("DetailsOffer.O1.3.elm.7.1") },
          { text: t("DetailsOffer.O1.3.elm.7.2") },
        ],
        [
          { color: "colorOffer1", text: t("DetailsOffer.O1.3.elm.8.1") },
          { text: t("DetailsOffer.O1.3.elm.8.2") },
        ],
        [
          { color: "colorOffer1", text: t("DetailsOffer.O1.3.elm.9.1") },
          { text: t("DetailsOffer.O1.3.elm.9.2") },
        ],
        [
          { color: "colorOffer1", text: t("DetailsOffer.O1.3.elm.10.1") },
          { text: t("DetailsOffer.O1.3.elm.10.2") },
        ],
        t("DetailsOffer.O1.3.elm.11"),
        t("DetailsOffer.O1.3.elm.12"),
        t("DetailsOffer.O1.3.elm.13"),
      ],
    },
  ];
  const offer2 = [
    {
      name: t("DetailsOffer.O2.1.t"),
      target: t("DetailsOffer.O2.1.target"),
      price:
        t("DetailsOffer.O2.1.price") + " " + t("DetailsOffer.O2.1.typePrice"),
      elems: [
        t("DetailsOffer.O2.1.elm.1"),
        t("DetailsOffer.O2.1.elm.2"),
        t("DetailsOffer.O2.1.elm.3"),
        t("DetailsOffer.O2.1.elm.4"),
        t("DetailsOffer.O2.1.elm.5"),
        [
          { color: "colorOffer1", text: t("DetailsOffer.O2.1.elm.6.1") },
          { text: t("DetailsOffer.O2.1.elm.6.2") },
        ],
        [
          { color: "colorOffer1", text: t("DetailsOffer.O2.1.elm.7.1") },
          { text: t("DetailsOffer.O2.1.elm.7.2") },
        ],
        [
          { color: "colorOffer1", text: t("DetailsOffer.O2.1.elm.8.1") },
          { text: t("DetailsOffer.O2.1.elm.8.2") },
        ],
        [
          { color: "colorOffer1", text: t("DetailsOffer.O2.1.elm.9.1") },
          { text: t("DetailsOffer.O2.1.elm.9.2") },
        ],
        [
          { color: "colorOffer1", text: t("DetailsOffer.O2.1.elm.10.1") },
          { text: t("DetailsOffer.O2.1.elm.10.2") },
        ],
        t("DetailsOffer.O2.1.elm.11"),
      ],
    },
    {
      name: t("DetailsOffer.O2.2.t"),
      target: t("DetailsOffer.O2.2.target"),
      price:
        t("DetailsOffer.O2.2.price") + " " + t("DetailsOffer.O2.2.typePrice"),
      elems: [
        t("DetailsOffer.O2.2.elm.1"),
        t("DetailsOffer.O2.2.elm.2"),
        t("DetailsOffer.O2.2.elm.3"),
        t("DetailsOffer.O2.2.elm.4"),
        t("DetailsOffer.O2.2.elm.5"),
        [
          { color: "colorOffer1", text: t("DetailsOffer.O2.2.elm.6.1") },
          { text: t("DetailsOffer.O2.2.elm.6.2") },
        ],
        [
          { color: "colorOffer1", text: t("DetailsOffer.O2.2.elm.7.1") },
          { text: t("DetailsOffer.O2.2.elm.7.2") },
        ],
        [
          { color: "colorOffer1", text: t("DetailsOffer.O2.2.elm.8.1") },
          { text: t("DetailsOffer.O2.2.elm.8.2") },
        ],
        [
          { color: "colorOffer1", text: t("DetailsOffer.O2.2.elm.9.1") },
          { text: t("DetailsOffer.O2.2.elm.9.2") },
        ],
        [
          { color: "colorOffer1", text: t("DetailsOffer.O2.2.elm.10.1") },
          { text: t("DetailsOffer.O2.2.elm.10.2") },
        ],
        [
          { text: t("DetailsOffer.O2.2.elm.11.1") },
          { color: "colorOffer1", text: t("DetailsOffer.O2.2.elm.11.2") },
          { text: t("DetailsOffer.O2.2.elm.11.3") },
        ],
        [
          { color: "colorOffer1", text: t("DetailsOffer.O2.2.elm.12.1") },
          { text: t("DetailsOffer.O2.2.elm.12.2") },
        ],
        [
          { color: "colorOffer1", text: t("DetailsOffer.O2.2.elm.13.1") },
          { text: t("DetailsOffer.O2.2.elm.13.2") },
        ],
      ],
    },
    {
      name: t("DetailsOffer.O2.3.t"),
      target: t("DetailsOffer.O2.3.target"),
      price:
        t("DetailsOffer.O2.3.price") + " " + t("DetailsOffer.O2.3.typePrice"),
      elems: [
        t("DetailsOffer.O2.3.elm.1"),
        t("DetailsOffer.O2.3.elm.2"),
        t("DetailsOffer.O2.3.elm.3"),
        t("DetailsOffer.O2.3.elm.4"),
        t("DetailsOffer.O2.3.elm.5"),
        [
          { text: t("DetailsOffer.O2.3.elm.6.1") },
          { color: "colorOffer2", text: t("DetailsOffer.O2.3.elm.6.2") },
        ],
        [
          { color: "colorOffer2", text: t("DetailsOffer.O2.3.elm.7.1") },
          { text: t("DetailsOffer.O2.3.elm.7.2") },
          { color: "colorOffer2", text: t("DetailsOffer.O2.3.elm.7.3") },
          { text: t("DetailsOffer.O2.3.elm.7.4") },
        ],
        [
          { color: "colorOffer2", text: t("DetailsOffer.O2.3.elm.8.1") },
          { text: t("DetailsOffer.O2.3.elm.8.2") },
        ],
        [
          { color: "colorOffer2", text: t("DetailsOffer.O2.3.elm.9.1") },
          { text: t("DetailsOffer.O2.3.elm.9.2") },
        ],
        [
          { color: "colorOffer2", text: t("DetailsOffer.O2.3.elm.10.1") },
          { text: t("DetailsOffer.O2.3.elm.10.2") },
        ],
        [
          { text: t("DetailsOffer.O2.3.elm.11.1") },
          { color: "colorOffer2", text: t("DetailsOffer.O2.3.elm.11.2") },
          { text: t("DetailsOffer.O2.3.elm.11.3") },
        ],
        [
          { color: "colorOffer2", text: t("DetailsOffer.O2.3.elm.12.1") },
          { text: t("DetailsOffer.O2.3.elm.12.2") },
        ],
        [
          { text: t("DetailsOffer.O2.3.elm.13.1") },
          { color: "colorOffer2", text: t("DetailsOffer.O2.3.elm.13.2") },
        ],
        [
          { color: "colorOffer2", text: t("DetailsOffer.O2.3.elm.14.1") },
          { text: t("DetailsOffer.O2.3.elm.14.2") },
        ],
      ],
    },
  ];

  return (
    <section className="DetailsOffers">
      <div className="BoxOffer">
        <button className="btn-dark btn-offer">{t("DetailsOffer.O1.T")}</button>
        {offer1.map((offer, i) => (
          <MoreOfferDetails
            key={i}
            name={offer.name}
            target={offer.target}
            price={offer.price}
            elems={offer.elems}
          />
        ))}
      </div>

      <div className="BoxOffer">
        <button className=" btn-dark btn-offer">
          {t("DetailsOffer.O2.T")}
        </button>
        {offer2.map((offer, i) => (
          <MoreOfferDetails
            key={i}
            name={offer.name}
            target={offer.target}
            price={offer.price}
            elems={offer.elems}
          />
        ))}
      </div>
    </section>
  );
}
function MoreOfferDetails({ name, target, price, elems, keyArticle }) {
  const renderElem = (elem, index) => {
    if (Array.isArray(elem)) {
      // Vérifie si elem est un tableau pour concaténer les textes avec styles spécifiques
      return (
        <p key={index}>
          {elem.map((subElem, subIndex) => (
            <span key={subIndex} className={subElem.color || ""}>
              {subElem.text}
            </span>
          ))}
        </p>
      );
    }

    return <p key={index}>{elem}</p>;
  };

  return (
    <article>
      <h3>{name}</h3>
      <h6>{target}</h6>
      <p className="price">
        <span>€ </span>
        {price}
      </p>
      <div className="bar"></div>
      <div className="Elems">{elems.map(renderElem)}</div>
    </article>
  );
}
