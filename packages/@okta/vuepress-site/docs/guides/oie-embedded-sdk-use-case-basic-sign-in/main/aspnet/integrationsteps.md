### Your app displays the sign-in page

When the user launches the app, it will display the sign-in page.

Build a sign-in page that captures their username and password.

<div class="half wireframe-border">

![A sign-in form with fields for username and password and a next button](/img/wireframes/sign-in-form-username-password.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36678&t=wzNwSZkdctajVush-1 sign-in-form-username-password
 -->

</div>

### The user submits their username and password

Create an `AuthenticationOptions` object and assign its `Username` and `Password` properties to the values entered by the user to capture their login credentials. Pass this object as a parameter to `IdxClient.AuthenticateAsync()`.

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

### Processing `AuthenticationStatus` values

The app must handle multiple `AuthenticationStatus` values during the sign-in flow. The `AuthenticationStatus` indicates if a user's sign-in flow is successful.

#### Your app processes the authentication success response

After the user supplies their correct password, `AuthenticateAsync()` returns an `AuthenticationResponse` with an `AuthenticationStatus` of `Success`. Call `AuthenticationHelper.GetIdentityFromTokenResponseAsync()` to retrieve the user's OIDC claims information as ID tokens. You can pass these ID tokens into your app.  The tokens are stored for future requests and the user is redirected to the default page after a successful sign-in. 

#### Handling other `AuthenticationStatus` values

The `AuthenticationResponse` may return other `AuthenticationStatus` values based on the state of the user's sign-in flow. The user may need additional validation or have expired credentials.

The below code shows the sign-in flow for these `AuthenticationStatus` values through each `case` statement.

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
