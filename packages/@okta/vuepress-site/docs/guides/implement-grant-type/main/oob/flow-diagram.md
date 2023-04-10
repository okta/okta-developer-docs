### Direct Authentication OOB flow

<div class="full">

![Sequence diagram that displays the back and forth between the resource owner, authorization server, and resource server for OOB flow"](/img/authorization/oauth-oob-grant-flow.png)

</div>

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

skinparam monochrome true
actor "User" as user
participant "Client App (Your app)" as client
participant "Authorization Server (Okta) " as okta

autonumber "<b>#."
client -> user: Prompts user for username in app UI
user -> client: Enters username
client -> okta: Sends OOB auth request to /oob-authenticate
okta -> client: Responds with acknowledgement and oob_code
client -> okta: Sends oob_code in /token request
okta -> client: Responds with `authorization_pending`
okta -> user: Sends push notification to user
client -> user: Prompts user to allow or deny
user -> client: Responds to prompt
client -> okta: Pools /token endpoint with oob_code
okta -> client: Responds with access token (and optionally refresh token)

-->

At a high-level, this flow has the following steps:

1. Your client app prompts the user for their username.
1. User enters their username.
1. The client sends its client ID, the username as a `login_hint`, and `push` as the `channel_hint` to the Okta authorization server `/oob-authenticate` endpoint.
    You need to register your app so that Okta can accept the authorization request. See [Set up your app](#set-up-your-app) to register and configure your app with Okta. After registration, your app can make an authorization request to Okta. See [Request for tokens](#request-for-tokens).
1. Okta responds with acknowledgement and the `oob_code`.
1. The client sends the `oob_code` in the `/token` request to the Okta authorization server.
1. Okta responds with an `authorization_pending` error.
1. Okta sends the push notification to the user.
1. The client prompts the user to allow or deny.
1. User responds to prompt.
1. Your app sends another `/token` request with the `oob_code`.
1. Okta responds with the requested tokens.
