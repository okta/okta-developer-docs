---
title: Email Magic Links Overview
---

<ApiLifecycle access="ie" /><br />

Enable applications based on the Embedded Widget or an Embedded SDK to authenticate users with a single URL click from an email.

## Introduction

When using email to prove their identity, users can copy a one-time password (OTP) from an email into the application they want to use. Email Magic Links (EML) provides a second option, allowing users to click a hyperlink in the email rather than use the OTP - a quicker, more user-convenient, and still secure experience. However, applications based on the Embedded Widget or an Embedded SDK must be adapted to make use of EML.

<div class="half">

![A simple diagram showing a cursor clicking a magic link in an email and beign signed in successfully](/img/advanced-use-cases/email-magic-link-overview-simple-summary.png)

</div>

In this overview, you will learn:

* How using EML works compared to using OTP
* How to integrate EML into applications that use the Embedded Widget or an Embedded SDK.

> NOTE: Email Magic Links was first supported in [Embedded Sign-In Widget](https://github.com/okta/okta-signin-widget) v6.3.5, and the following Embedded SDKs: [Auth.js](https://github.com/okta/okta-auth-js) v6.0.0, [Java IDX SDK](https://github.com/okta/okta-idx-java) v2.0.1, and [.NET IDX SDK](https://github.com/okta/okta-idx-dotnet) v2.1.0. These versions should be used as a minimum to support EML. We recommend using the latest versions.

## Email Magic Links vs. one-time passwords

The Okta email authenticator provides a simple way for users to authenticate themselves or recover their accounts. It supports two methods for users to validate their credentials as part of those processes. In both methods, an email is sent to their primary email address and either:

1. The user copies an OTP from the email to their application and submits it to Identity Engine for authentication.
1. The user clicks a link in the email that submits the OTP to Identity Engine for authentication on their behalf.

If the OTP is valid and submitted within a set time, either the user is authenticated, or they continue their authentication process. The following diagram illustrates the user's experience with the two options.

<div class="full">

![Flow diagrams showing the difference in user experience between using OTP and using magic links for authentication](/img/advanced-use-cases/email-magic-links-overview-user-flow-comparison.png)

</div>

The OTP experience involves an extra step for the user - copying the OTP into the application - but it does ensure they return to the same browser to continue their authentication process. The magic link experience, on the other hand, has fewer steps. Clicking the magic link opens a new tab in the user's browser and their authentication process carries on there.

### Same device, same browser only

Magic links only work when there is complete assurance that the person who started the request is the same one who clicked the magic link. For this reason, a user who starts signing in to your application in a web browser must be in the same browser on the same device when they click the magic link. If their browser or device is different, the magic link is disabled. They must either return to the original browser to use the magic link or use the OTP instead. The following flowchart illustrates this logic.

<div class="full">

![Flow diagram showing when and how the magic link flow falls back to the OTP flow](/img/advanced-use-cases/email-magic-links-overview-fallback-to-otp.png)

</div>


This same flow also ensures that users do not sign in to applications from non-managed devices. For example, should a user start the sign-in process on a company laptop, and then click the magic link from their personal mobile, they will be directed to return to the company laptop and try again.

### Pros and Cons

When evaluating whether to support magic links in addition to OTPs in the email authenticator, you should consider the following:

* Users get a better sign-in experience from magic links than OTP if they sign in from the same browser on the same device.
* If users sign in from a different browser or a different device, the process may fall back to using an OTP.
* An application cannot be accessed by clicking a magic link on a device that does not already have access to that application.
* Okta provides developer support for both OTP and Magic Links in their Embedded Widget and Identity Engine SDKs.

## Integrating Magic Links

Integrating Email Magic Links into your application is a two-step process.

1. Create an endpoint for your magic link. This checks the validity of the OTP and sends it to the Identity Engine for validation.
1. Set that endpoint as the callback URL for magic links for your application.

### Create an endpoint for your magic links

Any magic link URL pointing to your application will contain two query parameters

* the one-time password that will validate the user (`otp`)
* a state token that uniquely identifies the current authentication process and the state it is in (`state`). This is the current SAML [relaystate](https://developer.okta.com/docs/concepts/saml/#understanding-sp-initiated-sign-in-flow) value.

For example, `http://${yourOktaDomain}?otp=726009&state=1b31fa98b34c45d9a`.

You must create an endpoint for your application that

1. Retrieves `otp` and `state` values from the query parameters
2. Matches the state token with the current `state` in your user's browser session
3. Makes any other checks you deem necessary to ensure the user is working in the same browser on the same device
4. Requests the user enter the `otp` manually if steps 2 or 3 fail their checks
5. Sends `otp` and `state` to Identity Engine to be validated if steps 2 and 3 pass their checks
6. Redirects the user to a page that continues their authentication process

If your application uses the Embedded Sign-In Widget to authenticate users, pass `otp` and `state` to it as you instantiate it on the page. The Widget itself does steps 2 to 6 for you.

```javascript
var searchParams = new URL(window.location.href).searchParams;
var signIn = new OktaSignIn({
   baseUrl: '${yourOktaDomain}',
   baseUrl: '${yourOktaDomain}',
   clientId: '${yourClientId}',
   redirectUri: '${yourSignInRedirectUrl}',
   useInteractionCodeFlow: true,
   otp: searchParams.get('otp'),
   state: searchParams.get('state')
});
```

If your application uses an Embedded SDK to authenticate users, the [Okta email integration](https://developer.okta.com/docs/guides/authenticators-okta-email/aspnet/main/) and [custom password recovery](https://developer.okta.com/docs/guides/oie-embedded-sdk-use-case-custom-pwd-recovery-mfa/aspnet/main/) guides cover how to implement these steps.

#### Supported Versions

Email Magic Links was first supported in:

* [Embedded Sign-In Widget](https://github.com/okta/okta-signin-widget) v6.3.5
* [Auth.js](https://github.com/okta/okta-auth-js) v6.0.0
* [Java IDX SDK](https://github.com/okta/okta-idx-java) v2.0.1
* [.NET IDX SDK](https://github.com/okta/okta-idx-dotnet) v2.1.0

These versions should be used as a minimum to support EML, but you should prefer to use the latest versions.

### Point your app's magic links to that endpoint

There are two ways to set your application's magic links to the endpoint you have created:

* You can set your application's Email Verification Experience (EVE) value to the endpoint's URL.
* You can customize each of the email templates used by the email authenticator to include the endpoint's URL.

Changing the EVE provides a quick way to enable and test magic links. Customizing the email templates requires more work but results in fewer roundtrips to the Identity Engine and a faster user experience.

#### Using the Email Verification Experience

To enable magic links in your application using the email verification experience (EVE) setting:

1. Open the **Admin Console** for your Okta org.
2. Choose **Applications > Applications** to show the app integrations that you have already created.
3. Click the application that you previously created.
4. In the **General Settings** section on the **General** tab, click **Edit**.
5. Under **EMAIL VERIFICATION EXPERIENCE** enter the URL for the endpoint you created. For example, `http://example.com/magiclink/callback`.
6. Click **Save** to save your changes.

When required, Identity Engine sends an email similar to this one containing an OTP and a link.

<div class="half border">

![A sample email sent by the Identity Engine with OTP and magic link highlighted](/img/advanced-use-cases/email-magic-links-overview-sample-email.png)

</div>

When a user clicks the magic link from the email authenticator, a request is sent to the Identity Engine to validate the user. It has a token parameter and will look something like this:

`https://${yourOktaDomain}/email/verify/0oa1esny76wdQqjsg697?token=ftlNKCIYA_4WvR6BPbYhyKisVYIF-QLp2t`

Authentication continues at an Okta-hosted page if the EVE setting does not have a value. If the EVE setting has a value, Identity Engine builds a new URL based on the EVE setting and current `otp` and `state` values. Then it redirects the user's browser to that URL. For example

`https://example.com/magiclink/callback?state=1ed1d4de1a50b8f30d87e720bcc1b6a3&otp=439246`

Their authentication process continues there.

<div class="full">

![Flow diagram showing the interaction between application and Identity Engine when using the Verification Experience setting](/img/advanced-use-cases/email-magic-links-overview-experience-flow.png)

</div>

The EVE setting offers a quick way to redirect magic links to your application, but it does require a round trip to the Identity Engine to retrieve the correct URL for the endpoint you have created. Unless you are willing to customize the email templates the email authenticator uses, the user receives only Okta-branded emails. On the other hand, if your user base is multilingual, the default Okta templates support many languages by default. Once you customize an email template, you must create a copy for each language you want to have available.

#### Using custom email templates

Creating custom authentication email templates allows you to send a fully-branded email to your users that skips the round-trip to Identity Engine and redirects users straight to your endpoint.

All Okta email templates are written using [Velocity Templating Language (VTL)](https://help.okta.com/en-us/Content/Topics/Settings/velocity-variables.htm) and use predefined variables to insert relevant values into that email. For example, Okta defines three VTL variables specific to the **Email Challenge** template:

| Variable                     | Contains                                                       |
|------------------------------|----------------------------------------------------------------|
| `${verificationToken}`       | The one-time password Okta generated for the user              |
| `${request.relayState}`      | The current SAML relaystate value                              |
| `${emailAuthenticationLink}` | The Okta-hosted URL that continues the password recovery flow  |

By default, the magic link in the template is set to `${emailAuthenticationLink}`. If you're using the Email Verification Experience setting for your redirects, you don't need to change this. The magic link will work as explained in the Using the Email Verification Experience section.

To point the magic link directly to the endpoint in your application, you must replace `${emailAuthenticationLink}` with your custom URL that includes `otp` and `state` as query parameters.

1. In the **Admin Console**, go to **Customizations > Emails**.
2. On the **Emails** page, find the **Other** category on the template menu.
3. Under **Other**, click **Email Challenge**.
4. On the **Email Challenge** email template page, click **Edit**.
5. Under **Default Email**, click **Edit**.
6. In the Message field, locate the magic link in the field's HTML. The link is located in the href attribute of an `<a>` tag with the `id` of `email-authentication-button`. It looks like this:

   ```html
   <a id="email-authentication-button"
   href="${emailAuthenticationLink}"
   style="text-decoration: none;">
      <span style="padding: 9px ...;">
         Sign In
      </span>
   </a>
   ```

7. Replace the `${emailAuthenticationLink}` variable with the URL for your endpoint. You must append the `${verificationToken}` and `${request.relayState}` variables as query parameter values. For example:

   ```html
   <a id="email-authentication-button"
   href="https://example.com/magiclink/callback?otp=${verificationToken}&state=${request.relayState}"
   style="text-decoration: none;">
      <span style="padding: 9px ...;">
         Sign In
      </span>
   </a>
   ```

8. Click **Save** and close the dialog.

Nine email templates can be customized in this way. These are listed in the table below.

* All support redirects via EVE and direct redirects.
* All are compatible with applications based on either the embedded Widget or an embedded SDK.
* To add `otp` and `state` variables to the magic link, find the template you are editing in the table, and:
  * Replace the VTL variable in the **magic link variable name** column with your custom endpoint URL.
  * Set your `otp` query string variable to the VTL variable in the **OTP variable name** column for the template.
  * Set your `state` query string variable to `${request.relayState}` for all templates.

| Template Name                                  | Use Case                                                     | Magic link variable name      | OTP variable name    |
|------------------------------------------------|--------------------------------------------------------------|-------------------------------|----------------------|
| Email challenge                                | Sign in with email - challenge                               | `${emailAuthenticationLink}`    | `${verificationToken}` |
| Forgot Password                                | Self-service password recovery                               | `${resetPasswordUrl}`           | `${oneTimePassword}`   |
| Registration - Activation                      | Self-service registration                                    | `${registrationActivationLink}` | `${oneTimePassword}`   |
| Email factor verification                      | Sign in with email - enrollment                              | `${verificationLink}`           | `${verificationToken}` |
| Self-service unlock account\*                   | Self-service account unlock                                  | `${unlockAccountLink}`          | `${oneTimePassword}`   |
| Active Directory Forgot Password\*              | Self-service password recovery for Active Directory accounts | `${resetPasswordUrl}`           | `${oneTimePassword}`   |
| Active Directory Self-Service Unlock Account\*  | Self service account unlock for Active Directory accounts    | `${unlockAccountLink}`          | `${oneTimePassword}`   |
| LDAP Forgot Password\*                          | Self-service password recovery for LDAP accounts             | `${resetPasswordUrl}`           | `${oneTimePassword}`   |
| LDAP Self-Service Unlock Account\*              | Self-service account unlock for LDAP accounts                | `${unlockAccountLink}`          | `${oneTimePassword}`   |

\* Available from September 2022.

When a user clicks the magic link based on a customized email template, their browser is redirected straight to your application's endpoint.

<div class="full">

![Flow diagram showing the interaction between application and Identity Engine when using custom email templates](/img/advanced-use-cases/email-magic-links-overview-custom-template-flow.png)

</div>

### Comparing the options

|   | EVE + Default email templates | EVE + Custom email templates | Custom Email Templates |
|---|---|----|----|
| Set-up + Maintenance   | Requires one change in the admin console | Requires editing every email template you want to contain magic links pointing to your new endpoint. | Requires editing every email template to contain magic links pointing to your new endpoint. |
| Speed of redirection   | Magic link sends a request to Identity Engine for the callback URL. The user is then redirected to the callback URL. | Magic link sends a request to Identity Engine for the callback URL. The user is then redirected to the callback URL. | Magic link sends browser directly to the callback URL |
| Branding | Default email templates are Okta branded | You can add your brand to a custom email template however you like  | You can add your brand to a custom email template however you like |
| Multi-language support | Default email templates support multiple languages | You must create and maintain a version of each custom template in each required language. | You must create and maintain a version of each custom template in each required language. |

## See also

* [Okta Email (magic link/OTP) integration guide](https://developer.okta.com/docs/guides/authenticators-okta-email/-/main/)
* [New user activation guide](https://developer.okta.com/docs/guides/oie-embedded-sdk-use-case-new-user-activation/-/main/)
* [Custom password recovery guide](https://developer.okta.com/docs/guides/oie-embedded-sdk-use-case-custom-pwd-recovery-mfa/-/main/)
