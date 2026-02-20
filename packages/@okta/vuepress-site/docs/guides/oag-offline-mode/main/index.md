---
title: Configure offline mode for Access Gateway
meta:
  - name: description
    content: How to configure offline mode for Access Gateway
layout: Guides
---

This guide explains how to configure offline mode for Access Gateway using Access Gateway APIs. Offline mode allows users to authenticate locally through Access Gateway and continue accessing protected on-premises applications, even when Access Gateway is unable to reach Okta.

---

#### Learning outcomes

Learn how to configure offline mode for Access Gateway using Access Gateway APIs.

#### What you need

An Okta org that's subscribed to Access Gateway

---

## Overview

This document outlines the API definitions required to support **Temporary Offline Access** (Disconnected Operations) for Okta Access Gateway (OAG). As defined in the Product Hub Document, OAG requires REST API endpoints to configure fallback IdP settings, manage offline sign-on policies, and handle extended offline mode triggers.
These endpoints extend the existing OAG Management APIs to support local authentication when the Okta service is unreachable.

Temporary Offline Access enables users to authenticate locally on the Okta Access Gateway (OAG) and continue accessing protected on-premises applications, even when OAG is unable to reach Okta. This feature provides resiliency and business continuity for critical on-premises resources during internet outages or in disconnected environments, such as cruise ships, airplanes, or high-security facilities.

**INTERNAL DOCUMENT OKTA CONFIDENTIAL** **Project:** OAG Offline Mode (Disconnected Operations) **Doc Type:** API Specification (Draft / RFC) **Based on Product Hub Document:** **Status:** In Design (Engineering Lead Input Required)

## Set up Access Gateway for API access

Set up Okta so that you can authenticate to Okta APIs and have the proper roles and scopes to manage labels:

1. [Set up an app for OAuth 2.0 authentication](#set-up-an-app-for-oauth-2-0-authentication).
1. [Grant scopes required for labels](#scopes-required-for-labels).
1. [Assign roles to your API users](#assign-roles-to-your-api-users).
1. [Assign API users to a role and to your API access app](#assign-api-users-to-a-role-and-to-your-api-access-app).

### Set up Access Gateway for API access

Users can access OIG APIs by authenticating with an [OAuth 2.0 access token](https://developer.okta.com/docs/api/openapi/okta-management/guides/overview/#oauth-20-access-token). To obtain an OAuth 2.0 access token for API authentication, you need to have an app in Okta for API access:

* If you don't have an app for API access, see [User-based API access setup](/docs/guides/set-up-oauth-api/main/#user-based-api-access-setup) to create an OIDC app. Grant the [scopes required for labels](#scopes-required-for-labels) to the OIDC app (in addition to any other scopes you may need).

* If you already have an OIDC app for API access, ensure that your app is granted with the [scopes required for labels](#scopes-required-for-labels).

* If you're using Okta Workflows, ensure that the **Okta Workflows OAuth** app is granted with the [scopes required for offline mode](#scopes-required-for-offline-mode). See [Authorization > Create a connection from the current Okta org](https://help.okta.com/okta_help.htm?type=wf&id=ext-okta-misc-authorization).

### Scopes required for offline mode

Your OAuth 2.0 access token must have the appropriate scopes for the [Labels API](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Labels/) request.

Ensure that the following scopes are granted to your app for API authentication:

* `okta.governance.labels.manage`
* `okta.apps.read`
* `okta.groups.read`
* `okta.governance.entitlements.read`
* `okta.governance.collections.read`

Assign the super admin (`SUPER_ADMIN`) role to your API users.

### Configure offline mode for identity providers

Configuration for enabling offline capabilities on specific Identity Providers (IdPs) associated with OAG.  
**GET** /api/v1/idps/{idpId}/offline-config  
Retrieves the current offline configuration for a specific IdP.  
**PUT** /api/v1/idps/{idpId}/offline-config  
Updates the offline access configuration. This endpoint facilitates the requirement that admins must explicitly configure the fallback local IdP.  
**Request Body Schema:**

```
{
  "enabled": true,
  "max_offline_duration_days": 30, 
  "fallback_mode": "automatic", 
  "sync_frequency_seconds": 3600
}
```

* **enabled**: Toggles the capability for this IdP to switch to offline mode.  
* **max_offline_duration_days**: Hard cap on offline duration (Note: Product hard limit is 1 year).  
* **fallback_mode**:  
  * automatic: OAG dynamically detects connection loss and switches.  
  * manual: Requires admin intervention (Extended Mode).  
  * **Response:** 200 OK

#### Request example

```bash

```

#### Response example

```json

```

### Configure offline sign-in policies

As per the requirement, offline policies are **not** synced from Okta and must be explicitly configured on the OAG instance at the IdP level,.  
**GET** /api/v1/idps/{idpId}/offline-policies  
Fetches the list of offline sign-on policies.  
**POST** /api/v1/idps/{idpId}/offline-policies  
Creates a new offline policy rule. Validates that the authenticators specified are supported in offline mode (currently Password and Smart Card only,).  
**Request Body Schema:**

```
{
  "name": "Emergency Access Policy",
  "priority": 1,
  "conditions": {
    "user_groups": {
      "include": ["Admins", "Emergency_Response_Team"]
    }
  },
  "requirements": {
    "authenticators": [
      {
        "type": "password",
        "required": true
      },
      {
        "type": "smart_card",
        "required": false
      }
    ]
  }
}
```

* **constraints**: The API must reject fastpass or webauthn in this release, as they are Phase 2/3 goals.


#### Request example

This example assigns two label values to two resources:

```bash

```

#### Response example

```json

```

### Monitor offline status and trigger extended offline mode

Endpoints to monitor connectivity status and manually invoke "Extended Offline Mode" for scenarios like submarine deployments or intentional air-gapping,.

**GET** /api/v1/system/offline-status  
Returns the current connectivity state of the OAG appliance.  
**Response Schema:**

```
{
  "connection_status": "disconnected",
  "current_mode": "offline",
  "offline_since": "2025-10-23T14:30:00Z",
  "last_sync_timestamp": "2025-10-23T12:00:00Z",
  "events_cached_count": 452
}
```

**events_cached_count**: Monitoring for the system log events cached locally while disconnected.  
**POST** /api/v1/system/offline-mode/extended  
Triggers "Extended Offline Mode." This forces the system to remain offline regardless of connectivity until manually disabled.

**Request Body:**

```
{
  "action": "enable", 
  "reason": "Planned Submarine Deployment"
}
```

#### Request example

This example replaces the background color of `lblo3v6xlwdtEX2il1d1` (SOX) to purple.

```bash

```

#### Response example

```json

```

## Data models and limitations



### Supported authenticators

When configuring policies via the /offline-policies endpoint, the authenticator type must validate against:

* PASSWORD: Validates against on-prem AD/LDAP hash.  
* SMART\_CARD: PIV/CAC validation.  
* *Future:* OKTA\_VERIFY (FastPass) \- **DISABLED in v1**.

### User restrictions

The API must enforce the following logic limitations:

* **No App Creation:** POST /api/v1/apps requests must return 403 Forbidden or specific error E00\_OFFLINE\_MODE when current\_mode is "offline".  
* **No User Onboarding:** Attempts to create new users via OAG during offline mode must be blocked unless specific local-only flows (Phase 2\) are enabled.

## Security considerations

* **Local Storage:** Cached credentials and logs must be encrypted at rest on the appliance.  
* **Auth:** Access to these offline configuration APIs requires the standard OAG Admin Session Token.  
* **Audit:** Changes to offline policies (e.g., weakening security by removing Smart Card requirements) must be logged locally and synced to Okta System Log immediately upon reconnection.
