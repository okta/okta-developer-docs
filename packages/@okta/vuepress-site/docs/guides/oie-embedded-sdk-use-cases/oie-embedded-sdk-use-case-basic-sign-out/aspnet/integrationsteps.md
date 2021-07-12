## Integration steps

### Step 1: Create a sign out UI element

The first step is to create a link, button, or another similar UI
element that allows the user to sign out of the app.

<div class="common-image-format">

![Sign out link](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-out-link.png
 "Sign out link")

</div>

### Step 2: Revoke access token

When the sign out is initiated, create the following flow:

1. Obtain the access token from the session state. This token was placed into
   the session state during the
   [user sign in](/docs/guides/oie-embedded-sdk-use-cases/aspnet/oie-embedded-sdk-use-case-basic-sign-in/).
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

### Step 3: Send user to the signed out page

After the user is signed out, send them to the desired page.
