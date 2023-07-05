1. Click **Next**.
1. Set the app integration name, then click **Save**.

On the **General** tab, the **Client Credentials** section contains the **Client ID** and **Client secret** for your app integration. Copy these to implement your authorization flow.

### Create custom scopes

The Client Credentials flow never has a user context, so you can't request OpenID scopes. Instead, you must create a custom scope. To learn about creating custom scopes, see the **Scopes** section of [Create a custom authorization server](/docs/guides/customize-authz-server/main/#create-scopes).
