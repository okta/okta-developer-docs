---
title: Before you begin
---

You can customize and style the default email notifications that Okta sends to end users. Okta sends email notifications for a variety of reasons, such as user activation, forgotten password, and unknown device notification. You can also configure a custom email domain to present a branded experience to your end users.

## Customize and brand templates

Email notifications are based on templates that are generated automatically and sent to end users according to your settings. Okta email templates contain text for account activation, password reset, and account unlock scenarios and are available in each Okta-supported language. You can use the default email templates as is, or you can edit the email template text to send end users custom Okta-generated email messages.

## Use the Brands API

The [Brands API](/docs/reference/api/brands/) is a more recent feature (currently in Early Access) that allows you to set icons, images, and colors across your Okta-hosted sign-in widget, error pages, email templates, and End-User Dashboard all at once, without needing to set a customized Okta URL domain. To find out more about this feature and how to use it, see [Customize your Okta experience with the Brands API](/docs/guides/customize-themes).

## Caveats

* Email templates must be under 64 KB. This is approximately 65,000 single-byte characters for all text, HTML, and CSS characters in the template. UTF-8 characters can be as large as 4 bytes each, so fewer characters are accepted.

* Okta supports only inline CSS.

* The **Subject** can't exceed 128 characters.

* If you customize an email template, you need to manually create a translation for each additional language that you support in your org.

## Support

If you need help or have an issue, post a question on the [Okta Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
