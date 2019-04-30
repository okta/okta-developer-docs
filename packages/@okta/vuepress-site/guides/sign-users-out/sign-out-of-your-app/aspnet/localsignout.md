Open the controller where you will handle the sign out process and add a `SignOut` method to delete the application cookies:

```csharp
public class AccountController : Controller
{
    [HttpPost]
    public ActionResult SignOut()
    {
        if (HttpContext.User.Identity.IsAuthenticated)
        {
            HttpContext.GetOwinContext().Authentication.SignOut(CookieAuthenticationDefaults.AuthenticationType);
        }

        return RedirectToAction("Index", "Home");
    }
}
```

Update your using statements to import the `Microsoft.Owin.Security.Cookies` namespace:

```csharp
using Microsoft.Owin.Security.Cookies;
```