ASP.NET Core automatically populates `HttpContext.User` with the information Okta sends back about the user. You can check whether the user is logged in with `User.Identity.IsAuthenticated` in your actions or views, and see all of the user's claims in `User.Claims`.

```csharp
[Authorize]
public IActionResult Profile()
{
    var userClaims = HttpContext.User.Claims;
    ...
    return View();
}
```