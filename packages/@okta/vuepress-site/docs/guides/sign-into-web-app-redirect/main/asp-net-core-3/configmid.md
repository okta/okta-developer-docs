The Okta CLI created an `.okta.env` file in your current directory containing these values, for example:

```properties
export OKTA_OAUTH2_ISSUER=https://${yourOktaDomain}/oauth2/${authorizationServerId}
export OKTA_OAUTH2_CLIENT_ID=${clientId}
export OKTA_OAUTH2_CLIENT_SECRET=${clientSecret}
```

1. Open your `appsettings.json` file and add the following manually as a top-level node, replacing the placeholders with your own values (if you used the Okta CLI to create an app these values may already be configured with your account information).

   ```json
   "Okta": {
     "OktaDomain": "https://${yourOktaDomain}",
     "ClientId": "${clientId}",
     "ClientSecret": "${clientSecret}", "AuthorizationServerId": "default"
   }
   ```

2. You also need to configure your MVC app to enable cookies and OpenID Connect as the default protocol for authentication. Open `Startup.cs` and add the following using statements at the top:

   ```csharp
   using Microsoft.AspNetCore.Authentication.Cookies;
   using Microsoft.AspNetCore.Authentication.OpenIdConnect;
   using Okta.AspNetCore;
   ```

3. Replace the existing `ConfigureServices` method with the following:

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
           // Replace these values with your Okta configuration
           OktaDomain = Configuration.GetValue<string>("Okta:OktaDomain"),
           AuthorizationServerId = Configuration.GetValue<string>("Okta:AuthorizationServerId"),
       ClientId = Configuration.GetValue<string>("Okta:ClientId"),
       ClientSecret = Configuration.GetValue<string>("Okta:ClientSecret"),
       Scope = new List<string> { "openid", "profile", "email" },
     });

     services.AddControllersWithViews();
   }
   ```

4. In the `Configure` method, add the following line immediately above `app.UseAuthorization();`:

   ```cs
   app.UseAuthentication();
   ```
