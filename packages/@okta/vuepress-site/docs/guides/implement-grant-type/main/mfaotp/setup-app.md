4. Select **Native Application** as the **Application type**, then click **Next**.
5. Specify the **App integration name**.
6. Enable the **Resource Owner Password** and **MFA OTP** grant types in addition to the defaults.
7. Select **Allow everyone in your organization to access**, then click **Save**.
8. Select the **General** tab of your app integration, and then copy and save the generated **Client ID** value to implement your authorization flow.

## Set up the authentication policy

In direct authentication flows, the client tells the server which authenticator it wants to authenticate with through the grant type. However, the server can't grant a token until the client’s authentication policy is satisfied.

1. Go to your app’s **Sign On** tab, scroll to the bottom, and click **View policy details**.
    > **Note:** This example creates an app authentication policy with a two-factor rule for testing purposes.
1. Click **Actions** on the right of the policy assigned to the app by default.
1. Select **Edit name and description**.
1. Name the policy (for example, **Direct Auth MFA OTP 2FA**), enter a description, and click **Save**.
1. Click **Add a rule**, and then name it (for example, **2 MFA OTP Factor**).
1. For **AND User is**, specify your test user.
1. Skip down to **AND User must authenticate with** and select **Password + Another factor**.
1. Click **Save**.
