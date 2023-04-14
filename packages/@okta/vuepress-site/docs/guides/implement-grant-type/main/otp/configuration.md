## Enable authenticators for your org

The direct authentication OTP flow uses passwordless authentication, such as signing in with email or SMS. You need an authenticator enabled to use the direct authentication OTP flow, for example Google Authenticator.

1. Open the Admin Console for your org.
1. Select **Security** > **Authenticators** to view the available authenticators.
1. If the authenticator that you want to use isn't in the list:
    * Click **Add authenticator**.
    * Click **Add** on the authenticator tile, and then click **Add** in the next dialog.
    * Select the **Enrollment** tab.
    * Verify that the authenticator is set to either **Optional** or **Required** in the **Eligible authenticators** section of the Default Policy.
1. If the authenticator that you want to use is set to **Disabled**, click **Edit** for the Default Policy.
1. Select **Optional** from the dropdown box for the authenticator, and then click **Update Policy**.

## Set up your authorization server

To use the OTP flow, both your client app and the [Okta authorization server](/docs/concepts/auth-servers/) that you are using with the app must have the OTP grant type enabled in your Okta org.

> **Note:** See [Create an authorization server](/docs/guides/customize-authz-server/) to create your own custom authorization server.

### Enable the OTP grant on your authorization server

1. In the Admin Console, go to **Security** > **API**.
2. On the **Authorization Servers** tab, select the pencil icon next to the authorization server that you want to use.
3. Select the **Access Policies** tab.
4. Select the pencil icon from the **Actions** column for the **Default Policy Rule**.
    If you aren’t using the Default Policy for your client app that requires the OTP grant, select the Policy that applies to your app.
5. In the **Edit Rule** dialog, select the **OTP** checkbox (in addition to any other grant type that is already supported by the authorization server).
6. Click **Update Rule**.
