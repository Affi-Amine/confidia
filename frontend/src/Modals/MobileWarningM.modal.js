import React, { useEffect, useState } from "react";
import "../sass/Modals/MobileWarningM.scss";
import { useTranslation } from "react-i18next";
export default function MobileWarningM() {
  const { t } = useTranslation(["Modal"]);
  //   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  //   useEffect(() => {
  //     const handleResize = () => {
  //       setIsMobile(window.innerWidth <= 768);
  //     };

  //     window.addEventListener("resize", handleResize);

  //     // Nettoyage
  //     return () => {
  //       window.removeEventListener("resize", handleResize);
  //     };
  //   }, []);
  //   if (!isMobile) return null;
  return (
    <div className="MobileWarningM">
      <p>{t("MobileWarningM.message")}</p>
    </div>
  );
}
