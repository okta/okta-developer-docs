ASP.NET Core hosts an internal sign-out handler at `/signout/callback`. You need to add it as a valid **Logout redirect URI** in Okta:

Open your Okta Developer Console:

<a href="https://login.okta.com/" target="_blank" class="Button--blue">Go to Console</a>

1. Select **Applications**, then pick your application.

2. Select **General** tab and click **Edit**.

3. Add the **Base URI** of your application followed by `/signout/callback`, such as `http://localhost:3000/signout/callback`, in the  **Logout redirect URI** section.

4. Click **Save**.


Open the controller where you handle the sign-out process and update the `SignOut` action. This time you need to also sign the user out of the Okta OIDC middleware with `OktaDefaults.MvcAuthenticationScheme`:

```csharp
public class AccountController : Controller
{
    [HttpPost]
    public IActionResult SignOut()
    {
        return new SignOutResult(new[] { OktaDefaults.MvcAuthenticationScheme, 
                                         CookieAuthenticationDefaults.AuthenticationScheme });
    }
}
```

Update your using statements to import the following namespaces:

```csharp
using Microsoft.AspNetCore.Authentication.Cookies;
using Okta.AspNetCore;
```

After you sign users out of your app and out of Okta, you can also redirect users to a specific location after signing out. You need to whitelist the post sign-out URL in your Okta Application settings.

Open the Okta Developer Console:

<a href="https://login.okta.com/" target="_blank" class="Button--blue">Go to Console</a>

1. Select **Applications**, and then pick your application.

2. Select **General** and click **Edit**.

3. Add the post sign-out URL in the  **Logout redirect URI** field, for example, `http://localhost:3000/account/postsignout`.

4. Click **Save**.

Then, you have to modify the Okta configuration in your application to also include the **Logout redirect URI**.
Open the `Startup.cs` file and update the `ConfigureServices` method to include the `PostLogoutRedirectUri` in the Okta configuration:

```csharp
public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        //...
        services.AddOktaMvc(new OktaMvcOptions()
        {
            //...
            PostLogoutRedirectUri = "http://localhost:3000/Account/PostSignOut",
        }
    }
}
```

Finally, add the desired logic for the post sign-out callback.
Open the controller where you handle the sign out process and add a `PostSignOut` method:

```csharp
public IActionResult PostSignOut()
{
    // Return to the home page after sign out
    return RedirectToAction("Index", "Home");
}
```

