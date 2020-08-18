---
title: Deployment Checklist
---

Now that you’ve built an app, get it ready to launch!

By now, you might have built your first app with Okta—congrats! There are just a few final steps for you to take to customize your app and get it ready to launch. The guides below will help you take your app to the finish line.

Here’s your pre-launch checklist:

### Branding and Customization

Ensure your application fits your brand!

* [Use a custom domain](/docs/guides/custom-url-domain/overview/) - Customize your Okta organization by replacing the Okta domain name with your own domain name so all URLs look like your application.
* [Customize and add branding to your login page](/docs/guides/custom-hosted-signin/overview/) - Tailor the login page to fit your brand or your application’s look and feel so your user experience is consistent and seamless.
* [Customize and add branding to your error pages](/docs/guides/custom-error-pages/overview/) - If an error occurs during sign-in, Okta may need to display an error page to the user. Customize the error page to match the rest of your app.
* [Email Domain Setup](/docs/guides/custom-email-domain/) - Update the "From" address and domain of the emails sent to your users.
* [Customize Email Templates](https://help.okta.com/en/prod/Content/Topics/Settings/Settings_Email.htm) -  Change the look and feel of the emails sent to users by Okta.
* [Manage access to protected resources](/docs/guides/validate-access-tokens/go/overview/) - Your app has to validate the signed tokens that are issued to end-users. Learn about this process and best practices for validating your user’s tokens.

### Application Settings

* [Update Redirect URI for your domain](docs/guides/sign-into-web-app/)
If you created an Okta application that uses `localhost` or a test domain, update your Okta application (or create a new one) using the public URLs.
* [Configure Cross-Origin Resource Sharing(CORS)](/docs/guides/enable-cors/overview/) - If you are building a SPA or you are embedding the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) into your own app CORS must be configured for your domain.

    **NOTE:** Configuring CORS is NOT needed if you are using Okta's custom domain feature.

### User Authorization & Registration

* [Configure Multi-Factor Authentication (MFA)](/docs/guides/mfa/ga/set-up-org/) - Setup which security factors are used when users login.
* [Setup Self-Service Registration](TODO) - Allow users to sign up for accounts with an email address.

    **TODO ^ add help**

* [Enable Social Authentication](/docs/guides/add-an-external-idp/) - Allow your users to login with their other services.

### Rate Limits

* [Review how Okta's Rate Limits work](/docs/reference/rate-limits/) - Okta rate limit's requests to prevent abuse.

## Troubleshooting

Okta provides a set of reports and logs to help you troubleshoot user problems.  These reports are available in the **Classic UI**.

If the top of your Okta Admin Console says **Developer Console** click the dropdown and select **Classic UI**.

* [View Activity and Security Reports](https://help.okta.com/en/prod/Content/Topics/Reports/Reports.htm) - Help diagnose login problems for your users.
* [View Events in the System Log](https://help.okta.com/en/prod/Content/Topics/Reports/Reports_SysLog.htm) - To see a more general log of all events in your Okta Oranziation.
