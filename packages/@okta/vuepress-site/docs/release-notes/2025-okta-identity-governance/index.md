---
title: Okta Identity Governance API release notes 2025
---

# Okta Identity Governance API release notes (2025)

Okta Identity Governance is available for both Okta Classic and Identity Engine.

## December

### Monthly release 2025.12.0
<!-- Published on: 2025-12-10T00:00:00Z -->
| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Revoke a principal's access is Beta](#revoke-a-principal-s-access-is-beta) | December 10, 2025 |
| [Entitlement Settings API is Beta](#entitlement-settings-api-is-beta) | December 10, 2025 |
| [Entitlement-value ORN property in principal access for a resource is Beta](#entitlement-value-orn-property-in-principal-access-for-a-resource-is-beta) | December 10, 2025 |
| [Access Requests escalation settings is Beta](#access-requests-escalation-settings-is-beta) | December 10, 2025 |
| [AD group support in Access Requests is GA in Preview](#ad-group-support-in-access-requests-is-ga-in-preview) | December 10, 2025 |
| [Collections support in Resource Owners API is Beta](#collections-support-in-resource-owners-api-is-beta) | December 10, 2025 |
| [Certify service accounts is EA](#certify-service-accounts-is-ea) | December 10, 2025 |

#### Revoke a principal's access is Beta

<ApiLifecycle access="beta" />

Admins can now revoke a principal user's access to specific resources. Admins can revoke a user’s access to entitlements values, entitlement bundles, or apps. This new functionality gives admins more granular control over user access grants. See [Revoke a principal’s access](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/principal-access-v2/revokeprincipalaccess) in the Principal Access - V2 API.
<!-- OKTA-1063937 Beta Preview: Dec 10, 2025 -->

#### Entitlement Settings API is Beta

<ApiLifecycle access="beta" />

Admins can now opt in (enable) or opt out of (disable) entitlement management for resources in Okta. This feature allows you to manage third-party app entitlements in Okta.
See the [Entitlement Settings](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Entitlement-Settings/) API.

You can also access this feature from the Admin Console. See [Enable Entitlement management](https://help.okta.com/okta_help.htm?type=oie&id=csh-enable-ge).
<!-- OKTA-1063936 Beta Preview date: Dec 10, 2025 -->

#### Entitlement-value ORN property in principal access for a resource is Beta

<ApiLifecycle access="beta" />

The entitlement-value resource, in Okta resource name (ORN) format, is now returned in the [Retrieve the principal access for a resource](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/principal-access/getprincipalaccess) response for both `base` and `additional` grants. See the `orn` property in the `base` [entitlement-value grants list](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/principal-access/getprincipalaccess#principal-access/getprincipalaccess/t=response&c=200&path=base/entitlements/values/orn) and in the `additional` [entitlement-value grants list](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/principal-access/getprincipalaccess#principal-access/getprincipalaccess/t=response&c=200&path=additional/entitlements/values/orn) of the response payload.
<!-- OKTA-1063871, Preview date: Dec 10, 2025 -->

#### Access Requests escalation settings is Beta

<ApiLifecycle access="beta" />

Requesters can now quickly unblock themselves when a task assignee (such as a task approver) is unavailable by self-escalating the task to an additional assignee (the original approver's manager). This secure and auditable feature prevents bottlenecks, ensuring timely access to critical resources.
See the `escalations` settings in the [Org Governance Settings](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Org-Governance-Settings/) API.

Also see [Escalate task](https://help.okta.com/okta_help.htm?type=oie&id=csh-escl-task) and [Allow requesters to escalate tasks](https://help.okta.com/okta_help.htm?type=oie&id=csh-req-escl-task) in the product documentation.
<!-- OKTA-1062448, OKTA-1051948 ATSPOKE_ESCALATIONS Preview date: Dec 10, 2025 -->

#### AD group support in Access Requests is GA in Preview

Users can now request access to Active Directory (AD)-sourced groups directly within Access Requests. This enhancement enables seamless governance and automatically fulfills and revokes (if time-bound) access in AD, strengthening your security posture and eliminating the need for duplicate groups or custom Workflows.

You must have [Bidirectional Group Management with Active Directory](https://help.okta.com/okta_help.htm?type=oie&id=ad-bidirectional-group-mgmt) configured in your org to have governance AD group support. See [Access governance for AD groups](https://help.okta.com/okta_help.htm?type=oie&id=ad-bidirectional-group-mgt-configure).

For users to request access to AD groups, admins must first create a request condition with an AD-sourced group access scope. Use the [Create a request condition](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/request-conditions) request and set `accessScopeSettings.type` to `GROUP`. In the `accessScopeSettings.group` list, specify your AD-sourced group IDs that are requestable.
<!-- OKTA-1059727, OKTA-1036354 ACCESS_REQUEST_AD_GROUPS Preview date: Dec 10, 2025 -->

#### Collections support in Resource Owners API is Beta

<ApiLifecycle access="beta" />

Admins can now set owners for collection resources with the [Resource Owners](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Resource-Owners/) API. Specify the collection resources by their Okta Resource Names (ORNs) in the `resourceOrns` parameter. See [Configure the resource owners](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/resource-owners/configureresourceowners) request.
<!-- OKTA-1051993 Beta Preview date: Dec 10, 2025 -->

#### Certify service accounts is EA

You can now create resource campaigns to review and certify access for both SaaS application and Okta service accounts. This feature extends your governance strategy to non-human identities, ensuring you maintain visibility and control over critical service account access. See [Okta Privilege Access with Access Certification](https://help.okta.com/okta_help.htm?type=oie&id=csh-certify-service-accounts).

The following API updates have been made to support service account campaigns:
* New `OKTA_SERVICE_ACCOUNT` and `APP_SERVICE_ACCOUNT` options in the [resourceSettings.type](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/campaigns/createcampaign#campaigns/createcampaign/t=request&path=resourcesettings/type) property of a campaign.
* New [`resourceSettings.includeAllOktaServiceAccounts`](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/campaigns/createcampaign#campaigns/createcampaign/t=request&path=resourcesettings/includealloktaserviceaccounts) property for `resourceSettings.type` of `OKTA_SERVICE_ACCOUNT` in a campaign.
* New [`resourceSettings.targetResources.includeAllAppServiceAccounts`](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/campaigns/createcampaign#campaigns/createcampaign/t=request&path=resourcesettings/targetresources/includeallappserviceaccounts) property for `resourceSettings.type` of `APP_SERVICE_ACCOUNT` in a campaign.
* Reviews can be filtered by service account ID (`appServiceAccountId` or `oktaServiceAccountId`) in [List all reviews](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Reviews/listReviews).
<!-- OKTA-1047480 IGA_ACCESS_CERT_SERVICE_ACCOUNTS Preview: Dec 10, 2025 -->

## November

### Monthly release 2025.11.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Entitlement history is GA in Production](#entitlement-history-is-ga-in-production) | September 10, 2025 |
| [Security access reviews API is GA in Preview](#security-access-reviews-api-is-ga-in-preview) | September 10, 2025 |
| [Security access review manual remediation](#security-access-review-manual-remediation) | November 5, 2025 |
| [Security access review updates](#security-access-review-updates) | November 5, 2025 |
| [Org Governance Settings API updates](#org-governance-settings-api-updates) | November 5, 2025 |
| [Enrollment change is Beta](#enrollment-change-is-beta) | November 5, 2025 |

#### Entitlement history is GA in Production

Admins can now access a user's entitlement history. This feature improves auditing and compliance tasks and enhances visibility for troubleshooting access issues. See [Retrieve an entitlement history](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Principal-Entitlements/getPrincipalEntitlementsHistory) in the Principal Entitlements API.

You can also access this feature from the Admin Console. See [View user entitlements](https://help.okta.com/okta_help.htm?type=oie&id=view-user-entitlements) in the product documentation. <!-- OKTA-992288 OKTA-992282 IGA_ENTITLEMENTS_HISTORY Preview-date: Sept 10, 2025 (as Beta) -->

#### Security access review manual remediation

For access and sub-access items where the access revocation or restoration can’t be automated in a security access review, you can flag them for manual remediation. This is typically due to an access assignment through a group rule, an entitlement policy, a collection, or an unsupported resource.
When you flag the access item for manual remediation, Okta fires an `access.review.action` System Log event.

See [`supportedActions`](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/security-access-reviews/listsecurityaccessreviewaccesses#security-access-reviews/listsecurityaccessreviewaccesses/t=response&c=200&path=data/supportedactions), [`manualRemediationTypes`](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/security-access-reviews/listsecurityaccessreviewaccesses#security-access-reviews/listsecurityaccessreviewaccesses/t=response&c=200&path=data/manualremediationtypes), and [`remediationStatus`](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/security-access-reviews/listsecurityaccessreviewaccesses#security-access-reviews/listsecurityaccessreviewaccesses/t=response&c=200&path=data/remediationstatus).
<!--OKTA-1001463 IGA_SECURITY_ACCESS_REVIEW Preview date: Nov 5, 2025 -->

#### Security access reviews API is GA in Preview

Security access reviews are a new, security-focused type of access review that can be automatically triggered by events. These reviews provide a unified view of a user's access and contextual information about their access history. Also included is an AI-generated access summary, allowing you to investigate and take immediate remediation actions like revoking access.

See [Security Access Reviews](https://help.okta.com/okta_help.htm?type=oie&id=csh-sar) in the product documentation. See the [Security Access Reviews](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Security-Access-Reviews/) API and [Launch a security access review](/docs/guides/iga-security-access-review/main/) guide for details on how to trigger security access reviews through the API.
<!-- OKTA-1002587 IGA_SECURITY_ACCESS_REVIEW Preview date: Sept 10, 2025 -->

#### Security access review updates

You can now update the reviewers and extend the review's end date on a security access review. See [Update a security access review](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Security-Access-Reviews/updateSecurityAccessReview).
<!-- OKTA-1007825 OKTA-1007827 IGA_SECURITY_ACCESS_REVIEW Preview date: Nov 5, 2025 -->

#### Org Governance Settings API updates

* To access the Org Governance Settings API, admins now need to have the super admin (`SUPER_ADMIN`) role.

* The Org Governance Settings API now includes a security access review setting that allows users to generate AI summaries. When this setting is enabled, all security access reviewers in the org can generate AI-powered summaries for user access insights. See [`governanceAI`](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/org-governance-settings/updateorgsettings#org-governance-settings/updateorgsettings/t=request&path=governanceai) in [Update the org settings](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Org-Governance-Settings/updateOrgSettings) operation. <!-- OKTA-1028575, OKTA-1024002, Preview date: Nov 5, 2025 -->

#### Enrollment change is Beta

<ApiLifecycle access="beta" />

Admins can now access a user's entitlement changes for a resource. This feature enhances visibility for troubleshooting access issues. See [Retrieve the principal entitlement changes](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Principal-Entitlements/getPrincipalEntitlementsChanges) in the Principal Entitlements API. <!-- OKTA-1045028 Preview date: Nov 5, 2025 -->

## October

### Weekly release 2025.10.2

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bug fixed in 2025.10.2](#bug-fixed-in-2025-10-2)| October 29, 2025 |

#### Bug fixed in 2025.10.2

The [Access Request - V2](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/Requests/) APIs didn’t support the client credentials authentication flow. (OKTA-1044065)

### Weekly release 2025.10.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bug fixed in 2025.10.1](#bug-fixed-in-2025-10-1)| October 15, 2025 |

#### Bug fixed in 2025.10.1

The client credential flow for API service apps didn’t work for some governance API requests. (OKTA-926552)

### Monthly release 2025.10.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Entitlement history is Beta](#entitlement-history-is-beta)| September 10, 2025 |
| [New governance setting System Log event](#new-governance-setting-system-log-event)| October 8, 2025 |
| [Auditor reporting package is GA](#auditor-reporting-package-is-ga)| August 13, 2025 |

#### Entitlement history is Beta

<ApiLifecycle access="beta" />

Admins can now access a user's entitlement history. This feature improves auditing and compliance tasks and enhances visibility for troubleshooting access issues. See [Retrieve an entitlement history](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Principal-Entitlements/getPrincipalEntitlementsHistory) in the Principal Entitlements API.

You can also access this feature from the Admin Console. See [View user entitlements](https://help.okta.com/okta_help.htm?type=oie&id=view-user-entitlements) in the product documentation.
<!-- OKTA-992288 OKTA-992282 IGA_ENTITLEMENTS_HISTORY Preview-date: Sept 10, 2025 (as Beta) -->

#### New governance setting System Log event

The [`governance.settings.update`](https://developer.okta.com/docs/reference/api/event-types/?q=governance.settings.update) System Log event is triggered when super admins update the delegate settings to allow or block users from assigning their own delegate.
<!-- OKTA-1005733 Preview date: Oct 8, 2025 -->

#### Auditor reporting package is GA

You can now generate access certification campaign reports that are tailored to meet auditor requirements. These reports make preparing for compliance audits faster and easier by reducing the time and manual effort required for assembling and exporting campaign and user access data.

Access certification campaign reports are generated from the auditor reporting package, which is triggered post-campaign completion when the `createReportingPackageEnabled` parameter is true. See [`reportingSettings.createReportingPackageEnabled`](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/campaigns/createcampaign#campaigns/createcampaign/t=request&path=reportingsettings) in the [Create a campaign](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Campaigns/createCampaign) resource.
<!--OKTA-982353 IGA_ACCESS_CERT_AUDITOR_REPORTING Preview date: August 13, 2025 -->

## September

### Weekly release 2025.09.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2025.09.1](#bugs-fixed-in-2025-09-1)| September 17, 2025 |

#### Bugs fixed in 2025.09.1

* The list entitlement bundles request (`GET /governance/api/v1/entitlement-bundles`) returned an error when the `name` filter had a single quote. (OKTA-1007878)
* The retrieve principal entitlements request (`GET /governance/api/v1/principal-entitlements`) returned an invalid-condition error when a resource ORN was used in the filter. (OKTA-928086)

### Monthly release 2025.09.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Auditor reporting package is self-service EA](#auditor-reporting-package-is-self-service-ea)| August 13, 2025 |
| [Entitlement bundle documented response updates](#entitlement-bundle-documented-response-updates)| September 10, 2025 |
| [Resource Owners API is Beta](#resource-owners-api-is-beta)| September 10, 2025 |
| [Governance Labels API is Beta](#governance-labels-api-is-beta)| September 10, 2025 |
| [ORN property included in collections](#orn-property-included-in-collections)| September 10, 2025 |
| [ORN property included in entitlement bundles and values](#orn-property-included-in-entitlement-bundles-and-values)| September 10, 2025 |
| [Org Governance Settings API is Beta](#org-governance-settings-api-is-beta)| September 10, 2025 |
| [Security Access Reviews API is EA](#security-access-reviews-api-is-ea)| September 10, 2025 |
| [Developer documentation updates in 2025.09.0](#developer-documentation-updates-in-2025-09-0)| September 10, 2025 |

#### Auditor reporting package is self-service EA

You can now generate access certification campaign reports that are tailored to meet auditor requirements. These reports make preparing for compliance audits faster and easier by reducing the time and manual effort required for assembling and exporting campaign and user access data.

Access certification campaign reports are generated from the auditor reporting package, which is triggered post-campaign completion when the `createReportingPackageEnabled` parameter is true. See [`reportingSettings.createReportingPackageEnabled`](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/campaigns/createcampaign#campaigns/createcampaign/t=request&path=reportingsettings/createreportingpackageenabled) in the [Create a campaign](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/campaigns/createcampaign) resource.
<!--OKTA-982353 IGA_ACCESS_CERT_AUDITOR_REPORTING Preview date: August 13, 2025 -->

#### Entitlement bundle documented response updates

The documented response for [List all entitlement bundles](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/entitlement-bundles/listentitlementbundles#entitlement-bundles/listentitlementbundles/response&c=200/body) and [Retrieve an entitlement bundle](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/entitlement-bundles/getentitlementbundle#entitlement-bundles/getentitlementbundle/response&c=200/body) has been updated to remove the **One of** (`oneOf`) payload structure. The documented response payload is now flattened to include properties for both `entitlement-bundles-list` and `entitlement-bundles-list-with-entitlements` schemas. This is backward-compatible because the expected returned response schema is the same as before.
<!-- OKTA-985836 Preview date: Sept 10, 2025 -->

#### Resource Owners API is Beta

<ApiLifecycle access="beta" />

Drive automation and simplify Okta Identity Governance (OIG) configuration by assigning owners to resources, such as apps, groups, and entitlements. You can automatically assign reviewers for access certifications that are scoped with specific owner-assigned resources. See the [Resource Owners](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Resource-Owners/) API to manage assigning owners to resources in your OIG org.
<!-- OKTA-998871 IGA_RESOURCE_OWNERS Preview date: Sept 10, 2025 -->

#### Governance Labels API is Beta

<ApiLifecycle access="beta" />

The Labels API enables you to categorize and organize resources, such as apps, groups, entitlements, and collections. You can create, update, and assign key-value labels to resources to support automation, streamline configuration, and simplify the management of access reviews and requests. See the [Labels](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Labels/) API and [Manage governance labels](/docs/guides/iga-labels/).
<!-- OKTA-998873 IGA_RESOURCE_LABELS Preview date: Sept 10, 2025 -->

#### ORN property included in collections

Collection resources now include their [Okta resource name (ORN)](https://developer.okta.com/docs/api/openapi/okta-management/guides/roles/#okta-resource-name-orn) in the response payload. See the `orn` property in the [collection resource](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/collections/createcollection#collections/createcollection/t=response&c=201&path=orn).
<!-- OKTA-986274 Preview date: Sept 10, 2025 -->

#### ORN property included in entitlement bundles and values

The entitlement bundle and value resources now include their [Okta resource name (ORN)](https://developer.okta.com/docs/api/openapi/okta-management/guides/roles/#okta-resource-name-orn) in the response payload. See the `orn` property in the [entitlement value response]https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/entitlements/listentitlementvalues#entitlements/listentitlementvalues/t=response&c=200&path=data/orn) and in the [entitlement bundles response](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/entitlement-bundles/getentitlementbundle#entitlement-bundles/getentitlementbundle/t=response&c=200&path=orn) payloads.
<!-- OKTA-986269 Preview date: Sept 10, 2025 -->

#### Org Governance Settings API is Beta

<ApiLifecycle access="beta" />

To complement the [Governance delegates](#governance-delegates-apis-are-beta) feature, admins can now configure whether end users can set their own delegates with the Org Governance Settings API. See [delegates.enduser.permissions](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/org-governance-settings/updateorgsettings#org-governance-settings/updateorgsettings/t=request&path=delegates/enduser/permissions) in the [Update the org settings](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Org-Governance-Settings/updateOrgSettings) API.

End users can also view their delegate permissions in the My Settings API. See [delegates.permissions](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/my-settings/getmysettings#my-settings/getmysettings/t=response&c=200&path=delegates/permissions) in the [Retrieve the settings](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/My-Settings/getMySettings) API.
<!-- OKTA-982882 OKTA-987070 GOVERNANCE_DELEGATES FF Preview date: Sept 10, 2025 -->

#### Security Access Reviews API is EA

Security Access Reviews are a new, security-focused type of access review that can be automatically triggered by events. These reviews provide a unified view of a user's access and contextual information about their access history. Also included is an AI-generated access summary, allowing you to investigate and take immediate remediation actions like revoking access. See [Security Access Reviews](https://help.okta.com/okta_help.htm?type=oie&id=csh-sar) in the product documentation.

See the [Security Access Reviews](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Security-Access-Reviews/) API and [Launch a security access review](/docs/guides/iga-security-access-review/main/) guide for details on how to trigger security access reviews through the API.
<!-- OKTA-1002587 IGA_SECURITY_ACCESS_REVIEW Preview date: Sept 10, 2025 -->

#### Developer documentation updates in 2025.09.0

* Best practice implementations of API use cases are now available for Identity Governance. See **Identity Governance** in the [Guides](/docs/guides/identity-governance/) sidebar.

* Okta Identity Governance campaigns and entitlements can now be managed using the Okta Terraform Provider. This enables customers to manage their governance tasks and configure other resources in their Okta org that are maintained through the Terraform Infrastructure-as-Code tool. For more information, refer to  [Terraform Provider for Okta](https://github.com/okta/terraform-provider-okta) and the [Terraform Registry](https://registry.terraform.io/providers/okta/okta/latest/docs) documentation.

## August

### Weekly release 2025.08.2

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bug fixed in 2025.08.2](#bug-fixed-in-2025-08-2)| August 20, 2025 |

#### Bug fixed in 2025.08.2

The List all grants API operation ( `GET /governance/api/v1/grants`) returned an incorrect number of objects. (OKTA-995619)

### Monthly release 2025.08.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Governance delegates APIs are Beta](#governance-delegates-apis-are-beta) | August 7, 2025 |
| [List all access request catalog entries for a user is GA](#list-all-access-request-catalog-entries-for-a-user-is-ga) | July 16, 2025|
| [Unified requester experience is EA](#unified-requester-experience-is-ea) | July 16, 2025 |
| [Developer documentation updates in 2025.08.0](#developer-documentation-updates-in-2025-08-0) | August 7, 2025 |
| [Bug fixed in 2025.08.0 ](#bug-fixed-in-2025-08-0) | August 7, 2025 |

#### Governance delegates APIs are Beta

<ApiLifecycle access="beta" />

Super admins and users can assign delegates to complete governance tasks. These include access certification campaign reviews and access request approvals, questions, and tasks. When approvers are unavailable, their tasks can be assigned to different stakeholders ( delegates) for a period of time to ensure that governance processes don't stall. This also reduces the time admins and users spend reassigning requests and reviews manually.

The following APIs support the governance delegates flow and are available as Beta:

* Principal Settings API > [Update the principal settings](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Principal-Settings/updatePrincipalSettings)
* Delegates > [List all delegate appointments](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Delegates/listDelegateAppointments)
* My Settings > [Retrieve the settings](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/My-Settings/getMySettings)
* My Settings > [Update the settings](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/My-Settings/updateMySettings)
* My Settings > [List the eligible delegate users](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/My-Settings/listMyDelegateUsers)
<!-- OKTA-987070 GOVERNANCE_DELEGATES FF -->

#### List all access request catalog entries for a user is GA

The [List all access request catalog entries for a user](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/Catalogs/listAllDefaultUserEntriesV2) (`GET /governance/api/v2/catalogs/default/user/{userId}/entries`) operation is now included in the **Access Requests - V2** > [Catalogs](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/Catalogs/) API. As an admin, use this operation to list access request catalog entries for a user. A filter expression query parameter is required to specify the set of entries in the response.
<!-- [OKTA-954146] [OKTA-915784] [OKTA-975991], used for (but not dependent on) ACCESS_REQUESTS_UNIFIED_CATALOG -->

#### Unified requester experience is EA

Use this feature to create a consistent and unified experience for initiating requests in End-User Dashboard, Slack, and Microsoft Teams regardless of whether the request is managed by conditions or request types. This gives you the flexibility to use either or both methods together to manage resource access without altering the requester experience.

* Request types now appear as tiles in the End-User Dashboard's resource catalog alongside other resources. Your settings for a request type's audience continue to govern which users can view the request type on their dashboard and request access.
* In Slack and Microsoft Teams, users can now request access to resources that are governed by access request conditions, and the user experience for requesting resources that are managed by request types has also been changed.

Additionally, in the Okta Access Requests app, the **Access requests** page has been renamed to **Resource catalog** and clicking it redirects requesters to the resource catalog on the End-User Dashboard. The **Request types** section in the web app is only visible to admins and team members who own the request type. See [Create requests](https://help.okta.com/okta_help.htm?type=oie&id=ext-ar-create-manage-reqs).

This is an Early Access feature. See [Enable self-service features](https://developer.okta.com/docs/api/openapi/okta-management/guides/release-lifecycle/#early-access-ea).

The following Access Request API updates have been made to support the unified requester experience:

* New `REQUEST_TYPE` option for [accessScopeType](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/requests/listallrequestsv2#requests/listallrequestsv2/t=response&c=200&path=data/requested/accessscopetype) in the [Requests](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/Requests/) API
* New [validRequestOnBehalfOfSettings](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/request-settings/getrequestsettingsv2#request-settings/getrequestsettingsv2/t=response&c=200&path=validrequestonbehalfofsettings) property for [Request Settings](
https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/Request-Settings/) API
* [Related entry link updates for catalog entry responses](#related-entity-link-updates-for-catalog-entry-responses)
* [List all access request catalog entries for a user](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/Catalogs/listAllDefaultUserEntriesV2) <!-- OKTA-968620 ACCESS_REQUESTS_UNIFIED_CATALOG EA Preview and Prod -->

#### Developer documentation updates in 2025.08.0

The **Archived Okta Identity Governance API changelog (2023-2024)** has been removed.

#### Bug fixed in 2025.08.0

The filtered entitlement bundles request (`GET /governance/api/v1/entitlement-bundles`) with the contains (`co`) operator didn't sort results by the substring's location within the `name` field.

## July

### Weekly release 2025.07.2

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Related entity link updates for catalog entry responses](#related-entity-link-updates-for-catalog-entry-responses)| July 16, 2025 |
| [Bug fixed in 2025.07.2](#bug-fixed-in-2025-07-2)| July 16, 2025 |

#### Related entity link updates for catalog entry responses

The `_links.relatedEntity` (or `data._links.relatedEntity`) property is now returned for parent catalog entries, in addition to child entries, for the following operations:

* [List all entries for the default access request catalog](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/Catalogs/listAllDefaultEntriesV2)
* [Retrieve a catalog entry](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/Catalogs/getCatalogEntryV2)
* [List all of my entries for the default access request catalog](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/My-Catalogs/listMyDefaultEntriesV2)
* [Retrieve an entry from my catalog](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/My-Catalogs/getMyEntryV2)
* [List all of my catalog entry users](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/My-Catalogs/listMyEntryUsersV2)
<!--OKTA-958888 -->

#### Bug fixed in 2025.07.2

A null pointer exception occurred when a `PUT /governance/api/v1/collections/{collecionId}/resources/{resourceId}` request was made on a collection without resources. (OKTA-970817)

### Monthly release 2025.07.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Changes to Okta app API responses](#changes-to-okta-app-api-responses) | July 7, 2025 |

#### Changes to Okta app API responses

The following Okta apps won't be returned in the API response for endpoints that list apps (such as the [List all applications](https://developer.okta.com/docs/api/openapi/okta-management/management/application/listapplications) `GET /api/vi/apps` endpoint):

* Okta Access Certifications (key name: `okta_iga`)
* Okta Access Requests Admin (key name: `okta_access_requests_admin`)
* Okta Entitlement Management (key name: `okta_entitlement_management`)

In addition, a single app retrieval endpoint won't return these apps either. For example: `GET /api/v1/apps/{appId}` won't return the app object if `{appId}` is the ID for the `okta_iga`, `okta_access_requests_admin`, or `okta_entitlement_management` apps in your org.
<!-- OKTA-871526 ENG_ENABLE_UI_ADMIN_OIDC_APP -->

## June

### Weekly release 2025.06.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [List all access request catalog entries for a user is Beta](#list-all-access-request-catalog-entries-for-a-user-is-beta)| June 17, 2025 |

#### List all access request catalog entries for a user is Beta

<ApiLifecycle access="beta" />

The [List all access request catalog entries for a user](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/Catalogs/listAllDefaultUserEntriesV2) (`GET /governance/api/v2/catalogs/default/user/{userId}/entries`) operation is now included in the **Access Requests - V2** > [Catalogs](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/Catalogs/) API. As an admin, use this operation to list access request catalog entries for a particular user. A filter expression query parameter is required to specify the set of entries in the response.
<!-- OKTA-954146 OKTA-915784, used for (but not dependent on) ACCESS_REQUESTS_UNIFIED_CATALOG -->

## May

### Weekly release 2025.05.3

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Request condition name length increase](#request-condition-name-length-increase)| May 29, 2025 |

#### Request condition name length increase

The [Request Condition API](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/Request-Conditions/) has increased the length of the request condition `name` from 50 to 255 characters.
<!-- OKTA-931650 -->

### Weekly release 2025.05.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [New variable for Access Certification campaign emails](#new-variable-for-access-certification-campaign-emails)| May 14, 2025 |
| [Generate a risk assessment is Beta](#generate-a-risk-assessment-is-beta)| May 14, 2025 |

#### New variable for Access Certification campaign emails

You can now include the campaign description in your customized Access Certification campaign email notifications. See the new `${campaign.campaignDescription}` variable in [Use VTL variables](https://developer.okta.com/docs/guides/custom-email/main/#use-vtl-variables).
<!-- OKTA-912806 -->

#### Generate a risk assessment is Beta

<ApiLifecycle access="beta" />

The [Generate a risk assessment](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Risk-Rules/generatePotentialRiskAssessments) operation is now included in the [Risk Rules API](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Risk-Rules/). This operation requires the `okta.governance.riskRule.read` OAuth 2.0 scope. Use this resource to evaluate potential separation of duties (SOD) violations when a user requests entitlements.
<!-- IGA-SEPARATION-OF-DUTIES OKTA-899035 -->

## April

### Monthly release 2025.04.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Risk Rules API is Beta](#risk-rules-api-is-beta) | April 2, 2025 |

#### Risk Rules API is Beta

<ApiLifecycle access="beta" />

The [Risk Rules API](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Risk-Rules/) is now available in Beta and includes the following new scopes:

* `okta.governance.riskRule.manage`
* `okta.governance.riskRule.read`

Use this API to define risk rules to support separation of duties (SOD) in Access Certifications and Access Requests.

The following new properties were added to support the SOD feature in existing Identity Governance resources:

* Campaigns resource: [`principalScopeSettings.onlyIncludeUsersWithSODConflicts`](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/campaigns/getcampaign#campaigns/getcampaign/t=response&c=200&path=principalscopesettings/onlyincludeuserswithsodconflicts)

* Reviews resource: [`riskRuleConflicts`](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/reviews/getreview#reviews/getreview/t=response&c=200&path=riskruleconflicts)

* Request Settings: [`validRiskSettings`](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/request-settings/getrequestsettingsv2#request-settings/getrequestsettingsv2/t=response&c=200&path=validrisksettings) and [`riskSettings`](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/request-settings/getrequestsettingsv2#request-settings/getrequestsettingsv2/t=response&c=200&path=risksettings)

See [Separation of duties](https://help.okta.com/okta_help.htm?type=oie&id=separation-of-duties) in the product documentation. <!-- IGA_SEPARATION_OF_DUTIES, OKTA-896397-->

## March

### Weekly release 2025.03.2

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Collections API is Beta](#collections-api-is-beta)| March 19, 2025 |

#### Collections API is Beta

<ApiLifecycle access="beta" />

The [Collections API](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Collections/) is available in Beta. This API allows you to manage sets of apps and entitlements. See [Resource collections](https://help.okta.com/okta_help.htm?type=oie&id=csh-rc). <!-- OKTA-856259 -->

### Weekly release 2025.03.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bug fixed in 2025.03.1](#bug-fixed-in-2025-03-1)| March 12, 2025 |

#### Bug fixed in 2025.03.1

The `requestOnBehalfOfSettings` property wasn’t validated for `DIRECT_REPORT` when a user calls the [Retrieve an entry’s request fields](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/My-Catalogs/getMyCatalogEntryRequestFieldsV2) (`GET /governance/api/v2/my/catalogs/default/entries/{entryId}/request-fields`). (OKTA-807528)

### Monthly release 2025.03.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Entitlements and Entitlement Bundles APIs are GA](#entitlements-and-entitlement-bundles-apis-are-ga) | March 5, 2025 |
| [New Access Certifications campaign](#new-access-certifications-campaign) | March 5, 2025 |
| [Bug fixed in 2025.03.0](#bug-fixed-in-2025-03-0) | March 5, 2025 |

#### Entitlements and Entitlement Bundles APIs are GA

The following APIs have transitioned from Beta to GA:

* [Entitlements](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Entitlements/)

* [Entitlement Bundles](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Entitlement-Bundles)
<!-- OKTA-849932 -->

#### New Access Certifications campaign

A new property, `resourceSettings.includeAdminRoles`, has been added to the access certification campaign schema in the [Campaigns API](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Campaigns). This property indicates that the user-centric access certification campaign includes users’ admin role assignments. <!-- OKTA-854037-->

#### Bug fixed in 2025.03.0

The `remediationSettings.autoRemediationSettings` and `principalScopeSettings.predefinedInactiveUsersScope` properties were missing from the Access Certification campaign schema in the Campaigns API reference. (OKTA-880900)

## February

### Weekly release 2025.02.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [List all entitlements API response update](#list-all-entitlements-api-response-update) | February 13, 2025 |

#### List all entitlements API response update

<ApiLifecycle access="beta" />

Breaking change: The [List all entitlement](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Entitlements/listEntitlements) response no longer returns a `values` object. Previously, this response returned an empty array for this property after the following update in `2024.04.0`: List all entitlements will no longer return values. To fetch values for a given entitlement, use [List all values for an entitlement](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Entitlements/listEntitlementValues) or [List all entitlement values](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Entitlements/listAllEntitlementValues). <!-- OKTA-828247 -->

### Monthly release 2025.02.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [New System Log event](#new-system-log-event) | February 6, 2025 |

#### New system log event

An `access.request.settings.update` System Log event now appears when a **Request of behalf of** setting is toggled on or off in the Admin Console, or when you set or change the `requestOnBehalfOfSettings` object for [Requests Settings](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/Request-Settings/). The event's `debugData` property includes the app for which the setting was updated and the `changeDetails` property includes the previous and new state of the setting. <!--OKTA-857992-->

## January

### Weekly release 2025.01.2

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bug fixed in 2025.01.2](#bug-fixed-in-2025-01-2) | January 29, 2025 |

#### Bug fixed in 2025.01.2

* The `okta.accessRequests.catalog.read` scope was missing from the Okta Identity Governance APIs. (OKTA-846162) <!-- To be moved to IGA RN -->

### Monthly release 2025.01.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Selected Okta Identity Governance APIs are now GA](#selected-okta-identity-governance-apis-are-now-ga) | January 8, 2025 |

#### Selected Okta Identity Governance APIs are now GA

The following Okta Identity Governance APIs are GA:

* [Campaigns](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Campaigns/)
* [Reviews](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/Reviews/)
* [Access Requests - V2](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/Request-Conditions/)
* [My Catalogs](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/My-Catalogs/)
* [My Requests](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/My-Requests/)

The following Access Requests - V2 administrative APIs are now EA:

* [List all entries for the default access request catalog](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/catalogs/listalldefaultentriesv2)
* [Retrieve a catalog entry by an ID](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/Catalogs/getCatalogEntryV2)

For further information, see [Identity Governance](https://help.okta.com/okta_help.htm?type=oie&id=ext-iga) and [Okta Identity Governance API](https://developer.okta.com/docs/api/iga/).<!--OKTA-848466-->
