### Client Credentials flow

<div class="three-quarter">

   ![Sequence diagram that displays the back and forth between the resource owner, authorization server, and resource server for the Client Credentials flow](/img/authorization/oauth-client-creds-grant-flow.png)

   <!--
      Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4133%3A43887&mode=design&t=Me7qqw8odOmrLh6K-1
      oauth-client-creds-grant-flow
   -->

</div>

At a high-level, this flow has the following steps:

1. Your client application (app) makes an authorization request to your Okta authorization server using its client credentials.

     You need to register your app so that Okta can accept the authorization request. See [Set up your app](#set-up-your-app) to register and configure your app with Okta. After registration, your app can make an authorization request to Okta. See [Request for token](#request-for-token).

2. If the credentials are accurate, Okta responds with an access token.

3. Your app uses the access token to make authorized requests to the resource server.

4. The resource server validates the token before responding to the request. See [Validate access token](#validate-access-token).
