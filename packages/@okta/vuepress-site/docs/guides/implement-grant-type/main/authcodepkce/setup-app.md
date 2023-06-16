4. Select either **Native Application** or **Single-Page Application** (depending on the type of application that you are working on) as the **Application type**, then click **Next**.

    > **Note:** It is important to choose the appropriate application type for apps that are public clients. Failing to do so may result in Okta API endpoints attempting to verify an app's client secret, which public clients are not designed to have and would break the sign-in or sign-out flow.

5. Specify the **App integration name**.
6. **Authorization Code** is selected automatically as a **Grant type**. In addition, select **Refresh Token**.

    > **Note:** For mobile applications, **Authorization Code** is required.

7. Specify the **Sign-in redirect URIs** to redirect the user with their authorization code.
8. Fill in the remaining details for your app integration, then click **Save**.

On the **General** tab, the **Client Credentials** section contains the **Client ID** for your app integration. It also shows the **Client authentication** that defaults to **None**. The use of **None** for client authentication requires the use of a Proof Key for Code Exchange (PKCE) for additional verification. PKCE ensures that only the client that requests the access token can redeem it.

Save the generated **Client ID** value to implement your authorization flow.
