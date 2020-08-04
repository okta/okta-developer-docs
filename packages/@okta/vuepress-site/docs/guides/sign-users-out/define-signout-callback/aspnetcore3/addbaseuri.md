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