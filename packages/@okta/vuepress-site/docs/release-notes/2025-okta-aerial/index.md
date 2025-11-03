---
title: Okta Aerial API release notes 2025
---

# Okta Aerial API release notes (2025)

These release notes list customer-visible changes to the Okta Aerial API. Okta Aerial aligns with the Okta Classic and Okta Identity Engine release, but updates to the Aerial service deploy from outside their release dates.

* The Aerial services preview date are expected updates to the preview environment (`https://aerial-sandbox.okta.com`)

* The Aerial services production date are expected updates to the production environment (`https://aerial-apac.okta.com`)

See also [Introduction to the Okta Aerial API](https://developer.okta.com/docs/api/openapi/aerial/guides/overview/).

## November 2025

### Monthly release

| Change | Expected in Aerial services preview | Expected in Aerial services production |
|--------|-----------------------------| -----------------------------|
| [Okta Aerial is GA](#okta-aerial-is-ga)| November 4, 2025 | November 10, 2025 |

#### Okta Aerial is GA

Many organizations struggle with managing multiple Okta environments, leading to fragmented visibility and increased administrative overhead. Okta Aerial addresses these challenges by providing a centralized administration service that enables multi-org management from a single account. This solution introduces an account layer that allows administrators to view and manage all their Okta orgs, including both production and preview environments, from an Admin Console or through APIs. As a result, Okta Aerial simplifies the management of subscribed Okta products, helps achieve comprehensive multi-org visibility, and secures admin access, reducing the total cost of managing Okta for you and your partners.

See [Manage orgs with Okta Aerial](/docs/guides/manage-orgs-okta-aerial/) and [Okta Aerial](https://help.okta.com/okta_help.htm?type=aerial&id=overview).

## October 2025

### Okta Identity Engine and Okta Classic Engine 2025.10.0

* A call to the [Change the status of an org](https://developer.okta.com/docs/api/openapi/aerial/aerial/tag/Orgs/#tag/Orgs/operation/changeOrgStatus) API could set the parent org status to `INACTIVE`. (OKTA-688836)

* The default authorization server can no longer be renamed to `aerial`. <!-- OKTA-798863-->

## July 2025

### Okta Identity Engine and Okta Classic Engine 2025.07.3

When the `/orgs` and `/orgs/{orgId}` endpoints were called with an authorization header bearer token, the `_links` object wasn't returned. (OKTA-972061)

## March 2025

### Okta Identity Engine and Okta Classic Engine 2025.03.2

#### List all associated orgs API filters on status

The [List all associated orgs API](https://developer.okta.com/docs/api/openapi/aerial/aerial/tag/Orgs/#tag/Orgs/operation/getAssociatedOrgs!in=query&path=filter&t=request) can now filter on the org `status`.

### Okta Identity Engine and Okta Classic Engine 2025.03.0

#### Okta Aerial Console

Okta Aerial allows management of multiple Okta orgs from a single, centralized account. Use the Okta Aerial Console to view your Aerial account settings, and view the list of all orgs associated with your Aerial account as well as other available orgs. You can access the Okta Aerial Console from your Aerial org if you have super admin privileges. See [Okta Aerial](https://help.okta.com/en/programs/aerial/content/topics/aerial/overview.htm).

## February 2025

### Okta Identity Engine and Okta Classic Engine 2025.02.0

Super admins can now grant or revoke Okta Aerial consent in the Admin Console.