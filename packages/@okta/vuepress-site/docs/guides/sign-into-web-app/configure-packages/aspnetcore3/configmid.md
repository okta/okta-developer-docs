
Open your `Startup` class and update your `using` statements to import `Okta.AspNetCore` and other required namespaces:

```csharp
using Okta.AspNetCore;
```

Modify the `ConfigureServices` method to include the Okta middleware configuration. Replace the placeholders with your Okta configuration:

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
        OktaDomain = "https://{yourOktaDomain}",
        ClientId = "{clientId}",
        ClientSecret = "{clientSecret}"
    });

    services.AddControllersWithViews();
}
```

Okta middleware uses the [default Custom Authorization Server](/docs/concepts/auth-servers/#default-custom-authorization-server) by default. Ensure you configure `AuthorizationServerId` for the Authorization Server that you are using for your app:

* If you're using the [default Custom Authorization Server](/docs/concepts/auth-servers/#default-custom-authorization-server), set `AuthorizationServerId = "default"`.
* If you're using your own [Custom Authorization Server](/docs/concepts/auth-servers/#custom-authorization-server), set `AuthorizationServerId = "{authServerId}"`.
* If you're using the [Org Authorization Server](/docs/concepts/auth-servers/#org-authorization-server), set `AuthorizationServerId = ""`.

Here's an example of a middleware configuration that uses the Org Authorization Server:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    //...
    .AddOktaMvc(new OktaMvcOptions
    {
        // Replace these values with your Okta configuration
        OktaDomain = "https://{yourOktaDomain}",
        ClientId = "{clientId}",
        ClientSecret = "{clientSecret}",
        AuthorizationServerId = "",
    });
}
```

Finally, modify the `Configure` method to include the `app.UseAuthentication()` and `app.UseAuthorization()` lines:

```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    //...
    app.UseAuthentication();

    app.UseAuthorization();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllerRoute(
            name: "default",
            pattern: "{controller=Home}/{action=Index}/{id?}");
    });
}
```

The `OktaMvcOptions` class configures the Okta middleware. You can see all of the available options in the **Configuration Reference** section in the [ASP.NET Core SDK readme](https://github.com/okta/okta-aspnet/blob/master/docs/aspnetcore-mvc.md#configuration-reference).
