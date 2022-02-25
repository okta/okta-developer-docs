---
title: Build a Single Sign-On (SSO) integration
excerpt: Create an app integration using SAML or OIDC.
meta:
  - name: description
    content: Use this guide to learn how to build federated Single Sign-On into your Okta integration. 
layout: Guides
---

This guide teaches you how to build federated Single Sign-On into your Okta-integrated application.

---

**Learning outcomes**

* Create an app integration inside your Okta org to use Okta as the Identity Provider for your app.
* Test your app integration.

**What you need**

* An Okta developer account. Sign up for one at <https://developer.okta.com/signup/>.
* A suitable app to be integrated with Okta, such as [an SPA](/docs/guides/sign-into-spa/) or [server-side web app](/docs/guides/sign-into-web-app/).

**Sample code**

See the above SPA and web app links for code samples.

---

## Overview

As an application developer, you want to give your users the ability to sign in directly to your application using Okta for identity management. To do so, your application needs to support federated Single Sign-On (SSO). In this scenario, your application relies on Okta to serve as an external Identity Provider (IdP).

## Choosing a protocol

Okta supports two protocols for handling federated SSO:

* [OpenID Connect (OIDC)](/docs/concepts/oauth-openid/#openid-connect)
* [Security Assertion Markup Language (SAML)](/docs/concepts/saml/)

Your choice of protocol depends mainly on your use case, but OIDC is generally recommended for new integrations.

### OIDC features

* An identity layer on top of the [OAuth 2.0](https://oauth.net/2/) protocol.
* Verifies end-user identity and obtains profile information.
* Lightweight and REST-based.
* Ideal for mobile and cloud applications.
* Newer protocol with widespread usage. Some newer applications only support OIDC.

### SAML features

* Widely used federation protocol for SSO in Web applications.
* Many SaaS providers support SAML integration to grant SSO access to end users.
* Specification doesn’t have user consent, although it can be built into the flow.
* Larger in size because XML messages are transmitted back and forth.

## Organizations

In a typical scenario, your application relies on Okta to act as a multi-tenant Identity Provider (IdP) for your customers' Okta organizations.

An [Okta org](/docs/concepts/okta-organizations/) acts as a container that sets hard boundaries for all users, applications, and other entities associated with a single customer, providing tenant-based isolation.

In developing your SSO app integration, the customer’s Okta org serves as the Authorization Server (OIDC) or as the IdP (SAML).

## Publishing

This guide assumes that you intend to develop an app integration and make it public by publishing it in the Okta Integration Network (OIN). If you want to develop a custom app integration that is intended for private deployment within your own company, use the Okta [App Integration Wizard (AIW)](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard) to create your app integration.

## Prepare your integration

After you have decided which protocol is right for your needs, you need to gather some information for your integration.

<StackSelector snippet="prep" noSelector />

## Create your integration

After you have your background information, you can use the Okta Admin Console and the Application Integration Wizard (AIW) to create your SSO integration inside the Okta org associated with your developer account.

>**Note:** Creating your SSO app integration doesn't automatically make it available in the [OIN](https://www.okta.com/integrations/). After you have created and tested it, you need to [submit your app integration](/docs/guides/submit-app/) to the OIN.

1. Sign in to your Okta developer account as a user with administrative privileges.
1. In the Admin Console, go to  **Applications** > **Applications**.
1. Click **Create App Integration**.

<StackSelector snippet="create" noSelector />

## Specify your integration settings

This portion of the guide takes you through the steps for configuring your specific SSO integration using the Okta Admin Console.

After you create your integration in the [Create your integration](#create-your-integration) step, the Admin Console opens the main settings page for your new integration. In here, you can specify **General Settings** and **Sign On** options, as well as assign the integration to users in your org. Click **Edit** if you need to change any of the options, and **Save** when you have made your changes.

<StackSelector snippet="settings" noSelector />

## Test your integration

This portion of the guide takes you through the steps required to test your integration.

### Assign users

First you must assign your integration to one or more test users in your org:

1. Click the **Assignments** tab.
1. Click **Assign** and then select either **Assign to People** or **Assign to Groups**.
1. Enter the appropriate people or groups that you want to have Single Sign-On into your application, and then click **Assign** for each.
1. For any people that you add, verify the user-specific attributes, and then select **Save and Go Back**.
1. Click **Done**.

### Test Single Sign-On

1. Sign out of your administrator account in your development org. Click **Sign out** in the upper-right corner of the Admin Console.
1. Sign in to the Okta End-User Dashboard as the regular user that was assigned the integration.
1. In your dashboard, click the Okta tile for the integration and confirm that the user is signed in to your application.

<StackSelector snippet="test" noSelector />

## Next steps

* After you complete your testing and your integration is working as expected, you can start the submission process to have your integration included in the [Okta Integration Network](https://www.okta.com/okta-integration-network/) catalog.
* Our [Submit an app integration](/docs/guides/submit-app) guide takes you through the steps required to submit your SSO integration through the OIN Manager.

## See also 

* [Okta SAML FAQs](/docs/concepts/saml/faqs/)
* [Okta Developer Forum &mdash; OIDC](https://devforum.okta.com/search?q=oidc)
* [Stack Overflow &mdash; Okta OIDC](https://stackoverflow.com/search?q=oidc+okta)
* [Okta Developer Forum &mdash; SAML](https://devforum.okta.com/search?q=saml)
* [Stack Overflow &mdash; Okta SAML](https://stackoverflow.com/search?q=saml+okta)