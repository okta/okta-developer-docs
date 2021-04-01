---
title: Core Okta API
meta:
  - name: description
    content: Learn how the Okta API works and learn about the compatibility rules and design principles.
---
# Core Okta API

Core Okta API is the primary way that apps and services interact with Okta. You can use it to implement basic auth functions such as sign in your users and programmatically manage your Okta objects. 

## Sign in Your Users 
API endpoints to authenticate your users, challenge for factors, recover passwords, and more. For example:
  - The [Authentication Api](/docs/reference/api/authn) controls user accesss to Okta.
  - The [OpenID Connect & OAuth 2.0 API](/docs/concepts/oauth-openid) controls users access to your applications.

## Manage Okta Objects
REST endpoints to configure objects whenever you need. For example:
- Use [Apps API](docs/reference/api/apps/) to manage applications and/or assignments to users or groups.
- See the [Users API](/docs/reference/api/users) for CRUD operations on users.
- Use the [Sessions API](/docs/reference/api/sessions/) to create and manage user's authentication sessions. 
- Use the [Policy API](/docs/reference/api/policy/) to create and manage settings such as user session lifetime. 
- Use the [Factor API](/docs/reference/api/factors/) to enroll, manage, and verify factors for multifactor authentication (MFA). 

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
All URLs listed in the documentation should be preceded with your organization's subdomain (tenant) https://{yourOktaDomain}.com/api/{apiversion} and API version.
The api version is currently v1.


> **Note:** All API requests must use the HTTPS scheme.
