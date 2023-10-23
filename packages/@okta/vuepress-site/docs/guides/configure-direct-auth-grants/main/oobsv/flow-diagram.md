### Direct authentication OOB flow with SMS or Voice

<div class="three-quarter">

![Sequence diagram that displays the back and forth between the resource owner, client app, and authorization server for OOB flow"](/img/authorization/oauth-oob-phone-grant-flow.png)

</div>

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/
@startuml
skinparam monochrome true
actor "User" as user
participant "Client App (Your app)" as client
participant "Authorization Server (Okta) " as okta

autonumber "<b>#."
client <-> user: Prompts user for username, and user enters username
client -> okta: Sends `/oob-authenticate` request with `channel_hint`
okta -> client: Responds with `oob_code`, `channel`, `binding_method`
okta -> user: Sends out-of-band challenge
client -> user: Prompts user to enter OTP, and user enters OTP
client -> okta: Sends `binding_code`, `oob_code` in `/token` request
okta -> client: Responds with requested tokens
@enduml
-->

At a high level, this flow has the following steps:

1. Your client app prompts the user for their username in the app interface.
1. The user enters their username.
1. Your app sends the username as a `login_hint` and the `channel_hint` to the Okta authorization server `/oob-authenticate` endpoint.

    Register your app so that Okta can accept the authorization request. See [Set up your app](#set-up-your-app) to register and configure your app with Okta. After registration, your app can make an authorization request to Okta. See [Request for tokens](#request-for-tokens).

1. Okta responds with the `oob_code`, `channel`, `binding_method=prompt`, and any other parameters required by the configured authenticator.
1. Okta sends an out-of-band challenge (OTP sent by SMS or Voice Call, based on the `channel_hint`) to the user.
1. The app prompts the user to enter the OTP. The user enters the OTP.
1. Your app sends the `binding_code` and `oob_code` in a `/token` request.
1. Okta returns the requested tokens.
