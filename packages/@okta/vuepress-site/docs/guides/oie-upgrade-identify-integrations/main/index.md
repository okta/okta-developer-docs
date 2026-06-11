---
title: Identify your Okta authentication integrations and customizations
meta:
  - name: description
    content: Find all Okta sign-in, customization, SDK, and API integration points so you can assess each one before upgrading to Okta Identity Engine.
---

<ApiLifecycle access="ie" />

Okta integrations can span apps, sign-in pages, custom code, SDKs, API tokens, Okta Workflows, hooks, directory agents, and log streams. Any of these can break during an upgrade. Discovery helps your team decide what to test, update, replace, retire, or assign an owner before the Okta Identity Engine upgrade.

A single Okta org may run multiple deployment models at the same time. Find all of them before the upgrade so that nothing breaks unexpectedly.

---

#### Learning outcomes

* Find every Okta sign-in, SDK, API, and automation integration point in your org.
* Assess each integration and assign an upgrade action before the Identity Engine upgrade.

#### What you need

* Super admin or read-only admin access to the Admin Console.
* A contact list for app, security, DevOps, and development team owners.
* Access to source-code search, CI/CD configuration, and secrets managers.
* A date range for log and report queries, such as the past 90 days.
* A spreadsheet or tracking tool to record inventory findings.

---

## Plan your discovery

Set up a place to record findings, then choose where to begin.

### Create an integration inventory

Use this worksheet to record every integration that you find. Add a row for each app, service, script, Workflow, agent, or integration that interacts with Okta.

| Column | What to record |
| --- | --- |
| Integration name | The name of the app, service, script, Workflow, agent, or integration. |
| Integration type | Redirect SSO, embedded widget, SDK, API token, OAuth service app, hook, Workflow, directory agent, log stream, or other. |
| Where found | Admin Console, System Log, a report, source code, CORS trusted origins, secrets manager, or SIEM. |
| Owner | A team, an admin, or unknown. |
| Last observed use | A date or evidence from logs, reports, or code history. |
| Impact area | Sign-in, authentication, provisioning, API automation, policy, user lifecycle, logging, or security. |
| Upgrade action | Test, update, replace, retire, validate, or investigate. |
| Notes | Any other relevant detail. |

### Decide where to start your discovery

Use this table to choose a starting point for each kind of integration.

| To find... | Start with... | Confirm with... | Record... |
| --- | --- | --- | --- |
| Apps using Okta SSO | **Apps** > **Apps** in the Admin Console | App access report | App name, type, status, and owner |
| Apps with recent sign-in activity | App usage report | `user.authentication.sso` events in the System Log | App name, last used, and user count |
| Apps with user or group assignments | App integration assignments | User App access report | Groups assigned and provisioning status |
| Redirect apps with a customized hosted login | **OIE Upgrade Hub** acknowledgment items | **Customizations** > **Brands** > **Pages** > **Code Editor** | Custom domain and any custom CSS or JavaScript |
| Embedded Sign-In Widget or Auth.js SDK | **OIE Upgrade Hub** acknowledgment items | **Security** > **API** > **Trusted Origins** CORS entries | URLs registered for CORS |
| SSWS API tokens and owners | **Security** > **API** > **Tokens** | [List API tokens](/docs/guides/create-an-api-token/) | Token name, role, last used, and owner |
| OAuth service apps calling Okta APIs | **Security** > **API** > **API service integrations** | Okta API scopes assigned to each app | App name, scopes, and owner |
| Custom authorization servers | **Security** > **API** > **Authorization servers** | [Build authorization servers](/docs/guides/customize-authz-server/) | Server name, audience, and scopes |
| Workflows or automations using Okta | Okta Workflows console > **Flows** | Workflows connected apps | Flow name, connections, and Okta actions |
| Directory agents or log stream dependencies | **Directory** > **Directory Integrations** | **Reports** > **Log streaming** | Agent type, version, and connection status |

## Find sign-in and client-side integration points

Use this section to find redirect sign-in, embedded widget, custom sign-in page, and SDK integration points.

### Okta-hosted redirect sign-in

Use this section to find apps that redirect users to an Okta-hosted login page, especially apps with a customized login page.

**Check**

* Check the URL that users visit to sign in.
  * A `.okta.com` or `.oktapreview.com` URL means that no [custom domain](/docs/guides/custom-url-domain/) is configured, so login page customizations aren't possible.
  * A URL on your own domain means that a custom domain is configured.
* Open the **OIE Upgrade Hub** and review acknowledgment items for hosted login page customizations.
  * Any change to the login page code editor, even a comment, triggers an acknowledgment item.
* Go to **Customizations** > **Brands**.
  * For each brand with a custom domain, open **Pages** > **Login page** > **Code Editor**.
  * Review for [deprecated Sign-In Widget methods](/docs/guides/oie-upgrade-sign-in-widget-deprecated-methods/), custom CSS, or custom JavaScript.

**Record**

* Whether a custom domain is in use.
* Whether an acknowledgment item appears in the **OIE Upgrade Hub**.
* The location and nature of any custom code in the code editor.

### Embedded Sign-In Widget and custom sign-in pages

Use this section to find apps that embed the Okta Sign-In Widget on an application page, or custom sign-in pages not hosted by Okta.

**Check**

* Open the **OIE Upgrade Hub** and look for an acknowledgment item that indicates an embedded Okta Sign-In Widget.
  * This item appears when the widget is detected as embedded.
* Go to **Security** > **API** > **Trusted Origins** and filter for entries with CORS enabled.
  * [CORS registration](/docs/guides/enable-cors/) is required for both the Sign-In Widget and the Auth.js SDK to function.
  * Any URL registered for CORS is a potential embedded client-side authentication endpoint.
* The Upgrade Hub doesn't detect the Auth.js (`okta-auth-js`) SDK independently.
  * Use CORS entries and source-code search to find Auth.js usage.
* If the Sign-In Widget runs in Classic Mode, the upgrade may not require changes. Thorough testing is still required.

**Record**

* Each URL registered for CORS, and whether CORS was the intended purpose.
* Whether an embedded Sign-In Widget acknowledgment item exists in the Upgrade Hub.
* Whether Classic Mode is in use.

### Okta SDKs and client-side authentication

Use this section to find apps that use the Auth.js SDK, Okta client-side SDKs, or custom JavaScript authentication flows.

**Check**

* Search source-code repositories for imports or references to `@okta/okta-auth-js`, `@okta/okta-signin-widget`, `@okta/okta-react`, `@okta/okta-angular`, `@okta/okta-vue`, or `okta-sdk-*`.
* Check package manifests, CI/CD configuration, and secrets managers for Okta client IDs, issuer URLs, or redirect URIs.
  * Manifests include `package.json`, `pom.xml`, `requirements.txt`, and `.csproj` files.
* Cross-reference findings with CORS Trusted Origins, which are required for client-side Okta authentication.
* Reach out to development teams directly.
  * Server-side authentication patterns may not appear in the Admin Console or System Log in a traceable way.

**Record**

* The application or repository name.
* The SDK or library version found.
* Whether the app also appears in CORS Trusted Origins.

## Find applications configured in Okta

Use this section to find all app integrations in the org, including active, inactive, and recently provisioned apps.

**Check**

* Go to **Apps** > **Apps** and review all app integrations by status, including active and inactive apps.
* Use the [Apps API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/) to export a complete list programmatically for large orgs.
* Review each app's sign-on method (SAML, OIDC, SWA, or bookmark), provisioning status, and last sign-in date.
* Use the app usage report to identify apps with no recent sign-in activity.

**Record**

* App name, sign-on method, status, provisioning status, and the date of last observed sign-in.

## Find API tokens and service integrations that call Okta APIs

Use this section to find SSWS API tokens, OAuth service apps, and service accounts that call Okta management APIs.

### SSWS API tokens

**Check**

* Go to **Security** > **API** > **Tokens** and review each active token's name, ID, role, type, and last-used date.
* API tokens act on behalf of the admin who created them.
  * Tokens owned by former employees or shared accounts may need reassignment or replacement before the upgrade.
* Use the [List API tokens](/docs/guides/create-an-api-token/) operation to export token metadata for bulk review.
* To trace which token made specific calls, filter the System Log for `/api/v1/authn`, `/api/v1/sessions`, or `/api/v1/factors` requests.
  * Export the results to CSV.
  * In the CSV, filter the `rawUserAgent` column for values that don't start with `Mozilla`.
  * If a log event includes `system.transaction.request.apiTokenId`, look up that token ID under **Security** > **API** > **Tokens** to find the owner.

**Record**

* Token name, owner, associated admin role, and last-used date.
* Which services or scripts are confirmed to use each token.

### OAuth service apps

**Check**

* Go to **Security** > **API** > **API service integrations** and review each machine-to-machine integration and its scopes.
* Use the [Okta API scopes](/docs/guides/implement-oauth-for-okta/) reference to understand what each scope allows.

**Record**

* Service app name, configured scopes, and owner team.

## Find authorization servers, hooks, Workflows, agents, and log streams

Use this section to find components that affect sign-in flows, token issuance, provisioning, or automation.

**Custom authorization servers**

* Go to **Security** > **API** > **Authorization servers** and list all custom authorization servers.
* For each server, note the audience, scopes, claims, and any attached access policies or rules.
* See [Build authorization servers](/docs/guides/customize-authz-server/) for a configuration reference.

**Event hooks and inline hooks**

* Go to **Workflow** > **Event Hooks** and **Inline Hooks** in the Admin Console.
* For each hook, record the endpoint URL, the events subscribed to, and the owner team.
* See the [Event Hooks](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/EventHook/) and [Inline Hooks](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/) APIs for reference.

**Okta Workflows**

* Open the Workflows console and review active and inactive flows.
* Check the Workflows connected apps and the Okta connector reference.
* Identify flows that trigger on user lifecycle events, such as user creation, deactivation, or group membership changes.

**Directory agents**

* Go to **Directory** > **Directory Integrations** and list all AD, LDAP, and HR agents.
* Record each agent's name, type, version, and connection status.
* See your AD and LDAP integration settings for a configuration reference.

**Log streams**

* Go to **Reports** > **Log streaming** and review all configured log stream destinations.
* Record each stream's destination, event type filters, and owner team.
* See the [Log Streaming API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/LogStream/) for a configuration reference.

For each component, record the name, type, configuration, owner, and whether it's currently active.

## Validate usage and plan upgrade actions

Confirm which integration points are still in use, then assign an action to each one.

### Validate active usage with reports and the System Log

Use these tools to confirm which integration points are still in active use before you assign upgrade actions.

**Reports**

| Report | What it shows | Use it to |
| --- | --- | --- |
| App access report | SSO attempts across app integrations | Confirm which apps have recent SSO activity |
| App usage report | Sign-in counts by app over a date range | Identify stale or inactive apps |
| User App access report | Users and groups with access to each app | Identify ownership and dependency scope |
| Admin role assignments report | Admins, resource sets, and roles | Identify API token owners and possible app owners |

**System Log**

* Use System Log filters to search by event type, actor, IP address, or target.
* Use the [event types catalog](/docs/reference/api/event-types/) to identify the event types most relevant to your discovery.

To find server-side API callers:

1. Filter the System Log for requests to `/api/v1/authn`, `/api/v1/sessions`, or `/api/v1/factors`.
2. Export the results to CSV.
3. In the CSV, filter the `rawUserAgent` column for values that don't start with `Mozilla`. Non-browser user agents indicate server-side or scripted callers.
4. If `system.transaction.request.apiTokenId` is populated, copy that token ID and search for it under **Security** > **API** > **Tokens** to find the owner.

For programmatic export, use the [List Log Events API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SystemLog/).

### Map owners, dependencies, and upgrade actions

Review all inventory entries and assign an upgrade action to each integration.

| Finding | Why it matters before the upgrade | Recommended action |
| --- | --- | --- |
| Redirect app using a custom domain | The custom login page may use deprecated Sign-In Widget methods | Test before the upgrade |
| **OIE Upgrade Hub** acknowledgment item | Indicates a customization or embedded component that needs review | Complete the Upgrade Hub acknowledgment process |
| Embedded Sign-In Widget | Widget version compatibility must be confirmed for Identity Engine | Test before upgrade; update the widget version if needed |
| Auth.js SDK in use | The SDK version must be Identity Engine-compatible | Update the SDK version before the upgrade |
| Server-side calls to `/api/v1/authn`, `/api/v1/sessions`, or `/api/v1/factors` | Classic-only endpoints may change behavior in Identity Engine | Identify the caller, assess impact, and update or replace |
| Active SSWS API token owned by a departed admin | The token may fail if the admin account is deactivated | Reassign to an active service account, or replace with an OAuth service app |
| OAuth service app with broad scopes | Scope access may need review after the upgrade | Validate scopes and follow least privilege |
| Custom authorization server | Identity Engine policy and rule changes may affect token issuance | Test token flows in an Identity Engine preview org |
| Okta Workflow triggering on lifecycle events | Identity Engine policy changes may affect trigger timing or payload data | Test flows in an Identity Engine preview org |
| Directory agent on an older version | Older agents may have compatibility issues | Update the agent to the current version before the upgrade |
| Log stream to an external SIEM | Log format or event type changes may affect SIEM parsing | Test in a preview org; update SIEM filters if needed |
| Inactive app with no recent activity | A candidate for retirement before the upgrade | Verify with the owner; retire if confirmed unused |
| Unknown owner | You can't assign upgrade responsibility | Escalate to IT or the security team for ownership investigation |

### What to assess before the upgrade

* Confirm who owns each integration.
* Confirm that each integration is still active and in use.
* Confirm whether the integration affects sign-in, policy, API automation, provisioning, user lifecycle, logging, or security monitoring.
* Confirm whether the integration must be tested in an Identity Engine preview or sandbox environment.
* Complete all relevant **OIE Upgrade Hub** acknowledgment items.
* Notify downstream teams of the upgrade timeline and any expected changes.
* Assign an upgrade action to each integration: test, update, replace, retire, validate, or investigate.

## Next steps

* Complete all acknowledgment items in the **OIE Upgrade Hub** for your org.
* Test all embedded, SDK-based, and server-side integration points in an Identity Engine preview environment before upgrading production.
* Replace or update Classic-only API calls with Identity Engine-supported equivalents where needed.
* Assign integration owners and collect upgrade readiness sign-off from each team before the production upgrade.
* Return to the [Prepare your upgrade to Okta Identity Engine](/docs/guides/oie-upgrade-overview/) journey for planning, rollout, and timeline steps.

## Related topics

* [Prepare your customizations for upgrade](https://help.okta.com/okta_help.htm?type=oie&id=ext-custom-sign-in-page)
* [Apps API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/)
* [Create and manage API tokens](/docs/guides/create-an-api-token/)
* [Implement OAuth for Okta service app](/docs/guides/implement-oauth-for-okta-serviceapp/)
* [Build authorization servers](/docs/guides/customize-authz-server/)
* [Enable CORS](/docs/guides/enable-cors/)
* [Event types](/docs/reference/api/event-types/)
* [List Log Events API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SystemLog/)
