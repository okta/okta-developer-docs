---
title: Okta API Products Release Notes
---

## 2021.02.0

| Change                                                                                              | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------|--------------------------|
| [Okta Org API now available in Self-Service Early Access (EA)](#okta-org-api-now-available-in-self-service-early-access-ea) | February 3, 2021         |
| [Automatically mark a flow hook as "VERIFIED"](#automatically-mark-a-flow-hook-as-verified) | February 3, 2021         |
| [Event Hook preview tab now in Early Access (EA)](#event-hook-preview-tab-now-in-early-access-ea)      | February 3, 2021          |
| [Wildcards for OAuth redirect subdomains](#wildcards-for-oauth-redirect-subdomains) | February 3, 2021         |
| [Charset parameter in content-type header](#charset-parameter-in-content-type-header) | February 3, 2021         |
| [Bug fixed in 2021.02.0](#bug-fixed-in-2021-02-0) | February 3, 2021         |

### Okta Org API now available in Self-Service Early Access (EA)

The Okta Org API is now available in Self-Service EA. This API allows you to manage your org account settings, contact information, logo, Okta support settings, Okta communication settings, and preferences. See [Org API](/docs/reference/api/org/).<!--OKTA-325713-->

### Automatically mark a flow hook as "VERIFIED"

When a request is made to `/api/v1/eventHooks/{eventHookId}/lifecycle/verify` for an [Event Hook](/docs/reference/api/event-hooks/) that has an Okta Workflows endpoint configured, the Event Hook is automatically marked as "VERIFIED". The verification step isn't required.<!--OKTA-364393-->

### Event Hook preview tab now in Early Access (EA)

Event Hooks configured in the Admin Console or by [Event Hooks Management API](https://developer.okta.com/docs/reference/api/event-hooks/) can now preview the JSON body of the Event Hook in the Admin Console, as well as delivering the preview request to your external service without manually triggering an actual event.

Previewing the JSON body of the Event Hook assists developers or administrators create or troubleshoot the request syntax. The JSON body can also be edited for different request scenarios.

See [Event Hook Preview](https://help.okta.com/en/prod/Content/Topics/automation-hooks/event-hooks-preview.htm).<!--OKTA-364119-->

### Wildcards for OAuth redirect subdomains

Developers can now use the [Apps API](/docs/reference/api/apps/#settings-10) to set multiple redirect URI subdomains with a single parameter using the asterisk *wildcard. This feature provides convenience and flexibility in cases where subdomains vary by only a few characters. For example: `https://subdomain*.example.com/oidc/redirect` may be used to represent subdomain1, subdomain2, and subdomain3.

>**Note:** Potential risks of using this feature include scenarios whereby attackers could illegitimately gain access to authorization codes by crafting the requested `redirect_uri` so that the code is returned to a subdomain that they control. See the [Authorization Code Redirection URI Manipulation](https://tools.ietf.org/html/rfc6749#section-10.6) section and the [Open Redirectors](https://tools.ietf.org/html/rfc6749#section-10.15) section of The OAuth 2.0 Authorization Framework.<!--OKTA-364361-->

### Charset parameter in content-type header
To be compliant with the [RFC for JSON data interchange format](https://tools.ietf.org/html/rfc8259#section-11)
, the charset parameter from application/json is no longer added in the Content-Type header of responses from Okta's API endpoints.<!--OKTA-365536-->

### Bug fixed in 2021.02.0

When performing a GET on the [`/oauth2/v1/clients` endpoint](/docs/reference/api/oauth-clients/#list-client-applications) on an org that has a deactivated OIN client, a "404 resource not found" error occurred. (OKTA-365031)
