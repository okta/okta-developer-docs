---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2017.15
---

## 2017.16

### Advance Notices

The items in this section are scheduled for future releases. Although we share our expected release dates, these dates are subject to change.

#### API Rate Limit Improvements

We are making org-wide rate limits more granular, and treating authenticated end-user interactions separately. More granular rate limits will further lessen the likelihood of calls to one URI impacting another. Treating authenticated end-user interactions separately will lessen the chances of one user's impacting another. We're also providing a transition period so you can see what these changes will look like in your Okta system log before enforcing them:

1. After Monday, 2017-04-17, you'll see system log alerts that let you know if you would have exceeded any of the new API rate limits. We're making this feature available to all preview orgs, and the feature will remain in preview for at least two weeks.

2. Starting later in April, 2017, we'll treat authenticated end-user interactions on a per-user basis. Interactions like SSO after login won't apply to your org-wide API rate limits.

3. Early in May, 2017, we will enforce the new, more granular rate limits. At that point, the warnings in the System Log will change to error notifications.

Of course, as each change is released, we'll announce the change here.

For a full description of the rate limit changes, see [API Rate Limits](/docs/api/getting_started/rate-limits).<!-- OKTA-110472 -->

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

>Important: Not all preview organizations will receive this feature. Okta has identified preview organizations that depend on the Okta .NET SDK, which requires the old functionality.
Okta won't enable the feature for these orgs.
Instead, Okta will send a customer communication explaining the migration path to enable the feature.

### Platform Feature Improvement: Zones API Generally Available in Preview

Access policies can now be defined based on an IP address range using [the Zones API](/docs/api/resources/zones).
This feature is Generally Available in preview orgs for at least one month before being Generally Available in production. <!-- OKTA-121280 -->

### Platform Bugs Fixed

 * When a group was deleted, if that group was referenced by a social or SAML IdP, the reference wasn't removed.
    These references caused errors when trying to configure the social or SAML IdP. (OKTA-116909)
 * If the SAML IdP parameter `idp` was specified in the query string for a request to the `oauth2/v1/authorize` endpoint, the request failed in some orgs. (OKTA-120122)
 * Creating or saving access policies for an authorization server failed for some client IDs. (OKTA-121230)
