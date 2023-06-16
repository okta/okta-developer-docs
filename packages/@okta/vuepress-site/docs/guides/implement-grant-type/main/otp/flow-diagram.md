### Direct Authentication OTP flow

<div class="three-quarters">

![Sequence diagram that displays the back and forth between the resource owner, client app, and authorization server for OTP flow"](/img/authorization/oauth-otp-grant-flow.png)

</div>

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

skinparam monochrome true
actor "User" as user
participant "Client App (Your App)" as client
participant "Authorization Server (Okta)" as okta

autonumber "<b>#."
client -> user: Prompts user for username and OTP
user -> client: Enters username and OTP
client -> okta: Sends `otp`, username (`login_hint`), `grant_type` in `/token` request
okta -> client: Sends access token (optionally refresh token)

-->

At a high level, this flow has the following steps:

1. Your client app prompts the user for their username and then an OTP.
1. The user enters username, opens the authenticator app on their device to get the OTP, and then enters the OTP in the app interface.
1. Your app sends the `otp`, username as a `login_hint`, and [OTP grant type](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/token) (`grant_type=urn:okta:params:oauth:grant-type:otp`) in a `/token` request to the Okta authorization server.

    Register your app so that Okta can accept the authorization request. See [Set up your app](#set-up-your-app) to register and configure your app with Okta. After registration, your app can make an authorization request to Okta. See [Request for tokens](#request-for-tokens).

1. If the OTP and username are accurate, Okta responds with the requested tokens.
