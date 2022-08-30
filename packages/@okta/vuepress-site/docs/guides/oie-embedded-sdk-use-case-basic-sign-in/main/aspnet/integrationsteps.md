### 1: Build a sign-in page on the client

Build a sign-in page that captures the user's name and password.

<div class="half wireframe-border">

![Displays the simple sign-in form for Java SDK](/img/oie-embedded-sdk/wireframes/pwd-optional-sign-up-link-sign-in-page-g1r7.png)

</div>

<!--

Source image:

https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%8C%9F-Updated-Diagrams-for-Dev-Docs?node-id=2393%3A2128#233281241

Group 1, row 7

-->

### 2: Authenticate the user credentials

After the user initiates the sign-in process, create an `AuthenticationOptions` object and set its `Username` and `Password`
properties to the values entered by the user. Send this object to the
`IdxClient.AuthenticateAsync()` method.

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

### 3: Handle the response from the user sign-in flow

Depending on the `AuthenticationResponse.AuthenticationStatus` value, you need to handle the response accordingly:

For a successful user sign-in
(`AuthenticationResponse.AuthenticationStatus = Success`), do the following:

1. Store the response tokens into the session (for example, using a cookie) so that the tokens can be used in
   subsequent calls to the SDK. The sample code uses `Microsoft.Owin.Security.IAuthenticationManager.SignIn` to persist these tokens.
1. Optional. Use the tokens returned from `AuthenticateAsync` to pull the user's basic profile information. See [Get the user profile information](#get-the-user-profile-information).
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

In the previous code sample, the `AuthenticationHelper.GetIdentityFromAuthResponseAsync()` method gets the user profile information. Optionally, you can obtain basic user information after the user successfully signs in by making a request to Okta's Open ID Connect authorization server (see the next section).
