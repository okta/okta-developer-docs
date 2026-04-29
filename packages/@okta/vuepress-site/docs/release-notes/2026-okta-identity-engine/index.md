---
title: Okta Identity Engine API release notes 2026
---

<ApiLifecycle access="ie" />

# Okta Identity Engine API release notes (2026)

<a href="/rss/identity-engine.xml">
  <img src="/img/icons/Feed-icon.svg" alt="RSS" width="20" height="20" />
  Subscribe to RSS
</a>

## April

### Weekly release 2026.04.3
<!-- Published on: 2026-04-29T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Identity Threat Protection with Okta AI managed with Terraform](#identity-threat-protection-with-okta-ai-managed-with-terraform) | April 29, 2026 |
| [Bug fixed in 2026.04.3](#bug-fixed-in-2026-04-3)| April 29, 2026 |

#### Identity Threat Protection with Okta AI managed with Terraform

You can now manage Okta Identity Threat Protection (ITP) with Okta AI using the Okta Terraform Provider. This allows admins to manage their entire threat protection surface using an Infrastructure-as-Code (IaC) approach, ensuring consistent, repeatable, and scalable security configurations. See [Manage Identity Threat Protection with Okta AI resources using Terraform](/docs/guides/terraform-manage-itp/main/). <!-- OKTA-1122778 -->

#### Bug fixed in 2026.04.3

The OIN Wizard auto-tester failed during SSO because a 308 redirect dropped the required code and state parameters from the callback URL. (OKTA-1101077)

### Weekly release 2026.04.2
<!-- Published on: 2026-04-15T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bugs fixed in 2026.04.2](#bugs-fixed-in-2026-04-2)| April 15, 2026 |

#### Bugs fixed in 2026.04.2

* When Entitlement Management was enabled in Integrator Free Plan orgs, SCIM apps experienced import failures if users had existing entitlements. (OKTA-1150897)
<!--  Okta Integrator Free Plan org bug -->

* When Entitlement Management was enabled in Integrator Free Plan orgs, group push for SCIM apps failed with an error and prevented groups from synchronizing.(OKTA-1149228)
<!-- Okta Integrator Free Plan org bug -->

* The request body parameter `riskLevel` of the [Upsert the user's risk API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/userrisk/other/upsertuserrisk#other/upsertuserrisk/t=request&path=risklevel) didn't support the `MEDIUM` risk level. (OKTA-1130873)

### Weekly release 2026.04.1
<!-- Published on: 2026-04-08T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bugs fixed in 2026.04.1](#bugs-fixed-in-2026-04-1)| April 8, 2026 |

#### Bugs fixed in 2026.04.1

* WebAuthn transport values, which specify the connection method that WebAuthn authenticators use to communicate with a user's device, weren’t returned by the List all authenticator enrollments [endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/userauthenticatorenrollments/other/listauthenticatorenrollments). (OKTA-1118046)

* The `AuthnRequestId` field in the System Log wasn't included for authorization code flow and device code flow token request events. (OKTA-1082636)

### Monthly release 2026.04.0
<!-- Published on: 2026-04-02T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Entitlements Management and API service on the Admin Console Home page](#entitlements-management-and-api-service-on-the-admin-console-home-page) | |
|[Authentication requirement for OIN Manager migration](#authentication-requirement-for-oin-manager-migration)||
| [Submit entitlement management integrations is GA in Production](#submit-entitlement-management-integrations-is-ga-in-production) | Nov 5, 2025 |
| [Slack integration for Identity Governance](#slack-integration-for-identity-governance) | February 18, 2026 |
| [Custom admin permissions for inline and event hooks is GA in Production](#custom-admin-permissions-for-inline-and-event-hooks-is-ga-in-production) | December 10, 2025 |
| [Increase to the maximum access duration limit ](#increase-to-the-maximum-access-duration-limit) | April 1, 2026 |
| [Authentication requirement for OIN Manager migration is GA in Production](#authentication-requirement-for-oin-manager-migration-is-ga-in-production) | April 1, 2026 |
| [Skip counts for authenticator enrollment grace periods is GA in Preview](#skip-counts-for-authenticator-enrollment-grace-periods-is-ga-in-preview) | Feb 4, 2026 |
| [Client update policy is GA in Preview](#client-update-policy-is-ga-in-preview) | January 7, 2026 |
| [Support for custom risk reasons in User Risk API](#support-for-custom-risk-reasons-in-user-risk-api) | April 1, 2026 |
| [Detection settings in session protection is GA in Production](#detection-settings-in-session-protection-is-ga-in-production) | December 10, 2025 |
| [Passkeys rebrand is GA in Preview](#passkeys-rebrand-is-ga-in-preview) | Feb 4, 2026 |
| [Maximum consecutive characters setting for passwords is GA in Production](#maximum-consecutive-characters-setting-for-passwords-is-ga-in-production) | Dec 10, 2025 |
| [New password complexity property is GA in Production](#new-password-complexity-property-is-ga-in-production) | June 4, 2025 |
| [Express Submission in the OIN Wizard](#express-submission-in-the-oin-wizard) | |
| [Developer documentation updates in 2026.04.0](#developer-documentation-updates-in-2026-04-0) | April 1, 2026 |
| [Bugs fixed in 2026.04.0](#bugs-fixed-in-2026-04-0)| April 1, 2026 |

#### Entitlements Management and API service on the Admin Console Home page

The **Home** page in the Admin Console now includes **Entitlements Management** and **API service** integrations. ISVs can initiate the full entitlements and API service integration flows and track progress directly from the **Home** page. A new **Entitlements** toggle enables fine-grained access control and real-time validation to ensure integrations are built with all security requirements. <!-- OKTA-1134610 -->

#### Authentication requirement for OIN Manager migration

After migrating a SCIM integration from the OIN Manager to the OIN Wizard, the **Basic** option is visible in the **Authentication mode** dropdown list. However, you can't select this option for resubmission. Select a different authentication method to complete the submission.
<!-- OKTA-1114958 -->

#### Submit entitlement management integrations is GA in Production

Independent Software Vendors (ISVs) can now submit SCIM 2.0-based entitlement management integrations to the Okta Integration Network (OIN). This enhancement enables customers and IT admins to discover, manage, and assign fine-grained entitlements such as roles and permissions directly from Okta. By standardizing entitlement management, organizations can automate access assignments and streamline Identity Governance, ensuring that users receive the right access and roles without manual intervention. See [Submit an integration with the OIN Wizard](https://developer.okta.com/docs/guides/submit-oin-app/scim/main/). <!-- OKTA-1025782 ENTITLEMENTS_SUBMISSION Preview date: Nov 5, 2025 -->

#### Slack integration for Identity Governance

Okta for Government Moderate and Government High customers who use commercial Slack instances can now integrate Slack with their org to streamline access management in Access Requests and Access Certifications. Users can now submit and approve requests in Slack, as well as receive Slack notifications for access requests and certification campaigns. Feature availability varies depending on whether the Unified requester experience feature is enabled. See [Okta Identity Governance Limitations for Public Sector Service](https://support.okta.com/help/s/article/okta-identity-governance-compatibility-limitations-for-public-sector-service?language=en_US ) and [Integrate Slack](https://help.okta.com/okta_help.htm?type=oie&id=csh-ar-integrate-slack).

The following APIs support governance Slack integration settings and are available as Beta:

* Org Slack integration setting: **Org Governance Settings** > [Create an org integration](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/org-governance-settings/createorgintegration)
* Access Certification Slack integration setting: **Org Governance Settings** > [Update the org certification settings](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/org-governance-settings/updateorgcertificationsettings)
* Access Request Slack integration setting: **Access Request - V2** > **Request Settings** > [Update the org request settings](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/request-settings/updateorgrequestsettingsv2) <!-- OKTA-1138055 Preview date: February 18, 2026 -->

#### Custom admin permissions for inline and event hooks is GA in Production

The inline hook and event hook framework now supports read and write permissions for custom admin roles. This enhancement gives fine-grained access to manage inline and event hooks that previously required the super admin role. See [Hooks admin roles](https://developer.okta.com/docs/guides/hooks-best-practices/#hook-admin-roles). <!-- OKTA-1133787 HOOKS_PUBLIC_PERMISSIONS Preview: December 10, 2025-->

#### Increase to the maximum access duration limit

When you create or edit access request conditions, you can now set `accessDurationSettings.duration` or `accessDurationSettings.maximumDuration` to a maximum of 365 days or 52 weeks. <!-- OKTA-1081978 preview date: April 1, 2026-->

#### Authentication requirement for OIN Manager migration is GA in Production

After an admin migrates a SCIM integration from the OIN Manager to the OIN Wizard, the **Basic** option is visible in the **Authentication mode** dropdown list. However, you can't select this option for resubmission. Select a different authentication method to complete the submission.

#### Skip counts for authenticator enrollment grace periods is GA in Preview

This feature allows admins to define a number of skips end users can defer enrollment into an authenticator, as well as customizations to the prompt when end users see the grace period. See [Grace periods](/docs/concepts/policies/#grace-periods) and [type](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/policy/other/createpolicy#other/createpolicy/t=response&c=200&path=&d=1/settings/authenticators/enroll/graceperiod). <!-- OKTA-1044803 FF: ENROLLMENT_POLICY_GRACE_PERIOD_V2 preview date: Feb 4, 2026 -->

#### Client update policy is GA in Preview

The Policies API now supports the `CLIENT_POLICY` type, enabling you to enforce or defer app updates across different device platforms. This lets you programmatically align app versions with internal change management processes. See the [Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/listPolicies) and [Release controls policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-ov-release-controls). <!-- OKTA_VERIFY_RELEASE_CONTROL_POLICY OKTA-1036332 January 7, 2026 -->

#### Support for custom risk reasons in User Risk API

The PUT `/api/v1/users/{userId}/risk` [endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/userrisk/other/upsertuserrisk) now accepts an optional `riskReason` field in the request body that provides a custom reason for the risk level change. If a value isn't provided, the parameter defaults to `override.by.admin`. <!--OKTA-1104360, OKTA-1141971 -->

#### Detection settings in session protection is GA in Production

Tailor ITP to your org’s security priorities to gain control and balance security with a seamless user experience. With new detection settings, you can define which session context changes trigger policy reevaluations, helping you focus only on what truly matters. See [Session protection](https://help.okta.com/okta_help.htm?type=oie&id=csh-continuous-access-evaluation). <!-- OKTA-1016513 SESSION_VIOLATION_DETECTION_CONFIGURATION Preview date: December 10, 2025 -->

#### Passkeys rebrand is GA in Preview

The FIDO2 (WebAuthn) authenticator is being rebranded to Passkeys (FIDO2 WebAuthn) and Okta is introducing enhanced administrative controls and a streamlined user experience. This update centralizes passkey management through a consolidated settings page, allows for customized authenticator naming, and introduces a dedicated **Sign in with a passkey** button within the Sign-In Widget. These enhancements simplify the authentication journey and provide users with a more intuitive sign-in process with the **Sign in with a passkey** button.

For more information about the new settings and updates, see [Passkeys and WebAuthn](/docs/guides/authenticators-web-authn/aspnet/main/#passkeys-and-webauthn) and [Configure the Passkeys (FIDO2 WebAuthn) authenticator](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-webauthn). <!-- OKTA-1012303 FF: PASSKEYS_REBRAND preview date: Feb 4, 2026 -->

#### Maximum consecutive characters setting for passwords is GA in Production

You can now use the `maxConsecutiveCharacters` property to limit the number of consecutive repeating characters in passwords. This feature enhances security by allowing you to customize your password strength requirements. See the [Policy API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/policy/other/createpolicy#other/createpolicy/t=request&path=&d=3/settings/password/complexity/maxconsecutivecharacters). <!-- PASSWORD_POLICY_MAX_CONSECUTIVE_REPEATING_CHARACTERS OKTA-922058 preview org date: Dec 10, 2025 -->

#### New password complexity property is GA in Production

You can now use the `oelStatement` property to block words from being used in passwords. This feature enhances security by allowing you to customize your password strength requirements. See the [Policy API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/policy/other/createpolicy#other/createpolicy/t=request&path=&d=3/settings/password/complexity/oelstatement). <!-- OKTA-849300 PASSWORD_POLICY_OEL_STATEMENT preview date: June 4, 2025 -->

#### Express Submission in the OIN Wizard

Express Submission reduces the time-to-value for independent software vendors (ISVs) to submit Express Configuration functionality for Auth0-enabled SaaS apps to the OIN. With Express Submission, ISVs can input Auth0 metadata into Okta and generate the necessary public key on demand to complete their Express Configuration setup in the OIN Wizard. This eliminates intervention from the OIN operations team and enables quicker submission and publication of Express Configuration functionality apps in the OIN. See [Express Submission](/docs/guides/express-submission/main/).
<!-- OKTA-1140034 EXPRESS_SUBMISSION_LITE No Preview date, Production date: April 7 -->

#### Developer documentation updates in 2026.04.0

* The new [Manage delegates for governance](/docs/guides/iga-delegates/main/) guide describes how to manage governance delegate assignments and settings using the Okta Identity Governance (OIG) APIs.

* The contents of the SCIM FAQ doc have been added to the new [SCIM integration concepts and requirements](/docs/concepts/scim/faqs/) doc.

#### Bugs fixed in 2026.04.0

* When an admin added users to read-only groups using the Groups API (`PUT /api/v1/groups/{groupId}/users/{userId}`), the endpoint incorrectly returned HTTP 501 (Not Implemented) instead of HTTP 403 (Forbidden). (OKTA-1139611)

* The Factors API didn’t return enrollment information about the Okta FastPass factor (`signed_nonce`) for some users who didn’t have Okta Verify with push notifications enrolled or enabled. (OKTA-1052073)

* ISVs were unable to submit their integrations for review despite passing all validation tests. (OKTA-1134528)

* App instances incorrectly displayed the logo from the published version of a submission instead of the logo from the latest version. (OKTA-1136513)

* Integrator Free Tier (IFT) orgs incorrectly showed and enforced a 5-instance limit in the OIN Wizard. (Okta-1044631)

## March

### Weekly release 2026.03.3
<!-- Published on: 2026-03-25T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2026.03.3](#bugs-fixed-in-2026-03-3) | March 25, 2026 |

* The Sign-In Widget didn't load the bot protection enforcement challenge required on some endpoints, leading to an incorrect user redirect to a 403 page. (OKTA-1125106) (OKTA-1136962)

* For realm resources, the List all resource set resources API (`api/v1/iam/resource-sets/{resourceSetIdOrLabel}/resources`) returned a `null` value for the `_links.self` parameter. (OKTA-1135761)

* When users attempted to authenticate on Android devices, some password managers didn't allow them to register passkeys. (OKTA-1135513)

### Weekly release 2026.03.2
<!-- Published on: 2026-03-18T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2026.03.2](#bugs-fixed-in-2026-03-2) | March 18, 2026 |

#### Bugs fixed in 2026.03.2

* The Agent Pools API returned a generic illegal argument exception when invalid parameters were provided. (OKTA-1112681)

* Agent Pool update requests didn't verify that the provided pool ID was a valid app instance ID. (OKTA-890681)

* When you used the Create an org [endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/orgcreator/other/createchildorg) to create a child org and then enabled Identity Engine for the org, `POST_AUTH_SESSION` and `ENTITY_RISK` policies and policy rules were sometimes deleted. (OKTA-1111235)

* You sometimes weren't able to [deactivate an Okta Integration IdP](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/identityprovider/other/deactivateidentityprovider) that had `trustClaims: true`, even when all your authentication policies didn't require trusted claims. (OKTA-1088872)

* An [update a user schema](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/schema/other/updateuserprofile) request failed with a timeout error when it included a large number of identity providers. (OKTA-1010509)

### Weekly release 2026.03.1
<!-- Published on: 2026-03-11T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2026.03.1](#bugs-fixed-in-2026-03-1)| March 11, 2026 |

#### Bugs fixed in 2026.03.1

* The Sign-In Widget didn't load the bot protection enforcement challenge required on some endpoints, leading to an incorrect user redirect to a 403 page. (OKTA-1125106)

* The mandatory SSO configuration check for testing information was incorrectly bypassed for all SSO submissions. (OKTA-1119127)

* Some of the custom advanced sign-on settings for integrations created using the [Application API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/application/other/createapplication) weren't correctly reflected on the app instance page. (OKTA-1109692)

### Monthly release 2026.03.0
<!-- Published on: 2026-03-04T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Self-Service for Enhanced Disaster Recovery is self-service EA in Preview](#self-service-for-enhanced-disaster-recovery-is-self-service-ea-in-preview) | March 4, 2026 |
| [Submit API service integrations](#submit-api-service-integrations) | March 4, 2026 |
| [Admin Console Home page](#admin-console-home-page) | March 4, 2026 |
| [New Directories Integration endpoints to view extended Active Directory group attributes is GA in Preview](#new-directories-integration-endpoints-to-view-extended-active-directory-group-attributes-is-ga-in-preview) | March 4, 2026 |
| [Grace period for device assurance is GA in Production is GA in Production](#grace-period-for-device-assurance-is-ga-in-production) | October 9, 2024 |
| [Dynamic OS version compliance for device assurance is GA in Production](#dynamic-os-version-compliance-for-device-assurance-is-ga-in-production) | February 7, 2024 |
| [Enable custom admin permissions for inline and event hooks is GA in Preview](#enable-custom-admin-permissions-for-inline-and-event-hooks-is-ga-in-preview) | December 10, 2025 |
| [Developer documentation updates in 2026.03.0](#developer-documentation-updates-in-2026-03-0) | March 4, 2026 |
| [Bug fixed in 2026.03.0](#bug-fixed-in-2026-03-0)| March 4, 2026 |

#### Self-Service for Enhanced Disaster Recovery is self-service EA in Preview

When unexpected infrastructure-related outages occur, orgs need an immediate and reliable way to maintain business continuity. Okta's Standard Disaster Recovery, implemented by Okta's operations teams, provides failover and failback with a recovery time objective of one hour.

Okta's Enhanced Disaster Recovery (Enhanced DR) gives admins the option to manage their org's recovery. This feature empowers admins by providing direct, self-service tools and APIs to manage, test, and automate the failover and restoration processes for their impacted orgs.

With Enhanced DR, admins gain active control to initiate a failover and restore for impacted orgs directly from the Okta Disaster Recovery Admin portal or through APIs. Additionally, teams can validate their system's resilience by safely testing these failover and restoration capabilities at their convenience. Finally, Enhanced DR enables orgs to automate failover processes by using real-time monitoring to invoke failover APIs, significantly minimizing downtime during an actual event. See [Manage org recovery with Okta Enhanced Disaster Recovery](/docs/guides/manage-orgs-okta-edr/).
<!-- OKTA-663592 preview date: March 4, 2026  -->

#### Submit API service integrations

Independent Software Vendors (ISVs) can now use the OIN Wizard to submit API service integrations to the Okta Integration Network (OIN). Previously, ISVs provided metadata in the OIN Manager. With this update, ISVs can create and configure API service apps directly within the OIN Wizard
The OIN Wizard currently supports only client secret authentication for API service integrations. ISVs can also generate credentials and perform end-to-end testing independently. These improvements streamline the app submission process and ensure a faster, more secure review. See [Submit an integration with the OIN Wizard](/docs/guides/submit-oin-app/uapiservice/main/).
<!-- OKTA-1119846 API_SERVICE_SUBMISSION preview date: March 4, 2026  -->

#### Admin Console Home page

The new Admin Console **Home** page for IFT orgs provides a faster way to start and manage your app submissions. Instead of navigating through the previous **Applications** > **Your OIN Integrations** path, you can now initiate submissions directly from the **Home** page. This guided experience helps you select integration types, understand requirements through a new **Quick Start guide**, and track your submission in real time from build to publication. It also includes a **Coming Soon** section to preview and register for upcoming integrations, making the entire process more centralized and efficient.
<!-- OKTA-1117696 IFT_GETTING_STARTED_EXPERIENCE preview date: March 4, 2026  -->

#### New Directories Integration endpoints to view extended Active Directory group attributes is GA in Preview

New API endpoints have been added to the Directories Integration (`POST /api/v1/directories/{appInstanceId}/group/{groupId}/query` and `GET /api/v1/directories/{appInstanceId}/group/{groupId}/query/{resultId}`), which allows for the real-time retrieval of any standard or custom attribute from Active Directory (AD) groups. You can now programmatically access attributes, like cost centers and department codes, without waiting for a full directory sync. This feature allows you to accelerate automation by using live AD group metadata, while simultaneously eliminating manual data management by creating a single, reliable bridge between your on-premises directory details and your cloud ecosystem. See [Directories Integrations API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/directoriesintegration).
<!-- OKTA-1117092 AD_GROUP_READ_ATTRIBUTES preview date: March 4, 2026  -->

#### Grace period for device assurance is GA in Production

Occasionally, users' devices might fall out of compliance with security policies due to temporary conditions such as missed software updates or unapproved network connections. Without a grace period, they would be immediately blocked from accessing critical resources, which disrupts productivity and causes frustration. The grace period for device assurance feature allows you to define a temporary window during which non-compliant devices can still access resources. This gives users time to remediate issues without being locked out, balancing productivity with security standards.

See [Device Assurance Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/#tag/DeviceAssurance/operation/createDeviceAssurancePolicy!path=0/gracePeriod&t=request) and the [Add a device assurance policy guide](https://help.okta.com/okta_help.htm?type=oie&id=csh-device-assurance-add). <!-- DEVICE_ASSURANCE_GRACE_PERIOD OKTA-803140 Preview date: October 9, 2024 -->

#### Dynamic OS version compliance for device assurance is GA in Production

You can configure OS version compliance by using device assurance. However, you have to manually update the policies every time a new OS version or patch is released. With **Dynamic OS version compliance**, Okta updates device assurance policies with the latest OS versions and patches, eliminating the need for manual updates. With this feature you can ensure OS version compliance in your org without tracking OS releases. See [Dynamic OS version compliance](https://help.okta.com/okta_help.htm?type=oie&id=csh-device-assurance-add) and [Device Assurance Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/#tag/DeviceAssurance/operation/createDeviceAssurancePolicy!path=1/osVersion&t=request). <!-- DEVICE_ASSURANCE_DYNAMIC_OS_SUPPORT OKTA-651282 Preview date: February 7, 2024 -->

#### Enable custom admin permissions for inline and event hooks is GA in preview

The inline hook and event hook framework now supports read and write permissions for custom admin roles. This enhancement gives fine-grained access to manage inline and event hooks that previously required the super admin role. See [Hooks admin roles](/docs/guides/hooks-best-practices/).
<!-- OKTA-1113869 preview date: December 10, 2025  -->

#### Developer documentation updates in 2026.03.0

* Okta's [API reference pages](https://developer.okta.com/docs/api/) are undergoing a migration, which started on February 24. While the look and feel may vary across pages during this time, all technical documentation remains accurate and up to date.
* You can no longer submit API service integrations through the OIN Manager, so the instructions have been removed from the [OIN Manager](/docs/guides/submit-app/wfconnector/main/) guide. To submit an API service integration, use the [OIN Wizard](/docs/guides/submit-oin-app/uapiservice/main/).
* The new [Plan your self-service registration](/docs/concepts/self-service-registration/) doc explains the self-service registration (SSR) flow, how it works, its default state, and three different ways to customize and configure it.
* A new guide is available for Okta Enhanced Disaster Recovery, a feature that gives admins direct control over business continuity. Learn how to:
  * Initiate failover and restoration (failback) using the self-service portal or APIs.
  * Validate system resilience by safely testing recovery capabilities.
  * Automate failover processes to minimize downtime during an outage.

  See [Manage org recovery with Okta Enhanced Disaster Recovery](/docs/guides/manage-orgs-okta-edr/main).
* The new [Enable and configure a sign-up form](/docs/guides/enable-configure-signupform/main/) guide explains how to configure a Self-Service Registration flow to securely automate how you onboard new users. You learn how to build policies that go beyond a simple sign-up form by defining required user information, automating group assignments, and enforcing security measures like email verification and authenticator enrollment.
* The new [Add a sign-up form to your web app](/docs/journeys/OCI-web-sign-up/main/) journey helps you implement a sign-up form for your web app, reducing onboarding friction and accelerating user acquisition.
* The new [Sign users up with an Okta-hosted sign-up form](/docs/guides/signup-oktahosted/main/) guide illustrates how to implement a Self-Service Registration flow on page using the Okta-hosted Sign-In Widget. It also covers how to customize an out-of-the-box experience for your app using the Okta Auth JavaScript SDK.
* The new [Sign users up with a self-hosted sign-up form](/docs/guides/signup-selfhosted/main/) guide illustrates how to implement a self-hosted sign-up experience using the Okta Auth JavaScript SDK and the Okta embedded Sign-In Widget.

#### Bug fixed in 2026.03.0

Bot detection events were logged for standard Admin/Management API calls when the Sign-In Widget wasn't involved. (OKTA-1113990)

## February

### Weekly release 2026.02.3
<!-- Published on: 2026-02-25T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bug fixed in 2026.02.3](#bug-fixed-in-2026-02-3)| February 25, 2026 |

#### Bug fixed in 2026.02.3

An incorrect error occurred when a user made a request to the `/primary-authenticate` endpoint with a `challenge_hint` value that was a valid OAuth 2.0 grant type, but not a valid value for the `/primary-authenticate` endpoint. (OKTA-1116277)

### Weekly release 2026.02.2
<!-- Published on: 2026-02-20T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bug fixed in 2026.02.2](#bug-fixed-in-2026-02-2)| February 19, 2026 |

#### Bug fixed in 2026.02.2

In orgs with Device claims support for Okta-to-Okta Claims Sharing enabled, claims weren't sent in the SAML assertion if device signals weren't collected in the IdP org. (OKTA-1112627)

### Weekly release 2026.02.1
<!-- Published on: 2026-02-11T12:00:00Z -->
| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bug fixed in 2026.02.1](#bugs-fixed-in-2026-02-1)| February 11, 2026 |

#### Bug fixed in 2026.02.1

SMS and Call factor rate limits were sometimes incorrectly reported by the direct authentication APIs. (OKTA-1107880)

### Monthly release 2026.02.0
<!-- Published on: 2026-02-05T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Linux as a platform condition is GA in Preview](#linux-as-a-platform-condition-is-ga-in-preview) | February 4, 2026 |
| [Skip counts for authenticator enrollment grace periods is self-service EA in Preview](#skip-counts-for-authenticator-enrollment-grace-periods-is-self-service-ea-in-preview) | February 4, 2026 |
| [Dynamic OS version compliance for device assurance is GA in Preview](#dynamic-os-version-compliance-for-device-assurance-is-ga-in-preview) | February 4, 2024 |
| [Grace period for device assurance is GA in Preview](#grace-period-for-device-assurance-is-ga-in-preview) | October 9, 2024 |
| [Lightweight Directory Access Protocol Bidirectional Group Management is GA in Production](#lightweight-directory-access-protocol-bidirectional-group-management-is-ga-in-production) | December 5, 2025 |
| [Detection settings in session protection is GA in Preview](#detection-settings-in-session-protection-is-ga-in-preview) | February 4, 2026 |
| [Passkeys Rebrand is self-service EA in Preview](#passkeys-rebrand-is-self-service-ea-in-preview) | February 4, 2026 |
| [Custom FIDO2 AAGUID is GA in Production](#custom-fido2-aaguid-is-ga-in-production) | July 16, 2025 |
| [OAuth 2.0 support for custom email providers is self-service EA in Preview](#oauth-2-0-support-for-custom-email-providers-is-self-service-ea-in-preview) | February 4, 2026 |
| [Okta as a fallback IdP is self-service EA in Preview](#okta-as-a-fallback-idp-is-self-service-ea-in-preview) | January 28, 2026 |
| [Developer documentation updates in 2026.02.0](#developer-documentation-updates-in-2026-02-0) | February 4, 2026 |
| [Bugs fixed in 2026.02.0](#bugs-fixed-in-2026-02-0)| |

#### Linux as a platform condition is GA in Preview

Okta now supports `LINUX` as a device platform condition in the following policy types and policy rules:

* App sign-in policies (`ACCESS_POLICY` rules)
* Okta account management policy rules (Rules for the Okta account management `ACCESS_POLICY`)
* Identity provider routing rules (`IDP_DISCOVERY` rules)

See the [Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule!path=0/conditions/platform/exclude/os/type&t=request).
<!-- OKTA-1093354 LINUX_SUPPORT_FOR_POLICIES preview date: Feb 4, 2026 -->

#### Skip counts for authenticator enrollment grace periods is EA

This feature allows admins to define a number of skips that end users can defer enrollment into an authenticator, as well as customizations to the prompt when end users see the grace period. See [Grace periods](/docs/concepts/policies/#grace-periods) and [type](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=1/settings/authenticators/enroll/gracePeriod/0/type&t=request).

<!-- OKTA-1044803 FF: ENROLLMENT_POLICY_GRACE_PERIOD_V2 preview date: Feb 4, 2026 -->

#### Dynamic OS version compliance for device assurance is GA in Preview

You can configure OS version compliance by using device assurance. However, you have to manually update the policies every time a new OS version or patch is released. With **Dynamic OS version compliance**, Okta updates device assurance policies with the latest OS versions and patches, eliminating the need for manual updates. With this feature you can ensure OS version compliance in your org without tracking OS releases. See [Dynamic OS version compliance](https://help.okta.com/okta_help.htm?type=oie&id=csh-device-assurance-add) and [Device Assurance Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/#tag/DeviceAssurance/operation/createDeviceAssurancePolicy!path=1/osVersion&t=request). <!-- DEVICE_ASSURANCE_DYNAMIC_OS_SUPPORT OKTA-651282 Preview date: February 6, 2024 -->

#### Grace period for device assurance is GA in Preview

Occasionally, users' devices might fall out of compliance with security policies due to temporary conditions such as missed software updates or unapproved network connections. Without a grace period, they would be immediately blocked from accessing critical resources, which disrupts productivity and causes frustration. The grace period for device assurance feature allows you to define a temporary window during which non-compliant devices can still access resources. This gives users time to remediate issues without being locked out, balancing productivity with security standards.

See [Device Assurance Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/#tag/DeviceAssurance/operation/createDeviceAssurancePolicy!path=0/gracePeriod&t=request) and the [Add a device assurance policy guide](https://help.okta.com/okta_help.htm?type=oie&id=csh-device-assurance-add). <!-- DEVICE_ASSURANCE_GRACE_PERIOD OKTA-803140 Preview date: October 9, 2024 -->

#### Lightweight directory access protocol bidirectional group management is GA in Production

The [Bidirectional Group Management API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DirectoriesIntegration) has been expanded to allow you to manage Lightweight Directory Access Protocol (LDAP) groups from within Okta. You can add or remove users from groups based on their identity and access requirements. This ensures that changes made to user access in Okta are reflected in LDAP.

Okta can only manage group memberships for users and groups imported into Okta using the LDAP or Active Directory (AD) integration. It isn't possible to manage users and groups that weren't imported through LDAP or AD integration or are outside the organizational unit's scope for the integration using this feature.

#### Detection settings in session protection is GA in Preview

Tailor ITP to your org's security priorities to gain control and balance security with a seamless user experience. With new detection settings, you can define which session context changes trigger policy re-evaluations, helping you focus only on what truly matters. See [Session protection](https://help.okta.com/okta_help.htm?type=oie&id=csh-continuous-access-evaluation).

#### Passkeys rebrand is self-service EA in Preview

The FIDO2 (WebAuthn) authenticator is being rebranded to Passkeys (FIDO2 WebAuthn). The FIDO2 (WebAuthn) authenticator is being rebranded to Passkeys (FIDO2 WebAuthn) and Okta is introducing enhanced administrative controls and a streamlined user experience. This update centralizes passkey management through a consolidated settings page, allows for customized authenticator naming, and introduces a dedicated **Sign in with a passkey** button within the Sign-In Widget. These enhancements simplify the authentication journey and provide users with a more intuitive sign-in process with the **Sign in with a passkey** button.

For more information about the new settings and updates, see [Configure the FIDO2 (WebAuthn) authenticator](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-webauthn) and [`settings`](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/#tag/Authenticator/operation/replaceAuthenticatorMethod!path=8/settings&t=request).

<!-- OKTA-1012303 FF: PASSKEYS_REBRAND preview date: Feb 4, 2026 -->

#### Custom FIDO2 AAGUID is GA in Production

You can now use the [Authenticators API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/) to create, view, and update custom Authenticator Attestation Global Unique Identifiers (AAGUIDs).

Admins can add non-FIDO Metadata Service (MDS) security keys and other authenticators and have more granular control over them. This extends FIDO2 (WebAuthn) authenticator support to a wider range of security keys and other authenticators, which gives admins greater flexibility and control over the security in their environment.

<!-- OKTA-971037 WEBAUTHN_CUSTOM_AAGUID preview date: July 16, 2025 -->

#### OAuth 2.0 support for custom email providers is self-service EA in Preview

You can now configure custom email providers with OAuth 2.0 authentication. You can choose between two OAuth 2.0 client configurations to fetch access tokens and use those access tokens to authenticate with your email provider's SMTP server. See [Custom email providers with OAuth 2.0](/docs/guides/custom-smtp/main/) to understand the new OAuth 2.0 methods.

* See [Use your own email provider](https://help.okta.com/okta_help.htm?type=oie&id=csh-email-provider-main) to configure them in the Admin Console.
* See the [Email Providers API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/EmailServer/) to configure them with APIs.

<!-- OKTA-1100448 FF: OAUTH_FOR_CUSTOM_SMTP_SERVER, preview date: Feb 4, 2026 -->

#### Okta as a fallback IdP is self-service EA in Preview

This feature redirects users to Okta to authenticate if the primary identity provider can't establish their identity. This can happen because of explicit rejections, like invalid credentials and MFA failures, or if an existing user session can't be silently verified, such as during a `prompt=none` OIDC request or `IsPassive=true` SAML request. See the [Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/listPolicyRules!c=200&path=4/actions&t=response). <!-- OKTA-1091224 ALLOW_IDENTITY_PROVIDER_CHAINING Preview org date: January 28, 2026 -->

#### Developer documentation updates in 2026.02.0

* All references to deprecated API Postman collections are now removed from [Home | Okta Developer](https://developer.okta.com/) and replaced with references to the [Okta Public API Collections](https://www.postman.com/okta-eng/okta-public-api-collections/overview) workspace.
* The new [Add a sign-in form to your mobile app](https://developer.okta.com/docs/journeys/OCI-mobile/main/) journey helps you build a secure and complete sign-in experience for your mobile app, giving your users seamless access while protecting their data.
* The new [Universal Directory](/docs/concepts/universal-directory/) concept provides a comprehensive overview of Okta's Universal Directory (UD). UD is the centralized data layer that serves as the foundation for the entire Okta platform. This new doc replaces the previous User Profiles concept and goes into more depth on its components and advantages.
* The Okta developer portal search results now include the API references.
* The new [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/authserver/main/) guide explains how to configure token exchange for AI agents. This feature enables you to securely request and use credentials such as Identity Assertion JWTs (ID-JAGs), secrets, or service accounts to access resources on behalf of authenticated users.
* The [/token](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/token) endpoint now supports token exchange flows for AI agents through the standard OAuth 2.0 Token Exchange grant type.
* The Okta Model Context Protocol (MCP) server is a secure protocol abstraction layer that enables AI agents/Large Language Models (LLMs) to interact with an Okta org. MCP clients can now communicate with the Okta scoped management APIs in natural language. This simplifies building context-aware AI workflows while ensuring strict access control and least-privilege security. To learn more and start your implementation, see the [Okta MCP server concept](/docs/concepts/mcp-server/) and [guide](/docs/guides/mcp-server/main/). Also, MCP now has its own dedicated [Release Notes](/docs/release-notes/2026-okta-mcp-server) section. In the future, refer to this page for all MCP server announcements.

#### Bugs fixed in 2026.02.0

* When users requested metadata for a non-existent identity provider, the system attempted to trigger an undefined error code. This caused a secondary exception in the Splunk logs. (OKTA-504955)
* When no-cache, no-store headers from `/oauth2/<authorizationServerId>/v1/keys` were returned, it caused an unnecessarily high number of requests to `/oauth2/<authorizationServerId>/v1/keys`. (OKTA-1099636)

## January

### Weekly release 2026.01.2
<!-- Published on: 2026-01-29T12:00:00Z -->
| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2026.01.2](#bugs-fixed-in-2026-01-2)| January 28, 2026 |

#### Bugs fixed in 2026.01.2

* POST requests to the `/device-assurances` endpoint and PUT requests to the `/device-assurances/{deviceAssuranceId}` endpoint for `ANDROID` or `IOS` platforms permitted the inclusion of the Windows-specific `thirdPartySignalProviders.dtc` object. (OKTA-1045564)

* Upon activation (`POST /users/{id}/lifecycle/activate?sendEmail=true`), some users were enrolled in duplicate email authenticators for the same address. (OKTA-1046873)

* When you call the List all Groups API ([`/api/v1/groups`](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/#tag/Group/operation/listGroups)) with the `expand=stats` query parameter, the response returned inaccurate data for the `_embedded.stats.hasAdminPrivileges` field for groups with assigned custom roles. (OKTA-1094903)

* The link to the API reference for **Native to Web SSO** on the **Features** page was broken. (OKTA-1094965)

### Weekly release 2026.01.1
<!-- Published on: 2026-01-14T12:00:00Z -->
| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bug fixed in 2026.01.1](#bug-fixed-in-2026-01-1)| January 14, 2026 |

#### Bug fixed in 2026.01.1

When an admin sent a GET request to the `/idp/myaccount/password/complexity-requirements` endpoint, the response body contained HTML-escaped characters. (OKTA-1080153)

### Monthly release 2026.01.0
<!-- Published on: 2026-01-08T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Native to Web SSO is self-service EA in Preview](#native-to-web-sso-is-self-service-ea-in-preview) | January 7, 2026 |
| [Bring your own telephony credentials is self-service EA in Preview](#bring-your-own-telephony-credentials-is-self-service-ea-in-preview) | January 7, 2026 |
| [Client update policy is EA in Preview](#client-update-policy-is-ea-in-preview) | January 7, 2026 |
| [Encryption of ID tokens and access tokens is GA in Production](#encryption-of-id-tokens-and-access-tokens-is-ga-in-production) | August 7, 2025 |
| [Unified claims generation for custom apps is GA in Production](#unified-claims-generation-for-custom-apps-is-ga-in-production) | July 30, 2025 |
| [Custom FIDO2 AAGUID is GA in Preview](#custom-fido2-aaguid-is-ga-in-preview) | July 16, 2025 |
| [Improvements to the global session policy MFA requirements is GA in Production](#improvements-to-the-global-session-policy-mfa-requirements-is-ga-in-production) | December 10, 2025 |
| [Additional Anything-as-a-Source API endpoints is GA in Production](#additional-anything-as-a-source-api-endpoints-is-ga-in-production) | December 10, 2025 |
| [Anything-as-a-Source for groups and group memberships API is GA in Production](#anything-as-a-source-for-groups-and-group-memberships-api-is-ga-in-production) | December 10, 2025 |
| [Okta account management policy protection for password expiry flows is GA in Production](#okta-account-management-policy-protection-for-password-expiry-flows-is-ga-in-production) | July 2, 2025 |
| [New password complexity property is GA in Preview](#new-password-complexity-property-is-ga-in-preview) | June 4, 2025 |
| [Developer documentation updates in 2026.01.0](#developer-documentation-updates-in-2026-01-0) | January 7, 2026 |
| [Bugs fixed in 2026.01.0](#bugs-fixed-in-2026-01-0)| January 7, 2026 |

#### Native to Web SSO is self-service EA in Preview

Native to Web SSO creates a seamless, unified authentication experience when a user transitions from an OIDC app (like a native or web app) to a web app (either OIDC or SAML). This feature uses standard, web-based federation protocols like SAML and OpenID Connect that help bridge the gap between two different application environments, using a single-use, one-way interclient trust SSO token. This eliminates repeating already provided sign-on assurances, and simplifies development by reducing authentication complexity. <!-- NATIVE_TO_WEB_ONE_TIME_TOKEN_EXCHANGE OKTA-1065285 -->

#### Bring your own telephony credentials is self-service EA in Preview

You can now connect your own telephony provider using a new simplified setup that doesn't require you to use a telephony inline hook. You can handle usage billing directly with your provider. Okta currently supports Twilio and Telesign.

To configure your own telephony credentials, you can use the [Custom Telephony Provider API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/CustomTelephonyProvider/) or you can use the [Admin Console](https://help.okta.com/okta_help.htm?type=oie&id=configure-telephony-providers).
<!--  OKTA-1075267 CUSTOM_TELEPHONY_PROVIDERS-->

#### Client update policy is EA in Preview

The Policies API now supports the `CLIENT_POLICY` type, enabling you to enforce or defer app updates across different device platforms. This lets you programmatically align app versions with internal change management processes. See the [Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/listPolicies) and [Release controls policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-ov-release-controls). <!-- OKTA_VERIFY_RELEASE_CONTROL_POLICY OKTA-1036332 January 7, 2026 -->

#### Encryption of ID tokens and access tokens is GA in Production

You can now encrypt OIDC ID tokens for Okta-protected custom app integrations using JSON Web Encryption. You can also now encrypt access tokens minted by a custom authorization server. See [Key management](/docs/guides/key-management/main/). <!-- OIDC_TOKEN_ENCRYPTION OKTA-978457 -->

#### Unified claims generation for custom apps is GA in Production

Unified claims generation is a new streamlined interface for managing claims (OIDC) and attribute statements (SAML) for Okta-protected custom app integrations. In addition to group and user profile claims, the following new claim types are available: `entitlements` (required OIG), `device.profile`, `session.id`, and `session.amr`. See [Okta Expression Language in Identity Engine](/docs/reference/okta-expression-language-in-identity-engine/).

<!-- GENERIC_FEDERATED_CLAIM_LAYER OKTA-971830 -->

#### Custom FIDO2 AAGUID is GA in Preview

You can now use the [Authenticators API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/) to create, view, and update custom Authenticator Attestation Global Unique Identifiers (AAGUIDs).

Admins can add non-FIDO Metadata Service (MDS) security keys and other authenticators and have more granular control over them. This extends FIDO2 (WebAuthn) authenticator support to a wider range of security keys and other authenticators, which gives admins greater flexibility and control over the security in their environment.

#### Improvements to the global session policy MFA requirements is GA in Production

The Policy API now correctly enforces MFA requirements for every sign-in attempt when **New Device** is included as a behavior and MFA is required in a global session policy. See the [Policy API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule!path=3/actions/signon/factorPromptMode&t=request).

<!-- OKTA-1070041 DISALLOW_INVALID_BEHAVIOR_AND_FACTOR_MODE_COMBINATION_FOR_GSP, preview date: Dec 10, 2025 -->

#### Additional Anything-as-a-Source API endpoints is GA in Production

Anything-as-a-Source (XaaS) capabilities allow customers to use a custom identity source with Okta. With XaaS, customers can source entities such as users into Okta Universal Directory by connecting a custom HR app or a custom database. This release offers Anything-as-a-Source APIs for both individual operations and bulk operations on groups, group memberships, and users. Okta now enables creating and updating users, creating and updating groups, and managing group memberships into Okta Universal Directory from any identity source using the Identity Source APIs. See [Identity Sources](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentitySource/).

<!-- OKTA-1063549 IDENTITY_SOURCE_MANAGE_INDIVIDUAL_ENTITIES -->

#### Anything-as-a-Source for groups and group memberships API is GA in Production

Anything-as-a-Source (XaaS) capabilities allow customers to use a custom identity source with Okta. With XaaS, customers can source entities such as users into Okta Universal Directory by connecting a custom HR app or a custom database. This release offers XaaS capabilities with groups and group memberships, allowing customers to start sourcing groups with XaaS. Okta now enables creating and updating users, creating and updating groups, and managing group memberships into Okta Universal Directory from any identity source using the Identity Source APIs. See [Identity Sources](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentitySource/).

<!-- IDENTITY_SOURCE_APPS_GROUPS OKTA-1009858 -->

#### Okta account management policy protection for password expiry flows is GA in Production

This feature improves the security posture of customer orgs by protecting the password expiry flow with the Okta account management policy. Password expiry flows now require the assurance defined in an org's Okta account management policy.

You can now use the [`metadata`](/docs/reference/okta-expression-language-in-identity-engine/#okta-account-management) component in an Expression Language condition for an Okta account management policy. You can only use `metadata` in an expression that's related to password expiry. See [Enable password expiry](https://help.okta.com/okta_help.htm?type=oie&id=oamp-enable-password-expiry)

<!-- OKTA-853468 AMP_FOR_PASSWORD_EXPIRY preview org: july 2, 2025 -->

#### New password complexity property is GA in Preview

You can now use the `oelStatement` property to block words from being used in passwords. This feature enhances security by allowing you to customize your password strength requirements. See the [Policy API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=3/settings/password/complexity/oelStatement&t=request).

<!-- OKTA-849300 PASSWORD_POLICY_OEL_STATEMENT Preview date: June 4, 2025-->

#### Developer documentation updates in 2026.01.0

* The new [Express Configuration customer configuration guide template](/docs/guides/express-config-guide-template/main/) is available to help Express Configuration partners create accurate configuration guides for their customers. This resource provides standardized instructions for setting up apps that use Express Configuration, covering functionalities such as SSO, Universal Logout, and SCIM provisioning.
* The rate limits documentation has been revised and updated on the References tab. New updates include detailed explanations on rate limit buckets, as well as more information on how to increase your rate limits. See the [Rate Limits overview](/docs/reference/rate-limits/).
* The Okta API release notes now provide an RSS feed for each API release note category: [Classic Engine](/docs/release-notes/2026/), [Identity Engine](/docs/release-notes/2026-okta-identity-engine/), [Identity Governance](/docs/release-notes/2026-okta-identity-governance/), [Privileged Access](/docs/release-notes/2026-okta-privileged-access/), [Access Gateway](/docs/release-notes/2026-okta-access-gateway/), and [Aerial](/docs/release-notes/2026-okta-aerial/). Click the RSS icon to subscribe.

#### Bugs fixed in 2026.01.0

* The following attributes weren't properly being gated as reserved attributes: `orgid`, `activationstatus`, `apistatus`, `logintype`, `initialreconcilecomplete`, `activationdate`, `statuschangeddate`, `apilastupdate`, `passwordexpirationguess`, `passwordexpirationcursor`, `numunlocks`, `changedstatus`. See [Review reserved attributes](https://help.okta.com/okta_help.htm?type=oie&id=reserved-attributes). (OKTA-1049339)

* An error sometimes occurred when an admin attempted to update the username for an app user. (OKTA-1047716)
