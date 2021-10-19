---
title: Create an API token
excerpt: How to create a token for the Okta API
layout: Guides
---

This page explains what an API token is, why you need one, and how to create one.

---
**Learning outcomes**

* How an Okta API token is used
* Why it's good practice to create a service account for use with an API token
* Alternatives to Okta API tokens
* Token expiration
* How API tokens are deactivated

**What you need**

Have an Okta Developer Edition organization. Don't have one? [Create one for free](/signup).

**Sample code**

n/a

---

## Okta API tokens

Okta API tokens are used to authenticate requests to Okta APIs. When calling an Okta API endpoint, you need to supply a valid API token in the HTTP `Authorization` header, with a valid token specified as the header value. You need to prefix the value with the `SSWS` identifier, which specifies the proprietary authentication scheme that Okta uses. For example:

```http
Authorization: SSWS 00QCjAl4MlV-WPXM...0HmjFx-vbGua
```

### Privilege level

Different Okta API operations require different admin privilege levels. API tokens inherit the privilege level of the admin account that is used to create them. It is therefore good practice to create a service account to use when you create API tokens so that you can assign the token the specific privilege level needed. See [Administrators](https://help.okta.com/okta_help.htm?id=ext_Security_Administrators) for admin account types and the specific privileges of each.

### OAuth 2.0 instead of API tokens

As an alternative to Okta API tokens, you can now interact with Okta APIs using scoped OAuth 2.0 access tokens for a number of Okta endpoints. Each access token enables the bearer to perform specific actions on specific Okta endpoints, with that ability controlled by which scopes the access token contains. For more information, see the [OAuth for Okta](/docs/guides/implement-oauth-for-okta/) guide.

## Create the token

To create an API token, follow these steps:

1. Sign in to your Okta organization as a user with [administrator privileges](https://help.okta.com/okta_help.htm?id=ext_Security_Administrators).

     API tokens have the same permissions as the user who creates them, and if the user permissions change, the API token permissions also change.

    See the section above on **Privilege level**, regarding the use of a service account when creating an API token, to specifically control the privilege level associated with the token.

2. Access the API page: In the Admin Console, select **API** from the **Security** menu and then select the **Tokens** tab.

3. Click **Create Token**.

4. Name your token and click **Create Token**.

5. Record the token value. This is the only opportunity to see it and record it.

## Token expiration and deactivation

Tokens expire automatically after a certain period and can also be deactivated at any time.

### Token expiration

Tokens are valid for 30 days from creation or last use, so that the 30 day expiration automatically refreshes with each API call. Tokens that aren't used for 30 days expire. The 30-day period is currently fixed and can't be changed for your organization.

### Token deactivation

If a user account is deactivated in Okta, any API token created by that user account is deprovisioned at the same time.

## Next steps

With the token created, you can begin using it, supplying it in the `Authorization header` of calls to Okta API endpoints. See [Create a user by API](/docs/guides/quickstart/cli/try-api/#create-a-user-by-api) for an easy way to explore making calls to Okta using the Okta APIs.

## See also

* See [Use Postman with the Okta REST APIs](/code/rest/) for a guide to trying out Okta APIs using Postman, as an easy way to explore.
* For information on the general principles the Okta API follows, see [Design Principles](/docs/reference/core-okta-api/#design-principles).
