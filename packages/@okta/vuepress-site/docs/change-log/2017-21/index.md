---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2017.20
---

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

For a full description of the new rate limits, see [API Rate Limits](/docs/api/getting_started/rate-limits).<!-- OKTA-110472 -->

### Platform Feature Improvement: System Log Notifications for OpenID Connect Apps

Notifications are entered in the [System Log](/docs/api/resources/system_log) when OpenID Connect apps are created or updated.

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
As outlined in [Design Principles](/docs/api/getting_started/design_principles#links-in-collections):

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
