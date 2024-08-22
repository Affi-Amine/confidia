import { msalConfig } from "../authConfig.jsx";

/**
 *  This method stores the claims to the  localStorage in the browser to be used when acquiring a token
 * @param {String} claimsChallenge
 */
export const addClaimsToStorage = (claimsChallengeId, claims) => {
     localStorage.setItem(claimsChallengeId, claims);
};

/**
 * This method return the claims from  localStorage in the browser
 * @param {String} claimsChallengeId 
 * @returns 
 */
export const getClaimsFromStorage = (claimsChallengeId) => {
    return  localStorage.getItem(claimsChallengeId);
};

/**
 * This method clears localStorage of any claims challenge entry
 * @param {Object} account
 */
export const clearStorage = (account) => {
    if (!account || !account.idTokenClaims) return;
    const oid = account.idTokenClaims.oid;
    for (var key in  localStorage) {
        if (key.startsWith(`cc.${msalConfig.auth.clientId}.${oid}`)) {
             localStorage.removeItem(key);
        }
    }
};