---
title: Password optional overview
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>

## Overview

Most hacking-related breaches involve weak or stolen passwords and credential security theft. Passwords are a security vulnerability because they can be easily stolen and are prone to phishing attacks.

Passwords are also not convenient. Users often need to remember multiple passwords, change them regularly, and either memorize or store them securely somewhere.

Replace the password with a password-optional sign-in experience. Give your users the ability to authenticate with a fingerprint, YubiKey, email, phone, or another authenticator. These authenticators are all more secure. It's harder to steal a fingerprint than a password, and it's more convenient than memorizing and managing passwords.

<div>

![The diagram illustrates how password-optional authentication, when compared to other password authentications, is convenient and secure.](/img/pwd-optional/pwd-optional-overview-xy-diagram.png)

<!--
Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3012%3A6039 pwd-optional-overview-xy-diagram
 -->

</div>

## Integration guides

Use the following integration guides to step through a set of use cases for password-optional authentication. The embedded solutions replace the password with other [authenticators](/docs/guides/authenticators-overview/main/).

### Embedded SDK

* <StackSnippet snippet="signupwithemail" inline/>
* <StackSnippet snippet="signinwithemail" inline/>
* <StackSnippet snippet="changeemail" inline/>

### Embedded Sign-In Widget

* <StackSnippet snippet="widgetsignin" inline/>

Also, see the <StackSnippet snippet="bestpractices" inline/> guide to learn how to build a solid password-optional sign-in solution.

## See also

* [Okta Passwordless Authentication](https://www.okta.com/passwordless-authentication/)
* [Let's (finally) say goodbye to passwords](https://www.okta.com/go-passwordless/)
* [Passwordless authentication deployment guide](https://learning.okta.com/deploy-authentication-policies)

</div>
