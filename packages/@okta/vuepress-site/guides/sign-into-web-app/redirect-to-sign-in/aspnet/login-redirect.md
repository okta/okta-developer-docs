When accessing protected routes, ASP.NET redirects the user to an Okta sign-in page automatically. You can control which routes are protected with the `[Authorize]` attribute, which is covered in [Require Authentication](../-/require-authentication/).

You can also give the user a **Sign In** button or link. Open your `_Layout.cshtml` file and add the following code:

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
        </ul>
    }
    else
    {
        <ul class="nav navbar-nav navbar-right">
            <li>@Html.ActionLink("Sign In", "Login", "Account")</li>
        </ul>
    }
</div>
```

The Sign In uses `Html.ActionLink` to invoke a `Login` action on an `Account` controller. Create an `AccountController` class with this code:

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