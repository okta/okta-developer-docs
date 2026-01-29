---
title: Okta Privileged Access API release notes 2026
---

# Okta Privileged Access API release notes (2026)

<a href="/rss/privileged-access.xml">
  <img src="/img/icons/Feed-icon.svg" alt="RSS" width="20" height="20" />
  Subscribe to RSS
</a><br><br>

Okta Privileged Access (OPA) is available for both Okta Classic Engine and Okta Identity Engine.

## January

### Weekly release 2026.01.2
<!-- Published on: 2026-01-29T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Service account password rotation](#service-account-password-rotation)| January 28, 2026 |

#### Service account password rotation

The [Okta Universal Directory Accounts](https://developer.okta.com/docs/api/openapi/opa/opa/tag/okta-universal-directory-accounts/#tag/okta-universal-directory-accounts/operation/oktaUDAccountRotatePassword) and [SaaS Application Accounts](https://developer.okta.com/docs/api/openapi/opa/opa/tag/saas-app-accounts/#tag/saas-app-accounts/operation/saasAppAccountRotatePassword) APIs now support password rotation for Service and SaaS accounts. Additionally, the new `skipRotation` parameter in the [Staged Service Accounts](https://developer.okta.com/docs/api/openapi/opa/opa/tag/staged-service-accounts/#tag/staged-service-accounts/operation/AssignStagedServiceAccount) API allows you to control whether a password rotates immediately upon assignment.

### Monthly release 2026.01.0
<!-- Published on: 2026-01-08T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Developer documentation update in 2026.01.0](#developer-documentation-update-in-2026-01-0) | January 7, 2026 |

#### Developer documentation update in 2026.01.0

The Okta API release notes now provide an RSS feed for each API release note category: [Classic Engine](/docs/release-notes/2026/), [Identity Engine](/docs/release-notes/2026-okta-identity-engine/), [Identity Governance](/docs/release-notes/2026-okta-identity-governance/), [Privileged Access](/docs/release-notes/2026-okta-privileged-access/), [Access Gateway](/docs/release-notes/2026-okta-access-gateway/), and [Aerial](/docs/release-notes/2026-okta-aerial/). Click the RSS icon to subscribe.