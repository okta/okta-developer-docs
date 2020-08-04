Open the controller where you handle the sign-out process and update the `SignOut` action. This time you need to also sign the user out of the Okta OIDC middleware with `OktaDefaults.MvcAuthenticationType`:

```csharp
public class AccountController : Controller
{
    [HttpPost]
    public ActionResult SignOut()
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
Update your `using` statements to import the following namespaces:

```csharp
using Microsoft.Owin.Security.Cookies;
using Okta.AspNet;
```