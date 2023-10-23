### Direct Authentication MFA OOB SMS or Voice flow

<div class="three-quarter">

![Sequence diagram that displays the back and forth between the resource owner, client app, and authorization server for MFA OOB flow"](/img/authorization/oauth-mfaoob-phone-grant-flow.png)

</div>

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/
@startuml
skinparam monochrome true
actor "User" as user
participant "Client App (Your app)" as client
participant "Authorization Server (Okta) " as okta

autonumber "<b>#."
client <-> user: Prompts user for username, password, and the user enters credentials
client -> okta: Sends credentials and `grant_type` in `/token` request
okta -> client: Responds with HTTP 403 error and `mfa_token`
client -> okta: Sends `/challenge` request with `mfa_token`, `channel_hint`, `challenge_types_supported`
okta -> client: Responds with `challenge_type`, `oob_code`, `channel`, `binding_method`
okta -> user: Sends out-of-band challenge
client <-> user: Prompts user to enter OTP, and user enters OTP
client -> okta: Sends `binding_code`, `oob_code` in `/token` request
okta -> client: Responds with requested tokens
@enduml
-->

At a high level, this flow has the following steps:

1. Your client app prompts the user for their username and password in the app interface, and the user enters their credentials.
1. Your app sends the credentials and the Resource Owner Password grant type (`grant_type=password`) in a request to the Okta authorization server `/token` endpoint.

    Register your app so that Okta can accept the authorization request. See [Set up your app](#set-up-your-app) to register and configure your app with Okta. After registration, your app can make an authorization request to Okta. See [Request for tokens](#request-for-tokens).

1. Okta responds with an HTTP 403 error that MFA is required and includes the `mfa_token`.
1. Your app sends a `/challenge` request with the `mfa_token` and the `channel_hint` values, and the `challenge_types_supported` (`http://auth0.com/oauth/grant-type/mfa-oob`) parameters to the Okta authorization server.
1. Okta responds with the following parameters:
   * `challenge_type`
   * `oob_code`
   * `channel`
   * `binding_method=prompt`
   * Any other parameters required by the configured authenticator.
1. Okta sends an out-of-band challenge (OTP sent by SMS or Voice Call, based on the `channel_hint`) to the user.
1. The app prompts the user to enter the OTP. The user enters the OTP.
1. Your app sends the `binding_code` and `oob_code` in a `/token` request.
1. Okta returns the requested tokens.
