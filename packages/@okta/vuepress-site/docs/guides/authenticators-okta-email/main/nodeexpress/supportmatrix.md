## Know which use cases support magic link and OTP

Out of the box, the Embedded SDK solution supports magic links for various use cases. For those use cases where magic links is not fully supported, OTP is available. See the following support matrix for more details:

| Email template name  | Use cases  | Email authenticator flow  | Supported methods | Template customizations needed |
| ----------------------------| ------------------|------------------------|-------------|-------------------------|
| Email Factor Verification   | Self service registration, Sign-in with email - enroll   | Email enrollment  | [OTP](#integrate-the-email-authenticator-using-otp)              | Yes, remove magic link
| Email Challenge             | Sign-in with email - challenge                           | Email challenge   | [Magic link](#integrate-email-challenge-with-magic-links), OTP  | No
| Forgot Password             | Self-service password recovery                           | Email challenge   | [Magic link](#integrate-email-challenge-with-magic-links), OTP  | Yes, add `otp` and `state` parameters. See <StackSnippet snippet="custompwdguide" inline />  for more details.

> **Note:** This guide uses the sign-in with email use cases to describe how to integrate email enrollment and challenge.
