import React from "react";
import Iubenda from "react-iubenda-policy";
import { useScript } from "../hooks/useScript";

// function PrivacyPolicy() {
//   const myPolicy = 90624318;
//   useEffect(() => {
//     const script = document.createElement("script");
//     // script.src = "URL"; // Remplacez par l'URL du script fourni par iubenda
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);
//   return (
//     <div>
//       <h2>Politique de Confidentialité</h2>
//       <div id="iubenda-policy"></div>
//       {/* Cette div pourrait être remplacée par un autre identifiant/élément HTML que iubenda utilise pour injecter le contenu de la politique. */}
//     </div>
//   );
// }
function PrivacyPolicy() {
  const scriptUrl = ""; // Mettre l'url du script
  useScript(scriptUrl);

  return (
    <div>
      <h2>Politique de Confidentialité</h2>
      <div id="iubenda-policy">{scriptUrl}</div>
    </div>
  );
}
function Privacy() {
  const myPolicy = 90624318;
  return (
    <div className="Privacy">
      <Iubenda id={myPolicy} />

      <Iubenda id={myPolicy} type="terms-and-conditions" styling="nostyle">
        Terms and conditions
      </Iubenda>

      <Iubenda id={myPolicy} type="privacy" styling="white">
        Privacy Policy
      </Iubenda>

      <Iubenda id={myPolicy} type="cookie" styling="black">
        Cookie Policy
      </Iubenda>

      <h1>Notre Politique de Confidentialité</h1>
      <PrivacyPolicy />
    </div>
  );
}

export default Privacy;
