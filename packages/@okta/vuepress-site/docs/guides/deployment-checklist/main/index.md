---
title: Deployment and pre-launch checklists
excerpt: Learn about the items you might want to check when completing a deployment to production.
layout: Guides
---

Now that you've built an app, there are a few final steps for you to take to customize your app and get it ready to launch. This guide provides multiple checklists to help you take your app over the finish line.

## Brand and customization

Ensure that your application fits your brand:

* [Use a custom domain](/docs/guides/custom-url-domain/): Customize your Okta organization by replacing your Okta domain name (for example, dev-12345.okta.com) with your own domain name (for example, id.example.com) so that all URLs look like your application.
* [Customize and add branding to your sign-in page](/docs/guides/custom-widget/): Tailor the sign-in page to fit your brand or your application's look and feel so that your user experience is consistent and seamless.
* [Customize and add branding to your error pages](/docs/guides/custom-error-pages/): If an error occurs during sign in, Okta may need to display an error page to the user. Customize the error page to match the rest of your app.
* [Email domain setup](/docs/guides/custom-email/main/#configure-a-custom-email-domain): Update the "From" address and domain of the emails sent to your users.
* [Customize email templates](/docs/guides/custom-email/main/#customize-email-templates): Change the look and feel of the emails sent to users by Okta.
* [Manage access to protected resources](/docs/guides/validate-access-tokens/): If your app has to validate the signed tokens that are issued to end-users. Learn about this process and best practices for validating your user's tokens.

## Application settings

* [Update Redirect URI for your domain](/docs/guides/sign-into-web-app-redirect/): If you created an Okta application that uses `localhost` or a test domain, you need to update your Okta application (or create a new one) using publicly accessible URLs.
* [Configure Cross-Origin Resource Sharing (CORS)](/docs/guides/enable-cors/): If you are building a SPA or you are embedding the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) into your own app, you must configure CORS for your domain.

> **Note:** Configuring CORS isn't required if you're using the Okta [custom domain feature](/docs/guides/custom-url-domain/main/#enable-the-custom-domain).

## User authorization and registration

* [Migrate your users in bulk](/docs/guides/migrate-to-okta-bulk/): Use the Okta API to bulk create your users with or without credentials. Make sure to sign into the Admin Console, and check out your settings for Security/General/Security Notification Emails, to configure whether or not you want your newly imported users to receive notification emails.
* [Configure Multi-Factor Authentication (MFA)](/docs/guides/mfa/ga/set-up-org/): Set up which security factors are used when users sign in.
* [Configure profile enrollment policies](/docs/guides/configure-profile-enrollment-policies/main/): Allow users to sign up for an account with an email address and then update profile details.
* [Enable Social Authentication](/docs/guides/add-an-external-idp/): Allow your users to sign in with their other services.

## Rate limits

* [Review how Okta's rate limits work](/docs/reference/rate-limits/): Requests made to the Okta API have rate limits to prevent abuse.

## Troubleshoot

Okta provides a set of reports and logs to help you troubleshoot user problems. These reports are available under the **Reports** menu.

* [View activity and security reports](https://help.okta.com/okta_help.htm?id=ext_Reports): Help diagnose sign-in problems for your users.
* [View events in the System Log](https://help.okta.com/okta_help.htm?id=ext_Reports_SysLog): See all event logs in your Okta org.
