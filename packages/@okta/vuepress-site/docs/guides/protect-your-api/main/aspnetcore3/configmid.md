1. Open your `appsettings.json` file and add the following manually as a top-level node (if you used the Okta CLI to create an app these values may already be configured with your account information).

   ```json
   {
     "Okta": {
       "OktaDomain": "https://${yourOktaDomain}",
       "AuthorizationServerId": "${yourAuthServerName}",
       "Audience": "${yourAudience}"
     }
   }
   ```

2. Configure your API to use Okta for authorization and authentication. Open `Startup.cs` and add the following `using` statements at the top:

   ```csharp
   using Okta.AspNetCore;
   using Microsoft.AspNetCore.Authorization;
   using Microsoft.AspNetCore.Mvc.Authorization;
   ```

3. Replace the existing `ConfigureServices` method with the following to include the Okta middleware configuration:

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

4. In the `Configure` method, add the following line immediately above `app.UseAuthorization();`:

   ```csharp
   app.UseAuthentication();
   ```