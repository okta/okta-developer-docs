ASP.NET Core hosts an internal sign out handler which we called `/signout/callback`, you need to add it as a valid **Logout redirect URI** in Okta:

Open your Okta Developer Console:

<a href="https://login.okta.com/" target="_blank" class="Button--blue">Go to Console</a>

1. Select **Applications**, then pick your application.

2. Select **General** tab and click **Edit**.

3. Add the **Base URI** of your application followed by `/signout/callback`, such as `http://localhost:3000/signout/callback`, in the  **Logout redirect URI** section.

4. Click **Save**.


Open the controller where you will handle the Okta sign out process and add an `OktaSignOut` method. This time you need to also sign the user out of the OIDC middleware:

```csharp
public class AccountController : Controller
{
    [HttpPost]
    public IActionResult OktaSignOut()
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

