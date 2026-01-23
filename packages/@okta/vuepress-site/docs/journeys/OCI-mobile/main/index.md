---
title: Add a sign-in form to your mobile app
meta:
 - name: Add a sign-in form to your mobile app
   content: Connect your mobile app to Okta and sign your users in and out.
   date-updated: January 23, 2026
   target persona: Developer
   level: Beginner
---

## Introduction

You've built a mobile app to access your customer portal and want to add identity-related functionality, such as an admin area, user profiles, and more. Use the Okta Client SDK for a complete, native user experience.

## Learn

There are three key elements to enabling a mobile sign-in form with the Okta platform.

* [An Okta org](/docs/concepts/okta-organizations/) is the hub for all configurations, users, and groups. It's created as part of your integrator account.
* [Okta Identity Engine (OIE)](/docs/concepts/oie-intro/) is the core server that verifies your users' identities.
* The Okta Client SDKs for [Swift](https://github.com/okta/okta-mobile-swift) and [Android](https://github.com/okta/okta-mobile-kotlin) provide a clean development experience for native app developers.

## Plan

Consider how your users sign in when they access your portal before designing your sign-in form. Your Okta org comes with three [preset authentication policies](https://help.okta.com/oie/en-us/content/topics/identity-engine/policies/about-preset-auth-policies.htm): password only, any one factor, and any two factors. Your org also comes with four basic authentication factors enabled: password, email, SMS, and voice.

When you need to [add a new authentication factor](https://help.okta.com/oie/en-us/content/topics/identity-engine/authenticators/about-authenticators.htm) or start building your own custom authentication policy, you do it all in the Admin Console, with no coding necessary.

## Build

To integrate your mobile app with Okta, start by getting an Okta account and org, and then setting up the org. You can then implement a user-friendly sign-in experience using the Okta-hosted sign-in form or a self-hosted form. After that, you can customize the authentication flow to meet your specific security requirements and brand aesthetics.

### Set up your account

Sign up for an Okta account, and set up your new Okta org to test web apps.

* [Get an Okta account](/docs/reference/org-defaults/)
* [Set up your org for basic testing](/docs/guides/set-up-org/main/)

### Add a way for users to sign in

To keep it simple, Okta suggests initiating the sign-in process when a user accesses your app. This is often referred to as a "federation model". The app then triggers the sign-in flow with all the necessary context.

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

The alternative is to add a custom sign-in form in your portal. Then, use direct authentication to connect to Okta and to sign the user in.

* [Learn about direct authentication](/docs/concepts/direct-authentication/).
* [Sign users in to your mobile app with a self-hosted sign-in page and the Mobile SDK](/docs/guides/sign-users-in-mobile-self-hosted/main/).

## Maintain a user session

After a user has signed in, Identity Engine sends your app a set of tokens to identify the user, grant them access to their profile and other resources, and keep them signed in if they spend too long away from the app.

Learn about tokens (the token lifecycle, and the different types of tokens) (info)
Secure your tokens and user credentials with the Mobile SDK (info)
Check for an existing session before asking a user to sign in (info)
Keep the user signed in beyond the session's expiry time (info) - ask Alex
Add a way for users to sign out
How a user signs out of an application and what happens next is just as important as how they sign in. What happens when they click the sign-out button? What will they see when they return to an application after their session has timed out?

Add a sign-out experience (info)
Test your sign-in and sign-out flows work
Remember to test your apps are sending the correct flows

Validate federation is working (info)
<Related Topics Section>
Congratulations—your mobile app now successfully signs users in and out. The basic functionality you have implemented so far can be expanded and customized in many ways.

Enable a user consent dialog for your app to access certain resources (info)
Sign users in with Facebook or another social login (info)
Change your existing IdP to Okta
Secure your sign-in flow further with proof of possession (info)
Secure authentication with a Push Notification to your iOS device (info)
Require further authentication to access specific areas of your portal
Use your mobile app as an authenticator for your web client app

Go deeper into the protocols underlying the sign-in processes

Learn about OAuth and OIDC (info)
Learn about Single Sign-on (info)
Learn about Single Logout

This journey is part of the Secure your Portal pathway, which also contains:

Apply your brand to the Okta UX
Migrate / import users into your org 
Work with multiple brands in one org
Upgrade your org to Okta Identity Engine

