---
title: Sign users in through your web app
meta:
  - name: description
    content: Connect your customer portal to Okta and sign your users in and out through the web portal UI.
    date-updated: September 10, 2025
    target persona: Developer
    level: Beginner
sections:
- main
---

# Sign users in through your web app

Integrate Okta with your customer portal to manage user authentication (sign-in and sign-out) directly through its web interface.

## Introduction

You've built a web-based interface to your customer portal and want to add identity-related features like user profiles and more. Configure how to verify user identities, a sign-in form to control app access, and define the authentication policies.

## Learn

Learn the basics that you need to lay the foundations for your work.

* An [Okta org](/docs/concepts/okta-organizations/) serves as your central Okta development hub, encapsulating all configurations, users, groups, policies, and other objects that your app uses.
* Okta [Identity Engine (OIE)](/docs/concepts/oie-intro/) is the core server that verifies your users' identities.

## Build

To add identity-related features to your new customer portal, start by creating an Okta account and org, and then set up the org. After that, connect your app to Okta and add basic user authentication and user session management.

### Set up your account

Sign up for an Okta account, and then set up your new Okta org to test web apps.

* [Get an Okta account](/docs/reference/org-defaults/)
* [Set up your org for basic testing](/docs/guides/set-up-org/main/)

Consider how your users sign in when they access your portal before designing your sign-in form. Okta provides three [preset authentication policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-preset-auth-policies) that allow you to control who can access your app and how.

* Password only
* [Multifactor authentication]() means that users must verify their identity in two or more ways to identify themselves. For example, the policy might require the user to enter both a password and a code sent to an email.
* [Password optional](/docs/guides/pwd-optional-overview/aspnet/main/) is another authentication policy concept where users don’t need to use a password to sign in.

### Add a way for users to sign in

To keep it simple, Okta suggests initiating the sign-in process when a user accesses your app. This is often referred to as a "federation model". The app then triggers the sign-in flow with all the necessary context. The Okta platform offers various deployment models to integrate a sign-in form into your portal, using the app as the point of entry.

* What are the different sign-in form options [deployment models](/docs/concepts/redirect-vs-embedded/)?
* [Choose the deployment model that best suits your scenario](/docs/concepts/redirect-vs-embedded/#deployment-models-and-the-authentication-api).

#### The Okta-hosted way

The simplest and Okta-recommended way to sign users in to your portal in a web browser is to redirect them to an Okta-hosted sign-in page. This page displays the Okta Sign-In Widget, which you can customize to reflect your brand.

* [Learn about the Okta Sign-in Widget](/docs/concepts/sign-in-widget/).
* [Sign users into your portal by redirecting them to an Okta sign-in page (SPA)](/docs/guides/sign-into-spa-redirect/angular/main/).

#### The self-hosted way

The alternative is to build a custom sign-in form in your portal and use Direct Authentication to connect to Okta and to perform the sign-in flow.

* [Learn about Direct Authentication](/docs/concepts/direct-authentication/)
* [Add multifactor authentication using a password and OTP](/docs/guides/configure-direct-auth-grants/bmfaotp/main/)
* [Add phone authentication](/docs/guides/configure-direct-auth-grants/fmfaoobsv/main/)
* [Add Okta Verify Push authentication](/docs/guides/configure-direct-auth-grants/dmfaoobov/main/)

## Maintain a user session

After a user signs in, the Identity Engine sends your app a set of tokens to identify the user, grant them access to their profile and other resources, and keep them signed in if they spend too long away from the app.

* [Understand the token lifecycle (exchange, refresh, revoke)](/docs/concepts/token-lifecycles/)
* [Learn about OAuth 2.0 claims]().
* [Learn about authorization servers](/docs/concepts/auth-servers/), the component of Identity Engine that mints tokens and enforces access policies.
* [Manage user credentials (secure token storage and retrieval)]().

## Add a way for users to sign out

How a user signs out of an app and what happens next is just as important as how they sign in. What happens when they click the sign-out button? What will they see when they return to an app after their session has timed out? See [Add a sign-out experience (Sign a user out of a SPA)](/docs/guides/auth-js-redirect/main/#add-a-sign-out-function).

## Go Further

Congratulations, your portal now signs users in and out. There are many ways to expand and customize the basic functionality that you have implemented so far.

See advanced secure mechanisms like [Demonstrating Proof of Possession (DPoP)](/docs/guides/dpop/nonoktaresourceserver/main/) and [Step-up authentication](/docs/guides/step-up-authentication/main/).

Go deeper into the protocols underlying the sign-in process:

* [Learn about OAuth and OIDC](/docs/concepts/oauth-openid/).
* [Learn about Single Sign-On]().
