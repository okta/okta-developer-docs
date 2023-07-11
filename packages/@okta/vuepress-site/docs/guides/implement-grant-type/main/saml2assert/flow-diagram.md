### SAML 2.0 Assertion flow

<div class="full">

   ![A sequence diagram for the SAML 2.0 Assertion flow that shows the interaction between the resource owner, authorization server, Identity Provider, and client](/img/authorization/oauth-saml2-assertion-grant-flow.png)

   <!--
      source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4133%3A43905&mode=design&t=Me7qqw8odOmrLh6K-1
      oauth-saml2-assertion-grant-flow
   -->

</div>

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

skinparam monochrome true
participant "Client" as OClient
participant "Identity Provider " as idp
participant "Authorization Server (Okta)" as okta
participant "Resource Server" as rs

autonumber "<b>#."
OClient -> idp: Makes SAML request to the IdP
idp -> OClient: Sends SAML 2.0 Assertion in response
OClient -> okta: Sends Base64-encoded SAML 2.0 Assertion to /token
okta -> OClient: Verifies assertion and sends access token (optionally ID token, refresh token)
OClient -> rs: Makes a resource request with the access token to the resource server

-->

The SAML 2.0 Assertion flow has the following steps:

1. The client app makes a SAML request to the Identity Provider.
1. Identity Provider responds to the client app with a SAML 2.0 assertion.
1. The client app requests an access token with the `urn:ietf:params:oauth:grant-type:saml2-bearer` grant type in exchange for the (Base64URL-encoded) SAML 2.0 assertion.

   > **Note:** You can send only one SAML assertion per request.

1. The Okta authorization server verifies the assertion and responds with the access token (and, optionally, ID and refresh tokens).
1. The client app makes a request with the access token to the resource server.
