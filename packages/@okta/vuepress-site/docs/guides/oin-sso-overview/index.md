---
title: Overview of SSO in the OIN
meta:
  - name: description
    content: Learn how to build SSO app integrations for the Okta Integration Network.
---

## Overview

With an Okta Single Sign-On (SSO) integration, your users can use their company-issued Okta credentials (often an email and password) to securely access your application. Okta is also releasing [FastPass](https://www.okta.com/fastpass/) which allows employees to sign-on without a password on company-managed devices.


As an application developer, you want to give your users the ability to sign in directly to your application using Okta for identity management. To do so, your application needs to support federated Single Sign-On (SSO). In this scenario, your application relies on Okta to serve as an external Identity Provider (IdP).

## Why build an SSO integration with Okta?

* Enhance security&mdash;Integrating with Okta allows your customers to manage password strength and configure access policies for your application. For example, they may require employees to use multi-factor authentication (push notification to their phone, SMS, etc) in order to access your application from an unknown device.

* Deliver a strong end-user access experience&mdash;Take away all the friction of managing usernames and passwords. Once authenticated through Okta, your users can access your application with a single click.

* Enterprise ready&mdash;Your customers have a growing set of compliance needs that are continuously evolving. Okta integration helps you meet compliance and audit requirements and shortens sales cycles.

* Ease of adoption&mdash;For your enterprise customers that are already using Okta, they can add SSO to your application with minimal effort. All they have to do is add your app through the integration catalog in Okta.

## Choose your SSO protocol

| &nbsp; | OpenID Connect (OIDC) Recommended | Security Assertion Markup Language (SAML) | Embedded SDK-driven sign-in flow|
| ------ | -------------------------- | ----------------------- | ------------------------- |
| &nbsp; | Use the Okta-hosted Sign-in Widget to redirect your users to authenticate, then redirect back to your app. This is the recommended approach &mdash; most secure and fastest to implement. | Embed the Okta Sign-In Widget into your own code base to host the authentication client on your servers. This provides a balance between complexity and customization. | Use our SDKs to create a completely custom authentication experience. This option is the most complex and leaves you with the most responsibility, but offers the most control. |
| **Ease of Implementation** | <span style="width: 50%;display:block">![Low](/img/ratings/low.png)</span> | <span style="width: 50%;display:block">![Medium](/img/ratings/medium.png)</span> | <span style="width: 50%;display:block">![High](/img/ratings/high.png)</span> |
| **Technology** | JSON-based with OAuth 2.0 | XML-based |  |
| **Benefits** | Newer protocol with widespread and growing usage.
Best Okta customer configuration experience.
Ideal for mobile and cloud applications.
Lightweight and REST-based. | Many people are familiar with SAML because it is an older protocol; Some apps may already have code implementing SAML| |
| **Get started** | Build an Okta SSO integration with OIDC
sign-into-mobile-app-redirect/)| Build an Okta SSO integration with SAML | |

## Use case examples

### Example Single Sign-On journey with Okta

Ramon is starting his work day. In his web browser, he clicks on the Okta browser extension and selects his email app which loads in a new tab.
Ramon’s company has an Okta sign-on policy which requires each employee to verify their identity every 12 hours. Since it’s been more than 12 hours since he was last working, he is prompted to enter his Okta username and password. 
Ramon’s company has also enabled Okta multi-factor authentication, so after successfully entering his credentials, a push notification is sent to the Okta Verify app on his phone. Ramon taps his phone to verify his identity. Ramon can now access his email!
Next, Ramon goes to his Okta browser extension and selects his customer relationship management app. Since Ramon started a session less than 12 hours ago, he  is taken directly into the app without needing to sign-in again!

### Example of partner integration journey with Okta

Erika is an internal developer at Acme, a partner with Okta. Acme is looking to leverage the OIN as a way for their customers to adopt and incorporate Acme’s application to the customer’s existing Okta tenant.This allows Acme’s customers to add Acme’s application to their existing identity infrastructure with a no/low code configuration, avoiding installation and user management friction.
Erika builds the Acme-Okta integration, doing the heavy lifting so that their customers don’t have to.
Erika submits the integration for Okta to verify and review.
After approval, Acme’s app is published on the OIN.
The next Acme customer that wants to add the OIN-published Acme app into their own workforce ecosystem, minimal effort is required to incorporate the app into their existing Okta managed SSO. The customer’s employee signs into the Acme app with their existing credentials and no additional Acme app registration is required.

Want to automate even more for your customers and increase adoption of your product? Learn more about lifecycle management integration?
