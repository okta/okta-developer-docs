---
title: User migration for Company X
---

# User migration for Company X

Learn how Company X planned their user migration strategy to apply the Directory Coexistence reference architecture.

> **Note:** While this content may contain facts and examples, all customer names and data details have been removed.

## Company overview

Company X is a Forbes Global 2000 company with 200,000 team members worldwide. It uses over 250 SaaS apps, 500 on-premises apps, and 400 cloud-native apps. These apps were supported by five legacy Identity and Access Management (IAM) systems and multiple Identity Providers (IdPs).

## The problem

CompanyX had a number of legacy IAM systems and newer IdPs that weren't designed to integrate with each other. The customer was seeing an increase in the number of support tickets related to user onboarding, offboarding, and account access issues. Because the IAM systems weren't synchronizing user credentials, changes to a password weren't consistently propagated to every system.

### Pain points

* Users needed multiple usernames and passwords to access company applications.
* User profiles weren't synchronized automatically across IAM systems. Administrators had to run scripts and update them manually.
* Single Sign-On (SSO) wasn't available between apps.
* Synchronizing users, groups, and roles across multiple IAM systems was difficult and error-prone.
* Each IAM system implemented policy-based access management differently. Consistency across all IAM systems was impossible.
* Onboarding and offboarding tasks were complex and caused significant issues.

## The solution

Company X decided to consolidate its user, group, and device profiles into [Okta Universal Directory](/docs/concepts/user-profiles/#what-is-the-okta-universal-directory) and use that as its sole IAM system and IdP. This answered the support tickets by requiring a single set of credentials for all users. Onboarding and offboarding processes became less complex as admins had only one centralized system. Finally, using a single directory realized additional benefits, such as [Okta Single Sign-On](/docs/guides/oin-sso-overview) (SSO) across its apps, centralized authentication policies, and lower maintenance costs for one system instead of five.

### Key challenges

Company X identified several key challenges in migrating their users to Universal Directory.

* **Different source IdPs**: User information was split across cloud-based (Microsoft Azure Active Directory) and on-premises IdPs (LDAP-based and proprietary). Each type of IdP would need its own migration process and tools.
* **Merging user profiles**: User profiles from multiple IdPs for the same user needed to be merged during the migration.
* **Maintaining uptime during migration**: The IT team wanted to maximize the uptime for the IAM solution during migration by keeping all user directories active as much as possible.
* **A transition period for applications**: The IT team needed a roadmap to migrate their apps to Universal Directory over time. Therefore they needed both legacy and new IdPs available for some time after migration.

### Architecture Implementation

Company X used the [Directory Coexistence architecture](/docs/reference/architecture-center/directory-coexistence) during its user migration process. This gave their IT team consistent access to both legacy IdPs and Universal Directory as they updated their applications to use Universal Directory as their primary IdP.

* The company installed an Okta AD Agent to mirror its users from their Azure AD user store to Okta Universal Directory. Universal Directory now acts as the single source of truth for those users. However, user passwords are still managed in Azure AD. The Agent mirrors any changes to a user back to Azure AD.
* The company installed an Okta LDAP Agent for each on-premises LDAP directory to mirror them to Okta Universal Directory. Universal Directory now acts as the single source of truth for those users. However, user passwords are still managed in the on-premises LDAP user store. The Agent mirrors any changes to a user back to the on-premises LDAP store.
* The company wrote a script using the [Okta Users API](/docs/reference/api/users) and the [password inline import hook](/docs/reference/password-hook) to import the users stored in their on-premises proprietary user databases into Universal Directory. Universal Directory now acts as the single source of truth for those users. This script worked only one way, and the proprietary IdP was disabled.
* The company opted for a **hybrid strategy** for each migration to Universal Directory. It migrated active users with a just-in-time strategy - users were migrated to Universal Directory if it existed in the original IdP but not Universal Directory. It migrated inactive users in bulk.
* The company updated each app to authenticate users with OpenID Connect (OIDC) rather than SAML or another solution. If an app existed already in the [Okta Integration Network](/docs/guides/okta-integration-network), they used that. If not, they reconfigured the app manually. This meant they could take full advantage of Okta's features and enable Single Sign-On, multifactor authentication, passwordless access, and more.

> **Note:** For details on how to implement the architecture, devise the strategy, and understand the key considerations, see [Directory Coexistence](/docs/reference/architecture-center/directory-coexistence) .
>
> For a more in-depth introduction to the protocols and different authorization flows you can implement in your applications, see [OAuth 2.0 and OpenID Connect Overview](/docs/concepts/oauth-openid).

## Key Benefits

The company saw the following key benefits after implementing the Directory Coexistence pattern and migrating its user base to Universal Directory.

* **A simplified end-user experience**: Company X could use Okta SSO for their apps, having centralized and consolidated user accounts to Universal Directory. Their users now need only to provide a single username and password once a session to access all their apps.
* **A streamlined IAM system**: After migration, Company X saw a massive drop in support tickets and a drastic increase in the speed of user onboarding, user  offboarding, and app integration.
* **Consistent and adaptive security policies**: By implementing Okta SSO, Company X protects their users with consistent security policies that adapt to changing behaviors. Built-in security tools, such as Okta Insights, help Company X take advantage of Okta's scale and automatically identify and block malicious sign-in attempts seen across their network.
* **Faster cloud deployment and on-premises integration**: The 7,000+ pre-built integrations in the Okta Integration Network helped Company X securely adopt and deploy SSO to cloud apps in weeks, not months, without building and maintaining the integrations themselves.

   Okta's cloud-based SSO service with 1,400+ SAML and OpenID Connect integrations, password vaulting, RADIUS and LDAP support, and connections to third-party legacy SSO solutions made it possible for Company X to use SSO for all its IAM systems.
* **Simplified user access auditing**: Company X was able to recieve real-time data within Okta so their IT team could troubleshoot and address SSO security issues immediately. They used pre-built reporting features to understand how end users interacted with their apps and highlight any potential security risks.
