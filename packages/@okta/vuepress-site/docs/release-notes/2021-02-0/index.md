---
title: Okta API Products Release Notes
---

## 2021.02.0

| Change                                                                                              | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------|--------------------------|
| [Okta Org API now available in Self-Service Early Access (EA)](#okta-org-api-now-available-in-self-service-early-access-ea) | February 3, 2021         |
| [Automatically mark a flow hook as “VERIFIED”](#automatically-mark-a-flow-hook-as-verified) | February 3, 2021         |
| [The OIDC app creation message is now more prominent](#the-oidc-app-creation-message-is-now-more-prominent) | February 3, 2021         |
| [Event Hook preview tab now in Early Access (EA)](#the-oidc-app-creation-message-is-now-more-prominent)      | February 3, 2021          |
| [New System Log events for MFA factor activity and for importing users through CSV](#new-system-log-events-for-mfa-factor-activity-and-for-importing-users-through-csv) | February 3, 2021          |
| [The CUSTOM_URL_DOMAIN flag is now available for all orgs](#the-custom-url-domain-flag-is-now-available-for-all-orgs) | February 3, 2021          |
| [Legacy developer edition orgs now have an improved UI for OIDC apps](#legacy-developer-edition-orgs-now-have-an-improved-ui-for-oidc-apps) | February 3, 2021         |
| [Wildcards for OAuth redirect subdomains](#wildcards-for-oauth-redirect-subdomains) | February 3, 2021         |
| [Bug fixed in 2021.02.0](#bug-fixed-in-2021-02-0) | February 3, 2021         |

### Okta Org API now available in Self-Service Early Access (EA)

The Okta Org API is now available in Self-Service EA. This API allows you to manage your org account settings, contact information, logo, Okta support settings, Okta communication settings, and preferences. See [Org API](/docs/reference/api/org/).<!--OKTA-325713-->

### Automatically mark a flow hook as “VERIFIED”

When a request is made to `/api/v1/eventHooks/{eventHookId}/lifecycle/verify` for an [Event Hook](/docs/reference/api/event-hooks/) that has an Okta Workflows endpoint configured, the Event Hook is automatically marked as "VERIFIED”. The verification step isn’t required.<!--OKTA-364393-->

### The OIDC app creation message is now more prominent

After an OIDC application is created, the "Application created successfully" notification is frequently missed because it only appears briefly after an app is saved. The message now appears after the UI redirects to the new application's main page.<!--OKTA-347546-->

### Event Hook preview tab now in Early Access (EA)

Event Hooks configured in the Admin Console or by [Event Hooks Management API](https://developer.okta.com/docs/reference/api/event-hooks/) can now preview the JSON body of the Event Hook in the Admin Console, as well as delivering the preview request to your external service without manually triggering an actual event.

Previewing the JSON body of the Event Hook assists developers or administrators create or troubleshoot the request syntax. The JSON body can also be edited for different request scenarios.

See [Event Hook Preview](https://help.okta.com/en/prod/Content/Topics/automation-hooks/event-hooks-preview.htm).<!--OKTA-364119-->

### New System Log events for MFA factor activity and for importing users through CSV

The following System Log event types are now available:
* The `system.mfa.factor.activate` event indicates that the MFA factor is activated.
* The `system.mfa.factor.deactivate` event indicates that the MFA factor is deactivated.

These events help admins track user action for MFA factor activity. The events are triggered when an MFA factor is activated and when it is deactivated.
* The `system.import.user_csv.start` event indicates that the process to import users from CSV is started.
* The `system.import.user_csv.complete` event indicates that the process to import users from CSV is completed.

These events help admins track the activity of batch importing users through CSV. The events are triggered when the process to import users from CSV is started and when it is completed.

See [System Logs](/docs/reference/api/system-log/).<!--OKTA-362508-->

### The CUSTOM_URL_DOMAIN flag is now available for all orgs

The ability to create a custom URL domain is now enabled for all orgs. You can customize your Okta organization by replacing the Okta domain name with your own domain name. This allows you to create a seamless branded experience for your users so that all URLs look like your application.

See [Customize the Okta URL Domain](/docs/guides/custom-url-domain/overview/).<!--OKTA-360505-->

### Legacy developer edition orgs now have an improved UI for OIDC apps

Legacy developer edition orgs (created prior to 2019) now have an improved UI for OIDC apps. The UI features client credentials more prominently so that it's easier for users to copy/paste, and allows users to download sample apps with client credentials pre-injected so that they can save time on getting sample apps to work.<!--OKTA-349481-->

### Wildcards for OAuth redirect subdomains

Developers can now use the [Apps API](/docs/reference/api/apps/#settings-10) to set multiple redirect URI subdomains with a single parameter using the asterisk *wildcard. This feature provides convenience and flexibility in cases where subdomains vary by only a few characters. For example: `https://subdomain*.example.com/oidc/redirect` may be used to represent subdomain1, subdomain2, and subdomain3.

>**Note:** Potential risks of using this feature include scenarios whereby attackers could illegitimately gain access to authorization codes by crafting the requested `redirect_uri` so that the code is returned to a subdomain that they control. See the [Authorization Code Redirection URI Manipulation](https://tools.ietf.org/html/rfc6749#section-10.6) section and the [Open Redirectors](https://tools.ietf.org/html/rfc6749#section-10.15) section of The OAuth 2.0 Authorization Framework.<!--OKTA-364361-->

### Bug fixed in 2021.02.0

When using the [GET `/oauth2/v1/clients`](/docs/reference/api/oauth-clients/#list-client-applications) endpoint on an org that has a deactivated OIN client, a “404 resource not found” error occurred. (OKTA-365031)
