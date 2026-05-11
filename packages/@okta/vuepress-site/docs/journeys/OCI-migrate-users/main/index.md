---
title: Migrate your human, non-Okta user accounts to Universal Directory
meta:
  - name: description
    content: Provide a smooth and secure activation experience as you move human user identities into Universal Directory from another user store.
    date-updated: March 27, 2026
    target persona: Administrator, Developer, Security Team
    level: Intermediate
sections:
- main
---

# Migrate your human, non-Okta user accounts to Universal Directory

## Introduction

Your company has adopted the Okta platform and wants to use Universal Directory as the single point of identity access management for all its users. This gives it access to Okta's full complement of [User Access Management](https://www.okta.com/identity-101/user-access-management/) features and functionality. To do this, you need to migrate user identities from a source provider, such as a local Active Directory, LDAP server, or third-party identity provider.

Devise a user migration strategy based on your company's needs, timelines, and source data. Configure Universal Directory to receive the new identities and assign them to the correct apps and APIs. Prepare the source provider and its contents for migration, and then import your data. Use the KPIs you've identified as part of your strategy to measure your success.

## Learn

Learn the basics that you need to lay the foundations for your work:

* [Universal Directory (UD)](/docs/concepts/universal-directory/) is the central store for user information in your Okta org.
* [The Users API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/user) provides operations to create user accounts in your org.
* [The Groups API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/group) provides operations to manage Okta groups and their user members.
* [Password import inline hooks](/docs/concepts/inline-hooks/) help to move users' password to UD from a source provider during migration.

## Plan

Plan your migration around four key points:

* [What data are you migrating?](/docs/guides/migrate-to-okta-plan/main/#consider-your-data): Identify the users and groups to migrate. Then, identify the IAM data to import into UD vs the profile data that needs to go elsewhere, and the apps they need to access. Validate the data quality. Consider data privacy and regulations.
* [Migration type](/docs/guides/migrate-to-okta-plan/main/#choose-your-migration-type): Choose between a one-time migration and a phased program. The one-time approach moves all users and credentials at once. In contrast, a phased program moves data slowly over time. The source provider stays active during this on-demand process. Base your decision on your current user store and your deadlines.
* [End-user experience](/docs/guides/migrate-to-okta-plan/main/#plan-the-end-user-experience): Decide on the right migration experience for your users. Determine if you want to prioritize convenience or immediate security. Select a seamless migration to offer a frictionless user experience. This keeps users unaware that their accounts have been migrated. Select a staged migration to take advantage of Okta's features. This improves security right away but requires user action.
* [Measuring success](/docs/guides/migrate-to-okta-plan/main/#define-success-metrics): Define KPIs to measure the worth and success of your migration. Try to balance the inherent value of the project with a lack of user disruption and overall security goals.

With your strategy set using the **Plan** section, and the implementation using the guides in the next section, create the following test and rollback plans:

* [Create a realistic set of test data and test your migration](/docs/guides/test-your-migration-plan/main/).
* Create a rollback plan for the migration.

## Build

You’re now ready to build your migration solution. In this section, you execute your migration strategy from start to finish. First, you prepare Universal Directory to receive your users. Then, you connect your apps and perform the user import.

### Run your strategy

To execute your migration strategy, begin by configuring the user account profiles for the new users. Then, configure the groups thatyou want them to belong to, and the apps they can access. Connect your apps and APIs to Okta, and then import your users.

#### Configure Universal Directory

Prepare Universal Directory to receive the new user accounts:

* Create your needed user groups. Use the [Admin Console](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-groups-main) if you prefer a GUI or the [Groups API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/group/group) if you prefer to script.
* [Create a user profile](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-about-profiles) for the new user accounts.
* Set the authentication factors (for example, password, email, phone) that users must use to validate their identity with an [authenticator enrollment policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-mfa-enrol-policies).

#### Connect your apps and APIs to Okta

Your apps and API can't use your source provider to authenticate users post-migration. Ensure that your apps and API can authenticate your users with both Okta and your source provider:

* [Search the OIN catalog](https://www.okta.com/integrations/) for Okta-enabled versions of your third-party apps.
* Update your apps to use Okta as an identity provider:
  * [Update your app's sign-in form to connect to Okta](/docs/journeys/OCI-web-sign-in/main/#add-a-way-for-users-to-sign-in).
  * [Make your app a multi-tenant OIDC app with Okta as an additional identity provider](https://developer.okta.com/blog/2023/07/28/oidc_workshop).
* [Update your APIs to use Okta as an identity provider](/docs/guides/protect-your-api)
* [Create authentication policies for your apps and APIs](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop) that mirror the existing sign-in experience with the source provider, or that enhance it as you’ve planned.

> **Note**: Contact your Technical Account Manager for further assistance migrating your apps to Okta.

#### Import your user accounts into Universal Directory

Extract the user data from the source provider into an intermediate staging area. [Clean up that data](/docs/guides/test-your-migration-plan/main/#review-and-clean-your-data) so that it's consistent and contains only valid information as you did for the [test](#plan).

For a seamless, one-time migration, where users are unaware their account has been moved, import each user's hashed password with their details. Then, make their account active:

* [Use the Users API to create active user accounts with the hashed password](/docs/guides/migrate-to-okta-with-scripts/main/#seamless-one-time-migration).
* Send users notification to sign in normally.

For a one-time migration with authentication reset, where users must reset their authentication details to activate their account, import each user's details, and make their account staged:

* [Use the Users API to create staged user accounts without credentials](/docs/guides/migrate-to-okta-with-scripts/main/#one-time-migration-with-authentication-reset).
* Alternatively, you can [bulk import user details from a CSV file](https://help.okta.com/okta_help.htm?type=oie&id=ext_csv_import).
* Send users notification to reactivate their accounts. (Mass-select users in Okta and click **Activate** to send Welcome/Set Password emails.)

For a migration program, where user passwords are migrated when they first sign in to an app from the source provider:

* [Use the Okta Users API to create active user accounts with a password import inline hook](/docs/guides/migrate-to-okta-with-scripts/main/#migration-program-using-inline-password-hooks).
* Create a password import inline hook to one of the following places:
  * Local Active Directory or LDAP server
  * [Third-party identity provider](/docs/guides/password-import-inline-hook/nodejs/main/)
* Send that user a notification to sign in through the standard Okta process.

If your system uses Active Directory agents to synchronize passwords with Okta for SSO, you can also [use the AD Agent to migrate passwords to Okta](https://help.okta.com/okta_help.htm?type=oie&id=ad-password-migration).

If you’ve stored your user's non-IAM profile data in another system, use the User ID returned by the Users API as a reference point to connect it. Find the user IDs after creation by calling [List all users](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/user/other/listusers).

#### End the migration program (if applicable)

When you plan a migration program, you set a fixed period to leave the inline hook in service. At the end of this period, most your users have migrated their account. At this point, you can do one of two things:

* [Use the User Credentials API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/usercred/other/resetpassword) to force a password reset for users that still have `credentials.provider.type` set to `IMPORT`. Those users receive an email to set their password with a link to follow.
* Consider those users as stale accounts who must recreate their accounts to gain access to your apps again.

Finally, you can retire your legacy system from service.

Congratulations, you have successfully designed and implemented a migration plan for your user accounts to Universal Directory. After the accounts are activated, your new user accounts are stored and assigned the correct types, roles, groups, and attributes.

These accounts also link to the user's original account in the source Data Store, if needed. The KPIs you have set as part of the plan keep you mindful of the requirements for its success. Your users don't know that the migration has taken place unless you've designed it that way.

## Related topics

To complement your user migration campaign, consider a way to provision and deprovision applications to your new users.

* [Adding a SCIM interface to your apps](/docs/guides/scim-provisioning-integration-overview/main/) allows admins to control user access centrally.
<!-- * [Creating a custom provisioning flow]() for third party apps with Okta Workflows -->
* [Search the Okta Integration Network](https://www.okta.com/integrations/) for provisioning flows and SCIM-ready apps that exist.

Learn more about working with non-human identities (NHIs):

* [Okta secures AI](https://www.okta.com/solutions/secure-ai/)
* [What is non-human identity security?](https://www.okta.com/identity-101/what-is-non-human-identity-security/)
* [The non-human identity lifecycle](https://www.okta.com/identity-101/what-is-the-non-human-identity-lifecycle/)
