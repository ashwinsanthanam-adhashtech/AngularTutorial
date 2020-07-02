import { AuthConfig } from 'angular-oauth2-oidc';
 
export const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'https://accounts.google.com/o/oauth2',

  // URL of the SPA to redirect the user to after login
  redirectUri: 'http://localhost:4200',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: '1012967069498-auq9gbl6rigsku6eq4tms67oqud1seo0.apps.googleusercontent.com',

  // Just needed if your auth server demands a secret. In general, this
  // is a sign that the auth server is not configured with SPAs in mind
  // and it might not enforce further best practices vital for security
  // such applications.
  // dummyClientSecret: 'secret',

  responseType: 'code',

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  scope: 'openid profile email offline_access api',

  showDebugInformation: true,
};