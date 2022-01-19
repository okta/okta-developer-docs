4. Select either **Native Application**, **Single-Page Application**, or **Web Application** (depending on the type of application that you are working on) as the **Application type**, then click **Next**.
5. Specify the **App integration name**.
6. Select **Interaction Code** and **Refresh Token** as the **Grant type**.
7. Specify the **Sign-in redirect URIs** to redirect the user with their Interaction Code.
8. Fill in the remaining details for your app integration, then click **Save**.

> **Note:**  Remember to add the appropriate path in your app for redirection.

From the **General** tab of your app integration, save the generated **Client ID** value to implement your authorization flow. If you have a web application, you also need to save the **Client secret** value.

### Enable the Interaction Code grant on an application

If you have an existing app registered in Okta and want to enable the app to use the Interaction Code flow, complete the following steps to enable the Interaction Code grant.

1. In the Admin Console, go to **Applications** > **Applications**.
2. Select your app from the application list.
3. From the **General** tab, click **Edit** in the **General Settings** panel.
4. In the **Grant type** > **Client acting on behalf of a user** option, select the **Interaction Code** check box (retain any other grant type that your app currently supports).
5. Click **Save**.
