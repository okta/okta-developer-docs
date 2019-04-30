Open the controller where you will handle the Okta sign out process and add an `OktaSignOut` method. This time you need to also sign the user out of the OIDC middleware:

```csharp
public class AccountController : Controller
{
    [HttpPost]
    public ActionResult OktaSignOut()
    {
        if (HttpContext.User.Identity.IsAuthenticated)
        {
            HttpContext.GetOwinContext().Authentication.SignOut(
                CookieAuthenticationDefaults.AuthenticationType,
                OktaDefaults.MvcAuthenticationType);
        }

        return RedirectToAction("Index", "Home");
    }
}
```

Update your using statements to import the following namespaces:

```csharp
using Microsoft.Owin.Security.Cookies;
using Okta.AspNet;
```