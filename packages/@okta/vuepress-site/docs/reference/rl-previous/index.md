---
title: Previous rate limits
excerpt: >-
  Understand legacy rate limits at Okta and learn how to design for efficient use of
  resources
---

# Previous rate limits

This page covers the rate limits for orgs that were created before 2018-05-17.

## High capacity rate limits

If your needs exceed Okta's rate limits, you can purchase the High Capacity Rate Limit add-on. Customers who purchase the High Capacity Rate Limit add-on service may not use the service in excess of the static rate limit, as set forth in the table below. If Okta makes any change to the rate limit, the change is communicated to customers through an updated version of this product documentation.

The following table lists the high capacity rate limits per minute that apply across the Okta API for these endpoints. You can confirm endpoint limits using the rate limit dashboard in the Admin Console. See [APIs table](/docs/reference/rl-dashboard/#apis-table).

| Endpoint                                                                   | One App   | Enterprise   |
| -------------------------------------------------------------------------- | ---------: | ------------: |
| `/oauth2/{authorizationServerId}/v1`                                       | 6000      | 6000         |
| `/oauth2/v1` except `/oauth2/v1/clients`                                   | 6000      | 6000         |
| `/api/v1`                                                                  | 3000      | 3000         |
| `/api/v1/sessions`                                                         | 3000      | 3000         |
|  Only `/app/template_saml_2_0/{key}/sso/saml`                                    | 3000      | 3000         |
|  Only `/app/{app}/{key}/sso/saml`                                                | 3000      | 3000         |
|  Only `/api/v1/groups/{id}`                                                      | 3000      | 3000         |
|  Only `/api/v1/users/{id}`                                                       | 3000      | 3000         |
| `/api/v1/users/{idOrLogin}` (only `GET`)                                   | 5000      | 5000         |
| `/api/v1/authn`                                                            | 3000      | 3000         |
|  Only `/api/v1/authn/factors/{factorIdOrFactorType}/verify`                      | 3000      | 3000         |
|  Only `/api/v1/apps/{id}`                                                        | 3000      | 3000         |
| `/bc/image/fileStoreRecord`                                                | 3000      | 3000         |
| `/bc/globalFileStoreRecord`                                                | 3000      | 3000         |

If your usage needs exceed the rate limits applicable to the High Capacity Rate Limit add-on service, please contact your Okta Sales Representative regarding other options.
