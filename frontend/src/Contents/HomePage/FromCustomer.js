import React from "react";
import { useTranslation } from "react-i18next";
import ImgBox from "../../Components/ImgBox";
import { openInNewTab } from "../../Utils/OpenInNewTab";
import "../../sass/Contents/HomePage/FromCustomer.scss";
// IMAGES
import imgInitiativeAube from "../../assets/img/Customer/Aube-Logo-Reseau_Initiative-RVB.png";
import imgBPIFRANCE from "../../assets/img/Customer/BPIFRANCE.jpg";
import imgLocanda from "../../assets/img/Customer/LaLocanda.jpg";
import imgReca from "../../assets/img/Customer/LogoRECA.png";
import imgTechAube from "../../assets/img/Customer/TechpoleAude.png";

export default function FromCustomer() {
  const { t } = useTranslation(["HomePage"]);

  const reviews = [
    {
      image: imgTechAube,
      text: "Technopole de l'Aube en Champagne",
      textUrl: [
        "Accueil - Technopole de l'Aube en Champagne",
        "(technopole-aube.fr)",
      ],
      siteUrl: "https://technopole-aube.fr/",
    },
    {
      image: imgReca,
      text: "Réseau Entreprendre CHAMPAGNE-ARDENNE",
      textUrl: ["Accueil - Réseau Entreprendre", "(reseau-entreprendre.org)"],
      siteUrl: "https://www.reseau-entreprendre.org/champagne-ardenne/",
    },
    {
      image: imgBPIFRANCE,
      text: "BPIFrance",
      textUrl: ["Accueil - BPI France", "(bpifrance-creation.fr)"],
      siteUrl: "https://bpifrance-creation.fr/",
      testimony: [t("FromCustomer.testimonials.1")],
    },
    {
      image: imgInitiativeAube,
      text: "Initiative Aube",
      textUrl: ["Accueil - Initiative Aube", "(initiative-aube.fr)"],
      siteUrl: "https://www.initiative-aube.fr/",
      testimony: [t("FromCustomer.testimonials.1")],
    },
    {
      image: imgLocanda,
      text: "La Locanda delle iDEE APS",
      textUrl: [
        "Accueil - La Locanda delle iDEE",
        "(lalocandadelleidee.altervista.org)",
      ],
      siteUrl:
        "https://lalocandadelleidee.altervista.org/?doing_wp_cron=1701872548.1093220710754394531250",
      testimony: [t("FromCustomer.testimonials.1")],
    },

    // {
    //   image: imgReca,
    //   text: "",
    //   textUrl: [""],
    //   siteUrl: "",
    // },
  ];
  const testimonys = [
    {
      image: imgTechAube,
      name: "Technopole de l'Aube en Champagne",
      testimony: [
        t("FromCustomer.testimonials.1"),
        t("FromCustomer.testimonials.1"),
      ],
    },
    {
      image: imgLocanda,
      name: "La Locanda delle iDEE APS",
      testimony: [t("FromCustomer.testimonials.1")],
    },
  ];
  return (
    <div className="FromCustomer">
      <section>
        <h2>{t("FromCustomer.T1")}</h2>
        <div className="BoxAllActicleC">
          {reviews.map((review, i) => (
            <BoxActicleC
              key={i}
              image={review.image}
              text={review.text}
              name={review.name}
              job={review.job}
              siteUrl={review.siteUrl}
              textUrl={review.textUrl}
              testimony={review.testimony}
              i={i}
            />
          ))}
        </div>
      </section>
      {/* <section>
        <h2>{t("FromCustomer.T2")}</h2>
        {testimonys.map((elm, i) => (
          <BoxTestimony
            key={i}
            image={elm.image}
            text={elm.text}
            testimony={elm.testimony}
            name={elm.name}
          />
        ))}
      </section> */}
    </div>
  );
}
function BoxTestimony({ testimony, image, name }) {
  return (
    <article className="BoxTestimony">
      <p className="ArtBox2">« {testimony} »</p>
      <div className="info">
        {image && <ImgBox image={image} descImage={name} />}
        <p className="name">- {name} -</p>
      </div>
    </article>
  );
}
function BoxActicleC({ i, image, text, name, job, siteUrl, textUrl }) {
  const { t } = useTranslation(["HomePage"]);
  return (
    <article className="BoxActicleC">
      <div className="block1">
        <ImgBox image={image} descImage={name} />
        <div className="BoxT">
          <h3 className="text">{text}</h3>
          <p className="name">{name}</p>
          <p className="job">
            <span>{job}</span>
          </p>
          <button
            className="AllSiteGlobalButtonUnderline"
            onClick={() => openInNewTab(siteUrl)}
          >
            {textUrl.map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < textUrl.length - 1 && <br />}
              </React.Fragment>
            ))}
          </button>
        </div>
      </div>
      {/* <div className="block2">
        {i === 0 && <h1>{t("FromCustomer.T2")}</h1>}
        <p className="ArtBox2">{testimony}</p>
      </div> */}
    </article>
  );
}
