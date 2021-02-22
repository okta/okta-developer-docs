---
title: Okta API Products Release Notes
---

## December

### Weekly Release 2019.12.1

| Change                                                | Expected in Preview Orgs |
|-------------------------------------------------------|--------------------------|
| [Bug Fixed in 2019.12.1](#bug-fixed-in-2019-12-1)     | December 18, 2019        |

#### Bug Fixed in 2019.12.1

* Okta Verify Push could be enabled using the [Factors Administration API](/docs/reference/api/factor-admin/) even when Okta Verify TOTP was inactive. (OKTA-262950)


### Monthly Release 2019.12.0

| Change                                                                                                              | Expected in Preview Orgs |
|---------------------------------------------------------------------------------------------------------------------|--------------------------|
| [Features API is Generally Available in Production](#features-api-is-generally-available-in-production)             | December 11, 2019        |
| [Token Inline Hook is Generally Available in Production](#token-inline-hook-is-generally-available-in-production)   | December 11, 2019        |
| [SAML Inline Hook is Generally Available in Production](#saml-inline-hook-is-generally-available-in-production)     | December 11, 2019        |
| [Scope Object Properties Default Values](#scope-object-properties-default-values)                                   | December 11, 2019        |
| [Okta-Hosted User Consent Dialog Change](#okta-hosted-user-consent-dialog-change)                                   | December 11, 2019        |
| [OAuth for Okta Enabled for Clear User Sessions Endpoint](#oauth-for-okta-enabled-for-clear-user-sessions-endpoint) | December 11, 2019        |
| [Bug Fixed in 2019.12.0](#bug-fixed-in-2019-12-0)                                                                   | December 11, 2019        |

#### Features API is Generally Available in Production

The [Features API](/docs/reference/api/features/) allows operations to manage self-service Early Access features in Production and Preview orgs, as well as manage self-service Beta features in Preview orgs and view Beta features in Production orgs. <!-- OKTA-259575 -->

#### Token Inline Hook is Generally Available in Production

The [Token Inline Hook](/docs/reference/token-hook/) enables you to integrate your own custom functionality into the process of minting OAuth 2.0 and OpenID Connect tokens. <!-- OKTA-244859 -->

#### SAML Inline Hook is Generally Available in Production

The [SAML Inline Hook](/docs/reference/saml-hook/) enables you to customize SAML assertions returned by Okta. You can add attributes or modify existing attributes in outbound SAML assertions. <!-- OKTA-244860 -->

#### Scope Object Properties Default Values

In Scope objects created using the [Authorization Server API](/docs/reference/api/authorization-servers/), the default values of the `displayName` and `description` properties were updated to be more informative. <!-- OKTA-242646 -->

#### Okta-Hosted User Consent Dialog Change

In OAuth 2.0 or OpenID Connect [authentication flows](/docs/guides/request-user-consent/overview/), Okta-hosted user consent dialogs were updated to display neutral colors for some UI elements. <!-- OKTA-262803 -->

#### OAuth for Okta Enabled for Clear User Sessions Endpoint

The [Clear User Sessions endpoint](/docs/reference/api/users/#clear-user-sessions) now has OAuth for Okta enabled.

#### Bug Fixed in 2019.12.0

* In the [Authorization Server API](/docs/reference/api/authorization-servers/), supplying a `consent` property was previously required when creating a Scope object in orgs that had the EA feature enabled. It is now required only when updating existing Scope objects. (OKTA-250368)


## November

### Weekly Release 2019.11.3

| Change                                             | Expected in Preview Orgs |
| -------------------------------------------------- | ------------------------ |
| [Bugs Fixed in 2019.11.3](#bugs-fixed-in-2019-11-3)| December 4, 2019         |

#### Bugs Fixed in 2019.11.3

* POST calls to the `/api/v1/apps` endpoint couldn't be used with [OAuth for Okta](/docs/guides/implement-oauth-for-okta/overview/). (OKTA-259867)

* In some situations, ID tokens returned from Okta didn't contain the `idp` claim. (OKTA-253962)

### Weekly Release 2019.11.2

| Change                                            | Expected in Preview Orgs |
| ------------------------------------------------- | ------------------------ |
| [Bug Fixed in 2019.11.2](#bug-fixed-in-2019-11-2) | November 20, 2019        |

#### Bug Fixed in 2019.11.2

Multifactor (MFA) Enrollment Policy [objects](/docs/reference/api/policy/#multifactor-mfa-enrollment-policy) returned by Okta included an unused property, `enroll.profiles`. (OKTA-260160)


### Weekly Release 2019.11.1

| Change                                            | Expected in Preview Orgs |
| ------------------------------------------------- | ------------------------ |
| [Bug Fixed in 2019.11.1](#bug-fixed-in-2019-11-1) | November 13, 2019        |

#### Bug Fixed in 2019.11.1

An incorrect status was returned in some cases when an admin checked another user's session information using the [Sessions API](/docs/reference/api/sessions/). (OKTA-245793)


### Monthly Release 2019.11.0

| Change                                                                                                                | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------------------------|--------------------------|
| [Web Authentication as a factor is Generally Available in Production](#web-authentication-as-a-factor-is-generally-available-in-production)       | November 6, 2019         |
| [Features API is Generally Available in Preview](#features-api-is-generally-available-in-preview)            | November 6, 2019         |
| [SAML Inline Hook is Generally Available in Preview](#saml-inline-hook-is-generally-available-in-preview)  | November 6, 2019         |
| [Token Inline Hook is Generally Available in Preview](#token-inline-hook-is-generally-available-in-preview) | November 6, 2019         |
| [OAuth for Okta is Early Access in Preview](#oauth-for-okta-is-early-access-in-preview)                       | November 6, 2019         |
| [Concurrent requests to the same app now return exception](#concurrent-requests-to-the-same-app-now-return-exception)| November 6, 2019|
| [Rate Limits for /oauth2 endpoints](#rate-limits-for-oauth2-endpoints)                                               | November 6, 2019         |
| [Bug Fixed in 2019.11.0](#bug-fixed-in-2019-11-0)                                                                   | November 6, 2019         |

#### Web Authentication as a factor is Generally Available in Production

Admins can enable [Web Authentication as a factor](/docs/reference/api/authn/#enroll-webauthn-factor) (WebAuthn) as defined by WebAuthn standards. WebAuthn supports both security key authentication such as YubiKey devices and platform authenticators such as Windows Hello. <!-- OKTA-254507 -->

#### Features API is Generally Available in Preview

The [Features API](/docs/reference/api/features/) provides operations to manage self-service Early Access features in your Production and Preview orgs and self-service Beta features in your Preview org. <!-- OKTA-258109 -->

#### SAML Inline Hook is Generally Available in Preview

The [SAML Inline Hook](/docs/reference/saml-hook/) enables you to customize SAML assertions returned by Okta. You can add attributes or modify existing attributes in outbound SAML assertions. <!-- OKTA-244856 -->

#### Token Inline Hook is Generally Available in Preview

The [Token Inline Hook](/docs/reference/token-hook/) enables you to integrate your own custom functionality into the process of minting OAuth 2.0 and OpenID Connect tokens. <!-- OKTA-244855 -->

#### OAuth for Okta is Early Access in Preview

With OAuth for Okta, you are able to interact with Okta APIs using scoped OAuth 2.0 access tokens. Each access token enables the bearer to perform specific actions on specific Okta endpoints, with that ability controlled by which scopes the access token contains. For more details, see our [OAuth for Okta](/docs/guides/implement-oauth-for-okta/) guide. <!-- OKTA-251943 -->

#### Concurrent requests to the same app now return exception

Concurrent PUT requests sent to the same app instance now return an `ApiException` rather than a 500 HTTP server error. <!-- OKTA-215949 -->

#### Rate Limits for /oauth2 endpoints

[Rate limiting](https://developer.okta.com/docs/reference/rate-limits/) has been modified for `/oauth2` endpoints so that requests that use an invalid client ID don't consume rate limit. Additionally, a System Log warning has been introduced to provide notification of high rate limit consumption by requests that use a valid client ID. <!-- OKTA-241945 -->

#### Bug Fixed in 2019.11.0

When the Token Inline Hook feature was enabled and the claim couldn't be evaluated, the OAuth 2.0 token endpoint returned a 403 HTTP status code rather than 400. (OKTA-258981)


## October

### Weekly Release 2019.10.2

| Change                                                              | Expected in Preview Orgs |
|---------------------------------------------------------------------|--------------------------|
| [User Types Error Message Change](#user-types-error-message-change) | October 31, 2019         |
| [Bugs Fixed in 2019.10.2](#bugs-fixed-in-2019-10-2)                 | October 31, 2019         |

#### User Types Error Message Change

Error messages returned by the [User Types API](/docs/reference/api/user-types/) have changed. Omitting display name or variable name when attempting to create a User Type, or specifying a variable name that is already in use, results in a more specific error message being returned. <!-- OKTA-241017 -->

#### Bugs Fixed in 2019.10.2

* A `SameSite=None` attribute sent by Okta caused a bug in cross-site handling of cookies in Chrome on iOS 12.* or earlier. (OKTA-254174)
* In the [Features API](/docs/reference/api/features/), when using `mode=force` to enable a feature and its dependencies, email notifications were not sent to admins for Beta dependencies that were enabled. (OKTA-249644)
* The length of EL expressions that you could specify for [OAuth 2.0 claim values](/docs/reference/api/authorization-servers/#claim-operations) was previously limited to a shorter length but has now been increased to 1024 characters. (OKTA-237675)


### Weekly Release 2019.10.1

| Change                                                                                                            | Expected in Preview Orgs |
|-------------------------------------------------------------------------------------------------------------------|--------------------------|
| [Maximum characters increased for the UserAgent string](#maximum-characters-increased-for-the-useragent-string)     | October 16, 2019         |

#### Maximum characters increased for the UserAgent string

The maximum length of the `client.userAgent.rawUserAgent` property value was increased from 200 to 500 characters. See [UserAgent Object](https://developer.okta.com/docs/reference/api/system-log/#useragent-object) in the `/logs` API reference content for more information on this property.


### Monthly Release 2019.10.0

| Change                                                                                                        | Expected in Preview Orgs |
|---------------------------------------------------------------------------------------------------------------|--------------------------|
| [Event Hooks API is Generally Available](#event-hooks-api-is-generally-available)                              | October 9, 2019        |
| [User Types API in Early Access](#user-types-api-in-early-access)                              | October 9, 2019        |
| [Tokens transform events no longer available](#tokens-transform-events-no-longer-available)                              | October 9, 2019        |
| [Cookies updated to preserve cross-functionality](#cookies-updated-to-preserve-cross-functionality)                              | October 9, 2019        |
| [App Condition available for Enroll Policy](#app-condition-available-for-enroll-policy)                              | October 9, 2019        |
| [Bugs Fixed in 2019.10.0](#bugs-fixed-in-2019-10-0)                                                           | October 9, 2019        |

#### Event Hooks API is Generally Available

The [Event Hooks API](/docs/reference/api/event-hooks/) is Generally Available (GA) in Production.

#### User Types API in Early Access

The [User Types API](/docs/reference/api/user-types/) is in Early Access (EA) in both Preview and Production. <!-- OKTA-251182 -->

#### Tokens transform events no longer available

Tokens transform System Log [events](/docs/reference/api/event-types/) will no longer fire for SAML and Token Inline Hooks. They have been replaced by Inline Hook events.  <!-- OKTA-249601 -->

#### Cookies updated to preserve cross-functionality

To preserve cross-site functionality, Okta now adds the `SameSite=None` attribute to all relevant cookies when the client browser is Firefox 69 or above. Previously this was enabled only for Chrome 76 and above. <!-- OKTA-248255 -->

#### App Condition available for Enroll Policy

App Condition is now available for the [Enroll Policy](/docs/reference/api/policy/#multifactor-mfa-enrollment-policy).

#### Bugs Fixed in 2019.10.0

* WebAuthn Factors could not be verified using the [Factors API](/docs/reference/api/factors/). (OKTA-228239)
* During OAuth 2 and OIDC sign-in flows, the Okta Sign-In Widget incorrectly rendered pre-populated usernames, substituting `+` with a space. (OKTA-235187)


## September


### Weekly Release 2019.09.4

| Change                                                                             | Expected in Preview Orgs |
|------------------------------------------------------------------------------------|--------------------------|
| [Scope Naming Restriction](#scope-naming-restriction)                                  | October 2, 2019       |

#### Scope Naming Restriction

OAuth Scopes are not allowed to start with the `okta.` prefix. See the Note under [Scope properties](/docs/reference/api/authorization-servers/#scope-properties) for more information. <!-- OKTA-212397 -->



### Weekly Release 2019.09.3

| Change                                                                             | Expected in Preview Orgs |
|------------------------------------------------------------------------------------|--------------------------|
| [Bug Fixed in 2019.09.3](#bug-fixed-in-2019-09-3)                                  | September 25, 2019       |

#### Bug Fixed in 2019.09.3

* After a user successfully scanned the QR code and completed the MFA enrollment process, the `factorResult` [parameter](/docs/reference/api/factors/) was missing from the response. (OKTA-244102)


### Weekly Release 2019.09.2

| Change                                                                             | Expected in Preview Orgs |
|------------------------------------------------------------------------------------|--------------------------|
| [Bugs Fixed in 2019.09.2](#bugs-fixed-in-2019-09-2)                                  | September 18, 2019       |

#### Bugs Fixed in 2019.09.2

* When users signed in using IdP Discovery or a Default IdP, any [outgoing Hooks](/docs/reference/token-hook/#sample-json-payload-of-a-request) related to that sign-in event contained an incorrect request URL `value`. (OKTA-243190)
* `GET` requests to the `/users/me` [endpoint](/docs/reference/api/users/#get-current-user) would return hidden standard attributes. (OKTA-243864)


### Monthly Release 2019.09.0

| Change                                                                                                        | Expected in Preview Orgs |
|---------------------------------------------------------------------------------------------------------------|--------------------------|
| [Features API is Early Access EA in Preview and Production](#features-api-is-ea)                              | September 4, 2019        |
| [Mappings API is now Generally Available (GA) in Production](#mappings-api-is-now-ga-in-production)           | September 4, 2019        |
| [Error Object in SAML Assertion Inline Hook](#error-object-in-saml-assertion-inline-hook)                     | September 4, 2019        |
| [Rate Limits for Authorization Server Public Metadata](#rate-limits-for-authorization-server-public-metadata) | September 4, 2019        |
| [Bugs Fixed in 2019.09.0](#bugs-fixed-in-2019-09-0)                                                             | September 4, 2019        |

#### Features API is Early Access (EA) in Preview and Production

The [Features API](/docs/reference/api/features/) provides operations to manage self-service features in your Production and Preview orgs and Beta features in your Preview org. <!-- OKTA-241445 -->

#### Mappings API is now Generally Available (GA) in Production

The Okta Mappings API provides operations to manage the mapping of properties between an Okta User's and an App User's
[Profile Properties](/docs/reference/api/users/#profile-object) using [Expression Language](/docs/reference/okta-expression-language). This feature is now GA in Production. <!-- OKTA-241945 -->

#### Error Object in SAML Assertion Inline Hook

For the [SAML Assertion Inline Hook](/docs/reference/saml-hook/), if an external service returns an `error` object, Okta now denies the SAML request and redirects the end user to an error page that displays the text string sent in `error.errorSummary`. <!-- OKTA-195167 -->

#### Rate Limits for Authorization Server Public Metadata

The public metadata endpoints for Authorization Servers are now each assigned separate rate limits, which are not shared with other endpoints. <!-- OKTA-226100 -->

#### Bugs Fixed in 2019.09.0

* Responses from the [`GET /groups/rules`](/docs/reference/api/groups/#get-group-rule) API included deleted groups in the `assignUserToGroups.groupIds` property. (OKTA-242994)

* Calls to the [`/users/${userid}/lifecycle/deactivate`](/docs/reference/api/users/#deactivate-user) endpoint could time out when deactivating a user with an extraordinarily high number of app assignments. (OKTA-228031)


## August

### Weekly Release 2019.08.3

| Change                                                                                         | Expected in Preview Orgs |
|------------------------------------------------------------------------------------------------|--------------------------|
| [Bugs Fixed in 2019.08.3](#bugs-fixed-in-2019-08-3)                                            | August 29, 2019          |

#### Bugs Fixed in 2019.08.3

* The [Update Inline Hook call](/docs/reference/api/inline-hooks/#update-inline-hook) wasn't replacing the whole object. (OKTA-229337)

* IP addresses identified as malicious by Okta ThreatInsight were missing from Events API ("security.threat.detected") event messages. See the [Event Types catalog](/docs/reference/api/event-types/#catalog) for more information on this event message. (OKTA-242795)


### Weekly Release 2019.08.2

| Change                                                                                                   | Expected in Preview Orgs |
|----------------------------------------------------------------------------------------------------------|--------------------------|
| [Bug Fixed in 2019.08.2](#bug-fixed-in-2019-08-2)                                                        | August 21, 2019          |

#### Bug Fixed in 2019.08.2

Paginated responses from the [List Users with Search](/docs/reference/api/users/#list-users-with-search) API were limited to a total of 50,000 results, and following the `next` link after that limit yielded an error. (OKTA-220619)


### Weekly Release 2019.08.1

| Change                                                                                                   | Expected in Preview Orgs |
|----------------------------------------------------------------------------------------------------------|--------------------------|
| [Bug Fixed in 2019.08.1](#bug-fixed-in-2019-08-1)                                                        | August 14, 2019          |

#### Bug Fixed in 2019.08.1

Some users were not able to access the Group Rules API, despite having proper permissions. (OKTA-240021)



### Monthly Release 2019.08.0

| Change                                                                                                   | Expected in Preview Orgs |
|----------------------------------------------------------------------------------------------------------|--------------------------|
| [Added Support for TOTP Factor](#added-support-for-totp-factor)                                          | August 7, 2019           |
| [Cookies updated to preserve cross-site functionality](#cookies-updated-to-preserve-cross-site-functionality)| August 7, 2019           |
| [Inline Hooks is now GA in Preview](#inline-hooks-is-now-ga-in-preview)                                  | August 7, 2019           |
| [LinkedIn API V2 is now supported](#linkedin-api-v2-is-now-supported)                                    | August 7, 2019           |
| [Mappings API is now GA in Preview](#mappings-api-is-now-ga-in-preview)                                  | August 7, 2019           |
| [Missing type property now returns a 400 error code](#missing-type-property-now-returns-a-400-error-code)| August 7, 2019           |
| [Bug Fixed in 2019.08.0](#bug-fixed-in-2019-08-0)                                                        | August 7, 2019           |

#### Added Support for TOTP Factor

Okta now supports a custom MFA factor based on the Time-based One-time Password (TOTP) algorithm. For more information, see [Custom HOTP Factor](/docs/reference/api/factors/#enroll-custom-hotp-factor). <!-- OKTA-236375 -->

#### Cookies updated to preserve cross-site functionality

To preserve cross-site functionality in light of upcoming updates to [Chrome](https://www.chromestatus.com/feature/5088147346030592), Okta has added the `SameSite=None` attribute to all relevant cookies. <!-- OKTA-229541 -->

#### Inline Hooks is now GA in Preview

[Inline Hooks](/docs/concepts/inline-hooks/) enable you to integrate your own custom functionality into Okta process flows. The framework to support them is now Generally Available (GA) in Preview. <!-- OKTA-241104 -->

#### LinkedIn API V2 is now supported

Okta now supports LinkedIn API V2. Creation of [LinkedIn Identity Providers](/docs/guides/add-an-external-idp/linkedin/create-an-app-at-idp/) has been re-enabled in all Production orgs. <!-- OKTA-237649 -->

#### Mappings API is now GA in Preview

The Okta Mappings API provides operations to manage the mapping of properties between an Okta User's and an App User's
[Profile Properties](/docs/reference/api/users/#profile-object) using [Expression Language](/docs/reference/okta-expression-language). This feature is now GA in Preview. <!-- OKTA-241748 -->

#### Missing type property now returns a 400 error code

If you create an [IP network zone](/docs/reference/api/zones/#ip-zone-properties) without a `type` property for an IP field, PUT or POST requests made to the Zone API now return a 400 error code. <!-- OKTA-239170 -->

#### Bug Fixed in 2019.08.0

In the Update User API, when the `secondEmail` attribute in a user's profile was updated with an empty value (instead of `null`), the user was incorrectly prompted for `secondEmail`. (OKTA-240382)



## July


### Weekly Release 2019.07.2

| Change                                                                                             | Expected in Preview Orgs |
|----------------------------------------------------------------------------------------------------|--------------------------|
| [Deleting App Groups](#deleting-app-groups)                 | July 31, 2019            |
| [Bug Fixed in 2019.07.2](#bug-fixed-in-2019-07-2)           | July 31, 2019            |

#### Deleting App Groups

The `DELETE /groups/${groupId}` [endpoint](/docs/reference/api/groups/#remove-group) now supports deleting app groups, in addition to Okta groups. Note, however, that groups configured for group push cannot be deleted. <!-- OKTA-214275 -->

#### Bug Fixed in 2019.07.2

* When [API Access Management](/docs/concepts/api-access-management/) Consent was enabled, the factor lifetime configured in the App Sign On Rule was ignored and the "Do not challenge me on this device for XXX" prompt didn't appear to the end user when signing in to an [OpenID application](/docs/concepts/oauth-openid/). (OKTA-2233290)


### Monthly Release 2019.07.0

| Change                                                                                             | Expected in Preview Orgs |
|----------------------------------------------------------------------------------------------------|--------------------------|
| [Email Factor is now GA in Production](#email-factor-is-now-ga-in-production) | July 10, 2019             |
| [LinkedIn IdP creation re-enabled in Preview](#linkedin-idp-creation-re-enabled-in-preview) | July 10, 2019             |
| [Email Customization disabled for free orgs](#email-customization-disabled-for-free-orgs) | July 10, 2019             |

#### Email Factor is now GA in Production

The [Email Factor](/docs/reference/api/factors/#enroll-okta-email-factor) is now Generally Available (GA) in all Production orgs. <!-- OKTA-231156 -->

#### LinkedIn IdP creation re-enabled in Preview

Creation of [LinkedIn Identity Providers](/docs/guides/add-an-external-idp/linkedin/create-an-app-at-idp/) has been re-enabled in all Preview orgs. <!-- OKTA-226772 -->

#### Email Customization disabled for free orgs

To curtail phishing, free editions of Okta are no longer able to create and send customized email templates. For feature information, see [Email and SMS Options](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Settings_Email).


## June

### Weekly Release 2019.06.4

| Change                                                                                             | Expected in Preview Orgs |
|----------------------------------------------------------------------------------------------------|--------------------------|
| [Token expiration window increased to five years](#token-expiration-window-increased-to-five-years)| July 3, 2019             |
| [Bug Fixed in 2019.06.4](#bug-fixed-in-2019-06-4)                                                  | July 3, 2019             |

#### Token expiration window increased to five years

The [refresh token expiration window](/docs/reference/api/authorization-servers/#rule-properties) has increased to a maximum of five years in custom authorization servers. <!-- OKTA-207202 -->

#### Bug Fixed in 2019.06.4

* The SystemLog V1 [event type](/docs/reference/api/event-types/) `security.password_spray.detected` has been deprecated. For threat related information, see `security.threat.detected` events. (OKTA-233958)


### Weekly Release 2019.06.3

| Change                                                                                                                      | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------------------------------|--------------------------|
| [Token Inline Hook Can Modify Sub-Objects and Array Elements](#token-inline-hook-can-modify-sub-objects-and-array-elements) | June 26, 2019            |
| [Bugs Fixed in 2019.06.3](#bugs-fixed-in-2019-06-3)                                                                         | June 26, 2019            |

#### Token Inline Hook Can Modify Sub-Objects and Array Elements

The [Token Inline Hook](/docs/reference/token-hook/) now lets you modify particular sub-objects or array elements within objects contained in claims, without needing to update the rest of the object. <!-- OKTA-227364 -->

#### Bugs Fixed in 2019.06.3

* When a customer used a [Token Inline Hook](/docs/reference/token-hook/) and returned an `error` object to Okta, Okta failed to pass the error to the token requester. (OKTA-231397)

* The issuer claim inside JWT tokens was erroneously changing to all lowercase causing JWT verification failure when the application was case-sensitive. (OKTA-235710)

* When a customer called the `POST /idps/credentials/keys` endpoint and supplied an `x5t#S256` parameter to specify the SHA-256 thumbprint of the certificate that they were adding, Okta failed to validate the thumbprint.


### Monthly Release 2019.06.0

| Change                                                                                                                                        | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------------------------------------------------|--------------------------|
| [Email Factor is now GA in Preview](#email-factor-is-now-ga-in-preview) | June 5, 2019             |
| [Users can be removed from Profile Masters](#users-can-be-removed-from-profile-masters)| June 5, 2019 |

#### Email Factor is now GA in Preview

The [Email Factor](/docs/reference/api/factors/#enroll-okta-email-factor) is now Generally Available (GA) in all Preview orgs. <!-- OKTA-227761 -->

#### Users can be removed from Profile Masters

Users can now be [unassigned](/docs/reference/api/apps/#remove-user-from-application) from Apps that serve as their Profile Masters. <!-- OKTA-227994 -->


## May

### Weekly Release 2019.05.3

| Change                                                                                                                                        | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------------------------------------------------|--------------------------|
| [Token Inline Hook Can Modify or Remove Existing Claims (Early Access)](#token-inline-hook-can-modify-or-remove-existing-claims-early-access) | May 29, 2019             |
| [Bugs Fixed in 2019.05.3](#bugs-fixed-in-2019-05-3)                                                                                           | May 29, 2019             |

#### Token Inline Hook Can Modify or Remove Existing Claims (Early Access)

The [Token Inline Hook](/docs/reference/token-hook/) now supports changing or removing existing claims in tokens minted by the Okta Custom Authorization Server. <!-- (OKTA-218305) -->

#### Bugs Fixed in 2019.05.3

* Responses from the `GET /groups/rules` [API](/docs/reference/api/groups/#list-group-rules) failed to include a link to the next page of results in cases where there was more than one page. (OKTA-221434)

* Calls to the `/authorize` endpoint during the Authorization Code with PKCE flow would fail if an `idp` parameter was supplied with the call (in Preview orgs only). (OKTA-229808)


### Weekly Release 2019.05.2

| Change                                                                                                       | Expected in Preview Orgs |
|--------------------------------------------------------------------------------------------------------------|--------------------------|
| [Bug Fixed in 2019.05.2](#bug-fixed-in-2019-05-2)                                                          | May 22, 2019              |

#### Bug Fixed in 2019.05.2

* The response ID of the User Schema API wasn't consistent with the actual server details. When a request was sent to `GET/URL/api/v1/meta/schemas/user/default` from a preview org, the response ID always contained a production org URL. (OKTA-218937)


### Weekly Release 2019.05.1

| Change                                                                                                       | Expected in Preview Orgs |
|--------------------------------------------------------------------------------------------------------------|--------------------------|
| [Bugs Fixed in 2019.05.1](#bugs-fixed-in-2019-05-1)                                                          | May 15, 2019              |

#### Bugs Fixed in 2019.05.1

* When trusted apps overrode the device token, device fingerprints were lost. This caused unexpected behavior for new sign-on notification emails and device-based behavior detection. (OKTA-226646)
* When a Group admin (who manages more than 1 user group) used the API to fetch users with pagination, the request failed to create a link for the next page of users. (OKTA-222660)


### Monthly Release 2019.05.0

| Change                                                                                                       | Expected in Preview Orgs |
|--------------------------------------------------------------------------------------------------------------|--------------------------|
| [The Registration Inline Hook is in Early Access (EA)](#the-registration-inline-hook-is-in-early-access-ea) | May 8, 2019              |
| [Bugs Fixed in 2019.05.0](#bugs-fixed-in-2019-05-0)                                                          | May 8, 2019              |

#### The Registration Inline Hook is in Early Access (EA)

The [Registration Inline Hook](/docs/reference/registration-hook/) allows you to integrate your own custom logic into Okta's Self-Service Registration flow. <!-- (OKTA-215773) -->

#### Bugs Fixed in 2019.05.0

* Assigning an admin role directly to a user failed if that user was part of a group with the same admin role assignment. (OKTA-223035)
* The [List Users with Search](/docs/reference/api/users/#list-users-with-search) API returned outdated user data. (OKTA-215187)


## April

### Weekly Release 2019.04.2

| Change                                                                                                            | Expected in Preview Orgs |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------ |
| [Hashed Password Imports with SHA-512 Algorithm](#hashed-password-imports-with-sha-512-algorithm)                 | May 1, 2019              |
| [Bugs Fixed in 2019.04.2](#bugs-fixed-in-2019-04-2)                                                                 | May 1, 2019              |

#### Hashed Password Imports with SHA-512 Algorithm

You can use the SHA-512 hash type when [importing passwords](/docs/reference/api/users/#create-user-with-imported-hashed-password). <!-- (OKTA-220300) -->

#### Bugs Fixed in 2019.04.2

* Concurrent requests to modify the same app instance would result in an HTTP 500 error. (OKTA-205283)
* Responses from the `/oauth2/${authServerId}/.well-known/oauth-authorization-server` and `/oauth2/${authServerId}/.well-known/openid-configuration` endpoints for Custom Authorization Servers would append a query parameter (`client_id`) to the value returned for the `jwks_uri` property. Inclusion of the query parameter was misleading because you cannot use the query parameter when calling the JWKS URI. (OKTA-217289)


### Weekly Release 2019.04.1

| Change                                                                                                            | Expected in Preview Orgs |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------ |
| [The Event Hooks Feature is Now Available in EA](#the-event-hooks-feature-is-now-available-in-ea)                   | April 17, 2019           |
| [Bug Fixed in 2019.04.1](#bug-fixed-in-2019-04-1)                                                                 | April 17, 2019           |

#### The Event Hooks Feature is Now Available in EA

[Event hooks](/docs/concepts/event-hooks/) enable you to use events within your Okta org to trigger process flows within your own software systems. <!-- (OKTA-209169) -->

#### Bug Fixed in 2019.04.1

The applicable rate limit wasn't updated when the URL for the factor verification endpoint was changed. For more details, see our [Rate Limits](/docs/reference/rate-limits/#okta-api-endpoints-and-per-minute-limits) page. (OKTA-219067)




### Monthly Release 2019.04.0

| Change                                      | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------------------------|--------------------------|
| [IdP Extensible Matching Rules are now GA in Preview](#idp-extensible-matching-rules-are-now-ga-in-preview)| April 10, 2019  |
| [The SAML Inline Hook is in EA](#the-saml-inline-hook-is-in-ea)           | April 10, 2019  |
| [Rate Limits Updated](#rate-limits-updated)                               | April 10, 2019  |
| [The Sign-In Widget Version for the Custom Login Page has been Updated](#the-sign-in-widget-version-for-the-custom-login-page-has-been-updated)    | April 10, 2019  |
| [Bug Fixed in 2019.04.0](#bug-fixed-in-2019-04-0)                         | April 10, 2019  |

#### IdP Extensible Matching Rules are now GA in Preview

IdP extensible matching rules allow you to define a regular expression pattern to filter untrusted IdP usernames. For details, see our [IdPs](/docs/reference/api/idps/#subject-policy-object/) page. <!-- OKTA-177544 -->

#### The SAML Inline Hook is in EA

The SAML Inline Hook enables you to customize SAML assertions returned by Okta. For details, see our [SAML Inline Hook](/docs/reference/saml-hook/) page. <!-- OKTA-211665 and OKTA-2202004 -->

#### Rate Limits Updated

Okta's API rate limits have been updated:

* OAuth 2 rate limits were updated and clarified for all orgs.
* The limit for the `api/v1/apps endpoint` was updated for Enterprise orgs. For details, see our [Rate Limits](/docs/reference/rate-limits/#okta-api-endpoints-and-per-minute-limits/) page. <!-- OKTA-217272 & OKTA-217213 -->

#### The Sign-In Widget Version for the Custom Login Page has been Updated

Custom Sign-in Pages can now use Sign-In Widget version 2.18. When you select the "latest" option, you automatically use 2.18. For more information, see our [Sign-In Widget](/code/javascript/okta_sign-in_widget/) page. <!-- OKTA-2206539 -->

#### Bug Fixed in 2019.04.0

IdPs did not match the user with the `USERNAME_OR_EMAIL` property when `IDP_EXTENSIBLE_MATCHING_RULES` was enabled. For details, see our [IdPs](/docs/reference/api/idps/#subject-policy-object/) page. (OKTA-218007)


## March

### Weekly Release 2019.03.3

| Change                                                                                                                  | Expected in Preview Orgs |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| [Bugs Fixed in 2019.03.3](#bugs-fixed-in-2019-03-3)                                                                       | March 26, 2019           |

#### Bugs Fixed in 2019.03.3

* When [Creating a User with Imported Hashed Password](/docs/reference/api/users/#create-user-with-imported-hashed-password), if the hash algorithm was SHA-256, the operation previously required a salt to be provided. (OKTA-214183)



### Weekly Release 2019.03.2

| Change                                                                                                                                 | Expected in Preview Orgs |
| -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| [PKCE for Browser Clients, CORS Headers for OAuth 2 Token Endpoint](#pkce-for-browser-clients-cors-headers-for-oauth-2-token-endpoint) | March 20, 2019           |
| [Bugs Fixed in 2019.03.2](#bugs-fixed-in-2019-03-2)                                                                                      | March 20, 2019           |

#### PKCE for Browser Clients, CORS Headers for OAuth 2 Token Endpoint

Okta now supports Proof Key for Code Exchange (PKCE) for browser clients and returns CORS headers on the OAuth 2.0 Token endpoints.

#### Bugs Fixed in 2019.03.2

* Under some circumstances, users in a locked out state would receive success responses from the SMS recovery API. (OKTA-207288)
* In some instances, users who were not Okta-mastered would have inaccurate `passwordChanged` values in API responses. (OKTA-210233)
* SAML applications created through the API would not save the value for the `HonorForceAuthn` property. (OKTA-209083)
* For SAML applications, the `attributeStatements` object would not update if a `null` value was passed as part of a PUT operation. (OKTA-209767)


### Weekly Release 2019.03.1

> **Note:** Okta has changed our release model and version numbering. For more information, see here: <https://support.okta.com/help/s/article/New-Okta-Release-Model>

| Change                                                                 | Expected in Preview Orgs |
|----------------------------------------------------------------------- | ------------------------ |
| [Bug Fixed in 2019.03.1](#bug-fixed-in-2019-03-1)                        | March 13, 2019         |
| [Previously Released Early Access Features 2019.03.1 Update](#previously-released-early-access-features-2019-03-1-update) | Available Now            |

#### Bug Fixed in 2019.03.1

* The Hypertext Application Language links for the inlineHooks API response objects referred to an invalid URL. (OKTA-1211982)

#### Previously Released Early Access Features 2019.03.1 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |


### Monthly Release 2019.03.0

> **Note:** Okta has changed our release model and version numbering. For more information, see: <https://support.okta.com/help/s/article/New-Okta-Release-Model>

| Change                                      | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------------------------|--------------------------|
| [Password Import Supports SHA-1 and MD5](#password-import-supports-sha-1-and-md5)                       | March 6, 2019  |
| [Enable Role Assignment to Every Member of a Group](#enable-role-assignment-to-every-member-of-a-group) | March 6, 2019  |
| [New Rate Limits for /users/me](#new-rate-limits-for-usersme)                                         | March 6, 2019  |
| [Generic OIDC IdP is now GA in Preview](#generic-oidc-idp-is-now-ga-in-preview)                         | March 6, 2019  |
| [User Search is now GA in Production](#user-search-is-now-ga-in-production)                             | March 6, 2019  |
| [The Import Inline Hook is in EA](#the-import-inline-hook-is-in-ea)                                     | March 6, 2019  |
| [Previously Released Early Access Features 2019.03.0 Update](#previously-released-early-access-features-2019-03-0-update) | Available Now   |

#### Password Import Supports SHA-1 and MD5

The Create/Update User API now supports importing users with SHA-1 and MD5 credentials. For more information, see our [Users page](/docs/reference/api/users/#hashed-password-object). <!--OKTA-204369 and OKTA-201688-->

#### Enable Role Assignment to Every Member of a Group

Super and Org Admins can now assign and unassign roles to every user in a group using the APIs. For more information, see our [Roles page](/docs/reference/api/roles/#assign-role-to-group). <!--OKTA-207759 and OKTA-207768-->

#### New Rate Limits for /users/me

The rate limits for the `/users/me` endpoint have been updated. For more information, see our [Rate Limits page](/docs/reference/rate-limits/#org-wide-rate-limits-legacy-orgs). <!--OKTA-205776-->

#### Generic OIDC IdP is now GA in Preview

Generic OpenID Connect allows users to sign in to an Okta org using their credentials from their existing account at an OIDC Identity Provider. A generic OIDC IdP can be a third-party IdP that supports OIDC, such as Salesforce or Yahoo or your own custom IdP. You can also configure federation between Okta orgs using OIDC as a replacement for SAML. For more information, see [Federate Okta with OpenID Connect](/docs/guides/add-an-external-idp/openidconnect/before-you-begin/). <!--OKTA-202447-->

#### User Search is now GA in Production

Extended search capabilities for the `/users` endpoint is now Generally Available. For more information, see our [Users page](/docs/reference/api/users/#list-users-with-search). <!--OKTA-210189-->

#### The Import Inline Hook is in EA

The [Import Inline Hook](/docs/reference/import-hook/) enables you to add custom logic to the process of importing new users into Okta from an app. <!--OKTA-211788-->

#### Previously Released Early Access Features 2019.03.0 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |


## February

### Monthly Release 2019.02.0

> **Note:** Okta has changed our release model and version numbering. For more information, see here: <https://support.okta.com/help/s/article/New-Okta-Release-Model>

| Change                                                                                                                  | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Imported Hashed User Passwords Generally Available](#imported-hashed-user-passwords-generally-available)               | February 6, 2019         | March 11, 2019                               |
| [Inline Hooks](#inline-hooks)                                                                                           | February 6, 2019         | February 19, 2019                            |
| [Token Inline Hook](#token-inline-hook)                                                                                 | February 6, 2019         | February 19, 2019                            |
| [Signature and Digest Algorithms for Template WS-FED Apps](#signature-and-digest-algorithms-for-template-ws-fed-apps)   | February 6, 2019         | February 19, 2019                            |
| [Google Integration Updated](#google-integration-updated)                                                               | February 6, 2019         | February 19, 2019                            |
| [High Capacity Rate Limits](#high-capacity-rate-limits)                                                                 | February 6, 2019         | February 19, 2019                            |
| [Creation of LinkedIn IdPs Temporarily Disabled](#creation-of-linkedin-idps-temporarily-disabled)                       | February 14, 2019        | February 19, 2019                            |
| [Bug Fixed in 2019.02.0](#bug-fixed-in-2019-02-0)                                                                         | February 6, 2018         | February 19, 2019                            |
| [Previously Released Early Access Features 2019.02.0 Update](#previously-released-early-access-features-2019-02-0-update) | Available Now            | Available Now                                |

#### Imported Hashed User Passwords Generally Available

Use of imported hashed passwords when creating or updating users in the [Users API](/docs/reference/api/users) is now Generally Available (GA). <!--OKTA-205592-->

#### Inline Hooks

[Inline Hooks](/docs/concepts/inline-hooks/) enable you to integrate your own custom functionality into Okta process flows. The framework to support them is now in Early Access (EA/). <!--OKTA-205011-->

#### Token Inline Hook

The [Token Inline Hook](/docs/reference/token-hook/) enables you to integrate your own custom functionality into the process of minting OAuth 2.0 and OpenID Connect tokens. <!--OKTA-206634-->

#### Signature and Digest Algorithms for Template WS-Fed Apps

Template WS-Fed applications can now choose between SHA1 and SHA256 options for their Signature and Digest Algorithms. In addition, all Template WS-Fed applications will have X.509 certs signed with SHA256. <!--OKTA-202447-->

#### Google Integration Updated

Okta's [Google social login integration](/docs/guides/add-an-external-idp/google/before-you-begin/) has been updated to account for the deprecation of the Google+ API. More information can be found in our [Knowledge Base](https://support.okta.com/help/Documentation/Knowledge_Article/Google-API-Deprecation-and-Okta/).

#### High Capacity Rate Limits

A new High Capacity Rate Limit SKU is now available.  The impacted endpoints and their rate limits can be found on our [Rate Limits page](/docs/reference/rate-limits/). <!--OKTA-203819-->

#### Creation of LinkedIn IdPs Temporarily Disabled

We have disabled the creation of new LinkedIn identity providers until further notice due to the upcoming LinkedIn API V1 deprecation.

#### Bug Fixed in 2019.02.0

* There was a typo in the error text returned when a property was set to a 4-byte UTF-8 character (such as an emoji) in a field that does not allow such characters. <!--OKTA-145565-->

#### Previously Released Early Access Features 2019.02.0 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |


## January

### Weekly Release 2019.01.2

> **Note:** Okta has changed our release model and version numbering. For more information, see here: <https://support.okta.com/help/s/article/New-Okta-Release-Model>

| Change                                                                                                                | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Bug Fixed in 2019.01.2](#bug-fixed-in-2019-01-2)                                                                       | January 30, 2019         | February 4, 2019                             |
| [Previously Released Early Access Features 2019.01.2 Update](#previously-released-early-access-features-2019-01-2-update) | Available Now            | Available Now                                |

#### Bug Fixed in 2019.01.2

* Admin roles that were granted, scoped, or revoked through the Roles API did not appear in the System Log. <!--OKTA-197083-->

* Verifying an OTP using the Voice Call MFA factor failed when the user tried to verify with the OTP within 30 seconds after auto-activation of the Voice Call MFA factor.

#### Previously Released Early Access Features 2019.01.2 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |


### Monthly Release 2019.01.0

> **Note:** Okta has changed our release model and version numbering. Under the old system, this would have been release `2019.1`. For more information, see here: <https://support.okta.com/help/s/article/New-Okta-Release-Model>

| Change                                                                                                                | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Social Authentication Generally Available](#social-authentication-generally-available)                               | January 9, 2019          | January 14, 2019                             |
| [IdP Discovery Generally Available](#idp-discovery-generally-available)                                               | January 9, 2019          | January 14, 2019                             |
| [Relay State Format Now Configurable for SAML IdPs](#relay-state-format-now-configurable-for-saml-idps)               | January 9, 2019          | January 14, 2019                             |
| [No Events API Access for New Orgs](#no-events-api-access-for-new-orgs)                                               | January 9, 2019          | January 14, 2019                             |
| [Updated Office 365 Legacy Rate Limit](#updated-office-365-legacy-rate-limit)                                         | January 9, 2019          | January 14, 2019                             |
| [Bug Fixed in 2019.01.0](#bug-fixed-in-2019-01-0)                                                                       | January 9, 2018         | January 14, 2019
| [Previously Released Early Access Features 2019.01.0 Update](#previously-released-early-access-features-2019-01-0-update) | Available Now            | Available Now                                |

#### Social Authentication Generally Available

[Social Authentication](/docs/concepts/social-login/) is now Generally Available (GA). <!--OKTA-199632-->

#### IdP Discovery Generally Available

[IdP Discovery](/docs/reference/api/policy/#IdPDiscoveryPolicy) is now Generally Available (GA) as part of the Policy API. <!--OKTA-202887-->

#### Relay State Format Now Configurable for SAML IdPs

The Protocol Object now contains a [Relay State object](/docs/reference/api/idps/#saml-20-relay-state-object) that allows an admin to configure the Relay State format on the SAML IdP. <!--OKTA-188092-->

#### No Events API Access for New Orgs

As part of the deprecation process, new orgs created from this release onwards will not have access to the Events API.  <!--OKTA-203283-->

#### Updated Office 365 Legacy Rate Limit

The default [legacy rate limit](/docs/reference/rate-limits/#home-page-endpoint-limits-legacy-orgs) for the `/app/office365/{key}/sso/wsfed/active` endpoint has been lowered from 2000 to 1000. <!--OKTA-201807-->

#### Bug Fixed in 2019.01.0

* Some orgs were unable to create the number of users that they were entitled to. (OKTA-203819)

#### Previously Released Early Access Features 2019.01.0 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |
