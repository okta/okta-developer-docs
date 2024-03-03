---
title: Authentication factors
---
# Authentication factors

Your IAM solution must ensure that only legitimate users can access your applications and resources, and all other access attempts are blocked. It must authenticate every access attempt and reliably distinguish between approved and unapproved users. This includes actors who are using someone else's valid credentials. Your design challenge is to meet these objectives while achieving the best possible balance between security protection, cost, and user friendliness.

See [**IAM Terminology**](/docs/concepts/iam-overview-iam-terminology/) for definitions of some terms and concepts used in this article.

Consider support for the following in the design of your authentication facilities:

- Services that verify a user's identity and send the user's information to your applications. Consider basing them on the *OpenID Connect (OIDC)* protocol standard and on *Security Assertion Markup Language (SAML)* for compatibility with other Identity Providers. Both provide very high security.

- *Single Sign-On (SSO)* to allow users to sign in and access multiple related applications without signing in again. This enhances user satisfaction and reduces admin workload.

- *Federated Identity Management (FIM)* to extend SSO benefits to social media and other external Identity Providers. It has the same benefits as SSO, plus it allows users to use their existing social media or external sign-in credentials.

- A range of methods for authenticating users including multifactor authentication (MFA).

- Policies that allow admins to centrally manage how different sets of users are authenticated. This streamlines administration, and decouples policy decisions from your apps to simplify your app designs, development, and maintenance.

- Provisions for your customers and partners to manage and support their own users and manage authentication options they can control, reducing your admin workload. You and your customers can use common admin interfaces by limiting what functions and data different customer admins can see and use. Examples might include facilities for resetting passwords and reporting IAM authentication data for their accounts.

- Provisions for your admins to manage and support your users and manage authentication policies for your users and customers. Examples might include the facilities listed for customer admins above for your domain, plus supporting customers and customer admins, and creating, configuring, and administering customer policies.

- APIs and SDKs that allow all elements of your IAM solution, your applications, and other consumers to access authentication functions and data as authorized.

## How Okta can help

Use these Okta features to address the authentication challenges listed above.

### Single Sign-On and federated identity management

Use Okta's *Single Sign-On (SSO)* facilities to enable your users to sign in once and access multiple related applications and services without having to sign in again. This streamlines their sign-in flows and reduces your admin workload.

SSO is a key Okta capability, along with *federated identity management (FIM)*. The two are similar and frequently spoken of together. With SSO, an authenticated user is granted secure access to multiple related applications using the same sign-in credentials and authentication factors. FIM applies SSO techniques to external customers, partners, and social media systems. It has the same benefits as SSO. It allows users to sign in with their external credentials, can lead to elimination of redundant data and systems, and can reduce your partner companies' IT and support costs.

**Notes:**

1. Users must be authenticated to the system with the right level of credentials for the resource that they are requesting. This can be on the basis of the resource itself or on a variety of risk factors that must be taken into account.

2. The main difference between SSO and FIM is in the range of access. SSO allows users to access multiple apps within a single organization or domain with a single set of credentials. FIM allows users to access apps across federated organizations. From a design perspective, FIM moves responsibility for authenticating users to external IdPs. This requires an additional layer of external user identity, external IdP, user-IdP relationship data, and external IdP interface and communications support, all of which Okta provides. (SSO is a FIM function, but supporting SSO doesn't necessarily allow for federated identity management.)

Use Okta facilities to minimize the time, effort, cost, and risks for developing, maintaining, and supporting SSO and FIM solutions.

Learn more:

- [What Is Single Sign-On (SSO)?](https://www.okta.com/blog/2021/02/single-sign-on-sso/) describes SSO, how it works, different types, benefits and challenges, and other related topics.

- [What Is Federated Identity?](https://www.okta.com/identity-101/what-is-federated-identity/) elaborates on Federated Identity authentication, and how it works.

- [Federated Identity Management vs. Single Sign-On: What's the Difference?](https://www.okta.com/uk/identity-101/federated-identity-vs-sso/) describes SSO and FIM, and compares the two.

### External Identity Providers

Okta supports authentication by external IdPs such as social media and partner systems. Use IdPs to make it easier for users with accounts on external systems to sign in and register. IdPs help avoid requiring a special sign-in ID for your apps and improve customer satisfaction. They can also capture reliable user demographic data and reduce your admin workload.

When you use Okta's external IdP support facilities:

- Your applications only interface with Okta, and Okta handles the rest. Your applications use OIDC to connect to Okta, and Okta handles IdP communications transparently.

- All users are stored in Okta, including user profile data received from the IdPs.

- User profile updates, which are made at the IdPs, are automatically picked up the next time the users sign in to your app with their IdP credentials.

- You can have multiple external IdPs. You can allow users to choose between any IdPs that they have accounts with when they sign in or create logic to select which IdP to use.

Learn more:

- [External Identity Providers](/docs/concepts/identity-providers/) describes how Okta supports social media networks and other external IdPs.

### Authentication protocols

For users to sign in with their external IdP credentials, you must forward their sign-in requests to the appropriate IdP using its interface protocol. The main authentication protocols that Okta supports are:

- **OpenID Connect (OIDC)**. See [OAuth 2.0 and OpenID Connect overview](/docs/concepts/oauth-openid/) for a high-level introduction to these protocols.

- **Security Assertion Markup Language (SAML)**. See [SAML app integrations](https://help.okta.com/okta_help.htm?id=ext-apps-about-saml) for how you can use Okta as an Identity Provider or a Service Provider using SAML.

- **WS-Federation (WS-Fed)** is typically used to sign in to legacy Windows-based web apps and Office 365. See [WS-Fed app integrations](https://help.okta.com/okta_help.htm?type=oie&id=ext-apps-about-wsfed).

- **Secure Web Authentication (SWA)** provides a single sign-on capability to external applications that don't support federated sign-on methods such as SAML, OIDC, and WS-Fed. It works with any web-based app. See [SWA app integrations](https://help.okta.com/okta_help.htm?id=ext-apps-about-swa) for how to use SWA to set up SSO access to an application.

### Authentication methods

There are a variety of strategies and technologies for authenticating users that have different trade-offs between security, cost, and user friendliness. With Okta, you can choose as many as you need, including:

- **Single factor authentication:** Use a single method of identification such as a password, PIN, or PIV card. (Note: A password is the most common and the least secure of these methods.)

- **2nd factor authentication (2FA):** Require a password and possession of a physical object, such as a one-time passcode sent to or generated on the user's mobile device.

- **Universal 2nd factor authentication (U2F):** Rely on a password and a special physical device for 2FA. Examples are a token plugged into the user device's USB port or a smart card.

- **Passwordless authentication:** This is similar to 2FA, except the user uses a highly secure factor, such as a fingerprint or facial recognition, in lieu of a password.

- **Multifactor authentication (MFA):** Require the user to supply at least two or three types of evidence that they are who they claim to be: they know something only the user knows, have something only the user has, or are the user (such as by passing a fingerprint or facial recognition test). You can employ *Adaptive MFA* techniques to adjust the factors based on perceived risks. (See *risk-based authentication* below.)

- **Risk-based authentication (RBA):** Evaluate the risk of an authentication request and adjust your MFA factors accordingly. Your risk assessment can use any factors, including dynamic factors such as whether the user is signing in from a familiar device, at an unusual time of day, or using a possibly compromised subnet or host. You can use this strategy to reduce the number of challenge factors when the risk appears low or increase the number when the risk appears higher. This achieves the best possible balance between high security and user experience. RBA is also called *adaptive authentication* or *context-based authentication*.

- **Biometric authentication:** Rely on a physical characteristic of the user, such as a fingerprint or a retinal scan, to identify them. This is extremely secure and doesn't require the user to have a special token. With this technique, you may not need the user to supply a password, although authentication is more secure if you do.

- **Transaction authentication:** Rely on a password and information about or from the user, such as their IP address or mother's maiden name.

- **Computer recognition authentication:** Verify a user by confirming that they are signing in from a managed device. This works by checking a cryptographic device marker that is installed on the device when the user first signs in.

- **Social media and external Identity Provider (IdP) authentication:** Allow users to sign in using their external credentials and not need a special ID for your apps. This enhances user satisfaction and reduces your admin workload.

- **Bot detection:** This isn't an authentication method per se. Use it to filter out requests from bots as a first step in preventing automated attacks. CAPTCHA is an example.

Okta can substantially reduce your development and maintenance costs and risks for supporting these and other methods.

Learn more:

- [Multifactor authentication (MFA)](https://help.okta.com/okta_help.htm?id=csh-mfa-home) briefly describes MFA and has links to information about configuring it, enrollment policies, app-level MFA, and more.

- [Risk-Based Authentication: What You Need to Consider](https://www.okta.com/identity-101/risk-based-authentication/) provides an overview of risk-based authentication and describes Okta's approach.

- [Risk Scoring](https://help.okta.com/okta_help.htm?id=csh-risk-scoring) elaborates on Okta's risk processing.

- [About Okta ThreatInsight](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-threatinsight) describes how this product helps prevent credential-based attacks. Okta's ThreatInsight product uses data from the analyses of authentication requests made to thousands of Okta organizations and Okta authentication endpoints to identify suspicious IP addresses. See [Okta ThreatInsight Whitepaper](https://www.okta.com/resources/whitepaper/okta-threatinsight/).

### Authentication policies

Choose from a variety of Okta [policies](#okta-policies) to manage users, including a [sign-on policy](#okta-sign-on-policies) to control how to authenticate a particular set of users.

#### Okta policies

An *Okta policy* is a set of rules and conditions that help you manage your users, such as restricting access to members of a certain group or requiring additional authentication factors to access a sensitive app. You can create any number of policies, each of which has one or more rules. Policies are evaluated when a request is processed to determine if it should be accepted. Policies have conditions that determine whether to apply them, and rules have conditions that determine whether and how to apply the policy.

Policies are centralized and decoupled from your applications. This simplifies your app designs, development, and maintenance, and makes it easier for admins to manage how Okta handles different types of user requests in different situations.

To illustrate the use of policies, your admins, customer admins, and end users typically have different sign-in criteria because of differences in their roles. You can use policies to control their sign-in flows. More complicated examples might include policies that shape IAM behavior based on the type of user (such as full-time employee, contractor, or outside partner), organization, department, device type, network, and so on.

Okta supports a number of different policy types. Read [What are policies](/docs/concepts/policies/) to learn what they are, how they work, and their main use cases.

Learn more:

- [What are policies](/docs/concepts/policies/)
- [About Okta sign-on policies](https://help.okta.com/okta_help.htm?id=ext_secpol_poleval) briefly describes sign-on policies, and elaborates on how Okta policies are evaluated.

**Next step: [Authorization factors](/docs/concepts/iam-overview-authorization-factors/).**
