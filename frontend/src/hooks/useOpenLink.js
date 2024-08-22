// src/hooks/useOpenLink.js
import useGlobalParam from "../Store/useGlobalParam";
import { openInNewTab } from "../Utils/OpenInNewTab";

{
  /*
    const openLinkInNewPageByLangue = useOpenLink();

   openLinkInNewPageByLangue("demo")
   openLinkInNewPageByLangue("consulting")
   openLinkInNewPageByLangue("earlyAdopter")
   */
}
const urls = {
  demo: {
    fr: "https://outlook.office365.com/owa/calendar/ConfidIA_FR@dsfords.fr/bookings/s/_gP1AMwhnUirYz9nuKlzfw2",
    en: "https://outlook.office365.com/owa/calendar/ConfidIA_EN@dsfords.fr/bookings/s/cBm-BAcPVkOJsZt3ElD1Ug2",
    it: "https://outlook.office365.com/owa/calendar/ConfidIA_IT@dsfords.fr/bookings/s/OdEd9x_nEUqeXBOAeqdtxw2",
  },
  consulting: {
    fr: "https://outlook.office365.com/owa/calendar/ConfidIA_FR@dsfords.fr/bookings/s/Eja_6BJgDEun7_yuG5NcCQ2",
    en: "https://outlook.office365.com/owa/calendar/ConfidIA_EN@dsfords.fr/bookings/s/MWgo0XGb5EKcXgOWEraA8w2",
    it: "https://outlook.office365.com/owa/calendar/ConfidIA_IT@dsfords.fr/bookings/s/14iLFRTha0i2Cc3mf5OOxQ2",
  },
  earlyAdopter: {
    fr: "https://outlook.office365.com/owa/calendar/ConfidIA_FR@dsfords.fr/bookings/s/BsSY6YHZg0OR0pqSxRaosg2",
    en: "https://outlook.office365.com/owa/calendar/ConfidIA_EN@dsfords.fr/bookings/s/jumLtJSzbkSCLNGuRL75Mg2",
    it: "https://outlook.office365.com/owa/calendar/ConfidIA_IT@dsfords.fr/bookings/s/SEisNBtriUiHBs4JlcJFhQ2",
  },
};

const useOpenLink = () => {
  const { language } = useGlobalParam();

  const openLinkInNewPageByLangue = (key) => {
    const nameObjLink = urls[key] || urls.default;

    if (!nameObjLink[language]) {
      console.error(`URL not found for key: ${key} and language: ${language}`);
      return;
    }

    openInNewTab(nameObjLink[language]);
  };

  return openLinkInNewPageByLangue;
};

export default useOpenLink;
