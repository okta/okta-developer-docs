### 1: Your app displays the sign-in page

Create a sign-in page that captures the user's username.

<div class="half wireframe-border">

![A sign-in form with a field for the username, a next button, and links to the sign-up and forgot your password forms](/img/wireframes/sign-in-form-username-only-sign-up-forgot-your-password-links.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3401%3A37178&t=vr9MuCR8C4rCt3hC-1 sign-in-form-username-only-sign-up-forgot-your-password-links
 -->

</div>

> **Note**: The account's username is also its primary email address.

### 2: The user submits their username

When the user submits their username, create an `AuthenticationOptions` object and assign its `Username` property to the value entered by the user. Pass this object as a parameter to `IdxClient.AuthenticateAsync()`.

```csharp
var authnOptions = new AuthenticationOptions { Username = model.UserName };
var authnResponse = await _idxClient
   .AuthenticateAsync(authnOptions).ConfigureAwait(false);
```

### 3. The user verifies their identity with the email authenticator

`AuthenticateAsync()` returns an `AuthenticationResponse` object. Query its `AuthenticationStatus` property to discover the current status of the authentication process. A status of `AwaitingChallengeAuthenticatorSelection` indicates that the user needs to verify their identity with the email authenticator challenge.

```csharp
switch (authnResponse?.AuthenticationStatus)
{
   case AuthenticationStatus.AwaitingChallengeAuthenticatorSelection:
      Session["authenticators"] = ViewModelHelper.
         ConvertToAuthenticatorViewModelList(authnResponse.Authenticators);
      Session["isChallengeFlow"] = true;
      return RedirectToAction("SelectAuthenticator", "Manage");

   // other case statements

   default:
      return View("Login", model);
}
```

The email authenticator supports user verification by one-time passcode (OTP) and by magic links. To learn more, see the [Okta email integration guide](/docs/guides/authenticators-okta-email/aspnet/main/#integrate-email-challenge-with-magic-links).

### 4. Your app handles an authentication success response

After the user verifies their identity using the email authenticator, the status of the authentication process is `Success`. Call `AuthenticationHelper.GetIdentityFromTokenResponseAsync()` to retrieve the user's OIDC claims information and pass it into your application. The user has now signed in.

```csharp
var authnResponse = await _idxClient.VerifyAuthenticatorAsync(
   verifyAuthenticatorOptions, (IIdxContext)Session["idxContext"]);
Session["idxContext"] = authnResponse.IdxContext;

switch (authnResponse.AuthenticationStatus)
{

   case AuthenticationStatus.Success:
      ClaimsIdentity identity = await AuthenticationHelper
         .GetIdentityFromTokenResponseAsync(
            _idxClient.Configuration, authnResponse.TokenInfo);
      _authenticationManager.SignIn(new AuthenticationProperties(), identity);
      return RedirectToAction("Index", "Home");

   // other case statements
}

return View(view, model);
```

Store these tokens for future requests and redirect the user to the default page after a successful sign-in attempt.

> **Note:** In cases where additional sign-in authenticators are required, the user needs to choose and verify all required authenticators before Identity Engine returns an `AuthenticationStatus` equal to `SUCCESS`.
