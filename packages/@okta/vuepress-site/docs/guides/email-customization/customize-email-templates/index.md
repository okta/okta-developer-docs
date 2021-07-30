---
title: Customize email templates
---

Use these steps to edit a template or to add a template in one of the Okta-supported languages.

> **Note:** Free trial editions of Okta can't create or send customized email templates.

1. In the Admin Console, go to **Settings** and then **Emails & SMS**. The **Email** tab is selected by default.
2. From the left pane, select the email template that you want to edit or for which you want to add a new translation. A text version of the default message appears.
3. Click **Edit** to open the message in HTML.
4. Make your edits, and then click **Save**. The default language version of your edited message appears in the **Custom Email** table.
5. If your org supports additional languages, click **Add Translation**, and then select a language from the drop-down box.
6. Make your edits, and then click **Add Translation**.
7. Repeat steps 5 and 6 for additional languages.

#### Localization notes

* When multiple translations have been added for a template, the translation provided in the default language appears at the top of the list. You can designate any added translation as the default language by selecting it from the **Default Language** drop-down box. Doing so reorders the list of added translations automatically. You can edit the templates through the pencil icon, but you can't delete the default language template.

* It may be more convenient to copy and paste the HTML from the message body into a text editor, compose your custom translation, then copy and paste it back into the message body.

* If you want to delete all custom translations and revert to the original Okta-provided template, click **Reset to Default**.

### Expression Language variables

Email templates use common and unique [Expression Language (EL) variables](https://help.okta.com/en/prod/okta_help_CSH.htm#ext-expression-language). EL variables enable advanced customization and, when used in place of hard-coded URLs, can prevent potential broken links.

> **Note:** Some templates listed in the [variables tables](https://help.okta.com/en/prod/okta_help_CSH.htm#ext-expression-language) may not appear in your org. To obtain these templates, contact [Okta Support](https://support.okta.com/help/s/?_ga=2.17747641.1660906902.1597076228-1076744453.1575496867).

### Enhanced Email Macros
<ApiLifecycle access="ea" />

#### Overview of what this EA feature enables

The Early Access (EA) Enhanced Email Macros feature provides you with the functionality to customize the email templates with even greater flexibility than EL. It changes the underlying email templating engine from EL variables to [Velocity Templating Language (VTL)](https://velocity.apache.org/). This allows you to customize your org's email templates so that you can use enhanced conditional logic, all of the attributes in the Okta [User Profile object](/docs/reference/api/users/#profile-object), and some of the org attributes in these macros, as documented below.

##### What this EA feature doesn't enable

Okta will not perform any automated migration of previously customized email templates for EA. This means that when you enable the feature flag to access the functionality, all email templates will revert to defaults.

However, when you disable the feature flag, your old customized templates will return. If you choose to disable the feature flag, you will lose access to the customizations done while the EA was enabled.

##### EA feature requirements

To access this self-serviced EA feature, you need to enable `ENHANCED_EMAIL_MACROS`in the feature flag. For free orgs, you will need to first contact Okta support (`support@okta.com`) to request email customization.

> **Note:** The EA enhanced email macros feature is supported in Okta Identity Engine. <ApiLifecycle access="ie" />

#### Velocity Templating syntax

The templating syntax that is used in enhanced email macros is the Velocity Templating Language (VTL). Variables that are to be interpolated in the content of the template are preceded by a dollar sign. Dot notation is used to reference sub-objects.

The new templating syntax is different from the EL expression-based Okta email templating syntax that was previously used. You no longer need to use curly braces around the variable name.

##### Variable syntax change example

Previously with EL syntax, you could reference the first name of the user by using `${user.firstName}`. Now with the Velocity Templating syntax, you would use `$user.profile.firstName`.

The previously available template variables are listed in [Customization Variables](https://help.okta.com/en/prod/Content/Topics/Settings/Settings_Email.htm).

<!---
##### Function syntax change example

This EA feature supports the use of functions within email templates, but how you call the function's syntax is different. For example, instead of calling functions in the EL templating syntax like this:

`${f:formatTimeDiffHoursNowInUserLocale(org.activationTokenExpirationHours)}`

You would call functions in the Velocity Templating syntax like this:

`$f.formatTimeDiffHoursNowInUserLocale($org.activationTokenExpirationHours)`
-->

#### Access to all User Profile attributes

You can now reference any attribute in a user's Okta User Profile in your email templates. The notation is `$user.profile.attributeName`. For example, to reference the displayName attribute of the user's Okta user profile, you would use `$user.profile.displayName`.

See [Profile object](/docs/reference/api/users/#profile-object) for more information on the available user profile attributes.

##### Examples of user attributes

###### Registration: Email verification with customer's preferred language
Trigger an email in your end-users' preferred language by using the conditional logic and calling the `preferredLanguage` attribute.

###### Activation department specific email
If a customer wants to specify a department such as Engineering in an Activation Email, they are able to call the user attribute `department`.

#### Access to org attributes

You can also reference these org-level attributes, such as:

* `$org.name`
* `$org.locale`
* `$org.subDomain`

#### Support for conditional logic

All conditional logic that is supported by the Velocity Templating Engine, such as `if`, `elseif`, or `else` constructs and `foreach` loops, is available for you to use in your templates. See the [Velocity documentation](http://velocity.apache.org/engine/1.7/user-guide.html).

#### Email templates for customization

All the email templates are available for customization.

### Test Custom Email Templates

You can send yourself a test email to see how a custom email template looks and functions. This can help you validate macro attributes and translations in the customized template as well as see how the template renders in different email environments. This eliminates the need to create a real end-to-end workflow to test customization. The test email is sent to the primary email address of the admin that initiates the test email.

1. Click the email icon to the right of the email template that you have customized. The Send test email dialog box appears and lists who the email is sent to and from what sender the email is coming from.
2. Click **Send test email**.

<NextSectionLink/>
