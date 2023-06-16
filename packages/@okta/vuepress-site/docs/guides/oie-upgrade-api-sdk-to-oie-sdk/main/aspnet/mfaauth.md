### The Classic Engine Authentication SDK multifactor sign-in flow

The Classic Engine Authentication SDK methods that support the multifactor sign-in flow are as follows:

* `AuthenticationClient.AuthenticateAsync()`
* `AuthenticationClient.VerifyFactorAsync()`

The following steps detail how to integrate the multifactor sign-in flow using the Classic Engine Authentication SDK.

#### 1. Start sign-in flow

Start the multifactor sign-in flow by creating an object of type `AuthenticateOptions`. Assign values to its `Username` and `Password` properties and send it to `AuthenticationClient.AuthenticateAsync()`. If the method returns a status of `AuthenticationStatus.MfaRequired`, there are factors that need to be verified.

```dotnet
 var authnOptions = new AuthenticateOptions()
{
     Username = model.UserName,
     Password = model.Password,
};


var authnResponse = await _oktaAuthenticationClient.AuthenticateAsync(authnOptions).ConfigureAwait(false);

if (authnResponse.AuthenticationStatus == AuthenticationStatus.MfaRequired)
{
  var allFactors = authnResponse.Embedded.GetArrayProperty<Factor>("factors");
  var defaultMfaFactor = allFactors.FirstOrDefault(x => x.Type == "sms" || x.Type == "email");

  if (defaultMfaFactor != null)
  {
     return RedirectToAction("VerifyFactor", "Manage");
  }
}
```

#### 2. Submit factor

Next, display the list of available factors by pulling the factors from `AuthenticationResponse.Embedded.GetArrayProperty()`. After the user chooses the factor, call `AuthenticationClient.VerifyFactorAsync()` to initiate the factor verification.  The following code sets up an SMS factor using a `VerifySmsFactorOptions` object.

```dotnet
var isMfaRequiredFlow = (bool)Session["isMfaRequiredFlow"];

if (isMfaRequiredFlow)
{
     // Assuming Phone: Send code to phone
     var verifyFactorOptions = new VerifySmsFactorOptions
     {
        StateToken = Session["stateToken"].ToString(),
        FactorId = Session["factorId"].ToString(),
     };
     _oktaAuthenticationClient.VerifyFactorAsync(verifyFactorOptions).ConfigureAwait(false);
}

var viewModel = new VerifyFactorViewModel
{
     IsMfaRequiredFlow = isMfaRequiredFlow,
};

return View(viewModel);
```

#### 3. Verify factor

The next step is to verify the factor by sending the verification code to `AuthenticationClient.VerifyFactorAsync()`. Create a `VerifyTotpFactorOptions` object and assign values to its `StateToken`, `FactorId`, and `PassCode` properties. Pass this object into the method.

```dotnet
// Valid for both SMS and/or email
var verifyFactorOptions = new VerifyTotpFactorOptions
{
  StateToken = Session["stateToken"].ToString(),
  FactorId = Session["factorId"].ToString(),
  PassCode = model.Code,
};

var authnResponse = await _oktaAuthenticationClient.VerifyFactorAsync(verifyFactorOptions)
  .ConfigureAwait(false);

if (authnResponse.AuthenticationStatus == AuthenticationStatus.Success)
{
  var username = authnResponse.Embedded
        .GetProperty<Resource>("user")
        .GetProperty<Resource>("profile")
        .GetProperty<string>("login");

  var identity = new ClaimsIdentity(
        new[] { new Claim(ClaimTypes.Name, username) },
        DefaultAuthenticationTypes.ApplicationCookie);

  _authenticationManager.SignIn(new AuthenticationProperties { IsPersistent = (bool)Session["rememberMe"] }, identity);

  return RedirectToAction("Index", "Home");
}
```

### The Identity Engine SDK multifactor authentication flow

The Identity Engine SDK methods that support the multifactor authentication flow are as follows:

* `IdxClient.AuthenticateAsync()`
* `IdxClient.SelectChallengeAuthenticatorAsync()`
* `IdxClient.VerifyAuthenticatorAsync()`

The following steps detail how to integrate the multifactor authentication flow are as follows:

#### 1. Start sign-in flow

Start the multifactor sign-in flow by creating an object of type `AuthenticateOptions`. Assign values to its `Username` and `Password` properties and send it to `IdxClient.AuthenticateAsync()`. The method should return a status of `AuthenticationStatus.AwaitingChallengeAuthenticatorSelection`, which indicates that there are authenticators that the user needs to verify.

```dotnet
var idxAuthClient = new IdxClient();
var authnOptions = new Okta.Idx.Sdk.AuthenticationOptions()
     {
         Username = model.UserName,
         Password = model.Password,
     };
var authnResponse = await _idxClient.AuthenticateAsync(authnOptions).ConfigureAwait(false);

switch (authnResponse?.AuthenticationStatus)
    {
        ...
        case AuthenticationStatus.AwaitingChallengeAuthenticatorSelection:
             Session["authenticators"] =
             ViewModelHelper.ConvertToAuthenticatorViewModelList(authnResponse.Authenticators);
             Session["isChallengeFlow"] = true;
             return RedirectToAction("SelectAuthenticator", "Manage");

...
```

#### 2. Submit authenticator

Using `AuthenticationResponse.Authenticators`, present the list of available authenticators to the user. Once the user selects the authenticator (for example, email or phone), call `IdxClient’s SelectChallengeAuthenticatorAsync()` passing in the `AuthenticatorId`.

When completed, `SelectChallengeAuthenticatorAsync()` returns a status of `AuthenticationStatus`.`AwaitingAuthenticatorVerification`, which indicates that a code was sent to the user either by email or sms. Send the user to a code verification page.

```dotnet
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

#### 3. Verify authenticator

Call `IdxClient.VerifyAuthenticatorAsync()` and pass in the user submitted code. If the verification is successful, the method returns access tokens and a status of `AuthenticationStatus.Success`.


```dotnet
var idxAuthClient = new IdxClient(null);
var verifyAuthenticatorOptions = new VerifyAuthenticatorOptions
{
     Code = code,
};

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
