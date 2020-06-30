Open your `Startup` class and modify the `ConfigureServices` method to include the Okta middleware configuration. Replace the placeholders with your Okta configuration:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    //...
    services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = OktaDefaults.MvcAuthenticationScheme;
    })
    .AddCookie()
    .AddOktaMvc(new OktaMvcOptions
    {
        // Replace these values with your Okta configuration
        OktaDomain = "https://${yourOktaDomain}",
        ClientId = "{clientId}",
        ClientSecret = "{clientSecret}"
    });
}
```

The Okta middleware uses the `default` Authorization Server by default. If you are using a [custom Authorization Server](https://developer.okta.com/docs/concepts/auth-servers/), make sure to configure it by setting up the `AuthorizationServerId`. For example, if you are using the Org Authorization Server your middleware configuration should look like this: 

```csharp
public void ConfigureServices(IServiceCollection services)
{
    //...
    .AddOktaMvc(new OktaMvcOptions
    {
        // Replace these values with your Okta configuration
        OktaDomain = "https://${yourOktaDomain}",
        ClientId = "{clientId}",
        ClientSecret = "{clientSecret}",
        AuthorizationServerId = "",
    });
}
```


Modify the `Configure` method to include the `app.UseAuthentication()` line. It must be above `UseMvc()`:

```csharp
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    //...
    app.UseAuthentication();

    app.UseMvc(routes =>
    {
        routes.MapRoute(
            name: "default",
            template: "{controller=Home}/{action=Index}/{id?}");
    });
}
```

Finally, update your `using` statements to import `Okta.AspNetCore` and other required namespaces:

```csharp
using Microsoft.AspNetCore.Authentication.Cookies;
using Okta.AspNetCore;
```

The `OktaMvcOptions` class configures the Okta middleware. You can see all of the available options in the **Configuration Reference** section in the [ASP.NET Core SDK readme](https://github.com/okta/okta-aspnet/blob/master/docs/aspnetcore-mvc.md#configuration-reference).
