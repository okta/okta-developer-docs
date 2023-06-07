### Direct authentication OOB flow

<div class="three-quarters">

![Sequence diagram that displays the back and forth between the resource owner, client app, and authorization server for OOB flow"](/img/authorization/oauth-oob-grant-flow.png)

</div>

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

skinparam monochrome true
actor "User" as user
participant "Client App (Your app)" as client
participant "Authorization Server (Okta) " as okta

autonumber "<b>#."
client -> user: Prompts user for username
user -> client: Enters username
client -> okta: Sends OOB authentication request to `/oob-authenticate`
okta -> client: Acknowledges, sends `oob_code`, `interval`
okta -> user: Sends push notification
client -> okta: Polls `/token` at set `interval` with `oob_code`, `grant_type`
okta -> client: Responds with HTTP 400 `authorization_pending`
user -> okta: Responds to push notification
client -> okta: Polls `/token` endpoint
okta -> client: Responds with access token (optionally refresh token)

-->

At a high level, this flow has the following steps:

1. Your client app prompts the user for their username in the app interface.
1. The user enters their username.
1. Your app sends the username as a `login_hint` and `push` as the `channel_hint` to the Okta authorization server `/oob-authenticate` endpoint.

    Register your app so that Okta can accept the authorization request. See [Set up your app](#set-up-your-app) to register and configure your app with Okta. After registration, your app can make an authorization request to Okta. See [Request for tokens](#request-for-tokens).

1. Okta returns an acknowledgment, the `oob_code`, and the `interval` in seconds to poll (default is `5`).
1. Okta sends a push notification to the user.
1. Your app polls the Okta `/token` endpoint at the set `interval`. The `oob_code` and the [OOB grant type](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/token) (`grant_type=urn:okta:params:oauth:grant-type:oob`) are included in the requests.
1. Okta responds with an HTTP 400 `authorization_pending` error.
1. The user responds to the push notification.
1. Your app polls the `/token` endpoint again.
1. Okta returns the requested tokens.
