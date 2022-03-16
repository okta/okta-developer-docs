## Know which use cases support magic link and OTP

Out of the box, the Embedded SDK solution supports magic links for various use cases. For those use cases where magic links is not fully supported, OTP is available. See the following support matric for more details:

| Email template name  | Use cases  | Email authenticator flow  | Supported methods | Template customizations needed |
| ----------------------------| ------------------|------------------------|-------------|-------------------------|
| Email Factor Verification   | Self service registration, Sign-in with email - enroll   | Email enrollment  | [OTP](#integrate-the-email-authenticator-using-otp)              | Yes, remove magic link
| Email Challenge             | Sign-in with email - challenge                           | Email challenge   | [Magic link](#integrate-email-challenge-with-magic-links), OTP  | No
| Forgot Password             | Self-service password recovery                           | Email challenge   | Magic link, OTP  | Yes, add `otp` and `state` parameters

Note the **Template customizations needed** column identifies whether an email template needs to be updated to support a fully customized experience. As an example, <StackSnippet snippet="custompwdguide" inline /> to learn more about customizing the **Forgot Password** template.

> **Note:** This guide uses the sign-in with email use cases to describe how to integrate email enrollment and challenge.
