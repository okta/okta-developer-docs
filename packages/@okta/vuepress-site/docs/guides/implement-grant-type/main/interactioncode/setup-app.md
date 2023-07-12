5. For **Application type**, select **Native Application**, **Single-Page Application**, or **Web Application** (depending on the type of application that you're creating), then click **Next**.
1. Enter the **App integration name**.
1. Select **Interaction Code** and **Refresh Token** as allowed **Grant type**s.

   <VerifyICGrantType />

1. In the **Sign-in redirect URIs** box, enter the callback location where Okta returns the browser (along with their Interaction Code).
1. Enter the remaining details for your app integration, then click **Save**.

> **Note:**  Remember to add the appropriate path in your app for redirection.

From the **General** tab of your app integration, save the generated **Client ID** and **Client secret** values to implement your authorization flow.

### Enable the Interaction Code grant on an application

Complete the following steps to enable the Interaction Code grant for an existing app integration.

1. Open the **Admin Console** for your org.
1. Choose **Applications > Applications** to show the available app integrations.
1. Select your app integration from the list.
1. Locate the **General Settings** panel on the **General** tab, and then click **Edit**.
1. Select the **Interaction code** checkbox under the **Grant type**.

   <VerifyICGrantType />

1. Click **Save**.
