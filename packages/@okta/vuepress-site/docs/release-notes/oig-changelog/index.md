---
title: Archived Okta Identity Governance API changelog (2023-2024) | Okta Developer
meta:
  - name: description
    content: Archived list of changes to the Okta Identity Governance APIs.
---

# Archived Okta Identity Governance API changelog (2023-2024)

>**Note:** See the latest [Okta Identity Governance API](/docs/release-notes/2025-okta-identity-governance/) release notes.

Contains a log of all API changes.

Breaking changes may only occur during the BETA lifecycle of an API, and will be minimized as much as possible.

## 2025.02.1

### BETA - Breaking changes

* [List all entitlements](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Entitlements/#tag/Entitlements/operation/listEntitlements) response will no longer contain values
* To fetch values for a given entitlement, use [List all values for an entitlement](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Entitlements/#tag/Entitlements/operation/listEntitlementValues) or [List all entitlement values](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Entitlements/#tag/Entitlements/operation/listAllEntitlementValues)

## 2025.01.2

### *FIX* - Added the scope `okta.accessRequests.catalog.read` to the OAuth 2.0 scopes

The `okta.accessRequests.catalog.read` scope, which allows apps to read information about Access Request catalogs in your Okta organization, now appears in the [OAuth 2.0 Scopes](https://developer.okta.com/docs/api/iga/oauth2/).

## 2025.01.1

### *FIX* - Update the Request Condition didn't update name property

* The [Update the Request Condition](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v2/tag/Request-Conditions/#tag/Request-Conditions/operation/updateResourceRequestConditionV2) call didn't update the `name` property of the request condition.

### *FIX* - Increased the max length to 7000 for user scope expression

* Increased the max length to 7000 characters for the property [`principalScopeSettings.userScopeExpression`](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign!path=principalScopeSettings/userScopeExpression&t=request) in the request body of the ['Create a campaign'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign) operation.

## 2025.01.0

### *FEATURE* - GA Select Okta Identity Governance APIs

* The following sets of APIs have transitioned from Beta to GA:
  * Campaigns
  * Reviews
  * Access Requests - V2
  * My Requests
  * My Catalogs

* Added EA Access Requests - V2 administrative APIs for:
  * ['List all entries for the default access request catalog'](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v2/tag/Catalogs/#tag/Catalogs/operation/listAllDefaultEntriesV2)
  * ['Retrieve a catalog entry by an ID'](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v2/tag/Catalogs/#tag/Catalogs/operation/getCatalogEntryV2)

## 2024.12.1

### *FEATURE* - New request status - `EXPIRED`

* The status of a request now includes a new `EXPIRED` value. See [status](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v2/tag/Requests/#tag/Requests/operation/getRequestV2!c=200&path=status&t=response) and [request domain model](https://developer.okta.com/docs/api/iga/#request).

### *FIX* - Update to Create a Request API

* Setting the `requestedBy` parameter in the request body of the [Create a Request API](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v2/tag/Requests/#tag/Requests/operation/createRequestV2) returned the default admin user ID in the response.

### *FIX* - Update to Retrieve a Request API and Retrieve my Request API

* Updated the `requesterFieldValues` object for the [Retrieve a Request API](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v2/tag/Requests/#tag/Requests/operation/getRequestV2) and the [Retrieve my request API](https://developer.okta.com/docs/api/iga/openapi/governance.requests.enduser.v2/tag/My-Requests/#tag/My-Requests/operation/getMyRequestV2). This object previously returned only the `id` and `value` properties.

## 2024.11.1

### *FIX* - Update to Retrieve My Request API

* Updated the `requesterFieldValues` object for the [Retrieve My Request API](https://developer.okta.com/docs/api/iga/openapi/governance.requests.enduser.v2/tag/My-Requests/#tag/My-Requests/operation/getMyRequestV2). This object now contains the list of field values that were populated while submitting an Access Request.

## 2024.11.0

### *FEATURE* - new Access Requests APIs

* At the left sidebar, split *API reference* into *Management APIs* and *Enduser APIs*.
* Added Access Requests - V2 administrative APIs for:
  * ['Create a request'](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v2/tag/Requests/#tag/Requests/operation/createRequestV2)
  * ['Create a request message'](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v2/tag/Requests/#tag/Requests/operation/createRequestMessageV2)
  * ['Retrieve an entry's request fields'](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v2/tag/Catalogs/#tag/Catalogs/operation/getCatalogEntryRequestFieldsV2).
  * ['List all Requests'](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v2/tag/Requests/#tag/Requests/operation/listAllRequestsV2)
  * ['Retrieve a Request'](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v2/tag/Requests/#tag/Requests/operation/getRequestV2)
* Added End user APIs for:
  * ['Create a request'](https://developer.okta.com/docs/api/iga/openapi/governance.requests.enduser.v2/tag/My-Requests/#tag/My-Requests/operation/createMyRequestV2)
  * ['Retrieve my request'](https://developer.okta.com/docs/api/iga/openapi/governance.requests.enduser.v2/tag/My-Requests/#tag/My-Requests/operation/getMyRequestV2)
  * ['List all entries for the default access request catalog'](https://developer.okta.com/docs/api/iga/openapi/governance.requests.enduser.v2/tag/My-Catalogs/#tag/My-Catalogs/operation/listMyDefaultEntriesV2)
  * ['Retrieve an entry from my catalog'](https://developer.okta.com/docs/api/iga/openapi/governance.requests.enduser.v2/tag/My-Catalogs/#tag/My-Catalogs/operation/getMyEntryV2)
  * ['Retrieve an entry's request fields'](https://developer.okta.com/docs/api/iga/openapi/governance.requests.enduser.v2/tag/My-Catalogs/#tag/My-Catalogs/operation/getMyCatalogEntryRequestFieldsV2)
  * ['List all my catalog entry users'](https://developer.okta.com/docs/api/iga/openapi/governance.requests.enduser.v2/tag/My-Catalogs/#tag/My-Catalogs/operation/listMyEntryUsersV2)
  * ['Retrieve a users request-fields for an entry'](https://developer.okta.com/docs/api/iga/openapi/governance.requests.enduser.v2/tag/My-Catalogs/#tag/My-Catalogs/operation/getMyCatalogEntryUserRequestFieldsV2)

### *FEATURE* - Enhanced Group Remediation

* Added a new property in the ['Create a campaign'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign) operation to accept [/remediationSettings/autoRemediationSettings](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign!path=remediationSettings/autoRemediationSettings&t=request).

### *FEATURE* - Update to Campaigns API

* Updated the `principalScopeSettings` object for the [Campaigns API](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/getCampaign!c=200&path=principalScopeSettings&t=response). This object now includes the `predefinedInactiveUsersScope` property that identifies the duration that users have not used single sign-on (SSO) to access their account within a specific time frame.

## 2024.10.0

### *FIX* -  Remove ENTITLEMENT_VALUES from access-scope settings for Access Request condition APIs

* Removed the `ENTITLEMENT_VALUES` from the access-scope settings from the following APIs:
  * ['Request conditions'](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v2/tag/Request-Conditions/#tag/Request-Conditions)
  * ['Request settings'](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v2/tag/Request-Settings/#tag/Request-Settings).

## 2024.09.0

### *FEATURE* - OAuth2 scopes for Access Request conditions and requests APIs, first BETA release

* OAuth2 scopes for Access Requests condition and request APIs:
  * **okta.accessRequests.condition.manage**
  * **okta.accessRequests.condition.read**
  * **okta.accessRequests.request.manage**
  * **okta.accessRequests.request.read**

## 2024.08.0

### *FEATURE* - New Access request condition APIs, first BETA release

* Added Access request V2 administrative APIs for:
  * ['Request conditions'](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v2/tag/Request-Conditions/#tag/Request-Conditions)
  * ['Request sequences'](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v2/tag/Request-Sequences/#tag/Request-Sequences)
  * ['Request settings'](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v2/tag/Request-Settings/#tag/Request-Settings).
* Access request V1 administrative APIs (Request types & Requests) remain unchanged.

## 2024.06.2

### *FEATURE* - Added support to include only active users in the campaign

* Added a new property in the ['Create a campaign'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign) operation to accept [/principalScopeSettings/includeOnlyActiveUsers](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign!path=principalScopeSettings/includeOnlyActiveUsers&t=request).

## 2024.06.0

### *FIX* -  Update Admin Role Campaign Defaults

* Updated [`bulkDecisionDisabled`](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign!path=reviewerSettings/bulkDecisionDisabled&t=request) to no longer be required for Admin Role campaigns.

## 2024.04.0

### *FEATURE* - Added following Beta APIs for ENTITLEMENT MANAGEMENT feature

* [Retrieve an entitlement](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Entitlements/#tag/Entitlements/operation/getEntitlement)
* [List all entitlement values](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Entitlements/#tag/Entitlements/operation/listAllEntitlementValues)

### *DEPRECATE* - List all entitlements will no longer return values

* To fetch values for a given entitlement, use [List all values for an entitlement](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Entitlements/#tag/Entitlements/operation/listEntitlementValues) or [List all entitlement values](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Entitlements/#tag/Entitlements/operation/listAllEntitlementValues)

### *FEATURE* - Ability to create campaigns on Okta Admin Console for reviewing admin roles

* Updated the ['Create a campaign'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign) operation to support governance for admin roles in resource-centric campaigns.

* Added support for ['justificationRequired'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign!path=reviewerSettings/justificationRequired&t=request) and ['bulkDecisionDisabled'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign!path=reviewerSettings/bulkDecisionDisabled&t=request)
and replaced ['isSelfReviewDisabled'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign!path=reviewerSettings/isSelfReviewDisabled&t=request) with ['selfReviewDisabled'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign!path=reviewerSettings/selfReviewDisabled&t=request)

* Also, these fields are now required to be marked as `true` for Admin Role campaigns.

### *FIX* - OAuth2 scope documentation

* Fixed the documentation of required scopes for Request Types, Requests, and Teams operations to correct values.
  * Incorrect old documentation listed : `okta.governance.accessRequest.manage` , `okta.governance.accessRequest.read`
  * New correct documentation: `okta.governance.accessRequests.manage`, `okta.governance.accessRequests.read`

### BETA - Breaking changes

#### *FIX* - Resource name and description is no longer populated in responses for [ENTITLEMENT MANAGEMENT](https://help.okta.com/en/programs/em/content/topics/identity-governance/em/entitlement-mgt.htm) feature APIs (Entitlements, Entitlement Bundles, Grants, and Principal Entitlements)

## 2023.09.0

### *FEATURE* - Added following Beta APIs for [ENTITLEMENT MANAGEMENT](https://help.okta.com/en/programs/em/content/topics/identity-governance/em/entitlement-mgt.htm) feature

* [Entitlement Bundles](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Entitlement-Bundles)
* [Entitlements](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Entitlements)
* [Grants](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Grants)
* [Principal Entitlements](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Principal-Entitlements)

### *FEATURE* - Added support for certifying entitlement-enabled resources to ['Campaigns'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/) and ['Reviews'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Reviews/) Apis

['Create'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign), ['List'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/listCampaigns), ['Retrieve'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/getCampaign), ['Delete'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/deleteCampaign), ['Launch'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/launchCampaign) and ['End'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/endCampaign) campaigns containing entitlement enabled resources.

['List'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Reviews/#tag/Reviews/operation/listReviews), ['Reassign'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Reviews/#tag/Reviews/operation/reassignReviews) and ['Retrieve'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Reviews/#tag/Reviews/operation/getReview) items reviewing app entitlements.

## 2023.08.0

### *FIX* - startReview in 'Create a Campaign' is required

Fixed ['Create a campaign'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign) operation to show [/reviewerSettings/reviewerLevels/startReview](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign!path=reviewerSettings/reviewerLevels/startReview&t=request) as `required` field.

## 2023.07.0

### *DEPRECATE* - /governance/api/v1/campaigns/{campaignId}/delete endpoint

Deprecated this endpoint in favour of ['Delete Campaign'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/deleteCampaign) to be consistent with other DELETE endpoints.

Existing `/delete` endpoint will continue to work until it is removed in future release.

## 2023.06.0

### *FEATURE* - Ability to create recurring campaigns

Updated ['Create a campaign'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign) operation to support defining a recurring schedule by allowing new types described in [/scheduleSettings/type](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign!path=scheduleSettings/type&t=request). During creation of a campaign, you can provide the additional details described at [/scheduleSettings/recurrence](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign!path=scheduleSettings/recurrence&t=request) to setup the recurrence. These settings will also be reflected in ['List all campaigns'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/listCampaigns) and ['Retrieve a campaign'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/getCampaign)

### *FEATURE* - Ability to create campaigns with a group or group owner as reviewer

Updated ['Create a campaign'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign) operation to support setting a Group or Group Owner as reviewer, as is currently supported in the UI by allowing new types described in [/reviewerSettings/type](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign!path=reviewerSettings/type&t=request). During creation of a campaign, when defining the reviewer, new settings are available and described at [/reviewerSettings/reviewerGroupId](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign!path=reviewerSettings/reviewerGroupId&t=request). These settings will also be reflected in ['List all campaigns'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/listCampaigns), ['Retrieve a campaign'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/getCampaign), ['List all reviews'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Reviews/#tag/Reviews/operation/listReviews) and ['Retrieve a review'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Reviews/#tag/Reviews/operation/getReview)

### *FEATURE* - Ability to create multi-level campaigns

Updated ['Create a campaign'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign) to support Multi-level campaigns, as is currently supported in the UI, but allowing new types described in [/reviewerSettings/type](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign!path=reviewerSettings/type&t=request). During creation of a campaign, you can provide multi-level reviewer details described at [/reviewerSettings/reviewerLevels](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign!path=reviewerSettings/reviewerLevels&t=request). These settings will also be reflected in ['List all campaigns'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/listCampaigns), ['Retrieve a campaign'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/getCampaign), ['List all reviews'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Reviews/#tag/Reviews/operation/listReviews), ['Retrieve a review'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Reviews/#tag/Reviews/operation/getReview) and ['Reassign the reviews'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Reviews/#tag/Reviews/operation/reassignReviews)

### *FEATURE* - Ability to create user campaigns

Updated ['Create a campaign'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign) operation to allow creation of User Campaigns, currently available as self-service EA in the UI, by allowing new types described in [/principalScopeSettings/type](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign!path=principalScopeSettings/type&t=request). During creation of a campaign, you can choose to create Resource Campaigns (the existing type) or User Campaigns, with settings described at [/principalScopeSettings](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign!path=principalScopeSettings&t=request). These settings will also be reflected in ['Retrieve a campaign'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/getCampaign)

### *FEATURE* - Ability to create a message on a request

Added ['Create a message for a request'](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Requests/#tag/Requests/operation/createRequestMessage) operation to allow creation of a message for an existing request.

## 2023.03.1

### BETA - Breaking changes

#### *FIX* - reviewerSettings.type in 'Create a campaign' and 'Retrieve a campaign' operations

Fixed ['Create a campaign'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign) and ['Retrieve a campaign'](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/getCampaign) operations to properly accept and return the [/reviewerSettings/type](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/createCampaign!path=reviewerSettings/type&t=request) enum value `REVIEWER_EXPRESSION` instead of `REVIEWER-EXPRESSION`.

## 2023.03.0

### Features

### *FEATURE* - Resource owner approval type

Added the `RESOURCE_OWNER` value to the [approvalType](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Request-Types/#tag/Request-Types/operation/createRequestType!path=approvalSettings/0/approvals/0/approverType&t=request) parameter for [Create a request type](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Request-Types/#tag/Request-Types/operation/createRequestType).

This update enables the creation of request types that require approvals from the owner of the resource specified in [targetResources](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Request-Types/#tag/Request-Types/operation/createRequestType!path=resourceSettings/1/targetResources&t=request).

Currently, Okta only supports a group resource, that is, when [resourceSettings.type](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Request-Types/#tag/Request-Types/operation/createRequestType!path=resourceSettings/1/type&t=request) is `GROUPS`.

This change has no impact on any previously created request types.

## 2023.02.0

### Fixes

### *FIX* - An HTTP 500 Internal Server Error was returned for some operations

* Fixed the case when a [Retrieve a request type](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Request-Types/#tag/Request-Types/operation/getRequestType) would 500 if the [accessDuration](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Request-Types/#tag/Request-Types/operation/getRequestType!path=accessDuration&t=request) was controlled by a `DATE-TIME` field in a `CUSTOM` request type.

* Fixed the case when a [Retrieve a request](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Requests/#tag/Requests/operation/getRequest) would 500 if an `ADD_USER_TO_GROUP` or `ASSIGN_APP_TO_USER` action failed to run, and then was manually closed by a team member.

## 2023.01.0

### BETA - Breaking changes

#### *FEATURE* - Request type approval settings

Added new option `NONE` for [approvalSettings.type](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Request-Types/#tag/Request-Types/operation/createRequestType!path=approvalSettings/1/type&t=request) for [Create a request type](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Request-Types/#tag/Request-Types/operation/createRequestType).

This enables the creation of request types that don't have any required approvals.

[approvalSettings](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Request-Types/#tag/Request-Types/operation/createRequestType!path=approvalSettings&t=request) is now a required property. Attempting to create a request type without specifying [approvalSettings](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Request-Types/#tag/Request-Types/operation/createRequestType!path=approvalSettings&t=request) will result in a 400 Bad Request response.

Allowing for this use case requires modification of the default value for [approvalSettings](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Request-Types/#tag/Request-Types/operation/createRequestType!path=approvalSettings&t=request).

Integrations relying on the default specification of one approval by the requester's manager must now explicity specify [approvalSettings.type](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Request-Types/#tag/Request-Types/operation/createRequestType!path=approvalSettings/0/type&t=request) of `SERIAL` and include a manager approval object when creating the request type.

Check below for an example of a request body that used to return a 200 response code, that will now return a 400 response code.

<details><summary>Example</summary>
<p>

```json
{
    "name": "salesforce-01",
    "description": "How users can request access to Admin Group",
    "ownerId": "61eb0f06c462d20007f051ac",
    "resourceSettings": {
        "type": "GROUPS",
        "targetResources": [
            {
                "resourceId": "00g1emaKYZTWRYYRRTSK"
            }
        ]
    }
}
```

</p>
</details>

This change has no impact on any previously created request types.

* `approvalSettings` with no required approvers: `{"type":"NONE"}`

* with requester manager approver required: `{"type":"SERIAL","approvals":[{"approverType":"MANAGER"}]}`

#### *FIX* - createdBy in 'Retrieve a request' and 'List all requests' operations

Fixed ['Retrieve a request'](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Requests/#tag/Requests/operation/getRequest) and ['List all requests'](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Requests/#tag/Requests/operation/listAllRequests) operations to properly return the [createdBy](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Requests/#tag/Requests/operation/listAllRequests!c=200&path=data/createdBy&t=response) id of the authenticated user, which can be distinct from [requesterUserIds](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Requests/#tag/Requests/operation/listAllRequests!c=200&path=data/requesterUserIds&t=response)

#### *FIX* - requesterFieldValues and approvals/0/fieldValues in 'Retrieve a request' operation

Fixed the data type of [/requesterFieldValues/0/value](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Requests/#tag/Requests/operation/getRequest!c=200&path=0/requesterFieldValues/0/value&t=response) in ['Retrieve a request'](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Requests/#tag/Requests/operation/getRequest) response body for fields of type `DATE-TIME` to match API reference.

* Old date time value :`1665148010117`

* New date time value per API reference: `2022-10-07T13:06:50.117Z`

### Features

* Added [requesterFieldValues](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Requests/#tag/Requests/operation/createRequest!path=requesterFieldValues&t=request) to [Create a request](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Requests/#tag/Requests/operation/createRequest) operation request body. This enables creation of requests using a request type with required fields.

* Added [approvalSettings.approvals.description](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Request-Types/#tag/Request-Types/operation/createRequestType!path=approvalSettings/0/approvals/0/description&t=request) to [Create a request](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Requests/#tag/Requests/operation/createRequest) operation request body. This enables creation of a request types with description for required approvals.

* ['Retrieve a request'](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Requests/#tag/Requests/operation/getRequest) now returns a request with type `ACCESS_REQUEST`, and includes the `approvals` and `actions` objects. Prior to this change if a request was created using a request type with `CUSTOM` modifications in the administrative UI, the request had type `CUSTOM` which omitted the `approvals` and `actions` objects.

> **Note:** While there are aspects of requests based on CUSTOM request types which may not be represented in API responses, the `actions` and `approvals` information included in the API response are now reliable.

### Fixes

* Fixed ['Retrieve a request'](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Requests/#tag/Requests/operation/getRequest) and ['List all requests'](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Requests/#tag/Requests/operation/listAllRequests) operations to properly return the [createdBy](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Requests/#tag/Requests/operation/listAllRequests!c=200&path=data/createdBy&t=response) id of the authenticated user, which can be distinct from [requesterUserIds](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Requests/#tag/Requests/operation/listAllRequests!c=200&path=data/requesterUserIds&t=response).
* Fixed handling of a number of invalid HTTP requests to properly return 4xx status codes instead of 500.

### Documentation updates

* Added changelog
* Clarified documentation of [accessDuration](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Request-Types/#tag/Request-Types/operation/createRequestType!path=accessDuration&t=request) property in [Create a request type](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v1/tag/Request-Types/#tag/Request-Types/operation/createRequestType) body to indicate we only support durations which contain minutes, not months.