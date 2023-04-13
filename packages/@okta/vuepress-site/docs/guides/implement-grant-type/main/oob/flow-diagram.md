### Direct Authentication OOB flow

<div class="full">

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
client -> okta: Sends OOB authentication request to /oob-authenticate
okta -> client: Acknowledges and sends oob_code
client -> okta: Sends oob_code and grant_type in /token request
okta -> client: Responds with HTTP 400 authorization_pending
okta <-> user: Sends push notification to user and user responds
client -> okta: Polls /token endpoint with oob_code
okta -> client: Responds with access token (optionally refresh token)

-->

At a high-level, this flow has the following steps:

1. Your client app prompts the user for their username in the app UI.
1. The user enters their username.
1. Your app sends the username as a `login_hint` and `push` as the `channel_hint` to the Okta authorization server `/oob-authenticate` endpoint.
    You need to register your app so that Okta can accept the authorization request. See [Set up your app](#set-up-your-app) to register and configure your app with Okta. After registration, your app can make an authorization request to Okta. See [Request for tokens](#request-for-tokens).
1. Okta returns an acknowledgement and the `oob_code` in the response.
1. Your app sends the `oob_code` and the OOB `grant_type` (`urn:okta:params:oauth:grant-type:oob`) in a `/token` request to the Okta authorization server.
1. Okta responds with an HTTP 400 `authorization_pending` error.
1. Okta sends a push notification to the user, and the user responds.
1. Your app sends another `/token` request with the `oob_code`.
1. Okta responds with the requested tokens.
