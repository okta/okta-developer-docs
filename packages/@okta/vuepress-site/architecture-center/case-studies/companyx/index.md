---
layout: Landing
title: Company X
---

Company X is a Global 2000 company with 200,000 team members worldwide

It has been using 250+ SaaS apps, 500+ on-prem apps, and 400+ cloud-native apps and has 5 legacy IAM systems with multiple Identity Providers (IDPs), all of which are in use. The company is running a VPN along with on-prem multi-factor authentication (MFA), on-prem federation, and on-prem web access management.

The combination of these legacy IAM systems and newer cloud-based ones creates inefficiencies with provisioning and onboarding/offboarding. As Company X adds more cloud applications it’s running into issues with building and maintaining integrations as well as issues with inconsistent onboarding and offboarding. It’s also observing spikes in support tickets for login-related issues from users who need to remember multiple credential combinations. To address these, Company X is looking to consolidate all its IAM systems into a single directory for ease of management as well as to expedite cloud based app integrations. The end goal for Company X is to consolidate multiple identity stores into one and multiple Identity Providers for different applications and services into one. Company X hopes this will enable benefits such as Single Sign-On, and centralized user management and authorization policies.

## Use case: Directory Coexistence

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
      Minimize downtime while migrating user, group, and device profiles to Okta Universal Directory by keeping both source and target directories active during the process. <a class="main-card__link" href="/architecture-center/reference-architectures/directory-coexistence">Learn more</a>
    </p>
  </figcaption>
</figure>

Company X wantsto consolidate its users into a single directory for ease of management and wishes to migrate its users, groups and device profiles from multiple IAM systems which are a combination of legacy on-prem systems and cloud based systems. These were split across many Identity Providers (IdPs):

* Cloud-based IdPs such as Microsoft Azure Active Directory
* On-premises IdPs based on LDAP
* On-premises IdPs based on a proprietary database

Many of the users have accounts on several of these servers so user accounts also need to be consolidated during the migration. The IT team wanted to maximize the uptime for the Identity and Access Management (IAM) solution during the migration by keeping **all user directories active**. They also needed a roadmap to migrate their apps to the new user store over time and therefore have both legacy and new stores available for a period of time.

### Key challenges

* Switching to Okta across the org and migrating user, group, and device profiles over time
* Consolidating multiple Identity Providers for different applications and services into one provider

### Pain points

**End Users:**

* Users need to remember several usernames and passwords to access applications
* Users are unable to login in one single place and having trouble accessing accounts because of updating issues

**IT admins:**

* Administering 5 legacy IAM systems rather than one and trying to consolidate into one (using scripts, for instance)
* Controlling and ensuring consistent policy based application access across five services
* Onboarding and offboarding can be complex and can cause major issues

## Key technologies used

* Okta Universal Directory
* Okta Active Directory Agent
* Okta Lightweight Directory Access Protocol (LDAP) Agent
* Okta System for Cross-domain Identity Management (SCIM) connector
* Okta Provisioning Agent

## Solution - key considerations, steps, and delivery

### Migration from Azure Active Directory to Universal Directory

For the cloud authentication IAM, users were migrated from Azure Active Directory to Universal Directory by mirroring them using the Okta Active directory agent. In this scenario, Universal Directory served as a single source of truth for user data and lets administrators centrally manage policies and profiles. However, the user passwords were still managed in the original IdP. This directory coexistence can stay in place until you migrate all your user information to Universal Directory and no longer require the other IdP. The architecture diagram for this can be seen below

<div class="full">

  ![An architecture diagram showing the authorization flow from user to Okta to Azure Active Directory and back again.](/img/architecture/directory-coexistence/ad-to-okta-flow-diagram.png)

  <!--
    Source image: fill-this-in ad-to-okta-flow-diagram
  -->
</div>

### Migration of users from an on-premises LDAP directory to Universal Directory

Some of the IAM systems were handling authentication through an on-premises LDAP directory. To mirror those users to Universal Directory and then redirect applications to Okta for authentication,  an on-premises Okta LDAP Agent was installed. In this scenario, Universal Directory serves as a single source of truth for user data and lets administrators centrally manage policies and profiles. Admins can assign them to any application registered with their Okta Organization. Access to those assigned applications can be through any protocol, such as LDAP Interface, OpenID Connect (OIDC), SAML, and so on.

However, authentication of the LDAP user is delegated to the LDAP server through the Okta LDAP Interface so that users can authenticate with Okta using their LDAP directory server credentials. This directory coexistence can stay in place until admins migrate all user information to Universal Directory and no longer require the LDAP directory.

<div class="full">

  ![An architecture diagram showing the authorization flow from user to Okta to an OpenLDAP Directory server and back again.](/img/architecture/directory-coexistence/ldap-to-okta-flow-diagram.png)

  <!--
    Source image: fill-this-in ldap-to-okta-flow-diagram
  -->
</div>

### Migration of users from an on-premises database to Universal Directory

Finally some user profiles and groups were stored in a generic on-premises database. To migrate these to UD the organization had two options:

1. Export all user credentials into a CSV (or similar) file and then import the data from the file into Universal Directory
1. Write a script that queries the database for user information and then uses the Okta Users API to import the users into Universal Directory

In the interests of reducing migration time, admins might wish to avoid resetting user passwords. For either of the above options, Okta can import not just user names but also hashed passwords, provided that the hash is supported by Okta). Even if the hash is not supported admins can still choose to import passwords by using Okta’s inline import hook.

The organization opted for option two. Since Okta didn’t support the hash, it couldn’t import the user's password. However, the organization used Okta’s password inline import hook to import user records that use an unsupported hash type without requiring the user to reset their password.

### Choice of migration strategy for each of these three scenarios

Until Company X was ready to use only Okta for authentication, it wanted to ensure that users can sign in to Okta, and Okta delegated authentication to your current Identity Provider. This way current identity directories and Universal Directory could coexist as long as required.

There are three strategies that were considered for user migration:

1. **Bulk migration strategy:** In this scenario, admins first divide users, groups, and data into sections and then create an order in which each section is migrated as a whole, and a schedule for migrating each section. For example, admins may migrate everything in one go or create twelve portions and migrate one a month.
1. **Just-in-time strategy:** In this scenario, when a user signs into their application, their credentials are checked against their original Identity Provider. If the user exists in the original IDP but not in Okta, the user is mirrored in Okta. If the user already exists in both the original IDP and in Okta, AND the information in the original has been updated, then the user's information in Okta is updated from the original.
1. **A hybrid of bulk and just-in-time strategies.**

Company X opted for a hybrid strategy - it migrated active users using a just-in-time strategy and inactive users with a bulk migration strategy.

To take full advantage of Okta's features and enable Single Sign-On, multi factor authentication, passwordless access, and more, Company X decided to update all its applications to use the OpenID Connect (OIDC) protocol to authenticate users as opposed to using Security Assertion Markup Language (SAML) or another solution.

For a more in-depth introduction to the protocols and different authorization flows you can implement in your applications, see OAuth 2.0 and OpenID Connect Overview.

# Key benefits

**Ease of administration with single IAM system (Single Sign On)**

Using Okta Universal Directory as the company's sole Identity Provider enables benefits such as Single Sign-On. This resulted in 75% fewer login-related help desk calls and sped up IT integration with acquired businesses by 500%.

**Consistent and adaptive security policies**

Because Company X now uses  Okta SSO, its IT team can protect users with consistent security policies that adapt to their behavior. Built-in security tools, such as Okta Insights, thelp Company X take advantage of Okta’s scale and automatically identify and block malicious login attempts seen across the network.

**Faster cloud deployment and on-prem integration**

Okta’s network of 7,000+ pre-built integrations helped Company X securely adopt and deploy SSO to cloud apps in weeks, not months, all without building and maintaining the integrations themselves

Additionally Okta’s cloud-based single sign-on service with 1,400+ SAML and OpenID Connect integrations, password vaulting, RADIUS and LDAP support, and connections to third-party legacy SSO solutions made it possible for Company X to use SSO for all its IAM systems.

**Simplified end user experience:**

A single username and password provided access to all the workplace productivity apps that Company X’s staff uses which massively simplified the end-user experience.

**Simplified user access auditing**

Company X was able to get real-time data within Okta so IT could troubleshoot and address single sign-on security issues immediately, and use pre-built reporting to get a deeper understanding of how end users were using its apps and where it had potential security risks.
