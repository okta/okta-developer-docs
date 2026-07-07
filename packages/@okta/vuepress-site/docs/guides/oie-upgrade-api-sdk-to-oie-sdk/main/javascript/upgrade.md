The Identity Engine SDK gives your applications more flexibility to create and configure user access experiences. The SDK's architecture achieves this flexibility by shifting control of application configurations and authorization policies to the org administrator, rather than requiring code-level updates. The SDK's recursive method call format also supports dynamic Identity Engine policies that may require different access or authorization steps for different users.

If your application is a browser-based, customized authentication solution built with the Classic Engine Authentication SDK, migrating to the Identity Engine SDK is the ideal path to benefit from Identity Engine features and configuration flexibility. It also removes your app's dependency on third-party cookies: the Classic Engine `session.setCookieAndRedirect` method requires third-party cookie access to retrieve tokens, which many browsers now block by default. The Identity Engine SDK returns tokens directly in the transaction response instead.

The upgrade process is also designed to be non-disruptive and iterative over a period of time. Your Classic Engine Authentication SDK application code works with an Identity Engine configured org, and you can test and migrate use cases incrementally. See the following three examples for further information on upgrading your application code:

- Authentication (sign-in flow): [Map basic sign-in code to the Identity Engine SDK](#map-basic-sign-in-code-to-the-identity-engine-sdk)
- Multifactor Authentication (Email and SMS): [Map MFA code to the Identity Engine SDK](#map-mfa-code-to-the-identity-engine-sdk)
- Password Recovery: [Map password recovery code to the Identity Engine SDK](#map-password-recovery-code-to-the-identity-engine-sdk)
