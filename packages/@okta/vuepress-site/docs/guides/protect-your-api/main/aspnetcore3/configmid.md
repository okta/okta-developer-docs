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
        OktaDomain = Configuration["Okta:OktaDomain"],
    });

    services.AddAuthorization();
    
    services.AddControllers();
}
```

Modify the `Configure` method to have the `app.UseAuthentication()` and `app.UseAuthorization()` lines:

```csharp
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    //...
    app.UseRouting();

    app.UseAuthentication();

    app.UseAuthorization();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    });
}
```

Update your `using` statements to import `Okta.AspNetCore`:

```csharp
using Okta.AspNetCore;
```

The `OktaWebApiOptions` class configures the Okta middleware. You can see all of the available options in the **Configuration Reference** section in the [Okta ASP.NET Core GitHub](https://github.com/okta/okta-aspnet/blob/master/docs/aspnetcore-webapi.md#configuration-reference) repo.
