---
title: Overview of SSO in the OIN
meta:
  - name: description
    content: Learn how to build SSO app integrations for the Okta Integration Network.
---

With an Okta Single Sign-On (SSO) integration, your users can use their company-issued Okta credentials to securely access your application. In addition to the typical email and password cred)Okta is also releasing [FastPass](https://www.okta.com/fastpass/) which allows employees to sign-on without a password on company-managed devices.


As an application developer, you want to give your users the ability to sign in directly to your application using Okta for identity management. To do so, your application needs to support federated Single Sign-On (SSO). In this scenario, your application relies on Okta to serve as an external Identity Provider (IdP).

## Why build an SSO integration with Okta?

| Enhance security | Deliver a strong end-user access experience | Enterprise ready | Ease of adoption |
| ---------------- | ---------------- | -------- | ----------------- |
|Integrating with Okta allows your customers to manage password strength and configure access policies for your application. For example, they may require employees to use multi-factor authentication (push notification to their phone, SMS, etc) in order to access your application from an unknown device. | Take away all the friction of managing usernames and passwords. Once authenticated through Okta, your users can access your application with a single click. | Your customers have a growing set of compliance needs that are continuously evolving. Okta integration helps you meet compliance and audit requirements and shortens sales cycles. | For your enterprise customers that are already using Okta, they can add SSO to your application with minimal effort. All they have to do is add your app through the integration catalog in Okta. |


## Choose your SSO protocol

Okta supports two protocols for handling federated SSO. Your choice of protocol depends mainly on your use case, but OIDC is generally recommended for new integrations.

| &nbsp; | OpenID Connect (OIDC) | Security Assertion Markup Language (SAML) |
| ------ | -------------------------- | ----------------------- |
| **High-level description** | OpenID Connect extends the OAuth 2.0 protocol to provide an ID token which can be used to verify a user’s identity and sign them into a cloud-based application. It is quickly becoming the new standard for SSO. | Security Assertion Markup Language (SAML) is an older protocol for authentication / SSO |
| **Ease of Implementation** | <span style="width: 150px;display:block">![Low](/img/ratings/low.png)</span> | <span style="width: 150px;display:block">![Medium](/img/ratings/medium.png)</span> |
| **Technology** |<span style="width: 24px;display:inline-block">![OpenID Connect](/img/idp-logos/oidc.png)</span> JSON-based with OAuth 2.0 |  <span style="width: 24px;display:inline-block">![OpenID Connect](/img/idp-logos/saml.png)</span> XML-based |
| **Benefits** | Newer protocol with widespread and growing usage. | Best Okta customer configuration experience. Ideal for mobile and cloud applications. Lightweight and REST-based. | Many people are familiar with SAML because it is an older protocol; Some apps may already have code implementing SAML|
| **Get started** | Build an Okta SSO integration with OIDC | Build an Okta SSO integration with SAML |

## Use case examples

### Example of a workforce user Single Sign-On journey with Okta

1. Ramon is starting his work day. In his web browser, he clicks on the Okta browser extension and selects his email app which loads in a new tab.
2. Ramon’s company has an Okta sign-on policy, which requires each employee to verify their identity every 12 hours. Since it’s been more than 12 hours since he was last working, he is prompted to enter his Okta username and password.
3. Ramon’s company has also enabled Okta multifactor authentication, so after successfully entering his credentials, a push notification is sent to the Okta Verify app on his phone. Ramon taps his phone to verify his identity. Ramon can now access his email!
4. Next, Ramon goes to his Okta browser extension and selects his customer relationship management app. Since Ramon started a session less than 12 hours ago, he is taken directly into the app without needing to sign-in again. In fact, Ramon can access all the Okta-integrated apps that he has privileges to without signing in again because he already has an authenticated session with Okta.

### Example of partner integration journey with Okta

Erika is an internal developer at Acme, a technology partner with Okta. Acme is looking to leverage the OIN as a way for their customers to adopt and incorporate Acme’s application to the customer’s existing Okta tenant. This will allow Acme’s customers to add Acme’s app to their existing identity infrastructure with minimal configuration. With the Acme app published in the OIN, Acme avoids additional integration resources and support for each individual customer.

1. Erika builds the Acme-Okta integration, doing the heavy lifting so that their customers don’t have to.
2. Erika submits the integration for Okta to verify and review.
3. After approval, Acme’s app is published on the OIN.

The next Acme customer that wants to add the OIN-published Acme app into their own workforce ecosystem, minimal effort is required for the integration. The customer already knows that they can trust the apps in the OIN to be securely incorporated into their existing Okta-managed SSO. The customer’s employees sign in to the Acme app with their existing Okta credentials and no additional Acme app registration is required.

## Next steps

Want to automate even more for your customers and increase adoption of your product? Learn more about lifecycle management integration?
