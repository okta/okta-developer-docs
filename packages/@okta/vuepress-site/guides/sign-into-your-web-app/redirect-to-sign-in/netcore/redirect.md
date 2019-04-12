In the previous step [Add a Sign In button](add-signin-button) you modified the `_Layout.cshtml` to include the Login button. Now, you need a controller to redirect the user to the Okta hosted sign-in page to perform the authentication process.

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

At this point, you should be able to **run the project** and logging in! 
