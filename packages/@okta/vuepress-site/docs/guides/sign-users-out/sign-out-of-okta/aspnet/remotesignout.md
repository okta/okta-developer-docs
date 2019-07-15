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

Then, you have to modify the Okta configuration in your application to also include the **Logout redirect URI**. See [Define the signout callback](/docs/guides/sign-users-out/define-signout-callback/) for more information on defining this URI in your application settings.

Open the `Startup.cs` file and update the `Configuration` method to include the `PostLogoutRedirectUri` in the Okta configuration:

```csharp
public class Startup
{
    public void Configuration(IAppBuilder app)
    {
        //...
        app.UseOktaMvc(new OktaMvcOptions()
        {
            //...
            PostLogoutRedirectUri = "http://localhost:3000/Account/PostSignOut",
        });
    }
}
```

Finally, add the desired logic for the post sign-out callback.
Open the controller where you handle the sign-out process and add a `PostSignOut` method:

```csharp
public class AccountController : Controller
{
    public ActionResult PostSignOut()
    {
        // Return to the home page after sign out
        return RedirectToAction("Index", "Home");
    }
}
```