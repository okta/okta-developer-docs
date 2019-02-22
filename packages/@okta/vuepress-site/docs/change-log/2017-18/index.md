---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2017.17
---

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

For a full description of the new rate limits, see [API Rate Limits](/docs/api/getting_started/rate-limits).<!-- OKTA-110472 -->

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

### Platform Feature Improvement: View Access Tokens from Social Authentication

Using `GET /api/v1/idps/${idpId}/users/${userId}/credentials/tokens`, you can fetch the Access Tokens minted by a social authentication provider.
When a user authenticates to Okta via a Social IdP, this request returns the tokens and metadata provided by the Social IdP.
Clients can use the Access Token against the social provider's endpoints in order to fetch additional profile attributes that Okta doesn't support in Universal Directory, for example, nested attributes.
For more information, see the [Identity Providers API](/docs/api/resources/idps#social-authentication-token-operation). <!-- OKTA-118687 -->

### Platform Bugs Fixed

 * Searches on [User](/docs/api/resources/users#list-users-with-search) incorrectly returned deleted users or out-of-date user status in some cases. (OKTA-116928)
 * Some orgs were unable to add OpenID Connect or OAuth 2.0 clients to an access policy in a custom Authorization Server. (OKTA-117630)
 * When deleting a claim from a custom Authorization Server, the Delete dialog didn't close after clicking **OK** or **Cancel**. (OKTA-124271)
 * Read-only Administrator UI didn't exactly match that role's access rights. (OKTA-123116)
