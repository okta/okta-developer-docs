### Authorization Code with PKCE flow

<div class="full">

   ![Sequence diagram that displays the interaction between the resource owner, authorization server, and resource server for Authorization Code flow with PKCE](/img/authorization/oauth-auth-code-pkce-grant-flow.png)

   <!--
     Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4133%3A43878&mode=design&t=Me7qqw8odOmrLh6K-1 oauth-auth-code-pkce-grant-flow
   -->
</div>

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

@startuml
skinparam monochrome true
actor "Resource Owner (User)" as user
participant "Client" as client
participant "Authorization Server (Okta)" as okta
participant "Resource Server (Your App)" as app

autonumber "<b>#."
client -> client: Generate PKCE code verifier & challenge
client -> okta: Authorization code request + code_challenge to /authorize
okta -> user: 302 redirect to authentication prompt
user -> okta: Authentication & consent
okta -> client: Authorization code response
client -> okta: Send authorization code + code_verifier to /token
okta -> okta: Evaluates PKCE code
okta -> client: Access token (and optionally refresh token)
client -> app: Request with access token
app -> client: Response
@enduml

-->

 At a high level, the flow has the following steps:

1. Your application (app) generates a code verifier followed by a code challenge. See [Create the proof key for code exchange](#create-the-proof-key-for-code-exchange).
2. Your app requests an authorization code from the authorization server (Okta). The request contains the generated code challenge.

   Before implementing this redirect request to the authorization server, you need to [set up your app](#set-up-your-app) in Okta. See [Request an authorization code](#request-an-authorization-code).

3. Okta presents an authentication prompt (the Okta sign-in page) to the user's browser.
4. The user authenticates with the authorization server and provides consent.

    For Okta to authenticate the user credentials, Okta needs user profile data.
    See [Add a user using the Admin Console](https://help.okta.com/okta_help.htm?id=ext-usgp-add-users), [Import Users](/docs/guides/password-import-inline-hook/), and the [Users API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/). Alternatively, you can [set up self-service registration](/docs/guides/oie-embedded-sdk-use-case-self-reg/) to allow users to register their membership with the app.

5. Okta redirects the browser back to your app with an authorization code.
6. Your application sends this code, along with the code verifier, to Okta. See [Exchange the code for tokens](#exchange-the-code-for-tokens).
7. Okta evaluates the PKCE code.
8. Okta returns access and ID tokens, and optionally a refresh token.
9. Your application can now use these tokens to call the resource server (for example, an API) on behalf of the user.
10. The resource server validates the token before responding to the request. See [Validate access token](#validate-access-token).
