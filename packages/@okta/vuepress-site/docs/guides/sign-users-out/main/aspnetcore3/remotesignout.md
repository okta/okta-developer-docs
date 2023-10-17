ASP.NET Core hosts an internal sign-out handler at `/signout/callback`. Set **Sign-out redirect URIs** to this value in the Admin Console. See [Define the sign-out callback](#define-the-sign-out-callback).

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

Then, update your `using` statements to import the following namespaces:

```csharp
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Okta.AspNetCore;
```

After users sign out of Okta, they’re redirected to the location defined in the [Define the sign-out callback](#define-the-sign-out-callback) section.
