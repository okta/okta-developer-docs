---
layout: Landing
title: User Migration for Company X
---

# User Migration for Company X

Learn how Company X applied the directory coexistence reference architecture when planning their user migration strategy and the benefits they saw.

## Company Overview

Company X is a Global 2000 company with 200,000 team members worldwide. It uses over 250 SaaS apps, 500 on-premises apps, and 400 cloud-native apps backed by five legacy Identity and Access Management (IAM) systems and multiple Identity Providers (IdPs).

## Related Reference Architecture

<figure class="main-card">
  <img
    class="main-card__image"
    src="https://picsum.photos/200/300"
    alt="It's a simple title"
  >
  <figcaption class="main-card__body">
    <h2 class="main-card__title">
      <a
        class="main-card__main-link"
        href="/architecture-center/reference-architectures/directory-coexistence"
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

## The Problem: Too many legacy IAM systems spoil the user administration broth

The company's legacy IAM systems and newer IdPs don't interact well. The number of support tickets related to user onboarding and offboarding is increasing. So are the number of tickets from those users struggling to remember multiple credential combinations as the IAM systems don't synchronize user profiles between them.

### Pain points

* Users need to remember several usernames and passwords to access applications.
* User profiles aren't synchronized across IAM systems, so they must be manually updated in several places.
* There is no single sign-on between apps.
* Administering five legacy IAM systems and trying to coordinate them is difficult and error-prone.
* Consistent policy-based access management isn't possible as each system implements it differently.
* Onboarding and offboarding are complex and cause major issues.

## The Solution: Okta Universal Directory

Company X wants to consolidate its user, group, and device profiles into [Okta Universal Directory](/docs/concepts/user-profiles/#what-is-the-okta-universal-directory) and use that as its sole Identity Provider. This will immediately answer the login tickets by requiring a single set of credentials for all users. Onboarding and offboarding processes will also become easier as admins only have one centralized system. Finally, using a single directory will realize additional benefits, such as [Single Sign-On](/docs/guides/oin-sso-overview/) (SSO) across its apps, centralized authentication policies, and lower maintenance costs for one system instead of five.

### Key challenges

Company X identified several key challenges in migrating their users to Universal Directory.

* **Different source IdPs**
   User information was split across cloud-based (Microsoft Azure Active Directory) and on-prem IdPs (LDAP-based and proprietary). Each type of IdP would need its own migration process and tools.
* **Merging user profiles**
   Most users have profiles on multiple IdPs which would need to be merged into one as migration occurred.
* **Maintaining uptime during migration**
   The IT team wanted to maximize the uptime for the IAM solution during migration by keeping all user directories active as much as possible.
* **A transition period for applications**
   The IT team needed a roadmap to migrate their apps to Universal Directory over time. Therefore they needed both legacy and new IdPs available for a period of time after migration.

### Architecture Implementation

Company X used the [Directory Coexistence architecture](/architecture-center/reference-architectures/directory-coexistence/) during its user migration process. This gave the IT team consistent access to both legacy IdPs and Universal Directory throughout the process and as they updated their applications to use Universal Directory as their IdP.

* The company installed an Okta AD Agent to mirror its users from their Azure AD user store to Okta Universal Directory. Universal Directory now acts as the single source of truth for those users. However, user passwords are still managed in Azure AD. The Agent mirrors any changes to a user back to Azure AD.
* The company installed an Okta LDAP Agent for each on-prem LDAP directory to mirror them to Okta Universal Directory. Universal Directory now acts as the single source of truth for those users. However, user passwords are still managed in the on-prem LDAP user store. The Agent mirrors any changes to a user back to the on-prem LDAP store.
* The company wrote a script using the [Okta Users API](/docs/reference/api/users/) and the [password inline import hook](/docs/reference/password-hook/) to import the users stored in their on-prem proprietary user databases into Universal Directory. Universal Directory now acts as the single source of truth for those users. This script worked only one way, and the proprietary IdP was closed.
* The company opted for a **hybrid strategy** for each migration to Universal Directory. It migrated active users with a just-in-time strategy - users were migrated to Universal Directory if it existed in the original IdP but not Universal Directory. It migrated inactive users in bulk.
* The company updated all its apps to use OpenID Connect (OIDC) to authenticate users rather than SAML or another solution. If an app existed already in the [Okta Integration Network](/docs/guides/okta-integration-network/) already, they used that. If not, they reconfigured the app manually. This meant they could take full advantage of Okta's features and enable Single Sign-On, multifactor authentication, passwordless access, and more.

> **Note:** To read how to implement the architecture, devise the strategy, and understand the key considerations, see [Directory Coexistence](/architecture-center/reference-architectures/directory-coexistence/) .
>
> For a more in-depth introduction to the protocols and different authorization flows you can implement in your applications, see [OAuth 2.0 and OpenID Connect Overview](/docs/concepts/oauth-openid/).

## Key Benefits

The company saw the following key benefits after implementing the Directory Coexistence pattern and migrating its user base to Universal Directory.

* **A massively simplified end-user experience**
   Company X could use Okta SSO for their apps, having centralized and consolidated user accounts to Universal Directory. Their users now need only to provide a single username and password once a session to access all their apps.
* **A far easier-to-use IAM system**
   After migration, Company X saw a 75% reduction in login-related help desk calls and a 500% speed increase in user onboarding, offboarding, and integration with acquired businesses.
* **Consistent and adaptive security policies**
   By implementing Okta SSO, the IT team protects its users with consistent security policies that adapt to their behavior. Built-in security tools, such as Okta Insights, help Company X take advantage of Okta's scale and automatically identify and block malicious login attempts seen across the network.
* **Faster cloud deployment and on-prem integration**
   The 7,000+ pre-built integrations in the Okta Integration Network helped Company X securely adopt and deploy SSO to cloud apps in weeks, not months, without building and maintaining the integrations themselves.

   Okta's cloud-based SSO service with 1,400+ SAML and OpenID Connect integrations, password vaulting, RADIUS and LDAP support, and connections to third-party legacy SSO solutions made it possible for Company X to use SSO for all its IAM systems.
* **Simplified user access auditing**
  Company X was able to get real-time data within Okta so IT could troubleshoot and address single sign-on security issues immediately and use pre-built reporting to understand better how end users were using its apps and where it had potential security risks.
