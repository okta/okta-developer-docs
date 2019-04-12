Open your `Startup` class and modify the `ConfigureServices` method to include the Okta middleware configuration. Replace the placeholders with your Okta configuration:

```
public void ConfigureServices(IServiceCollection services)
{
    ...
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

You can also store your Okta configuration values in the `appsettings.json`:


```
  "Okta": {
    "ClientId": "{clientId}",
    "ClientSecret": "{clientSecret}",
    "OktaDomain": "https://{yourOktaDomain}",
  }

```

Then reference them via the Configuration pattern:

 ```
var oktaMvcOptions = new OktaMvcOptions()
{
    OktaDomain = Configuration.GetSection("Okta").GetValue<string>("OktaDomain"),
    ClientId = Configuration.GetSection("Okta").GetValue<string>("ClientId"),
    ClientSecret = Configuration.GetSection("Okta").GetValue<string>("ClientSecret"),
};

 ```

Modify the `Configure` method to have the `app.UseAuthentication()` line. It must be above `app.UseMvc`:

```
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    ...
    app.UseAuthentication();
    app.UseMvc(routes =>
    {
        routes.MapRoute(
            name: "default",
            template: "{controller=Home}/{action=Index}/{id?}");
    });
}
```
Update your `using` statements to import `Okta.AspNetCore` and other required namespaces:

```
using Microsoft.AspNetCore.Authentication.Cookies;
using Okta.AspNetCore;
```

The `OktaMvcOptions` class configures the Okta middleware. You can see all of ßthe available options in the **Configuration Reference** section in the [Okta ASP.NET Core GitHub](https://github.com/okta/okta-aspnet/blob/master/docs/aspnetcore-mvc.md#configuration-reference).