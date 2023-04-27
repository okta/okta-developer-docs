---
title: DynamicScale rate limits guide
excerpt: >-
  Understand DynamicScale rate limits at Okta and learn how to design for efficient use of
  resources
---

# DynamicScale rate limits

If your needs exceed the Okta default rate limits for the base product subscriptions (One App or Enterprise) that you’ve already purchased, you can purchase a DynamicScale add-on service. The DynamicScale service grants you higher rate limits for the following endpoints. DynamicScale increases your default rate limits by 5x to 1000x, depending on the tier multiplier that you purchase. You can purchase this add-on annually for a production tenant or temporarily for testing in a sandbox tenant. The DynamicScale add-on service includes the following list of endpoints:

**Authentication endpoints:**

* `/api/v1/authn`
* `/api/v1/authn/factors/${factorIdOrFactorType}/verify`
* `/api/v1/sessions`
* `/login/login.htm`
* `/signin/*`
* `/login/sessionCookieRedirect`
* `/login/token/redirect`
* `/login/step-up/redirect`

**OAuth2 endpoints:**

* `/oauth2/${authorizationServerId}/v1`
* `/oauth2/${authorizationServerId}/v1/authorize`
* `/oauth2/v1` except `/oauth2/v1/clients`
* `/oauth2/v1/authorize`
* `/oauth2/v1/token`
* `/idp/idx/introspect` <ApiLifecycle access="ie" />
* `/idp/idx/identify` <ApiLifecycle access="ie" />
* Identity Engine App Intent <ApiLifecycle access="ie" />

**SAML endpoints:**

* `/app/template_saml_2_0/${key}/sso/saml`
* `/app/${app}/${key}/sso/saml`

**Single User/Group/App reads (GET only):**

* `/api/v1/apps/${id}`
* `/api/v1/groups/${id}`
* `/api/v1/users/${idOrLogin}`

> **Notes:**
>
> 1. Okta communicates any updates to the DynamicScale add-on rate limits through an updated version of this documentation.
> 2. DynamicScale add-on isn't available for customers that are using delegated authentication.
> 3. Not all DynamicScale multipliers are available when a customer uses both the DynamicScale add-on service and Okta inline hooks. When a customer is using Okta inline hooks, it's assumed that the third-party system responds to the inline hook requests in under 500 milliseconds.
>

If your usage pattern exceeds the rate limits offered by the DynamicScale add-on, or the endpoint that you're consuming isn't listed as part of the DynamicScale add-on, then contact your Okta sales representative regarding other options.
