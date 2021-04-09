---
title: Okta API Products Release Notes 2017
---

## 2017.52

### Feature Enhancements

| Feature Enhancement                          | Expected in Preview Orgs | Expected in Production Orgs |
|:---------------------------------------------------|:------------------------------------|:---------------------------------------|
| [Token Preview](#token-preview)          | December 28, 2017          | January 8, 2017                     |
| [New values for `amr` base claim](#new-values-for-amr-base-claim) | December 28, 2017          | January 8, 2017                |

#### Token Preview

Configuring an application or integration to use OpenID Connect  ID tokens or OAuth 2.0 access tokens can take a lot of trial-and-error.
Okta has made it easier to choose configuration settings and see the resulting tokens in the **Token Preview** tab of the Authorization Server page:

![Screen shot of token preview tab](/img/release_notes/token_preview.png "Screen shot of token preview tab")

Add values on the left side to see how they would affect the token on the right. All the fields are selection boxes except User.
For User, type in the first few letters to see a choice of user names.

You can try out different combinations of values, and see the resulting tokens (or error messages).
Once you've got the right combination, it's easy to configure your authorization server and other components. <!-- OKTA-149604 -->

#### New Values for `amr` Base Claim

We improved some behaviors related for base claim `amr`:

* When [MFA factors `sms` or `call`](/docs/reference/api/factors/#factor-type) are used, the `amr` claim returns [`mca`](/docs/reference/api/sessions/#amr-object).
* When [MFA factor `token:hardware`](/docs/reference/api/factors/#factor-type) is used, the `amr` claim returns `hwk`.
* When [MFA factor `web`](/docs/reference/api/factors/#factor-type) is used, the `amr` claim returns `swk`. <!-- OKTA-152175 -->

### Bug Fix: Legacy Events Available in System Log

This bug fix is expected in preview orgs starting December 28, 2017 and expected in production orgs starting January 8, 2017.

The following legacy events, already present in the `/api/v1/events` endpoint, are also available in the `/api/v1/logs` endpoint (System Log API):

* `app.auth.slo.with_reason`
* `app.auth.slo.saml.malformed_request.invalid_type`
* `app.keys.clone_legacy`
* `app.keys.generate_legacy`
* `app.keys.rotate_legacy`

<!-- OKTA-150052 OKTA-150082 OKTA-150157 OKTA-150177 OKTA-150194 -->


## 2017.50

### Enhanced Feature

#### Strict Policy Enforcement for Password Changes

Added `strict` optional parameter to the following operations:

* [Update User](/docs/reference/api/users/#update-user)
* [Change Password](/docs/reference/api/users/#change-password)

This parameter allows you to force the validation of the password policy's `minAge` and `passwordHistory` requirements when an updated password is sent. This will be Generally Available in preview orgs starting on Dec 13, 2017 and in production orgs starting on Dec 19, 2017.
<!-- OKTA-148151 -->

### API Bug Fix

The following bug fixes will be available on preview orgs starting Dec 13, 2017, and will be available on production orgs starting December 19, 2017:

* When using the [Zones API](/docs/reference/api/zones/#update-an-ip-zone), erasing all IP addresses in the Default IP Blacklist zone caused an error. (OKTA-145602)


## 2017.49

### New and Enhanced Features

| Feature | Available in Preview Orgs | Available in Production Orgs |
| :------------------------------------ | :------------------------ | :------------------- |
| [App User Schema API in EA](#early-access-feature-in-preview-app-user-schema-api)  | December 6, 2017 | January 10, 2017 |
| [HAL Link Rollout](#completing-rollout-of-simple-hal-links)                     | December 6, 2017 | December 12, 2017 |
| [JWT as a Request Parameter](#jwt-as-a-request-parameter) | December 6, 2017 | December 12, 2017 |

#### Early Access Feature in Preview: App User Schema API

The [App User Schema API](/docs/reference/api/schemas/#app-user-schema-operations) is an [Early Access (EA)](/docs/reference/releases-at-okta/#early-access-ea) release. Use this API to work with App User profiles, typically for apps that have features for provisioning users.
<!-- OKTA-148782 -->

#### Completing Rollout of Simple HAL Links

In previous releases, Okta enabled functionality which modifies the set of links returned with user collection elements. In the new functionality, when a collection of Users is returned, the Links object returned with each element contains only the `_self` link, which can be used to obtain the individual User object. The User object contains the full set of links. We made this change to ensure you always have up-to-date and complete links.

Most orgs already have this functionality and should see no change in behavior.
Some orgs did not receive this functionality because they were identified as possible users of the .NET SDK. These customers have received a communication from Okta outlining the changes and any actions they might need to take.

Some preview orgs created with the Developer Paid edition will receive the new functionality on preview orgs starting December 6, 2017, and on production orgs starting December 12, 2017.

See [the User Model documentation](/docs/reference/api/users/#user-model) for more information. <!-- OKTA-150507 -->

#### JWT as a Request Parameter

A new parameter, `request` is available for all `/authorize` endpoints. The parameter contains a JWT created by the client, enabling requests to be passed in a single, self-contained parameter. This JWT must be signed.

For details about using `request`, see [Oauth 2.0](/docs/reference/api/oidc/#request-parameters-1) or [OpenID Connect](/docs/reference/api/oidc/#request-parameters-3) documentation. <!-- OKTA-78476 -->

### API Bug Fixes

The following bug fixes will be available on preview orgs starting Dec 6, 2017, and will be available on production orgs starting December 11, 2017:

* Password requirements were incorrectly evaluated on passwords longer than 72 characters. (OKTA-144636)

* If the number of results in a page was divisible by the `limit` parameter value, an additional empty page was incorrectly returned. (OKTA-146006)

* If an app embed link with a session token was used to access an app, the user was incorrectly prompted to authenticate again, instead of using the token to launch the application. (OKTA-149823)



## 2017.47

### API Bug Fix

The following bug fix will be available on preview orgs starting November 21, and will be available on production orgs starting November 28, 2017:

* A partial profile update (POST `/api/v1/users/ {userId}`) incorrectly required that `login` be specified in the `profile`. (OKTA-145770)


## 2017.46

### API Bug Fix

The following bug fix is available now on preview orgs, and will be available on production orgs starting November 28, 2017:

* After updating a user with a POST to `/user/{userId}`, HAL links would not be included in the response body. (OKTA-145195)


## 2017.45

### API Feature Enhancements

| Feature Enhancement                                                                   | Expected in Preview Orgs | Expected in Production Orgs |
|:--------------------------------------------------------------------------------------|:-------------------------|:----------------------------|
| [App Label Length Increase](#app-label-length-increase)                                     | November 8, 2017          | November 14, 2017             |
| [GET Users by ID Rate Limit Increased](#get-users-by-id-rate-limit-increased)               | November 8, 2017          | November 14, 2017             |
| [User ID Now Included in Token Log Events](#user-id-now-included-in-token-log-events) | November 8, 2017          | November 14, 2017             |
| [IdP Provisioning Policy Conditions in GA](#idp-provisioning-policy-conditions-in-ga)                                                             | November 8, 2017        | November 14, 2017             |

#### App Label Length Increase

App `label` maximum length has been increased from 50 to 100 characters. <!--OKTA 146865-->

#### GET Users by ID Rate Limit Increased

The default rate limit for GET requests to `/api/v1/users/${userId}` has been increased from 600 to 2000. <!--OKTA 144705-->

#### User ID Now Included in Token Log Events

The System Log and Events APIs now report the `userId` in API Access Management and OpenID Connect access token and refresh token events. This `userId` appears as a `Subject` field in the event. For the `client_credentials` grant type, `userId` will not be included since there is no user context. <!--OKTA 143854-->

#### IdP Provisioning Policy Conditions in GA

Identity Provider Provisioning Policy [Conditions](/docs/reference/api/idps/#provisioning-policy-object) are now Generally Available. <!--OKTA 123811-->

### API Bug Fixes

The following bug fixes are available now on preview orgs, and will be available on production orgs starting November 14, 2017:

* System log messages for refresh token events failed to include the `displayName`. In this context, the display name reports that the event was for a refresh token. (OKTA-146743)
* Using `nextLogin` to create a user with an expired password was successful but incorrectly reported the status as `ACTIVE` in the response. (OKTA-136663)
* When importing users into an app group, the System Log event would display `unknown` for the target user's  `AlternateId` and `DisplayName` properties. (OKTA-145115)
* In some instances, the `enum` property could not be used in conjunction with JSON Schema validations for `minLength`/`maxLength` (for strings)  or `minimum`/`maximum` (for integers/numbers). (OKTA-142732)


## 2017.44

### API Feature Enhancements: New Query Parameter for Create User

Use [the new query parameter `nextLogin`](/docs/reference/api/users/#request-parameters) with a create user API request to create and activate a user with an expired password.
The user has to change his or her password the next time they log in. This new query parameter eliminates the need to use two API calls to achieve the same result. <!-- OKTA-142029 -->

This feature enhancement is expected in preview orgs starting November 1, 2017, and in production orgs starting November 6, 2017.

### API Bug Fixes

Three bug fixes are available now on preview orgs, and will be available on production orgs starting November 6, 2017:

* The default ports in the App Wizard in the Admin Console have been changed from `3000` to `8080`. (OKTA-144916)
* An error string was unclear. The string is returned when a session times out while waiting for a user to enter MFA credentials during an OpenID Connect `/oauth2/v1/authorize` or OAuth 2.0 `/oauth2/${authServerId}/v1/authorize` request. (OKTA-143916)
* An error, `User not assigned to app` was incorrectly returned from a `GET /oauth2/v1/authorize` request for Oauth 2.0 clients with a custom client ID. (OKTA-146566)

Two bug fixes are expected on preview orgs starting Nov 1, 2017, and will be available on production orgs starting November 6, 2017:

* System log entries for API Access Management and OpenID Connect now correctly report client IDs and the number of tokens which were revoked in a refresh token. (OKTA-145486)
* The OpenID Connect claim `phone_number_verified` was returned from some authorization servers. The claim has been removed because Okta doesn't support this claim yet. (OKTA-146470)


## 2017.43

### API Bug Fixes

These bug fixes are expected on preview orgs starting October 25, 2017, and on production orgs starting November 8, 2017.

* The default ports in the App Wizard in the Admin Console have been changed from `3000` to `8080`. (OKTA-144916)
* An error string was unclear. The string is returned when a session times out while waiting for a user to enter MFA credentials during an OpenID Connect `/authorize` call. (OKTA-143916)


##  2017.42

### API Feature Enhancements

#### Group Rule Evaluations Included in System Log

Group Rule evaluation failures are now exposed via the System Log API.<!-- OKTA-140086 -->

### API Bug Fixes

These bug fixes are expected on preview orgs starting October 18, 2017, and on production orgs starting October 24, 2017.

* ID tokens requested alongside access tokens or authorization codes from custom authorization servers did not include OpenID Connect claims. This caused client applications, including the Okta Sign-In Widget, to not pre-populate the username. (OKTA-143857, 2017.40 Preview Fix)


## 2017.41

### API Feature Enhancements

#### API Access Management Logs in Events API

<!-- OKTA-129243 -->

API Access Management now generates System Log events available via the Events API. This will be Generally Available in preview orgs starting on October 11, 2017 and in production orgs starting on October 17, 2017.

#### New Version of Sign-In Widget

<!-- OKTA-144563-->

Version 2.3 of the [Okta Sign-In Widget](https://github.com/okta/okta-signin-widget/releases/tag/okta-signin-widget-2.3.0) is available. Check out the new features and bug fixes!

### API Bug Fixes

These bug fixes are expected on preview orgs starting October 11, 2017, and on production orgs starting October 17, 2017.

* Active Directory Password Policies now always return a `maxAgeDays` value of `0`, since this setting is unsupported by Active Directory. (OKTA-142874)
* Deleting a user failed if the user's primary and secondary emails were the same. (OKTA-142765)
* Deleting a user failed if the domain portion of the username string was too long. (OKTA-141876)
* Radius authentication flows would erroneously trigger `user.session.end` events in the log. (OKTA-138775)
* When a user signed in to Okta via IWA and without an MFA prompt, there was no sign on policy evaluation entry present in the system log. (OKTA-136545)
* User authentication attempts blocked by geographic restrictions in Adaptive MFA were logged as a successful login followed by a `Login Denied` event in the system log. (OKTA-112077)


## 2017.40

### API Feature Enhancements

| Feature Enhancement                                                                   | Expected in Preview Orgs | Expected in Production Orgs |
|:--------------------------------------------------------------------------------------|:-------------------------|:----------------------------|
|[Concurrent Rate Limits](#concurrent-rate-limits)                                     | October 4, 2017          | October 9, 2017             |
|[OpenID Connect Scope Change](#openid-connect-scope-change)               | October 4, 2017          | October 9, 2017             |
|[Help Desk Administrator Role Generally Available](#help-desk-administrator-role-generally-available) | October 4, 2017          | October 9, 2017             |
|[Policy API](#policy-api)                                                             | September 7, 2017        | October 9, 2017             |
|[Password Policy API](#password-policy-api)                                           | September 7, 2017        | October 9, 2017             |


#### Concurrent Rate Limits
In order to protect the service for all customers, Okta enforces concurrent rate limits starting with this release.
Concurrent limits are distinct from [the org-wide, per-minute API rate limits](/docs/reference/rate-limits/#org-wide-rate-limits).

For concurrent rate limits, traffic is measured in three different areas. Counts in one area aren't included in counts for the other two:

* For agent traffic, Okta measured each org's traffic and set the limit above the highest usage in the last four weeks.
* For Office365 traffic, the limit is 75 concurrent transactions per org.
* For all other traffic including API requests, the limit is 75 concurrent transactions per org.

Okta has verified that these limits are sufficient based on current usage. As a result of verification, we increased the limit for some orgs to 150.

The first request to exceed the concurrent limit returns an HTTP 429 error, and the first error every sixty seconds is written to the log.
Reporting concurrent rate limits once a minute keeps log volume manageable.

##### Example Error Response Events

```json
{
    "eventId": "tevEVgTHo-aQjOhd1OZ7QS3uQ1506395956000",
    "sessionId": "102oMlafQxwTUGJMLL8FhVNZA",
    "requestId": "reqIUuPHG7ZSEuHGUXBZxUXEw",
    "published": "2017-09-26T03:19:16.000Z",
    "action": {
      "message": "Too many concurrent requests in flight",
      "categories": [],
      "objectType": "core.concurrency.org.limit.violation",
      "requestUri": "/report/system_log"
    },
    "actors": [
      {
        "id": "00uo7fD8dXTeWU3g70g3",
        "displayName": "Test User",
        "login": "test-user@test.net",
        "objectType": "User"
      },
      {
        "id": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36",
        "displayName": "CHROME",
        "ipAddress": "127.0.0.1",
        "objectType": "Client"
      }
    ],
    "targets": []
  }
```

##### Example Error Response for System Log API (Beta)

```json
{
        "actor": {
            "alternateId": "test.user@test.com",
            "detailEntry": null,
            "displayName": "Test User",
            "id": "00u1qqxig80SMWArY0g7",
            "type": "User"
        },
        "authenticationContext": {
            "authenticationProvider": null,
            "authenticationStep": 0,
            "credentialProvider": null,
            "credentialType": null,
            "externalSessionId": "trs2TSSLkgWR5iDuebwuH9Vsw",
            "interface": null,
            "issuer": null
        },
        "client": {
            "device": "Unknown",
            "geographicalContext": null,
            "id": null,
            "ipAddress": "4.15.16.10",
            "userAgent": {
                "browser": "UNKNOWN",
                "os": "Unknown",
                "rawUserAgent": "Apache-HttpClient/4.5.2 (Java/1.7.0_76)"
            },
            "zone": "null"
        },
        "debugContext": {
            "debugData": {
                "requestUri": "/api/v1/users"
            }
        },
        "displayMessage": "Too many requests in flight",
        "eventType": "core.concurrency.org.limit.violation",
        "legacyEventType": "core.concurrency.org.limit.violation",
        "outcome": null,
        "published": "2017-09-26T20:21:32.783Z",
        "request": {
            "ipChain": [
                {
                    "geographicalContext": null,
                    "ip": "4.15.16.10",
                    "source": null,
                    "version": "V4"
                },
                {
                    "geographicalContext": null,
                    "ip": "52.22.142.162",
                    "source": null,
                    "version": "V4"
                }
            ]
        },
        "securityContext": {
            "asNumber": null,
            "asOrg": null,
            "domain": null,
            "isProxy": null,
            "isp": null
        },
        "severity": "INFO",
        "target": null,
        "transaction": {
            "detail": {},
            "id": "Wcq2zDtj7xjvEu-gRMigPwAACYM",
            "type": "WEB"
        },
        "uuid": "dc7e2385-74ba-4b77-827f-fb84b37a4b3b",
        "version": "0"
    }
```

##### Example Rate Limit Header with Concurrent Rate Limit Error

This example shows the relevant portion of a rate limit header being returned with the error for a request that exceeded the concurrent rate limit.
```http

HTTP/1.1 429
Date: Tue, 26 Sep 2017 21:33:25 GMT
X-Rate-Limit-Limit: 0
X-Rate-Limit-Remaining: 0
X-Rate-Limit-Reset: 1506461721

```

Notice that instead of the typical counts for time-based rate limits, when a request exceeds the limit for concurrent requests,
`X-Rate-Limit-Limit`, `X-Rate-Limit-Remaining`, and `X-Rate-Limit-Reset` report the concurrent values instead.
When the number of unfinished requests is below the concurrent rate limit, request headers will switch back to reporting the time-based rate limits.

The `X-Rate-Limit-Reset` time for concurrent rate limits is only a suggestion. There's no guarantee that enough requests will complete to stop exceeding the concurrent rate limit at the time indicated.

For more information, see developer documentation about [rate limit headers](/docs/reference/rate-limits/). <!-- OKTA-140976, OKTA-142995 -->

#### OpenID Connect Scope Change

We've changed the behavior of OpenID Connect scopes:

* OpenID Connect scopes are returned from requests to `/api/v1/authorizationServers/${authServerId}/scopes`.
* You can edit scope descriptions in the Okta user interface or via the API. <!--OKTA-136527 -->

#### Help Desk Administrator Role Generally Available

The Help Desk Administrator Role (`HELP_DESK_ADMIN`) is generally available via the [Roles API](/docs/reference/api/roles/#role-properties).
For information about this role, see the [in-app help](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_The_Help_Desk_Admin_Role). <!-- OKTA-141867 -->

#### Policy API

The Policy API enables an Administrator to perform policy and policy rule operations. The policy framework is used by Okta to control rules and settings that govern, among other things, user session lifetime, whether multi-factor authentication is required when logging in, what MFA factors may be employed, password complexity requirements, and what types of self-service operations are permitted under various circumstances. For more information, see Okta's [API Reference](/docs/reference/api/policy/).

#### Password Policy API

The Password Policy type controls settings that determine a user's password length and complexity, as well as the frequency with which a password can be changed. This policy also governs the recovery operations that may be performed by the user, including change password, reset (forgot) password and self-service password unlock. For more information, see Okta's [API Reference](/docs/reference/api/policy/#GroupPasswordPolicy).


## 2017.38

The following API feature enhancements and bug fixes are available in the 2017.38 release.
Dates for preview and production release are the earliest possible release date. Always check your org to verify the release version.

### API Feature Enhancements

| Feature Enhancement                                                           | Expected in Preview Orgs            | Expected in Production Orgs |
|:------------------------------------------------------------------------------|:------------------------------------|:----------------------------|
| Key Rotation for OpenID and OAuth Apps | September 20, 2017                     | September 25, 2017           |
| Policy API | September 7, 2017                     | October 9, 2017           |
| Password Policy API | September 7, 2017                     | October 9, 2017           |

#### Policy API

The Policy API enables an Administrator to perform policy and policy rule operations. The policy framework is used by Okta to control rules and settings that govern, among other things, user session lifetime, whether multi-factor authentication is required when logging in, what MFA factors may be employed, password complexity requirements, and what types of self-service operations are permitted under various circumstances. For more information, see Okta's [API Reference](/docs/reference/api/policy/).

#### Password Policy API

The Password Policy type controls settings that determine a user's password length and complexity, as well as the frequency with which a password can be changed. This policy also governs the recovery operations that may be performed by the user, including change password, reset (forgot) password and self-service password unlock. For more information, see Okta's [API Reference](/docs/reference/api/policy/#GroupPasswordPolicy),

#### Key Rotation for OpenID Connect and OAuth Apps

You can now specify the key rotation mode for OpenID Connect and OAuth apps in the Apps API with `autoKeyRollover`. More information can be found in the [API Reference](/docs/reference/api/apps/#oauth-credential-object).

### API Bug Fixes

Bug fixes are expected on preview orgs starting September 20, 2017, and on production orgs starting September 25, 2017.

* Using a refresh token for a client application with a client ID longer than 20 characters caused an error. (OKTA-139722)


## 2017.36

The [Policy API](/docs/reference/api/policy/) and [Password Policy API](/docs/reference/api/policy/#GroupPasswordPolicy) are Generally Available in preview orgs starting on September 7, 2017 and in production orgs starting on October 9, 2017.

The Policy API enables an Administrator to perform policy and policy rule operations. The policy framework is used by Okta to control rules and settings that govern, among other things, user session lifetime, whether multi-factor authentication is required when logging in, what MFA factors may be employed, password complexity requirements, and what types of self-service operations are permitted under various circumstances.

The Password Policy type controls settings that determine a user's password length and complexity, as well as the frequency with which a password can be changed. This policy also governs the recovery operations that may be performed by the user, including change password, reset (forgot) password and self-service password unlock.


## 2017.35

The following platform feature enhancements and bug fixes are available in the 2017.35 release.
Dates for preview and production release are the earliest possible release date. Always check your org to verify the release version.

### API Feature Enhancements

| Feature Enhancement                                                           | Expected in Preview Orgs            | Expected in Production Orgs |
|:------------------------------------------------------------------------------|:------------------------------------|:----------------------------|
| [Zones API is an Early Access Release](#zones-api-is-an-early-access-release) | August 22, 2017                     | September 5, 2017           |

#### Zones API is an Early Access Release
<!-- OKTA-129115 -->

Zones are used to group IP Address ranges so that policy decisions can be made based on the client's IP location.

[The Zones API](/docs/reference/api/zones/) is an <ApiLifecycle access="ea" /> release. Contact [Support](https://support.okta.com/help/open_case) to enable it.
This API can be enabled beginning August 22, 2017 for preview orgs, and beginning September 5, 2017 for production orgs.

### API Bug Fix

This bug fix is expected on preview orgs starting August 31, 2017, and on production orgs starting Sept 5, 2017.

* Some requests to update a user via [`/api/v1/users/${userId}`](/docs/reference/api/users/#update-user) failed with a 500 Internal Server Error. (OKTA-138214)


## 2017.34

The following API feature enhancements and bug fixes are available in the 2017.34 release.
Dates for preview and production release are the earliest possible release date. Always check your org to verify the release version.

### API Feature Enhancements

| Feature Enhancement                                                           | Expected in Preview Orgs            | Expected in Production Orgs |
|:------------------------------------------------------------------------------|:------------------------------------|:----------------------------|
| [New Developer Dashboard](#new-developer-dashboard)                           | Available now in new developer orgs | N/A                         |
| [Zones API is an Early Access Release](#zones-api-is-an-early-access-release) | August 22, 2017                     | September 5, 2017           |

#### New Developer Dashboard

The new developer dashboard is available in all new developer orgs in preview:

![New Developer Dashboard](/img/release_notes/dev-dashboard.png "New Developer Dashboard")

Use the developer dashboard to access quick-start guides for your favorite language and view recent system log events.
You can also create an OpenID Connect app more easily with this simplified flow:

![New Developer Dashboard](/img/release_notes/new-oidc-app-dashboard.png "New Developer Dashboard")

#### Zones API is an Early Access Release
<!-- OKTA-129115 -->

Zones are used to group IP Address ranges so that policy decisions can be made based on the client's IP location.

[The Zones API](/docs/reference/api/zones/) is an <ApiLifecycle access="ea" /> release. Contact [Support](https://support.okta.com/help/open_case) to enable it.
This API can be enabled beginning August 22, 2017 for preview orgs, and beginning September 5, 2017 for production orgs.

### API Bug Fixes

Bug fixes are expected on preview orgs starting August 22, 2017, and on production orgs starting Sept 5, 2017.

* OpenID Connect and OAuth 2.0 client apps with an `application_type` of `native` or `browser` incorrectly allowed the `client_credentials` grant type. This fix adheres to the [OAuth 2.0 spec](https://tools.ietf.org/html/rfc6749#section-1.3.4). (OKTA-135853)
* Requests to `GET /api/v1/apps/${applicationId}/groups?expand=group%2Cmetadata` caused an error in orgs with the Application Entitlements Policy enabled. (OKTA-135969)
* The `AssertionConsumerServiceURL` attribute in a SAML authentication requests matched one of the configured SSO URLs but an error was returned. (OKTA-137555)

## 2017.32

### Platform Feature Enhancements

| Feature Enhancement                                                                                                 | Expected in Preview Orgs | Expected in Production Orgs             |
|:--------------------------------------------------------------------------------------------------------------------|:-------------------------|:----------------------------------------|
| [Default Custom Authorization Server](#default-custom-authorization-server)                                         | August 9, 2017           | August 14, 2017                         |
| [Web App Supports Client Credential Grant Type](#web-app-supports-client-credential-grant-type)                     | August 9, 2017           | August 14, 2017                         |
| [OpenID Connect Group Claim Retrieves Application Groups](#openid-connect-group-claim-retrieves-application-groups) | August 9, 2017           | August 14, 2017                         |
| [SHA-256 Signed Certificates for New SAML 2.0 Apps](#sha-256-signed-certificates-for-new-saml-20-apps)              | Generally Available now  | Generally Available beginning 9/11/2017 |

#### Default Custom Authorization Server
<!-- OKTA-133786 -->

Okta provides a pre-configured Custom Authorization Server named `default`.
This default authorization server includes a basic access policy and rule, which you can edit to control access.
It allows you to specify `default` instead of the `authServerId` in requests to it:

* `https://${yourOktaDomain}/api/v1/authorizationServers/default` vs
* `https://${yourOktaDomain}/api/v1/authorizationServers/${authServerId}` for other Custom Authorization Servers

#### Web App Supports Client Credential Grant Type
<!-- OKTA-102062 -->

OAuth 2.0 clients now support [configuration of the `web` application type to use a `client_credential` grant type](/docs/reference/api/oauth-clients/#client-application-properties).
This allows you to use one `client_id` for an application that needs to make user-specific calls and back-end calls for data.

#### OpenID Connect Group Claim Retrieves Application Groups
<!-- OKTA_132193 -->

OpenID Connect, which uses the Okta Authorization Server, can retrieve [application groups](/docs/reference/api/apps/#application-group-model) for use in tokens.
Previously, application groups could only be retrieved with the Custom Authorization Server.

You can use the Okta Expression Language [`getFilteredGroups` function](/docs/reference/okta-expression-language/#group-functions) to retrieve application groups.

#### SHA-256 Signed Certificates for New SAML 2.0 Apps

All new SAML 2.0 apps are bootstrapped with SHA-256 signed public certificates. Existing SAML 2.0 apps are unchanged.

### Platform Bug Fixes

Bug fixes are expected on preview orgs starting August 9, 2017, and on production orgs starting August 14, 2017.

* The **Add policy** button wasn't disabled for Org Admins, who don't have permission to create authorization server policies. (OKTA-127450)
* Some requests to `/oauth2/v1/authorize` with the `state` parameter incorrectly returned an error. (OKTA-130916)
* When an ID token was minted for a custom authorization server, an app sign-on event wasn't generated. (OKTA-134554)

## 2017.31

### Platform Feature Enhancements

| Feature Enhancement                                                               | Expected in Preview Orgs        | Expected in Production Orgs             |
|:----------------------------------------------------------------------------------|:--------------------------------|:----------------------------------------|
| [OpenID Connect](#openid-connect)                                                 | Generally Available now         | Generally Available beginning 8/7/2017  |
| [Key Rollover](#key-rollover)                                                     | Generally Available now         | Generally Available beginning 8/7/2017  |
| [Email for Two-Factor Authentication](#email-for-two-factor-authentication)       | Early Access by 8/3/2017        | Early Access beginning 8/7/2017         |
| [SHA-256 Signed Certificates for New SAML 2.0 Apps](#sha-256-signed-certificates-for-new-saml-20-apps) | Generally Available by 8/3/2017 | Generally Available beginning 9/11/2017 |

To enable an Early Availability (EA) feature, contact [Support](https://support.okta.com/help/open_case). For more information, see [Okta Release Lifecycle](/docs/reference/releases-at-okta/).

> A [new version of the Sign-In Widget](#new-version-of-the-sign-in-widget) is available now for all orgs.

#### OpenID Connect
<!-- OKTA-132049  -->

[OpenID Connect](/docs/reference/api/oidc/) is a simple identity layer on top of the OAuth 2.0 protocol, which allows computing clients to verify the identity of an end user based on the authentication performed by an authorization server, as well as to obtain basic profile information about the end user in an interoperable and REST-like manner. In technical terms, OpenID Connect specifies a RESTful HTTP API, using JSON as a data format.

OpenID Connect allows a range of clients, including Web-based, mobile, and JavaScript clients, to request and receive information about authenticated sessions and end users. The specification suite is extensible, supporting optional features such as encryption of identity data, discovery of OpenID Providers, and session management.

Okta is [certified for OpenID Connect](http://openid.net/certification/). For more information, see [OpenID Connect and Okta](/docs/reference/api/oidc/).

#### Key Rollover
<!-- OKTA-132045  -->

We provide the ability to generate a certificate with a specified validity period for the [Apps API](/docs/reference/api/apps/) and [Identity Providers API](/docs/reference/api/idps/).

#### SHA-256 Signed Certificates for New SAML 2.0 Apps

All new SAML 2.0 apps are bootstrapped with SHA-256 signed public certificates. Existing SAML 2.0 apps are unchanged.

#### Email for Two-Factor Authentication
<!-- OKTA-134593  -->

You can enroll a user with an email factor. See [Enroll Okta Email Factor](/docs/reference/api/factors/#enroll-okta-email-factor) for details.

### New Version of the Sign-In Widget
<!-- (OKTA-132800) -->

Version 2.1.0 of the Okta Sign-In Widget is available on [GitHub](https://github.com/okta/okta-signin-widget/releases/tag/okta-signin-widget-2.1.0) or [NPM](https://www.npmjs.com/package/@okta/okta-signin-widget). Check out the new features and bug fixes!

## 2017.30

### Platform Features

These platform features are GA in preview orgs (as of Release 2017.28), and expected to roll out as GA to production orgs during the week of August 7, 2017:

* [OpenID Connect](#openid-connect)
* [Key Rollover](#key-rollover)

This platform feature enhancement is EA in preview orgs with this release and expected in production orgs the week of July 31, 2017. To enable an EA feature, contact [Support](https://support.okta.com/help/open_case).

* [Email for Two-Factor Authentication](#email-for-two-factor-authentication)

For information about Early Access (EA) and General Availability (GA), see [Okta Release Lifecycle](/docs/reference/releases-at-okta/).

#### OpenID Connect

[OpenID Connect](/docs/reference/api/oidc/) is a simple identity layer on top of the OAuth 2.0 protocol, which allows computing clients to verify the identity of an end user based on the authentication performed by an authorization server, as well as to obtain basic profile information about the end user in an interoperable and REST-like manner. In technical terms, OpenID Connect specifies a RESTful HTTP API, using JSON as a data format.

 OpenID Connect allows a range of clients, including Web-based, mobile, and JavaScript clients, to request and receive information about authenticated sessions and end users. The specification suite is extensible, supporting optional features such as encryption of identity data, discovery of OpenID Providers, and session management.

 Okta is [certified for OpenID Connect](http://openid.net/certification/). For more information, see [OpenID Connect and Okta](/docs/reference/api/oidc/).<!-- OKTA-132049  -->



#### Key Rollover

We provide the ability to generate a certificate with specified validity period (see the [Apps API](/docs/reference/api/apps/) and [Identity Providers API](/docs/reference/api/idps/)). We build OpenID Connect and API Access Management on this feature. <!-- OKTA-132045  -->

#### Email for Two-Factor Authentication  <!-- OKTA-134593  -->

You can enroll a user with an email factor. See [Enroll Okta Email Factor](/docs/reference/api/factors/#enroll-okta-email-factor) for details.

### Platform Bugs Fixed

These platform bug fixes are in preview orgs with this release and expected in production orgs the week of July 31, 2017.

* Under some circumstances users who did not have a secondary email address could not perform a self-service password reset operation.   (OKTA-128340)

* "When the `expand` parameter was set in GET requests to [`/api/v1/groups`](/docs/reference/api/groups/#list-groups), the second and subsequent pages of the response did not have the same `expand` setting.  (OKTA-132503)

* [`/oauth2/v1/clients`](/docs/reference/api/oauth-clients/#register-new-client) returned HTTP status code 200 rather than 201 when creating a client successfully.  (OKTA-128839)

* [`/api/v1/authorizationServers`](/docs/reference/api/authorization-servers/#create-authorization-server) returned HTTP status code 200 rather than 201 when creating an Authorization Server successfully.  (OKTA-128839)

* [`/oauth2/v1/clients/{clientId}`](/docs/reference/api/oauth-clients/#get-oauth-client) returned HTTP status code 404 rather than 401 when it did not find the specified client.  (OKTA-130804, OKTA-130848)

## 2017.29

### Platform Features

The following platform features are Generally Available (GA) in preview orgs (as of Release 2017.28), and expected to roll out as GA to production orgs during the week of August 7, 2017:

* [OpenID Connect](#openid-connect)
* [Key Rollover](#key-rollover)

#### OpenID Connect

[OpenID Connect](/docs/reference/api/oidc/) is a simple identity layer on top of the OAuth 2.0 protocol, which allows computing clients to verify the identity of an end user based on the authentication performed by an authorization server, as well as to obtain basic profile information about the end user in an interoperable and REST-like manner. In technical terms, OpenID Connect specifies a RESTful HTTP API, using JSON as a data format.

 OpenID Connect allows a range of clients, including Web-based, mobile, and JavaScript clients, to request and receive information about authenticated sessions and end users. The specification suite is extensible, supporting optional features such as encryption of identity data, discovery of OpenID Providers, and session management.

 Okta is [certified for OpenID Connect](http://openid.net/certification/). For more information, see [OpenID Connect and Okta](/docs/reference/api/oidc/).<!-- OKTA-132049  -->

#### Key Rollover

We provide the ability to generate a certificate with specified validity period (see the [Apps API](/docs/reference/api/apps/) and [Identity Providers API](/docs/reference/api/idps/)). We build OpenID Connect and API Access Management on this feature.<!-- OKTA-132045  -->

### Platform Bugs Fixed

These platform bug fixes are available in preview orgs and expected in production orgs the week of July 24, 2017.

* When answering a security question to recover a forgotten password, users who gave too many incorrect responses didn't receive the "locked out" message. (OKTA-126117)

* Custom SMS templates allowed messages greater than 160 characters after substituting the org name and code. The new behavior is to use a default template instead of the custom template when that happens. To ensure use of your custom template, update it to stay within the 160-character limit. (OKTA-128721)

* [`/oauth2/v1/clients`](/docs/reference/api/oauth-clients/#register-new-client) error responses didn't conform to the format in the [OAuth 2.0 Dynamic Client Registration spec](https://tools.ietf.org/html/rfc7591#section-3.2.2). (OKTA-130375)

* [`/oauth2/v1/clients`](/docs/reference/api/oauth-clients/#register-new-client) didn't allow default values for optional parameters. (OKTA-130910)

* Neither [`/oauth2/v1/clients`](/docs/reference/api/oauth-clients/#register-new-client) nor [`/api/v1/apps`](/docs/reference/api/apps/#add-application) required client secrets to be unique. (OKTA-131259)

* [`/oauth2/v1/clients`](/docs/reference/api/oauth-clients/#register-new-client) returned an incorrect resource URI in the response header.  (OKTA-131891)


## 2017.28

### Platform Enhancements and New Features

The following changes are available in preview orgs on Wednesday, July 12. Availability in production orgs is expected either one week or one month later. For information about Early Availability (EA) and Generally Available (GA), see [Okta Release Lifecycle](/docs/reference/releases-at-okta/).

The following features are GA in preview orgs, and expected to be GA in production orgs during the week of August 7, 2017:

* [OpenID Connect](#openid-connect)
* [Key Rollover](#key-rollover)

The following feature enhancements are GA in preview orgs, and expected to be GA in production orgs during the week of July 17, 2017:

* [Limit Age of Events](#limit-age-of-events)
* [Improved Plugin Security](#improved-plugin-security)

The following EA feature enhancements are in preview orgs and expected in production orgs during the week of July 17, 2017.
To enable an EA feature, contact [Support](https://support.okta.com/help/open_case).

* [Allow Unsuspending Users During Inbound SAML Login](#allow-unsuspending-users-during-inbound-saml-login)
* [Email Factor](#email-factor)

The following feature enhancement is available on GitHub:

* [New Version of Sign-In Widget](#new-version-of-sign-in-widget)

#### OpenID Connect

[OpenID Connect](/docs/reference/api/oidc) is a simple identity layer on top of the OAuth 2.0 protocol, which allows computing clients to verify the identity of an end user based on the authentication performed by an authorization server, as well as to obtain basic profile information about the end user in an interoperable and REST-like manner. In technical terms, OpenID Connect specifies a RESTful HTTP API, using JSON as a data format.

 OpenID Connect allows a range of clients, including Web-based, mobile, and JavaScript clients, to request and receive information about authenticated sessions and end users. The specification suite is extensible, supporting optional features such as encryption of identity data, discovery of OpenID Providers, and session management.

 Okta is [certified for OpenID Connect](http://openid.net/certification/). For more information, see [OpenID Connect and Okta](/docs/reference/api/oidc/).<!-- OKTA-132049  -->


#### Key Rollover

We provide the ability to generate a certificate with specified validity period (see the [Apps API](/docs/reference/api/apps/) and [Identity Providers API](/docs/reference/api/idps)). We build OpenID Connect and API Access Management on this feature.<!-- OKTA-132045  -->

#### Limit Age of Events

In keeping with the [Okta Data Retention Policy](https://support.okta.com/help/Documentation/Knowledge_Article/Okta-Data-Retention-Policy), the events API (`/api/v1/events`) no longer accepts queries for events greater than 180 days old.<!-- OKTA-125424, 120605  -->

#### Improved Plugin Security
Template Plugin Apps you create from the administrator UI (**Admin > Applications > Add Application > Template Plugin App**) have improved security.<!-- OKTA-132490  -->

#### New Version of Sign-In Widget

Version 1.13.0 of the [Okta Sign-In Widget](https://github.com/okta/okta-signin-widget/releases) is available. Check out the new features and bug fixes!<!-- (OKTA-131661) -->

#### Allow Unsuspending Users During Inbound SAML Login

You can configure the JIT settings for a SAML identity provider (IdP) to enable unsuspending users during inbound SAML login. See the [Identity Providers API](/docs/reference/api/idps) for more information.<!-- OKTA-128384 -->

![JIT settings for SAML IdP](/img/release_notes/JIT_settings.png "JIT settings for SAML IdP")

#### Email Factor

 You can send a one-time password (OTP) and an activation link to an email address as part of enrolling a user.<!-- OKTA-132297  -->

### Platform Bugs Fixed

These platform bug fixes are available in preview orgs and expected in production orgs the week of July 17, 2017.

* `/api/v1/apps/${applicationId}/groups` didn't return groups if the specified app is inactive. (OKTA-123695)
* Identity provider JIT reactivation of users sometimes failed when there were configured group assignments. (OKTA-131784)
* In some circumstances, the link between the external Microsoft user and the Okta user was inaccurate.  (OKTA-132207)

## 2017.27

### Advance Notice: Data Retention Changes

Okta is changing system log data retention windows. System log data is available from `/api/v1/events` or
Okta SDK `EventsAPIClient`.

* For orgs created before July 17th, data older than six months will be removed.
* For orgs created on or after July 17th, data older than three months will be removed.

The new data retention policy starts:

* June 7, 2017 for existing preview orgs
* July 17, 2017 for existing production orgs

Preview and production orgs created on or after July 17, 2017, will retain log data for three months.

For the full data retention policy, see our [Data Retention Policy](https://support.okta.com/help/Documentation/Knowledge_Article/Okta-Data-Retention-Policy).

You can export data before Okta deletes it. We recommend using Security Information and Event Management (SIEM) technology or Okta's API. <!-- OKTA-125424 -->

### Platform Enhancements

* [Additional Scopes Available for Social Authentication](#additional-scopes-available-for-social-authentication)

* [New Versions of Sign-In Widget and Auth SDK for JS](#new-versions-of-sign-in-widget-and-auth-sdk-for-js)

#### Additional Scopes Available for Social Authentication

When using a Social Identity Provider, you can request information in stages. The initial request to `/oauth2/v1/authorize` can ask for a minimal set of scopes, and you can add scopes to collect additional user data in a subsequent request to the Social Identity Provider. This reduces friction during sign-in when users don't yet trust your app. For more information, see the descriptions of `idp_scope` in the [OAuth 2.0 API](/docs/reference/api/oidc/#request-parameters-1 ) and [OpenID Connect API](/docs/reference/api/oidc/#request-parameters-3) parameter tables.<!-- (OKTA-117521) -->

#### New Versions of Sign-In Widget and Auth SDK for JS

Version 1.11 of the [Okta Sign-In Widget](https://github.com/okta/okta-signin-widget/releases/tag/okta-signin-widget-1.11.0) and version 1.8 of the [Okta Auth SDK for JavaScript](https://github.com/okta/okta-auth-js) are available. Check out the new features and bug fixes!<!-- (OKTA-131642) -->

### Platform Bugs Fixed

* If any sign-in policy using MFA existed for an application, the Open ID Connect reauthentication flow redirected to multi-factor authentication (MFA) by default.  (OKTA-129094)
* Clients with `token_endpoint_auth_method` set to `client_secret_post` did not have a selected radio button on the Client Credentials UI (**Applications > _application name_ > General**).  (OKTA-130764)
* If you created a SAML 2.0 Identity Provider but omitted some fields, Okta reported an error.  (OKTA-131294)
* Okta Sign-In Widget failed to run when installed with `npm`.  (OKTA-131608)
* Updates to clients sometimes received an error response if they contained values for `client_id_issued_at` or `client_secret_expires_at`.  (OKTA-131647)
* API Access Management customers can no longer self-validate the Okta Access Token.  (OKTA-131885)

## 2017.26

### Advance Notice: Data Retention Changes

Okta is changing system log data retention windows. System log data is available from `/api/v1/events` or
Okta SDK `EventsAPIClient`.

* For orgs created before July 17th, data older than six months will be removed.
* For orgs created on or after July 17th, data older than three months will be removed.

The new data retention policy starts:

* June 7, 2017 for existing preview orgs
* July 17, 2017 for existing production orgs

Preview and production orgs created on or after July 17, 2017, will retain log data for three months.

For the full data retention policy, see our [Data Retention Policy](https://support.okta.com/help/Documentation/Knowledge_Article/Okta-Data-Retention-Policy).

You can export data before Okta deletes it. We recommend using Security Information and Event Management (SIEM) technology or Okta's API. <!-- OKTA-125424 -->

### Platform Enhancement: New Authentication Method for OpenID Connect and API Access Management
For OpenID Connect and API Access Management, Okta supports the `client_secret_jwt` method for token endpoint authentication (`token_endpoint_auth_method`).
This method is specified in the [OpenID Connect specification](http://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication)
and allows you to use JWT and HMAC to authenticate a client for [OAuth 2.0 and OpenID Connect](/docs/reference/api/oidc/#token-authentication-methods) requests.<!-- (OKTA-101074) -->

### Platform Bugs Fixed

* When suspicious activity was logged for OAuth 2.0 clients the invalid secret was not masked. (OKTA-129694)
* When validating the names of scopes for social identity providers, Okta didn't enforce the restrictions
specified in the [OAuth 2.0 spec](https://tools.ietf.org/html/rfc6749#section-3.3). (OKTA-117352)
* When the same user was created multiple times simultaneously and added to a group, the HTTP error
response code was 500 rather than 400. (OKTA-126223)
* `/api/v1/apps/${applicationId}/groups` didn't return groups if the specified app is inactive. (OKTA-123695)

## 2017.25

### Advance Notice: Data Retention Changes

Okta is changing system log data retention. System log data is available from `/api/v1/events` or
Okta SDK `EventsAPIClient`.

* For orgs created before July 17th, data will be retained for 6 months.
* For orgs created on and after July 17th, data will be retained for 3 months.

The new data retention policy starts:

* June 7, 2017 for existing preview orgs
* July 17, 2017 for existing production orgs

Preview and production orgs created on July 17, 2017 and later will retain this log data for three months.

For the full data retention policy, see our [Data Retention Policy](https://support.okta.com/help/Documentation/Knowledge_Article/Okta-Data-Retention-Policy).

You can export data before Okta deletes it. We recommend using Security Information and Event Management (SIEM) technology or Okta's API. <!-- OKTA-125424 -->

### Platform Enhancements

* [System Logs Track Key Rotation and Generation](#system-logs-track-key-rotation-and-generation)
* [Client Registration API Is an Early Access Feature](#client-registration-api-is-an-early-access-feature)
* [Create OAuth 2.0 and OpenID Connect Clients with the Apps API](#create-oauth-20-and-openid-connect-clients-with-apps-api)
* [OAuth 2.0 and OpenID Connect Client App Updates Available in System Log](#oauth-20-and-openid-connect-client-app-updates-available-in-system-log)
* [Support for RP-Initiated Logout](#support-for-rp-initiated-logout)
* [OAuth 2.0 and OpenID Connect .well-known Response Includes Registration Endpoint](#oauth-20-and-openid-connect-well-known-response-includes-registration-endpoint)


#### System Logs Track Key Rotation and Generation
Logged information about key rotation and generation for apps and identity providers is available by using GET requests to either of the following endpoints: `/api/v1/events` or `/api/v1/logs`.
For more information, see [Identity Provider Signing Key Store Operations](/docs/reference/api/idps/#identity-provider-signing-key-store-operations)
or [Update Key Credential for Application](/docs/reference/api/apps/#update-key-credential-for-application).

Here is a response from `/api/v1/logs`
![Logged Key Rotation Event](/img/release_notes/KeyRotateLog.png "Logged Key Rotation Event")
<!-- (OKTA-76607) -->

#### Client Registration API Is an Early Access Feature
The [Auth Clients API](/docs/reference/api/oauth-clients/) provides operations to register and manage client applications for use with Okta's
OAuth 2.0 and OpenID Connect endpoints.

#### Create OAuth 2.0 and OpenID Connect Clients with Apps API
The [Apps API](/docs/reference/api/apps/) supports creating and configuring
OAuth 2.0 or OpenID Connect clients. Alternatively, you can use
[Client Registration API](/docs/reference/api/oauth-clients/) (RFC 7591 and RFC 7592)
to create and manage clients.
<!-- (OKTA-78223) -->

#### OAuth 2.0 and OpenID Connect Client App Updates Available in System Log
Logged information about OAuth 2.0 client updates is now available by using GET requests to
either log endpoint: `/api/v1/events` or `/api/v1/logs`.

![Logged Key Rotation Event](/img/release_notes/DeactClientLog.png "Logged Key Rotation Event")
<!-- (OKTA-86738, OKTA-127445) -->

#### Support for RP-Initiated Logout
Okta supports [RP-intiated logout](http://openid.net/specs/openid-connect-session-1_0.html#RPLogout)
from OpenID Connect client apps in both the administrator UI and Okta API. You can specify a logout redirect URI,
or accept the default behavior of returning to the Okta Login page. You can access this feature on the
Create OpenID Connect Integration page (under Applications) in the UI.
<!-- (OKTA-94106) -->

#### OAuth 2.0 and OpenID Connect .well-known Response Includes Registration Endpoint
Okta returns the `registration_endpoint` in OAuth 2.0 and OpenID Connect `.well-known` responses.
<!-- (OKTA-127457) -->

### Platform Bugs Fixed

* [Invalid Availability of credentials.signing.kid](#invalid-availability-of-credentialssigningkid)
* [WWW-Authenticate Header in HTTP 401 Response](#www-authenticate-header-in-http-401-response)

#### Invalid Availability of credentials.signing.kid
The `credentials.signing.kid` property of an app was available even if its sign-on mode does not support
certificates. Only apps using the following sign-on mode types support certificates: SAML 2.0, SAML 1.1,
WS-Fed, or OpenID Connect. For more information,
see: [Application Key Store Operations](/docs/reference/api/apps/#application-key-store-operations) (OKTA-76439)

#### WWW-Authenticate Header in HTTP 401 Response
When a call to the token, introspect, or revocation endpoint of OpenID Connect or API Access Management
encountered an invalid_client error, the response did not include the WWW­Authenticate header. (OKTA-127653)

## 2017.24

### Advance Notices

* [Key Rollover Change](#key-rollover-change)
* [Data Retention Policy Changes](#data-retention-changes)

#### Key Rollover Change

Beginning in Release 2017.25, the `credentials.signing.kid` property of an app won't be available if the app doesn't support the key rollover feature.
An app supports key rollover if the app uses one of the following signing mode types: SAML 2.0, SAML 1.1, WS-Fed, or OpenID Connect.

Before this change takes effect, verify that your integration doesn't expect the `credentials.signing.kid` property
if your app doesn't have one of the listed signing mode types. This change is expected in Release 2017.25,
which is scheduled for preview orgs on June 21, 2017 and in production orgs on June 26, 2017. <!-- OKTA-76439 -->

#### Data Retention Changes

Okta is changing system log data retention. System log data is available from `/api/v1/events` or Okta SDK `EventsAPIClient`.

* For orgs created before July 17th, data will be retained for 6 months.
* For orgs created on and after July 17th, data will be retained for 3 months.

The new data retention policy starts:

* June 7, 2017 for existing preview orgs
* July 17, 2017 for existing production orgs

Preview and production orgs created on July 17,2017 and later will retain this log data for three months.

For the full data retention policy, see our [Data Retention Policy](https://support.okta.com/help/Documentation/Knowledge_Article/Okta-Data-Retention-Policy).

You can export data before Okta deletes it. We recommend using Security Information and Event Management (SIEM) technology or Okta's API. <!-- OKTA-125424 -->

### Platform Enhancements

* [Default Scopes for OAuth 2.0](#default-scopes-for-oauth-20)
* [Improved UI for Creating OpenID Connect Apps](#improved-ui-for-creating-openid-connect-apps)
* [Event Notifications for OpenID Connect Apps](#event-notifications-for-openid-connect-apps)
* [Query String Support in IdP Redirect URLs](#query-string-support-in-idp-redirect-urls)
* [API Rate Limit Improvements](#api-rate-limit-improvements)


#### Default Scopes for OAuth 2.0

Using either the administrator UI or API, you can configure default scopes for an OAuth 2.0 client.
If the client omits the scope parameter in an authorization request,
Okta returns all default scopes in the Access Token that are permitted by the access policy rule.

![Default Scope Configuration UI](/img/release_notes/default-scope.png "Default Scope Configuration UI")

For more information about setting default scopes in the API, see [OAuth 2.0 API](/docs/reference/api/authorization-servers/#scope-properties).
<!-- OKTA-122185 OKTA-122072 -->

#### Improved UI for Creating OpenID Connect Apps

The wizard for creating an OpenID Connect app has been improved and consolidated onto a single screen.

![New OpenID Connect Create Wizard](/img/release_notes/single-oidc-screen.png "New OpenID Connect Create Wizard")

<!-- OKTA-129127 -->

#### Event Notifications for OpenID Connect Apps

Notifications are entered in the System Log via the Events API (`/api/v1/events`) when OpenID Connect apps are created, modified, deactivated, or deleted.
Previously these notifications appeared only in the System Log (`/api/v1/logs`).

#### Query String Support in IdP Redirect URLs

Query strings are now supported in the definition of IdP Login URLs:

* The **IDP Login URL** field in the Add/Edit Endpoint wizard.
* The **IdP Single Sign-On URL** field for Inbound SAML. Reserved SAML parameters (SAMLRequest, RelayState, SigAlg, Signature) in a query string are ignored.<!-- OKTA-127771 -->

#### API Rate Limit Improvements

We are making org-wide rate limits more granular, and treating authenticated end-user interactions separately. More granular rate limits lessen the likelihood of calls to one URI impacting another. Treating authenticated end-user interactions separately lessens the chances of one user's request impacting another. We're also providing a transition period so you can see what these changes look like in your Okta system log before enforcing them:

##### Preview Orgs

We enforce new rate limits for all preview orgs. API calls exceeding the new rate limits return an HTTP 429 error.

##### Production Orgs

1. As of May 8, we enabled a System Log alert which lets you know if you have exceeded any of the new API rate limits:

    ```
    Warning: requests for url pattern <url-pattern> have reached
    a threshold of <number> requests per <time-duration>. Please
    be warned these rate limits will be enforced in the near future.
    ```

2. As of mid-May, we started enforcing these new rate limits for all newly created orgs. For these new orgs, instead of alerts in your System log, the API calls exceeding the new rate limits return an HTTP 429 error.

3. We are rolling out the enforcement of these new rate limits to all orgs this week. Once your org has the new limits, you'll see HTTP 429 errors instead of rate-limit warnings in the System Log if the new limits are exceeded.

For a full description of the new rate limits, see [API Rate Limits](/docs/reference/rate-limits/).<!-- OKTA-110472 -->

### Platform Bug Fixed

* The dropdown that controls Authorization Server lifecycle operations failed to display properly if you navigated directly to a tab or refreshed a tab other than Settings. (OKTA-129014)

## 2017.23

### Advance Notices

* [Data Retention Policy Changes](#data-retention-changes)
* [API Rate Limit Improvements](#api-rate-limit-improvements)
* [Simple HAL Links in Production Soon](#simple-hal-links-generally-available-in-preview-for-may-2017)

#### Data Retention Changes

Okta is changing system log data retention. System log data is available from `/api/v1/events` or Okta SDK `EventsAPIClient`.

* For orgs created before July 17th, data will be retained for 6 months.
* For orgs created on and after July 17th, data will be retained for 3 months.

The new data retention policy starts:

* June 7, 2017 for existing preview orgs
* July 17, 2017 for existing production orgs

Preview and production orgs created on July 17,2017 and later will retain this log data for three months.

For the full data retention policy, see our [Data Retention Policy](https://support.okta.com/help/Documentation/Knowledge_Article/Okta-Data-Retention-Policy).

You can export data before Okta deletes it. We recommend using Security Information and Event Management (SIEM) technology or Okta's API. <!-- OKTA-125424 -->

#### API Rate Limit Improvements

We are making org-wide rate limits more granular, and treating authenticated end-user interactions separately. More granular rate limits lessen the likelihood of calls to one URI impacting another. Treating authenticated end-user interactions separately lessens the chances of one user's request impacting another. We're also providing a transition period so you can see what these changes look like in your Okta system log before enforcing them:

##### Preview Orgs

We enforce new rate limits for all preview orgs. API calls exceeding the new rate limits return an HTTP 429 error.

##### Production Orgs

1. As of May 8, we have enabled a System Log alert which lets you know if you have exceeded any of the new API rate limits:

    ```
    Warning: requests for url pattern <url-pattern> have reached
    a threshold of <number> requests per <time-duration>. Please
    be warned these rate limits will be enforced in the near future.
    ```

2. As of mid-May, we started enforcing these new rate limits for all newly created orgs. For these new orgs, instead of alerts in your System log, the API calls exceeding the new rate limits return an HTTP 429 error.

3. In early June, we'll enforce these new rate limits for all orgs, and instead of alerts in your System Log, the API calls exceeding the new rate limits will return an HTTP 429 error.

For a full description of the new rate limits, see [API Rate Limits](/docs/reference/rate-limits/).<!-- OKTA-110472 -->

### Platform Enhancements

* [Authorization Server API Enhancements](#authorization-server-api-enhancements)
* [Additional Logging for Invalid Use by OAuth 2.0 Client](#additional-logging-for-invalid-use-by-oauth-20-client)
* [Restrictions on Set Recovery and Set Password Operations](#restrictions-on-set-recovery-question-answer-and-set-password)
* [Step-up Authentication for SAML Apps in Early Access](#step-up-authentication-for-saml-apps-is-an-early-access-feature)
* [Simple HAL Links](#simple-hal-links-generally-available-in-preview-for-may-2017)

#### Authorization Server API Enhancements

You can now use the Authorization Server API to configure components of an Authorization Server.
With the following enhancements, the API Access Management Authorization Servers API is an <ApiLifecycle access="ea" /> Release:

* Manage Authorization Server policies, policy rules, claims, and scopes with the API.
* Activate or deactivate Authorization Servers, or delete them.
* Scopes were actions previously, but are now conditions in a policy rule.
* Control which claims are returned in ID tokens with the `alwaysIncludeInToken` property. You can also configure this in the [administrator UI](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_API_Access).

For more information see the [Authorization Server API documentation](/docs/reference/api/authorization-servers/#authorization-server-operations).
<!-- OKTA-127511, OKTA-123638 -->

#### Additional Logging for Invalid Use by OAuth 2.0 Client

If Okta detects five or more consecutive request attempts with the wrong client secret, we log the events as suspicious:

* The requests may be to any OAuth 2.0 endpoint that accepts client credentials.
* The counter resets after 14 days of no invalid authentication attempts, or after a successful authentication.

We log an event when an invalid `client_id` is provided, and when an invalid `client_secret` is provided for a given `client_id`.<!-- OKTA-122503 -->

#### Restrictions on Set Recovery Question Answer and Set Password

The API operations Set Recovery Question Answer and Set Password must be requested with an API token, not a session token.
Additionally, the Set Recovery Question Answer operation doesn't validate complexity policies or credential policies. <!-- OKTA-126826, OKTA-126824 -->

#### Step-up Authentication for SAML Apps is an Early Access Feature

Every step-up transaction starts with a user accessing an application. If step-up authentication is required, Okta redirects the user to the custom login page with state token as a request parameter.
For more information, see the [SP initiated Step-up Authentication documentation](/docs/reference/api/authn/#sp-initiated-step-up-authentication).

#### Simple HAL Links Generally Available in Preview for May, 2017

Okta has enabled the Simple HAL Links on User Collections feature for most preview organizations.
This feature removes the HAL links that reflect state from user objects returned in collections.

>Important: Okta expects to deliver this feature to production orgs (with the same Okta .NET SDK caveats described below) starting June 12, 2017.

Before release 2017.19, a user object returned in a collection contained some or all of the following links:

```
"_links": {
    "suspend": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/suspend",
      "method": "POST"
    },
    "resetPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/reset_password",
      "method": "POST"
    },
    "expirePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/expire_password",
      "method": "POST"
    },
    "forgotPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/credentials/forgot_password",
      "method": "POST"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3"
    },
    "changeRecoveryQuestion": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/credentials/change_recovery_question",
      "method": "POST"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/deactivate",
      "method": "POST"
    },
    "changePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/credentials/change_password",
      "method": "POST"
    }
}
```

Unfortunately, these links are not guaranteed to accurately reflect the state of the specified user.
As outlined in [Design Principles](/docs/reference/api-overview/#links-in-collections):

"Search and list operations are intended to find matching resources and their identifiers. If you intend to search for a resource and then modify its state or make a lifecycle change, the correct pattern is to first retrieve the resource by ID using the `self` link provided for that resource in the collection. This will provide the full set of lifecycle links for that resource based on its most up-to-date state."

The Simple HAL Links on User Collections feature ensures that possibly invalid state links are not returned.  Instead only the `self` link is returned:

```
"_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3"
    }
}
```

As noted above, to change user state, the `self` link should be called to retrieve a user object with up-to-date links.

>Important: Not all preview organizations will receive this feature. Okta has identified preview organizations that depend on the Okta .NET SDK, which requires the old functionality. Okta won't enable the feature for these orgs. Instead, when the SDK issue is resolved, Okta will send a customer communication explaining the migration path to enable the feature for those orgs.

### Platform Bugs Fixed

* When completing enrollment for SMS and call factors, the API forced end users to verify the factor that was just enrolled. (OKTA-125923)
* When using a refresh token, default scope requests sometimes failed. (OKTA-127671)

## 2017.22

### Advance Notice: API Rate Limit Improvements

We are making org-wide rate limits more granular, and treating authenticated end-user interactions separately. More granular rate limits lessen the likelihood of calls to one URI impacting another. Treating authenticated end-user interactions separately lessens the chances of one user's request impacting another. We're also providing a transition period so you can see what these changes look like in your Okta system log before enforcing them:

#### Preview Orgs

1. We enforce new rate limits for new preview orgs. For these new orgs, the API calls exceeding the new rate limits return an HTTP 429 error.

2. At the end of May, we'll enforce these new rate limits for all preview orgs. Instead of alerts in your System Log, the API calls exceeding the new rate limits will return an HTTP 429 error.

#### Production Orgs

1. As of May 8, we have enabled a System Log alert which lets you know if you have exceeded any of the new API rate limits:

    ```
    Warning: requests for url pattern <url-pattern> have reached
    a threshold of <number> requests per <time-duration>. Please
    be warned these rate limits will be enforced in the near future.
    ```

2. As of mid-May, we started enforcing these new rate limits for all newly created orgs. For these new orgs, instead of alerts in your System log, the API calls exceeding the new rate limits return an HTTP 429 error.

3. In early June, we'll enforce these new rate limits for all orgs, and instead of alerts in your System Log, the API calls exceeding the new rate limits will return an HTTP 429 error.

For a full description of the new rate limits, see [API Rate Limits](/docs/reference/rate-limits/).<!-- OKTA-110472 -->

### Platform Bugs Fixed

* OpenID Connect and OAuth 2.0 requests failed to respect default SAML IdP configuration. (OKTA-127155)
* Using the resource owner password credentials flow for an Active Directory user sometimes resulted in a malformed response instead of an Access Token. (OKTA-121082)

### Simple HAL Links Generally Available in Preview for May, 2017

Okta has enabled the Simple HAL Links on User Collections feature for most preview organizations.
This feature removes the HAL links that reflect state from user objects returned in collections.

Before release 2017.19, a user object returned in a collection contains some or all of the following links:

```
"_links": {
    "suspend": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/suspend",
      "method": "POST"
    },
    "resetPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/reset_password",
      "method": "POST"
    },
    "expirePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/expire_password",
      "method": "POST"
    },
    "forgotPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/credentials/forgot_password",
      "method": "POST"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3"
    },
    "changeRecoveryQuestion": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/credentials/change_recovery_question",
      "method": "POST"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/deactivate",
      "method": "POST"
    },
    "changePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/credentials/change_password",
      "method": "POST"
    }
}
```

Unfortunately, these links are not guaranteed to accurately reflect the state of the specified user.
As outlined in [Design Principles](/docs/reference/api-overview/#links-in-collections):

"Search and list operations are intended to find matching resources and their identifiers. If you intend to search for a resource and then modify its state or make a lifecycle change, the correct pattern is to first retrieve the resource by ID using the `self` link provided for that resource in the collection. This will provide the full set of lifecycle links for that resource based on its most up-to-date state."

The Simple HAL Links on User Collections feature ensures that possibly invalid state links are not returned.  Instead only the `self` link is returned:

```
"_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3"
    }
}
```

As noted above, to change user state, the `self` link should be called to retrieve a user object with up-to-date links.

>Important: Not all preview organizations will receive this feature. Okta has identified preview organizations that depend on the Okta .NET SDK, which requires the old functionality. Okta won't enable the feature for these orgs. Instead, when the SDK issue is resolved, Okta will send a customer communication explaining the migration path to enable the feature for those orgs.
Okta expects to deliver this feature in production orgs (with the same Okta .NET SDK caveats) starting June 12, 2017.

## 2017.21

### Advance Notice: API Rate Limit Improvements

We are making org-wide rate limits more granular, and treating authenticated end-user interactions separately. More granular rate limits lessen the likelihood of calls to one URI impacting another. Treating authenticated end-user interactions separately lessens the chances of one user's request impacting another. We're also providing a transition period so you can see what these changes look like in your Okta system log before enforcing them:

#### Preview Orgs

1. We enforce new rate limits for new preview orgs. For these new orgs, the API calls exceeding the new rate limits return an HTTP 429 error.

2. In mid-May, we'll enforce these new rate limits for all preview orgs. Instead of alerts in your System Log, the API calls exceeding the new rate limits will return an HTTP 429 error.

#### Production Orgs

1. As of May 8, we have enabled a System Log alert which lets you know if you have exceeded any of the new API rate limits:

    `Warning: requests for url pattern <url-pattern> have reached
    a threshold of <number> requests per <time-duration>. Please
    be warned these rate limits will be enforced in the near future.`

2. In mid-May, we'll enforce these new rate limits for all newly created orgs. For these new orgs, instead of alerts in your System log, the API calls exceeding the new rate limits return an HTTP 429 error.

3. In early June, we'll enforce these new rate limits for all orgs, and instead of alerts in your System Log, the API calls exceeding the new rate limits will return an HTTP 429 error.

For a full description of the new rate limits, see [API Rate Limits](/docs/reference/rate-limits/).<!-- OKTA-110472 -->

### Platform Feature Improvement: System Log Notifications for OpenID Connect Apps

Notifications are entered in the [System Log](/docs/reference/api/system-log/) when OpenID Connect apps are created or updated.

### Platform Bugs Fixed

* SAML Apps containing more than one SAML attribute caused pagination issues on `/api/v1/apps`. (OKTA-123220, OKTA-122423, OKTA-115762)
* Native clients that are OpenID Connect apps require the `authorization_code` grant type. This requirement was not enforced correctly. (OKTA-123471)
* Requests to configure inbound SAML IdPs (`/api/v1/idps`) that included duplicated group IDs failed. (OKTA-124853)

#### Simple HAL Links Generally Available in Preview for May, 2017

Okta has enabled the Simple HAL Links on User Collections feature for most preview organizations.
This feature removes the HAL links that reflect state from user objects returned in collections.

Before release 2017.19, a user object returned in a collection contains some or all of the following links:

```
"_links": {
    "suspend": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/suspend",
      "method": "POST"
    },
    "resetPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/reset_password",
      "method": "POST"
    },
    "expirePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/expire_password",
      "method": "POST"
    },
    "forgotPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/credentials/forgot_password",
      "method": "POST"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3"
    },
    "changeRecoveryQuestion": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/credentials/change_recovery_question",
      "method": "POST"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/deactivate",
      "method": "POST"
    },
    "changePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/credentials/change_password",
      "method": "POST"
    }
}
```

Unfortunately, these links are not guaranteed to accurately reflect the state of the specified user.
As outlined in [Design Principles](/docs/reference/api-overview/#links-in-collections):

"Search and list operations are intended to find matching resources and their identifiers. If you intend to search for a resource and then modify its state or make a lifecycle change, the correct pattern is to first retrieve the resource by ID using the `self` link provided for that resource in the collection. This will provide the full set of lifecycle links for that resource based on its most up-to-date state."

The Simple HAL Links on User Collections feature ensures that possibly invalid state links are not returned.  Instead only the `self` link is returned:

```
"_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3"
    }
}
```

As noted above, to change user state, the `self` link should be called to retrieve a user object with up-to-date links.

>Important: Not all preview organizations will receive this feature. Okta has identified preview organizations that depend on the Okta .NET SDK, which requires the old functionality. Okta won't enable the feature for these orgs. Instead, when the SDK issue is resolved, Okta will send a customer communication explaining the migration path to enable the feature for those orgs.

## 2017.20

### Advance Notice: API Rate Limit Improvements

We are making org-wide rate limits more granular, and treating authenticated end-user interactions separately. More granular rate limits lessen the likelihood of calls to one URI impacting another. Treating authenticated end-user interactions separately lessens the chances of one user's request impacting another. We're also providing a transition period so you can see what these changes look like in your Okta system log before enforcing them:

#### Preview Orgs

1. We enforce new rate limits for new preview orgs. For these new orgs, the API calls exceeding the new rate limits return an HTTP 429 error.

2. In mid-May, we'll enforce these new rate limits for all preview orgs. Instead of alerts in your System Log, the API calls exceeding the new rate limits will return an HTTP 429 error.

#### Production Orgs

1. As of May 8, we have enabled a System Log alert which lets you know if you have exceeded any of the new API rate limits:

    `Warning: requests for url pattern <url-pattern> have reached
    a threshold of <number> requests per <time-duration>. Please
    be warned these rate limits will be enforced in the near future.`

2. In mid-May, we'll enforce these new rate limits for all newly created orgs. For these new orgs, instead of alerts in your System log, the API calls exceeding the new rate limits return an HTTP 429 error.

3. In early June, we'll enforce these new rate limits for all orgs, and instead of alerts in your System Log, the API calls exceeding the new rate limits will return an HTTP 429 error.

For a full description of the new rate limits, see [API Rate Limits](/docs/reference/rate-limits/).<!-- OKTA-110472 -->

### Platform Feature Improvements

#### Okta Expression Language Function for Filtering Groups

Use the Okta Expression Language function `getFilteredGroups` to create a list of groups that the current user belongs to.
With such a list you can, for example, create claims in Access Tokens and ID Tokens based on the groups.
For more information, see [Group Functions](/docs/reference/okta-expression-language/#group-functions). <!--OKTA-123127-->

#### New Profile Property for Apps

The `profile` property in the Apps API accepts any well-formed JSON schema. You can specify properties in the profile and then access them in API requests.
For example:

* Add an app manager contact email address.
* Use the profile to define a whitelist of groups that you can then reference and pass as claims using the [Okta Expression Language function `getFilteredGroups`](/docs/reference/okta-expression-language/#group-functions).

For more information, see the [Apps API](/docs/reference/api/apps/#profile-object).

Note that the status code for service claims errors has changed from 500 to 400 as part of this feature. <!--OKTA-123128-->

#### Added Login Hint to OAuth 2.0 and OpenID Connect API

Use the `login_hint` property on `/oauth2/${authServerId}/v1/authorize` or `/oauth2/v1/authorize` to populate a username when prompting for authentication. <!-- OKTA-87073-->

### Platform Bugs Fixed

* Updating the OpenID Connect property `max_age` incorrectly caused a new session to be created, which updated the `createdAt` timestamp. (OKTA-99850)
* The property `application_type` in the [OAuth 2.0 Clients API](/docs/reference/api/oauth-clients/) could be edited. (OKTA-120223)
* User profile attributes could be fetched via the API even though attributes were marked hidden, if the user sending the request was the user being fetched. (OKTA-123882)
* Reordering Authorization Server policies failed. (OKTA-125156)
* (Preview fix) Fixed issue involving OpenID Connect and OAuth 2.0 requests within SAML IdP configuration. (OKTA-127155)
* The Zones API documentation was incorrectly announced as Generally Available in 2017.19. It is [a Beta release](/docs/reference/releases-at-okta/).

#### Simple HAL Links Generally Available in Preview for May, 2017

Okta has enabled the Simple HAL Links on User Collections feature for most preview organizations.
This feature removes the HAL links that reflect state from user objects returned in collections.

Before release 2017.19, a user object returned in a collection contains some or all of the following links:

```
"_links": {
    "suspend": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/suspend",
      "method": "POST"
    },
    "resetPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/reset_password",
      "method": "POST"
    },
    "expirePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/expire_password",
      "method": "POST"
    },
    "forgotPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/credentials/forgot_password",
      "method": "POST"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3"
    },
    "changeRecoveryQuestion": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/credentials/change_recovery_question",
      "method": "POST"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/deactivate",
      "method": "POST"
    },
    "changePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/credentials/change_password",
      "method": "POST"
    }
}
```

Unfortunately, these links are not guaranteed to accurately reflect the state of the specified user.
As outlined in [Design Principles](/docs/reference/api-overview/#links-in-collections):

"Search and list operations are intended to find matching resources and their identifiers. If you intend to search for a resource and then modify its state or make a lifecycle change, the correct pattern is to first retrieve the resource by 'id' using the "self" link provided for that resource in the collection. This will provide the full set of lifecycle links for that resource based on its most up-to-date state."

The Simple HAL Links on User Collections feature ensures that possibly invalid state links are not returned.  Instead only the `self` link is returned:

```
"_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3"
    }
}
```

As noted above, to change user state, the `self` link should be called to retrieve a user object with up-to-date links.

>Important: Not all preview organizations will receive this feature. Okta has identified preview organizations that depend on the Okta .NET SDK, which requires the old functionality. Okta won't enable the feature for these orgs. Instead, when the SDK issue is resolved, Okta will send a customer communication explaining the migration path to enable the feature for those orgs.


## 2017.19

### Advance Notice: API Rate Limit Improvements

We are making org-wide rate limits more granular, and treating authenticated end-user interactions separately. More granular rate limits lessen the likelihood of calls to one URI impacting another. Treating authenticated end-user interactions separately lessens the chances of one user's request impacting another. We're also providing a transition period so you can see what these changes look like in your Okta system log before enforcing them:

#### Preview Orgs

1. We enforce new rate limits for new preview orgs. For these new orgs, the API calls exceeding the new rate limits return an HTTP 429 error.

2. In mid-May, we'll enforce these new rate limits for all preview orgs. Instead of alerts in your System Log, the API calls exceeding the new rate limits will return an HTTP 429 error.

#### Production Orgs

1. As of May 8, we have enabled a System Log alert which lets you know if you have exceeded any of the new API rate limits:

    `Warning: requests for url pattern <url-pattern> have reached
    a threshold of <number> requests per <time-duration>. Please
    be warned these rate limits will be enforced in the near future.`

2. In mid-May, we'll enforce these new rate limits for all newly created orgs. For these new orgs, instead of alerts in your System log, the API calls exceeding the new rate limits return an HTTP 429 error.

3. In early June, we'll enforce these new rate limits for all orgs, and instead of alerts in your System Log, the API calls exceeding the new rate limits will return an HTTP 429 error.

For a full description of the new rate limits, see [API Rate Limits](/docs/reference/rate-limits/).<!-- OKTA-110472 -->

### Platform Feature Improvements

* [Zones API Generally Available in Preview](#zones-api-is-now-generally-available)
* [Simple HAL Links Generally Available in Preview](#simple-hal-links-generally-available-in-preview)

#### Zones API is Now Generally Available

The Zones API is now Generally Available in preview orgs. It will be at least one month before the Zones API is available in production.

Zones are used to group IP Address ranges so that policy decisions can be made based on the zone a client's IP belongs to.

For more information, see [the Zones API developer documentation](/docs/reference/api/zones/).

> Update: Zones API is [a Beta release](/docs/reference/releases-at-okta/). This release note is in error.

#### Simple HAL Links Generally Available in Preview

Okta has enabled the Simple HAL Links on User Collections feature for most preview organizations.
This feature will remain in preview for at least one month.

This feature removes the HAL links that reflect state from user objects returned in collections.

Before release 2017.19, a user object returned in a collection contains some or all of the following links:

```
"_links": {
    "suspend": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/suspend",
      "method": "POST"
    },
    "resetPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/reset_password",
      "method": "POST"
    },
    "expirePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/expire_password",
      "method": "POST"
    },
    "forgotPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/credentials/forgot_password",
      "method": "POST"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3"
    },
    "changeRecoveryQuestion": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/credentials/change_recovery_question",
      "method": "POST"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/deactivate",
      "method": "POST"
    },
    "changePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/credentials/change_password",
      "method": "POST"
    }
}
```

Unfortunately, these links are not guaranteed to accurately reflect the state of the specified user.
As outlined in [Design Principles](/docs/reference/api-overview/#links-in-collections):

"Search and list operations are intended to find matching resources and their identifiers. If you intend to search for a resource and then modify its state or make a lifecycle change, the correct pattern is to first retrieve the resource by 'id' using the "self" link provided for that resource in the collection. This will provide the full set of lifecycle links for that resource based on its most up-to-date state."

The Simple HAL Links on User Collections feature ensures that possibly invalid state links are not returned.  Instead only the `self` link is returned:

```
"_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3"
    }
}
```

As noted above, to change user state, the `self` link should be called to retrieve a user object with up-to-date links.

>Important: Not all preview organizations will receive this feature. Okta has identified preview organizations that depend on the Okta .NET SDK, which requires the old functionality. Okta won't enable the feature for these orgs. Instead, when the SDK issue is resolved, Okta will send a customer communication explaining the migration path to enable the feature for those orgs.

### Platform Bugs Fixed

* Some queries on `/api/v1/apps` with incorrect filter parameters returned an empty `_embedded node` in the response instead of the correct error message. (OKTA-124544)
* Multifactor authentication with RSA failed for some orgs. (OKTA-125862)

## 2017.18

### Advance Notices

The items in this section are scheduled for future releases. Although we share our expected release dates, these dates are subject to change.

* [API Rate Limit Improvements](#api-rate-limit-improvements)
* [Simple HAL Links](#simple-hal-links)

#### API Rate Limit Improvements

We are making org-wide rate limits more granular, and treating authenticated end-user interactions separately. More granular rate limits lessen the likelihood of calls to one URI impacting another. Treating authenticated end-user interactions separately lessens the chances of one user's request impacting another. We're also providing a transition period so you can see what these changes look like in your Okta system log before enforcing them:

##### Preview Orgs

1. As of last week, we enabled a System Log alert which lets you know if you have exceeded any of the new API rate limits:

    `Warning: requests for url pattern <url-pattern> have reached
    a threshold of <number> requests per <time-duration>. Please
    be warned these rate limits will be enforced in the near future.`

2. As of May 2, 2017, we enforce these new rate limits for all new preview orgs. For these new orgs, instead of alerts in your System Log, the API calls exceeding the new rate-limits return an HTTP 429 error.

3. In mid-May, we'll enforce these new rate limits for all preview orgs. Instead of alerts in your System Log, the API calls exceeding the new rate-limits return an HTTP 429 error.

##### Production Orgs

1. In early May, we'll enable a System Log alert which lets you know if you have exceeded any of the new API rate limits:

    `Warning: requests for url pattern <url-pattern> have reached
    a threshold of <number> requests per <time-duration>. Please
    be warned these rate limits will be enforced in the near future.`

2. In mid-May, we'll enforce these new rate limits for all newly created orgs. For these new orgs, instead of alerts in your System log, the API calls exceeding the new rate-limits return an HTTP 429 error.

3. In early June, we'll enforce these new rate limits for all orgs, and instead of alerts in your System Log, the API calls exceeding the new rate-limits return an HTTP 429 error.

For a full description of the new rate limits, see [API Rate Limits](/docs/reference/rate-limits/).<!-- OKTA-110472 -->

#### Simple HAL Links

Okta will enable the Simple HAL Links on User Collections feature for most preview organizations.
This change is currently scheduled for the 2017.19 release on 5/10/17, to remain in preview for at least one month.

This feature will remove the HAL links that reflect state from user objects returned in collections.

Currently, a user object returned in a collection contains some or all of the following links:

```
"_links": {
    "suspend": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/suspend",
      "method": "POST"
    },
    "resetPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/reset_password",
      "method": "POST"
    },
    "expirePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/expire_password",
      "method": "POST"
    },
    "forgotPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/credentials/forgot_password",
      "method": "POST"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3"
    },
    "changeRecoveryQuestion": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/credentials/change_recovery_question",
      "method": "POST"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/deactivate",
      "method": "POST"
    },
    "changePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/credentials/change_password",
      "method": "POST"
    }
}
```

Unfortunately, these links are not guaranteed to accurately reflect the state of the specified user.
As outlined in [Design Principles](/docs/reference/api-overview/#links-in-collections):

"Search and list operations are intended to find matching resources and their identifiers. If you intend to search for a resource and then modify its state or make a lifecycle change, the correct pattern is to first retrieve the resource by 'id' using the "self" link provided for that resource in the collection. This will provide the full set of lifecycle links for that resource based on its most up-to-date state."

The Simple HAL Links on User Collections feature ensures that possibly invalid state links are not returned.  Instead only the `self` link is returned:

```
"_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3"
    }
}
```

As noted above, to change user state, the `self` link should be called to retrieve a user object with up-to-date links.

>Important: Not all preview organizations will receive this feature. Okta has identified preview organizations that depend on the Okta .NET SDK, which requires the old functionality. Okta won't enable the feature for these orgs. Instead, when the SDK issue is resolved, Okta will send a customer communication explaining the migration path to enable the feature for those orgs.

### Platform Feature Improvement: View Access Tokens from Social Authentication

Using `GET /api/v1/idps/${idpId}/users/${userId}/credentials/tokens`, you can fetch the Access Tokens minted by a social authentication provider.
When a user authenticates to Okta via a Social IdP, this request returns the tokens and metadata provided by the Social IdP.
Clients can use the Access Token against the social provider's endpoints in order to fetch additional profile attributes that Okta doesn't support in Universal Directory, for example, nested attributes.
For more information, see the [Identity Providers API](/docs/reference/api/idps/#social-authentication-token-operation). <!-- OKTA-118687 -->

### Platform Bugs Fixed

 * Searches on [User](/docs/reference/api/users/#list-users-with-search) incorrectly returned deleted users or out-of-date user status in some cases. (OKTA-116928)
 * Some orgs were unable to add OpenID Connect or OAuth 2.0 clients to an access policy in a custom Authorization Server. (OKTA-117630)
 * When deleting a claim from a custom Authorization Server, the Delete dialog didn't close after clicking **OK** or **Cancel**. (OKTA-124271)
 * Read-only Administrator UI didn't exactly match that role's access rights. (OKTA-123116)

## 2017.17

### Advance Notices

The items in this section are scheduled for future releases. Although we share our expected release dates, these dates are subject to change.

* [API Rate Limit Improvements](#api-rate-limit-improvements)
* [Simple HAL Links](#simple-hal-links)

#### API Rate Limit Improvements

We are making org-wide rate limits more granular, and treating authenticated end-user interactions separately. More granular rate limits lessen the likelihood of calls to one URI impacting another. Treating authenticated end-user interactions separately lessens the chances of one user's request impacting another. We're also providing a transition period so you can see what these changes look like in your Okta system log before enforcing them:

##### Preview Orgs

1. As of last week, we enabled a System Log alert which lets you know if you have exceeded any of the new API rate limits:

    `Warning: requests for url pattern <url-pattern> have reached
    a threshold of <number> requests per <time-duration>. Please
    be warned these rate limits will be enforced in the near future.`

2. In early May, we'll enforce these new rate limits for all new preview orgs. For these new orgs, instead of alerts in your System Log, the API calls exceeding the new rate-limits return an HTTP 429 error.

3. In mid-May, we'll enforce these new rate limits for all preview orgs. Instead of alerts in your System Log, the API calls exceeding the new rate-limits return an HTTP 429 error.

##### Production Orgs

1. In early May, we'll enable a System Log alert which lets you know if you have exceeded any of the new API rate limits:

    `Warning: requests for url pattern <url-pattern> have reached
    a threshold of <number> requests per <time-duration>. Please
    be warned these rate limits will be enforced in the near future.`

2. In mid-May, we'll enforce these new rate limits for all newly created orgs. For these new orgs, instead of alerts in your System log, the API calls exceeding the new rate-limits return an HTTP 429 error.

3. In early June, we'll enforce these new rate limits for all orgs, and instead of alerts in your System Log, the API calls exceeding the new rate-limits return an HTTP 429 error.

For a full description of the new rate limits, see [API Rate Limits](/docs/reference/rate-limits/).<!-- OKTA-110472 -->

#### Simple HAL Links

Okta will enable the Simple HAL Links on User Collections feature for most preview organizations.
This change is currently scheduled for the 2017.19 release on 5/10/17, to remain in preview for at least one month.

This feature will remove the HAL links that reflect state from user objects returned in collections.

Currently, a user object returned in a collection contains some or all of the following links:

```
"_links": {
    "suspend": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/suspend",
      "method": "POST"
    },
    "resetPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/reset_password",
      "method": "POST"
    },
    "expirePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/expire_password",
      "method": "POST"
    },
    "forgotPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/credentials/forgot_password",
      "method": "POST"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3"
    },
    "changeRecoveryQuestion": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/credentials/change_recovery_question",
      "method": "POST"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/deactivate",
      "method": "POST"
    },
    "changePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/credentials/change_password",
      "method": "POST"
    }
}
```

Unfortunately, these links are not guaranteed to accurately reflect the state of the specified user.
As outlined in [Design Principles](/docs/reference/api-overview/#links-in-collections):

"Search and list operations are intended to find matching resources and their identifiers. If you intend to search for a resource and then modify its state or make a lifecycle change, the correct pattern is to first retrieve the resource by 'id' using the "self" link provided for that resource in the collection. This will provide the full set of lifecycle links for that resource based on its most up-to-date state."

The Simple HAL Links on User Collections feature ensures that possibly invalid state links are not returned.  Instead only the `self` link is returned:

```
"_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3"
    }
}
```

As noted above, to change user state, the `self` link should be called to retrieve a user object with up-to-date links.

>Important: Not all preview organizations will receive this feature. Okta has identified preview organizations that depend on the Okta .NET SDK, which requires the old functionality. Okta won't enable the feature for these orgs. Instead, when the SDK issue is resolved, Okta will send a customer communication explaining the migration path to enable the feature for those orgs.

### Platform Feature Improvement: New Default for startDate

A new default value for `startDate` ensures better performance. If the following criteria are met, the default value for `startDate` is one hour before the request was sent:

* `startDate` is omitted AND
* The filter expression contains no time window AND
* `after` is omitted

If your org or integrations depend on the previous behavior, you can request the previous behavior be enabled.

### Platform Bugs Fixed

 * Removing the last app target from an `APP_ADMIN` role assignment changed the scope of the role assignment to all app targets. Now an exception is thrown.
    To target all apps, delete the APP_ADMIN role assignment and recreate it. (OKTA-115122)
 * Adding the first app target failed to change the scope of the role assignment from applying to all app targets to only applying to the specified target.
    See [Administrator Roles API](/docs/reference/api/roles/#add-app-target-to-app-administrator-role) for details. (OKTA-115122)
 * Application Administrators were incorrectly able to create an OpenID Connect service client even though they weren't assigned an OpenID Connect client app. (OKTA-115168)
 * Some orgs weren't able to deprovision a user, receiving an incorrect 403 error: "Operation failed because user profile is mastered under another system." (OKTA-119549)
<!-- * Read-only Administrators were incorrectly able to view the administrator UI for deleting authorization servers. (OKTA-123116) hold for production -->



## 2017.16

### Advance Notices

The items in this section are scheduled for future releases. Although we share our expected release dates, these dates are subject to change.

#### API Rate Limit Improvements

We are making org-wide rate limits more granular, and treating authenticated end-user interactions separately. More granular rate limits will further lessen the likelihood of calls to one URI impacting another. Treating authenticated end-user interactions separately will lessen the chances of one user's impacting another. We're also providing a transition period so you can see what these changes will look like in your Okta system log before enforcing them:

1. After Monday, 2017-04-17, you'll see system log alerts that let you know if you would have exceeded any of the new API rate limits. We're making this feature available to all preview orgs, and the feature will remain in preview for at least two weeks.

2. Starting later in April, 2017, we'll treat authenticated end-user interactions on a per-user basis. Interactions like SSO after login won't apply to your org-wide API rate limits.

3. Early in May, 2017, we will enforce the new, more granular rate limits. At that point, the warnings in the System Log will change to error notifications.

Of course, as each change is released, we'll announce the change here.

For a full description of the rate limit changes, see [API Rate Limits](/docs/reference/rate-limits/).<!-- OKTA-110472 -->

#### Simple HAL Links

Okta will enable the Simple HAL Links on User Collections feature for most preview organizations.
This change is currently scheduled for the 2017.19 release on 5/10/17, to remain in preview for at least one month.

This feature will remove the HAL links that reflect state from user objects returned in collections.

Currently, a user object returned in a collection contains some or all of the following links:

```
"_links": {
    "suspend": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/suspend",
      "method": "POST"
    },
    "resetPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/reset_password",
      "method": "POST"
    },
    "expirePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/expire_password",
      "method": "POST"
    },
    "forgotPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/credentials/forgot_password",
      "method": "POST"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3"
    },
    "changeRecoveryQuestion": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/credentials/change_recovery_question",
      "method": "POST"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/deactivate",
      "method": "POST"
    },
    "changePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/credentials/change_password",
      "method": "POST"
    }
}
```

Unfortunately, these links are not guaranteed to accurately reflect the state of the specified user.
As outlined in [Design Principles](/docs/reference/api-overview/#links-in-collections):

"Search and list operations are intended to find matching resources and their identifiers. If you intend to search for a resource and then modify its state or make a lifecycle change, the correct pattern is to first retrieve the resource by 'id' using the "self" link provided for that resource in the collection. This will provide the full set of lifecycle links for that resource based on its most up-to-date state."

The Simple HAL Links on User Collections feature ensures that possibly invalid state links are not returned.  Instead only the `self` link is returned:

```
"_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3"
    }
}
```

As noted above, to change user state, the `self` link should be called to retrieve a user object with up-to-date links.

>Important: Not all preview organizations will receive this feature. Okta has identified preview organizations that depend on the Okta .NET SDK, which requires the old functionality.
Okta won't enable the feature for these orgs.
Instead, Okta will send a customer communication explaining the migration path to enable the feature.

### Platform Feature Improvement: Zones API Generally Available in Preview

Access policies can now be defined based on an IP address range using [the Zones API](/docs/reference/api/zones/).
This feature is Generally Available in preview orgs for at least one month before being Generally Available in production. <!-- OKTA-121280 -->

### Platform Bugs Fixed

 * When a group was deleted, if that group was referenced by a social or SAML IdP, the reference wasn't removed.
    These references caused errors when trying to configure the social or SAML IdP. (OKTA-116909)
 * If the SAML IdP parameter `idp` was specified in the query string for a request to the `oauth2/v1/authorize` endpoint, the request failed in some orgs. (OKTA-120122)
 * Creating or saving access policies for an authorization server failed for some client IDs. (OKTA-121230)


## 2017.14

### Advance Notice: API Rate Limit Improvements

We are making org-wide rate limits more granular, and treating authenticated end-user interactions separately. More granular rate limits will further lessen the likelihood of calls to one URI impacting another. Treating authenticated end-user interactions separately will lessen the chances of one user's impacting another. We're also providing a transition period so you can see what these changes will look like in your Okta system log before enforcing them:

1. After Monday, 2017-04-17, you'll see system log alerts that let you know if you would have exceeded any of the new API rate limits. We're making this feature available to all preview orgs, and the feature will remain in preview for at least two weeks.

2. Starting later in April, 2017, we'll treat authenticated end-user interactions on a per-user basis. Interactions like SSO after login won't apply to your org-wide API rate limits.

3. Early in May, 2017, we will enforce the new, more granular rate limits. At that point, the warnings in the System Log will change to error notifications.

Of course, as each change is released, we'll announce the change here.

For a full description of the rate limit changes, see [API Rate Limits](/docs/reference/rate-limits/).<!-- OKTA-110472 -->

### Platform Feature Improvements

#### Revoke Access Tokens and Refresh Tokens

Use the `oauthTokens` parameter when clearing user sessions to revoke all OpenID Connect and OAuth Access Tokens and Refresh Tokens
issued to the user. For more information, see [the Users API](/docs/reference/api/users/#clear-user-sessions).<!-- OKTA-116904 -->

#### Token Requests with Grant Type password

Token requests with `password` grant type (`grant_type`) and `openid` scope now return an ID Token.
Previously only the appropriate Access Token or Refresh Token was returned. <!-- OKTA-117288 -->

#### Authentication That Overrides Client Request Context

The API now authenticates a user via a trusted application or proxy that uses the activation token.
For more information, see [Authentication API](/docs/reference/api/authn/#primary-authentication-with-activation-token). <!-- OKTA-119692 -->

#### HAL Link for User in Provisioned State

A [HAL link](https://tools.ietf.org/html/draft-kelly-json-hal-06) to `/api/v1/users/${userId}/lifecycle/reactivate` is now provided
for requests when the user is in a PROVISIONED state but doesn't have a password.  <!-- OKTA-119221 -->

#### New Developer Org Banner

A new banner displays when you log into your developer org. It provides links to common onboarding tasks. Once you dismiss the banner, it can't be displayed again. <!-- OKTA-121055 -->

#### Access Policy by IP Range

Access Policies can now be defined based on an IP address range. <!-- OKTA-121280 -->

#### Bring Your Own SAML Certificates

Okta Admins can now upload their own SAML certificates to sign the assertion for Outbound SAML apps. These certificates can also be used to sign the AuthNRequest, as well as to decrypt the assertion for Inbound SAML. For more information, see [Sign the Okta Certificate with your own CA](/docs/guides/sign-your-own-saml-csr/).<!-- OKTA-119158 -->

#### Universal Directory for User Locale

When determining the user locale via the API, Okta uses the locale setting in the Universal Directory. If one isn't found, then Okta uses the org-wide display language instead. If the settings in Universal Directory and org are different for an end user, then Okta will prioritize the locale indicated in Universal Directory settings. This priority may change in future releases. <!-- OKTA-117789 -->

#### Lifecycle Reactivation Endpoint

Added `lifecycle/reactivate` endpoint.

This endpoint enables the API user to recover from failure in the authentication workflow, specifically when the user password is not set. In those cases this endpoint can be used to restart the activation by getting a new token and proceeding to set the user credentials. For more information, see the [API Reference](/docs/reference/api/users/#reactivate-user). <!-- OKTA-119096 -->

#### Linking Users to Social Identity Providers

Added a number of APIs that allow you to link an existing Okta user to a Social Identity Provider via an `externalId`. For more information, see [Identity Provider User Operations](/docs/reference/api/idps/#identity-provider-user-operations) <!-- OKTA-97257 -->

### Platform Bugs Fixed

 * Request to `/api/v1/users` while the user was still activating failed to return an HTTP 409 error. (OKTA-120458)
 * REACT samples contained errors. (OKTA-120530)
 * IdP key thumbprints were generated using SHA1. They are now generated using SHA-256, and the returned IdP key property has changed from `x5t` to `x5t#S256`. (OKTA-121442)
 * As part of the System Log API, if an invalid value was specified for `after`, we would return 0 results. Now you will get a validation error. (OKTA-119726)

## 2017.12

### Advance Notice: API Rate Limit Improvements

We are making org-wide rate limits more granular, and treating authenticated end-user interactions
separately. More granular rate limits will further lessen the likelihood of calls to one URI impacting
another. Treating authenticated end-user interactions separately will lessen the chances of one user's
impacting another. We're also providing a transition period so you can see what these changes will
look like in your Okta system log before enforcing them:

1. Starting in early April, 2017, we'll provide system log alerts to let you know that you
would have exceeded any of these new API rate limits.
2. Starting in early April, 2017, we'll treat authenticated end-user interactions on a per-user basis.
Interactions like SSO after login won't apply to your org-wide API rate limits.
3. Early in May, 2017, we will enforce the new, more granular rate limits. At that
point, the warnings in the System Log will change to error notifications.

Of course, as each change is released, we'll announce the change here.

For a full description of the rate limit changes, see [API Rate Limits](/docs/reference/rate-limits/).<!-- OKTA-110472 -->

### Platform Bugs Fixed
 * The `/api/v1/apps` API sometimes incorrectly returned `null` for the `realm` or `groupName`
 attribute for a Template WS-Fed application. (OKTA-117274)
 * PUT to the `/api/v1/idps/{idpId}` API sometimes incorrectly returned an HTTP response code of 500
 rather than 400. (OKTA-117691)
 * The `/api/v1/idps` API improperly allowed social identity providers to be created
 when the administrator did not have sufficient permissions. Those providers could not be used. (OKTA-118067)
 * The `/api/v1/apps` API returned an incorrect number of app instances when pagination and permissions
 filtering were both in effect. (OKTA-113411)

## 2017.11

### Advance Notice: API Rate Limit Improvements

We are making org-wide rate limits more granular, and treating authenticated end-user interactions
separately. More granular rate limits will further lessen the likelihood of calls to one URI impacting
another. Treating authenticated end-user interactions separately will lessen the chances of one user's
impacting another. We're also providing a transition period so you can see what these changes will
look like in your Okta system log before enforcing them:

1. Starting in early April, 2017, we'll provide system log alerts to let you know that you
would have exceeded any of these new API rate limits.
2. Starting in early April, 2017, we'll treat authenticated end-user interactions on a per-user basis.
Interactions like SSO after login won't apply to your org-wide API rate limits.
3. Early in May, 2017, we will enforce the new, more granular rate limits. At that
point, the warnings in the System Log will change to error notifications.

Of course, as each change is released, we'll announce the change here.

For a full description of the rate limit changes, see [API Rate Limits](/docs/reference/rate-limits/).<!-- OKTA-110472 -->

### Feature Improvements

 * Sample code to demonstrate OIDC authorization flows is available from the following locations:
   * [https://github.com/okta/samples-js-angular-1](https://github.com/okta/samples-js-angular-1)
   * [https://github.com/okta/samples-nodejs-express-4](https://github.com/okta/samples-nodejs-express-4)
   * [https://github.com/okta/samples-js-react](https://github.com/okta/samples-js-react)
   * [https://github.com/okta/samples-java-spring-mvc](https://github.com/okta/samples-java-spring-mvc)
<!-- (OKTA-118575) -->

 * System log now records the result of applying the Okta sign-on policy to determine whether
 to use multi-factor authentication for a user trying to log in. This log entry includes
 the user's zone.

![Log screen](/img/graphics/SysLogMFA.png "Log screen")
<!-- (OKTA-114417) -->

### Platform Bug Fixed

For a user mastered from Active Directory and in password reset mode, the /api/v1/users API
returned the user's status as ACTIVE rather than RECOVERY. (OKTA-109772)

## 2017.10

### Advance Notice: API Rate Limit Improvements

We are making org-wide rate limits more granular, and treating authenticated end-user interactions
separately. More granular rate limits will further lessen the likelihood of calls to one URI impacting
another. Treating authenticated end-user interactions separately will lessen the chances of one user's
impacting another. We're also providing a transition period so you can see what these changes will
look like in your Okta system log before enforcing them:

1. Starting in early April, 2017, we'll provide system log alerts to let you know that you
would have exceeded any of these new API rate limits.
2. Starting in mid-April, 2017, we'll treat authenticated end-user interactions on a per-user basis.
Interactions like SSO after login won't apply to your org-wide API rate limits.
3. Early in May, 2017, we will enforce the new, more granular rate limits. At that
point, the warnings in the System Log will change to error notifications.

Of course, as each change is released, we'll announce the change here.

For a full description of the rate limit changes, see [API Rate Limits](/docs/reference/rate-limits/).<!-- OKTA-110472 -->

### Platform Bugs Fixed

 * Request to [`/api/v1/authn/factors/<factorId>/verify`](/docs/reference/api/authn/#enroll-factor) responded with a valid `stateToken` after user status
 became `LOCKED_OUT`, causing user interface errors. (OKTA-115153)
 * The AuthSJ SDK produced a debug log message with some browsers. (OKTA-115460)

## 2017.09

### Advance Notice: API Rate Limit Improvements

We are making org-wide rate limits more granular, and treating authenticated end-user interactions
separately. More granular rate limits will further lessen the likelihood of calls to one URI impacting
another. Treating authenticated end-user interactions separately will lessen the chances of one user's
impacting another. We're also providing a transition period so you can see what these changes will
look like in your Okta system log before enforcing them:

1. Shortly after February 28, 2017, we'll provide system log alerts to let you know that you
would have exceeded any of these new API rate limits.
2. Sometime in March, 2017, we'll treat authenticated end-user interactions on a per-user basis.
Interactions like SSO after login won't apply to your org-wide API rate limits.
3. Shortly after March 31, 2017, we will enforce the new, more granular rate limits. At that
point, the warnings in the System Log will change to error notifications.

Of course, as each change is released, we'll announce the change here.

For a full description of the rate limit changes, see [API Rate Limits](/docs/reference/rate-limits/).<!-- OKTA-110472 -->

### Feature Improvement

For a collection of Users, the Links object contains only the self
link. This feature will be in preview for at least a month.
<!-- (OKTA-115269) -->

### Platform Bugs Fixed

 * The OpenID Connect and API Access Management ID Tokens contained an extraneous attribute. (OKTA-95042)
 * Some users created with the API were not activated automatically. (OKTA-112833)

## 2017.05

### Advance Notice: API Rate Limit Improvements

We are making rate limits more granular and will roll the changes out over the next few months:

1. Shortly after February 28, 2017, we'll provide system log alerts to let you know that you would have exceeded any of these new API rate limits.
2. Sometime in March, 2017, we'll treat authenticated end-user interactions on a per-user basis. Interactions like SSO after login won't apply to your org-wide API rate limits.
3. Shortly after March 31, 2017, the new, more granular rate limits will be enforced. At that point, the warnings in the System Log will change to error notifications.

Of course, as each change is released, we'll announce the change here.

For a full description of the rate limit changes, see [API Rate Limits](/docs/reference/rate-limits/).<!-- OKTA-110472 -->

### Feature Improvements

* For OpenID Connect Client apps, when selecting `General settings > Implicit grant type`, you can now use checkboxes to
include `ID Tokens`, `Access Tokens`, or both.
<!-- (OKTA-94252) -->

### Platform Bugs Fixed

 * In API Access Management, where an `Access Token` contains claims that evaluate to an
 array, we did not send the claims as a JSON array and did not ensure that the values were of
 the correct types. (OKTA-113034)


## 2017.04

### Advance Notice: API Rate Limit Improvements

We are making rate limits more granular and will roll the changes out over the next few months:

1. Shortly after February 8, 2017, we'll provide system log alerts to let you know that you would have exceeded any of these new API rate limits.
2. Sometime in February, 2017, we'll treat authenticated end-user interactions on a per-user basis. Interactions like SSO after login won't apply to your org-wide API rate limits.
3. Shortly after March 8, 2017, the new, more granular rate limits will be enforced. At that point, the warnings in the System Log will change to error notifications.

Of course, as each change is released, we'll announce the change here.

For a full description of the rate limit changes, see [API Rate Limits](/docs/reference/rate-limits/).<!-- OKTA-110472 -->

### Feature Improvements

* In the Add Rule dialog box (**Security > API > _authorization server name_ > Access Policies > Add Rule**),
the pre-filled default values include all grant types and the `All scopes` radio button.
<!-- (OKTA-110748, OKTA-110751) -->

## 2017.03

### Advance Notice: API Rate Limit Improvements

We are making rate limits more granular and will roll the changes out over the next few months:

1. Shortly after February 8, 2017, we'll provide system log alerts to let you know that you would have exceeded any of these new API rate limits.
2. Sometime in February, 2017, we'll treat authenticated end-user interactions on a per-user basis. Interactions like SSO after login won't apply to your org-wide API rate limits.
3. Shortly after March 8, 2017, the new, more granular rate limits will be enforced. At that point, the warnings in the System Log will change to error notifications.

Of course, as each change is released, we'll announced the change here.

For a full description of the rate limit changes, see [API Rate Limits](/docs/reference/rate-limits/).<!-- OKTA-110472 -->

### Feature Improvements

#### Search for Authorization Servers by Name or Resource URI

You can now search (exact match) for an authorization server name or resource URI:
To see the new search box, log into your Okta org, click the **Admin** button, and visit **Security > API > Authorization Servers**.
<!-- OKTA-97833 -->

![Search box for authorization servers](/img/release_notes/rn-search-as.png "Search box for authorization servers")

#### Manual Key Rotation (Key Pinning)

In the administrator UI, you can set an authorization server to manually rotate keys.
Keys are rotated automatically by default.

>Important: Automatic key rotation is more secure than manual key rotation. Use manual key rotation only if you can't use automatic key rotation.

To change an authorization server configuration to use manual key rotation:

1. Log into the Okta org.
2. Choose **Admin**.
3. Choose **Security** > **API**.
4. Open an authorization server for editing.
5. Change the value of **Signing Key Rotation** to Manual and save.
6. In the authorization server Settings tab, click the **Rotate Signing Keys** button to rotate the keys manually. This button doesn't display when **Signing Key Rotation** is set to Automatic.
<!-- OKTA-110682 -->

### Platform Bugs Fixed

* Requesting an authorization code with `response_mode` set to `okta_post_message` failed to return
the error message ("The authorization server does not support the requested response mode") in the
response. Instead it redirected the error response to the URI specified in `redirect_uri`. (OKTA-103437)
* The one-time `sessionToken` in the response from the POST `/api/v1/authn` request with username
and password was valid for two hours after issuance. It is now valid for 5 minutes for added security. (OKTA-109907)
* Modifying the rule conditions (attributes) of a default rule that affects policy
evaluation didn't return a read-only attribute error.
If you modified one of these read-only attributes previously, and need to change the attribute back to its initial value,
contact [Support](https://support.okta.com/help/open_case). (OKTA-110155)
* Using the `search` parameter with GET `/api/v1/users` when the user is federated returned an incorrect
value for `provider`. (OKTA-110929)
* When authentication fails because of the user's sign-on policy, the HTTP code returned was 403
but is now 401. (OKTA-111888)


## 2017.02

### Feature Improvements: New Expression Language Function

The new [expression language](/docs/reference/okta-expression-language/) function `Arrays.toCsvString(array)` converts an array to a comma-delimited string. For example:

`Arrays.toCsvString({"This", "is", " a ", "test"})` returns `This,is, a ,test` <!-- OKTA-51976 -->

### Platform Bugs Fixed

* Introspection behavior for OpenID Connect and API Access Management was inconsistent across all token types when users were not in the ACTIVE state. (OKTA-110445)
* Incorrect text in the administrator UI, related to authorization (OpenID Connect and API Access Management), was corrected:
    * **Password** became **Resource Owner Password** in **Apps** > **General Settings** > **Allowed Grant Types**.
    * **Resource Owner Credential** became **Resource Owner Password** in the Edit Rule page of the authorization server configuration dialog
        (**Security** > **API** > **Authorization Servers**). (OKTA-110749)
* In some orgs, the links for `self` and `next` were returned with incorrect values. (OKTA-111350)
