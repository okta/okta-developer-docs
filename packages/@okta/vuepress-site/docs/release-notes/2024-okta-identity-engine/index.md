---
title: Okta Identity Engine API release notes 2024
---

<ApiLifecycle access="ie" />

# Okta Identity Engine API release notes (2024)

## October

### Monthly release 2024.10.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [End-of-year deprecation for the Risk Provider and Risk Events APIs](#end-of-year-deprecation-for-the-risk-provider-and-risk-events-apis) | December 31, 2024 |
| [New field for filtering zones](#new-field-for-filtering-zones) | October 9, 2024 |
| [Grace period for device assurance is EA in Preview](#grace-period-for-device-assurance-is-ea-in-preview) | October 9, 2024 |
| [OIDC Identity Provider options](#oidc-identity-provider-options) | October 9, 2024 |
| [Two System Log event types now provide event outcome reasons](#two-system-log-event-types-now-provide-event-outcome-reasons) | October 9, 2024 |
| [Seamless ISV experience for SCIM is GA in Preview](#seamless-isv-experience-for-scim-is-ga-in-preview) | October 9, 2024 |
| [New Okta Secure Identity collection in the OIN catalog](#new-okta-secure-identity-collection-in-the-oin-catalog) | October 9, 2024 |
| [New Policies API property for authentication method object](#new-policies-api-property-for-authentication-method-object) | October 9, 2024 |
| [Enhanced Dynamic Network Zones is GA in Production](#enhanced-dynamic-network-zones-is-ga-in-production) | May 15, 2024 |
| [YubiKey preregistration feature is GA in Preview](#yubikey-preregistration-feature-is-ga-in-preview) | July 17, 2024 |
| [Developer documentation updates in 2024.10.0](#developer-documentation-updates-in-2024-10-0) | October 9, 2024 |
| [Bugs fixed in 2024.10.0](#bugs-fixed-in-2024-10-0)| October 9, 2024 |

#### End-of-year deprecation for the Risk Provider and Risk Events APIs

These APIs will be deprecated on December 31, 2024. Use the [SSF Receiver API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SSFReceiver/) instead to receive security-related events and other data-subject signals. Use the [SSF Security Event Tokens API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SSFSecurityEventToken/) for third-party security event providers. <!-- (OKTA-813817) -->

#### New field for filtering zones

The `system` field is now available for the `filter` [Network Zones query parameter](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/NetworkZone/#tag/NetworkZone/operation/listNetworkZones!in=query&path=filter&t=request), in addition to the `id` and `usage` fields. The values supported are `true` or `false`.

#### Grace period for device assurance is EA in Preview

Occasionally, users’ devices might fall out of compliance with security policies due to temporary conditions such as missed software updates or unapproved network connections. Without a grace period, they would be immediately blocked from accessing critical resources, which disrupts productivity and causes frustration. The grace period for the device assurance feature allows you to define a temporary window during which non-compliant devices can still access resources. This gives users time to remediate issues without being locked out, balancing productivity with security standards. See [Device Assurance Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/#tag/DeviceAssurance/operation/createDeviceAssurancePolicy!path=0/gracePeriod&t=request) and the [Add a device assurance policy guide](https://help.okta.com/okta_help.htm?type=oie&id=csh-device-assurance-add). <!-- DEVICE_ASSURANCE_GRACE_PERIOD -->

#### OIDC Identity Provider options

OpenID Connect Identity Providers can now have both the Account Link and JIT policies set to `disabled`.

#### Two System Log event types now provide event outcome reasons

The `Event.Outcome.Reason` field for the `user.authentication.auth_via_IDP` and `user.authentication.auth_via_social` [event types](https://developer.okta.com/docs/reference/api/event-types/) now indicates whether a successful IdP sign-in flow was due to JIT provisioning or account linking. <!-- (OKTA-808605) -->

#### Seamless ISV experience for SCIM is GA in Preview

Okta now provides a seamless ISV experience to optimize the [Okta Integration Network (OIN)](https://www.okta.com/integrations/) submission experience for SCIM integrations. This new experience enables independent software vendors (ISVs) to build and manually test their SCIM integration metadata before submission to the OIN. This reduces the time needed for the OIN team to review and validate that the SCIM integration functions as intended, which shortens the time to publish in the OIN. This experience also incorporates communication processes in Salesforce, enabling improved collaboration internally within Okta teams and externally with ISVs. See [Publish an OIN integration overview](https://developer.okta.com/docs/guides/submit-app-overview/) and [Submit an integration with the OIN Wizard](https://developer.okta.com/docs/guides/submit-oin-app/scim/main/) guide. <!-- SCIM_SUBMISSION -->

#### New Okta Secure Identity collection in the OIN catalog

A new *Okta Secure Identity* collection is available in the Okta Integration Network (OIN) catalog. This collection identifies integrations that are part of the [Okta Secure Identity commitment](https://www.okta.com/secure-identity-commitment/). See the [OIN catalog](https://www.okta.com/integrations/?category=okta-secure-identity) for a list of integrations assigned to this collection.

#### New Policies API property for authentication method object

A new `userVerificationMethods` property is available for the `authenticationMethods` object of the Policy API<!--[Policy API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule!path=0/actions/appSignOn/verificationMethod/1/chains/authenticationMethods/userVerificationMethods&t=request)-->. When you create a rule that uses the `AUTH_METHOD_CHAIN` verification method type, you can use this setting to specify the verification method for a user.

#### Enhanced Dynamic Network Zones is GA in Production

Use enhanced dynamic network zones to define IP service categories (proxies, VPNs), locations, and Autonomous System Numbers (ASNs) that are allowed or blocked in a zone. See the [Network Zones API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/NetworkZone/). <!--ENHANCED_DYNAMIC_NETWORK_ZONE (OKTA-727934)-->

#### YubiKey preregistration feature is GA in Preview

You can now assign a fulfillment error status to a WebAuthn Preregistration factor, by making a request to `users/{userId}/enrollments/{authenticatorEnrollmentId}/mark-error`. In a preregistration workflow, use the assigned error status to see if WebAuthn preregistration enrollments encounter an error during fulfillment. See [WebAuthn Preregistration](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/WebAuthnPreregistration/#tag/WebAuthnPreregistration/operation/assignFulfillmentErrorWebAuthnPreregistrationFactor).

Admins were previously unable to enroll and ship YubiKeys as WebAuthn enrollments in a quick and automated way. The [WebAuthn Preregistration](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/WebAuthnPreregistration/) feature enables admins to preregister YubiKey factors as WebAuthn enrollments for both staged and existing (active) users using a Workflows and Yubico integration to seamlessly handle the registration and shipment.  <!-- https://oktainc.atlassian.net/browse/OKTA-720689 YUBIKEY_PREREGISTRATION_AS_WEBAUTHN_ENROLLMENT -->

#### Developer documentation updates in 2024.10.0

* We have expanded and updated our Terraform documentation to cover deeper topics.

  * An expanded **Manage** section with an article on importing existing resources into Terraform and new resources.

    * [Manage device connection requirements using Terraform](/docs/guides/terraform-configure-device-signin-standards/)
    * [Manage custom domains with Terraform](/docs/guides/terraform-manage-multiple-domains/main/)
    * [Manage branding with Terraform](/docs/guides/terraform-manage-end-user-experience/main/) (updated and expanded)

  * An article on making the Terraform connection as secure as possible.

    * [Control Terraform access to Okta](/docs/guides/terraform-design-access-security/main/)

  * Articles to help save time.

    * [Organize your Terraform configuration](/docs/guides/terraform-organize-configuration/main/)
    * [Terraform syntax tips for automation](/docs/guides/terraform-syntax-tips/)

* Our [SDK documentation](https://developer.okta.com/code/) has been refreshed and updated to reflect our modern SDKs and recommended development paths. See **SDKs** in the menu.

<div class="three-quarter">

![Developer docs top menu bar](/img/homepage/SDKs-menu.png)

</div>

#### Bugs fixed in 2024.10.0

* The `okta.oauthIntegrations.manage`  OAuth 2.0 authentication scope wasn’t supported for the create an API service integration endpoint (`POST /integrations/api/v1/api-services` ).  (OKTA-735510)
* The SAML IdP `login` property mapping validation was handled incorrectly. (OKTA-812517)

## September

### Weekly release 2024.09.3

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bug fixed in 2024.09.3](#bug-fixed-in-2024-09-3)| October 2, 2024 |

#### Bug fixed in 2024.09.3

Sometimes an "Invalid Phone Number" error was incorrectly returned during SMS factor enrollment. (OKTA-807741)

### Weekly release 2024.09.2

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2024.09.2](#bugs-fixed-in-2024-09-2)| September 25, 2024 |

#### Bugs fixed in 2024.09.2

* Users weren't prompted for MFA when they attempted to reauthenticate with *Keep Me Signed In* enabled and the `prompt` parameter set to `login consent`. (OKTA-746325)
* When an admin made a partial update using the Profile Mappings API, both incoming data and existing property mappings were validated instead of only the incoming request. (OKTA-798638)
* User verification settings were returned in authentication method chain responses, even though the Assurance User Verification feature wasn't enabled in the org. (OKTA-798274)

### Weekly release 2024.09.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bug fixed in 2024.09.1](#bug-fixed-in-2024-09-1)| September 18, 2024 |

#### Bug fixed in 2024.09.1

If the Okta account management policy was used, GET calls to the `/idp/myaccount/authenticators/{authenticatorId}/enrollments` endpoint returned incomplete values. (OKTA-794253)

### Monthly release 2024.09.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Descriptions for Entitlement and Role objects](#descriptions-for-entitlement-and-role-objects) | September 11, 2024 |
| [Enhanced Dynamic Network Zones is GA in Preview](#enhanced-dynamic-network-zones-is-ga-in-preview) | May 15, 2024 |
| [Event hook System Log update](#event-hook-system-log-update) | September 11, 2024 |
| [Global token revocation for wizard SAML and OIDC apps](#global-token-revocation-for-wizard-saml-and-oidc-apps) | September 11, 2024 |
| [Granular configuration for Keep Me Signed In is EA in Preview](#granular-configuration-for-keep-me-signed-in-is-ea-in-preview) | September 11, 2024 |
| [New Device Assurance Policy API System Log events](#new-device-assurance-policy-api-system-log-events) | September 11, 2024 |
| [New User Risk API is GA in Production](#new-user-risk-api-is-ga-in-production) | September 11, 2024 |
| [Okta Personal Settings API is GA in Preview](#okta-personal-settings-api-is-ga-in-preview) | September 11, 2024 |
| [System Log events added for Okta Workflows](#system-log-events-added-for-okta-workflows) | September 11, 2024 |
| [System Log event update for user risk is GA in Production](#system-log-event-update-for-user-risk-is-ga-in-production) | August 7, 2024 |
| [Developer documentation update in 2024.09.0](#developer-documentation-update-in-2024-09-0) | September 11, 2024 |
| [Bugs fixed in 2024.09.0](#bugs-fixed-in-2024-09-0)| September 11, 2024 |

#### Descriptions for Entitlement and Role objects

SCIM 2.0 with entitlements now supports a `description` field for Entitlement and Role objects.
<!--OKTA-741183-->

#### Enhanced Dynamic Network Zones is GA in Preview

Use enhanced dynamic network zones to define IP service categories (proxies, VPNs), locations, and Autonomous System Numbers (ASNs) that are allowed or blocked in a zone. See the [Network Zones API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/NetworkZone/). <!--ENHANCED_DYNAMIC_NETWORK_ZONE OKTA-727934-->

#### Event hook System Log update

The `user.account.unlock_by_admin` event type is now event hook eligible. See [Event types](/docs/reference/api/event-types/). <!--OKTA-802486 OKTA-715243-->

#### Global token revocation for wizard SAML and OIDC apps

Universal Logout clears sessions and tokens for wizard SAML and OIDC apps. This enhancement extends Universal Logout functionality to more types of apps and provides greater flexibility to admins. <!--OKTA-797187 GLOBAL_TOKEN_REVOCATION_SUPPORT-->

#### Granular configuration for Keep Me Signed In is EA in Preview

Admins can now configure the post-authentication prompt for Keep Me Signed In (KMSI) at a granular level in authentication policies. This allows admins to selectively enable post-authentication KMSI on a per-user, per-group, or per-app basis. When enabled, this feature exposes a frequency setting that lets admins control how often the post-authentication prompt is presented to users. See [Keep me signed in](https://help.okta.com/okta_help.htm?type=oie&id=ext-stay-signed-in).

The post-authentication prompt text (title, subtitle, accept button, and reject button) is now customizable through the Brands API. See [Brands API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/CustomPages/#tag/CustomPages/operation/replaceCustomizedSignInPage). <!--OKTA-791596 POST_AUTH_KMSI_IN_AUTH_POLICY-->

#### New Device Assurance Policy API System Log events

New System Log events are generated when the following methods are used on the `/device-assurances` endpoint:

* POST: `device.assurance.policy.add`
* PUT: `device.assurance.policy.update`
* DELETE: `device.assurance.policy.delete`

See [Event types](/docs/reference/api/event-types/).
<!--OKTA-795306-->

#### New User Risk API is GA in Production

The new [User Risk API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/UserRisk/#tag/UserRisk) enables you to manage and view a user's risk level using an API. Previously, you could only elevate a user’s risk level using the Admin Console. <!-- OKTA-736701 -->

#### Okta Personal Settings API is GA in Preview

The [Okta Personal Settings API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/OktaPersonalSettings/) allows you to manage [Okta Personal](https://www.okta.com/products/okta-personal/workforce/) admin settings.

Okta Personal for Workforce is a free account that helps users separate their work apps from non-work apps. Okta Personal makes it easy for users to switch between their personal and work accounts, and to migrate their personal apps from an existing Okta enterprise tenant. When you enable Okta Personal for Workforce in your org, users receive a notification that encourages them to use Okta Personal for personal apps and Okta enterprise for work apps. See [Okta Personal for Workforce user experience](https://help.okta.com/oie/en-us/content/topics/okta-personal/okta-personal-for-workforce/user-experience.htm). <!--OKTA-794131-->

#### System Log events added for Okta Workflows

The `workflows.user.flow.move` and `workflows.user.table.move` Okta Workflows events have been added to the System Log to record the changes that occur due to reorganization of folder-level resources. <!--OKTA-669131-->

#### System Log event update for user risk is GA in Production

In the [System Log](https://developer.okta.com/docs/reference/api/event-types/?q=user.risk.change), the `user.risk.detect` event now appears instead of the `user.risk.change` event when Okta detects an entity that's associated with a risk level. <!-- ENABLE_USER_RISK_DETECT_EVENT OKTA-735117 -->

#### Developer documentation update in 2024.09.0

Our [API documentation](https://developer.okta.com/docs/api/) has a new look and feel that features a more logical navigation which aligns with industry standards. See **API Docs** in the menu.

<div class="three-quarter">

![Developer docs top menu bar](/img/homepage/APIDocs-menu.png)

</div>

API content in the **References** section will be moved after September 30, 2024.

#### Bugs fixed in 2024.09.0

* When creating or updating a profile, user first or last names that contained a dot (`last.name`) triggered malformed field error messages. (OKTA-798884)

* The `AUTH_METHOD_CHAIN` verification type allowed users to save duplicate IdP authentication methods. (OKTA-796280)

* Admins couldn't configure the `okta.myAccount.sessions.manage` scope as a custom scope on custom authorization servers. (OKTA-748880)

* The Custom Token Scopes endpoints (`/api/v1/authorizationServers/{authServerId}/scopes`) for the Authorization Server API didn't support pagination. (OKTA-734223)

* Deleted apps weren't removed from routing rules and were returned by calls to the `/policies` endpoint if the call used `IDP_DISCOVERY` as the `type`. (OKTA-734045)

## August

### Weekly release 2024.08.3

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2024.08.3](#bugs-fixed-in-2024-08-3)| August 28, 2024 |

#### Bugs fixed in 2024.08.3

* The system log displayed an incorrect actor when events were triggered by a Reset factor API request. (OKTA-752183)

* The API request to update the default provisioning connection (`POST /api/v1/apps/{appId}/connections/default?activate=true`) returned generic error messages when the connection update failed. (OKTA-718570)

* A cache issue caused an error when an admin tried to create routing rules using the Policy API (`POST /api/v1/policies/{policyId}/rules`). (OKTA-712397)

### Weekly release 2024.08.2

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Updated MyAccount API System Log events](#updated-myaccount-api-system-log-events) | August 21, 2024 |
| [Custom domain and custom email domain System Log events updates](#custom-domain-and-custom-email-domain-system-log-events-updates) | August 21, 2024 |
| [Bugs fixed in 2024.08.2](#bugs-fixed-in-2024-08-2) | August 21, 2024 |

#### Updated MyAccount API System Log events

The following System Log events are generated when these endpoints are called:

* POST `/idp/myaccount/emails`: `user.account.update_profile`, `system.email.send_factor_verify_message`
* DELETE `/idp/myaccount/emails/{id}`: `user.account.update_profile`
* POST `/idp/myaccount/phones/{id}/verify`: `user.mfa.factor.activate`
* DELETE `/idp/myaccount/phones/{id}`: `user.mfa.factor.deactivate`

See [Event types](/docs/reference/api/event-types/). <!--OKTA-790035-->

#### Custom domain and custom email domain System Log events updates

In the System Log, the `system.custom_url_domain.verify` and `system.email_domain.verify` events now appear when a verification succeeds or fails. <!--OKTA-790610-->

#### Bugs fixed in 2024.08.2

* When `/api/v1/principal-rate-limits` was called to create or update a principal rate limit for an OAuth app, and a 404 server error was returned, the rate limit was still created or updated. (OKTA-652674)

* In orgs with the Okta account management policy configured for recovery, requests to update a password policy rule (`/policies/{policyId}/rules/{ruleId}`) without authenticators received an API validation error response. (OKTA-738910)

* When Authentication Method Reference (AMR) claims were sent as comma-separated values, AMR claims mapping for SAML failed. (OKTA-791512)

* The `honorPersistentNameId` parameter default setting for SAML IdPs was set to `false` if it was omitted from IdP API requests. (OKTA-791891)

* Some Group API users experienced inconsistent pagination when the `limit` was higher than 200. (OKTA-795107)

### Weekly release 2024.08.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Authentication method chain is self-service EA](#authentication-method-chain-is-self-service-ea) | August 14, 2024 |
| [Bug fixed in 2024.08.1](#bug-fixed-in-2024-08-1) | August 14, 2024 |

#### Authentication method chain is self-service EA

With this feature, you can require users to verify with multiple authentication methods in a specified sequence using the `AUTH_METHOD_CHAIN` verification method. You can create multiple authentication method chains in an authentication policy rule to cater to different use cases and scenarios. See [Create a Policy Rule](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy) and [Authentication method chain](https://help.okta.com/okta_help.htm?type=oie&id=csh-auth-method-chain). <!-- OKTA-790586 AUTHENTICATION_METHOD_CHAIN FF -->

#### Bug fixed in 2024.08.1

Requests to list client secrets (`/api/v1/apps/{appId}/credentials/secrets`) and get a client secret (`/api/v1/apps/{appId}/credentials/secrets/{id}`) didn't fire a System Log event when the client secrets were returned in the response. (OKTA-692600)

### Monthly release 2024.08.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Continuous Access renamed to Post auth session](#continuous-access-renamed-to-post-auth-session) | August 7, 2024 |
| [Extended support for TLS certificates and private keys for custom domains](#extended-support-for-tls-certificates-and-private-keys-for-custom-domains) | August 7, 2024 |
| [Network zone allowlists for SSWS API tokens is GA Preview](#network-zone-allowlists-for-ssws-api-tokens-is-ga-preview) | August 7, 2024 |
| [New System Log API property for target object is GA Production](#new-system-log-api-property-for-target-object-is-ga-production) | August 7, 2024 |
| [Request throttling for jwks_uri](#request-throttling-for-jwks-uri) | August 7, 2024 |
| [System Log events updates](#system-log-events-updates) | August 7, 2024 |
| [System Log update for requests made with access tokens](#system-log-update-for-requests-made-with-access-tokens) | August 7, 2024 |
| [Updated Universal Directory System Log events](#updated-universal-directory-system-log-events) | August 7, 2024 |
| [User risk System Log event update](#user-risk-system-log-event-update) | August 7, 2024 |
| [Bugs fixed in 2024.08.0](#bugs-fixed-in-2024-08-0) | August 7, 2024 |

#### Continuous Access renamed to Post auth session

Continuous Access has been renamed to Post auth session. As a result, there are a few changes:

Renamed System Log events:

* `policy.continuous_access.evaluate` is deprecated. `policy.auth_reevaluate.enforce` replaces it and is triggered when a Post auth session evaluation occurs.

* `policy.continuous_access.action` is deprecated. `policy.auth_reevaluate.action` replaces it and is triggered when Okta signs a user out of their configured apps or runs a Workflow in response to an authentication or global session policy violation.

Other changes:

* `CONTINUOUS_ACCESS` is deprecated. `POST_AUTH_SESSION` replaces it as the `type` parameter value in `/api/v1/policies`.

* The Terminate_Session `failureActions` object no longer supports the `slo.appSelectionMode` and `slo.appInstanceIds` properties. <!--OKTA-753634 POST_AUTH_SESSION-->

#### Extended support for TLS certificates and private keys for custom domains

Custom domains now support TLS certificates and private keys that are 2048, 3072, and 4096 bits. <!--OKTA-730872-->

#### Network zone allowlists for SSWS API tokens is GA Preview

Admins can now specify a network zone allowlist for each static (SSWS) API token. These allowlists define the IP addresses or network ranges from where Okta API requests using SSWS API tokens can be made. This restricts attackers and malware from stealing SSWS tokens and replaying them outside of the specified IP range to gain unauthorized access. <!--OKTA-691818 SSWS_IP_HARDENING-->

#### New System Log API property for target object is GA Production

Certain System Log events now contain a new property called `changeDetails` in the `target` object. When this property is populated, it reflects new, changed, or removed attributes of the target resource that's been modified. See [changeDetails property](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SystemLog/#tag/SystemLog/operation/listLogEvents!c=200&path=target/changeDetails&t=response). <!-- OKTA-724000-->

#### Request throttling for jwks_uri

Okta has decreased the frequency at which it reloads JWKs from a customer's `jwks_uri`. <!--OKTA-739345-->

#### System Log events updates

The following System Log events are now available:

* application.provision.group_push.deactivate_mapping

* system.agent.register

* security.attack_protection.settings.update

* system.self_service.configuration.update

* user.behavior.profile.reset

* system.identity_sources.bulk_upsert

* system.identity_sources.bulk_delete

* system.import.user_match.confirm

* system.import.schedule

* system.import.user_match.unignore

* system.import.user_match.update

* The application.lifecycle.update event now has the sessionIdleTimeoutMinutes and sessionMaxLifetimeMinutes fields. These fields add more session details to the event.

See [Event types](https://developer.okta.com/docs/reference/api/event-types/). <!-- OKTA-713852, OKTA-753583, OKTA-710604, OKTA-750439, OKTA-753780, OKTA-750879, OKTA-750876, OKTA-751223, OKTA-710489, OKTA-755721, OKTA-752579 -->

#### System Log update for requests made with access tokens

The client ID used to get an access token is now included in all System Logs for requests made with that access token. <!-- OKTA-667713-->

#### Updated Universal Directory System Log events

System Log events are generated when the following endpoints are called:

* POST /api/v1/groups/{id}/owners
* DELETE /api/v1/groups/{id}/owners/{ownerId}

* POST /api/v1/meta/types/user/{id}
* PUT /api/v1/meta/types/user/{id}

* PUT /api/v1/users/{id}/linkedObjects/{property}/{value}
* DELETE /api/v1/users/{id}/linkedObjects/{property} <!-- OKTA-710714-->

#### User risk System Log event update

In the System Log, the `user.risk.detect` event now appears instead of the `user.risk.change` event when Okta detects an entity that's associated with a risk level. <!--OKTA-735117 ENABLE_USER_RISK_DETECT_EVENT-->

#### Bugs fixed in 2024.08.0

* The Universal Logout endpoint (`oauth2/v1/global-token-revocation`) used the incorrect OAuth 2.0 scope. (OKTA-747477)

* Custom IdP profile attribute updates didn't validate the mandatory `externalName` property. (OKTA-690190)

* System Log events from a token exchange request were missing information about the subject and actor tokens. (OKTA-687172)

## July

### Weekly release 2024.07.2

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bug fixed in 2024.07.2](#bug-fixed-in-2024-07-2) | July 31, 2024 |

#### Bug fixed in 2024.07.2

Users that were created with the Users API (PUT `/users`) could include a security answer that contained all or part of the security question. (OKTA-712832)

### Weekly release 2024.07.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [YubiKey preregistration feature is self-service EA](#yubikey-preregistration-feature-is-self-service-ea) | July 17, 2024 |
| [New IP service categories added](#new-ip-service-categories-added) | July 17, 2024 |
| [Bugs fixed in 2024.07.1](#bugs-fixed-in-2024-07-1) | July 17, 2024|

#### YubiKey preregistration feature is self-service EA

Customer admins were previously unable to enroll and ship YubiKeys as WebAuthn enrollments in a quick and automated way. The YubiKey preregistration feature enables admins to preregister YubiKey factors as WebAuthn enrollments for both staged and existing (active) users using a Workflows and Yubico integration to seamlessly handle the registration and shipment. <!-- OKTA-720689 YUBIKEY_PREREGISTRATION_AS_WEBAUTHN_ENROLLMENT -->

#### New IP service categories added

Additional IP service categories have been added to the enhanced dynamic zones [IP service category list](https://help.okta.com/okta_help.htm?id=ext-about-ednz). <!-- OKTA-747047 -->

#### Bugs fixed in 2024.07.1

* When an admin created an authenticator with a name that had previously been used, an incorrect error message appeared. (OKTA-722067)

* If an API request in Preview contained any malformed syntax within the query string, the request was still processed. (OKTA-748246)

* Authenticators returned by GET requests to the `/idp/myaccount/authenticators` and `/idp/myaccount/authenticators/{authenticatorId}` endpoints had the `enrollable` property set to `true`. (OKTA-718177)

### Monthly release 2024.07.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [OIN Submission Tester copy function update](#oin-submission-tester-copy-function-update) | July 10, 2024 |
| [OIN Wizard guidance updates](#oin-wizard-guidance-updates) | July 10, 2024 |
| [Identity Threat Protection with Okta AI is GA in Production](#identity-threat-protection-with-okta-ai-is-ga-in-production) | April 3, 2024 |
| [Network zone allowlists for SSWS API tokens is GA Preview](#network-zone-allowlists-for-ssws-api-tokens-is-ga-preview) | July 10, 2024 |
| [Network Zones and API token restrictions](#network-zones-and-api-token-restrictions) | July 10, 2024 |
| [Read-only admins can't use the Principal Rate Limits API to update API tokens](#read-only-admins-can-t-use-the-principal-rate-limits-api-to-update-api-tokens) | July 10, 2024 |
| [Event hook limit increased](#event-hook-limit-increased) | July 10, 2024 |
| [Active Directory Bidirectional Group Management API is GA in Production](#active-directory-bidirectional-group-management-api-is-ga-in-production) | July 10, 2024 |

#### OIN Submission Tester copy function update

The copy function in the OIN Submission Tester **Network Traffic** results section now provides the option to copy the request step either as a URL or a cURL command. See [Run tests in the OIN Submission Tester](/docs/guides/submit-oin-app/openidconnect/main/#run-tests).
<!--OKTA-679512-->

#### OIN Wizard guidance updates

A new link to the [Okta Documentation](https://developer.okta.com/docs/guides/submit-oin-app/saml2/main/#properties) has been added to the **SAML properties** section of the OIN Wizard. Okta documentation provides guidance on Okta Expression Language usage in SAML properties with integration variables. See [Dynamic properties with Okta Expression Language](https://developer.okta.com/docs/guides/submit-oin-app/saml2/main/#dynamic-properties-with-okta-expression-language).
<!--OKTA-689994-->

#### Identity Threat Protection with Okta AI is GA in Production

Identity Threat Protection with Okta AI is a powerful risk assessment and response solution that provides post-authentication security to your org. By continuously analyzing risk signals that are native to Okta, risk signals from integrated security partner vendors, and your policy conditions, it safeguards orgs against identity attacks that occur during and outside of a user's session. When Identity Threat Protection discovers a risk, it can immediately end the user's sessions, prompt an MFA challenge, or invoke a workflow to restore your org's security posture. Using intuitive dashboard widgets and reports, you can easily monitor security threats as they happen. See [Identity Thread Protection with Okta AI](https://help.okta.com/okta_help.htm?type=oie&id=ext-itp-overview). See the [Shared Signals Framework (SSF) Receiver](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SSFReceiver/) and [SSF SET](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SSFSecurityEventToken/) APIs. <!-- OKTA-683707 ENABLE_USER_RISK_CHANGE_EVALUATIONS -->

#### Network zone allowlists for SSWS API tokens is GA Preview

Admins can now specify a network zone allowlist for each static (SSWS) API token. These allowlists define the IP addresses or network ranges from where Okta API requests using SSWS API tokens can be made. This restricts attackers and malware from stealing SSWS tokens and replaying them outside of the specified IP range to gain unauthorized access. <!-- OKTA-691818 SSWS_IP_HARDENING-->

#### Network Zones and API token restrictions

You can no longer update network zones so they're invalid for use with an API token. This applies only to network zones that are used as restrictions to API tokens. You can update network zones if you first remove them from the API token restriction. These zones can't be deactivated, deleted, blocklisted, or made anything other than an active IP zone. <!-- OKTA-736535-->

#### Read-only admins can't use the Principal Rate Limits API to update API tokens

Read-only admins can no longer use the principal rate limits endpoint (`/api/v1/principal-rate-limits/{principalRateLimitId}`) to update the rate limit for their own API tokens. <!-- OKTA-730827-->

#### Event hook limit increased

The limit on active event hooks per org has been increased from 10 to 25. See [Event hooks](/docs/concepts/event-hooks/). <!-- OKTA-741766 -->

#### Active Directory Bidirectional Group Management API is GA in Production

The [Bidirectional Group Management for Active Directory (AD) (Directories Integration) API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DirectoriesIntegration) allows you to manage AD groups from within Okta. You can add or remove users from groups based on their identity and access requirements. This ensures that changes made to user access in Okta are reflected in AD. When you use Okta Access Certifications to revoke a user's membership to an AD group, the removal is reflected in AD.

Okta can only manage group memberships for users and groups imported into Okta using the AD integration. It isn't possible to manage users and groups that weren't imported through AD integration or are outside the organizational unit's scope for the integration using this feature. <!--AD_BIDIRECTIONAL_GROUP_MANAGEMENT OKTA-734564, OKTA-747631-->

## June

### Weekly release 2024.06.2

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2024.06.2](#bugs-fixed-in-2024-06-2)  | July 2, 2024 |

#### Bugs fixed in 2024.06.2

* The Policy simulation API, `/api/v1/policies/simulate`, responded that non-admin users had access to the Okta Admin Console `appInstance`. (OKTA-729726)

* The List all IdP key credentials API response always included a "next" link header, even if there were no more pages left to return. (OKTA-718352)

* An app created by an API call with an existing `clientId` in the request payload didn't match the way an app was created in the UI. This resulted in the wrong app rate limit displayed in the rate limit dashboard. (OKTA-736117)

* The [oauth2/introspect](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/introspectCustomAS) endpoint hit rate limits without logging it in the System Log. (OKTA-744604)

* The number of group members returned from the `/api/v1/groups/{group_id}/users` API call was inconsistent with the database query count of the same group. (OKTA-747426)

### Weekly release 2024.06.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2024.06.1](#bugs-fixed-in-2024-06-1)  | June 20, 2024 |

#### Bugs fixed in 2024.06.1

* The `user.authentication.universal_logout` System Log event didn't capture all of the client data. (OKTA-706046)

* The System Log event description for `security.events.provider.receive_event` was "Third Party Vendor reported risk" and was updated to "Security Events Provider Reported Risk". (OKTA-725427)

* A System Log event wasn't present for provisioned users when the password-only sign-in flow failed. (OKTA-727271)

* The `security.breached_credential.detected` System Log event had a typo. (OKTA-736552)

### Monthly release 2024.06.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Active Directory Bidirectional Group Management API is GA in Preview](#active-directory-bidirectional-group-management-api-is-ga-in-preview) | June 5, 2024 |
| [Seamless ISV experience with integrated testing is GA in Production](#seamless-isv-experience-with-integrated-testing-is-ga-in-production) | June 5, 2024 |
| [Your OIN Integrations instruction updates](#your-oin-integrations-instruction-updates) | June 5, 2024 |
| [SCIM 2.0 endpoint call update for user ResourceType requirements](#scim-2-0-endpoint-call-update-for-user-resourcetype-requirements) | June 5, 2024 |
| [Increase to Inline Hooks](#increase-to-inline-hooks) | June 5, 2024 |
| [New attribute to manage SAML app session lifetimes is GA in Preview](#new-attribute-to-manage-saml-app-session-lifetimes-is-ga-in-preview) | June 5, 2024 |
| [Protected actions in the Admin Console](#protected-actions-in-the-admin-console-is-ga-in-preview) | June 5, 2024 |
| [Event hook for session context changes](#event-hook-for-session-context-changes) | June 5, 2024 |
| [Developer documentation update in 2024.06.0](#developer-documentation-update-in-2024-06-0) | June 5, 2024 |
| [Bugs fixed in 2024.06.0](#bugs-fixed-in-2024-06-0) | June 5, 2024 |

#### Active Directory Bidirectional Group Management API is GA in Preview

The [Bidirectional Group Management for Active Directory (AD) API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DirectoriesIntegration) allows you to manage AD groups from within Okta. You can add or remove users from groups based on their identity and access requirements. This ensures that changes made to user access in Okta are reflected in AD. When you use Okta Access Certifications to revoke a user's membership to an AD group, the removal is reflected in AD.

Okta can only manage group memberships for users and groups imported into Okta using the AD integration. It isn't possible to manage users and groups that weren't imported through AD integration or are outside the organizational unit's scope for the integration using this feature. <!--AD_BIDIRECTIONAL_GROUP_MANAGEMENT OKTA-734564-->

#### Seamless ISV experience with integrated testing is GA in Production

Okta now provides a seamless ISV experience to optimize the [Okta Integration Network (OIN)](https://www.okta.com/integrations/) submission experience for SAML and OIDC integrations. This new experience enables independent software vendors (ISVs) to build and automatically test their integration metadata before submission. This reduces the time needed for the OIN team to review and validate that the integration functions as intended, which shortens the time to publish in the OIN. This experience also incorporates communication processes in Salesforce, enabling improved collaboration internally within Okta teams and externally with ISVs. See [Publish an OIN integration](/docs/guides/submit-app-overview/) overview and [Submit an SSO integration with the OIN Wizard](/docs/guides/submit-oin-app/openidconnect/main/) guide. <!--OKTA_OIN_SUBMISSION_TESTER OKTA-686228 -->

#### Your OIN Integrations instruction updates

The instructions on how to submit your OIN integration have been updated on the **Your OIN Integrations** page of the Admin Console in Developer Edition orgs. <!--OKTA-734095-->

#### SCIM 2.0 endpoint call update for user ResourceType requirements

When using [SCIM 2.0 with Entitlements](/docs/guides/scim-with-entitlements/main/), Okta no longer requires a user `ResourceType` value when no custom `schemaExtensions` are used. This applies only to SCIM 2.0 apps enabled for governance with Okta Identity Governance leveraging the `/ResourceTypes` endpoint. <!--OKTA-729238-->

#### Increase to Inline Hooks

The maximum number of inline hooks an org can create is now 100. The previous maximum was 50. See [Inline hook setup](/docs/concepts/inline-hooks/#inline-hook-setup). <!-- OKTA-732758 -->

#### New attribute to manage SAML app session lifetimes is GA in Preview

The `SessionNotOnOrAfter` parameter is an optional SAML parameter that enables the IdP to control the session at the SP. Add `SessionNotOnOrAfter` as an attribute in the SAML assertion to control the session lifetimes of SP apps using the Okta IdP. <!--OKTA-690479-->

#### Protected actions in the Admin Console is GA in Preview

The protected actions feature provides an additional layer of security to your org. It prompts admins for authentication when they perform critical tasks in the Admin Console and helps ensure that only authorized admins can perform these tasks. Super admins can configure the authentication interval for their org. See [Protected actions in the Admin Console](https://help.okta.com/okta_help.htm?type=oie&id=ext-protected-actions). <!-- PRIVILEGED_ACTIONS OKTA-683167 -->

#### Event hook for session context changes

The `user.session.context.change` System Log event is now available for use in an event hook. See the [Event type](https://developer.okta.com/docs/reference/api/event-types/?q=user.session.context.change) reference and [Event hooks](https://help.okta.com/okta_help.htm?type=oie&id=ext-event-hooks) in the Product documentation. <!--OKTA-730871-->

#### Developer documentation update in 2024.06.0

* The [Customize domain and email address guide](/docs/guides/custom-url-domain/main/#caveats) now says that network zones are incompatible with Okta-managed TLS certificates. (OKTA-730633)

* The [Style the Sign-In Widget (third generation) guide](/docs/guides/custom-widget-gen3/main/#about-the-afterrender-function) now describes how palette generation aligns with accessible color contrast ratios. (OKTA-712381)

#### Bugs fixed in 2024.06.0

* The `forceAuthn` parameter was ignored for org2org apps using the SAML sign-in mode and AMR claims mapping. (OKTA-711957)

* The `user.risk.change` System Log event displayed incorrect actor values. (OKTA-731725)

## May

### Weekly release 2024.05.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Enhanced Dynamic Network Zones is self-service EA](#enhanced-dynamic-network-zones-is-self-service-ea) | May 15, 2024 |
| [Bug fixed in 2024.05.1](#bug-fixed-in-2024-05-1)  | May 15, 2024 |

#### Enhanced Dynamic Network Zones is self-service EA

Use Enhanced Dynamic Network Zones to define IP service categories (proxies, VPNs), locations, and Autonomous System Numbers (ASNs) that are allowed or blocked in a zone. See [Network Zones API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/NetworkZone/). <!--ENHANCED_DYNAMIC_NETWORK_ZONE OKTA-727934-->

#### Bug fixed in 2024.05.1

<!---Removing as part of OKTA-734890: * If an API request contained any malformed syntax within the query string, the request was still processed. (OKTA-728810) --->

* Sometimes the SAML assertion lifetime couldn't be unset when the SAML Assertion Lifetime API feature was enabled. (OKTA-728316)

### Monthly release 2024.05.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [SSF Transmitter API is self-service EA in Preview](#ssf-transmitter-api-is-self-service-ea-in-preview) | May 8, 2024 |
| [Seamless ISV experience with integrated testing is GA in Preview](#seamless-isv-experience-with-integrated-testing-is-ga-in-preview) | May 8, 2024 |
| [PUT requests for an API token network condition is self-service EA](#put-requests-for-an-api-token-network-condition-is-self-service-ea) | May 8, 2024 |
| [Permissions for custom admins to manage agents is GA in Production](#permissions-for-custom-admins-to-manage-agents-is-ga-in-production) | May 8, 2024 |
| [Username supported as optional request query parameter](#username-supported-as-optional-request-query-parameter) | May 8, 2024 |
| [Version pinning for Sign-In Widget (third generation) is GA in Production](#version-pinning-for-sign-in-widget-third-generation-is-ga-in-production) | May 8, 2024 |
| [New System Log API property for target object is GA Preview](#new-system-log-api-property-for-target-object-is-ga-preview) | May 8, 2024 |
| [Multiple Identifiers is EA in Preview](#multiple-identifiers-is-ea-in-preview) | April 10, 2024 |
| [Developer documentation update in 2024.05.0](#developer-documentation-update-in-2024-05-0) | May 8, 2024 |
| [Bugs fixed in 2024.05.0](#bugs-fixed-in-2024-05-0) | May 8, 2024 |

#### SSF Transmitter API is self-service EA in Preview

Okta uses [CAEP](https://openid.net/specs/openid-caep-specification-1_0.html) to send security-related events and other data-subject signals to Apple, known as the Shared Signal Framework (SSF) receiver. After an SSF stream is configured, Okta sends signals as [Security Event Tokens (SETs)](https://datatracker.ietf.org/doc/html/rfc8417) to Apple. Use the [SSF Transmitter API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SSFTransmitter/) to manage SSF stream configurations between the SSF receiver and Okta. <!-- OKTA-660502 -->

#### Seamless ISV experience with integrated testing is GA in Preview

Okta now provides a seamless ISV experience to optimize the [Okta Integration Network (OIN)](https://www.okta.com/integrations/) submission experience for SAML and OIDC integrations. This new experience enables independent software vendors (ISVs) to build and automatically test their integration metadata before submission. This reduces the time needed for the OIN team to review and validate that the integration functions as intended, which shortens the time to publish in the OIN. This experience also incorporates communication processes in Salesforce, enabling improved collaboration internally within Okta teams and externally with ISVs. See [Publish an OIN integration](/docs/guides/submit-app-overview/) overview and [Submit an SSO integration with the OIN Wizard](/docs/guides/submit-oin-app/openidconnect/main/) guide. <!-- OKTA-686228 -->

#### PUT requests for an API token network condition is self-service EA

You can now make PUT requests to the `/api-tokens/{apiTokenId}` endpoint to update the network condition of an API token. <!-- OKTA-704387 -->

#### Permissions for custom admins to manage agents is GA in Production

Custom admins can now view, register, and manage agents. See [Permission types](https://developer.okta.com/docs/api/openapi/okta-management/guides/roles/#permissions). <!-- OKTA-706310 -->

#### Username supported as optional request query parameter

SAML and WS-Fed template applications now support username as an optional request query parameter for supplying a login hint. <!-- OKTA-711401 -->

#### Version pinning for Sign-In Widget (third generation) is GA in Production

You can now pin the Sign-In Widget version (third generation) when updating a customized sign-in page (`PUT /brands/{brandId}/pages/sign-in/customized`) or a preview sign-in page (`PUT /brands/{brandId}/pages/sign-in/preview`). The value of `widgetVersion` must be `7.8` or later if `widgetCustomizations.widgetGeneration` is set to `G3`. A value of `7.7` or earlier results in an invalid request. See [Replace the Customized Error Page](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/CustomPages/#tag/CustomPages/operation/replaceCustomizedErrorPage). <!-- OKTA-713942 -->

#### New System Log API property for target object is GA Preview

Certain System Log events now contain a new property called `changeDetails` in the `target` object. When this property is populated, it reflects new, changed, or removed attributes of the target resource that's been modified. See [changeDetails property](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SystemLog/#tag/SystemLog/operation/listLogEvents!c=200&path=target/changeDetails&t=response). <!-- OKTA-724000 -->

#### Multiple Identifiers is EA in Preview

Today, end users must sign in to Okta with a username or email address only. With the Multiple Identifiers feature, admins can configure identifiers, or user attributes from Universal Directory, that an end user can enter to authenticate. Multiplier identifiers work in sign-in, recovery, self-service registration, and unlock flows. Admins can configure up to three identifiers, including email (which is still a required identifier). See [Profile enrollment policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy). <!-- OKTA-687191 FF: MULTIPLE_IDENTIFIERS -->

#### Developer documentation update in 2024.05.0

The [Style the Sign-In Widget (third generation) guide](/docs/guides/custom-widget-gen3/main/#about-the-afterrender-function) has been updated to describe how the `afterRender` function works. <!-- OKTA-686866 -->

#### Bugs fixed in 2024.05.0

* When a large number of users were linked to an Identity Provider, requests to the `/idps/{IdP_ID}/users` endpoint timed out. (OKTA-710934)

* POST calls to `/idp/myaccount/emails` to capitalize a letter resulted in the end user unable to sign in to their account. (OKTA-712135)

* Users who entered an invalid username into a password-first sign-in flow saw a misleading error message. This behavior occurred only in orgs that enabled the Multiple Identifiers feature and disabled User Enumeration Prevention. (OKTA-713096)

* Super admins with roles assigned through group assignment couldn't enable Direct Authentication grant types in an OIDC app. (OKTA-719756)

* If a [login pattern](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Schema/#tag/Schema/operation/getUserSchema!c=200&path=definitions/base/properties/login&t=response) failed validation when making a request with the Schemas API, the call dropped the pattern and continued the request. (OKTA-723332)

* The Apps API accepted `0` as a value for the `samlAssertionLifetimeSeconds` parameter. (OKTA-723982)

## April

### Weekly release 2024.04.3

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2024.04.3](#bugs-fixed-in-202403)  | May 01, 2024 |

#### Bugs fixed in 2024.04.3

* GET policy rules (`/v1/policies/{policyId}/rules`) and GET a policy rule  (`/v1/policies/{policyId}/rules/{ruleId}`) requests returned a rule with a null value for the `created` property. (OKTA-542919)

* The Factors API didn't correctly return all `profile.keys` parameters for Okta Verify enrollments. (OKTA-694655)

* Apps API users were able to add duplicate SAML `attributeStatements` when they created or updated a custom SAML 2.0 app. (OKTA-706474)

* GET calls to `/iam/roles` sometimes didn't return link headers. (OKTA-712212)

* When the **First name** and **Last name** values in a user's profile contained dots, they were clickable in emails. (OKTA-712504)

* The `/introspect` endpoint response was incorrect for an access token returned by the On-Behalf-Of Token Exchange flow. (OKTA-712602)

* The `/authorize` endpoint didn't accept the `sessionToken` when **Stay signed in** was set to **Before and after users sign in** in the Admin Console. (OKTA-713055)

* The `aud` claim value must now be the org's URL in SSF messages. (OKTA-720203)

### Weekly release 2024.04.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bug fixed in 2024.04.1](#bug-fixed-in-2024011)  | April 10, 2024 |

#### Bug fixed in 2024.04.1

Redirects to applications from the Sign-In Widget were blocked in Android browsers. (OKTA-702402)

### Monthly release 2024.04.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Permissions for custom admins to manage agents is GA in Preview](#permissions-for-custom-admins-to-manage-agents-is-ga-in-preview) | April 3, 2024 |
| [Okta now supports the NotonOrAfter property for SLO apps](#okta-now-supports-the-notonorafter-property-for-slo-apps)  | April 3, 2024 |
| [Identity Threat Protection with Okta AI is EA in Preview](#identity-threat-protection-with-okta-ai-is-ea-in-preview) | April 3, 2024 |
| [Enhanced app API contracts is GA in Production](#enhanced-app-api-contracts-is-ga-in-production) | April 3, 2024 |
| [Direct Authentication is GA in Production](#direct-authentication-is-ga-in-production) | March 7, 2024 |
| [Content Security Policy for custom domains is GA in Production](#content-security-policy-for-custom-domains-is-ga-in-production) | January 31, 2024 |
| [Developer documentation update in 2024.04.0](#developer-documentation-update-in-2024-04-0) | April 3, 2024 |
| [Bugs fixed in 2024.04.0](#bugs-fixed-in-2024-04-0) | April 3, 2024 |

#### Permissions for custom admins to manage agents is GA in Preview

Custom admins can now view, register, and manage agents. See [Permission types](https://developer.okta.com/docs/api/openapi/okta-management/guides/roles/#permissions). <!-- OKTA-706310 ALLOW_CUSTOM_ADMIN_TO_MANAGE_REGISTER_AGENTS -->

#### Okta now supports the NotonOrAfter property for SLO apps

Logout requests from Okta to participating SLO apps now support the NotonOrAfter property. This property sets a timeframe in which the logout request expires. If a recipient receives a logout request that's past the NotonOrAfter timeframe (five minutes), the user can ignore the logout request from Okta. <!-- OKTA-677756 -->

#### Identity Threat Protection with Okta AI is EA in Preview

Identity Threat Protection with Okta AI is a powerful risk assessment and response solution that provides post-authentication security to your org. By continuously analyzing risk signals that are native to Okta, risk signals from integrated security partner vendors, and your policy conditions, it safeguards orgs against identity attacks that occur during and outside of a user's session. When Identity Threat Protection discovers a risk, it can immediately end the user's sessions, prompt an MFA challenge, or invoke a workflow to restore your org's security posture. Using intuitive dashboard widgets and reports, you can easily monitor security threats as they happen. See [Identity Thread Protection with Okta AI](https://help.okta.com/okta_help.htm?type=oie&id=ext-itp-overview).

See the [Shared Signals Framework (SSF) Receiver](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SSFReceiver/) and [SSF SET](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SSFSecurityEventToken/) APIs.

See also the [Entity risk policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy) and [Continuous Access evaluation policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy) API updates. <!-- OKTA-683713 ENABLE_ITP_FEATURES_FOR_EA -->

#### Enhanced app API contracts is GA in Production

Okta has API documentation on creating instances of custom apps. Yet, it doesn't fully describe the app metadata required for features such as SSO and provisioning for apps installed from the Okta Integration Network (OIN). In an effort to improve the API for apps in the OIN, new app metadata contracts have been added to the Okta management API. Operators and developers can programmatically create instances of popular OIN apps in their ecosystem and set up the provisioning connection.

See [OIN app request payloads in the Applications API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/) and the [Set up an app provisioning connection](/docs/guides/app-provisioning-connection/main/) guide. <!-- OKTA-663482 PROVISIONING_API_EXTENSION -->

#### Direct Authentication is GA in Production

[Direct Authentication](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/token) offers a new set of OAuth 2.0 grants that give app developers greater control over the authentication process. When redirect authentication isn't an option, you can use direct authentication to allow client apps to authenticate users directly, without relying on HTTP redirection through a web browser. This is beneficial when there's a high degree of trust between the user and the app and when browser-based flows aren't feasible, like with mobile apps. See [Configure Direct Auth grant types](/docs/guides/configure-direct-auth-grants/aotp/main/). <!-- OKTA-585748 OKTA-663482 PROVISIONING_API_EXTENSION -->

#### Content Security Policy for custom domains is GA in Production

The Content Security Policy (CSP) feature lets admins control which URLs may be linked to from customized sign-in and error pages in orgs that use custom domains. Admins add trusted URLs to Okta that link to items such as images and add these links to the code in their sign-in and error pages. This feature enhances security by enabling admins to allow only approved content to appear and prevent the introduction of potentially malicious code to these pages. See [Content Security Policy (CSP) for your custom domain](/docs/guides/custom-widget/main/#content-security-policy-csp-for-your-custom-domain). <!-- OKTA-600774 FF CONTENT_SECURITY_POLICY_FOR_CUSTOMIZABLE_SIGN_IN_AND_ERROR_PAGES -->

#### Developer documentation update in 2024.04.0

The [OIN QA SCIM test plan](/docs/guides/scim-provisioning-integration-test/main/#run-through-oin-qa-tests) file was updated. The following test cases were modified: C9319, C9320, C9321, C9360, and C9361. <!-- OKTA-704429 --> <!-- OKTA-710941 -->

#### Bugs fixed in 2024.04.0

* The password reset prompt didn't appear for users with expired passwords. (OKTA-670058)

* Users were able to unselect a saved SSO protocol for an integration submission in the OIN Wizard. (OKTA-710638)

## March

### Weekly release 2024.03.2

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bugs fixed in 2024.03.2](#bugs-fixed-in-2024-03-2) | March 27, 2024 |

#### Bugs fixed in 2024.03.2

* An admin was able to make a GET Policy request (`/authorizationServers/{authorizationServerId}/policies/{policyId}`) to an authorization server with no policies, using a policy ID from another authorization server with policies, and get that policy information returned. (OKTA-684225)

* Okta sometimes incorrectly returned an Invalid Phone Number error during SMS factor enrollment. (OKTA-705078)

* After an admin deleted a user, an internal server error sometimes occurred when the admin then made a LIST IdP users request (`api/v1/idps/{idpId}/users`). (OKTA-708102)

### Monthly release 2024.03.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Direct Authentication is GA in Preview](#direct-authentication-is-ga-in-preview)                                                     | March 7, 2024 |
| [Permission conditions for profile attributes is GA in Production](#permission-conditions-for-profile-attributes-is-ga-in-production) | March 7, 2024 |
| [Content Security Policy for custom domains is GA in Preview](#content-security-policy-for-custom-domains-is-ga-in-preview)           | March 7, 2024 |
| [New mappings property for Policy API is EA in Preview](#new-mappings-property-for-policy-api-is-ea-in-preview)                       | March 7, 2024 |
| [My Account Authenticators API is GA in Production](#my-account-authenticators-api-is-ga-in-production)                               | March 7, 2024 |
| [AAL values for Login.gov IdP](#aal-values-for-logingov-idp)                                                                          | March 7, 2024 |
| [Granular API policy authenticator controls is GA in Preview](#granular-api-policy-authenticator-controls-is-ga-in-preview)           | March 7, 2024 |
| [Externally signed org AS access tokens](#externally-signed-org-as-access-tokens)                                                     | March 7, 2024 |
| [Support case management for admins is GA in Preview](#support-case-management-for-admins-is-ga-in-preview)                           | March 7, 2023 |
| [Realms for Workforce](#realms-for-workforce)                                                                                         | March 7, 2023 |
| [Enhanced app API contracts](#enhanced-app-api-contracts)                                                                             | March 7, 2024 |
| [Bug fixed in 2024.03.0](#bug-fixed-in-2024-03-0)                                                                                    | March 7, 2024 |

#### Direct Authentication is GA in Preview

[Direct Authentication](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/token) offers a new set of OAuth 2.0 grants that give app developers greater control over the authentication process. When redirect authentication isn't an option, you can use direct authentication to allow client apps to authenticate users directly, without relying on HTTP redirection through a web browser. This is beneficial when there's a high degree of trust between the user and the app and when browser-based flows aren't feasible, like with mobile apps. See [Configure Direct Auth grant types](/docs/guides/configure-direct-auth-grants/aotp/main/). <!-- OKTA-585748 -->

#### Permission conditions for profile attributes is GA in Production

You can now apply conditions to the **View users and their details** and **Edit users' profile attributes** custom admin role permissions. Permission conditions help you limit the scope of a role by including or excluding admins' access to individual profile attributes. This gives you more granular control over your custom admin roles and helps meet your org's unique security needs. See [Permission conditions](https://help.okta.com/okta_help.htm?type=oie&id=ext-permission-conditions). <!-- OKTA-586185 -->

#### Content Security Policy for custom domains is GA in Preview

The Content Security Policy (CSP) feature lets admins control which URLs may be linked to from customized sign-in and error pages in orgs that use custom domains. Admins add trusted URLs to Okta that link to items such as images and add these links to the code in their sign-in and error pages. This feature enhances security by enabling admins to allow only approved content to appear and prevent the introduction of potentially malicious code to these pages. See [Content Security Policy (CSP) for your custom domain](/docs/guides/custom-widget/main/#content-security-policy-csp-for-your-custom-domain). <!-- OKTA-600774 FF CONTENT_SECURITY_POLICY_FOR_CUSTOMIZABLE_SIGN_IN_AND_ERROR_PAGES -->

#### New mappings property for Policy API is EA in Preview

A new `mappings` property is available for the `links` object in  `GET /api/v1/policies/{policyId}` and `GET /api/v1/policies?type={type}` responses. This property displays links to policy mappings. See [Policy API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/getPolicy). <!-- OKTA-637310 -->

#### My Account Authenticators API is GA in Production

The MyAccounts Authenticators API (`/idp/myaccount/authenticators/`) enables you to list enrolled and un-enrolled authenticator information. You can also access details of specific authenticators and enrollments. <!-- OKTA-670703 -->

#### AAL values for Login.gov IdP

The [Login.gov IdP configuration](/docs/guides/add-logingov-idp/main/#create-an-identity-provider-in-okta) has been updated to include all allowed AAL values. <!-- OKTA-673125 -->

#### Granular API policy authenticator controls is GA in Preview

The Authentication Policy API now includes three new `constraints` object parameters that provide precise control over what specific authenticators and methods are displayed to end users. Previously, some authenticators were mapped to the same authenticator `types` and `methods`. The parameters `authenticationMethods` and `excludeAuthenticationMethods` now identify (or exclude) the exact authenticator for both `knowledge` and `possession` constraints. The `required` parameter indicates whether the `knowledge` or `possession` constraints are required by the assurance. See the [Policy API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule!path=0/actions/appSignOn/verificationMethod/0/constraints&t=request). <!--OKTA-676880 ASSURANCE_GRANULAR_AUTHENTICATOR_CONSTRAINTS -->

#### Externally signed org AS access tokens

Access tokens returned from the org authorization server are now signed using the externally published signing key. These access tokens must still be treated as opaque strings and not be validated or consumed by any application other than Okta. <!-- OKTA-694170 -->

#### Support case management for admins is GA in Preview

Super admins can now assign the **View, create, and manage Okta support cases** permission and Support Cases resource to a custom admin role. This allows delegated admins to manage the support cases that they've opened. See [About role permissions](https://help.okta.com/okta_help.htm?type=oie&id=csh-about-role-permissions). <!-- OKTA-700229 -->

#### Realms for Workforce

Realms allows you to unlock greater flexibility in managing and delegating management of your distinct user populations within a single Okta org. See the [Realms](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Realm) and [Realm Assignments](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/RealmAssignment) APIs. <!-- OKTA-702163 -->

#### Enhanced app API contracts

Okta has API documentation on creating instances of custom apps. Yet, it doesn't fully describe the app metadata required for features such as SSO and provisioning for apps installed from the Okta Integration Network (OIN). In an effort to improve the API for apps in the OIN, new app metadata contracts have been added to the Okta management API. Operators and developers can programmatically create instances of popular OIN apps in their ecosystem and set up the provisioning connection. See [Set up an app provisioning connection](/docs/guides/app-provisioning-connection/main/). <!-- OKTA-703567 -->

#### Bug fixed in 2024.03.0

Some group claims failed if Okta Expression Language was used. (OKTA-660870)

## February

### Weekly release 2024.02.2

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bugs fixed in 2024.02.2](#bugs-fixed-in-2024-02-2) | February 22, 2024 |

#### Bugs fixed in 2024.02.2

<!-- * The number of unsuccessful calls to the `/api/v1/authn` endpoint sometimes exceeded the threshold set in the password policy settings. (OKTA-698017) Removed for 2024.02.2 as per doc action-->

* Okta sometimes incorrectly returned an Invalid Phone Number error during SMS factor enrollment. (OKTA-683026)

* Sometimes, an OAuth 2.0-secured inline hook that contained a custom domain authorization server in the token URL returned a null pointer exception error, instead of an appropriate error. (OKTA-656265)

* User passwords could be updated to match the answer to the recovery question. (OKTA-654993)

### Weekly release 2024.02.1

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [HTTP header filter](#http-header-filter) | February 22, 2024 |

#### HTTP header filter

To improve the security of your org, Okta now filters and encodes any illegal unicode characters for outgoing HTTP headers. <!-- OKTA-694896 -->

### Monthly release 2024.02.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Assign admin roles to an app](#assign-admin-roles-to-an-app)| June 14, 2023 |
| [DPoP support for Okta management APIs is GA in Production](#dpop-support-for-okta-management-apis-is-ga-in-production) | December 13, 2023 |
| [Dynamic OS version compliance for device assurance](#dynamic-os-version-compliance-for-device-assurance) | June 14, 2023 |
| [New attribute to manage SAML app session lifetimes is EA in Preview](#new-attribute-to-manage-saml-app-session-lifetimes-is-ea-in-preview) | February 7, 2024 |
| [New email domain for free trial orgs](#new-email-domain-for-free-trial-orgs) | February 7, 2024 |
| [New function for email templates is EA in Preview](#new-function-for-email-templates-is-ea-in-preview) | February 7, 2024 |
| [POST requests now allowed to the logout endpoint](#post-requests-now-allowed-to-the-logout-endpoint) | February 7, 2024 |
| [Seamless ISV experience is GA in Production](#seamless-isv-experience-is-ga-in-production) | January 10, 2024 |
| [Super admin role now required to update direct authentication grants](#super-admin-role-now-required-to-update-direct-authentication-grants) | February 7, 2024 |
| [Developer documentation update in 2024.02.0](#developer-documentation-update-in-2024-02-0) | February 7, 2024 |
| [Bug fixed in 2024.02.0](#bug-fixed-in-2024-02-0) | February 7, 2024 |

#### Assign admin roles to an app

Orgs can now assign admin roles to their custom API Service Integrations. Apps with assigned admin roles are constrained to the permissions and resources that are included in the role assignment. This helps ensure that apps only have access to the resources that are needed to perform their tasks and improves orgs' overall security. See [Work with the admin component](https://help.okta.com/okta_help.htm?type=oie&id=ext-work-with-admin). <!-- OKTA-659638 CLIENT_AS_PRINCIPAL -->

#### DPoP support for Okta management APIs is GA in Production

You can now use OAuth 2.0 Demonstrating Proof-of-Possession (DPoP) access tokens to access Okta management APIs. See [Configure OAuth 2.0 Demonstrating Proof-of-Possession](/docs/guides/dpop/oktaresourceserver/main/). <!-- OKTA-673922 OKTA_RESOURCE_SERVER_DPOP_SUPPORT-->

#### Dynamic OS version compliance for device assurance

You can configure OS version compliance by using device assurance. However, you have to manually update the policies every time a new OS version or patch is released. With *Dynamic OS version compliance*, Okta updates device assurance policies with the latest OS versions and patches, eliminating the need for manual updates. With this feature you can ensure OS version compliance in your org without tracking OS releases. See [Dynamic OS version compliance](https://help.okta.com/okta_help.htm?type=oie&id=csh-device-assurance-add) and [Device Assurance Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/#tag/DeviceAssurance/operation/createDeviceAssurancePolicy!path=1/osVersion&t=request). <!-- OKTA-651282 DEVICE_ASSURANCE_DYNAMIC_OS_SUPPORT -->

#### New attribute to manage SAML app session lifetimes is EA in Preview

The `samlAssertionLifetimeSeconds` parameter is an optional SAML parameter that allows the IdP to control the session at the SP. This parameter allows users to add `samlAssertionLifetimeSeconds` as an attribute in the SAML assertion to control the session lifetimes of SP apps using the Okta IdP. See the [Settings table](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/#tag/Application/operation/createApplication!path=6/settings/signOn/samlAssertionLifetimeSeconds&t=request) in the **Add custom SAML application** section. <!-- OKTA-690479 SAML_ASSERTION_LIFETIME_SECONDS_ON_APPS_API -->

#### New email domain for free trial orgs

When a user requests access to a free trial org, the welcome email now comes from `noreply@test-account.dev`. <!-- OKTA-673739 ENABLE_FREE_TRIAL_EMAIL_DOMAIN -->

#### New function for email templates is EA in Preview

You can now use the `getTimeDiffHoursNow` function in each of the available email notification templates. If you want to add more locales when customizing email templates, you need to use this function instead of the `formatTimeDiffHoursNowInUserLocale` function. The new function returns only the time value in the specified unit. See [Enable additional locales](/docs/guides/custom-email/main/#enable-additional-locales). <!-- OKTA-683897 -->

#### POST requests now allowed to the logout endpoint

You can now access the `/oauth2/{id}/v1/logout` and `/oauth2/v1/logout` endpoints with a POST request. See [POST logout](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/logoutWithPost). <!-- OKTA-649530 -->

#### Seamless ISV experience is GA in Production

Okta now provides a seamless ISV experience to optimize the [Okta Integration Network (OIN)](https://www.okta.com/integrations/) submission experience for SAML and OIDC integrations. This new experience enables independent software vendors (ISVs) to build and manually test their integration metadata before submission. This reduces the time needed for the OIN team to review and validate that the integration functions as intended, which shortens the time to publish in the OIN. This experience also incorporates communication processes in Salesforce, enabling improved collaboration internally within Okta teams and externally with ISVs. See [Publish an OIN integration](https://developer.okta.com/docs/guides/submit-app-overview/) overview and [Submit an SSO integration with the OIN Wizard](https://developer.okta.com/docs/guides/submit-oin-app/) guide. <!-- OKTA-663167 APP_MANIFESTS -->

#### Super admin role now required to update direct authentication grants

Super admin permissions are now required to enable or change direct authentication grants for clients. <!-- OKTA-677469 -->

#### Developer documentation update in 2024.02.0

* Instructions for [testing Okta REST APIs with Postman](/docs/reference/rest/) have been updated to provide OAuth 2.0 authentication set up and use. OAuth 2.0 is recommended to access Okta management APIs instead of the proprietary SSWS API token to ensure enhanced security.

  These instructions are now under **References** > **Test APIs with Postman**.

* The [Self-service registration](/docs/guides/oie-embedded-sdk-use-case-self-reg/) guide is now easier to read and quicker to complete. All flow diagrams have been updated so they are easier to follow, and configuration instructions now match the current Admin Console.

#### Bug fixed in 2024.02.0

When users signed in with an external Identity Provider and the multiple matching users error occurred, they were redirected to the sign-in page instead of the error page. (OKTA-658717)

## January

### Weekly release 2024.01.2

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Content Security Policy for custom domains is EA in Preview](#content-security-policy-for-custom-domains-is-ea-in-preview)| January 31, 2024 |
| [Granular API policy authenticator controls is self-service EA in Preview](#granular-api-policy-authenticator-controls-is-self-service-ea-in-preview)| January 31, 2024 |
| [IP restrictions on tokens](#ip-restrictions-on-tokens)| January 31, 2024 |
| [Bugs fixed in 2024.01.2](#bugs-fixed-in-2024-01-2) | January 31, 2024 |

#### Content Security Policy for custom domains is EA in Preview

The Content Security Policy (CSP) feature lets admins control which URLs may be linked to from customized sign-in and error pages in orgs that use custom domains. Admins add trusted URLs to Okta that link to items such as images and add these links to the code in their sign-in and error pages. This feature enhances security by enabling admins to allow only approved content to appear and prevent the introduction of potentially malicious code to these pages. See [Content Security Policy (CSP) for your custom domain](/docs/guides/custom-widget/main/#content-security-policy-csp-for-your-custom-domain). <!-- OKTA-600774 FF CONTENT_SECURITY_POLICY_FOR_CUSTOMIZABLE_SIGN_IN_AND_ERROR_PAGES -->

#### Granular API policy authenticator controls is self-service EA in Preview

The Authentication Policy API now includes three new `constraints` object parameters that provide precise control over what specific authenticators and methods are displayed to end users. Previously, some authenticators were mapped to the same authenticator `types` and `methods`. The parameters `authenticationMethods` and `excludeAuthenticationMethods` now identify (or exclude) the exact authenticator for both `knowledge` and `possession` constraints. The `required` parameter indicates whether the `knowledge` or `possession` constraints are required by the assurance. See the [Policy API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule!path=0/actions/appSignOn/verificationMethod/0/constraints&t=request). <!--OKTA-676888 ASSURANCE_GRANULAR_AUTHENTICATOR_CONSTRAINTS -->

#### IP restrictions on tokens

Admins can specify allowlisted and blocklisted network zones for static, Single Sign-On Web System (SSWS) API tokens. This strengthens org security by letting them control where calls to Okta APIs can originate from. It also restricts attackers and malware from stealing SSWS tokens or replaying them outside of their IP range to gain unauthorized access. <!-- OKTA-689850 -->

#### Bugs fixed in 2024.01.2

* Some text strings in the Authentication policies page weren't translated. (OKTA-583880)

* POST requests to the `/sessions/me/lifecycle/refresh` endpoint didn't return an updated session cookie. (OKTA-665452)

* System Log events for the access token, ID token, and user SSO grants didn't include `externalSessionId`. (OKTA-664370)

* System Log events for access token and ID token grants didn't include user attributes. (OKTA-674218)

### Weekly release 2024.01.1

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bug fixed in 2024.01.1](#bug-fixed-in-2024-01-1) | January 18, 2024 |

#### Bug fixed in 2024.01.1

Users could activate their Okta accounts from expired activation email links using the SDKs. (OKTA-666148)

### Monthly release 2024.01.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [DPoP support for Okta management APIs is GA in Preview](#dpop-support-for-okta-management-apis-is-ga-in-preview) | December 13, 2023 |
| [Email or password no longer required in authenticator enrollment policy is GA in Preview](#email-or-password-no-longer-required-in-authenticator-enrollment-policy-is-ga-in-preview) | January 10, 2024 |
| [More properties returned for Devices API user summaries](#more-properties-returned-for-devices-api-user-summaries) | January 10, 2024 |
| [New possession constraint property available for Policy API is GA in Production](#new-possession-constraint-property-available-for-policy-api-is-ga-in-production) | December 6, 2023 |
| [Read-only permission for admin role assignments is GA in Production](#read-only-permission-for-admin-role-assignments-is-ga-in-production) | November 8, 2023 |
| [Seamless ISV experience is GA in Preview](#seamless-isv-experience-is-ga-in-preview) | January 10, 2024 |
| [Stay signed in is EA in Preview](#stay-signed-in-is-ea-in-preview) | January 10, 2024 |
| [System Log events for IdP keystore operations](#system-log-events-for-idp-keystore-operations) | January 10, 2024 |
| [Updated RADIUS authentication prompts](#updated-radius-authentication-prompts) | January 10, 2024 |
| [Use your own email provider is GA in Production](#use-your-own-email-provider-is-ga-in-production) | December 6, 2023 |

#### DPoP support for Okta management APIs is GA in Preview

You can now use OAuth 2.0 Demonstrating Proof-of-Possession (DPoP) access tokens to access Okta management APIs.
See [Configure OAuth 2.0 Demonstrating Proof-of-Possession](/docs/guides/dpop/oktaresourceserver/main/). <!-- OKTA-673922 OKTA_RESOURCE_SERVER_DPOP_SUPPORT-->

#### Email or password no longer required in authenticator enrollment policy is GA in Preview

Previously, authenticator enrollment policies required either an email or a password even if other authenticators were enabled. Now, you can set email or password authentication to `optional` or `disabled`, and require another authenticator instead. This change allows orgs to better secure accounts with stronger authenticators such as Okta Verify, Okta FastPass, or FIDO2 (WebAuthn). See [Create an authenticator enrollment policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-mfa-policy). <!-- OKTA-681443 ENABLE_BOOTSTRAP_WITH_ANY_AUTHENTICATOR-->

#### More properties returned for Devices API user summaries

The [List all Devices](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Device/#tag/Device/operation/listDevices) API operation has been updated to return more user summary properties in the `_embedded` payload. When the `expand=userSummary` [query parameter](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Device/#tag/Device/operation/listDevices!in=query&path=expand&t=request) is included in the List all Devices request (for example, `GET /api/v1/devices?expand=userSummary`), the `managementStatus` and `screenLockType` properties are returned for each user summary. <!-- OKTA-669910 -->

#### New possession constraint property available for Policy API is GA in Production

A new `userVerification` property is available for the `constraints` object of the [Policy API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule!path=0/actions/appSignOn/verificationMethod/0/constraints&t=request). This setting can ensure the verification of a possession factor through a PIN or biometrics. <!-- OKTA-669846 ASSURANCE_USER_VERIFICATION_POSSESSION_CONSTRAINT -->

#### Read-only permission for admin role assignments is GA in Production

Super admins can now assign the **View roles, resources, and admin assignments** permission to their delegated admins. This permission gives admins a read-only view of the admin roles, resource sets, and admin assignments in the org. See [About role permission](https://help.okta.com/okta_help.htm?type=oie&id=csh-about-role-permissions). <!-- OKTA-640563 IAM_READ_RESOURCES -->

#### Seamless ISV experience is GA in Preview

Okta now provides a seamless ISV experience to optimize the [Okta Integration Network (OIN)](https://www.okta.com/integrations/) submission experience for SAML and OIDC integrations. This new experience enables independent software vendors (ISVs) to build and manually test their integration metadata before submission. This reduces the time needed for the OIN team to review and validate that the integration functions as intended, which shortens the time to publish in the OIN.

This experience also incorporates communication processes in Salesforce, enabling improved collaboration internally within Okta teams and externally with ISVs. See [Publish an OIN integration](/docs/guides/submit-app-overview/) overview and [Submit an SSO integration with the OIN Wizard](/docs/guides/submit-oin-app/) guide. <!-- OKTA-663167  APP_MANIFESTS -->

#### Stay signed in is EA in Preview

Today, **Keep me signed in** allows the user to select whether their multifactor authenticators from previous sessions should be remembered. However, the option to select **Keep me signed in** was only available on the sign-in page.

To enable **Stay signed in** for integrated authentication flows, admins can now configure their sign-in experience such that the option to **Stay signed in** is provided either before the user signs in to Okta or before and after the user completes multifactor authentication. If a user selects **Stay signed in**, they won't be challenged for MFA the next time they sign in. In addition, users will now be able to sign out of all active Okta sessions from the Okta End-User Dashboard. See [Organization Security](https://help.okta.com/okta_help.htm?type=oie&id=csh-stay-signed-in). <!-- OKTA-652650, POST_AUTH_KEEP_ME_SIGNED_IN -->

#### System Log events for IdP keystore operations

New System Log events are generated for IdP keystore operations:

```bash
system.idp.key.create
system.idp.key.update
system.idp.key.delete
```
<!-- OKTA-680513 -->

#### Updated RADIUS authentication prompts

RADIUS authentication prompts are updated to be clearer.
<!-- OKTA-678869 -->

#### Use your own email provider is GA in Production

The Email Servers API allows you to configure a custom external email provider to send email notifications. By default, notifications such as the welcome email or an account recovery email are sent through an Okta-managed SMTP server. Adding a custom email provider gives you more control over your email delivery. See [Email Servers API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/EmailServer/). <!-- OKTA-654556 CUSTOM_EMAIL_SMTP_SERVER -->
