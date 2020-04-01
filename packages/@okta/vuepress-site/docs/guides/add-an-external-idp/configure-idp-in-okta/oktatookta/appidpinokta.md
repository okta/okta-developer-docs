In the **General Settings** section:

* **Name** &#8212; Enter the name that you would expect to see on a button, such as **Sign in with MyOktaOrg**.
* **Client Id** &#8212; Paste the client ID that you obtained from the Okta org that represents the Identity Provider in the <GuideLink link="../create-an-app-at-idp">previous section</GuideLink>. 
* **Client Secret** &#8212; Paste the secret that you obtained in the <GuideLink link="../create-an-app-at-idp">previous section</GuideLink>. 
* **Scopes** &#8212; Leave the defaults. These scopes are included when your Okta org makes a request to the other Okta org that represents the Identity Provider.

    By default, Okta requires the `email` attribute for a user. The `email` scope is required to create and link the user to Okta's Universal Directory. 

In the **Endpoints** section:

Add the following endpoint URLs for the Okta Identity Provider that you are configuring. In the Okta org that represents the Identity Provider, you can find the endpoints in the well-known configuration document (for example, `https://{theOktaIdPOrg}/.well-known/openid-configuration`.

* **Issuer** &#8212; The identifier of the Okta Identity Provider. For example, the Okta org where you created the Identity Provider app: `https://{theOktaIdPOrg}`
* **Authorization endpoint** &#8212; The URL of the Okta Identity Provider's OAuth 2.0 authorization endpoint. For example: `https://{theOktaIdPOrg}/oauth2/v1/authorize`
* **Token endpoint** &#8212; The URL of the Okta Identity Provider's token endpoint for obtaining access and ID tokens. For example: `https://{theOktaIdPOrg}/oauth2/v1/token`
* **JWKS endpoint** &#8212; The URL of the Okta Identity Provider's JSON Web Key Set document. This document contains signing keys that are used to validate the signatures from the provider. For example: `https://{theOktaIdPOrg}/oauth2/v1/keys`
* **Userinfo endpoint** &#8212; The endpoint for getting identity information about the user. For example: `https://{theOktaIdPOrg}/oauth2/v1/userinfo`
