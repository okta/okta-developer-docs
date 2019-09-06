---
title: Prerequisites
meta:
  - name: description
    content: Use this guide to learn how to add multi-factor authentication to your apps, and how to either deploy our built-in factors or integrate with existing tokens. 
---

Application developers and organizations are increasingly
implementing multi-factor authentication to add an extra layer of
security to their applications.

In this guide, we'll show you how to add multi-factor authentication
to your app with Okta.

Okta gives you the flexibility to deploy our built-in
factors, or integrate with existing tokens. Native factors include
SMS, and the Okta Verify app for iOS and Android. Integrations include
Google Authenticator, RSA SecurID, Symantec VIP, and Duo Security.

### Prerequisites

To follow along with this guide, you will need to have your own Okta Developer Edition org and have Postman configured to make API requests to that account.

1. Creating your Okta Developer Edition org
    If you don't already have one, create your own Okta Developer
    Edition org by visiting: <https://developer.okta.com/signup/>
    and following the instructions.
2. Setting up the Postman API client
    After you have logged in to your account in your Okta Developer
    Edition org, follow the
    [instructions on the Okta Developer Documentation page for setting up Postman](/code/rest/).

## Overview of API calls used for multi-factor authentication

Below is an introduction to using Okta's Multi-Factor Authentication (MFA)
API to add MFA to an existing application.

In this guide, you will learn the actual HTTPS requests that are
involved in adding MFA to your
application. How use actually make these calls will depend on the
programming language and web framework that your application uses.

If you are writing code in .NET or Java, [Okta has helper libraries](/docs/)
that will make it easy to add support for Okta to your application
in an idiomatic way.

<NextSectionLink/>
