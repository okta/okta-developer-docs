---
title: Create an API token
excerpt: How to create a token for the Okta API
layout: Guides
---

This guide explains what an API token is, why you need one, and how to create one.

---

#### Learning outcomes

* Learn how an Okta API token is used.
* Understand why it's good practice to create a service account for use with an API token.
* Know the alternatives to Okta API tokens.
* Find out when a token expires and what happens when it expires.
* Find out how API tokens are deactivated.

#### What you need

[Okta Developer Edition organization](https://developer.okta.com/signup)

---

## Okta API tokens

Okta API tokens are used to authenticate requests to Okta APIs. When calling an Okta API endpoint, you need to supply a valid API token in the HTTP `Authorization` header, with a valid token specified as the header value. You need to prefix the value with the `SSWS` identifier, which specifies the proprietary authentication scheme that Okta uses. For example:

```http
Authorization: SSWS 00QCjAl4MlV-WPXM...0HmjFx-vbGua
```

### Privilege level

Different Okta API operations require different admin privilege levels. API tokens inherit the privilege level of the admin account that is used to create them. It’s therefore good practice to create a service account to use when you create API tokens. With a separate service account, you can assign specific privilege levels to your API tokens. See [Administrators](https://help.okta.com/okta_help.htm?id=ext_Security_Administrators) for admin account types and the specific privileges of each.

### OAuth 2.0 instead of API tokens

As an alternative to Okta API tokens, you can use Okta APIs. You can use a scoped OAuth 2.0 access token for various Okta endpoints. Each access token enables the bearer to perform specific actions on specific Okta endpoints, with that ability controlled by which scopes the access token contains. For more information, see the [OAuth for Okta](/docs/guides/implement-oauth-for-okta/) guide.

## Create the token

See [Create Okta API tokens](https://help.okta.com/okta_help.htm?id=ext-create-api-token) to create an API token and define the network zones that API calls can originate from.

> **Note:** Record the token value. This is the only opportunity to see it and record it.

## Token network restrictions

You can specify a network range for every SSWS API token. The tokens only work if API requests are made from the specified IP or network range. You can specify network zones while you create an API token. You can also modify an existing token to specify a network range.

See [Manage Okta API tokens](https://help.okta.com/okta_help.htm?id=ext_API) for steps on creating API tokens and editing network restrictions for an existing API token.

## Token rate limits

When API tokens are created, the rate limit for each token interaction is set automatically to 50 percent of each API maximum limit. See [API rate limits](/docs/reference/rate-limits/). You can adjust this percentage by editing the **Token rate limits** section. See [Set token rate limits](https://help.okta.com/okta_help.htm?id=ext_API#set-token-rate-limits).

## Token expiration and deactivation

Tokens expire automatically after a certain period and can also be deactivated at any time.

### Token expiration

Tokens are valid for 30 days from creation or last use, so that the 30 day expiration automatically refreshes with each API call. Tokens that aren't used for 30 days expire. The 30-day period is fixed and can't be changed for your org.

### Token deactivation

If a user account is deactivated in Okta, any API token created by that user account is deprovisioned at the same time.

## Next steps

With the token created, you can begin using it, supplying it in the `Authorization header` of calls to Okta API endpoints. See [Sign users into your SPA using the redirect model](/docs/guides/sign-into-spa-redirect/-/main/#use-the-access-token) for a functional example.

## See also

* See [Use Postman with the Okta REST APIs](/docs/reference/rest/) for a guide to trying out Okta APIs using Postman, as an easy way to explore.
* See [System Log Transaction Object](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SystemLog/#tag/SystemLog/operation/listLogEvents!c=200&path=transaction&t=response) for information on viewing the API token ID in the Okta System Log.
* For information on the general principles the Okta API follows, see [Design Principles](/docs/reference/core-okta-api/#design-principles).
