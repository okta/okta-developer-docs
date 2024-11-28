### 1. Display the sign-in page

Build a sign-in page that captures both the user's name and their password.

<div class="half wireframe-border">

![A sign-in form with fields for username and password and a next button](/img/wireframes/sign-in-form-username-password.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36678&t=wzNwSZkdctajVush-1 sign-in-form-username-password
 -->

</div>

### 2. Handle user credentials

When the user submits their username and password, create an `AuthenticationOptions` object and assign its `Username` and `Password` properties to the values entered by the user. Pass this object as a parameter to `IdxClient.AuthenticateAsync()`.

```csharp
var idxAuthClient = new IdxClient();
var authnOptions = new AuthenticationOptions()
   {
      Username = model.UserName,
      Password = model.Password,
   };

var authnResponse = await idxAuthClient
   .AuthenticateAsync(authnOptions).ConfigureAwait(false);
```

### 3. Handle a successful authentication response

When the user correctly enters their password, `AuthenticateAsync()` returns an `AuthenticationResponse` object with an `AuthenticationStatus` property equal to `Success`. Call `AuthenticationHelper.GetIdentityFromTokenResponseAsync()` to retrieve the user's OIDC claims information as ID tokens and pass it into your app. The user has now signed in.

```csharp
switch (authnResponse.AuthenticationStatus)
{
   case AuthenticationStatus.Success:
      ClaimsIdentity identity = await AuthenticationHelper
         .GetIdentityFromTokenResponseAsync(
            _idxClient.Configuration, authnResponse.TokenInfo);
      _authenticationManager.SignIn(
         new AuthenticationProperties { IsPersistent = model.RememberMe },
         identity);
      return RedirectToAction("Index", "Home");

   case AuthenticationStatus.PasswordExpired:
      // User has to change their password

   case AuthenticationStatus.AwaitingChallengeAuthenticatorSelection:
      // User has to verify their identity with another authentication factor

   default:
      return View("Login", model);
}

return View(view, model);
```

Store these tokens for future requests and redirect the user to the default page after a successful sign-in attempt.
