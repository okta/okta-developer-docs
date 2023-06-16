1. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-aspnet-webforms.git`
2. In Visual Studio, open the `okta-aspnet-webforms-example` solution file in the `okta-hosted-login` directory.
3. Open the `web.config` file and, in the `configuration.appSettings` section, add the information that you copied in previous steps:

```
    <add key="okta:ClientId" value="${clientId}" />
    <add key="okta:ClientSecret" value="${clientSecret}" />
    <add key="okta:OktaDomain" value="${yourOktaDomain}" />
    <add key="okta:AuthorizationServerId" value="${authorizationServerId}" />
    <add key="okta:RedirectUri" value="https://localhost:44314/authorization-code/callback" />
    <add key="okta:PostLogoutRedirectUri" value="https://localhost:44314/" />
```

   > **Note:** In this example we are using the "default" custom authorization server. The value for `"okta:AuthorizationServerId"` is `"default"`.

You have now created your App in Okta and installed the <StackSelector snippet="applang" noSelector inline /> sample app.
