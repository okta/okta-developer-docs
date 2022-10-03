### 1: Create a sign-out UI element

The first step is to create a link, button, or another similar UI
element that allows the user to sign out of the app.

### 2: Revoke the access token

When the sign out is initiated, create the following flow:

1. Obtain the access token from the session state. This token was placed into
   the session state during the
   [user sign-in flow](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/aspnet/main/).
   The code snippet uses objects from the
  `Microsoft.Owin.Security` to manage the session state of the tokens.
1. Call the `RevokeTokensAsync` method on the `IDXClient` passing in the
   access token obtained in step 1.

```csharp
var client = new IdxClient();
           var accessToken = HttpContext.GetOwinContext().Authentication.User.Claims.FirstOrDefault(x => x.Type == "access_token");
           await client.RevokeTokensAsync(TokenType.AccessToken, accessToken.Value);
           _authenticationManager.SignOut();
           return RedirectToAction("Login", "Account");
```

### 3: Send the user to the signed-out page

After the user is signed out, send them to the desired page.
