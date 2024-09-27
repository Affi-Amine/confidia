import axios from "axios"; // Import axios for API calls
import { useMsal } from "@azure/msal-react";
import useUserProfile from "../Store/useUserProfile";

// Define the scopes needed for your API calls
const SCOPES = ["https://graph.microsoft.com/.default"]; // Adjust scopes as needed

// Custom hook to update Azure AD user extension
export function useUpdateAzureAdUserExtension() {
  const { accounts, instance } = useMsal();
  const { userData } = useUserProfile();

  // Function to get the access token
  const getAccessToken = async () => {
    const request = {
      scopes: SCOPES,
      account: accounts[0], // Use the first account
    };

    try {
      const response = await instance.acquireTokenSilent(request);
      return response.accessToken; // Return the access token
    } catch (error) {
      console.error("Error acquiring token silently: ", error);
      throw error; // Rethrow the error to handle it upstream if needed
    }
  };

  // Function to update user extension
  const updateUserExtension = async () => {
    // Get account data from the token or user data
    const accountData = accounts[0]?.idTokenClaims || userData[0]?.idTokenClaims;

    // Get the access token
    const accessToken = await getAccessToken(); // Retrieve the access token

    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: {
        // Your Azure AD extension property update
        extension_inscrite: 'true',
      },
      url: `https://graph.microsoft.com/v1.0/users/${accountData.oid}`, // Use the user's Object ID
    };

    try {
      await axios(requestOptions);
      console.log("Extension property updated successfully.");
    } catch (error) {
      console.error("Error updating extension property: ", error);
    }
  };

  return updateUserExtension; // Return the update function
}