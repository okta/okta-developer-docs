### Direct Authentication MFA OTP flow

<div class="full">

![Sequence diagram that displays the back and forth between the resource owner, client app, and authorization server for MFA OTP flow"](/img/authorization/oauth-mfaotp-grant-flow.png)

</div>

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

skinparam monochrome true
actor "Resource Owner (User)" as user
participant "Client App (Your App)" as client
participant "Authorization Server (Okta) " as okta

autonumber "<b>#."
client -> user: Prompts user for username and password
user -> client: Enters credentials
client -> okta: Sends token request to /token endpoint
okta -> client: Sends access token (and optionally refresh token)

-->

At a high-level, this flow has the following steps:

1. Your client app prompts the user for their username and password in the app UI.
1. The user enters their credentials.
1. Your app sends its client ID and the user's credentials to the Okta authorization server.

    You need to register your app so that Okta can accept the authorization request. See [Set up your app](#set-up-your-app) to register and configure your app with Okta. After registration, your app can make an authorization request to Okta. See [Request for tokens](#request-for-tokens).

1. Okta sends a 403 error that MFA is required and includes the `mfa_token` in the response.
1. Your app prompts the user for an OTP in the app UI.
1. The user opens their authenticator app, gets the OTP, and enters it in the app UI.
1. Your app sends the OTP, the `mfa_token`, and  in an http://auth0.com/oauth/grant-type/mfa-otp
