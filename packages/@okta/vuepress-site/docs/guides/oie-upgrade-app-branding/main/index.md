---
title: Manage app branding during the Identity Engine upgrade
meta:
  - name: description
    content: Keep your customized Classic Engine sign-in page working during an app-level Identity Engine upgrade, and manage the classic brand that Okta pairs with your custom domain.
---

Learn how Okta keeps your customized Classic Engine sign-in page working during an app-level upgrade, and how to find and manage the classic brand that's paired with your custom domain.

> **Note:** The tasks in this guide only apply to an app in an org that's eligible for Classic Engine interoperation mode. See [Classic Engine interoperation mode](https://help.okta.com/okta_help.htm?type=oie&id=) to confirm that your org qualifies before you continue.

---

#### Learning outcomes

- Understand what a classic brand is and why Okta creates one.
- Find the classic brand that's paired with your custom domain.
- Customize a classic brand, including keeping your existing Sign-In Widget version.
- Change which classic brand a domain uses.
- Recognize the known limitations of branding APIs for classic brands.

#### What you need

- An org that's upgraded to Identity Engine and is eligible for Classic Engine interoperation mode
- An access token with the `okta.brands.read`, `okta.brands.manage`, `okta.domains.read`, and `okta.domains.manage` scopes
- At least one app running on the Classic Engine pipeline

---

## Overview

Okta ties a [brand](/docs/concepts/brands/) to a custom domain, one brand for each domain. When your org upgrades to Identity Engine, Okta keeps your existing brand as a classic brand, creates an Identity Engine copy of it, and pairs both with the same domain. At sign-in, Okta serves whichever brand matches the app's pipeline.

Your customized Classic Engine sign-in page keeps working, including a Sign-In Widget version that Identity Engine wouldn't normally allow, until you move each app.

This guide explains how Okta pairs the two brands, then explains how to find your classic brand, customize it, and change which brand that a domain uses.

## Quick reference

Use the following table to see what an app-level upgrade changes for branding and what you need to do about it.

| Area | What changes | Action required | Learn more |
| --- | --- | --- | --- |
| Brands | Before the upgrade, each custom domain had one brand. After upgrading, your existing brand becomes a classic brand and Okta adds an Identity Engine copy, so that the custom domain has two. | None. Okta creates the pairing during the upgrade. | [Classic brands](#classic-brands) |
| Domains | A custom domain now carries two brand references: `brandId` for the Identity Engine brand, and `classicBrandId` for the classic brand. | Retrieve `classicBrandId` to find the brand that serves your Classic Engine pipeline apps. | [Brand and domain pairing](#brand-and-domain-pairing) |
| Creating and deleting brands | Okta creates and deletes classic brands. You can retrieve one and change its customizations, but you can't create or delete one. | None, unless a domain serves the wrong classic brand. In that case, set `classicBrandId` on the domain to the correct classic brand. | [Change which classic brand a domain uses](#change-which-classic-brand-a-domain-uses) |
| Customizations | The restrictions that Identity Engine applies to a brand don't apply to a classic brand, including the Sign-In Widget version floor. | Keep customizing the classic brand while your apps remain on the Classic Engine pipeline. | [Customize a classic brand](#customize-a-classic-brand) |

## Key concepts for app branding during an upgrade

See the following sections to understand how Okta represents your Classic Engine branding after the upgrade.

### Classic brands

A classic brand holds the Classic Engine customizations that your org had before the upgrade. It serves apps that are still on the [Classic Engine pipeline](/docs/guides/oie-upgrade-app-pipeline/). The Identity Engine copy that Okta creates alongside it serves apps that you've moved to the Identity Engine pipeline.

Okta creates and removes classic brands as part of the upgrade, so the API doesn't let you create or delete one yourself:

* `POST /api/v1/brands` and `PUT /api/v1/brands/{brandId}` reject a request that includes `isClassic`, and return a `400` error. Only Okta can designate a brand as a classic brand.
* `DELETE /api/v1/brands/{brandId}` fails with a `409` error for a classic brand. Deleting one leaves your Classic Engine pipeline apps without the sign-in page that they depend on.

You can still retrieve a classic brand and change its customizations.

### Brand and domain pairing

A custom domain normally references one brand through a `brandId`. During an app-level upgrade, Okta adds a second reference, `classicBrandId`, so that one domain can resolve to either brand:

| Property | Description |
| --- | --- |
| `brandId` | The standard Identity Engine brand that's associated with the domain. Okta serves this brand to apps on the Identity Engine pipeline. |
| `classicBrandId` | The classic brand that's associated with the same domain. Okta serves this brand to apps on the Classic Engine pipeline. |

Okta sets both references during the upgrade. At sign-in, it checks the app's pipeline and resolves the domain to the matching brand, so you don't map brands to apps yourself.

> **Note:** If you query `GET /api/v1/brands/{brandId}/domains` with a classic brand's ID, that ID appears in the response as `classicBrandId`, not `brandId`. `brandId` always identifies the standard brand for the domain.

### Sign-In Widget versions for a classic brand

Identity Engine requires [Sign-In Widget](/docs/guides/oie-upgrade-sign-in-widget/) version 5.11 or later, and an Identity Engine org normally can't set an earlier version on the sign-in page by using `PUT` endpoints.

That requirement doesn't apply to a classic brand. A classic brand keeps the Sign-In Widget version that your Classic Engine customizations depend on, even if that version is earlier than 5.11. Your customizations keep working after your org upgrades because that version doesn't change. Standard brands keep the 5.11 or later requirement.

## Find your classic brand

`classicBrandId` on a domain identifies the classic brand that serves that domain, and `isClassic` on a brand tells you whether that brand is a classic brand.

To find the classic brand for a domain, retrieve the domain:

```bash
curl -X GET "https://${yourOktaDomain}/api/v1/domains/${domainId}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer ${accessToken}"
```

The response includes both brand references:

```json
{
  "id": "ocdul3lAFBFSfcI2DOMN",
  "domain": "login.example.com",
  "brandId": "bndul3lAFBFSfcI2NORM",
  "classicBrandId": "bndul3lAFBFSfcI2HKWC"
}
```

`GET /api/v1/domains` returns the same references for every custom domain in your org.

To confirm which of your brands are classic brands, list them and check the value of `isClassic` in the response:

```bash
curl -X GET "https://${yourOktaDomain}/api/v1/brands" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer ${accessToken}"
```

```json
[
  {
    "id": "bndul3lAFBFSfcI2HKWC",
    "name": "My Classic Brand",
    "isDefault": false,
    "isClassic": true
  }
]
```

`isClassic` is `true` for a classic brand and `false` for a standard Identity Engine brand. `GET /api/v1/brands/{brandId}` returns the same property for a single brand.

## Customize a classic brand

Use the existing theme and page endpoints to keep maintaining your Classic Engine sign-in experience while apps remain on that pipeline. They work for a classic brand with no change to the request or response shape.

| Resource | Retrieve | Replace |
| --- | --- | --- |
| Theme | [Retrieve a theme](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Themes/#tag/Themes/operation/getBrandTheme) | [Replace a theme](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Themes/#tag/Themes/operation/replaceBrandTheme) |
| Preview sign-in page | [Retrieve the preview sign-in page](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/CustomPages/#tag/CustomPages/operation/getPreviewSignInPage) | [Replace the preview sign-in page](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/CustomPages/#tag/CustomPages/operation/replacePreviewSignInPage) |
| Customized sign-in page | [Retrieve the customized sign-in page](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/CustomPages/#tag/CustomPages/operation/getCustomizedSignInPage) | [Replace the customized sign-in page](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/CustomPages/#tag/CustomPages/operation/replaceCustomizedSignInPage) |
| Preview error page | [Retrieve the preview error page](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/CustomPages/#tag/CustomPages/operation/getPreviewErrorPage) | [Replace the preview error page](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/CustomPages/#tag/CustomPages/operation/replacePreviewErrorPage) |
| Customized error page | [Retrieve the customized error page](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/CustomPages/#tag/CustomPages/operation/getCustomizedErrorPage) | [Replace the customized error page](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/CustomPages/#tag/CustomPages/operation/replaceCustomizedErrorPage) |

Two [widget customization](/docs/guides/oie-upgrade-sign-in-widget-styling/) properties stay available on a classic brand, but an Identity Engine org no longer exposes them. `classicFooterHelpTitle` sets the title of the help link in the sign-in page footer, and `classicRecoveryFlowEmailOrUsernameLabel` sets the label for the username field in the classic recovery flow. Both are in `SignInPageWidgetCustomizations`.

## Change which classic brand a domain uses

Okta pairs your domain with the right classic brand during the upgrade, so most orgs never need to change it. Change it if a domain resolves to a classic brand that holds the wrong customizations.

`classicBrandId` is writable on `POST /api/v1/domains` and `PUT /api/v1/domains/{domainId}`, with these rules:

* `brandId` must reference a standard brand. A classic brand ID in `brandId` is rejected with a `400` error.
* `classicBrandId` must reference a classic brand. A standard brand ID in `classicBrandId` is rejected with a `400` error.
* You can only set `classicBrandId` on a domain that already has a classic brand association, which Okta assigns during the org upgrade. You can't add one to a newly created domain, or to a domain that never had one.
* You can reassign `classicBrandId` to a different classic brand, but you can't remove the pairing. A Classic Engine pipeline app on that domain needs a classic brand to render its sign-in page.

## Known limitations

The following limitations apply while your domain serves both a classic brand and an Identity Engine brand.

* Some emails have no app context, so Okta can't tell which pipeline to brand them for. In that case, Okta uses the default app of the Identity Engine brand that's paired with your custom domain, and brands the email for that app's pipeline.
* The sign-in page preview link can break for a classic brand. Previewing customizations works as usual for the Identity Engine brand. For a classic brand, the preview attempts to render the page on the Identity Engine pipeline, which the brand's Sign-In Widget version doesn't support.
* If an admin hasn't validated the Identity Engine brand for a custom domain yet, for example right after the org upgrade, Okta serves the default Okta domain brand to apps on the Identity Engine pipeline so that the sign-in page doesn't break. This fallback stops after an admin publishes a sign-in page customization for that domain's Identity Engine brand.

## See also

* [Switch an app to the Identity Engine pipeline](/docs/guides/oie-upgrade-app-pipeline/)
* [Prepare to upgrade to Okta Identity Engine](/docs/journeys/OCI-prepare-upgrade-oie/)
* [Replace Classic Engine auth flows with Identity Engine](/docs/journeys/OCI-replace-ce-auth-flows/)
* [Style the Sign-In Widget (third generation)](/docs/guides/custom-widget-gen3/)
* [Customize domain and email address](/docs/guides/custom-url-domain/)
* [Customize email notifications](/docs/guides/custom-email/)
* [Brands API reference](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Brands/)
* [Custom Domains API reference](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/CustomDomain/)
