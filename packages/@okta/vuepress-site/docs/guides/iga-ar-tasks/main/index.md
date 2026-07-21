---
title: Manage governance access request tasks
meta:
  - name: description
    content: How to manage access request tasks using Okta Identity Governance APIs
layout: Guides
---

This guide describes how to manage access request in-flight tasks using the Okta Identity Governance (OIG) APIs.

---

#### Learning outcomes

* Learn how to create custom workflows involving in-flight access request tasks with Okta Identity Governance (OIG) admin [Tasks](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/tasks) and end user [My Tasks](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/my-tasks) APIs.

#### What you need

* An Okta org that's subscribed to OIG
* Okta Workflows or Postman to follow this guide and test the OIG APIs

---

## Overview

The Okta Identity Governance (OIG) Tasks API enables you to programmatically manage in-flight access request tasks. When users submit access requests, OIG generates tasks (such as approval steps or information requests) that require action before a request can reach resolution. By leveraging the Tasks API, you can automate task routing, resolve process bottlenecks, and embed access request workflows directly into your enterprise apps.

With the OIG Tasks APIs, you can:

* Automate task decisions: Connect tasks to automation tools like Okta Workflows to run prerequisite checks (such as verifying training completion) and automatically approve or deny tasks.
* Resolve stuck or unassigned tasks: Detect unassigned or stalled tasks and programmatically reassign them to team managers, resource owners, or backup administrators.
* Deliver custom notifications: Build tailored reminder workflows in collaboration tools (like Slack or Google Chat) or send custom-branded email alerts to approvers.
* Build custom user interfaces: Embed task approvals into custom employee portals, IT Service Management (ITSM) tools like ServiceNow, or command-line interfaces (CLIs).
* Monitor in-flight requests: Query active tasks, assignees, and timestamps to build real-time reporting dashboards for system health and SLA tracking.

## Make secure API requests with OAuth 2.0

<CreateOAuth2Token/><br>

For either user-based or service-based API access, grant the following scopes during the OAuth 2.0 client setup:

* `okta.accessRequests.tasks.manage`
* `okta.accessRequests.tasks.read`

In addition, you have to grant an admin role to the service-based OAuth 2.0 client. Without user context, the service app acts as a principal and requires the `SUPER_ADMIN` or the `ACCESS_REQUESTS_ADMIN` role for accesss request admin operations.

If your workflow uses an OIDC client for user-based access, you don't need to assign an admin role to the OIDC client. For user-based access, Okta reviews the admin role that's assigned to the authenticated user and determines whether they have permission to perform the operation.

## Admin tasks

With admin permissions, use these API requests to manage in-flight access requests in your org.

### List all tasks in your org

Use the [List all tasks] request to retrieve a list of tasks from access requests in your Okta Identity Governance (OIG) org.

| **API** | Access Requests - V2 > Tasks |
| ------- | ----------------------- |
| **Request** | [List all tasks](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/tasks/listalltasksv2) |
| **Request URI** | `GET /governance/api/v2/tasks` |
| **Scopes required** | `okta.governance.accessRequests.read` |
| **Admin role required** | Super admin (`SUPER_ADMIN`) or Access requests admin (`ACCESS_REQUESTS_ADMIN`) |

##### Request example

```bash
curl -v -X GET \
  'https://{yourOktaDomain}/governance/api/v2/tasks?limit=20' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {yourOktaAccessToken}'
```

##### Response example

This response example shows that users in the org can assign their own delegates, but the delegates are restricted to only their direct manager or immediate team members.

```json
{
  "data": [
    {
      "id": "68b0a1576dd8db837f5ee55d",
      "requestId": "req_88a0b1234cd",
      "status": "OPEN",
      "type": "APPROVAL",
      "title": "Manager Approval",
      "assignee": {
        "id": "00u1234567890abcdef"
      },
      "createdAt": "2026-07-01T10:00:00.000Z",
      "updatedAt": "2026-07-01T10:00:00.000Z"
    }
  ],
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/governance/api/v2/tasks?limit=20"
    }
  }
}
}
```

### Configure org delegate settings

Use the [Update the org settings](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/org-governance-settings/updateorgsettings) request to enable org users to assign their own delegates and to restrict delegate appointments.

| **API** | Org Governance settings |
| ------- | ----------------------- |
| **Request** | [Update the org settings](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/org-governance-settings/updateorgsettings) |
| **Request URI** | `PATCH /governance/api/v1/settings` |
| **Scopes required** | `okta.governance.settings.manage` |
| **Admin role required** | Super admin (`SUPER_ADMIN`) |

##### Request example

This request example configures the org settings to allow governance end users to set their own managers as delegates.

```bash
curl -i -X PATCH \
  'https://{youroktadomain}/governance/api/v1/settings' \
  -H 'Authorization: Bearer <YOUR_TOKEN_HERE>' \
  -H 'Content-Type: application/json' \
  -d '{
    "delegates": {
      "enduser": {
        "permissions": [
          "WRITE"
        ],
        "onlyFor": [
          {
            "type": "MANAGER"
          }
        ]
      }
    }
  }'
```

### Set delegates for a specific user

Use the [Update the principal settings](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/principal-settings/updateprincipalsettings) request to assign a delegate for a specific user.

| **API** | Principal settings |
| ------- | ----------------------- |
| **Request** | [Update the principal settings](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/principal-settings/updateprincipalsettings) |
| **Request URI** | `PATCH /governance/api/v1/principal-settings/{targetPrincipalId}` |
| **Scopes required** | `okta.governance.principalSettings.manage` |
| **Admin roles required** | Both the access certification admin (`ACCESS_CERTIFICATIONS_ADMIN`) and the request certification admin (`ACCESS_CERTIFICATION_ADMIN`), or the super admin (`SUPER_ADMIN`) |

##### Request example

This request example sets `{targetPrincipalId}`'s delegate to another Okta user with the `00u2lxfQaw8WRlkQt0g4` ID.

```bash

```

### View all delegate appointments

Use the [List all delegate appointments](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/delegates/listdelegateappointments) request to retrieve a list of all delegate appointments within the org, or find delegate appointments for a specific user.

| **API** | Delegates |
| ------- | --------- |
| **Request** | [List all delegate appointments](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/delegates/listdelegateappointments) |
| **Endpoint** | `GET /governance/api/v1/delegates` |
| **Required Scopes** | `okta.governance.delegates.read` |
| **Admin roles required** | Both the access certification admin (`ACCESS_CERTIFICATIONS_ADMIN`) and the request certification admin (`ACCESS_CERTIFICATION_ADMIN`), or the super admin (`SUPER_ADMIN`) |

##### Request examples

This example lists all the delegate appointments for users in an org with a limit of 20 delegates on each response page. If there are more than 20 delegate appointments in the org, you can retrieve the next response page through the `_links.next.href` URI.

```bash

```

The following example returns the delegate appointment for a specific Okta user ID (`00ub0oNGTSWTBKOLGLNR`).

```bash

```

### Access certification reviews

Admins can view delegate details in a review. See the responses for [List all reviews](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/reviews/listreviews) and [Retrieve a review](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/reviews/getreview).

| **API** | Reviews |
| ------- | ----------- |
| **Request** | [List all reviews](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/reviews/listreviews) |
| **Request URI** | `GET /governance/api/v1/reviews` |
| **Required scopes** | `okta.governance.accessCertifications.read` |
| **Required admin roles** | `ACCESS_CERTIFICATIONS_ADMIN`, `SUPER_ADMIN` |

| **API** | Reviews |
| ------- | ----------- |
| **Request** | [Retrieve a review](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/reviews/getreview) |
| **Request URI** | `GET /governance/api/v1/reviews/{reviewId}` |
| **Required scopes** | `okta.governance.accessCertifications.read` |
| **Required admin roles** | `ACCESS_CERTIFICATIONS_ADMIN`, `SUPER_ADMIN` |

If a delegated reviewer is assigned to an access certification review, the following properties are populated in the response:

* [`delegated`](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/reviews/getreview#reviews/getreview/t=response&c=200&path=delegated): Indicates that the review has been delegated to another user from the original reviewer
* [`delegatorProfile`](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/reviews/getreview#reviews/getreview/t=response&c=200&path=delegatorprofile): Indicates the profile of the original reviewer who delegated the review to another user

##### Response example

This example shows an access review for Jessie Smith. The original reviewer was Alana Johnson, but she wasn't available, so she delegated the review to her manager, Bob Manager.

```json

```

## End user tasks

The following API requests allow users to manage their own governance delegate settings.

### View my appointed delegates

See the delegates currently assigned to act on your behalf with the [Retrieve my settings](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/my-settings/getmysettings) request. This request retrieves the governance settings for the current authenticated user, which includes delegate appointments.

| **API** | My settings |
| ------- | ----------- |
| **Request** | [Retrieve my settings](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/my-settings/getmysettings) |
| **Request URI** | `GET /governance/api/v1/my/settings` |
| **Scopes required** | `okta.governance.principalSettings.read` |
| **Admin roles required** | None (standard Okta user) |

##### Request example

```bash
curl -v -X GET \
  'https://${yourOktaDomain}/governance/api/v1/my/settings' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {yourOktaAccessToken}' \
```

##### Response example

```json

```

### View my eligible delegates

Retrieve a list of users eligible to serve as your delegate with the [List my eligible delegates](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/my-settings/listmydelegateusers) request.

| **API** | My settings |
| ------- | ----------- |
| **Request** | [List my eligible delegates](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/my-settings/listmydelegateusers) |
| **Request URI** | `GET /governance/api/v1/my/settings/delegate/users` |
| **Scopes required** | `okta.governance.principalSettings.read` |
| **Admin roles required** | None (standard Okta user) |

##### Request example

```bash
curl -v -X GET \
  'https://${yourOktaDomain}/governance/api/v1/my/settings' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {yourOktaAccessToken}' \
```

##### Response example

```json

```

### Appoint delegates for myself

Assign a delegate for your access certification or access request tasks with the [Update my settings](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/my-settings/updatemysettings) request.

| **API** | My settings |
| ------- | ----------- |
| **Request** | [Update my settings](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/my-settings/updatemysettings) |
| **Request URI** | `PATCH /governance/api/v1/my/settings` |
| **Required Scopes** | `okta.governance.principalSettings.manage` |
| **Required Admin Roles** | None (standard Okta user) |

##### Request example

```bash

```

##  behavior

