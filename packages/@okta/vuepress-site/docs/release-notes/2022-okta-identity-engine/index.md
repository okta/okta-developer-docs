---
title: Okta Identity Engine API Products release notes 2022
---

<ApiLifecycle access="ie" />

## June

### Monthly release 2022.06.0

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Admin Roles with Delegated Flows Resource Set support is EA in Preview](#admin-roles-with-delegated-flows-resource-set-support-is-ea-in-preview) | May 25, 2022|
| [Dynamic IdP routing is EA in Preview](#dynamic-idp-routing-is-ea-in-preview) | June 8, 2022|
| [Email Address Bounces API is GA in Production](#email-address-bounces-api-is-ga-in-production) | March 2, 2022 |
| [Generic OIDC IdP nonce validation enforced](#generic-oidc-idp-nonce-validation-enforced) | June 8, 2022|
| [JWT claim enhancement](#jwt-claim-enhancement) | June 8, 2022|
| [OIDC Identity Providers private/public key pair support is EA in Preview](#oidc-identity-providers-private-public-key-pair-support-is-ea-in-preview) | June 8, 2022|
| [Password as an optional authenticator is GA in Production](#password-as-an-optional-authenticator-is-ga-in-production) | March 30, 2022|
| [Regular expression support for matching users with a generic inbound OIDC IdP](#regular-expression-support-for-matching-users-with-a-generic-inbound-oidc-idp) | June 8, 2022|
| [Signed request support for generic SAML IdP is EA in Preview](#signed-request-support-for-generic-saml-idp-is-ea-in-preview) | June 8, 2022|
| [System Log events for telephony rate limit violations](#system-log-events-for-telephony-rate-limit-violations) | June 8, 2022|
| [Telephony Inline Hook is GA in Preview](#telephony-inline-hook-is-ga-in-preview) | March 30, 2022|
| [User-scoped MyAccount API is GA in Preview](#user-scoped-myaccount-api-is-ga-in-preview) | May 11, 2022|
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

#### Password as an optional authenticator is GA in Production

Passwords are weak authenticators and prone to security issues. Currently all users are required to enroll a password. This also causes friction during the self-service registration process. You can now create a password-optional or passwordless sign-in experience for your end users. It makes the registration process quicker by removing the need to set up a password. It also provides a safer and more secure sign-in experience as users can instead use stronger authenticators such as possession-based authenticators or biometrics. Okta gives you the flexibility to target specific groups of users in your organization with passwordless flows, allowing you to gradually roll out the experience across your entire user base. See [Create User with Optional Password enabled](/docs/reference/api/users/#create-user-with-optional-password-enabled). <!-- OKTA-497367 -->

#### Regular expression support for matching users with a generic inbound OIDC IdP

Admins can configure the Okta OIDC Identity Provider to only authenticate users from an inbound OIDC IdP if their usernames match a predefined regular expression pattern. See the `filter` property from the [Subject Policy object](/docs/reference/api/idps/#subject-policy-object) in the IdPs API and the Authentication Settings section in the [OIDC IdP](/docs/guides/add-an-external-idp/openidconnect/main/#create-an-identity-provider-in-okta) configuration. <!-- OKTA-500903 -->

#### Signed request support for generic SAML IdP is EA in Preview

Using signed SAML requests ensures that incoming requests are from genuine applications. When signed SAML request is configured, Okta only accepts SAML requests signed using the certificate associated with the app integration. Having signed SAML requests also resolves scenarios where the Assertion Consumer Service (ACS) URL requested after authentication can be one of several domains or URLs. When a Service Provider sends a signed authentication request, Okta can accept dynamic ACS values as part of the SAML request and posts the SAML assertion response to the ACS value specified in the request. See the Advanced Settings section of [Create SAML app integrations using AIW](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-aiw-saml). <!-- OKTA-493043 -->

#### System Log events for telephony rate limit violations

Telephony `system.sms.send.*` and `system.voice.send.*` events are now issued as a `DENY` System Log message when SMS or Voice messages are blocked due to telephony operational rate limit violations. The `system.operation.rate_limit.violation` event is still fired, but will be deprecated in the 2022.08.0 release. See the [System Log API](/docs/reference/api/system-log/). <!-- OKTA-498664 -->

#### Telephony Inline Hook is GA in Preview

While Okta provides out-of-the-box telephony functionality, many customers need the ability to integrate their existing telecommunications provider with Okta to deliver SMS and Voice messages. The Telephony Inline Hook allows customers to generate One-Time Passcodes within Okta, and then use their existing telecommunications provider to deliver the messages for MFA enrollment/verification, password reset, and account unlock. This allows customers to use their existing telephony solution within Okta, due to the time they've already invested in their existing telephony solution, the need to use a specific regional provider, or simply the desire to maintain flexibility. See [Telephony Inline Hook with Twilio](/docs/guides/telephony-inline-hook/nodejs/main/). <!-- OKTA-491573 -->

#### User-scoped MyAccount API is GA in Preview

The MyAccount API now provides user-scoped endpoints that don’t require admin tokens. The new endpoint is `/idp/myaccount`. End users only need a bearer token to update their email and phone authenticators. In addition, app developers can call the MyAccount API for active users outside of the authentication context. For example, after a user enrolls in the mandatory email factor and completes authentication, app developers can call the API to enroll the active user with the optional phone authenticator. See [MyAccount API](/docs/reference/api/myaccount/). <!-- OKTA-496877 -->

#### Bugs fixed in 2022.06.0

* Primary and secondary email addresses weren't verified when the email addresses were added or modified through the `/users/me` [API endpoint](/docs/reference/api/users/#update-current-user-s-profile). This issue was fixed in 2022.05.0. (OKTA-444089)

* No System Log event was triggered when a request to [Forgot password API endpoint](/docs/reference/api/users/#forgot-password) (`/users/{userId}/credentials/forgot_password`) was made for a user with LOCKED_OUT status. (OKTA-4852442)

* No error messages were returned when an API request was made to [create](/docs/reference/api/roles/#create-resource-set) or [update](/docs/reference/api/roles/#add-more-resources) a resource set with invalid ORNs. This occurred if the request was made to an org with the **Okta Resource Name (ORN) in API for Administrator Roles** feature enabled. (OKTA-499775)

## May

### Weekly release 2022.05.3

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.05.3](#bugs-fixed-in-2022-05-3) | May 25, 2022 |

#### Bugs fixed in 2022.05.3

* Post calls to the Org API endpoint that creates an email bounces remove list (`/org/email/bounces/remove-list`) sometimes returned an HTTP 500 Internal Server Error. (OKTA-497859)

* The response returned from the `/introspect` endpoint during the unlock-account user flow wasn't the same response that was sent initially. (OKTA-452191)

* The wrong response code was returned when an [access policy rule](/docs/guides/customize-authz-server/main/#create-rules-for-each-access-policy) didn't have the Interaction Code grant type enabled. (OKTA-463497)

* Using the [API](/docs/reference/api/authorization-servers/#claim-operations) to create a claim with a reserved name resulted in an unclear error message. (OKTA-477575)

### Weekly release 2022.05.1

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [User-scoped MyAccount API is EA in Preview](#user-scoped-myaccount-api-is-ea-in-preview) | May 11, 2022 |
| [Progressive Enrollment is EA in Preview](#progressive-enrollment-is-ea-in-preview) | May 11, 2022 |
| [The API for suppressing email notifications is EA in Preview](#the-api-for-suppressing-email-notifications-is-ea-in-preview) | May 11, 2022 |
| [Bug fixed in 2022.05.1](#bug-fixed-in-2022-05-1) | May 11, 2022 |

#### User-scoped MyAccount API is EA in Preview

The MyAccount API now provides user-scoped endpoints that don’t require admin tokens. The new endpoint is `/idp/myaccount`. End users only need a bearer token to update their email and phone authenticators. In addition, app developers can call the MyAccount API for active users outside of the authentication context. For example, after a user enrolls in the mandatory email factor and completes authentication, app developers can call the API to enroll the active user with the optional phone authenticator. See [MyAccount API](/docs/reference/api/myaccount/).

#### Progressive Enrollment is EA in Preview

Typically, collecting end-user data during the initial sign-up process creates friction and abandonment. The addition of the Progressive Enrollment feature helps you to capture the minimum user information required to create a profile and then continually build out those user profiles during subsequent sign-in operations. Admins can control what information is collected, validate those input values, and trigger inline hooks during the self-service registration and progressive enrollment flows. See [Registration of end users](https://help.okta.com/okta_help.htm?type=oie&id=ext-pe-policies) and [Registration Inline Hook](/docs/guides/registration-inline-hook/nodejs/main/).

#### The API for suppressing email notifications is EA in Preview

This API allows you to change who receives email notifications for each individual email template. You can suppress them completely, or send them to admins only. This unlocks testing scenarios that warrant using production user directories, and prevents end users from getting test emails. It also allows extensibility for customers who would like to use a third party email sender through Hooks or Workflows. See [Email template settings](/docs/reference/api/brands/#email-template-settings).

#### Bug fixed in 2022.05.1

When [role target operations](/docs/reference/api/roles/#role-target-operations) included an invalid `roleId`, an incorrect 500 system error was returned. (OKTA-487507)

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
| [Password as an optional authenticator is GA in Preview](#password-as-an-optional-authenticator-is-ga-in-preview) | March 30, 2022 |
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

#### Password as an optional authenticator is GA in Preview

Passwords are weak authenticators and prone to security issues. Currently all users are required to enroll a password. This also causes friction during the self-service registration process. You can now create a password-optional or passwordless sign-in experience for your end users. It makes the registration process quicker by removing the need to set up a password. It also provides a safer and more secure sign-in experience as users can instead use stronger authenticators such as possession-based authenticators or biometrics. Okta gives you the flexibility to target specific groups of users in your organization with passwordless flows, allowing you to gradually roll out the experience across your entire user base. See [Create User with Optional Password enabled](/docs/reference/api/users/#create-user-with-optional-password-enabled). <!-- OKTA-492427 -->

#### Bugs fixed in 2022.05.0

* Web and SPA app integrations using the [OIDC API](/docs/reference/api/oidc/) with the `Login Initiated By` feature incorrectly returned an error if they were created using an `authorization_code` or `interaction_code` grant type. (OKTA-435855)

* If the Administrator Roles API ([users](/docs/reference/api/roles/#remove-a-group-target-from-a-group-administrator-role-given-to-a-user) and [groups](/docs/reference/api/roles/#remove-a-group-target-from-a-group-administrator-role-given-to-a-group)) endpoints contained an invalid role type, an HTTP 500 Internal Server Error was returned. (OKTA-393032)

* Custom email address attribute mapping for the GitHub IdP failed due to a conflict in the `id` external attribute. (OKTA-460058)

## April

### Weekly release 2022.04.3

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bug fixed in 2022.04.3](#bug-fixed-in-2022-04-3) | April 20, 2022 |

#### Bug fixed in 2022.04.3

* When an unsupported [constraint](/docs/reference/api/policy/#constraints) was added to the authentication policy verification method, an error wasn't returned from the Policy API.  (OKTA-434893)

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
| [Password as an optional authenticator is EA in Preview](#password-as-an-optional-authenticator-is-ea-in-preview) | March 30, 2022 |
| [Native SSO support is EA in Preview](#native-sso-support-is-ea-in-preview) | March 30, 2022 |
| [Telephony Inline Hook is EA in Preview](#telephony-inline-hook-is-ea-in-preview) | March 30, 2022 |
| [Splunk available for Log Streaming is EA in Preview](#splunk-available-for-log-streaming-is-ea-in-preview) | March 30, 2022 |
| [Burst rate limits available on Rate Limit Dashboard](#burst-rate-limits-available-on-rate-limit-dashboard) | March 30, 2022 |
| [OAuth 2.0 Push Authorization Requests](#oauth-2-0-push-authorization-requests) | March 30, 2022 |
| [Signed request support for generic OIDC IdP is GA in Preview](#signed-request-support-for-generic-oidc-idp-is-ga-in-preview) | March 02, 2022 |
| [Okta Org2Org integration supporting Okta API access using an OAuth 2.0 client is GA in Preview](#okta-org2org-integration-supporting-okta-api-access-using-an-oauth-2-0-client-is-ga-in-preview) | February 16, 2022 |
| [Client secret rotation and key management is GA in Preview](#client-secret-rotation-and-key-management-is-ga-in-preview) | February 03, 2022 |
| [Bug fixed in 2022.04.0](#bug-fixed-in-2022-04-0) | March 30, 2022 |

#### Improved email magic link authentication experience is EA in Preview

Email magic links are enhanced to allow end users to authenticate in two different contexts. The end user can authenticate using the same location where they click the link and quickly return to the application context. Or, if the end user clicks the link in a different browser, they can enter a one-time password to proceed with authentication. See [Okta email (magic link/OTP) integration guide](/docs/guides/authenticators-okta-email/aspnet/main/) and [Use redirect auth with the Identity Engine sample apps](/docs/guides/sampleapp-oie-redirectauth/).

#### Password as an optional authenticator is EA in Preview

Passwords are weak authenticators and prone to security issues. Currently all users are required to enroll a password. This also causes friction during the self-service registration process. You can now create a password-optional or passwordless sign-in experience for your end users. It makes the registration process quicker by removing the need to set up a password. It also provides a safer and more secure sign-in experience as users can instead use stronger authenticators such as possession-based authenticators or biometrics. Okta gives you the flexibility to target specific groups of users in your organization with passwordless flows, allowing you to gradually roll out the experience across your entire user base. See [Create User with Optional Password enabled](/docs/reference/api/users/#create-user-with-optional-password-enabled).

#### Native SSO support is EA in Preview

Single Sign-On (SSO) between browser-based web apps is achieved by leveraging shared cookies. Unlike web applications, native applications can't use web cookies. With Native SSO, Okta offers a token-based approach to achieve SSO between native applications.

Native SSO allows you to protect native OpenID Connect applications, such as desktop apps and mobile apps, and achieve SSO and Single Logout (SLO) between these applications. See [Configure SSO for native apps](/docs/guides/configure-native-sso/main/).

#### Telephony Inline Hook is EA in Preview

While Okta provides out-of-the-box telephony functionality, many customers need the ability to integrate their existing telecommunications provider with Okta to deliver SMS and Voice messages. The Telephony Inline Hook allows customers to generate One-Time Passcodes within Okta, and then use their existing telecommunications provider to deliver the messages for MFA enrollment/verification, password reset, and account unlock. This allows customers to use their existing telephony solution within Okta, due to the time they've already invested in their existing telephony solution, the need to use a specific regional provider, or simply the desire to maintain flexibility. See [Telephony Inline Hook with Twilio](/docs/guides/telephony-inline-hook/nodejs/main/).

#### Splunk available for Log Streaming is EA in Preview

Many organizations use third-party systems to monitor, aggregate, and act on the event data in Okta System Log events.

Log Streaming enables Okta admins to more easily and securely send System Log events to a specified system such as the Splunk Cloud in near real time with simple, pre-built connectors. Log streaming scales well even with high event volume, and unlike many existing System Log event collectors, it does not require a third-party system to store an Okta Admin API token. See [Splunk Cloud in the Log Streaming API](/docs/reference/api/log-streaming/#splunk-cloud-settings-object).

#### Burst rate limits available on Rate Limit Dashboard

The Rate Limit Dashboard, available from the Admin Console, now includes data on burst limits in your Okta org, in addition to rate limit warnings and violations. The Violations dashboard was renamed Events to acknowledge the increase of scope, and includes the ability to filter on timeline as well as the type of event (warning, burst, and violation). Hovering over the burst rates in the graphs provides more detail and links to the system log for individual endpoint calls. The individual Usage graphs provide details on bursts for the individual API. See [Rate limit dashboard](/docs/reference/rl-dashboard/) and [Burst rate limits](/docs/reference/rate-limits/#burst-rate-limits).

#### OAuth 2.0 Push Authorization Requests

Okta authorization servers now support push authorization requests in the `/par` endpoint to enhance OAuth security. This feature allows clients to push the payload of an OAuth 2.0 authorization request to the authorization server through a direct `/par` request and, in return, a request URI that is used to reference the payload data is provided by the authorization server. The request URI is then used in a subsequent `/authorize` request to reference the initial authorization payload. See the [/par](/docs/reference/api/oidc/#par) OAuth 2.0 API endpoint.

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

* An error was returned when a valid [update request](/docs/reference/api/authorization-servers/#update-a-scope) was made for the `device_sso` or `online_access` system scopes. (OKTA-417477)

* Sending an [error object](/docs/reference/registration-hook/#error) in the response message of an Inline Registration Hook resulted in an error message that included domain details and didn’t target attributes. (OKTA-473152)

### Weekly release 2022.03.1

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.03.1](#bugs-fixed-in-2022-03-1) | March 09, 2022 |

#### Bugs fixed in 2022.03.1

* Performing a GET request on the `/policies/` [endpoint](/docs/reference/api/policy/) sometimes returned a page with the wrong number of items. (OKTA-455164)
* When the [List email templates](/docs/reference/api/brands/#list-email-templates) or the [List email customizations](/docs/reference/api/brands/#list-email-customizations) operations were performed on the `/brands/` endpoint, the base address in the link response header contained the `-admin` string instead of the requested base address. (OKTA-465356)
* When modifying the [custom email activation template](/docs/guides/custom-email/main/#use-customizable-email-templates), an admin could save the template without either of the required `verificationLink` or `verificationToken` elements. (OKTA-472895)
* When modifying the [custom email challenge template](/docs/guides/custom-email/main/#use-customizable-email-templates), an admin could save the template without either of the required `emailAuthenticationLink` or `verificationToken` elements. (OKTA-472928)

### Monthly release 2022.03.0

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Authentication timestamp is added as an access token claim](#authentication-timestamp-is-added-as-an-access-token-claim) | March 2, 2022 |
| [Custom Administrator Roles is GA in Production](#custom-administrator-roles-is-ga-in-production) | February 3, 2022 |
| [Email Address Bounces API is EA in Preview](#email-address-bounces-api-is-ea-in-preview) | March 2, 2022 |
| [Shareable Authentication Policies](#shareable-authentication-policies) | March 2, 2022 |
| [Signed request support for generic OIDC IdP is EA in Preview](#signed-request-support-for-generic-oidc-idp-is-ea-in-preview) | March 2, 2022 |
| [Bugs fixed in 2022.03.0](#bugs-fixed-in-2022-03-0)         | March 2, 2022           |

#### Authentication timestamp is added as an access token claim

The user-authenticated epoch timestamp is provided as the `auth_time` [claim in the access token](/docs/reference/api/oidc/#reserved-claims-in-the-payload-section).

#### Custom Administrator Roles is GA in Production

The Okta [Custom Administrator Roles](/docs/reference/api/roles/) API provides operations that you can use to create customized roles and assign them to a user or a group.

#### Email Address Bounces API is EA in Preview

Okta admins can now control the bounced email address list through the [Email Address Bounces API](/docs/reference/api/org/#email-address-bounces-operations). When Okta-sent email addresses are blocked from an email service (the bounced email list), admins can use this API to create a list of blocked email addresses to be removed from the email service.

#### Shareable Authentication Policies

Admins can now manage authentication policies using a centralized view. While authentication policies allowed admins the ability to make application access decisions using user, device, and other contextual information, managing these policies across hundreds of applications became challenging and error-prone.

On the new Authentication Policies page, admins can create new policies, apply those policies to multiple applications, and assess what application access decisions are impacted by each policy.

Two policy name changes are included in this release: app sign-on policy is renamed authentication policy, and Okta sign-on policy is renamed Global Session Policy. See [Configure a Global Session Policy and authentication policies](/docs/guides/configure-signon-policy/) and [Authentication policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop).

#### Signed request support for generic OIDC IdP is EA in Preview

When customers [integrate Okta with an OpenID Connect-based Identity Provider](/docs/guides/add-an-external-idp/openidconnect/main/#create-an-identity-provider-in-okta), Okta asks the IdP to authenticate the user with request elements that are passed as query parameters in the URL. The new [signed request object](/docs/reference/api/idps/#oidc-algorithms-object) allows customers to send these parameters encoded in a JWT instead, improving security on the authorization request sent to the OpenID Connect provider or authorization server.

#### Bugs fixed in 2022.03.0

* When ThreatInsight evaluated sign-in attempts for unknown users, the threat level was incorrectly displayed as `threatLevel=UNKNOWN` in the System Log. (OKTA-471299)

* The OAuth 2.0 [`/token`](/docs/reference/api/oidc/#token) and [`/authorize`](/docs/reference/api/oidc/#authorize) endpoints accepted requests that included the `resource` parameter. (OKTA-476549)

## February

### Weekly release 2022.02.2

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Okta Org2Org integration now supports Okta API access using an OAuth 2.0 client](#okta-org2org-integration-now-supports-okta-api-access-using-an-OAuth-2-0-client)                        | February 16, 2022         |

#### Okta Org2Org integration now supports Okta API access using an OAuth 2.0 client

The Okta Org2Org integration enables you to push and match both users and groups from one Okta org to another. Previously, this integration only supported token-based access to the Okta API. You can now [configure the Org2Org integration](/docs/guides/secure-oauth-between-orgs/) to access the Okta API as an [OAuth 2.0 client](/docs/reference/api/apps/#token-based-provisioning-connection-profile-properties). This increases security by limiting the scope of access and providing a better mechanism to rotate credentials. <!-- OKTA-468121 -->

### Weekly release 2022.02.1

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [API token ID added to System Log event types](#api-token-id-added-to-system-log-event-types)                        | February 9, 2022         |
| [Bug fixed in 2022.02.1](#bug-fixed-in-2022-02-1)                        | February 9, 2022         |

#### API token ID added to System Log event types

API requests that include an API token and return a System Log event now include the API token in the event payload. The token identifier appears in the System Log API `transaction.details.requestApiTokenId` field and in the `Event > System > Transaction > Detail > RequestApiTokenId` node in the Admin Console System Log.

To view an example of this new event detail, [create a user by API](/docs/guides/quickstart/main/#create-a-user-by-api) and view the associated event (`user.lifecycle.create`).

#### Bug fixed in 2022.02.1

The [OAuth token endpoint](/docs/reference/api/oidc/#response-example-error-2) didn’t reject requests that included a `code_verifier` parameter if the [authorization call](/docs/reference/api/oidc/#authorize) was issued without the PKCE `code_challenge` parameter. (OKTA-461970)

### Monthly release 2022.02.0

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Custom Administrator Roles is GA in Preview](#custom-administrator-roles-is-ga-in-preview) | February 3, 2022 |
| [Client secret rotation and key management is EA](#client-secret-rotation-and-key-management-is-ea) | February 3, 2022 |
| [Group role assignment improvement](#group-role-assignment-improvement) | February 3, 2022 |
| [Custom Domains with Okta-Managed Certificates is GA in Production](#custom-domains-with-okta-managed-certificates-is-ga-in-production) | February 3, 2022 |
| [Bug fixed in 2022.02.0](#bug-fixed-in-2022-02-0)         | February 3, 2022           |

#### Custom Administrator Roles is GA in Preview

The Okta [Custom Administrator Roles](/docs/reference/api/roles/) API provides operations that you can use to create customized roles and assign them to a user or a group. <!--OKTA-457514-->

#### Client secret rotation and key management is EA

Rotating client secrets without service or application downtime is a challenge. Additionally, JSON Web Key management can be cumbersome. To make [client secret rotation](/docs/guides/client-secret-rotation-key/) a seamless process and improve JWK management, you can now create overlapping client secrets and manage JWK key pairs in the Admin Console. You can also create JWK key pairs from the Admin Console without having to use an external tool. <!--OKTA-460699-->

#### Group role assignment improvement

[Assigning a role to a group](/docs/reference/api/roles/#assign-a-role-to-a-group) through the Administrator Roles API has been enhanced by retaining the existing role assignment ID where possible. <!--OKTA-457506-->

#### Custom Domains with Okta-Managed Certificates is GA in Production

When you customize an Okta URL domain, your Okta-hosted pages are branded with your own URL. [Okta-Managed Certificates](/docs/guides/custom-url-domain/main/#configure-a-custom-domain-through-okta-managed-certificates) auto renew through a Let's Encrypt integration, a free certificate authority. Since Okta handles certificate renewals, this reduces customer developer maintenance costs and the high risk of a site outage when certificates expire.  <!--OKTA-459338-->

#### Bug fixed in 2022.02.0

In the [Custom Administrator Roles](/docs/reference/api/roles/) API, some public DELETE requests returned a different response code than their contract. (OKTA-456896)

## January

### Weekly release 2022.01.2

| Change                                                                                              | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------|--------------------------|
| [Device information in the OAuth 2.0 Interaction Code flow](#device-information-in-the-oauth-2-0-interaction-code-flow) | January 26, 2022 |
| [Fewer digits revealed for shorter phone numbers](#fewer-digits-revealed-for-shorter-phone-numbers) | January 26, 2022 |
| [Bugs fixed in 2022.01.2](#bugs-fixed-in-2022-01-2)         | January 26, 2022           |

#### Device information in the OAuth 2.0 Interaction Code flow

Confidential clients can now specify device information using the `X-Device-Token` header during the OAuth 2.0 [Interaction Code flow](/docs/guides/implement-grant-type/interactioncode/main/). <!--OKTA-455553-->

#### Fewer digits revealed for shorter phone numbers

The masking algorithm now reveals fewer digits in API responses for shorter profile phone numbers. <!--OKTA-455393-->

#### Bugs fixed in 2022.01.2

* Administrators were able to access and modify internal policies. (OKTA-455506)

* When an invalid client assertion type was provided during a [Client Credentials grant type flow](/docs/guides/implement-grant-type/clientcreds/main/), the error response code was 401 instead of 400. (OKTA-456503)

* When the [Create a new Binding](/docs/reference/api/roles/#create-a-new-binding) or the [Add more Members to a Binding](/docs/reference/api/roles/#add-more-members-to-a-binding) operation was performed on the `/iam/resource-sets` endpoint, and included all users or all groups in the request, the request didn't fail as expected. (OKTA-459994)

* When the [Get all policies](/docs/reference/api/policy/#get-all-policies-by-type) operation was performed on the `/policies` endpoint, unused Radius policies were returned. (OKTA-460965)

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
| [Dynamic Issuer Mode is GA in Production](#dynamic-issuer-mode-is-ga-in-production) | December 8, 2021 |
| [Custom domains with Okta-managed certificates is GA in Production](#custom-domains-with-okta-managed-certificates-is-ga-in-production) | December 8, 2021 |
| [New permissions for custom admin roles](#new-permissions-for-custom-admin-roles) | January 6, 2022|
| [Self-service password reset with User API](#self-service-password-reset-with-user-api) | January 6, 2022 |

#### Dynamic Issuer Mode is GA in Production

An authorization server's issuer URL can be used to validate whether tokens are issued by the correct authorization server. You can configure the issuer URL to be either the Okta subdomain (such as `company.okta.com`) or a custom domain (such as `sso.company.com`). See [Property details](/docs/reference/api/authorization-servers/#authorization-server-properties).

When there are applications that use Okta's subdomain and other applications that use the custom domain, the issuer validation breaks because the value is hard-coded to one domain or the other.

With Dynamic Issuer Mode, the issuer value in minted tokens is dynamically updated based on the URL that is used to initiate the original authorize request. See [Client application settings](/docs/reference/api/apps/#settings-10). <!--OKTA-452668-->

#### Custom domains with Okta-managed certificates is GA in Production

When you customize an Okta URL domain, your Okta-hosted pages are branded with your own URL. [Okta-managed certificates](/docs/guides/custom-url-domain/main/#configure-a-custom-domain-through-okta-managed-certificates) automatically renew through a Let’s Encrypt integration, a free certificate authority. Okta-managed certificate renewals lower customer developer maintenance costs and reduce the high risk of a site outage when certificates expire. <!--OKTA-437290-->

#### New permissions for custom admin roles

The Administrator Roles API includes new app [permissions](/docs/reference/api/roles/#permission-properties) for custom admin roles to run end-to-end imports. See [About role permissions](https://help.okta.com/okta_help.htm?id=csh-cstm-admin-role-app-permissions).<!--OKTA-433371-->

#### Self-service password reset with User API

Client applications that use the Users API `/users/{$userId}/credentials/forgot_password` to implement the [self-service account recovery](https://help.okta.com/okta_help.htm?type=oie&id=ext-config-sspr) flow can now use this API call with password policies configured with the **Any enrolled authenticator used for MFA/SSO** additional verification option. <!--OKTA-452933-->
