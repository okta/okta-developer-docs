### The Classic Engine Authentication SDK multifactor authentication flow

The Classic Engine Authentication SDK methods that support the sign-out flow are as follows:

* `AuthenticationClient.CancelTransactionStateAsync()`

To sign out the user, call `AuthenticationClient.CancelTransactionStateAsync()` and pass in the state token.

```dotnet

await _oktaAuthenticationClient.CancelTransactionStateAsync(
               new TransactionStateOptions
               {
                   StateToken = Session["stateToken"]?.ToString(),
               });
           _authenticationManager.SignOut();
           return RedirectToAction("Login", "Account");
```

### The Identity Engine SDK sign-out flow

The Identity Engine SDK methods that support the sign-out flow are as follows:

* `IdxClient.RevokeTokensAsync`

The following steps detail how to integrate the sign-out flow are as follows:

To sign out the user, call `AuthenticationClient.RevokeTokensAsync()` and pass in the access token. If no exceptions are raised in the call, the sign-out is successful.

```dotnet
var client = new IdxClient();
          var accessToken = HttpContext.GetOwinContext().Authentication.User.Claims.FirstOrDefault(x => x.Type == "access_token");
          await client.RevokeTokensAsync(TokenType.AccessToken, accessToken.Value);
          _authenticationManager.SignOut();
          return RedirectToAction("Login", "Account");
```
