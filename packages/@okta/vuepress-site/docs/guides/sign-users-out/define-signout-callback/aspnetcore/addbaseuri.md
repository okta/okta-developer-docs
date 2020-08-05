Follow your base URI with `/signout/callback` (for example, `http://localhost:3000/signout/callback`).

After you sign users out of your app and out of Okta, you can redirect users to a specific location. Modify your `SignOut` action to include the action that you want to redirect to (for example, `Home`):

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

In ASP.NET Core, you have two redirect options for your app after the user is signed out of Okta:

* Define the sign-out callback in the Developer Console and add it to your configuration using `PostLogoutRedirectUri`. This is the same approach as ASP.NET.
* Add your redirect URI in the `AuthenticationProperties` as shown on line 15 of this file:

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
        new AuthenticationProperties { RedirectUri = "/Home/" }); // Redirect to /Home after sign out
}
```
