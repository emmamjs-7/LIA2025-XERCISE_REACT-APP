import { Configuration } from '@azure/msal-browser'

export const MSAL_AUTH_AUTHORITY_TENANT_ID = "removed" // If you want this, you should set up your own auth-service on azure
export const MSAL_AUTH_CLIENT_ID = "removed" // If you want this, you should set up your own auth-service on azure

export const msalConfig: Configuration = {
    auth: {
        clientId: MSAL_AUTH_CLIENT_ID || '',
        authority: MSAL_AUTH_AUTHORITY_TENANT_ID || '',
        redirectUri: process.env.REACT_APP_REDIRECT_URI || '',
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false,
    },
}

export const loginRequest = {
    scopes: ['User.Read'],
}