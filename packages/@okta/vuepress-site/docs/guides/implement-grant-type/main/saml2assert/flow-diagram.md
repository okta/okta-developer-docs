### SAML 2.0 Assertion flow

<div class="full">

   ![Displays the sequence diagram for the SAML 2.0 Assertion flow that shows the back and forth between the resource owner, authorization server, Identity Provider and client"](/img/authorization/oauth-saml2-assertion-grant-flow.png)

   <!--
      source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4133%3A43905&mode=design&t=Me7qqw8odOmrLh6K-1
      oauth-saml2-assertion-grant-flow
   -->

</div>

At a high level, the SAML 2.0 Assertion flow has the following steps:

1. The client app makes a SAML request to the Identity Provider.
2. Identity Provider responds to the client app with a SAML 2.0 assertion.
3. The client app sends the Base64-encoded SAML 2.0 assertion in a request to the Okta authorization server to exchange the assertion for a token(s).
4. The Okta authorization server verifies the assertion and responds with the access token (optionally ID token, refresh token).
5. The client app makes a request with the access token to the resource server.
