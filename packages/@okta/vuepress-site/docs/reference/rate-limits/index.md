---
component: Reference
title: API Reference
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

::: slot left
## Sign in Your Users
API endpoints to authenticate your users, challenge for factors, recover passwords, and more. [Learn about which APIs to use.](/docs/concepts/oauth-openid/#authentication-api-vs-oauth-20-vs-openid-connect)

<CategoryLinks category="authentication" class="list--with-descriptions" />
:::

::: slot right
## Manage Okta Resources
REST endpoints to configure resources such as users, apps, sessions, and factors whenever you need.

<CategoryLinks category="management" where_exp="deprecated" :showExcerpt="false" class="list--multicolumn" sort="title" />
:::