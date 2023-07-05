### Implicit flow

<div class="full">

   ![Sequence diagram that displays the interaction between the resource owner, authorization server, and resource server for the Implicit grant flow](/img/authorization/oauth-implicit-grant-flow.png)

   <!--
      Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4133%3A43895&mode=design&t=Me7qqw8odOmrLh6K-1
      oauth-implicit-grant-flow
   -->
</div>

At a high level, this flow has the following steps:

1. Your application sends a request to the authorization server (Okta) for an access token.

    Before implementing this redirect request to the authorization server (Okta), you need to [set up your app](#set-up-your-app) in Okta. See [Request for tokens](#request-for-tokens).

2. The authorization server redirects the user's browser to an authentication prompt (the Okta sign-in page).

3. The user authenticates with the authorization server (Okta) and provides consent.

    For Okta to authenticate the user credentials, Okta needs user profile data.
    See [Add a user using the Admin Console](https://help.okta.com/okta_help.htm?id=ext-usgp-add-users), [Import Users](/docs/guides/password-import-inline-hook/), and the [Users API](/docs/reference/api/users/). Alternatively, you can [set up self-service registration](/docs/guides/oie-embedded-sdk-use-case-self-reg/) to allow users to register their membership with the app.

4. Okta redirects the browser back to the specified redirect URI. Access and ID tokens are included as a hash fragment in the URI. Your application extracts the tokens from the URI. See [Extract tokens from redirect URI](#extract-tokens-from-redirect-URI).

5. Your app can now use these tokens to call the resource server (for example an API) on behalf of the user.

6. The resource server validates the token before responding to the request. See [Validate access token](#validate-access-token).
