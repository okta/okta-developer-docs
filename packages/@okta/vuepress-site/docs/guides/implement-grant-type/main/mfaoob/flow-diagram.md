### Direct Authentication MFA OOB flow

<div class="three-quarters">

![Sequence diagram that displays the back and forth between the resource owner, client app, and authorization server for MFA OOB flow"](/img/authorization/oauth-mfaoob-grant-flow.png)

</div>

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

skinparam monochrome true
actor "User" as user
participant "Client App (Your app)" as client
participant "Authorization Server (Okta)" as okta

autonumber "<b>#."
client -> user: Prompts user for username and password
user -> client: Enters credentials
client -> okta: Sends credentials and `grant_type` in `/token` request
okta -> client: Sends HTTP 403 error and `mfa_token` in response
client -> okta: Sends `/challenge` request with `mfa_token` and `challenge_types_supported`
okta -> client: Sends `challenge_type`, `oob_code`, `interval`
okta -> user: Sends push notification to user
client -> okta: Polls `/token` at set interval with `mfa_token`, `oob_code`, `grant_type`
okta -> client: Responds with HTTP 400 `authorization_pending`
user -> okta: Responds to push notification
client -> okta: Polls `/token` endpoint
okta -> client: Responds with access token (optionally refresh token)

-->

At a high level, this flow has the following steps:

1. Your client app prompts the user for their username and password in the app UI.
1. The user enters their credentials.
1. Your app sends the credentials and the Resource Owner Password grant type (`grant_type=password`) in a request to the Okta authorization server `/token` endpoint.

    Register your app so that Okta can accept the authorization request. See [Set up your app](#set-up-your-app) to register and configure your app with Okta. After registration, your app can make an authorization request to Okta. See [Request for tokens](#request-for-tokens).

1. Okta sends an HTTP 403 error that MFA is required and includes the `mfa_token` in the response.
1. Your app sends a `/challenge` request with the `mfa_token` value and the `challenge_types_supported` (`http://auth0.com/oauth/grant-type/mfa-oob`) to the Okta authorization server.
1. Okta responds with a `challenge_type`, `oob_code`, and `interval` in seconds to poll (default is `5`).
1. Okta sends a push notification to the user.
1. Your app polls the Okta `/token` endpoint at the set `interval`. The `oob_code`, `mfa_token`, and [MFA OOB grant type](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/token) (`grant_type=http://auth0.com/oauth/grant-type/mfa-oob`) are included in the requests.
1. Okta responds with an HTTP 400 `authorization_pending` error.
1. The user responds to the push notification.
1. Your app polls the `/token` endpoint again.
1. Okta returns the requested tokens.
