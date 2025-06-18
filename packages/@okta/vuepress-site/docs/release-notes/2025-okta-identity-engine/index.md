---
title: Okta Identity Engine API release notes 2025
---

<ApiLifecycle access="ie" />

# Okta Identity Engine API release notes (2025)

<!-- ## July

### Monthly release 2025.07.0

####  Org2Org OIDC Sign-on mode is self-service EA in Preview

The Org2Org app now includes an OIDC Sign-on mode using the Okta Integration IdP. This sign-on mode reduces the complexity of configuration between the Org2Org app and the target org, and takes advantage of modern security features of OIDC. You also need to enable the Okta Integration IdP feature to use the OIDC Sign-on mode. See [Secure API connections between orgs with OAuth 2.0](docs/guides/secure-oauth-between-orgs/main/). <!-- OKTA-714847 FF ORG2ORG_ENABLE_OIDC_SOM -->

## June

### Weekly release 2025.06.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Frame-ancestors rollout for Content Security Policy](#frame-ancestors-rollout-for-content-security-policy) | Jun 17, 2025 |
| [Response body updates for the MyAccount Authenticators API](#response-body-updates-for-the-myaccount-authenticators-api) | Jun 17, 2025 |
| [Bugs fixed in 2025.06.1](#bugs-fixed-in-2025-06-1)| Jun 17, 2025 |

#### Frame-ancestors rollout for Content Security Policy

Okta is rolling out the frame-ancestors directive of the Content Security Policy (CSP) for the `/auth/services/devicefingerprint` and `/api/v1/internal/device/nonce` endpoints. To prevent blocking access to these endpoints from embedded frames, add any embedder origin as a trusted origin. See the [Trusted Origins API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/TrustedOrigin/).

In addition, Okta is rolling out the use of `nonce` with the script-src directive of the CSP for the `/auth/services/devicefingerprint`. To prevent blocking inline scripts that you may have injected on the page returned by this endpoint, allowlist your inline script to account for the `nonce` addition to script-src.
 <!-- OKTA-955073 -->

#### Response body updates for the MyAccount Authenticators API

A new response property, `canChange`, is now returned for `password` enrollments when you make GET calls to the `/idp/myaccount/authenticators/{authenticatorId}/enrollments/` endpoint. This property indicates if the value of a `password` enrollment can be changed. With the addition of the `canChange` property, `canReset`, an existing response property, now indicates whether or not the user can reset the value of their `password` enrollment.

See the [MyAccount Authenticators API](https://developer.okta.com/docs/api/openapi/okta-myaccount/myaccount/tag/Authenticators/#tag/Authenticators/operation/listEnrollments!c=200&path=canChange&t=response).
 <!-- OKTA-870897 -->

#### Bugs fixed in 2025.06.1

* When calling the Replace the resource set resource conditions endpoint, `/api/v1/iam/resource-sets/{resourceSetIdOrLabel}/resources/{resourceId}`, including an empty body didn't remove conditions. (OKTA-947764)

* Customization fields in email templates were populated with unencoded information. (OKTA-922766)

* The Directories Integration API for AD Bidirectional Group Management returned a 500 error because of a null pointer exception. (OKTA-948743)

* User grants weren't returned from the Users API (`/users/<userId>clients/<clientId>/grants`) after revoking user sessions and OAuth 2.0 tokens. (OKTA-944549)

<!-- Publish on prod deployment June 24, 2025
* Users could sometimes receive too many password reset emails. (OKTA-916357)
-->
* App logos could be added or updated using any SVG format. See [Application Logos](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationLogos/#tag/ApplicationLogos/operation/uploadApplicationLogo!path=file&t=request). (OKTA-876028)

### Monthly release 2025.06.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Admins prevented from deleting published app instances](#admins-prevented-from-deleting-published-app-instances) | June 4, 2025 |
| [Authentication claims sharing between Okta orgs is GA in Production](#authentication-claims-sharing-between-okta-orgs-is-ga-in-production) | June 4, 2025 |
| [Claims sharing between third-party IdPs and Okta is GA in Production](#claims-sharing-between-third-party-idps-and-okta-is-ga-in-production) | April 9, 2025 |
| [Conditions for create user permission](#conditions-for-create-user-permission) | June 9, 2025 |
| [Define default values for custom user attributes is GA in Production](#define-default-values-for-custom-user-attributes-is-ga-in-production) |  May 7, 2025 |
| [Domain restrictions on Realms is GA in Production](#domain-restrictions-on-realms-is-ga-in-production) | April 23, 2025 |
| [New password complexity property is self-service EA in Preview](#new-password-complexity-property-is-self-service-ea-in-preview) | June 4, 2025 |
| [Number matching challenge with the Factors API is GA in Production](#number-matching-challenge-with-the-factors-api-is-ga-in-production) | April 9, 2025 |
| [Restrict access to the Admin Console is GA in Preview](#restrict-access-to-the-admin-console-is-ga-in-preview) | June 4, 2025 |
| [Shared signal transmitters is GA in Production](#shared-signal-transmitters-is-ga-in-production) | May 7, 2025 |
| [Single Logout for IdPs is EA in Preview](#single-logout-for-idps-is-ea-in-preview) | June 4, 2025 |
| [Developer documentation updates in 2025.06.0](#developer-documentation-updates-in-2025-06-0) | June 4, 2025 |
| [Bugs fixed in 2025.06.0](#bugs-fixed-in-2025-06-0)| June 4, 2025 |

#### Admins prevented from deleting published app instances

When an app instance has the **Published** version status in OIN Wizard, admins can no longer delete it from the Integrator Free Plan org. <!-- OKTA-689770 -->

#### Authentication claims sharing between Okta orgs is GA in Production

Authentication claims sharing allows an admin to configure their Okta org to trust claims from IdPs during SSO. Sharing claims also allows Okta to interpret the authentication context from an IdP. This helps eliminate duplicate factor challenges during user authentication and helps improve security posture. See [Configure claims sharing](/docs/guides/configure-claims-sharing/oktasaml/main/).  <!-- OKTA-802451 ORG2ORG_CLAIMS_SHARING -->

#### Claims sharing between third-party IdPs and Okta is GA in Production

Authentication claims sharing allows an admin to configure their Okta org to trust claims from third-party IdPs during SSO. Sharing claims also allows Okta to interpret the authentication context from a third-party IdP. This helps eliminate duplicate factor challenges during user authentication and helps improve security posture. See [Configure claims sharing](/docs/guides/configure-claims-sharing/oktasaml/main/). <!-- OKTA-901817 THIRD_PARTY_IDP_CLAIMS_SHARING -->

#### Conditions for create user permission

You can now add conditions to the `okta.user.create` permission for custom admin roles. This enables you to granularly control which user attributes admins can set values for during user creation. See [Permissions conditions](https://developer.okta.com/docs/api/openapi/okta-management/guides/roles/#permissions-conditions). <!-- OKTA-907853 -->

#### Define default values for custom user attributes is GA in Production

You can now define default values for custom attributes in a user profile. See the [Update User Profile](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Schema/#tag/Schema/operation/updateUserProfile) endpoint in the Schemas API. <!-- OKTA-907852 ENG_ENABLE_ATTRIBUTE_DEFAULTS -->

#### Domain restrictions on Realms is GA in Production

You can now limit users to a specific domain in Realms, which adds an extra layer of oversight for realm and partner admins and enforces boundaries between user populations. See the [Realms](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Realm/) and [Realm Assignments](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/RealmAssignment/) APIs. <!-- OKTA-907851 UD_REALMS_PROFILE_WITH_DOMAIN -->

#### New password complexity property is self-service EA in Preview

You can now use the `oelStatement` property to block words from being used in passwords. This feature enhances security by allowing you to customize your password strength requirements. See the [Policy API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=3/settings/password/complexity/oelStatement&t=request). <!-- OKTA-849300 PASSWORD_POLICY_OEL_STATEMENT -->

#### Number matching challenge with the Factors API is GA in Production

You can now send number matching challenges for Okta Verify `push` factor enrollments when you send POST requests to the `/users/{userId}/factors/{factorId}/verify` endpoint. For orgs that can't adopt Okta FastPass, this feature improves their overall security.  See the [Factors API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/UserFactor/#tag/UserFactor/operation/verifyFactor). <!-- OKTA-903176 ENABLE_FACTORS_API_NUMBER_MATCHING_CHALLENGE -->

#### Restrict access to the Admin Console is GA in Preview

By default, users and groups with assigned admin roles have access to the Admin Console app. With this feature, super admins can choose to manually assign the app to delegated admins instead. This is recommended for orgs with admins who don't need access, like business partners, third-party admins, or admins who only use the Okta API. See [Configure administrator settings](https://help.okta.com/okta_help.htm?type=oie&id=administrator-settings) and the corresponding APIs: [Retrieve the Okta Admin Console Assignment Setting](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/OrgSettingAdmin/#tag/OrgSettingAdmin/operation/getAutoAssignAdminAppSetting) and [Update the Okta Admin Console Assignment Setting](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/OrgSettingAdmin/#tag/OrgSettingAdmin/operation/updateAutoAssignAdminAppSetting). <!-- OKTA-717742 ADMIN_APP_AND_ROLE_DECOUPLING -->

#### Shared signal transmitters is GA in Production

Okta uses [CAEP](https://openid.net/specs/openid-caep-specification-1_0.html) to send security-related events and other data-subject signals to third-party security vendors. To enable the transmission of signals from Okta, create an [SSF stream](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SSFTransmitter/#tag/SSFTransmitter/operation/createSsfStream) using the SSF Transmitter API. Then, configure the third-party receiver to accept signals sent as [Security Event Tokens (SETs)](https://datatracker.ietf.org/doc/html/rfc8417) from Okta. See the [SSF Transmitter API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SSFTransmitter/) and [SSF Transmitter SET payload structures](https://developer.okta.com/docs/reference/ssf-transmitter-sets/). <!-- OKTA_SSF_TRANSMITTER_PUSH OKTA-673909 -->

#### Single Logout for IdPs is EA in Preview

The Single Logout (SLO) for IdPs feature boosts security for organizations using shared devices and external IdPs by automatically ending IdP sessions when a user signs out of any app. This feature also requires a fresh authentication for every new user, eliminating session hijacking risks on shared devices. SLO for IdP supports both SAML 2.0 and OIDC IdP connections, which provides robust session management for shared workstations in any environment. See [Configure Single Logout for IdPs](/docs/guides/single-logout/openidconnectidp/main/). <!-- SLO_SUPPORT_FOR_EXTERNAL_IDP (OKTA-946177) -->

#### Developer documentation updates in 2025.06.0

* The **Email Customization** API has been relabelled as the [**Org Email Settings** API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/EmailCustomization/). There are no other changes to the API. All previous anchors and links to the API remain the same.

* A [new guide](/docs/guides/custom-widget-migration-gen3/main/) explains how to migrate customizations from the second generation (Gen2) to the third generation (Gen3) of the Sign-In Widget. It describes how to use design tokens instead of CSS className selectors to customize Gen3, and which variables and functions help with your migration.

* New [release notes for Okta Privileged Access APIs](/docs/release-notes/2025-okta-privileged-access/) are now available.

#### Bugs fixed in 2025.06.0

* The `/idp/myaccount/sessions` endpoint didn't accept access tokens granted by custom authorization servers. (OKTA-929488)

* An HTTP 500 error occurred when API requests were sent to `api/v1/policies/{policyId}` and `api/v1/policies/{policyId}/rules/{ruleID}` with certain values in the Accept header. (OKTA-892315)

* MyAccount Authenticators API GET requests (`/idp/myaccount/authenticators/` and `/idp/myaccount/authenticators/{authenticatorId}`) didn't return custom logo details. (OKTA-880048)

## May

### Weekly release 2025.05.3

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Integrator Free Plan org now available](#integrator-free-plan-org-now-available) | May 22, 2025 |
| [Bugs fixed in 2025.05.3](#bugs-fixed-in-2025-05-3)| May 29, 2025 |

#### Integrator Free Plan org now available

The Integrator Free Plan org is now available on the [Sign up](/signup) page of the developer documentation site. These orgs replace the previous Developer Editions Service orgs, which will start being deactivated on July 18th. See [Changes Are Coming to the Okta Developer Edition Organizations](https://developer.okta.com/blog/2025/05/13/okta-developer-edition-changes). For information on the configurations for the Integrator Free Plan orgs, see [Okta Integrator Free Plan org configurations](/docs/reference/org-defaults/). <!-- OKTA-892454 -->

#### Bugs fixed in 2025.05.3

* When third-party claims sharing was enabled, users couldn't sign in using their IdP because of an authentication loop. (OKTA-939862)

* When enrolling an `sms` factor (`POST /users/{userId}/factors`), an Invalid Phone Number error was sometimes incorrectly returned. (OKTA-923373)

* Users with `+` in their email address couldn't reset their passwords from email templates. Use the `${encode(String html)}` expression to encode special characters. (OKTA-914601)

* Sending a phone challenge with the MyAccount Phone API (`POST /idp/myaccount/phones/{id}/challenge`) sometimes returned an HTTP 500 Internal Server error. (OKTA-946865)

### Weekly release 2025.05.2

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Enrollment grace periods is EA in Preview](#enrollment-grace-periods-is-ea-in-preview)| May 21, 2025 |
| [Send app context to external IdPs is EA in Preview](#send-app-context-to-external-idps-is-ea-in-preview)| May 21, 2025 |

#### Enrollment grace periods is EA in Preview

Today, when admins define an enrollment policy for a group, the entire group must enroll immediately, which can be disruptive to their day-to-day tasks.

With Enrollment Grace Periods, end users can defer enrollment in new authenticators until an admin-defined deadline when enrollment becomes mandatory. This allows end users to enroll at a time convenient to them and allows for more graceful enrollment before enforcing new authenticator types in authentication policies. See [Authenticator enrollment policies](/docs/concepts/policies/#authenticator-enrollment-policies) and the [Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=1/settings/authenticators/enroll/gracePeriod&t=request). <!-- ENROLLMENT_POLICY_GRACE_PERIOD (OKTA-832949)-->

#### Send app context to external IdPs is EA in Preview

You can now forward context about an app to an external identity provider (IdP) when a user attempts to access the app. When you enable the **Application context** checkbox for an IdP, the app name and unique instance ID are included in the SAML or OpenID Connect request sent to the external IdP. This enhancement allows external IdPs to make more informed, context-aware authentication decisions, supporting advanced security scenarios, and Zero Trust environments. To enable this feature, go to **Settings** > **Features** in the Admin Console, locate **Send Application Context to an External IdP**, and enable. <!-- SEND_APPLICATION_CONTEXT_TO_EXTERNAL_IDP (OKTA-911626)-->

### Weekly release 2025.05.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2025.05.1](#bugs-fixed-in-2025-05-1)| May 14, 2025 |

#### Bugs fixed in 2025.05.1

* After enrolling a `call` factor (`POST /users/{userId}/factors`), the `resend.href` link in the response body returned an HTTP 404 Not Found error when it was used. (OKTA-926672)

* In some situations, the `/api/v1/agentPools` API failed to return agents that were stuck in an error state. (OKTA-910056)

### Monthly release 2025.05.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Breached Credentials Protection is EA in Preview](#breached-credentials-protection-is-ea-in-preview) | May 15, 2025 |
| [Custom admin roles for ITP](#custom-admin-roles-for-itp) | May 7, 2025 |
| [New User Role Targets API endpoint](#new-user-role-targets-api-endpoint) | May 7, 2025 |
| [Define default values for custom user attributes](#define-default-values-for-custom-user-attributes) | May 7, 2025 |
| [Directories integration API is GA in Preview and Production](#directories-integration-api-is-ga-in-preview-and-production) | May 7, 2025 |
| [Number matching challenge with the Factors API is GA in Preview](#number-matching-challenge-with-the-factors-api-is-ga-in-preview) | May 7, 2025 |
| [Claims sharing between third-party IdPs and Okta is GA in Preview](#claims-sharing-between-third-party-idps-and-okta-is-ga-in-preview) | May 7, 2025 |
| [Express Configuration for OIN apps](#express-configuration-for-oin-apps) | May 7, 2025 |
| [New End-user Enrollments API is GA in Production](#new-end-user-enrollments-api-is-ga-in-production) | March 5, 2025 |
| [New System Log for super admin privilege grant](#new-system-log-for-super-admin-privilege-grant) | May 7, 2025 |
| [Entitlement claims is GA in Production](#entitlement-claims-is-ga-in-production) | January 2, 2025 |
| [POST requests to authorize endpoint is GA in Production](#post-requests-to-authorize-endpoint-is-ga-in-production) | January 8, 2025 |
| [Authentication claims sharing between Okta orgs is GA in Preview](#authentication-claims-sharing-between-okta-orgs-is-ga-in-preview) | May 7, 2025 |
| [Shared signal transmitters is GA in Preview](#shared-signal-transmitters-is-ga-in-preview) | May 7, 2025 |
| [Developer documentation update in 2025.05.0](#developer-documentation-update-in-2025-05-0) | May 7, 2025 |
| [Bugs fixed in 2025.05.0](#bugs-fixed-in-2025-05-0)| May 7, 2025 |

#### Breached Credentials Protection is EA in Preview

Protect your org from the impact of credentials that have been compromised. If Okta determines that a username and password combination has been compromised after being compared to a third-party curated dataset, the protection response is customizable through password policies, including resetting the user's password, forcing a logout, or calling a delegated Workflow. See the [Okta Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/).

This feature is following a slow rollout process beginning on May 15. <!-- OKTA-925699 -->

#### Custom admin roles for ITP

Through this feature, customers can use granular ITP permissions and resources to create custom roles to right-size authorization for ITP configuration and monitoring. See [Configure custom admin roles for ITP](https://help.okta.com/okta_help.htm?type=oie&id=csh-itp-rbac).  <!-- OKTA-914059 -->

#### New User Role Targets API endpoint

The User Role Targets API now includes a new endpoint, [Retrieve a role target by assignment type](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/RoleBTargetAdmin/#tag/RoleBTargetAdmin/operation/getRoleTargetsByUserIdAndRoleId), that retrieves role targets by user or group assignment type. <!--OKTA-909953 -->

#### Define default values for custom user attributes

You can now define default values for custom attributes in a user profile. See the [Update User Profile](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Schema/#tag/Schema/operation/updateUserProfile) endpoint in the Schemas API. <!-- OKTA-907852 ENG_ENABLE_ATTRIBUTE_DEFAULTS-->

#### Directories integration API is GA in Preview and Production

The Directories Integration API provides operations to manage Active Directory (AD) group memberships using Okta. This API enables you to define adding or removing users for AD groups. This is now generally available. Previously, this was only available to subscribers of Okta Identity Governance. See [Directories Integration](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DirectoriesIntegration/). <!--AD_BIDIRECTIONAL_GROUP_MANAGEMENT OKTA-734564 OKTA-906684-->

#### Number matching challenge with the Factors API is GA in Preview

You can now send number matching challenges for Okta Verify `push` factor enrollments when you send POST requests to the `/users/{userId}/factors/{factorId}/verify` endpoint. For orgs that can't adopt Okta FastPass, this feature improves their overall security.  See the [Factors API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/UserFactor/#tag/UserFactor/operation/verifyFactor). <!-- OKTA-903176 -->

#### Claims sharing between third-party IdPs and Okta is GA in Preview

Authentication claims sharing allows an admin to configure their Okta org to trust claims from third-party IdPs during SSO. Sharing claims also allows Okta to interpret the authentication context from a third-party IdP. This helps eliminate duplicate factor challenges during user authentication and helps improve security posture. See [Configure claims sharing](/docs/guides/configure-claims-sharing/oktasaml/main/).<!-- ORG2ORG_CLAIMS_SHARING OKTA-901817 -->

#### Express Configuration for OIN apps

Express Configuration is a feature designed to automate the setup of SSO for instances of OIN SaaS integrations by enterprise customers with minimal manual effort. It allows enterprise customers to securely configure OpenID Connect (OIDC) integrations without copying and pasting configuration values between Okta and Auth0-enabled apps. See [Express Configuration](/docs/guides/express-configuration/main/). <!-- OKTA-888983 -->

#### New End-user Enrollments API is GA in Production

The new [End-user Enrollments API](https://developer.okta.com/docs/api/openapi/okta-signin-experience-management/signinexp/tag/endUserEnrollments/) enables end users to enroll and unenroll authenticators by entering a URL directly into their browser. This reduces the time spent administering complex authenticator enrollment flows, and provides a streamlined enrollment process for users. After a user enrolls or unenrolls an authenticator, you can use the `redirect_uri` property to redirect them to another page. <!-- OKTA-868775 ENG_AUTHENTICATOR_ENROLLMENTS_USER_MANAGEMENT_WITH_REDIRECT -->

#### New System Log for super admin privilege grant

A new System Log event now indicates when the super admin role (`app.oauth2.client.privilege.grant`) is granted to an API service integration. <!-- OKTA-863264 -->

#### Entitlement claims is GA in Production

You can now enrich tokens with app entitlements that produce deeper integrations. After you configure this feature for your app integration, use the [Okta Expression Language in Identity Engine](/docs/reference/okta-expression-language-in-identity-engine/#reference-attributes) to add entitlements at runtime as OpenID Connect claims and SAML assertions. See [Federated claims with entitlements](/docs/guides/federated-claims/main/). <!-- FEDERATED_CLAIM_GENERATION_LAYER OKTA-847041 OKTA-834142 -->

#### POST requests to authorize endpoint is GA in Production

You can now send user data securely in a POST request body to the /authorize endpoint. <!-- OKTA-827104 OAUTH2_AUTHORIZE_WITH_POST -->

#### Authentication claims sharing between Okta orgs is GA in Preview

Authentication claims sharing allows an admin to configure their Okta org to trust claims from IdPs during SSO. Sharing claims also allows Okta to interpret the authentication context from an IdP. This helps eliminate duplicate factor challenges during user authentication and helps improve security posture. See [Configure claims sharing](/docs/guides/configure-claims-sharing/oktasaml/main/). <!-- ORG2ORG_CLAIMS_SHARING OKTA-856733 OKTA-802451 -->

#### Shared signal transmitters is GA in Preview

Okta uses [CAEP](https://openid.net/specs/openid-caep-specification-1_0.html) to send security-related events and other data-subject signals to third-party security vendors. To enable the transmission of signals from Okta, create an [SSF stream](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SSFTransmitter/#tag/SSFTransmitter/operation/createSsfStream) using the SSF Transmitter API. Then, configure the third-party receiver to accept signals sent as [Security Event Tokens (SETs)](https://datatracker.ietf.org/doc/html/rfc8417) from Okta. See the [SSF Transmitter API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SSFTransmitter/) and [SSF Transmitter SET payload structures](https://developer.okta.com/docs/reference/ssf-transmitter-sets/). <!-- OKTA_SSF_TRANSMITTER_PUSH OKTA-673909 -->

#### New Applications API object

A new `universalLogout` object is returned in the Applications API for orgs that have Identity Threat Protection enabled. <!--OKTA-883033-->

#### Developer documentation update in 2025.05.0

The new [Integrate Okta with identity verification vendors guide](/docs/guides/idv-integration/main/) describes how third-party identity verification (IDV) vendors can integrate with Okta. IDV vendors can use the guide to integrate their service with Okta orgs. <!--OKTA-898026-->

#### Bugs fixed in 2025.05.0

* If a third-party SAML IdP sent the `session.amr` SAML attribute without the attribute schema type, Okta rejected the response when the third-party claims sharing feature was enabled. (OKTA-925864)

* When third-party IdP claims sharing was enabled, the redirect to the IdP happened during reauthentication even if the IdP didn't provide any AMR claims. (OKTA-922086)

## April

### Weekly release 2025.04.3

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2025.04.3](#bugs-fixed-in-2025-04-3)| April 30, 2025 |

#### Bugs fixed in 2025.04.3

* Some versions of the Sign-In Widget v3 returned an error when trying to display the consent screen. (OKTA-755616)

* The `user.profile.firstName` tag in email templates didn't escape or render Unicode characters correctly. (OKTA-840719)

* Requests made using the `sortBy` parameter with custom attributes to the List all users or List all groups endpoints threw an HTTP 400 Bad Request error. (OKTA-886166)

* Some admins with a custom role (`okta.apps.read`, `okta.apps.clientCredentials.read` permissions) couldn’t view client secrets for apps that they had permission to view. (OKTA-893511)

* After their accounts were suspended, users who correctly answered their security question were moved to an Active status in API calls. (OKTA-897292)

* The number of groups that could be returned in tokens for a groups claim was still restricted in the authorization code sign-in flow when an inline hook was used. (OKTA-907362)

* When a resource set contained a `devices` resource, the Retrieve a resource endpoint returned a `null` response for the devices `self` object. (OKTA-914364)

* When the List all Subscriptions API with a Workflows Administrator role (`WORKFLOWS_ADMIN`) was called, an HTTP 400 Bad Request error was returned. (OKTA-918276)

* Users received an HTTP 400 Bad Request error during self-service registration in preview orgs with a Registration Inline hook. (OKTA-918774)

* When an Okta Classic Engine org was involved in a multi-org Okta-to-Okta authentication flow, and Okta-to-Okta claims sharing was enabled, the `OktaAuth` (SAML) and `okta_auth` (OIDC) claims weren't processed correctly. (OKTA-918969)

* When Okta-to-Okta claims sharing was enabled, federated users who were sourced from a third-party identity provider were incorrectly prompted to provide a password on their hub org. (OKTA-919385)

### Weekly release 2025.04.2

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Subscriptions API no longer supports OKTA_ISSUE](#subscriptions-api-no-longer-supports-okta-issue)| April 9, 2025 |
| [Bugs fixed in 2025.04.2](#bugs-fixed-in-2025-04-2)| April 16, 2025 |

#### Subscriptions API no longer supports OKTA_ISSUE

The Subscriptions API no longer supports the `notificationType` value `OKTA_ISSUE`. <!-- OKTA-OKTA-896136 and OKTA-917819 -->

#### Bugs fixed in 2025.04.2

* Email notifications weren’t sent to end users when security methods were enrolled using POST requests to the `/users/{userId}/factors` endpoint and the `activate` parameter was set to `true`. (OKTA-891169)

* Updates made to ACS URIs for an app using the Applications API (PUT `/apps/{appId}`) didn't take effect if the app was created without those URLs. (OKTA-909218)

### Weekly release 2025.04.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Advanced device posture checks](#advanced-device-posture-checks) | April 9, 2025 |
| [Claims sharing between third-party IdPs and Okta is self-service EA in Preview](#claims-sharing-between-third-party-idps-and-okta-is-self-service-ea-in-preview) | April 9, 2025 |
| [Number matching challenge with the Factors API is self-service EA in Preview](#number-matching-challenge-with-the-factors-api-is-self-service-ea-in-preview) | April 9, 2025 |
| [OAuth 2.0 provisioning for Org2Org with Auto-Rotation is self-service EA in Preview](#oauth-2-0-provisioning-for-org2org-with-auto-rotation-is-self-service-ea-in-preview) | April 2, 2025 |
| [Bugs fixed in 2025.04.1](#bugs-fixed-in-2025-04-1)| April 9, 2025 |

#### Advanced device posture checks

Advanced posture checks provide extended device assurance to users. It empowers admins to enforce compliance based on customized device attributes that extend beyond Okta’s standard checks. Using osquery, this feature facilitates real-time security assessments across macOS devices. As a result, orgs gain enhanced visibility and control over their device fleet and ensure that only trusted devices can access sensitive resources. See [Configure advanced posture checks for device assurance](https://help.okta.com/okta_help.htm?type=oie&id=csh-device-assurance-adv-posture-check) and the [Device Posture Checks API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DevicePostureCheck/). <!--OKTA-854221 OSQUERY_CUSTOM_DEVICE_POSTURE_CHECKS -->

#### Claims sharing between third-party IdPs and Okta is self-service EA in Preview

Authentication claims sharing allows an admin to configure their Okta org to trust claims from third-party IdPs during SSO. Sharing claims also allows Okta to interpret the authentication context from a third-party IdP. This helps eliminate duplicate factor challenges during user authentication and helps improve security posture. See [Configure claims sharing](/docs/guides/configure-claims-sharing/oktasaml/main/).<!--OKTA-901817 ORG2ORG_CLAIMS_SHARING -->

#### Number matching challenge with the Factors API is self-service EA in Preview

You can now send number matching challenges for Okta Verify `push` factor enrollments when you send POST requests to the `/users/{userId}/factors/{factorId}/verify` endpoint. For orgs that can't adopt Okta FastPass, this feature improves their overall security. See the [Factors API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/UserFactor/#tag/UserFactor/operation/verifyFactor).<!--OKTA-903176 OKTA ENABLE_FACTORS_API_NUMBER_MATCHING_CHALLENGE-->

#### OAuth 2.0 provisioning for Org2Org with Auto-Rotation is self-service EA in Preview

Admins deploying multi-org architectures (for example, Okta hub-and-spoke orgs) need to secure user and group provisioning. Provisioning using OAuth 2.0 scoped tokens has several advantages over API tokens, including more access granularity, shorter token lifespans, and automatic key rotation. You can now enable OAuth 2.0 Auto-Rotation for Org2Org app provisioning directly from the Admin Console, in addition to the API.

To support these updates, the Application Connections API includes a new endpoint, [Retrieve a JSON Web Key Set (JWKS) for the default provisioning connection](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationConnections/#tag/ApplicationConnections/operation/getUserProvisioningConnectionJWKS), and schema updates to support token autorotation, `rotationMode=AUTO`. See [Update the default provisioning connection](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationConnections/#tag/ApplicationConnections/operation/updateDefaultProvisioningConnectionForApplication!path=1/profile&t=request) and [Integrate Okta Org2Org with Okta](https://help.okta.com/okta_help.htm?type=oie&id=ext-org2org-intg#Use2). <!-- OKTA-903533 FF ORG2ORG_ENABLE_PROVISION_JWK -->

#### Bugs fixed in 2025.04.1

* In Preview orgs, org admins couldn't edit IdP group assignments when a super admin group was included in the group list. (OKTA-880124)

* The `id_token_hint` parameter was exposed in the System Log. (OKTA-890738)

* POST requests to the `/authorize` endpoint that contained query parameters received an error. (OKTA-905143)

### Monthly release 2025.04.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Domain restrictions on Realms](#domain-restrictions-on-realms) | April 23, 2025 |
| [OAuth 2.0 provisioning for Org2Org with Auto-Rotation is EA in Preview](#oauth-2-0-provisioning-for-org2org-with-auto-rotation-is-ea-in-preview) | April 2, 2025 |
| [Retrieve the SSF Stream status is EA in Preview](#retrieve-the-ssf-stream-status-is-ea-in-preview) | April 2, 2025 |
| [OIN test account information deleted after 30 days](#oin-test-account-information-deleted-after-30-days) | April 2, 2025 |
| [Risk Provider and Risk Events APIs are deprecated](#risk-provider-and-risk-events-apis-are-deprecated) | April 2, 2025 |
| [POST requests to authorize endpoint is GA Preview](#post-requests-to-authorize-endpoint-is-ga-preview) | January 8, 2025 |
| [Integration variable limit increase in OIN Submission](#integration-variable-limit-increase-in-oin-submission) | April 2, 2025 |
| [Conditional requests and entity tags are GA in Production](#conditional-requests-and-entity-tags-are-ga-in-production) | January 16, 2025 |
| [New rate limit event type](#new-rate-limit-event-type) | April 2, 2025 |
| [Create dynamic resource sets with conditions is GA in Preview](#create-dynamic-resource-sets-with-conditions-is-ga-in-preview) | November 7, 2024 |
| [Okta account management policy is GA in Production](#okta-account-management-policy-is-ga-in-production) | December 11, 2024 |
| [Okta Sign-In Widget custom template updates](#okta-sign-in-widget-custom-template-updates) | April 2, 2025 |
| [Developer documentation update in 2025.04.0](#developer-documentation-update-in-2025-04-0) | April 2, 2025 |
| [Bugs fixed in 2025.04.0](#bugs-fixed-in-2025-04-0)| April 2, 2025 |

#### Domain restrictions on Realms

You can now limit users to a specific domain in Realms, which adds an extra layer of oversight for realm and partner admins and enforces boundaries between user populations. See the [Realms](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Realm/) and [Realm Assignments](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/RealmAssignment/) APIs. <!-- OKTA-907851 UD_REALMS_PROFILE_WITH_DOMAIN -->

#### OAuth 2.0 provisioning for Org2Org with Auto-Rotation is EA in Preview

Admins deploying multi-org architectures (for example, Okta hub-and-spoke orgs) need to secure user and group provisioning. Provisioning using OAuth 2.0 scoped tokens has several advantages over API tokens, including more access granularity, shorter token lifespans, and automatic key rotation. You can now enable OAuth 2.0 Auto-Rotation for Org2Org app provisioning directly from the Admin Console, in addition to the API.

To support these updates, the Application Connections API includes a new endpoint, [Retrieve a JSON Web Key Set (JWKS) for the default provisioning connection](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationConnections/#tag/ApplicationConnections/operation/getUserProvisioningConnectionJWKS), and schema updates to support token auto-rotation, `rotationMode=AUTO`. See [Update the default provisioning connection](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationConnections/#tag/ApplicationConnections/operation/updateDefaultProvisioningConnectionForApplication!path=1/profile&t=request) and [Integrate Okta Org2Org with Okta](https://help.okta.com/okta_help.htm?type=oie&id=ext-org2org-intg#Use2). <!-- OKTA-903533 FF ORG2ORG_ENABLE_PROVISION_JWK -->

#### Retrieve the SSF Stream status is EA in Preview

Retrieve the SSF Stream status endpoint (`/api/v1/ssf/stream/status`) is now available. The status indicates whether the transmitter is able to transmit events over the stream. This endpoint is available if you have enabled the Enable Managed Apple ID federation and provisioning feature for your org. <!-- OKTA-898183 OKTA_SSF_TRANSMITTER_PUSH -->

#### OIN test account information deleted after 30 days

Okta deletes your test account credentials 30 days after you publish your app in **OIN Wizard**. You must create a new test account and re-enter the required information before submitting the app.

#### Risk Provider and Risk Events APIs are deprecated

These APIs have been deprecated. Use the [SSF Security Event Tokens API]([https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SSFSecurityEventToken/|https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SSFSecurityEventToken/]) instead to receive security-related events and other data-subject signals. Use the [SSF Receiver API]([https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SSFReceiver/|https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SSFReceiver/]) for third-party security event providers. <!-- OKTA-866092 -->

#### POST requests to authorize endpoint is GA Preview

You can now send user data securely in a POST request body to the `/authorize` endpoint. <!-- OKTA-827104 OAUTH2_AUTHORIZE_WITH_POST -->

#### Integration variable limit increase in OIN Submission

The maximum number of integration variables allowed in OIN submission has increased from three to eight. The apps migrated from OIN Manager with more than eight variables can retain all existing variables but can't add new variables.

#### Conditional requests and entity tags are GA in Production

You can now use conditional requests and entity tags to tag and check for specific versions of resources. Currently this is only available to use with user profiles. See [Conditional Requests and Entity Tags](https://developer.okta.com/docs/api/#conditional-requests-and-entity-tags).  <!-- ETAG_FOR_USERS_API OKTA-822688 -->

#### New rate limit event type

This rate limit event type now appears in the System Log: `system.rate_limit.configuration.update`. It logs the following:

* Changes to client-based rate limit settings
* Changes in the rate limit warning notification threshold
* If the rate limit notification is enabled or disabled
* Updates to the rate-limit percentage of an API token

<!-- OKTA-797466  -->

#### Create dynamic resource sets with conditions is GA in Preview

Resource set conditions help you limit the scope of a role by excluding an admin's access to certain apps. This gives you more granular control over your custom admin roles and helps meet your org's unique security needs. See [Resource set conditions](https://help.okta.com/okta_help.htm?type=oie&id=resource-set-conditions) and the corresponding [Resource Set Resources](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/RoleCResourceSetResource/) API.
<!-- OKTA-746719 DYNAMIC_RESOURCE_SETS -->

#### Okta account management policy is GA in Production

The Okta account management policy helps admins easily build phishing resistance into actions such as account unlock, password recovery, authenticator enrollment, and profile setting changes. Using the familiar rule-based framework of an authentication policy, admins can now customize which phishing-resistant authenticators are required when users attempt these common self-service actions. All of the configurations in the authentication policies can now be applied for authenticator management. See [Configure an Okta account management policy](/docs/guides/okta-account-management-policy/main/). <!-- AUTH_POLICY_FOR_ACCOUNT_MANAGEMENT -->

#### Okta Sign-In Widget custom template updates

Admins can now use the `useSiwGen3` variable in the sign-in page code editor to help with migrations from Gen2 to Gen3 of the Okta Sign-In Widget. See [Use the code editor](/docs/guides/custom-widget/main/#usesiwgen3).

#### Developer documentation update in 2025.04.0

The [Update a published integration with the OIN Wizard](/docs/guides/update-oin-app/openidconnect/main/) is a newly restructured guide which consists of our existing publish integration content and a brand new [updating the attribute mapping flow](/docs/guides/update-oin-app/scim/main/#configure-attribute-mappingshttps://developer.okta.com/docs/guides/update-oin-app/scim/main/#configure-attribute-mappings) section for SCIM integrations.

#### Bugs fixed in 2025.04.0

* The result of System Log events triggered by the `use_dpop_nonce` OAuth 2.0 error was FAILURE instead of CHALLENGE. (OKTA-902314)

* When the Okta-to-Okta Claims Sharing feature was enabled, users who signed in using ADSSO on a spoke org were prompted for their password in the hub org. (OKTA-897340)

* Admins using multiple user types sometimes encountered an internal error when attempting to update an app instance. (OKTA-880825)

* If an AAGUID key that wasn’t verified by the FIDO Alliance Metadata Service (MDS) was added to an authenticator group, then future PUT requests to `api/v1/authenticators/{authenticatorId}/methods/webauthn` failed. (OKTA-875920)

* The wrong HTTP error code was returned for the SSF stream creation operation when one stream already existed. (OKTA-868972)

* A Policies API GET request (`/api/v1/policies`) returned a `rel="next"` link when there were no more results. (OKTA-858605)

* The OIN Submission Tester didn't support custom domains in the IdP flow. (OKTA-835402)

* When `/api/v1/apps` was called, it returned all applications assigned, even though the user wasn't part of the assigned resource set. (OKTA-826548)

## March

### Weekly release 2025.03.3

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Advanced search using conditioned profile attributes](#advanced-search-using-conditioned-profile-attributes) | March 26, 2025 |
| [Bugs fixed in 2025.03.3](#bugs-fixed-in-2025-03-3)| March 26, 2025 |

#### Advanced search using conditioned profile attributes

If you have an admin role with permission conditions to access certain user profile attributes, you can now search for those users with those attributes. Note that this search enhancement doesn't support the `OR` operator. <!-- OKTA-856262 -->

#### Bugs fixed in 2025.03.3

* Custom role admins with permission conditions couldn't search for users by `firstName` or `lastName`. (OKTA-894392)

* The `user.identity_verification` System Log event displayed an incorrect assurance level for completed identity verifications with DENY results. (OKTA-893343)

* Some PUT requests to the `brands/{brandId}/templates/email/{templateName}/settings` endpoint received HTTP 500 Internal Server Error messages. (OKTA-886167)

* GET requests to the `/api/v1/users/me/appLinks` endpoint sometimes returned an HTTP 500 Internal Server error. (OKTA-873694)

### Weekly release 2025.03.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2025.03.1](#bugs-fixed-in-2025-03-1)| March 12, 2025 |

#### Bugs fixed in 2025.03.1

* `createdBy` and `lastUpdatedBy` custom attributes couldn't be used in group rules. (OKTA-566492)

* Custom admins who were limited to viewing only application group members received incomplete results when using the `List All Users API` without a `search` or `filter` parameter. (OKTA-801592)

* The JSON Web Token that Okta generates and sends to the OpenID Connect identity provider contained a string `exp` instead of a number 'exp'. (OKTA-852446)

* When making POST requests to `users/{userId}/factors/{factorId}/verify` or `authn/factors/{factorId}/verify` endpoints with `factorType` instead of `factorId` in the URL path, multiple failed verification attempts didn't lock users out and the failed attempts weren't logged in the System Log. (OKTA-871469)

* When Okta sent a request with a refresh token to the token inline hook, the session user was sometimes sent rather than the refresh token user in `request.data.context`. (OKTA-869758)

### Monthly release 2025.03.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Global token revocation for wizard SAML and OIDC apps is GA in Production](#global-token-revocation-for-wizard-saml-and-oidc-apps-is-ga-in-production) | September 11, 2024|
| [OIDC IdPs now support group sync is GA in Production](#oidc-idps-now-support-group-sync-is-ga-in-production) | October 23, 2024 |
| [Granular account linking for certain Identity Providers is GA in Production](#granular-account-linking-for-certain-identity-providers-is-ga-in-production) | December 11, 2024 |
| [Realms for Workforce is GA in Production](#realms-for-workforce-is-ga-in-production) | February 13, 2025 |
| [Improved group search functionality is GA in Production](#improved-group-search-functionality-is-ga-in-production) | February 12, 2025 |
| [Improved user search functionality is GA in Production](#improved-user-search-functionality-is-ga-in-production) | February 12, 2025 |
| [Improved realms and device search functionality is GA in Production](#improved-realms-and-device-search-functionality-is-ga-in-production) | February 12, 2025 |
| [New End-user Enrollments API is GA in Preview](#new-end-user-enrollments-api-is-ga-in-preview) | March 5, 2025 |
| [CLEAR Verified as a third-party identity verification provider is EA in Preview](#clear-verified-as-a-third-party-identity-verification-provider-is-ea-in-preview) | March 5, 2025 |
| [Verify an SSF Stream is EA in Preview](#verify-an-ssf-stream-is-ea-in-preview) | March 5, 2025 |
| [MyAccount Password API updates](#myaccount-password-api-updates) | March 5, 2025 |
| [Identity Security Posture Management functionality in the OIN catalog](#identity-security-posture-management-functionality-in-the-oin-catalog) | March 5, 2025 |
| [Default global session policy rule update](#default-global-session-policy-rule-update) | March 5, 2025 |
| [Developer documentation updates in 2025.03.0](#developer-documentation-updates-in-2025-03-0) | March 5, 2025 |
| [Bugs fixed in 2025.03.0](#bugs-fixed-in-2025-03-0) | March 5, 2025 |

#### Global token revocation for wizard SAML and OIDC apps is GA in Production

Universal Logout clears sessions and tokens for wizard SAML and OIDC apps. This enhancement extends Universal Logout functionality to more types of apps and provides greater flexibility to admins.

#### OIDC IdPs now support group sync is GA in Production

OpenID Connect identity providers (IdPs) now support full group sync and adding a user to a group that they don't already belong to. A user who authenticates with an external IdP is added to all available groups when **Full sync of groups** is enabled. The user is added to any groups that they don't already belong to when **Add user to missing groups** is enabled. This allows you to specify certain groups that users should be added to. <!-- GROUP_SYNC_FEATURE_OIDC_IDP_ENABLED (https://oktainc.atlassian.net/browse/OKTA-817450#icft=OKTA-817450) -->

#### Granular account linking for certain Identity Providers is GA in Production

When admins link users from SAML and OIDC identity providers, they can now exclude specific users and admins. This improves security by allowing admins to configure granular access control scenarios. See **Add an external Identity Provider** for [OpenId Connect](/docs/guides/add-an-external-idp/openidconnect/main/#create-an-identity-provider-in-okta) and [SAML 2.0](/docs/guides/add-an-external-idp/saml2/main/#create-an-identity-provider-in-okta). <!-- EXTENDED_ACCOUNT_LINKING_FILTERS OKTA-831244-->

#### Realms for Workforce is GA in Production

The Realms and Realms Management APIs allow you to unlock greater flexibility in managing and delegating the management of your distinct user populations within a single Okta org. See [Realms](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Realm/) and [Realm Assignments](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/RealmAssignment/).   <!--- https://oktainc.atlassian.net/browse/OKTA-853176#icft=OKTA-853176 UD_REALMS_FOUNDATIONS and UD_REALMS -->

#### Improved group search functionality is GA in Production

You can now search for groups whose names or descriptions contain specified text. This makes it easier to find a group when you don't recall its exact name. Use the `co` operator within the `search` parameter of the Groups API. See [Operators](https://developer.okta.com/docs/api/#operators) and [`search` within the Groups API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/#tag/Group/operation/listGroups!in=query&path=search&t=request). <!--OKTA-862579 DIRECTORY_SERVICE_GROUP_CONTAINS_SEARCH-->

#### Improved user search functionality is GA in Production

You can now search for users whose names, email addresses, or usernames contain specified text. This makes it easier to do user lookups and add users to groups. Use the `co` operator within the `search` parameter of the Users API. See [Operators](https://developer.okta.com/docs/api/#operators) and [`search` within the Users API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/#tag/User/operation/listUsers!in=query&path=search&t=request). <!--OKTA-862577 DIRECTORY_SERVICE_USER_CONTAINS_SEARCH-->

#### Improved realms and device search functionality is GA in Production

We've extended the contains (`co`) operator to realms and devices. You can now search for realms and devices whose profile attributes contain specified text through API. This makes lookups easier without needing to recall the exact names of various profile attributes. Use the `co` operator within the `search` parameter. See [Contains operator](https://developer.okta.com/docs/api/#contains-operator) and the `search` parameter in the [Realms](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Realm/#tag/Realm/operation/listRealms!in=query&path=search&t=request) and [Devices](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Device/#tag/Device/operation/listDevices!in=query&path=search&t=request) APIs. <!-- OKTA-865940 -->

#### New End-user Enrollments API is GA in Production

The new [End-user Enrollments API](https://developer.okta.com/docs/api/openapi/okta-signin-experience-management/signinexp/tag/endUserEnrollments/) enables end users to enroll and unenroll authenticators by entering a URL directly into their browser. This reduces the time spent administering complex authenticator enrollment flows, and provides a streamlined enrollment process for users. After a user enrolls or unenrolls an authenticator, you can use the `redirect_uri` property to redirect them to another page.<!-- OKTA-868775 ENG_AUTHENTICATOR_ENROLLMENTS_USER_MANAGEMENT_WITH_REDIRECT -->

#### CLEAR Verified as a third-party identity verification provider is EA in Preview

Okta now supports using CLEAR Verified as an identity provider. This increases the number of identity verification vendors (IDVs) you can use to verify the identity of your users when they onboard or reset their account. Set `IDV_CLEAR` as the IdP `type` when you [create an IdP](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentityProvider/#tag/IdentityProvider/operation/createIdentityProvider).<!-- https://oktainc.atlassian.net/browse/OKTA-848097#icft=OKTA-848097 IDV_STANDARD_INTEGRATION -->

#### Verify an SSF Stream is EA in Preview

Okta SSF Transmitter now supports the verification endpoint to enable receivers to request verification events and validate the end-to-end delivery between the transmitter and receiver. In addition, the SSF Transmitter verification events claim structure is now compliant with the OpenID Shared Signals Framework ID3 spec. <!-- OKTA_SSF_TRANSMITTER_PUSH_VERIFICATION_ENDPOINT into OKTA_SSF_TRANSMITTER_PUSH -->

#### MyAccount Password API updates

Admins can now send a PUT request to the `/idp/myaccount/password` endpoint to update the password for a user. Also, admins can send a GET request to the `/idp/myaccount/password/complexity-requirements` endpoint to retrieve password complexity requirements. See [Replace a Password](https://developer.okta.com/docs/api/openapi/okta-myaccount/myaccount/tag/Password/#tag/Password/operation/replacePassword) and [Retrieve the Password Complexity Requirements](https://developer.okta.com/docs/api/openapi/okta-myaccount/myaccount/tag/Password/#tag/Password/operation/getPasswordRequirements). <!-- FFs ENG_ENABLE_MY_ACCOUNT_CHANGE_PASSWORD and ENG_ENABLE_MY_ACCOUNT_GET_PASSWORD_REQUIREMENTS -->

#### Identity Security Posture Management functionality in the OIN catalog

The **Okta Integration Network** page now provides **Identity Security Posture Management** functionality. When you select it, the OIN catalog displays only the apps with Identity Security Posture Management functionality.

#### Default global session policy rule update

The default value for the `maxSessionLifetimeMinutes` property of the default global session policy rule is now `1440` (24 hours) and can be changed. Previously the `maxSessionLifetimeMinutes` property of the default global session policy rule was read-only.
See the [Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule!path=3/actions/signon/session/maxSessionLifetimeMinutes&t=request).

#### Developer documentation updates in 2025.03.0

* The list of public permissions has moved from the [Roles in Okta](https://developer.okta.com/docs/api/openapi/okta-management/guides/roles/#permissions) topic to the [Permissions in Okta](https://developer.okta.com/docs/api/openapi/okta-management/guides/permissions) topic. The new topic contains more permission details for you to define your custom admin roles.<!--OKTA-857969-->

* A new section has been added to the API documentation: [Sign-in Experience API](https://developer.okta.com/docs/api/openapi/okta-signin-experience-management/guides/overview/). It contains the new End-user Enrollments API that enables end users to enroll and unenroll authenticators by entering a URL directly into their browser.<!-- OKTA-868775 -->

#### Bugs fixed in 2025.03.0

* Some certificates with trailing characters were uploaded successfully to the `/domains/{domainId}/certificate` endpoint, despite their invalid format. (OKTA-486406)

* An incorrect response was returned when a `/token` request was sent with an inactive user in a direct authentication flow. (OKTA-853984)

## February

### Weekly release 2025.02.2

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Incode as a third-party identity verification provider is EA in Preview](#incode-as-a-third-party-identity-verification-provider-is-ea-in-preview) | February 20, 2025 |
| [Bugs fixed in 2025.02.2](#bugs-fixed-in-2025-02-2)| February 20, 2025 |

#### Incode as a third-party identity verification provider is EA in Preview

Okta now supports using Incode as an identity provider. This increases the number of identity verification vendors (IDVs) you can use to verify the identity of your users when they onboard or reset their account. Set `IDV_INCODE` as the IdP `type` when you [create an IdP](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentityProvider/#tag/IdentityProvider/operation/createIdentityProvider). <!-- OKTA-848097  IDV_STANDARD_INTEGRATION -->

#### Bugs fixed in 2025.02.2

* An API request to create a resource set with a duplicate name sometimes returned a 5xx error instead of a 4xx error response. (OKTA-867792)

* Admins couldn't retrieve more than five entitlement SAML assertions and OIDC claims when configuring apps. (OKTA-865900)

* The contains (`co`) operator sometimes gave unclear error messages when using less than three characters or with other operators. (OKTA-846206)

* When an admin attempted to revoke an API token (`DELETE /api/v1/api-tokens/{apiTokenId}`), and the credential used to authenticate the request was an `access_token` for a Service client, an HTTP 403 error was returned. (OKTA-844384)

### Weekly release 2025.02.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2025.02.1](#bugs-fixed-in-2025-02-1)| February 13, 2025 |

#### Bugs fixed in 2025.02.1

* When a GET request was made using the User Grants API (`/api/v1/users/{userId}/grants`), the response didn't include pagination links in the response header. (OKTA-826775)

* The Users API returned inconsistent responses in Classic Engine orgs that allowed self-service registration and in Identity Engine orgs that were migrated from these orgs. (OKTA-833094)

* In the Admin Console, updates in the code editor that Okta couldn't parse returned a 500 Internal Server Error. (OKTA-837068)

* The On-Behalf of Token Exchange flow was returning the wrong error message when an invalid `subject_token_type` was requested. (OKTA-841223)

* When a POST request was made (`/api/v1/authorizationServers/{authServerId}/policies`) to create an authorization policy, the `created` and `lastUpdated` properties had a null value. (OKTA-848623)

* The `/user/verify_idx_credentials` endpoint didn't accept arbitrary `fromUri` values. (OKTA-853353)

* AMR values weren't forwarded to the app when a user signed in and Okta-to-Okta claims sharing was configured. (OKTA-860242)

* Some identity provider API POST (`/api/v1/idps`) and PUT (`/api/v1/idps/{idpId}`) requests returned an HTTP 500 error code if the request didn't have the `policy.accountLink` object in the request body. (OKTA-865143)

### Monthly release 2025.02.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [IP Exempt Zone is GA in Preview](#ip-exempt-zone-is-ga-in-preview) | October 23, 2024 |
| [Global token revocation for wizard SAML and OIDC apps is GA in Preview](#global-token-revocation-for-wizard-saml-and-oidc-apps-is-ga-in-preview) |  September 11, 2024               |
| [OIDC IdPs now support group sync is GA in Preview](#oidc-idps-now-support-group-sync-is-ga-in-preview) |  October 23, 2024              |
| [Granular account linking for certain identity providers is GA](#granular-account-linking-for-certain-identity-providers-is-ga) |  December 11, 2024               |
| [Realms for Workforce is GA in Preview](#realms-for-workforce-is-ga-in-preview)|   February 13, 2025              |
| [Improved group search functionality is GA in Preview](#improved-group-search-functionality-is-ga-in-preview) |    February 12, 2025             |
| [Improved user search functionality is GA in Preview](#improved-user-search-functionality-is-ga-in-preview) |    February 12, 2025             |
| [Support for importing Active Directory group descriptions is GA in Production](#support-for-importing-active-directory-group-descriptions-is-ga-in-production) |    February 6, 2025             |
| [Developer documentation updates in 2025.02.0](#developer-documentation-updates-in-2025-02-0) |    February 6, 2025             |
| [Bugs fixed in 2025.02.0](#bugs-fixed-in-2025-02-0) |    February 6, 2025             |

#### IP Exempt Zone is GA in Preview

This feature introduces `useAsExemptList` as a read-only Boolean property that distinguishes the new default IP exempt zones from other zones. When you enable this feature and you make a GET `api/v1/zones` request, Okta returns `useAsExemptList` in the response. The value `true` indicates that the zone is an exempt zone. Only system generated exempt zones are available. <!-- DEFAULT_NETWORK_ZONE_IP_EXEMPT_LIST (OKTA-795812: Parent Jira for DEFAULT_NETWORK_ZONE_IP_EXEMPT_LIST GA Preview) -->

#### Global token revocation for wizard SAML and OIDC apps is GA in Preview

Universal Logout clears sessions and tokens for wizard SAML and OIDC apps. This enhancement extends Universal Logout functionality to more types of apps and provides greater flexibility to admins. <!-- FF GLOBAL_TOKEN_REVOCATION_SUPPORT (OKTA-797187)-->

#### OIDC IdPs now support group sync is GA in Preview

OpenID Connect (OIDC) identity providers (IdPs) now support full group sync and adding a user to a group that they don't already belong to. A user who authenticates with an external IdP is added to all available groups when **Full sync of groups** is enabled. The user is added to any groups that they don't already belong to when **Add user to missing groups** is enabled. This allows you to specify certain groups that users should be added to. <!-- GROUP_SYNC_FEATURE_OIDC_IDP_ENABLED (OKTA-817450: FVM for EA Self-Service GROUP_SYNC_FEATURE_OIDC_IDP_ENABLED for Weekly Release 2024.10.1 Resolved) -->

#### Granular account linking for certain identity providers is GA

When admins link users from SAML and OIDC identity providers, they can now exclude specific users and admins. This improves security by allowing admins to configure granular access control scenarios. See **Add an external Identity Provider** for [OpenID Connect](/docs/guides/add-an-external-idp/openidconnect/main/#create-an-identity-provider-in-okta) and [SAML 2.0](/docs/guides/add-an-external-idp/saml2/main/#create-an-identity-provider-in-okta). <!-- EXTENDED_ACCOUNT_LINKING_FILTERS OKTA-831244-->

#### Realms for Workforce is GA in Preview

The Realms and Realms Management APIs allow you to unlock greater flexibility in managing and delegating the management of your distinct user populations within a single Okta org. See [Realms](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Realm/) and [Realm Assignments](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/RealmAssignment/). <!--- OKTA-853176: Parent Jira for UD_REALMS_FOUNDATIONS and UD_REALMS Open UD_REALMS_FOUNDATIONS and UD_REALMS -->

#### Improved group search functionality is GA in Preview

You can now search for groups whose names or descriptions contain specified text. This makes it easier to find a group when you don't recall its exact name. Use the `co` operator within the `search` parameter of the Groups API. See [Operators](https://developer.okta.com/docs/api/#operators) and `search` within the [Groups API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/#tag/Group/operation/listGroups!in=query&path=search&t=request). <!--OKTA-862579 DIRECTORY_SERVICE_GROUP_CONTAINS_SEARCH-->

#### Improved user search functionality is GA in Preview

You can now search for users whose names, email addresses, or usernames contain specified text. This makes it easier to add users to groups or apps. Use the `co` operator within the `search` parameter of the Users API. See [Operators](https://developer.okta.com/docs/api/#operators) and `search` within the [Users API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/#tag/User/operation/listUsers!in=query&path=search&t=request).
<!--OKTA-862577 DIRECTORY_SERVICE_USER_CONTAINS_SEARCH-->

#### Support for importing Active Directory group descriptions is GA in Production

The descriptions of groups sourced from Active Directory now use their description from AD. These replace any previous descriptions of AD-sourced groups in Okta, which used a pretty-printed version of the distinguished name (DN) instead.<!-- FF IMPORT_AD_GROUP_DESCRIPTION OKTA-863277 -->

#### Developer documentation updates in 2025.02.0

* The [Style the Sign-In Widget (third generation)](/docs/guides/custom-widget-gen3/main/#use-the-aftertransform-function-recommended) guide, under **Brand and Customize**, now describes how to use the `afterTransform` function. The function allows you to apply DOM customizations to the third generation of the widget. For example, you can use `afterTransform` to change button text or to add an instructional paragraph. <!-- OKTA-756971-->
* The new [Configure a device assurance policy](/docs/guides/device-assurance-policies/main/) guide, under **Sign users in**, describes how to manage device assurance policies in your org. The guide uses the [Device Assurance Policies API](/docs/guides/device-assurance-policies/main/) to create and edit a policy, and add device assurance to an authentication policy. It also shows how to use the [System Log API](/docs/reference/system-log-query/) to check for device assurance events. <!-- OKTA-825476 -->
* The [OIN Manager: submit an integration](/docs/guides/submit-app/apiservice/main/) guide has been updated to include **API service** submission instructions. <!-- OKTA-809892 -->

#### Bugs fixed in 2025.02.0

* When calling deleted app users through the Apps API, the API returned a 500 internal server error instead of a 404 error. (OKTA-832609)
* PUT requests (`/api/v1/apps/appId`) to update an OpenID Connect app took 30 seconds to complete. (OKTA-852488)
* When the [List all devices API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Device/#tag/Device/operation/listDevices) was used with a `search` query parameter, it sometimes returned outdated records for `screenLockType` and `managementStatus`.  (OKTA-856387)

## January

### Weekly release 2025.01.2

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Authentication claims sharing between Okta orgs is EA in Preview](#authentication-claims-sharing-between-okta-orgs-is-ea-in-preview) | January 29, 2025 |
| [Bugs fixed in 2025.01.2](#bugs-fixed-in-2025-01-2) | January 29, 2025 |

#### Authentication claims sharing between Okta orgs is EA in Preview

Authentication claims sharing allows an admin to configure their Okta org to trust claims from IdPs during SSO. Sharing claims also allows Okta to interpret the authentication context from an IdP. This helps eliminate duplicate factor challenges during user authentication and helps improve security posture. See [Configure claims sharing](/docs/guides/configure-claims-sharing/oktasaml/main/).<!-- ORG2ORG_CLAIMS_SHARING OKTA-856733 -->

#### Bugs fixed in 2025.01.2

* When the Default Network Zone IP Exempt List feature was enabled for an org, an admin was able to delete the default example IP zone using the Zones API (`/api/v1/zones/{DefaultExemptIpZone ID}`). (OKTA-817263)
* The [List all principal rate limits](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/PrincipalRateLimit/#tag/PrincipalRateLimit/operation/listPrincipalRateLimitEntities) returned an empty response when querying with a custom `client_id` and using OAuth 2.0 for authentication.  (OKTA-832687)
* When a super admin updated a deactivated user to a different realm, admins received a `Resource not found` error. (OKTA-699778)
* Events for tokens revoked in bulk for a resource didn't appear in the System Log. (OKTA-834025)
* Refresh tokens for OpenID Connect apps that have Single Logout enabled with user session details were getting invalidated before their max lifetime. (OKTA-730794)
* Account unlock didn't work for some orgs using the Okta account management policy. (OKTA-848066)

### Weekly release 2025.01.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2025.01.1](#bugs-fixed-in-2025-01-1)| January 15, 2025 |

#### Bugs fixed in 2025.01.1

* When an admin attempted to delete an IdP using the SDK, the operation failed with an HTTP 500 response code. (OKTA-846005)

* POST requests with an OAuth token to the `/devices/{deviceId}/lifecycle/deactivate` endpoint by an API service app using the Client Credentials flow returned 403 error responses. The deactivations succeeded in spite of the error response. (OKTA-838539)

### Monthly release 2025.01.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Additional use case selection in the OIN Wizard](#additional-use-case-selection-in-the-oin-wizard) | January 8, 2025 |
| [Configure Identity Verification with third-party Identity Verification providers is GA Production](#configure-identity-verification-with-third-party-identity-verification-providers-is-ga-production) | October 2, 2024|
| [Deprecated API endpoints: Extend, Grant, and Revoke Okta Support access](#deprecated-api-endpoints-extend-grant-and-revoke-okta-support-access) | January 8, 2025 |
| [Granular configuration for Keep Me Signed In is EA in Preview](#granular-configuration-for-keep-me-signed-in-is-ea-in-preview) | January 8, 2025 |
| [Multiple Identifiers is GA in Preview](#multiple-identifiers-is-ga-in-preview) | November 7, 2024 |
| [New group.source.id key for group functions in Expression Language](#new-group-source-id-key-for-group-functions-in-expression-language) | January 2, 2025 |
| [POST requests to the authorize endpoint is self-service EA](#post-requests-to-the-authorize-endpoint-is-self-service-ea) | January 8, 2025 |
| [Bug fixed in 2025.01.0](#bug-fixed-in-2025-01-0)| January 8, 2025 |

#### Additional use case selection in the OIN Wizard

Independent software vendors (ISVs) can select the following additional use case categories when they submit their integration to the OIN:

* Automation
* Centralized Logging
* Directory and HR Sync
* Multifactor Authentication (MFA)

See [OIN Wizard use case selection](/docs/guides/submit-app-prereq/main/#oin-wizard-use-case-selection). <!-- OKTA-843778 -->

#### Configure Identity Verification with third-party Identity Verification providers is GA Production

You can now configure third-party Identity Verification providers using the IdP API and [Okta account management policy rules](/docs/guides/okta-account-management-policy/main/). Okta supports Persona as a third-party Identity Verification provider.

Identity Verification enables you to use a third-party Identity Verification provider to verify the identity of your users. Verification requirements and the Identity Verification provider are based on your authentication policies and configurations within your Okta org. To configure an Identity Verification provider in the Admin Console, see [Add an Identity Verification vendor as Identity Provider](https://help.okta.com/okta_help.htm?type=oie&id=id-verification). <!-- OKTA-803683 -->

#### Deprecated API endpoints: Extend, Grant, and Revoke Okta Support access

The following API endpoints have been deprecated:

* [Extend Okta Support access](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/OrgSettingSupport/#tag/OrgSettingSupport/operation/extendOktaSupport) (`POST /api/v1/org/privacy/oktaSupport/extend`)
* [Grant Okta Support access](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/OrgSettingSupport/#tag/OrgSettingSupport/operation/grantOktaSupport) (`POST /api/v1/org/privacy/oktaSupport/grant`)
* [Revoke Okta Support access](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/OrgSettingSupport/#tag/OrgSettingSupport/operation/revokeOktaSupport) (`POST /api/v1/org/privacy/oktaSupport/revoke`)

Use the [Update an Okta Support case](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/OrgSettingSupport/#tag/OrgSettingSupport/operation/updateOktaSupportCase) endpoint to extend, grant, or revoke Okta Support access for a specific support case. For the corresponding Okta Admin Console feature, see [Give access to Okta Support](https://help.okta.com/okta_help.htm?type=oie&id=settings-support-access). <!-- OKTA-823338 -->

#### Granular configuration for Keep Me Signed In is EA in Preview

Admins can now configure the post-authentication prompt for Keep Me Signed In (KMSI) at a granular level in authentication policies. This allows admins to selectively enable post-authentication KMSI on a per-user, per-group, or per-app basis. When enabled, this feature exposes a frequency setting that lets admins control how often the post-authentication prompt is presented to users. See [Configure Keep me signed in (KMSI)](/docs/guides/keep-me-signed-in/main/).

The post-authentication prompt text (title, subtitle, accept button, and reject button) is now customizable through the Brands API. See [Customize post-authentication sign-in prompts](/docs/guides/keep-me-signed-in/main/#customize-post-authentication-sign-in-prompts). <!-- OKTA-791596 FF: POST_AUTH_KMSI_IN_AUTH_POLICY  -->

#### Multiple Identifiers is GA in Preview

Today, end users must sign in to Okta with a username or email address only. With the Multiple Identifiers feature, admins can configure identifiers, or user attributes from Universal Directory, that an end user can enter to authenticate. Multiplier identifiers work in sign-in, recovery, self-service registration, and unlock flows. Admins can configure up to three identifiers, including email (which is still a required identifier). See [Configure multiple identifiers](/docs/guides/multiple-identifiers/main/). <!-- OKTA-687191  FF: MULTIPLE_IDENTIFIERS -->

#### New group.source.id key for group functions in Expression Language

You can now use the `group.source.id` key in Expression Language group functions to filter between groups that have the same name. See [Group functions](/docs/reference/okta-expression-language-in-identity-engine/#group-functions). <!-- OKTA-832132 -->

#### POST requests to the authorize endpoint is Self-Service EA

You can now send user data securely in a POST request body to the /authorize endpoint. <!-- https://oktainc.atlassian.net/browse/OKTA-827104#icft=OKTA-827104 OAUTH2_AUTHORIZE_WITH_POST -->

#### Developer documentation updates in 2025.01.0

The Sign users in to your SPA using redirect guides for the [Angular](/docs/guides/sign-into-spa-redirect/angular/main/) and [React](/docs/guides/sign-into-spa-redirect/react/main/) platforms are now revised to use updated versions of Okta SDKs, framework dependencies, and coding patterns.

#### Bug fixed in 2025.01.0

Requests to the `/policies/{policyId}/rules` and `/policies/{policyId}/rules/{ruleId}` endpoints to create or update Okta account management policy rules included default Keep me signed in (KMSI) settings in the responses. (OKTA-848236)
