### Authorization Code flow

<div class="full">

   ![Sequence diagram that displays the interactions between the resource owner, authorization server, and resource server for Authorization Code flow"](/img/authorization/oauth-auth-code-grant-flow.png)

   <!--
      source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4133%3A43845&mode=design&t=Me7qqw8odOmrLh6K-1 oauth-auth-code-grant-flow
   -->

</div>

<!-- Generated using http://www.plantuml.com/plantuml/uml/

skinparam monochrome true
actor "Resource Owner (User)" as user
participant "Web App" as client
participant "Authorization Server (Okta) " as okta
participant "Resource Server (Your App) " as app

autonumber "<b>#."
client -> okta: Authorization Code request to /authorize
okta -> user: 302 redirect to authentication prompt
user -> okta: Authentication & consent
okta -> client: Authorization Code response
client -> okta: Send authorization code + client secret to /token
okta -> client: Access token (and optionally refresh token)
client -> app: Request with access token
app -> client: Response

-->

At a high level, this flow has the following steps:

1. Your application (app) requests an authorization code from the authorization server (Okta).

    Before implementing this redirect request to the authorization server, you need to [set up your app](#set-up-your-app) in Okta. See [Request an authorization code](#request-an-authorization-code).

2. Okta presents an authentication prompt (the Okta sign-in page) to the user's browser.
3. The user authenticates with the authorization server and provides consent.

    For Okta to authenticate the user credentials, Okta needs user profile data.
    See [Add a user using Console](https://help.okta.com/okta_help.htm?id=ext-usgp-add-users), [Import Users](/docs/guides/password-import-inline-hook/), and the [Users API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/). Alternatively, you can [set up self-service registration](/docs/guides/oie-embedded-sdk-use-case-self-reg/) to allow users to register their membership with the app.

4. The browser receives an authorization code from the authorization server (Okta) after the user is authenticated. The authorization code is passed to your app.
5. Your app sends this code and the client secret to Okta. See [Exchange the code for tokens](#exchange-the-code-for-tokens).
6. Okta returns access and ID tokens, and optionally a refresh token.
7. Your app can now use these tokens to call the resource server (for example an API) on behalf of the user.
8. The resource server validates the token before responding to the request. See [Validate access token](#validate-access-token).
