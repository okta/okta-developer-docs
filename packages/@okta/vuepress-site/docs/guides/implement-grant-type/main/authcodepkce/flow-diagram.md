### Authorization Code with PKCE flow

<div class="full">

   ![Sequence diagram that displays the back and forth between the resource owner, authorization server, and resource server for Authorization Code flow with PKCE](/img/authorization/oauth-auth-code-pkce-grant-flow.png)

   <!--
     SOurce image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4133%3A43878&mode=design&t=Me7qqw8odOmrLh6K-1 oauth-auth-code-pkce-grant-flow
   -->
</div>

 At a high-level, the flow has the following steps:

1. Your application (app) generates a code verifier followed by a code challenge. See [Create the proof key for code exchange](#create-the-proof-key-for-code-exchange).
2. Your app directs the browser to the Okta sign-in page, along with the generated code challenge.

    You need to register your app so that Okta can accept the authorization request. See [Set up your app](#set-up-your-app) to register and configure your app with Okta. After registration, your app can redirect the browser to Okta. See [Request an authorization code](#request-an-authorization-code).

3. The authorization server (Okta) redirects the authentication prompt to the user.
4. The user authenticates.

    For Okta to authenticate the user credentials, Okta needs user profile data.
    See [Add a user using Console](https://help.okta.com/okta_help.htm?id=ext-usgp-add-users), [Import Users](/docs/guides/password-import-inline-hook/), and the [Users API](/docs/reference/api/users/). Alternatively, you can [set up self-service registration](/docs/guides/oie-embedded-sdk-use-case-self-reg/) to allow users to register their membership with the app.

5. Okta redirects back to your native application with an authorization code.
6. Your application sends this code, along with the code verifier, to Okta. See [Exchange the code for tokens](#exchange-the-code-for-tokens).
7. Okta evaluates the PKCE code.
8. Okta returns access and ID tokens, and optionally a refresh token.
9. Your application can now use these tokens to call the resource server (for example, an API) on behalf of the user.
10. The resource server validates the token before responding to the request. See [Validate access token](#validate-access-token).
