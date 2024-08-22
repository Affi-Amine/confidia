import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { openInNewTab } from "../Utils/OpenInNewTab";
{
  /*
<BtnLogoLink namelogo="meetup" />
<BtnLogoLink namelogo="linkedin" /> 
 */
}
export default function BtnLogoLink({ namelogo }) {
  const logo = {
    meetup: (
      <FontAwesomeIcon className="icon meetup" icon="fa-brands fa-meetup" />
    ),
    linkedin: (
      <FontAwesomeIcon
        className="icon linkdin"
        icon="fa-brands fa-linkedin"
        onClick={() =>
          openInNewTab("https://www.linkedin.com/company/dsfords/")
        }
      />
    ),
  };
  return logo[namelogo] || null;
}
