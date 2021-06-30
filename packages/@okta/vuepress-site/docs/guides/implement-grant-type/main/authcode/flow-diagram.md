### Authorization code

![Authorization Code](/img/authorization/oauth-auth-code-grant-flow.png "Sequence diagram that displays the back and forth between the resource owner, authorization server, and resource server for Auth Code flow")

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

skinparam monochrome true
actor "Resource Owner (User)" as user
participant "Web App" as client
participant "Authorization Server (Okta) " as okta
participant "Resource Server (Your App) " as app

autonumber "<b>#."
client -> okta: Authorization Code Request to /authorize
okta -> user: 302 redirect to authentication prompt
user -> okta: Authentication & consent
okta -> client: Authorization Code Response
client -> okta: Send authorization code + client secret to /token
okta -> client: Access token (and optionally Refresh Token)
client -> app: Request with access token
app -> client: Response
-->

At a high-level, this flow has the following steps:

1. Your application (app) directs the browser to the Okta sign-in page.<br>
Before implementing this redirect request to the Auth Server (Okta), you need to [Set up your app](#set-up-your-app) in Okta to obtain a client ID to embed in your request. See [Request an authorization code](#request-an-authorization-code).
2. Okta redirects the authentication prompt (Okta sign-in page) to the user.
3. The user authenticates.
4. After the user is authenticated, the browser receives an authorization code from the Auth Server (Okta). The authorization code is passed to your app.
5. Your app sends this code and the client secret to Okta. See [Exchange the code for tokens](#exchange-the-code-for-tokens).
6. Okta returns access and ID tokens, and optionally a refresh token.
7. Your app can now use these tokens to call the resource server (for example an API) on behalf of the user.
8. The resource server validates the token before responding to the request. See [Validate access token](#validate-access-token).
