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

## April

### Monthly release
<!-- Published on: 2026-03-31T12:00:00Z -->
| Change | Expected in Aerial services preview | Expected in Aerial services production |
|--------|-----------------------------| -----------------------------|
| [Bug fixed in weekly release](#bug-fixed-in-weekly-release)| March 31, 2026  | April 13, 2026   |

#### Bug fixed in weekly release

The Aerial Console sometimes contained incorrect data on a client's associated orgs. (OKTA-1126071)

### Monthly release
<!-- Published on: 2026-03-05T12:00:00Z -->
| Change | Expected in Aerial services preview | Expected in Aerial services production |
|--------|-----------------------------| -----------------------------|
| [Aerial Org Groups and Request Condition Template APIs](#aerial-org-groups-and-request-condition-template-apis)| March 5, 2026 | March 11, 2026 |
| [Aerial member role available in EA](#aerial-member-role-available-in-ea)| March 5, 2026 | March 11, 2026 |
| [Developer documentation update in 2026.03.0](#developer-documentation-update-in-2026-03-0) | March 4, 2026 | March 4, 2026|

#### Aerial Org Groups and Request Condition Template APIs

Previously, access request conditions for managed orgs could only be applied to all managed orgs using a template app or a single org from within its Aerial org's Admin Console. Now, you can create org groups and apply access request conditions to one or more managed orgs all from within the Aerial Console.
To support this new flexible grouping and governance experience, Okta introduces a new suite of APIs that allow developers to programmatically manage Org Groups and apply access request conditions across multiple orgs at scale. These APIs help you define precise rules for access, streamlining governance and improving usability.

See the [Org Groups](https://developer.okta.com/docs/api/openapi/aerial/aerial/tag/Org-Groups/) and [Governance](https://developer.okta.com/docs/api/openapi/aerial/aerial/tag/Governance/) APIs. For more information on managing Org Groups in the Aerial Console, see [Create org groups](https://help.okta.com/okta_help.htm?type=aerial&id=aerial-create-org-groups).

#### Aerial member role available in EA

Previously, all users were invited as Aerial Owners with super admin privileges. Now, they can be invited as Aerial members, providing lower-scope permissions. This enhances security by distinguishing true owners from members who need access for specific tasks, ensuring tighter control over Aerial workflows.

See [Aerial members](https://help.okta.com/okta_help.htm?type=aerial&id=aerial-member).

#### Developer documentation update in 2026.03.0

Okta's [API reference pages](https://developer.okta.com/docs/api/) are undergoing a migration, which started on February 24. While the look and feel may vary across pages during this time, all technical documentation remains accurate and up to date.

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
