---
title: Choose an Identity Engine sign-in deployment model
meta:
  - name: description
    content: Update your sign-in flows by replacing Classic Engine authentication patterns with Identity Engine-supported deployment models.
layout: Guides
personas: Developers, Admins
date-updated: September 9, 2026
---

## Overview

After you upgrade to Okta Identity Engine, you can update your sign-in flows by replacing Classic Engine authentication patterns with OIE-supported deployment models. This guide helps you choose the right model for your app.

Okta supports four authentication deployment models. They’re presented here in the order that Okta recommends, from simplest and most secure to most custom and complex.

<!-- > **Note:** If you haven't yet decided to modernize, start with the [Replace Classic Engine auth flows with Identity Engine](/docs/journeys/oci-replace-oce-auth-flows-with-OIE/) journey for context. -->

## Quick guidance

When in doubt, choose standards-based integration using the Okta-hosted sign-in experience (redirect). It's the most secure, lowest-maintenance, and fastest-to-implement option. You can move to a self-hosted or embedded model later if your requirements change.

> **Note**: If you can satisfy your UX requirements with a customized Okta-hosted widget, don't build an embedded flow only for branding reasons.

## The four deployment models

### Standards-based federation integration with the Okta-hosted sign-in experience - redirect (recommended)

With this model, your app uses a standards-based federation integration (SAML, OIDC, or OAuth) to delegate the user's sign-in experience to Okta. Your app invokes the federation flow, Okta presents the Okta-hosted sign-in steps, and Okta returns the user to your app after authentication.

#### Why choose this model

- It's the lowest implementation effort.
- Okta hosts, maintains, and secures the sign-in experience.
- SSO is implicit. Users already signed in to another app in your org are signed in to this app automatically.
- Policy changes, authenticator updates, and widget upgrades require no code changes on your side.
- Branding and domain customization are available without custom code.
- Okta handles the evolution of authentication methods over time. As Okta adds support for new authenticators (passkeys, WebAuthn, YubiKey, and others), your app inherits the change without code updates.
- It's the easiest path for adopting passkeys and other modern authenticators. The Okta-hosted experience can detect device-bound credentials and prompt the user appropriately.
- It's an easy add-on for more Okta capabilities, such as Identity Threat Protection (ITP) and other ecosystem products.

#### Trade-offs

- Your app doesn't control the authentication UX directly.
- Users are handed off to the Okta-hosted experience and redirected out of your app during the sign-in flow.
- A common counter-argument is "I can't customize it enough." In practice, you can substantially customize the Okta-hosted experience using custom domains, custom CSS, and the [Style the Sign-In Widget](/docs/guides/custom-widget/) guide. Confirm your specific UX requirements against the customization guides before discounting this model.

#### When not to use this model

- Your app can't redirect to an external page due to platform constraints.
- Your UX requirements can't be met with widget customization (after reviewing the customization guides).
- Your flow is a native app, server-to-server, or AI agent scenario without a browser.

#### Learn more

- [Sign users in to your web app using the redirect model](/docs/guides/sign-into-web-app-redirect/)
- [Sign users in to your SPA using the redirect model](/docs/guides/sign-into-spa-redirect/)
- [Sign users in to your mobile app using the redirect model](/docs/guides/sign-into-mobile-app-redirect/)
- [Style the Sign-In Widget (third generation)](/docs/guides/custom-widget-gen3/). This guide offers customization options for the Okta-hosted Gen3 sign-in experience.

### Self-hosted Sign-In Widget (Gen2)

With the self-hosted widget, you host the Okta Sign-In Widget (second generation, Gen2) directly in your app. Authentication happens within your app without delegating to the Okta-hosted experience. The third-generation (Gen3) widget is delivered as the Okta-hosted sign-in experience and isn't supported for self-hosted embedding.

#### Why choose this model

- You control the visual context of the sign-in experience (placement and surrounding UI).
- The Gen2 widget supports the Okta Identity Engine authentication pipeline, including authenticator policies, when configured for the [Interaction Code grant type](/docs/guides/implement-grant-type/interactioncode/main/).
- There's better branding integration than the Okta-hosted experience (redirect) when you need the sign-in form inside your own layout.

#### Trade-offs

- You’re responsible for keeping the widget package up to date.
- You share responsibility for Cross-Site Scripting (XSS) and other client-side security concerns.
  XSS is a security vulnerability where an attacker injects malicious JavaScript code into a web page, which then executes in the browsers of other users who visit that page. This can allow attackers to steal session cookies, credentials, or other sensitive data, or perform actions on behalf of the victim.
- There's more implementation effort than redirect.
- You don't get the full benefit of Okta's evolving authenticator support. New authenticators or sign-in patterns may require widget upgrades or other code changes.

#### When not to use this model

- Your UX requirements can be met with a customized Okta-hosted widget. Use the [redirect model](#standards-based-federation-integration-with-the-okta-hosted-sign-in-experience---redirect-recommended) instead.
- You need full control of the authentication flow logic, not just the visual wrapper.
- Your team can't commit to keeping the widget package current.

#### Learn more

- [Upgrade the Okta Sign-In Widget](/docs/guides/okta-sign-in-widget-upgrade/)
- [Style the Sign-In Widget](/docs/guides/custom-widget-gen3/main/). This guide helps you apply your branding to the self-hosted Gen2 widget.

### Embedded SDK or Auth.js

With the embedded SDK model, your app uses the Identity Engine SDK (IDX SDK) or Auth.js to implement authentication directly in your own UI. There's no Okta-hosted form. Your code drives every step of the authentication flow.

#### Why choose this

- You need complete control over the authentication UX and flow logic.
- Your app requires a custom authentication UI that can't be achieved with widget customization.
- You’re building a fully branded, native-feeling authentication experience.

#### Trade-offs

- It's the highest implementation effort of the embedded and self-hosted options.
- Your team is responsible for security, maintenance, and SDK version updates.
- Each authenticator flow requires separate implementation work.
- You have to adapt to SDK changes over time.
- Authenticator support varies by scenario. Some authenticators (notably passkeys) work in some embedded SDK scenarios and not others, and behavior can be platform-dependent. Confirm support for the authenticators that you need before committing to this path.

#### When not to use this model

- The self-hosted Gen2 widget can meet your requirements. Use the widget instead.
- Your team can't commit to ongoing SDK maintenance.
- You only need the redirect or Gen3 widget level of customization.

#### Learn more

- [Upgrade your app to the Identity Engine SDK](/docs/guides/oie-upgrade-api-sdk-to-oie-sdk/)
- [Auth.js fundamentals](/docs/guides/auth-js/)
- [Plan embedded auth app upgrades](/docs/guides/oie-upgrade-plan-embedded-upgrades/)
- [Okta SDKs reference](https://developer.okta.com/code/)

### Direct Authentication APIs

With direct authentication, your app calls Okta's APIs directly to authenticate users without a browser. The user's credentials or authenticator responses are passed directly to Okta.

#### Why choose this model

- Your app is a native or command-line app without a browser.
- Your flow is server-side, service-to-service, or involves an AI agent.
- You're replacing Classic Engine Authn API calls and can't use a browser-based flow.

#### Trade-offs

- Your app takes full responsibility for credential handling security.
- Not suitable for most customer-facing web or mobile apps.
- Requires careful handling of user credentials at the server side.

#### When not to use this model

- A browser redirect is available. Use the [redirect model](#standards-based-federation-integration-with-the-okta-hosted-sign-in-experience---redirect-recommended) instead.
- The self-hosted widget meets your requirements. Use the widget instead.

#### Learn more

[Configure Direct Authentication](/docs/guides/configure-direct-auth-grants/).

## Compare at a glance

| | Okta-hosted/Redirect | Self-hosted Gen2 | Embedded SDK or Auth.js | Direct Authentication |
|---|---|---|---|---|
| **Effort** | Low | Medium | High | Medium-high |
| **Maintenance** | Low | Medium | High | Medium |
| **Security responsibility** | Okta | Shared | Yours | Yours |
| **Customization** | Substantial | Substantial | Full | Full UX, no UI |
| **Browser required** | Yes | Yes | Optional | No |
| **Authenticator evolution** | Inherited from Okta automatically | Tied to widget version | Tied to SDK version and varies by platform | Tied to API version and has limited UI affordances |
| **Best for** | Most apps | Self-hosted brand-led UI | Fully custom UX | Native, server, agents |

## Decision checklist

Use this checklist to guide your choice.

| Question | If yes, use |
|---|---|
| Can your app redirect users to an external sign-in page? | Okta-hosted Sign-in Widget. It's the simplest and most secure path. It lets Okta handle the evolution of authentication methods (passkeys, WebAuthn, YubiKey, and more) without changes to your app code. |
| Can a customized Okta-hosted widget meet your UX needs? | Okta-hosted Sign-in Widget |
| Do you need the sign-in form embedded visually in your app layout without a redirect? | Self-hosted Sign-in Widget (Gen2) |
| Do you need full programmatic control over each step of the authentication flow? | Embedded SDK or Auth.js |
| Is your flow a native app, server-side, or machine-to-machine without a browser? | Direct Authentication |
| Are passkeys, WebAuthn, or other modern authenticators on your roadmap? | Okta-hosted Sign-in Widget (preferred). Confirm authenticator support before committing to embedded SDK or Auth.js. Passkey support in self-hosted embedded SDK and Auth.js implementations is limited and platform-dependent. |

> **Note**: When in doubt, choose the redirect model. You can revisit later if your requirements change.

### Don't choose embedded for branding alone

Don't choose an embedded or self-hosted model only because you want to match your brand. The Okta-hosted sign-in experience [supports substantial customization](/docs/guides/custom-widget-gen3/main/): custom domains, custom CSS, and brand-aligned page layouts. Review the [customization guides](/docs/guides/custom-widget/main/) before committing to an embedded path for branding reasons alone.

## Migrate from a Classic Engine deployment model

If you currently use a Classic Engine deployment, this table maps the migration to the recommended Identity Engine target.

| Classic deployment | Recommended Identity Engine target |
|---|---|
| Redirect to a Classic Engine Okta-hosted Sign-In Widget | Redirect to the Identity Engine Okta-hosted Sign-In Widget |
| Self-hosted Sign-In Widget v2 or earlier | Self-hosted Gen2 Sign-In Widget (or move to redirect) |
| Custom UI calling `/api/v1/authn` (Classic Authn API) on the front end | Self-hosted Gen2 widget if UI control is a requirement. Embedded SDK if full UX control is required. |
| Custom UI calling `/api/v1/authn` from a server (no browser) | Direct authentication |
| Mobile app using a Classic Engine-era language SDK | Embedded SDK with the IDX SDK for the platform, or redirect |
| Mobile app using a custom WebView form | Redirect to the Okta-hosted Sign-In Widget. Don't authenticate inside a WebView. |

> **Note:** Authentication in mobile WebView isn't supported. See [OAuth 2.0 for Native Apps](https://datatracker.ietf.org/doc/html/rfc8252) for the underlying reason. Use the platform's native browser tab or the Okta mobile SDK redirect flow.

## Related resources

<!-- - The [Replace Classic Engine auth flows with Identity Engine](/docs/journeys/oci-replace-oce-auth-flows-with-OIE/) journey that links to this guide. -->
[Redirect vs. embedded](/docs/concepts/redirect-vs-embedded/) for a deeper explanation of the model differences.
<!-- - [Plan for the visible UX change when moving to OIE](/docs/guides/plan-ui-upgrade/). -->
