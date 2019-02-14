---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2017.27
---

## 2017.28

### Platform Enhancements and New Features

The following changes are available in preview orgs on Wednesday, July 12. Availability in production orgs is expected either one week or one month later. For information about Early Availability (EA) and Generally Available (GA), see [Okta Release Lifecycle](https://developer.okta.com/docs/api/getting_started/releases-at-okta).

The following features are GA in preview orgs, and expected to be GA in production orgs during the week of August 7, 2017:

* [OpenID Connect](#openid-connect)
* [Key Rollover](#key-rollover)

The following feature enhancements are GA in preview orgs, and expected to be GA in production orgs during the week of July 17, 2017:

* [Limit Age of Events](#limit-age-of-events)
* [Improved Plugin Security](#improved-plugin-security)

The following EA feature enhancements are in preview orgs and expected in production orgs during the week of July 17, 2017.
To enable an EA feature, contact [Support](https://support.okta.com/help/open_case).

* [Allow Unsuspending Users During Inbound SAML Login](#allow-unsuspending-users-during-inbound-saml-login)
* [Email Factor](#email-factor)

The following feature enhancement is available on GitHub:

* [New Version of Sign-In Widget](#new-version-of-sign-in-widget)

#### OpenID Connect

[OpenID Connect](https://developer.okta.com/docs/api/resources/oidc) is a simple identity layer on top of the OAuth 2.0 protocol, which allows computing clients to verify the identity of an end user based on the authentication performed by an authorization server, as well as to obtain basic profile information about the end user in an interoperable and REST-like manner. In technical terms, OpenID Connect specifies a RESTful HTTP API, using JSON as a data format.

 OpenID Connect allows a range of clients, including Web-based, mobile, and JavaScript clients, to request and receive information about authenticated sessions and end users. The specification suite is extensible, supporting optional features such as encryption of identity data, discovery of OpenID Providers, and session management.

 Okta is [certified for OpenID Connect](http://openid.net/certification/). For more information, see [OpenID Connect and Okta](/docs/api/resources/oidc).<!-- OKTA-132049  -->


#### Key Rollover

We provide the ability to generate a certificate with specified validity period (see the [Apps API](https://developer.okta.com/docs/api/resources/apps) and [Identity Providers API](https://developer.okta.com/docs/api/resources/idps)). We build OpenID Connect and API Access Management on this feature.<!-- OKTA-132045  -->

#### Limit Age of Events

In keeping with the [Okta Data Retention Policy](https://support.okta.com/help/Documentation/Knowledge_Article/Okta-Data-Retention-Policy), the events API (`/api/v1/events`) no longer accepts queries for events greater than 180 days old.<!-- OKTA-125424, 120605  -->

#### Improved Plugin Security
Template Plugin Apps you create from the administrator UI (**Admin > Applications > Add Application > Template Plugin App**) have improved security.<!-- OKTA-132490  -->

#### New Version of Sign-In Widget

Version 1.13.0 of the [Okta Sign-In Widget](https://github.com/okta/okta-signin-widget/releases) is available. Check out the new features and bug fixes!<!-- (OKTA-131661) -->

#### Allow Unsuspending Users During Inbound SAML Login

You can configure the JIT settings for a SAML identity provider (IdP) to enable unsuspending users during inbound SAML login. See the [Identity Providers API](https://developer.okta.com/docs/api/resources/idps) for more information.<!-- OKTA-128384 -->

![JIT settings for SAML IdP](/assets/img/release_notes/JIT_settings.png "JIT settings for SAML IdP")

#### Email Factor

 You can send a one-time password (OTP) and an activation link to an email address as part of enrolling a user.<!-- OKTA-132297  -->

### Platform Bugs Fixed

These platform bug fixes are available in preview orgs and expected in production orgs the week of July 17, 2017.

* `/api/v1/apps/${applicationId}/groups` didn't return groups if the specified app is inactive. (OKTA-123695)
* Identity provider JIT reactivation of users sometimes failed when there were configured group assignments. (OKTA-131784)
* In some circumstances, the link between the external Microsoft user and the Okta user was inaccurate.  (OKTA-132207)
