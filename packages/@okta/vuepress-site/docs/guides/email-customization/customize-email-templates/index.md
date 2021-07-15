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

### Advanced Email Templates Customization - Velocity Templating Language
<ApiLifecycle access="ea" />

#### Overview of the advanced email template customization feature

This Early Access (EA) feature provides customers with the functionality to customize the email templates that Okta provides that allows them to send email notifications to their end users.

##### What this EA feature enables

This EA feature changes the underlying email templating engine to Velocity so that you can use the syntax of the Velocity Templating Language (VTL) to customize your org's email templates. In addition to the new syntax, which provides enhanced conditional logic, some org attributes and access are provided to all attributes in the Okta [User Profile object](/docs/reference/api/users/#profile-object).

##### What this EA feature doesn't enable

Okta will not perform any automated migration of previously customized email templates for EA. This means that when you enable the feature flag to access the functionality, all email templates will revert to defaults.

However, when you disable the feature flag, your old customized templates will return. If you choose to disable the feature flag, you will lose access to the customizations done while the EA was enabled.

##### EA Feature requirements

To access this EA functionality, you need the following prerequisites:
An Okta preview org (example.oktapreview.com) and Okta production org (example.okta.com)
Self Service Feature Flag ENHANCED_EMAIL_MACROS enabled for the org.	
Note: This feature is OIE compatible

#### New Templating Syntax

##### Variable Syntax Change Example

##### Functions Suntax Change Exmaple

#### Access to all User Profile attributes

##### Example of User Attributes

#### Access to Org Attributes

#### Support for Conditional Logic

#### List of Customizable Templates


### Test Custom Email Templates

You can send yourself a test email to see how a custom email template looks and functions. This can help you validate macro attributes and translations in the customized template as well as see how the template renders in different email environments. This eliminates the need to create a real end-to-end workflow to test customization. The test email is sent to the primary email address of the admin that initiates the test email.

1. Click the email icon to the right of the email template that you have customized. The Send test email dialog box appears and lists who the email is sent to and from what sender the email is coming from.
2. Click **Send test email**.

<NextSectionLink/>
