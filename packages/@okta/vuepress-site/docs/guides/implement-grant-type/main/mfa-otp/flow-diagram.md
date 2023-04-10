### Direct Authentication MFA OTP flow

<div class="full">

![Sequence diagram that displays the back and forth between the resource owner, authorization server, and resource server for Authorization Code flow"](/img/authorization/oauth-otp-grant-flow.png)

</div>

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

skinparam monochrome true
actor "Resource Owner (User)" as user
participant "Client" as client
participant "Authorization Server (Okta) " as okta
participant "Resource Server (Your App) " as app

autonumber "<b>#."
user -> client: Authenticates
client -> okta: Token request to /token
okta -> client: Access token (and optionally refresh token)
client -> app: Request with access token
app -> client: Response

-->

At a high-level, this flow has the following steps:

1. User signs in to your client app by providing their username and an OTP from an authenticator app such as Okta Verify or Google Authenticator.
1. Your app sends its client ID, the OTP, and the username as a `login_hint` to the Okta authorization server.

    You need to register your app so that Okta can accept the authorization request. See [Set up your app](#set-up-your-app) to register and configure your app with Okta. After registration, your app can make an authorization request to Okta. See [Request for tokens](#request-for-tokens).

1. If the OTP and username are accurate, Okta responds with the requested tokens.
1. Your app uses the access token to make authorized requests to the resource server.
1. The resource server validates the token before responding to the request. See [Validate access token](/docs/guides/implement-grant-type/otp/main/#validate-access-token).
