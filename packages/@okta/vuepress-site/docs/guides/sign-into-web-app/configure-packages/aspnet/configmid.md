Open the `Web.config` file and add your Okta configuration to the `<appSettings>` section:

```xml
<configuration>
    <appSettings>
        <!-- 1. Update with your application's base URL and port: -->
        <add key="okta:RedirectUri" value="http://localhost:8080/authorization-code/callback" />

        <!-- 2. Replace these values with your Okta configuration: -->
        <add key="okta:ClientId" value="{ClientId}" />
        <add key="okta:ClientSecret" value="{ClientSecret}" />
        <add key="okta:OktaDomain" value="https://${yourOktaDomain}" />
    </appSettings>
    ...
  </configuration>
```

If your project doesn't have an OWIN Startup class, right-click your project and select **Add - OWIN Startup Class**. Name the file `Startup.cs`.

Open `Startup.cs` and modify the `Configuration` method with these lines:

```csharp
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
        });
    }
}
```
Okta middleware uses the default Custom Authorization Server by default. If you are using an Authorization Server other than the `default`, make sure to configure it by setting up the `AuthorizationServerId`. If you are using the [Org Authorization Server](/docs/concepts/auth-servers/), your middleware configuration should look like this: 

```csharp
public class Startup
{
    public void Configuration(IAppBuilder app)
    {
        // ...
        app.UseOktaMvc(new OktaMvcOptions()
        {
            OktaDomain = ConfigurationManager.AppSettings["okta:OktaDomain"],
            ClientId = ConfigurationManager.AppSettings["okta:ClientId"],
            ClientSecret = ConfigurationManager.AppSettings["okta:ClientSecret"],
            RedirectUri = ConfigurationManager.AppSettings["okta:RedirectUri"],
            AuthorizationServerId = "",
        });
    }
}
```

At the top of the file, update your `using` statements to import `Okta.AspNet` and other required namespaces:

```csharp
using System.Collections.Generic;
using System.Configuration;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Okta.AspNet;
using Owin;
```

The `OktaMvcOptions` class configures the Okta middleware. You can see all of the available options in the **Configuration Reference** section in the [ASP.NET SDK readme](https://github.com/okta/okta-aspnet/blob/master/docs/aspnet4x-mvc.md#configuration-reference).
