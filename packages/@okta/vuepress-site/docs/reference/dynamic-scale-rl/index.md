---
title: DynamicScale Rate Limits
excerpt: >-
  Understand DynamicScale rate limits at Okta and learn how to design for efficient use of
  resources
---

# DynamicScale Rate Limits

If your needs exceed Okta's default rate limits for the base product subscriptions (One App or Enterprise) you've already purchased, you can purchase a "DynamicScale" add-on service which will grant you higher rate limits for the endpoints listed below. DynamicScale will increase your default rate limits by 5x to 1000x, depending on the tier multiplier you purchase. Customers can purchase this add-on annually for a Production tenant or temporarily for testing in a Sandbox tenant.  The following list of endpoints are included in the DynamicScale add-on service:

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

**Single User/Group/App operations (Get, Update and Delete):**

* `/api/v1/apps/{id}` &nbsp;
* `/api/v1/groups/{id}` &nbsp;
* `/api/v1/users/{idOrLogin}` &nbsp;

**Notes:**

1. If Okta makes any change to the DynamicScale add-on's rate limits, such change will be communicated to customers via an updated version of this product documentation.
2. DynamicScale add-on is not available for customers that are using Delegated Authentication.
3. Customers purchasing the DynamicScale add-on service will get best-effort additional protection beyond the multiplier they've purchased to handle any additional unforeseen spikes in Production:
    1. This protection is not always guaranteed and should not be counted towards available rate limits
    2. Additional protection availability is subject to infrastructure capacity available to your Org

If your usage pattern exceeds the rate limits offered by DynamicScale add-on or the endpoint you're consuming isn't listed as part of the DynamicScale add-on then please contact your Okta Sales Representative regarding other options.

For orgs that purchased the "High Capacity Rate Limit" SKU before 2019-10-24, the [previous rate limits](#high-capacity-rate-limits) still apply.