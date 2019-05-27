ASP.NET Core hosts an internal sign-out handler at `/signout/callback`. You need to add it as a valid **Logout redirect URI** in Okta:

Open your Okta Developer Console:

<a href="https://login.okta.com/" target="_blank" class="Button--blue">Go to Console</a>

1. Select **Applications**, and then pick your application.

2. Select **General** and click **Edit**.

3. In the **Logout redirect URI section**, add the **Base URI** of your application followed by `/signout/callback`, for example, `http://localhost:3000/signout/callback`.

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

Update your `using` statements to import the following namespaces:

```csharp
using Microsoft.AspNetCore.Authentication.Cookies;
using Okta.AspNetCore;
```

After you sign users out of your app and out of Okta, you can also redirect users to a specific location. Modify your `SignOut` action to include the action what you want to redirect to, for example, `Home`:

```csharp
[HttpPost]
public IActionResult SignOut()
{
    return new SignOutResult(
        new[]
        {
                OktaDefaults.MvcAuthenticationScheme,
                CookieAuthenticationDefaults.AuthenticationScheme,
        },
        new AuthenticationProperties { RedirectUri = "/Home/" });
}

```
