---
title: Step-up authentication using ACR values
excerpt: Learn how to use the `acr_values` parameter in authorization requests to require different authentication levels of assurance.
layout: Guides
---

This guide explains how to include the `acr_values` parameter in your authorization requests to increase the level of end-user assurance.

---

**Learning outcomes**

* Know the purpose of the `acr_values` parameter.
* Learn about the different types of `acr_values` that are supported out of the box.
* Use an `acr_values` parameter in your authorization request.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* Existing OpenID Connect (OIDC) or SAML app integration that you want to configure `acr_values` for. See <StackSnippet snippet="createapp" inline />

---

## Overview

Users want seamless access to certain resources, but organizations want to increase the user’s level of assurance before they access anything sensitive. It’s difficult to strike a balance between implementing stronger security controls and offering a frictionless experience for your users to easily interact with the application. Using the `acr_values` parameter provides easy access to one layer of resources and secure access to another layer of resources.

The `acr_values` parameter refers to authentication context class reference. Each value defines a specific set of assurance level requirements that the protected resource requires from the authentication event associated with the <StackSnippet snippet="assertion" inline />.

<StackSnippet snippet="overview" /><br>

Okta's [redirect and embedded](/docs/concepts/redirect-vs-embedded/) deployment models support the use of the `acr_values` parameter. <StackSnippet snippet="parameter" inline />.

### Evaluation flow

In Okta Identity Engine, assurances from policies are always evaluated in order of factor verification, constraints, and re-authentication. The [global session policy](/docs/concepts/policies/#sign-on-policies) is evaluated first, then the authentication policy, and then the `acr_values` parameter in the request. The authentication policy is always evaluated before the `acr_values` parameter.

<StackSnippet snippet="evalflowclassic" /><br>

### Factor enrollment

If the user hasn't enrolled a factor, during step-up authentication the user is prompted to enroll a factor as long as an [authenticator enrollment policy](/docs/reference/api/policy/#authenticator-enrollment-policy) is configured (or the [Multifactor Enrollment Policy](/docs/reference/api/policy/#multifactor-mfa-enrollment-policy) in Classic Engine).

## Predefined parameter values

The following predefined optional parameters are available for use in your authorization requests:

> **Note:** Any unsupported `acr_values` sent in the authorize request are ignored.

| Parameter value<br> for `acr_values` | Description           | Parameter Type   | DataType   |
| :----------------------- | :----------------------------------------- | :--------------- | :--------- |
| `urn:okta:loa:1fa:any`   | Any one factor. Allows one factor authentication with no requirements on which factor. | Query | String |
| `urn:okta:loa:1fa:pwd`   | Password only. Allows one factor authentication that requires the user’s password. | Query | String |
| `urn:okta:loa:2fa:any`   | Any two factors. Allows two factor authentication with no requirements on which factors. | Query | String |
| `urn:okta:loa:2fa:any:ifpossible`<br><br><ApiLifecycle access="ie" /> | Any two factors if possible. Allows two factor authentication with no requirements on which factors. Any two factors are presented only if the user is enrolled, otherwise any one factor is presented. | Query | String |
| `phr`<br><br><ApiLifecycle access="ie" /> | Phishing-Resistant. Requires users to provide possession factors that cryptographically verify the sign-in server (the origin). Currently, only FIDO2/WebAuthn satisfies this requirement. Because phishing resistance implies [device binding](https://help.okta.com/okta_help.htm?type=oie&id=ext-configure-authenticators), that constraint is selected automatically when `phr` is specified. | Query | String |
| `phrh`<br><br> <ApiLifecycle access="ie" /> | Phishing-Resistant Hardware-Protected. Requires that you store keys being used to authenticate in secure hardware (TPM, Secure Enclave) on the device. Currently, only Okta Verify meets this constraint. Because hardware protection implies [device binding](https://help.okta.com/okta_help.htm?type=oie&id=ext-configure-authenticators), that constraint is selected automatically when `phrh` is specified. | Query | String |

## Authentication flow using ACR values

<StackSnippet snippet="diagram" /><br>

## Add the parameter value to the auth request

The following is an example authorization request using the `urn:okta:loa:1fa:any` predefined `acr_values` parameter value.

<StackSnippet snippet="addparamtorequest" /><br>

**Response**

<StackSnippet snippet="authresponse" />

## Next steps

* Read more about Okta's access tokens in the [OIDC & OAuth 2.0 API Reference](/docs/reference/api/oidc/#id-token).

* Read more about policies on the [Policies](/docs/concepts/policies/) concept page.

* Read more about OpenID Connect and OAuth 2.0 in the [OAuth 2.0 and OpenID Connect overview](/docs/concepts/oauth-openid/).

* Read more about SAML 2.0 application integrations in the [Build a Single Sign-On (SSO) integration](/docs/guides/build-sso-integration/saml2/main/)
