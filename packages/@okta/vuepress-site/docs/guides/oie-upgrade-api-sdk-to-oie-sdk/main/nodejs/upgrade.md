The Okta Identity Engine SDK provides your applications with greater flexibility to create and configure user access experiences. The SDK’s architecture achieves this flexibility by shifting the control of application configurations and authorization policies to the org administrator, rather than requiring the developer to make updates at the code level. The SDK’s recursive method call format is also designed for dynamic Identity Engine policies that may require more access or authorization steps for one user over another.

If your application is a server-side, customized authentication solution, migrating to the Identity Engine SDK is the ideal path to benefit from Identity Engine features and configuration flexibility.

The upgrade process is also designed to be non-disruptive and iterative over a period of time. Your Classic Engine Authentication SDK application code works with an Identity Engine configured org, and you can test and migrate use cases incrementally. See the following three examples for further information on upgrading your application code:

- Authentication (Sign in): [Map basic sign-in code to the Okta Identity Engine SDK](#map-basic-sign-in-code-to-the-okta-identity-engine-sdk)
- Multifactor Authentication (Email and SMS): [Map MFA code to the Okta Identity Engine SDK](#map-mfa-code-to-the-okta-identity-engine-sdk)
- Password Recovery: [Map password recovery code to the Okta Identity Engine SDK](#map-password-recovery-code-to-the-okta-identity-engine-sdk)
