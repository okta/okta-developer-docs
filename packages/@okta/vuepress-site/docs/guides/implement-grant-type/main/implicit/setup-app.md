5. Select **Single-Page Application** as the **Application type**, then click **Next**.

    > **Note:** It's important to choose the appropriate application type for apps that are public clients. Not doing so may result in an Okta API attempting to verify an app's client secret, which public clients aren't designed to have. This would break the app's sign-in and sign-out flows.

1. Enter the **App integration name**.
1. Click **Advanced** in the **Grant type** section, and then select **Implicit (hybrid)**.
    **Note**: If you're using Okta Classic Engine, select **Implicit (hybrid)** in the **Grant type** section.
1. In the **Sign-in redirect URIs** box, enter the callback location where Okta returns the browser (along with the access token).
1. Complete the remaining details for your app integration, then click **Save**.

On the **General** tab, the **Client Credentials** section contains the **Client ID** for your app integration. Save the **Client ID** to implement your authorization flow.
