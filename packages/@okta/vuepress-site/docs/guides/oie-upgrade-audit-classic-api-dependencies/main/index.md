---
title: Audit your Classic API dependencies
meta:
  - name: description
    content: Inventory your Classic Engine dependencies across your apps and map each one to its Identity Engine replacement.
---

<ApiLifecycle access="ie" />

After you upgrade from Classic Engine to Okta Identity Engine (Identity Engine), many applications still run authentication flows from Classic Engine patterns. These include the Classic Authentication API, the Factors API, the Sessions API, and older self-hosted Sign-In Widgets.

These flows often still work, but they don't unlock Identity Engine capabilities. They can also block you from adopting stronger security controls, flexible authentication policies, and newer authenticators such as passkeys.

This guide helps you inventory those Classic Engine dependencies and map each one to its Identity Engine replacement path.

The result is an evidence backed audit that you can hand to app owners, architects, and security reviewers. They can use it to plan and sequence the rest of your modernization work.

---

#### Learning outcome

Inventory the Classic Engine authentication dependencies in your applications and map each one to a supported Identity Engine path.

#### What you need

* An Okta org that's upgraded to Identity Engine and stable, or that you're preparing for post-upgrade modernization
* Developer-level access to the source code, configuration, and dependency manifests for each app that uses Okta for authentication
* Admin access to your Okta org (super admin or application admin) so you can confirm app integration settings and policies
* Access to search repositories, runtime configuration, environment variables, logs, and, where available, API gateway or network traces
* A starting inventory of which apps use Okta for sign-in and who owns each one

---

## Purpose and scope

Use this guide to:

* Find Classic Engine authentication dependencies that might still exist after an Identity Engine upgrade.
* Understand why each dependency matters in Identity Engine.
* Map each dependency to a supported Identity Engine replacement or modernization path.
* Produce a per-application audit record that drives your migration plan.

This guide is for planning and auditing. It doesn't replace the implementation guides for the redirect model, the embedded Sign-In Widget, the embedded SDK or Auth.js, Direct Authentication, authentication policies, or sessions.

When you finish the audit, choose a destination for each app. Then follow the focused implementation guide for that path. For help choosing, see Choose your OIE authentication modernization approach. It links to the build paths in the Modernize your sign-in and SSO flow with Okta Identity Engine journey.
<!-- TODO(OKTA-1216283 follow-up): link "Choose your OIE authentication modernization approach" to /docs/guides/choose-oie-authentication-approach/main/ when that guide publishes. -->
<!-- TODO(OKTA-1216283 follow-up): link "Modernize your sign-in and SSO flow with Okta Identity Engine" to /docs/journeys/modernize-sso-flow-with-oie/main/ when that journey publishes. -->

**Note:** An Identity Engine upgrade doesn't automatically rewrite your application code. Sign-in can keep working on Classic patterns. A code and configuration audit is the only reliable way to find remaining Classic dependencies.

If you don't have an app inventory yet, build one first. The audit is complete only when you've reviewed every active app that uses Okta authentication.

## What to audit

Work through each application and check the following places. The goal is to find every point where your code or configuration touches a Classic Engine authentication pattern.

* **Application source code:** Search for direct calls to Okta authentication endpoints and for hardcoded Okta API paths.
* **Server-side authentication handlers:** Review the code that starts sign-in, exchanges credentials, and creates sessions.
* **Front-end authentication code:** Look for an embedded or self-hosted Sign-In Widget, custom login forms, and direct calls to Okta from the browser.
* **SDK imports and package manifests:** Check `package.json`, `pom.xml`, `requirements.txt`, `.csproj`, `Gemfile`, `go.mod`, and similar files for Okta authentication SDK versions.
* **Sign-In Widget version:** Identify the widget version your app loads and whether it's self-hosted or Okta-hosted.
* **Okta API calls:** Inventory every call to `/api/v1/authn`, `/api/v1/users/{id}/factors`, and `/api/v1/sessions/{id}`.
* **Session-handling code:** Look for logic that creates, reads, validates, or revokes Okta sessions, and for assumptions about Classic session behavior.
* **Factor enrollment, challenge, or verification code:** Look for any flow that enrolls or verifies factors through the Factors API instead of relying on authenticator policies.
* **Configuration files and environment variables:** Check for endpoint URLs, grant types, client settings, and feature flags that pin your app to a Classic pattern.
* **Logs, API gateways, and network traces:** Use these, where available, to catch runtime calls to Classic endpoints that a code search might miss.

Tip: Search your code and logs for the literal strings `/api/v1/authn`, `/api/v1/users`, `factors`, and `/api/v1/sessions`. These strings quickly surface most Classic API usage.

Keep the audit at planning level. Record what you find and where you found it, but don't rewrite code during the audit.

## Classic dependency mapping table

Use this table to identify each Classic pattern and understand why it matters in Identity Engine. Then find the recommended destination and the guide that supports the change.

| Classic dependency or pattern | How to identify it | Why it matters in Identity Engine | Recommended Identity Engine path | Supporting docs |
| --- | --- | --- | --- | --- |
| `/api/v1/authn` (Classic Authentication API) | Direct calls to the `/api/v1/authn` endpoint in server-side or client-side code, or custom login forms that post credentials to this endpoint | Works in many cases, but doesn't unlock Identity Engine features such as flexible authentication policies and newer authenticators | Okta-hosted sign-in experience (redirect, recommended), self-hosted Sign-In Widget (Gen2), the IDX SDK, or Direct Authentication for browserless scenarios | See Choose your OIE authentication modernization approach and the redirect, widget, SDK, and Direct Authentication guides on this page.<!-- TODO(OKTA-1216283 follow-up): link to /docs/guides/choose-oie-authentication-approach/main/ when published. --> |
| `/api/v1/users/{id}/factors` (Factors API) | Code that enrolls, challenges, or verifies factors by calling the Factors API directly | Assumes the Classic enrollment model. In Identity Engine, factor behavior comes from authenticator policies, not direct API orchestration | Remove direct Factors API calls and rely on Identity Engine authenticator policies | [Authenticators overview](https://help.okta.com/oie/en-us/content/topics/identity-engine/authenticators/about-authenticators.htm), [Configure a global session policy and app sign-in policies](/docs/guides/configure-signon-policy/) |
| `/api/v1/sessions/{id}` (Sessions API back channel) | Code that creates, validates, or revokes Okta sessions through the Sessions API, or that assumes Classic session lifetime and cookie behavior | Classic session assumptions might not hold after the upgrade, and session management changes in Identity Engine | Review session behavior and align your code to the Identity Engine session model | [Understand how sessions work after the upgrade](/docs/guides/oie-upgrade-sessions-api/), [Sessions API reference](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/session) |
| Embedded Sign-In Widget v4 or earlier (Gen1 or Gen2) | The widget version your front end loads, or a self-hosted widget package pinned to an older major version | Older widget versions have limited Identity Engine policy support and might not support the Identity Engine authentication pipeline | Upgrade the self-hosted widget to a version that supports Identity Engine (Gen2 for embedding), or switch to the Okta-hosted sign-in experience (redirect) | [Upgrade the Okta Sign-In Widget](/docs/guides/oie-upgrade-sign-in-widget/), [Embedded Okta Sign-In Widget fundamentals](/docs/guides/embedded-siw/) |
| Classic-era language SDKs | Okta authentication SDK versions in package manifests that predate Identity Engine support | Not Identity Engine compatible for new features, and blocks adoption of Identity Engine authenticators and policies | Upgrade to the IDX SDK for your language, or adopt Auth.js | [Replace your Classic Engine SDK or Authn API calls with the IDX SDK](/docs/guides/oie-upgrade-api-sdk-to-oie-sdk/), [Auth.js fundamentals](/docs/guides/auth-js/), [Plan embedded auth app upgrades](/docs/guides/oie-upgrade-plan-embedded-upgrades/) |

The rows above match the Classic patterns most teams encounter. Add a row only when you find a Classic dependency this table doesn't cover. Then map it to the closest supported Identity Engine path.

## How to choose the Identity Engine destination

Once you know which Classic patterns each app uses, decide where that app belongs in Identity Engine. See Choose your OIE authentication modernization approach for a ranked comparison of deployment models.
<!-- TODO(OKTA-1216283 follow-up): link "Choose your OIE authentication modernization approach" to /docs/guides/choose-oie-authentication-approach/main/ when that guide publishes. -->

## Audit output template

Record one row per application, or per integration if an app has more than one Okta integration. Copy this worksheet into a spreadsheet and fill it in as you audit.

| Field | What to capture |
| --- | --- |
| App name | The application or integration being audited |
| Owner | The team or person responsible for the app |
| Current Classic dependency | The Classic pattern found: Authn API, Factors API, Sessions API, widget version, or SDK version |
| Evidence or file location | Repo path, file, config key, log query, or endpoint where you found it |
| Risk or issue | Why this dependency matters: a blocked feature, a security gap, or an unsupported version |
| Recommended Identity Engine destination | Redirect, embedded widget (Gen2), embedded SDK or Auth.js, Direct Authentication, authenticator policy, or session alignment |
| Required code change | The implementation work needed in the app |
| Required admin or policy change | The authentication policy, authenticator, app integration, or session setting to configure |
| Validation owner | Who confirms the change works: a developer, admin, security reviewer, or QA |
| Status | Not started, in progress, blocked, or done |

## Validation guidance

Your audit is complete when:

* You've reviewed and recorded every active app that uses Okta for authentication.
* No active code path depends on the Classic Authentication API (`/api/v1/authn`), the Factors API (`/api/v1/users/{id}/factors`), or Classic Sessions API (`/api/v1/sessions/{id}`) assumptions. If a dependency remains, it has a recommended Identity Engine destination and an owner.
* You've identified every Sign-In Widget version and SDK version, and mapped each one to an upgrade or replacement path.
* You've mapped factor-related logic to Identity Engine authenticator policies, and checked session-related assumptions against the Identity Engine session model.
* You've assigned open questions to the right reviewers. App owners review code, administrators review policy and app settings, and security or architecture reviewers handle risk decisions.

The audit produces the plan, not the fix. You implement and validate each recommended destination through its own build path in the modernization journey.

## Related topics

* [Sign users in overview](/docs/guides/sign-in-overview/)
* [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/)
* [Identify your Okta authentication integrations and customizations](/docs/guides/oie-upgrade-identify-integrations/)
* [Migrate to Identity Engine](/docs/guides/migrate-to-oie/)
