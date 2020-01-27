To create a Sign In link, open your `_Layout.cshtml` file and add the following code:

```cshtml
@if (User.Identity.IsAuthenticated)
{
    <p class="navbar-text">Hello, @User.Identity.Name</p>
}
else
{
    <a asp-controller="Account" asp-action="SignIn">Sign In</a>
}
```

The Sign In link uses tag helpers to invoke a `SignIn` action on an `Account` controller. Create an `AccountController` class with this code:

```csharp
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Okta.AspNetCore;

public class AccountController : Controller
{
    public IActionResult SignIn()
    {
        if (!HttpContext.User.Identity.IsAuthenticated)
        {
            return Challenge(OktaDefaults.MvcAuthenticationScheme);
        }

        return RedirectToAction("Index", "Home");
    }
}
```

At this point, you should be able to run the project and sign in.
