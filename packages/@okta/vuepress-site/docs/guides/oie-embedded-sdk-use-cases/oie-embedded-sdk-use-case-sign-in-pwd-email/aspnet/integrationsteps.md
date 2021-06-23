### Step 1: Build a signin page on the client

Build a sign in page that captures both the user’s name and
password. An example is shown below:

<div class="common-image-format">

![Sign in page](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-on-screenshot-sign-in.png
 "Sign in page")

</div>

### Step 2: Authenticate user credentials

When the user initiates the sign in (for example, Continue button click),
create a `AuthenticationOptions` object and set it’s `Username` and
`Password` properties to the values entered in by the user. Send this
object to the `IdxClient’s AuthenticateAsync` method.

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

Assuming the username and password is valid, `AuthenticateAsync`
should return an `AuthenticationStatus` of
`AwaitingChallengeAuthenticatorSelection`.`AwaitingChallengeAuthenticatorSelection`
indicates that there is an additional factor that needs to be verified
before the sign in.  In addition to the status, the `Authenticators`
property should return the **email** factor.

The user should be redirected to the authenticator list page that
displays the email factor as an authenticator to be verified. See
the sample code below for more details.

```csharp
var authnResponse = await _idxClient.AuthenticateAsync(authnOptions).ConfigureAwait(false);
Session["idxContext"] = authnResponse.IdxContext;

switch (authnResponse?.AuthenticationStatus)
     {
         ...
         case AuthenticationStatus.AwaitingChallengeAuthenticatorSelection:
              Session["authenticators"] =
              ViewModelHelper.ConvertToAuthenticatorViewModelList(authnResponse.Authenticators);
              Session["isChallengeFlow"] = true;
              return RedirectToAction("SelectAuthenticator", "Manage");
```

### Step 4: Show email factor in authenticator list - show email factor to user

The next step is to show the email factor in an authenticator list page. If
not already done, this page needs to be built out and display the list of
authenticators from the previous step.  In this case only the **email**
factor will be displayed. See below for a sample screenshot.

<div class="common-image-format">

![Email verify](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-sign-in-pwd-email-screen-verify.png
 "Email verify")

</div>

### Step 5: Call SelectChallengeAuthenticatorAsync - user selects email factor

When the user selects the **email** factor, a call to
`SelectChallengeAuthenticatorAsync` is made that sends a verification
code to the user’s email. Note that the method accepts a
`SelectAuthenticatorOptions` parameter which is used to pass in the
email factor id.

If the call is successful the method should return
`AwaitingAuthenticatorVerification` that indicates the SDK is ready for
the verification code. The next step is to redirect the user to the email
verification code page.

```csharp
var selectAuthenticatorOptions = new SelectAuthenticatorOptions
                       {
                           AuthenticatorId = model.AuthenticatorId,
                       };

selectAuthenticatorResponse = await
     _idxClient.SelectChallengeAuthenticatorAsync(selectAuthenticatorOptions,
     (IIdxContext)Session["IdxContext"]);

     Session["IdxContext"] = selectAuthenticatorResponse.IdxContext;

switch (selectAuthenticatorResponse?.AuthenticationStatus)
{
...
     case AuthenticationStatus.AwaitingAuthenticatorVerification:
          return RedirectToAction("VerifyAuthenticator", "Manage");
```

### Step 6: Show email verification code page - show user email verification page

Build (if not already done) the email verification code page that will accept
the code from the email.

<div class="common-image-format">

![Email verify](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-email-code.png
 "Email verify")

</div>

### Step 7: Call VerifyAuthenticatorAsync - user enters code and clicks verify

The next step is to call `VerifyAuthenticatorAsync`. In the case of the email
verification, the code passed into `VerifyAuthenticatorAsync` will be the code
found in the verification email.

```csharp
var idxAuthClient = new IdxClient(null);
           var verifyAuthenticatorOptions = new VerifyAuthenticatorOptions
           {
               Code = code,
           };

var authnResponse = await idxAuthClient.VerifyAuthenticatorAsync(verifyAuthenticatorOptions, (IIdxContext)Session["idxContext"]);
```

### Step 8: Handle response from VerifyAuthenticatorAsync

The next step is to handle the response from `VerifyAuthenticatorAsync`.
If the email code was valid, the method should return `AuthenticationStatus`
of `Success`. This status signifies that there are no more factors waiting to
be enrolled and verified. If the steps described in
[Set up your Okta org (for multi-factor use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-multifactor-use-cases)
were properly followed,  the user has successfully signed in and should be sent
to the default sign in home page.  In the case of the sample app, it is the
user profile page.

```csharp
var authnResponse = await _idxClient.VerifyAuthenticatorAsync(verifyAuthenticatorOptions,
    (IIdxContext)Session["idxContext"]);
    Session["idxContext"] = authnResponse.IdxContext;
    switch (authnResponse.AuthenticationStatus)
         {
              ...
              case AuthenticationStatus.Success:
                   ClaimsIdentity identity = await
                   AuthenticationHelper.GetIdentityFromTokenResponseAsync(
                   _idxClient.Configuration, authnResponse.TokenInfo);
                   _authenticationManager.SignIn(new AuthenticationProperties(), identity);
                   return RedirectToAction("Index", "Home");
         }
```

### Step 9: Get user profile information - optional

Optionally, you can obtain basic user information after a successful sign
in by making a request to Okta’s Open ID Connect authorization server.
See [Get user profile information after sign in](/docs/guides/oie-embedded-sdk-alternate-flows/aspnet/main/#get-user-profile-information-after-sign-in) for more details.
