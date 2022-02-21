> **Note:** The aforementioned "Issuer URI" is made up of two parts - the "base URI" and the "authorizationServerId". Using the Okta.AspNetCore library, all you will need is the base URI: `https://dev-133337.okta.com/oauth2/default`.

1. Configure the Okta.AspNetCore middleware with information about your Okta Org. You can see all of the available options in the **Configuration Reference** section in the [Okta ASP.NET Core GitHub](https://github.com/okta/okta-aspnet/blob/master/docs/aspnetcore-webapi.md#configuration-reference) repo.

2. Update the `appsettings.json` file to include a top-level Okta object:

```json
{
  "Okta": {
    "OktaDomain": "https://dev-133337.okta.com",
    "AuthorizationServerId": "default",
    "Audience": "api://default"
  }
}
```

  Alternatively, you can use [another configuration option](​​https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-3.1) to handle this as well.

3. Next, update your `Startup` class and update your `using` statements to import `Okta.AspNetCore`:

```csharp
using Okta.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
```

4. Change the `ConfigureServices` method to include the Okta middleware configuration:

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
    AuthorizationServerId = Configuration["Okta:AuthorizationServerId"],
    Audience = Configuration["Okta:Audience"]
  });

  services.AddAuthorization();

  services.AddControllers();
}
```

5. Modify the `Configure` method to include `app.UseAuthentication()` and `app.UseAuthorization()`:

```csharp
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
  //...
  app.UseRouting();

  // enable authentication and authorization
  app.UseAuthentication(); 
  app.UseAuthorization();

  app.UseEndpoints(endpoints =>
  {
    endpoints.MapControllers();
  });
}
```