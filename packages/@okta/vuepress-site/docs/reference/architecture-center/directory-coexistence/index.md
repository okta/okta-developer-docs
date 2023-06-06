---
title: Directory coexistence
excerpt:
   Minimize downtime while migrating user, group, and device profiles to Okta Universal Directory by keeping both source and target directories active during the process.
---

# Directory coexistence

Minimize downtime while migrating user, group, and device profiles to Okta Universal Directory by keeping both source and target directories active during the process.

## Introduction

Using [Universal Directory](/docs/concepts/user-profiles/#what-is-the-okta-universal-directory) as your company's sole Identity Provider enables benefits such as Single Sign-On, and centralized user management and authorization policies. However, migrating your users to Universal Directory takes time.

The directory coexistence reference architecture demonstrates one way to maximize the uptime for your Identity and Access Management (IAM) solution during the migration by keeping both user directories active.

Use directory coexistence for:

* Switching to Okta and migrating user, group, and device profiles over time.
* Consolidating multiple Identity Providers for different applications and services into one provider.
* Merging different identity stores into a single Identity Provider after merging with or acquiring another company.

> **Tip**: Read how this reference architecture worked in the real world in [User migration for Company X](/docs/reference/architecture-center/companyx)

## Lab

* [Overview and prerequisites](/docs/reference/architecture-center/directory-coexistence/lab)
* [Migrate users from Azure Active Directory](/docs/reference/architecture-center/directory-coexistence/lab-azure-ad)
* [Migrate users from an on-premises LDAP directory server](/docs/reference/architecture-center/directory-coexistence/lab-ldap-server)
* [Migrate users from an on-premises generic database](/docs/reference/architecture-center/directory-coexistence/lab-generic-database)

## What Okta technologies are used?

* Okta Universal Directory
* Okta AD Agent
* Okta LDAP Agent
* Okta System for Cross-domain Identity Management (SCIM) connector
* Okta Provisioning Agent

## Architecture

Before applying the directory coexistence architecture, a network's IAM solution is split across many Identity Providers (IdPs):

* Cloud-based IdPs such as Microsoft Azure Active Directory
* On-premises IdPs based on LDAP
* On-premises IdPs based on a proprietary database

Users may need several usernames and passwords to access their applications.

<div class="full">

  ![An architecture diagram representing the start state of the lab](/img/architecture/directory-coexistence/overview-lab-start-state.png)

  <!--
    Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=3714%3A41133&t=U52HeyImgt4pt3M2-1 overview-lab-start-state
  -->
</div>

By applying the architecture for the user migration process:

* All applications start the authentication flow by querying Universal Directory.
* If the user has been migrated and their credentials are valid, they are signed in.
* If the user hasn't been migrated, their authentication is delegated to the original IdP for that application.

From the user's perspective, nothing changes except for the number of different passwords to remember, which reduces to one.

<div class="full">

  ![An architecture diagram representing the end state of the lab.](/img/architecture/directory-coexistence/overview-lab-end-state.png)

  <!--
    Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=3714%3A41142&t=U52HeyImgt4pt3M2-1 overview-lab-end-state
  -->
</div>

Over time, as all user information is migrated, you can stop the delegation to each original IdP until, eventually, the migration is complete.

## Key considerations

Consider several questions before applying this architecture:

1. Can you migrate users from a provider over time, or is it an all-in-one process?
2. How do you find and merge duplicate user profiles?
3. Can you update your applications to use OpenID Connect (OIDC)?

By considering these questions, you can also start understanding how long it may take to apply this architecture to your network.

### Just-In-Time migration

Until you are ready to use only Okta for authentication, your users can sign in to Okta, and Okta delegates authentication to your current Identity Provider. Your current identity directories and Universal Directory may coexist as long as required.

There are three strategies for user migration:

1. In a **bulk migration strategy**, you divide users, groups, and data into sections. Create an order in which each section is migrated as a whole, and a schedule for migrating each section. For example, you may migrate everything in one go or create twelve portions and migrate one a month.
2. In a **just-in-time strategy**, when a user signs into their application, their credentials are checked against their original Identity Provider. If the user exists there but not in Okta, the user is mirrored in Okta. If the user already exists in the original provider and Okta, and the information in the original has been updated, then the user's information in Okta is updated from the original.
3. A hybrid of bulk and just-in-time strategies. For example, you could consider migrating active users using a just-in-time strategy and inactive users in bulk in one go.

> **Note:** A just-in-time strategy is supported when migrating from Azure Active Directory or an on-premises LDAP directory server.

### De-duplicate user profiles

A common issue when migrating user profiles into a common directory from multiple sources is how to identify and merge several profiles that represent the same user into one.

When you import users, you can create Okta rules to match any attribute currently mapped from a source user profile to an Okta user profile. Attribute matching helps you sync identities from multiple applications and determine whether an imported user is new or if the user profile already exists in Okta. See [Match imported user attributes](https://help.okta.com/okta_help.htm?type=oie&id=ext_match-user).

### Update applications to OIDC

OAuth 2.0 and OIDC are the standard protocols on which Okta authentication and authorization solutions are based.

Using Universal Directory as a single Identity Provider for your applications, you can already take advantage of [Okta Workflows](https://help.okta.com/wf/en-us/Content/Topics/Workflows/workflows-main.htm) to simplify onboarding and offboarding, user management, and reporting. To take full advantage of Okta's features and enable [Single Sign-On](https://www.okta.com/topic/single-sign-on/), multifactor authentication, passwordless access, and more, all your applications should use OIDC to authenticate users rather than SAML or another solution.

For a more in-depth introduction to the protocols and different authorization flows you can implement in your applications, see [OAuth 2.0 and OpenID Connect Overview](/docs/concepts/oauth-openid/).
