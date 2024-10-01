---
title: Okta API Products release notes 2022
---

## December

### Weekly release 2022.12.2

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.12.2](#bugs-fixed-in-2022-12-2)                         |December 21, 2022            |

#### Bugs fixed in 2022.12.2

* Attempts to save sign-in page edits sometimes failed when using the full-feature code editor. (OKTA-551632)

* If an admin added a redirect URI that reached the character limit, then they couldn't edit the redirect URI list using the Apps API.  (OKTA-476668)

### Weekly release 2022.12.1

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bug fixed in 2022.12.1](#bug-fixed-in-2022-12-1)                         |December 14, 2022            |

#### Bug fixed in 2022.12.1

A List Users API call made with a search parameter didn’t return deactivated users with a `login` property that started with the Okta User `id`. (OKTA-537805)

### Monthly release 2022.12.0

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Password history policy enforced in strict mode is GA in Preview](#password-history-policy-enforced-in-strict-mode-is-ga-in-preview)                       | December 9, 2022         |
| [PBKDF2 Hashing Algorithm support is GA in Preview](#pbkdf2-hashing-algorithm-support-is-ga-in-preview)                       | December 9, 2022         |
| [Preview the token inline hook](#preview-the-token-inline-hook)                       | December 9, 2022         |
| [Revoke user sessions is GA in Preview](#revoke-user-sessions-is-ga-in-preview)                       | December 9, 2022         |
| [Step-up authentication using ACR values is GA in Prod](#step-up-authentication-using-acr-values-is-ga-in-prod)                       | August 31, 2022         |
| [Redirect added to end of sign-in flow](#redirect-added-to-end-of-sign-in-flow)                       | December 9, 2022         |
| [Loading Page Animation feature for the Brands API is GA in Production](#loading-page-animation-feature-for-the-brands-api-is-ga-in-production)                       | July 7, 2022         |
| [Rate limit parameter matching](#rate-limit-parameter-matching)                       | December 9, 2022         |
| [Bugs fixed in 2022.12.0](#bugs-fixed-in-2022-12-0)                       | December 9, 2022         |

#### Password history policy enforced in strict mode is GA in Preview

When an admin [updates passwords](/docs/reference/api/users/#update-user) and sets the `strict` parameter to `true`, the [password history policy](/docs/reference/api/policy/#age-object) is now enforced.<!-- OKTA-548415-->

#### PBKDF2 Hashing Algorithm support is GA in Preview

Okta allows user passwords imported from a database to be imported as hashed passwords. In addition to the currently supported hashing algorithm formats, Okta now supports Password-Based Key Derivation Function 2 (PBKDF2). This hashing algorithm is used to reduce the vulnerabilities of brute-force attacks. <!-- OKTA-552532-->

#### Preview the token inline hook

Before implementing a token inline hook, you can now preview the hook request and the external-service response in the Admin Console. This feature aids in the development and testing of inline hooks before releasing to a production environment. In the Admin Console, click **Preview** from the **Actions** menu or the **Preview** tab for the individual hook to preview the token inline hook call. See [Preview an inline hook](https://help.okta.com/okta_help.htm?type=oie&id=ext-preview-inline-hooks) and [Preview and test the token inline hook](/docs/guides/token-inline-hook/nodejs/main/#preview-and-test-the-token-inline-hook). <!-- OKTA-546727-->

#### Revoke user sessions is GA in Preview

You can end all Okta sessions for a user when resetting their password. All sessions of the specified user are revoked except for the current session. This option protects the user account from unauthorized access. See the `revokeSession` parameter in the [Users API](/docs/reference/api/users/#change-password). <!-- OKTA-542645-->

#### Step-up authentication using ACR values is GA in Prod

Users want seamless access to certain resources, but organizations want to increase the users' level of assurance before they access anything sensitive. It’s difficult to strike a balance between implementing stronger security controls and offering a frictionless experience for your users to easily interact with an application. Okta now supports the `acr_values` parameter, which refers to Authentication Context Class Reference. Each value defines a specific set of assurance level requirements that the protected resource requires from the authentication event associated with the access and ID tokens. See [Step-up authentication](/docs/guides/step-up-authentication/main/). <!-- OKTA-552809-->

#### Redirect added to end of sign-in flow

When an authentication flow begins at an org's Okta or custom domain and then finishes with a callback from an external Identity Provider to a custom or Okta domain, another redirect is now performed to get the browser to the original domain where the flow began. This enables the browser to then send the same device token in the callback that was used in the first request. <!-- OKTA-553160-->

#### Loading Page Animation feature for the Brands API is GA in Production

When redirecting applications, you can use the loading page variant property (`loadingPageTouchPointVariant`) of the [Brands API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Brands/) to display a blank page instead of the default Okta loading page animation. As a result, Okta's branding doesn't appear anywhere in the redirect user journey. <!-- OKTA-552673-->

#### Rate limit parameter matching

The Rate Limit dashboard in the Admin Console now supports parameter matching for API endpoints. This update provides more granular rate limit information for endpoints that include a query of the form `?{parameter}=*`. See [Rate limit dashboard](/docs/reference/rl-dashboard/#apis-table). <!-- OKTA-559269-->

#### Bugs fixed in 2022.12.0

* Okta didn’t route SMS requests to the backup telephony providers through a round-robin distribution when a resend request was made to the Factors Verify endpoint (`/api/v1/users/${userId}/factors/${factorId}/verify`). (OKTA-508973)

* An admin role couldn’t be assigned to a user or group if the role was constrained to a group with group membership rules or to a group with more than 5000 members. (OKTA-546310)

* When a DELETE request to the `/api/v1/authorizationServers/<authServerID>/clients/<clientID>/tokens` endpoint was called for large scale operations, an HTTP 500 Internal Server Error was returned. (OKTA-536037)

* When an admin deleted groups in quick succession using the Groups API, the groups weren't always removed from the Identity Provider that they were associated with. (OKTA-540853)

* When the full-featured code editor was enabled, updates to email customizations, custom error pages, and the sign-in page didn't trigger system log events. (OKTA-553284)

## November

### Weekly release 2022.11.1

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.11.1](#bugs-fixed-in-2022-11-1)                      | November 30, 2022            |

#### Bugs fixed in 2022.11.1

* The wrong response code (500) was sent when an admin attempted to use the app target or group target operations of the Administrator Role API with a custom role binding identifier. (OKTA-529688)

* Inline hook requests configured to use OAuth 2.0 authentication sent expired access tokens in the authorization header. (OKTA-551186)

### Monthly release 2022.11.0

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Step-up authentication using ACR values is GA in Preview](#step-up-authentication-using-acr-values-is-ga-in-preview) | August 31, 2022 |
| [Authenticator enrollment using the /authorize endpoint is EA in Preview](#authenticator-enrollment-using-the-authorize-endpoint-is-ea-in-preview) | November 3, 2022 |
| [Loading page animation feature for the Brands API is in GA](#loading-page-animation-feature-for-the-brands-api-is-in-ga) | October 5, 2022 |
| [API service integrations is Self-Service EA in Preview](#api-service-integrations-is-self-service-ea-in-preview) | November 3, 2022 |
| [New rate limits dashboard filter](#new-rate-limits-dashboard-filter) | November 3, 2022 |
| [Improved ThreatInsight coverage](#improved-threatinsight-coverage) | November 3, 2022 |
| [Developer documentation updates in 2022.11.0](#developer-documentation-updates-in-2022-11-0) | November 3, 2022 |
| [Bugs fixed in 2022.11.0](#bugs-fixed-in-2022-11-0) | November 3, 2022|

#### Step-up authentication using ACR values is GA in Preview

Users want seamless access to certain resources, but organizations want to increase the users' level of assurance before they access anything sensitive. It’s difficult to strike a balance between implementing stronger security controls and offering a frictionless experience for your users to easily interact with an application. Okta now supports the `acr_values` parameter, which refers to Authentication Context Class Reference. Each value defines a specific set of assurance level requirements that the protected resource requires from the authentication event associated with the access and ID tokens. See [Step-up authentication using ACR values](/docs/guides/step-up-authentication/main/). <!--OKTA-544153-->

#### Authenticator enrollment using the /authorize endpoint is EA in Preview

Authenticator enrollment provides a standardized way for a user to enroll a new authenticator using the OAuth `/authorize` endpoint. This feature uses query parameters such as `prompt` and `enroll_amr_values` to specify which authenticator the user wants to enroll. It also automatically verifies at least two factors as long the user has already enrolled two or more factors. <!--OKTA-544671-->

#### Loading page animation feature for the Brands API is in GA

When redirecting applications, you can use the [loading page variant property](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Brands/) (`loadingPageTouchPointVariant`) of the Brands API to display a blank page instead of the default Okta loading page animation. As a result, Okta's branding doesn't appear anywhere in the redirect user journey. <!--OKTA-544951-->

#### API service integrations is Self-Service EA in Preview

A service-to-service app where a backend service or a daemon calls Okta management APIs for a tenant (Okta org) can be published in the Okta Integration Network (OIN) as an API service integration. This integration type allows your service app to access your customer Okta org through Okta management APIs using the OAuth 2.0 Client Credentials flow. API service integrations provide secure, reliable, and least-privilege scoped access to Okta APIs without being associated with a user, so service isn’t disrupted when the user is no longer involved with service integration activities. See [API service integrations in the OIN](/docs/guides/oin-api-service-overview/). OIN Manager has been updated to support testing and submitting API service integrations. After your service integration is published in the OIN, workforce customers can discover and configure your integration with ease. See [Build an API service integration](/docs/guides/build-api-integration/). <!--OKTA-532102-->

#### New rate limits dashboard filter

You can now filter the APIs listed on the rate limits dashboard by their rate limit multiplier eligibility status. See [Rate limit monitoring](/docs/reference/rl-dashboard). <!--OKTA-524847-->

#### Improved ThreatInsight coverage

ThreatInsight has increased coverage for enabled orgs. More malicious requests are now flagged for orgs with ThreatInsight configured. <!--OKTA-536921-->

#### Developer documentation updates in 2022.11.0

* We’ve got a [new API reference in the works](https://developer.okta.com/docs/api/). With a fresh look and feel, our new API content will be easier to navigate and features a wider variety of code examples. Content is continuously being added &mdash; please try it out and help us improve the site by providing feedback.

* A new set of guides to support the creation of a password-optional or passwordless sign-in experience for your apps is now online. [Find them all here](/docs/guides/pwd-optional-overview/aspnet/main/).

#### Bugs fixed in 2022.11.0

* Requests to the `/api/v1/brands/*/templates/email/` endpoint returned an HTTP 404 error. (OKTA-545178)

* PATCH requests to the `/iam/resource-sets/${resourceSetIdOrLabel}/resources` endpoint with duplicate resources returned duplicate resources. (OKTA-476449)

* A long text string was displayed outside of the General Settings page in OIN Manager. (OKTA-532898)

* The **Enter your Post Logout Redirect URI** field for OIDC settings in OIN Manager didn’t accept all valid URLs. (OKTA-532900)

## October

### Weekly release 2022.10.2

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.10.2](#bugs-fixed-in-2022-10-2)                      | October 26, 2022         |

#### Bugs fixed in 2022.10.2

* A `/token` request that used the authorization code flow failed when the **Groups claim type** in the app was set to **Expression** and the group number exceeded 100. (OKTA-518536)

* A `/token` request that used the `refresh_token` grant type failed when the **Groups claim type** in the app was set to either **Expression** or **Filter** and the group number exceeded 100. (OKTA-531605)

* When a user entered their credentials in the widget (version 6.6.1) during self-service registration, their information was cleared if the username didn't exist in the org. (OKTA-532293)

* When a user authenticated using the device authorization flow, the user had to visit the verification URI twice when Agentless Desktop Single Sign-on (DSSO) was configured. (OKTA-501601)

### Monthly release 2022.10.0

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Additional measures for suspicious SMS and Voice requests](#additional-measures-for-suspicious-sms-and-voice-requests) | October 5, 2022 |
| [Dynamic IdP routing is GA in Production](#dynamic-idp-routing-is-ga-in-production) | June 8, 2022 |
| [Improved ThreatInsight coverage](#improved-threatinsight-coverage) | October 5, 2022 |
| [Improved User API sort](#improved-user-api-sort) | October 5, 2022 |
| [Non-deletable default authorization server is GA in Production](#non-deletable-default-authorization-server-is-ga-in-production) | August 31, 2022 |
| [OAuth 2.0 authentication for inline hooks is Self-Service EA in Preview](#oauth-2-0-authentication-for-inline-hooks-is-self-service-ea-in-preview) | October 5, 2022 |
| [Developer documentation updates in 2022.10.0](#developer-documentation-updates-in-2022-10-0) | October 5, 2022 |
| [Bugs fixed in 2022.010.0](#bugs-fixed-in-2022-10-0) | October 5, 2022|

#### Additional measures for suspicious SMS and Voice requests

Additional measures are now applied to block suspicious SMS and Voice traffic from countries that are typically at risk of toll fraud attacks. Blocked transactions display a deny status in the System Log.
<!--OKTA-532681-->

#### Dynamic IdP routing is GA in Production

Org admins can now consolidate multiple IdP routing rules into a single dynamic routing rule. Dynamic routing rules use expression language to match users to any IdP, based on attributes of their login object. This reduces the volume and complexity of routing rules and the manual effort of managing them. See [Policy Action with Dynamic IdP routing](/docs/reference/api/policy/#policy-action-with-dynamic-idp-routing). <!--OKTA-520972-->

#### Improved ThreatInsight coverage

ThreatInsight has increased coverage for enabled orgs. More malicious requests are now flagged for orgs with ThreatInsight configured. <!--OKTA-531586-->

#### Improved User API sort

The Users API now supports sorting results by the top-level User object properties `status`, `lastUpdated`, and `type.id`. <!--OKTA-513502-->

#### Non-deletable default authorization server is GA in Production

Okta provides a default authorization server so that customers can quickly get started. If a customer deletes the default authorization server, it can't be restored, causing confusion and disruption. This enhancement prevents you from deleting the default authorization server, although you can disable it if it isn't required. To aid in identification, Okta adds a Default label in the Admin Console. <!--OKTA-536276-->

#### OAuth 2.0 authentication for inline hooks is Self-Service EA in Preview

Okta inline hook calls to third-party external web services previously provided only header-based authentication for security. Although sent with SSL, the header or custom header authentication didn’t meet more stringent security requirements for various clients and industries.

To improve the security of inline hooks, Okta now supports authentication with OAuth 2.0 access tokens. Tokens ensure secure calls to external web services.

When creating inline hooks in the Admin Console (or by API), admins and developers can now select OAuth 2.0 authentication and choose between two methods of OAuth 2.0: client secret or private key. A new [Key Management API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/HookKey/#tag/HookKey) and Admin Console page is also available to create public/private key pairs for use with OAuth 2.0 inline hooks. See [Key management](https://help.okta.com/okta_help.htm?type=oie&id=ext-key-management).

Using the OAuth 2.0 framework provides better security than Basic Authentication or custom headers, and is less work than setting up an IP allowlisting solution. Clients also have the ability to use access tokens minted by their own custom authorization servers to guarantee that Okta is calling their client web services and isn't triggered by any external actors. See [Add an inline hook](https://help.okta.com/okta_help.htm?type=oie&id=ext-add-inline-hook). <!--OKTA-537306-->

#### Developer documentation updates in 2022.10.0

* A new [Key Management API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/HookKey/#tag/HookKey) is available under the Core Okta APIs. This reference manages JWKs used with OAuth 2.0 authentication for inline hooks.

* A new [SAML assertion inline hook](/docs/guides/saml-inline-hook/main/) guide is available at **Guides > Hooks**. Use this guide to implement a working example of a SAML assertion inline hook.

* The OIN Manager has a new Get Support section that provides common developer.okta.com guides relating to OIN integrations and the submission process.

#### Bugs fixed in 2022.10.0

* Users were able to make more than five attempts to activate their one-time passcode (OTP) based factors. (OKTA-429940)

* Searching for users with the Users API returned a 503 Service Unavailable error if the call included an empty `sortBy` parameter with the `after` parameter. (OKTA-503711)

* Searching for users with the Users API returned a 503 Service Unavailable error if the call included a `sortBy` parameter with an invalid `after` parameter. (OKTA-504265)

* When an OIN client was set to invisible, the client was still incorrectly returned if a GET request was made using the Dynamic Client Registration API (`/oauth2/v1/clients`). (OKTA-515362)

* When the Factors API verify endpoint (`/users/${userId}/factors/${factorId}/verify`) was called on behalf of a user, an HTTP 403 Forbidden error was returned. (OKTA-523738)

* An error message didn’t appear when a deleted app instance was assigned to a role. (OKTA-531308)

* A `GET /api/v1/groups` request with an invalid search operator returned a 504 Timeout error instead of a 400 Bad Request error with an appropriate message. (OKTA-535035)

## September

### Weekly release 2022.09.3

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.09.3](#bugs-fixed-in-2022-09-3)                      | September 28, 2022            |

#### Bugs fixed in 2022.09.3

* Existing provisioning settings for an app were reset to `None` when an app was updated using `PUT /apps/${applicationId}`. (OKTA-520647)

* Read-only admins weren’t able to see the signing keys that were used for SAML applications. (OKTA-522887)

* When an access token was used to create an email template customization, the POST request failed. (OKTA-526881)

### Weekly release 2022.09.2

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.09.2](#bugs-fixed-in-2022-09-2)                      | September 21, 2022            |

#### Bugs fixed in 2022.09.2

* A descriptive error message wasn't returned when OAuth management endpoints were used with non-OAuth clients. (OKTA-458109)

* A misleading error message appeared when the Interaction Code grant type was enabled in an org that used the embedded Sign-In Widget. (OKTA-493935)

* A two-minute clock skew was allowed during access and ID token validation. (OKTA-528530)

### Weekly release 2022.09.1

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.09.1](#bugs-fixed-in-2022-09-1)                      | September 14, 2022            |

#### Bugs fixed in 2022.09.1

* The Subscription Role API didn’t support the API Access Management role. (OKTA-431895)
* The origin header validation on the `/token` endpoint for cross-origin requests was case-sensitive, which returned an error for redirect URIs using uppercase. (OKTA-516740)

### Monthly release 2022.09.0

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Non-deletable default authorization server is EA in Preview](#non-deletable-default-authorization-server-is-ea-in-preview) | August 31, 2022 |
| [PKCE validation for OIDC app integrations is GA in Production](#pkce-validation-for-oidc-app-integrations-is-ga-in-production) | July 7, 2022 |
| [Signed request support for generic SAML IdP is GA in Production](#signed-request-support-for-generic-saml-idp-is-ga-in-production) | July 7, 2022 |
| [Step-up authentication using ACR values is EA in Preview](#step-up-authentication-using-acr-values-is-ea-in-preview) | August 31, |
| [API for suppressing email notifications is GA](#api-for-suppressing-email-notifications-is-in-general-availability) | May 11, 2022 |
| [Access Denied error message customization is GA in Preview](#access-denied-error-message-customization-is-ga-in-preview) | August 31, 2022 |
| [Dynamic IdP routing is GA in Preview](#dynamic-idp-routing-is-ga-in-preview) | June 8, 2022 |
| [The update logo for application operation is updated](#the-update-logo-for-application-operation-is-updated) | August 31, 2022 |
| [Password restriction for shared SWA app accounts is GA in Production](#password-restriction-for-shared-swa-app-accounts-is-ga-in-production) | July 7, 2022 |
| [Developer documentation updates in 2022.09.0](#developer-documentation-updates-in-2022-09-0) | August 31, 2022 |
| [Bugs fixed in 2022.09.0](#bugs-fixed-in-2022-09-0) | August 31, 2022|

#### Non-deletable default authorization server is EA in Preview

The default authorization server is a custom authorization server provided by Okta so that customers can quickly get started working with Okta. However, if a customer deletes the default authorization server, it can't be restored, causing confusion and disruption. This enhancement prevents you from deleting the default authorization server, although you can disable it if it isn't required. To aid in identification, Okta adds a Default label for the default authorization server in the Admin Console.<!--OKTA-521652--><!--OKTA-525780-->

#### PKCE validation for OIDC app integrations is GA in Production

You can now require Proof Key for Code Exchange (PKCE) as an additional verification for any OpenID Connect app integration except service apps. This more closely aligns with the OAuth Security Best Current Practice recommendation to use PKCE with the authorization code flow regardless of the client type. Use the `pkce_required` [property](/docs/reference/api/apps/#oauth-credential-object) with the Apps API to require PKCE for your app.<!--OKTA-523773-->

#### Signed request support for generic SAML IdP is GA in Production

Using signed SAML requests ensures that incoming requests are from genuine applications. When this is configured, Okta only accepts SAML requests signed using the certificate associated with the app integration. Having signed SAML requests also resolves scenarios where the Assertion Consumer Service (ACS) URL requested after authentication can be one of several domains or URLs. When a Service Provider sends a signed authentication request, Okta can accept dynamic ACS values as part of the SAML request and posts the SAML assertion response to the ACS value specified in the request. See the Advanced Settings section of [Create SAML app integrations using AIW](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-aiw-saml).<!--OKTA-525803-->

#### Step-up authentication using ACR values is EA in Preview

Users want seamless access to certain resources, but organizations want to increase the users' level of assurance before they access anything sensitive. It’s difficult to strike a balance between implementing stronger security controls and offering a frictionless experience for your users to easily interact with an application. Okta now supports the `acr_values` parameter, which refers to Authentication Context Class Reference. Each value defines a specific set of assurance level requirements that the protected resource requires from the authentication event associated with the access and ID tokens. See [Step-up authentication using ACR values](/docs/guides/step-up-authentication/main/).<!--OKTA-525790-->

#### API for suppressing email notifications is in General Availability

This API allows you to change who receives email notifications for each individual email template. You can suppress them completely or send them to admins only. This unlocks testing scenarios that warrant using production user directories and prevents end users from getting test emails. It also allows extensibility for customers who would like to use a third party email sender through Hooks or Workflows. See [Email template settings](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/CustomTemplates/).<!--OKTA-526580-->

#### Access Denied error message customization is GA in Preview

Admins can now customize the error message that users receive when their access is denied. This allows admins to provide remediation steps and/or point users to documentation that helps resolve their access issues.<!--OKTA-512724-->

#### Dynamic IdP routing is GA in Preview

Org admins can now consolidate multiple IdP routing rules into a single dynamic routing rule. Dynamic routing rules use expression language to match users to any IdP, based on attributes of their login object. This reduces the volume and complexity of routing rules and the manual effort of managing them. See [Policy Action with Dynamic IdP routing](/docs/reference/api/policy/#policy-action-with-dynamic-idp-routing).<!--OKTA-520971-->

#### The update logo for application operation is updated

The [update logo for application](/docs/reference/api/apps/#application-logo-operations) API operation has been updated to support logo images in SVG format. In addition, the updated logo guidelines require a square image dimension of 200px by 200px to avoid distortion.<!--OKTA-511103-->

#### Password restriction for shared SWA app accounts is GA in Production

For SWA apps with an account sign-in option set to **Users share a single username and password set by administrator**, only super admins or app admins with permissions for that app can view the password.<!--OKTA-513421-->

#### Developer documentation updates in 2022.09.0

* `developer.okta.com` has a new main navigation menu, which makes navigating around the content easier and more intuitive. Instead of showing the entire sitemap in the menu at all times, each major area is now accessed through a submenu that shows only the relevant menu sections at one time. In addition, clicking each menu node shows a contextual landing page (either a defined custom page or an auto-generated one if none exists), and you can now toggle the menu between hidden and visible states, if desired.

* Updates to the [Customize the Okta-hosted error pages](/docs/guides/custom-error-pages/main/#edit-the-error-page) and [Customize email notifications](/docs/guides/custom-email/main/#edit-a-default-email-template) guides describe the new full-featured code editor. The editor integrates the Monaco code editing library into the Admin Console to make editing code for error pages and email notifications more efficient. Developers can write, test, and publish code faster.

#### Bugs fixed in 2022.09.0

* The `sub` claim value in on-behalf token exchange flows used the customized authorization server claim value when the token exchange feature was enabled. (OKTA-517125)

* The Apps API returned only the first error from the VPN settings (`settings.notifiations.vpn`) of an add app request. (OKTA-517563)

## August

### Weekly release 2022.08.3

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.08.3](#bugs-fixed-in-2022-08-3)                      | August 24, 2022            |

#### Bugs fixed in 2022.08.3

* The Apps API returned two validation errors rather than one when the value for the `url` parameter wasn't a URL. (OKTA-521199)

* Imported passwords with a malformed bcrypt hash format caused an error during the password reset flow. (OKTA-502227)

* Sometimes when an admin deleted an Identity Provider and a Group concurrently, the Identity Provider wasn't deleted. (OKTA-511062)

* Despite having insufficient permissions, a Report Admin was able to use the Mappings API to edit the UD mappings for an Identity Provider configured in Okta. (OKTA-499602)

### Weekly release 2022.08.1

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.08.1](#bugs-fixed-in-2022-08-1)                      | August 10, 2022            |

#### Bugs fixed in 2022.08.1

* When client assertions for `private_key_jwt` client authentication method operations contained the `aud` claim in an array instead of a string, an error was returned. (OKTA-478067)

* When an app initiated the Service Provider flow and the SAML authorization request didn't contain the SAML Subject (`nameId`), a 500 HTTP error was returned. (OKTA-511120)

### Monthly release 2022.08.0

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [PKCE validation for OIDC app integrations is GA in Preview](#pkce-validation-for-oidc-app-integrations-is-ga-in-preview) | July 7, 2022|
| [Configurable API token rate limits is GA in Production](#configurable-api-token-rate-limits-is-ga-in-production) | July 7, 2022|
| [Rate Limits dashboard includes API Token data](#rate-limits-dashboard-includes-api-token-data) | August 3, 2022|
| [System Log updates for telephony operations](#system-log-updates-for-telephony-operations) | August 3, 2022|
| [Trusted Origins for iFrame embedding is GA in Production](#trusted-origins-for-iframe-embedding-is-ga-in-production) | May 4, 2022|
| [Support for Okta Resource Name is GA in Production](#support-for-okta-resource-name-is-ga-in-production) | July 7, 2022|
| [Bugs fixed in 2022.08.0](#bugs-fixed-in-2022-08-0) | August 3, 2022|

#### PKCE validation for OIDC app integrations is GA in Preview

You can now require Proof Key for Code Exchange (PKCE) as an additional verification for any OpenID Connect app integration except service apps. This more closely aligns with the OAuth Security Best Current Practice recommendation to use PKCE with the authorization code flow regardless of the client type. Use the `pkce_required` [property](/docs/reference/api/apps/#oauth-credential-object) with the Apps API to require PKCE for your app. <!-- OKTA-518333 -->

#### Configurable API token rate limits is GA in Production

Admins can now configure a percentage rate limit capacity for individual API tokens. Previously, when a token rate limit violation occurred, it wasn’t clear which token consumed the limit. Setting a maximum capacity for each token solves this problem and gives admins a new tool to investigate rate limit violations and plan for future deployments. See [API token management](https://help.okta.com/okta_help.htm?id=csh-api). <!-- OKTA-517890 -->

#### Rate Limits dashboard includes API Token data

The Rate Limits dashboard now includes API Token data on the Rate limit usage over time graph. You can select to view bar graph data from API tokens or by IP address to review any spike in traffic. See [bar graph](/docs/reference/rl-dashboard/#bar-graph) and [API rate limits by token](/docs/reference/rate-limits/#api-rate-limits-by-token). <!-- OKTA-498252 -->

#### System Log updates for telephony operations

The `system.operation.rate_limit.violation` event is no longer triggered when SMS or Voice messages are blocked due to telephony operational rate limit violations. Instead, telephony `system.sms.send.*` and `system.voice.send.*` events are issued as a `DENY` System Log message. <!-- OKTA-517838 -->

#### Trusted Origins for iFrame embedding is GA in Production

You can now choose which origins can embed Okta sign-in pages and the Okta End-User Dashboard using Trusted Origins for iFrame embedding. This feature offers a granular control over iFrame embedding compared to the existing embedding option in Customization, which doesn't let you distinguish between secure and non-secure origins. Trusted Origins (**Security** > **API**) allows you to selectively configure the origins that you trust. It also provides enhanced security as it uses a more secure `frame-ancestors` directive in Content Security Policy that protects your data from web attacks such as clickjacking. You can also migrate your existing iFrames to Trusted Origins. See [Trusted Origins API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/TrustedOrigin/). <!-- OKTA-514609 -->

#### Support for Okta Resource Name is GA in Production

The [Okta Resource Name](/docs/concepts/role-assignment/#okta-resource-name-orn) (ORN) uniquely identifies an Okta [resource set](/docs/reference/api/roles/#resource-set-object) that is associated with a custom admin role assignment. <!-- OKTA-511699 -->

#### Bugs fixed in 2022.08.0

* When a client used the `private_key_jwt` client authentication method, the `max_age` and `login_hint` parameters in the authorize request were sometimes ignored. (OKTA-501110, OKTA-501104)
* When a client used either the `private_key_jwt` or `client_secret_jwt` client authentication methods, an error occurred if the `client_id` was included in the body of the token request. (OKTA-478059)
* When the Disable Security Question for Recovery feature was enabled and an admin used the Users API to create a user with a pre-assigned password, the magic link sent in the activation email didn't expire after the first use. (OKTA-502692)

## July

### Weekly release 2022.07.2

| Change | Expected in Preview Orgs |
|----------------------------|--------------------------|
| [Bugs fixed in 2022.07.2](#bugs-fixed-in-2022-07-2) | July 27, 2022 |

#### Bugs fixed in 2022.07.2

* Operations that assigned custom roles to a user or group and included a nonexistent resource returned an HTTP 500 Internal Server Error. (OKTA-472638)
* When the “Verify a WebAuthn Factor challenge” (`/users/${userId}/factors/${factorId}/verify`) endpoint was called, the wrong WebAuthn factor enrollment profile information was returned if multiple factors were registered. (OKTA-482701)
* When the change password (`/users/{$userId}/credentials/change_password`) endpoint was called, the error message that appeared wasn't translated into the selected language. (OKTA-507667)

### Weekly release 2022.07.1

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Dynamic issuer mode for Identity Providers](#dynamic-issuer-mode-for-identity-providers)                    | July 13, 2022            |
| [Bug fixed in 2022.07.1](#bug-fixed-in-2022-07-1)                        | July 13, 2022            |

#### Dynamic issuer mode for Identity Providers

You can configure the dynamic issuer mode for an Identity Provider using the Identity Provider API. When you set the`issuerMode` parameter to `DYNAMIC`, Okta uses the domain from the Authorize URL as the domain for the redirect URI when returning the authentication response. <!--OKTA-506807-->

#### Bug fixed in 2022.07.1

When the `/api/v1/users/${userId}/roles` or
`/api/v1/groups/${groupId}/roles` endpoints were called to assign a custom role and resource set to a user or group, and those assignments already existed, the calls didn’t receive an HTTP 409 Conflict error. (OKTA-507683)

### Monthly release 2022.07.0

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Configurable API token rate limits is GA in Preview](#configurable-api-token-rate-limits-is-ga-in-preview) | July 7, 2022|
| [Deprecated MyAccount API endpoints now have limited availability](#deprecated-myaccount-api-endpoints-now-have-limited-availability) | July 7, 2022|
| [Loading Page Animation feature for the Brands API is EA in Preview](#loading-page-animation-feature-for-the-brands-api-is-ea-in-preview) | July 7, 2022|
| [PKCE validation for OIDC app integrations is Self-Service EA in Preview](#pkce-validation-for-oidc-app-integrations-is-self-service-ea-in-preview) | July 7, 2022|
| [Reset Factors endpoint includes new optional request parameter](#reset-factors-endpoint-includes-new-optional-request-parameter) | July 7, 2022|
| [Signed request support for generic SAML IdP is GA in Preview](#signed-request-support-for-generic-saml-idp-is-ga-in-production) | July 7, 2022 |
| [Support for Okta Resource Name is GA in Preview](#support-for-okta-resource-name-is-ga-in-preview) | July 7, 2022|
| [The Loading Page API is EA in Preview](#the-loading-page-api-is-ea-in-preview) | July 7, 2022|
| [Trusted Origins for iFrame embedding is GA in Preview](#trusted-origins-for-iframe-embedding-is-ga-in-preview) | May 4, 2022|
| [Developer documentation updates in 2022.07.0](#developer-documentation-updates-in-2022-07-0) | July 7, 2022 |
| [Bugs fixed in 2022.07.0](#bugs-fixed-in-2022-07-0) | July 7, 2022 |

#### Configurable API token rate limits is GA in Preview

Admins can now configure a percentage rate limit capacity for individual API tokens. Previously, when a token rate limit violation occurred, it wasn’t clear which token consumed the limit. Setting a maximum capacity for each token solves this problem and gives admins a new tool to investigate rate limit violations and plan for future deployments. See [API token management](https://help.okta.com/okta_help.htm?id=csh-api). <!-- OKTA-506379 -->

#### Deprecated MyAccount API endpoints now have limited availability

The existing MyAccount API (`api/v1/myaccount`) endpoints are now only accessible to orgs that had that feature enabled for their orgs prior to June 2022. From June 2022 forward, use the new IdP MyAccount API (`/idp/myaccount`) endpoints instead. <!-- OKTA-509664 -->

#### Loading Page Animation feature for the Brands API is EA in Preview

When redirecting applications, you can use the [loading page variant property](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Brands/) (`loadingPageTouchPointVariant`) of the Brands API to display a blank page instead of the default Okta loading page animation. As a result, Okta's branding doesn't appear anywhere in the redirect user journey. <!-- OKTA-509771 -->

#### PKCE validation for OIDC app integrations is Self-Service EA in Preview

You can now require Proof Key for Code Exchange (PKCE) as an additional verification for any OpenID Connect app integration except service apps. This more closely aligns with the OAuth Security Best Current Practice recommendation to use PKCE with the authorization code flow regardless of the client type. Use the `pkce_required` [property](/docs/reference/api/apps/#oauth-credential-object) with the Apps API to require PKCE for your app. <!-- OKTA-506682 -->

#### Reset Factors endpoint includes new optional request parameter

The `/reset_factors` endpoint has a new optional request parameter for the Reset Factor lifecycle operation. You can now remove the phone factor (for example: SMS/Voice) as both a recovery method and a factor with one call by setting the `removeRecoveryEnrollment` parameter to `true` when making a POST request to the `/reset_factors` endpoint (`/users/${userId}/lifecycle/reset_factors`).

Additionally, this change brings the `/reset_factors` endpoint to parity with how individual factors are reset using the `/users/${userId}/factors/${factorId}` endpoint. For example, when the Email Factor is reset, the email is auto-enrolled if email is configured as a required Factor in the enrollment policy. <!-- OKTA-500168 -->

#### Signed request support for generic SAML IdP is GA in Preview

Using signed SAML requests ensures that incoming requests are from genuine applications. When this is configured, Okta only accepts SAML requests signed using the certificate associated with the app integration. Having signed SAML requests also resolves scenarios where the Assertion Consumer Service (ACS) URL requested after authentication can be one of several domains or URLs. When a Service Provider sends a signed authentication request, Okta can accept dynamic ACS values as part of the SAML request and posts the SAML assertion response to the ACS value specified in the request. See the Advanced Settings section of [Create SAML app integrations using AIW](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-aiw-saml). <!-- OKTA-508480 -->

#### Support for Okta Resource Name is GA in Preview

The [Okta Resource Name](/docs/concepts/role-assignment/#okta-resource-name-orn) (ORN) uniquely identifies an Okta [resource set](/docs/reference/api/roles/#resource-set-object) that is associated with a custom admin role assignment. <!-- OKTA-503417 -->

#### Trusted Origins for iFrame embedding is GA in Preview

You can now choose which origins can embed Okta sign-in pages and the Okta End-User Dashboard using Trusted Origins for iFrame embedding. This feature offers a granular control over iFrame embedding compared to the existing embedding option in Customization, which doesn't let you distinguish between secure and non-secure origins. Trusted Origins (**Security** > **API**) allows you to selectively configure the origins that you trust. It also provides enhanced security as it uses a more secure `frame-ancestors` directive in Content Security Policy that protects your data from web attacks such as clickjacking. You can also migrate your existing iFrames to Trusted Origins. See [Trusted Origins API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/TrustedOrigin/). <!-- OKTA-510180 -->

#### Developer documentation updates in 2022.07.0

* A new [Custom Password Recovery guide](/docs/guides/oie-embedded-sdk-use-case-custom-pwd-recovery-mfa/java/main/) is now available for those wanting to link Email Magic Links directly to their applications with the Java IDX SDK.

* A new [User query options guide](/docs/reference/user-query/) is now available, with best practices for retrieving users from your org by using the `search` instead of `filter` or `q` query parameters in the Users API.

* New guides are now available for integrating [Google Authenticator](/docs/guides/authenticators-google-authenticator/java/main/), [Okta Email](/docs/guides/authenticators-okta-email/java/main/), and [WebAuthn authenticators](/docs/guides/authenticators-web-authn/java/main/) into an application with the Java IDX SDK.

* The [Customize email notifications guide](/docs/guides/custom-email/main/) now includes a list of allowed HTML tags and elements.

#### Bugs fixed in 2022.07.0

* A `Number` type schema property could erroneously be made unique. This resulted in inconsistent behavior and is no longer supported. Use `Integer` or `String` properties instead. (OKTA-506002)

* Sometimes an error occurred when an admin attempted to edit a resource set that included a deleted app. (OKTA-510483)

* When an app user property was set to `NON-SENSITIVE`, sometimes it was still mapped from a sensitive property.(OKTA-508820)

* When the Enroll Okta Call Factor lifecycle operation (`/users/{userId}/factors`) was executed, an internal server error sometimes occurred. (OKTA-482674)

* When the Groups API was called using an older prefix as the `groupID`, an invalid cursor error was returned.  (OKTA-501397)

## June

### Weekly release 2022.06.3

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bug fixed in 2022.06.3](#bug-fixed-in-2022-06-3)                      | June 29, 2022            |

#### Bug fixed in 2022.06.3

There was no limit on the number of factor sequences that could be added in a chain through a Policy API update. (OKTA-499259)

### Weekly release 2022.06.2

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.06.2](#bugs-fixed-in-2022-06-2)                      | June 23, 2022            |

<!-- #### Reset Factors endpoint includes a new optional request parameter

The `/reset_factors` endpoint has a new optional request parameter for the [Reset Factor lifecycle operation](/docs/reference/api/users/#reset-factors). You can now remove the phone factor (for example: SMS/Voice) as both a recovery method and a factor by setting the `removeRecoveryEnrollment` parameter to true when making a POST request to the `/reset_factors` endpoint (`/users/${userId}/lifecycle/reset_factors`). <!--OKTA-500168  REMOVED as per Katherine Chan - feature disabled with kill switch June 30, 2022-->

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
| [Group limit removed for Authorization Code grant type flows](#group-limit-removed-for-authorization-code-grant-type-flows) | June 8, 2022|
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

Okta admins can now control the bounced email address list through the [Email Address Bounces API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/EmailCustomization/#tag/EmailCustomization/operation/bulkRemoveEmailAddressBounces). When Okta-sent email addresses are blocked from an email service (the bounced email list), admins can use this API to create a list of blocked email addresses to be removed from the email service. Note: This API is not available in Free Trial and Developer orgs. <!-- OKTA-482000 -->

#### Generic OIDC IdP nonce validation enforced

For generic OIDC IdPs, Okta fails the authentication if the returned ID token doesn’t contain the `nonce` that was sent with the initial authorize request. <!-- OKTA-486805 -->

#### Group limit removed for Authorization Code grant type flows

The 100-group limit for the `/token` endpoint is removed for the Authorization Code and Authorization Code with PKCE grant type flows when the Groups Claim Type is **Filter**. <!-- OKTA-497701 -->

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

See the [System Log API](/docs/reference/ahttps://developer.okta.com/docs/api/openapi/okta-management/management/tag/SystemLog/#tag/SystemLogpi/system-log/). <!-- OKTA-498664 -->

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

The `/factors` endpoint has a new optional request parameter for the [Reset Factor](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/UserFactor/#tag/UserFactor/operation/unenrollFactor!in=query&path=removeRecoveryEnrollment&t=request) lifecycle operation. You can now remove the phone factor (for example: SMS/Voice) as both a recovery method and a factor with one call by setting the `removeRecoveryEnrollment` parameter to `true` when making a DELETE request to the `/factors` endpoint (`/users/${userId}/factors/${factorId}`). <!--OKTA-489015-->

#### Bugs fixed in 2022.05.3

* If the new `/idp` version of the [MyAccount API](https://developer.okta.com/docs/api/openapi/okta-myaccount/myaccount/tag/Profile/) wasn't enabled, [Add My Phone](https://developer.okta.com/docs/api/openapi/okta-myaccount/myaccount/tag/Phone/#tag/Phone/operation/createPhone) or [Challenge My Phone](https://developer.okta.com/docs/api/openapi/okta-myaccount/myaccount/tag/Phone/#tag/Phone/operation/sendPhoneChallenge) operations performed on the `/idp/myaccount/` endpoint returned inconsistent exception errors. (OKTA-494004)

* Post calls to the Org API endpoint that creates an email bounces remove list (`/org/email/bounces/remove-list`) sometimes returned an HTTP 500 Internal Server Error. (OKTA-497859)

* Using the [API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AuthorizationServerClaims/) to create a claim with a reserved name resulted in an unclear error message. (OKTA-477575)

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

This API allows you to change who receives email notifications for each individual email template. You can suppress them completely, or send them to admins only. This unlocks testing scenarios that warrant using production user directories, and prevents end users from getting test emails. It also allows extensibility for customers who would like to use a third party email sender through Hooks or Workflows. See [Email template settings](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/CustomTemplates/).

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

You can now choose what origins can embed Okta sign-in pages and Okta End-User Dashboard using Trusted Origins for iFrame embedding. This feature offers a granular control over iFrame embedding compared to the existing embedding option in Customization, which doesn't let you distinguish between secure and non-secure origins. Trusted Origins allow you to selectively configure the origins you trust. It also provides enhanced security as it uses a more secure `frame-ancestors` directive in Content Security Policy that protects your data from web attacks such as clickjacking. See [Trusted Origins API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/TrustedOrigin/). <!-- OKTA-494132 -->

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

* The `ssh_certificate_type` parameter was incorrectly set as required in the [Projects](https://developer.okta.com/docs/api/openapi/asa/asa/tag/projects/#tag/projects/operation/CreateProject) endpoint from the Advanced Server Access (ASA) Projects API. (OKTA-489376)

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

Email magic links are enhanced to allow end users to authenticate in two different contexts. They can authenticate using the same location where they click the link and quickly return to the application context. Or, if the end user clicks the link in a different browser, they can enter a one-time passcode to proceed with authentication. See [Sign in with password and email factors](/docs/guides/oie-embedded-sdk-use-case-sign-in-pwd-email/) and [Use redirect auth with the Identity Engine sample apps](/docs/guides/sampleapp-oie-redirectauth/).

#### Splunk available for Log Streaming is EA in Preview

Many organizations use third-party systems to monitor, aggregate, and act on the event data in Okta System Log events.

Log Streaming enables Okta admins to more easily and securely send System Log events to a specified system such as the Splunk Cloud in near real time with simple, pre-built connectors. Log streaming scales well even with high event volume, and unlike many existing System Log event collectors, it does not require a third-party system to store an Okta Admin API token. See [Splunk Cloud in the Log Streaming API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/LogStream/#tag/LogStream/operation/createLogStream!path=1/settings&t=request).

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

The `auth_time` [claim](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#reserved-claims-in-the-payload-section) wasn't defined as a reserved system claim. (OKTA-478924)

### Weekly release 2022.03.2

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.03.2](#bugs-fixed-in-2022-03-2) | March 16, 2022 |

#### Bugs fixed in 2022.03.2

* An error was incorrectly returned when a valid [update request](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AuthorizationServerScopes/#tag/AuthorizationServerScopes/operation/replaceOAuth2Scope) was made for the `device_sso` or `online_access` system scopes. (OKTA-417477)

* The `servers` parameter was incorrectly set as required in the [Preauthorization](https://developer.okta.com/docs/api/openapi/asa/asa/tag/projects/#tag/projects/operation/CreatePreauthorization) endpoint from the Advanced Server Access (ASA) Projects API. (OKTA-478566)

### Weekly release 2022.03.1

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bug fixed in 2022.03.1](#bug-fixed-in-2022-03-1) | March 09, 2022 |

#### Bug fixed in 2022.03.1

When the [List email templates](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/CustomTemplates/#tag/CustomTemplates/operation/listEmailTemplates) or the [List email customizations](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/CustomTemplates/#tag/CustomTemplates/operation/listEmailCustomizations) operations were performed on the `/brands/` endpoint, the base address in the link response header contained the `-admin` string instead of the requested base address. (OKTA-465356)

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

The user-authenticated epoch timestamp is provided as the `auth_time` [claim in the access token](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#reserved-claims-in-the-payload-section).

#### Custom Administrator Roles is GA in Production

The Okta [Custom Administrator Roles](/docs/reference/api/roles/) API provides operations that you can use to create customized roles and assign them to a user or a group.

#### Email Address Bounces API is EA in Preview

Okta admins can now control the bounced email address list through the [Email Address Bounces API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/EmailCustomization/#tag/EmailCustomization/operation/bulkRemoveEmailAddressBounces). When Okta-sent email addresses are blocked from an email service (the bounced email list), admins can use this API to create a list of blocked email addresses to be removed from the email service.

#### Enhanced email macros for email template customization

Enhanced Email Macros updates the email templating engine to use Velocity Templating Language (VTL). This feature unlocks new syntax that provides enhanced conditional logic and access to all attributes in the Okta User Profile object. This allows developers and admins more customizations in their user-facing emails. See [Customize email notifications > Use Velocity Templating Language](/docs/guides/custom-email/main/#use-velocity-templating-language) and [Customize an email template](https://help.okta.com/okta_help.htm?id=ext_Settings_Email).

#### Signed request support for generic OIDC IdP is EA in Preview

When customers [integrate Okta with an OpenID Connect-based Identity Provider](/docs/guides/add-an-external-idp/openidconnect/main/#create-an-identity-provider-in-okta), Okta asks the IdP to authenticate the user with request elements that are passed as query parameters in the URL. The new [Signed Request Object](/docs/reference/api/idps/#oidc-algorithms-object) allows customers to send these parameters encoded in a JWT instead, improving security on the authorization request sent to the OpenID Connect provider or authorization server.

#### Multi-optional authenticator enrollment is GA in Preview

When you use the [AuthN APIs](/docs/reference/api/authn/#request-parameters-for-verify-recovery-token), Okta now prompts the user to enroll in optional authenticators during password recovery flows. <!-- OKTA-473103 -->

#### Bugs fixed in 2022.03.0

* The admin app assignment event wasn't triggered for an individual admin role assignment. (OKTA-460521)

* When ThreatInsight evaluated sign-in attempts for unknown users, the threat level was incorrectly displayed as `threatLevel=UNKNOWN` in the System Log. (OKTA-471299)

* The OAuth 2.0 [`/token`](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/tokenCustomAS) and [`/authorize`](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/authorizeCustomAS) endpoints accepted requests that included the `resource` parameter. (OKTA-476549)

## February

### Weekly release 2022.02.2

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Okta Org2Org integration now supports Okta API access using an OAuth 2.0 client](#okta-org2org-integration-now-supports-okta-api-access-using-an-OAuth-2-0-client)                        | February 16, 2022         |
| [Bug fixed in 2022.02.2](#bug-fixed-in-2022-02-2)                        | February 16, 2022         |

#### Okta Org2Org integration now supports Okta API access using an OAuth 2.0 client

The Okta Org2Org integration enables you to push and match both users and groups from one Okta org to another. Previously, this integration only supported token-based access to the Okta API. You can now [configure the Org2Org integration](/docs/guides/secure-oauth-between-orgs/) to access the Okta API as an [OAuth 2.0 client](/docs/reference/api/apps/#token-based-provisioning-connection-profile-properties). This increases security by limiting the scope of access and providing a better mechanism to rotate credentials. <!-- OKTA-468121 -->

#### Bug fixed in 2022.02.2

Resend verification emails for self-service registered users didn't appear in the [System Log](/docs/referhttps://developer.okta.com/docs/api/openapi/okta-management/management/tag/SystemLog/#tag/SystemLogence/api/system-log/). (OKTA-456831)

### Weekly release 2022.02.1

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [API token ID added to System Log event types](#api-token-id-added-to-system-log-event-types)                        | February 9, 2022         |
| [Bug fixed in 2022.02.1](#bug-fixed-in-2022-02-1)                        | February 9, 2022         |

#### API token ID added to System Log event types

API requests that include an API token and return a System Log event now include the API token in the event payload. The token identifier appears in the System Log API `transaction.details.requestApiTokenId` field and in the `Event > System > Transaction > Detail > RequestApiTokenId` node in the Admin Console System Log. <!--OKTA-463678-->

To view an example of this new event detail, [create a user by API](/docs/guides/quickstart/main/#create-a-user-by-api) and view the associated event (`user.lifecycle.create`).

#### Bug fixed in 2022.02.1

The [OAuth token endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/tokenCustomAS!path=0/code_verifier&t=request) didn’t reject requests that included a `code_verifier` parameter if the [authorization call](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/authorizeCustomAS!in=query&path=code_challenge&t=request) was issued without the PKCE `code_challenge` parameter. (OKTA-461970)

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

* If the [Create a Scope](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AuthorizationServerScopes/#tag/AuthorizationServerScopes/operation/createOAuth2Scope) endpoint received multiple requests at or near the same time, duplicate Scopes could be created. (OKTA-442533)

* When the [Update resource set](/docs/reference/api/roles/#update-resource-set) endpoint was called, the `resourceSetId` parameter was required in the body of the request. (OKTA-445144)

* When the [Upload Theme background image](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Themes/#tag/Themes/operation/uploadBrandThemeBackgroundImage) endpoint was called, the image was converted to PNG format. (OKTA-458260)

* When the [List events](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SystemLog/#tag/SystemLog/operation/listLogEvents) operation was performed on the `/logs` endpoint, some system logs showed the incorrect status for debug behaviors if there was missing data that prevented behavior evaluation. (OKTA-455372)

### Monthly release 2022.01.0

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Error response updated for malicious IP address sign-in requests is GA in Production](#error-response-updated-for-malicious-ip-address-sign-in-requests-is-ga-in-production) | December 8, 2021 |
| [Dynamic Issuer Mode is GA in Production](#dynamic-issuer-mode-is-ga-in-production) | December 8, 2021 |
| [Custom domains with Okta-managed certificates is GA in Production](#custom-domains-with-okta-managed-certificates-is-ga-in-production) | December 8, 2021 |
| [New permissions for custom admin roles](#new-permissions-for-custom-admin-roles) | January 6, 2022|

#### Error response updated for malicious IP address sign-in requests is GA in Production

If you block suspicious traffic and [ThreatInsight](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ThreatInsight/) detects that the sign-in request comes from a malicious IP address, Okta automatically denies the user access to the organization. The user receives an error in response to the request. From the user's perspective, the blocked request can't be identified due to ThreatInsight having identified the IP address as malicious. <!--OKTA-454335-->

#### Dynamic Issuer Mode is GA in Production

An authorization server's issuer URL can be used to validate whether tokens are issued by the correct authorization server. You can configure the issuer URL to be either the Okta subdomain (such as `company.okta.com`) or a custom domain (such as `sso.company.com`). See [Property details](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AuthorizationServer/).

When there are apps that use Okta's subdomain and other apps that use the custom domain, the issuer validation breaks because the value is hard-coded to one domain or the other.

With Dynamic Issuer Mode, the issuer value in minted tokens is dynamically updated based on the URL that is used to initiate the original authorize request. See [Client application settings](/docs/reference/api/apps/#settings-10). <!--OKTA-452668-->

#### Custom domains with Okta-managed certificates is GA in Production

When you customize an Okta URL domain, your Okta-hosted pages are branded with your own URL. [Okta-managed certificates](/docs/guides/custom-url-domain/main/#configure-a-custom-domain-through-okta-managed-certificates) automatically renew through a Let's Encrypt integration, a free certificate authority. Okta-managed certificate renewals lower customer developer maintenance costs and reduce the high risk of a site outage when certificates expire. <!--OKTA-437290-->

#### New permissions for custom admin roles

The Administrator Roles API includes new app [permissions](/docs/reference/api/roles/#permission-properties) for custom admin roles to run end-to-end imports. See [About role permissions](https://help.okta.com/okta_help.htm?id=csh-cstm-admin-role-app-permissions).<!--OKTA-433371-->
