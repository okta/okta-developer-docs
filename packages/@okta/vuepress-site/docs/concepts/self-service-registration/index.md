---
title: Plan self-service registration flows
meta:
  - name: description
    content: A high-level overview of self-service registration flows.
---

# Plan self-service registration flows

Learn about self-service registration and three key aspects that you can customize for your specific use-cases.

---

## Overview of self-service registration

Self-service registration allows users to register an account and sign in to an app by themselves. Instead of requiring manual administrative provisioning, you allow users to identify themselves and provide the necessary data to gain access.

You choose which data to collect during registration, the authenticators available for enrollment, and the authentication requirements for enrolling those authenticators. You can also use custom code to further customize the flow.

For more information about SSR, see the following resources:

* [Self-service registration overview](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-ssr)
* [User profile policies](/docs/concepts/policies/#user-profile-policies)
* [Universal Directory](/docs/concepts/universal-directory/)

### Default SSR state

Self-service registration is disabled by default. The default user profile policy, the catch-all user profile policy, doesn't allow self-service registration.

You can enable a basic SSR flow, by creating a new user profile policy. These are the default settings for a new user profile policy that allows self-service registration:

* The user profile policy prompts users for their first name, last name, and email address. Those are the basic Universal Directory attributes required to create a user profile and activate an Okta account.
* Users must verify their email address before the account is activated.
* Progressive profiling is enabled by default. If you add other UD attributes as optional, then users are prompted to provide that information when they sign in again, after their initial registration.
* There is one default identifier that allows users to sign in with their username. You can add other identifiers. See [Multiple identifiers](https://help.okta.com/okta_help.htm?type=oie&id=ext-multiple-ids).
* The registration form has default text and labels. You can customize the text and labels to match your brand and use case.
* The user profile policy isn't assigned to any apps. You must assign the policy to an app for users to see the registration form when they try to sign in to that app.

<!-- Insert diagram of default SSR state -->

## Secure SSR with OAuth 2.0 and OIDC

If you use SSR with the redirect deployment model, the flow follows the standard Open ID Connect (OIDC) protocol. Users are first redirected to an Okta-hosted page where they complete the registration form. After they register, Okta redirects them back to your app with an authorization code, which your app then exchanges for tokens to sign the user in.

### Redirect vs embedded SSR flows

SSR can be configured using either a [redirect or an embedded model](/docs/concepts/redirect-vs-embedded/). In the redirect model, users are sent to an Okta-hosted page to register. In the embedded model, the registration form exists directly within your app's UI and domain.

Okta recommends the redirect model for most use cases because it balances security with ease of use. The redirect model uses the Okta Sign-In Widget as its backend and frontend foundation, which offers a secure and customizable experience with minimal maintenance.

And, when you implement a [custom domain](/docs/guides/custom-url-domain/main/#about-okta-domain-customization) within the redirect model, you unlock extensive customization options. You can inject your own scripts and styles into the page while Okta continues to manage the core widget logic and security updates.

## Ways to customize your SSR flow

You can customize how Okta handles registration through a combination of [policies](#use-policies-to-control-ssr-flows), [server-side logic](#use-an-inline-hook-to-customize-the-ssr-flow), and [client-side code](#use-custom-code-to-customize-the-ssr-flow).

### Use policies to control SSR flows

Policies allow you to change the registration logic directly in the Admin Console without updating your app's code. There are three primary policies that control the SSR experience:

* User profile policy
* Authenticator enrollment policy
* Okta account management policy

#### User profile policy

The [user profile policy](/docs/concepts/policies/#user-profile-policies) controls the attributes collected during registration. You can use this to map specific data from your Universal Directory (UD) to the registration form.

For example, if your app requires a business-specific attribute like a department name or a specific organization ID, you can set these as required fields in the user profile policy to ensure they are captured when users register.

> **Tip:** Use progressive enrollment to avoid overwhelming users with too many fields during registration. Start with the most essential attributes and then prompt for additional information during subsequent sign-ins. See [Progressive enrollment](https://help.okta.com/okta_help.htm?type=oie&id=ext-pe-policies).

#### Authenticator enrollment policy

The authenticator enrollment policy defines which authenticators are available for users to create. You can set certain authenticators as required or optional during registration, and you can specify which authenticators are available based on user attributes or other conditions.

For example, you can configure the policy to allow or require users to enroll a passkey when they create their account to ensure high-assurance authentication from day one.

#### Okta account management policy

The Okta account management policy controls the security requirements for enrolling authenticators. You can use this policy to require users to verify their email or phone number before they can enroll certain authenticators, or you can require them to authenticate with an existing authenticator before enrolling a new one.

For example, you can allow users to register a passkey by requiring them to authenticate with a password first, ensuring a verified identity before a new authenticator is bound to the user's account.

### Use an inline hook to customize the SSR flow

Registration inline hooks allow you to customize the SSR flow with your own business logic by pausing the process to consult an external API. The hook triggers after the user submits the registration form but before the user account is actually created in Okta.

For implementation details, see:

* [Registration inline hook](https://developer.okta.com/docs/guides/registration-inline-hook/nodejs/main/)
* [API reference for a registration inline hook](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/create-registration-hook)
* [Hooks in the Okta Sign-In Widget](https://github.com/okta/okta-signin-widget?tab=readme-ov-file#hooks)

Example use cases for inline hooks:

Domain Validation: You can validate the domain of a user trying to register and deny requests from unauthorized or public email providers.

Input Restrictions: You can disallow certain characters or patterns in an email, username, or password that do not align with your internal data requirements.

### Use custom code to customize the SSR flow

You can use custom code to customize the SSR flow with your own scripts.

For example:

UX: Adding inline links (ToS, Privacy, etc)
UX: Different Style pickers/type ahead/look up.

<< Refer/link to:

* [https://developer.okta.com/docs/guides/custom-widget/main/\#use-the-code-editor](https://developer.okta.com/docs/guides/custom-widget/main/#use-the-code-editor)
* [https://developer.okta.com/docs/guides/custom-widget/main/\#add-your-own-scripts](https://developer.okta.com/docs/guides/custom-widget/main/#add-your-own-scripts) >>

#### Use the Sign-In Widget for SSR

Building a custom sign-up form requires managing state, field validation, and security edge cases. The Okta SIW handles this out of the box.

* **Low Maintenance:** UI updates automatically when you change profile requirements in the Admin Console.
* **Security by default:** Built-in protection against bot registrations and credential stuffing.
* **Future-proof:** Support for new authenticators requires zero code changes to your form.
* **Accessibility:** Fully compliant with WCAG 2.1 standards.

<< Refer/link to:

* [https://developer.okta.com/docs/concepts/sign-in-widget/\#okta-hosted-sign-in-widget-recommended](https://developer.okta.com/docs/concepts/sign-in-widget/#okta-hosted-sign-in-widget-recommended)
* [https://developer.okta.com/docs/concepts/redirect-vs-embedded/\#redirect-authentication](https://developer.okta.com/docs/concepts/redirect-vs-embedded/#redirect-authentication)
* [https://developer.okta.com/docs/guides/custom-widget-gen3/main/](https://developer.okta.com/docs/guides/custom-widget-gen3/main/) >>

## See also

/docs/concepts/brands/#use-the-customizations-apis
/docs/guides/custom-widget/main/

## Next steps

You've seen the three main ways to customize the self-registration flow. You can also customize the look and feel of the widget itself and the text of the emails to match your brand.
