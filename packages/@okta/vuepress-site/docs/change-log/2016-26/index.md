---
title: Okta API Products Change Log
---

## 2016.26

### New Feature: API for Custom SMS Template

You can send custom text as part of an SMS message request:

1. Use the `/api/v1/templates/sms` endpoint to create a custom SMS text template.
2. Send a request to the Factors API specifying the template for verification. There is no change in the response.

For more information, see [Templates API](/docs/api/resources/templates) and [Factors API](/docs/api/resources/factors).

### Feature Enhancement: Resource Owner Password Credential Flow for OpenID Connect Supports Refresh Tokens

The `/oauth2/v1/token` endpoint includes a Refresh Token if:

* The request contains a `grant_type` with the value `password` and your client supports the `grant_type` value `refresh_token`. For more information, see [Token Request](/docs/api/resources/oidc#request-parameters-1).
* You request the `offline_access` scope. For more information, see [Refresh Tokens](/authentication-guide/tokens/refreshing-tokens).

### Bugs Fixed

* For some customers, an API request for users that match a value for `last_name` didn't return all the matches. (OKTA-91367)
