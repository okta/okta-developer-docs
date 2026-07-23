The Identity Engine SDK gives your apps more flexibility to create and configure user access experiences. The SDK's architecture shifts control of app configurations and authorization policies to the Okta admin. This removes the need for code-level updates. The SDK's recursive method calls also support dynamic Identity Engine policies. These policies may require different access or authorization steps for different users.

If your browser-based app uses the Classic Engine Authentication SDK for custom authentication, the Identity Engine SDK is the ideal upgrade path. This move benefits your app with Identity Engine's features and configuration flexibility. It also removes your app's dependency on third-party cookies. The Classic Engine `session.setCookieAndRedirect` method requires third-party cookie access to retrieve tokens, and many browsers now block that access by default. The Identity Engine SDK returns tokens directly in the transaction response instead.

The upgrade process also stays non-disruptive and iterative over time. Your Classic Engine Authentication SDK app code works with an Identity Engine configured org, and you can test and migrate use cases incrementally. See the following three examples for further information on upgrading your app code:

- Authentication (sign-in flow): [Map basic sign-in code to the Identity Engine SDK](#map-basic-sign-in-code-to-the-identity-engine-sdk)
- Multifactor Authentication (Email and SMS): [Map MFA code to the Identity Engine SDK](#map-mfa-code-to-the-identity-engine-sdk)
- Password Recovery: [Map password recovery code to the Identity Engine SDK](#map-password-recovery-code-to-the-identity-engine-sdk)
