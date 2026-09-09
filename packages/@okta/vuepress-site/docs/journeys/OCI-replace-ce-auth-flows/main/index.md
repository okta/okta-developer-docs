---
title: Replace Classic Engine auth flows with Identity Engine
navigationTitle: Replace Classic Engine auth flows with Identity Engine
abstract: Replace Classic Engine authentication patterns after the Identity Engine upgrade by choosing a supported deployment model and configuring policies.
personas:
  - name: Developers
    type: primary
  - name: Administrators
    type: secondary
---

# Replace Classic Engine auth flows with Identity Engine

You've upgraded to Okta Identity Engine. Now it's time to get the most out of your Identity Engine investment.

After an upgrade, many orgs continue to run Classic Engine authentication patterns. These include the Classic Authentication API, Factors API, Sessions API, or an older self-hosted Sign-In Widget. These flows still work in Identity Engine, but they don't unlock Identity Engine's capabilities. They can block you from adopting stronger security controls, flexible authentication policies, or newer authentication methods like passkeys.

This journey helps you move from Classic Engine authentication to a supported Identity Engine flow. Choose your deployment model, update your implementation, configure policies, and validate changes.

## Before you begin

- Your Okta org has been upgraded to Identity Engine and is stable.
- You have developer-level access to your application code.
- You have admin access to your Okta org (super admin or application admin role).
- You have an inventory of apps that use Okta and their deployment patterns.

## Understand Identity Engine authentication

Before you change anything, understand Identity Engine's authentication pipeline, and then learn how it differs from Classic Engine.

- Learn what Identity Engine adds compared with Classic Engine and the stronger Identity Engine security capabilities.
- Learn how Identity Engine identifies the user first, then determines the next authentication step. This enables adaptive experiences like passwordless sign-in flows, passkeys, and federated routing.
- Understand the differences between Classic Engine and Identity Engine and how the authentication pipeline works.
- Get oriented to the deployment models available in Identity Engine.
- Understand the security, effort, and customization trade-offs.

## Plan your modernization approach

Decide which deployment model to target, audit Classic API dependencies, and plan for the visible UX change.

### Essential planning guides

These resources frame your modernization decisions, session behavior, and the identifier-first UX change before implementation:

- A ranked decision guide that compares each deployment model. It provides context for teams that are transitioning from Classic Engine to Identity Engine.
- A practical guide that explains the identifier-first flow change. Learn how it makes sign-in flows adaptive to each user, including federated IdPs and passkeys. Find out how to test, customize, and communicate it to users.
- Understand what changes to session management when moving to Identity Engine.

### Audit your Classic API dependencies

Use this guide to help you inventory those Classic Engine dependencies across your apps. Map each one to the Identity Engine path that replaces it.

## Implement your chosen deployment model

### Choose your build path

Follow the build path for your chosen deployment model. Each path links to focused implementation guides.

#### Path A: Standards-based integration with the Okta-hosted sign-in experience (redirect) — recommended

This path offloads the sign-in experience to Okta using SAML, OIDC, or OAuth. Okta handles the sign-in UI, security policies, and support for new tools like passkeys, WebAuthn, and YubiKeys.Your app remains future-proof and won't need rebuilding as authentication technology evolves.

- Implement the OAuth 2.0 redirect flow for a server-side web app.
- Implement the Okta-hosted Widget for a single-page app.
- Implement the Okta-hosted Widget for native mobile apps.
- Customize the Okta-hosted Gen3 widget to match your brand.
- Apply custom domains, CSS, and page customizations to align the hosted experience with your brand. You won't need to buid a self-hosted or embedded flow.

#### Path B: Self-hosted Sign-In Widget (Gen2)

The Gen3 widget is Okta-hosted and not supported for self-hosted embedding. If you need to embed directly in your app, use the Gen2 self-hosted widget instead.

- Upgrade your existing self-hosted widget to a version that supports Identity Engine.
- Apply your branding to the self-hosted Gen2 widget.

#### Path C: Embedded SDK or Auth.js

This path uses the Okta Identity Engine SDK or Auth.js. Your app implements authentication directly in your own UI. Use it when you need full control over the flow and experience. Your team owns the security, maintenance, and SDK updates.

- Replace your Classic Engine SDK or Authn API calls with the appropriate IDX SDK for your language.
- Get started with Auth.js (the JavaScript SDK) for embedded authentication.
- Review the complete embedded upgrade checklist, including troubleshooting for common migration issues.
- Find the language-specific SDK for your platform.

#### Path D: Direct Authentication APIs

This path calls the Okta Direct Authentication APIs to authenticate users without a browser redirect. Use it for native, command-line, server-side, service-to-service, or machine-to-machine scenarios. Your app must carefully handle credential and authenticator-response security.

- Set up direct authentication for native, server-side, or machine-to-machine scenarios without browser redirects.

### Configure your authentication policies

Authentication policies in Identity Engine replace Classic app sign-on policies. Configure them to define how users must authenticate in your apps.

- Set up the policies that control how users authenticate in your OIE apps, including MFA requirements and session lifetime.
- Understand which authenticators you can enable and how they integrate with you authentication policies.
- Understand how Okta app sign-in policies define authentication requirements and security criteria for app access.
- Explore the Okta policy types that enforce authentication, password, enrollment, and API access security requirements.
- Review the admin guide for controlling when users enroll authenticators, which app sign-in policies require.

### Validate your modernized flow

Before launch, confirm everything works end to end.

- Review common issues and errors after migration.
- Use the post-upgrade checklist for sign-in, account recovery, activation, and self-service registration.

Your SSO flow modernization is complete when:

- Users can sign in and sign out through an OIE-supported flow.
- No active calls go to the Classic Authentication API, Factors API, or Classic Sessions API patterns.
- Your widget or SDK version is current and supported.
- Your authentication policies are configured in Identity Engine and match your security requirements.
- The identifier-first sign-in experience is tested and working.

## Related topics

- Set up a custom domain to maintain a consistent brand in the standards-based federation (redirect) flow.
- Add passkeys as a passwordless authenticator for your users after modernization.
- Add social or enterprise identity providers to your sign-in flow.
- Protect your API resources with authorization policies.

## Go further

- If you haven't completed the Identity Engine upgrade, start with the Prepare your upgrade journey, the first in the Classic-to-OIE pathway.CHANGE THIS
- After modernizing your authentication flow, explore AI agent authentication using Identity Engine token exchange. Requires an Okta for AI Agents subscription.
- Add passkeys and a passwordless sign-in flow as a next step after modernization.
