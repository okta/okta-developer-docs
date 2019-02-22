---
title: Authentication
excerpt: >-
  Overview of the ways Okta can be used to authenticate users depending on your
  needs.
---

# Authentication with Okta

Authentication is a crucial part of any application development.  Whether you are developing an internal IT app for your employees – or building a portal for your partners – or exposing a set of APIs for developers building apps around your resources, Okta provides the right support for your projects.

## Building a Custom Login Experience for Your Application

The login experience is perhaps the single most important user experience any app developer needs to consider. To provide a seamless, attractive, yet secure authentication experience is not a trivial task. And typically, the login logic goes hand in hand with other features such as password reset and registration. More importantly, enhanced security in the form of strong and adaptive authentication during login is often critical to many implementations.

Okta provides many options for developers around the authentication experience. The foundation is built on top of the underlying feature set in Okta. Password policies, strong and adaptive authentication policies, password reset workflow, and more can all be configured easily in the administrator UI. Many of these policies can also be controlled through Okta's API.

Okta provides the OAuth 2.0 and OpenID Connect implementations, the Authentication API, the Sign-in Widget, and the Auth JS SDK:

* [OAuth 2.0, OpenID Connect, and Social Login](#oauth-20-openid-connect-and-social-login)
* [Sign-In Widget](#sign-in-widget)
* [Auth SDK](#auth-sdk)
* [Authentication API](#authentication-api)

### OAuth 2.0, OpenID Connect, and Social Login

Okta allows you to control access to your application using both the OAuth 2.0 and OpenID Connect specifications. You can use Okta as your authorization server to retain all of your user information, and grant users tokens to control their authorization and authentication. Okta also supports using social login and pulling user's external data into your Okta org.

To find out more about Okta's OAuth 2.0 and OpenID Connect implementations, as well as social login, see the [Authentication Guide](/authentication-guide/).

### Sign-In Widget

The [Okta Sign-in Widget](/code/javascript/okta_sign-in_widget)
provides an embeddable Javascript sign-in implementation that can
easily be embedded into your customized login page.  The Sign-in
widget carries the same feature set in the standard Okta sign-in page
of every tenant – with the added flexibility to change the
look-and-feel.  Included in the widget is support for password reset,
forgotten password and strong authentication – all of which are  driven
by policies configured in Okta.  Developers don't have to write a
single line of code to trigger these functions from within the widget.
For consumer facing sites, social providers are also supported in the
widget.

### Auth SDK

For those who are building a Javascript front end or Single Page App
(SPA), the light-weight, JavaScript-based [Okta Auth SDK](/code/javascript/okta_auth_sdk)
gives you the added control beyond our sign-in widget to cater to your
needs.  This Javascript SDK provides all the standard login support
including password management and strong authentication.  In addition,
social providers and OpenID Connect are also supported through the SDK where
the appropriate ID tokens are returned for downstream authentication
and authorization needs.

### Authentication API

The underlying foundation for the Sign-In Widget and Auth SDK is a
comprehensive [authentication REST API](/docs/api/resources/authn)
exposed through Okta.  Use it as a
standalone API to provide the identity layer on top of your existing
application and authentication logic, or use it with the Okta [Sessions API](/docs/api/resources/sessions)
to obtain an Okta [session cookie](/use_cases/authentication/session_cookie) and access apps within Okta.
This session integration provides an SSO experience across custom and Okta-managed apps.

## Building Apps That Support SSO

For IT or ISVs who want to use Okta as an identity provider, Okta
provides several options for secure SSO.  SAML has been
widely used as the single sign-on protocol by many ISVs and is
supported by many identity management solutions.  Okta provides
comprehensive guidance for developers to implement a proper
[SAML service provider](/docs/guides/saml_guidance).
For IT building internal apps and would like to support SSO, SAML is
also a good option.

OpenID Connect is the emerging technology that provides an alternative implementation of SSO.
Okta is a [Certified OpenID Connect provider](http://openid.net/certification/).
Building on top of OAuth 2.0 framework, OpenID Connect is a modern
implementation to support authentication and SSO.  If you
are an Okta customer, our [OpenID Connect API](/docs/api/resources/oidc) is a great way to support SSO and
is a simpler alternative to SAML.

For ISVs who want to provide SSO for their customers, both
SAML and OpenID Connect are worth considering. Both protocols cover a
wide variety of identity providers that you may encounter.
