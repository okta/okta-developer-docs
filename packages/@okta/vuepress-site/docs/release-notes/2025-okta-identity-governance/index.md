---
title: Okta Identity Governance API release notes 2025
---

Okta Identity Governance is available for both Okta Classic and Identity Engine.

# Okta Identity Governance API release notes (2025)

## February

### Monthly release 2025.02.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Resource Collections APIs are now available in beta](#resource-collections-apis-are-now-available-in-beta) | February 5, 2025 |
| [Bug fixed in 2025.02.0](#bug-fixed-in-2025-02-0) | February 5, 2025 |

#### Resource Collections APIs are now available in beta

Resource collections allow you to create sets of apps and entitlements. These allow you to granularly define access to resources, which you can then grant to users based on their roles. See the Collections API in the [Okta Identity Governance API](https://developer.okta.com/docs/api/iga/).

#### Bug fixed in 2025.02.0

* The `okta.accessRequests.catalog.read` scope was missing from the Okta Identity Governance APIs. (OKTA-846162)