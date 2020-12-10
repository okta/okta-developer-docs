---
title: Okta API Products Release Notes
---

## 2018.09

| Change | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| :---------- | :--------------------------------- | :----------------------------------------------------------- |
| [API Access Management is Generally Available in Preview](#api-access-management-is-generally-available-in-preview) | February 7, 2018               | March 12, 2018  |
| [User Consent for OAuth 2.0 and OpenID Connect Flows in Early Availability (EA)](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) | February 28, 2018               | March 5, 2018 |
| [Sessions API Supports HTTP Header Prefer](#sessions-api-supports-http-header-prefer)  | February 28, 2018               | March 5, 2018 |
| [User Schema API Allows Nullable `firstName`, `lastName`](#user-schema-api-allows-nullable-firstname-lastname) | February 28, 2018 | March 5, 2018 |
| [Improved Response Mode for OAuth 2.0 and OpenID Connect Requests](#improved-response-mode-for-oauth-20-and-openid-connect-requests)  | February 28, 2018               | March 5, 2018 |
| [Change to `/authorize` Response for `prompt` for OAuth 2.0 and OpenID Connect Requests](#change-to-authorize-response-for-prompt-for-oauth-20-and-openid-connect-requests)  | February 28, 2018               | March 5, 2018 |
| [Improved System Log Behavior for Date Queries](#improved-system-log-behavior-for-date-queries)  | February 28, 2018               | March 5, 2018 |
| [System Log Message Changes Related to Authorization Servers](#system-log-message-changes-related-to-authorization-servers)  | February 28, 2018               | March 5, 2018 |
| [Bugs Fixed for 2018.09](#bugs-fixed-for-2018-09)  | February 28, 2018               | March 5, 2018 |

### User Consent for OAuth 2.0 and OpenID Connect Flows in Early Availability (EA)

A consent represents a user's explicit permission to allow an application to access resources protected by scopes. As part of an OAuth 2.0 or OpenID Connect authentication flow, you can prompt the user with a page to approve your app's access to specified resources.

Consent grants are different from tokens because a consent can outlast a token, and there can be multiple tokens with varying sets of scopes derived from a single consent. When an application comes back and needs to get a new access token, it may not need to prompt the user for consent if they have already consented to the specified scopes. Consent grants remain valid until the user manually revokes them, or until the user, application, authorization server or scope is deactivated or deleted.

To configure an authorization or authentication flow to include a user consent page:

1. Verify that you have the API Access Management feature enabled, and request that User Consent also be enabled.
2. Create an app via the Apps API with the appropriate values for `tos_uri`, `policy_uri`, and `consent_method`. ([Details](/docs/reference/api/apps/#settings-7))

    Note: You can also configure an existing app in the administrator UI: **Applications > [Application Name] > General > User Consent**.

3. Ensure that your authentication or authorization flow is configured properly. The combination of `prompt` in the `/authorize` request, `consent_method` set on the app in the previous step, and `consent`, a property set on scopes, controls whether a user consent window is displayed during the authentication flow. [Details](/docs/reference/api/apps/#settings-7)

<!-- OKTA-158107 -->

### Sessions API Supports HTTP Header Prefer

Okta now supports [the HTTP Header `Prefer`](https://tools.ietf.org/html/rfc7240#section-4.2) in [the Sessions API for refreshing sessions](/docs/reference/api/sessions/#refresh-current-session). You can extend the session lifetime, but skip any processing work related to building the response body.

#### Example Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/sessions/me/refresh"
```
Note: `me` can also be an ID.

#### Example Response

```http
HTTP/1.1 204 No Content
Preference-Applied: return=minimal
```
<!-- OKTA-152559 -->


### User Schema API Allows Nullable `firstName`, `lastName`

You can set `firstName` or `lastName` to be nullable in [the User Profile Base sub-schema](/docs/reference/api/schemas/#user-profile-base-subschema). These properties are defined in a profile sub-schema with the resolution scope `#base`.

### Improved Response Mode for OAuth 2.0 and OpenID Connect Requests

For [the `form_post` response mode](/docs/reference/api/oidc/#parameter-details), we have reduced the HTML content returned in an OpenID Connect or OAuth 2.0 request. Now the response is only a form containing the requested tokens (access token, ID token, or both) and JavaScript to post the form. <!-- OKTA-96521 -->

### Change to `/authorize` Response for `prompt` for OAuth 2.0 and OpenID Connect Requests

If you set `prompt=none` for a request on `/authorize` and the maximum age before sign-in is required (`max_age`) is exceeded, an error is returned. This ensures the safest possible result when [these two settings contradict each other](/docs/reference/api/oidc/#parameter-details).

This applies to `/authorize` with either the Okta Org Authorization Server or a Custom Authorization Server (which requires API Access Management).

#### Example: Old Message Format

```json
{
    "errorCode": "E0000001",
    "errorSummary": "Api validation failed: com.saasure.core.services.user.InvalidUserProfileException: Could not create user due to invalid profile: com.saasure.framework.validation.util.SimpleErrors: 1 errors\nError in object 'newUser': codes [password.passwordRequirementsNotMet.newUser,password.passwordRequirementsNotMet]; arguments [Password requirements: at least 8 characters, a lowercase letter, an uppercase letter, a number, no parts of your username.]; default message [Password requirements were not met. Password requirements: at least 8 characters, a lowercase letter, an uppercase letter, a number, no parts of your username.]",
    "errorLink": "E0000001",
    "errorId": "oaecNfS38enQ8KtWDvNfusWRw",
    "errorCauses": [
        {
            "errorSummary": "Password requirements were not met. Password requirements: at least 8 characters, a lowercase letter, an uppercase letter, a number, no parts of your username."
        }
    ]
}
```

#### Example: New Message Format

```json
{
    "errorCode": "E0000001",
    "errorSummary": "Api validation failed: com.saasure.core.services.user.InvalidUserProfileException: Could not create user due to invalid profile: com.saasure.framework.validation.util.SimpleErrors: 3 errors\nField error in object 'newUser' on field 'password': rejected value [aaaa]; codes [password.minlength.newUser.password,password.minlength.password,password.minlength.java.lang.String,password.minlength]; arguments [8]; default message [Password requirements: at least 8 characters.]\nField error in object 'newUser' on field 'password': rejected value [aaaa]; codes [password.uppercase.newUser.password,password.uppercase.password,password.uppercase.java.lang.String,password.uppercase]; arguments [Password requirements: at least 0 characters, an uppercase letter.]; default message [Password requirements: at least 0 characters, an uppercase letter.]\nField error in object 'newUser' on field 'password': rejected value [aaaa]; codes [password.number.newUser.password,password.number.password,password.number.java.lang.String,password.number]; arguments [Password requirements: at least 0 characters, a number.]; default message [Password requirements: at least 0 characters, a number.]",
    "errorLink": "E0000001",
    "errorId": "oaeGZUg95w6SK2GbA44cXgtvA",
    "errorCauses": [
        {
            "errorSummary": "password: Passwords must be at least 8 characters in length",
            "reason": "LENGTH_MINIMUM",
            "location": "credentials.password.value",
            "locationType": "body",
            "domain": "user"
        },
        {
            "errorSummary": "password: Password requirements: at least 0 characters, an uppercase letter.",
            "reason": "UPPER_CASE_REQUIRED",
            "location": "credentials.password.value",
            "locationType": "body",
            "domain": "user"
        },
        {
            "errorSummary": "password: Password requirements: at least 0 characters, a number.",
            "reason": "NUMBER_REQUIRED",
            "location": "credentials.password.value",
            "locationType": "body",
            "domain": "user"
        }
    ]
}
```

If you don't want these changes, contact [Support](https://support.okta.com/help/open_case) to opt out.

### Improved System Log Behavior for Date Queries

1. For `/logs`, the request parameters [`since` and `until`](/docs/reference/api/system-log/#request-parameters) require [the RFC 3339 Internet Date/Time Format profile of ISO 8601](https://tools.ietf.org/html/rfc3339#page-8). This allows queries to more accurately target date ranges. <!-- OKTA-149837 -->

2. For /`logs`, [the maximum page size](/docs/reference/api/system-log/#request-parameters) is 1,000 messages (`limit=1000`). The default remains at 100. <!-- OKTA-154711, OKTA-157865 -->

### System Log Message Changes Related to Authorization Servers

The following message changes apply to either the Okta Org Authorization Server or a Custom Authorization Server including `default` (which requires API Access Management), or both, as indicated in each section.

#### Simplified Failure Messages from [`/authorize`](/docs/reference/api/oidc/#authorize) Requests for `/events` System Log

The existing messages `app.oauth2.authorize_failure`, `app.oauth2.as.authorize_failure` and `app.oauth2.as.authorize.scope_denied_failure` replace these messages:

* `app.oauth2.authorize.access_denied`
* `app.oauth2.authorize.invalid_client_id`
* `app.oauth2.authorize.invalid_cache_key`
* `app.oauth2.authorize.no_existing_session`
* `app.oauth2.authorize.login_failed`
* `app.oauth2.authorize.mismatched_user_in_cache_and_session`
* `app.oauth2.authorize.user_not_assigned`
* `app.oauth2.authorize.scope_denied`
* `app.oauth2.as.authorize.warn_failure`
* `app.oauth2.as.authorize.scope_denied`

Details about the nature of the failure are included, so no information has been lost with this simplification.

These system log changes affect responses from requests that involve either the Okta Org Authorization Server or a Custom Authorization Server including `default`.

#### Simplified Failure Messages from [`/token`](/docs/reference/api/oidc/#token) Requests for `/events` System Log

Instead of supplying two different messages for token grant failures on `/token`, the existing message `app.oauth2.as.authorize.token.grant_failure` replaces
these messages:

* `app.oauth2.as.token.grant.warn_failure`
* `app.oauth2.as.token.grant.scope_denied_failure`

This system log change affects responses from requests that involve a Custom Authorization Server including `default`.

#### Simplified Success Messages from  [`/token`](/docs/reference/api/oidc/#token) Requests for `/events` System Log

Instead of supplying a different message for ID token and access token generation, there's just one message for each. The ID token or access token minted is included in the message as it was previously.

1. The existing message `app.oauth2.authorize.implicit_success` replaces:

    * `app.oauth2.authorize.implicit.id_token_success`
    * `app.oauth2.authorize.implicit.access_token_success`

2. The existing message `app.oauth2.as.authorize.implicit_success` replaces:

    * `app.oauth2.as.authorize.implicit.id_token_success`
    * `app.oauth2.as.authorize.implicit.access_token_success`

The `_success` messages weren't being written to the System Log previously, but are now. <!-- OKTA-157235 -->

These system log changes affect responses from requests that involve either the Okta Org Authorization Server or a Custom Authorization Server including `default`.

#### Simplified Messages from  [`/token`](/docs/reference/api/oidc/#token) Requests for `/logs` System Log

Instead of supplying a different message for ID token and access token generation, there's just one message for each. The ID token or access token minted is included in the message as it was previously.

1. The existing message `app.oauth2.authorize.implicit` replaces:

    * `app.oauth2.authorize.implicit.id_token`
    * `app.oauth2.authorize.implicit.access_token`

2. The existing message `app.oauth2.as.authorize.implicit` replaces:

    * `app.oauth2.as.authorize.implicit.id_token`
    * `app.oauth2.as.authorize.implicit.access_token` <!-- OKTA-155402 -->

These system log changes affect responses from requests that involve either the Okta Org Authorization Server or a Custom Authorization Server, including `default`.

### Bugs Fixed for 2018.09

The following bugs have been fixed and are expected in preview orgs February 28, 2018 and production orgs starting March 5, 2018.

* If a user had a status of `ACTIVE` and had never signed in, and an API call reset the user's password, the user's status was incorrectly changed from `ACTIVE` to `PROVISIONED`, instead of the expected `RECOVERY`. (OKTA-154024)
* If `-admin` was incorrectly included in the domain name during initialization of [an OktaAuth object](https://github.com/okta/okta-auth-js), no error was returned. (OKTA-156927)
* If a user was created with a password, that password wasn't considered as part of their password history. (OKTA-158966)

