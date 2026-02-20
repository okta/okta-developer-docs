### Direct authentication OOB flow with SMS or Voice

<div class="three-quarter">

![Sequence diagram that displays the communication between the resource owner, client app, and authorization server for OOB flow"](/img/authorization/oauth-oob-phone-grant-flow.png)

</div>

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/ soure image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4423-1663&mode=design&t=tmSDoNn4DWZE7fPO-11
@startuml

skinparam monochrome true
actor "User" as user
participant "Client App (Your app)" as client
participant "Authorization Server (Okta) " as okta

autonumber "<b>#."
client <-> user: Prompts user for username, and user enters username
client -> okta: Sends `/primary-authenticate` request with `channel_hint` and `challenge_hint`
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
1. Your app sends the following parameters to the Okta authorization server `/primary-authenticate` endpoint:
    * `login_hint`
    * `channel_hint` with a value of `sms` or `voice`
    * `challenge_hint` with a value of `urn:okta:params:oauth:grant-type:oob`

    Register your app so that Okta can accept the authorization request. See [Set up your app](#set-up-your-app) to register and configure your app with Okta. After registration, your app can make an authorization request to Okta. See [Request for tokens](#request-for-tokens).

1. Okta responds with the following parameters:
    * `oob_code`
    * `channel` with a value of `sms` or `voice`
    * `binding_method=prompt`
1. Okta sends an out-of-band challenge (OTP sent by SMS or Voice Call, based on the `channel_hint`) to the user.
1. The app prompts the user to enter the OTP. The user enters the OTP.
1. Your app sends the OTP as the `binding_code` and the `oob_code` in a `/token` request.
1. Okta returns the requested tokens.
