---
title: Best practices for password optional
---

A list of recommended best practices for password-optional use cases using the Embedded SDK.

## Add phone as an additional authenticator

The <StackSnippet snippet="signupwithemail" inline/> and <StackSnippet snippet="signinwithemail" inline/> guides show you how to integrate password-optional sign-in flows in your app using only email. These guides are primarily meant to be learning tools to help you understand how to integrate password-optional use cases in your app. In reality, however, user emails change, get lost, become compromised, and may not be accessible during authentication. In these scenarios, supporting another recovery authenticator along with email gives users a fallback option to sign in to your app and avoid user lockout.

The phone authenticator is a popular and recommended alternative authenticator because it's easy to deploy, quick and seamless to use, and familiar for most users. To learn how to integrate the phone authenticator in your app, see the phone enrollment steps in the <StackSnippet snippet="signinwithpwdandphone" inline/> guide.

## Protect your admin accounts

Before you configure the password-optional experience, ensure that you continue to require passwords for your admins. Should a passwordless account be granted admin privileges at some point, they are required to create a password giving them access to all your Org's apps. To do this:

* Create a separate group for admins and add your admin users to that group.
* Create separate authenticator enrollment, global session, and authentication policies for this group. Each policy should require a password.
* Place this group at the highest priority (at number one) in the authenticator enrollment policy.
