---
title: Overview of SSO in the OIN
meta:
  - name: description
    content: Learn how to build SSO app integrations for the Okta Integration Network.
---

With an Okta Single Sign-On (SSO) integration, your users can use their company-issued Okta credentials to securely access your application. In addition to the typical email and password cred)Okta is also releasing [FastPass](https://www.okta.com/fastpass/) which allows employees to sign-on without a password on company-managed devices.

## Why build an SSO integration with Okta?

| Enhance security | Deliver a strong end-user access experience | Enterprise ready | Ease of adoption |
| ---------------- | ---------------- | -------- | ----------------- |
|Integrating with Okta allows your customers to manage password strength and configure access policies for your application. For example, they may require employees to use multi-factor authentication (push notification to their phone, SMS, etc) in order to access your application from an unknown device. | Take away all the friction of managing usernames and passwords. Once authenticated through Okta, your users can access your application with a single click. | Your customers have a growing set of compliance needs that are continuously evolving. Okta integration helps you meet compliance and audit requirements and shortens sales cycles. | For your enterprise customers that are already using Okta, they can add SSO to your application with minimal effort. All they have to do is add your app through the integration catalog in Okta. |


## Choose your SSO protocol

Okta supports two protocols for handling federated SSO: OIDC and SAML. Choose the SSO protocol based on your app and use case. For new integrations, OIDC is recommended.

| **Protocol** | <span style="width: 24px;display:inline-block">![OpenID Connect](/img/idp-logos/oidc.png)</span> OpenID Connect (OIDC) | <span style="width: 24px;display:inline-block">![SAML 2.0](/img/idp-logos/saml.png)</span> Security Assertion Markup Language (SAML) |
| ------ | ----------------------- | ----------------------- |
| **Description** | [OpenID Connect](/docs/concepts/oauth-openid/#openid-connect) extends the OAuth 2.0 protocol to provide an ID token which can be used to verify a user’s identity and sign them into a cloud-based application. It's quickly becoming the new standard for SSO. | [Security Assertion Markup Language (SAML)](/docs/concepts/saml) is a traditional enterprise protocol for SSO in web applications. Okta supports SAML 2.0. |
| **Technology** | <ul><li>An identity layer on top of the [OAuth 2.0](https://oauth.net/2/) protocol</li> <li>Verifies end-user identity and obtains profile information</li> <li>Lightweight and REST-based</li></ul> |   <ul><li>XML-based messages</li> <li>Specification doesn’t have user consent, although it can be built into the flow</li> </ul> |
| **Benefits** | <ul><li>Newer protocol with widespread and growing usage</li> <li>Best Okta customer configuration experience</li> <li>Ideal for mobile and cloud applications</li> </ul> | <ul><li>Many people are familiar with SAML because it is an older protocol</li> <li>Widely used federation protocol for SSO in Web applications</li> <li>Many SaaS providers support SAML integration to grant SSO access to end users</li></ul>|
| **Ease of Implementation** | <span style="width: 150px;display:block">![Low](/img/ratings/low.png)</span> | <span style="width: 150px;display:block">![Medium](/img/ratings/medium.png)</span> |
| **Get started** | [Build an Okta SSO integration with OIDC](/docs/guides/build-sso-integration/openidconnect/main/) | [Build an Okta SSO integration with SAML](/docs/guides/build-sso-integration/saml2/main/) |

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
