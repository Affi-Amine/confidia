// DLO-1007
import React from "react";
import "../../sass/Contents/HomePage/SaveTime.scss";
import SaveTimeBox from "../../Components/SaveTimeBox";
import { useTranslation } from "react-i18next";
import iaEthique from "../../assets/HomePage/spaceWork.png";
import sunglasse from "../../assets/HomePage/glassesLaptopo.png";
function SaveTime() {
  const { t } = useTranslation(["HomePage"]);
  let BoxTitle1 = ["DocAutoCode.title1", "DocAutoCode.title2"];
  let BoxTitle2 = ["IAEthic.title1"];
  let textBox1 = [
    "DocAutoCode.desc1",
    "DocAutoCode.desc2",
    "DocAutoCode.desc3",
  ];
  let textBox2 = ["IAEthic.desc1", "IAEthic.desc2", "IAEthic.desc3"];
  return (
    <div className="SaveTime">
      <div className="Title">
        <h2>{t("SaveTime.title1")}</h2>
        <h2>
          {t("SaveTime.title2")}
          <span>{t("SaveTime.tSpan1")}</span>
          {t("SaveTime.ts2")}
        </h2>
        <h2>
          {t("SaveTime.title3")}
          <span>{t("SaveTime.tSpan2")}</span>
        </h2>
        <h2>
          {t("SaveTime.title5")} <span>{t("SaveTime.tSpan3")}</span>
        </h2>
      </div>

      <div className="box2">
        <SaveTimeBox
          image={sunglasse}
          imgdesc={t("SaveTime.DocAutoCode.title1")}
          boxTitle={BoxTitle1}
          boxText={textBox1}
        />
        <SaveTimeBox
          image={iaEthique}
          imgdesc={t("SaveTime.IAEthic.title1")}
          boxTitle={BoxTitle2}
          boxText={textBox2}
        />
      </div>
    </div>
  );
}

export default SaveTime;
