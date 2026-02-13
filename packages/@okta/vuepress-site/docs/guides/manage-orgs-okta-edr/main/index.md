---
title: Manage org recovery with Okta Enhanced Disaster Recovery
---

<ApiLifecycle access="ea" />

This guide explains how to manage a failover and failback of your Okta org using Okta Enhanced Disaster Recovery (DR).

> **Note:** Enhanced DR is a [self-service Early Access (EA)](/docs/concepts/feature-lifecycle-management/#self-service-features) feature. See [Manage Early Access and Beta features](https://help.okta.com/okta_help.htm?id=ext_secur_manage_ea_bata) to enable.

---

#### Learn outcomes

- Check the disaster recovery status for your org using the Okta API.
- Initiate an org failover using the Okta API.
- Initiate an org failback using the Okta API.
- Review the System Log data and notifications for disaster recovery.

#### What you need

- An Okta production org
- The Enhanced DR product enabled for your org
- Super administrator privileges or Enhanced DR privileges
- [Enhanced Disaster Recovery APIs](https://developer.okta.com/docs/api//openapi/okta-management/management/tag/DisasterRecovery/)

---

## About Okta Enhanced Disaster Recovery

Okta Enhanced Disaster Recovery (DR) reduces the recovery time objective (RTO) from one hour to five minutes in the event of a regional infrastructure-related outage. Enhanced DR improves on the standard disaster recovery RTO available to all Okta production orgs. It ensures service continuity during total regional outages, allowing users to continue authenticating into all their apps. In Enhanced DR mode, your Okta org enters read-only access. See [Understanding Okta's "Read-only Mode"](https://support.okta.com/help/s/article/What-is-Oktas-Readonly-Mode?language=en_US).

Enhanced DR also supports self-service failover, which grants admins the ability to initiate an org failover and failback. Admins can initiate failover and failback through APIs or the [Okta Disaster Recovery Admin app](https://help.okta.com/okta_help.htm?type=oie&id=enhanced-disaster-recovery). See the following sections on how to manage Enhanced DR using the Okta APIs.

> **Note:** If your server or network policies restrict traffic to certain IPs, Okta recommends that you allow access to the Okta cell IPs. See [Allow access to Okta IP addresses](https://help.okta.com/okta_help.htm?type=oie&id=ext-ip-address-allow-listing).

## User roles and permissions for Enhanced DR

You can manage Enhanced DR by using the super administrator role or by creating a custom role.

To create an Enhanced DR custom role, use the Admin Console or the APIs. See [Roles in Okta](https://developer.okta.com/docs/api/openapi/okta-management/guides/roles/#roles-in-okta) or [Use custom admin roles](https://help.okta.com/okta_help.htm?type=oie&id=csh-create-cstm-admin-role). The following permissions, resource, and resource type are required when creating the Enhanced DR custom role:

- Permissions: Manage disaster recovery (`okta.dr.manage`) or view disaster recovery (`okta.dr.read`)
- Resource type: Business continuity
- Resource: Disaster recovery

## Make secure API requests with OAuth 2.0

Okta Enhanced DR only supports API access through scoped OAuth 2.0 access tokens, and uses the following scopes: `okta.dr.manage`, `okta.dr.read`.

<CreateOAuth2Token/>

## Check the disaster recovery status of your org

Use the following disaster recovery API endpoint, [Retrieve the disaster recovery status for all domains for your org](/docs/api/openapi/okta-management/management/tag/DisasterRecovery/#tag/DisasterRecovery/operation/getDRStatus), to understand the current disaster recovery state for all domains associated with your Okta org.

>**Note:** The base URL for the disaster recovery APIs is `https://drapp.{yourOktaDomain}/`. Replace `{yourOktaDomain}` with your Okta domain. For example, if your Okta domain is `https://example.okta.com`, use `https://drapp.example.okta.com`.

#### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer {yourAccessToken}" \
"https://drapp.{yourOktaDomain}/api/v1/dr/status"
```

#### Response example

```json
{
    "status": [
        {
            "domain": "yourOktaDomain.okta.com",
            "isFailedOver": false
        }
    ]
}
```

## Initiate an org failover

Use the following disaster recovery API, [Start the failover of your org](/docs/api/openapi/okta-management/management/tag/DisasterRecovery/#tag/DisasterRecovery/operation/startOrgFailover), to initiate your org failover. The request body is optional. You can specify a list of custom domains to failover, an empty object (`{}`), or no payload.

#### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer {yourAccessToken}" \
"https://drapp.{yourOktaDomain}/api/v1/dr/failover"
```

After a failover, all end users in that org are in [read-only mode](https://support.okta.com/help/s/article/What-is-Oktas-Readonly-Mode?language=en_US).

#### Response example

```json
{
    "results": [
        {
        "domain": "yourOktaDomain.okta.com",
        "message": "Failover was successful"
        }
    ]
}
```

## Initiate an org failback

Use the following disaster recovery API, [Start the failback of your org](/docs/api/openapi/okta-management/management/tag/DisasterRecovery/#tag/DisasterRecovery/operation/startOrgFailback), to initiate your org failback. The request body is optional. You can specify a list of domains to failback, an empty object (`{}`), or no payload.

#### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer {yourAccessToken}" \
"https://drapp.{yourOktaDomain}/api/v1/dr/failback"
```

#### Response example

```json
{
    "results": [
        {
        "domain": "yourOktaDomain.okta.com",
        "message": "Failback was successful"
        }
    ]
}
```

## Review disaster recovery auditing data

Review the Enhanced DR status in the System Log. Use the [System Log API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SystemLog/#tag/SystemLog) or review through the Admin Console to confirm details on the org failover or failback. Search on the event types `system.dr.failover` or `system.dr.failback`.

> **Note:** Your OAuth 2.0 scoped token requires the `okta.logs.read` scope to call the System Log endpoint.

#### Request example

Filter on both enhanced DR event types:

`filter=eventType eq "system.dr.failback" or eventType eq "system.dr.failover"`

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer {yourAccessToken}" \
"https://{yourOktaDomain}/api/v1/logs?filter=eventType%20eq%20%22system.dr.failback%22%20or%20eventType%20eq%20%22system.dr.failover%22"
```

#### Response example

> **Note:** The response is truncated for clarity.

```json
{ ...
    "displayMessage": "The Enhanced Disaster Recovery (EDR) failover operation for the org domains was initiated",
    "eventType": "system.dr.failover",
    "outcome": {
        "result": "SUCCESS",
        "reason": null
    },
  ...
}
```

The super administrator accounts also receive email notifications during the failover and failback process.
