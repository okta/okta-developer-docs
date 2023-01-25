### 1: Your app displays the sign-in page

Build a sign-in page for your app that captures both the username and the password.

<div class="half wireframe-border">

![A sign-in form with fields for username and password and a next button](/img/wireframes/sign-in-form-username-password.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36678&t=wzNwSZkdctajVush-1 sign-in-form-username-password
 -->

</div>

> **Note**: The account's username is also its primary email address.

### 2: The user submits their username and password

When the user submits their username and password, create an `AuthenticationOptions` object and assign its `Username` and `Password` properties to the values entered by the user. Pass this object as a parameter to `IdxClient.AuthenticateAsync()`.

```csharp
var _idxClient = new IdxClient();
var authnOptions = new AuthenticationOptions {
   Username = model.UserName,
   Password = model.Password
};

var authnResponse = await _idxClient
   .AuthenticateAsync(authnOptions).ConfigureAwait(false);

```

### 3: Your app displays a list of authenticators

`AuthenticateAsync()` returns an `AuthenticationResponse` object. Query its `AuthenticationStatus` property for the current status of the authentication process. A status of `AwaitingChallengeAuthenticatorSelection` indicates that the user has supplied the correct password and must select a secondary authentication factor to verify their identity.

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

You can find the names and IDs of the available authenticators in the `AuthenticationResponse` object's `Authenticators` collection. You should redirect the user to an authenticator list page that displays all the authenticators that the user has enrolled and are ready for use. For example:

<div class="half wireframe-border">

![A choose your authenticator form with only an email authenticator option and a next button](/img/wireframes/choose-authenticator-form-email-only.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36772&t=wzNwSZkdctajVush-1 choose-authenticator-form-email-only
 -->

</div>

### 4: The user submits the email authenticator

When the user submits the email authenticator, create a `SelectAuthenticatorOptions` object and assign its `AuthenticatorId` property to the email authenticator ID. Pass this object as a parameter to `IdxClient.SelectChallengeAuthenticatorAsync()`.

```csharp
var selectAuthenticatorOptions = new SelectAuthenticatorOptions
{
    AuthenticatorId = model.AuthenticatorId,
};

selectAuthenticatorResponse = await _idxClient.SelectChallengeAuthenticatorAsync
  (selectAuthenticatorOptions, (IIdxContext)Session["IdxContext"]);
```

### 5: The user verifies their identity with the email authenticator

Identity Engine sends a verification email to the user if the call is successful. The returned `AuthenticationResponse` object has an `AuthenticationStatus` of `AwaitingAuthenticatorVerification`. This status indicates that Identity Engine is waiting for the user to check their email and either click the magic link or enter the OTP.

To learn how to support verification with magic links or OTP, see the [Okta email integration guide](/docs/guides/authenticators-okta-email/aspnet/main/#_5-submit-the-email-authenticator).

### 6: Your app handles an authentication success response

When the user correctly verifies their identity using the email authenticator, the returned `AuthenticationResponse` object has an `AuthenticationStatus` of `Success`. Call `AuthenticationHelper.GetIdentityFromTokenResponseAsync()` to retrieve the user's OIDC claims information and pass it into your application. The user has now signed in.

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

> **Note**: You can request basic user information from Okta's OpenID Connect authorization server after a user has signed in successfully. See [Get the user profile information](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/aspnet/main/#get-the-user-profile-information).
