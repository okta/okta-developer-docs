#### Step 1: Build a signin page on the client

Build a sign in page that captures both the user’s name and password.
An example is shown below:

<div class="common-image-format">

![Sign in screenshot](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-on-screenshot-sign-in.png
 "Sign in screenshot")

</div>

#### Step 2: Authenticate user credentials

When the user initiates the sign in (e.g. Continue button click), create
a `AuthenticationOptions` object and set it’s `Username` and `Password`
properties to the values entered in by the user. Send this object to the
`IdxClient’s AuthenticateAsync` method.

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

Depending on the `AuthenticationResponse.AuthenticationStatus` value, you’ll
need to handle the response accordingly:

For successful sign ins
(`AuthenticationResponse.AuthenticationStatus = Success`) perform the following:

1. Store the response tokens into session (e.g cookie) so they can be used in
   subsequent calls to the SDK. The sample code  uses
  `Microsoft.Owin.Security.IAuthenticationManager.SignIn` to persist these
   tokens.
1. OPTIONAL: Using the tokens returned from `AuthenticateAsync`, pull the user’s
   basic profile information. See
   [Step 4: Get user profile information (Optional)]()
   for more information.
1. Once the tokens are stored, send the user to the default home page.

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
`AuthenticationHelper.GetIdentityFromAuthResponseAsync` get’s user
profile information. See
[Step 4: Get user profile information (Optional)]() for more information.

#### Step 4: Get user profile information (Optional)

Optionally, you can obtain basic user information after a successful
sign in by making a request to Okta’s Open ID Connect authorization server.
See [Get user profile information after sign in]() for more details.
