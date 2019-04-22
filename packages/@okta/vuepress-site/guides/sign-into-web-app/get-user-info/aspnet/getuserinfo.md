ASP.NET automatically populates `HttpContext.User` with the information Okta sends back about the user. You can check whether the user is logged in with `User.Identity.IsAuthenticated` in your actions or views.

```csharp
[Authorize]
public ActionResult Profile()
{
    var userClaims = HttpContext.GetOwinContext().Authentication.User.Claims;
    ...
    return View();
}
```