---
title: Prepare your SCIM service
---

The first step in delivering your SCIM integration is preparing a SCIM-compliant API server to host your SCIM service.

Okta supports lifecycle provisioning using either Version 2.0 and Version 1.1 of the SCIM protocol.

If your service already supports the SCIM protocol, it is important that you review the Okta SCIM reference documentation to understand the specifics of how Okta implements the SCIM protocol:

- [SCIM Reference](/docs/reference/scim/)

If you haven't yet implemented SCIM, Okta recommends that you use Version 2.0 of the SCIM protocol.

## Features

Another important part of the planning process is determining which Okta provisioning features your SCIM API can or should support. At a minimum, Okta requires that your SCIM Version 2.0 API implements the following features.
<!-- no toc -->
- [API endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Base URL](#base-url)
- [Basic user schema](#basic-user-schema)
- [Unique ID](#unique-id)
- [Active resources](#active-resources)

### API endpoints

The API endpoint for your SCIM API must be secured using the [Transport Layer Security](https://tools.ietf.org/html/rfc5246) protocol. Connections through this secure layer are routed by using the `https://` prefix for your URL.

You must support the URL structure described in the ["SCIM Endpoints and HTTP Methods" section of RFC7644](https://tools.ietf.org/html/rfc7644#section-3.2).

### Authentication

Your SCIM API must be secured against anonymous access.

Okta supports authentication against SCIM APIs using any one of the following methods:

- OAuth 2.0 [Authorization Code grant flow](https://tools.ietf.org/html/rfc6749#section-4.1)
- [Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication)
- A custom HTTP header

If you are using OAuth 2.0, then after successfully authorizing Okta to use your SCIM API, your application's authorization server redirects the user back to Okta, with either an authorization code or an access token.

If you are going to publish your integration to the OIN catalog, Okta requires that all SCIM applications support all of the following [redirect URIs](https://tools.ietf.org/html/rfc6749#section-3.1.2):

- `https://system-admin.okta.com/admin/app/cpc/{appName}/oauth/callback`
- `https://system-admin.okta-emea.com/admin/app/cpc/{appName}/oauth/callback`
- `https://system-admin.oktapreview.com/admin/app/cpc/{appName}/oauth/callback`
- `https://system-admin.trexcloud.com/admin/app/cpc/{appName}/oauth/callback`
- `http://system-admin.okta1.com:1802/admin/app/cpc/{appName}/oauth/callback`

where the `{appName}` is a unique identifier provided to you after your integration is submitted and processed by Okta. If, for any reason, your unique `{appName}` identifier isn't provided to you after the initial review, send an email to <developers@okta.com>.

### Base URL

You can choose any Base URL for your API endpoint. Note that a Base URL can't contain the underscore `_` character.

If you are implementing a new SCIM API, we suggest using `/scim/v2/` as your Base URL. For example: `https://example.com/scim/v2/`.

If you have multiple Okta orgs using your service, you can use the same SCIM server for all of them. To do so, one way is to implement a 1:1 client to tenant subdomain for each org running on the SCIM server. For example, if you have three Okta orgs:

- company-a.okta.com
- company-b.okta.com
- company-c.okta.com

You can pass a Base URL containing the name of the org:

- `https://company-a.example.com/scim/v2`
- `https://company-b.example.com/scim/v2`
- `https://company-c.example.com/scim/v2`

On your SCIM server, you can read which subdomain the request is coming from and route the request to the appropriate tenant for the Okta org.

### Basic user schema

Okta requires that your SCIM implementation be able to store the following four user attributes:

- User ID: `userName`
- First Name: `name.givenName`
- Last Name: `name.familyName`
- Email: `emails`

>**Note:** Keep your User ID value distinct from the user's email address. Many systems use an email address as a user identifier, but this isn't recommended, as email addresses often change. Using a distinct User ID to identify user resources prevents future issues.

Note that Okta supports more than those four user attributes. However, these are the base attributes that you must support.  The full schema of user attributes supported by SCIM 2.0 is described in [section 4 of RFC 7643](https://tools.ietf.org/html/rfc7643#section-4).

If your integration supports user attributes beyond those four base attributes, you can add support for additional attributes to your SCIM API. In some cases, you might need to configure Okta to map non-standard user attributes into the user profile for your application. See the [Check the attributes and corresponding mappings](../attribute-mapping/) step in this guide, or the "Add custom attributes to an Okta user profile" section in the [Work with Okta user profiles and attributes](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Directory_Profile_Editor_Tasks) topic in the Okta product documentation.

### Unique ID

In addition to the basic user schema attributes, your SCIM API must also specify a unique identifier for each user resource.

[Section 3.1](https://tools.ietf.org/html/rfc7643#section-3.1) of the SCIM specification asserts that the `id` attribute is used to uniquely identify resources. This unique identifier:

- Is assigned a value by the service provider (your application) for each SCIM resource
- Is always issued by the service provider (your application) and not specified by the client (Okta)
- Must be included in every representation of the resource
- Cannot be empty
- Must be unique across the SCIM service provider's entire set of resources
- Cannot be reassigned
- Must be a stable identifier, meaning that it doesn't change when the same resource is returned in subsequent API requests
- Must be case-sensitive and read-only
- Cannot be hidden from the API request

A best practice is to use a generated globally unique identifier (GUID) for this value.

**Note:** The string `bulkId` is a reserved keyword and must not be used within any unique identifier value.

### Active resources

Okta user management requires that your SCIM API supports an `active` attribute for each user resource that can be set to `true` or `false` to denote a resource as "active" or "inactive".

## Example implementations

There are numerous examples of how to implement SCIM servers and applications. Here are a few to get you started:

- [scimify](https://toolkit.okta.com/apps/scimify/) - A PHP application that supports both SCIM 1.1 and SCIM 2.0 servers with operations for /Users, /Groups and /ServiceProviderConfig endpoints
- [Apache Directory SCIMple](https://github.com/apache/directory-scimple) - Apache's Java EE implementation of the SCIM version 2.0 specification.

## SCIM facade

Sometimes it isn't feasible for your cloud-based application to natively support a SCIM API. An alternative option is to build and host your own SCIM facade middleware that translates between the Okta SCIM API connection and the cloud application's proprietary API. The Okta integration connection is then made to this SCIM facade.

## Provision to on-premises applications

This provisioning guide targets cloud-based applications, but Okta does have a solution for on-premise applications. See [Configuring On Premises Provisioning](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_OPP_configure) for details about the Okta agent-based provisioning solution.

<NextSectionLink/>
