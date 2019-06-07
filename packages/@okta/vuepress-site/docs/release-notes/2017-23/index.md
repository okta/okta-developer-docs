---
title: Okta API Products Release Notes
excerpt: Summary of changes to the Okta Platform since Release 2017.22
---

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

For a full description of the new rate limits, see [API Rate Limits](/docs/api/getting_started/rate-limits).<!-- OKTA-110472 -->

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
* Control which claims are returned in ID tokens with the `alwaysIncludeInToken` property. You can also configure this in the [administrator UI](https://help.okta.com/en/prev/Content/Topics/Security/API_Access.htm#create_claims).

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

Before release 2017.19, a user object returned in a collection contains some or all of the following links:

```
"_links": {
    "suspend": {
      "href": "https://{yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/suspend",
      "method": "POST"
    },
    "resetPassword": {
      "href": "https://{yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/reset_password",
      "method": "POST"
    },
    "expirePassword": {
      "href": "https://{yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/expire_password",
      "method": "POST"
    },
    "forgotPassword": {
      "href": "https://{yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/credentials/forgot_password",
      "method": "POST"
    },
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3"
    },
    "changeRecoveryQuestion": {
      "href": "https://{yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/credentials/change_recovery_question",
      "method": "POST"
    },
    "deactivate": {
      "href": "https://{yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/lifecycle/deactivate",
      "method": "POST"
    },
    "changePassword": {
      "href": "https://{yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3/credentials/change_password",
      "method": "POST"
    }
}
```

Unfortunately, these links are not guaranteed to accurately reflect the state of the specified user.
As outlined in [Design Principles](/docs/docs/reference/api-overview/#links-in-collections):

"Search and list operations are intended to find matching resources and their identifiers. If you intend to search for a resource and then modify its state or make a lifecycle change, the correct pattern is to first retrieve the resource by ID using the `self` link provided for that resource in the collection. This will provide the full set of lifecycle links for that resource based on its most up-to-date state."

The Simple HAL Links on User Collections feature ensures that possibly invalid state links are not returned.  Instead only the `self` link is returned:

```
"_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/users/00ulxgGOjrKcnmDHT0g3"
    }
}
```

As noted above, to change user state, the `self` link should be called to retrieve a user object with up-to-date links.

>Important: Not all preview organizations will receive this feature. Okta has identified preview organizations that depend on the Okta .NET SDK, which requires the old functionality. Okta won't enable the feature for these orgs. Instead, when the SDK issue is resolved, Okta will send a customer communication explaining the migration path to enable the feature for those orgs.

### Platform Bugs Fixed

* When completing enrollment for SMS and call factors, the API forced end users to verify the factor that was just enrolled. (OKTA-125923)
* When using a refresh token, default scope requests sometimes failed. (OKTA-127671)
