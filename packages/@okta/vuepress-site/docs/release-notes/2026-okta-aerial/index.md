---
title: Okta Aerial API release notes 2026
---

# Okta Aerial API release notes (2026)

<a href="/rss/aerial.xml">
  <img src="/img/icons/Feed-icon.svg" alt="RSS" width="20" height="20" />
  Subscribe to RSS
</a><br><br>

These release notes list customer-visible changes to the Okta Aerial API. Okta Aerial aligns with the Okta Classic Engine and Okta Identity Engine release, but updates to the Aerial service deploy from outside their release dates.

* The Aerial services preview date represents expected updates to the preview environment (`https://aerial-sandbox.okta.com`).

* The Aerial services production date represents expected updates to the production environment (`https://aerial-apac.okta.com`).

See also [Introduction to the Okta Aerial API](https://developer.okta.com/docs/api/openapi/aerial/guides/overview/).

## February

### Weekly release
<!-- Published on: 2026-02-24T12:00:00Z -->
| Change | Expected in Aerial services preview | Expected in Aerial services production |
|--------|-----------------------------| -----------------------------|
| [Bug fixed in 2026.02.3](#bug-fixed-in-2026023)| February 24, 2026 | March 2, 2026 |

#### Bug fixed in 2026.02.3

You could call the [Apply an access request condition](https://developer.okta.com/docs/api/openapi/aerial/aerial/tag/Governance/#tag/Governance/operation/applyRequestConditionTemplate) API with an invalid access condition. (OKTA-1091926)

### Monthly release 2026.02.0
<!-- Published on: 2026-02-04T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Developer documentation updates in 2026.02.0](#developer-documentation-updates-in-2026-02-0) | February 4, 2026 |

#### Developer documentation updates in 2026.02.0

The Okta developer portal search results now include the API references.

## January

### Weekly release
<!-- Published on: 2026-01-13T12:00:00Z -->
| Change | Expected in Aerial services preview | Expected in Aerial services production |
|--------|-----------------------------| -----------------------------|
| [Okta Aerial supports Identity Threat Protection with Okta AI](#okta-aerial-supports-identity-threat-protection-with-okta-ai)| January 13, 2026 | January 20, 2026 |
| [Developer documentation update](#developer-documentation-update)| January 8, 2026 | January 8, 2026 |

#### Okta Aerial supports Identity Threat Protection with Okta AI

Okta Aerial now supports the enablement of Identity Threat Protection with Okta AI for managed orgs (IT Products - Identity Threat Protection). Use the [Update enabled products for an org](https://developer.okta.com/docs/guides/manage-orgs-okta-aerial/main/#enable-products-in-the-org) endpoint with the product ID `P001113` to enable this product. See [Enable products in the org](https://developer.okta.com/docs/guides/manage-orgs-okta-aerial/main/#enable-products-in-the-org) and [Identity Threat Protection with Okta AI](https://help.okta.com/okta_help.htm?type=oie&id=ext-itp-overview).

#### Developer documentation update

The Okta API release notes now provide an RSS feed for each API release note category: [Classic Engine](/docs/release-notes/2026/), [Identity Engine](/docs/release-notes/2026-okta-identity-engine/), [Identity Governance](/docs/release-notes/2026-okta-identity-governance/), [Privileged Access](/docs/release-notes/2026-okta-privileged-access/), [Access Gateway](/docs/release-notes/2026-okta-access-gateway/), and [Aerial](/docs/release-notes/2026-okta-aerial/). Click the RSS icon to subscribe.
