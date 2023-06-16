### Direct Authentication MFA OTP flow

<div class="three-quarters">

![Sequence diagram that displays the back and forth between the resource owner, client app, and authorization server for MFA OTP flow"](/img/authorization/oauth-mfaotp-grant-flow.png)

</div>

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

skinparam monochrome true
actor "User" as user
participant "Client App (Your App)" as client
participant "Authorization Server (Okta) " as okta

autonumber "<b>#."
client -> user: Prompts user for username and password
user -> client: Enters credentials
client -> okta: Sends credentials and `grant_type` in `/token` request
okta -> client: Sends HTTP 403 error and `mfa_token` in response
client -> user: Prompts user for an OTP
user -> client: Obtains OTP and enters it
client -> okta: Sends `otp`, `mfa_token`, `grant_type` in `/token` request
okta -> client: Sends access token (optionally refresh token)

-->

At a high level, this flow has the following steps:

1. Your client app prompts the user for their username and password in the app interface.
1. The user enters their credentials.
1. Your app sends the user's credentials and the Resource Owner Password grant type (`grant_type=password`) to the Okta authorization server `/token` endpoint.

    You need to register your app so that Okta can accept the authorization request. See [Set up your app](#set-up-your-app) to register and configure your app with Okta. After registration, your app can make an authorization request to Okta. See [Request for tokens](#request-for-tokens).

1. Okta sends an HTTP 403 error that MFA is required and includes the `mfa_token` value in the response.
1. Your app prompts the user for an OTP in the app interface.
1. The user obtains the OTP from their device authenticator and enters it into the app interface.
1. Your app sends the `otp`, `mfa_token`, and [MFA OTP grant type](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/token) (`grant_type=http://auth0.com/oauth/grant-type/mfa-otp`) in a `/token` request to the Okta authorization server.
1. If the OTP and `mfa_token` are accurate, Okta responds with the requested tokens.
