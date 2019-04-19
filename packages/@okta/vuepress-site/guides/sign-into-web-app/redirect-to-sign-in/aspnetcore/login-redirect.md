When accessing protected resources, ASP.NET Core redirects the user to an Okta sign-in page automatically. You can also force this with a **Login** button by redirecting to `/oauth2/authorization/okta`.

Open your `_Layout.cshtml` file and update the `body` with the following code to include the Sign-In button:

```
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
            <li><a onclick="document.getElementById('logout_form').submit();" style="cursor: pointer;">Log out</a></li>
        </ul>
        <form asp-controller="Account" asp-action="Logout" method="post" id="logout_form"></form>
    }
    else
    {
        <ul class="nav navbar-nav navbar-right">
            <li><a asp-controller="Account" asp-action="Login">Log in</a></li>
        </ul>
    }
</div>
```

Next, we show you how to create an `AccountController` to redirect the user to the Okta hosted sign-in page to perform the authentication process.

Create an `AccountController`:

```
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

```
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Okta.AspNetCore;
```

At this point, you should be able to **run the project** and sign in.