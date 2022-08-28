---
title: Recommended best practices
---

A list of recommended best practices for password-optional use cases using the Embedded SDK.

## Add phone as an additional authenticator

If you've enabled your users to forgo the password and sign in with only a single authenticator, create more resiliency in these sign-in flows by allowing users to use another authenticator. The primary password-optional integration guides, which include [Sign up for new account with email only](/docs/guides/pwd-optional-new-sign-up-email/nodeexpress/main/) and [Sign in with email only](/docs/guides/pwd-optional-sign-in-email/nodeexpress/main/), show you how to enable your users to sign in with only their email. These guides are primarily purposed as learning tools to help you understand how to integrate sign-up and sign-in flows into your app without the use of passwords. In the real world, however, user emails change, get lost, are comprised, and may not be accessible during authentication. In these scenarios, supporting email and another authenticator gives users a fallback option to sign into your app when they can't access their email.

Although not the most secure option, the phone authenticator is a popular and recommended alternative authenticator because it's easy to deploy, quick and seamless to use, and convenient for most users.  To learn how to integrate the phone authenticator in your app, see the [Sign in with password and phone factors](/docs/guides/oie-embedded-sdk-use-case-sign-in-pwd-phone/nodejs/main/) guide. The guide describes a specific phone enrollment user journey, but you can choose your unique implementation since you are using the Embedded SDK.
