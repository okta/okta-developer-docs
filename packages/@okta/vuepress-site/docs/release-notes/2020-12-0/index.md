---
title: Okta API Products Release Notes
---

## 2020.12.0

| Change                                                                                              | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------|--------------------------|
| [Inclusive language and terminology](#inclusive-language-and-terminology) | December 9, 2020         |
| [New OAuth Administrator Role API Scopes](#New-OAuth-Administrator-Role-API-Scopes) | December 9, 2020         |
| [New endpoint added to DynamicScale Rate Limits](#New-endpoint-added-to-DynamicScale-Rate-Limits) | December 9, 2020         |
| [New endpoint added to DynamicScale Rate Limits](New-endpoint-added-to-DynamicScale-Rate-Limits) | December 9, 2020        |
| [Account linking for SAML IdPs is now GA in Production](#Account-linking-for-SAML-IdPs-is-now-GA-in-Production) | (See entry) |
| [One Time Use Refresh Token is now in Early Access (EA)](#One-Time-Use-Refresh-Token-is-now-in-Early-Access-(EA)) | December 9, 2020         |
| [Enhancements to Apps API for Idp Initiated Logins](#Enhancements-to-Apps-API-for-Idp-Initiated-Logins) | December 9, 2020         |
| [Enhancements to Apps API for SAML Apps](#Enhancements-to-Apps-API-for-SAML-Apps) | December 9, 2020         |
| [Group object `source` property is now GA in Production](#Group-object-source-property-is-now-GA-in-Production) | December 9, 2020        |

### Inclusive language and terminology

Okta is focused on the adoption of inclusive language and communication. Some long-standing industry terminology and expressions have been updated in this release. More updates will be made in future releases.

In this release, the documentation for Custom Groups Claims has been updated with inclusive terminology. The term "whitelist" has been replaced with "allow list":

- [Customize tokens returned from Okta with a dynamic allow list](/docs/guides/customize-tokens-dynamic/add-groups-claim-dynamic/)

- [Customize tokens returned from Okta with a static allow list](/docs/guides/customize-tokens-dynamic/dynamic-allowlist-org-as)

Existing custom claims that use the `groupwhitelist` Profile property do not need to change.<!--OKTA-344317-->

### New OAuth Administrator Role API Scopes

The [Administer Roles API](/docs/reference/api/roles) now supports OAuth scopes `okta.roles.manage` and `okta.roles.read`. These scopes allow applications to read and manage (create, update, and delete) administrator roles in your Okta organization.<!--OKTA-287229-->

### New endpoint added to DynamicScale Rate Limits

The [DynamicScale](/docs/reference/rl-dynamic-scale/) add-on service now includes the following additional authentication endpoint: `/login/login.html`.<!--OKTA-342112-->

### Account linking for SAML IdPs is now GA in Production

Admins can now enable or disable automatic account linking between SAML Identity Providers and Okta using the [Identity Provider API](/docs/reference/api/idps/). They can also restrict account linking based on whether the end user is a member of any specified groups. <!--OKTA-334889-->

### One Time Use Refresh Token is now in Early Access (EA)

One Time Use Refresh Token, also called Refresh Token Rotation, is now in Early Access. Refresh Token Rotation helps a public client to securely rotate refresh tokens after each use. A new refresh token is returned each time the client makes a request to exchange a refresh token for a new access token. See [Refresh Token Rotation](/docs/guides/refresh-tokens/refresh-token-rotation/).<!--OKTA-345754-->

### Enhancements to Apps API for Idp Initiated Logins

The [Apps API](/docs/reference/api/apps/) can now configure the Idp Initiated Login behavior, which is also available in the Admin Console user interface. Note: the Idp Initiated Login is limited to OIDC clients. <!--OKTA-342821-->

### Enhancements to Apps API for SAML Apps

The [Apps API](/docs/reference/api/apps/) can now configure the Single Logout (SLO) URL behavior for SAML apps, which is also available in the Admin Console user interface.<!--OKTA-342882-->

### Group object `source` property is now GA in Production

For API requests that return a Group or a list of Groups, the Group object includes a source property that provides the ID of the source application for the returned Group. This property is now GA in all Production orgs. See [Group attributes](docs/reference/api/groups/#group-attributes).<!--OKTA-344169-->