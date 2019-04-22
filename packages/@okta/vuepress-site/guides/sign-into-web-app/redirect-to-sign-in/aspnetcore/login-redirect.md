When accessing protected resources, ASP.NET Core redirects the user to an Okta sign-in page automatically. You can control which routes are protected with the `[Authorize]` attribute, which is covered in [Require Authentication](../-/require-authentication/).

You can also give the user a **Sign In** button or link. Open your `_Layout.cshtml` file and add code the following code:

```csharp
<div class="navbar-collapse collapse">
    <ul class="nav navbar-nav">
        <li><a asp-area="" asp-controller="Home" asp-action="Index">Home</a></li>
        <li><a asp-area="" asp-controller="Home" asp-action="About">About</a></li>
        <li><a asp-area="" asp-controller="Home" asp-action="Contact">Contact</a></li>
    </ul>

    @if (User.Identity.IsAuthenticated)
    {
        <ul class="nav navbar-nav navbar-right">
            <li><p class="navbar-text">Hello, @User.Identity.Name</p></li>
            <li><a asp-controller="Home" asp-action="Profile">Profile</a></li>
        </ul>
    }
    else
    {
        <ul class="nav navbar-nav navbar-right">
            <li><a asp-controller="Account" asp-action="Login">Sign In</a></li>
        </ul>
    }
</div>
```

The Sign In link uses tag helpers to invoke a `Login` action on an `Account` controller. Create an `AccountController` class with this code:

```csharp
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

Update your `using` statements to import the required namespaces:

```csharp
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Okta.AspNetCore;
```

At this point, you should be able to **run the project** and sign in.