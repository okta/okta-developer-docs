Add a `SignOut` action that accepts an `HTTP POST` and signs the user out with `CookieAuthenticationDefaults.AuthenticationType`:

```csharp
public class AccountController : Controller
{
    [HttpPost]
    public ActionResult SignOut()
    {
        if (HttpContext.User.Identity.IsAuthenticated)
        {
            HttpContext.GetOwinContext()
                       .Authentication
                       .SignOut(CookieAuthenticationDefaults.AuthenticationType);
        }

        return RedirectToAction("Index", "Home");
    }
}
```

Update your `using` statements to import the `Microsoft.Owin.Security.Cookies` namespace:

```csharp
using Microsoft.Owin.Security.Cookies;
```

Finally, give the user a **Sign Out** button or link. Open your `_Layout.cshtml` file and add the following code:

```cshtml
<div>
    @*...*@
    @if (Context.User.Identity.IsAuthenticated)
    {
        <ul>
            <li>
                <p>Hello, <b>@Context.User.Identity.Name</b></p>
            </li>
            <li>
                <a onclick="document.getElementById('logout_form').submit();" style="cursor: pointer;">
                    Sign out
                </a>
            </li>
        </ul>
        <form action="/Account/SignOut" method="post" id="logout_form"></form>
    }
    else
    {
        <ul>
            <li>@Html.ActionLink("Sign in", "SignIn", "Account")</li>
        </ul>
    }
</div>
```