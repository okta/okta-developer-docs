---
title: SCIM integration concepts and requirements
meta:
  - name: description
    content: Answers to your questions about how SCIM works with Okta.
---

# SCIM integration concepts and requirements

The System for Cross-domain Identity Management (SCIM) is an industry-standard, REST-based protocol that automates the exchange of user identity information between Okta and your app. Okta acts as the SCIM client, sending requests to your SCIM server to manage the user and group lifecycle. See [Understanding SCIM](/docs/concepts/scim/).

## SCIM integration concepts

Okta supports lifecycle provisioning for both [SCIM 2.0](https://developer.okta.com/docs/api/openapi/okta-scim/guides/scim-20/) and [SCIM 1.1](https://developer.okta.com/docs/api/openapi/okta-scim/guides/scim-11/). See [SCIM reference](https://developer.okta.com/docs/api/openapi/okta-scim/guides) to find guidance on what endpoints you need to implement for different versions of SCIM.

### User lifecycle management

SCIM integrations automate the CRUD (Create, Read, Update, Delete) operations for identity resources.

* **Create:** Okta creates users in your downstream app based on Okta user profile values and group assignments.
* **Read:** Okta queries your app to match existing resources against Okta resources. If a resource doesn't exist, you can import it into the Okta org.
* **Update:** Okta pushes changes to your app when data is modified in Okta. If your app is the source of truth, Okta pulls updates into the Okta user profile.
* **Deactivate:** Okta uses a soft delete model. Instead of sending a DELETE request, Okta updates the user resource with active=false. This revokes access while preserving data for future re-activation.

#### User import mechanics

You can synchronize user data from your SCIM app to Okta using the following import methods:

* **Manual imports:** Initiate a one-time, immediate import through the **Import** tab of your SCIM integration to pull user records into the Okta org.
* **Scheduled imports:** Configure a regular synchronization schedule (hourly, daily, or weekly) within the **Provisioning** settings to ensure data consistency between systems.

When you initiate an import, Okta attempts to match the incoming SCIM resources to existing Okta users. If a match isn't automatically found, Okta prompts an admin to manually review and confirm the user assignments.

### Data sourcing and mapping

Okta provides two primary data flow directions based on which system acts as the source of truth:

* **Okta-sourced:** Changes in Okta are pushed to the SCIM app.
* **App-sourced (Profile sourcing):** Changes in the SCIM app are pulled into Okta through imports.

### Attribute handling and reserved names

Okta follows the RFC 7643 specification for system and reserved attributes. You must adhere to the following formatting requirements for SCIM attributes:

* Use an array structure for multi-valued attributes such as emails, phone numbers, and addresses.
* Implement the `type` sub-attribute if you need to distinguish between canonical entries, such as work versus home emails.
* Avoid using reserved names like `groups` for custom attributes because these are defined as part of the core user object. Creating a custom attribute with this name causes conflicts with the core schema of Okta.

## Architecture and mechanics

### User search and matching

While the SCIM protocol allows for broad filtering, Okta uses a narrow filtering scope to ensure efficient resource matching and prevent duplicate accounts.

Before Okta creates a user or group, it determines if the resource exists in your app by sending a `GET` request with an `eq` (equals) filter:

`GET /Users?filter=userName eq "{userName}"`

Your SCIM server must support this specific filtering query parameter to provision users successfully.

### Data validation and error reporting

The SCIM specification defines valid data formats for user profile attributes. To maintain flexibility across different app requirements, Okta doesn't enforce rigid validation on attribute values before they're sent.

Your app must manage data validation by adhering to the following logic:

* Validate that incoming user profile data meets the specific requirements of your app, such as unique phone number formats or character limits.
* Return clear, descriptive error messages in the SCIM response if an attribute fails validation.
* Document any specific data requirements in the configuration guide that you provide for your integration.

When your app returns an error response, Okta surfaces the message to the admin through the **Tasks** and **Alerts** sections of the Admin Console. This allows admins to identify and correct data issues in the Okta org.

### Pagination

Okta processes large datasets in pages. Your SCIM implementation must support the following pagination references:

* `startIndex`
* `count`
* `totalResults`

### PATCH versus PUT

Okta supports both `PATCH` and `PUT` methods for updating users and groups, but the default behavior depends on how you create the integration:

* **PATCH:** Use `PATCH` for partial resource updates in integrations created with OIN catalog templates. If your SCIM server doesn't support `PATCH`, contact your Okta account team or visit the Okta forum to request a change to `PUT`.
* **PUT:** Use `PUT` for full resource replacement in integrations created with the App Integration Wizard (AIW). These integrations use `PUT` by default and you can't reconfigure them to use `PATCH`.

## SCIM implementation requirements

This section outlines the architectural requirements for a standard integration, categorized by connectivity, resource management, and synchronization mechanics.

The following items are required to establish connectivity and ensure secure communication:

* Confirm that the server supports at least one Okta-supported authentication method, such as OAuth 2.0, Basic Auth, or Header Token.
* Provide a consistent base URL for SCIM endpoints, for example, `https://api.example.com/scim/v2`.
* Install and configure the Okta Provisioning Agent if the app is located behind a firewall.
* Ensure that your server responds within 60 seconds of a request to prevent Okta from closing the socket connection.

Implement the following capabilities to ensure successful user resource management:

* Support the `eq` operator for the `GET/Users` endpoint to enable user matching and prevent duplicate accounts.
* Map core SCIM attributes, specifically `userName`, `name.givenName`, `name.familyName`, and `active`.
* Configure the database to handle a boolean `active` attribute for soft-deactivation.
* Implement `startIndex` and `count` parameters to support pagination for large user imports.

Update and synchronization mechanics must adhere to these standards:

* Support the `PATCH` method for partial resource updates or the `PUT` method for full resource replacement.
* Return multi-valued attributes, such as emails and phone numbers, as arrays.
* Implement the `/Groups` endpoint if the app requires group management and memberships.

## Unsupported SCIM features

While Okta continually improves support for the SCIM protocol, the following components of the specification aren't currently used by the Okta provisioning service:

* Search queries that use the `POST` method.
* Bulk operations for multiple resource changes in a single request.
* The `/Me` authenticated subject endpoint.
* The `/ServiceProviderConfig` discovery endpoints.
* Query filtering based on the `meta.lastModified` attribute.

**Note:** The `/Schemas` and `/ResourceTypes` endpoints are only available with SCIM 2.0 with entitlements. See [Build a SCIM 2.0 server with entitlements](https://developer.okta.com/docs/guides/scim-with-entitlements/main/).

## **Next steps**

* **Build:** See the [SCIM 2.0 Protocol Reference](https://developer.okta.com/docs/api/openapi/okta-scim/guides/scim-20/) for endpoint specifications.
* **Test:** Use the Okta SCIM test suite in Runscope to validate your implementation.
* **Publish:** Follow the [OIN submission process](https://developer.okta.com/docs/guides/submit-app-overview/), if you want to share your integration with other Okta customers.
