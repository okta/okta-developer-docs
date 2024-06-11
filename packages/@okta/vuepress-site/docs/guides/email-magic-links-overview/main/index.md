---
title: Email Magic Links overview
---

<ApiLifecycle access="ie" /><br />

Enable a user to enter a one-time passcode (OTP) in a single step by clicking an embedded email link.

---

#### Learning outcomes

* Understand the differences between EML and OTP.
* Integrate EML into apps using the embedded Sign-In Widget or a supported embedded SDK.

---

## Introduction

When using email to prove their identity, a user can copy an OTP from an email into the app they want to use. Email Magic Links (EML) provide a second option that allows the user to click a hyperlink in the email rather than use the OTP. This results in a quicker, more user-convenient, and still secure experience. However, you must adapt apps based on the embedded Sign-In Widget or an embedded SDK to use EML.

<div class="three-quarters">

![A simple diagram showing a cursor clicking a magic link in an email and being signed in successfully](/img/advanced-use-cases/email-magic-link-overview-simple-summary.png)

</div>

<StackSnippet snippet="VersionSupportNote" />

> **Note**: Email Magic Links are only supported in OIDC-based app integrations.

## Email Magic Links vs. one-time passcodes

The Okta email authenticator provides a simple way for a user to authenticate themselves or recover their accounts. It supports two methods for them to validate their credentials as part of those processes. In both methods, an email is sent to their primary email address and either:

1. They copy an OTP from the email to their application and submits it to Identity Engine for authentication.
1. They click a link in the email that submits the OTP to Identity Engine for authentication on their behalf.

If a valid OTP is submitted within a set time, either the user is authenticated or they continue their authentication process. The following diagram illustrates the user's experience with the two options.

<div class="full">

![Flow diagrams showing the difference in user experience between using OTP and using magic links for authentication](/img/advanced-use-cases/email-magic-links-overview-user-flow-comparison.png)

</div>

The OTP experience involves an extra step for the user. The user must copy the OTP into the app. This ensures that they return to the same browser to continue their authentication process. The magic link experience, on the other hand, has fewer steps. Clicking the magic link opens a new tab in the user's browser and their authentication process continues.

### Same device, same browser only

Magic links only work when there's complete assurance that the person who started the request is the same one who clicked the magic link. This requires a user who is signing in to your application in a browser to be in the same browser on the same device when they click the magic link. If either their browser or device is different, the magic link is disabled. They must either return to the original browser to use the magic link or use the OTP instead. The following diagram illustrates this logic.

<div class="full">

![Flow diagram showing when and how the magic link flow falls back to the OTP flow](/img/advanced-use-cases/email-magic-links-overview-fallback-to-otp.png)

</div>

This same browser enforcement also ensures that a user doesn't sign in to apps from non-managed devices. For example, suppose they start the sign-in process on a company laptop. If they click the magic link from a personal device, they must return to the company laptop to complete the process.

### Pros and cons of EML

When you evaluate whether to support magic links in addition to OTPs in the email authenticator, consider the following:

* A user has a better sign-in experience from magic links than OTP if they sign in from the same browser on the same device.
* If a user signs in from a different browser or device, the process falls back to using an OTP.
* A user can only access an application by clicking a magic link on a device that already has access to that application.
* Support for both OTP and magic links is provided by the Okta embedded Sign-In Widget and Identity Engine SDKs.

## Integrate Magic Links

Integrating Email Magic Links into your application is a two-step process.

1. Create an endpoint for your magic link. This endpoint checks the validity of the OTP and sends it to Identity Engine for validation.
1. Set that endpoint as the callback URL for magic links for your application with the Admin Console for your org.

### Create an endpoint for your magic links

Any magic link URL pointing to your application contains two query parameters:

* The OTP that validates the user (`otp`)
* A state token that uniquely identifies the current authentication process and its state (`state`)

For example, `http://{yourOktaDomain}?otp=726009&state=1b31fa98b34c45d9a`.

Create an endpoint for your app that does the following:

1. Retrieves `otp` and `state` values from the query parameters
2. Matches the state token with the current `state` in your user's browser session
3. Makes any other checks that you deem necessary to ensure that the user is working in the same browser on the same device
4. Requests that the user enter the `otp` value manually if steps 2 or 3 fail
5. Sends the `otp` value to Identity Engine for validation if steps 2 and 3 pass
6. Redirects the user to a page that continues their authentication process

If your application uses the embedded Sign-In Widget to authenticate the user, pass `otp` and `state` to it as you instantiate it on the page.

```javascript
var searchParams = new URL(window.location.href).searchParams;
var signIn = new OktaSignIn({
   baseUrl: '{yourOktaDomain}',
   baseUrl: '{yourOktaDomain}',
   clientId: '{yourClientId}',
   redirectUri: '{yourSignInRedirectUrl}',
   otp: searchParams.get('otp'),
   state: searchParams.get('state')
});
```

> **Important**: In Okta Sign-In Widget version 7 and later, Identity Engine is enabled by default. If you're using an earlier version than 7, you must explicitly enable Identity Engine features by setting `useInteractionCodeFlow: true` in the preceding `OktaSignIn()` constructor call. To use Classic Engine rather than Identity Engine when you're using version 7 or later, specify `useClassicEngine: true` in `OktaSignIn()`.

The code for your endpoint must check that the user is working from the same device and browser. The Sign-In Widget takes care of the rest. The sign in with email only guide covers how to do this.

Use the <StackSnippet snippet="EmailAuthenticatorGuide" inline /> and <StackSnippet snippet="CustomPasswordRecoveryGuide" inline /> guides to implement these steps with your Embedded SDK.

### Point your app's magic links to that endpoint

There are two ways to set your application's magic links to the endpoint that you created:

* You can set your application's Email Verification Experience (EVE) value to the endpoint's URL.
* You can customize each of the email templates used by the email authenticator to include the endpoint's URL.

Changing the EVE provides a quick way to enable and test magic links. Customizing the email templates requires more work but results in fewer roundtrips to Identity Engine and a faster user experience.

#### Use the Email Verification Experience

To enable magic links in your application using the email verification experience (EVE) setting:

1. Open the **Admin Console** for your Okta org.
2. Choose **Applications** > **Applications** to show the app integrations that you have already created.
3. Click the application that you previously created.
4. In the **General Settings** section on the **General** tab, click **Edit**.
5. Under **EMAIL VERIFICATION EXPERIENCE** enter the URL for the endpoint that you created. For example, `https://example.com/magiclink/callback`.
6. Click **Save** to save your changes.

When required, Identity Engine sends an email similar to this one containing an OTP and a link:

<div class="half">

![A sample email sent by the Identity Engine with OTP and magic link highlighted](/img/advanced-use-cases/email-magic-links-overview-sample-email.png)

</div>
<br />

When a user clicks the magic link from the email authenticator, a request is sent to Identity Engine to validate the user. The link has a token parameter and looks something like this:

`https://{yourOktaDomain}/email/verify/0oa1esny76wdQqjsg697?token=ftlNKCIYA_4WvR6BPbYhyKisVYIF-QLp2t`

Authentication continues at an Okta-hosted page if the EVE setting doesn't have a value. If there's a value, Identity Engine builds a new URL based on the EVE setting and the current `otp` and `state` values. Then it redirects the user's browser to that URL. For example:

`https://example.com/magiclink/callback?state=1ed1d4de1a50b8f30d87e720bcc1b6a3&otp=439246`

After validating the `otp` and `state` parameters, the authentication process continues for the user.

<div class="full">

![Flow diagram showing the interaction between an application and Identity Engine when using the Verification Experience setting](/img/advanced-use-cases/email-magic-links-overview-experience-flow.png)

</div>

The EVE setting offers a quick way to redirect magic links to your app. However, it requires a round trip to the Identity Engine to retrieve the correct URL for the endpoint that you created. Unless you're willing to customize the email templates the email authenticator uses, the user receives only Okta-branded emails.

If your user base is multilingual, consider that the Okta-branded email templates support many languages by default. After you customize an email template, you must create a copy of that template in each language you support.

#### Use custom email templates

Creating custom authentication email templates allows you to send a fully branded email to a user. This email skips the round trip to Identity Engine and redirects the user straight to your endpoint.

All Okta email templates are written using [Velocity Templating Language (VTL)](https://help.okta.com/okta_help.htm?type=oie&id=ext-velocity-variables) and use predefined variables to insert relevant values into that email. For example, Okta defines three VTL variables specific to the **Email Challenge** template:

| Variable                     | Contains                                                       |
|------------------------------|----------------------------------------------------------------|
| `{verificationToken}`       | The one-time passcode that Identity Engine generated for the user              |
| `{request.relayState}`      | The [OIDC/OAuth2 state parameter](/docs/guides/implement-grant-type/authcodepkce/main/#request-an-authorization-code) for the current authorization request         |
| `{emailAuthenticationLink}` | The Okta-hosted URL that continues the password recovery flow  |

By default, the magic link in the template is set to `{emailAuthenticationLink}`. If you're using the Email Verification Experience setting for your redirects, you don't need to change this. The magic link works as explained in the [Use the Email Verification Experience](#use-the-email-verification-experience) section.

To point the magic link directly to the endpoint in your application, you must replace `{emailAuthenticationLink}` with your custom URL that includes `otp` and `state` as query parameters:

1. In the **Admin Console**, go to **Customizations** > **Emails**.
2. On the **Emails** page, find the **Other** category on the template menu.
3. Under **Other**, click **Email Challenge**.
4. On the **Email Challenge** email template page, click **Edit**.
5. In the **Default Email** section, click **Edit**.
6. In the **Message** field, locate the magic link in the field's HTML. The link is in the href attribute of an `<a>` tag with the `id` of `email-authentication-button`. It looks like the following:

   ```html
   <a id="email-authentication-button"
   href="{emailAuthenticationLink}"
   style="text-decoration: none;">
      <span style="padding: 9px ...;">
         Sign In
      </span>
   </a>
   ```

7. Replace the `{emailAuthenticationLink}` variable with the URL for your endpoint. Append the `{verificationToken}` and `{request.relayState}` variables as query parameter values. For example:

   ```html
   <a id="email-authentication-button"
   href="https://example.com/magiclink/callback?otp={verificationToken}&state={request.relayState}"
   style="text-decoration: none;">
      <span style="padding: 9px ...;">
         Sign In
      </span>
   </a>
   ```

8. Click **Save** and close the dialog.

You can customize four email templates this way. These are listed in the table that follows.

* All support redirects through EVE and custom templates.
* All are compatible with apps based on either the embedded Sign-In Widget or a supported embedded SDK.
* To add `otp` and `state` variables to the magic link, find the template that you're editing in the table. Then, complete the following steps:
  * Replace the VTL variable in the **magic link variable name** column with your custom endpoint URL.
  * Set your `otp` query string variable to the VTL variable in the **OTP variable name** column for the template.
  * Set your `state` query string variable to `{request.relayState}` for all templates.

| Template name  | Use case | Magic link variable name | OTP variable name |
|----------------|----------|--------------------------|-------------------|
| Email challenge | Sign in with email - challenge | `{emailAuthenticationLink}`    | `{verificationToken}` |
| Forgot Password | Self-service password recovery | `{resetPasswordUrl}`           | `{oneTimePassword}`   |
| Registration - Activation | Self-service registration | `{registrationActivationLink}` | `{oneTimePassword}`   |
| Email factor verification | Sign in with email - enrollment | `{verificationLink}` | `{verificationToken}` |
| Self-Service Unlock Account | Self-service unlock account| `{unlockAccountLink}` | `{oneTimePassword}` |

When a user clicks the magic link based on a customized email template, their browser is redirected straight to your application's endpoint:

<div class="full">

![Flow diagram showing the interaction between the app and Identity Engine when using custom email templates](/img/advanced-use-cases/email-magic-links-overview-custom-template-flow.png)

</div>

### Compare the options

|   | EVE + Default email templates | EVE + Custom email templates | Custom email templates |
|---|---|----|----|
| Set-up + Maintenance   | Requires one change in the Admin Console | Requires editing every email template that uses magic links to point to your new endpoint. | Requires editing every email template that uses magic links to point to your new endpoint. |
| Speed of redirection   | Magic link sends a request to Identity Engine for the callback URL. The user is then redirected to the callback URL. | Magic link sends a request to Identity Engine for the callback URL. The user is then redirected to the callback URL. | Magic link sends the browser directly to the callback URL |
| Branding | Default Okta-branded email templates | You can add your brand to a custom email template  | You can add your brand to a custom email template |
| Multi-language support | Default email templates support multiple languages | You must create and maintain a version of each custom template in each required language. | You must create and maintain a version of each custom template in each required language. |

## See also

<StackSnippet snippet="SeeAlso" />
