
Although the Identity Engine SDK uses a different set of underlying API endpoints, its method signatures are purposely designed to resemble the Classic Engine Authentication SDK's methods it replaces. For example, initiating a sign-in flow in both SDKs is done with an `AuthenticationOptions` parameter and `AuthenticateAsync()` method. These similarities are intended to ease the overall upgrade process by reducing the amount of learning required to use the new Identity Engine SDK.

For more information on the SDKs, see their corresponding repositories:

* Classic Engine SDKs
  * [Classic Engine Authentication SDK](https://github.com/okta/okta-auth-dotnet)
  * [Classic Engine Management SDK](https://github.com/okta/okta-sdk-dotnet)
* [Identity Engine SDK](https://github.com/okta/okta-idx-dotnet)

While planning your upgrade strategy, it’s critical to understand how your authentication call flows map to the Identity Engine SDK. The following table maps the endpoints and methods of the Authentication API and Classic Engine Authentication SDK to the Identity Engine SDK.

|Use case | Classic Engine Authentication API | Classic Engine Authentication SDK     |   Identity Engine SDK      |
| ----------------------- | ------------------------------ | -----------------------------------| ------------- |
|[Basic sign-in](#map-basic-sign-in-code-to-the-identity-engine-sdk)| [/api/v1/authn](/docs/reference/api/authn/)<br>[/api/v1/sessions](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Session/#tag/Session/operation/createSession)| `AuthenticationClient.AuthenticateAsync()` | `IdxClient.AuthenticateAsync()` |
|[Multifactor sign-in](#map-mfa-code-to-the-identity-engine-sdk)| [/api/v1/auth](/docs/reference/api/authn/)<br>[/api/v1/factors](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/UserFactor/)| `AuthenticationClient.AuthenticateAsync()`<br>`AuthenticationClient.VerifyFactorAsync()` | `IdxClient.AuthenticateAsync()`<br>`IdxClient.SelectChallengeAuthenticatorAsync()`<br>`IdxClient.VerifyAuthenticatorAsync()`|
|[Password recovery](#map-password-recovery-code-to-the-identity-engine-sdk)| [/api/v1/authn/recovery/password](/docs/reference/api/authn/#forgot-password)<br>[/api/v1/authn/recovery/token](/docs/reference/api/authn/#verify-recovery-token) [/api/v1/authn/credentials/reset_password](/docs/reference/api/authn/#reset-password) | `AuthenticationClient.ForgotPasswordAsync()`<br>`AuthenticationClient.VerifyRecoveryTokenAsync()`<br>`AuthenticationClient.AnswerRecoveryQuestionAsync()`<br>`AuthenticationClient.ResetPasswordAsync()` | `IdxClient.RecoverPasswordAsync()`<br>`IdxClient.SelectRecoveryAuthenticatorAsync()`<br>`IdxClient.VerifyAuthenticatorAsync()`<br>`IdxClient.ChangePasswordAsync()` |
|[Sign-out](#map-basic-sign-out-code-to-the-identity-engine-sdk)|[/api/v1/authn/cancel](https://developer.okta.com/docs/reference/api/authn/#cancel-transaction)<br>[/v1/logout](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/logoutCustomASWithPost) | `AuthenticationClient.CancelTransactionStateAsync()` | `IdxClient.RevokeTokensAsync()`|
