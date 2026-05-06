### Test your Universal Logout integration
If your integration supports Universal Logout, you need to test the logout flow manually with your generated test app instance.

1. Ensure that you have an active end user session on your app.
1. As an Okta admin, go to **Directory** > **People** in the Admin Console
1. Select the user who has the current session on your app.
1. Click **More Actions** > **Clear User Sessions**.
1. Select **Also include logout enabled apps and Okta API tokens**, and then click **Clear and revoke**.
1. Go back to the app as the end user, and ensure that the session is terminated.

> **Note**: For partial Universal Logout, the app only revokes the user's refresh tokens when it ends the user's Okta session. This prevents the user from getting new access in the future. However, existing user sessions aren't terminated until the user's existing access tokens expire or the user signs out of an app.