---
title: Okta API Products Change Log
---

## 2018.12

| Change | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| :---------- | :--------------------------------- | :----------------------------------------------------------- |
| [Change to App Variable Name Incrementing](#change-to-app-variable-name-incrementing) | March 21, 2018 | March 26, 2018 |
| [Token Management API Is in Early Access (EA)](#token-management-api-is-in-early-access-ea) | March 21, 2018 | March 26, 2018 |
| [System Log API Is in Early Access (EA)](#system-log-api-is-in-early-access-ea) | Available Now | Available Now |
| [Password Imports with Salted SHA-256 Algorithm is in Early Access (EA)](#password-imports-with-salted-sha-256-algorithm-is-in-early-access-ea) | Available Now | Available Now |
| [Bug Fixed for 2018.12](#bug-fixed-for-201812) | March 21, 2018 | March 26, 2018 |

### Change to App Variable Name Incrementing

When creating multiple instances of the same app, each instance of the app has a unique Variable Name. This Variable Name is used as part of the Okta Expression Language. Previously each instance was incrementally numbered (`salesforce_1`, `salesforce_2`, etc), but going forward each instance will instead have a 7-character alphanumeric string appended to its Variable Name. To find your app's Variable Name, go into the Profile Editor for that app. This change only affects newly created apps. <!-- OKTA-158282 -->

### Token Management API Is in Early Access (EA)

Use the Token Management API to view and revoke OAuth 2.0 and OpenID Connect refresh tokens by [end user](/docs/api/resources/users#user-oauth-20-token-management-operations), [Custom Authorization Server](/docs/api/resources/authorization-servers#oauth-20-token-management-operations), or [client app](/docs/api/resources/apps#application-oauth-20-token-operations). <!-- OKTA-145525 -->

### Bug Fixed for 2018.12

* `GET` requests to the `/authorize` [endpoint](/docs/api/resources/oidc#authorize) with `response_mode=form_post` would return an HTML page with a title `<span>`. (OKTA-162709)
