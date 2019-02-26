---
exampleDescription: ASP.NET 4.x authorization code example
---

## Okta ASP.NET 4.x Quickstart

If you want a full, working example, head over to the [ASP.NET examples GitHub] and follow the `README` instructions.

### Create a new project

If you don't already have an ASP.NET project, create one using the ASP.NET Web Application (MVC) template in Visual Studio. Choose **No Authentication** as the authentication type.

Install these packages in the new project:

* [Microsoft.Owin.Security.Cookies] 4.0.0 or higher
* [Microsot.Owin.Host.SystemWeb] 4.0.0 or higher
* [Okta.AspNet]


### Add a Startup class

Add a Startup class to your project by right-clicking on the project in the Solution Explorer and choosing **Add** > **OWIN Startup Class**. Name the file `Startup.cs`.

Paste this code into the new class:

```csharp
public class Startup
{
    public void Configuration(IAppBuilder app)
    {
        app.SetDefaultSignInAsAuthenticationType(CookieAuthenticationDefaults.AuthenticationType);

        app.UseCookieAuthentication(new CookieAuthenticationOptions());

        app.UseOktaMvc(new OktaMvcOptions()
        {
            OktaDomain = ConfigurationManager.AppSettings["okta:OktaDomain"],
            ClientId = ConfigurationManager.AppSettings["okta:ClientId"],
            ClientSecret = ConfigurationManager.AppSettings["okta:ClientSecret"],
            RedirectUri = ConfigurationManager.AppSettings["okta:RedirectUri"],
            PostLogoutRedirectUri = ConfigurationManager.AppSettings["okta:PostLogoutRedirectUri"],
            GetClaimsFromUserInfoEndpoint = true,
            Scope = new List<string> {"openid", "profile", "email"},
        });
    }
    
}
```

**Note**: If you are using .NET framework <4.6 or you are getting the following error: ```The request was aborted: Could not create SSL/TLS secure channel ```. Make sure to include the following code in the `Application_Start` or `Startup`:

```csharp
// Enable TLS 1.2
ServicePointManager.SecurityProtocol |= SecurityProtocolType.Tls12;
```

Add these using statements at the top of the file:

```csharp
using System.Collections.Generic;
using System.Configuration;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Okta.AspNet;
using Owin;
```

### Additional middleware configuration

The `OktaMvcOptions` class configures the Okta middleware. You can see all the available options in the [Okta ASP.NET middleware GitHub].

### Configure the application in Okta

If you haven't already, sign in to your Okta developer account (or [create one](https://developer.okta.com/signup/)). Create or update an application in Okta with these settings:

* **Application type**: Web
* **Allowed grant types**: Authorization Code, Implicit (Hybrid) - Allow ID Token
* **Login redirect URI**: `http://localhost:8080/authorization-code/callback`
* **Logout redirect URI**: `http://localhost:8080/Account/PostLogout`

If you are creating an Okta application from scratch, click **Done** to see the full settings page and make sure the settings match the values above.

### Set up the project port

The local port may be different on your machine. Right-click on the project and choose  **Properties**, then **Web**. If it's different than 8080, update the **Project Url** and save your changes.

![Project port settings](/assets/img/vs-project-port.png "Project port settings")

**Note**: You can also find the assigned port by running the application.

If you want to use a different port update the URIs in Okta and in `Web.config` as well.

### Configure the project

Open the `Web.config` file and add your Okta configuration to the `<appSettings>` section.

Check out the [Okta ASP.NET middleware GitHub] to see more details about this step.

### Secure your application

Use the `[Authorize]` attribute on controllers or actions to require a logged-in user:

```csharp
[Authorize]
public ActionResult Protected()
{
    // Only for logged-in users!
    return View();
}
```

Create a basic `AccountController` to handle login and logout:

```csharp
public class AccountController : Controller
{
    public ActionResult Login()
    {
        if (!HttpContext.User.Identity.IsAuthenticated)
        {
            HttpContext.GetOwinContext().Authentication.Challenge(
                OktaDefaults.MvcAuthenticationType);
            return new HttpUnauthorizedResult();
        }

        return RedirectToAction("Index", "Home");
    }

    [HttpPost]
    public ActionResult Logout()
    {
        if (HttpContext.User.Identity.IsAuthenticated)
        {
            HttpContext.GetOwinContext().Authentication.SignOut(
                CookieAuthenticationDefaults.AuthenticationType,
                OktaDefaults.MvcAuthenticationType);
        }

        return RedirectToAction("Index", "Home");
    }

    public ActionResult PostLogout()
    {
        return RedirectToAction("Index", "Home");
    }
}
```

Add these using statements at the top of the `AccountController.cs` file:

```csharp
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OpenIdConnect;
using Okta.AspNet;
using System.Web;
using System.Web.Mvc;
```

You can also update your views to show whether the user is logged in. Add this code to `_Layout.cshtml`:

```html
<div class="navbar-collapse collapse">
    <ul class="nav navbar-nav">
        <li>@Html.ActionLink("Home", "Index", "Home")</li>
        <li>@Html.ActionLink("About", "About", "Home")</li>
        <li>@Html.ActionLink("Contact", "Contact", "Home")</li>
    </ul>
    @if (Context.User.Identity.IsAuthenticated)
    {
        <ul class="nav navbar-nav navbar-right">
            <li>
                <p class="navbar-text">Hello, <b>@Context.User.Identity.Name</b></p>
            </li>
            <li>
                <a onclick="document.getElementById('logout_form').submit();" style="cursor: pointer;">Log out</a>
            </li>
        </ul>
        <form action="/Account/Logout" method="post" id="logout_form"></form>
    }
    else
    {
        <ul class="nav navbar-nav navbar-right">
            <li>@Html.ActionLink("Log in", "Login", "Account")</li>
        </ul>
    }
</div>
```

### Run the project

Start the project in Visual Studio and try logging in or navigating to a route that has the `[Authorize]` attribute. You'll be redirected to the Okta Sign-In page.

### That's it!

ASP.NET automatically populates `HttpContext.User` with the information Okta sends back about the user. You can check whether the user is logged in with `User.Identity.IsAuthenticated` in your actions or views.

The [ASP.NET examples GitHub] has more examples of authenticating and interacting with the user's information (claims).

If you want to do more with the user, you can use the [Okta .NET SDK] to get or update the user's details stored in Okta.


[ASP.NET examples GitHub]: https://github.com/okta/samples-aspnet
[Microsoft.Owin.Security.Cookies]: https://www.nuget.org/packages/Microsoft.Owin.Security.Cookies
[Okta.AspNet]: https://nuget.org/packages/Okta.AspNet
[Microsot.Owin.Host.SystemWeb]: https://www.nuget.org/packages/Microsoft.Owin.Host.SystemWeb
[Okta ASP.NET middleware GitHub]: https://github.com/okta/okta-aspnet/blob/master/README.md
[Okta .NET SDK]: https://github.com/okta/okta-sdk-dotnet
