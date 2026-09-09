---
title: Replace Classic Engine auth flows with Identity Engine
abstract: Replace Classic Engine authentication patterns after the Identity Engine upgrade by choosing a supported deployment model and configuring policies.
personas:
  - name: Developers, Administrators
---

# Replace Classic Engine auth flows with Identity Engine

You've upgraded to Okta Identity Engine. Now it's time to get the most out of your Identity Engine investment.

After an upgrade, many orgs continue to run Classic Engine authentication patterns. These include the Classic Engine Authentication API, Factors API, Sessions API, or an older self-hosted Sign-In Widget. These flows still work in Identity Engine, but they don't unlock Identity Engine's capabilities. They can block you from adopting stronger security controls, flexible authentication policies, or newer authentication methods like passkeys.

This journey helps you move from Classic Engine authentication to a supported Identity Engine flow. The guide helps you choose your deployment model, update your implementation, configure policies, and validate changes.

## Before you begin

- Your Okta org has been upgraded to Identity Engine and is stable.
- You have developer-level access to your app code.
- You have admin access to your Okta org (super admin or app admin role).
- You have an inventory of apps that use Okta and their deployment patterns.

## Understand Identity Engine authentication

Before you change anything, understand Identity Engine's authentication pipeline, and then learn how it differs from Classic Engine.

- [Learn what Identity Engine adds compared with Classic Engine](/docs/concepts/oie-value/) and the stronger Identity Engine security capabilities.
- [Learn how Identity Engine identifies the user first](/docs/concepts/oie-idfirst-signin/), then determines the next authentication step. This enables adaptive experiences like passwordless sign-in flows, passkeys, and federated routing.
- [Understand the differences between Classic Engine and Identity Engine](/docs/concepts/oie-intro/) and how the authentication pipeline works.
- [Learn about the deployment models](/docs/concepts/oie-intro/) available in Identity Engine.
- [Understand the security, effort, and customization trade-offs](/docs/concepts/redirect-vs-embedded/).

## Plan your modernization approach

Decide which deployment model to target, audit Classic Engine API dependencies, and plan for the visible UX change.

### Essential planning guides

These resources frame your modernization decisions, session behavior, and the identifier-first UX change before implementation:

- [A ranked decision guide](/docs/guides/oie-choose-signin-deploy/main/) that compares each deployment model. It provides context for teams that are transitioning from Classic Engine to Identity Engine.
- [A functional guide that explains the identifier-first flow change](/docs/guides/oie-manage-id-first-signin/main/). Learn how it makes sign-in flows adaptive to each user, including federated IdPs and passkeys. Find out how to test, customize, and communicate it to users.
- [A guide that explains how sessions work](/docs/guides/oie-upgrade-sessions-api/main/) after moving to Identity Engine.

### Audit your Classic API dependencies

Use the [Audit your Classic API dependencies](/docs/guides/oie-upgrade-audit-classic-api-dependencies/main/) guide to help you inventory those Classic Engine dependencies across your apps. Map each one to the Identity Engine path that replaces it.

## Implement your chosen deployment model

After you review the deployment models and select one that fits your app's architecture, it's time to implement. Follow the implementation steps for your chosen path (A, B, C, or D). Then configure your authentication policies and validate the modernized flow before rolling it out to production.

### Choose your build path

Follow the build path for your chosen deployment model. Each path links to focused implementation guides.

#### Path A: Standards-based integration with the Okta-hosted sign-in experience (redirect) - recommended

This path offloads the sign-in experience to Okta using SAML, OIDC, or OAuth. Okta handles the sign-in UI, security policies, and support for new tools like passkeys, WebAuthn, and YubiKeys. Your app remains future-proof and doesn't need rebuilding as authentication technology evolves.

- [Implement the OAuth 2.0 redirect flow](/docs/guides/sign-into-web-app-redirect/main/) for a server-side web app.
- [Implement the Okta-hosted Widget](/docs/guides/sign-into-mobile-app-redirect/main/) for a single-page app.
- [Implement the Okta-hosted Widget](/docs/guides/sign-into-mobile-app-redirect/main/) for mobile apps.
- [Customize the Okta-hosted Gen3 widget](/docs/guides/custom-widget-gen3/main/) to match your brand.
- [Apply custom domains, CSS, and page customizations](/docs/guides/custom-widget/main/#style-for-redirect-authentication) to align the hosted experience with your brand. You don't need to build a self-hosted or embedded flow.

#### Path B: Self-hosted Sign-In Widget (Gen2)

The third-generation (Gen3) widget is Okta-hosted and not supported for self-hosted embedding. If you need to embed directly in your app, use the Gen2 self-hosted widget instead.

- [Upgrade your existing self-hosted widget](/docs/guides/oie-upgrade-sign-in-widget/main/) to a version that supports Identity Engine.
- [Apply your branding](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget) to the Gen2 self-hosted widget.

#### Path C: Embedded SDK or Auth.js

This path uses the Okta Identity Engine SDK or Auth.js. Your app implements authentication directly in your own UI. Use it when you need full control over the flow and experience. Your team owns the security, maintenance, and SDK updates.

- [Replace your Classic Engine SDK or Authn API calls](/docs/guides/oie-upgrade-api-sdk-to-oie-sdk/main/) with the appropriate IDX SDK for your language.
- [Get started with Auth.js](/docs/guides/sign-in-to-spa-authjs/angular/main/) (the JavaScript SDK) for embedded authentication.
- [Review the complete embedded upgrade checklist](/docs/guides/oie-upgrade-plan-embedded-upgrades/main/), including troubleshooting for common migration issues.
- [Find the language-specific SDK](/code/alternate-sign-in-sdks/) for your platform.

#### Path D: Direct Authentication APIs

This path calls the Okta Direct Authentication APIs to authenticate users without a browser redirect. Use it for native, command-line, server-side, service-to-service, or machine-to-machine scenarios. Your app must carefully handle credential and authenticator-response security.

[Set up direct authentication](/docs/guides/configure-direct-auth-grants/main/) for native, server-side, or machine-to-machine scenarios without browser redirects.

### Configure your authentication policies

Authentication policies in Identity Engine replace Classic Engine app sign-on policies. Configure them to define how users must authenticate in your apps.

- [Set up the policies that control how users authenticate in your Identity Engine apps](/docs/guides/configure-signon-policy/main/), including MFA requirements and session lifetime.
- [Understand which authenticators you can enable](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-authenticators) and how they integrate with your authentication policies.
- [Understand how Okta app sign-in policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop) define authentication requirements and security criteria for app access.
- [Explore the Okta policy types](/docs/concepts/policies/#policy-types) that enforce authentication, password, enrollment, and API access security requirements.
- [Review the admin guide for controlling when users enroll authenticators](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-mfa-policy), which app sign-in policies require.

### Validate your modernized flow

Before you launch your new flow, confirm that everything works:

- [Review common issues and errors after migration](/docs/guides/oie-upgrade-plan-embedded-upgrades/main/).
- [Use the post-upgrade checklist](/docs/guides/oie-upgrade-overview/main/) for sign-in, account recovery, activation, and self-service registration.

Your SSO flow modernization is complete when you validate the following items:

- Users can sign in and sign out through an Identity Engine-supported flow.
- No active calls go to the Classic Engine Authentication API, Factors API, or Classic Engine Sessions API patterns.
- Your widget or SDK version is current and supported.
- Your authentication policies are configured in Identity Engine and match your security requirements.
- The identifier-first sign-in experience is tested and working.

## Related topics

- [Set up a custom domain](/docs/guides/custom-url-domain/main/) to maintain a consistent brand in the standards-based federation (redirect) flow.
- [Add passkeys as a passwordless authenticator](/docs/guides/authenticators-web-authn/main/) for your users after modernization.
- [Add social or enterprise identity providers](/docs/guides/identity-providers/) to your sign-in flow.
- [Protect your API resources](/docs/guides/configure-access-policy/main/) with authorization policies.

## Go further

- If you haven't completed the Identity Engine upgrade, start with the [Prepare to upgrade to Okta Identity Engine](/docs/journeys/OCI-prepare-upgrade-oie/main/).
- After you modernize your authentication flow, [explore AI agent authentication using AI agent token exchange](/docs/guides/ai-agent-token-exchange/main/).
- [Add passkeys and a passwordless sign-in flow](/docs/guides/authenticators-web-authn/main/) as a next step after modernization.
