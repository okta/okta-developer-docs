ASP.NET Core automatically populates `HttpContext.User` with the information Okta sends back about the user. You can check whether the user is logged in with `User.Identity.IsAuthenticated` in your actions or views, and see all of the user's claims in `User.Claims`.

To access claims in your controllers, use the `User` property which is attached to the `HttpContext` object:

```csharp
[Authorize]
public IActionResult Profile()
{
    var userClaims = HttpContext.User.Claims;
    ...
    return View();
}
```

Or directly in your views:

```cshtml
@foreach (var claim in ((ClaimsIdentity)User.Identity).Claims)
{
    <dt title="@claim.Type">@claim.Type</dt>
    <dd>@claim.Value</dd>
}
```
