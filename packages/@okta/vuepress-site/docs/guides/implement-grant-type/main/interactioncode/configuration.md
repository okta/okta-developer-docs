## Set up your authorization server

To use the Interaction Code flow, both your client app and the [Okta Authorization Server](/docs/concepts/auth-servers/) that you are using with the app must have the Interaction Code grant type enabled in your Okta org.

If your Okta org is enabled with Identity Engine, then the Interaction Code grant type is automatically configured in your [Org Authorization Server](/docs/concepts/auth-servers/#org-authorization-server). However, if you’re using a [Custom Authorization Server](/docs/concepts/auth-servers/#custom-authorization-server) with your app, you must enable the Interaction Code grant type for that authorization server.

> **Note:** See [Create an authorization server](/docs/guides/customize-authz-server/) to create your own Custom Authorization Server.

### Enable Interaction Code grant on your authorization server

1. In the Admin Console, go to **Security** > **API**.
2. On the **Authorization Servers** tab, select the pencil icon next to the Custom Authorization Server that you want to update.
3. Select the **Access Policies** tab.
4. Select the pencil icon from the **Actions** column for the **Default Policy Rule**.
    If you aren’t using the Default Policy for your client app that requires the Interaction Code grant, select the Policy that applies to your app.
5. In the **Edit Rule** dialog box, select the **Interaction Code** check box (in addition to any other grant type that is already supported by the authorization server).
6. Click **Update Rule**.
