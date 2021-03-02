---
title: Okta API Products Release Notes
---

## February

### Monthly Release 2021.02.0

| Change                                                                                              | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------|--------------------------|
| [Okta Org API now available in Self-Service Early Access (EA)](#okta-org-api-now-available-in-self-service-early-access-ea) | February 3, 2021         |
| [Automatically mark a flow hook as "VERIFIED"](#automatically-mark-a-flow-hook-as-verified) | February 3, 2021         |
| [Event Hook preview tab now in Early Access (EA)](#event-hook-preview-tab-now-in-early-access-ea)      | February 3, 2021          |
| [Wildcards for OAuth redirect subdomains](#wildcards-for-oauth-redirect-subdomains) | February 3, 2021         |
| [Charset parameter no longer added in content-type header](#charset-parameter-no-longer-added-in-content-type-header) | February 3, 2021         |
| [Bug fixed in 2021.02.0](#bug-fixed-in-2021-02-0) | February 3, 2021         |

#### Okta Org API now available in Self-Service Early Access (EA)

The Okta Org API is now available in Self-Service EA. This API allows you to manage your org account settings, contact information, logo, Okta support settings, Okta communication settings, and preferences. See [Org API](/docs/reference/api/org/).<!--OKTA-325713-->

#### Automatically mark a flow hook as "VERIFIED"

When a request is made to `/api/v1/eventHooks/{eventHookId}/lifecycle/verify` for an [Event Hook](/docs/reference/api/event-hooks/) that has an Okta Workflows endpoint configured, the Event Hook is automatically marked as "VERIFIED". The verification step isn't required.<!--OKTA-364393-->

#### Event Hook preview tab now in Early Access (EA)

Event Hooks configured in the Admin Console or by [Event Hooks Management API](https://developer.okta.com/docs/reference/api/event-hooks/) can now preview the JSON body of the Event Hook in the Admin Console, as well as delivering the preview request to your external service without manually triggering an actual event.

Previewing the JSON body of the Event Hook assists developers or administrators create or troubleshoot the request syntax. The JSON body can also be edited for different request scenarios.

See [Event Hook Preview](https://help.okta.com/en/prod/Content/Topics/automation-hooks/event-hooks-preview.htm).<!--OKTA-364119-->

#### Wildcards for OAuth redirect subdomains

Developers can now use the [Apps API](/docs/reference/api/apps/#settings-10) to set multiple redirect URI subdomains with a single parameter using the asterisk (*) wildcard. This feature provides convenience and flexibility in cases where subdomains vary by only a few characters. For example: `https://subdomain*.example.com/oidc/redirect` may be used to represent subdomain1, subdomain2, and subdomain3.

>**Note:** Potential risks of using this feature include scenarios whereby attackers could illegitimately gain access to authorization codes by crafting the requested `redirect_uri` so that the code is returned to a subdomain that they control. See the [Authorization Code Redirection URI Manipulation](https://tools.ietf.org/html/rfc6749#section-10.6) section and the [Open Redirectors](https://tools.ietf.org/html/rfc6749#section-10.15) section of The OAuth 2.0 Authorization Framework.<!--OKTA-364361-->

#### Charset parameter no longer added in content-type header
To be compliant with the [RFC for JSON data interchange format](https://tools.ietf.org/html/rfc8259#section-11)
, the charset parameter from application/json is no longer added in the Content-Type header of responses from Okta's API endpoints.<!--OKTA-365536-->

#### Bug fixed in 2021.02.0

When performing a GET on the [`/oauth2/v1/clients` endpoint](/docs/reference/api/oauth-clients/#list-client-applications) on an org that has a deactivated OIN client, a "404 resource not found" error occurred. (OKTA-365031)


## January

### Weekly Release 2021.01.1

| Change                                                    | Expected in Preview Orgs |
| --------------------------------------------------------- | ------------------------ |
| [Bugs fixed in 2021.01.1](#bugs-fixed-in-2021-01-1)       | January 13, 2021           |

#### Bugs fixed in 2021.01.1

* Active Directory (AD) bulk imports and RealTimeSync (RTS) failed when the Microsoft AD user profile contained `tokenGroups`, `tokenGroupsGlobalAndUniversal`, or `tokenGroupsNoGCAcceptable` attributes. (OKTA-354900)

* In the SmartSheet provisioning profile, admins were unable to change the **Group Priority** setting to **Combine values across groups** for the `smartsheet.userPermissions` variable. The error message “Not allowed to modify property userPermissions from the base schema” was returned. (OKTA-325187)


### Monthly Release 2021.01.0

| Change                                                                                              | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------|--------------------------|
| [Group object source property is now GA in Production](#group-object-source-property-is-now-ga-in-production) | January 7, 2021         |
| [New Apps API endpoints in Early Access (EA)](#new-apps-api-endpoints-in-early-access-ea) | January 7, 2021         |
| [Developers can now use SWA for testing SCIM app integrations](#developers-can-now-use-swa-for-testing-scim-app-integrations)      | January 7, 2021          |
| [The Subscriptions API is now available in Self-Service Early Access (EA)](#the-subscriptions-api-is-now-available-in-self-service-early-access-ea) | January 7, 2021          |
| [New phone rate limits](#new-phone-rate-limits) | January 7, 2021          |
| [WebAuthn feature validation updates with Trusted Origins API](#webauthn-feature-validation-updates-with-trusted-origins-api) | January 7, 2021         |
| [Bug fixed in 2021.01.0](#bug-fixed-in-2021-01-0) | January 7, 2021         |

#### Group object source property is now GA in Production

For [Groups API](/docs/reference/api/groups/) requests that return a Group or a list of Groups, the Group object type APP_GROUP includes a `source` property that provides the ID of the source application for the returned Group. This property is now GA in Production. See [Group attributes](/docs/reference/api/groups/#group-attributes).<!--OKTA-326611-->

#### New Apps API endpoints in Early Access (EA)

The [Apps API](/docs/reference/api/apps/) now includes additional Early Access endpoints and objects for provisioning connections and features:

- [Application Logo operations](/docs/reference/api/apps/#application-logo-operations) (`/apps/${applicationId}/logo`)
- [Application Provisioning Connection operations](/docs/reference/api/apps/#application-provisioning-connection-operations) (`/apps/${applicationId}/connections`)
- [Application Features operations](/docs/reference/api/apps/#application-feature-operations) (`/apps/${applicationId}/features`)
- [Provisioning Connection object](/docs/reference/api/apps/#provisioning-connection-object)
- [Provisioning Connection Profile object](/docs/reference/api/apps/#provisioning-connection-profile-object)
- [Application Feature object](/docs/reference/api/apps/#application-feature-object)

These updates improve the ability of administrators to configure application logos and provisioning details, previously available only through the Admin Console.

>**Note:** Currently, only the Okta Org2Org application supports Application Provisioning Connection and Application Features operations. <!--OKTA-335123-->

#### Developers can now use SWA for testing SCIM app integrations

ISVs and developers who want to create and submit a SCIM-only app integration to the OIN can now use SWA as the sign-in method for SCIM app testing.<!--OKTA-352742-->

#### The Subscriptions API is now available in Self-Service Early Access (EA)

The [Subscriptions API](/docs/reference/api/admin-notifications/) is now available in Self-Service EA. The Subscriptions API provides operations to manage email subscription settings for Okta administrator notifications.<!--OKTA-325794-->

#### New phone rate limits

Users who attempt Voice and SMS enrollment can now be rate limited. Voice and SMS enrollment rate-limit events are now logged in the System Log.

See [System Log events for rate limits](/docs/reference/rl-system-log-events).<!--OKTA-355134-->

#### WebAuthn feature validation updates with Trusted Origins API

The WebAuthn feature now supports trusted cross-origin and cross-Relying Party Identifier (RP ID) validation when using the [Trusted Origins API](/docs/reference/api/trusted-origins/). Trusted Origins are configured in the Okta Trusted Origins framework either through the Admin Console or using the API. These Trusted Origins, configured with the CORS scope, now support orgs using WebAuthn for sign-in pages hosted at Trusted Origins distinct from the org's Okta URL (that is, different from the org's Okta or custom domain URL).
<!--OKTA-352629-->

#### Bug fixed in 2021.01.0

Non-CORS requests to the OAuth 2.0 `/introspect` and `/revoke` endpoints failed when the Okta session cookie was present. (OKTA-356288)
