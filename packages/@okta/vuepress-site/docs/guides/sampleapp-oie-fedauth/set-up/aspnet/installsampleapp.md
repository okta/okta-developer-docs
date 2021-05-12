1. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-aspnet.git`
2. In Visual Studio, open the `okta-aspnet-mvc-example` solution file in the `okta-hosted-login` directory.
3. Open the <StackSelector snippet="configfile" noSelector inline /> file and, in the `configuration.appSettings` section, add the information that you copied in previous steps:

```
    <add key="okta:ClientId" value="{ClientID}" />
    <add key="okta:ClientSecret" value="{ClientSecret}" />
    <add key="okta:OktaDomain" value="${yourOktaDomain}" />
    <add key="okta:AuthorizationServerId" value="{authServerId}" />
    <add key="okta:RedirectUri" value="http://localhost:8080/authorization-code/callback" />
    <add key="okta:PostLogoutRedirectUri" value="http://localhost:8080/" />
```

> **Note:** In this example we are using the "default" Custom Authorization Server. The value for `"okta:AuthorizationServerId"` is `"default"`.

You have now created your App in Okta and installed the Okta <StackSelector snippet="applang" noSelector inline /> sample app.