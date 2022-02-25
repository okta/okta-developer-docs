ASP.NET Core automatically populates `HttpContext.User` with the information Okta sends back about the user. You can check whether the user is signed in with `User.Identity.IsAuthenticated` in your actions or views and see all of the user's claims in `User.Claims`.

1. Open up your `HomeController` and add this `using` statement:

```csharp
using Microsoft.AspNetCore.Authorization;
```

2. Add a new `IActionResult` called `Profile` to hand the claim data over to your View:

```csharp
[Authorize]
public IActionResult Profile()
{
 return View(HttpContext.User.Claims);
}
```

3. Expand your `Views` folder, add a new empty Razor View named `Profile.cshtml` to the `Home` folder, and replace the contents of the new file with the following code:

```csharp
@model IEnumerable<System.Security.Claims.Claim>

@{
    ViewBag.Title = "View claims";
}

<h2>@ViewBag.Title</h2>

<dl class="dl-horizontal">
    @foreach (var claim in Model)
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

        <dd id="claim-@String.Format("{0}", claim.Type)">@claim.Value</dd>
    }
</dl>
```