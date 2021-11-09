The Okta Identity Engine SDK provides your applications with greater flexibility to create and configure user access experiences. The SDK’s architecture achieves this flexibility by shifting the control of application configurations and authorization policies to the org administrator, rather than requiring the developer to make updates at the code level. The SDK’s recursive method call format is also designed for dynamic Identity Engine policies that may require more access or authorization steps for one user over another.

If your application is a server-side, customized authentication solution, migrating to the Identity Engine SDK is the ideal path to benefit from Identity Engine features and configuration flexibility.

The upgrade process is also designed to be non-disruptive and iterative over a period of time. Your Classic Engine Authentication SDK application code works with an Identity Engine configured org, and you can test and migrate use cases incrementally. Review the following SDK upgrade examples for detailed mapping suggestions:

* [Map basic sign-in code to the Okta Identity Engine SDK](#map-basic-sign-in-code-to-the-okta-identity-engine-sdk) &mdash; Basic sign-in with username and password use case
* [Map MFA code to the Okta Identity Engine SDK](#map-mfa-code-to-the-okta-identity-engine-sdk) &mdash; Basic sign-in with username, password and another email factor use case
* [Map password recovery code to the Okta Identity Engine SDK](#map-password-recovery-code-to-the-okta-identity-engine-sdk) &mdash;Password recovery using email use case
* [Map basic sign-out code to the Okta Identity Engine SDK](#map-basic-sign-out-code-to-the-okta-identity-engine-sdk) &mdash; Sign out use case