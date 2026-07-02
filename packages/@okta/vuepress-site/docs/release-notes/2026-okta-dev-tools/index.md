---
title: Okta Developer Tools API release notes 2026
---

# Developer Tools release notes (2026)

<a href="/rss/dev-tools.xml">
  <img src="/img/icons/Feed-icon.svg" alt="RSS" width="20" height="20" />
  Subscribe to RSS
</a><br><br>

These release notes list customer-visible changes to the Developer Tools. The Okta's developer tooling ecosystem includes Terraform, SDKs, and CLI.

## July

### Monthly release 2026.07.0
<!-- Published on: 2026-07-01T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Manage resource owners](#manage-resource-owners) | July 1, 2026 |
| [Manage labels](#manage-labels) | July 1, 2026 |

#### Manage resource owners

You can now manage resource owners for Okta Identity Governance (OIG) using the Okta Terraform provider. This lets you dynamically assign, modify, revoke, or query ownership for resources such as apps, entitlements, and bundles. This helps you automate accountability and scale your governance delegation using Terraform. <!-- TODO: See [Manage resource owners](/docs/guides/terraform-oig-resources/main/#manage-resource-owners). OKTA-1158148 -->

#### Manage labels

You can now manage labels for Okta Identity Governance (OIG) resources using the Okta Terraform provider. This lets you define, modify, and delete custom labels to categorize apps, groups, and entitlements. This helps you automate resource organization and maintain a structured governance environment using Terraform. <!-- TODO: See [Manage labels](/docs/guides/terraform-oig-resources/main/#manage-labels). OKTA-1158146 -->

## June

### Monthly release 2026.06.0
<!-- Published on: 2026-06-04T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Manage identity sources with the Okta Terraform provider](#manage-identity-sources-with-the-okta-terraform-provider) | June 3, 2026 |

#### Manage identity sources with the Okta Terraform provider

You can now manage users, groups, and memberships within an Okta identity source using the Okta Terraform provider. This allows you to perform individual updates or large-scale bulk imports using an Infrastructure-as-Code (IaC) approach. This helps you automate and scale your identity data management efficiently. See [Manage identity source](/docs/guides/terraform-manage-id-source/main/).
<!-- OKTA-1163284 preview date: June 3, 2026 -->

## April

### Weekly release 2026.04.3
<!-- Published on: 2026-04-29T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Identity Threat Protection managed with Terraform](#identity-threat-protection-managed-with-terraform) | April 29, 2026 |

#### Identity Threat Protection managed with Terraform

You can now manage Okta Identity Threat Protection (ITP) using the Okta Terraform Provider. This allows admins to manage their entire threat protection surface using an Infrastructure-as-Code (IaC) approach, ensuring consistent, repeatable, and scalable security configurations. See [Manage Identity Threat Protection resources using Terraform](/docs/guides/terraform-manage-itp/main/). <!-- OKTA-1122778 -->