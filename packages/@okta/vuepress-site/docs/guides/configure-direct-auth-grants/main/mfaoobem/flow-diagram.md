### Direct Authentication MFA OOB Email flow

At a high level, this flow has the following steps:

1. Your client app prompts the user for their username and password in the app interface, and the user enters their credentials.
1. Your app sends the credentials and the Resource Owner Password grant type (`grant_type=password`) in a request to the Okta authorization server `/token` endpoint.

    Register your app so that Okta can accept the authorization request. See [Set up your app](#set-up-your-app) to register and configure your app with Okta. After registration, your app can make an authorization request to Okta. See [Request for tokens](#request-for-tokens).

1. Okta responds with an HTTP 403 error that MFA is required and includes the `mfa_token`.
1. Your app sends a `/challenge` request with the following parameters to the Okta authorization server:
    * `mfa_token`
    * `challenge_types_supported=http://auth0.com/oauth/grant-type/mfa-oob`
    * `channel_hint` with a value of `email`
1. Okta responds with the following parameters:
   * `challenge_type`
   * `oob_code`
   * `channel` with a value of `email`
   * `binding_method=prompt`
1. Okta emails a one-time verification code to the user.
1. The app prompts the user to enter the code. The user enters the code.
1. Your app sends the code as the `binding_code`, along with the `oob_code` and `mfa_token`, in a `/token` request.
1. Okta returns the requested tokens.

> **Note:** This flow doesn't support polling. Okta doesn't return an `interval` value in the challenge response, so your app shouldn't poll the `/token` endpoint while waiting for the user to enter the code.
