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

Update your using statements to import the following namespaces:

```csharp
using Microsoft.Owin.Security.Cookies;
using Okta.AspNet;
```

After you sign users out of your app and out of Okta, you can also redirect users to a specific location after signing out. You need to whitelist the post sign-out URL in your Okta Application settings.

Open the Okta Developer Console:

<a href="https://login.okta.com/" target="_blank" class="Button--blue">Go to Console</a>

1. Select **Applications**, and then pick your application.

2. Select **General** and click **Edit**.

3. Add the post sign-out URL in the  **Logout redirect URI** field, for example, `http://localhost:3000/account/postsignout`.

4. Click **Save**.

Then, you have to modify the Okta configuration in your application to also include the **Logout redirect URI**.
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
Open the controller where you handle the sign out process and add a `PostSignOut` method:

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