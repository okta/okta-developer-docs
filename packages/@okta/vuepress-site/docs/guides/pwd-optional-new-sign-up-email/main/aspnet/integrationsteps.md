### 1: Your app displays sign-up link on sign-in page

Add a link to your app's sign-in page. When the user clicks this link, redirect them to a sign-up page where they can sign up for a new account.

<div class="half wireframe-border">

![A sign-in form with a field for the username, a next button, and links to the sign-up and forgot your password forms](/img/wireframes/sign-in-form-username-only-sign-up-forgot-your-password-links.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3401%3A37178&t=vr9MuCR8C4rCt3hC-1 sign-in-form-username-only-sign-up-forgot-your-password-links
 -->

</div>

### 2: Your app displays sign-up page

Create a sign-up page that captures the user's first name, last name, and email address.

<div class="half wireframe-border">

![A sign-up form with fields for first name, last name, and email address, and a create account button](/img/wireframes/sign-up-form-first-last-name-email.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A36911&t=2h5Mmz3COBLhqVzv-1  sign-up-form-first-last-name-email
 -->

</div>

### 3: The user submits their new account details

When the user submits their account details, create a `UserProfile` object and assign its `firstName`, `lastName`, and `email` properties to the values entered by the user. Pass this object as a parameter to `IdxClient.RegisterAsync()`.

> **Note**: The `email` property represents the account's username and primary email address.

```csharp
var userProfile = new UserProfile();
userProfile.SetProperty("firstName", model.FirstName);
userProfile.SetProperty("lastName", model.LastName);
userProfile.SetProperty("email", model.Email);
var registerResponse = await _idxClient.RegisterAsync(userProfile);
```

### 4. The user verifies their identity using the email authenticator

`RegisterAsync()` returns an `AuthenticationResponse` object. Query its `AuthenticationStatus` property to discover the current status of the authentication process. A status of `AwaitingAuthenticatorEnrollment` indicates that the user needs to verify their identity with the email authenticator challenge.

```csharp
if (registerResponse.AuthenticationStatus ==
      AuthenticationStatus.AwaitingAuthenticatorEnrollment)
{
   Session["idxContext"] = registerResponse.IdxContext;
   Session["authenticators"] = ViewModelHelper
      .ConvertToAuthenticatorViewModelList(registerResponse.Authenticators);
   return RedirectToAction("SelectAuthenticator", "Manage");
}

ModelState.AddModelError(string.Empty, $"Oops! Something went wrong.");
return View("Register", model);
```

The email authenticator supports user verification by one-time password (OTP) and by magic links. To learn more, see the [Okta email integration guide](/docs/guides/authenticators-okta-email/nodeexpress/main/#integrate-email-challenge-with-magic-links).

### 5. Your app displays the remaining optional authenticators

After the user verifies their identity using the email authenticator, the status of the authentication process is `AwaitingAuthenticatorEnrollment`.

Create and display a page that lists the remaining authenticators. Check the `CanSkip` property of the `AuthenticationResponse` object. If `true` &mdash; and all the listed authenticators are optional &mdash; add a **Skip** button to the form to skip their enrollment. If `CanSkip` is `false`, you should omit the **Skip** button.

<div class="half wireframe-border">

![A choose your authenticator form with google and Okta verify options and next, skip, and cancel buttons](/img/wireframes/choose-authenticator-form-google-okta-verify-with-skip-and-cancel.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3401%3A37205&t=vr9MuCR8C4rCt3hC-1 choose-authenticator-form-google-okta-verify-with-skip-and-cancel
 -->

</div>

### 6. The user skips the remaining optional authenticators

When the user clicks the **Skip** button, call `IdxClient.SkipAuthenticationSelectionAsync()` passing in the `IdxContext` object that represents the current state of the registration flow.

After the user skips the remaining optional authenticators, the current status of the authentication process is now `Success`. Call `AuthenticationHelper.GetIdentityFromTokenResponseAsync()` to retrieve the user's OIDC claims information and pass it into your application. The user has now signed in.

```csharp
var skipSelectionResponse = await _idxClient
   .SkipAuthenticatorSelectionAsync((IIdxContext)Session["IdxContext"]);

switch (skipSelectionResponse.AuthenticationStatus)
{
   case AuthenticationStatus.Success:
      ClaimsIdentity identity = await AuthenticationHelper
         .GetIdentityFromTokenResponseAsync(
            _idxClient.Configuration, skipSelectionResponse.TokenInfo);
      _authenticationManager.SignIn(new AuthenticationProperties(), identity);
      return RedirectToAction("Index", "Home");
}

return RedirectToAction("Index", "Home");
```

Store these tokens for future requests and redirect the user to the default page after a successful sign-up attempt.
