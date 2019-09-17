---
exampleDescription: ASP.NET Core 2.0+ API implicit example
---

## Okta ASP.NET Core Web API Quickstart

If you want a full, working example, head over to the [ASP.NET Core Samples][example-repo] repository.

### Create a new project

If you don't already have an ASP.NET Core project, create one using `dotnet new mvc` or the ASP.NET Core Web Application template in Visual Studio. Choose **No Authentication** if necessary.

Install these packages in the new project:
* [Microsoft.AspNetCore.All] (most projects will depend on this)
* [Okta.AspNetCore]

### Configure the middleware

Make sure you have these `using` statements at the top of your `Startup.cs` file:

```csharp
using Okta.AspNetCore;
```

Add the following code anywhere in your `ConfigureServices` method, and add your Okta configuration:
<DomainAdminWarning />

```csharp
services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = OktaDefaults.ApiAuthenticationScheme;
    options.DefaultChallengeScheme = OktaDefaults.ApiAuthenticationScheme;
    options.DefaultSignInScheme = OktaDefaults.ApiAuthenticationScheme;
})
.AddOktaWebApi(new OktaWebApiOptions()
{
    OktaDomain = "https://{yourOktaDomain}"
});

// ... the rest of ConfigureServices
services.AddMvc();
```

Then, in the `Configure` method, add this line **above** the `UseMvc` line:

```csharp
app.UseAuthentication();
```

### Additional middleware configuration

The `OktaMvcOptions` class configures the Okta middleware. You can see all the available options in the project's `README` [on GitHub][config reference]. Once you have the middleware working, you can place the Okta configuration in `appsettings.json` and reference it with the Configuration pattern:

```csharp
OktaDomain = Configuration["Okta:OktaDomain"]
```

### Protect application resources

Use the `[Authorize]` attribute on controllers or actions to require an authenticated user. For example, you could create an `/api/messages` route in a new controller that returns secret messages if a valid token is present:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Produces("application/json")]
[Authorize]
public class MessagesController : Controller
{
    [HttpGet]
    [Route("~/api/messages")]
    public JsonResult Get()
    {
        var principal = HttpContext.User.Identity as ClaimsIdentity;

        var login = principal.Claims
            .SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)
            ?.Value;

        return Json(new
        {
            messages = new dynamic[]
            {
                new { Date = DateTime.Now, Text = "I am a Robot." },
                new { Date = DateTime.Now, Text = "Hello, world!" },
            }
        });
    }
}
```

### That's it!

The Okta middleware automatically validates tokens and populates `HttpContext.User` with a limited set of user information.

If you want to do more with the user, you can use the [Okta .NET SDK] to get or update the user's details stored in Okta.

> **Note:** If your client application is running on a different server (or port) than your ASP.NET Core server, you'll need to add [CORS middleware](https://docs.microsoft.com/en-us/aspnet/core/security/cors) to the pipeline as well. Check out our [`resource server` sample](https://github.com/okta/samples-aspnetcore/tree/master/resource-server) which is pre-configured with an open CORS policy to make it easy to test with frontend projects!

[config reference]:https://github.com/okta/okta-aspnet/blob/master/docs/aspnetcore-webapi.md#configuration-reference
[example-repo]: https://github.com/okta/samples-aspnetcore/
[Microsoft.AspNetCore.All]: https://www.nuget.org/packages/Microsoft.AspNetCore.All 
[Okta.AspNetCore]: https://www.nuget.org/packages/Okta.AspNetCore
[Okta .NET SDK]: https://github.com/okta/okta-sdk-dotnet
