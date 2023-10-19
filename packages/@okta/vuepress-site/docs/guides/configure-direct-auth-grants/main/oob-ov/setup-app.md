5. Select **Native Application** as the **Application type**, then click **Next**.
1. Specify the **App integration name**.
1. Enable the **OOB** grant type in addition to the defaults.
1. Select **Allow everyone in your organization to access**, then click **Save**.
1. From the **General** tab of your app integration, copy and save the generated **Client ID** value to implement your authorization flow.

## Set up the authentication policy

In direct authentication flows, the client tells the server which authenticator it wants to authenticate with through the grant type. However, the server can't grant a token until the client’s authentication policy is satisfied.

> **Note:** This example creates a new app authentication policy with a one-factor rule for testing purposes.

1. Go to your app’s **Sign On** tab, scroll to the bottom, and click **View policy details**.
1. Click **Actions** on the right of the Default Policy title and select **Clone policy**.
1. Click **Actions** again and select **Edit name and description**.
1. Name the policy (for example, **Direct Auth OOB 1FA**), and then click **Save**.
1. Click **Add a rule**, and then name it (for example, **1Factor**).
1. Specify your test user for **AND User is**.
1. Skip down to **AND User must authenticate with** and select **Any 1 factor type**, and then click **Save**.
1. Open the application that you just created and select the **Sign On** tab.
1. Scroll to the **User authentication** section at the bottom and click **Edit**.
1. Select the authentication policy that you just created and click **Save**.

## Update the Global Session Policy

To use a one-factor direct auth grant, configure the Global Session Policy to not have a password requirement.<!-- After phase 1, this may change>

1. Select **Global Session Policy** from the left navigation.
1. Select the pencil icon of the Default Rule.
1. In the Edit Rule dialog, select **Any factor used to meet the Authentication Policy requirements** for **Establish the user session with**.
1. Leave the default of **Not required** for **Multifactor authentication (MFA) is**.
1. Click **Update rule**.
