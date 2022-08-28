---
title: Recommended best practices
---

A list of recommended best practices for password-optional use cases using the Embedded SDK.

## Add phone as an additional authenticator in your password-optional sign-in flows

If you've enabled your users to forgo the password and sign in with only a single authenticator, create more resiliency in your authentication processes by allowing users to use another authenticator. You were shown in the [Sign up for new account with email only](/docs/guides/pwd-optional-new-sign-up-email/nodeexpress/main/) and [Sign in with email only](/docs/guides/pwd-optional-sign-in-email/nodeexpress/main/) guides how to integrate password-optional sign-in flows in your app by using only email. These guides are primarly meant to be learning tools to help you understand how to integrate password-optional use cases in your app. In reality, however, user emails change, get lost, are comprised, and may not be accessible during authentication. In these scenarios, supporting another authenticator along with email gives users a fallback option to sign into your app when email is inaccessible.

Although more secure options are available, the phone authenticator is a popular and recommended alternative authenticator because it's easy to deploy, quick and seamless to use, and familiar for most users. To learn how to integrate the phone authenticator in your app, see the [Sign in with password and phone factors](/docs/guides/oie-embedded-sdk-use-case-sign-in-pwd-phone/nodejs/main/) guide. The guide describes a specific phone enrollment user journey, but you can choose your unique implementation since you are using the Embedded SDK.
