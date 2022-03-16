<!-- WEB SHARED: SHARED FOR JAVA, JAVASCRIPT, .NET, AND GO -->
Before integrating email magic links in your app, it's important to understand how the user journey starts and ends with your app. The following steps for a sign-in with email example details this journey:

1. The user submits a username and password in your app and an email is sent to the user's address. After the user submits their credentials, your app displays an OTP page.
1. Using a new tab in the browser, the user opens their email and clicks on the magic link.
1. The link redirects to your app in a new tab and automatically signs the user in.

Note that the user is within the same browser when they start the sign-in and click on the magic link.

The following diagram illustrates these steps.

<div class="common-image-format">

![Diagram showing magic link flow for same and different browsers](/img/authenticators/authenticators-email-magic-link-summary-user-flow-overview.png)

</div>

### Display the OTP input page

In the first step, your app displays the OTP input page to allow the user to use the OTP as an alternative method to complete the verification. For security reasons, the user must use an OTP when they access their email on a different browser or device. See [Integrate different browser and device scenario](#integrate-different-browser-and-device-scenario) to learn how to handle this scenario and [Integrate the email authenticator using OTP](#integrate-the-email-authenticator-using-otp) integrate OTP in your application.

### Magic link support for the various use cases

Out of the box, the Embedded SDK solution supports magic links for various use cases. For those use cases where magic links is not fully supported, OTP is available. See the following support matric for more details:

| Email template name  | Use cases  | Email authenticator flow  | Supported methods | Template customizations needed |
| ----------------------------| ------------------|------------------------|-------------|-------------------------|
| Email Factor Verification   | Self service registration, Sign-in with email - enroll   | Email enrollment  | OTP              | N/A
| Email Challenge             | Sign-in with email - challenge                           | Email challenge   | Magic link, OTP  | No
| Forgot Password             | Self-service password recovery                           | Email challenge   | Magic link, OTP  | Yes
| User Activation             | User activation                                          | Email enrollment  | OTP              | N/A

Note the **Template customizations needed** column identifies whether a email template needs to be updated to support a fully customized experience. See the [Custom password recovery](/docs/guides/oie-embedded-sdk-use-case-custom-pwd-recovery-mfa/nodeexpress/main/) to learn more about customing the email template for a particular use case.

> **Note:** This guide uses the sign-in with email use cases to describe how to integrate email enrollment and challenge.
