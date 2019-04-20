Open your `Startup` class and modify the `ConfigureServices` method to include the Okta middleware configuration. Replace the placeholders with your Okta configuration:

```
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
        OktaDomain = "https://{yourOktaDomain}",
        ClientId = "{clientId}",
        ClientSecret = "{clientSecret}"
    });
}
```

Modify the `Configure` method to include the `app.UseAuthentication()` line. It must be above `UseMvc()`:

```
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

```
using Microsoft.AspNetCore.Authentication.Cookies;
using Okta.AspNetCore;
```

The `OktaMvcOptions` class configures the Okta middleware. You can see all of ßthe available options in the **Configuration Reference** section in the [ASP.NET Core SDK readme](https://github.com/okta/okta-aspnet/blob/master/docs/aspnetcore-mvc.md#configuration-reference).
