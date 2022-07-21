### SAML 2.0 Assertion flow

<div class="three-quarter">

![Displays the sequence diagram for the SAML 2.0 Assertion flow that shows the back and forth between the resource owner, authorization server, Identity Provider and client"](/img/authorization/oauth-saml2-grant-flow.png)

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

At a high level, the SAML 2.0 Assertion flow has the following steps:

1. The client app makes a SAML request to the Identity Provider.
2. Identity Provider responds to the client app with a SAML 2.0 assertion.
3. The client app sends the Base64-encoded SAML 2.0 assertion in a request to the Okta Authorization Server to exchange the assertion for a token(s).
4. The Okta Authorization Server verifies the assertion and responds with the access token (optionally ID token, refresh token).
5. The client app makes a request with the access token to the resource server.
