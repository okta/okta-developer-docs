---
title: Overview of SSO in the OIN
meta:
  - name: description
    content: Learn how to build SSO app integrations for the Okta Integration Network.
---

The Okta Integration Network (OIN) is a collection of over 7000 pre-built app integrations to connect and exchange secure authentication between users, devices, and applications. Customers can easily integrate Okta Single Sign-On (SSO) to applications in the OIN with a guided experience that still supports the most secure configuration options.

To get your app integration into the OIN, build an app integration using a free [Okta developer account](https://developer.okta.com/signup/) and any of the wide array of [languages and libraries](/code/) supported by Okta. [Submit your app](/docs/guides/submit-app/) for verification and approval by the Okta OIN team. Once your app integration is Okta Verified, it's available in the OIN for the Okta community to use.

With an Okta SSO integration, your customer's workforce can use their company-issued Okta credentials to securely access your application. In addition to the typical email and password credentials, your customers have the ability to control their authentication experience with Okta sign-on policies and features, such as [Multifactor Authentication](https://help.okta.com/okta_help.htm?id=ext_MFA) and [FastPass](https://help.okta.com/okta_help.htm?type=oie&id=ext-fp-enable).

### Ready to get started?

Choose how you want to implement your SSO integration:

<Cards>
<Card href="/docs/guides/build-sso-integration/openidconnect/main/" headerImage="/img/idp-logos/oidc.png" cardTitle="OpenID Connect (OIDC)" :showFooter=false>Build an Okta SSO integration with OIDC</Card>

<Card href="/docs/guides/build-sso-integration/saml2/main/" headerImage="/img/idp-logos/saml.png" cardTitle="Security Assertion Markup Language (SAML)" :showFooter=false>Build an Okta SSO integration with SAML</Card>
</Cards>
<br>
Read further for reasons why you want to build an SSO integration for the OIN, choosing the right protocol, and use case examples.

## Why build an SSO integration with Okta?

| &nbsp; | &nbsp; |
| ------ | ------ |
| **Enhance security** | Integrating with Okta allows your customers to manage password strength and configure access policies for your application. For example, they may require employees to use multifactor authentication (such as push notification to their phone or SMS) in order to access your application from an unknown device. |
| **Deliver a strong end-user access experience** | Take away all the friction of managing usernames and passwords. Once authenticated through Okta, your users can access your application with a single click. |
| **Enterprise ready** | Your customers have a growing set of compliance needs that are continuously evolving. An Okta integration helps you meet compliance and audit requirements and shortens sales cycles. |
| **Ease of adoption** | For your enterprise customers that are already using Okta, they can add SSO to your application with minimal effort. All they have to do is add and configure your app through the integration catalog in Okta.|

## Choose your SSO protocol

Okta supports two protocols for handling federated SSO: OpenID Connect (OIDC) and Security Assertion Markup Language (SAML). The SSO protocol you choose to implement your integration is based on your app and use case. For new integrations, OIDC is recommended.

| &nbsp; |  OIDC | SAML  |
| ------ | :------------------- | :----------------------- |
| **Description** | [OpenID Connect](/docs/concepts/oauth-openid/#openid-connect) extends the OAuth 2.0 protocol to provide an ID token which can be used to verify a user’s identity and sign them into a cloud-based application. It's quickly becoming the new standard for SSO. | [Security Assertion Markup Language (SAML)](/docs/concepts/saml) is a traditional enterprise protocol for SSO in web applications. Okta supports SAML 2.0. |
| **Benefits** | <ul><li>Newer protocol with widespread and growing usage</li> <li>Best Okta customer configuration experience</li> <li>Ideal for mobile and cloud applications</li> </ul> | <ul><li>Many people are familiar with SAML because it is an older protocol</li> <li>Widely used federation protocol for SSO in Web applications</li> <li>Many SaaS providers support SAML integration to grant SSO access to end users</li></ul>|
| **Technology** | <ul><li>An identity layer on top of the [OAuth 2.0](https://oauth.net/2/) protocol</li> <li>Verifies end-user identity and obtains profile information</li> <li>Lightweight and REST-based</li></ul> |   <ul><li>XML-based messages</li> <li>Specification doesn’t have user consent, although it can be built into the flow</li> </ul> |
| **Resources** | <ul><li>[OpenID Connect Foundation](https://openid.net/connect/)  </li></ul>| <ul><li>[SAML 2.0 Technical Overview](http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html) </li></ul> |
| **Get started** | <ul><li>[Build an Okta SSO integration with OIDC](/docs/guides/build-sso-integration/openidconnect/main/)  </li></ul>| <ul><li>[Build an Okta SSO integration with SAML](/docs/guides/build-sso-integration/saml2/main/) </li></ul> |

## Use case examples

### Example of a workforce user Single Sign-On journey with Okta

1. Ramon is starting his work day. In his web browser, he clicks on the Okta browser extension and selects his email app which loads in a new tab.
2. Ramon’s company has an Okta sign-on policy, which requires each employee to verify their identity every 12 hours. Since it’s been more than 12 hours since he was last working, he is prompted to enter his Okta username and password.
3. Ramon’s company has also enabled Okta multifactor authentication, so after successfully entering his credentials, a push notification is sent to the Okta Verify app on his phone. Ramon taps his phone to verify his identity. Ramon can now access his email!
4. Next, Ramon goes to his Okta browser extension and selects his customer relationship management app. Since Ramon started a session less than 12 hours ago, he is taken directly into the app without needing to sign-in again. In fact, Ramon can access all the Okta-integrated apps that he has privileges to without signing in again because he already has an authenticated session with Okta.

### Example of a partner integration journey with Okta

Erika is an application developer at Acme, a technology partner with Okta. Acme is looking to leverage the OIN as a way for their customers to adopt and incorporate Acme’s application to the customer’s existing Okta tenant. This will allow Acme’s customers to add Acme’s app to their existing identity infrastructure with minimal configuration. 

#### Actions

1. Erika builds the Acme-Okta integration, doing the heavy lifting so that their customers don’t have to.
2. Erika submits the integration for Okta to verify and review.
3. After approval, Acme’s app is published on the OIN.

In addition, with a pre-built Acme-Okta integration, Acme avoids additional support staff required for each individual customer integration.

### Example of an identity admin journey with Okta

Initech is a company that is looking to add Acme's application into their existing Okta identity infrastructure.

1. Ray is an admin at Initech and finds the Acme app in the OIN catalog. Since Acme is in the OIN, Ray knows that he can trust Acme to be securely incorporated into their existing Okta-managed SSO with minimal integration effort required.

2. Ray adds the Acme app integration in the Okta Admin Console. Ray follows the instructions provided by Acme to configure the app integration.

3. Ray configures the Okta authentication policy and the group of Initech employees with access to the Acme app.

4. Ray tests signing in to the Acme app with existing Okta credentials to verify the authentication flow.

Initech's group of employees with privileged access can sign in to the Acme app with their existing Okta credentials and no additional Acme app registration is required.

## Next steps

After your app integration is built and tested, submit the integration to the Okta OIN team for verification:

<Cards>
<Card href="/docs/guides/submit-app/" headerImage="/img/oin/Okta_OIN_Blue_RGB.svg" :showFooter=false>Publish an OIN integration</Card>
</Cards>
<br>

Want to automate even more for your customers and increase adoption of your product? Learn more about [lifecycle management integration](/docs/guides/oin-lifecycle-mgmt-overview/) in the OIN.

