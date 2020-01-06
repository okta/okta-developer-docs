Add a `SignOut` action that accepts an `HTTP POST` and signs the user out with `CookieAuthenticationDefaults.AuthenticationScheme`:

```csharp
public class AccountController : Controller
{
    [HttpPost]
    public async Task<IActionResult> SignOutAsync()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

        return RedirectToAction("Index", "Home");
    }
}
```

Update your `using` statements to import the following namespaces:

```csharp
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Okta.AspNetCore;
```

Finally, give the user a **Sign Out** button or link. Open your `_Layout.cshtml` file and add the following code:

```cshtml
<div>
    @*...*@
    @if (User.Identity.IsAuthenticated)
    {
        <ul>
            <li><p>Hello, @User.Identity.Name</p></li>
            <li>
                <a onclick="document.getElementById('logout_form').submit();" style="cursor: pointer;">
                    Sign out
                </a>
            </li>
        </ul>
        <form asp-controller="Account" asp-action="SignOutAsync" method="post" id="logout_form"></form>
    }
    else
    {
        <ul>
            <li><a asp-controller="Account" asp-action="SignIn">Sign in</a></li>
        </ul>
    }
</div>
```