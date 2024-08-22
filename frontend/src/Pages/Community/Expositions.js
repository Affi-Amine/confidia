import React from "react";
import { useTranslation } from "react-i18next";
import ImgBox from "../../Components/ImgBox";
import ActivityJson from "../../JSON/Activity/Activities.json";
import useGlobalParam from "../../Store/useGlobalParam";

import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "../../sass/Pages/Community/Expositions.scss";

export default function Expositions() {
  const { t } = useTranslation(["Community"]);

  return (
    <div className="Expositions">
      <h1>{t("Expositions.T")}</h1>
      <h3>{t("Expositions.st")}</h3>
      <section className="BoxActivity">
        {ActivityJson.map((activity) => (
          <Activities activity={activity} />
        ))}
      </section>
    </div>
  );
}

function Activities({ activity }) {
  const { language } = useGlobalParam();
  const { t } = useTranslation([""]);
  const history = useHistory();

  return (
    <article key={activity.id}>
      <ImgBox
        image={`/images/Activity/${activity.image}`}
        descImage={activity.NameActivity}
      />
      <div className="texts">
        <h6>{activity.NameActivity}</h6>
        <div className="description">
          {Array.isArray(activity.desc[language]) ? (
            activity.desc[language].map((line, i) => {
              return <pre key={i}>{line}</pre>;
            })
          ) : (
            <pre>{activity.desc[language]}</pre>
          )}
        </div>
        <button
          className="AllSiteGlobalButtonUnderline"
          onClick={() =>
            history.push(`/community/expositions/activity/${activity.id}`)
          }
        >
          {t("translation:ButtonsGlobals.LearnMore")}
        </button>
      </div>
    </article>
  );
}
