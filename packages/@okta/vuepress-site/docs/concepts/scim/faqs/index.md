---
title: SCIM - Frequently Asked Questions
layout: docs_page
icon: /assets/img/icons/scim.svg
meta:
  - name: description
    content: Answers to your questions about how SCIM works with Okta.
---

## SCIM Technical Questions

**Q: Our API is similar to SCIM, but isn't 100% compliant. Can we still integrate with Okta?**

Guidance on what endpoints need to be implemented can be found in our [SCIM Reference](/docs/reference/scim/) documentation for either SCIM [V2.0](/docs/reference/scim/scim-20/) or [V1.1](/docs/reference/scim/scim-11/) deployments.

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

**Q: I only have one email/phone number/address in my user profile. Do I need to use an array for it?**

Yes, you must return these fields in an array structure. This is a multi-valued attribute as outlined in [section 5](https://tools.ietf.org/html/rfc7159#section-5) of the SCIM specification.

**Q: What determines the primary value for email, phone numbers, or addresses?**

The returned array must have a `primary=true` attribute for the value that Okta takes as the primary value for the user profile.

**Q: When would I need to implement the `type` sub-attribute for emails, phone numbers, or addresses?**

By default, Okta doesn't use the `type` sub-attribute, other than to read the type attribute of your primary value attribute. However, if your SCIM integration does need to distinguish between various canonical entries for an attribute (for example, differentiating between a home and work email address), then you can use the `type` sub-attribute in the returned array.

If your integration doesn't need to distinguish between canonical entries, you can just delete the `emailType` (or `addressType` or `primaryPhoneType`) attribute and mapping from your profile schema.

* See [Section 2.4 of RFC 7643](https://tools.ietf.org/html/rfc7643#section-2.4) for more details on returning multi-valued attributes.
* You shouldn't return the same value and type combination more than once per attribute, as this complicates processing by the client.
* In the schema definition, you can define a list of recommended canonical values for an attribute (see [RFC 7643 Section 7](https://tools.ietf.org/html/rfc7643#section-7)).

**Q: Why doesn't Okta support DELETE /Users?**

Okta users aren't deleted for compliance and audit purposes; Okta user profiles are marked as "deactivated". Because of this, Okta never makes a DELETE request to a user resource on your SCIM API. Instead, Okta sends a request to set the `active` value to `false`. You'll need to support the concept of an "active" and "inactive" user within your app.

**Q: How does data validation work with SCIM provisioning? For example, if my app requires the phone number in a specific format, how do I ensure that Okta passes the attribute in that format? If a data validation error issue occurs, how does error reporting work?**

The SCIM spec specifies valid data formats for a given user profile attribute, however Okta doesn't rigorously validate that the customer has submitted values meeting those requirements to preserve flexibility.

Therefore, data validation should be handled by your app's SCIM server. When Okta provisions a user profile to your server, your app should check that the data is valid according to any special requirements. Error messages sent in response from your app are surfaced to the Okta administrator through alerts and tasks in the Okta interface.

You should also specify your data requirements in the configuration document you provide for using your app.

**Q: How much support is required for filtering results?**

The filtering capabilities in the SCIM protocol are pretty broad, but the common filtering use case with Okta is quite narrow. Okta determines if a newly created user already exists in your app based on a matching identifier. This means the `eq` (equals) operator is all you really need to support.

**Q: How do I import users?**

User import operations are initiated by Okta, either manually or on a schedule. To run an import for your SCIM users, go into the Okta Admin Console:

1. Select your SCIM application from your list of applications.
1. Under the **Import** tab, click **To Okta** and **Import Now** to do a one-time import.
1. Okta prompts you to review and confirm assignments for any users that aren't automatically matched to existing Okta users.

To set up a regular schedule for importing users, go into the Okta Admin Console:

1. Select your SCIM application from your list of applications.
1. Under the **Provisioning** tab, click **To Okta** and **Edit** in the General section.
1. In the **Full Import Schedule** drop down, you can choose from hourly, daily, or weekly imports.

For more details on the import functionality of Okta, see [Import users from an app](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Importing_People) in our Product Help documentation.

**Q: How do I get my SCIM app to use `PUT` requests instead of `PATCH` when updating users and groups?**

SCIM integrations that are created using the template apps from the OIN catalog have `PATCH` enabled by default. However, if your SCIM server doesn't support `PATCH`, you can send an email to <developers@okta.com> and request to change your integration to use `PUT` for updates.

SCIM integrations that are created using the Application Integration Wizard use `PUT` by default. They can't be reconfigured to use `PATCH` for updates.

**Q: How do I get a SCIM app to integrate with Okta from inside my corporate firewall?**

The Okta [SCIM provisioning guide](/docs/guides/build-provisioning-integration/) instructions target cloud-based applications, but Okta does have a solution for on-premise applications. For more details  about the Okta agent-based provisioning solution, see [Configuring On Premises Provisioning](https://support.okta.com/help/s/article/29448976-Configuring-On-Premises-Provisioning).
