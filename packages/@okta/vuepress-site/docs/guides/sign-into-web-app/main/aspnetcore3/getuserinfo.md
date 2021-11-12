ASP.NET Core automatically populates `HttpContext.User` with the information Okta sends back about the user. You can check whether the user is signed in with `User.Identity.IsAuthenticated` in your actions or views and see all of the user's claims in `User.Claims`.

To access claims in your controllers, use the `User` property that is attached to the `HttpContext` object:

```csharp
[Authorize]
public IActionResult Profile()
{
    var userClaims = HttpContext.User.Claims;
    ...
    return View();
}
```

Or use the `User` property directly in your views:

```cshtml
@using System.Security.Claims;
//...
@foreach (var claim in ((ClaimsIdentity)User.Identity).Claims)
{
    <dt title="@claim.Type">@claim.Type</dt>
    <dd>@claim.Value</dd>
}
```
