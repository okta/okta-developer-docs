---
title: Okta API Products Change Log
excerpt: >-
  Release Note for 2017.49 App User Schema EA,  more simple HAL link rollout,
  JWT request parameter, and bug fixes
---

## 2017.49

### New and Enhanced Features

| Feature | Available in Preview Orgs | Available in Production Orgs |
| :------------------------------------ | :------------------------ | :------------------- |
| [App User Schema API in EA](#early-access-feature-in-preview-app-user-schema-api)  | December 6, 2017 | January 10, 2017 |
| [HAL Link Rollout](#completing-rollout-of-simple-hal-links)                     | December 6, 2017 | December 12, 2017 |
| [JWT as a Request Parameter](#jwt-as-a-request-parameter) | December 6, 2017 | December 12, 2017 |

#### Early Access Feature in Preview: App User Schema API

The [App User Schema API](/docs/api/resources/schemas#app-user-schema-operations) is an [Early Access (EA)](/docs/api/getting_started/releases-at-okta#early-access-ea) release. Use this API to work with App User profiles, typically for apps that have features for provisioning users.
<!-- OKTA-148782 -->

#### Completing Rollout of Simple HAL Links

In previous releases, Okta enabled functionality which modifies the set of links returned with user collection elements. In the new functionality, when a collection of Users is returned, the Links object returned with each element contains only the `_self` link, which can be used to obtain the individual User object. The User object contains the full set of links. We made this change to ensure you always have up-to-date and complete links.

Most orgs already have this functionality and should see no change in behavior.
Some orgs did not receive this functionality because they were identified as possible users of the .NET SDK. These customers have received a communication from Okta outlining the changes and any actions they might need to take.

Some preview orgs created with the Developer Paid edition will receive the new functionality on preview orgs starting December 6, 2017, and on production orgs starting December 12, 2017. 

See [the User Model documentation](/docs/api/resources/users#user-model) for more information. <!-- OKTA-150507 -->

#### JWT as a Request Parameter

A new parameter, `request` is available for all `/authorize` endpoints. The parameter contains a JWT created by the client, enabling requests to be passed in a single, self-contained parameter. This JWT must be signed. 

For details about using `request`, see [Oauth 2.0](/docs/api/resources/oidc#request-parameters-1) or [OpenID Connect](/docs/api/resources/oidc#request-parameters-3) documentation. <!-- OKTA-78476 -->

### API Bug Fixes

The following bug fixes will be available on preview orgs starting Dec 6, 2017, and will be available on production orgs starting December 11, 2017:

* Password requirements were incorrectly evaluated on passwords longer than 72 characters. (OKTA-144636)

* If the number of results in a page was divisible by the `limit` parameter value, an additional empty page was incorrectly returned. (OKTA-146006)

* If an app embed link with a session token was used to access an app, the user was incorrectly prompted to authenticate again, instead of using the token to launch the application. (OKTA-149823)
