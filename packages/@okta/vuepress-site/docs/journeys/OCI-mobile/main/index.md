---
title: Add a sign-in form to your mobile app
meta:
 - name: Add a sign-in form to your mobile app
   content: Connect your mobile app to Okta and sign your users in and out.
   date-updated: January 29, 2026
   target persona: Developer
   level: Beginner
---

## Introduction

You've built a mobile app to access your customer portal and want to add identity-related functionality like an admin area, user profiles, and more. Use the Okta Client SDK for a complete, native user experience.

## Learn

There are three key elements to enabling a mobile sign-in form with the Okta platform:

* [An Okta org](/docs/concepts/okta-organizations/) is the hub for all configurations, users, and groups. It's created as part of your integrator account.
* [Okta Identity Engine](/docs/concepts/oie-intro/) is the core server that verifies your users' identities.
* The Okta Client SDKs for [Swift](https://github.com/okta/okta-mobile-swift) and [Android](https://github.com/okta/okta-mobile-kotlin) provide a clean development experience for native app developers.

## Plan

Consider how your users sign in when they access your portal before designing your sign-in form. Your Okta org includes three [preset authentication policies](https://help.okta.com/oie/en-us/content/topics/identity-engine/policies/about-preset-auth-policies.htm): password only, any one factor, and any two factors. Also, your org comes with four Basic authentication factors enabled: password, email, SMS, and voice.

When you need to [add an authentication factor](https://help.okta.com/oie/en-us/content/topics/identity-engine/authenticators/about-authenticators.htm) or build a custom one, you can do it all in the Admin Console, no coding necessary.

## Build

To integrate your mobile app with Okta, begin by creating an Okta account and org, and then set up the org. You can then implement a user-friendly sign-in experience using the Okta-hosted sign-in form or a self-hosted solution. After that, you can customize the authentication flow to meet your specific security requirements and brand aesthetics.

### Set up your account

Sign up for an Okta account, and set up your new Okta org to test web apps:

* [Get an Okta account](/docs/reference/org-defaults/)
* [Set up your org for basic testing](/docs/guides/set-up-org/main/)

### Add a way for users to sign in

To keep it simple, Okta suggests initiating the sign-in process when a user accesses your app. This is often referred to as a "federation model." The app then triggers the sign-in flow with all the necessary context.

The Okta platform offers various deployment models to integrate a sign-in form into your portal, using the app as a point of entry:

* Learn about the options for sign-in form [deployment models](/docs/concepts/redirect-vs-embedded/).
* [Choose the deployment model that best suits your scenario](/docs/concepts/redirect-vs-embedded/#deployment-models-and-the-authentication-api).

#### The Okta-hosted way

The Okta-recommended way to sign users in to your portal is to redirect them to an Okta-hosted sign-in page. This page displays the Okta Sign-In Widget, which you can customize to reflect your brand.

* [Learn about the Okta Sign-In Widget](/docs/concepts/sign-in-widget/)
* [Configure the Swift SDK for an Okta-hosted sign-in form](/docs/guides/mobile-swift-configure-redirect/main/)
* [Sign users into your mobile app by redirecting them to an Okta sign-in page](/docs/guides/sign-into-mobile-app-redirect/ios/main/)

Learn how to [customize the Sign-In Widget to match your app's theme or your company's brand](/docs/journeys/OCI-branding/main/).

#### The self-hosted way

The alternative is to add a custom sign-in form in your portal. Then, use direct authentication to connect to Okta and to sign the user in:

* [Learn about direct authentication](/docs/concepts/direct-authentication/).
* [Sign users in to your mobile app with a self-hosted sign-in page and the Mobile SDK](/docs/guides/sign-users-in-mobile-self-hosted/main/).

## Maintain a user session

After a user signs in, Identity Engine sends your app a set of tokens. These tokens identify the user, grant them access to their profile and other resources, and keep them signed in if they're idle for a while.

* [Learn about tokens (the token lifecycle, and the different types of tokens)](/docs/concepts/token-lifecycles/)
* [Secure your tokens and user credentials with the Mobile SDK](/docs/guides/manage-user-creds/ios/main/)
* [Check for an existing session before asking a user to sign in](/docs/guides/check-for-session/android/main/)
* [Keep the user signed in beyond the session's expiry time](/docs/guides/keep-user-signed-in/android/main/)

## Add a way for users to sign out

How a user signs out of an app and what happens next are as important as how they sign in. What happens when they click the sign-out button? What do they see when they return to an app after their session has timed out? See the [Add a sign-out experience](/docs/guides/oie-embedded-sdk-use-case-basic-sign-out/android/main/) guide for the answers.

## Test your sign-in and sign-out flows

Now that you have everything set up, test that your sign-in and sign-out flows. See [Validate SSO federation](/docs/guides/validate-federation/main/).

## Related topics

Congratulations, your mobile app now successfully signs users in and out. You can expand and customize the basic functionality that you’ve implemented in many ways:

* [Enable a user consent dialog for your app to access certain resources](https://developer.okta.com/docs/guides/request-user-consent/main/)
* [Sign users in with Facebook](/docs/guides/oie-embedded-sdk-use-case-sign-in-soc-idp/ios/main/)
* [Secure your sign-in flow further with proof of possession](/docs/guides/dpop/nonoktaresourceserver/main/)
* [Secure authentication with a push notification to your iOS device](https://developer.okta.com/blog/2025/11/18/okta-ios-directauth)

Go deeper into the protocols underlying the sign-in processes:

* [Learn about OAuth and OIDC](/docs/concepts/oauth-openid/)
* [Learn about Single Sign-On](/docs/concepts/sso-overview/)

This journey is part of the Secure your portal pathway, which also contains the following journeys:

* [Apply your brand to the Okta user experience](/docs/journeys/OCI-branding/main/)
* [Sign users in through your web app](/docs/journeys/OCI-web-sign-in/main/)
* [Secure your first web app](/docs/journeys/OCI-secure-your-first-web-app/main/)
