---
title: Previous rate limits
excerpt: >-
  Understand legacy rate limits at Okta and learn how to design for efficient use of
  resources
---

## Previous rate limits

This page covers the rate limits for orgs that were created before 2018-05-17.

### High capacity rate limits

If your needs exceed Okta's rate limits, you can purchase the High Capacity Rate Limit add-on. Customers who purchase the High Capacity Rate Limit add-on service may not use the service in excess of the static rate limit, as set forth in the table below. If Okta makes any change to the rate limit, the change is communicated to customers through an updated version of this product documentation.

The following are the high capacity rate limits per minute that apply across the Okta API for these endpoints:

| Endpoint                                                                   | One App   | Enterprise   |
| -------------------------------------------------------------------------- | ---------: | ------------: |
| `/oauth2/{authorizationServerId}/v1`                                       | 3000      | 6000         |
| `/oauth2/v1` except `/oauth2/v1/clients`                                   | 3000      | 6000         |
| `/api/v1`                                                                  | 1500      | 3000         |
| `/api/v1/sessions`                                                         | 1500      | 3000         |
| `/app/template_saml_2_0/{key}/sso/saml`                                    | 1500      | 3000         |
| `/app/{app}/{key}/sso/saml`                                                | 1500      | 3000         |
| `/api/v1/groups/{id}`                                                      | 1500      | 3000         |
| `/api/v1/users/{id}`                                                       | 1500      | 3000         |
| `/api/v1/users/{idOrLogin}` (only `GET`)                                   | 1500      | 5000         |
| `/api/v1/authn`                                                            | 1500      | 3000         |
| `/api/plugin/{protocolVersion}/form-creds/{appUserIds}/{formSiteOption}`   | 1500      | 3000         |
| `/api/v1/authn/factors/{factorIdOrFactorType}/verify`                      | 1500      | 3000         |
| `/api/v1/apps/{id}`                                                        | 1500      | 3000         |
| `/bc/image/fileStoreRecord`                                                | 1500      | 3000         |
| `/bc/globalFileStoreRecord`                                                | 1500      | 3000         |

If your usage needs exceed the rate limits applicable to the High Capacity Rate Limit add-on service, please contact your Okta Sales Representative regarding other options.

### Org-wide rate limits (legacy orgs)

Extensions to the base URLs listed below are included in the specified limit, unless the URL is followed by "only." For example, `/api/v1/apps/{id}` has a per-minute rate limit of `500` as listed in the second line in the table. However, `/api/v1/apps/{id}/users` falls under the more general first line of the table. This pattern applies to all the URLs.

| Action                                    | Okta API Endpoint                                                       | Per Minute Limit (Older Orgs) |
| :---------                                | :--------------------------------------------------------------         | -----------------------:      |
| Create or list applications               | `/api/v1/apps`   except `/api/v1/apps/{id}`                             | 100                           |
| Get, update, or delete an application     | `/api/v1/apps/{id}` only                                                | 500                           |
| Authenticate different end users          | `/api/v1/authn`                                                         | 500                           |
| Creating or listing groups                | `/api/v1/groups` except  `/api/v1/groups/{id}`                          | 500                           |
| Get, update, or delete a group            | `/api/v1/groups/{id}` only                                              | 1000                          |
| Get System Log data                       | `/api/v1/logs`                                                          | 120                           |
| Get session information                   | `/api/v1/sessions`                                                      | 750                           |
| Create or list users                      | `/api/v1/users` except `/api/v1/users/{id}` and `/api/v1/users/{login}` | 600                           |
| Get a user by user ID or login (combined) | `/api/v1/users/{id}` or `/api/v1/users/{login}`  only                   | 2000                          |
| Get my user                               | `/api/v1/users/me`                                                      | 1000                          |
| Update or delete a user by ID             | `/api/v1/users/{id}` only                                               | 600                           |
| Create an org (ISVs only)                 | `/api/v1/orgs`                                                          | 50                            |
| All other actions                         | `/api/v1/`                                                              | 1000                          |

### Concurrent rate limits (legacy orgs)

For legacy orgs, the limit is 75 concurrent transactions.

### Home page endpoint limits (legacy orgs)

The following endpoints are used by the Okta home page for authentication and user ign in and have org-wide rate limits:

| Okta Home Page Endpoints                                                | Per-Minute Limit |
| :-----------------------------------------                              | ------:          |
| `/app/{app}/{key}/sso/saml`                                             | 750              |
| `/app/office365/{key}/sso/wsfed/active`                                 | 1000             |
| `/app/office365/{key}/sso/wsfed/passive`                                | 250              |
| `/app/template_saml_2_0/{key}/sso/saml`                                 | 2500             |
| `/login/do-login`                                                       | 200              |
| `/login/login.htm`                                                      | 850              |
| `/login/sso_iwa_auth`                                                   | 500              |
| `/api/plugin/{protocolVersion}/form-cred/{appUserIds}/{formSiteOption}` | 650              |
| `/api/plugin/{protocolVersion}/sites`                                   | 150              |
| `/bc/fileStoreRecord`                                                   | 500              |
| `/bc/globalFileStoreRecord`                                             | 500              |
