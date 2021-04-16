---
title: Core Okta API
meta:
  - name: description
    content: Learn how the Okta API works and learn about the compatibility rules and design principles.
---
# Core Okta API

The Core Okta API is the primary way that apps and services interact with Okta. You can use it to implement basic auth functions such as signing in your users and programmatically managing your Okta objects. 

## Sign in Your Users 
API endpoints to authenticate your users, challenge for factors, recover passwords, and more. For example:
  - The [Authentication API](/docs/reference/api/authn) controls user access to Okta.
  - The [OpenID Connect & OAuth 2.0 API](/docs/concepts/oauth-openid) controls users access to your applications.

## Manage Okta Objects
REST endpoints to configure objects whenever you need. For example:
- The [Apps API](/docs/reference/api/apps/) is used to manage Apps and their association with Users and Groups.
- The [Users API](/docs/reference/api/users) is used for CRUD operations on Users.
- The [Sessions API](/docs/reference/api/sessions/) creates and manages user's authentication sessions. 
- The [Policy API](/docs/reference/api/policy/) creates and manages settings such as a user's session lifetime. 
- The [Factors API](/docs/reference/api/factors/) is used to enroll, manage, and verify factors for multi-factor authentication (MFA). 

<HorizontalDivider/>

## Versioning
The Okta API is a versioned API. Okta reserves the right to add new parameters, properties, or objects to the API without advance notice. These updates are considered non-breaking and the compatibility rules below should be followed to ensure your application does not break. Breaking changes such as removing or renaming a property will be released as a new version of the API. Okta will provide a migration path for new versions of APIs and will communicate timelines for end-of-life when deprecating APIs.

Do not consume any Okta API unless it is documented on this site. All undocumented endpoints should be considered private, subject to change without notice, and not covered by any agreements.

## Compatibility rules for input parameters
- Requests are compatible irrespective of the order in which the query parameters appear.
- Requests are compatible irrespective of the order in which the properties of the JSON parameters appear.
- New query parameters may be added to future versions of requests.
- Existing query parameters cannot be removed from future versions of requests.
- Existing properties cannot be removed from the JSON parameters in future versions of requests.

## Compatibility rules for JSON responses 
- Responses are compatible irrespective of the order in which the properties appear.
- New properties may be added to future versions of the response.
- Existing properties cannot be removed from future versions of the response.
- Properties with null values may be omitted by responses.

## URL Namespace
All URLs listed in the documentation should be preceded with your organization's subdomain (tenant) and API version: `https://{yourOktaDomain}.com/api/{apiversion}`
The API version is currently `v1`.


> **Note:** All API requests must use the HTTPS scheme.
