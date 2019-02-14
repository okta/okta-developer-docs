---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2017.28
---

## 2017.29

### Platform Features

The following platform features are Generally Available (GA) in preview orgs (as of Release 2017.28), and expected to roll out as GA to production orgs during the week of August 7, 2017:

* [OpenID Connect](#openid-connect)
* [Key Rollover](#key-rollover)

#### OpenID Connect

[OpenID Connect](/docs/api/resources/oidc) is a simple identity layer on top of the OAuth 2.0 protocol, which allows computing clients to verify the identity of an end user based on the authentication performed by an authorization server, as well as to obtain basic profile information about the end user in an interoperable and REST-like manner. In technical terms, OpenID Connect specifies a RESTful HTTP API, using JSON as a data format.

 OpenID Connect allows a range of clients, including Web-based, mobile, and JavaScript clients, to request and receive information about authenticated sessions and end users. The specification suite is extensible, supporting optional features such as encryption of identity data, discovery of OpenID Providers, and session management.

 Okta is [certified for OpenID Connect](http://openid.net/certification/). For more information, see [OpenID Connect and Okta](/docs/api/resources/oidc).<!-- OKTA-132049  -->

#### Key Rollover

We provide the ability to generate a certificate with specified validity period (see the [Apps API](/docs/api/resources/apps) and [Identity Providers API](/docs/api/resources/idps)). We build OpenID Connect and API Access Management on this feature.<!-- OKTA-132045  -->

### Platform Bugs Fixed

These platform bug fixes are available in preview orgs and expected in production orgs the week of July 24, 2017.

* When answering a security question to recover a forgotten password, users who gave too many incorrect responses didn't receive the "locked out" message. (OKTA-126117)

* Custom SMS templates allowed messages greater than 160 characters after substituting the org name and code. The new behavior is to use a default template instead of the custom template when that happens. To ensure use of your custom template, update it to stay within the 160-character limit. (OKTA-128721)

* [`/oauth2/v1/clients`](/docs/api/resources/oauth-clients#register-new-client) error responses didn't conform to the format in the [OAuth 2.0 Dynamic Client Registration spec](https://tools.ietf.org/html/rfc7591#section-3.2.2). (OKTA-130375)

* [`/oauth2/v1/clients`](/docs/api/resources/oauth-clients#register-new-client) didn't allow default values for optional parameters. (OKTA-130910)

* Neither [`/oauth2/v1/clients`](/docs/api/resources/oauth-clients#register-new-client) nor [`/api/v1/apps`](/docs/api/resources/apps#add-application) required client secrets to be unique. (OKTA-131259)

* [`/oauth2/v1/clients`](/docs/api/resources/oauth-clients#register-new-client) returned an incorrect resource URI in the response header.  (OKTA-131891)
