---
title: Customize associated domains
excerpt: Learn how to customize associated domains.
layout: Guides
---

This guide explains how to create associations between your custom domains and three well-known endpoints.

---

#### Learning outcomes

Learn how to create a well-known URI file

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* A [custom domain](/docs/guides/custom-url-domain)

---

## About associated domains

Associated domains create a secure link between your custom domain and native applications.

This guide describes how to configure three important well-known endpoints. The three endpoints are associated with iOS, Android, and WebAuthn and you can use them to establish a trusted relationship between your app, authorized referring domains, and the web credentials of users for those domains.

For example, when you host the required `/.well-known/apple-app-site-association` file in your custom domain, you can allow [universal links and app links](https://developer.apple.com/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content/).

### Three well-known URIs

* [`/.well-known/apple-app-site-association`](https://developer.apple.com/documentation/xcode/supporting-associated-domains): The iOS well-known URI file that that establishes a secure link between a website and a native iOS or macOS app.
* [`/.well-known/assetlinks.json`](https://developer.android.com/training/app-links/verify-android-applinks#web-assoc): The Android well-known URI file that establishes a secure link between a website and a native Android app.
* [`/.well-known/webauthn`](https://passkeys.dev/docs/advanced/related-origins/): The WebAuthn well-known URI file that allows a domain to specify other related web origins that are allowed to share and use the same WebAuthn credentials (passkeys).

The iOS and Android well-known URIs have similar functions that improve domain communication. While you can use the WebAuthn well-known URI to improve the sign in experience of your users.

## Use associated domains in Okta

In your org, you can create and customize these files by using the [Associated Domain Customizations API]() or in the [Admin Console]().

### Create an apple-app-site-association customization

Use the [Replace the customized well-known URI endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/WellKnownURIs/#tag/WellKnownURIs/operation/replaceBrandWellKnownURI) to create a well-known URI for `/.well-known/apple-app-site-association`.

```json
{
  "applinks": {
    "details": [
      {
        "appID": "A1B2C3D4E5.com.example.myapp",
        "paths": ["*"]
      }
    ]
  }
}
```


### Create an assetLinks.json customization

Use the [Replace the customized well-known URI endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/WellKnownURIs/#tag/WellKnownURIs/operation/replaceBrandWellKnownURI) to create a well-known URI for `/.well-known/assetlinks.json`.


```json
[
    {
        "relation": ["delegate_permission/common.handle_all_urls"],
        "target": {
            "namespace": "android_app",
            "package_name": "com.example.myapp",
            "sha256_cert_fingerprints":
            ["FA:C6:17:45:DC:09:03:78:6F:47:72:11:32:AD:04:33:A6:72:5A:B9:53:25:34:8F:44:02:AE:34:2A:4F:78:65"]
        }
    }
]
```


### Create a webauthn customization

Use the [Replace the customized well-known URI endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/WellKnownURIs/#tag/WellKnownURIs/operation/replaceBrandWellKnownURI) to create a well-known URI for `/.well-known/webauthn`.


```json
{
  "related_origins": [
    "https://www.example.com",
    "https://store.example.com"
  ]
}
```