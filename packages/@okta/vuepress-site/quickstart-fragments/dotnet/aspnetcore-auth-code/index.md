---
exampleDescription: ASP.NET Core 2.0+ MVC authorization code example
---

## Okta ASP.NET Core MVC Quickstart

If you want a full, working example, head over to the [ASP.NET Core Samples][example-repo] repository.

### Create a new project

If you don't already have an ASP.NET Core project, create one using `dotnet new mvc` or the ASP.NET Core Web Application template in Visual Studio. Choose **No Authentication** as the authentication type.

Install these packages in the new project:
* [Microsoft.AspNetCore.All] (most projects will depend on this)
* [Okta.AspNetCore]

### Add a Startup class

Make sure you have these `using` statements at the top of your `Startup.cs` file:

```csharp
using Microsoft.AspNetCore.Authentication.Cookies;
using Okta.AspNetCore;
```

Add the following code anywhere in your `ConfigureServices` method, and add your Okta configuration:
<DomainAdminWarning />

```csharp
services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = OktaDefaults.MvcAuthenticationScheme;
})
.AddCookie()
.AddOktaMvc(new OktaMvcOptions
{
    OktaDomain = "https://{yourOktaDomain}",
    ClientId = "{clientId}",
    ClientSecret = "{clientSecret}"
});

// ... the rest of ConfigureServices
services.AddMvc();
```

Then, in the `Configure` method, add this line **above** the `UseMvc` line:

```csharp
app.UseAuthentication();
```

### Additional middleware configuration

The `OktaMvcOptions` class configures the Okta middleware. You can see all the available options in the project's `README` [on GitHub][github-aspnetcore]. Once you have the middleware working, you can place the Okta configuration in `appsettings.json` and reference it with the Configuration pattern:

```chsarp
OktaDomain = Configuration["Okta:Domain"],
ClientId = Configuration["Okta:ClientId"],
```

### Secure your application's routes

With this middleware in place, use the `[Authorize]` attribute on controllers or actions to require a logged-in user:

```csharp
[Authorize]
public IActionResult Protected()
{
    // Only for logged-in users!
    return View();
}
```

Alternatively, you can create actions to log the user in (or out):

```csharp
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Okta.AspNetCore;

public class AccountController : Controller
{
    public IActionResult Login()
    {
        if (!HttpContext.User.Identity.IsAuthenticated)
        {
            return Challenge(OktaDefaults.MvcAuthenticationScheme);
        }

        return RedirectToAction("Index", "Home");
    }

    [HttpPost]
    public IActionResult Logout()
    {
        return new SignOutResult(new[]
        {
            OktaDefaults.MvcAuthenticationScheme,
            CookieAuthenticationDefaults.AuthenticationScheme
        });
    }
}
```

### Run the project

Start the project in Visual Studio, or with this command:

```
dotnet run
```

Open `http://localhost:8080` in a private or incognito window in your browser. (Note that your port may be be a random number instead of 8080.)

Try navigating to a route that has the `[Authorize]` attribute, or to the `/Account/Login` action you created above. You'll be redirected to the Okta Sign-In page.

### That's it!

ASP.NET Core automatically populates `HttpContext.User` with the information Okta sends back about the user. You can check whether the user is logged in with `User.Identity.IsAuthenticated` in your actions or views, and see all of the user's claims in `User.Claims`.


The [ASP.NET Core Samples repository][example-repo] has more examples of authenticating and interacting with the user's information (claims).

If you want to do more with the user, you can use the [Okta .NET SDK] to get or update the user's details stored in Okta.

[example-repo]: https://github.com/okta/samples-aspnetcore
[github-aspnetcore]: https://github.com/okta/okta-aspnet
[Okta .NET SDK]: https://github.com/okta/okta-sdk-dotnet
[Microsoft.AspNetCore.All]: https://www.nuget.org/packages/Microsoft.AspNetCore.All
[Okta.AspNetCore]: https://www.nuget.org/packages/Okta.AspNetCore
