---
title: Secure your first web app
meta:
  - name: description
    content: Connect a single-page app to Okta and give it sign-in functionality.
    date-updated: September 10, 2025
    target persona: Developer
    level: Beginner
sections:
- main
---

# Secure your first web app

Connect your app to Okta and configure a secure sign-in experience.

## Introduction

You've built your customer-facing app and now it needs a secure, scalable way to sign users in. Integrate your existing web app with a secure Okta sign-in flow, configure sign-in policies, and brand the experience for your customers.

## Learn

Learn the basics that you need to lay the foundations for your work.

An [Okta org](/docs/concepts/okta-organizations/) serves as your central Okta development hub, encapsulating all configurations, users, groups, policies, and other objects that your app uses.

## Plan

To get the most from your Okta org, secure a custom domain that you can assign to your org. A custom domain provides the following enhancements:

* Apply your brand's look and feel to all Okta user interface components and communications.

* Simplify user session management and monitoring.

* Enable cross-app features like Single Logout (SLO).

See [Style the sign-in form to match your brand](#style-the-sign-in-form-to-match-your-brand).

## Build

To integrate your web app with Okta, start by getting an Okta account and org, and then setting up the org. You can then implement a user-friendly sign-in experience using the Okta-hosted sign-in form. After that, you can customize the authentication flow to meet your specific security requirements and brand aesthetics.

### Set up your account

Sign up for an Okta account, and then set up your new Okta org to test web apps.

* Get an [Okta account](/docs/reference/org-defaults/).
* [Set up your org for basic testing](/docs/guides/set-up-org/main/). This involves populating your org with sample users and a user group.

### Add a way for users to sign in

The simplest and Okta-recommended way to sign users in to your app is to redirect them to an Okta-hosted sign-in form.

* [Connect your app to Okta](/docs/guides/create-an-app-integration/openidconnect/main/).
* [Learn about the Okta Sign-In Widget](/docs/concepts/sign-in-widget/).
* [Sign users in to your SPA by redirecting them to an Okta-hosted sign-in form](/docs/guides/auth-js-redirect/main/).

By default, users are required to sign in with any two authentication factors: password, email, SMS, and voice. Your org comes with those authenticators pre-configured. Use the Admin Console to enable other factors and change the policy to match your requirements.

* Learn about [preset app sign-in policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-preset-auth-policies).
* [Add an authentication factor](https://help.okta.com/okta_help.htm?type=oie&id=csh-about-authenticators).

The Okta-hosted sign-in form changes its behavior automatically to match your updates to the app sign-in policy.

### Style the sign-in form to match your brand

You can restyle the Okta-hosted sign-in form to match your own brand's look and feel. Assign a custom domain URL to your org to enable these customization features.

* Assign a [custom domain](/docs/guides/custom-url-domain/main/) to your org.
* Use [the Okta samples repo](https://github.com/oktadev/okta-js-siw-customzation-example) to build the correct CSS to match your design.
* [Style your Okta org with your brand](/docs/concepts/brands/).
* [Style the Okta-hosted sign-in form](/docs/guides/custom-widget-gen3/main/).

## Related topics

Congratulations, your app now uses Okta to provide its sign-in services.

Learn how to secure other types of apps:

* [Sign users in to a mobile app by redirecting them to an Okta-hosted sign-in form](/docs/guides/sign-into-mobile-app-redirect/ios/main/).
* [Sign users in to a mobile app using a self-hosted sign-in form](/docs/guides/sign-into-mobile-app-embedded/main/).

After a user signs in, Okta returns tokens to identify the user and the user's access levels. See [Understand the token lifecycle](/docs/concepts/token-lifecycles/index.md).

If you're using the Okta-hosted sign-in form, Okta returns a JWT to identify the user, their access, and to give you some information about their session. This proves that they have an active browser session. If you're using a self-hosted form, your app should use the [Authorization Code with PKCE](/docs/guides/implement-grant-type/authcodepkce/main/) authentication flow and `prompt=none` to validate that a session is still active.

Use the following docs to enable sign-out once, sign-out everywhere features:

* [Learn about Single Logout](/docs/guides/single-logout/openidconnect/main/).
* [Learn about Universal Logout](/docs/guides/oin-universal-logout-overview/).

This journey is part of the Secure your portal pathway, which also contains the following:

* [Sign users in through your web app](/docs/journeys/OCI-web-sign-in/main/)
* [Apply your brand to the Okta user experience](/docs/journeys/OCI-branding/main/)
