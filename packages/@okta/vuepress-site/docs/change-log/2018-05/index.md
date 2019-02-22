---
title: Okta API Products Change Log
---

## 2018.05

### Feature Enhancements

| Feature Enhancement                          | Expected in Preview Orgs | Expected in Production Orgs |
|:---------------------------------------------------|:------------------------------------|:---------------------------------------|
| [App User Schema API is Generally Available](#generally-available-app-user-schema-api)   | Available Now          | Available Now  |
| [Special HTML Characters in `state` for `okta_post_message`](#special-html-characters-in-state-for-okta_post_message) | January 31, 2018        | February 7, 2018                |
| [Custom Scopes in Metadata Endpoints](#custom-scopes-in-metadata-endpoints) | January 31, 2018        | February 7, 2018                |
| [Improved Enforcement of Authorization Server Policies](#improved-enforcement-of-authorization-server-policies) | January 31, 2018        | February 7, 2018                |
| [Functions for Including Groups in Tokens](#functions-for-including-groups-in-tokens) | January 31, 2018        | February 7, 2018        |
| [New System Log Messages](#new-system-log-messages) | January 31, 2018        | February 7, 2018                |
| [New Version of the Sign-In Widget](#new-version-of-the-sign-in-widget) | Available Now | Available Now |

#### Generally Available: App User Schema API
Use the [App User Schema API](/docs/api/resources/schemas#app-user-schema-operations) to work with App User profiles, typically for apps that have features for provisioning users. <!--OKTA-154105-->

#### Special HTML Characters in `state` for `okta_post_message`

You can include HTML special characters in the `state` parameter for `okta_post_message`.
Note that [`state` in the main request body](/docs/api/resources/oidc#request-parameters-1) already allows these characters. <!-- OKTA-91165 -->

#### Custom Scopes in Metadata Endpoints

You can specify whether or not to include custom scopes in the metadata endpoints for [OAuth 2.0](/docs/api/resources/oidc#well-knownoauth-authorization-server) and [OpenID Connect](/docs/api/resources/oidc#well-knownopenid-configuration).
Existing custom scopes are not exposed by default. Set the [`metadataPublish` attribute to `ALL_CLIENTS`](/docs/api/resources/authorization-servers#scope-properties) to change the behavior. <!-- OKTA-106548 -->

#### Improved Enforcement of Authorization Server Policies

When a client application tries to redeem an authorization token from a refresh token issued by a custom authorization server, policies are evaluated again. This ensures any changes since the time the refresh token was issued are checked. <!-- OKTA-117622 -->

#### Functions for Including Groups in Tokens

Use [the new EL functions `Group.contains`, `Group.startsWith`, and `Group.endsWith`](/reference/okta_expression_language/#group-functions) to define a set of dynamic groups to be included in tokens minted from Okta's authorization servers. <!-- OKTA-142824 -->

These functions complement [the existing EL function `getFilteredGroups`](/docs/how-to/creating-token-with-groups-claim) which helps you create a static list of groups for inclusion in a token.

#### New System Log Messages

User account updates have two new events written to the system log ( `/api/v1/events` and `/api/v1/logs`): 

* The `user.account.unlock_by_admin` event complements the existing `user.account.unlock` event which is triggered only by self-service unlock or automatic unlock. The `user.account.unlock_by_admin` event is triggered when an administrator unlocks an account.
* The `user.account.update_primary_email` event is triggered only when a primary email is updated. It's not triggered by profile sync or other automated processes. <!-- OKTA-154452 -->

#### New Version of the Sign-In Widget
Version 2.6.0 of [the Okta Sign-In Widget](https://www.npmjs.com/package/@okta/okta-signin-widget) is available. Check out the new features and bug fixes!

### Bugs Fixed

The following bugs have been fixed and are expected in preview orgs January 31, 2018 and production orgs starting February 7, 2018.

* Client applications could redeem an access token from a refresh token if it contained a deleted scope. (OKTA-154738)
* The exception thrown when creating a zone without the correct features enabled was incorrect `501: unsupported operation`.
    Now the correct exception is thrown: `401: You do not have permission to access the feature you are requesting.` (OKTA-154940)
* Requests to `/api/v1/authn` with `deviceToken` in the body of the request incorrectly prompted the user for MFA, even after successfully verifying the factor the first time, if:
    * The org had MFA enabled ( **Sign On Policy > Prompt for Factor > Per Device** ).
    * The user was assigned to an app that had password sync enabled. (OKTA-156826)
