import { useMsal } from "@azure/msal-react";
import useUserProfile from "../Store/useUserProfile";
import { isEmailAuthorized } from "../Utils/isEmailAuthorized";
import BoardLayout from "../Contents/ConfidiaBoard/BoardLayout";

export default function ConfidiaBoard({ children }) {
  const { accounts } = useMsal();
  const { userData } = useUserProfile();
  const accountData = accounts[0]?.idTokenClaims || userData[0]?.idTokenClaims;
  if (!accountData) return null;
  return (
    <div>
      {isEmailAuthorized(accountData.emails[0]) && (
        <BoardLayout>
          {children}
        </BoardLayout>
      )}
    </div>
  );
}
