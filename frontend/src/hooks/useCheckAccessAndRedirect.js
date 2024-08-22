import { useMsal } from "@azure/msal-react";
import { useHistory } from "react-router-dom";
import useGlobalParam from "../Store/useGlobalParam";
import useModalStore from "../Store/useModalStore";
import useUserProfile from "../Store/useUserProfile";
import { checkAccess } from "../Utils/accessUtils";
import { isEmailEarlyAdopterAuthorized } from "../Utils/isEmailAuthorized";

const useCheckAccessAndRedirect = () => {
  const history = useHistory();
  const { accounts } = useMsal();
  const { userData, AccessType } = useUserProfile();
  const accountData = accounts[0]?.idTokenClaims || userData[0]?.idTokenClaims;

  const { setSeeLimitedOfferM, setSeeEarlyAdopterM } = useModalStore();
  const { userEarlyAdopterCode } = useGlobalParam();

  // const urls = [
  //   "https://dsfords.",
  //   "https://dsfords.",
  //   // "http://localhost:3000/",
  // ];
  const urls = process.env.REACT_APP_ACCEPTED_URL_STARTWITH.split(",");

  if (!accountData) return null;

  const checkAccessAndRedirect = () => {
    if (
      urls.some((url) => window.location.href.startsWith(url)) ||
      isEmailEarlyAdopterAuthorized(
        accountData.emails[0],
        userEarlyAdopterCode
      ) === true
    ) {
      if (checkAccess(AccessType)) {
        history.push("/documentation-script");
      } else {
        setSeeLimitedOfferM(true);
      }
    } else {
      setSeeEarlyAdopterM(true);
    }
  };

  return checkAccessAndRedirect;
};

export default useCheckAccessAndRedirect;
