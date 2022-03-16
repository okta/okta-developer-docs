Before integrating the email authenticator in your app, learn the user journey for email magic links and OTP. After, configure your Okta org to support the email authenticator. When these first steps are completed, you're ready to integrate the email authenticator in your app using the Embedded SDK. This guide walks you through each of these steps:

**Magic links**

1. [Understand magic link flow before you integrate](#understand-the-magic-link-flow): Learn the magic link user journey
1. [Know which use cases support magic link and OTP](#know-which-use-cases-support-magic-link-and-otp): Know which use cases support magic links and OTP
1. [Update Configurations](#update-configurations): Set up your org to enable the email authenticator and magic links
1. [Integrate email challenge with magic links](#integrate-email-challenge-with-magic-links): Integrate step-by-step email challenge using magic links
1. [Integrate different browser and device scenario with magic links](#integrate-different-browser-and-device-scenario-with-magic-links): Integrate the different browser and device scenarios in your app

**OTP**

1. [Integrate the email authenticator using OTP](#integrate-the-email-authenticator-using-otp): Integrate the OTP method to verify email in your app
1. [Enable only OTP for the email authenticator](#enable-only-otp-for-the-email-authenticator): Update the email templates to only support OTP

**Advanced use cases**

1. [Design considerations when customizing magic link for password recovery](#design-considerations-when-customizing-magic-link-for-password-recovery): Learn about the design considerations when customizing magic link for password recovery
