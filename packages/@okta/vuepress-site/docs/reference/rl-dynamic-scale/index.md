---
title: DynamicScale rate limits
excerpt: >-
  Understand DynamicScale rate limits at Okta and learn how to design for efficient use of
  resources
---

# DynamicScale rate limits

If your needs exceed Okta's default rate limits for the base product subscriptions (One App or Enterprise) that you've already purchased, you can purchase a DynamicScale add-on service that grants you higher rate limits for the endpoints listed below. DynamicScale increases your default rate limits by 5x to 1000x, depending on the tier multiplier that you purchase. Customers can purchase this add-on annually for a Production tenant or temporarily for testing in a Sandbox tenant. The following list of endpoints are included in the DynamicScale add-on service:

**Authentication endpoints:**

* `/api/v1/authn`
* `/api/v1/authn/factors/{factorIdOrFactorType}/verify`
* `/api/v1/sessions`
* `/login/login.htm`
* `/login/sessionCookieRedirect`
* `/login/token/redirect`

**OAuth2 endpoints:**

* `/oauth2/{authorizationServerId}/v1`
* `/oauth2/v1` except `/oauth2/v1/clients`

**SAML endpoints:**

* `/app/template_saml_2_0/{key}/sso/saml`
* `/app/{app}/{key}/sso/saml`

**Single User/Group/App operations (Get, Update, and Delete):**

* `/api/v1/apps/{id}`&#160;
* `/api/v1/groups/{id}`&#160;
* `/api/v1/users/{idOrLogin}`&#160;

> **Notes:**
>
> 1. If Okta makes any change to the DynamicScale add-on rate limits, such a change is communicated to customers through an updated version of this product documentation.
> 2. DynamicScale add-on isn't available for customers that are using Delegated Authentication.
> 3. Customers purchasing the DynamicScale add-on service get best-effort additional protection beyond the multiplier that they've purchased to handle any additional unforeseen spikes in Production:
>     * This protection isn't always guaranteed and shouldn't be counted towards available rate limits.
>     * Additional protection availability is subject to infrastructure capacity available to your org.
> 4. Not all DynamicScale multipliers are available when a customer uses both the DynamicScale add-on service and Okta inline hooks. When a customer is using Okta inline hooks, it is assumed that the 3rd party system responds to the inline hook requests in under 500 milliseconds.
>

If your usage pattern exceeds the rate limits offered by the DynamicScale add-on or the endpoint that you're consuming isn't listed as part of the DynamicScale add-on, then please contact your Okta Sales Representative regarding other options.

For orgs that purchased the High Capacity Rate Limit SKU before 2019-10-24, the [previous rate limits](/docs/reference/rl-previous/) still apply.
