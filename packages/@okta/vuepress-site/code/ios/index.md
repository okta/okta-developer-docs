---
title: Add user authentication to your iOS app
language: iOS
integration: mobile
icon: code-ios
meta:
  - name: description
    content: Our iOS developer docs help you add user authentication, integrate sign-in flows with an SDK on CocoaPods, and validate Okta OAuth 2.0 tokens.
---

## Get started with iOS + Okta

New to Okta? Our resources walk you through adding user authentication to your iOS app in minutes.

<ul class='language-ctas'>
	<li>
		<a href='#' class='Button--blueDarkOutline' data-proofer-ignore>
			<span>Sign users in quickstart</span>
		</a>
	</li>
	<li>
		<a href='https://github.com/okta/samples-ios' class='Button--blueDarkOutline' data-proofer-ignore>
			<span>Sample app</span>
		</a>
	</li>
</ul>

## Integrate with Okta using the Okta-hosted Sign-In Widget

These SDKs help you integrate with Okta by redirecting to the Okta Sign-In Widget using OpenID Connect (OIDC) client libraries.

[iOS redirect authentication sample app](https://github.com/okta/samples-ios): See [Browser sign in](https://github.com/okta/samples-ios/tree/master/browser-sign-in) for a redirect configuration.

## Integrate with Okta using embedded Sign-In Widget and SDKs

These SDKs help you integrate with Okta to build your own fully-branded authentication by embedding an Okta Sign-In Widget and/or SDK.

Okta Identity Engine:

* [Identity Engine Swift SDK](https://github.com/okta/okta-idx-swift)
* [iOS embedded authentication with SDK sample app](https://github.com/okta/okta-idx-swift/tree/master/Samples/EmbeddedAuthWithSDKs)

Okta Classic OIDC library for iOS (CocoaPod):

* [OktaOidc on CocoaPods](https://cocoapods.org/pods/OktaOidc)
* [Okta iOS OIDC SDK Source](https://github.com/okta/okta-oidc-ios)

## Other Classic iOS libraries

* [Okta JWT Verifier for iOS](https://github.com/okta/okta-ios-jwt): Use this library for validating Okta OAuth tokens.
* [iOS authentication SDK](https://github.com/okta/okta-auth-swift): Use this library for building custom authentication flows with Okta.
* [React Native app with Okta's OpenID Connect API](https://github.com/okta/okta-react-native/tree/master/ios)
* [Okta Secure Storage Library](https://github.com/okta/okta-storage-swift)

## Recommended guides

Okta-hosted Sign-In Widget guide:

[Sign into your mobile app with redirect auth](#) (WILL EVENTUALLY BE /docs/guides/sign-into-mobile-app-redirect/ios/main/)

Embedded SDK and Sign-In Widget sign-in guide:

* [Get set up with Identity Engine sample apps and embedded use cases](/docs/guides/oie-embedded-common-org-setup/ios/main/)

Other guides:

* [Implementing the Authorization Code flow with PKCE](/docs/guides/implement-grant-type/authcodepkce/main/)
* [Add an identity provider (includes social login)](/docs/guides/identity-providers/)
* [Validate access tokens](/docs/guides/validate-access-tokens)
* [Validate ID tokens](/docs/guides/validate-id-tokens)

> **Note**: Browse our [iOS Developer Blog posts](/search/#q=ios&f:@commonoktasource=[Developer%20blog]) for further useful topics.
