import { useMsal } from "@azure/msal-react";
import { useHistory } from "react-router-dom";
import useGlobalParam from "../Store/useGlobalParam";
import useModalStore from "../Store/useModalStore";
import useUserProfile from "../Store/useUserProfile";
import { checkAccess } from "../Utils/accessUtils";
import { isEmailAuthorized } from "../Utils/isEmailAuthorized"; // Import updated function

const useCheckAccessAndRedirect = () => {
  const history = useHistory();
  const { accounts } = useMsal();
  const { userData, AccessType } = useUserProfile();
  const accountData = accounts[0]?.idTokenClaims || userData[0]?.idTokenClaims;

  const { setSeeLimitedOfferM, setSeeEarlyAdopterM } = useModalStore();
  const { userEarlyAdopterCode } = useGlobalParam();

  const urls = process.env.REACT_APP_ACCEPTED_URL_STARTWITH.split(",");

  if (!accountData) return null;

  const checkAccessAndRedirect = async () => {
    // Check if the email is authorized
    const isAuthorized = await isEmailAuthorized(accountData.emails[0]);

    if (
      urls.some((url) => window.location.href.startsWith(url)) ||
      isAuthorized
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