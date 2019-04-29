Open your `Startup` class and modify the `ConfigureServices` method to include the Okta middleware configuration. Replace the placeholders with your Okta configuration:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = OktaDefaults.ApiAuthenticationScheme;
        options.DefaultChallengeScheme = OktaDefaults.ApiAuthenticationScheme;
        options.DefaultSignInScheme = OktaDefaults.ApiAuthenticationScheme;
    })
    .AddOktaWebApi(new OktaWebApiOptions()
    {
        OktaDomain = "https://{yourOktaDomain}",
    });

    services.AddMvc();
}
```

Modify the `Configure` method to have the `app.UseAuthentication()` line. It must be above `app.UseMvc`:

```csharp
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    //...
    app.UseAuthentication();
    app.UseMvc();
}
```

Update your using statements to import `Okta.AspNetCore`:

```csharp
using Okta.AspNetCore;
```

The `OktaWebApiOptions` class configures the Okta middleware. You can see all of the available options in the **Configuration Reference** section in the [Okta ASP.NET Core GitHub](https://github.com/okta/okta-aspnet/blob/master/docs/aspnetcore-webapi.md#configuration-reference) repo.