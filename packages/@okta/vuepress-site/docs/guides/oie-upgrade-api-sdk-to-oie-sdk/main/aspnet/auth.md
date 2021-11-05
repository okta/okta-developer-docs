### The Classic Engine Authentication SDK basic authentication flow

The Classic Engine Authentication SDK's methods that support the basic authentication flow are as follows:

* `AuthenticationClient.AuthenticateAsync()`

The following steps detail how to integrate the password recovery flow using the Classic Engine Authentication SDK.

#### 1. Start sign-in

Start the sign-in flow by creating an object of type `AuthenticateOptions`.  Set its `Username` and `Password` properties and send it to `AuthenticationClient.AuthenticateAsync()`. The method returns a status of `AuthenticationStatus.Success` when the sign-in is successful.

```dotnet
var authnOptions = new AuthenticateOptions() {
    Username = model.UserName,
    Password = model.Password,
};

var authnResponse = await _oktaAuthenticationClient.AuthenticateAsync(authnOptions).ConfigureAwait(false);

if (authnResponse.AuthenticationStatus == AuthenticationStatus.Success) {
    var identity = new ClaimsIdentity(
       new[] {
      new Claim(ClaimTypes.Name, model.UserName)
 },
 DefaultAuthenticationTypes.ApplicationCookie);

 _authenticationManager.SignIn(new AuthenticationProperties {
     IsPersistent = model.RememberMe}, identity);
}

```

### The Identity Engine SDK basic authentication flow

The Identity Engine SDK's methods that support the password recovery flow are as follows:

* `IdxClient.AuthenticateAsync()`

The following steps detail how to integrate the password recovery flow using the Identity Engine SDK.

#### 1. Start sign-in

Start the sign-in flow by creating an object of type `AuthenticateOptions`.  Assign values to its `Username` and `Password` properties and send it to `IdxClient.AuthenticateAsync()`. If successful, the method returns access tokens and a status of `AuthenticationStatus.Success`.

```dotnet
var authnOptions = new AuthenticationOptions()
      {
          Username = model.UserName,
          Password = model.Password,
      };

var authnResponse = await _idxClient.AuthenticateAsync(authnOptions)
      .ConfigureAwait(false);

switch (authnResponse?.AuthenticationStatus)
{
  case AuthenticationStatus.Success:
        ClaimsIdentity identity = await AuthenticationHelper.GetIdentityFromTokenResponseAsync(_idxClient.Configuration, authnResponse.TokenInfo);
        _authenticationManager.SignIn(new AuthenticationProperties { IsPersistent = model.RememberMe }, identity);
        return RedirectToAction("Index", "Home");
}
```
