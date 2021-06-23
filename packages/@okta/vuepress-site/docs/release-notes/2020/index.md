---
title: Okta API Products Release Notes 2020
---

## December

### Weekly Release 2020.12.2

| Change                                            | Expected in Preview Orgs |
| ------------------------------------------------- | ------------------------ |
| [Manage email subscription settings using the Subscriptions API](#manage-email-subscription-settings-using-the-subscriptions-api) | December 22, 2020        |
| [Bugs Fixed in 2020.12.2](#bugs-fixed-in-2020-12-2) | December 22, 2020         |

#### Manage email subscription settings using the Subscriptions API

The `/subscriptions` API is now available in Self-Service EA. The [Subscriptions API](/docs/reference/api/admin-notifications/) provides operations to manage email subscription settings for Okta administrator notifications. <!--OKTA-325794-->

#### Bugs fixed in 2020.12.2

* Clients making GET requests to `/api/v1/users/{usernameprefix}` received an error if the user's [short name](/docs/reference/api/users/#get-user-with-login-shortname) (`usernameprefix`) ended with `.jpg`, `.png`, `.js`, `.css`, or a similar file extension, even when a user matching that short name existed. (OKTA-322140)
* When an [MFA policy](/docs/reference/api/policy/#multifactor-mfa-enrollment-policy) was created without specifying the `consent` format, subsequent GET and UPDATE requests resulted in an error. (OKTA-339250)
* The `/users/${userId}/groups` endpoint incorrectly returned a 500 Internal Server Error if the last page contained no elements. (OKTA-358328)


### Weekly Release 2020.12.1

| Change                                            | Expected in Preview Orgs |
| ------------------------------------------------- | ------------------------ |
| [Bugs Fixed in 2020.12.1](#bugs-fixed-in-2020-12-1) | December 17, 2020         |

#### Bugs fixed in 2020.12.1

* The Update User API incorrectly allowed the [Credentials object](/docs/reference/api/users/#credentials-object) of an ACTIVE user to be updated to [Password Hook](/docs/reference/api/users/#password-object). (OKTA-350956)
* The `illegal_post_logout_redirect_uri` error message, which was enhanced to help clients using the app client configuration wizard, incorrectly appeared for OIN clients. (OKTA-343082)


### Monthly Release 2020.12.0

| Change                                                                                              | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------|--------------------------|
| [Inclusive language and terminology](#inclusive-language-and-terminology) | December 9, 2020         |
| [New OAuth Administrator Roles API scopes](#new-oauth-administrator-roles-api-scopes) | December 9, 2020         |
| [New endpoint added to DynamicScale Rate Limits](#new-endpoint-added-to-dynamicscale-rate-limits) | December 9, 2020         |
| [Account linking for SAML IdPs is now GA in Production](#account-linking-for-saml-idps-is-now-ga-in-production) | December 9, 2020  |
| [One Time Use Refresh Token is now in Early Access (EA)](#one-time-use-refresh-token-is-now-in-early-access-ea)      | December 9, 2020         |
| [Enhancements to Apps API for Idp Initiated Logins](#enhancements-to-apps-api-for-idp-initiated-logins) | December 9, 2020         |
| [Enhancements to Apps API for SAML Apps](#enhancements-to-apps-api-for-saml-apps) | December 9, 2020         |
| [Groups API extended search is now GA in Preview](#groups-api-extended-search-is-now-ga-in-preview) | December 9, 2020        |

#### Inclusive language and terminology

Okta is focused on the adoption of inclusive language and communication. Some long-standing industry terminology and expressions have been updated in this release. More updates will be made in future releases.

In this release, the documentation for Custom Groups Claims has been updated with inclusive terminology. The term "whitelist" has been replaced with "allow list":

- [Customize tokens returned from Okta with a dynamic allow list](/docs/guides/customize-tokens-dynamic/add-groups-claim-dynamic/)

- [Customize tokens returned from Okta with a static allow list](/docs/guides/customize-tokens-dynamic/dynamic-allowlist-org-as)

Existing custom claims that use the `groupwhitelist` Profile property don't need to change.<!--OKTA-344317-->

#### New OAuth Administrator Roles API scopes

The [Administer Roles API](/docs/reference/api/roles) now supports OAuth scopes `okta.roles.manage` and `okta.roles.read`. These scopes allow applications to read and manage (create, update, and delete) administrator roles in your Okta organization.<!--OKTA-287229-->

#### New endpoint added to DynamicScale rate limits

The [DynamicScale](/docs/reference/rl-dynamic-scale/) add-on service now includes the following additional authentication endpoint: `/login/login.html`.<!--OKTA-342112-->

#### Account linking for SAML IdPs is now GA in Production

Admins can now enable or disable automatic account linking between SAML Identity Providers and Okta using the [Identity Provider API](/docs/reference/api/idps/). They can also restrict account linking based on whether the end user is a member of any specified groups. <!--OKTA-334889-->

#### One Time Use Refresh Token is now in Early Access (EA)

One Time Use Refresh Token, also called Refresh Token Rotation, is now in Early Access. Refresh Token Rotation helps a public client to securely rotate refresh tokens after each use. A new refresh token is returned each time the client makes a request to exchange a refresh token for a new access token. See [Refresh Token Rotation](/docs/guides/refresh-tokens/refresh-token-rotation/).<!--OKTA-345754-->

#### Enhancements to Apps API for Idp Initiated Logins

The [Apps API](/docs/reference/api/apps/) can now configure the Idp Initiated Login behavior, which is also available in the Admin Console. **Note:** The Idp Initiated Login is limited to OpenID Connect clients. <!--OKTA-342821-->

#### Enhancements to Apps API for SAML Apps

The [Apps API](/docs/reference/api/apps/) can now configure the SLO URL behavior for SAML apps, which is also available in the Admin Console.<!--OKTA-342882-->

#### Groups API extended search is now GA in Preview

The Groups API support for extended search is now Generally Available (GA) in Preview.<!--OKTA-344169-->


## November

### Weekly Release 2020.11.1

| Change                                            | Expected in Preview Orgs |
| ------------------------------------------------- | ------------------------ |
| [Bugs Fixed in 2020.11.1](#bugs-fixed-in-2020-11-1) | November 11, 2020         |

#### Bugs fixed in 2020.11.1

* Import of users with a [bcrypt-hashed password](/docs/reference/api/users/#hashed-password-object) succeeded even if the `workFactor` property was missing or misnamed. This prevented imported users from signing in. (OKTA-330587)
* During user import, some POST requests to the `/users` [endpoint](/docs/reference/api/users/#create-user) incorrectly triggered Inline Hooks, resulting in higher latency. (OKTA-335769)


### Monthly Release 2020.11.0

| Change                                                                                              | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------|--------------------------|
| [Inclusive language and terminology](#inclusive-language-and-terminology) | November 4, 2020         |
| [System Log API adds additional filter expressions](#system-log-api-adds-additional-filter-expressions) | November 4, 2020         |
| [Zones API includes `usage` property](#zones-api-includes-usage-property) | November 4, 2020         |
| [Client-based rate limiting is now GA in Production](#client-based-rate-limiting-is-now-ga-in-production) | (See entry)         |
| [User Consent for OAuth 2.0 and OpenID Connect flows is rolling out to GA in Production](#user-consent-for-oauth-2-0-and-openid-connect-flows-is-rolling-out-to-ga-in-production) | (See entry) |
| [Account linking for SAML IdPs is now GA in Preview](#account-linking-for-saml-idps-is-now-ga-in-preview) | November 4, 2020         |
| [Group object `source` property is now GA in Preview](#group-object-source-property-is-now-ga-in-preview) | November 4, 2020         |
| [MyAccount API is now in Early Access (EA)](#myaccount-api-is-now-in-early-access-ea) | November 4, 2020         |
| [Bug Fixed in 2020.11.0](#bug-fixed-in-2020-11-0) | November 4, 2020        |

#### Inclusive language and terminology

Okta is focused on the adoption of inclusive language and communication. Some long-standing industry terminology and expressions have been updated in this release. More updates will be made in future releases.

The descriptive information returned on both the invalid redirect URI and invalid logout URI error pages has been updated to remove the term "whitelisted". <!--OKTA-336922-->

#### System Log API adds additional filter expressions

The [System Log API](/docs/reference/api/system-log/) `/logs` endpoint can now use the SCIM filter expression operators: `ew` (ends with), `ne` (not equal), and `not` (not function). <!--OKTA-188737-->

#### Zones API includes `usage` property

To help you manage zones in your organization, the Early Access [Zones API](/docs/reference/api/zones/) now includes the `usage` attribute. There are two types of zones: Policy Network Zones and Block List Network Zones. <!--OKTA-333653-->

#### Client-based rate limiting is now GA in Production

[Client-based rate limiting](/docs/reference/rl-clientbased/) for the `/authorize` endpoint is now available in production orgs. It provides granular isolation between requests made to the `/authorize` endpoint by using a combination of the Client ID, user's IP address, and Okta device identifier. This isolates rogue OAuth clients and bad actors, ensuring valid users and applications don't run into rate limit violations.

This feature will be available to orgs in Okta Production cells on November 9, 2020. <!--OKTA-342520-->

#### User Consent for OAuth 2.0 and OpenID Connect flows is rolling out to GA in Production

A consent represents a user's explicit permission to allow an application to access resources protected by scopes. As part of an OAuth 2.0 or OpenID Connect authentication flow, you can prompt the user with a page to approve your app's access to specified resources. See the [consent property for scopes](/docs/reference/api/authorization-servers/#scope-properties).

This feature will be gradually made available to orgs in Okta Production cells beginning on November 11, 2020.

#### Account linking for SAML IdPs is now GA in Preview

Admins can now enable or disable automatic account linking between SAML Identity Providers and Okta using the [Identity Provider API](/docs/reference/api/idps/). They can also restrict account linking based on whether the end user is a member of any specified groups. <!--OKTA-334818-->

#### Group object `source` property is now GA in Preview

For API requests that return a Group or a list of Groups, the Group object includes a `source` property that provides the ID of the source application for the returned Group. This property is now GA in all Preview orgs. See [Group attributes](/docs/reference/api/groups/#group-attributes). <!--OKTA-326610-->

#### MyAccount API is now in Early Access (EA)

The [MyAccount API](/docs/reference/api/myaccount/) enables non-administrator end users to fetch their Okta user profiles. To enable this EA feature, contact [Support](https://support.okta.com/help/open_case). <!--OKTA-342090-->

#### Bug fixed in 2020.11.0

When the `expiresAt` property value of the [Authentication transaction object](/docs/reference/api/authn/#authentication-transaction-object) was returned with an `/authn` [response](/docs/reference/api/authn/) that also included the `sessionToken` [parameter](/docs/reference/api/authn/#session-token) (not `stateToken`), the value incorrectly indicated a 3-minute lifetime. (OKTA-319907)


## October

### Weekly Release 2020.10.2

| Change                                                                                | Expected in Preview Orgs |
|---------------------------------------------------------------------------------------|--------------------------|
| [Bug fixed in 2020.10.2](#bug-fixed-in-2020-10-2)                                     | October 21, 2020         |

#### Bug fixed in 2020.10.2

When accessing the `/authorize` [endpoint](/docs/reference/api/oidc/#authorize) with a scope parameter requiring consent, users not assigned to the application received a consent prompt rather than an error message.  (OKTA-335476)


### Weekly Release 2020.10.1

| Change                                                                                | Expected in Preview Orgs |
|---------------------------------------------------------------------------------------|--------------------------|
| [Bug fixed in 2020.10.1](#bug-fixed-in-2020-10-1)                                     | October 14, 2020         |

#### Bug fixed in 2020.10.1

Requests that were missing access tokens resulted in an HTTP 400 error code instead of a 401. (OKTA-280102)


### Monthly Release 2020.10.0

| Change                                                                                              | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------|--------------------------|
| [Troubleshooting assistance for app redirect URI](#troubleshooting-assistance-for-app-redirect-uri) | October 7, 2020          |
| [API Access Management enables scope as a claim](#api-access-management-enables-scope-as-a-claim)   | October 7, 2020          |
| [Rate limit changes](#rate-limit-changes)                                                           | October 7, 2020          |
| [Client-based rate limiting](#client-based-rate-limiting)                                           | October 7, 2020          |
| [Groups API enhancements in EA](#groups-api-enhancements-in-ea)                                     | October 7, 2020          |

#### Troubleshooting assistance for app redirect URI

When an app redirect URI is either missing or incorrectly configured, Okta returns an HTTP 400 error. Now, the error description provides troubleshooting assistance to debug the expected redirect URI. <!--OKTA-297932-->

#### API Access Management enables scope as a claim

You can now name a claim `scope` in API Access Management [custom authorization servers](/docs/guides/customize-authz-server/). Also, you can now use the EL expression `access.scope` in custom claims to return an array of granted scope strings. <!--OKTA-325243-->

#### Rate limit changes

Rate limits for paid developer orgs and for one-app orgs have been updated. See the [Rate Limits](/docs/reference/rate-limits/) page. <!--OKTA-332153-->

#### Client-based rate limiting

[Client-based rate limiting](/docs/reference/rl-clientbased/) for the `/authorize` endpoint is now available in Preview. It provides granular isolation between requests made to the `/authorize` endpoint by using a combination of the Client ID, user's IP address, and Okta device identifier. This isolates rogue OAuth clients and bad actors, ensuring valid users and applications don't run into rate limit violations. <!--OKTA-328984-->

#### Groups API enhancements in EA

The [Groups API](/docs/reference/api/groups/) now supports extended search. Also, source application is now returned in [Group](/docs/reference/api/groups/#group-object) objects.


## September

### Weekly Release 2020.09.4

| Change                                                    | Expected in Preview Orgs |
| --------------------------------------------------------- | ------------------------ |
| [Bugs fixed in 2020.09.4](#bugs-fixed-in-2020-09-4)       | September 30, 2020           |

#### Bugs fixed in 2020.09.4

* When an OAuth service client called the `/authorize` [endpoint](/docs/reference/api/oidc/#authorize), the returned error description was inaccurate. (OKTA-252750)

* If a user was assigned to two groups that have identical roles, then a call to the `/users/${userId}/roles` endpoint to [list the administrator roles assigned](/docs/reference/api/roles/#list-roles) to the user failed with an HTTP 400 error. (OKTA-325187)

* The `okta.apps.*` scope wasn't applied to the [`/apps/${applicationId}/credentials/keys`](/docs/reference/api/apps/#list-key-credentials-for-application) endpoint. (OKTA-331828)


### Weekly Release 2020.09.3

| Change                                                    | Expected in Preview Orgs |
| --------------------------------------------------------- | ------------------------ |
| [Bug fixed in 2020.09.3](#bug-fixed-in-2020-09-3)       | September 24, 2020           |

#### Bug fixed in 2020.09.3

If a user was converted to use an [external Federated IdP instead of Okta](/docs/reference/api/users/#request-example-convert-a-user-to-a-federated-user), any subsequent attempt to convert the user with a call to the `/users/${userId}/lifecycle/reset_password` endpoint returned an HTTP 501 error instead of an HTTP 400 error. (OKTA-323343)


### Weekly Release 2020.09.2

| Change                                                    | Expected in Preview Orgs |
| --------------------------------------------------------- | ------------------------ |
| [Bug fixed in 2020.09.2](#bug-fixed-in-2020-09-2)       | September 16, 2020           |

#### Bug fixed in 2020.09.2

* Requests to the `/token`, `/revoke`, and `/introspect` endpoints that had invalid client credentials would return an HTTP 400 error instead of the HTTP 401 error required by the [OAuth 2.0 spec](https://tools.ietf.org/html/rfc6749). (OKTA-306444)


### Weekly Release 2020.09.1

| Change                                                    | Expected in Preview Orgs |
| --------------------------------------------------------- | ------------------------ |
| [Bugs fixed in 2020.09.1](#bugs-fixed-in-2020-09-1)       | September 10, 2020           |

#### Bugs fixed in 2020.09.1

* When attempting to reset a user's password using the `lifecycle/reset_password` endpoint, admins received an HTTP 500 error code rather than a valid error message if the user's email address was invalid. (OKTA-307089)
* If a `Groups` claim returned more than 100 groups, then tokens couldn't be minted, which generated an HTTP 500 error code instead of an HTTP 400 error code. (OKTA-321988)
* If an Identity Provider returned an error response during authentication, the `/introspect` endpoint returned an HTTP 500 error code. (OKTA-324419)
* When a geographical network zone that included Okta routers was added to an IP blacklist zone, all requests to the org were blocked. (OKTA-326955)


## August

### Weekly Release 2020.08.2

| Change                                                    | Expected in Preview Orgs |
| --------------------------------------------------------- | ------------------------ |
| [Bugs fixed in 2020.08.2](#bugs-fixed-in-2020-08-2)       | August 19, 2020           |

#### Bugs fixed in 2020.08.2

* In orgs with Factor Sequencing enabled, customers always had `password` as one of the factor types in the ID token's `amr` claim, regardless of which factor was actually used. (OKTA-318437)
* For some orgs with both Passwordless Authentication and Improved New Device Behavior Detection enabled, Okta treated all authentication attempts as though they came from new devices. (OKTA-320675)


### Monthly Release 2020.08.0

| Change                                                    | Expected in Preview Orgs |
| --------------------------------------------------------- | ------------------------ |
| [Apple as an Identity Provider is now GA in Production](#apple-as-an-identity-provider-is-now-ga-in-production) | August 5, 2020 |
| [OAuth 2.0 authorization code length has been increased](#oauth-2-0-authorization-code-length-has-been-increased)| August 5, 2020 |
| [Bugs fixed in 2020.08.0](#bugs-fixed-in-2020-08-0)       | August 5, 2020           |

#### Apple as an Identity Provider is now GA in Production

Apple as an Identity Provider is now Generally Available in Production. Apple as an IdP allows users to sign in to your app using their Apple ID. See [Apple as an Identity Provider](/docs/guides/add-an-external-idp/apple/before-you-begin/). <!-- OKTA-302300 -->

#### OAuth 2.0 authorization code length has been increased

To better align with [security best practices](https://tools.ietf.org/html/rfc6819#section-5.1.4.2.2), the length of OAuth 2.0 authorization codes is now 256 bits of entropy (43 characters). <!-- OKTA-310346 -->

#### Bugs fixed in 2020.08.0

* The GET `/api/v1/users/{userid}/idps` and POST `/api/v1/idps/{idpId}/users/{userId}` endpoints weren't [OAuth](/docs/guides/implement-oauth-for-okta/scopes/) enabled. (OKTA-303902)

* Non-CORS requests to the OAuth 2.0 `/token` endpoint failed when the Okta session cookie was present. (OKTA-312816)


## July

### Weekly Release 2020.07.2

| Change                                                    | Expected in Preview Orgs |
| --------------------------------------------------------- | ------------------------ |
| [Bug fixed in 2020.07.2](#bug-fixed-in-2020-07-2)         | July 29, 2020            |

#### Bug fixed in 2020.07.2

* When using the [Apps API](/docs/reference/api/apps/), exceeding the character limit for OIDC application redirect URIs resulted in an HTTP 500 error instead of an HTTP 400 error. (OKTA-297164)


### Monthly Release 2020.07.0

| Change                                                                                                                                                      | Expected in Preview Orgs |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| [Apple as an Identity Provider is now GA in Preview](#apple-as-an-identity-provider-is-now-ga-in-preview)                                                   | July 9, 2020             |
| [YubiKey OTP Token operations added](#yubikey-otp-token-operations-added)                                                                                   | July 9, 2020             |
| [Support for creating OIN OIDC Apps via the Dynamic Client Registration API](#support-for-creating-oin-oidc-apps-via-the-dynamic-client-registration-api)   | July 9, 2020             |
| [API support for multiple ACS URLs](#api-support-for-multiple-acs-urls)                                                                                     | July 9, 2020             |
| [Bugs fixed in 2020.07.0](#bugs-fixed-in-2020-07-0)                                                                                                         | July 9, 2020             |

#### Apple as an Identity Provider is now GA in Preview

Apple as an Identity Provider is now Generally Available in Preview. Apple as an IdP allows users to sign in to your app using their Apple ID. See [Apple as an Identity Provider](/docs/guides/add-an-external-idp/apple/before-you-begin/). <!-- OKTA-302300 -->

#### YubiKey OTP Token operations added

Using the [Factors API](/docs/reference/api/factors/), requests for single YubiKey OTP Tokens and uploading a seed for a YubiKey OTP are now supported. Other API operations for YubiKey OTP Tokens are now documented in the [Factors API](/docs/reference/api/factors/). <!-- OKTA-302434 -->

#### Support for creating OIN OIDC Apps using the Dynamic Client Registration API

Creating OIN OIDC Apps using the [Dynamic Client Registration API](/docs/reference/api/oauth-clients/) is now supported. <!-- OKTA-289900 -->

#### API support for multiple ACS URLs

When [creating a custom SAML app](/docs/reference/api/apps/#add-custom-saml-application) using the [Apps API](/docs/reference/api/apps/), you can now pass two optional parameters (`allowMultipleAcsEndpoints` and `acsEndpoints`) to configure up to 100 Assertion Consumer Service (ACS) URLs. <!-- OKTA-302291 -->

#### Bugs fixed in 2020.07.0

* In certain situations, the [Identity Providers API](/docs/reference/api/idps/) returned the wrong X509 SSO endpoint. (OKTA-310023)




## June


### Weekly Release 2020.06.2

| Change                                              | Expected in Preview Orgs |
| --------------------------------------------------- | ------------------------ |
| [Bug fixed in 2020.06.2](#bug-fixed-in-2020-06-2)    | June 17, 2020            |

#### Bug fixed in 2020.06.2

After a user was demastered from Active Directory, calls to the `/users` endpoint did not reflect that change for up to 24 hours. (OKTA-294377)


### Weekly Release 2020.06.1

| Change                                              | Expected in Preview Orgs |
| --------------------------------------------------- | ------------------------ |
| [Bug fixed in 2020.06.1](#bug-fixed-in-2020-06-1)   | June 10, 2020            |

#### Bug fixed in 2020.06.1

For deleted or inactive instances, or instances that don't support CVD, calls to the `/mappings` endpoint incorrectly returned HTTP 500 errors. (OKTA-287888)



### Monthly Release 2020.06.0

| Change                                                                                                                | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------------------------|--------------------------|
| [Password Import Event eligible for use in Event Hook](#password-import-event-eligible-for-use-in-event-hook)         | June 3, 2020             |
| [OAuth public metadata endpoint caching](#oauth-public-metadata-endpoint-caching)                                     | June 3, 2020             |
| [Improved new device behavior detection](#improved-new-device-behavior-detection)                                     | June 3, 2020             |
| [Dynamic authentication context for SAML apps](#dynamic-authentication-context-for-saml-apps)                         | June 2, 2020             |
| [New JWKS key length validation](#new-jwks-key-length-validation)                                                     | June 3, 2020             |

#### Password Import Event eligible for use in Event Hook

The `user.import.password` event provides information on the outcome of the import of an individual user's password during the [Password Import flow](/docs/reference/api/users/#create-user-with-password-import-inline-hook). This event is eligible for use in an [Event Hook](/docs/concepts/event-hooks/), enabling you to trigger removal of a password from your existing user store when import to Okta is confirmed as successful. <!-- OKTA-298381 -->

#### OAuth public metadata endpoint caching

HTTP `no-cache` headers are no longer sent in responses returned by the following OAuth public metadata endpoints:

 * `/.well-known/openid-configuration`
 * `/.well-known/oauth-authorization-server`
 * `/oauth2/{authorizationServerId}/.well-known/openid-configuration`
 * `/oauth2/{authorizationServerId}/.well-known/oauth-authorization-server`
 <!-- OKTA-277596 -->
#### Improved new device behavior detection

When this feature is enabled, stronger signals are used for the detection of new devices. Devices with web browsers that don't store cookies are treated as new, and trusted applications must send a unique identifier for each device as a device token.  <!-- OKTA-297331 -->

#### Dynamic authentication context for SAML apps

You can configure a custom attribute statement for SAML assertions to send user authentication context to SAML apps during the app authentication process. Apps can use this information to limit access to certain app-specific behaviors and calculate the risk profile for the signed-in user. <!-- OKTA-297188 -->

#### New JWKS key length validation

New client JSON Web Key Sets are now validated and rejected if the key length is less than 2048 bits. <!-- OKTA-283603 -->


## May

### Weekly Release 2020.05.2

| Change                                              | Expected in Preview Orgs |
| --------------------------------------------------- | ------------------------ |
| [Bug fixed in 2020.05.2](#bug-fixed-in-2020-05-2) | May 20, 2020             |

#### Bug fixed in 2020.05.2

When listing AD and LDAP group targets for the Group admin role assigned to a user or to a group, the logo URL in the `_links` section of the response was incorrect. (OKTA-297070)


### Monthly Release 2020.05.1

| Change                                              | Expected in Preview Orgs |
| --------------------------------------------------- | ------------------------ |
| [Bugs fixed in 2020.05.1](#bugs-fixed-in-2020-05-1) | May 13, 2020             |

#### Bugs fixed in 2020.05.1

* Exceeding the rate limit on the `/token` endpoint resulted in an HTTP 400 error instead of an HTTP 429 error. (OKTA-289508)
* The IdP `/metadata.xml` endpoint was not OAuth enabled. (OKTA-294739)
* Simultaneous `DELETE` calls to the `/users/${id}` endpoint could result in HTTP 500 errors. (OKTA-223918)


### Monthly Release 2020.05.0

| Change                                                                                                                                                              | Expected in Preview Orgs |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| [Logging of successful password import](#logging-of-successful-password-import)                                                                                     | May 6, 2020              |
| [Rate limit headers no longer returned on cached static endpoints](#rate-limit-headers-no-longer-returned-on-cached-static-endpoints)                               | May 6, 2020              |
| [OAuth for Okta enabled for Trusted Origins, Sessions, and Custom Templates APIs](#oauth-for-okta-enabled-for-trusted-origins-sessions-and-custom-templates-apis)   | May 6, 2020              |
| [Updated behavior for logging of invalid use by OAuth 2.0 Client](#updated-behavior-for-logging-of-invalid-use-by-oauth-2-0-client)                                 | May 6, 2020              |
| [Bugs fixed in 2020.05.0](#bugs-fixed-in-2020-05-0)                                                                                                                 | May 6, 2020              |

#### Logging of successful password import

A System Log Event is now generated with details about the success or failure of the password import attempt when a user with an imported password has successfully signed in to Okta. <!-- OKTA-283126 -->

#### Rate limit headers no longer returned on cached static endpoints

Rate limits do not apply to these OAuth public metadata endpoints, so rate limit headers will no longer be returned:

* `/oauth2/v1/keys`
* `/.well-known/openid-configuration`
* `/.well-known/oauth-authorization-server`
* `/oauth2/{authorizationServerId}/v1/keys`
* `/oauth2/{authorizationServerId}/.well-known/openid-configuration`
* `/oauth2/{authorizationServerId}/.well-known/oauth-authorization-server`
<!-- OKTA-289849 -->

#### OAuth for Okta enabled for Trusted Origins, Sessions, and Custom Templates APIs

OAuth for Okta is now enabled for the [Trusted Origins API](/docs/reference/api/trusted-origins/), the [Sessions API](/docs/reference/api/sessions/), and the [Custom Templates API](/docs/reference/api/templates/). See [Scopes & supported endpoints](/docs/guides/implement-oauth-for-okta/scopes/). <!-- OKTA-286819 -->

#### Updated behavior for logging of invalid use by OAuth 2.0 Client

The [previously announced logging behavior](/docs/release-notes/2017/#additional-logging-for-invalid-use-by-oauth-2-0-client) has been updated. Invalid `client_secret` warnings are now triggered by 5 invalid attempts (consecutive or not) within a 24 hour period. <!-- OKTA-288030 -->

#### Bugs fixed in 2020.05.0

* When signing in a federated user using the `/oauth/v1/authorize` endpoint with consent enabled and the `prompt` parameter set to `login`, the Sign-In Widget failed with an error. (OKTA-290760)


## April

### Weekly Release 2020.04.2

| Change                                             | Expected in Preview Orgs |
|----------------------------------------------------|--------------------------|
| [Bugs fixed in 2020.04.2](#bugs-fixed-in-2020-04-2) | April 29, 2020           |

#### Bugs fixed in 2020.04.2

* Service clients weren't able to update users. (OKTA-288246)
* Returned User Type objects erroneously contained a `ref` object. (OKTA-287651)


### Weekly Release 2020.04.1

| Change                                             | Expected in Preview Orgs |
|----------------------------------------------------|--------------------------|
| [Bug fixed in 2020.04.1](#bug-fixed-in-2020-04-1) | April 15, 2020           |

#### Bug fixed in 2020.04.1

* When calling the `/oauth2/default/v1/authorize` or `/oauth2/${authServerId}/v1/authorize` endpoints with the `prompt` parameter set to `login` and the `idp` parameter set to a SAML IdP, the end user wasn't forced to authenticate. (OKTA-288118)


### Monthly Release 2020.04.0

| Change                                                                    | Expected in Preview Orgs |
| ------------------------------------------------------------------------- | ------------------------ |
| [OAuth for Okta GA in Production](#oauth-for-okta-ga-in-production)       | April 8, 2020            |
| [User Types API GA in Production](#user-types-api-ga-in-production)       | April 8, 2020            |
| [CORS headers in more API responses](#cors-headers-in-more-api-responses) | April 8, 2020            |
| [Bugs fixed in 2020.04.0](#bugs-fixed-in-2020-04-0)                       | April 8, 2020            |

#### OAuth for Okta GA in Production

[OAuth for Okta](/docs/guides/implement-oauth-for-okta/overview/) is now Generally Available in Production. <!-- OKTA-276784 -->

#### User Types API GA in Production

The [User Types API](/docs/reference/api/user-types/) is Generally Available in Production. <!-- OKTA-286349 -->

#### CORS headers in more API responses

Okta will now return CORS headers for [requests made with OAuth 2.0 Bearer tokens](/docs/guides/implement-oauth-for-okta/overview/), even if an endpoint isn't CORS-enabled and even if the originating URL isn't configured as a Trusted Origin. <!-- OKTA-266028 -->

#### Bugs fixed in 2020.04.0

* New SAML apps would have an active SAML assertion Inline Hook assigned to them automatically. (OKTA-262777)
* Attempts to update the user schema with invalid properties could return HTTP 500 errors. (OKTA-281498)
* The `errorSummary` for error E0000074 was malformed. (OKTA-273711)


## March

### Weekly Release 2020.03.2

| Change                                             | Expected in Preview Orgs |
|----------------------------------------------------|--------------------------|
| [Bugs fixed in 2020.03.2](#bugs-fixed-in-2020-03-2)| March 18, 2020           |

#### Bugs fixed in 2020.03.2

* In some cases, an OAuth 2.0 [`/authorize`](/docs/reference/api/oidc/#authorize) request would incorrectly redirect if the client App had an App Sign-On Policy configured. (OKTA-269116)

* The [`_links`](/docs/reference/api-overview/#links) attribute for `groups` sent by Okta in the request body for a SAML Inline Hook was incorrect. (OKTA-269553)

* Responses from OpenID Connect and OAuth 2.0 public metadata endpoints incorrectly omitted the return of CORS headers if the calling URL wasn't in the list of [trusted origins](/docs/reference/api/trusted-origins/) defined for the org. (OKTA-283549)

* When a Workflow was called, all headers that weren't white listed had text prepended in the response, which broke redirects. (OKTA-282294)

* In some cases, the end user wasn't correctly prompted for consent during an OAuth 2.0 `/authorize` request. (OKTA-270039)


### Weekly Release 2020.03.1

| Change                                             | Expected in Preview Orgs |
|----------------------------------------------------|--------------------------|
| [Bug fixed in 2020.03.1](#bug-fixed-in-2020-03-1) | March 11, 2020           |

#### Bug fixed in 2020.03.1

* The [Update Identity Provider](/docs/reference/api/idps/#update-identity-provider) operation allowed changing the `protocol` property of an Identity Provider object, which resulted in errors. (OKTA-277221)


### Monthly Release 2020.03.0

| Change                                              | Expected in Preview Orgs |
|-----------------------------------------------------|--------------------------|
| [Email as a factor and supported optional enrollment is Generally Available in Preview](#email-as-a-factor-and-supported-optional-enrollment-is-generally-available-in-preview)| March 4, 2020 |
| [The Third-Party admin role is Generally Available in Preview](#the-third-party-admin-role-is-generally-available-in-preview)| March 4, 2020 |
| [OAuth for Okta is Generally Available in Preview](#oauth-for-okta-is-generally-available-in-preview)| March 4, 2020 |
| [Pagination is available for the List Authorization Servers operation](#pagination-is-available-for-the-list-authorization-servers-operation)| March 4, 2020 |
| [Sign-in attempt behavior evaulation is now logged when there is no client information](#sign-in-attempt-behavior-evaluation-is-now-logged-when-there-is-no-client-information)| March 4, 2020 |
| [OAuth for Okta enabled for Schemas and Linked Objects APIs](#oauth-for-okta-enabled-for-schemas-and-linked-objects-apis)| March 4, 2020 |
| [Bugs fixed in 2020.03.0](#bugs-fixed-in-2020-03-0) | March 4, 2020        |

#### Email as a factor and supported optional enrollment is Generally Available in Preview

The Okta [email factor](/docs/reference/api/authn/#enroll-okta-email-factor) for MFA is now Generally Available in Preview. When the email factor is enabled, end users receive a code in an email message to use when they sign in. <!-- OKTA-278974 -->

The email factor configuration also supports optional enrollment, which is now Generally Available for all orgs that already have the factor enabled as part of Early Access. <!-- OKTA-274318 -->

#### The Third-Party admin role is Generally Available in Preview

The [Third-Party admin role](https://help.okta.com/en/prod/okta_help_CSH.htm#csh_admin-third) is now Generally Available in Preview. <!-- OKTA-280640 -->

#### OAuth for Okta is Generally Available in Preview

[OAuth for Okta](/docs/guides/implement-oauth-for-okta/overview/) is now Generally Available in Preview. At this time, OAuth for Okta works only with the APIs listed in the [Scopes & supported endpoints](/docs/guides/implement-oauth-for-okta/scopes/) section. We are actively working towards supporting additional APIs. Our goal is to cover all Okta public API endpoints.<!-- OKTA-276783 -->

#### Pagination is available for the List Authorization Servers operation

Pagination is now available for the [List Authorization Servers operation](/docs/reference/api/authorization-servers/#list-authorization-servers). <!-- OKTA-277098 -->

#### Sign-in attempt behavior evaluation is now logged when there is no client information

Sign-in attempt behavior evaluation is logged in the `debugContext` object of the `user.session.start` and `policy.evaluate.sign_on` events, even when client information is missing for all behaviors. <!-- OKTA-280132 -->

#### OAuth for Okta enabled for Schemas and Linked Objects APIs

The Schemas API and the Linked Objects API now have OAuth for Okta enabled. See [Scopes & supported endpoints](/docs/guides/implement-oauth-for-okta/scopes/). <!-- OKTA-278008 OKTA-277204-->

#### Bugs fixed in 2020.03.0

* Users could acquire logs before the Logs retention period using specific `after` parameters. (OKTA-277912)
* App admins were able to modify all profiles in the Profile Editor even when the admin was limited to only administer certain apps. (OKTA-267829)


## February

### Weekly Release 2020.02.2

| Change                                              | Expected in Preview Orgs |
|-----------------------------------------------------|--------------------------|
| [Bugs fixed in 2020.02.2](#bugs-fixed-in-2020-02-2) | February 26, 2020        |

#### Bugs fixed in 2020.02.2

* When the Security Question option wasn't enabled in the password policy, requests to the `/reset_password` endpoint would return a 403 error when the `sendEmail` query parameter was set to `false`. (OKTA-272392)
* Some cross-origin requests to the `/users/me` endpoint didn't return CORS headers if the user had an invalid session. (OKTA-260550)


### Weekly Release 2020.02.1

| Change                                              | Expected in Preview Orgs |
|-----------------------------------------------------|--------------------------|
| [Bugs Fixed in 2020.02.1](#bugs-fixed-in-2020-02-1) | February 19, 2020        |

#### Bugs Fixed in 2020.02.1

* When an admin's last role was revoked using the [Roles API](/docs/reference/api/roles/), it would sometimes not trigger a System Log event. (OKTA-276093)
* In certain situations the [`/keys`](/docs/reference/api/oidc/#keys) endpoint would incorrectly return that the current key was expired and needed to be rolled over when the rollover hadn't occurred yet. (OKTA-227062)
* Expired AD users received different authentication errors depending on whether the Passwordless Policy was enabled or disabled. (OKTA-268306)


### Monthly Release 2020.02.0

| Change                                                                                                                                                            | Expected in Preview Orgs |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------|
| [Password Import Inline Hook in General Availability in Preview and Production](#password-import-inline-hook-in-general-availability-in-preview-and-production) | February 5, 2020         |
| [OAuth for Okta Enabled for User Consent Grant Operations](#oauth-for-okta-enabled-for-user-consent-grant-operations)                                             | February 5, 2020         |
| [OAuth for Okta Enabled for Policy API](#oauth-for-okta-enabled-for-policy-api)                                                                                   | February 5, 2020         |
| [User Types API in General Availability in Preview](#user-types-api-in-general-availability-in-preview)                                                           | February 5, 2020         |
| [SAML Assertion Inline Hook Now Supports URI Formatting in Claims](#saml-assertion-inline-hook-now-supports-uri-formatting-in-claims)                             | February 5, 2020         |
| [Support Added in List Users API for Sort Parameters](#support-added-in-list-users-api-for-sort-parameters)                                                           | February 5, 2020         |
| [Apps API Support for Custom SAML Attribute Statements](#apps-api-support-for-custom-saml-attribute-statements)                                                   | February 5, 2020         |
| [Rate Limits for OAuth 2.0 Endpoints in Production](#rate-limits-for-oauth-2-0-endpoints-in-production)                                                                                       | n/a                      |
| [Bugs Fixed in 2020.02.0](#bugs-fixed-in-2020-02-0)                                                                                                               | February 5, 2020         |

#### Password Import Inline Hook in General Availability in Preview and Production

The [Password Import Inline Hook](/docs/reference/password-hook/) lets you interface with an external service to verify a user-supplied password when the user signs in to Okta for the first time. This supports scenarios in which users are migrated from an existing user store while allowing them to retain their passwords. <!-- OKTA-275019 -->

#### OAuth for Okta Enabled for User Consent Grant Operations

[User Consent Grant Operations](/docs/reference/api/users/#user-consent-grant-operations) now have [OAuth for Okta](/docs/guides/implement-oauth-for-okta/overview/) enabled. <!--OKTA-254864-->

#### OAuth for Okta Enabled for Policy API

The [Policy API](/docs/reference/api/policy/) now has [OAuth for Okta](/docs/guides/implement-oauth-for-okta/overview/) enabled. <!--OKTA-272595-->

#### User Types API in General Availability in Preview

The [User Types API](/docs/reference/api/user-types/) is in General Availability (GA) in Preview. <!--OKTA-275379-->

#### SAML Assertion Inline Hook Now Supports URI Formatting in Claims

Okta now supports URI claims with the [SAML Assertion Inline Hook](/docs/reference/saml-hook/). When you need to replace or add a URI claim, you must encode the claim name within the command based on the [JSON Pointer](https://tools.ietf.org/html/rfc6901) specification. <!--OKTA-266619-->

#### Support Added in List Users API for Sort Parameters

The [List Users API](/docs/reference/api/users/#list-users) now supports `sortBy` and `sortOrder` parameters on `search` queries. <!--OKTA-270214-->

#### Apps API Support for Custom SAML Attribute Statements

The [Apps API](/docs/reference/api/apps/) now supports specifying SAML attribute statements for SAML 2.0 apps. <!--OKTA-275379-->

#### Rate Limits for OAuth 2.0 Endpoints in Production

[Rate limiting](/docs/reference/rate-limits/#okta-api-endpoints-and-per-minute-limits) has been modified for OAuth 2.0 endpoints in Production orgs so that requests that use an invalid client ID don't consume the rate limit. A System Log warning has also been introduced for high rate limit consumption by requests that use a valid client ID. <!--OKTA-27534-->

#### Bugs Fixed in 2020.02.0

* When using the [SAML Assertion Inline Hook](/docs/reference/saml-hook/), if there was an optional attribute statement configured for the app and the attribute statement had no value specified, commands returned from SAML Inline Hook responses were not applied. (OKTA-263494)

* The [Update User Types API](/docs/reference/api/user-types/#update-user-type) previously allowed the existing name of a User Type to be changed. (OKTA-241788)


## January

### Weekly Release 2020.01.2

| Change                                            | Expected in Preview Orgs |
|---------------------------------------------------|--------------------------|
| [Bug Fixed in 2020.01.2](#bug-fixed-in-2020-01-2) | January 29, 2019         |

#### Bug Fixed in 2020.01.2

* Passing an incorrect `userId` to the [List User Roles API](/docs/reference/api/roles/#list-roles-assigned-to-user) would not result in an error. (OKTA-243094)


### Monthly Release 2020.01.0

| Change                                                                                  | Expected in Preview Orgs |
| --------------------------------------------------------------------------------------- | ------------------------ |
| [Rate limit warnings for all API customers](#rate-limit-warnings-for-all-api-customers) | January 8, 2020          |
| [Events API endpoint rate limit added](#events-api-endpoint-rate-limit-added)           | January 8, 2020          |
| [System Log Events for user import](#system-log-events-for-user-import)                 | January 8, 2020          |

#### Rate limit warnings for all API customers

All Customer Identity orgs will now see an admin console banner and receive an email notification when their org approaches its rate limit. Previously this was only available for One App and Enterprise orgs. <!-- OKTA-266774 -->

#### Events API endpoint rate limit added

The `/events` API endpoint now has its own rate limit bucket for Workforce orgs. See the [Rate Limits page](/docs/reference/rate-limits/#okta-api-endpoints-and-per-minute-limits) for more information. <!-- OKTA-268018 -->

#### System Log Events for user import

System Log events have been added for the start and end of each phase of the user import process. See the [Event Types catalog](/docs/reference/api/event-types/) for more information. <!-- OKTA-264709 -->
