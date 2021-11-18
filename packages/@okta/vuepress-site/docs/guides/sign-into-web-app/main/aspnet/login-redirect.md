To create a Sign In link, open your `_Layout.cshtml` file and add the following code:

```cshtml
@if (Context.User.Identity.IsAuthenticated)
{
    <p>Hello, <b>@Context.User.Identity.Name</b></p>
}
else
{
    <li>@Html.ActionLink("Sign In", "Login", "Account")</li>
}
```

The Sign In link uses `Html.ActionLink` to invoke a `Login` action on an `Account` controller. Create an `AccountController` class with this code:

```csharp
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OpenIdConnect;
using Okta.AspNet;
using System.Web;
using System.Web.Mvc;

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

At this point, you should be able to run the project and sign in.
