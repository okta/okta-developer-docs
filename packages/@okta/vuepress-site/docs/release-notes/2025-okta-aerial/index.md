---
title: Okta Aerial API release notes 2025
---

# Okta Aerial API release notes (2025)

The release notes lists customer-visible changes to the Okta Aerial API.

## November

### Monthly release 2025.11.0

| Change | Expected in Aerial Services |
|--------|-----------------------------|
| [Okta Aerial is GA]()| November 13, 2025 |

#### Okta Aerial is GA

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet condimentum metus. Nam sed neque ac turpis pharetra convallis eget eget leo. Nam suscipit lectus ut mauris vestibulum, sollicitudin dictum neque fringilla. Cras mattis nisi sodales ex luctus, quis vulputate nisi auctor. Nunc cursus nulla sit amet mattis hendrerit. Donec eu nisi mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed risus mollis, laoreet massa finibus, commodo est. Fusce sed sapien tempor, sollicitudin est facilisis, dictum purus. Vestibulum sed felis diam. Sed vestibulum massa tortor, sed tincidunt diam lacinia vitae.

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