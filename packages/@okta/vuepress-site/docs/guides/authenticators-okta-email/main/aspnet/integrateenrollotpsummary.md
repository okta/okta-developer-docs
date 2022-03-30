## Integrate email enrollment with OTP

 With a One-Time Passcode (OTP), the user copies an automatically generated numeric string from their email to your application to verify their identity. The following flowchart, which uses the sign-in with email example, illustrates the OTP user journey.

<div class="common-image-format">

![Flowchart showing the OTP flow](/img/authenticators/authenticators-email-overview-otp-flowchart.png)

</div>

The following step-by-step instructions detail how to integrate the OTP flow for email enrollment. Even though this is an enrollment example, the OTP integration portion is nearly identical for the email challenge.

> **Note**: If your org's Enrollment Policy requires an email to be supplied during user registration, the enrollment flow for the Email Authenticator is included in the registration process. The [self-service registration](https://developer.okta.com/docs/guides/oie-embedded-sdk-use-case-self-reg/aspnet/main/#summary-of-steps) guide details how this works.

<div class="common-image-format">

![Sequence diagram for Okta email OTP enrollment](/img/authenticators/dotnet-authenticators-email-enrollment-with-otp-flow-diagram.png)

</div>
