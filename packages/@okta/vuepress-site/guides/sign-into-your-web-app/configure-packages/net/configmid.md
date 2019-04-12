Open the `Web.config` file and add your Okta configuration into the `<appSettings>` section:
```
<configuration>
    <appSettings>
        <!-- 1. Replace these values with your Okta configuration -->
        <add key="okta:ClientId" value="{ClientId}" />
        <add key="okta:ClientSecret" value="{ClientSecret}" />
        <add key="okta:OktaDomain" value="https://{yourOktaDomain}" />

        <!-- 2. Update the Okta application with these values -->
        <add key="okta:RedirectUri" value="http://localhost:8080/authorization-code/callback" />
        <add key="okta:PostLogoutRedirectUri" value="http://localhost:8080/Account/PostLogout" />
    </appSettings>
    ...
  </configuration>
  ```

Now add an OWIN Startup class to your project where you have to configure the Okta middleware. Right-click your project and select **Add | OWIN Startup Class**. Name the file `Startup.cs`.

Paste the following code into the new class:

```
public class Startup
{
    public void Configuration(IAppBuilder app)
    {
        app.SetDefaultSignInAsAuthenticationType(CookieAuthenticationDefaults.AuthenticationType);
        app.UseCookieAuthentication(new CookieAuthenticationOptions());
        app.UseOktaMvc(new OktaMvcOptions()
        {
            OktaDomain = ConfigurationManager.AppSettings["okta:OktaDomain"],
            ClientId = ConfigurationManager.AppSettings["okta:ClientId"],
            ClientSecret = ConfigurationManager.AppSettings["okta:ClientSecret"],
            RedirectUri = ConfigurationManager.AppSettings["okta:RedirectUri"],
            PostLogoutRedirectUri = ConfigurationManager.AppSettings["okta:PostLogoutRedirectUri"],
        });
    }
}
```

Update your `using` statements to import `Okta.AspNet` and other required namespaces:

```
using System.Collections.Generic;
using System.Configuration;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Okta.AspNet;
using Owin;
```

**Note:** If you are using .NET framework <4.6 or you are getting the following error: "The request was aborted: Could not create SSL/TLS secure channel." Make sure to include the following code in the `Application_Start` or Startup:

```
// Enable TLS 1.2
ServicePointManager.SecurityProtocol |= SecurityProtocolType.Tls12;
```

The `OktaMvcOptions` class configures the Okta middleware. You can see all of the available options in the **Configuration Reference** section in the [Okta ASP.NET GitHub](https://github.com/okta/okta-aspnet/blob/master/docs/aspnet4x-mvc.md#configuration-reference).