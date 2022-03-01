1. By default, the redirect to the sign-in page happens automatically when users access a protected route. In Visual Studio, to create a universal sign-in link, expand **Views** > **Shared** and open your `_Layout.cshtml` file.

2. Insert the following code directly above `<ul class="navbar-nav flex-grow-1>`:

```csharp
@if (User.Identity.IsAuthenticated)
{
  <ul class="nav navbar-nav navbar-right">
    <li><p class="navbar-text">Hello, @User.Identity.Name</p></li>
    <li><a class="nav-link" asp-controller="Home" asp-action="Profile" id="profile-button">Profile</a></li>
    <li>
      <form class="form-inline" asp-controller="Account" asp-action="SignOut" method="post">
        <button type="submit" class="nav-link btn btn-link text-dark" id="logout-button">Sign Out</button>
      </form>
    </li>
  </ul>
}
  else
{
  <ul class="nav navbar-nav navbar-right">
    <li><a asp-controller="Account" asp-action="SignIn" id="login-button">Sign In</a></li>
  </ul>
}
```

3. Now you need to handle the `Sign In` click. Create an empty MVC Controller named `AccountController` in the `Controllers` folder.

4. Add the following `using` statements to the top of the controller:

```csharp
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Okta.AspNetCore;
```

5. Add a new `IActionResult` for `SignIn`:

```csharp
public IActionResult SignIn()
{
  if (!HttpContext.User.Identity.IsAuthenticated)
  {
    return Challenge(OktaDefaults.MvcAuthenticationScheme);
  }

  return RedirectToAction("Index", "Home");
}
```

6. Add another `IActionResult` right below it for `SignOut`:

```csharp
[HttpPost]
public IActionResult SignOut()
{
return new SignOutResult(
        new[]
                {
        OktaDefaults.MvcAuthenticationScheme,
        CookieAuthenticationDefaults.AuthenticationScheme,
        },
                new AuthenticationProperties { RedirectUri = "/Home/" });
}
```
