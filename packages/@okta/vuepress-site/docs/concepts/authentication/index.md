---
title: Authentication
meta:
  - name: description
    content: Use Okta to create a custom login experience for your apps. Learn more about OAuth 2.0 and OIDC implementations, the Authentication API, and the Sign-In Widget.
---

# Authentication with Okta

Authentication is a crucial part in developing any application. Whether you are developing an internal IT app for your employees, building a portal for your partners, or exposing a set of APIs for developers building apps around your resources, Okta provides the right authentication support for your projects.

>**Note:** Some browsers have begun blocking third-party cookies by default, disrupting Okta functionality in certain flows. For information see [FAQ: How Blocking Third Party Cookies Can Potentially Impact Your Okta Environment](https://support.okta.com/help/s/article/FAQ-How-Blocking-Third-Party-Cookies-Can-Potentially-Impact-Your-Okta-Environment).

## Building a Custom Authentication Experience for Your Application

The sign-in experience is one of the most important user experiences any app developer needs to consider. To provide a seamless and attractive, yet secure authentication experience is not a trivial task. Typically, the sign-in logic accompanies other features such as password reset and registration. More importantly, enhanced security in the form of strong and adaptive authentication during the sign-in process is often critical to many implementations.

Okta provides many options for developers to handle the authentication experience that are built on top of the underlying feature set in Okta. Password policies, strong and adaptive authentication policies, and password reset workflow can all be configured easily in the administrator UI. Many of these policies can also be controlled through Okta's API.

Okta provides OAuth 2.0 and OpenID Connect implementations, the Sign-In Widget, the Auth JS SDK, and the Authentication API.

### OAuth 2.0, OpenID Connect, and Social Login

Okta allows you to control access to your application using both the OAuth 2.0 and OpenID Connect specifications. You can use Okta as your authorization server to retain all of your user information, and grant users tokens to control their authorization and authentication. Okta also supports using social logins and pulling a user's external data into your Okta org.

To find out more about Okta's OAuth 2.0 and OpenID Connect implementations, see [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid/).

### Sign-In Widget

The [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) provides an embeddable Javascript sign-in implementation that can be easily embedded into your customized sign-in page. The Sign-In Widget carries the same feature set in the standard Okta sign-in page of every tenant, along with the added flexibility to change the look and feel. Included in the widget is support for password reset, forgotten password, and strong authentication functionality - all of which are driven by policies configured in Okta. Developers don't have to write a single line of code to trigger these functions from within the widget. For consumer facing sites, social providers are also supported in the widget.

### Auth SDK

For developers building a Javascript front end or Single Page App (SPA), the light-weight, JavaScript-based [Okta Auth SDK](/code/javascript/okta_auth_sdk/) gives you additional control beyond our Sign-In Widget. This Javascript SDK provides all the standard sign-in support, including password management and strong authentication. Additionally, social providers and OpenID Connect are supported through the SDK, where the appropriate ID tokens are returned for downstream authentication and authorization needs.

### Authentication API

The underlying foundation for the Sign-In Widget and Auth SDK is a comprehensive [authentication REST API](/docs/reference/api/authn/) exposed through Okta. Use it as a standalone API to provide the identity layer on top of your existing application and authentication logic, or use it with the Okta [Sessions API](/docs/reference/api/sessions/) to obtain an Okta [session cookie](/docs/guides/session-cookie/) and access apps within Okta. This session integration provides an SSO experience across custom and Okta-managed apps.

## Building Apps That Support Single Sign-On

For IT developers or ISVs who want to use Okta as an identity provider, Okta provides several options for secure SSO. SAML has been widely used as the single sign-on protocol by many ISVs and is supported by many identity management solutions. Okta provides comprehensive guidance for developers to implement a proper [SAML service provider](/docs/concepts/saml/). For IT developers building internal apps that would like to support SSO, SAML is also a good option.

OpenID Connect is the emerging technology that provides an alternative implementation of SSO. Okta is a [Certified OpenID Connect provider](http://openid.net/certification/). Building on top of the OAuth 2.0 framework, OpenID Connect is a modern implementation to support authentication and SSO. If you are an Okta customer, our [OpenID Connect API](/docs/reference/api/oidc/) is a great way to support SSO and is a simpler alternative to SAML.

For ISVs who want to provide SSO for their customers, both SAML and OpenID Connect are worth considering. Both protocols cover a wide variety of identity providers that you may encounter.
