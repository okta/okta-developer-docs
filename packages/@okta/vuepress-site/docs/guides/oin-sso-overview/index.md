---
title: Overview of SSO in the OIN
meta:
  - name: description
    content: Provides a high level overview of SSO app integrations for the Okta Integration Network.
---

The Okta Integration Network (OIN) is a collection of over 7000 pre-built app integrations to connect and exchange secure authentication between users, devices, and applications. Customers can easily integrate Okta Single Sign-On (SSO) to applications in the OIN with a guided experience that still supports the most secure configuration options.

To get your app integration into the OIN, [build an app integration](/docs/guides/build-sso-integration/) using a free [Okta developer account](https://developer.okta.com/signup/) and any of the wide array of [languages and libraries](/code/) supported by Okta. [Submit your app](/docs/guides/submit-app/) integration for verification and approval by the Okta OIN team. Your app is available in the OIN for the Okta community to use after your integration is verified by Okta.

With an Okta SSO integration, your customer's workforce can use their company-issued Okta credentials to securely access your application. In addition to the typical email and password credentials, your customers have the ability to control their authentication experience with Okta sign-on policies and features, such as [Multifactor Authentication](https://help.okta.com/okta_help.htm?id=ext_MFA) and [FastPass](https://help.okta.com/okta_help.htm?type=oie&id=ext-fp-enable).

## Why build an SSO integration with Okta?

| &nbsp; | &nbsp; |
| ------ | ------ |
| **Enhance security** | Integrating with Okta allows your customers to manage password strength and configure access policies for your application. For example, they may require employees to use multifactor authentication (such as a push notification to their phone or SMS) to access your application from an unknown device. |
| **Deliver a strong end-user access experience** | Take away all the friction of managing usernames and passwords. After users authenticate through Okta, they can access your application with a single click. |
| **Enterprise ready** | Your customers have a growing set of compliance needs that are continuously evolving. An Okta integration helps you meet compliance and audit requirements and shortens sales cycles. |
| **Ease of adoption** | Your customers can add SSO integration to your OIN-published app with minimal effort. They use Okta to add and configure your app integration into their identity ecosystem without extensive support from your customer service resources. Their workforce can access your app within hours of integration and policy configurations. |

## Choose your SSO protocol

Okta supports two protocols for handling federated SSO: OpenID Connect (OIDC) and Security Assertion Markup Language (SAML). The SSO protocol that you choose to implement your integration with is based on your app and use case. For new integrations, OIDC is recommended.

| &nbsp; |  <span style="width: 24px;display:inline-block">![OIDC](/img/idp-logos/oidc.png)</span> OIDC | <span style="width: 22px;display:inline-block">![SAML](/img/idp-logos/saml.png)</span> SAML  |
| ------ | :------------------- | :----------------------- |
| **Description** | [OpenID Connect](/docs/concepts/oauth-openid/#openid-connect) extends the OAuth 2.0 protocol to provide an ID token that can be used to verify a user’s identity and sign them into a cloud-based application. It's quickly becoming the new standard for SSO. | [Security Assertion Markup Language (SAML)](/docs/concepts/saml) is a traditional enterprise protocol for SSO in web applications. Okta supports SAML 2.0. |
| **Benefits** | <ul><li>Newer protocol with widespread and growing use</li> <li>Best Okta customer configuration experience</li> <li>Ideal for mobile and cloud applications</li> </ul> | <ul><li>Many people are familiar with SAML because it's an older protocol</li> <li>Widely used federation protocol for SSO in Web applications</li> <li>Many SaaS providers support SAML integration to grant SSO access to end users</li></ul>|
| **Technology** | <ul><li>An identity layer on top of the [OAuth 2.0](https://oauth.net/2/) protocol</li> <li>Verifies end-user identity and obtains profile information</li> <li>Lightweight and REST-based</li></ul> |   <ul><li>XML-based messages</li> <li>Specification doesn’t have user consent, although it can be built into the flow</li> </ul> |
| **Resources** | <ul><li>[OpenID Connect Foundation](https://openid.net/connect/)  </li></ul>| <ul><li>[SAML 2.0 Technical Overview](http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html) </li></ul> |
| **Get started** | <ul><li>[Build an Okta SSO integration with OIDC](/docs/guides/build-sso-integration/openidconnect/main/)  </li></ul>| <ul><li>[Build an Okta SSO integration with SAML](/docs/guides/build-sso-integration/saml2/main/) </li></ul> |

## Use case examples

### Example of a partner integration journey with Okta

Erika is an application developer at Acme, a technology partner with Okta. Acme is looking to leverage the OIN as a way for their customers to adopt and incorporate Acme’s application to the customer’s existing Okta tenant. This allows Acme’s customers to add Acme’s app to their existing identity infrastructure with minimal integration resources.

Erika performs the following tasks:

* Builds the Acme-Okta integration, doing the heavy lifting so that their customers don’t have to.
* Documents the required configuration steps for the customer admin.
* Submits the integration and corresponding documentation for the Okta OIN team to verify and review.

After approval, Acme’s app is published on the OIN. With a pre-built Acme-Okta integration, Acme avoids additional support staff required for each individual customer integration.

### Example of an identity admin journey with Okta

Ali is an IT admin at Initech. Initech is looking to add Acme's application into their existing Okta identity infrastructure.

Ali performs the following tasks:

* Finds the Acme app in the OIN catalog. Since Acme is in the OIN, Ali knows that he can trust Acme to be securely incorporated into their existing Okta-managed SSO with minimal integration effort required.
* Adds the Acme app integration from the Okta Admin Console.
* Follows the instructions provided by Acme to configure the app integration.
* Configures the Okta authentication policy and the group of Initech employees who will have access to the Acme app.
* Tests signing in to the Acme app with existing Okta credentials to verify the authentication flow.

Initech's group of employees with privileged access can sign in to the Acme app with their existing Okta credentials and no additional Acme app registration is required.

### Example of a workforce user Single Sign-On journey with Okta

Ramon is an Initech employee with privileges to the Acme app. Follow his Single Sign-on journey:

* Ramon starts his work day. In his web browser, he clicks the Okta browser extension and selects his email app, which loads in a new tab.
* Initech has an Okta global session policy, which requires each employee to verify their identity every 12 hours. Since it’s been more than 12 hours since he was last working, Ramon is prompted to enter his Okta username and password.
* Initech has also enabled Okta multifactor authentication. After successfully entering his credentials, a push notification is sent to the Okta Verify app on his phone. Ramon taps his phone to verify his identity. He can now access his email.
* Next, Ramon goes to his Okta browser extension and selects the Acme app. Since he started a session less than 12 hours ago, he is taken directly into the app without needing to sign in again. In fact, Ramon can access all the Okta-integrated apps that he has privileges to without signing in again because he already has an authenticated session with Okta.

## Next steps

Ready to get started? Choose how you want to implement your SSO integration:

<Cards>
<Card href="/docs/guides/build-sso-integration/openidconnect/main/" headerImage="/img/idp-logos/oidc.png" cardTitle="OpenID Connect (OIDC)" :showFooter=false>Build an Okta SSO integration with OIDC</Card>

<Card href="/docs/guides/build-sso-integration/saml2/main/" headerImage="/img/idp-logos/saml.png" cardTitle="Security Assertion Markup Language (SAML)" :showFooter=false>Build an Okta SSO integration with SAML</Card>
</Cards>
<br>

After your app integration is built and tested, [submit the integration](/docs/guides/submit-app/) to the Okta OIN team for verification through the OIN Manager.

Want to automate even more for your customers and increase adoption of your product? Learn more about [lifecycle management integration](/docs/guides/oin-lifecycle-mgmt-overview/) in the OIN.
