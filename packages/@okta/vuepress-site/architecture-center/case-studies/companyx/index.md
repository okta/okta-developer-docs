---
layout: Landing
title: User migration for Company X
---

# User migration for Company X

Learn how Company X benefited from applying the directory coexistence reference architecture in their user migration strategy.

> **Note:** While this content may contain facts and examples, all customer names and data details have been removed.

## Company overview

Company X is a Forbes Global 2000 company with 200,000 team members worldwide. It uses over 250 SaaS apps, 500 on-premises apps, and 400 cloud-native apps. These apps were supported by five legacy Identity and Access Management (IAM) systems and multiple Identity Providers (IdPs).

## Related reference architecture

<figure class="main-card">
  <img
    class="main-card__image"
    src="/img/architecture/thumbs/usermgmt.png"
    alt="UserManagement"
  >
  <figcaption class="main-card__body">
    <h2 class="main-card__title">
      <a
        class="main-card__main-link"
        href="/architecture-center/reference-architectures/directory-coexistence/"
      >
        Directory Coexistence
      </a>
    </h2>
    <div class="main-card__wrapper">
      <span class="main-card__tag">
        Architecture paper
      </span>
      <span class="main-card__tag">
        User migration
      </span>
      <span class="main-card__tag">
        Universal Directory
      </span>
    </div>
    <p class="main-card__text">
      Minimize downtime while migrating user, group, and device profiles to Okta Universal Directory by keeping both source and target directories active during the process. <a class="main-card__link" href="/architecture-center/reference-architectures/directory-coexistence/">Learn more</a>
    </p>
  </figcaption>
</figure>

## The problem

The company's legacy IAM systems and newer IdPs weren't interacting well. The number of support tickets related to user onboarding and offboarding was increasing. So were the number of tickets from those users struggling to sign in because the IAM systems weren't synchronizing user credentials between them. Changing a password on one app would change the password for other apps using the same IAM system but the change might not be propagated to all the others.

### Pain points

* Users had to remember several usernames and passwords to access company applications.
* User profiles weren't synchronized across IAM systems. They had to be updated manually in several places.
* There was no Single Sign-On (SSO) between apps.
* Administering five legacy IAM systems and trying to coordinate them was complex and error-prone.
* Consistent policy-based access management wasn't possible as each system implemented it differently.
* Onboarding and offboarding were complex and caused significant issues.

## The solution

Company X decided to consolidate its user, group, and device profiles into [Okta Universal Directory](/docs/concepts/user-profiles/#what-is-the-okta-universal-directory) and use that as its sole IdP. This answered the support tickets by requiring a single set of credentials for all users. Onboarding and offboarding processes became less complex as admins had only one centralized system. Finally, using a single directory realized additional benefits, such as [Okta Single Sign-On](/docs/guides/oin-sso-overview/) (SSO) across its apps, centralized authentication policies, and lower maintenance costs for one system instead of five.

### Key challenges

Company X identified several key challenges in migrating their users to Universal Directory.

* **Different source IdPs**
   User information was split across cloud-based (Microsoft Azure Active Directory) and on-premises IdPs (LDAP-based and proprietary). Each type of IdP would need its own migration process and tools.
* **Merging user profiles**
   Most users had profiles on multiple IdPs that would need to be merged into one as migration occurred.
* **Maintaining uptime during migration**
   The IT team wanted to maximize the uptime for the IAM solution during migration by keeping all user directories active as much as possible.
* **A transition period for applications**
   The IT team needed a roadmap to migrate their apps to Universal Directory over time. Therefore they needed both legacy and new IdPs available for some time after migration.

### Architecture Implementation

Company X used the [Directory Coexistence architecture](/architecture-center/reference-architectures/directory-coexistence/) during its user migration process. This gave the IT team consistent access to both legacy IdPs and Universal Directory as they updated their applications to use Universal Directory as their IdP.

* The company installed an Okta AD Agent to mirror its users from their Azure AD user store to Okta Universal Directory. Universal Directory now acts as the single source of truth for those users. However, user passwords are still managed in Azure AD. The Agent mirrors any changes to a user back to Azure AD.
* The company installed an Okta LDAP Agent for each on-premises LDAP directory to mirror them to Okta Universal Directory. Universal Directory now acts as the single source of truth for those users. However, user passwords are still managed in the on-premises LDAP user store. The Agent mirrors any changes to a user back to the on-premises LDAP store.
* The company wrote a script using the [Okta Users API](/docs/reference/api/users/) and the [password inline import hook](/docs/reference/password-hook/) to import the users stored in their on-premises proprietary user databases into Universal Directory. Universal Directory now acts as the single source of truth for those users. This script worked only one way, and the proprietary IdP was disabled.
* The company opted for a **hybrid strategy** for each migration to Universal Directory. It migrated active users with a just-in-time strategy - users were migrated to Universal Directory if it existed in the original IdP but not Universal Directory. It migrated inactive users in bulk.
* The company updated all its apps to use OpenID Connect (OIDC) to authenticate users rather than SAML or another solution. If an app existed already in the [Okta Integration Network](/docs/guides/okta-integration-network/), they used that. If not, they reconfigured the app manually. This meant they could take full advantage of Okta's features and enable Single Sign-On, multifactor authentication, passwordless access, and more.

> **Note:** To read how to implement the architecture, devise the strategy, and understand the key considerations, see [Directory Coexistence](/architecture-center/reference-architectures/directory-coexistence/) .
>
> For a more in-depth introduction to the protocols and different authorization flows you can implement in your applications, see [OAuth 2.0 and OpenID Connect Overview](/docs/concepts/oauth-openid/).

## Key Benefits

The company saw the following key benefits after implementing the Directory Coexistence pattern and migrating its user base to Universal Directory.

* **A massively simplified end-user experience**
   Company X could use Okta SSO for their apps, having centralized and consolidated user accounts to Universal Directory. Their users now need only to provide a single username and password once a session to access all their apps.
* **A far easier-to-use IAM system**
   After migration, Company X saw a massive drop in support tickets and an order of magnitude increase in onboarding and offboarding speeds as well as with integration.
* **Consistent and adaptive security policies**
   By implementing Okta SSO, the IT team protects its users with consistent security policies that adapt to their behavior. Built-in security tools, such as Okta Insights, help Company X take advantage of Okta's scale and automatically identify and block malicious sign-in attempts seen across the network.
* **Faster cloud deployment and on-prem integration**
   The 7,000+ pre-built integrations in the Okta Integration Network helped Company X securely adopt and deploy SSO to cloud apps in weeks, not months, without building and maintaining the integrations themselves.

   Okta's cloud-based SSO service with 1,400+ SAML and OpenID Connect integrations, password vaulting, RADIUS and LDAP support, and connections to third-party legacy SSO solutions made it possible for Company X to use SSO for all its IAM systems.
* **Simplified user access auditing**
  Company X was able to get real-time data within Okta so IT could troubleshoot and address SSO security issues immediately and use pre-built reporting to understand better how end users were using its apps and where it had potential security risks.
