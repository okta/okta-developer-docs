### 1: Build a sign-in page on the client

Build a sign-in page that captures both the user’s name and
password. An example is shown below:

<div class="half">

![Displays an example sign-in page](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-on-screenshot-sign-in.png)

</div>

### 2: Authenticate the user credentials

When the user initiates the sign-in (for example, by clicking the **Continue** button), create an `AuthenticationOptions` object and set the `Username` and `Password` properties to the values entered in by the user. Send this object to the `AuthenticateAsync` method for the `IdxClient`.

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

### 3: Handle the response from the sign-in flow

If the username and password are valid, `AuthenticateAsync` should return an `AuthenticationStatus` of `AwaitingChallengeAuthenticatorSelection`. The `AwaitingChallengeAuthenticatorSelection` status indicates that an additional factor needs to be verified before the sign-in. In addition to the status, the `Authenticators` property should return the **email** factor.

The user should be redirected to the authenticator list page that displays the email factor as an authenticator to be verified. See the following sample code for more details.

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

### 4: Show the email factor in the authenticator list

The next step is to show the email factor to the user in an authenticator list page. If not already done, build a page to display the list of authenticators from the previous step. In this use case, only the email factor appears, as shown in the following sample.

<div class="half">

![Displays an example verify Email form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-sign-in-pwd-email-screen-verify.png)

</div>

### 5: Call the SelectChallengeAuthenticatorAsync method

When the user selects the **email** factor, a call to `SelectChallengeAuthenticatorAsync` is made that sends a verification code to the user's email. The method accepts a `SelectAuthenticatorOptions` parameter, which is used to pass in the email factor ID.

If the call is successful, the method should return `AwaitingAuthenticatorVerification`, which indicates that the SDK is ready for the verification code. The next step is to redirect the user to the email verification code page.

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

### 6: Show the email verification code page

If not already done, build the email verification code page that will accept the code from the email.

<div class="half">

![Displays an example verify Email form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-email-code.png)

</div>

### 7: Call the VerifyAuthenticatorAsync method

The next step is to call `VerifyAuthenticatorAsync`. In the email verification use case, the code passed into `VerifyAuthenticatorAsync` will be the code found in the verification email.

```csharp
var idxAuthClient = new IdxClient(null);
           var verifyAuthenticatorOptions = new VerifyAuthenticatorOptions
           {
               Code = code,
           };

var authnResponse = await idxAuthClient.VerifyAuthenticatorAsync(verifyAuthenticatorOptions, (IIdxContext)Session["idxContext"]);
```

### 8: Handle the response

The next step is to handle the response from `VerifyAuthenticatorAsync`. If the email code was valid, the method should return an `AuthenticationStatus` of `Success`. This status signifies that there are no more factors waiting to be enrolled and verified. If the steps described in [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-a-multifactor-use-case) were properly followed, the user has successfully signed in and should be sent to the default sign-in home page, which is the user profile page in the sample app.

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

### 9 (Optional): Get the user profile information

Optionally, you can obtain basic user information after a successful sign-in by making a request to Okta's Open ID Connect authorization server. See [Get the user profile information](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/aspnet/main/#get-the-user-profile-information).
