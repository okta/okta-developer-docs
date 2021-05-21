ASP.NET Core hosts an internal sign-out handler at `/signout/callback`. You need to add it as a valid **Sign-out redirect URIs** in Okta. See [Define the signout callback](/docs/guides/sign-users-out/define-signout-callback/) for more information on defining this URI in your application settings.

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

After users sign out of Okta, they are redirected to the location defined in <GuideLink link="../define-signout-callback">Define the sign-out callback</GuideLink> section.
