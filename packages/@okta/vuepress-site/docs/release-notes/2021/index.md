---
title: Okta API Products Release Notes 2021
---

## March

### Weekly Release 2021.03.2

| Change                                                    | Expected in Preview Orgs |
| --------------------------------------------------------- | ------------------------ |
| [Bugs fixed in 2021.03.2](#bugs-fixed-in-2021-03-2)       | March 17, 2021           |

#### Bugs fixed in 2021.03.2

* After updating a Group `name` using the [Groups API](/docs/reference/api/groups/#update-group), the change wasn't reflected in the target application with [**Group Push**](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Directory_Using_Group_Push) enabled. (OKTA-375190)

* When creating a User with a recovery question using an OAuth access token rather than an API token, an invalid session error was returned. (OKTA-361888)

### Weekly Release 2021.03.1

| Change                                                    | Expected in Preview Orgs |
| --------------------------------------------------------- | ------------------------ |
| [Bugs fixed in 2021.03.1](#bugs-fixed-in-2021-03-1)       | March 10, 2021           |

#### Bugs fixed in 2021.03.1

* When `AppUser` was updated after enabling `APPLICATION_ENTITLEMENT_POLICY`, some [user attributes](/docs/guides/build-provisioning-integration/-/attribute-mapping/), such as the Manager attribute, were prevented from being updated in an application. (OKTA-329758)

* When using the [`/api/v1/users` endpoint](/docs/reference/api/users/) to generate the sign-in request for an Identity engine user through a mapping, if you created the same user by sending in more than one request at the same time, an incorrect 500 error message (internal server error) was sometimes returned instead of a 400 error message. (OKTA-318474)

### Monthly Release 2021.03.0

| Change                                                                                              | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------|--------------------------|
| [The SAML 2.0 Assertion grant flow is now Self-Service Early Access (EA)](#the-saml-2-0-assertion-grant-flow-is-now-self-service-early-access-ea) | March 3, 2021 |
| [The Okta Org API is now GA](#the-okta-org-api-is-now-ga) | March 3, 2021         |
| [The /login/token/redirect endpoint now has a dedicated rate limit](#the-login-token-redirect-endpoint-now-has-a-dedicated-rate-limit) | March 3, 2021          |
| [The new LDAP Interface authentication type is now GA](#the-new-ldap-interface-authentication-type-is-now-ga) | March 3, 2021          |
| [Bugs fixed in 2021.03.0](#bugs-fixed-in-2021-03-0) | March 3, 2021         |

#### The SAML 2.0 Assertion grant flow is now Self-Service Early Access (EA)

The SAML 2.0 Assertion grant flow is now Self-Service EA. You can use the SAML 2.0 Assertion flow to request an access token when you want to use an existing trust relationship without a direct user approval step at the authorization server. The flow enables a client app to reuse an authorization by supplying a valid, signed SAML assertion to the authorization server in exchange for an access token. This flow is often used in migration scenarios from legacy Identity Providers that don't support OAuth. See [Implement the SAML 2.0 Assertion Flow](/docs/guides/implement-saml2/overview/).<!--OKTA-373421-->

#### The Okta Org API is now GA

The Okta [Org API](/docs/reference/api/org/) is now GA. This API allows you to manage your org account settings, contact information, logo, Okta support settings, Okta communication settings, and preferences. <!--OKTA-369570-->

#### The /login/token/redirect endpoint now has a dedicated rate limit

The `/login/token/redirect` endpoint now has its own dedicated [rate limit](/docs/reference/rl-global-enduser/). Previously this endpoint shared a rate limit with other traffic that didn't have dedicated rate limits for each endpoint. <!--OKTA-363694-->

#### The new LDAP Interface authentication type is now GA

The new LDAP Interface `authType` is now GA. When you create a [Sign On Policy](/docs/reference/api/policy/#authcontext-condition-object), you can now create rules that apply only to LDAP Interface user authentications. With this change, you can apply a Sign On Policy to LDAP Interface authentications and exclude other authentication methods.

#### Bugs fixed in 2021.03.0

* When a POST request was made using an OAuth access token (with the `okta.users.manage` scope) to the `/{userId}/factors/{factorId}/verify` endpoint, an "Invalid Session" error was returned. (OKTA-364443)

* After a new password was set, the password changed notification was sent in error to new users that were created with no credentials through the API. (OKTA-362241)

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

* In the SmartSheet provisioning profile, admins were unable to change the **Group Priority** setting to **Combine values across groups** for the `smartsheet.userPermissions` variable. The error message "Not allowed to modify property userPermissions from the base schema" was returned. (OKTA-325187)


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
