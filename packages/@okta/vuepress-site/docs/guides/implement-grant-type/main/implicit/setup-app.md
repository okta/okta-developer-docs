4. Select **Single-Page Application** as the **Application type**, then click **Next**.

    > **Note:** It is important to choose the appropriate application type for apps that are public clients. Failing to do so may result in Okta API endpoints attempting to verify an app's client secret, which public clients are not designed to have and would break the sign-in or sign-out flow.

5. Specify the app integration name.
6. Select **Implicit (Hybrid)** as the **Grant type**.
7. Specify the **Sign-in redirect URIs** where the User is directed to along with the access token.
8. Fill in the remaining details for your app integration, then click **Save**.

Save the Okta Client ID (`client_id`) value generated from the created app integration to implement your authorization flow.
