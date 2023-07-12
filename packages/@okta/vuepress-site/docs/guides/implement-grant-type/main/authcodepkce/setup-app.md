5. Select either **Native Application** or **Single-Page Application** (depending on the type of application that you’re building) as the **Application type**, then click **Next**.

    > **Note:** It's important to choose the appropriate application type for apps that are public clients. Not doing so may result in an Okta API attempting to verify an app's client secret, which public clients aren't designed to have. This would break the app's sign-in and sign-out flows.

1. Enter the **App integration name**.
1. Verify that **Authorization Code** is selected as a **Grant type**. In addition, select **Refresh Token**.

    > **Note:** For mobile applications and SPAs, **Authorization Code** is required.

1. In the **Sign-in redirect URIs** box, enter the callback location where Okta returns the browser (along with their authorization code).
1. Complete the remaining details for your app integration, then click **Save**.

On the **General** tab, the **Client Credentials** section contains the **Client ID** for your app integration. It also shows that **Client authentication** defaults to **None**. The use of **None** for client authentication requires the use of PKCE for additional verification. PKCE ensures that only the client that requests the access token can redeem it.

Save the generated **Client ID** value to implement your authorization flow.
