### Direct Authentication MFA OOB Okta Verify Push flow

<div class="three-quarter">

![Sequence diagram that displays the back and forth between the resource owner, client app, and authorization server for MFA OOB flow"](/img/authorization/oauth-mfaoob-grant-flow.png)

</div>

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/
@startuml
skinparam monochrome true
actor "User" as user
participant "Client App (Your app)" as client
participant "Authorization Server (Okta) " as okta

autonumber "<b>#."
client -> user: Prompts user for username and password
user -> client: Enters credentials
client -> okta: Sends credentials and `grant_type` in `/token` request
okta -> client: Sends HTTP 403 error and `mfa_token` in response
client -> okta: Sends `/challenge` request with `mfa_token`, `channel_hint=push`, and `challenge_types_supported`
okta -> client: Sends `challenge_type`, `oob_code`, other parameters required by authenticator
okta -> user: Sends push notification
user <-> client: Per configured authenticator options, more interaction may occur
client -> okta: Polls `/token` at set interval with `mfa_token`, `oob_code`, `grant_type`
okta -> client: Responds with HTTP 400 `authorization_pending`
user -> okta: Opens the Okta Verify app and taps **Yes it's me**
user <-> okta: Per configured authenticator options, more interaction may occur
client -> okta: Polls `/token` endpoint
okta -> client: Responds with access token (optionally refresh token)
@enduml
-->

At a high level, this flow has the following steps:

1. Your client app prompts the user for their username and password in the app UI.
1. The user enters their credentials.
1. Your app sends the credentials and the Resource Owner Password grant type (`grant_type=password`) in a request to the Okta authorization server `/token` endpoint.

    Register your app so that Okta can accept the authorization request. See [Set up your app](#set-up-your-app) to register and configure your app with Okta. After registration, your app can make an authorization request to Okta. See [Request for tokens](#request-for-tokens).

1. Okta sends an HTTP 403 error that MFA is required and includes the `mfa_token` in the response.
1. Your app sends a `/challenge` request to the Okta authorization server with the following parameters:
   * `mfa_token`
   * `channel_hint=push`
   * `challenge_types_supported=http://auth0.com/oauth/grant-type/mfa-oob`
1. Okta responds with the following parameters:
   * `challenge_type=http://auth0.com/oauth/grant-type/mfa-oob`
   * `oob_code`
   * `interval` in seconds to poll (default is `5`)

   >**Note:** For Okta Verify prompts with [number challenge](https://help.okta.com/okta_help.htm?type=oie&id=ext-config-okta-verify-options), `binding_method=transfer` and `binding_code` are also returned. See the [Number challenge for Okta Verify Push example](#number-challenge-for-okta-verify-push-example).

1. Okta sends a push notification to the user.
1. Per configured authenticator options, more interaction may occur.

   >**Note:** For Okta Verify prompts with number challenge, the client displays the `binding_code` to the user.

1. Your app polls the Okta `/token` endpoint at the set `interval` and includes the following parameters in the requests:
   * `oob_code`
   * `mfa_token`
   * `grant_type=http://auth0.com/oauth/grant-type/mfa-oob`

   >**Note:** See the [MFA OOB grant type](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/token) on the `/token` page. To view specific MFA OOB grant information, select `http://auth0.com/oauth/grant-type/mfa-oob` from the `grant_type` dropdown list.

1. Okta responds with an HTTP 400 `authorization_pending` error.
1. The user opens the Okta Verify app and taps **Yes it's me**.
1. Per configured authenticator options, more interaction may occur.

   >**Note:** For Okta Verify prompts with number challenge, three number options display in Okta Verify. The user then taps the number that matches the binding code sent by the client in step 8.

1. Your app polls the `/token` endpoint again.
1. Okta returns the requested tokens.
