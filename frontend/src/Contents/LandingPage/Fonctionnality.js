import React, { useState } from "react";
import "../../sass/Contents/LandingPage/Fonctionnality.scss";
import { useTranslation } from "react-i18next";

import image from "../../assets/HomePage/saas.png";
import BoxFonctionnality from "../TechnicalSpecification/BoxFonctionnality";

function Fonctionnality() {
  const { t } = useTranslation(["LandingPage"]);

  // Data dans le json public LandingPage Array envoyer dans "listeObjet"
  const DocTechnic = [
    {
      title: "DocCode",
      desc: ["desc1", "desc2", "desc3", "desc4", "desc5", "desc6", "desc7"],
      image: image,
      seeScrollBar: true,
    },
    {
      title: "DocDataStruct",
      desc: ["desc1", "desc2", "desc3"],
      image: image,
      seeScrollBar: false,
    },
    {
      title: "DocSemiStructData",
      desc: ["desc1", "desc2", "desc3", "desc4"],
      image: image,
      seeScrollBar: false,
    },
    {
      title: "DocProject",
      desc: ["desc1", "desc2"],
      image: image,
      seeScrollBar: false,
    },
    {
      title: "FunctionaEnrichment",
      desc: ["desc1"],
      image: image,
      seeScrollBar: false,
    },
  ];
  // Array envoyer dans "listeObjet"
  const Doc = [
    {
      title: "Doc1",
      desc: ["desc1", "desc2", "desc3", "desc4", "desc5", "desc6", "desc7"],
      image: image,
      seeScrollBar: false,
    },
    {
      title: "Doc2",
      desc: ["desc1", "desc2", "desc3"],
      image: image,
      seeScrollBar: false,
    },
    {
      title: "Doc3",
      desc: ["desc1", "desc2", "desc3", "desc4"],
      image: image,
      seeScrollBar: false,
    },
    {
      title: "Doc4",
      desc: ["desc1", "desc2"],
      image: image,
      seeScrollBar: false,
    },
    {
      title: "Doc5",
      desc: ["desc1"],
      image: image,
      seeScrollBar: false,
    },
  ];
  // Contient le chemin d'emplacement dans le JSON "LandingPage" en titre un array si dessus ainsi que le chemain du block sélectionner dans le JSON
  const listeObj = [
    {
      state: useState(true),
      title: "AllFonctionnality.DocTechnic.title",
      dataDoc: DocTechnic,
      jsonPart: "AllFonctionnality.DocTechnic",
    },
    {
      state: useState(false),
      title: "AllFonctionnality.DocTest.title",
      dataDoc: Doc,
      jsonPart: "AllFonctionnality.DocTest",
    },
    {
      state: useState(false),
      title: "AllFonctionnality.DocTest.title",
      dataDoc: Doc,
      jsonPart: "AllFonctionnality.DocTest",
    },
  ];

  function HandleClickButtonCarousel(index) {
    console.log(listeObj);

    //Met tout les states à false

    listeObj.forEach((number, i) => {
      number.state[1](false);
    });

    // Met le state sélectioner à true pour afficher tout les documents
    if (listeObj[index]) {
      listeObj[index].state[1](true);
    }
  }

  return (
    <div className="Fonctionnality">
      <h1>{t("AllFonctionnality.Title")}</h1>
      <div className="BoxCarousel">
        {listeObj.map((elem, i) => {
          const { dataDoc, jsonPart, title, state } = elem;
          return (
            <>
              {state[0] === true && (
                <div className="Carousel">
                  <h2 key={i}>{t(`${title}`)}</h2>
                  <BoxFonctionnality
                    BoxId={"LandingPageAllFonctionnalityCarousel"}
                    boxData={dataDoc}
                    jsonPart={`${jsonPart}`}
                  />
                </div>
              )}
            </>
          );
        })}
      </div>
      <div className="selectButton">
        {listeObj.map((select, index) => {
          return (
            <div
              key={index}
              className="selectedCarousel"
              //
              // A finir: diminuer l'opacité quand le state est true
              //
              //
              // {listeObj[index].state === true && ""}
              //
              //
              //
              //

              onClick={() => HandleClickButtonCarousel(+index)}
            >
              O
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Fonctionnality;
