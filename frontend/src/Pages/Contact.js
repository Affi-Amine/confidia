import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../sass/Pages/Contact.scss";

import useOpenLink from "../hooks/useOpenLink";

export default function Contact() {
  const { t } = useTranslation(["Contact"]);
  const [seeOptions, setSeeOptions] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    email: "",
    message: "",
  });
  const openLinkInNewPageByLangue = useOpenLink();

  let options = ["1", "2", "3"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  let mobile = (
    <div className="mobile">
      <div className="boxIcon">
        <FontAwesomeIcon className="icon" icon="fa-brands fa-linkedin" />
      </div>
      <div className="boxT">
        <h4>Linkedin</h4>
        <a
          className="AllSiteGlobalButtonUnderline"
          href="https://www.linkedin.com/company/dsfords/"
          target="_blank"
          rel="noopener noreferrer"
        >
          DS FOR DS
        </a>
      </div>
    </div>
  );
  let email = (
    <div className="email">
      <div className="boxIcon">
        <FontAwesomeIcon className="icon" icon="fa-solid fa-envelope" />
      </div>
      <div className="boxT">
        <h4>{t("email")}</h4>
        <a
          className="AllSiteGlobalButtonUnderline"
          href="mailto: confidia@dsfords.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          confidia@dsfords.com
        </a>
      </div>
    </div>
  );
  let location = (
    <div className="location">
      <div className="boxIcon">
        <FontAwesomeIcon className="icon" icon="fa-solid fa-location-dot" />
      </div>
      <div className="boxT">
        <h4>{t("address")}</h4>
        <a
          className="AllSiteGlobalButtonUnderline"
          href="https://www.bing.com/maps?mepi=23%7E%7ETopOfPage%7ELargeMapLink&ty=18&q=2+Rue+Gustave+Eiffel%2C+10430+Rosi%C3%A8res-pr%C3%A8s-Troyes&ppois=48.269854_4.073061_2+Rue+Gustave+Eiffel%2C+10430+Rosi%C3%A8res-pr%C3%A8s-Troyes_%7E&cp=48.26994%7E4.243469&v=2&sV=1&FORM=MIRE&qpvt=2%2C+rue+Gustave+Eiffel+10430+ROSIERES-PRES-TROYES&lvl=11.0"
          target="_blank"
          rel="noopener noreferrer"
        >
          2, rue Gustave Eiffel 10430 ROSIERES-PRES-TROYES (France)
        </a>
      </div>
    </div>
  );
  return (
    <div className="Contact">
      <h3>{t("Title")}</h3>
      <h1>
        {t("Subtitle.1")} <br /> {t("Subtitle.2")}
      </h1>
      <div className="Block1">
        <h2>
          {t("Block1.title.1")} <br /> {t("Block1.title.2")}
        </h2>
        <section>
          <div className="intro">
            <p>{t("Block1.desc.text1.1")}</p>
            <p>{t("Block1.desc.text2.1")}</p>
            <p>{t("Block1.desc.text3.1")}</p>
          </div>
          <div className="boxForm">
            <div className="BoxButtons">
              <button onClick={() => openLinkInNewPageByLangue("demo")}>
                <h4>
                  {t("Block1.linkBook.1")} <br /> {t("Block1.linkBook.2")}
                  <br />
                </h4>
                <FontAwesomeIcon
                  className="icon"
                  size="4x"
                  icon="fa-solid fa-calendar-days"
                />
              </button>
            </div>
          </div>
        </section>
        <div className="BoxButtons2">
          <button onClick={() => openLinkInNewPageByLangue("consulting")}>
            <FontAwesomeIcon className="icon2" icon="fa-solid fa-chart-line" />
            <p> {t("Buttons.2")}</p>
          </button>

          <button onClick={() => openLinkInNewPageByLangue("earlyAdopter")}>
            <FontAwesomeIcon className="icon2" icon="fa-solid fa-lightbulb" />
            <p>{t("Buttons.1")}</p>
          </button>
        </div>
      </div>
      <div className="Block3">
        {email}
        {mobile}
        {location}
      </div>
    </div>
  );
}
