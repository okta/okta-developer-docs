---
title: Manage org recovery with Okta Enhanced Disaster Recovery
---

<ApiLifecycle access="ea" />

This guide explains how to manage a failover and failback of your Okta org using Okta Enhanced Disaster Recovery (EDR).

> **Note:** EDR is a [self-service Early Access (EA)](/docs/concepts/feature-lifecycle-management/#self-service-features) feature. See [Manage Early Access and Beta features](https://help.okta.com/okta_help.htm?id=ext_secur_manage_ea_bata) to enable.

---

#### Learning outcomes

- Check the disaster recovery status for your org using the Okta API.
- Initiate an org failover using the Okta API.
- Initiate an org failback using the Okta API.
- Review the System Log data and notifications for disaster recovery.

#### What you need

- An Okta preview org
- The EDR product enabled on your org
- [Disaster recovery APIs](https://developer.okta.com/docs/api//openapi/okta-management/management/tag/DisasterRecovery/)

---

## About Okta Enhanced Disaster Recovery (EDR)

Okta Enhanced Disaster Recovery (EDR) provides you with an option for shorter org recovery times in the event of a regional infrastructure-related outage. EDR improves on the standard disaster recovery mitigations available to all Okta orgs. It ensures service continuity during total regional outages, allowing users to remain signed in. Also, it features a self-service failover, which grants admins manual control to initiate tenant migration and failback through APIs or a dedicated portal. See the following sections on how to manage EDR using the Okta APIs. For further information on EDR and using the EDR portal, see [Enhanced Disaster Recovery](https://help.okta.com/okta_help.htm?type=oie&id=enhanced-disaster-recovery).

## User roles and permissions for EDR

You can manage EDR by using the super administrator role or by creating a custom role.

To create an EDR custom role, use the Admin Console or the APIs. See [Roles in Okta](https://developer.okta.com/docs/api/openapi/okta-management/guides/roles/#roles-in-okta) or [Use custom admin roles](https://help.okta.com/okta_help.htm?type=oie&id=csh-create-cstm-admin-role). The following permissions, resource, and resource type are required when creating the EDR custom role:

- Permissions: Manage disaster recover (`okta.dr.manage`) or view disaster recovery (`okta.dr.read`)
- Resource Type: Business continuity
- Resource: Disaster recovery

## Make secure API requests with OAuth 2.0

Okta EDR only supports API access through scoped OAuth 2.0 access tokens, and uses the following scopes: `okta.dr.manage` and `okta.dr.read`.

To make secure Okta API requests to manage and configure your Okta orgs, obtain OAuth 2.0 access tokens for the Authorization header in requests. The Okta setup to obtain access tokens depends on whether you want the token to have a user-based or a service-based context:

- User-based access: The access token is tied to a specific admin user. For this access, you need to provide an Okta admin username and credentials. See [User-based API access setup](/docs/reference/rest/#user-based-api-access-setup). Grant the appropriate scopes for your endpoint and use-case. Use this access type for simple testing of the APIs.

- Service-based access: If you have a service app or script that makes API requests to Okta without user context, see [Service-based API access setup](/docs/reference/rest/#service-based-api-access-setup). Grant the appropriate scopes for your endpoint and use-case.

## Check the disaster recovery status of your org

Use the following disaster recovery API, [Retrieve the disaster recovery status for all domains for your org](/docs/api/openapi/okta-management/management/tag/DisasterRecovery/#tag/DisasterRecovery/operation/getDRStatus), to understand the current disaster recovery state for all domains associated with your Okta org.

>**Note:** The base URL for the disaster recovery APIs is `https://drapp.{yourOktaDomain}/`. Replace `{yourOktaDomain}` with your Okta subdomain.

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

Use the following disaster recovery API, [Start the failback of your org](/docs/api/openapi/okta-management/management/tag/DisasterRecovery/#tag/DisasterRecovery/operation/startOrgFailback), to initiate the failover of your org. The request body is optional. You can specify a list of domains to failback, an empty object (`{}`), or no payload.

#### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer {yourAccessToken}" \
-d "{
        "domains": [
            "{yourOktaDomain}.okta.com"
        ]
    }"
"https://drapp.{yourOktaDomain}/api/v1/dr/failover"
```

After a failover, all end users of that org are in read-only mode.

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

## Initiate an org failback

Use the following disaster recovery API, [Start the failover of your org](/docs/api/openapi/okta-management/management/tag/DisasterRecovery/#tag/DisasterRecovery/operation/startOrgFailover), to initiate the failback of your org. The request body is optional. You can specify a list of domains to failover, an empty object (`{}`), or no payload.

#### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer {yourAccessToken}" \
-d "{
        "domains": [
            "{yourOktaDomain}.okta.com"
        ]
    }"
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

Review the disaster recovery status through the System Log. Use the [System Log API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SystemLog/#tag/SystemLog) or review through the Admin Console to confirm details on the org failover or failback. Search on the event types `system.dr.failover` or `system.dr.failback`.

> **Note:** Your OAuth 2.0 scoped token requires the `okta.logs.read` scope to call the System Log endpoint.

#### Request example

Filter on both EDR event types:

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
