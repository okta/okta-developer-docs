---
title: Step-up authentication using ACR values
excerpt: Learn how to use the `acr_values` parameter in authorization requests to require different authentication levels of assurance.
layout: Guides
---

This guide explains how to include the `acr_values` parameter in your authorization requests to increase the level of end user assurance.

---

#### Learning outcomes

* Know the purpose of the `acr_values` parameter.
* Learn about the different types of `acr_values` that are supported out of the box.
* Use an `acr_values` parameter in your authorization request.

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* An app that you want to configure `acr_values` for. You can [create an app integration using AIW](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard) or use an existing one.

---

## Overview

Users want seamless access to certain resources, but organizations want to increase the user’s level of assurance before they access anything sensitive. It’s difficult to strike a balance between implementing stronger security controls and offering a frictionless experience for your users to easily interact with the app. Using the `acr_values` parameter provides easy access to one layer of resources and secure access to another layer of resources.

The `acr_values` parameter refers to authentication context class reference. Each value defines a specific set of assurance level requirements that the protected resource requires from the authentication event associated with the access and ID tokens.

Today an authorization server relies on [authentication policies](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule) to authenticate the user. After the user is authenticated, the authorization server evaluates the scopes and the grant types defined for the app, and then issues the tokens. Although this approach works in many situations, there are several circumstances where more is needed. Resource servers (your protected APIs) can require different authentication strengths or elapsed time frames for different use cases. For example, an ecommerce app requires different authentication strengths depending on whether the item being purchased exceeds a certain threshold. Another example is an app that requires a higher level of assurance before making changes to sensitive information.

Okta has created predefined `acr_values` that are described in the [Predefined parameter values](#predefined-parameter-values) section. You can include one of these values, based on your use case, in the client authorization request to request a different authentication assurance. The authorization server returns an access token and/or an ID token that contains the `acr` claim. This claim conveys information about the level of assurance that the user verified at the time of authentication. The resource server can then validate these parameters to ensure that the user verified the required level of assurance.

> **Note:** You can specify a `max_age` parameter value to require an elapsed time frame. Also, if you want to ignore the existing session and reauthenticate the user each time, pass `max_age=0` in the request. For Classic Engine, pass `max_age=1`. See the [Request parameters table](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/authorizeCustomAS!in=query&path=max_age&t=request) for the `/authorize` endpoint for more information on `max_age`.

The Okta [redirect and embedded](/docs/concepts/redirect-vs-embedded/) deployment models support the use of the `acr_values` parameter. The parameter works with any OpenID Connect app, such as web, native, or SPA, and both the [org authorization server and custom authorization servers](/docs/concepts/auth-servers/) support it.

### Evaluation flow

In Identity Engine, assurances from policies are always evaluated in order of factor verification, constraints, and re-authentication. The [global session policy](/docs/concepts/policies/#sign-on-policies) is evaluated first, then the authentication policy, and then the `acr_values` parameter in the request. The authentication policy is always evaluated before the `acr_values` parameter.

In Classic Engine when a user doesn't have a session, the more restrictive policy is evaluated first, such as the Okta sign-on policy or the app sign-on policy. Also, if an assurance requirement is more restrictive, such as an `acr_values` parameter, that's evaluated first. The second most restrictive policy or assurance requirement is then evaluated and so on. When a user already has a session, the app sign-on policy is always evaluated first. Then, the `acr_values` parameter in the request.

In both Identity Engine and Classic Engine, if the user has a session, the previously satisfied authenticators are considered before prompting for factors that the `acr_values` parameter requires in the request. Also, if the user is unable to satisfy the level of assurance, Okta returns an [error](https://openid.net/specs/openid-connect-unmet-authentication-requirements-1_0.html) (`error=unmet_authentication_requirements`) to the callback endpoint.

### Factor enrollment

If the user hasn't enrolled a factor, during step-up authentication the user is prompted to enroll a factor as long as an [authenticator enrollment policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule) is configured (or the [Multifactor Enrollment Policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule) in Classic Engine).

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

<div class="three-quarter">

![Flow diagram that displays the back and forth between the client, resource server, and the authorization server](/img/auth/step-up-authentication-acr-flow.png)

</div>

At a high-level, this flow has the following steps:

1. Per your use case, include the `acr_values` predefined parameter value in the authentication request.

2. The authentication scenarios required by the [grant type](/docs/guides/implement-grant-type/authcode/main/) authenticate the user in accordance with the predefined `acr_values` parameter value used in the authentication request.

3. When the authentication flow completes, the authorization server returns an access token and/or an ID token to the client that contains the `acr` claim.

4. The client requests access to the protected resource and presents the new access token.

5. The resource server evaluates the assurance level of the access token against its requirements and then returns the protected resource.

## Add the parameter value to the auth request

The following is an example authorization request using the `urn:okta:loa:1fa:any` predefined `acr_values` parameter value. In this example, the Authorization Code [grant type](/docs/guides/implement-grant-type/authcode/main/) is used.

**Request**

```bash
https://{yourOktaDomain}/oauth2/default/v1/authorize?client_id={clientId}
&response_type=code
&scope=openid
&redirect_uri=https://{yourOktaDomain}/authorization-code/callback
&state=296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601
&acr_values=urn:okta:loa:1fa:any
```

The authorization code is returned in the response. And then the request is made to the `/token` endpoint to exchange the authorization code for an ID token and an access token. See the [Authorization Code grant type](/docs/guides/implement-grant-type/authcode/main/#grant-type-flow) for a diagram of this flow.

**Response**

The tokens are truncated for brevity.

```json
{
   "token_type": "Bearer",
   "expires_in": 3600,
   "access_token": "eyJraW…..vSqrH1Q",
   "scope": "openid",
   "id_token": "eyJraW…..WlB8Y9pQ"
}
```

To check the returned ID token payload, copy the values and paste them into any JWT decoder (for example: `https://jwt.io/`). Using a JWT decoder, confirm that the token contains the `acr` claim.

**ID token**

```json
{
  "sub": "00u47ijy7sRLaeSdC0g7",
  "ver": 1,
  "iss": "https://{yourOktaDomain}/oauth2/default",
  "aud": "0oa48e74ox4t7mQJX0g7",
  "iat": 1661289624,
  "exp": 1661293224,
  "jti": "ID.dz6ibX-YnBNlt14huAtBULam_Z0_wPG0ig5SWCy8XQU",
  "amr": [
    "pwd"
  ],
  "acr": "urn:okta:loa:1fa:any",
  "idp": "00o47ijbqfgnq5gj00g7",
  "auth_time": 1661289603,
  "at_hash": "w6BLQV3642TKWvaVwTAJuw"
}
```

**Access token**

```json
{
  "ver": 1,
  "jti": "AT.NovJtQ_NrJ6cgy3h1-638ArovwYXWslu0teQ2M3Ux9c",
  "iss": "https://{yourOktaDomain}/oauth2/default",
  "aud": "api://default",
  "iat": 1661289624,
  "exp": 1661293224,
  "acr": "urn:okta:loa:1fa:any",
  "cid": "0oa48e74ox4t7mQJX0g7",
  "uid": "00u47ijy7sRLaeSdC0g7",
  "scp": [
    "openid"
  ],
  "auth_time": 1661289603,
  "sub": "joe.smith@example.com"
}
```

### Refresh token behavior

When you use the refresh token to refresh access and ID tokens, the tokens reflect the `acr_values` parameter value sent in the original authentication request. Use the `auth_time` [parameter value](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#reserved-claims-in-the-payload-section) to validate when the original authentication occurred.

## Next steps

* Read more about Okta access tokens in the [OIDC & OAuth 2.0 API Reference](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#id-token).

* Read more about policies on the [Policies](/docs/concepts/policies/) concept page.

* Read more about OpenID Connect and OAuth 2.0 in the [OAuth 2.0 and OpenID Connect overview](/docs/concepts/oauth-openid/).
