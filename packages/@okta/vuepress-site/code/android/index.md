---
title: Add user authentication to your Android app
language: Android
integration: mobile
icon: code-android
meta:
  - name: description
    content: Get a guide to adding user authentication to your Android app, and related guides to help complete your project.

---

## Get started with Android + Okta

These resources walk you through adding user authentication to your Android app in minutes.

<ul class='language-ctas'>
	<li>
		<a href='/docs/guides/sign-into-mobile-app-redirect/android/main/' class='Button--blueDarkOutline' data-proofer-ignore>
			<span>Sign users in quickstart</span>
		</a>
	</li>
	<li>
		<a href='https://github.com/okta/samples-android' class='Button--blueDarkOutline' data-proofer-ignore>
			<span>Sample app</span>
		</a>
	</li>
</ul>

## Add sign-in with Okta to your app

There are two ways to integrate sign-in with Okta to your app. The easiest to integrate is the redirect model that uses the Okta-hosted Sign-In Widget. You open the widget, Okta processes the sign-in attempt, and then sends the result to your app. The other is the embedded model, where you manage each step in the sign-in flow. See [Overview of the mobile Identity Engine SDK](/docs/guides/mobile-idx-sdk-overview/android/main/) for more detail.

### Use the redirect model

This method works with both Okta Identity Engine and Okta Classic Engine.

SDK: [Okta Mobile SDK for Kotlin](https://github.com/okta/okta-mobile-kotlin).

Example: [Browser sign-in](https://github.com/okta/samples-android/tree/master/browser-sign-in).


### Use the embedded model

This method works only with Identity Engine.

SDK: [Identity Engine Android SDK](https://github.com/okta/okta-idx-android).

Example: [Android dynamic authentication example](https://github.com/okta/okta-idx-android/tree/master/dynamic-app).

## Recommended guides

Okta-hosted Sign-In Widget guide::

* [Sign users in to your mobile app using the redirect model](/docs/guides/sign-into-mobile-app-redirect/android/main/)

Embedded SDK and Sign-In Widget sign-in guides:

* [Get set up with Identity Engine sample apps and embedded use cases](/docs/guides/oie-embedded-common-org-setup/android/main/)

Other guides:

* [Implement the Authorization Code flow with PKCE](/docs/guides/implement-grant-type/authcodepkce/main/)
* [Add an identity provider (includes social login)](/docs/guides/identity-providers/)
* [Validate access tokens](/docs/guides/validate-access-tokens)
* [Validate ID tokens](/docs/guides/validate-id-tokens)

> **Note**: Browse our recent [Android Developer Blog posts](https://developer.okta.com/blog/tags/android/) for further useful topics.
