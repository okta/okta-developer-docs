### Step 1: Build a sign-in page on the client

Build a sign-in page that captures both the user's name and password.

Example:

<div class="common-image-format">

![Sign in screenshot](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-on-screenshot-sign-in.png
 "Sign in screenshot")

</div>

### Step 2: Authenticate user credentials

When the user initiates the sign in (for example, Continue button click), create
an `AuthenticationOptions` object and set its `Username` and `Password`
properties to the values entered by the user. Send this object to the
`IdxClient AuthenticateAsync` method.

```csharp
var idxAuthClient = new IdxClient();
 var authnOptions = new Okta.Idx.Sdk.AuthenticationOptions()
      {
          Username = model.UserName,
          Password = model.Password,
      };

var authnResponse = await idxAuthClient.AuthenticateAsync(authnOptions).ConfigureAwait
(false);
```

### Step 3: Handle the response from the sign in

Depending on the `AuthenticationResponse.AuthenticationStatus` value, you need to handle the response accordingly:

For a successful user sign in
(`AuthenticationResponse.AuthenticationStatus = Success`), do the following:

1. Store the response tokens into the session (for example, cookie) so that the tokens can be used in
   subsequent calls to the SDK. The sample code uses
  `Microsoft.Owin.Security.IAuthenticationManager.SignIn` to persist these
   tokens.
1. Optional. Using the tokens returned from `AuthenticateAsync`, pull the user's basic profile information. See
   [Step 4: Get user profile information (Optional)](/docs/guides/oie-embedded-sdk-alternate-flows/aspnet/main/#get-user-profile-information-after-sign-in).
1. After the tokens are stored, send the user to the default home page.

```csharp
switch (authnResponse?.AuthenticationStatus)
{
   case AuthenticationStatus.Success:
       ClaimsIdentity identity = await
         AuthenticationHelper.GetIdentityFromAuthResponseAsync
           (_idxClient.Configuration, authnResponse);
           _authenticationManager.SignIn(
                new AuthenticationProperties
                    {
                       IsPersistent = model.RememberMe
                     }, identity);
        return RedirectToAction("Index", "Home");

    case AuthenticationStatus.PasswordExpired:
        return RedirectToAction("ChangePassword", "Manage");

    case AuthenticationStatus.AwaitingChallengeAuthenticatorSelection:
        TempData["authenticators"] = ViewModelHelper.ConvertToAuthenticatorViewModelList
            (authnResponse.Authenticators);
            Session["isChallengeFlow"] = true;
             return RedirectToAction("selectAuthenticator", "Manage");
      default:
             return View("Login", model);
   }

```

In the code sample above, the
`AuthenticationHelper.GetIdentityFromAuthResponseAsync` gets the user profile information. See
[Step 4: Get user profile information (Optional)](#step-4-get-user-profile-information-optional).

### Step 4: Get user profile information-optional

Optionally, you can obtain basic user information after a successful user
sign in by making a request to Okta's Open ID Connect authorization server. See [Get user profile information after sign in](/docs/guides/oie-embedded-sdk-alternate-flows/aspnet/main/#getuserprofileinfo).
