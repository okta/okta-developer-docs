---
title: Directory Coexistence
excerpt:
   Minimize downtime while migrating user, group, and device profiles to Okta Universal Directory by keeping both source and target directories active during the process.
---

# Directory Coexistence

Minimize downtime while migrating user, group, and device profiles to Okta Universal Directory by keeping both source and target directories active during the process.

## Introduction

Using [Universal Directory](https://www.okta.com/products/universal-directory/) as your company's sole identity provider enables benefits such as Single Sign-On, and centralized user management and authorization policies. However, migrating your users to Universal Directory takes time.

The Directory Coexistence reference architecture demonstrates one way to maximize the uptime for your Identity and Access Management (IAM) solution during the migration by keeping both user directories active.

Use Directory Coexistence for:

* Switching to Okta and migrating user, group, and device profiles over time.
* Consolidating multiple identity providers for different applications and services into one provider.
* Merging different identity stores into a single identity provider after merging with or acquiring another company.

### What Okta technologies are used?

* Okta Universal Directory
* Okta AD Agent
* Okta LDAP Agent
* Okta System for Cross-domain Identity Management (SCIM) connector
* Okta Provisioning Agent

## Architecture

Before applying the directory coexistence architecture, a network's IAM solution is split across many identity providers (IdPs):

* Cloud-based IdPs such as Microsoft Azure Active Directory
* On-prem IdPs based on LDAP
* On-prem IdPs based on a proprietary database

Users may need several usernames and passwords to access their applications.

<div class="full">

  ![An architecture diagram representing the start state of the lab](/img/architecture/directory-coexistence/overview-lab-start-state.png)

  <!--
    Source image: fill-this-in overview-lab-start-state
  -->
</div>

By applying the architecture for the user migration process:

* All applications start the authentication flow by querying Universal Directory.
* If the user has been migrated and their credentials are valid, they are signed in.
* If the user has not been migrated, their authentication is delegated to the original identity provider for that application.

From the user's perspective, nothing changes except for the number of different passwords to remember, which will reduce to one.

<div class="full">

  ![An architecture diagram representing the end state of the lab.](/img/architecture/directory-coexistence/overview-lab-end-state.png)

  <!--
    Source image: fill-this-in overview-lab-end-state
  -->
</div>

Over time, as all user information is migrated, the delegation to each original identity provider can be stopped until, eventually, the migration is complete.

## Key considerations

Several questions should be considered before applying this architecture:

1. Can you migrate users from a provider over time, or is it an all-in-one process?
2. How do you find and merge duplicate user profiles?
3. Can you update your applications to use OpenID Connect (OIDC)?

By considering these, you can also start understanding how long it may take to apply this architecture to your network.

### Just-in-time Migration

Until you are ready to use only Okta for authentication, your users can sign into Okta, and Okta will delegate authentication to your current identity provider. Your current identity directories and Universal Directory may coexist as long as required.

There are three strategies for user migration:

1. In a **bulk migration** strategy, you divide users, groups, and data into sections. Create an order in which each section will be migrated as a whole, and a schedule for migrating each section. For example, you may migrate everything in one go or create twelve portions and migrate one a month.
2. In a **just-in-time strategy**, when a user logs into their application, their credentials are checked against their original identity provider. If the user exists there but not in Okta, the user is mirrored in Okta. If the user already exists in the original provider and Okta, and the information in the original has been updated, then the user's information in Okta is updated from the original.
3. A hybrid of bulk and just-in-time strategies. For example, you could consider migrating active users using a just-in-time strategy and inactive users in bulk in one go.

> **Note:** A Just-in-time strategy is supported when migrating from Azure Active Directory or an on-prem LDAP directory server.

### De-duplicating user profiles

A common issue when migrating user profiles into a common directory from multiple sources is how to identify and merge several profiles representing the same user into one.

When you import users, you can create Okta rules to match any attribute currently mapped from a source user profile to an Okta user profile. Attribute matching helps you sync identities from multiple applications and determine whether an imported user is new or if the user profile already exists in Okta. For more information on how to create matches, see [Match imported user attributes](https://help.okta.com/okta_help.htm?type=oie&id=ext_match-user).

### Updating applications to OpenID Connect

OAuth 2.0 and OpenID Connect (OIDC) are the standard protocols on which Okta's authentication and authorization solutions are based.

Using Universal Directory as a single identity provider for your applications, you can already take advantage of [Okta Workflows](https://www.okta.com/platform/workflows/) to simplify onboarding and offboarding, user management, and reporting. To take full advantage of Okta's features and enable [Single Sign-On](https://www.okta.com/topic/single-sign-on/), multifactor authentication, passwordless access, and more, all your applications should use OIDC to authenticate users rather than SAML or another solution.

For a more in-depth introduction to the protocols and different authorization flows you can implement in your applications, see [OAuth 2.0 and OpenID Connect Overview](/docs/concepts/oauth-openid/).
