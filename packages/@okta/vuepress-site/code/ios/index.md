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

These resources walk you through adding user authentication to your iOS app in minutes.

<ul class='language-ctas'>
	<li>
		<a href='/docs/guides/sign-into-mobile-app-redirect/ios/main/' class='Button--blueDarkOutline' data-proofer-ignore>
			<span>Sign users in quickstart</span>
		</a>
	</li>
	<li>
		<a href='https://github.com/okta/samples-ios' class='Button--blueDarkOutline' data-proofer-ignore>
			<span>Sample app</span>
		</a>
	</li>
</ul>

## Add sign-in with Okta to your app

There are two ways to integrate sign-in with Okta to your app. The easiest to integrate is the redirect model that uses the Okta-hosted Sign-In Widget. You open the widget, Okta processes the sign-in attempt, and then sends the result to your app. The other is the embedded model, where you manage each step in the sign-in flow. See [Overview of the mobile Identity Engine SDK](/docs/guides/mobile-idx-sdk-overview/ios/main/) for more detail.

### Use the redirect model

This method works with both Okta Identity Engine and Okta Classic Engine.

SDK: [Okta Mobile SDK for Swift](https://github.com/okta/okta-mobile-swift).

Example: [Browser sign-in](https://github.com/okta/samples-ios/tree/master/browser-sign-in).


### Use the embedded model

This method works only with Identity Engine.

SDK: [Identity Engine Swift SDK](https://github.com/okta/okta-idx-swift).

Example: [iOS embedded authentication with SDK sample app](https://github.com/okta/okta-idx-swift/tree/master/Samples/EmbeddedAuthWithSDKs).

## Recommended guides

Okta-hosted Sign-In Widget guide:

[Sign users in to your mobile app using the redirect model](/docs/guides/sign-into-mobile-app-redirect/ios/main/)

Embedded SDK and Sign-In Widget sign-in guide:

- [Overview of the mobile Identity Engine SDK](/docs/guides/mobile-idx-sdk-overview/ios/main/)
- [Get set up with Identity Engine sample apps and embedded use cases](/docs/guides/oie-embedded-common-org-setup/ios/main/)

Other guides:

- [Implement the Authorization Code flow with PKCE](/docs/guides/implement-grant-type/authcodepkce/main/)
- [Add an identity provider (includes social login)](/docs/guides/identity-providers/)
- [Validate access tokens](/docs/guides/validate-access-tokens)
- [Validate ID tokens](/docs/guides/validate-id-tokens)

> **Note**: Browse our recent [iOS Developer Blog posts](https://developer.okta.com/blog/tags/ios/) for further useful topics.
