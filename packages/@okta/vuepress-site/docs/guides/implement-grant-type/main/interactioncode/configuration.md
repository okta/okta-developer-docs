## Verify that the Interaction Code grant type is enabled

You must enable the Interaction Code grant type for your org, [authorization server](/docs/concepts/auth-servers/), and app integration so you can use the Interaction Code flow.

### Enable Interaction Code grant for your org

The **Embedded widget sign-in support** setting in your Admin Console enables or disables the Interaction Code grant type for your org. With this setting enabled, you can allow or deny apps the ability to use embedded sign-in flows across your entire org.

> **Note:** [Super Admin permissions](https://help.okta.com/okta_help.htm?id=ext_superadmin) are required. If you don’t have those permissions for your org, contact your administrator.

To access this setting:

1. Open the [Admin Console](/docs/concepts/okta-organizations/#admin-console) for your org.
1. Go to **Settings** > **Account** > **Embedded widget sign-in support**.
1. Click **Edit**.
1. Select the **Interaction code** checkbox to enable Interaction Code as a grant type.
1. Click **Save**.

If you enable the Interaction Code grant type, the number of applications and authorization servers that use the Interaction Code grant type appear.

If you disable the Interaction Code grant type:

* No OIDC app integrations or API calls can use the Interaction grant type. Okta returns an error saying **the client isn't authorized to use the provided grant type** if you don’t reconfigure them accordingly.
* Access rules for authorization servers don't show the Interaction Code as an available grant type.
* Interaction Code grant type **isn’t** re-enabled for your app integrations or authorization servers when you re-enable it for your org.

## Enable Interaction Code grant for your authorization server

After you [enable the Interaction Code grant for your org](#enable-interaction-code-grant-for-your-org), it’s automatically configured in your [org authorization server](/docs/concepts/auth-servers/#org-authorization-server). If you're using a [custom authorization server](/docs/concepts/auth-servers/#custom-authorization-server), you need to enable Interaction Code grant for it in the Admin Console:

1. Open the **Admin Console** for your org.
1. Go to **Security** > **API**.
1. Select the **Authorization Servers** tab, and then select the pencil icon next to the custom authorization server that you want to update.
1. Select the **Access Policies** tab.
1. Select the pencil icon from the **Actions** column for the policy that applies to your app. For example, the **Default Policy Rule**.
1. Locate the **Edit Rule** dialog box, and then select the **Interaction Code** checkbox.

     <VerifyICGrantType />

1. Click **Update Rule**.

> **Note:** See [Create an authorization server](/docs/guides/customize-authz-server/) to create your own custom authorization server.
