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
<dl class="dl-horizontal">
    @foreach (var claim in ((ClaimsIdentity)User.Identity).Claims)
    {
        <dt title="@claim.Type">
            @claim.Type
            <button type="button"
                    class="btn btn-link btn-xs"
                    aria-label="Copy to clipboard"
                    title="Copy to clipboard"
                    data-clipboard-text="@claim.Value">
                <span class="glyphicon glyphicon glyphicon-copy" aria-hidden="true"></span>
            </button>
        </dt>

        <dd id="@String.Format("{0}-claim", claim.Type)">@claim.Value</dd>
    }
</dl>
```
