---
title: Password optional overview
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>

## Overview

Most hacking-related breaches involve weak or stolen passwords and credential security theft. Passwords are a security vulnerability because they can be easily stolen and are prone to phishing attacks. They're also not convenient. Users often need to remember multiple passwords, change them regularly, and either memorize or store them securely somewhere.

Replace the password with a password-optional sign-in experience. Give your users the ability to authenticate with a fingerprint, YubiKey, email, phone, or another authenticator. These authenticators are all more secure &mdash; it's harder to steal a fingerprint than a password &mdash; and more convenient since users no longer have to memorize and manage their passwords.

<div class="three-quarters">

![Diagram illustrating how password-optional authentication, when compared to other password authentications, is convenient and secure.](/img/pwd-optional/pwd-optional-overview-xy-diagram.png)

</div>

## Integration guides

Implement password-optional authentication in your app using Okta's embedded solutions and replace the password with more secure and convenient [authenticators](/docs/guides/authenticators-overview/main/). Use the following integration guides to step through a simple set of use cases and start your password-optional journey.

### Embedded SDK

* <StackSnippet snippet="signupwithemail" inline/>
* <StackSnippet snippet="signinwithemail" inline/>
* <StackSnippet snippet="changeemail" inline/>

### Embedded Widget

* <StackSnippet snippet="widgetsignin" inline/>

Also, see the <StackSnippet snippet="bestpractices" inline/> guide to learn how to build a solid password-optional sign-in solution.

## See also

* [Okta Passwordless Authentication](https://www.okta.com/passwordless-authentication/)
* [Let’s (finally) say goodbye to passwords](https://www.okta.com/go-passwordless/)
<!--* [Passwordless authentication deployment guide](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/guides/pwa/pwa-main.htm)-->

</div>
