---
title: Overview
---
Okta API tokens are used to authenticate requests to Okta APIs.

When calling an Okta API endpoint, you need to supply a valid API token in the HTTP `Authorization` header, with a valid token specified as the header value. The value needs to be prefixed with the identifier `SSWS`, which specifies the proprietary authentication scheme Okta uses. For example:

```http
Authorization: SSWS 00QCjAl4MlV-WPXM...0HmjFx-vbGua
```

#### Privilege level

Different Okta API operations require different admin privilege levels. API tokens inherit the privilege level of the admin account used to create them. It is therefore good practice to create a service account to use when you create API tokens so that you can assign the token the specific privilege level needed. See [Administrators](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Security_Administrators) for admin account types and the specific privileges of each.

#### OAuth 2.0 instead of API tokens

As an alternative to Okta API tokens, you can now interact with Okta APIs using scoped OAuth 2.0 access tokens for a number of Okta endpoints. Each access token enables the bearer to perform specific actions on specific Okta endpoints, with that ability controlled by which scopes the access token contains. For more information, see the [OAuth for Okta](/docs/guides/implement-oauth-for-okta/) guide.

## Support

If you need help or have an issue, post a question on the [Okta Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
