### Test your Universal Logout integration
If your integration supports Universal Logout, you need to test the logout flow manually.

1. Ensure you have an active session on your app.
1. From the Admin Console, go to **Directory** > **People**.
1. Select the user that has the current session on your app.
1. Click **More Actions** > **Clear User Sessions**.
1. Select **Also include logout enabled apps and Okta API tokens**, and then click **Clear and revoke**.
1. Go back to the app and ensure that the session is terminated.
    > **Note**: For partial Universal Logout, the app only revokes the user's refresh tokens when it ends the user's Okta session. This prevents the user from getting new access in the future. However, existing user sessions aren't terminated until the user's existing access tokens expire or the user signs out of an app.