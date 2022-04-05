Before integrating email magic links in your app, it's important to understand how your app's user journey starts and ends. An example user journey for a sign-in with email use case:

1. Using your app, a user submits their username and password. Next, an email is sent to the user and your app displays an OTP input page.
1. Using a new tab in the browser, the user opens their email and clicks the magic link.
1. In a new tab, the link redirects to your app and automatically signs the user in.

The following diagram illustrates these steps.

<div class="common-image-format">

![Diagram showing magic link flow for same and different browsers](/img/authenticators/authenticators-email-magic-link-summary-user-flow-overview.png)

</div>

> **Note:** The user is within the same browser when they start the sign-in flow and click the magic link.

### The reason for the OTP input page

In the first step, your app displays the OTP input page to allow the user to use the OTP as an alternative method to complete the verification. For security reasons, the user must use an OTP when they access their email on a different browser or device. See [Integrate different browser and device scenario](#integrate-different-browser-and-device-scenario-with-magic-links) to learn how to handle this scenario and [Integrate the Email Authenticator using OTP](#integrate-the-email-authenticator-using-otp) to integrate OTP in your application.
