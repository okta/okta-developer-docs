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

**OAuth2 endpoints:**

* `/oauth2/{authorizationServerId}/v1`
* `/oauth2/v1` except `/oauth2/v1/clients`

**SAML endpoints:**

* `/app/template_saml_2_0/{key}/sso/saml`
* `/app/{app}/{key}/sso/saml`

**Single User/Group/App operations (Get, Update, and Delete):**

* `/api/v1/apps/{id}`
* `/api/v1/groups/{id}`
* `/api/v1/users/{idOrLogin}`

> **Notes:**
>
> 1. If Okta makes any change to the DynamicScale add-on rate limits, such a change is communicated to customers through an updated version of this product documentation.
> 2. DynamicScale add-on isn't available for customers that are using Delegated Authentication.
> 3. Customers purchasing the DynamicScale add-on service get best-effort additional protection beyond the multiplier that they've purchased to handle any additional unforeseen spikes in Production:
>     * This protection isn't always guaranteed and shouldn't be counted towards available rate limits.
>     * Additional protection availability is subject to infrastructure capacity available to your org.
>

If your usage pattern exceeds the rate limits offered by DynamicScale add-on or the endpoint that you're consuming isn't listed as part of the DynamicScale add-on, then please contact your Okta Sales Representative regarding other options.

For orgs that purchased the High Capacity Rate Limit SKU before 2019-10-24, the [previous rate limits](/docs/reference/rl-legacy/) still apply.
