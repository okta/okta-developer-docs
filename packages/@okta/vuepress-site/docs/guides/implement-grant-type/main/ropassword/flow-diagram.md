### Resource Owner Password flow

<div class="full">

   ![Sequence diagram that shows the interaction between the resource owner, authorization server, and resource server for Resource Owner Password flow](/img/authorization/oauth-resource-owner-password-grant-flow.png)

   <!--
      Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4133%3A43902&mode=design&t=Me7qqw8odOmrLh6K-1
      oauth-resource-owner-password-grant-flow
   -->

</div>

At a high level, this flow has the following steps:

1. The user authenticates with your client application, providing their user credentials.

2. Your app sends these credentials to the Okta authorization server with its client ID and secret in the request header.

    Before implementing this redirect request to the authorization server (Okta), you need to [set up your app](#set-up-your-app) in Okta. See [Request for tokens](#request-for-tokens).

3. The authorization server responds with an access token if the credentials are accurate.

4. Your app uses the access token to make authorized requests to the resource server.

5. The resource server validates the token before responding to the request. See [Validate access token](#validate-access-token).
