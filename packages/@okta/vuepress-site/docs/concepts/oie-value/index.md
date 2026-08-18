---
title: The value of Okta Identity Engine
meta:
  - content: See what upgrading from Classic Engine unlocks, such as flexible policies, modern authenticators, passwordless, and stronger security.
  - date updated: September 4, 2026
personas:
  - primary persona: Developers
  - secondary personas: Application architects, identity engineers, security architects
---

# The value of Okta Identity Engine

Okta Identity Engine is a new authentication pipeline that gives you a more flexible approach to your authentication needs. If you're migrating from Classic Engine, this guide is a short orientation of what Identity Engine adds and why the upgrade is worth it, before you plan or build your modernized sign-in and SSO flow.

## Why upgrade from Classic Engine to Identity Engine

Upgrading from Classic Engine to Identity Engine gives you enhanced security, finer policy control, and modern authentication capabilities:

* Adapt authentication to risk and context instead of applying one fixed flow to everyone.
* Adopt modern authenticators, including passwordless and passkeys, as they become available, often without rebuilding your app.
* Move toward supported, standards-based integration patterns that are easier to maintain.
* Unlock newer Okta security controls and ecosystem capabilities that build on the Identity Engine platform.

> **Note**: New Okta orgs have been Identity Engine orgs since March 1, 2022. Identity Engine is the platform that Okta builds new capabilities on.

## What Identity Engine adds

At a high level, Identity Engine introduces a policy-driven authentication pipeline and a set of capabilities that Classic Engine doesn't offer:

* **Flexible app sign-in and authentication policies**: App sign-in policies are shareable across apps and evaluated at runtime. Step up to a strong, non-phishable factor when risk is detected and change an app's authentication methods without altering a line of code.
* **Modern and passwordless authenticators**: Methods such as Okta FastPass and Email Magic Link let users authenticate without a password. Passkeys and WebAuthn fit the same policy-driven model.
* **Identifier-first, adaptive sign-in**: Identity Engine can recognize the user first and then choose the next step (password, passwordless, passkey, or a federated identity provider) based on policy.
* **Flexible deployment models**: Choose Okta-hosted (redirect), an embedded Sign-In Widget, embedded SDK, or embedded APIs (Direct Authentication). Choose based on how much of the experience that you want Okta to host.
* **Embedded authentication through the Interaction Code grant**: Manage the authentication interaction directly from your app instead of relying on a browser redirect.
* **Stronger security posture**: Integrate CAPTCHA for registration, sign-in flows, and recovery. Use Universal Logout to terminate sessions and tokens when Identity Threat Protection detects a risk change. Use the [Device Authorization grant type](/docs/guides/device-authorization-grant/main/) for input-constrained devices.
* **Operational improvements**: There's improved Terraform support and a current set of SDKs and sample apps for building Identity Engine features.

## Classic Engine vs. Identity Engine at a glance

| Area | Classic Engine | Okta Identity Engine |
| --- | --- | --- |
| Authentication model | Fixed sign-in flow | Policy-driven pipeline evaluated at runtime |
| Policy control | App sign-on policies with limited flexibility | Shareable app sign-in policies, risk-based step-up flows, and the ability to change methods without code changes |
| Authenticators | Traditional factors | Modern authenticators, passwordless, passkeys, Okta FastPass |
| Sign-in experience | Username and password together | Identifier-first and adaptive options |
| Deployment | Mostly widget/redirect patterns | Redirect, embedded widget, embedded SDK, and embedded API (direct authentication) |
| Platform capabilities |  | Universal Logout, CAPTCHA, Device Authorization Grant, improved Terraform support |

## Where to go next
<!-- **Ready to modernize?** Continue with the [Modernize your sign-in and SSO flows with Okta Identity Engine journey](??). -->
**Not upgraded yet?** Start with [Prepare to upgrade to Okta Identity Engine journey](/docs/journeys/OCI-prepare-upgrade-oie/main/) and the [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/main/).

## Related topics

* [Okta Identity Engine overview](/docs/concepts/oie-intro/)
* [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/main/)
* [Identity Engine upgrade FAQ](https://help.okta.com/okta_help.htm?type=oie&id=ext-upgrade-faq)
* [Choose where the sign-in experience is hosted](/docs/concepts/redirect-vs-embedded/#redirect-okta-hosted-vs-embedded-self-hosted)
* [Embedded, policy-driven authentication](/docs/concepts/interaction-code/)
* [Global session and app sign-in policies](/docs/concepts/policies/)
* [Identifier-first and password-first behavior](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-sign-in-flows)
