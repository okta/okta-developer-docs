---
title: Customize email notifications and domains
excerpt: Learn how to customize and style the default email notifications that Okta sends to end users and customize email domains.
layout: Guides
---

This guide teaches you how to customize and style default Okta email notifications and how to create a custom email domain.

---

**Learning outcomes**


**What you need**


**Sample code**


---

## Overview

You can customize and style the default email notifications that Okta sends to end users. Okta sends email notifications for a variety of reasons:

- user activation
- forgotten password
- unknown device notification

You can also configure a custom email domain to present a branded experience to your end users.

### Customize and brand templates

Email notifications are based on templates that are generated automatically and sent to end users according to your settings. Okta email templates are available in each Okta-supported language. You can use the default email templates as is, or you can edit the email template text to send end users custom Okta-generated email messages.

### Use the Brands API

The [Brands API](/docs/reference/api/brands/) is a feature (currently in Early Access) that allows you to customize the look and feel of pages and templates, such as the Okta-hosted sign-in Page, error pages, email templates, and the Okta End-User Dashboard. You can brand these pages and templates without setting up a customized Okta URL domain. See [Customize your Okta experience with the Brands API](/docs/guides/customize-themes).

### Caveats

- Email templates must be under 64 KB. This is approximately 65,000 single-byte characters for all text, HTML, and CSS characters in the template. UTF-8 characters can be as large as 4 bytes each, so fewer characters are accepted.

- Okta supports only inline CSS.

- The **Subject** can't exceed 128 characters.

- If you customize an email template, you need to manually create a translation for each additional language that you support in your org.

## Customize email templates

### Add or edit email templates

Use these steps to add or edit a template in one of the Okta-supported languages.

> **Note:** Free trial editions of Okta can't create or send customized email templates.

1. In the Admin Console, go to **Settings** and then **Emails & SMS**. The **Email** tab is selected by default.
2. From the left pane, select the email template that you want to edit or for which you want to add a new translation. A text version of the default message appears.
3. Click **Edit** to open the message in HTML.
4. Make your edits, and then click **Save**. The default language version of your edited message appears in the **Custom Email** table.
5. If your org supports additional languages, click **Add Translation**, and then select a language from the drop-down box.
6. Make your edits, and then click **Add Translation**.
7. Repeat steps 5 and 6 for additional languages.

### Localization notes

* When multiple translations have been added for a template, the translation provided in the default language appears at the top of the list. You can designate any added translation as the default language by selecting it from the **Default Language** drop-down box. Doing so reorders the list of added translations automatically. You can edit the templates through the pencil icon, but you can't delete the default language template.

* It may be more convenient to copy and paste the HTML from the message body into a text editor, compose your custom translation, then copy and paste it back into the message body.

* If you want to delete all custom translations and revert to the original Okta-provided template, click **Reset to Default**.

### Expression Language variables

Email templates use common and unique [Expression Language (EL) variables](https://help.okta.com/okta_help.htm?id=ext-expression-language). EL variables enable advanced customization and, when used in place of hard-coded URLs, can prevent potential broken links.

> **Note:** Some templates listed in the [variables tables](https://help.okta.com/okta_help.htm?id=ext-expression-language) may not appear in your org. To obtain these templates, contact [Okta Support](https://support.okta.com/help/s/?_ga=2.17747641.1660906902.1597076228-1076744453.1575496867).

### Enhanced Email Macros

<ApiLifecycle access="ea" />

> **Note:** To access this self-service EA feature, you need to enable **Enhanced Email Macros** in the Feature Manager. See [Feature Lifecycle Management](/docs/concepts/feature-lifecycle-management/) and [Manage Early Access and Beta features](https://help.okta.com/okta_help.htm?id=ext_Manage_Early_Access_features). For free orgs, contact [Okta Support](https://support.okta.com/help/s/?_ga=2.17747641.1660906902.1597076228-1076744453.1575496867) to request email customization.

> **Note:** The EA Enhanced Email Macros feature is supported in Okta Identity Engine. <ApiLifecycle access="ie" />

The Enhanced Email Macros feature provides you with the functionality to customize the email templates with even greater flexibility than Expression Language. It changes the underlying email templating engine from Expression Language variables to [Velocity Templating Language (VTL)](https://velocity.apache.org/). This allows you to customize your org's email templates so that you can use:

- enhanced conditional logic
- all of the attributes in the Okta [User Profile object](/docs/reference/api/users/#profile-object)
- some of the org attributes in these macros

All of Okta's default email templates are available for customization.

> **Note:** Okta doesn't perform any automated migration of previously customized email templates for this EA feature. This means that when you enable the Enhanced Email Macros feature to access the functionality, all email templates revert to defaults. However, when you disable the Enhanced Email Macros feature, your old customized templates return. If you choose to disable the feature, you lose access to the customizations done while the EA feature was enabled.

### Velocity Templating syntax

The templating syntax that is used in enhanced email macros is the Velocity Templating Language (VTL). Variables that are to be interpolated in the content of the template are preceded by a dollar sign. Dot notation is used to reference sub-objects.

The new templating syntax is different from the EL expression-based Okta email templating syntax that was previously used. You no longer need to use curly braces around the variable name.

Previously with EL syntax, you could reference the first name of the user by using `${user.firstName}`. Now with the Velocity Templating syntax, you would use `$user.profile.firstName`.

The previously available template variables are listed in [Customization Variables](https://help.okta.com/okta_help.htm?id=ext_ref_email_variables).

### Use all User Profile attributes

You can reference any Okta User Profile attribute in your email templates. The reference notation is `$user.profile.attributeName`, where `attributeName` is an attribute from the Okta User Profile. For example, use `$user.profile.displayName` to reference the User Profile `displayName` attribute.

Other examples include:

- Trigger an email in your end-users' preferred language by using the conditional logic and calling the `preferredLanguage` attribute.
- If a customer wants to specify a department such as Engineering in an Activation Email, they are able to call the user attribute `department`.

See [Profile object](/docs/reference/api/users/#profile-object) for more information on the available User Profile attributes.

### Use functions for email templates

In addition to customizing your emails with variables, you can use the following functions in each of the email templates. Functions are useful to normalize the dynamic output of variables, such as lowercasing a string, or producing a localized date for the email recipient.

Variables used for function parameters must match the function data type. For example, you can't use a string variable with the `formatTimeDiffHourNow()` function because the parameter data must be an integer.

There are slight differences between EL templating syntax and VTL syntax. For example, the following EL and VTL syntax call the same function.

EL templating syntax:

`${f:formatTimeDiffHoursNowInUserLocale(org.activationTokenExpirationHours)}`

VTL syntax:

`$f.formatTimeDiffHoursNowInUserLocale($org.activationTokenExpirationHours)`

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

### Use org attributes

You can also reference these org-level attributes, such as:

* `$org.name`
* `$org.locale`
* `$org.subDomain`

### Support for conditional logic

All conditional logic that is supported by the Velocity Templating Engine, such as `if`, `elseif`, or `else` constructs and `foreach` loops, is available for you to use in your templates. See the [Velocity documentation](http://velocity.apache.org/engine/1.7/user-guide.html).

<ApiLifecycle access="ie" /><br>

### Use app context

Okta Identity Engine orgs have access to app context within emails using the Velocity Templating Language. When an end user enters an authentication flow, Identity Engine stores the app context in the state token. The following properties are available in the app context:

* `$app.id`
* `$app.name`
* `$app.label`

When these properties are used with conditional logic, you can trigger branding for the specified app and define strings to uniquely customize an email template based on the app from where the email was triggered. App context is not available on Classic Engine since the state token does not exist there.

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

### Test custom email templates

You can send yourself a test email to see how a custom email template looks and functions. This can help you validate macro attributes and translations in the customized template as well as see how the template renders in different email environments. This eliminates the need to create a real end-to-end workflow to test customization. The test email is sent to the primary email address of the admin that initiates the test email.

1. Click the email icon to the right of the email template that you have customized. The Send test email dialog box appears and lists who the email is sent to and from what sender the email is coming from.
2. Click **Send test email**.

## Configure a custom email domain

A custom email domain allows you to present a branded experience to your end users. Email that Okta sends to your end users appears to come from your custom email domain instead of noreply@okta.com. You can switch to a different custom domain or revert to the default Okta domain, but you can use only one email domain at a time.

Okta sends your super admins a confirmation email after your custom domain is configured and operating correctly. To ensure continuous operation, Okta polls your custom email domain once every 24 hours. If a problem occurs, Okta alerts super admins by email, and Okta-generated emails are sent from the default domain noreply@okta.com until the problem is resolved.

### Prerequisites

* Only qualified administrators with access to the DNS records of your public custom domain should attempt these procedures.

* Okta strongly recommends that your organization implement the [Sender Policy Framework (SPF)](https://tools.ietf.org/html/rfc7208) to prevent sender address forgery. If you already implement SPF in your custom domain, be aware that you must update the SPF record.

To configure a custom email domain:

1. In the Admin Console, go to **Settings** and then **Emails & SMS**.

2. Click the **Sender:** link (**Okta <noreply@okta.com>**) near the top of the page.

3. On the Configure Email Sender dialog box, select **Custom email domain** as the type of sender that you want to send system notification emails from.

4. In the **Email address to send from**, enter the email address that you want to send the system notification emails from. This is what displays in the emails sent to your users.

5. Enter the **Name of sender**. This name appears as the sender in the emails sent to your users.

6. In the **Mail domain to send from** box, enter a unique mail domain that your organization has dedicated for Okta to send mail from. Later in this procedure, you add the unique mail domain to the SPF record to your DNS zone (the root domain) as an include-statement to show that you allow Okta to send mail from this unique mail domain.

7. Click the **Save & View Required DNS Records** button to save your changes and view your org's DNS records that you need to update before your settings can take effect.

8. Update your DNS records using the provided values.

9. When you have updated your DNS records through your domain provider, click **I've updated the DNS records**. Okta begins polling your DNS records until it detects your updates (may take up to 24 hours). Your configuration is pending until the DNS updates are detected.

    Alternatively, you can click **I will update the DNS records later**. Your records aren't polled and your configuration is incomplete until you update the relevant DNS records and click **I've updated the DNS records**. You can view the list of records that require an update at any time.

10. Add the SPF record to your DNS zone (the root domain). An SPF record specifies the mail servers that your organization has authorized to send mail from your domain. If your root domain already has an SPF record, the following update can prevent spoofers from sending mail that mimics your domain.

    For example, if you only send mail from Microsoft Office 365, your SPF record has an include-statement like this:

    ```
    example.com TXT    v=spf1 include:spf.protection.outlook.com -all
    ```

    To finish configuring your custom email domain, you must add another include-statement that specifies the mail domain that you specified in the **Mail domain to send from** box in step 6. This is also the host that appears in the first CNAME row in the DNS Records table in the Configure Email Sender dialog box.

    ![CNAME Example](/img/CNAMEExample.png "CNAME table with an arrow pointing at the first CNAME row in the table")

    Add the host to the existing record to configure a combined SPF record similar to this:

    ```
    example.com TXT    v=spf1 include:oktamail.example.com include:spf.protection.outlook.com -all
    ```

### Known Issues

- You can't configure Okta to send emails through a domain that uses SendGrid. Instead, configure a subdomain on your DNS provider for custom Okta emails.

- You can't have more than 10 DNS lookups in your SPF record.

## See also

Take a look at how to import users into Okta and manage their user profiles.

<!--- Need to add the link to user migration after it gets created -->

Read more on customizing and styling various Okta assets to match your company's visual identity and branding:

- [Customize the Okta URL domain](/docs/guides/custom-url-domain/)
- [SMS customization](/docs/guides/custom-sms-messaging/)
- [Style the Widget](/docs/guides/style-the-widget/)