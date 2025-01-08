---
title: Okta Identity Engine API release notes 2025
---

<ApiLifecycle access="ie" />

# Okta Identity Engine API release notes (2025)

## January

### Monthly release 2025.01.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Additional use case selection in the OIN Wizard](#additional-use-case-selection-in-the-oin-wizard) | January 8, 2025 |
| [Configure Identity Verification with third-party Identity Verification providers is GA Production](#configure-identity-verification-with-third-party-identity-verification-providers-is-ga-production) | October 2, 2024|
| [Deprecated API endpoints: Extend, Grant, and Revoke Okta Support access](#deprecated-api-endpoints-extend-grant-and-revoke-okta-support-access) | January 8, 2025 |
| [Granular configuration for Keep Me Signed In is EA in Preview](#granular-configuration-for-keep-me-signed-in-is-ea-in-preview) | January 8, 2025 |
| [Multiple Identifiers is GA in Preview](#multiple-identifiers-is-ga-in-preview) | November 7, 2024 |
| [New group.source.id key for group functions in Expression Language](#new-group-source-id-key-for-group-functions-in-expression-language) | January 2, 2025 |
| [POST requests to the authorize endpoint is self-service EA](#post-requests-to-the-authorize-endpoint-is-self-service-ea) | January 8, 2025 |
| [Selected Okta Identity Governance APIs are now GA](#selected-okta-identity-governance-apis-are-now-ga) | January 8, 2025 |
| [Bug fixed in 2025.01.0](#bug-fixed-in-2025-01-0)| January 8, 2025 |

#### Additional use case selection in the OIN Wizard

Independent software vendors (ISVs) can select the following additional use case categories when they submit their integration to the OIN:

* Automation
* Centralized Logging
* Directory and HR Sync
* Multifactor Authentication (MFA)

See [Use case selection in the OIN Wizard](https://developer.okta.com/docs/guides/submit-app-prereq/main/#use-case-selection-in-the-oin-wizard). <!-- OKTA-843778 -->

#### Configure Identity Verification with third-party Identity Verification providers is GA Production

You can now configure third-party Identity Verification providers using the IdP API and [Okta account management policy rules](/docs/guides/okta-account-management-policy/main/). Okta supports Persona as a third-party Identity Verification provider.

Identity Verification enables you to use a third-party Identity Verification provider to verify the identity of your users. Verification requirements and the Identity Verification provider are based on your authentication policies and configurations within your Okta org. To configure an Identity Verification provider in the Admin Console, see [Add an Identity Verification vendor as Identity Provider](https://help.okta.com/okta_help.htm?type=oie&id=id-verification). <!-- OKTA-803683 -->

#### Deprecated API endpoints: Extend, Grant, and Revoke Okta Support access

The following API endpoints have been deprecated:

* [Extend Okta Support access](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/OrgSettingSupport/#tag/OrgSettingSupport/operation/extendOktaSupport) (POST /api/v1/org/privacy/oktaSupport/extend)
* [Grant Okta Support access](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/OrgSettingSupport/#tag/OrgSettingSupport/operation/grantOktaSupport) (POST /api/v1/org/privacy/oktaSupport/grant)
* [Revoke Okta Support access](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/OrgSettingSupport/#tag/OrgSettingSupport/operation/revokeOktaSupport) (POST /api/v1/org/privacy/oktaSupport/revoke)

Use the [Update an Okta Support case](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/OrgSettingSupport/#tag/OrgSettingSupport/operation/updateOktaSupportCase) endpoint to extend, grant, or revoke Okta Support access for a specific support case. For the corresponding Okta Admin Console feature, see [Give access to Okta Support](https://help.okta.com/okta_help.htm?type=oie&id=settings-support-access). <!-- OKTA-823338 -->

#### Granular configuration for Keep Me Signed In is EA in Preview

Admins can now configure the post-authentication prompt for Keep Me Signed In (KMSI) at a granular level in authentication policies. This allows admins to selectively enable post-authentication KMSI on a per-user, per-group, or per-app basis. When enabled, this feature exposes a frequency setting that lets admins control how often the post-authentication prompt is presented to users. See [Configure Keep me signed in (KMSI)](/docs/guides/keep-me-signed-in/main/).

The post-authentication prompt text (title, subtitle, accept button, and reject button) is now customizable through the Brands API. See [Customize post-authentication sign-in prompts](/docs/guides/keep-me-signed-in/main/#customize-post-authentication-sign-in-prompts). <!-- OKTA-791596 FF: POST_AUTH_KMSI_IN_AUTH_POLICY  -->

#### Multiple Identifiers is GA in Preview

Today, end users must sign in to Okta with a username or email address only. With the Multiple Identifiers feature, admins can configure identifiers, or user attributes from Universal Directory, that an end user can enter to authenticate. Multiplier identifiers work in sign-in, recovery, self-service registration, and unlock flows. Admins can configure up to three identifiers, including email (which is still a required identifier). See [Configure multiple identifiers](/docs/guides/multiple-identifiers/main/). <!-- OKTA-687191  FF: MULTIPLE_IDENTIFIERS -->

#### New group.source.id key for group functions in Expression Language

You can now use the `group.source.id` key in Expression Language group functions to filter between groups that have the same name. See [Group functions](/docs/reference/okta-expression-language-in-identity-engine/#group-functions). <!-- OKTA-832132 -->

#### POST requests to the authorize endpoint is Self-Service EA

You can now send user data securely in a POST request body to the /authorize endpoint. <!-- https://oktainc.atlassian.net/browse/OKTA-827104#icft=OKTA-827104 OAUTH2_AUTHORIZE_WITH_POST -->

#### Selected Okta Identity Governance APIs are now GA

The following Okta Identity Governance APIs are GA:

* [Access Requests - V2](/openapi/governance.requests.admin.v2/tag/Request-Conditions/)
* [Campaigns](/openapi/governance.api/tag/Campaigns/)
* [My Catalogs](/openapi/governance.requests.enduser.v2/tag/My-Catalogs/)
* [My Requests](/openapi/governance.requests.enduser.v2/tag/My-Requests/)
* [Reviews](/openapi/governance.api/tag/Reviews/)

The following Access Requests - V2 administrative APIs are now EA:

* [List all entries for the default access request catalog](/openapi/governance.requests.admin.v2/tag/Catalogs/#tag/Catalogs/operation/listAllDefaultEntriesV2)
* [Retrieve a catalog entry by an ID](/openapi/governance.requests.admin.v2/tag/Catalogs/#tag/Catalogs/operation/getCatalogEntryV2)

For further information, see [Identity Governance](https://help.okta.com/okta_help.htm?type=oie&id=ext-iga) and [Okta Identity Governance API](/docs/api/iga/).<!--OKTA-848466-->

#### Developer documentation updates in 2025.01.0

The Sign users in to your SPA using redirect guides for the [Angular](/docs/guides/sign-into-spa-redirect/angular/main/) and [React](/docs/guides/sign-into-spa-redirect/react/main/) platforms are now revised to use updated versions of Okta SDKs, framework dependencies, and coding patterns.

#### Bug fixed in 2025.01.0

* Requests to the `/policies/{policyId}/rules` and `/policies/{policyId}/rules/{ruleId}` endpoints to create or update Okta account management policy rules included default Keep me signed in (KMSI) settings in the responses. (OKTA-848236)
