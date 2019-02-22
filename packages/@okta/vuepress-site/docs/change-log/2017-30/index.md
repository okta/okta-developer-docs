---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2017.29
---

## 2017.30

### Platform Features

These platform features are GA in preview orgs (as of Release 2017.28), and expected to roll out as GA to production orgs during the week of August 7, 2017:

* [OpenID Connect](#openid-connect)
* [Key Rollover](#key-rollover)

This platform feature enhancement is EA in preview orgs with this release and expected in production orgs the week of July 31, 2017. To enable an EA feature, contact [Support](https://support.okta.com/help/open_case).

* [Email for Two-Factor Authentication](#email-for-two-factor-authentication)

For information about Early Access (EA) and General Availability (GA), see [Okta Release Lifecycle](/docs/api/getting_started/releases-at-okta).

#### OpenID Connect

[OpenID Connect](/docs/api/resources/oidc) is a simple identity layer on top of the OAuth 2.0 protocol, which allows computing clients to verify the identity of an end user based on the authentication performed by an authorization server, as well as to obtain basic profile information about the end user in an interoperable and REST-like manner. In technical terms, OpenID Connect specifies a RESTful HTTP API, using JSON as a data format.

 OpenID Connect allows a range of clients, including Web-based, mobile, and JavaScript clients, to request and receive information about authenticated sessions and end users. The specification suite is extensible, supporting optional features such as encryption of identity data, discovery of OpenID Providers, and session management.

 Okta is [certified for OpenID Connect](http://openid.net/certification/). For more information, see [OpenID Connect and Okta](/docs/api/resources/oidc).<!-- OKTA-132049  -->



#### Key Rollover

We provide the ability to generate a certificate with specified validity period (see the [Apps API](/docs/api/resources/apps) and [Identity Providers API](/docs/api/resources/idps)). We build OpenID Connect and API Access Management on this feature. <!-- OKTA-132045  -->

#### Email for Two-Factor Authentication  <!-- OKTA-134593  -->

You can enroll a user with an email factor. See [Enroll Okta Email Factor](/docs/api/resources/factors#enroll-okta-email-factor) for details.

### Platform Bugs Fixed

These platform bug fixes are in preview orgs with this release and expected in production orgs the week of July 31, 2017.

* Under some circumstances users who did not have a secondary email address could not perform a self-service password reset operation.   (OKTA-128340)

* "When the `expand` parameter was set in GET requests to [`/api/v1/groups`](/docs/api/resources/groups#list-groups), the second and subsequent pages of the response did not have the same `expand` setting.  (OKTA-132503)

* [`/oauth2/v1/clients`](/docs/api/resources/oauth-clients#register-new-client) returned HTTP status code 200 rather than 201 when creating a client successfully.  (OKTA-128839)

* [`/api/v1/authorizationServers`](/docs/api/resources/authorization-servers#create-authorization-server) returned HTTP status code 200 rather than 201 when creating an Authorization Server successfully.  (OKTA-128839)

* [`/oauth2/v1/clients/{clientId}`](/docs/api/resources/oauth-clients#get-oauth-client) returned HTTP status code 404 rather than 401 when it did not find the specified client.  (OKTA-130804, OKTA-130848)
