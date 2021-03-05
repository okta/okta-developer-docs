---
title: Reference overview
top_links:
  - name: API Concepts
    path: /docs/reference/api-overview/
    icon: icons/icon--docs-apiconcepts.svg
  - name: Error Codes
    path: /docs/reference/error-codes/
    icon: icons/icon--docs-errorcodes.svg
  - name: Okta Expression Language
    path: /docs/reference/okta-expression-language/
    icon: icons/icon--docs-expressionlang.svg
  - name: Postman Collections
    path: /docs/reference/postman-collections/
    icon: icons/icon--docs-postman.svg
---

# Reference overview

Details on parameters, requests, and rsponses for Okta's API endpoints.


Okta APIs generally fall into one of two categories: signing in your users or managing
resources in your Okta org.

## Sign in your Users
API endpoints to authenticate your users, challenge for factors, recover passwords, and more.
  - The [Authentication Api](/docs/reference/api/authn) controls user accesss to Okta.
  - The [OpenID Connect & OAuth 2.0 API](/docs/concepts/oauth-openid) controls users access to your applications.

[Learn about which APIs to use.](/docs/concepts/oauth-openid/#authentication-api-vs-oauth-20-vs-openid-connect)

## Manage Resources
REST endpoints to configure resources such as users, apps, sessions, and factors
whenever you need.

For example, see the [Users API](/docs/reference/api/users) for GRUD operations on users.
