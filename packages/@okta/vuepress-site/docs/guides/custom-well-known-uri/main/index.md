---
title: Customize associated domains
excerpt: Learn how to customize associated domains.
layout: Guides
---

<ApiLifecycle access="ea" />

This guide explains how to create associations between your custom domains and three well-known URI endpoints.

---

#### Learning outcomes

Learn how to create well-known URI files.

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* A [custom domain](/docs/guides/custom-url-domain)
* The Associated Domains Customizations feature enabled for your org

---

## About associated domains

Associated domains create a secure link between your custom domain and native apps.

This guide describes how to configure three important well-known URI endpoints that are used by iOS, Android, and WebAuthn. You can use these endpoints to establish a trusted relationship between your app, authorized referring domains, and the web credentials of users for those domains.

For example, when you host the `/.well-known/apple-app-site-association` file in your custom domain, you can allow [universal links and app links](https://developer.apple.com/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content/).

### Three well-known URIs

* `/.well-known/apple-app-site-association`: The iOS well-known URI file that establishes a secure link between a website and a native iOS or macOS app.
* `/.well-known/assetlinks.json`: The Android well-known URI file that establishes a secure link between a website and a native Android app.
* `/.well-known/webauthn`: The WebAuthn well-known URI file that allows you to specify other web origins that are allowed to share and use the same WebAuthn credentials (passkeys).

The iOS and Android well-known URIs have similar functions that enable secure associations between your custom domain and native mobile apps. While you can use the WebAuthn well-known URI to improve the sign-in experience of your users.

## Use associated domains in Okta

In your org, you can view, create, and customize these files by using the [Associated Domain Customizations API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AssociatedDomainCustomizations/) or in the [Admin Console](https://help.okta.com/okta_help.htm?type=oie&id=configure-associated-domains).

> **Note:** The maximum file size for each well-known URI file is 100 KB.

There are various ways to configure these well-known URIs with your org. Review the following documentation resources to learn more about configuring each well-known URI.

* [Supporting associated domains (Apple)](https://developer.apple.com/documentation/xcode/supporting-associated-domains)
* [Verify Android App Links (Android)](https://developer.android.com/training/app-links/verify-android-applinks)
* [Related Origin Requests (WebAuthn)](https://passkeys.dev/docs/advanced/related-origins/)

### Create an apple-app-site-association customization

Before you create a customization, retrieve your `brandId` with the [List all brands](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Brands/#tag/Brands/operation/listBrands) endpoint.

Then, use the [Replace the customized well-known URI endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/WellKnownURIs/#tag/WellKnownURIs/operation/replaceBrandWellKnownURI) to create a custom well-known URI for `/.well-known/apple-app-site-association`.

> **Note:** You must format the `apple-app-site-association` well-known URI as a JSON object.

1. Create your own PUT request.
1. In the path parameters, use your `brandId`.
1. Set `apple-app-site-association` as the `path`.
1. Use the following request body template and enter your own parameters and values.
1. After you've set your request body parameters, send the `PUT /api/v1/brands/{brandId}/well-known-uris/{path}/customized` request.

```json
  {
    "representation": {
      "key1": "value1",
      "key2": "value2",
      "key3": {
        "key3.1": "value3.1"
      }
    }
  }
```

> **Note:** The `apple-app-site-association` well-known URI file can't include an `authsrv` parameter. The custom well-known URI content is merged with hardcoded `authsrv` information that enables Okta Verify.

When creating your own URI file, review this [example](https://developer.apple.com/documentation/xcode/supporting-associated-domains#Add-the-associated-domain-file-to-your-website) of an `apple-app-site-association` URI file.

### Create an assetLinks.json customization

Retrieve your `brandId` with the [List all brands](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Brands/#tag/Brands/operation/listBrands) endpoint.

Use the [Replace the customized well-known URI endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/WellKnownURIs/#tag/WellKnownURIs/operation/replaceBrandWellKnownURI) to create a custom well-known URI for `/.well-known/assetlinks.json`.

> **Note:** You must format the `assetLinks.json` well-known URI as a JSON array.

1. Create your own PUT request.
1. In the path parameters, use your `brandId`.
1. Set `assetlinks.json` as the `path`.
1. Use the following request body template and enter your own parameters and values.
1. After you've set your request body parameters, send the `PUT /api/v1/brands/{brandId}/well-known-uris/{path}/customized` request.

```json
{
  "representation": [
    {
      "key1": "value1",
      "key2": "value2",
      "key3": {
        "key3.1": "value3.1"
      }
    }
  ]
}
```

When creating your own URI file, review this [example](https://developer.android.com/training/app-links/verify-android-applinks#web-assoc) of an `assetLinks.json` URI file.

### Create a webauthn customization

Retrieve your `brandId` with the [List all brands](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Brands/#tag/Brands/operation/listBrands) endpoint.

Use the [Replace the customized well-known URI endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/WellKnownURIs/#tag/WellKnownURIs/operation/replaceBrandWellKnownURI) to create a custom well-known URI for `/.well-known/webauthn`.

> **Note:** You must format the `webauthn` well-known URI as a JSON object and the `origins` parameter as an array of strings.

1. Create your own PUT request.
1. In the path parameters, use your `brandId`.
1. Set `webauthn` as the `path`.
1. Use the following request body example.
1. After you've set your request body parameters, send the `PUT /api/v1/brands/{brandId}/well-known-uris/{path}/customized` request.

In the following request body example, the well-known URI file declares that the domains listed in the `origins` parameter are part of a single, trusted entity. The `origins` parameter contains an array of URLs and it instructs web browsers to allow a single WebAuthn credential, such as a passkey, to be used in the listed domains.

```json
  {
    "representation": {
      "origins": [
        "https://www.example.com",
        "https://store.example.com"
      ]
    }
  }
```

## Review the System Log

After you create associations for your custom domains, you can verify that they're created by referring to the `system.well_known_uri.update` event type. See [Event Types](/docs/reference/api/event-types/).

The `system.well_known_uri.update` event type includes the following information about your association.

* Your custom brand ID
* The path of the well-known URI that you created an association with
* The previous content of the well-known URI association and its updated content
* The date and time when you created it
