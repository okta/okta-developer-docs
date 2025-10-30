---
title: Okta Aerial API release notes 2024
---

# Okta Aerial API release notes (2024)

## December 2024

### Build version 1.52.0

The API response headers now use the `Link` header to return pagination values for use with the `after` and `before` query parameters, where supported. <!--OKTA-837914-->

## October 2024

### Build version 1.47.0

A new API, [Requests to delete an Org](https://developer.okta.com/docs/api/openapi/aerial/aerial/tag/Orgs/#tag/Orgs/operation/createDeletionRequest), is now available to request an org deletion. This endpoint only deletes orgs linked to the Aerial sandbox or for orgs belonging to accounts in the Okta Partner Program. <!--OKTA-665210-->

## September 2024

### Okta Identity Engine and Okta Classic Engine 2024.09.0

If the user was granted super admin access through group assignment, the Grant Okta Aerial access to your org API didn't work. (OKTA-794659)

### Build version 1.44.0

#### List all Associated Orgs

A new API, [List all Associated Orgs](https://developer.okta.com/docs/api/openapi/aerial/aerial/tag/Orgs/#tag/Orgs/operation/getAssociatedOrgs), is now available to list all orgs that belong to a customer account. Admins can view orgs that are linked to an Aerial account, as well as any other orgs not associated with an Aerial account. <!--OKTA-793298 -->

## August 2024

### Okta Identity Engine and Okta Classic Engine 2024.08.0

Org super admins can now provide consent for their orgs to be managed by an Aerial account. See [Grant Okta Aerial access to your Org](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/OrgSettingSupport/#tag/OrgSettingSupport/operation/grantAerialConsent). <!-- OKTA-750738 AERIAL_CONSENT -->

## February 2024

### Build version 1.20.0

#### System Log events available for child orgs

If a child org is linked to Okta Aerial, System Log events for product updates now appear in the org.

## January 2024

### Build version 1.11.0

#### Support added for DPoP

[Demonstrating Proof-of-Possession (DPoP)](https://datatracker.ietf.org/doc/html/rfc9449) is now supported by Okta Aerial. See [Okta Aerial overview](https://developer.okta.com/docs/api/openapi/aerial/guides/overview/#authentication).

## December 2023

### Build version 1.10.0

#### New property available for Okta Aerial API

A new `adminOrg` property is available for the `org` object of the Okta Aerial API. This property represents the Aerial org. A new filter allows admins to retrieve the Aerial org of their account (`filter=adminOrg eq true`). See [List all Orgs](/openapi/aerial/aerial/tag/Orgs/#tag/Orgs/operation/getOrgs).

#### Bug fixes

A PUT call to `/orgs/{orgId}/products` with an invalid product ID returned an error message that was unclear. (OKTA-627882)

