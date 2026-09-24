### Direct authentication OOB flow with Email

<div class="three-quarter">

![Sequence diagram that displays the communication between the resource owner, client app, and authorization server for the Email OOB flow"](/img/authorization/oauth-oob-email-grant-flow.png)

</div>

<!-- TODO: source diagram not yet created. Mirror the existing Phone OOB diagram
     (oauth-oob-phone-grant-flow.png) with "SMS or Voice" swapped for "Email" and
     the OTP source described as an email instead of an SMS/Voice call. -->

At a high level, this flow has the following steps:

1. Your client app prompts the user for their username in the app interface.
1. The user enters their username.
1. Your app sends the following parameters to the Okta authorization server `/primary-authenticate` endpoint:
    * `login_hint`
    * `channel_hint` with a value of `email`
    * `challenge_hint` with a value of `urn:okta:params:oauth:grant-type:oob`

    Register your app so that Okta can accept the authorization request. See [Set up your app](#set-up-your-app) to register and configure your app with Okta. After registration, your app can make an authorization request to Okta. See [Request for tokens](#request-for-tokens).

1. Okta responds with the following parameters:
    * `oob_code`
    * `channel` with a value of `email`
    * `binding_method=prompt`
1. Okta emails a one-time verification code to the user.
1. The app prompts the user to enter the code. The user enters the code.
1. Your app sends the code as the `binding_code` and the `oob_code` in a `/token` request.
1. Okta returns the requested tokens.

> **Note:** This flow doesn't support polling. Okta doesn't return an `interval` value in the response, so your app shouldn't poll the `/token` endpoint while waiting for the user to enter the code.
