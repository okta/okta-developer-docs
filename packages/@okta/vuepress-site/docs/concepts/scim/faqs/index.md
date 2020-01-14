---
title: SCIM - Frequently Asked Questions
layout: docs_page
icon: /assets/img/icons/scim.svg
meta:
  - name: description
    content: Answers to your question on how to SCIM works with Okta.
---

## SCIM Technical Questions

**Q: Our API is similar to SCIM, but is not 100% compliant. Can we still integrate with Okta?**

Your app's SCIM server must be fully SCIM compliant in order to integrate with Okta.

Okta SCIM client endpoints are hard coded using a template which adheres directly to [the SCIM spec](http://www.simplecloud.info/).

Instructions on what endpoints need to be implemented can be found in our [Build a SCIM provisioning integration](/docs/guides/build-provisioning-integration/overview/) Guide.

**Q: How should I be managing authentication to my SCIM API?**

Okta recommends using the [OAuth 2.0 Authorization Code grant flow](/docs/guides/implement-auth-code/). Okta doesn't support the Client Credentials or Resource Owner Password Credentials Authorization grant flows for SCIM. The Authorization Code grant flow is more common in SaaS and cloud integrations and is also more secure.

In addition to OAuth, Okta also supports connections with basic auth and header token auth options.

**Q: I have a multi-tenant integration. How do I allow my customers to customize their specific tenant in Okta?**

Use the OAuth 2.0 Authorization Code grant flow, so that you know exactly which token the customer is using.

Another option is when the customer configures your app in Okta, Okta can prompt them to add their unique subdomain for your app.

Okta can use part of this URL in the SCIM endpoint for that customer, for example:

* `http://www.company.com/**tenantA**/scim`
* `http://www.company.com/**tenantB**/scim`

This subdomain field can be configured in consultation with Okta after you submit your app for Okta review.

**Q: Why do I need to implement the type sub-attribute for emails, phone numbers, or addresses?**

The SCIM User Profile allows for an array of emails. The only way to differentiate between emails is to use the `type` sub-attribute.

* When returning multi-valued attributes, service providers should present the value returned in a canonical form. For example, returning a value such as "home" or "work" for the sub-attribute "type" of an email address. See [Section 2.4 of RFC 7643](https://tools.ietf.org/html/rfc7643#section-2.4) for more details.
* Service providers may return objects with the same value, but with a different `type` sub-attribute.  For example, the same email address may be used for work and home. However, the SP should not return the same value and type combination more than once per attribute, as this complicates processing by the client.
* When defining a schema for multi-valued attributes, it is considered a good practice to provide a `type` sub-attribute that may be used for the canonicalization of values. In the schema definition for an attribute, the service provider can define a list of recommended canonical values (see [RFC 7643 Section 7](https://tools.ietf.org/html/rfc7643#section-7)).

**Q: I only have one email/phone number/address in my user profile. Do I need to use an array for it?**

Yes, you must return these fields in an array. The array structure is specified in [section 5](https://tools.ietf.org/html/rfc7159#section-5) of the SCIM spec as a multi-valued attribute.

**Q: Why doesn't Okta support DELETE /Users?**

Okta users are not deleted for compliance and audit purposes; Okta user profiles are marked as "deactivated". Because of this, Okta never makes a DELETE request to a user resource on your SCIM API. Instead, Okta makes a PATCH request to set the `active` value to `false`. You'll need to support the concept of an "active" and "inactive" user within your app.

**Q: How does data validation work with SCIM provisioning? For example, if my app requires the phone number in a specific format, how do I ensure that Okta passes the attribute in that format? If a data validation error issue occurs, how does error reporting work?**

The SCIM spec specifies valid data formats for a given user profile attribute, however Okta does not rigorously validate that the customer has submitted values meeting those requirements to preserve flexibility.

Therefore, data validation should be handled by your app's SCIM server. When Okta provisions a user profile to your server, your app should check that the data is valid according to any special requirements. Error messages sent in response from your app are surfaced to the Okta administrator through alerts and tasks in the Okta interface.

You should also specify your data requirements in the configuration document you provide for using your app.

**Q: How much support is required for filtering results?**

The filtering capabilities in the SCIM protocol are pretty broad, but the common filtering use case with Okta is quite narrow. Okta determines if a newly created user already exists in your app based on a matching identifier. This means the `eq` (equals) operator is all you really need to support.

On the SCIM server side, Okta only supports filtering through the `eq` operator on the SCIM `userName` attribute. However, Okta can use any `appuser` attribute on the Okta side for passing into the `eq` operator. Typically this is `appuser.userName`, but `appuser.email` or `appuser.randomAttribute` are also valid.
