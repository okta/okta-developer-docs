---
title: Manage app branding during the Identity Engine upgrade
meta:
  - name: description
    content: Understand how brand and custom domain APIs behave for apps that remain on the Classic Engine pipeline during an app-level Identity Engine upgrade.
---

<!-- PLACEHOLDER -- not ready to publish. Working notes: see "OIE-Classic interop notes" Google Doc, "Doc writing notes" tab. -->

<ApiLifecycle access="ea" />

> **Note:** This guide covers only the public API changes that support per-app branding during an app-level upgrade. For the admin console side (branding UX, previewing customizations), see the product documentation.

## About classic brands

When an org upgrades to Identity Engine, each existing Classic Engine brand becomes a **classic brand**: a system-managed brand that continues to serve apps still running on the Classic Engine pipeline. Okta also creates a cloned Identity Engine brand for the same custom domain. Classic brands have a system-managed lifecycle. You can't create or delete one through the API. Okta removes classic brands automatically when the app-level upgrade is complete for that domain.

## List brands, including classic brands

`GET /api/v1/brands` and `GET /api/v1/brands/{brandId}` return an `isClassic` property on each brand:

```json
{
  "id": "bndul3lAFBFSfcI2HKWC",
  "name": "My Classic Brand",
  "isDefault": false,
  "isClassic": true
}
```

`isClassic` is `true` when the brand is a classic brand, and `false` for a standard (Identity Engine) brand. The property is read-only:

* `POST /api/v1/brands` and `PUT /api/v1/brands/{brandId}` return `400` if the request includes `isClassic`.
* `DELETE /api/v1/brands/{brandId}` returns `409` for a classic brand.

## Find the classic brand paired with a domain

`GET /api/v1/brands/{brandId}/domains`, `GET /api/v1/domains`, and `GET /api/v1/domains/{domainId}` return both brand associations for a custom domain:

| Property | Description |
| --- | --- |
| `brandId` | The standard (Identity Engine) brand associated with the domain. |
| `classicBrandId` | The classic brand associated with the same domain, if one exists. |

```json
{
  "id": "ocdul3lAFBFSfcI2DOMN",
  "domain": "login.example.com",
  "brandId": "bndul3lAFBFSfcI2NORM",
  "classicBrandId": "bndul3lAFBFSfcI2HKWC"
}
```

> **Note:** If you query `GET /api/v1/brands/{brandId}/domains` using a classic brand's ID, that ID appears in the response's `classicBrandId` property, not `brandId`. `brandId` always identifies the standard brand for the domain.

### Update the classic brand association on a domain

`classicBrandId` is a writable property on `POST /api/v1/domains` and `PUT /api/v1/domains/{domainId}`, with these rules:

* `brandId` must reference a standard brand. A classic brand ID in `brandId` returns `400`.
* `classicBrandId` must reference a classic brand. A standard brand ID in `classicBrandId` returns `400`.
* `classicBrandId` can only be set on a domain that already has a classic brand association (assigned automatically during the org upgrade). You can't add a classic brand association to a newly created domain, or to a domain that never had one.
* Once set, `classicBrandId` can be changed to a different classic brand, but can't be removed.

## Customize the sign-in and error pages for a classic brand

The existing theme and sign-in/error page endpoints work for classic brands without a new request or response shape:

* `GET`/`PUT /api/v1/brands/{brandId}/themes/{themeId}`
* `GET`/`PUT /api/v1/brands/{brandId}/pages/sign-in/preview`
* `GET`/`PUT /api/v1/brands/{brandId}/pages/sign-in/customized`
* `GET`/`PUT /api/v1/brands/{brandId}/pages/error/preview`
* `GET`/`PUT /api/v1/brands/{brandId}/pages/error/customized`

## Sign-In Widget version requirements for a classic brand

Identity Engine orgs normally can't set a Sign-In Widget version earlier than 5.11 on `GET /api/v1/brands/{brandId}/pages/sign-in/widget-versions` or the sign-in page `PUT` endpoints. For a classic brand, that check doesn't apply, so you can set a pre-5.11 or earlier-generation widget version to match the app's Classic Engine pipeline. Standard brands keep the 5.11+ requirement.

## classicFooterHelpTitle for a classic brand

`classicFooterHelpTitle` (in `SignInPageWidgetCustomizations`) is available again, for reading and writing, for a classic brand. Identity Engine orgs otherwise no longer expose this field.

## Known limitations

* If an email is sent without app context, Okta falls back to the pipeline of the default app in the cloned Identity Engine brand tied to the custom domain.
* Admins can preview sign-in page customizations for the cloned Identity Engine brand at any time. For a classic brand, that same preview link can break, because it attempts to render the customization on the Identity Engine pipeline, which the app's Sign-In Widget version doesn't support.
* If the cloned Identity Engine brand for a custom domain hasn't been validated yet (for example, right after the org upgrade), Okta falls back to the default Okta domain brand for apps running on the Identity Engine pipeline, so the sign-in page doesn't break. This fallback stops once an admin publishes a sign-in page customization for that domain's Identity Engine brand.

## See also

* [Switch an app to the Identity Engine pipeline](/docs/guides/oie-upgrade-app-pipeline/)
* [Style the Sign-In Widget (third generation)](/docs/guides/custom-widget-gen3/)
* [Customize domain and email address](/docs/guides/custom-url-domain/)
* [Customize email notifications](/docs/guides/custom-email/)
