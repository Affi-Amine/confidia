import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

export const checkGroupMembership = async (accessToken) => {
    const response = await fetch("https://graph.microsoft.com/v1.0/me/memberOf", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const data = await response.json();
    return data.value.some(group => group.displayName === "premium");
};