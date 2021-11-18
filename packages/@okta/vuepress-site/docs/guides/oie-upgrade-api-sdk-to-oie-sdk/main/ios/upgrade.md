
The Okta Identity Engine SDK provides your applications with greater flexibility to create and configure user access experiences. The SDK’s architecture achieves this flexibility by shifting the control of application configurations and authorization policies to the org administrator, rather than requiring the developer to make updates at the code level. It enables a pure policy-driven design that accepts new functionality, such as adding additional sign-in factors, without the need to update your application's code. Such a feature becomes important for mobile devices where keeping applications updated is a challenge.

The upgrade process is also designed to be non-disruptive and iterative over a period of time. Your Classic Engine Authentication SDK application works with an Identity Engine configured org, and you can test and migrate your authentication use cases incrementally. Using the most critical use cases, this guide compares the implementations of the Authentication API and Classic Engine Authentication SDK with the Identity Engine SDK. These use cases are as follows:

- Basic authentication: [Map basic sign-in code to the Okta Identity Engine SDK](#map-basic-sign-in-code-to-the-okta-identity-engine-sdk)
- Multifactor authentication (email and SMS): [Map MFA code to the Okta Identity Engine SDK](#map-mfa-code-to-the-okta-identity-engine-sdk)
- Password recovery: [Map password recovery code to the Okta Identity Engine SDK](#map-password-recovery-code-to-the-okta-identity-engine-sdk)
- Sign-out: [Map basic sign-out code to the Okta Identity Engine SDK ](#map-basic-sign-out-code-to-the-okta-identity-engine-sdk)
