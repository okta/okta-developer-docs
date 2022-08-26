---
title: Recommended best practices
---

Recommended best practices for password-optional authentication and other flows.

## Add phone as an additional authenticator

If you've enabled your users to forgo the password and sign in with only a single authenticator, create more resiliency in your sign-in flows by allowing users to use another authenticator. Examples of integrating single authenticator sign-in flows are described in the [Sign up for new account with email only](/docs/guides/pwd-optional-new-sign-up-email/nodeexpress/main/) and [Sign in with email only](/docs/guides/pwd-optional-sign-in-email/nodeexpress/main/) guides. These guides describe authentication with only the user's email and are primarily purposed as learning tools to help you understand how to integrate password-optional sign-up and sign-in flows in your app. In the real world, however, user emails change, get lost, are comprised, and may not be accessible during authentication. In these scenarios, an alternative authenticator gives users a fallback to sign into your app and prevents them from being locked out.

Although not the most secure option, the phone authenticator is a popular and recommended alternative authenticator because it's easy to deploy, quick and seamless to use, and convenient for most users.  To learn how to integrate the phone authenticator in your app, see the [Sign in with password and phone factors](/docs/guides/oie-embedded-sdk-use-case-sign-in-pwd-phone/nodejs/main/) guide. The guide describes a specific phone enrollment user journey, but you can choose your unique implementation since you are using the Embedded SDK.
