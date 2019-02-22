---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2017.16
---

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

For a full description of the new rate limits, see [API Rate Limits]((/docs/api/getting_started/rate-limits).<!-- OKTA-110472 -->

#### Simple HAL Links

Okta will enable the Simple HAL Links on User Collections feature for most preview organizations.
This change is currently scheduled for the 2017.19 release on 5/10/17, to remain in preview for at least one month.

This feature will remove the HAL links that reflect state from user objects returned in collections.

Currently, a user object returned in a collection contains some or all of the following links:

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

"Search and list operations are intended to find matching resources and their identifiers. If you intend to search for a resource and then modify its state or make a lifecycle change, the correct pattern is to first retrieve the resource by 'id' using the "self" link provided for that resource in the collection. This will provide the full set of lifecycle links for that resource based on its most up-to-date state."

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
    See [Administrator Roles API](/docs/api/resources/roles#add-app-target-to-app-administrator-role) for details. (OKTA-115122)
 * Application Administrators were incorrectly able to create an OpenID Connect service client even though they weren't assigned an OpenID Connect client app. (OKTA-115168)
 * Some orgs weren't able to deprovision a user, receiving an incorrect 403 error: "Operation failed because user profile is mastered under another system." (OKTA-119549)
<!-- * Read-only Administrators were incorrectly able to view the administrator UI for deleting authorization servers. (OKTA-123116) hold for production -->
