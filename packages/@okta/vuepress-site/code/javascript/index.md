---
title: Add user authentication to your JavaScript app
language: JavaScript
integration: front-end
icon: code-javascript
meta:
  - name: description
    content: Our guide explains how to add authentication to your JavaScript app and customize the sign-in experience.
---

## Get started with JavaScript + Okta

New to Okta? Our resources walk you through adding user authentication to your JavaScript app in minutes.

<ul class='language-ctas'>
	<li>
		<a href='#' class='Button--blueDarkOutline' data-proofer-ignore>
			<span>Auth.js fundamentals</span>
		</a>
	</li>
	<li>
		<a href='#' class='Button--blueDarkOutline' data-proofer-ignore>
			<span>Sign-In Widget fundamentals</span>
		</a>
	</li>
</ul>

> **Note**: This set of resources is relevant to front-end JavaScript. For back-end JavaScript, see [Node.js](/code/nodejs/).

## Integrate with Okta using the Okta-hosted Sign-In Widget

These SDKs help you integrate with Okta by redirecting to the Okta Sign-In Widget using OpenID Connect (OIDC) client libraries.

[Okta's OpenID Connect JS library](https://github.com/okta/okta-oidc-js)

## Integrate with Okta using embedded Sign-In Widget and SDKs

These SDKs help you integrate with Okta to build your own fully-branded authentication by embedding an Okta Sign-In Widget and/or SDK.

* [Okta JavaScript Auth SDK](https://github.com/okta/okta-auth-js) is a library wrapper for the Okta Authentication API. Use it when you need complete control of your sign-in experience. See the [Okta Identity Engine README](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md) for Identity Engine-specific instructions.
* [okta-auth-js on npm](https://www.npmjs.com/package/@okta/okta-auth-js)
* Use the [Okta embedded Sign-In Widget](https://github.com/okta/okta-signin-widget) for a pre-built, best practice, customizable experience.

## Recommended Guides

Embedded SDK and Sign-In Widget sign-in guide:

* [Auth.js fundamentals](/docs/guides/auth-js/main/)
* [Embedded Okta Sign-In Widget fundamentals](/docs/guides/embedded-siw/main/)

Other guides:

* [Implementing the Implicit flow](/docs/guides/implement-grant-type/implicit/main/)
* [Implementing the PKCE flow](/docs/guides/implement-grant-type/authcodepkce/main/)
* [Add an identity provider (includes social login)](/docs/guides/identity-providers/)
* [Validate access tokens](/docs/guides/validate-access-tokens)
* [Validate ID tokens](/docs/guides/validate-id-tokens)

> **Note**: Browse our [JavaScript Developer Blog posts](/search/#q=javascript&f:@commonoktasource=[Developer%20blog]) for further useful topics.
