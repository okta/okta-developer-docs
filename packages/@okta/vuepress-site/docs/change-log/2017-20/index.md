---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2017.19
---

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

For a full description of the new rate limits, see [API Rate Limits](/docs/api/getting_started/rate-limits).<!-- OKTA-110472 -->

### Platform Feature Improvements

#### Okta Expression Language Function for Filtering Groups

Use the Okta Expression Language function `getFilteredGroups` to create a list of groups that the current user belongs to.
With such a list you can, for example, create claims in Access Tokens and ID Tokens based on the groups.
For more information, see [Group Functions](/reference/okta_expression_language/#group-functions). <!--OKTA-123127-->

#### New Profile Property for Apps

The `profile` property in the Apps API accepts any well-formed JSON schema. You can specify properties in the profile and then access them in API requests.
For example:

* Add an app manager contact email address.
* Use the profile to define a whitelist of groups that you can then reference and pass as claims using the [Okta Expression Language function `getFilteredGroups`](/reference/okta_expression_language/#group-functions).

For more information, see the [Apps API](/docs/api/resources/apps#profile-object).

Note that the status code for service claims errors has changed from 500 to 400 as part of this feature. <!--OKTA-123128-->

#### Added Login Hint to OAuth 2.0 and OpenID Connect API

Use the `login_hint` property on `/oauth2/${authServerId}/v1/authorize` or `/oauth2/v1/authorize` to populate a username when prompting for authentication. <!-- OKTA-87073-->

### Platform Bugs Fixed

* Updating the OpenID Connect property `max_age` incorrectly caused a new session to be created, which updated the `createdAt` timestamp. (OKTA-99850)
* The property `application_type` in the [OAuth 2.0 Clients API](/docs/api/resources/oauth-clients) could be edited. (OKTA-120223)
* User profile attributes could be fetched via the API even though attributes were marked hidden, if the user sending the request was the user being fetched. (OKTA-123882)
* Reordering Authorization Server policies failed. (OKTA-125156)
* (Preview fix) Fixed issue involving OpenID Connect and OAuth 2.0 requests within SAML IdP configuration. (OKTA-127155)
* The Zones API documentation was incorrectly announced as Generally Available in 2017.19. It is [a Beta release](/docs/api/getting_started/releases-at-okta).

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
