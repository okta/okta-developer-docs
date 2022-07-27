---
title: Customize email notifications
excerpt: Learn how to customize and style the default email notifications that Okta sends to end users.
layout: Guides
---

This guide explains how to customize and style the default Okta email notifications.

---

**Learning outcomes**

Customize email notifications.

**What you need**

- [Okta Developer Edition organization](https://developer.okta.com/signup)
- Access to email template customization. Contact [Okta support](https://support.okta.com/help) for help.

**Sample code**

[Customization example](#customization-example)

---

## About email customization

You can customize and style the default email notifications that Okta sends to end users. Okta sends email notifications for a variety of reasons, such as:

- user activation
- forgotten password
- unknown device notification

Email notifications are based on templates that are generated automatically and sent to end users according to your settings. Okta email templates are available in each Okta-supported language. You can use the default email templates as they are, or you can edit the text of the various email templates to send end users custom Okta-generated email messages.

> **Note:** When you edit a template, Okta stops sending the default in other languages. You are responsible for adding translations of your customized message. See [Edit a default template](#edit-a-default-template).

### Use the Brands API

The Brands API allows you to customize the look and feel of pages and templates, such as the Okta-hosted Sign-In Widget, error pages, email templates, and the Okta End-User Dashboard. You can brand these pages and templates without setting up a customized Okta URL domain.

> **Note:** If you change any email code using the [Admin Console](#edit-a-default-email-template), your customizations may override the values of the Theme objects. To get your Theme object values back, reset the code editors in the Admin Console to the default settings.

See [Email template operations](/docs/reference/api/brands/#email-template-operations) and [Email template resources](/docs/reference/api/brands/#email-template-resources) for details about email templates and the Brands API.

### Caveats

- Email templates must be under 64 KB. This is approximately 65,000 single-byte characters for all text, HTML, and CSS characters in the template. UTF-8 characters can be as large as 4 bytes each, so fewer characters are accepted.

- Okta supports only inline CSS.

- The **Subject** can't exceed 128 characters.

- If you customize an email template, you need to manually create a translation for each additional language that you support in your org.

## Edit a default email template

Use these steps to add or edit a template in one of the Okta-supported languages.

> **Note:** To access email customization with a free developer edition of an Okta org, you need to contact [Okta support](https://support.okta.com/help).

1. In the Admin Console, go to **Customizations** > **Emails**.
1. Click a default email template listed in the left pane.
1. Click **Edit** to open the message in HTML. If you see **Add Translation** instead of **Edit**, the template is already customized. You need to make any additional edits in the default language version. Skip to step 2 in [Add translations](#add-translations).
1. Select a language from the dropdown menu.
1. Make your edits. See [Velocity Templating Language](#velocity-templating-language) for customization options.
1. Click **Save**. The default language version of your edited message appears in the **Custom Email** table.

Remember that Okta doesn't automatically translate the changes you make in one template to the other language templates. To add translations for this customization, proceed to step 3 in [Add translations](#add-translations).

### Use customizable email templates

The following table provides a list of all available email templates in an Okta org, along with:

- the default subject line for the email template
- the corresponding API object reference (`${templateName}`) for the email template (see [Email template operations](/docs/reference/api/brands/#email-template-operations))
- the required validation fields for templates created using the API
- a description of the template

> **Note:** If you use the embedded Okta Sign-In Widget for authentication, don't use `${emailAuthenticationLink}` as the required validation field. It takes you to the Okta-hosted Sign-In Widget. Instead, use [Custom password recovery](/docs/guides/oie-embedded-sdk-use-case-custom-pwd-recovery-mfa/nodeexpress/main/).

| UI name | Default subject line | API object reference</br>`${templateName}` | Required validation fields | Description |
|---------|---------|----------------------|----------|---------|
| User Activation | Welcome to Okta! | `UserActivation` | Either `${activationLink}` or `${activationToken}` | Sent to new users who must follow the provided link to complete the Okta sign-up process |
| Active Directory User Activation | Welcome to Okta! | `ADUserActivation` | | Sent to your new Active Directory users who must follow the provided link to complete the Okta sign-up process |
| LDAP User Activation | Welcome to Okta! | `LDAPUserActivation` | |  Sent to your new LDAP users who must follow the provided link to complete the Okta sign-up process |
| Send Push Verify Activation Link | Push Verify Activation Email | `OktaVerifyActivation` | `${pushVerifyActivationLink}` |  Sent to users who must follow the provided link to download Okta Verify Push for multifactor authentication on their mobile device |
| Registration - Activation | Activate Account | `RegistrationActivation` | Either `${registrationActivationLink}` or `${registrationActivationToken}` |  Sent to users who must follow the provided link to complete their self-registration |
| Registration - Email Verification | Welcome to (`instanceDisplayName`)! | `RegistrationEmailVerification` | One of `${verificationLink}`, `${verificationToken}`, `$[registrationEmailVerificationLink}`, or `${registrationEmailVerificationToken}` (Identity Engine)</br></br>Either `${registrationEmailVerificationLink}` or `${registrationEmailVerificationToken}` (Classic Engine) |  Sent to users who can follow the provided link to verify their email address |
| Email Factor verification (Identity Engine)</br></br>Email Verification (Classic Engine) | Confirm your email address | `EmailFactorVerification` | One of `${verificationLink}`, `${verificationToken}`, `$[registrationEmailVerificationLink}`, or `${registrationEmailVerificationToken}` (Identity Engine) |  Sent to users who must follow the provided link to verify their email address |
| Forgot Password Denied | Account Password Reset | `ForgotPasswordDenied` | |  Sent to users who forgot their password but only their admin can reset it |
| Password Reset by Admin | Account Password Reset | `PasswordResetByAdmin` | |  Sent to users who had their password reset by an Okta system administrator and must follow the provided link to complete the password reset process |
| Active Directory Password Reset Denied | Forgotten Password | `ADForgotPasswordDenied` | |  Sent to Active Directory users who tried to reset their Active Directory password but don't have permission |
| LDAP Forgot Password Denied | Account password reset | `LDAPForgotPasswordDenied` | |  Sent to LDAP users who tried to reset their LDAP password but don't have permission |
| LDAP Forgot Password | Account password reset | `LDAPForgotPassword` | Either `${resetPasswordLink}` or `${recoveryToken}` (Identity Engine)</br></br>Either `${resetPasswordLink}` or `${oneTimePassword}` (Classic Engine) |  Sent to LDAP users who forgot their password and must follow the provided link to reset their password |
| Forgot Password | Account password reset | `ForgotPassword` | Either `${resetPasswordLink}` or `${oneTimePassword}`</br>(Identity Engine and Classic Engine) |  Sent to users who must follow the provided link to reset their forgotten password |
| Active Directory Password Reset | Forgotten password (Identity Engine)</br></br>Account password reset (Classic Engine) | `ADForgotPassword` | Either `${recoveryLink}` or `${recoveryToken}`</br>(Identity Engine and Classic Engine) | Sent to users who want to reset their Active Directory account password and must follow the provided link to reset their password (Identity Engine)</br></br>Sent to users who have had their Active Directory account password reset and must follow the provided link to reset their password (Classic Engine) |
| Password Changed | Password Changed | `PasswordChanged` | |  Sent to users whenever their account password changes |
| Self-Service Unlock when Account is not Locked | Unlock Account | `SelfServiceUnlockOnUnlockedAccount` | |  Sent to users who tried to use self-service to unlock an account that isn't locked |
| Active Directory Password Unlock | Unlock Account | `ADSelfServiceUnlock` | Either `${unlockAccountLink}` or `${recoveryToken}` (Identity Engine)</br></br>`${unlockAccountLink}` (Classic Engine) |  Sent to Active Directory users who must follow the provided link to unlock their password |
| Self-Service Unlock Account | Unlock Account | `SelfServiceUnlock` | Either `${unlockAccountLink}` or `${recoveryToken}` (Identity Engine)</br></br>`${unlockAccountLink}` (Classic Engine) |  Sent to users who must follow the provided link to complete the self-service unlock account process |
| LDAP Self-Service Unlock Account | Unlock Account | `LDAPSelfServiceUnlock` | Either `${unlockAccountLink}` or `${recoveryToken}` (Identity Engine)</br></br>`${unlockAccountLink}` (Classic Engine) |  Sent to LDAP users who must follow the provided link to complete the self-service unlock account process |
| Change Email Confirmation | Confirm email address change | `ChangeEmailConfirmation` | `${verificationToken}` |  Sent to users who must follow the provided link to confirm their email address change request |
| Email Change Notification | Notice of pending email address change | `PendingEmailChange` | |  Sent to a user's old email address when they request to change their email address |
| Email Change Confirmed Notification | Notice of email address change | `EmailChangeConfirmation` | |  Sent when the request to change a user's email address is confirmed |
| Email Challenge | One-time Email Authentication Link | `EmailChallenge` | Either `${emailAuthenticationLink}` or `${verificationToken}` |  Sent to users with email as an authentication factor and must follow the provided link to complete their authentication into Okta |
| Account Lockout | Account Lockout | `AccountLockout` | |  Sent to users who are locked out of their account and must follow the provided link to complete the self-service unlock account process or contact their admin |
| New Sign-On Notification | New Sign-On Notification | `NewSignOnNotification` | `${request.browser}`, `${request.date}`, `${request.time}`, `${request.location}` and `${request.ipAddress}` |  Sent to users who authenticated into Okta from an unknown device or browser and should contact the Okta system administrator if the user doesn't recognize the sign-in details of the unknown device |
| Authenticator Enrolled (Identity Engine)</br></br>MFA Factor Enrolled (Classic Engine) | Security method enrolled (Identity Engine)</br>MFA Factor Enrolled (Classic Engine) | `AuthenticatorEnrolled` | Either `${request.factor}` or `${request.authenticator}` (Identity Engine)</br></br>`${request.factor}`, `${request.date}`, `${request.time}`, and `${request.location}` (Classic Engine) | Sent to users when authenticators are reset (Identity Engine)</br></br>Sent to users when new MFA factors are enrolled (Classic Engine) |
| Authenticator Reset (Identity Engine)</br></br>MFA Factor Reset (Classic Engine) | Security method reset (Identity Engine)</br>MFA Factor Reset (Classic Engine) | `AuthenticatorReset` | Either `${request.factors}` or `${request.authenticators}` (Identity Engine)</br></br>`${request.factors}`, `${request.date}`, `${request.time}`, and `${request.location}` (Classic Engine) | Sent to users when authenticators are reset (Identity Engine)</br></br>Sent to users when MFA factors are reset (Classic Engine) |
| Campaign Launched | Access certification campaign: (`campaignName`) | `IGAReviewerNotification` | | Sent to reviewers when they are assigned reviews to complete in a newly launched campaign. |
| Campaign Ended | Access certification campaign: (`campaignName`) | `IGAReviewerEndNotification` | | Sent to reviewers if they have pending reviews after a campaign ends. |
| Campaign Reminder | Access certification campaign: (`campaignName`) | `IGAReviewerPendingNotification` | | Sent to reviewers to remind them of pending reviews. |
| Reassigned Review | Access certification campaign: (`campaignName`) | `IGAReviewerReassigned` | | Sent to reviewers when they are assigned new reviews by an admin or a different reviewer. |
| Idp MyAccount Email Change Confirmation | Confirm email address change | `MyAccountChangeConfirmation` |  | Sent to users who try to verify an email address using MyAccount APIs. The users must enter the provided code to confirm the change. |

### Use Branding variables

After you create a theme for your org, you can use branding variables in your custom email templates by selecting the `FULL_THEME` variant for your emails. If you delete any of these optional variables from the email code, it will disconnect the theme object properties from the email template.

| Variable | Asset Type |
|-------------------|--------------------|
| ${brand.theme.logo}| URL |
| ${brand.theme.primaryColor} | hex code for CTA button |
| ${brand.theme.secondaryColor} | hex code for background color |

### Use allowed HTML tags and elements

The following table provides a list of all allowed HTML tags and elements in customized templates. If you deviate from the allowed tags and elements, you receive error messages.

| HTML tags/elements | Allowed attributes |
|-------------------|--------------------|
| All tags | <ul><li>`id`: Can be alphanumeric and contain `:`, `-`, `_`, or `.`</li><li>`class`: Can be alphanumeric and contain `<space>`, `,`, `-`, or `_`</li><li>`lang`: Can be uppercase or lowercase, and two to 20 characters long</li><li>`title`: Can contain any letter from any language, any numeric character in any script, and `<space>`, `-`, `_`, `'`, `,`, `:`, `[`, `]`, `!`, `.`, `/`, `\`, `(`, `)`, or `&`</li></ul> |
| `<style>` | `-moz-border-radius`, `-moz-border-radius-bottomleft`, `-moz-border-radius-bottomright`, `-moz-border-radius-topleft`, `-moz-border-radius-topright`, `-moz-box-shadow`, `-moz-outline`, `-moz-outline-color`, `-moz-outline-style`, `-moz-outline-width`, `-o-text-overflow`, `-webkit-border-bottom-left-radius`, `-webkit-border-bottom-right-radius`, `-webkit-border-radius`, `-webkit-border-radius-bottom-left`, `-webkit-border-radius-bottom-right`, `-webkit-border-radius-top-left`, `-webkit-border-radius-top-right`, `-webkit-border-top-left-radius`, `-webkit-border-top-right-radius`, `-webkit-box-shadow`, `azimuth`, `background`, `background-attachment`, `background-color`, `background-image`, `background-position`, `background-repeat`, `border`, `border-bottom`, `border-bottom-color`, `border-bottom-left-radius`, `border-bottom-right-radius`, `border-bottom-style`, `border-bottom-width`, `border-collapse`, `border-color`, `border-left`, `border-left-color`, `border-left-style`, `border-left-width`, `border-radius`, `border-right`, `border-right-color`, `border-right-style`, `border-right-width`, `border-spacing`, `border-style`, `border-top`, `border-top-color`, `border-top-left-radius`, `border-top-right-radius`, `border-top-style`, `border-top-width`, `border-width`, `box-shadow`, `caption-side`, `color`, `cue`, `cue-after`, `cue-before`, `direction`, `elevation`, `empty-cells`, `font`, `font-family`, `font-size`, `font-stretch`, `font-style`, `font-variant`, `font-weight`, `height`, `image()`, `letter-spacing`, `line-height`, `linear-gradient()`, `list-style`, `list-style-image`, `list-style-position`, `list-style-type`, `margin`, `margin-bottom`, `margin-left`, `margin-right`, `margin-top`, `max-height`, `max-width`, `min-height`, `min-width`, `outline`, `outline-color`, `outline-style`, `outline-width`, `padding`, `padding-bottom`, `padding-left`, `padding-right`, `padding-top`,`pause`, `pause-after`, `pause-before`, `pitch`, `pitch-range`, `quotes`, `radial-gradient()`, `rect()`, `repeating-linear-gradient()`, `repeating-radial-gradient()`, `rgb()`, `rgba()`, `richness`, `speak`, `speak-header`, `speak-numeral`, `speak-punctuation`, `speech-rate`, `stress`, `table-layout`, `text-align`, `text-decoration`, `text-indent`, `text-overflow`, `text-shadow`, `text-transform`, `text-wrap`, `unicode-bidi`, `vertical-align`, `voice-family`, `volume`, `white-space`, `width`, `word-spacing`, `word-wrap`,`display`, `float`, `position`, `right`, `left`,`top`, `bottom`, `clear`, `content`, `cursor`, `z-index`, `overflow`, `visibility`, `zoom`, `overflow-x`, `overflow-y`, `page-break-inside`, `page-break-before`, `page-break-after`, `opacity`, `-moz-opacity` |
| `p` | `align`: Can be any of `middle`, `center`, `left`, `right`, `justify` or `char` |
| `label` | `for`: Can be alphanumeric and contain `:`, `-`, `_`, or `.` |
| `font` | <ul><li>`color`: Can be from the color list or a color code.<ul><li>Color list: `aqua`, `black`, `blue`, `fuchsia`, `gray`, `grey`, `green`, `lime`, `maroon`, `navy`, `olive`, `purple`, `red`, `silver`, `teal`, `white`, or `yellow`</li><li>Color code: Can be HTML/CSS Spec 3 or 6 digit hex</li></ul></li><li>`face`: Can be alphanumeric and contain `;`, `,`, or `-`</li><li>`size`: Can be a number</li></ul> |
| URLs | `url`: Can contain `http`, `https`, or `mailto` |
| `a` | <ul><li>`href`</li><li>`nohref`</li><li>`name`: Can be alphanumeric with `-`, `_`, or `$`</li><li>`onfocus`: Can include JavaScript calls with `javascript:` or `history.go(-1)`</li><li>`onblur`: Can include JavaScript calls with `javascript:` or `history.go(-1)`</li><li>`onclick`: Can include JavaScript calls with `javascript:` or `history.go(-1)`</li><li>`onmousedown`: Can include JavaScript calls with `javascript:` or `history.go(-1)`</li><li>`onmouseup`: Can include JavaScript calls with `javascript:` or `history.go(-1)`</li></ul> |
| `img` | <ul><li>`src`: Can be one of the following:<ul><li>A string that represents an onsite URL that contains any letter from any language, any numeric character in any script, or `\`, `dot`, `#`, `@`, `$`, `%`, `+`, `&`, `;`, `-`, `_`, `~`, `?`, `=`, `/`, or `!`</li><li>A URL that contains `https`, `ftps`, or `mailto:`</li></ul></li><li>`name`: Can be alphanumeric with `-`, `_`, `$`</li><li>`alt`: Can be a paragraph that contains any letter from any language, any numeric character in any script, or `{space}`, `-`, `_`, `'`, `,`, `(`, `)`, `.`, or `;`</li><li>`border-radius`</li><li>`border`</li><li>`hspace`: Must be a number</li><li>`vspace`: Must be a number</li><li>`height`: Can be a number or a percentage</li><li>`width`: Can be a number or a percentage</li><li>`align`: Can be any of `middle`, `center`, `left`, `right`, `justify`, or `char`</li></ul> |
| `table` | <ul><li>`border-radius`: Must be a number</li><li>`border`: Must be a number</li><li>`cellpadding`: Must be a number</li><li>`cellspacing`: Must be a number</li><li>`bgcolor`: Can be from the color list or a color code.<ul><li>Color list: `aqua`, `black`, `blue`, `fuchsia`, `gray`, `grey`, `green`, `lime`, `maroon`, `navy`, `olive`, `purple`, `red`, `silver`, `teal`, `white`, or `yellow`</li><li>Color code: Can be HTML/CSS Spec 3 or 6 digit hex</li></ul></li><li>`background`: Can be string representing an onsite URL that contains any letter from any language, any numeric character in any script, or `\`, `dot`, `#`, `@`, `$`, `%`, `+`, `&`, `;`, `-`, `_`, `~`, `?`, `=`, `/`, or `!`</li><li>`align`: Can be any of `middle`, `center`, `left`, `right`, `justify`, or `char`</li><li>`noresize`: Must be `noresize` (case-insensitive)</li><li>`height`: Can be a number or a percentage</li><li>`width`: Can be a number or a percentage</li><li>`valign`: Can be any of `baseline`, `bottom`, `middle`, or `top`</li></ul> |
| `td`</br>`th` | <ul><li>`background`: Can be a string that represents an onsite URL that contains any letter from any language, any numeric character in any script, or `\`, `dot`, `#`, `@`, `$`, `%`, `+`, `&`, `;`, `-`, `_`, `~`, `?`, `=`, `/`, or `!`</li><li>`bgcolor`: Can be from the color list or a color code.<ul><li>Color list: `aqua`, `black`, `blue`, `fuchsia`, `gray`, `grey`, `green`, `lime`, `maroon`, `navy`, `olive`, `purple`, `red`, `silver`, `teal`, `white`, or `yellow`</li><li>Color code: Can be HTML/CSS Spec 3 or 6 digit hex</li></ul></li><li>`abbr`: Can be a paragraph that contains any letter from any language, any numeric character in any script, or `{space}`, `-`, `_`, `'`, `,`, `(`, `)`, `.`, or `;`</li><li>`axis`: Can be alphanumeric with `-`, `_`, or `$`</li><li>`headers`: Can be alphanumeric with `-`, `_`, or `$`</li><li>`scope`: Must be `row`, `col`, `rowgroup`, or `colgroup`</li><li>`nowrap`</li><li>`height`: Can be a number or a percentage</li><li>`width`: Can be a number or a percentage</li><li>`align`: Can be any of `middle`, `center`, `left`, `right`, `justify`, or `char`</li><li>`valign`: Can be any of `baseline`, `bottom`, `middle`, or `top`</li><li>`charoff`: Can be a number or a percentage</li><li>`char`: Can be any character, and any number of characters (from 0 on), including line terminators</li><li>`colspan`: Must be a number</li><li>`rowspan`: Must be a number</li></ul> |
| `tr` | <ul><li>`background`: Can be a string that represents an onsite URL that contains any letter from any language, any numeric character in any script, or `\`, `dot`, `#`, `@`, `$`, `%`, `+`, `&`, `;`, `-`, `_`, `~`, `?`, `=`, `/`, or `!`</li><li>`bgcolor`: Can be from the color list or a color code.<ul><li>Color list: `aqua`, `black`, `blue`, `fuchsia`, `gray`, `grey`, `green`, `lime`, `maroon`, `navy`, `olive`, `purple`, `red`, `silver`, `teal`, `white`, or `yellow`</li><li>Color code: Can be HTML/CSS Spec 3 or 6 digit hex</li></ul></li><li>`height`: Can be a number or a percentage</li><li>`width`: Can be a number or a percentage</li><li>`align`: Can be any of `middle`, `center`, `left`, `right`, `justify`, or `char`</li><li>`valign`: Can be any of `baseline`, `bottom`, `middle`, or `top`</li><li>`charoff`: Can be a number or a percentage</li><li>`char`: Can be any character, and any number of characters (from 0 on), including line terminators</li></ul> |
| `thead`</br>`tbody`</br>`tfoot` | <ul><li>`align`: Can be any of `middle`, `center`, `left`, `right`, `justify`, or `char`</li><li>`valign`: Can be any of `baseline`, `bottom`, `middle`, or `top`</li><li>`charoff`: Can be a number or a percentage</li><li>`char`: Can be any character, and any number of characters (from 0 on), including line terminators</li></ul> |
| `colgroup`</br>`col` | <ul><li>`align`: Can be any of `middle`, `center`, `left`, `right`, `justify`, or `char`</li><li>`valign`: Can be any of `baseline`, `bottom`, `middle`, or `top`</li><li>`charoff`: Can be a number or a percentage</li><li>`char`: Can be any character, and any number of characters (from 0 on), including line terminators</li><li>`span`: Can be a number or a percentage</li><li>`width`: Can be a number or a percentage</li><li>`img`</li></ul> |
| Other allowed attributes | `noscript`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `i`, `b`, `u`, `strong`, `em`, `small`, `big`, `pre`, `code`, `cite`, `samp`, `sub`, `sup`, `strike`, `center`, `blockquote`, `hr`, `br`, `col`, `font`, `map`, `span`, `div`, `img`, `ul`, `ol`, `li`, `dd`, `dt`, `dl`, `fieldset`, `legend` |

## Add translations

When multiple translations are added for a template, the translation provided in the default language appears at the top of the list. You can designate any added translation as the default language by selecting it from the **Default Language** dropdown box. Doing so reorders the list of added translations automatically.

You can edit the templates through the pencil icon, but you can't delete the default language template.

1. In the Admin Console, go to **Customizations** > **Emails**.
1. Choose an email template that you customized. The default language version appears in the **Custom Email** table.
1. Click **Add Translation**, and then select a language from the dropdown box. If the **Add Translation** button isn't available, this template isn't customized. See [Edit a default email template](#edit-a-default-email-template).
1. Make your translated edits, and then click **Add Translation**.
1. Repeat steps 3 and 4 for additional languages.

To delete all custom translations and revert to the Okta template, click **Reset to Default**.

> **Note:** It may be more convenient to copy and paste the HTML from the message body into a text editor, compose your custom translation, then copy and paste it back into the message body.

## Use Velocity Templating Language

[Velocity Templating Language (VTL)](https://velocity.apache.org/engine/2.3/user-guide.html) allows you to customize your org's email templates so that you can use:

- Enhanced conditional logic.
- All of the attributes in the Okta [User Profile object](/docs/reference/api/users/#profile-object).
- Some of the org attributes in these variables.

Email templates use common and unique VTL variables. When you interpolate variables in the template content, precede them with a dollar sign. Use dot notation to reference sub-objects. For example, reference the first name of a user with `${user.profile.firstName}`.

See [Use VTL variables](#use-vtl-variables) for available email template variables.

### Use conditional logic

In your email templates, you can use any conditional logic that VTL supports, such as `if`, `elseif`, or `else` constructs and `foreach` loops. See the [Velocity documentation](https://velocity.apache.org/engine/2.3/user-guide.html).

### Customization example

The following example uses the `${app.name} variable, which is only available in Okta Identity Engine.

```html
#if(${app.name} == "Toys R' Fun")
<img src="https://cdn.toysrfun.com/logo" height="37">
<a id="support-link" href="https://support.toysrfun.com/help/?language=en_US" style="text-decoration: none;"> Contact Toy Support </a>
#elseif(${app.name} == "Fidget Spinners Unlimited")
<img src="https://cdn.fidgetsu.com/logo" height="37">
<a id="support-link" href="https://support.fidgetsu.com/help/?language=en_US" style="text-decoration: none;"> Contact Fidget SU Support </a>
#else
<img src="${parentLogoUrl}" height="37">
#end
```

### Use VTL variables

You can reference any Okta User Profile attribute in your email templates.

> **Note:** Some attributes are only available in Okta Identity Engine (see Identity Engine notes in the following table). You can use any other variable in both the Identity Engine and Okta Classic Engine.

| Variable       | Template availability         |
|---------------------------------------------------------------|------------------------------------------------------------------------|
| `${user.profile.login}` | Available in all templates |
| `${user.profile.email}` | Available in all templates |
| `${user.profile.secondEmail}` | Available in all templates |
| `${user.profile.firstName}` | Available in all templates |
| `${user.profile.lastName}` | Available in all templates |
| `${user.profile.locale}` | Available in all templates |
| `${user.profile.mobilePhone}` | Available in all templates |
| `${user.profile.primaryPhone}` | Available in all templates |
| `${user.profile.username}` | Available in all templates |
| `${user.profile.fullName}` | Available in all templates |
| `${user.profile.city}` | Available in all templates |
| `${user.profile.state}` | Available in all templates |
| `${user.profile.streetAddress}` | Available in all templates |
| `${user.profile.zipCode}` | Available in all templates |
| `${user.profile.countryCode}` | Available in all templates |
| `${user.groups.names}` | Available in all templates |
| `${user.group.ids}` | Available in all templates |
| `${app.id}` | Available in all templates</br></br><ApiLifecycle access="ie" /> |
| `${app.name}` | Available in all templates</br></br><ApiLifecycle access="ie" /> |
| `${app.label}` | Available in all templates</br></br><ApiLifecycle access="ie" /> |
| `${org.name}` | Available in all templates |
| `${org.locale}` | Available in all templates |
| `${org.subDomain}` | Available in all templates |
| `${org.activationTokenExpirationHours}` | Available in all templates |
| `${baseURL}` | Available in all templates |
| `${oktaLogoUrl}` | Available in all templates |
| `${activationLink}` | Available in these templates:</br><ul><li>User Activation</li><li>Active Directory User Activation</li><li>Registration - Activation</li></ul> |
| `${activationToken}` | Available in these templates:</br><ul><li>User Activation</li><li>Active Directory User Activation</li><li>Registration - Activation</li></ul> |
| `${samAccountName}` | Available in these templates:</br><ul><li>Active Directory User Activation</li><li>Active Directory Password Reset</li><li>Active Directory Self-Service Unlock Account</li><li>Active Directory Password Unlock</li><li>Active Directory Self-Service Unlock Account</li></ul> |
| `${technicalContact.login}` | Available in these templates:</br><ul><li>User Activation</li><li>Password Reset by Admin</li></ul> |
| `${technicalContact.email}` | Available in these templates:</br><ul><li>User Activation</li><li>Password Reset by Admin</li></ul> |
| `${technicalContact.secondEmail}` | Available in these templates:</br><ul><li>User Activation</li><li>Password Reset by Admin</li></ul> |
| `${technicalContact.firstName}` | Available in these templates:</br><ul><li>User Activation</li><li>Password Reset by Admin</li></ul> |
| `${technicalContact.lastName}` | Available in these templates:</br><ul><li>User Activation</li><li>Password Reset by Admin</li></ul> |
| `${technicalContact.locale}` | Available in these templates:</br><ul><li>User Activation</li><li>Password Reset by Admin</li></ul> |
| `${technicalContact.fullName}` | Available in Password Reset by Admin |
| `${pushVerifyActivationLink}` | Available in Send Push Verify Activation Link |
| `${androidOktaVerifyAppLink}` | Available in Send Push Verify Activation Link |
| `${iosOktaVerifyAppLink}` | Available in Send Push Verify Activation Link |
| `${registrationEmailVerificationLink}` | Available in these templates:</br><ul><li>Registration - Email Verification</li><li>Registration - Activation</li></ul> |
| `${registrationEmailVerificationToken}` | Available in these templates:</br><ul><li>Registration - Email Verification</li><li>Registration - Activation</li></ul> |
| `${instanceDisplayName}` | Available in these templates:</br><ul><li>Email Factor Verification</li><li>Registration - Email Verification</li><li>Registration - Activation</li></ul> |
| `${unlockAccountLink}` | Available in these templates:</br><ul><li>Self-Service Unlock Account</li><li>Active Directory Self-Service Unlock Account</li><li>Active Directory Password Unlock</li><li>LDAP Self-Service Unlock Account</li><li>LDAP Self-Service Unlock Account</li></ul> |
| `${recoveryLink}` | Available in these templates:</br><ul><li>Reset Factor</li><li>Active Directory Password Reset</li><li>Unlock Factor</li></ul> |
| `${factorDisplayName}` | Available in these templates:</br><ul><li>Reset Factor</li><li>Active Directory Password Reset</li><li>Unlock Factor</li></ul> |
| `${orgTechSupportEmail}` | Available in these templates:</br><ul><li>Reset Factor</li><li>Active Directory Password Reset</li><li>Unlock Factor</li></ul> |
| `${unlockAccountTokenExpirationDate}` | Available in these templates:</br><ul><li>Self-Service Unlock Account</li><li>Active Directory Self-Service Unlock Account</li><li>Active Directory Password Unlock</li><li>LDAP Self-Service Unlock Account</li><li>LDAP Self-Service Unlock Account</li></ul> |
| `${resetPasswordLink}` | Available in these templates:</br><ul><li>Forgot Password</li><li>Forgot Password Denied</li><li>Active Directory Reset Password</li><li>LDAP Forgot Password</li><li>LDAP Forgot Password Denied</li><li>Password Reset by Admin</li></ul> |
| `${oneTimePassword}` | Available in these templates:</br><ul><li>Forgot Password</li><li>Active Directory Password Reset</li><li>LDAP Forgot Password</li><li>Self-Service Unlock Account</li><li>Active Directory Self-Service Unlock Account</li><li>LDAP Self-Service Unlock Account</li></ul> |
| `${resetPasswordTokenExpirationDate}` | Available in these templates:</br><ul><li>Forgot Password</li><li>Forgot Password Denied</li><li>Active Directory Password Reset</li><li>LDAP Forgot Password</li><li>LDAP Forgot Password Denied</li></ul> |
| `${request.date}` | Available in Authenticator Enrolled |
| `${request.time}` | Available in these templates:</br><ul><li>Authenticator Enrolled</li><li>Authenticator Reset</li><li>Factor Enrolled</li><li>Factor Reset</li><li>Sign In From New Device</li></ul> |
| `${request.location}` | Available in Authenticator Enrolled |
| `${request.performedBySubject}` | Available in Authenticator Enrolled |
| `${request.factor}` | Available in Factor Enrolled |
| `${request.factors}` | Available in Factor Reset |
| `${request.ipAddress}` | Available in Sign In From New Device |
| `${request.reportSuspiciousActivityToken}` | Available in Authenticator Enrolled (with Report Suspicious Activity button) |
| `${request.browser}` | Available in Sign In From New Device |
| `${request.relayState}` | Available in Registration Activation, Forgot Password, Email Challenge, and Email Factor Verification |
| `${request.verificationLink}` | Available in Email Factor Verification |
| `${verificationToken}` | Available in these templates:</br><ul><li>Email Challenge</li><li>Activation</li><li>Registration - Email Verification</li><li>Change Email Confirmation</li></ul> |
| `${emailAuthenticationLink}` | Available in Email Challenge |
| `${email}` | Available in these templates:</br><ul><li>Email Challenge</li><li>Email Factor Verification</li></ul> |

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

## Test custom email templates

You can send yourself a test email to see how a custom email template looks and functions. A test email can help you validate attribute-based variables and translations in the customized template, as well as see how the template renders in different email environments. You avoid the need to create an end-to-end workflow to test customizations. The primary email address of the admin that initiates the test receives the email.

1. Click the email icon to the right of the email template that you have customized. A list shows the sender and receiver of the email.
2. Click **Send test email**.

## See also

Read more on customizing and styling various Okta assets to match your company's visual identity and branding:

- [Customize the Okta URL and email notification domains](/docs/guides/custom-url-domain/main/)
- [Customize SMS messages](/docs/guides/custom-sms-messaging/main/)
- [Style the Widget](/docs/guides/custom-widget/main/)
