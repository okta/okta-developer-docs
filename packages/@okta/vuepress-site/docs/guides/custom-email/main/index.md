---
title: Customize email notifications
excerpt: Learn how to customize and style the default email notifications that Okta sends to end users.
layout: Guides
---

<ApiLifecycle access="ie" />

This guide explains how to customize and style the default Okta email notifications.

---

**Learning outcomes**

Customize email notifications.

**What you need**

[Okta Developer Edition organization](https://developer.okta.com/signup)

**Sample code**

[Example of using app context to brand an email](#example-of-using-app-context-to-brand-an-email)

---

## About email customization

You can customize and style the default email notifications that Okta sends to end users. Okta sends email notifications for a variety of reasons, such as:

- user activation
- forgotten password
- unknown device notification

Email notifications are based on templates that are generated automatically and sent to end users according to your settings. Okta email templates are available in each Okta-supported language. You can use the default email templates as they are, or you can edit the text of the various email templates to send end users custom Okta-generated email messages.

> **Note:** When you edit a template, Okta stops sending the default in other languages. You are responsible for adding translations of your customized message. See [Edit a default template](#edit-a-default-template).

### Use the Brands API

The Brands API allows you to customize the look and feel of pages and templates, such as the Okta-hosted sign-in Page, error pages, email templates, and the Okta End-User Dashboard. You can brand these pages and templates without setting up a customized Okta URL domain.

> **Note:** If you change any email code using the [Admin console](#edit-a-default-email-template), your customizations override the Brands API settings. To get your Brands API settings back, reset the code editors in the Admin Console to the default settings.

See [Email template operations](/docs/reference/api/brands/#email-template-operations) and [Email template resources](/docs/reference/api/brands/#email-template-resources) for details about emails and the Brands API.

### Caveats

- Email templates must be under 64 KB. This is approximately 65,000 single-byte characters for all text, HTML, and CSS characters in the template. UTF-8 characters can be as large as 4 bytes each, so fewer characters are accepted.

- Okta supports only inline CSS.

- The **Subject** can't exceed 128 characters.

- If you customize an email template, you need to manually create a translation for each additional language that you support in your org.

## Edit a default email template

Use these steps to add or edit a template in one of the Okta-supported languages.

> **Note:** Free trial editions of Okta can't create or send customized email templates.

1. In the Admin Console, go to **Customizations** > **Emails**.
1. Select either **Okta Identity Engine templates** or **Okta Classic templates**.
1. Click a default email template listed in the left pane.
1. Click **Edit** to open the message in HTML. If you see **Add Translation** instead of **Edit**, the template has already been customized. You need to make any additional edits in the default language version. Skip to Step 2 in [Add translations](#add-translations).
1. Select a language from the dropdown menu.
1. Make your edits, and then click **Save**. The default language version of your edited message appears in the **Custom Email** table.

Remember that Okta doesn't automatically translate the changes you make in one template to the other language templates. To add translations for this customization, proceed to step 3 in [Add translations](#add-translations).

## Add translations

* When multiple translations have been added for a template, the translation provided in the default language appears at the top of the list. You can designate any added translation as the default language by selecting it from the **Default Language** drop-down box. Doing so reorders the list of added translations automatically. You can edit the templates through the pencil icon, but you can't delete the default language template.

1. In the Admin Console, go to **Customizations** > **Emails**.
1. Choose an email template that you've customized. The default language version appears in the **Custom Email** table.
1. Click **Add Translation**, and then select a language from the drop-down box. If the **Add Translation** button isn't available, this template hasn't been customized. See [Edit a default email template](#edit-a-default-email-template]).
1. Make your translated edits, and then click **Add Translation**.
1. Repease steps 3 and 4 for additional languages.

To delete all custom translations and revert to the Okta template, click **Reset to Default**.

> **Note:** It may be more convenient to copy and paste the HTML from the message body into a text editor, compose your custom translation, then copy and paste it back into the message body.

### Velocity Templating Language

[Velocity Templating Language (VTL)](https://velocity.apache.org/engine/1.7/user-guide.html) allows you to customize your org's email templates so that you can use:

- enhanced conditional logic
- all of the attributes in the Okta [User Profile object](/docs/reference/api/users/#profile-object)
- some of the org attributes in these macros

Email templates use common and unique Velocity VTL variables. Variables that are to be interpolated in the content of the template are preceded by a dollar sign. Dot notation is used to reference sub-objects.

For example, reference the first name of a user by using `$user.profile.firstName`.

See [Velocity Templating Language](https://help.okta.com/okta_help.htm?type=oie&id=ext-velocity-variables) for available template variables.

## Use all User Profile attributes

You can reference any Okta User Profile attribute in your email templates. The reference notation is `$user.profile.attributeName`, where `attributeName` is an attribute from the Okta User Profile. For example, use `$user.profile.displayName` to reference the User Profile `displayName` attribute.

Other examples include:

- Trigger an email in your end-users' preferred language by using conditional logic and calling the `preferredLanguage` attribute.
- Specify a department such as Engineering in an activation email by calling the `department` attribute.

See [Profile object](/docs/reference/api/users/#profile-object) for more information on the available User Profile attributes.

## Use functions for email templates

In addition to customizing your emails with variables, you can use the following functions in each of the email templates. Functions are useful to normalize the dynamic output of variables, such as lowercasing a string, or producing a localized date for the email recipient.

Variables used for function parameters must match the function data type. For example, you can't use a string variable with the `formatTimeDiffHourNow()` function because the parameter data must be an integer.

| Expression                                                    | Definition                                                                                                          |
|---------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|
| replace(String input, String matchString, String replacement) | Replaces all occurrences of the match string with the replacement string                                           |
| substringAfter(String input, String matchString)              | Returns the input substring after the occurrence of a given match string, or an empty string if no occurrence of the match string exists in the input string |
| substringBefore(String input, String matchString)             | Returns the input substring before the occurrence of a given match string, or an empty string if no occurrence of the match string exists in the input string |
| toLowerCase(String input)                                     | Converts the given input string to all lowercase                                                                   |
| toUpperCase(String input)                                     | Converts the given input string to all uppercase                                                                   |
| substring(String input, int startIndex, int endIndex)         | Extracts a range of characters from the given input string                                                         |
| formatTimeDiffHoursNow(int hours)                             | Produces a formatted duration string from the current time to the given number of hours                                                 |
| formatTimeDiffHoursNowInUserLocale(int hours)                 | Produces a localized formatted duration string for the given number of hours                                       |
| formatTimeDiffDateNow(Date date)                              | Produces a formatted duration string for the given date                                                            |
| formatTimeDiffDateNowInUserLocale(Date date)                  | Produces a localized formatted duration string for the given date                                                  |
| escapeHtml(String html)                                       | Escapes the characters in the provided string using HTML entities                                                             |
| escapeHtmlAttr(String html)                                   | Encodes data for use in HTML attributes                                                                           |

## Use org attributes

You can also reference these org-level attributes, such as:

* `$org.name`
* `$org.locale`
* `$org.subDomain`

## Use app context

Okta Identity Engine orgs have access to app context within emails using VTL. When an end user enters an authentication flow, Identity Engine stores the app context in the state token. The following properties are available in the app context:

* `$app.id`
* `$app.name`
* `$app.label`

When these properties are used with conditional logic, you can trigger branding for the specified app and define strings to uniquely customize an email template based on the app from where the email was triggered. App context is not available on Classic Engine since the state token does not exist there.

### Support for conditional logic

All conditional logic that is supported by VTL, such as `if`, `elseif`, or `else` constructs and `foreach` loops, is available for you to use in your templates. See the [Velocity documentation](http://velocity.apache.org/engine/1.7/user-guide.html).

### Example of using app context to brand an email

```html
#if(${app.name} == "Toys R' Fun")
<img src="https://cdn.toysrfun.com/logo" height="37">
<a id="support-link" href="https://support.toysrfun.com/help/?language=en_US" style="text-decoration: none;"> Contact Toy Support </a>
#elseif(${app.name} == "Fidget Spinners Unlimited")
<img src="https://cdn.fidgetsu.com/logo" height="37">
<a id="support-link" href="https://support.fidgetsu.com/help/?language=en_US" style="text-decoration: none;"> Contact Fidget SU Support </a>
#else
<img src="$parentLogoUrl" height="37">
#end
```

## Test custom email templates

You can send yourself a test email to see how a custom email template looks and functions. This can help you validate macro attributes and translations in the customized template as well as see how the template renders in different email environments. This eliminates the need to create a real end-to-end workflow to test customization. The test email is sent to the primary email address of the admin that initiates the test email.

1. Click the email icon to the right of the email template that you have customized. The Send test email dialog box appears and lists who the email is sent to and from what sender the email is coming from.
2. Click **Send test email**.

## See also

Read more on customizing and styling various Okta assets to match your company's visual identity and branding:

- [Customize the Okta URL and email notification domains](/docs/guides/custom-url-domain/main/)
- [Customize SMS messages](/docs/guides/custom-sms-messaging/main/)
- [Style the Widget](/docs/guides/custom-widget/main/)
