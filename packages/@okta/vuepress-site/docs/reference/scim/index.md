---
title: SCIM Protocol
icon: /assets/img/icons/scim.svg
meta:
  - name: description
    content: Your SCIM API must support specific SCIM API endpoints to work with Okta. Those endpoints and their explanations are detailed here.
---

## SCIM Protocol

The System for Cross-domain Identity Management (SCIM) specification is a provisioning protocol to create, retrieve, update, and deactivate users and groups between Okta and downstream applications and directories.

For more background on the SCIM protocol, how it works, and particular use cases, see our topic on [Understanding SCIM](/docs/concepts/scim/).

For a developer’s guide to implementing the SCIM REST API with Okta and your application, the following links each contain all the information relevant to your specific SCIM:

* [Okta and SCIM version 2.0](scim-20/)
* [Okta and SCIM version 1.1](scim-11/)

Okta currently supports both version 2.0 and version 1.1 of the SCIM protocol specifications. If you haven't yet implemented SCIM, Okta recommends that you implement SCIM 2.0.

In order to have a SCIM application work with Okta, the application must reside on a SCIM server consisting of RESTful endpoints that are constructed according to [V2.0](https://tools.ietf.org/html/rfc7644) or [V1.1](http://www.simplecloud.info/specs/draft-scim-api-01.html) SCIM protocol specifications. The URL of your SCIM server is plugged into the SCIM application in Okta. Okta then communicates with the endpoints through a series of HTTP requests and responses using POST, GET, PUT, and PATCH operations.

### Differences between version 2.0 and 1.1

* Different namespaces means that Version 2.0 URIs are not backwards compatible with 1.1:
  * V2.0:
    * `urn:ietf:params:scim:schemas:core:2.0:User`
    * `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User`
  * V1.1:
    * `urn:scim:schemas:core:1.0`
    * `urn:scim:schemas:extension:enterprise:1.0`
* The Service Provider configuration endpoint has no `s` at the end of the SCIM 2.0 endpoint:
  * V2.0:
    * `/ServiceProviderConfig`
  * V1.1:
    * `/ServiceProviderConfigs`
* V2.0 also :
  * Supports using a JSON Patch operation [Section 3.5.2](https://tools.ietf.org/html/rfc7644#section-3.5.2)
  * Requires that the response must include the [errors in a JSON body](https://tools.ietf.org/html/rfc7644#section-3.12), using the error response schema `urn:ietf:params:scim:api:messages:2.0:Error`
