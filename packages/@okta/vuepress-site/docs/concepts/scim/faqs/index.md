---
title: SCIM - frequently asked questions
meta:
  - name: description
    content: Answers to your questions about how SCIM works with Okta.
---

# SCIM technical questions

**Q: My API is similar to SCIM, but isn't 100% compliant. Can I still integrate with Okta?**

You can find guidance on what endpoints you need to implement in our [SCIM Reference](https://developer.okta.com/docs/api/openapi/okta-scim/guides/) documentation for either SCIM [V2.0](https://developer.okta.com/docs/api/openapi/okta-scim/guides/scim-20/) or [V1.1](https://developer.okta.com/docs/api/openapi/okta-scim/guides/scim-11/) deployments.

**Q: How should I be managing authentication to my SCIM API?**

Okta recommends using the [OAuth 2.0 Authorization Code grant flow](/docs/guides/implement-grant-type/authcode/main/). Okta doesn't support the Client Credentials or Resource Owner Password Credentials Authorization grant flows for SCIM. The Authorization Code grant flow is more common in SaaS and cloud integrations and is also more secure.

In addition to OAuth, Okta also supports connections with basic auth and header token auth options.

**Q: I have a multi-tenant integration. How do I allow my customers to customize their specific tenant in Okta?**

Use the OAuth 2.0 Authorization Code grant flow, so that you know exactly which token the customer is using.

Another option is when the customer configures your Okta integration, Okta can prompt them to add their unique subdomain for your cloud app.

Okta can use part of this URL in the SCIM endpoint for that customer, for example:

* `http://www.company.com/{tenantA}/scim`
* `http://www.company.com/{tenantB}/scim`

This subdomain field can be configured in consultation with Okta after you submit your integration for review.

**Q: I only have one email/phone number/address in my user profile. Do I need to use an array for it?**

Yes, you must return these fields in an array structure. This is a multi-valued attribute as outlined in [section 5](https://tools.ietf.org/html/rfc7159#section-5) of the SCIM specification.

**Q: What determines the primary value for email, phone numbers, or addresses?**

The returned array must have a `primary=true` attribute for the value that Okta takes as the primary value for the user profile.

**Q: When would I need to implement the `type` subattribute for emails, phone numbers, or addresses?**

By default, Okta doesn't use the `type` subattribute, other than to read the type attribute of your primary value attribute. However, if your SCIM integration does need to distinguish between various canonical entries for an attribute (for example, differentiating between a home and work email address), then you can use the `type` subattribute in the returned array.

If your integration doesn't need to distinguish between canonical entries, you can delete the `emailType` (or `addressType` or `primaryPhoneType`) attribute and mapping from your profile schema.

* See [Section 2.4 of RFC 7643](https://tools.ietf.org/html/rfc7643#section-2.4) for more details on returning multi-valued attributes.
* Don't return the same value and type combination more than once per attribute, as this complicates processing by the client.
* In the schema definition, you can define a list of recommended canonical values for an attribute (see [RFC 7643 Section 7](https://tools.ietf.org/html/rfc7643#section-7)).

**Q: Why doesn't Okta support DELETE /Users?**

In Okta, user profiles are marked as `deactivated`. This means that Okta never makes a DELETE request against a user resource through your SCIM API. Instead, Okta sends a request to set the `active` value to `false`. You need to support the concept of an "active" and "inactive" user within your app.

For a detailed explanation on deleting user profiles, see [Delete (Deprovision)](/docs/concepts/scim/#delete-deprovision).

**Q: What parts of the SCIM spec aren't included in Okta's SCIM implementation?**

Okta continually strives to improve our support for components of the SCIM protocol specification. Currently, Okta doesn't use the following parts of the SCIM specification:

* Search queries using POST
* Bulk operations
* `/Me` endpoint
* `/Schemas` endpoint
* `/ServiceProviderConfig` endpoint
* `/ResourceTypes` endpoint
* Query filtering using `meta.lastModified`

**Q: How does data validation work with SCIM provisioning? For example, if my app requires the phone number in a specific format, how do I ensure that Okta passes the attribute in that format? If a data validation error issue occurs, how does error reporting work?**

The SCIM specification identifies valid data formats for a given user profile attribute. However, to preserve flexibility, Okta doesn't rigorously validate that the customer has submitted values that meet those requirements.

Therefore, your app should handle data validation. When Okta provisions a user profile to your server, your app should check that the data is valid according to any special requirements. Error messages sent in response from your app are surfaced to the Okta administrator through alerts and tasks in the Okta interface.

You should also specify your data requirements in the configuration document that you provide for using your integration.

**Q: How much support is required for filtering results?**

The filtering capabilities in the SCIM protocol are broad, but the common filtering use case with Okta is narrow. Okta determines if a newly created user or group exists in your app based on a matching identifier. This means the `eq` (equals) operator is all you need to support.

**Q: How do I import users?**

You can initiate user imports through Okta, either manually or on a schedule.

To run an import for your SCIM users, do the following in the Admin Console:

1. Select your SCIM integration from the list of integrations in your Okta org.
1. Under the **Import** tab, click **To Okta** and **Import Now** to do a one-time import.
1. Okta prompts you to review and confirm assignments for any users that aren't automatically matched to existing Okta users.

To set up a regular schedule for importing users, do the following in the Admin Console:

1. Select your SCIM integration from the list of integrations in your Okta org.
1. Under the **Provisioning** tab, click **To Okta** and **Edit** in the General section.
1. In the **Full Import Schedule** drop down, you can choose from hourly, daily, or weekly imports.

See [Import users](https://help.okta.com/okta_help.htm?id=ext_Importing_People).

**Q: How do I get my SCIM integration to use `PUT` requests instead of `PATCH` when updating users and groups?**

SCIM integrations that are created using the templates from the OIN catalog have `PATCH` enabled by default. However, if your SCIM server doesn't support `PATCH`, you can contact your Okta account team and request that they change your integration to use `PUT` for updates, or ask on our [forum](https://devforum.okta.com/).

SCIM integrations that are created using the Application Integration Wizard use `PUT` by default. They can't be reconfigured to use `PATCH` for updates.

**Q: How do I integrate a SCIM application residing inside my corporate firewall with Okta?**

Use the Okta agent-based provisioning solution. See [Provision on-premises applications](https://help.okta.com/okta_help.htm?id=ext_OPP_configure).

The [Build a SCIM provisioning integration](/docs/guides/scim-provisioning-integration-overview) instructions target cloud-based apps.

**Q: What is the timeout if Okta doesn't receive a response from my SCIM server?**

The timeout is 60 seconds if Okta doesn't receive anything from the socket after any SCIM request is made.

**Q: Are there reserved attributes that I can't use?**

Okta follows the SCIM specifications as defined by [RFC 7642](https://datatracker.ietf.org/doc/html/rfc7642), [RFC 7643](https://datatracker.ietf.org/doc/html/rfc7643), and [RFC 7644](https://datatracker.ietf.org/doc/html/rfc7644), with exceptions listed in the reference guides. All system or reserved attributes follow these RFC documents. For example, `groups` is a reserved and used property on the `User` object defined as part of RFC 7643. Therefore, don't create a custom attribute called `groups` in your SCIM server.
