## Set up your authorization server

To use the MFA OOB flow, both your client app and the [Okta authorization server](/docs/concepts/auth-servers/) that you're using with the app must have the MFA OOB grant type enabled.

If your Okta org uses Identity Engine, then the MFA OOB grant type is automatically configured in your org authorization server. For custom authorization servers that you're using with your app, you must enable the MFA OOB grant:

1. In the Admin Console, go to **Security** > **API**.
2. On the **Authorization Servers** tab, select the pencil icon next to the authorization server that you want to use.
3. Select the **Access Policies** tab.
4. Select the pencil icon from the **Actions** column for the **Default Policy Rule**.

    If you aren’t using the Default Policy for your client app that requires the MFA OOB grant, select the policy that applies to your app.

5. In the **Edit Rule** dialog, select the **MFA OOB** checkbox (in addition to any other grant type that is already supported).
6. Click **Update Rule**.
