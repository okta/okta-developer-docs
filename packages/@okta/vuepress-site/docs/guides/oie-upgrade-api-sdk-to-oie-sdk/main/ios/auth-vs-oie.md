
The Identity Engine SDK is a rewrite of the Classic Engine Authentication SDK. The Classic Engine Authentication SDK has specific methods for each authentication use case. The Identity Engine SDK uses a generic interface that enables app to respond dynamically to policy changes within Okta.

The Identity Engine SDK provides [sample code](https://github.com/okta/okta-idx-swift/tree/master/Samples/Signin%20Samples), which wraps the SDK with a more prescriptive and explicit interface. The sample code is purposely built to help facilitate understanding of how to use the SDK. Even though the Identity Engine examples in this guide use sample code, the suggested best practice is to use the same dynamic approach implemented in the [sample app](https://github.com/okta/okta-idx-swift/tree/master/Samples/EmbeddedAuthWithSDKs).

For more information on the SDKs, see their corresponding repositories:

* [Classic Engine Authentication SDK](https://github.com/okta/okta-auth-swift)
* [Identity Engine SDK](https://github.com/okta/okta-idx-swift)

While planning your upgrade strategy, it’s critical to understand how your authentication call flows map to the Identity Engine SDK. The following table maps the endpoints and methods of the Authentication API and Classic Engine Authentication SDK to the Identity Engine SDK.

|Use case | Classic Engine Authentication API | Classic Engine Authentication SDK     |   Identity Engine SDK      |
| ----------------------- | ------------------------------ | -----------------------------------| ------------- |
|[Basic sign-in](#map-basic-sign-in-code-to-the-identity-engine-sdk)| [/api/v1/authn](/docs/reference/api/authn/)<br>[/api/v1/sessions](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Session/#tag/Session/operation/createSession)| `OktaAuthSdk.authenticate` | **Sample code methods**<br>`BasicLogin.login`<br>**SDK methods**<br>`IDXClient.start`<br>`Remediation.resume`<br>`Remediation.proceed`|
|[Multifactor sign-in](#map-mfa-code-to-the-identity-engine-sdk)| [/api/v1/auth](/docs/reference/api/authn/)<br>[/api/v1/factors](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/UserFactor/)| `OktaAuthSdk.authenticate`<br>`OktaAuthStatusFactorRequired.selectFactor`<br>`OktaFactorOther.verify`<br>`OktaFactorSms.verify`| **Sample code methods**<br>`MultifactorLogin.login`<br>`MultifactorLogin.select`<br>`MultifactorLogin.verify`<br>**SDK methods**<br>`IDXClient.start`<br>`Remediation.resume`<br>`Remediation.proceed`|
|[Password recovery](#map-password-recovery-code-to-the-identity-engine-sdk)| [/api/v1/authn/recovery/password](/docs/reference/api/authn/#forgot-password)<br>[/api/v1/authn/recovery/token](/docs/reference/api/authn/#verify-recovery-token)<br>[/api/v1/authn/credentials/reset_password](/docs/reference/api/authn/#reset-password) |`OktaAuthSdk.recoverPassword`<br>`OktaAuthStatusRecoveryChallenge.verifyFactor`<br>`OktaAuthStatusRecovery.recoveryQuestion`<br>`OktaAuthStatusPasswordReset.resetPassword` | **Sample code methods**<br>`MultifactorLogin.resetPassword`<br>`MultifactorLogin.select`<br>`MultifactorLogin.verify`<br>**SDK methods**<br>`IDXClient.start`<br>`Remediation.resume`<br>`Remediation.proceed`|
|[Sign-out](#map-basic-sign-out-code-to-the-identity-engine-sdk)|[/api/v1/authn/cancel](https://developer.okta.com/docs/reference/api/authn/#cancel-transaction)<br>[/v1/logout](https://developer.okta.com/docs/reference/api/oidc/#logout) | `OktaAuthStatus.cancel` | **SDK methods**<br>`token.revoke`|
