### 1: Your app displays sign-up link on sign-in page

Add a link to your app's sign-in page. When the user clicks this link, redirect them to a sign-up page where they can sign up for a new account.

<div class="half border">

![A simple sign-in page with a sign-up link.](/img/pwd-optional/pwd-optional-sign-up-link-sign-in-page.png)

</div>

### 2: Your app displays sign-up page

Create a sign-up page that captures the user's first name, last name, and email address.

<div class="half border">

![A simple sign-up page with first name, last name, and email fields, and submit button.](/img/pwd-optional/pwd-optional-sign-up-page.png)

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

Query the `AuthenticationStatus` property of the `AuthenticationResponse` object returned by `RegisterAsync()` to discover the current status of the authentication process. If you've configured your Okta org correctly, the status is `AwaitingAuthenticatorEnrollment`, indicating that the user needs to verify their identity with the email authenticator challenge.

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

The email authenticator supports user verification by One-Time Password (OTP) and by magic links. To learn more, see the [Okta email integration guide](/docs/guides/authenticators-okta-email/nodeexpress/main/#integrate-email-challenge-with-magic-links).

### 5. Your app displays the remaining optional authenticators

After the user verifies their identity using the email authenticator, the `AuthenticationStatus` property of the `AuthenticationResponse` object is either

- `Success`: Go to step 6.
- `AwaitingAuthenticatorEnrollment`: The user can enroll in additional authenticators.

* If the latter is true, create and display a page that lists the remaining authenticators. Check the `CanSkip` property of the `AuthenticationResponse` object. If `true` &mdash; and all the listed authenticators are optional &mdash; add a **Skip** button to the form to skip their enrollment. If `CanSkip` is `false`, the Skip button should be omitted.

<div class="half border">

![A form showing a list of authenticators to enroll, and Submit, Cancel, and Skip buttons.](/img/pwd-optional/pwd-optional-sign-up-authenticators-page.png)

</div>

### 6. The user skips the remaining optional authenticators

When the user clicks the **Skip** button, call `IdxClient.SkipAuthenticationSelectionAsync()` passing in the `IdxContext` that represents the current state of the registration flow. The `AuthenticationStatus` property of the `AuthenticationResponse` object returned by `SkipAuthenticationSelectionAsync()` is `Success`. You can now call `AuthenticationHelper.GetIdentityFromTokenResponseAsync()` to retrieve the OIDC claims information about the user and pass them into your application. The user has now signed in.

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
