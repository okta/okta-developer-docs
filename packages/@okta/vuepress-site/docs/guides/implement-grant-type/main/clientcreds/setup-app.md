4. Click **Next**.
5. Specify the app integration name, then click **Save**.

From the **General** tab of your app integration, save the generated **Client ID** and **Client secret** values to implement your authorization flow.

### Create custom scopes

The Client Credentials flow never has a user context, so you can't request OpenID scopes. Instead, you must create a custom scope. See the **Scopes** section of the [Create a Custom Authorization Server](/docs/guides/customize-authz-server/main/#create-scopes) guide for more information on creating custom scopes.