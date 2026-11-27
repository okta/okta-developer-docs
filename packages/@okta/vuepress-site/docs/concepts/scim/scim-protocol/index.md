---
title: SCIM Protocol
meta:
  - name: description
    content: Your SCIM API must support specific SCIM API endpoints to work with Okta. Those endpoints and their explanations are detailed here.
---

# SCIM Protocol

The System for Cross-domain Identity Management (SCIM) specification is a provisioning protocol to create, retrieve, update, and deactivate users and groups between Okta and downstream apps and directories.

For more background on the SCIM protocol, how it works, and particular use cases, see our topic on [Understanding SCIM](/docs/concepts/scim/).

For references on implementing the SCIM REST API with Okta and your app, see the following links that contain all the information relevant to your specific SCIM version:

* [Okta and SCIM Version 2.0](/docs/concepts/scim/scim-20/)
* [Okta and SCIM Version 1.1](/docs/concepts/scim/scim-11/)
* [Okta Inbound SCIM 2.0 API](https://developer.okta.com/docs/api/openapi/okta-scim/inbound/overview)
-->

> **Note:** Okta currently supports both Version 2.0 and Version 1.1 of the SCIM protocol specifications. If you haven't yet implemented SCIM, Okta recommends that you implement SCIM 2.0.

To work with Okta, your SCIM app must use RESTful endpoints constructed according to either the [V2.0](https://tools.ietf.org/html/rfc7644) or [V1.1](https://scim.cloud/specs/draft-scim-api-01.html) SCIM protocol specification. The URL of your SCIM server is plugged into the SCIM integration in your Okta org. Okta then communicates with the endpoints through a series of HTTP requests and responses using POST, GET, PUT, and PATCH operations.

### Differences between versions 2.0 and 1.1

* Different namespaces mean that Version 2.0 URIs aren't backward compatible with 1.1:
  * V2.0:
    * `urn:ietf:params:scim:schemas:core:2.0:User`
    * `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User`
  * V1.1:
    * `urn:scim:schemas:core:1.0`
    * `urn:scim:schemas:extension:enterprise:1.0`
* The service provider configuration endpoint has no `s` at the end of the SCIM 2.0 endpoint:
  * V2.0:
    * `/ServiceProviderConfig`
  * V1.1:
    * `/ServiceProviderConfigs`
* V2.0 also has the the following differences:
  * Supports using JSON PATCH operations [Section 3.5.2](https://tools.ietf.org/html/rfc7644#section-3.5.2)
  * Requires that the response includes the [errors in a JSON body](https://tools.ietf.org/html/rfc7644#section-3.12), using the error response schema `urn:ietf:params:scim:api:messages:2.0:Error`
