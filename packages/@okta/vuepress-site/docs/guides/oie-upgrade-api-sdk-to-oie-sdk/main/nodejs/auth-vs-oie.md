
At a high level, the classic authentication flow for the Authn SDK methods and their back-end API calls function similarly to the new Okta Identity Engine SDK methods: both versions call Okta, receive a transaction object, and ultimately receive tokens after a successful authentication.

The Classic Engine authentication flow returns a transaction object that has the ability to proceed in the process. You call a method on the transaction object based on the status, for example `authClient.signInWithCredentials` to authenticate the user. The Okta Identity Engine SDK, however, uses a recursive process, and you call the same method again based on the information returned in the transaction object. The Identity Engine SDK uses the nextStep property on the transaction object to provide a hint at the required information. For the basic authentication example, the Identity Engine SDK calls `authClient.idx.authenticate` again with information as part of the call, the user’s email address, authenticator, and so on to complete the flow and return a success state.

Another difference between Classic Engine SDK and Identity Engine SDK methods is how you receive tokens after a successful authentication. For the Classic Engine SDK, the method `setCookieAndRedirect`, which is deprecated in Identity Engine, makes a call to get the tokens. In the Identity Engine SDK, after receiving a success state, the tokens are included with the transaction object. There’s no separate call to get the tokens.

For further information on the Classic Engine SDK and the Identity Engine SDK, see the following documentation at the okta-auth-js repository:

[Okta Authentication API (authn)](https://github.com/okta/okta-auth-js/blob/master/docs/authn.md)
[Okta Identity Engine API (IDX)](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md)
[Migrating from authn to IDX](https://github.com/okta/okta-auth-js/blob/master/docs/migrate-from-authn-to-idx.md)

The following table is a high-level mapping of the typical classic API requests and Authn SDK methods to Identity Engine SDK methods. Since there are a variety of combinations to achieve classic authentication flows, the mapping list is not exhaustive.

| Okta API endpoints | Classic Authn SDK methods | Identity Engine SDK Methods | Description                    |
| .................. | ......................... | ............................| ...............................|
|                    | signInWithCredentials
session.setCookieAn                              | `.idx.authenticate`         | Authenticate a user with username and password credentials. See Mapping Authentication code to the Identity Engine SDK.                             |
|                    | signInWithCredentials
transaction.factors
Transaction.verify
session.setCookieAndRedirect                      | `.idx.authenticate`         | Sign in a user using multifactor authentication, verify the factor and challenge. See Mapping MFA Authentication code to the Identity Engine SDK.                               |
|                    | forgotPassword
transaction.verify
transaction.resetPassword
session.setCookieAndRedirect                      | `.idx.recoverPassword`       | Password recovery flow, including a factor challenge and password reset. See Mapping Password Recovery code to the Identity Engine SDK.                               |
|                    | transaction.cancel         | `.idx.cancel`                | Cancels the Auth flow.                               |
|                    | getSignOutRedirectUrl
revokeAccessToken    | n/a                          | Sign out. See User Sign out (local app).                               |
