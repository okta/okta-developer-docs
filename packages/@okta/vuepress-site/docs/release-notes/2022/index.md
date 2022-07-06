---
title: Okta API Products release notes 2022
---

## June

### Weekly release 2022.06.3

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bug fixed in 2022.06.3](#bug-fixed-in-2022-06-3)                      | June 29, 2022            |

#### Bug fixed in 2022.06.3

* There was no limit on the number of factor sequences that could be added in a chain through a Policy API update. (OKTA-499259)

### Weekly release 2022.06.2

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Reset Factors endpoint includes a new optional request parameter](#reset-factors-endpoint-includes-a-new-optional-request-parameter)                      | June 23, 2022            |
| [Bugs fixed in 2022.06.2](#bugs-fixed-in-2022-06-2)                      | June 23, 2022            |

#### Reset Factors endpoint includes a new optional request parameter

The `/reset_factors` endpoint has a new optional request parameter for the [Reset Factor lifecycle operation](/docs/reference/api/users/#reset-factors). You can now remove the phone factor (for example: SMS/Voice) as both a recovery method and a factor by setting the `removeRecoveryEnrollment` parameter to true when making a POST request to the `/reset_factors` endpoint (`/users/${userId}/lifecycle/reset_factors`). <!--OKTA-500168-->

#### Bugs fixed in 2022.06.2

* When an OAuth 2.0 client was created with a missing JWKS RSA modulus value (`n` parameter), the JWKS validation failed. (OKTA-424664)

* When the JSON Web Key API or the Client Credentials API was used to manage client credentials, the event wasn't triggered in the System Log. (OKTA-494619)

* The List custom roles API response returned wrong field values for the `description` and `lastUpdated` properties and didn't include the `_links` property. (OKTA-506993)

### Weekly release 2022.06.1

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.06.1](#bugs-fixed-in-2022-06-1) | June 15, 2022 |

#### Bugs fixed in 2022.06.1

* Resource Set operations performed with Okta Resource Names (ORNs) that used capital letters returned an HTTP 500 Internal Server Error. (OKTA-501910)

* Characters in the OAuth 2.0 consent logo URI (`logo_uri`) weren't encoded to prevent interference with HTTP Content Security Policy (CSP) directives. (OKTA-505553)

### Monthly release 2022.06.0

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Admin Roles with Delegated Flows Resource Set support is EA in Preview](#admin-roles-with-delegated-flows-resource-set-support-is-ea-in-preview) | May 25, 2022|
| [Dynamic IdP routing is EA in Preview](#dynamic-idp-routing-is-ea-in-preview) | June 8, 2022|
| [Email Address Bounces API is GA in Production](#email-address-bounces-api-is-ga-in-production) | March 2, 2022 |
| [Generic OIDC IdP nonce validation enforced](#generic-oidc-idp-nonce-validation-enforced) | June 8, 2022|
| [JWT claim enhancement](#jwt-claim-enhancement) | June 8, 2022|
| [OIDC Identity Providers private/public key pair support is EA in Preview](#oidc-identity-providers-private-public-key-pair-support-is-ea-in-preview) | June 8, 2022|
| [Okta Verify rate limit updates](#okta-verify-rate-limit-updates) | June 8, 2022|
| [Regular expression support for matching users with a generic inbound OIDC IdP](#regular-expression-support-for-matching-users-with-a-generic-inbound-oidc-idp) | June 8, 2022|
| [Signed request support for generic SAML IdP is EA in Preview](#signed-request-support-for-generic-saml-idp-is-ea-in-preview) | June 8, 2022|
| [System Log events for telephony rate limit violations](#system-log-events-for-telephony-rate-limit-violations) | June 8, 2022|
| [Bugs fixed in 2022.06.0](#bugs-fixed-in-2022-06-0) | June 8, 2022 |

#### Admin Roles with Delegated Flows Resource Set support is EA in Preview

With delegated flows, admins can be assigned the ability to run Okta Workflows through the Administrator Roles API. Flows that are delegated to an admin appear in the **Delegated Flows** page where admins can invoke them without signing in to the Workflows Console. This gives super admins more granular control over their admin assignments. See [Resource Sets](/docs/concepts/role-assignment/#resource-sets) in the Custom Role assignment concept and [Supported resources](/docs/reference/api/roles/#supported-resources) in the Administrator Roles API. <!-- OKTA-450117 -->

#### Dynamic IdP routing is EA in Preview

Org admins can now consolidate multiple IdP routing rules into a single dynamic routing rule. Dynamic routing rules use expression language to match users to any IdP, based on attributes of their login object. This reduces the volume and complexity of routing rules and the manual effort of managing them. See [Policy Action with Dynamic IdP routing](/docs/reference/api/policy/#policy-action-with-dynamic-idp-routing). <!-- OKTA-501508 -->

#### Email Address Bounces API is GA in Production

Okta admins can now control the bounced email address list through the [Email Address Bounces API](/docs/reference/api/org/#email-address-bounces-operations). When Okta-sent email addresses are blocked from an email service (the bounced email list), admins can use this API to create a list of blocked email addresses to be removed from the email service. Note: This API is not available in Free Trial and Developer orgs. <!-- OKTA-482000 -->

#### Generic OIDC IdP nonce validation enforced

For generic OIDC IdPs, Okta fails the authentication if the returned ID token doesn’t contain the `nonce` that was sent with the initial authorize request. <!-- OKTA-486805 -->

#### JWT claim enhancement

Okta accepts claim names in URI format (with colon and slash characters) for custom claims in the JSON Web Token (JWT) payload. For example, `http://example.com/is_root` is a supported claim name. <!-- OKTA-496380 -->

#### OIDC Identity Providers private/public key pair support is EA in Preview

Previously, Okta only supported the use of client secret as the client authentication method with an OpenID Connect-based Identity Provider. Okta now supports the use of private/public key pairs (`private_key_jwt`) with OpenID Connect-based Identity Providers. Additionally, the Signed Request Object now also supports the use of private/public key pairs. See [Create an Identity Provider in Okta](/docs/guides/add-an-external-idp/openidconnect/main/#create-an-identity-provider-in-okta). <!-- OKTA-502636 -->

#### Okta Verify rate limit updates

Users who attempt to enroll in Okta Verify using SMS can now be rate limited. These rate limit events are now logged in the [System Log](/docs/reference/rl-system-log-events/). <!-- OKTA-502577 -->

#### Regular expression support for matching users with a generic inbound OIDC IdP

Admins can configure the Okta OIDC Identity Provider to only authenticate users from an inbound OIDC IdP if their usernames match a predefined regular expression pattern. See the `filter` property from the [Subject Policy object](/docs/reference/api/idps/#subject-policy-object) in the IdPs API and the Authentication Settings section in the [OIDC IdP](/docs/guides/add-an-external-idp/openidconnect/main/#create-an-identity-provider-in-okta) configuration. <!-- OKTA-500903 -->

#### Signed request support for generic SAML IdP is EA in Preview

Using signed SAML requests ensures that incoming requests are from genuine applications. When a signed SAML request is configured, Okta only accepts SAML requests signed using the certificate associated with the app integration. Having signed SAML requests also resolves scenarios where the Assertion Consumer Service (ACS) URL requested after authentication can be one of several domains or URLs. When a Service Provider sends a signed authentication request, Okta can accept dynamic ACS values as part of the SAML request and posts the SAML assertion response to the ACS value specified in the request. See the Advanced Settings section of [Create SAML app integrations using AIW](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-aiw-saml). <!-- OKTA-493043 -->

#### System Log events for telephony rate limit violations

Telephony `system.sms.send.*` and `system.voice.send.*` events are now issued as a `DENY` System Log message when SMS or Voice messages are blocked due to telephony operational rate limit violations. The `system.operation.rate_limit.violation` event is still fired, but will be deprecated in the 2022.08.0 release.

Additionally, the way that the `MobilePhoneID` hash is created for all `system.sms.send.*` and `system.voice.send.*` events is changed.

See the [System Log API](/docs/reference/api/system-log/). <!-- OKTA-498664 -->

#### Bugs fixed in 2022.06.0

* The User Consent URIs (`logo_uri`, `policy_uri`, and `tos_uri`) configured in an app's [settings](/docs/reference/api/apps/#settings-10) weren't validated for HTTP or HTTPS URI schemes. (OKTA-395220)

* When a create user API request failed due to non-compliant user credentials, the "Add user to group membership" and "Add user to application membership" events were listed incorrectly in the System Log. (OKTA-469408)

* No System Log error event was triggered when a request to the [Forgot password API endpoint](/docs/reference/api/users/#forgot-password) (`/users/{userId}/credentials/forgot_password`) was made for a user with a `LOCKED_OUT` status. (OKTA-485242)

* No error messages were returned when an API request was made to [create](/docs/reference/api/roles/#create-resource-set) or [update](/docs/reference/api/roles/#add-more-resources) a resource set with invalid ORNs. This occurred if the request was made to an org with the **Okta Resource Name (ORN) in API for Administrator Roles** feature enabled. (OKTA-499775)

* When a user was created with `activate=true` and `nextLogin=changePassword` parameters, their user status was set to `ACTIVE` instead of `PASSWORD_EXPIRED`. (OKTA-501729)

## May

### Weekly release 2022.05.3

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [New optional request parameter for Reset Factor is GA in Preview](#new-optional-request-parameter-for-reset-factor-is-ga-in-preview) | May 25, 2022 |
| [Bugs fixed in 2022.05.3](#bugs-fixed-in-2022-05-3) | May 25, 2022 |

#### New optional request parameter for Reset Factor is GA in Preview

The `/factors` endpoint has a new optional request parameter for the [Reset Factor](/docs/reference/api/factors/#reset-factor) lifecycle operation. You can now remove the phone factor (for example: SMS/Voice) as both a recovery method and a factor with one call by setting the `removeRecoveryEnrollment` parameter to `true` when making a DELETE request to the `/factors` endpoint (`/users/${userId}/factors/${factorId}`). <!--OKTA-489015-->

#### Bugs fixed in 2022.05.3

* If the new `/idp` version of the [MyAccount API](/docs/reference/api/myaccount/) wasn't enabled, [Add My Phone](/docs/reference/api/myaccount/#add-my-phone) or [Challenge My Phone](/docs/reference/api/myaccount/#challenge-my-phone) operations performed on the `/idp/myaccount/` endpoint returned inconsistent exception errors. (OKTA-494004)

* Post calls to the Org API endpoint that creates an email bounces remove list (`/org/email/bounces/remove-list`) sometimes returned an HTTP 500 Internal Server Error. (OKTA-497859)

* Using the [API](/docs/reference/api/authorization-servers/#claim-operations) to create a claim with a reserved name resulted in an unclear error message. (OKTA-477575)

### Weekly release 2022.05.2

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bug fixed in 2022.05.2](#bug-fixed-in-2022-05-2) | May 18, 2022 |

#### Bug fixed in 2022.05.2

If users were created with recovery credentials using the POST `/api/v1/users?activate=true` request, and Security Question was disabled for the applicable Group Password Policy, those users were no longer created in Active status. (OKTA-499552)

### Weekly release 2022.05.1

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [The API for suppressing email notifications is EA in Preview](#the-api-for-suppressing-email-notifications-is-ea-in-preview) | May 11, 2022 |
| [Bugs fixed in 2022.05.1](#bugs-fixed-in-2022-05-1) | May 11, 2022 |

#### The API for suppressing email notifications is EA in Preview

This API allows you to change who receives email notifications for each individual email template. You can suppress them completely, or send them to admins only. This unlocks testing scenarios that warrant using production user directories, and prevents end users from getting test emails. It also allows extensibility for customers who would like to use a third party email sender through Hooks or Workflows. See [Email template settings](/docs/reference/api/brands/#email-template-settings).

#### Bugs fixed in 2022.05.1

* When a security question was set using requests to the `/api/v1/users/{userId}` or `/api/v1/users/{userId}/credentials/change_recovery_question` endpoints, the answer could contain part of the question if the security question was disabled in the Default Policy. (OKTA-469369)

* When [role target operations](/docs/reference/api/roles/#role-target-operations) included an invalid `roleId`, an incorrect 500 system error was returned. (OKTA-487507)

### Monthly release 2022.05.0

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Email Address Bounces API is GA in Preview](#email-address-bounces-api-is-ga-in-preview) | March 2, 2022 |
| [Trusted Origins for iFrame embedding is EA in Preview](#trusted-origins-for-iframe-embedding-is-ea-in-preview) | May 4, 2022|
| [Authorize requests to generic OIDC IdPs now include nonce parameter](#authorize-requests-to-generic-oidc-idps-now-include-nonce-parameter) | May 4, 2022 |
| [Signed request support for generic OIDC IdP is GA in Production](#signed-request-support-for-generic-oidc-idp-is-ga-in-production) | March 2, 2022 |
| [Client secret rotation and key management is GA in Production](#client-secret-rotation-and-key-management-is-ga-in-production) | February 3, 2022 |
| [Okta API access with OAuth 2.0 for Org2Org is GA in Production](#okta-api-access-with-oauth-2-0-for-org2org-is-ga-in-production) | February 16, 2022 |
| [New permissions for custom admin roles](#new-permissions-for-custom-admin-roles) | May 4, 2022 |
| [Multi-optional authenticator enrollment is GA in Production](#multi-optional-authenticator-enrollment-is-ga-in-production) | May 4, 2022 |
| [Bugs fixed in 2022.05.0](#bugs-fixed-in-2022-05-0) | May 4, 2022 |

#### Email Address Bounces API is GA in Preview

Okta admins can now control the bounced email address list through the Email Address Bounces API. When Okta-sent email addresses are blocked from an email service (the bounced email list), admins can use this API to create a list of blocked email addresses to be removed from the email service. Note: This API is not available in Free Trial and Developer orgs. <!-- OKTA-481959 -->

#### Trusted Origins for iFrame embedding is EA in Preview

You can now choose what origins can embed Okta sign-in pages and Okta End-User Dashboard using Trusted Origins for iFrame embedding. This feature offers a granular control over iFrame embedding compared to the existing embedding option in Customization, which doesn't let you distinguish between secure and non-secure origins. Trusted Origins allow you to selectively configure the origins you trust. It also provides enhanced security as it uses a more secure `frame-ancestors` directive in Content Security Policy that protects your data from web attacks such as clickjacking. See [Trusted Origins API](/docs/reference/api/trusted-origins/). <!-- OKTA-494132 -->

#### Authorize requests to generic OIDC IdPs now include nonce parameter

For generic OIDC IdPs, a  randomized `nonce` parameter is now included in all authorize requests. The `nonce` value is sent to the IdP and can be verified in the returned ID Token. See [Identity Providers API](/docs/reference/api/idps/#oauth-2-0-authorization-server-authorization-endpoint-object). <!-- OKTA-199689 -->

#### Signed request support for generic OIDC IdP is GA in Production

When customers integrate Okta with an OIDC-based IdP, Okta asks the IdP to authenticate the user with request elements that are passed as query parameters in the URL. The new Signed Request Object allows customers to send these parameters encoded in a JWT instead, improving security on the authorization request sent to the OIDC provider or authorization server. <!-- OKTA-489014 -->

#### Client secret rotation and key management is GA in Production

Rotating client secrets without service or application downtime is a challenge. Additionally, JSON Web Key management can be cumbersome. To make [client secret rotation](/docs/guides/client-secret-rotation-key/main/) a seamless process and improve JWK management, you can now create overlapping client secrets and manage JWK key pairs in the Admin Console. You can also create JWK key pairs from the Admin Console without having to use an external tool. <!-- OKTA-489016 -->

#### Okta API access with OAuth 2.0 for Org2Org is GA in Production

The Okta Org2Org integration enables you to push and match both users and groups from one Okta org to another. Previously, this integration only supported token-based access to the Okta API. You can now [configure the Org2Org integration](/docs/guides/secure-oauth-between-orgs/) to access the Okta API as an [OAuth 2.0 client](/docs/reference/api/apps/#token-based-provisioning-connection-profile-properties). This increases security by limiting the scope of access and providing a better mechanism to rotate credentials. <!-- OKTA-493694 -->

#### New permissions for custom admin roles

Super admins can now assign these new permissions to their custom admin roles:

* Manage authorization server
* View authorization server
* Manage customizations
* View customizations

The authorization server permissions can be scoped to a subset of the org’s authorization servers. With these new permissions, super admins can now create custom admin roles with more granular permissions for managing their org’s customizations and authorization servers. See [ORN Resource Sets in the Role assignment](/docs/concepts/role-assignment/#okta-resource-name-orn) concept and the [Resource Set object in the Administrator Roles API](/docs/reference/api/roles/#resource-set-object). <!--  OKTA-487349 -->

#### Multi-optional authenticator enrollment is GA in Production

When you use the [AuthN APIs](/docs/reference/api/authn/#request-parameters-for-verify-recovery-token), Okta now prompts the user to enroll in optional authenticators during password recovery flows. <!-- OKTA-473103 -->

#### Bugs fixed in 2022.05.0

* Post calls to the Org API endpoint that creates an email bounces remove list (`/org/email/bounces/remove-list`) returned an HTTP 500 Internal Server Error. (OKTA-489040)

* If the Administrator Roles API ([users](/docs/reference/api/roles/#remove-a-group-target-from-a-group-administrator-role-given-to-a-user) and [groups](/docs/reference/api/roles/#remove-a-group-target-from-a-group-administrator-role-given-to-a-group)) endpoints contained an invalid role type, an HTTP 500 Internal Server Error was returned. (OKTA-393032)

* Custom email address attribute mapping for the GitHub IdP failed due to a conflict in the `id` external attribute. (OKTA-460058)

## April

### Weekly release 2022.04.3

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bug fixed in 2022.04.3](#bug-fixed-in-2022-04-3) | April 20, 2022 |

#### Bug fixed in 2022.04.3

* The `ssh_certificate_type` parameter was incorrectly set as required in the [Projects](/docs/reference/api/asa/projects/#create-a-project) endpoint from the ASA Projects API. (OKTA-489376)

### Weekly release 2022.04.1

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.04.1](#bugs-fixed-in-2022-04-1) | April 6, 2022 |

#### Bugs fixed in 2022.04.1

* An HTTP 500 internal server error sometimes occurred after saving an app instance. (OKTA-483001)

* Active Directory email activation templates that were translated for the Japanese, Korean, and Chinese languages didn’t render correctly. (OKTA-469764)

* An OIDC app couldn’t be updated for an IdP-initiated login with Okta flow when the **Initiate login URI** field in the Admin Console was empty. (OKTA-447112)

### Monthly release 2022.04.0

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Improved email magic link authentication experience is EA in Preview](#improved-email-magic-link-authentication-experience-is-ea-in-preview) | March 30, 2022 |
| [Splunk available for Log Streaming is EA in Preview](#splunk-available-for-log-streaming-is-ea-in-preview) | March 30, 2022 |
| [Burst rate limits available on Rate Limit Dashboard](#burst-rate-limits-available-on-rate-limit-dashboard) | March 30, 2022 |
| [Signed request support for generic OIDC IdP is GA in Preview](#signed-request-support-for-generic-oidc-idp-is-ga-in-preview) | March 02, 2022 |
| [Client secret rotation and key management is GA in Preview](#client-secret-rotation-and-key-management-is-ga-in-preview) | February 03, 2022 |
| [Okta Org2Org integration supporting Okta API access using an OAuth 2.0 client is GA in Preview](#okta-org2org-integration-supporting-okta-api-access-using-an-oauth-2-0-client-is-ga-in-preview) | February 16, 2022 |
| [Bug fixed in 2022.04.0](#bug-fixed-in-2022-04-0) | March 30, 2022 |

#### Improved email magic link authentication experience is EA in Preview

Email magic links are enhanced to allow end users to authenticate in two different contexts. They can authenticate using the same location where they click the link and quickly return to the application context. Or, if the end user clicks the link in a different browser, they can enter a one-time password to proceed with authentication. See [Sign in with password and email factors](/docs/guides/oie-embedded-sdk-use-case-sign-in-pwd-email/) and [Use redirect auth with the Identity Engine sample apps](/docs/guides/sampleapp-oie-redirectauth/).

#### Splunk available for Log Streaming is EA in Preview

Many organizations use third-party systems to monitor, aggregate, and act on the event data in Okta System Log events.

Log Streaming enables Okta admins to more easily and securely send System Log events to a specified system such as the Splunk Cloud in near real time with simple, pre-built connectors. Log streaming scales well even with high event volume, and unlike many existing System Log event collectors, it does not require a third-party system to store an Okta Admin API token. See [Splunk Cloud in the Log Streaming API](/docs/reference/api/log-streaming/#splunk-cloud-settings-object).

#### Burst rate limits available on Rate Limit Dashboard

The rate limit dashboard, available from the Admin Console, now includes data on burst limits in your Okta org, in addition to rate limit warnings and violations. The Violations dashboard was renamed Events to acknowledge the increase of scope, and includes the ability to filter on timeline as well as the type of event (warning, burst, and violation). Hovering over the burst rates in the graphs provides more detail and links to the system log for individual endpoint calls. The individual Usage graphs provide details on bursts for the individual API. See [Rate limit dashboard](/docs/reference/rl-dashboard/) and [Burst rate limits](/docs/reference/rate-limits/#burst-rate-limits).

#### Signed request support for generic OIDC IdP is GA in Preview

When customers [integrate Okta with an OpenID Connect-based Identity Provider](/docs/guides/add-an-external-idp/openidconnect/main/#create-an-identity-provider-in-okta), Okta asks the IdP to authenticate the user with request elements that are passed as query parameters in the URL. The new [Signed Request Object](/docs/reference/api/idps/#oidc-algorithms-object) allows customers to send these parameters encoded in a JWT instead, improving security on the authorization request sent to the OpenID Connect provider or authorization server.

#### Client secret rotation and key management is GA in Preview

Rotating client secrets without service or application downtime is a challenge. Additionally, JSON Web Key management can be cumbersome. To make [client secret rotation](/docs/guides/client-secret-rotation-key/) a seamless process and improve JWK management, you can now create overlapping client secrets and manage JWK key pairs in the Admin Console. You can also create JWK key pairs from the Admin Console without having to use an external tool.

#### Okta Org2Org integration supporting Okta API access using an OAuth 2.0 client is GA in Preview

The Okta Org2Org integration enables you to push and match both users and groups from one Okta org to another. Previously, this integration only supported token-based access to the Okta API. You can now [configure the Org2Org integration](/docs/guides/secure-oauth-between-orgs/) to access the Okta API as an [OAuth 2.0 client](/docs/reference/api/apps/#token-based-provisioning-connection-profile-properties). This increases security by limiting the scope of access and providing a better mechanism to rotate credentials.

#### Bug fixed in 2022.04.0

Performing a POST request on the `/apps/{applicationId}` [endpoint](/docs/reference/api/apps/#update-application) didn't update the secret if the org had the [Client Credentials Management](/docs/guides/implement-grant-type/clientcreds/main/#client-credentials-flow) feature enabled. (OKTA-482341)

## March

### Weekly release 2022.03.3

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bug fixed in 2022.03.3](#bugs-fixed-in-2022-03-3) | March 23, 2022 |

#### Bug fixed in 2022.03.3

The `auth_time` [claim](/docs/reference/api/oidc/#reserved-claims-in-the-header-section) wasn't defined as a reserved system claim. (OKTA-478924)

### Weekly release 2022.03.2

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.03.2](#bugs-fixed-in-2022-03-2) | March 16, 2022 |

#### Bugs fixed in 2022.03.2

* An error was incorrectly returned when a valid [update request](/docs/reference/api/authorization-servers/#update-a-scope) was made for the `device_sso` or `online_access` system scopes. (OKTA-417477)

* The `servers` parameter was incorrectly set as required in the [Preauthorization](/docs/reference/api/asa/projects/#create-a-preauthorization) endpoint from the ASA Projects API. (OKTA-478566)

### Weekly release 2022.03.1

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bug fixed in 2022.03.1](#bug-fixed-in-2022-03-1) | March 09, 2022 |

#### Bug fixed in 2022.03.1

When the [List email templates](/docs/reference/api/brands/#list-email-templates) or the [List email customizations](/docs/reference/api/brands/#list-email-customizations) operations were performed on the `/brands/` endpoint, the base address in the link response header contained the `-admin` string instead of the requested base address. (OKTA-465356)

### Monthly release 2022.03.0

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Authentication timestamp is added as an access token claim](#authentication-timestamp-is-added-as-an-access-token-claim) | March 2, 2022 |
| [Custom Administrator Roles is GA in Production](#custom-administrator-roles-is-ga-in-production) | February 3, 2022 |
| [Email Address Bounces API is EA in Preview](#email-address-bounces-api-is-ea-in-preview) | March 2, 2022 |
| [Enhanced email macros for email template customization](#enhanced-email-macros-for-email-template-customization) | March 2, 2022 |
| [Signed request support for generic OIDC IdP is EA in Preview](#signed-request-support-for-generic-oidc-idp-is-ea-in-preview) | March 2, 2022 |
| [Multi-optional authenticator enrollment is GA in Preview](#multi-optional-authenticator-enrollment-is-ga-in-preview)         | March 2, 2022           |
| [Bugs fixed in 2022.03.0](#bugs-fixed-in-2022-03-0)         | March 2, 2022           |

#### Authentication timestamp is added as an access token claim

The user-authenticated epoch timestamp is provided as the `auth_time` [claim in the access token](/docs/reference/api/oidc/#reserved-claims-in-the-payload-section).

#### Custom Administrator Roles is GA in Production

The Okta [Custom Administrator Roles](/docs/reference/api/roles/) API provides operations that you can use to create customized roles and assign them to a user or a group.

#### Email Address Bounces API is EA in Preview

Okta admins can now control the bounced email address list through the [Email Address Bounces API](/docs/reference/api/org/#email-address-bounces-operations). When Okta-sent email addresses are blocked from an email service (the bounced email list), admins can use this API to create a list of blocked email addresses to be removed from the email service.

#### Enhanced email macros for email template customization

Enhanced Email Macros updates the email templating engine to use Velocity Templating Language (VTL). This feature unlocks new syntax that provides enhanced conditional logic and access to all attributes in the Okta User Profile object. This allows developers and admins more customizations in their user-facing emails. See [Customize email notifications > Use Velocity Templating Language](/docs/guides/custom-email/main/#use-velocity-templating-language) and [Customize an email template](https://help.okta.com/okta_help.htm?id=ext_Settings_Email).

#### Signed request support for generic OIDC IdP is EA in Preview

When customers [integrate Okta with an OpenID Connect-based Identity Provider](/docs/guides/add-an-external-idp/openidconnect/main/#create-an-identity-provider-in-okta), Okta asks the IdP to authenticate the user with request elements that are passed as query parameters in the URL. The new [Signed Request Object](/docs/reference/api/idps/#oidc-algorithms-object) allows customers to send these parameters encoded in a JWT instead, improving security on the authorization request sent to the OpenID Connect provider or authorization server.

#### Multi-optional authenticator enrollment is GA in Preview

When you use the [AuthN APIs](/docs/reference/api/authn/#request-parameters-for-verify-recovery-token), Okta now prompts the user to enroll in optional authenticators during password recovery flows. <!-- OKTA-473103 -->

#### Bugs fixed in 2022.03.0

* The admin app assignment event wasn't triggered for an individual admin role assignment. (OKTA-460521)

* When ThreatInsight evaluated sign-in attempts for unknown users, the threat level was incorrectly displayed as `threatLevel=UNKNOWN` in the System Log. (OKTA-471299)

* The OAuth 2.0 [`/token`](/docs/reference/api/oidc/#token) and [`/authorize`](/docs/reference/api/oidc/#authorize) endpoints accepted requests that included the `resource` parameter. (OKTA-476549)

## February

### Weekly release 2022.02.2

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Okta Org2Org integration now supports Okta API access using an OAuth 2.0 client](#okta-org2org-integration-now-supports-okta-api-access-using-an-OAuth-2-0-client)                        | February 16, 2022         |
| [Bug fixed in 2022.02.2](#bug-fixed-in-2022-02-2)                        | February 16, 2022         |

#### Okta Org2Org integration now supports Okta API access using an OAuth 2.0 client

The Okta Org2Org integration enables you to push and match both users and groups from one Okta org to another. Previously, this integration only supported token-based access to the Okta API. You can now [configure the Org2Org integration](/docs/guides/secure-oauth-between-orgs/) to access the Okta API as an [OAuth 2.0 client](/docs/reference/api/apps/#token-based-provisioning-connection-profile-properties). This increases security by limiting the scope of access and providing a better mechanism to rotate credentials. <!-- OKTA-468121 -->

#### Bug fixed in 2022.02.2

Resend verification emails for self-service registered users didn't appear in the [System Log](/docs/reference/api/system-log/). (OKTA-456831)

### Weekly release 2022.02.1

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [API token ID added to System Log event types](#api-token-id-added-to-system-log-event-types)                        | February 9, 2022         |
| [Bug fixed in 2022.02.1](#bug-fixed-in-2022-02-1)                        | February 9, 2022         |

#### API token ID added to System Log event types

API requests that include an API token and return a System Log event now include the API token in the event payload. The token identifier appears in the System Log API `transaction.details.requestApiTokenId` field and in the `Event > System > Transaction > Detail > RequestApiTokenId` node in the Admin Console System Log. <!--OKTA-463678-->

To view an example of this new event detail, [create a user by API](/docs/guides/quickstart/main/#create-a-user-by-api) and view the associated event (`user.lifecycle.create`).

#### Bug fixed in 2022.02.1

The [OAuth token endpoint](/docs/reference/api/oidc/#response-example-error-2) didn’t reject requests that included a `code_verifier` parameter if the [authorization call](/docs/reference/api/oidc/#authorize) was issued without the PKCE `code_challenge` parameter. (OKTA-461970)

### Monthly release 2022.02.0

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Custom Administrator Roles is GA in Preview](#custom-administrator-roles-is-ga-in-preview) | February 3, 2022 |
| [Client secret rotation and key management is EA](#client-secret-rotation-and-key-management-is-ea) | February 3, 2022 |
| [Group role assignment improvement](#group-role-assignment-improvement) | February 3, 2022 |
| [Custom application username formats that allow the word "source" is GA in Production](#custom-application-username-formats-that-allow-the-word-source-is-ga-in-production) | February 3, 2022 |
| [Custom Domains with Okta-Managed Certificates is GA in Production](#custom-domains-with-okta-managed-certificates-is-ga-in-production) | February 3, 2022 |
| [Bug fixed in 2022.02.0](#bug-fixed-in-2022-02-0)         | February 3, 2022           |

#### Custom Administrator Roles is GA in Preview

The Okta [Custom Administrator Roles](/docs/reference/api/roles/) API provides operations that you can use to create customized roles and assign them to a user or a group. <!--OKTA-457514-->

#### Client secret rotation and key management is EA

Rotating client secrets without service or application downtime is a challenge. Additionally, JSON Web Key management can be cumbersome. To make [client secret rotation](/docs/guides/client-secret-rotation-key/) a seamless process and improve JWK management, you can now create overlapping client secrets and manage JWK key pairs in the Admin Console. You can also create JWK key pairs from the Admin Console without having to use an external tool. <!--OKTA-460699-->

#### Group role assignment improvement

[Assigning a role to a group](/docs/reference/api/roles/#assign-a-role-to-a-group) through the Administrator Roles API has been enhanced by retaining the existing role assignment ID where possible. <!--OKTA-457506-->

#### Custom application username formats that allow the word "source" is GA in Production

Custom application username formats that are set by the [Apps API](/docs/reference/api/apps/) can now include the word "source." <!--OKTA-443207-->

#### Custom Domains with Okta-Managed Certificates is GA in Production

When you customize an Okta URL domain, your Okta-hosted pages are branded with your own URL. [Okta-Managed Certificates](/docs/guides/custom-url-domain/main/#configure-a-custom-domain-through-okta-managed-certificates) auto renew through a Let's Encrypt integration, a free certificate authority. Since Okta handles certificate renewals, this reduces customer developer maintenance costs and the high risk of a site outage when certificates expire.  <!--OKTA-459338-->

#### Bug fixed in 2022.02.0

In the [Custom Administrator Roles](/docs/reference/api/roles/) API, some public DELETE requests returned a different response code than their contract. (OKTA-456896)

## January

### Weekly release 2022.01.2

| Change                                                                                              | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------|--------------------------|
| [Fewer digits revealed for shorter phone numbers](#fewer-digits-revealed-for-shorter-phone-numbers) | January 26, 2022 |
| [Bugs fixed in 2022.01.2](#bugs-fixed-in-2022-01-2)         | January 26, 2022           |

#### Fewer digits revealed for shorter phone numbers

The masking algorithm now reveals fewer digits in API responses for shorter profile phone numbers. <!--OKTA-455393-->

#### Bugs fixed in 2022.01.2

* When an invalid client assertion type was provided during a [Client Credentials grant type flow](/docs/guides/implement-grant-type/clientcreds/main/), the error response code was 401 instead of 400. (OKTA-456503)

* When the [Create a new Binding](/docs/reference/api/roles/#create-a-new-binding) or the [Add more Members to a Binding](/docs/reference/api/roles/#add-more-members-to-a-binding) operation was performed on the `/iam/resource-sets` endpoint, and included all users or all groups in the request, the request didn't fail as expected. (OKTA-459994)

### Weekly release 2022.01.1

| Change                                                                                              | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.01.1](#bugs-fixed-in-2022-01-1)         | January 13, 2022           |

#### Bugs fixed in 2022.01.1

* If the [Create a Scope](/docs/reference/api/authorization-servers/#create-a-scope) endpoint received multiple requests at or near the same time, duplicate Scopes could be created. (OKTA-442533)

* When the [Update resource set](/docs/reference/api/roles/#update-resource-set) endpoint was called, the `resourceSetId` parameter was required in the body of the request. (OKTA-445144)

* When the [Upload Theme background image](/docs/reference/api/brands/#upload-theme-background-image) endpoint was called, the image was converted to PNG format. (OKTA-458260)

* When the [List events](/docs/reference/api/system-log/#list-events) operation was performed on the `/logs` endpoint, some system logs showed the incorrect status for debug behaviors if there was missing data that prevented behavior evaluation. (OKTA-455372)

### Monthly release 2022.01.0

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Error response updated for malicious IP address sign-in requests is GA in Production](#error-response-updated-for-malicious-ip-address-sign-in-requests-is-ga-in-production) | December 8, 2021 |
| [Dynamic Issuer Mode is GA in Production](#dynamic-issuer-mode-is-ga-in-production) | December 8, 2021 |
| [Custom domains with Okta-managed certificates is GA in Production](#custom-domains-with-okta-managed-certificates-is-ga-in-production) | December 8, 2021 |
| [New permissions for custom admin roles](#new-permissions-for-custom-admin-roles) | January 6, 2022|

#### Error response updated for malicious IP address sign-in requests is GA in Production

If you block suspicious traffic and [ThreatInsight](/docs/reference/api/threat-insight/) detects that the sign-in request comes from a malicious IP address, Okta automatically denies the user access to the organization. The user receives an error in response to the request. From the user's perspective, the blocked request can't be identified due to ThreatInsight having identified the IP address as malicious. <!--OKTA-454335-->

#### Dynamic Issuer Mode is GA in Production

An authorization server's issuer URL can be used to validate whether tokens are issued by the correct authorization server. You can configure the issuer URL to be either the Okta subdomain (such as `company.okta.com`) or a custom domain (such as `sso.company.com`). See [Property details](/docs/reference/api/authorization-servers/#authorization-server-properties).

When there are applications that use Okta's subdomain and other applications that use the custom domain, the issuer validation breaks because the value is hard-coded to one domain or the other.

With Dynamic Issuer Mode, the issuer value in minted tokens is dynamically updated based on the URL that is used to initiate the original authorize request. See [Client application settings](/docs/reference/api/apps/#settings-10). <!--OKTA-452668-->

#### Custom domains with Okta-managed certificates is GA in Production

When you customize an Okta URL domain, your Okta-hosted pages are branded with your own URL. [Okta-managed certificates](/docs/guides/custom-url-domain/main/#configure-a-custom-domain-through-okta-managed-certificates) automatically renew through a Let's Encrypt integration, a free certificate authority. Okta-managed certificate renewals lower customer developer maintenance costs and reduce the high risk of a site outage when certificates expire. <!--OKTA-437290-->

#### New permissions for custom admin roles

The Administrator Roles API includes new app [permissions](/docs/reference/api/roles/#permission-properties) for custom admin roles to run end-to-end imports. See [About role permissions](https://help.okta.com/okta_help.htm?id=csh-cstm-admin-role-app-permissions).<!--OKTA-433371-->
