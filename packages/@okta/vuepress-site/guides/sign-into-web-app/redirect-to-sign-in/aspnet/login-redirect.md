When accessing protected resources, ASP.NET redirects the user to an Okta sign-in page automatically. You can also force this with a **Login** button by redirecting to `/oauth2/authorization/okta`.


Open your `_Layout.cshtml` file and update the `body` with the following code to include the Sign-In button:

```
<div class="navbar-collapse collapse">
    <ul class="nav navbar-nav">
        <li>@Html.ActionLink("Home", "Index", "Home")</li>
        <li>@Html.ActionLink("About", "About", "Home")</li>
        <li>@Html.ActionLink("Contact", "Contact", "Home")</li>
    </ul>
    @if (Context.User.Identity.IsAuthenticated)
    {
        <ul class="nav navbar-nav navbar-right">
            <li>
                <p class="navbar-text">Hello, <b>@Context.User.Identity.Name</b></p>
            </li>
            <li>
                <a onclick="document.getElementById('logout_form').submit();" style="cursor: pointer;">Log out</a>
            </li>
        </ul>
        <form action="/Account/Logout" method="post" id="logout_form"></form>
    }
    else
    {
        <ul class="nav navbar-nav navbar-right">
            <li>@Html.ActionLink("Log in", "Login", "Account")</li>
        </ul>
    }
</div>
```

Next, we show you how to create an `AccountController` to redirect the user to the Okta hosted sign-in page to perform the authentication process.

Create an `AccountController`:

```
public class AccountController : Controller
{
    public ActionResult Login()
    {
        if (!HttpContext.User.Identity.IsAuthenticated)
        {
            HttpContext.GetOwinContext().Authentication.Challenge(
                OktaDefaults.MvcAuthenticationType);
            return new HttpUnauthorizedResult();
        }

        return RedirectToAction("Index", "Home");
    }

    [HttpPost]
    public ActionResult Logout()
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

Update your `using` statements to import the required namespaces:

```
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OpenIdConnect;
using Okta.AspNet;
using System.Web;
using System.Web.Mvc;
```

At this point, you should be able to **run the project** and sign in.