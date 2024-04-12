---
title: Okta Classic Engine API release notes 2023
---

# Okta Classic Engine API release notes

> Help us improve our release notes by filling out this short [survey](https://surveys.okta.com/jfe/form/SV_4VEZcIGOX0TBgkC).

## December

### Weekly release 2023.12.2

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bugs fixed in 2023.12.2](#bugs-fixed-in-2023-12-2) | January 4, 2024 |

#### Bugs fixed in 2023.12.2

* Some inbound SSO flows failed when a default app was set for the Sign-In Widget. (OKTA-621160)

* A `next` link header was returned when a list clients (`GET /oauth2/v1/clients`) request was made when there were no further clients to be fetched. (OKTA-658169)

* Some free-trial orgs could send customized email templates. (OKTA-673562)

### Weekly release 2023.12.1

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [DPoP support for Okta management APIs is EA in Preview](#dpop-support-for-okta-management-apis-is-ea-in-preview)| December 13, 2023 |

#### DPoP support for Okta management APIs is EA in Preview

You can now use OAuth 2.0 Demonstrating Proof-of-Possession (DPoP) access tokens to access Okta management APIs. See [Configure OAuth 2.0 Demonstrating Proof-of-Possession](/docs/guides/dpop/oktaresourceserver/main/).<!-- OKTA-673922 OKTA_RESOURCE_SERVER_DPOP_SUPPORT-->

### Monthly release 2023.12.0

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Demonstrating Proof-of-Possession is GA in Production](#demonstrating-proof-of-possession-is-ga-in-production) | March 15, 2023 |
| [Bugs fixed in 2023.12.0](#bugs-fixed-in-2023-12-0) | December 6, 2023 |

#### Demonstrating Proof-of-Possession is GA in Production

OAuth 2.0 Demonstrating Proof-of-Possession (DPoP) is a security feature that adds an extra layer of protection to OAuth 2.0 access tokens. It enables the client to demonstrate that it possesses a particular key or secret associated with the access token. OAuth 2.0 DPoP can help prevent certain attacks, such as token theft or token replay attacks, where an attacker intercepts a legitimate access token and uses it to gain unauthorized access to a protected resource. See [Configure OAuth 2.0 Demonstrating Proof-of-Possession](/docs/guides/dpop/main/). <!-- OKTA-585491 -->

#### Bugs fixed in 2023.12.0

* DPoP proofs signed using an Elliptic Curve key couldn't be used. (OKTA-669345)

* Okta wasn't validating that DPoP JWTs were minted right before the DPoP proof was used. (OKTA-671124)

* Password requests with an empty `salt` parameter value caused a `saltOrder` validation error. (OKTA-643212)

## November

### Weekly release 2023.11.1

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bug fixed in 2023.11.1](#bug-fixed-in-2023-11-1) | November 29, 2023 |

#### Bug fixed in 2023.11.1

Security Questions responses sometimes weren't translated correctly. (OKTA-603883)

### Monthly release 2023.11.0

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [CORS restrictions removed for revoke endpoints](#cors-restrictions-removed-for-revoke-endpoints) | November 8, 2023 |
| [Developer documentation update in 2023.11.0](#developer-documentation-update-in-2023-11-0) | November 8, 2023 |
| [Bugs fixed in 2023.11.0](#bugs-fixed-in-2023-11-0) | November 8, 2023 |

#### CORS restrictions removed for revoke endpoints

Cross-origin resource sharing restrictions have been removed for the OAuth 2.0 `/revoke` endpoints (`/oauth2/v1/revoke` and `/oauth2/{authorizationServerId}/v1/revoke`). <!-- OKTA-653124 -->

#### Developer documentation update in 2023.11.0

The direct authentication grant types are now in a new [Configure Direct Authentication grant types](/docs/guides/configure-direct-auth-grants/coobov/main/) guide rather than the [Implement authorization by grant type](/docs/guides/implement-grant-type/authcode/main/) guide. The new guide presents the grant type flows by authenticator rather than grant type, and then further differentiates the flows by either primary factor or secondary (MFA) factor. The grant types are found on the following pages:
  * **OTP grant type** -> **OTP (primary factor)**: When you want to use an OTP factor, such as Google TOTP or Okta Verify, as a primary factor
  * **MFA OTP grant type** -> **OTP (MFA)**: When you want to use an OTP factor as a secondary factor (MFA)
  * **OOB grant type** -> **Okta Verify Push (primary factor)** and **Phone (primary factor)**: When you want to use an out-of-band factor as a primary factor
  * **MFA OOB grant type** -> **Okta Verify Push (MFA)** and **Phone (MFA)**: When you want to use an out-of-band factor as a secondary factor (MFA)

#### Bugs fixed in 2023.11.0

* When attempts were made to update the profiles of app users whose profiles were controlled by external apps, an incorrect error was returned. (OKTA-640752)

* Some operations for the Factors API (`GET /api/v1/users/${userId}/factors/{factorId}` and `GET /api/v1/users/me/factors/${factorId}`) weren't accessible when using tokens created by read-only admins. (OKTA-648751)

* When many apps were added to routing rules through the API, system performance was degraded. (OKTA-653756)

## October

### Weekly release 2023.10.2

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bugs fixed in 2023.10.2](#bugs-fixed-in-2023-10-2) | November 1, 2023 |

#### Bugs fixed in 2023.10.2

* An error occurred when the value for `postLogoutRedirectUris` in an OpenID Connect app was more than 65,535 characters. (OKTA-627678)

* Authorize requests with invalid `max_age` parameter values resulted in errors. (OKTA-654751)

### Weekly release 2023.10.1

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Granular permissions to manage directories is self-service EA in Preview](#granular-permissions-to-manage-directories-is-self-service-ea-in-preview) | October 18, 2023 |
| [Bug fixed in 2023.10.1](#bug-fixed-in-2023-10-1) | October 24, 2023 |

#### Granular permissions to manage directories is self-service EA in Preview

This feature enables you to assign permissions to view and manage directories as part of a customized admin role. <!--OKTA-657510 FF: ENFORCE_NEW_DIRECTORY_PERM -->

#### Bug fixed in 2023.10.1

The Trusted Origins API didn't validate the `origin` parameter correctly. (OKTA-638649)

### Monthly release 2023.10.0

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Permission conditions for profile attributes is GA in Preview](#permission-conditions-for-profile-attributes-is-ga-in-preview) | October 12, 2023 |
| [Demonstrating Proof-of-Possession is GA](#demonstrating-proof-of-possession-is-ga) | March 15, 2023 |
| [Bugs fixed in 2023.10.0](#bugs-fixed-in-2023-10-0) | October 12, 2023 |

#### Permission conditions for profile attributes is GA in Preview

You can now apply conditions to the **View users and their details** and **Edit users' profile attributes** custom admin role permissions. Permission conditions help you limit the scope of a role by including or excluding admins' access to individual profile attributes. This gives you more granular control over your custom admin roles and helps meet your org's unique security needs. See [Permission conditions](https://help.okta.com/okta_help.htm?type=oie&id=ext-permission-conditions). <!-- OKTA-586185 FF: CUSTOM_ADMIN_ROLES_CONDITIONS -->

#### Demonstrating Proof-of-Possession is GA

OAuth 2.0 Demonstrating Proof-of-Possession (DPoP) is a security feature that adds an extra layer of protection to OAuth 2.0 access tokens. It enables the client to demonstrate that it possesses a particular key or secret associated with the access token. OAuth 2.0 DPoP can help prevent certain attacks, such as token theft or token replay attacks, where an attacker intercepts a legitimate access token and uses it to gain unauthorized access to a protected resource. See [Configure OAuth 2.0 Demonstrating Proof-of-Possession](/docs/guides/dpop/main/). <!-- OKTA-585491 FF: OAUTH2_DROP -->

#### Bugs fixed in 2023.10.0

* When an admin configured a custom email domain using the Email Domain API, they couldn't change the autogenerated CNAME record. (OKTA-645037)

* The Custom API Action card in Okta Workflows couldn't authenticate requests to `/api/v1/org/factors/yubikey_token/tokens` endpoints. (OKTA-639624)

## September

### Weekly release 2023.09.1

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bug fixed in 2023.09.1](#bug-fixed-in-2023-09-1) | September 20, 2023 |

#### Bug fixed in 2023.09.1

IdP users were redirected to an unbranded sign-in page after SSO failure. (OKTA-595549)

### Monthly release 2023.09.0

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Automatically assign super admin role to an app](#automatically-assign-super-admin-role-to-an-app) | September 13, 2023 |
| [Authentication challenge for redirects](#authentication-challenge-for-redirects) | September 13, 2023 |
| [Developer documentation update in 2023.09.0](#developer-documentation-update-in-2023-09-0) | September 13, 2023 |
| [Bugs fixed in 2023.09.0](#bugs-fixed-in-2023-09-0) | September 13, 2023 |

#### Automatically assign super admin role to an app
Admins can now automatically assign the super admin role to all of their newly created public client apps. See [Work with the admin component](https://help.okta.com/okta_help.htm?type=oie&id=ext-work-with-admin).

#### Authentication challenge for redirects
Users now receive an authentication challenge for each redirect sent to an Identity Provider with **Factor only** configured, even if the IdP session is active. <!-- OKTA-628504 ENG_FORCE_AUTHN_FOR_FACTORS_IDPS -->

#### Developer documentation update in 2023.09.0

* The [Sign users in to your web app using the redirect model](/docs/guides/sign-into-web-app-redirect/) guide is now easier to read and quicker to complete. This change also removes references to Okta CLI, removes Gin-specific example code from Go content, and adds new example code to ASP.NET content.
* The Style sign-in page guide now describes how to hide or suppress the transient Sign-In Widget for redirect authentication. See [Hide or suppress the transient Sign-In Widget](/docs/guides/custom-widget/main/#hide-or-suppress-the-transient-sign-in-widget).

#### Bugs fixed in 2023.09.0

* A token inline hook secured by an OAuth 2.0 private key returned a 403 error response for all users except the super admin. (OKTA-605996)
* Access policy evaluation for custom authorization servers was inconsistent when default scopes were used. (OKTA-627559)
* Some orgs received an HTTP 500 Internal Server error when using the Users API (PUT `/api/v1/users/{userId}?strict=true`) to update new user profiles. (OKTA-619044)

## August

### Weekly release 2023.08.2

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bug fixed in 2023.08.2](#bug-fixed-in-2023-08-2) | August 29, 2023 |

#### Bug fixed in 2023.08.2

When configuring an API Service Integration (either through the Admin Console or using APIs), you could set a JWKS URL using HTTP instead of HTTPS. (OKTA-601623)

### Weekly release 2023.08.1

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bugs fixed in 2023.08.1](#bugs-fixed-in-2023-08-1) | August 16, 2023 |

#### Bugs fixed in 2023.08.1

* The Active Directory agent version returned by `/api/v1/agentPools/update` was in the format `x.y.z.a` instead of the expected `x.y.z`. (OKTA-597796)
* OpenID Connect `/token` requests using the SAML 2.0 Assertion grant type flow failed if the SAML assertion expiry was greater than 30 days. (OKTA-632131)

### Monthly release 2023.08.0

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [API validation of Agent Pools update requests](#api-validation-of-agent-pools-update-requests) | August 10, 2023 |
| [Authentication challenge for redirects is GA in Preview](#authentication-challenge-for-redirects-is-ga-in-preview) | August 10, 2023 |
| [Policy Simulation API is GA in Preview](#policy-simulation-api-is-ga-in-preview) | June 14, 2023 |
| [Developer documentation update in 2023.08.0](#developer-documentation-update-in-2023-08-0) | August 10, 2023 |
| [Bugs fixed in 2023.08.0](#bugs-fixed-in-2023-08-0) | August 10, 2023 |

#### API validation of Agent Pools update requests

The following fields are required for Agent Pools update requests (`POST /api/v1/agentPools/{poolId}/updates` and
`POST /api/v1/agentPools/{poolId}/updates/{updateId}`):

- 'agent'
- 'name'
- 'agentType'

An API validation exception occurs if any of these fields are missing from the request. <!-- OKTA-430657 -->

#### Authentication challenge for redirects is GA in Preview

Users now receive an authentication challenge for each redirect sent to an Identity Provider with **Factor only** configured, even if the IdP session is active. <!-- OKTA-628504 ENG_FORCE_AUTHN_FOR_FACTORS_IDPS -->

#### Policy Simulation API is GA in Preview

With the Policy API `/simulate` endpoint, you can quickly and easily test policies and validate whether your desired security outcomes are achieved. This endpoint allows you to simulate user access attributes, such as IP address, device, risk, and so on, to test whether the user is granted access to the specified application. This endpoint is implemented in the Admin Console as the [Access Testing Tool](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/policies/access-testing-tool.htm). The `/simulate` endpoint helps you identify potential security risks and compliance issues before you implement a policy. See the [Policy API](/docs/reference/api/policy/#policy-simulation-operations) and [Test your policies with access simulations](/docs/guides/policy-simulation). <!-- OKTA-593826 POLICY_SIMULATION -->

#### Developer documentation update in 2023.08.0

A new [Terraform section](/docs/guides/terraform-landing-page/main/) is available that includes content for using Terraform to automate the management of your Okta org. These guides range from a Terraform overview to optimizing Terraform access in your Okta org. Additionally, there is content for managing user access, groups, and authentication services, customizing the end-user experience, and controlling Terraform access to your Okta org.

#### Bugs fixed in 2023.08.0

- Custom Push Factors used the same `provider` and `vendorName` properties as Okta Verify. These factors now return the `provider` as `CUSTOM` and the `vendorName` as the name of the authenticator. (OKTA-598598)
- Some of the endpoints of the [Resource Sets API](/docs/reference/api/roles/#resource-set-operations) didn't support `self` and `next` link relation types. (OKTA-571339)
- The Users API didn't validate the `saltOrder` property when creating or updating users with salted hashed passwords. (OKTA-602124)
- Users that were provisioned through an IdP could be assigned the Super Admin role due to previous permission checks in group assignments. (OKTA-597974)

## July

### Weekly release 2023.07.1

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bugs fixed in 2023.07.1](#bugs-fixed-in-2023-07-1) | July 26, 2023 |

#### Bugs fixed in 2023.07.1

* Admins with the `Manage users` permission couldn't create users with WS-Federation IdPs. (OKTA-621284)
* Requests to the `/authorize` endpoint failed when the request contained ASCII characters (`%00`) as the scope value. (OKTA-465695)

### Monthly release 2023.07.0

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Okta-generated client secret length increase](#okta-generated-client-secret-length-increase) | July 12, 2023 |
| [ThreatInsight coverage on core Okta API endpoints is GA in Preview](#threatinsight-coverage-on-core-okta-api-endpoints-is-ga-in-preview) | July 12, 2023 |
| [Developer documentation update in 2023.07.0](#developer-documentation-update-in-2023-07-0) | July 12, 2023 |
| [Bug fixed in 2023.07.0](#bug-fixed-in-2023-07-0) | July 12, 2023 |

#### Okta-generated client secret length increase

The length of Okta-generated client secrets has been increased from 40 to 64 characters.
<!-- OKTA-619134 -->

#### ThreatInsight coverage on core Okta API endpoints is GA in Preview

Okta ThreatInsight coverage is now available for core Okta API endpoints ([OIDC & OAuth 2.0](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/), [Okta Management](https://developer.okta.com/docs/api/openapi/okta-management/guides/overview/), and [MyAccount APIs](https://developer.okta.com/docs/api/openapi/okta-myaccount/guides/overview/)). Based on heuristics and machine learning models, ThreatInsight maintains an evolving list of IP addresses that consistently show malicious activity across Okta's customer base. Requests from these bad IP addresses can be blocked or elevated for further analysis when ThreatInsight is enabled for an Okta org. Previously, ThreatInsight coverage only applied to Okta authentication endpoints (including enrollment and recovery endpoints). With this release, enhanced attack patterns are detected for authentication endpoints and limited attack patterns are also detected for non-authentication endpoints. There are no changes to the existing ThreatInsight configuration: you can still enable ThreatInsight with log and block mode, log mode, and exempt network zones. A new `Negative IP Reputation` reason is available for high `security.threat.detected` events. See [System Log events for Okta ThreatInsight](https://help.okta.com/okta_help.htm?type=oie&id=ext-configure-threatinsight-system-log). <!-- OKTA-572915 ENG_ENABLE_TI_BASED_ON_OKTA_IP_REPUTATION -->

#### Developer documentation update in 2023.07.0

The guides within the Primer for OIN OpenID Connect section have been removed. Content for OIDC protocol requirements, multi-tenancy, and best practices have been updated and merged to the [Overview of Single Sign-On in the OIN](/docs/guides/oin-sso-overview/) and [Build an SSO integration](/docs/guides/build-sso-integration/openidconnect/main/) guides. <!-- OKTA-447961 -->

#### Bug fixed in 2023.07.0

* Sometimes HTTP response headers contained duplicate session ID references. (OKTA-621625)

## June

### Weekly release 2023.06.2

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bugs fixed in 2023.06.2](#bugs-fixed-in-2023-06-2) | July 6, 2023 |

#### Bugs fixed in 2023.06.2

* The system log didn't provide user information for an expired password during the Resource Owner Password grant type flow. (OKTA-581464)
* The `max_age=0` property wasn't treated the same as `prompt=login` for OAuth 2.0 `/authorize` requests. (OKTA-588559)
* A delete session request (`/api/v1/sessions/me`) didn't clear the session cookie (`sid`). (OKTA-620986)
* When the List all Trusted Origins API was called with a `filter` on `status`, an error was returned. (OKTA-622646)

### Monthly release 2023.06.0

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [API service integration client secret rotation](#api-service-integration-client-secret-rotation) | June 14, 2023 |
| [Multibrand customizations are GA in Production](#multibrand-customizations-are-ga-in-production) | February 8, 2023 |
| [Pagination for the Brands API is GA in Production](#pagination-for-the-brands-api-is-ga-in-production) | June 14, 2023 |
| [Unique refresh token ID added to token inline hook requests](#unique-refresh-token-id-added-to-token-inline-hook-requests) | June 14, 2023 |
| [Transactional verification with CIBA is GA in Production](#transactional-verification-with-ciba-is-ga-in-production) | June 14, 2023 |
| [Universal Directory attribute and enum limits are GA in Production](#universal-directory-attribute-and-enum-limits-are-ga-in-production) | June 14, 2023 |
| [Bugs fixed in 2023.06.0](#bugs-fixed-in-2023-06-0) | June 14, 2023 |

#### API service integration client secret rotation

New in this release is the ability to rotate client secrets for an API service integration through the API. Previously, if a customer wanted to update the client secret for an API service integration, they would have to reinstall the integration to obtain a new client ID and secret. There was no option to revoke the client secret while maintaining the client ID and API service integration instance in Okta. With this new feature, customers can generate a new secret, deactivate an old secret, and remove a deactivated secret from the API service integration instance. These functionalities help customers implement security best practices without service downtime. See [API Service Integration](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApiServiceIntegrations/#tag/ApiServiceIntegrations/operation/createApiServiceIntegrationInstanceSecret) API references. <!-- OKTA-584715 -->

#### Multibrand customizations are GA in Production

Multibrand customizations allow customers to use one org to manage multiple brands and multiple custom domains. This drastically simplifies multi-tenant architectures where customers create multiple orgs to satisfy branding requirements. Multibrand customizations allow orgs to create up to three custom domains (more upon request), which can be mapped to multiple sign-in pages, multiple sets of emails, error pages, and multiple versions of the End-User Dashboard. See [Brands](/docs/concepts/brands/).  <!-- OKTA-568807 -->

#### Pagination for the Brands API is GA in Production

The Brands API now supports [pagination](/docs/reference/core-okta-api/#pagination) when returning lists of brands. Previously, users would get a list of all brands in the org. With pagination, users receive 20 records per page. See [Customizations](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Customization/). <!-- OKTA-574011 -->

#### Unique refresh token ID added to token inline hook requests

A unique refresh token ID is now included in token inline hook requests. This ensures that the refresh token ID is persisted in the request to maintain seamless access and improve security. This feature is now GA in production. <!-- OKTA-576905 -->

#### Transactional verification with CIBA is GA in Production

Organizations are constantly looking for ways to offer a frictionless user experience without compromising security. It becomes even more challenging when the users try to perform sensitive transactions. Okta uses Client-Initiated Backchannel Authentication (CIBA) to provide customers with a simple and secure transaction verification solution.

CIBA extends OpenID Connect to define a decoupled flow where the authentication or transaction flow is initiated on one device and verified on another. The device in which the transaction is initiated by the OIDC application is called the consumption device, and the device where the user verifies the transaction is called the authentication device. See [Transactional verification using CIBA](/docs/guides/configure-ciba/main/). <!-- OKTA-584442 -->

#### Universal Directory attribute and enum limits are GA in Production

Universal Directory now has limits to the number of attributes per org and the number of enums that can be defined for a single attribute. <!--OKTA-614625-->

#### Bugs fixed in 2023.06.0

* Sometimes requests with an already used scope name didn't return appropriate error messages. (OKTA-570908)
* Some customers received a 500 internal server error in response to a List all apps request. (OKTA-597493)
* Unhelpful error messages appeared when the `NameIdPolicy` was unspecified in SAML client requests that required signed requests. (OKTA-607434)
* The `max_age=0` property wasn't treated the same as `prompt=login` for OAuth 2.0 `/authorize` requests. (OKTA-588559)

## May

### Weekly release 2023.05.3

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bugs fixed in 2023.05.3](#bugs-fixed-in-2023-05-3) | June 07, 2023 |

#### Bugs fixed in 2023.05.3

* Requests to the Email Domains API (DELETE /email-domains/{emailDomainId}) failed if the same domain name was used by multiple orgs. (OKTA-612312)
* Some attributes previously added to user profiles from incoming SAML responses weren't cleared when the attribute was later omitted. (OKTA-609021)
* The Begmati Nepal region (`NP`) was missing from the Dynamic Zone `locations` property. (OKTA-605016)

### Weekly release 2023.05.2

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bug fixed in 2023.05.2](#bug-fixed-in-2023-05-2) | May 24, 2023 |

#### Bug fixed in 2023.05.2

Token inline hooks failed even when a URL claim name was correctly encoded with a JSON pointer. (OKTA-602794)

### Weekly release 2023.05.1

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bugs fixed in 2023.05.1](#bugs-fixed-in-2023-05-1) | May 17, 2023 |

#### Bugs fixed in 2023.05.1

* Users attempting to sign in to an app weren't prompted to sign in at the SAML Identity Provider when `prompt=login` and `idp={IdP}` were passed in the `/authorize` request. (OKTA-601342)

* Calling `/api/v1/groups/groupId/apps` with the Okta Administrators Group ID returned a 403 error code. (OKTA-606150)

### Monthly release 2023.05.0

| Change | Expected in Preview Orgs |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------|
| [OAuth 2.0 On-Behalf-Of Token Exchange is GA in Production](#oauth-2-0-on-behalf-of-token-exchange-is-ga-in-production) | February 8, 2023 |
| [Multibrand customizations are EA in Preview](#multibrand-customizations-are-ga-in-preview) | February 8, 2023 |
| [Password hooks global availability is GA in Preview](#password-hooks-global-availability-is-ga-in-preview) | December 20, 2020 |
| [Event hook filtering is EA in Preview](#event-hook-filtering-is-ea-in-preview) | May 11, 2023 |
| [Identity store property for the Applications API](#identity-store-property-for-the-applications-api) | May 3, 2023 |
| [Unique refresh token ID added to token inline hook requests](#unique-refresh-token-id-added-to-token-inline-hook-requests) | May 11, 2023 |
| [Additional measures to counter toll fraud](#additional-measures-to-counter-toll-fraud) | May 11, 2023 |
| [Developer documentation update in 2023.05.0](#developer-documentation-update-in-2023-05-0) | May 11, 2023 |
| [Bug fixed in 2023.05.0](#bug-fixed-in-2023-05-0) | May 11, 2023 |

#### OAuth 2.0 On-Behalf-Of Token Exchange is GA in Production

OAuth 2.0 On-Behalf-Of Token Exchange helps retain the user context in requests to downstream services. It provides a protocol approach to support scenarios where a client can exchange an access token received from an upstream client with a new token by interacting with the authorization server. See [Set up OAuth 2.0 On-Behalf-Of Token Exchange](/docs/guides/set-up-token-exchange/main/). <!--OKTA-572343--> <!--FF: ON_BEHALF_TOKEN_EXCHANGE-->

#### Multibrand customizations are GA in Preview

Multibrand customizations allow customers to use one org to manage multiple brands and multiple custom domains. This drastically simplifies multi-tenant architectures where customers create multiple orgs to satisfy branding requirements. Multibrand customizations allow orgs to create up to three custom domains (more upon request), which can be mapped to multiple sign-in pages, multiple sets of emails, error pages, and multiple versions of the End-User Dashboard. See [Brands](/docs/concepts/brands/). <!--OKTA-587566, OKTA-568807-->

#### Password hooks global availability is GA in Preview

The [Create User with password import inline hook](/docs/reference/api/users/#create-user-with-password-import-inline-hook) operation is now available for all users. Previously, password hooks required a user to be in the `STAGED` status. This change helps better support migration efforts from DelAuth to Okta. <!--OKTA-604521--> <!--FF: ENG_ALLOW_PASSWORD_IMPORT_HOOKS_FOR_USERS_IN_ANY_STATUS--> <!--Originally available in December 2020-->

#### Event hook filtering is EA in Preview

You can now filter individual events of the same event type based on custom business logic hosted in Okta. These filters reduce the amount of events that trigger hooks, removing an unnecessary load on your external service.

This feature includes an improved creation workflow for event hooks and a new **Filters** tab that you can use to create event filters with direct Expression Language statements or with a simple UI format.

Using event hook filters significantly reduces the amount of event hook requests and the need for custom code on your respective services. See [Which events are eligible](/docs/concepts/event-hooks/#which-events-are-eligible) and [Event hook filtering](/docs/guides/event-hook-filtering/main/). <!--OKTA-592286--> <!--FF: EVENT_HOOK_FILTERING-->

#### Identity store property for the Applications API

A new `identityStoreId` property is now available in the Applications API resource (`/api/v1/apps`) to store an identity store app associated with your app. You can set the `identityStoreId` value to the `id` of the identity store app you previously created in the same org. See the [optional `settings.identityStoreId` property](/docs/reference/api/apps/#identity-store-id). <!--OKTA-595777--> <!--FF: DYNAMIC_UI_APPS_API_AUGMENT--> <!--Orig avail 2023.04.2-->

#### Unique refresh token ID added to token inline hook requests

A unique refresh token ID is now included in token inline hook requests. This ensures that the refresh token ID is persisted in the request to maintain seamless access and improve security. <!--OKTA-576905--> <!--FF: ENG_REFRESH_TOKEN_ID_IN_TOKEN_INLINE_HOOK-->

#### Additional measures to counter toll fraud

For SMS and voice authentications, additional mitigation measures now help counter phone number-based toll fraud. <!--OKTA-603999--> <!--Set TEL_CAT_AREA_CODE_RL_RULE to HARD enforcement-->

#### Developer documentation update in 2023.05.0

A new event hook guide is available that demonstrates the self-service EA feature event hook filtering. Filter only those event instances you want to trigger an event hook. See [Event hook filtering](https://developer.okta.com/docs/guides/event-hook-filtering/main/). <!--OKTA-592286-->

#### Bug fixed in 2023.05.0

Admins saw Okta FastPass listed in the `GET /api/v1/users/{{userId}}/factors` response for users who didn't enable the factor. (OKTA-603999)

## April

### Weekly release 2023.04.3

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bugs fixed in 2023.04.3](#bugs-fixed-in-2023-04-3) | May 3, 2023 |

#### Bugs fixed in 2023.04.3

* Signed SAML requests weren't validated correctly when the `relayState` was set to `null`. (OKTA-597738)

* An API request to retrieve app instances (GET `/apps`) returned a large custom payload in the `settings.app.domains` property for an Office 365 app instance. (OKTA-593595)

* Some requests to the Sessions API (`/sessions`) with an SSWS token returned an HTTP 500 Internal Server error. (OKTA-306349)

### Weekly release 2023.04.2

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bugs fixed in 2023.04.2](#bugs-fixed-in-2023-04-2) | April 26, 2023 |

#### Bugs fixed in 2023.04.2

- When the sign-in page was edited using the code editor, the event type `system.custom_error.update` was logged. (OKTA-591800)

- A `next` link wasn't returned when a List Identity Providers request was made and a limit of 200 was set. (OKTA-597359)

- When the API Service Integration feature is disabled, a query for inactive app integrations incorrectly returned a list with revoked API service integrations. (OKTA-596437)

### Weekly release 2023.04.1

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bug fixed in 2023.04.1](#bug-fixed-in-2023-04-1) | April 12, 2023 |

#### Bug fixed in 2023.04.1

Orgs with Multibrand enabled couldn't add the same custom email domain that they'd previously deleted. (OKTA-587938)

### Monthly release 2023.04.0

| Change | Expected in Preview Orgs |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------|
| [Support added for DPoP with service apps](#support-added-for-dpop-with-service-apps) | April 05, 2023 |
| [OAuth 2.0 authentication for inline hooks is GA in Production](#oauth-2-0-authentication-for-inline-hooks-is-ga-in-production) | October 05, 2022 |
| [API service integrations are GA in Production](#api-service-integrations-are-ga-in-production) | November 03, 2022 |
| [OIN Manager support for Workflow Connector submission is GA in Production](#oin-manager-support-for-workflow-connector-submission-is-ga-in-production) | March 08, 2023 |
| [OAuth 2.0 grant scopes added](#oauth-2-0-grant-scopes-added) | April 05, 2023 |
| [Scope parameter length increased](#scope-parameter-length-increased) | April 05, 2023 |
| [OAuth 2.0 On-Behalf-Of Token Exchange is GA in Preview](#oauth-2-0-on-behalf-of-token-exchange-is-ga-in-preview) | February 08, 2023 |
| [Configurable rate limits for OAuth 2.0 apps is GA in Production](#configurable-rate-limits-for-oauth-2-0-apps-is-ga-in-production) | March 08, 2023 |
| [Developer documentation update in 2023.04.0](#developer-documentation-update-in-2023-04-0) | April 05, 2023 |
| [Bug fixed in 2023.04.0](#bug-fixed-in-2023-04-0) | April 05, 2023 |

#### Support added for DPoP with service apps

Okta now supports [Demonstrating Proof-of-Possession](/docs/guides/dpop/main/) for service apps. However, service apps can provide the same level of security by using `private_key_jwt` for [client authentication](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/).<!--OKTA-592258-->

#### OAuth 2.0 authentication for inline hooks is GA in Production

Okta inline hook calls to third-party external web services previously provided only header-based authentication for security. Although sent with SSL, the header or custom header authentication didn't meet more stringent security requirements for various clients and industries.

To improve the security of inline hooks, Okta now supports authentication with OAuth 2.0 access tokens. Tokens ensure secure calls to external web services.

When creating inline hooks in the Admin Console (or by API), administrators or developers can now select OAuth 2.0 authentication and choose between two methods of OAuth 2.0: Client Secret or Private Key. A new Key Management API and Admin Console page is also available to create public/private key pairs for use with OAuth 2.0 inline hooks. See [Key management](https://help.okta.com/okta_help.htm?type=oie&id=ext-key-management).

Using the OAuth 2.0 framework provides better security than Basic Authentication or custom headers, and is less work than setting up an IP allowlisting solution. Clients also have the ability to use access tokens minted by their own custom authorization servers to guarantee that Okta is calling their client web services and isn't triggered by any external actors. See [Add an inline hook](https://help.okta.com/okta_help.htm?type=oie&id=ext-add-inline-hook). <!--OKTA-581803-->

#### API service integrations are GA in Production

A service-to-service app where a backend service or a daemon calls Okta management APIs for a tenant (Okta org) can be published in the Okta Integration Network (OIN) as an API service integration. This integration type allows your service app to access your customer Okta org through Okta management APIs using the OAuth 2.0 Client Credentials flow. API service integrations provide secure, reliable, and least-privilege scoped access to Okta APIs without being associated with a user, so service isn't disrupted when the user is no longer involved with service integration activities. See [API service integrations in the OIN](/docs/guides/oin-api-service-overview/). OIN Manager has been updated to support testing and submitting API service integrations. After your service integration is published in the OIN, workforce customers can discover and configure your integration with ease. See [Build an API service integration](/docs/guides/build-api-integration/main/). <!--OKTA-577514-->

#### OIN Manager support for Workflow Connector submission is GA in Production

Okta [Workflows](https://www.okta.com/platform/workflows/) is a no-code, if-this-then-that logic builder that Okta orgs can use to automate custom or complex employee onboarding and offboarding flows in your application. You can now publish Workflow connectors that you create with the [Workflows Connector Builder](https://help.okta.com/okta_help.htm?type=wf&id=ext-connector-builder) in the Okta Integration Network (OIN) catalog. Publishing a Workflows connector with Okta allows your customers to deeply integrate your product with all other connectors in the catalog. Submit your Workflow connector by using the OIN Manager. See [Submit an integration](/docs/guides/submit-app/wfconnector/main/#submit-an-integration) for Workflows connectors. <!--OKTA-571943 & OKTA-573202-->

#### OAuth 2.0 grant scopes added

The OAuth 2.0 `okta.appGrants.manage` and `okta.appGrants.read` grant scopes are now available for use with the `/apps/{id}/grants` and `/apps/{id}/grants/{grantId}` endpoints.<!--OKTA-568970-->

#### Scope parameter length increased

The maximum length for the scope parameter of a refresh token request is now 4096 characters.<!--OKTA-573127-->

#### OAuth 2.0 On-Behalf-Of Token Exchange is GA in Preview

OAuth 2.0 On-Behalf-Of Token Exchange helps retain the user context in requests to downstream services. It provides a protocol approach to support scenarios where a client can exchange an access token received from an upstream client with a new token by interacting with the authorization server. See [Set up OAuth 2.0 On-Behalf-Of Token Exchange](/docs/guides/set-up-token-exchange/main/). <!--OKTA-572343 -->

#### Configurable rate limits for OAuth 2.0 apps is GA in Production

Rate limit violations mainly occur on authenticated endpoints. Currently, it isn't clear which OAuth 2.0 authenticated app consumes all the rate limits for an org. This increases the risk that one app consumes the entire rate limit bucket. To avoid this possibility, Okta admins can now configure how much rate limit capacity an individual OAuth 2.0 app can consume by editing the Application rate limits tab for each app. By setting a capacity on individual OAuth 2.0 apps, Okta admins have a new tool to monitor and investigate rate limit violations, and have the ability to view rate limit traffic generated by individual OAuth 2.0 apps. See [Rate limit dashboard bar graph](/docs/reference/rl-dashboard/#bar-graph). <!--OKTA-573387-->

#### Developer documentation update in 2023.04.0

A new sign-in redirect guide is available for single page apps (SPA) using JavaScript and the Auth JS SDK. No frontend framework required! A quick and easy demonstration of the redirect sign-in flow. See [Sign users in to your SPA using the redirect model and Auth JS](/docs/guides/auth-js-redirect/main/). <!--OKTA-577531-->

#### Bug fixed in 2023.04.0

The Identity Sources API bulk upsert operation accepted an empty profile payload. (OKTA-533011)

## March

### Weekly release 2023.03.3

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bugs fixed in 2023.03.3](#bugs-fixed-in-2023-03-3) | March 29, 2023 |

#### Bugs fixed in 2023.03.3

* App sign-on events with usernames that exceeded 100 characters weren't always added to the System Log. (OKTA-585478)
* CSV values that could trigger a computation weren't escaped in the `User-Agent` string. (OKTA-452381)
* The groups count on the Admin Dashboard was incorrect. (OKTA-592512)
* Some validations weren't enforced when requests were made to the Apps API. (OKTA-585354)

### Weekly release 2023.03.2

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bugs fixed in 2023.03.2](#bugs-fixed-in-2023-03-2) | March 22, 2023 |

#### Bugs fixed in 2023.03.2

* In some cases, groups with a `status` of INACTIVE were synchronized with the reporting database as ACTIVE. (OKTA-589084)

* Requests to the Policies API (`PUT /policies/${defaultIdpPolicy}/rules/${IdpRule}`) with an empty `userIdentifier` parameter returned an HTTP 500 Internal Server error. (OKTA-565856)

* Admins were able to modify the `auth_time` claim for an access token using a token inline hook. (OKTA-503099)

### Weekly release 2023.03.1

| Change | Expected in Preview Orgs |
|------------------------------------------------------------------------------------------------------------------|---------------|
| [Demonstrating Proof-of-Possession is self-service EA in Preview](#demonstrating-proof-of-possession-is-self-service-ea-in-preview)                                                              |March 15, 2023 |
| [Bug fixed in 2023.03.1](#bug-fixed-in-2023-03-1)                                                              |March 15, 2023 |

#### Demonstrating Proof-of-Possession is self-service EA in Preview

OAuth 2.0 Demonstrating Proof-of-Possession (DPoP) is a security feature that adds an extra layer of protection to OAuth 2.0 access tokens. It enables the client to demonstrate that it possesses a particular key or secret associated with the access token. OAuth 2.0 DPoP can help prevent certain attacks, such as token theft or token replay attacks, where an attacker intercepts a legitimate access token and uses it to gain unauthorized access to a protected resource. See [Configure OAuth 2.0 Demonstrating Proof-of-Possession](/docs/guides/dpop/main/). <!--OKTA-585491-->

#### Bug fixed in 2023.03.1

Using the Policy API, admins were able to set the `MFA_ENROLL` policy factor settings to allow Okta Verify Push but not allow Okta Verify OTP at the same time. (OKTA-567906)

### Monthly release 2023.03.0

| Change | Expected in Preview Orgs |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------|
| [Configurable rate limits for OAuth 2.0 apps is GA in Preview](#configurable-rate-limits-for-oauth-2-0-apps-is-ga-in-preview)                                 |March 08, 2023    |
| [OIDC Identity Providers private/public key pair support is GA](#oidc-identity-providers-private-public-key-pair-support-is-ga)                               |June 08, 2022     |
| [API service integrations are GA in Preview](#api-service-integrations-are-ga-in-preview)                                                                     |November 03, 2022 |
| [Log Streaming is GA in Production](#log-streaming-is-ga-in-production)                                                                                       |March 30, 2022    |
| [Optional consent for OAuth 2.0 scopes is GA in Production](#optional-consent-for-oauth-2-0-scopes-is-ga-in-production)                                       |January 11, 2023  |
| [OAuth 2.0 authentication for inline hooks is GA in Preview](#oauth-2-0-authentication-for-inline-hooks-is-ga-in-preview)                                     |October 05, 2022  |
| [Honor force authentication support for SAML Apps API](#honor-force-authentication-support-for-saml-apps-api)                                                 |March 08, 2023    |
| [OIN Manager support for Workflow Connector submission is GA in Preview](#oin-manager-support-for-workflow-connector-submission-is-ga-in-preview)             |March 08, 2023    |
| [Rate limit increased for Event Hooks](#rate-limit-increased-for-event-hooks)                                                                                 |March 08, 2023    |
| [Bug fixed in 2023.03.0](#bug-fixed-in-2023-03-0)                                                                                                           |March 08, 2023    |

#### Configurable rate limits for OAuth 2.0 apps is GA in Preview

Rate limit violations mainly occur on authenticated endpoints. Currently, it isn't clear which OAuth 2.0 authenticated app consumes all the rate limits for an org. This increases the risk that one app consumes the entire rate limit bucket. To avoid this possibility, Okta admins can now configure how much rate limit capacity an individual OAuth 2.0 app can consume by editing the Application rate limits tab for each app. By setting a capacity on individual OAuth 2.0 apps, Okta admins have a new tool to monitor and investigate rate limit violations, and have the ability to view rate limit traffic generated by individual OAuth 2.0 apps. See [Rate limit dashboard bar graph](/docs/reference/rl-dashboard/#bar-graph). <!--OKTA-573387-->

#### OIDC Identity Providers private/public key pair support is GA

Previously, Okta only supported the use of client secret as the client authentication method with an OpenID Connect-based Identity Provider. Okta now supports the use of private/public key pairs (`private_key_jwt`) with OpenID Connect-based Identity Providers. Additionally, the Signed Request Object now also supports the use of private/public key pairs. See [Create an Identity Provider in Okta](/docs/guides/add-an-external-idp/openidconnect/main/#custom-okta-hosted-sign-in-page). <!--OKTA-573913-->

#### API service integrations are GA in Preview

A service-to-service app where a backend service or a daemon calls Okta management APIs for a tenant (Okta org) can be published in the Okta Integration Network (OIN) as an API service integration. This integration type allows your service app to access your customer Okta org through Okta management APIs using the OAuth 2.0 Client Credentials flow. API service integrations provide secure, reliable, and least-privilege scoped access to Okta APIs without being associated with a user, so service isn't disrupted when the user is no longer involved with service integration activities. See [API service integrations in the OIN](/docs/guides/oin-api-service-overview/). OIN Manager has been updated to support testing and submitting API service integrations. After your service integration is published in the OIN, workforce customers can discover and configure your integration with ease. See [Build an API service integration](/docs/guides/build-api-integration/main/). <!--OKTA-577514-->

#### Log Streaming is GA in Production

Many organizations use third-party systems to monitor, aggregate, and act on the event data in Okta System Log events.

Log Streaming enables Okta admins to more easily and securely send System Log events to a specified systems, such as the Splunk Cloud or Amazon Eventbridge, in near real time with simple, pre-built connectors. Log streaming scales well even with high event volume, and unlike many existing System Log event collectors, it doesn't require a third-party system to store an Okta Admin API token. See [Log Streaming API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/LogStream/). <!--OKTA-578532-->

#### Optional consent for OAuth 2.0 scopes is GA in Production

OAuth 2.0 Optional consent provides an optional property that enables a user to opt in or out of an app's requested OAuth scopes. When optional is set to true for a scope, the user can skip consent for that scope. See [Request user consent](/docs/guides/request-user-consent/main/). <!--OKTA-581292-->

#### OAuth 2.0 authentication for inline hooks is GA in Preview

Okta inline hook calls to third-party external web services previously provided only header-based authentication for security. Although sent with SSL, the header or custom header authentication didn't meet more stringent security requirements for various clients and industries.

To improve the security of inline hooks, Okta now supports authentication with OAuth 2.0 access tokens. Tokens ensure secure calls to external web services.

When creating inline hooks in the Admin Console (or by API), administrators or developers can now select OAuth 2.0 authentication and choose between two methods of OAuth 2.0: Client Secret or Private Key. A new Key Management API and Admin Console page is also available to create public/private key pairs for use with OAuth 2.0 inline hooks. See [Key management](https://help.okta.com/okta_help.htm?type=oie&id=ext-key-management).

Using the OAuth 2.0 framework provides better security than Basic Authentication or custom headers, and is less work than setting up an IP allowlisting solution. Clients also have the ability to use access tokens minted by their own custom authorization servers to guarantee that Okta is calling their client web services and isn't triggered by any external actors. See [Add an inline hook](https://help.okta.com/okta_help.htm?type=oie&id=ext-add-inline-hook). <!--OKTA-581803-->

#### Honor force authentication support for SAML Apps API

Previously, the **Honor Force Authentication** parameter (`honorForceAuthn`) could only be set from the [SAML 2.0 App Integration Wizard](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-aiw-saml). When this property is set to `true`, users are prompted for their credentials when a SAML request has the `ForceAuthn` attribute set to `true`. You can now set this property for your SAML app without using the app integration wizard. See the [SAML 2.0 settings parameters in the Apps API](/docs/reference/api/apps/#add-saml-2-0-authentication-application). <!--OKTA-550077-->

#### OIN Manager support for Workflow Connector submission is GA in Preview

Okta [Workflows](https://www.okta.com/platform/workflows/) is a no-code, if-this-then-that logic builder that Okta orgs can use to automate custom or complex employee onboarding and offboarding flows in your application. You can now publish Workflow connectors that you create with the [Workflows Connector Builder](https://help.okta.com/okta_help.htm?type=wf&id=ext-connector-builder) in the Okta Integration Network (OIN) catalog. Publishing a Workflows connector with Okta allows your customers to deeply integrate your product with all other connectors in the catalog. Submit your Workflow connector by using the OIN Manager. See [Submit an integration](/docs/guides/submit-app/wfconnector/main/#submit-an-integration) for Workflows connectors. <!--OKTA-571943 & OKTA-573202-->

#### Rate limit increased for Event Hooks

The number of events that can be delivered to Event Hooks is now 400,000 events per org, per day. See [Rate limits](https://developer.okta.com/docs/concepts/event-hooks/#rate-limits). <!--OKTA-573847-->

#### Bug fixed in 2023.03.0

When an admin used a group limit in an expression that was greater than 100 (for example, `Groups.startsWith("active_directory","",500)` ), /userinfo endpoint requests failed. (OKTA-576414)

## February

### Weekly release 2023.02.2

| Change | Expected in Preview Orgs |
|------------------------------------------------------------------------------------------------------------------|---------------|
| [Bugs fixed in 2023.02.2](#bugs-fixed-in-2023-02-2)                                                              |March 02, 2023 |

#### Bugs fixed in 2023.02.2

* Some event hook requests failed to send in Preview orgs. (OKTA-578439)

* Events weren't logged in the System Log when the Users API (`DELETE /users/${userId}/clients/${clientId}/tokens/${tokenId}`) was used to revoke refresh tokens. (OKTA-574992)

* Pagination and search query matching didn't work as expected when a list request was made using the `/idps` API. (OKTA-577464)

* Some non-super admins could manage group memberships of admin groups with custom roles. (OKTA-577807)

### Weekly release 2023.02.1

| Change | Expected in Preview Orgs |
|------------------------------------------------------------------------------------------------------------------|-----------------|
| [Bugs fixed in 2023.02.1](#bugs-fixed-in-2023-02-1)                                                              |February 15, 2023 |

#### Bugs fixed in 2023.02.1

* Case sensitivity caused usernames sent in SAML 2.0 IdP assertions not to match usernames in the destination org if a custom IdP factor was used and the name ID format was unspecified. (OKTA-565984)

* Some users weren't able to re-enroll an account in Okta Verify that was previously unenrolled with another mechanism that used the Factors API. (OKTA-573421)

* The YubiKey Report wasn't generated when certain report filters were applied. (OKTA-561269)

### Monthly release 2023.02.0

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Applications API support for SAML metadata attributes](#applications-api-support-for-saml-metadata-attributes) | February 8, 2023 |
| [Custom app login deprecated is GA in Production](#custom-app-login-deprecated-is-ga-in-production)| January 11, 2023 |
| [Full-featured code editor is GA in Production](#full-featured-code-editor-is-ga-in-production) | February 8, 2023 |
| [Log Streaming is GA in Preview](#log-streaming-is-ga-in-preview) | March 30, 2022 |
| [Multibrand customizations are EA in Preview](#multibrand-customizations-are-ea-in-preview) | February 8, 2023 |
| [OAuth 2.0 On-Behalf-Of Token Exchange is EA in Preview](#oauth-2-0-on-behalf-of-token-exchange-is-ea-in-preview) | February 8, 2023 |
| [OIDC Identity Providers private/public key pair support is GA in Preview](#oidc-identity-providers-private-public-key-pair-support-is-ga-in-preview) | June 8, 2022 |
| [Optional consent for OAuth 2.0 scopes is GA in Preview](#optional-consent-for-oauth-2-0-scopes-is-ga-in-preview) | January 11, 2023 |
| [Splunk edition support for Log Streaming integrations is GA in Preview](#splunk-edition-support-for-log-streaming-integrations-is-ga-in-preview) | February 8, 2023 |
| [Updated AWS EventBridge supported regions for Log Stream integrations](#updated-aws-eventbridge-supported-regions-for-log-stream-integrations) | February 8, 2023 |
| [Developer documentation updates in 2023.02.0](#developer-documentation-updates-in-2023-02-0) | February 8, 2023 |
| [Bugs fixed in 2023.02.0](#bugs-fixed-in-2023-02-0) | February 8, 2023 |

#### Applications API support for SAML metadata attributes

The Applications API now supports metadata dynamic SAML attributes inherited from the SAML app. The SAML attributes are used to manage configured group attributes. The Admin Console displays the dynamic SAML attributes as **Configure SAML Attributes**, and the API returns these attributes as the `settings.signOn.configuredAttributeStatements` property in the [SAML application object](/docs/reference/api/apps/#add-saml-2-0-authentication-application). <!--OKTA-573057,OKTA-549695-->

#### Custom app login deprecated is GA in Production

The custom app login feature is deprecated. This functionality is unchanged for orgs that actively use custom app login. Orgs that don't use custom app login should continue to use the [Okta-hosted sign-in experience](/docs/guides/redirect-authentication/) or [configure IdP routing rules](https://help.okta.com/okta_help.htm?type=oie&id=ext-cfg-routing-rules) that redirect users to the appropriate app to sign in. <!--OKTA-561569-->

#### Full-featured code editor is GA in Production

The full-featured code editor makes editing code for the sign-in page, email templates, and error pages more efficient and less reliant on documentation. Developers can write, test, and publish code faster with syntax highlighting, autocomplete for variables, split versus unified diff views, and **Revert**, **Preview**, and **Publish** buttons. See [Use the code editor](/docs/guides/custom-widget/main/#use-the-code-editor). <!--OKTA-568606-->

#### Log Streaming is GA in Preview

Many organizations use third-party systems to monitor, aggregate, and act on the event data in Okta System Log events.

Log Streaming enables Okta admins to more easily and securely send System Log events to a specified systems, such as the Splunk Cloud or Amazon Eventbridge, in near real time with simple, pre-built connectors. Log streaming scales well even with high event volume, and unlike many existing System Log event collectors, it doesn't require a third-party system to store an Okta Admin API token. See [Log Streaming API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/LogStream/). <!--OKTA-565478-->

#### Multibrand customizations are EA in Preview

Multibrand customizations allow customers to use one org to manage multiple brands and multiple custom domains. This drastically simplifies multi-tenant architectures where customers create multiple orgs to satisfy branding requirements. Multibrand customizations allow orgs to create up to three custom domains (more upon request), which can be mapped to multiple sign-in pages, multiple sets of emails, error pages, and multiple versions of the End-User Dashboard. See [Brands](/docs/concepts/brands/). <!--OKTA-568831, OKTA-568807-->

#### OAuth 2.0 On-Behalf-Of Token Exchange is EA in Preview

OAuth 2.0 On-Behalf-Of Token Exchange helps retain the user context in requests to downstream services. It provides a protocol approach to support scenarios where a client can exchange an access token received from an upstream client with a new token by interacting with the authorization server. See [Set up OAuth 2.0 On-Behalf-Of Token Exchange](/docs/guides/set-up-token-exchange/main/). <!--OKTA-572343 -->

#### OIDC Identity Providers private/public key pair support is GA in Preview

Previously, Okta only supported the use of client secret as the client authentication method with an OpenID Connect-based Identity Provider. Okta now supports the use of private/public key pairs (`private_key_jwt`) with OpenID Connect-based Identity Providers. Additionally, the Signed Request Object now also supports the use of private/public key pairs. See [Create an Identity Provider in Okta](/docs/guides/add-an-external-idp/openidconnect/main/#create-an-identity-provider-in-okta). <!--OKTA-573913-->

#### Optional consent for OAuth 2.0 scopes is GA in Preview

OAuth 2.0 Optional Consent provides an optional property that enables a user to opt in or out of an app's requested OAuth scopes. When optional is set to true for a scope, the user can skip consent for that scope. See [Request user consent](/docs/guides/request-user-consent/). <!--OKTA-571987-->

#### Splunk edition support for Log Streaming integrations is GA in Preview

The Splunk Cloud Log Streaming integration now supports GCP and GovCloud customers. You can set the Splunk edition parameter (`settings.edition`) to AWS (`aws`), GCP (`gcp`), or AWS GovCloud (`aws_govcloud`) in your Log Streaming integration. See [Splunk Cloud Settings properties](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/LogStream/#tag/LogStream/operation/createLogStream!path=1/settings&t=request). <!--OKTA-544449-->

#### Updated AWS EventBridge supported regions for Log Stream integrations

The list of supported AWS EventBridge regions has been updated based on configurable event sources. See the [list of available AWS regions for Log Stream integrations](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/LogStream/#tag/LogStream/operation/createLogStream!path=0/settings/region&t=request). <!--OKTA-573094-->

#### Developer documentation updates in 2023.02.0

* The Okta Developer portal has a new look and feel. The [home page](https://developer.okta.com/) features a curated set of resources on developer use cases for Workforce Identity Cloud solutions. You can also access the featured blog posts to stay up to date with implementing Okta features.

* A new authorization guide is available to help admins and devs retain the user context in requests to downstream services. This document  provides guidance on how a client can exchange an access token received from an upstream client with a new token by interacting with the authorization server. See [Set up OAuth 2.0 On-Behalf-Of Token Exchange](/docs/guides/set-up-token-exchange/main/).

* A new requirements guide is available for integration submissions to the Okta Integration Network (OIN). This document provides guidance for the artifacts required during the submission process, such as the logo, the customer configuration document, and the test account. See [OIN submission requirements](/docs/guides/submit-app-prereq/).

#### Bugs fixed in 2023.02.0

* The `max_age` and `login_hint` parameters in an authorize request were sometimes ignored when a client used the `private_key_jwt` client authentication method. (OKTA-573320)

* GET requests to the `/brands/{brandId}` endpoint didn't return the previously saved `agreeToCustomPrivacyPolicy`. (OKTA-568074)

* GET requests to the `/brands/{brandId}/pages/sign-in/customized` endpoint returned `null` for `widgetCustomizations`. As a result, the updates weren't applied to the Okta Admin Console sign-in page. (OKTA-563838)

* The Add Group API (`/api/v1/groups`) created multiple groups of the same name if called within a short period of time (milliseconds). (OKTA-561481)

* The response took longer than necessary when an admin sent a request to delete an OpenID Connect app. (OKTA-531089)

* The Roles API (`/iam/roles`) didn't support the self and next link relation types. (OKTA-512280)

## January

### Weekly release 2023.01.2

| Change | Expected in Preview Orgs |
|------------------------------------------------------------------------------------------------------------------|-----------------|
| [Clock skew for access and ID tokens](#clock-skew-for-access-and-id-tokens)                                      |February 1, 2023 |
| [Content Security Policy update](#content-security-policy-update)                                                |February 1, 2023 |
| [Bugs fixed in 2023.01.2](#bugs-fixed-in-2023-01-2)                                                              |February 1, 2023 |

#### Clock skew for access and ID tokens

A 30-second clock skew is now allowed for access and ID tokens to validate that a token was created before the current time. <!--OKTA-538956 -->

#### Content Security Policy update

Over the next few months, we are gradually releasing enhancements to our [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) headers. During this time you may notice an increase in header sizes. <!--OKTA-567669-->

#### Bugs fixed in 2023.01.2

* Requests made with an empty Origin header returned an error response. (OKTA-449621)

* An error occurred if a request was made to the `/authorize` endpoint of a custom authorization server and the `prompt` parameter value was set to `enroll_authenticator`.  (OKTA-552063)

* Requests to assign a custom role to a user or group returned a generic Bad Request error when the required `role` or `resource-set` property was missing. (OKTA-538237)

* Some custom admins didn't see groups and users that they had access to when they made a `GET` request to the Users (`/users/{id}/groups`) and Groups (`/groups/{id}/users`) APIs. (OKTA-568838)

* An unclear error message was returned when a group rules API call (`create`, `update`, or `activate`) was made to assign users to read-only groups (for example, `Everyone`). (OKTA-567972)

### Weekly release 2023.01.1

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2023.01.1](#bugs-fixed-in-2023-01-1)                       |January 19, 2023           |

#### Bugs fixed in 2023.01.1

* Requests failed when an admin used a group limit in an expression that was more than 100 (for example, `getFilteredGroups(groupallowlist, group_expression, 101)`). (OKTA-565041)

* Requests failed when an admin used a group limit in an expression that was less than the number of groups that satisfied the request (for example, `Groups.startsWith("active_directory","eai_",10)`). (OKTA-556056)

* Users could request that one-time passwords for SMS, Voice, and Email activation be resent more times than allowed by the rate limit. (OKTA-550739)

### Monthly release 2023.01.0

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Custom app login deprecated](#custom-app-login-deprecated) | January 11, 2023 |
| [Full regional support for AWS EventBridge Log Stream integrations is EA in Preview](#full-regional-support-for-aws-eventbridge-log-stream-integrations-is-ea-in-preview) | January 11, 2023 |
| [Optional consent for OAuth 2.0 scopes is EA in Preview](#optional-consent-for-oauth-2-0-scopes-is-ea-in-preview) | January 11, 2023 |
| [Password history policy enforced in strict mode is GA in Production](#password-history-policy-enforced-in-strict-mode-is-ga-in-production) | December 9, 2022 |
| [PBKDF2 Hashing Algorithm support is GA in Production](#pbkdf2-hashing-algorithm-support-is-ga-in-production) | December 9, 2022 |
| [Revoke user sessions is GA in Production](#revoke-user-sessions-is-ga-in-production) | December 9, 2022 |
| [Unusual telephony requests blocked by machine-learning measures](#unusual-telephony-requests-blocked-by-machine-learning-measures) | January 11, 2023 |
| [Bugs fixed in 2023.01.0](#bugs-fixed-in-2023-01-0) | January 11, 2023 |

#### Custom app login deprecated

The custom app login feature is deprecated. This functionality is unchanged for orgs that actively use custom app login. Orgs that don't use custom app login should continue to use the [Okta-hosted sign-in experience](/docs/guides/redirect-authentication/) or [configure IdP routing rules](https://help.okta.com/okta_help.htm?type=oie&id=ext-cfg-routing-rules) that redirect users to the appropriate app to sign in. <!-- OKTA-564039-->

#### Full regional support for AWS EventBridge Log Stream integrations is EA in Preview

The Log Streaming API has expanded support for all commercial regions in the AWS EventBridge Log Stream integration. See [AWS EventBridge Setting property details](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/LogStream/#tag/LogStream/operation/createLogStream!path=0/settings/region&t=request). <!-- OKTA-540378-->

#### Optional consent for OAuth 2.0 scopes is EA in Preview

OAuth 2.0 Optional Consent provides an optional property that enables a user to opt in or out of an app's requested OAuth scopes. When optional is set to true for a scope, the user can skip consent for that scope. See [Request user consent](/docs/guides/request-user-consent/). <!-- OKTA-563884-->

#### Password history policy enforced in strict mode is GA in Production

When an admin [updates passwords](/docs/reference/api/users/#update-user) and sets the `strict` parameter to `true`, the [password history policy](/docs/reference/api/policy/#age-object) is now enforced.<!-- OKTA-563910-->

#### PBKDF2 Hashing Algorithm support is GA in Production

Okta now supports Password-Based Key Derivation Function 2 (PBKDF2) for hashing imported user passwords. This hashing algorithm is used to reduce vulnerabilities to brute-force attacks. <!-- OKTA-563886-->

#### Revoke user sessions is GA in Production

You can end all Okta sessions for a user when resetting their password. All sessions of the specified user are revoked except for the current session. This option protects the user account from unauthorized access. See the `revokeSessions` parameter in the [Users API](/docs/reference/api/users/#change-password). <!-- OKTA-542646-->

#### Unusual telephony requests blocked by machine-learning measures

Okta uses an internal machine-learning-based toll fraud and abuse-detection model to block unusual SMS or voice requests. Telephony requests that are blocked by the model have a `DENY` status in the System Log. <!-- OKTA-562110-->

#### Bugs fixed in 2023.01.0

* During the authenticator enrollment flow using the `/authorize` endpoint, users couldn't enroll in the Custom App authenticator. (OKTA-558352)

* The Log Streaming API returned the Splunk Cloud `token` property in the response body. (OKTA-437264)

