import { LogLevel } from "@azure/msal-browser";

// Define B2C policies and authorities
export const b2cPolicies = {
    names: {
        signUpSignIn: 'B2C_1_RegisterTestDSFORDS',
        forgotPassword: 'B2C_1_Test_reset_password_Confidia',
        editProfile: 'B2C_1_edit_profileTestConfidia',
    },
    authorities: {
        signUpSignIn: {
            authority: 'https://ConfidiaTestEntraIDB2C.b2clogin.com/ConfidiaTestEntraIDB2C.onmicrosoft.com/B2C_1_RegisterTestDSFORDS',
        },
        forgotPassword: {
            authority: 'https://ConfidiaTestEntraIDB2C.b2clogin.com/ConfidiaTestEntraIDB2C.onmicrosoft.com/B2C_1_Test_reset_password_Confidia',
        },
        editProfile: {
            authority: 'https://ConfidiaTestEntraIDB2C.b2clogin.com/ConfidiaTestEntraIDB2C.onmicrosoft.com/B2C_1_edit_profileTestConfidia',
        },
    },
    authorityDomain: 'ConfidiaTestEntraIDB2C.b2clogin.com',
};

// MSAL configuration
export const msalConfig = {
    auth: {
        clientId: 'd4983a08-45dc-4861-b57c-2b897e74509f', // Replace with your client ID
        authority: b2cPolicies.authorities.signUpSignIn.authority,  // Use your sign-up/sign-in policy
        knownAuthorities: [b2cPolicies.authorityDomain], // Your B2C tenant domain
        redirectUri: '/', // Redirect URI after login
        postLogoutRedirectUri: '/', // Redirect URI after logout
        navigateToLoginRequestUrl: false, // Do not navigate to request URL after login
    },
    cache: {
        cacheLocation: 'localStorage', // Use localStorage for SSO between tabs
        storeAuthStateInCookie: false, // Set to true if you have issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        // Uncomment to enable logging
                        // console.error(message);
                        return;
                    case LogLevel.Info:
                        // Uncomment to enable logging
                        // console.info(message);
                        return;
                    case LogLevel.Verbose:
                        // Uncomment to enable logging
                        // console.debug(message);
                        return;
                    case LogLevel.Warning:
                        // Uncomment to enable logging
                        // console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};

// Define protected resources
export const protectedResources = {
    apiTodoList: {
        endpoint: process.env.REACT_APP_FRONT_URL, // Ensure this is defined in your environment
        scopes: {
            read: ['https://ConfidiaTestEntraIDB2C.onmicrosoft.com/tasks-api-d4983a08-45dc-4861-b57c-2b897e74509f/LectureTaches'],
            write: ['https://ConfidiaTestEntraIDB2C.onmicrosoft.com/tasks-api-d4983a08-45dc-4861-b57c-2b897e74509f/EcritureTache'],
        },
    },
};

// Define login request scopes
export const loginRequest = {
    scopes: [...protectedResources.apiTodoList.scopes.read, ...protectedResources.apiTodoList.scopes.write],
};