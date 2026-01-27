---
title: Okta Identity Governance API release notes 2026
---

# Okta Identity Governance API release notes (2026)

<a href="/rss/identity-governance.xml">
  <img src="/img/icons/Feed-icon.svg" alt="RSS" width="20" height="20" />
  Subscribe to RSS
</a><br><br>

Okta Identity Governance is available for both Okta Classic Engine and Okta Identity Engine.

## January

### Weekly release 2026.01.2

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2026.01.2](#bugs-fixed-in-2026-01-2)| January 28, 2026 |

#### Bugs fixed in 2026.01.2

* 

### Monthly release 2026.01.0
<!-- Published on: 2026-01-08T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Security access reviews API is GA in Production](#security-access-reviews-api-is-ga-in-production) | September 10, 2025 |
| [Permalink ID in V1 access request is Beta](#permalink-id-in-v1-access-request-is-beta) | January 8, 2026 |
| [AD group support in Access Requests is GA in Production](#ad-group-support-in-access-requests-is-ga-in-production) | December 10, 2025 |
| [My Access Certification Reviews API is Beta](#my-access-certification-reviews-api-is-beta) | January 8, 2026 |
| [Developer documentation updates in 2026.01.0](#developer-documentation-update-in-2026-01-0) | January 7, 2026 |

#### Security access reviews API is GA in Production

Security access reviews are a new, security-focused type of access review that can be automatically triggered by events. These reviews provide a unified view of a user's access and contextual information about their access history. Also included is an AI-generated access summary, allowing you to investigate and take immediate remediation actions, such as revoking access.
See [Security Access Reviews](https://help.okta.com/okta_help.htm?type=oie&id=csh-sar) in the product documentation.

See the [Security Access Reviews](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Security-Access-Reviews/) API and [Launch a security access review](/docs/guides/iga-security-access-review/main/) guide for details on how to trigger security access reviews through the API.

<!-- OKTA-1002587 IGA_SECURITY_ACCESS_REVIEW Preview date: Sept 10, 2025 -->

#### Permalink ID in V1 access request is Beta

<ApiLifecycle access="beta" />

A new `permalinkId` property is returned in [V1 access request](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Requests/) responses. This property is a user-friendly, immutable identifier that resolves to the request. Users can use this identifier (in the form of a permalink) to navigate back to the request on the web page. See [`permalinkId`](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Requests/#tag/Requests/operation/getRequest!c=200&path=0/permalinkId&t=response).
<!-- OKTA-1060094 Preview date: Jan 8, 2026 -->

#### AD group support in Access Requests is GA in Production

Users can now request access to Active Directory (AD)-sourced groups directly within Access Requests. This enhancement enables seamless governance and automatically fulfills and revokes (if time-bound) access in AD, strengthening your security posture and eliminating the need for duplicate groups or custom Workflows.

You must have [Bidirectional Group Management with Active Directory](https://help.okta.com/okta_help.htm?type=oie&id=ad-bidirectional-group-mgmt) configured in your org to have governance AD group support. See [Access governance for AD groups](https://help.okta.com/okta_help.htm?type=oie&id=ad-bidirectional-group-mgt-configure).

For users to request access to AD groups, admins must first create a request condition with an AD-sourced group access scope. Use the [Create a request condition](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v2/tag/Request-Conditions/#tag/Request-Conditions/operation/createResourceRequestConditionV2) request and set `accessScopeSettings.type` to `GROUP`. In the `accessScopeSettings.group` list, specify your AD-sourced group IDs that are requestable.
<!-- OKTA-1059727, OKTA-1036354 ACCESS_REQUEST_AD_GROUPS Preview date: Dec 10, 2025 -->

#### My Access Certification Reviews API is Beta

<ApiLifecycle access="beta" />

The [My Access Certification Reviews](https://developer.okta.com/docs/api/iga/openapi/governance.requests.enduser.v2/tag/My-Access-Certification-Reviews/#tag/My-Access-Certification-Reviews) API enables end users to retrieve reviews and associated details assigned to them. The responses from this API are specifically for the authenticated user (the end user) making the request. See [List all managed connections for my review](https://developer.okta.com/docs/api/iga/openapi/governance.requests.enduser.v2/tag/My-Access-Certification-Reviews/#tag/My-Access-Certification-Reviews/operation/listMyManagedConnections).
<!-- OKTA-1057908 Preview date: Jan 8, 2026 -->

#### Developer documentation updates in 2026.01.0

* The new [Manage Okta Identity Governance resources using Terraform](/docs/guides/terraform-oig-resources/main/) guide explains how to manage Okta Identity Governance (OIG) resources with Terraform. It details how to create, import, and modify OIG resources using your Terraform configuration.
* The Okta API release notes now provide an RSS feed for each API release note category: [Classic Engine](/docs/release-notes/2026/), [Identity Engine](/docs/release-notes/2026-okta-identity-engine/), [Identity Governance](/docs/release-notes/2026-okta-identity-governance/), [Privileged Access](/docs/release-notes/2026-okta-privileged-access/), [Access Gateway](/docs/release-notes/2026-okta-access-gateway/), and [Aerial](/docs/release-notes/2026-okta-aerial/). Click the RSS icon to subscribe.
