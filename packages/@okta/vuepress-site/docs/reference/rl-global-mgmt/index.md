---
title: Management rate limits
excerpt: >-
  Understand management rate limits at Okta and learn how to design for efficient use of
  resources
---

# Management rate limits

These endpoints are related to administrative actions within Okta (you list access as an admin).

| Action and Okta API Endpoint                                                                                                                                              | Developer (free) | Developer (paid) | One App | Enterprise | Workforce Identity    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ---------------- | ------- | ---------- | --------------------- |
| **Create or list applications:**<br>`/api/v1/apps` except `/api/v1/apps/{id}` [KARTHICK]                                                                                            | 20               | 25               | 25      | 100        | 100                   |
| **Get, update, or delete an application by ID:**<br>`/api/v1/apps/{id}` only [KARTHICK]                                                                                             | 100              | 300              | 300     | 600        | 500                   |
| **Create or list groups:**<br>`/api/v1/groups` except `/api/v1/groups/{id}` [KARTHICK]                                                                                              | 100              | 300              | 300     | 600        | 500                   |
| **Get, update, or delete a group by ID:**<br>`/api/v1/groups/{id}` only [KARTHICK]                                                                                                  | 100              | 300              | 300     | 600        | 1000                  |
| **Create or list users:**<br>Only `GET` or `POST` to `/api/v1/users` [KARTHICK]                                                                                                     | 100              | 300              | 300     | 600        | 600                   |
| **Get a user by ID or login:**<br>Only `GET` to `/api/v1/users/{idOrLogin}` [KARTHICK]                                                                                              | 100              | 300              | 300     | 1000       | 2000                  |
| **Update or delete a user by ID:**<br>Only `POST`, `PUT` or `DELETE` to `/api/v1/users/{id}`                                                                              | 100              | 300              | 300     | 600        | 600                   |
| **Get System Log data:**<br>`/api/v1/logs`                                                                                                                                | 20               | 25               | 25      | 50         | 120                   |
| **Get System Log data:**<br>`/api/v1/events`                                                                                                                              | 20               | 25               | 25      | 50         | 100 					 |
| **Get session information:**<br>`/api/v1/sessions` [KARTHICK]                                                                                                                       | 100              | 300              | 300     | 600        | 750                   |
| **Create an organization:**<br>`/api/v1/orgs`                                                                                                                             | N/A              | N/A              | N/A     | 50         | 50                    |
| **OAuth2 requests for Custom Authorization Servers:**<br>`/oauth2/{authorizationServerId}/v1` except public metadata endpoints (see Note below) [KARTHICK]                          | 300              | 600              | 600     | 1200       | 2000                  |
| **OAuth2 requests for the Org Authorization Server:**<br>`/oauth2/v1` except `/oauth2/v1/clients` and public metadata endpoints (see Note below) [KARTHICK]                         | 300              | 600              | 600     | 1200       | 2000                  |
| **OAuth2 client configuration requests:**<br>`/oauth2/v1/clients`                                                                                                         | 25               | 50               | 50      | 100        | 100                   |
| **Most other API actions:**<br>`/api/v1` [KARTHICK]                                                                                                                                  | 100              | 300              | 300     | 600        | 1200                  |

