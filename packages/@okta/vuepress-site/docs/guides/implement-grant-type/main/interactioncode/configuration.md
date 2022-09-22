## Verify that the Interaction Code grant type is enabled

<ApiLifecycle access="ea" />

The Interaction Code grant type is a sign-in flow used by embedded applications to connect to Okta. The **Embedded widget sign-in support** setting controls this grant type for all OpenID Connect and API access management servers in your org. With this setting enabled, you can allow or deny apps the ability to use embedded sign-in flows across your entire org. See [Interaction Code grant type](/docs/concepts/interaction-code/) for detailed information on this grant type and how to use it.

> **Note:** Super Admin permissions are required. If you don’t have those permissions for your org, contact your administrator.

1. To access this setting, from your Okta org's [Admin Console](/docs/concepts/okta-organizations/#admin-console), go to **Settings** > **Account** > **Embedded widget sign-in support**.
1. Click **Edit**.
1. Select the checkbox if you want to use the Interaction Code as a grant type for your OpenID Connect app integrations and authorization servers.

   If the **Interaction code** checkbox is selected, the number of applications and authorization servers that use the Interaction Code grant type appear.

   If you disable the Interaction Code grant type:

   * You can’t configure any new OpenID Connection app integrations to use the Interaction Code grant.
   * For any app integrations previously configured to use the Interaction Code grant type, the grant type is disabled and no longer an available option.
   * Users that attempt to sign in to the app integration receive a message that the client isn’t authorized to use the provided grant type.
   * Access rules for authorization servers don't show the Interaction Code as an available grant type.
   * When an API call is made using the Interaction Code grant type, Okta returns an error message that the client isn’t authorized to use the provided grant type.
   * If you disable this feature for your org and then re-enable it, the Interaction Code grant type isn't automatically re-enabled for any app integration or authorization server.

1. Click **Save**.

## Set up your authorization server

To use the Interaction Code flow, both your client app and the [Okta Authorization Server](/docs/concepts/auth-servers/) that you are using with the app must have the Interaction Code grant type enabled in your Okta org.

If your Okta org is enabled with Identity Engine, then the Interaction Code grant type is automatically configured in your [Org Authorization Server](/docs/concepts/auth-servers/#org-authorization-server). For custom authorization servers that you are using with your app, verify that the Interaction Code grant type is an available option. If it isn’t, go to **Settings** > **Account** > **Embedded widget sign-in support**. See [Verify that the Interaction Code grant type is enabled](/docs/guides/implement-grant-type/interactioncode/main/#verify-that-the-interaction-code-grant-type-is-enabled) for more information on how to toggle the Interaction Grant type for your org. <ApiLifecycle access="ea" />

> **Note:** See [Create an authorization server](/docs/guides/customize-authz-server/) to create your own Custom Authorization Server.

### Enable Interaction Code grant on your authorization server

1. In the Admin Console, go to **Security** > **API**.
2. On the **Authorization Servers** tab, select the pencil icon next to the Custom Authorization Server that you want to update.
3. Select the **Access Policies** tab.
4. Select the pencil icon from the **Actions** column for the **Default Policy Rule**.
    If you aren’t using the Default Policy for your client app that requires the Interaction Code grant, select the Policy that applies to your app.
5. In the **Edit Rule** dialog box, select the **Interaction Code** check box (in addition to any other grant type that is already supported by the authorization server).

     <VerifyICGrantType />

6. Click **Update Rule**.
