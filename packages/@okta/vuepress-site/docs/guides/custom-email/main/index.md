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

> **Note:** Free trial editions of Okta can't create or send customized email templates.

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

> **Note:** Free trial editions of Okta can't create or send customized email templates.

1. In the Admin Console, go to **Customizations** > **Emails**.
1. Click a default email template listed in the left pane.
1. Click **Edit** to open the message in HTML. If you see **Add Translation** instead of **Edit**, the template is already customized. You need to make any additional edits in the default language version. Skip to step 2 in [Add translations](#add-translations).
1. Select a language from the dropdown menu.
1. Make your edits. See [Velocity Templating Language](#velocity-templating-language) for customization options.
1. Click **Save**. The default language version of your edited message appears in the **Custom Email** table.

Remember that Okta doesn't automatically translate the changes you make in one template to the other language templates. To add translations for this customization, proceed to step 3 in [Add translations](#add-translations).

### Use customizable email templates

<!--- Intro content to come --->

| UI name | Default subject line | API object reference | Description |
|---------|---------|----------------------|----------|---------|
| User Activation | Welcome to Okta! | `UserActivation` | Sent to new users who must follow the provided link to complete the Okta sign-up process |
| Active Directory User Activation | Welcome to Okta! | `ADUserActivation` | Sent to your new Active Directory users who must follow the provided link to complete the Okta sign-up process |
| LDAP User Activation | Welcome to Okta! | `LDAPUserActivation` | Sent to your new LDAP users who must follow the provided link to complete the Okta sign-up process |
| Send Push Verify Activation Link | Push Verify Activation Email | `OktaVerifyActivation` | Sent to users who must follow the provided link to download Okta Verify Push for multifactor authentication on their mobile device |
| Registration - Activation | Activate Account | `RegistrationActivation` | Sent to users who must follow the provided link to complete their self-registration |
| Registration - Email Verification | Welcome to (`instanceDisplayName`)! | `RegistrationEmailVerification` | Sent to users who must follow the provided link to verify their email address |
| Email Factor verification (Identity Engine)</br>Email Verification (Classic Engine) | Confirm your email address | `EmailFactorVerification` | Sent to users who must follow the provided link to verify their email address |
| Forgot Password Denied | Account Password Reset | `ForgotPasswordDenied` | Sent to users who forgot their password but only their admin can reset it |
| Password Reset by Admin | Account Password Reset | `PasswordResetByAdmin` | Sent to users who had their password reset by an Okta system administrator, and must follow the provided link to complete the password reset process |
| Active Directory Password Reset Denied | Forgotten Password | `ADForgotPasswordDenied` | Sent to Active Directory users who tried to reset their Active Directory password reset but don't have permission |
| LDAP Forgot Password Denied | Account password reset | `LDAPForgotPasswordDenied` | Sent to LDAP users who tried to reset their LDAP password but don't have permission |
| LDAP Forgot Password | Account password reset | `LDAPForgotPassword` | Sent to LDAP users who forgot their password and must follow the provided link to reset their password |
| Forgot Password | Account password reset | `ForgotPassword` | Sent to users who must follow the provided link to reset their forgotten password |
| Active Directory Password Reset | Forgotten password (Identity Engine)</br>Account password reset (Classic Engine) | `ADForgotPassword` | Identity Engine: Sent to users who want to reset their Active Directory account password and must follow the provided link to reset their password</br>Classic Engine: Sent to users who have had their Active Directory account password reset and must follow the provided link to reset their password |
| Password Changed | Password Changed | `PasswordChanged` | Sent to users whenever their account password changes |
| Self-Service Unlock when Account is not Locked | Unlock Account | `SelfServiceUnlockOnUnlockedAccount` | Sent to users who tried to use self-service to unlock an account that isn't locked |
| Active Directory Password Unlock | Unlock Account | `ADSelfServiceUnlock` | Sent to Active Directory users who must follow the provided link to unlock their password |
| Self-Service Unlock Account | Unlock Account | `SelfServiceUnlock` | Sent to users who must follow the provided link to complete self-service unlock account process |
| LDAP Self-Service Unlock Account | Unlock Account | `LDAPSelfServiceUnlock` | Sent to LDAP users who must follow the provided link to complete self-service unlock account process |
| Change Email Confirmation | Confirm email address change | `ChangeEmailConfirmation` | Sent to users who must follow the provided link to confirm their email address change request |
| Email Change Notification | Notice of pending email address change | `PendingEmailChange` | Sent to a user's old email address when they request to change their email address |
| Email Change Confirmed Notification | Notice of email address change | `EmailChangeConfirmation` | Sent when the request to change a user's email address is confirmed |
| Email Challenge | One-time Email Authentication Link | `EmailChallenge` | Sent to users with email as an authentication factor and must follow the provided link to complete their authentication into Okta |
| Account Lockout | Account Lockout | `AccountLockout` | Sent to users who have been locked out of their account and must follow the provided link to complete the self-service unlock account process or contact their admin |
| New Sign-On Notification | New Sign-On Notification | `NewSignOnNotification` | Sent to users who authenticated into Okta from an unknown device or browser and should contact the Okta system administrator if the user does not recognize the sign-in details of the unknown device |
| Authenticator Enrolled (Identity Engine)</br>MFA Factor Enrolled (Classic Engine) | Security method enrolled (Identity Engine)</br>MFA Factor Enrolled (Classic Engine) | `AuthenticatorEnrolled` | Identity Engine: Sent to users when authenticators are reset</br>Classic Engine: Sent to users when new MFA factors are enrolled |
| Authenticator Reset (Identity Engine)</br>MFA Factor Reset (Classic Engine) | Security method reset (Identity Engine)</br>MFA Factor Reset (Classic Engine) | `AuthenticatorReset` | Identity Engine: Sent to users when authenticators are reset</br>Classic Engine: Sent to users when MFA factors are reset |
| Campaign Launched | Access certification campaign: (`campaignName`) | `IGAReviewerNotification` |  |
| Campaign Ended | Access certification campaign: (`campaignName`) | `IGAReviewerEndNotification` |  |
| Campaign Reminder | Access certification campaign: (`campaignName`) | `IGAReviewerPendingNotification` |  |
| Reassigned Review | Access certification campaign: (`campaignName`) | `IGAReviewerReassigned` |  |

## Add translations

* When multiple translations are added for a template, the translation provided in the default language appears at the top of the list. You can designate any added translation as the default language by selecting it from the **Default Language** dropdown box. Doing so reorders the list of added translations automatically. You can edit the templates through the pencil icon, but you can't delete the default language template.

1. In the Admin Console, go to **Customizations** > **Emails**.
1. Choose an email template that you customized. The default language version appears in the **Custom Email** table.
1. Click **Add Translation**, and then select a language from the dropdown box. If the **Add Translation** button isn't available, this template isn't customized. See [Edit a default email template](#edit-a-default-email-template]).
1. Make your translated edits, and then click **Add Translation**.
1. Repeat steps 3 and 4 for additional languages.

To delete all custom translations and revert to the Okta template, click **Reset to Default**.

> **Note:** It may be more convenient to copy and paste the HTML from the message body into a text editor, compose your custom translation, then copy and paste it back into the message body.

## Use Velocity Templating Language

[Velocity Templating Language (VTL)](https://velocity.apache.org/engine/1.7/user-guide.html) allows you to customize your org's email templates so that you can use:

- enhanced conditional logic
- all of the attributes in the Okta [User Profile object](/docs/reference/api/users/#profile-object)
- some of the org attributes in these variables

Email templates use common and unique VTL variables. When you interpolate variables in the template content, precede them with a dollar sign. Use dot notation to reference sub-objects.

For example, reference the first name of a user by using `${user.profile.firstName}`.

See [Velocity Templating Language](https://help.okta.com/okta_help.htm?type=oie&id=ext-velocity-variables) for available template variables.

### Use conditional logic

In your email templates, you can use any conditional logic that VTL supports, such as `if`, `elseif`, or `else` constructs and `foreach` loops. See the [Velocity documentation](http://velocity.apache.org/engine/1.7/user-guide.html).

### Customization example

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
| `${recoveryToken}` | Available in these templates:</br><ul><li>Forgot Password</li><li>Forgot Password Denied</li><li>Reset Factor</li><li>Active Directory Password Reset</li><li>LDAP Forgot Password</li><li>LDAP Forgot Password Denied</li><li>Self-Service Unlock Account</li><li>Active Directory Self-Service Unlock Account</li><li>LDAP Self-Service Unlock Account</li></ul> |
| `${oneTimePassword}` | Available in these templates:</br><ul><li>Forgot Password</li><li>Active Directory Forgot Password</li><li>Active Directory Password Reset</li><li>LDAP Forgot Password</li><li>Self-Service Unlock Account</li><li>Active Directory Self-Service Unlock Account</li><li>LDAP Self-Service Unlock Account</li></ul> |
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
