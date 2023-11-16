1. Open `appsettings.json` and add the following as a top-level node, replacing the placeholders with your own values.

   ```json
   {
     "Okta": {
       "OktaDomain": "https://${yourOktaDomain}",
       "AuthorizationServerId": "${yourAuthServerName}",
       "Audience": "${yourAudience}"
     }
   }
   ```

1. You must also configure your API to use Okta for authorization and authentication.
   1. Open `Startup.cs` and add the following `using` statements at the top:

      ```csharp
      using Okta.AspNetCore;
      using Microsoft.AspNetCore.Authorization;
      using Microsoft.AspNetCore.Mvc.Authorization;
      ```

   1. Replace the existing `ConfigureServices` method with the following:

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

   1. In the `Configure` method, add the following line immediately above `app.UseAuthorization();`:

      ```csharp
      app.UseAuthentication();
      ```
