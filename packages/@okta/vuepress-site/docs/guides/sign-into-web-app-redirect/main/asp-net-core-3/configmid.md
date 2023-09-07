1. Open `appsettings.json` and add the following as a top-level node, replacing the placeholders with your own values.

   ```json
   "Okta": {
     "OktaDomain": "https://${yourOktaDomain}",
     "ClientId": "${clientId}",
     "ClientSecret": "${clientSecret}",
     "AuthorizationServerId": "default"
   }
   ```

1. You also need to configure your MVC app to enable cookies and OpenID Connect as the default protocol for authentication.
   1. Open `Startup.cs` and add the following `using` statements at the top:

      ```csharp
      using Microsoft.AspNetCore.Authentication.Cookies;
      using Microsoft.AspNetCore.Authentication.OpenIdConnect;
      using Okta.AspNetCore;
      ```

   1. Replace the existing `ConfigureServices` method with the following:

      ```csharp
      public void ConfigureServices(IServiceCollection services)
      {
         services.ConfigureApplicationCookie(options =>
         {
            options.Cookie.HttpOnly = true;
            options.Cookie.SecurePolicy = Microsoft.AspNetCore.Http.CookieSecurePolicy.Always;
         })
         .AddAuthentication(options =>
         {
               options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
               options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
         })
         .AddCookie()
         .AddOktaMvc(new OktaMvcOptions
         {
            OktaDomain = Configuration.GetValue<string>("Okta:OktaDomain"),
            AuthorizationServerId = Configuration.GetValue<string>("Okta:AuthorizationServerId"),
            ClientId = Configuration.GetValue<string>("Okta:ClientId"),
            ClientSecret = Configuration.GetValue<string>("Okta:ClientSecret"),
            Scope = new List<string> { "openid", "profile", "email" },
         });

         services.AddControllersWithViews();
      }
      ```

   1. In the `Configure` method, add the following line immediately above `app.UseAuthorization();`:

      ```cs
      app.UseAuthentication();
      ```
