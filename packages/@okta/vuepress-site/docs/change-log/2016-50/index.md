---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2016.49
---

## 2016.50

### New Feature: API Access Management in EA Release

Okta's API Access Management helps enterprises protect their APIs using OAuth 2.0 as a Service.
By defining flexible security domains, scopes, claims, and access policies, you can control access as narrowly or as widely as needed for your enterprise.
With this solution, you can create one or more authorization servers, configure scopes, set access policies and have a fully operational OAuth Authorization Service in minutes.
We support the full set of core OAuth and OIDC flows (code, implicit, password, client credential, hybrid, and refresh) and are fully spec compliant.

![Authorization Server page](/assets/img/auth_server2.png "Authorization Server page")

To get started with API Access Management, visit [API Access Management](/use_cases/api_access_management//).

### Feature Enhancement: Delete User Endpoint

The endpoint to delete users changed from the Beta endpoint `POST /api/v1/users/{id}/lifecycle/delete`
to the more intuitive [`DELETE /api/v1/users/{id}`](/docs/api/resources/users#delete-user) for EA.
The Beta endpoint has been removed. <!-- (OKTA-108195) -->

### Platform Bugs Fixed

* Tokens for a suspended user didn't fail introspection. (OKTA-1090006)
