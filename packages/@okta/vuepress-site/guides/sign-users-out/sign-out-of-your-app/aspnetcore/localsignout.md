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

Update your using statements to import the following namespaces:

```csharp
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Threading.Tasks;
```

Finally, give the user a **Sign Out** button or link. Open your `_Layout.cshtml` file and add the following code:

```cshtml
<div class="navbar-collapse collapse">
    @*...*@
    @if (User.Identity.IsAuthenticated)
    {
            <ul class="nav navbar-nav navbar-right">
                <li><p class="navbar-text">Hello, @User.Identity.Name</p></li>
                <li><a onclick="document.getElementById('logout_form').submit();" style="cursor: pointer;">Sign out</a></li>
            </ul>
            <form asp-controller="Account" asp-action="SignOut" method="post" id="logout_form"></form>
    }
    else
    {
                <ul class="nav navbar-nav navbar-right">
                    <li><a asp-controller="Account" asp-action="Login">Sign in</a></li>
                </ul>
    }
    </div>
</div>
```