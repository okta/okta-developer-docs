4. Select either **Native Application** or **Single-Page Application** (depending on the type of application that you are working on) as the **Application type**, then click **Next**.

    > **Note:** It is important to choose the appropriate application type for apps that are public clients. Failing to do so may result in Okta API endpoints attempting to verify an app's client secret, which public clients are not designed to have and would break the sign-in or sign-out flow.

5. Specify the **App integration name**.
6. Select **Authorization Code** and **Refresh Token** as the **Grant type**.
7. Specify the **Sign-in redirect URIs** to redirect the User with their authorization code.
8. Fill in the remaining details for your app integration, then click **Save**.

From the **General** tab of your app integration, save the generated **Client ID** and **Client secret** values to implement your authorization flow.
