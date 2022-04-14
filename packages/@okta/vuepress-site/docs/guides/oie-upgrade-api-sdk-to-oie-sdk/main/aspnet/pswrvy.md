### The Classic Engine Authentication SDK password recovery flow

The Classic Engine Authentication SDK methods that support the password recovery flow are as follows:

* `AuthenticationClient.ForgotPasswordAsync()`
* `AuthenticationClient.VerifyRecoveryTokenAsync()`
* `AuthenticationClient.AnswerRecoveryQuestionAsync()`
* `AuthenticationClient.ResetPasswordAsync()`

The following steps detail how to integrate the password recovery flow using the Classic Engine Authentication SDK.

#### 1. Start password recovery

Start the password recovery flow by creating an object of type `ForgotPasswordOptions`. Assign values to its `FactoryType` and `Username` properties and pass it to `AuthenticationClient.ForgotPasswordAsync()`. In the following code snippet, the email factor type is used which indicates a verification email is sent to the user’s email address.

```dotnet
var authResponse = await _oktaAuthenticationClient.ForgotPasswordAsync(new ForgotPasswordOptions
{
  FactorType = FactorType.Email,
  UserName = model.UserName,
}).ConfigureAwait(false);

return RedirectToAction("VerifyRecoveryToken", "Manage");

```

#### 2. Verify factor

Next, verify the factor using `IdxClient.VerifyRecoveryTokenAsync()`. The method accepts a recovery token, which is found in the user's verification email at the end of the **Reset Password** button’s URL.

If successful, the method returns a state token and a status of `AuthenticationStatus.Recovery`, which indicates that the user needs to answer a security question. Pull the security question from the method’s response and display it to the user.

```dotnet
var authResponse = await _oktaAuthenticationClient.VerifyRecoveryTokenAsync(
    new VerifyRecoveryTokenOptions
{
    RecoveryToken = model.RecoveryToken,
}).ConfigureAwait(false);

if (authResponse.AuthenticationStatus == AuthenticationStatus.Recovery)
{
    var question =  authResponse.Embedded.GetProperty<Resource>("user")?
      .GetProperty<Resource>("recovery_question")?
      .GetProperty<string>("question");

    Session["stateToken"] = authResponse.StateToken;
    return RedirectToAction("VerifySecurityQuestion", "Manage");
}
```

#### 3. Answer security question

After the user answers the security question, send the answer to `AuthenticationClient.AnswerRecoveryQuestionAsync()`. If the method returns a status of `AuthenticationStatus.PasswordReset`, the user is now allowed to reset their password.

```dotnet
var authResponse = await _oktaAuthenticationClient.AnswerRecoveryQuestionAsync(
  new AnswerRecoveryQuestionOptions
  {
     Answer = model.Answer,
     StateToken = Session["stateToken"].ToString(),

  }).ConfigureAwait(false);

if (authResponse.AuthenticationStatus == AuthenticationStatus.PasswordReset)
{
  return RedirectToAction("ResetPassword", "Manage");
}
```

#### 4. Reset password

Once the user submits their new password, create an object of type `ResetPasswordOptions`. Assign values to its `NewPassword` and `Stake` properties and pass it to `AuthenticationClient.ResetPasswordAsync()`. If the response returns a status of `AuthenticationStatus.Success`, the password is successfully reset.

```dotnet
var authResponse = await _oktaAuthenticationClient.ResetPasswordAsync(
    new ResetPasswordOptions()
    {
      NewPassword = model.NewPassword,
      StateToken = Session["stateToken"].ToString(),

    }).ConfigureAwait(false);

if (authResponse.AuthenticationStatus == AuthenticationStatus.Success)
{
    var username = authResponse.Embedded
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

### The Identity Engine SDK password recovery flow

The Identity Engine SDK methods that support the password recovery flow are as follows:

* `IdxClient.RecoverPasswordAsync()`
* `IdxClient.SelectRecoveryAuthenticatorAsync()`
* `IdxClient.VerifyAuthenticatorAsync()`
* `IdxClient.ChangePasswordAsync()`

The following steps detail how to integrate the password recovery flow using the Identity Engine SDK.

##### 1. Start password recovery
Start the password recovery flow by creating an object of type `RecoverPasswordOptions`. Assign a value to its `Username` property and pass it to `AuthenticationClient.RecoverPasswordAsync()`. If successful, the method returns a status of `AuthenticationStatus.AwaitingAuthenticatorSelection`, which indicates authenticators await to be verified.

```dotnet
var recoverPasswordOptions = new RecoverPasswordOptions
{
  Username = model.UserName,
};
var authnResponse = await idxAuthClient.RecoverPasswordAsync(recoverPasswordOptions);

if (authnResponse.AuthenticationStatus == AuthenticationStatus.AwaitingAuthenticatorSelection)
{
  Session["idxContext"] = authnResponse.IdxContext;
  Session["UserName"] = model.UserName;
  TempData["authenticators"] = authnResponse.Authenticators;
  return RedirectToAction("SelectRecoveryAuthenticator", "Account");
}
```

#### 2. Submit authenticator

Using `AuthenticationResponse.Authenticators`, present a list of available authenticators to the user. After selection, call `IdxClient.SelectRecoveryAuthenticatorAsync()` and pass in the selected `AuthenticatorId`.

If successful, the method returns a status of `AuthenticationStatus.AwaitingAuthenticatorVerification`, which indicates an authenticator is awaiting verification. In this example a code is sent to the user’s email.

```dotnet
var applyAuthenticatorResponse = await _idxClient.SelectRecoveryAuthenticatorAsync(
          new SelectAuthenticatorOptions { AuthenticatorId = model.AuthenticatorId },
          (IIdxContext)Session["IdxContext"]);

if (applyAuthenticatorResponse.AuthenticationStatus == AuthenticationStatus.AwaitingAuthenticatorVerification)
{
  return RedirectToAction("VerifyAuthenticator", "Manage");
}
```

#### 3. Verify authenticator

Show a page to the user that allows them to enter their verification code. Once the code is submitted, call `IdxClient.VerifyAuthenticatorAsync()` to verify the code. If the method returns a status of `AuthenticationStatus.AwaitingPasswordReset`, the verification is successful and the user can now change their password.

```dotnet
var authnResponse = await _idxClient.VerifyAuthenticatorAsync(verifyAuthenticatorOptions,
       (IIdxContext)Session["idxContext"]);
Session["idxContext"] = authnResponse.IdxContext;

switch (authnResponse.AuthenticationStatus)
{
  case AuthenticationStatus.AwaitingPasswordReset:
       return RedirectToAction("ChangePassword", "Manage");

...
```

#### 4. Change password

Show a page to the user to allow them to change their password. When the new password is submitted, call `IdxClient.ChangePasswordOptions()` and pass in the new password using `ChangePasswordOptions.NewPassword`.

If successful, the method returns access tokens and a status of `AuthenticationStatus.Success`.

```dotnet
var changePasswordOptions = new ChangePasswordOptions()
{
     NewPassword = model.NewPassword,
};

var authnResponse = await idxAuthClient.ChangePasswordAsync(changePasswordOptions,
      (IIdxContext)Session["idxContext"]).ConfigureAwait(false);
Session["idxContext"] = authnResponse.IdxContext;

switch (authnResponse.AuthenticationStatus)
 {
      case AuthenticationStatus.Success:
           ClaimsIdentity identity = await
           AuthenticationHelper.GetIdentityFromTokenResponseAsync(_idxClient.Configuration,
           authnResponse.TokenInfo);
           _authenticationManager.SignIn(new AuthenticationProperties(), identity);
           return RedirectToAction("Index", "Home");
...
```
