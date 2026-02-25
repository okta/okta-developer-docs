### Test your Universal Logout integration
If your integration supports Universal Logout, you need to test the logout flow manually.

1. Ensure you have an active login session on your app.
1. From the Admin Console, go to **Directory** > **People**.
1. Select the user that has the current login session on your app.
1. Click **More Actions** > **Clear User Sessions**.
1. Select **Also include logout enabled apps and Okta API tokens** and click **Clear and revoke**.
1. Go back to the app and ensure that the login session is terminated.
    > **Note**: For partial universal logout support, while clearing the user's session from Okta, the app only revokes the user's refresh tokens, which prevents the user from getting new access in the future. However, the existing user sessions aren't terminated until the user's existing access tokens expire or the user signs out of an app.
