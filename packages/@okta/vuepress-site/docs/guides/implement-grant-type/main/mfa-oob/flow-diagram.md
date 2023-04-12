### Direct Authentication MFA OOB flow

This flow example uses Okta Verify Push as an out-of-band (OOB) factor.

<div class="full">

![Sequence diagram that displays the back and forth between the rresource owner, client app, and authorization server for MFA OOB flow"](/img/authorization/oauth-mfaoob-grant-flow.png)

</div>

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

skinparam monochrome true
actor "User" as user
participant "Client App (Your app)" as client
participant "Authorization Server (Okta)" as okta

autonumber "<b>#."
client -> user: Prompts user for username and password
user -> client: Enters credentials
client -> okta: Sends credentials and grant_type in /token request
okta -> client: Sends HTTP 403 error and mfa_token in response
client -> okta: Sends /challenge request with mfa_token and challenge_types_supported
okta -> client: Sends challenge_type and oob_code
okta -> user: Sends push notification
client -> user: Prompts user to allow or deny
user -> client: Responds to prompt
client -> okta: Sends mfa_token, oob_code, grant_type in /token endpoint request
okta -> client: Responds with access token (optionally refresh token)

-->

At a high-level, this flow has the following steps:

1. Your client app prompts the user for their username and password in the app UI.
1. The user enters their credentials.
1. Your app sends the user's credentials and the Resource Owner Password `grant_type` (`password`) to the Okta authorization server.
    You need to register your app so that Okta can accept the authorization request. See [Set up your app](#set-up-your-app) to register and configure your app with Okta. After registration, your app can make an authorization request to Okta. See [Request for tokens](#request-for-tokens).
1. Okta sends an HTTP 403 error that MFA is required and includes the `mfa_token` in the response.
1. Your app sends `/challenge` request with the `mfa_token` and the `challenge_types_supported` (`http://auth0.com/oauth/grant-type/mfa-oob`) to the Okta authorization server.
1. Okta responds with a `challenge_type` and `oob_code`.
1. Okta sends a push notification to the user.
1. Your app prompts the user to respond.
1. The user responds to the prompt.
1. Your app sends a `/token` request with the `oob_code`, `mfa_token`, and MFA OOB `grant_type` (http://auth0.com/oauth/grant-type/mfa-oob) to the authorization server.
1. Okta responds with the requested tokens.
