---
title: Manage the identifier-first sign-in transition
meta:
  - name: description
    content: Learn how the identifier-first sign-in experience appears in each Okta deployment model, how to test it, and what to do before you go live.
layout: Guides
personas: Developers, Admins
date-updated: September 4, 2026
---

## Overview

When you move an app from Okta Classic Engine to Okta Identity Engine, the default sign-in experience changes. Classic Engine presents a single page that collects the username and password together. Identity Engine presents an identifier-first flow instead.

The first page collects only the username (the identifier). The second page prompts for a password or another authenticator.

This change is visible to your users. If you don't plan for it, it can surprise them and generate support requests.

This guide defines the identifier-first flow, how it appears in each deployment model, how to test it, and what to do before you go live.

> **Key takeaway**: The identifier-first flow isn't just a reduction of input fields. It's what makes the sign-in experience adaptive and responsive to each user. After the user submits an identifier, Okta evaluates their identity, applicable authenticators, identity providers, and authentication policy. Okta then uses that evaluation to drive the second step of the sign-in flow. This is what enables federated routing, passwordless flows, and discoverable credential prompts.

## About identifier-first sign-in flows

In the identifier-first flow, Okta collects the user's identifier (usually a username or email address) on its own page first. After the user submits the identifier, Okta evaluates the user's identity and authentication policy. Okta then presents the next appropriate factor or challenge on a second page.

<!-- Link to a dedicated identifier-first concept page here once one exists. -->

### How it differs from Classic Engine

| Classic Engine | Identity Engine |
| --- | --- |
| Single page with username and password fields | Two-page flow: identifier first, then authenticator |
| Same form for all users | Okta adapts the second page to the user and policy |
| Password field always shown if the password policy is active | First page never shows a password field |
| Authenticator selection happens after the user signs in | Authenticator selection is contextual, based on policy |

## Which deployment models are affected

Consider how the identifier-first flow appears in each Okta deployment model:

> **Note**: See [Choose an Identity Engine sign-in deployment model](/docs/guides/oie-choose-signin-deploy/) if you haven't yet selected a model.

* **Standards-based integration with the Okta-hosted sign-in experience (redirect)**: The identifier-first flow is the default for the Okta-hosted widget in Identity Engine orgs. You can't override this behavior with redirect-model code. Your authentication policy and the widget control it.
* **Embedded Sign-In Widget (Gen2)**: The Gen2 widget supports the identifier-first flow when configured for the Identity Engine [Interaction Code grant](/docs/guides/implement-grant-type/interactioncode/main/). The third-generation (Gen3) widget is delivered as the Okta-hosted sign-in experience and isn't supported for self-hosted embedding. This section doesn't apply to a self-hosted Gen3 deployment.
* **Embedded SDK or Auth.js**: Your implementation drives the flow, and you decide how many pages to present. However, the Okta API responses reflect the identifier-first model. If you implement a combined form, remember that the Okta policy engine is designed for the identifier-first pattern. Policy decisions are made after the identifier is submitted.
* **Direct authentication APIs**: Direct authentication is request-driven, not driven by a UI page flow, so identifier-first concerns don't apply in the same way. Even so, your client logic should follow the identifier-first sequence: identify the user first, then present the credentials.

## Test identifier-first sign-in flow before you launch

Test your implementation in a development org before you launch it. Confirm that the identifier-first flow behaves as expected for every user scenario that your app supports.

1. Set up a test user in your development org.
2. Access your app's sign-in flow.
3. Confirm that the first page shows only the username or email field.
4. Submit the identifier and confirm that the second page appears with the appropriate authenticator challenge.
5. Complete the sign-in flow and confirm that the user is authenticated.
6. Test with users enrolled in different authenticators to confirm that the second page adapts correctly.
7. Test with users in different authentication policy groups to confirm the policy-driven adaptations.
8. Test each deployment model that you support, such as redirect, embedded Gen2 widget, or embedded SDK.
9. Test a federated user whose email domain routes to an external IdP. Confirm that after the identifier is submitted, Okta routes the user to the external IdP instead of prompting for an Okta password.
10. Test a passwordless user, such as one enrolled with a passkey or WebAuthn factor. Confirm that the second page doesn't prompt for a password.
11. Test a device with a discoverable passkey credential available for your app. Confirm that the sign-in experience offers the passkey prompt instead of, or alongside, the identifier field.

## Widget customization and i18n

If you use the Okta-hosted or embedded Gen2 widget, you can adjust the text and styling of both the identifier page and the authenticator page.

**Styling**: See [Style the sign-in page](/docs/guides/custom-widget/) for the self-hosted Gen2 widget, or [Style the Sign-In Widget (third generation)](/docs/guides/custom-widget-gen3/) for the Okta-hosted experience. The identifier-first flow uses the same theming surface as the rest of the widget.

**i18n (text overrides)**: If you customized the widget text in a previous widget version, you might need to update your i18n overrides. See [Updates to widget i18n properties](/docs/guides/oie-upgrade-sign-in-widget-i18n/) for the properties that changed between Classic Engine and Identity Engine.

Check for i18n overrides that reference the combined username-and-password form. Those strings might no longer apply to the identifier-first flow. Common changes include the following items:

* Replace combined-form labels (for example, "Sign in with your username and password") with identifier-only labels (for example, "Enter your username to continue").
* Adjust helper text, placeholder text, and aria labels.
* Update custom branding strings that reference "password" on the first page.

## Communicate the change to end users

If your users are used to a combined username-and-password form, the identifier-first flow is a visible change.

Consider the following options before you go live:

* **No communication**: The two-page flow is intuitive for most users who have used any modern consumer app. If your user base is comfortable with technology, you might not need to communicate the change.
* **A brief in-app notice**: A one-time banner or tooltip near the sign-in entry point (for example, "Our sign-in experience has been updated") can reduce confusion without extensive documentation.
* **Help documentation update**: If your app has a help center or user documentation, update the sign-in instructions to reflect the two-page flow. Remove or archive images that show the Classic Engine single-form experience.
* **Email or in-app campaign**: For highly regulated industries, or for user bases unaccustomed to change, a brief outreach email before launch can preempt support tickets.

## Trade-offs to consider

The Identifier-first sign-in experience is responsive and adaptive, but it involves trade-offs to weigh, especially for non-CIAM use cases.

* **User enumeration**: Because the second page adapts to a known user, an unauthenticated visitor can probe the identifier page. They can check whether an email address belongs to a valid user in your org. This might be acceptable for customer identity (CIAM) scenarios, but B2B and workforce orgs should weigh it against their risk model.
* **Honeypotting and domain probing**: A determined attacker might try to discover whether a domain belongs to your tenant by submitting candidate identifiers. Consider whether you need more obfuscation, such as masking adaptive responses for unknown users, for B2B scenarios.
* **Browser autofill**: The identifier-first split changes how some browsers and password managers autofill the username and password fields. Test with the browsers and password managers that your user base actually uses.

## Troubleshoot

**Users say the sign-in form looks different.** This is expected. The identifier-first flow is the default for Identity Engine orgs. Confirm that your widget version and policy settings are correct.

**Users say they're not being asked for a password.** Check your authentication policy. If passwordless or password-optional authentication is enabled, the second page might present a different authenticator. See [Configure a global session policy and app sign-in policies](/docs/guides/configure-signon-policy/).

**You need to show a combined form for an embedded SDK implementation.** Your implementation drives the UI in the embedded SDK model. However, the Identity Engine API is designed for the identifier-first pattern, and policies evaluate after the identifier is submitted. See the [embedded SDK use cases](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/) for the recommended implementation pattern.

**Branding strings still reference "password" on the first page.** Check your i18n overrides. After the upgrade, update any customization that refers to a combined form to identifier-only language.

**Federated users are prompted for an Okta password instead of routing to their IdP.** Check your routing rules and identity provider configuration. The identifier-first model is what enables Okta to route federated users to the correct external IdP after the identifier is submitted. If routing is misconfigured, the flow falls back to local authenticators.

**Passkey prompts don't appear for users with discoverable credentials.** Confirm that WebAuthn and passkey support is enabled in your authentication policy, and that your deployment model surfaces device-bound credentials. The Okta-hosted sign-in experience is the easiest path for full passkey support. Some embedded SDK scenarios don't offer the same capabilities.

## Related resources

* [Okta Identity Engine overview](/docs/concepts/oie-intro/)
* [Style the sign-in page](/docs/guides/custom-widget/)
* [Updates to widget i18n properties](/docs/guides/oie-upgrade-sign-in-widget-i18n/)
* [Authenticators overview](/docs/guides/authenticators-overview/)
<!-- - The journey doc that links to this guide (New - see link for details). -->
