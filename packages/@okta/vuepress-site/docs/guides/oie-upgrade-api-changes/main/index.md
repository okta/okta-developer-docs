---
title: API changes after the upgrade
meta:
  - name: description
    content: Understand which Okta APIs behave differently or are unsupported after upgrading to Identity Engine.
---

<ApiLifecycle access="ie" />

Upgrading from Classic Engine to Identity Engine changes how some Okta APIs work. A few behave differently, and others have new limitations. If your apps call the [Authentication API](#authentication-api-changes), [Factors API](#factors-api-changes), or [Sessions API](#sessions-api-changes), take a look at what's changed before you upgrade.

---

**Learning outcome**

Understand which Okta APIs behave differently or are unsupported in Identity Engine, and update your integrations before you upgrade.

**What you need**

* Knowledge of which Okta APIs your apps call
* Access to the app code that integrates with Okta APIs
* An understanding of whether your apps use Classic Engine Authentication API flows or OAuth 2.0/OIDC flows

---

## Summary of API changes

The following table summarizes the API changes in Identity Engine.

| API area | Change type | Impact |
| --- | --- | --- |
| `audience` parameter in the Authentication API (`/api/v1/authn`) | Not supported | Apps that pass `audience` fail. |
| Authentication API device token | Behavior changed | Adopt a new SDK or the redirect model. |
| `cookieToken` in the Sessions API (`POST /api/v1/sessions`) | Not supported | You can't request `cookieToken` as an additional field. |
| Sessions API (`/api/v1/sessions/me`) | Response changed | The response no longer returns Identity Provider information. |
| Factors API: reset email factor | Behavior changed | Email auto-enrolls, so the reset behavior differs. |
| Factors API: reset question factor | Behavior changed | Recovery questions appear in factor responses. |
| Factors API: SMS lifecycle operations | Not supported | You can't activate or deactivate SMS through the Factors API. |
| Classic Authentication API: password recovery | Limited | New Identity Engine recovery options aren't accessible through the classic API. |
| Classic Engine APIs: Identity Engine features | Not supported | Identity Engine-only features require updated SDKs. |

## Authentication API changes

### The `audience` parameter isn't supported

Passing the `audience` parameter to `/api/v1/authn` isn't supported in Identity Engine.

**Why:** Identity Engine uses a flexible app sign-in policy model that Classic Engine authentication pipelines can't accommodate.

**Action:** Remove the `audience` parameter from authentication requests. Instead, use app-specific sign-on policies that you configure in the Admin Console.

### Device token behavior changed

Direct device token passing is no longer the primary method for device context in Identity Engine. Identity Engine uses authentication policies to evaluate device context instead.

| Migration path | Description | Trade-off |
| --- | --- | --- |
| Temporary backward compatibility | Keep the Okta sign-on policy active (called the **global session policy** in Identity Engine). | New Identity Engine device features remain unavailable. |
| Redirect-based authentication | Migrate to Okta-hosted sign-in pages. | Device context policies are handled automatically. |
| Updated SDKs | Adopt Identity Engine SDKs for embedded apps. | Full access to Identity Engine Device Trust capabilities. |

See [Device Token in Auth API](https://support.okta.com/help/s/article/Device-Token-in-Auth-API?language=en_US) for details.

## Sessions API changes

### `POST /api/v1/sessions` with `cookieToken`

The request `POST /api/v1/sessions?additionalFields=cookieToken` isn't supported in Identity Engine. Apps that manage sessions entirely within the `/api/v1/sessions` APIs can continue to work. However, you can't request the `cookieToken` extra field.

### `/api/v1/sessions/me` response changes

After the upgrade, the `/api/v1/sessions/me` response no longer returns Identity Provider (IdP) information.

**Backward compatibility:** Existing apps continue to work without immediate changes. Embedded Sign-In Widgets and apps that use older SDKs or direct APIs still operate after the upgrade.

**Limitation:** Some new Identity Engine capabilities require updated SDKs. To use passwordless authentication and app-specific sign-on policies, upgrade to SDKs that support the [Interaction Code flow](/docs/concepts/interaction-code/).

See [v1/sessions/me APIs](https://support.okta.com/help/s/article/v1sessionsme-APIs?language=en_US) for details.

## Factors API changes

### Reset Factor API: email enrollment

In Identity Engine, a verified primary email automatically functions as an email authenticator enrollment. This changes the reset factor behavior:

* The `GET /api/v1/users/{userId}/factors` endpoint returns the verified primary email as an active email factor.
* Don't use the Classic Engine reset factor operation for email enrollment, because email auto-enrolls in Identity Engine.
* Users can use their verified primary email for recovery only, or for both authentication and recovery. This depends on the Email authenticator configuration.

### Reset Factor API: question enrollment

Identity Engine consolidates recovery and MFA questions into a single concept:

* The `GET /api/v1/users/{userId}/factors` endpoint now returns recovery questions even when no MFA Security Question enrollment exists.
* After you reset all factors, the forgotten-password question still appears in API responses. This differs from Classic Engine behavior.
* Resetting both question types requires two separate `POST /api/v1/users/{userId}/lifecycle/reset_factors` calls.

### SMS Factor lifecycle operations aren't supported

You can't activate or deactivate the SMS factor through the Factors API (`/api/v1/org/factors`) in Identity Engine.

### Password recovery limitations with the Classic Authentication API

If you use the `/api/v1/authn` API for custom password reset experiences, be aware of these limitations in Identity Engine:

* New Identity Engine recovery options, such as Okta Verify Push and "any enrolled authenticator" verification, aren't available through the Classic Authentication API.
* End users are denied recovery if these modern options are the only ones configured.

**Action:** If you rely on classic API password recovery flows, keep at least one Classic-compatible recovery option configured. Alternatively, migrate to the Identity Engine SDK-based recovery flow.

### Identity Engine features not accessible from Classic Engine APIs

Identity Engine introduces features that are only available through updated SDKs and the Interaction Code flow. Classic Engine APIs can't access these features:

* Passwordless authentication
* App-specific sign-on policies
* Modern Device Trust evaluation
* Advanced authenticator enrollment options

**Action:** To access Identity Engine features, migrate from Classic Engine APIs to the Identity Engine SDKs that support the Interaction Code flow.

## Update checklist

Before you upgrade, audit your integrations against the following checklist:

* Audit your code for the `audience` parameter in `/api/v1/authn` calls.
* Audit for device token passing to the Authentication API.
* Check whether you request `cookieToken` from the Sessions API.
* Check whether you parse IdP information from `/api/v1/sessions/me` responses.
* Review your Factors API usage for email reset, question reset, and SMS lifecycle operations.
* Review custom password recovery flows that are built on `/api/v1/authn`.
* Plan an SDK migration for any features that require Identity Engine capabilities.
* Test your API integrations in a preview org after the upgrade.

## See also

* [Identity Engine limitations](/docs/guides/ie-limitations/main/): Full reference for current Identity Engine limitations and behavioral differences
* [Session changes after the upgrade](/docs/guides/oie-upgrade-sessions-api/main/): How sessions work in Identity Engine
* [Upgrade your app SDK](/docs/guides/oie-upgrade-api-sdk-to-oie-sdk/main/): Migrate to the Identity Engine SDKs
* [Device Token in Auth API](https://support.okta.com/help/s/article/Device-Token-in-Auth-API?language=en_US): Device token changes and migration paths
* [v1/sessions/me APIs](https://support.okta.com/help/s/article/v1sessionsme-APIs?language=en_US): Session API response changes
