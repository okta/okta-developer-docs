---
title: Pre-launch checklist
---

Now that you've built an app, get it ready to launch!

By now, you might have built your first app with Okta, congrats! There are just a few final steps for you to take to customize your app and get it ready to launch. The guides below help you take your app to the finish line.

Here's your pre-launch checklist:

### Branding and customization

Ensure your application fits your brand:

* [Use a custom domain](/docs/guides/custom-url-domain/overview/): Customize your Okta organization by replacing your Okta domain name (for example, dev-12345.okta.com) with your own domain name (for example, id.example.com) so that all URLs look like your application.
* [Customize and add branding to your sign-in page](/docs/guides/style-the-widget/): Tailor the sign-in page to fit your brand or your application's look and feel so that your user experience is consistent and seamless.
* [Customize and add branding to your error pages](/docs/guides/custom-error-pages/overview/): If an error occurs during sign in, Okta may need to display an error page to the user. Customize the error page to match the rest of your app.
* [Email domain setup](/docs/guides/email-customization/configure-custom-email-domain/): Update the "From" address and domain of the emails sent to your users.
* [Customize email templates](/docs/guides/email-customization/customize-email-templates/): Change the look and feel of the emails sent to users by Okta.
* [Manage access to protected resources](/docs/guides/validate-access-tokens/go/overview/): If your app has to validate the signed tokens that are issued to end-users. Learn about this process and best practices for validating your user's tokens.

### Application settings

* [Update Redirect URI for your domain](/docs/guides/sign-into-web-app/): If you created an Okta application that uses `localhost` or a test domain, you need to update your Okta application (or create a new one) using publicly accessible URLs.
* [Configure Cross-Origin Resource Sharing (CORS)](/docs/guides/enable-cors/overview/): If you are building a SPA or you are embedding the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) into your own app, you must configure CORS for your domain.

> **Note:** Configuring CORS isn't needed if you are using Okta's [custom domain feature](/docs/guides/custom-url-domain/enable-the-custom-domain/).

### User authorization and registration

* [Configure Multi-Factor Authentication (MFA)](/docs/guides/mfa/ga/set-up-org/): Set up which security factors are used when users sign in.
* [Set up Self-Service Registration](/docs/guides/set-up-self-service-registration/): Allow users to sign up for an account with an email address.
* [Enable Social Authentication](/docs/guides/add-an-external-idp/): Allow your users to sign in with their other services.

### Rate limits

* [Review how Okta's rate limits work](/docs/reference/rate-limits/): Requests made to the Okta API have rate limits to prevent abuse.

## Troubleshooting

Okta provides a set of reports and logs to help you troubleshoot user problems. These reports are available under the **Reports** menu in the **Admin Console's** side navigation.

* [View activity and security reports](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Reports): Help diagnose sign-in problems for your users.
* [View events in the System Log](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Reports_SysLog): To see a more general log of all events in your Okta organization.
