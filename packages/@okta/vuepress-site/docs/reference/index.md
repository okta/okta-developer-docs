---
layout: SectionIndex
title: API Reference
top_links:
  - name: API Concepts
    path: /docs/api/getting_started/design_principles/
    icon: icons/icon--docs-apiconcepts.svg
  - name: Error Codes
    path: /reference/error_codes/
    icon: icons/icon--docs-errorcodes.svg
  - name: Okta Expression Language
    path: /reference/okta_expression_language/
    icon: icons/icon--docs-expressionlang.svg
  - name: Postman Collections
    path: /reference/postman_collections/
    icon: icons/icon--docs-postman.svg
---

::: slot left
## Sign in Your Users
API endpoints to authenticate your users, challenge for factors, recover passwords, and more. [Learn about which APIs to use.](/authentication-guide/auth-overview/#authentication-api-vs-oauth-20-vs-openid-connect)

<CategoryLinks category="authentication" class="list--with-descriptions" />
:::

::: slot right
## Manage Okta Resources
REST endpoints to configure resources such as users, apps, sessions, and factors whenever you need.

<CategoryLinks category="management" where_exp="deprecated" :showExcerpt="false" class="list--multicolumn" sort="title" />
:::
