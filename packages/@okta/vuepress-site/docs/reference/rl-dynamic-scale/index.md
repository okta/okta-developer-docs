---
title: DynamicScale rate limits guide
excerpt: >-
  Understand DynamicScale rate limits at Okta and learn how to design for efficient use of
  resources
---

# DynamicScale rate limits

You can purchase a DynamicScale add-on service if your needs exceed the default rate limits for your base product. The DynamicScale service grants you higher rate limits for the following endpoints. It increases your default rate limits by five times and up to 1000 times depending on the tier multiplier.

>**Note:** The DynamicScale add-on service is only available to Customer Identity Solutions (CIS) customers.

You can purchase this add-on annually for a Production or Preview tenant.

The DynamicScale add-on service includes the following list of endpoints:

**Authentication endpoints:**

* `/api/v1/authn*`
* `/api/v1/authn/introspect`
* `/api/v1/authn/factors/{factorIdOrFactorType}/verify`
* `/api/v1/authn/factors/{factorId}/transactions/{transactionId}/verify`
* `/api/v1/sessions*`
* `/auth/services/devicefingerprint`
* `/login/login.htm`
* `/login/interact/{interactionHandle}`
* `/login/sessionCookieRedirect`
* `/login/token/redirect`
* `/login/step-up/redirect`
* `/signin/**`
* `/sign-in*`
* `/sso/idps/{idpId}`

**OAuth2 endpoints:**

* `/activate`
* `/oauth2/{authorizationServerId}/v1*`
* `/oauth2/{authorizationServerId}/v1/authorize`
* `/oauth2/{authorizationServerId}/v1/interact`
* `/oauth2/{authorizationServerId}/v1/token`
* `/oauth2/v1*` except `/oauth2/v1/clients`
* `/oauth2/v1/authorize`
* `/oauth2/v1/interact`
* `/oauth2/v1/token`
* `/idp/idx/introspect` <ApiLifecycle access="ie" />
* `/idp/idx/identify` <ApiLifecycle access="ie" />
* Identity Engine App Intent <ApiLifecycle access="ie" />

**SAML endpoints:**

* `/app/template_saml_2_0/{key}/sso/saml`
* `/app/{app}/{key}/sso/saml`

**Single User/Group/App reads (GET only):**

* `/api/v1/apps/{id}`
* `/api/v1/groups/{id}`
* `/api/v1/users/me`
* `/api/v1/users/{idOrLogin}` (appears as `/api/v1/users/{id:.+}` in the rate limit dashboard)
* `/api/v1/users/{userId}/factors/{userFactorIdOrFactorType}/verify`

> **Notes:**
>
> 1. Okta communicates any updates to the DynamicScale add-on rate limits through an updated version of this documentation.
> 2. The DynamicScale add-on isn't available for customers that are using delegated authentication.
> 3. Not all DynamicScale multipliers are available when a customer uses both the DynamicScale add-on service and Okta inline hooks. When a customer is using Okta inline hooks, it's assumed that the third-party system responds to the inline hook requests in under 500 milliseconds.
> 4. API endpoints that end with an asterisk (for example, `/oauth2/v1*`) refer to calls that use that base schema and don't match a specific endpoint.
>

Contact your Okta sales representative regarding other options if:

* Your use pattern exceeds the rate limits offered by the DynamicScale add-on
* The endpoint that you're consuming isn't listed as part of the DynamicScale add-on
