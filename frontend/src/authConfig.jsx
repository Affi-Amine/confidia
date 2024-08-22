import { LogLevel } from "@azure/msal-browser";
 
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
export const msalConfig = {
    auth: {
        clientId: 'd4983a08-45dc-4861-b57c-2b897e74509f', // Remplacez par votre propre ID client.
        authority: b2cPolicies.authorities.signUpSignIn.authority,  // Utilisez votre politique d'inscription/connexion.
        knownAuthorities: [b2cPolicies.authorityDomain], // Domaine de votre tenant B2C.
        redirectUri: '/', // URI de redirection après la connexion.
        postLogoutRedirectUri: '/', // URI à laquelle naviguer après la déconnexion.
        navigateToLoginRequestUrl: false, // Ne naviguez pas vers l'URL de la demande de connexion après l'authentification.
    },
    cache: {
        cacheLocation: 'localStorage', // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        // console.error(message);
                        return;
                    case LogLevel.Info:
                        // console.info(message);
                        return;
                    case LogLevel.Verbose:
                        // console.debug(message);
                        return;
                    case LogLevel.Warning:
                        // console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
}; 
export const protectedResources = {
    apiTodoList: {
        endpoint: process.env.REACT_APP_FRONT_URL,
        scopes: {
            read: ['https://ConfidiaTestEntraIDB2C.onmicrosoft.com/tasks-api-d4983a08-45dc-4861-b57c-2b897e74509f/LectureTaches'],
            write: ['https://ConfidiaTestEntraIDB2C.onmicrosoft.com/tasks-api-d4983a08-45dc-4861-b57c-2b897e74509f/EcritureTache'],
        },
    },
}; 
export const loginRequest = {
    scopes: [...protectedResources.apiTodoList.scopes.read, ...protectedResources.apiTodoList.scopes.write],
};