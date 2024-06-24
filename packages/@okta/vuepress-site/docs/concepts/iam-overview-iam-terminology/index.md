---
title: IAM terminology
---

# IAM terminology

- **Access control:** Grant or deny individual requests to view or update a restricted resource. Access is based on the resource, the nature of the request, whether the user is authenticated, the user's authorization, relevant policies, and other data. (Access control is part of *authorization*.) The term access control can also refer broadly to IAM. See [What Is Access Control & How Crucial Is It to Cybersecurity?](https://www.okta.com/identity-101/access-control/)

- **Authentication:** Processes and services to prove the claimed identity of an individual user, machine, software component, or any other entity. Typical authentication mechanisms include conventional password schemes, biometric devices, cryptographic methods, and one-time passcodes. See [The Ultimate Authentication Playbook](https://www.okta.com/blog/2019/02/the-ultimate-authentication-playbook/).

- **Authorization:** Processes and services to define what resources a given user is allowed to access and what functions they're allowed to perform with them. Authorization also includes *Access control*. See [Authorization](/books/api-security/authz/) and [Authentication vs. Authorization](https://www.okta.com/identity-101/authentication-vs-authorization/).

- **Bot detection:** Techniques used to identify whether a user is human or a bot (short for *robot*, an automated process). See [Okta + Shape Security: Taking on Automated Login Attacks, Account Takeover and Fraud](https://www.okta.com/blog/2018/12/okta-shape-security-taking-on-automated-login-attacks-account-takeover-and-fraud/) and [Bot Management Definition, Strategies & Best Practices](https://www.okta.com/identity-101/bot-management/).

- **CIAM (Customer Identity and Access Management):** An IAM model for managing customers, partners, and other external access to your resources, as well as employees and contractors. These systems need to be easy for customers to use, as their goal is to increase revenue and customer engagement.

- **Compliance:** Procedures and facilities for ensuring that an application meets specific regulatory requirements for privacy and with industry and local cybersecurity standards. Examples are the European Union's [General Data Protection Regulation (GDPR)](https://gdpr-info.eu/), the Health Insurance Portability and Accountability Act (HIPAA), PCI, PII, and SOX. See [Okta Compliance & Security Documentation for Customers](https://support.okta.com/help/s/article/okta-compliance?language=en_US).

- **Directory:** A platform service that allows you to store users, credentials, and metadata about users and machine entities. The service allows admins to create, modify, and authenticate users, as well as sync users to other application directories. See [Universal Directory](https://www.okta.com/products/universal-directory/).

- **Entitlement Management:** A technology that grants, resolves, enforces, revokes, and administers fine-grained access entitlements. This is also called "authorizations," "privileges," "access rights," "permissions," and/or "rules". Its purpose is to execute IT access policies to structured/unstructured data, devices, and services. Entitlement management can be delivered by different technologies and is often different across platforms, applications, network components, and devices. There are coarse-grained and fine-grained entitlements. See [Entitlement Management Identity Governance Explained](https://www.okta.com/identity-101/entitlement-management-identity-governance-explained).

- **Federation:** A group of Service Providers who agree on standards for sharing identity information among multiple entities and across trust domains. These tools and standards permit identity attributes to be transferred from one trusted identifying and authenticating entity to another for authentication, authorization, and other purposes. This provides Single Sign-On (SSO) convenience to identified individuals and Identity Providers. See [What Is Federated Identity?](https://www.okta.com/identity-101/what-is-federated-identity/)

- **FIM (Federated Identity Management):** A strategy for linking user identities across federated Identity Providers. It provides an SSO capability for these IdPs and has the same benefits as SSO, but applies across domain boundaries to customers, partners, and social networks. It allows users to access your apps with their existing external sign-in IDs. See [Federated Identity Management vs. Single Sign-On: What's the Difference?](https://www.okta.com/uk/identity-101/federated-identity-vs-sso)

- **IAM (Identity and Access Management):** A framework of policies and technologies to ensure that the right people get access to the right resources. This is achieved first by confirming that users are who they say they are, and then by restricting the resources they can see and use.

- **Identity:** The collection of data about an individual, such as their name, address, username and password, bank account number, health records, and other highly sensitive information. It identifies an individual and is used to authenticate and authorize their access to your resources.

- **Identity Proofing:** Services that verify people's identities before the enterprise issues them accounts and credentials. These services are based on "life history" or transaction information aggregated from public and proprietary data sources. The services are also used as an additional interactive user authentication method, especially for risky transactions, such as accessing sensitive information or transferring funds to external accounts. Identity-proofing services are typically used when accounts are provisioned over the web or in a call center. However, they can also be used in face-to-face interactions.

- **MFA (Multifactor Authentication):** A method for securely verifying a user's identity by requiring them to supply at least two types of evidence that they're who they claim to be: they know something only the user knows, have something only the user has, or are the user (such as by passing a fingerprint or facial recognition test). See [What Is Multifactor Authentication (MFA)?](https://www.okta.com/blog/2021/08/multi-factor-authentication-mfa/) and [Multifactor Authentication (MFA)](https://help.okta.com/okta_help.htm?id=csh-mfa-home).

- **OAuth (Open Standard Authentication):** A commonly used open standard for authorizing access to resources without exposing passwords. It's more secure than approaches that pass passwords or other identifying information. Okta bases authorization on OAuth 2.0. See [OAuth 2.0 and OpenID Connect overview](/docs/concepts/oauth-openid/).

- **OIDC (OpenID Connect):** An authentication layer on top of OAuth 2.0. It allows a user's identity to be securely authenticated by an authorization server that returns basic profile information about the user over a REST API. Okta bases its authentication on OIDC or SAML, depending on the IdP. See [OAuth 2.0 and OpenID Connect Overview](/docs/concepts/oauth-openid/).

- **Policy:** A set of rules and conditions that help you manage your users, such as restricting access to members of a certain group or requiring more authentication factors to access a sensitive app. See [Policies](/docs/concepts/policies/).

- **Profile:** The data record where information about an individual user, group, or other entity is stored. A typical profile contains attributes such as the type of profile, a name, and other profile type-specific data. See [User profiles](/docs/concepts/user-profiles/) and [Work with profiles and attributes](https://help.okta.com/okta_help.htm?id=ext_Directory_Manage_Profile_Attributes).

- **Progressive profiling:** Incrementally add information to user profiles or have Okta request more info after users register. Use it to require less data when users register and collect reliable user demographic data later. You can also use it to collect more data if profile requirements change, such as if an application requires new app profile data. See [How to Use Progressive Profiling as a Privacy Tool](https://www.okta.com/blog/2019/02/how-to-use-progressive-profiling-as-a-privacy-tool/).

- **RBA (Risk-Based Authentication):** A dynamic authentication method in which you evaluate the risk of an authentication request and adjust your MFA challenge factors accordingly. Your risk assessment can use any factors. This includes factors such as whether the user is signing in from a familiar device, at an unusual time of day, or using a possibly compromised subnet or host. You can use this strategy to reduce the number of challenge factors when the risk appears low or increase the number when the risk appears higher. This achieves the best possible balance between high security and user experience. RBA is also called *adaptive authentication* or *context-based authentication*. See [Risk-Based Authentication: What You Need to Consider](https://www.okta.com/identity-101/risk-based-authentication/).

- **Role:** An attribute assigned to a user that grants them a specific set of access privileges. Everyone who holds a given role has the privileges associated with the role.  See [Role Based Access Control](https://www.okta.com/identity-101/what-is-role-based-access-control-rbac/) and [Role assignment](/docs/concepts/role-assignment/) in Okta.

- **SAML (Security Assertion Markup Language):** An open standard for securely exchanging authentication data between an Identity Provider and a Service Provider. Okta bases its authentication on OAuth 2.0 or SAML, depending on the IdP. See [SAML](/docs/concepts/saml/).

- **SCIM (System for Cross-domain Identity Management):** An open standard for communicating and managing user identity information. It defines a schema for representing users and groups, and a REST API for running CRUD *(Create, Read, Update, or Disable)* operations on them. Okta bases its identity management and communications on SCIM. See [Understanding SCIM](/docs/concepts/scim/).

- **Self-service:** End users can self-administer their accounts. This includes account creation, password reset, and requesting access to resources. See [Enable Self Service request feature](https://help.okta.com/okta_help.htm?type=oie&id=ext-apps-selfservice-configureorg).

- **Social media and external Identity Provider (IdP) authentication:** Allow users to sign in using their external credentials and not need a special ID for your apps. They enhance user satisfaction and reduce your admin workload. See [External Identity Providers](/docs/concepts/identity-providers/).

- **Single Sign-On (SSO):** A strategy for enabling users to sign in once and access multiple related applications and services within an organization or domain without having to sign in again. SSO is sometimes used to include *FIM* capabilities. See [Single Sign-On (SSO)](https://www.okta.com/topic/single-sign-on/) and [Federated Identity Management vs. Single Sign-On: What's the Difference?](https://www.okta.com/uk/identity-101/federated-identity-vs-sso)

- **WF (Workforce identity):** An IAM model for managing employee and contractor access to your organization's apps and resources. Its main goal is to manage risk.

- **WS-Fed (WS-Federation):** An XML-based protocol used for SSO. It's typically used to sign in to legacy Windows-based web applications and Microsoft Office 365, where Okta acts as an authorization server or Identity Provider. See [WS-Fed app integrations](https://help.okta.com/okta_help.htm?type=oie&id=ext-apps-about-wsfed).

- **Zero Trust:** An architectural security strategy that is based on the principles of least-privilege access controls and strict user authentication or "never trust, always verify." It requires all users to be authenticated, authorized, and continuously validated before being granted or keeping access to applications and data. Okta features help you architect, design, and build zero trust applications. See [What is Zero Trust Security?](http://okta.com/blog/2019/01/what-is-zero-trust-security/)
