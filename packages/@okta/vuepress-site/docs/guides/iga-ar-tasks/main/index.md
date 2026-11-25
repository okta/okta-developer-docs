---
title: Manage and customize open-access requests
meta:
  - name: description
    content: How to manage or customize open-access request tasks using Okta Identity Governance APIs
layout: Guides
---

This guide describes how to manage or customize open-access request tasks using the Okta Identity Governance (OIG) APIs.

---

#### Learning outcomes

Learn how to use OIG admin [Tasks](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/tasks), [Update a request](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/requests/updaterequestv2), end user [My Tasks](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/my-tasks), and [Update my request](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/my-requests/updatemyrequestv2) APIs to manage access request tasks in your custom app or workflow.

#### What you need

* An Okta org that's subscribed to OIG
* Okta Workflows, your custom app, or an API client (such as Postman) to follow this guide and test the OIG APIs

---

## Overview

The Okta Identity Governance (OIG) [Tasks](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/tasks) and [My Tasks](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/my-tasks) APIs enable you to programmatically manage in-flight access request tasks. When users submit access requests, OIG generates tasks (such as approval steps or information requests) that require action before a request can reach resolution. You can also cancel access requests with the [Requests](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/requests) and [My Requests](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/my-requests) APIs. By using the Tasks and Requests APIs, you can automate task routing, resolve process bottlenecks, and embed access request workflows directly into your enterprise apps.

You can perform the following operations with these APIs:

* Automate task decisions: Connect tasks to automation tools like Okta Workflows to run prerequisite checks (such as verifying training completion) and automatically approve or deny tasks.
* Resolve stuck or unassigned tasks: Detect unassigned or stalled tasks and programmatically reassign them to team managers, resource owners, or backup administrators.
* Deliver custom notifications: Build tailored reminder workflows in collaboration tools (like Slack or Google Chat) or send custom-branded email alerts to approvers.
* Build custom user interfaces: Embed task approvals into custom employee portals, IT Service Management (ITSM) tools like ServiceNow, or command-line interfaces (CLIs).
* Monitor in-flight requests: Query active tasks, assignees, and timestamps to build real-time reporting dashboards for system health and SLA tracking.
* Cancel requests: Programmatically allow admins and end users to cancel unnecessary requests.

See [Access Requests](https://help.okta.com/okta_help.htm?type=oie&id=ext-ar) in the product documentation for access request concepts and Admin Console task procedures.

## Make secure API requests with OAuth 2.0

<CreateOAuth2Token/><br>

For either user-based or service-based API access, grant the following scopes during the OAuth 2.0 client setup:

* `okta.accessRequests.tasks.manage`
* `okta.accessRequests.tasks.read`
* `okta.accessRequests.request.manage` (To cancel requests)

In addition, you have to grant an admin role to the service-based OAuth 2.0 client. Without user context, the service app acts as a principal and requires the `SUPER_ADMIN` or the `ACCESS_REQUESTS_ADMIN` role for access request admin operations.

> **Note:** If you're using Okta Workflows, the **Okta Workflows OAuth** app in your org is used for API authentication. Grant the `okta.accessRequests.tasks.manage` and `okta.accessRequests.request.manage` scopes to this app. See [Authorization > Create a connection from the current Okta org](https://help.okta.com/okta_help.htm?type=wf&id=ext-okta-misc-authorization).

If your workflow uses an OIDC client for user-based access, you don't need to assign an admin role to the OIDC client. For user-based access, Okta reviews the role that's assigned to the authenticated user and determines whether they have permission to perform the operation.

## Admin tasks

With the Access Requests admin role, use these API requests to manage in-flight tasks in your org.

### Task type

The following table describes each [task type](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/tasks/gettaskv2#tasks/gettaskv2/t=response&c=200&path=type) for resources in the Tasks APIs:

| Task type | Description |
| ---- | ----------- |
| `QUESTION` | A task that asks a user to provide an answer or additional information. |
| `APPROVAL` | A task that asks a user to approve or deny a request. |
| `TODO` | A task that asks a user to complete a required action. |

### Task status

The following table describes each [task status](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/tasks/gettaskv2#tasks/gettaskv2/t=response&c=200&path=status) for resources in the Tasks APIs:

| Status | Description |
| ------ | ----------- |
| `OPEN` | The task is open and awaiting action. |
| `COMPLETED` | The task is completed. |
| `ASSIGNING` | The task is in the process of being assigned. |
| `LOCKED` | The task is locked. |

### List tasks in your org

Use the [List all tasks](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/tasks/listalltasksv2) request to retrieve a list of access request tasks from your org that matches a specific condition. For example, you can retrieve a list of outstanding (`OPEN`) tasks for a specific access request.

| **API** | Access Requests - V2 > Tasks |
| ------- | ----------------------- |
| **Request** | [List all tasks](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/tasks/listalltasksv2) |
| **Request URI** | `GET /governance/api/v2/tasks` |
| **Scopes required** | `okta.accessRequests.tasks.read` |
| **Admin role required** | Super admin (`SUPER_ADMIN`) or access requests admin (`ACCESS_REQUESTS_ADMIN`) |

##### Request example

This example searches for a list of outstanding (`OPEN`) tasks for access request with `req42kjDgk1EubTwo0g4` ID.

```bash
curl -v -X GET \
  'https://{yourOktaDomain}/governance/api/v2/tasks?filter=requestId%20eq%20%22req42kjDgk1EubTwo0g4%22%20and%20status%20eq%20%22OPEN%22' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {yourOktaAccessToken}'
```

##### Response example

This response example shows the list of outstanding approval tasks for the specific request. If the list returned is more than the pagination `limit` (default `limit` is 20 records), then the `_links.next` is returned with the URL to the next page of results.

```json
{
  "data": [
    {
      "id": "68b0a1576dd8db837f5ee55d",
      "requestId": "req42kjDgk1EubTwo0g4",
      "status": "OPEN",
      "type": "APPROVAL",
      "assignees": {
        "externalId": "00u1234567890abcdef",
        "type": "OKTA_USER"
      },
      "createdAt": "2026-03-24T14:15:22Z",
      "updatedAt": "2026-03-24T14:15:22Z"
    }
  ],
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/governance/api/v2/tasks?limit=20"
    }
  }
}
```

### Retrieve a task

Use the [Retrieve a task](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/tasks/gettaskv2) request to view details for a specific task by its unique ID.

| **API** | Access Requests - V2 |
| ------- | ----------------------- |
| **Request** | [Retrieve a task](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/tasks/gettaskv2)|
| **Request URI** | `GET /governance/api/v2/tasks/{taskId}` |
| **Scopes required** | `okta.accessRequests.tasks.read` |
| **Admin role required** | Super admin (`SUPER_ADMIN`) or access requests admin (`ACCESS_REQUESTS_ADMIN`)|

##### Request example

```bash
curl -v -X GET \
  'https://{yourOktaDomain}/governance/api/v2/tasks/68b0a1576dd8db837f5ee55d' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {yourOktaAccessToken}'
```

##### Response example

```json
{
  "id": "68b0a1576dd8db837f5ee55d",
  "requestId": "req42kjDgk1EubTwo0g4",
  "status": "COMPLETED",
  "label": "This is a custom task",
  "type": "TODO",
  "assignees": {
    "id": "00u1234567890abcdef",
    "type": "OKTA_USER"
  },
  "isEscalated": false,
  "isDelegated": false,
  "completedBy": {
    "externalId": "00u1234567890abcdef",
    "type": "OKTA_USER"
  },
  "createdAt": "2026-06-24T14:15:22Z",
  "updatedAt": "2026-06-26T14:30:10Z"
}
```

### Reassign a task

Use the [Update a task](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/tasks/updatetaskv2) request to reassign an access request task to another set of users or to a single user.

> **Note:** If you need to escalate a stale task to a group of approvers, you can reassign a task from a single assignee to a group of assignees for any task type. You can assign a maximum of 50 assignees for each task.

| **API** | Access Requests - V2 |
| ------- | ----------------------- |
| **Request** | [Update a task](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/tasks/updatetaskv2) |
| **Request URI** | `PATCH /governance/api/v2/tasks/{taskId}` |
| **Scopes required** | `okta.accessRequests.tasks.manage` |
| **Admin role required** | Super admin (`SUPER_ADMIN`) or Access Requests admin (`ACCESS_REQUESTS_ADMIN`) |

##### Request example

This request example reassigns the task to two other assignees.

```bash
curl -v -X PATCH \
  'https://{yourOktaDomain}/governance/api/v2/tasks/68b0a1576dd8db837f5ee55d' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {yourOktaAccessToken}' \
  -d '{
      "assignees": [
      {
        "externalId": "00u1a2b3c4d5e6f7g8h9",
        "type": "OKTA_USER"
      },
      {
        "externalId": "00u1a2b3c4d5e6f7g8h8",
        "type": "OKTA_USER"
      }
    ]
  }'
```

##### Response example

```json
{
  "id": "68b0a1576dd8db837f5ee55d",
  "requestId": "req42kjDgk1EubTwo0g4",
  "status": "OPEN",
  "type": "APPROVAL",
  "label": "This is an approval task",
  "assignees": [
    {
      "externalId": "00u1a2b3c4d5e6f7g8h9",
      "type": "OKTA_USER"
    },
    {
      "externalId": "00u1a2b3c4d5e6f7g8h8",
      "type": "OKTA_USER"
    }
  ],
  "createdAt": "2026-05-10T12:15:00Z",
  "updatedAt": "2026-05-25T14:25:12Z"
}
```

### Resolve a task

Use the [Resolve a task](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/tasks/resolvetaskv2) request to complete an in-flight task by setting a decision (such as approving or denying an approval task).

| **API** | Access Requests - V2 |
| ------- | --------- |
| **Request** | [Resolve a task](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/tasks/resolvetaskv2) |
| **Endpoint** | `POST /governance/api/v2/tasks/{taskId}/resolve` |
| **Scopes required** | `okta.accessRequests.tasks.manage` |
| **Admin role required** | Super admin (`SUPER_ADMIN`) or Access Requests admin (`ACCESS_REQUESTS_ADMIN`) |

##### Request example

This example resolves an `APPROVAL` task by setting its value to `APPROVED`.

```bash
curl -v -X POST \
  'https://{yourOktaDomain}/governance/api/v2/tasks/68b0ed9802df442e8b601807/resolve' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {yourOktaAccessToken}' \
  -d '{
    "value": "APPROVED"
  }'
```

##### Response example

```json
{
  "id": "68b0ed9802df442e8b601807",
  "requestId": "req42kjDgk1EubTwo0g4",
  "status": "COMPLETED",
  "type": "APPROVAL",
  "value": "APPROVED",
  "completedBy": {
    "externalId": "00u1a2b3c4d5e6f7g8h9",
    "type": "OKTA_USER"
  },
  "createdAt": "2026-03-24T14:15:22Z",
  "updatedAt": "2026-03-25T10:25:30Z"
}
```

### Cancel a request

Use the [Update a request](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/requests/updaterequestv2) API to cancel a request that's no longer needed. Set the request `status` to `CANCELED`. After you cancel a request, you can take no further actions on it.

If you need to find the request ID to cancel, use [List all requests](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/requests/listallrequestsv2) to search for your desired request with the `filter` query parameter.

> **Note:** You can't cancel your own request if all of its tasks are resolved (`COMPLETED`). As an Access Request admin, you can cancel all other requests.

| **API** | Access Requests - V2 |
| ------- | --------- |
| **Request** | [Update a request](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/requests/updaterequestv2) |
| **Request URI** | `PATCH /governance/api/v2/requests/{requestId}` |
| **Scopes required** | `okta.accessRequests.request.manage` |
| **Admin role required** | Access requests admin (`ACCESS_REQUESTS_ADMIN`) |

> **Note:** If your org uses request types, use the [Update a request](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v1-reference/requests/updaterequest) V1 request instead: `PATCH /governance/api/v1/requests/{requestId}`. It requires the `okta.governance.accessRequests.manage` scope and the `ACCESS_REQUESTS_ADMIN` role.

##### Request example

This example cancels the access request with `req42kjDgk1EubTwo0g4` ID.

```bash
curl -v -X PATCH \
  'https://{yourOktaDomain}/governance/api/v2/requests/req42kjDgk1EubTwo0g4' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {yourOktaAccessToken}' \
  -d '{
    "status": "CANCELED"
  }'
```

##### Response example

```json
{
  "id": "req42kjDgk1EubTwo0g4",
  "created": "2026-03-24T14:15:22Z",
  "createdBy": "00ub0oNGTSWTBKOLGLNR",
  "lastUpdated": "2026-03-25T10:25:30Z",
  "lastUpdatedBy": "00ub0oNGTSWTBKOLGLNR",
  "status": "CANCELED",
  "requestedBy": {
    "type": "OKTA_USER",
    "externalId": "00ub0oNGTSWTBKOLGLNR"
  },
  "requestedFor": {
    "type": "OKTA_USER",
    "externalId": "00ub0oNGTSWTBKOLGLNR"
  },
  "requested": {
    "entryId": "cenb0oADRXTBKOLGLNR",
    "resourceId": "0oafxqCAJWWGELFTYASJ",
    "resourceType": "APPLICATION",
    "accessScopeId": "0oafxqCAJWWGELFTYASJ",
    "accessScopeType": "APPLICATION"
  },
  "requesterFieldValues": [
    {
      "id": "05c87fe9-11f6-4d40-a033-b155b39dcdbe",
      "label": "What is the business justification for the request?",
      "type": "TEXT",
      "value": "I need access to complete a task."
    }
  ],
  "_links": {
    "catalogEntry": {
      "href": "https://{yourOktaDomain}/governance/api/v1/catalogs/default/entries/cenb0oADRXTBKOLGLNR",
      "type": "application/json"
    },
    "self": {
      "href": "https://{yourOktaDomain}/governance/api/v1/requests/req42kjDgk1EubTwo0g4",
      "type": "application/json"
    }
  }
}
```

## End user tasks

The following API requests allow end users to retrieve and resolve tasks assigned to them, and to cancel their own requests.

### List all my tasks

Use the [List all my tasks](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/my-tasks/listallmytasksv2) request to retrieve a list of tasks assigned to you from requests managed by OIG access request conditions.

| **API** | My Tasks |
| ------- | ----------- |
| **Request** | [List all my tasks](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/my-tasks/listallmytasksv2) |
| **Request URI** | `GET /governance/api/v2/my/tasks` |
| **Scopes required** | `okta.accessRequests.tasks.read` |
| **Admin roles required** | None (standard Okta user) |

##### Request example

This example lists all open tasks assigned to the authenticated user.

```bash
curl -v -X GET \
  'https://{yourOktaDomain}/governance/api/v2/my/tasks?filter=status%20eq%20%22OPEN%22' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {yourOktaAccessToken}'
```

##### Response example

```json
{
  "data": [
    {
      "id": "68b0ed9802df442e8b601807",
      "requestId": "req42kjDgk1EubTwo0g4",
      "status": "OPEN",
      "type": "APPROVAL",
      "label": "This is an approval task",
      "assignees": [
        {
          "externalId": "00u1a2b3c4d5e6f7g8h9",
          "type": "OKTA_USER"
        }
      ],
      "createdAt": "2026-07-24T14:15:22Z",
      "updatedAt": "2026-07-24T14:15:22Z",
    }
  ],
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/governance/api/v2/my/tasks?filter=status%20eq%20%22OPEN%22"
    }
  }
}
```

### Retrieve my task

Use the [Retrieve my task](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/my-tasks/getmytaskv2) request to view details for a specific task assigned to you, by its unique ID.

| **API** | My Tasks |
| ------- | ----------- |
| **Request** | [Retrieve my task](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/my-tasks/getmytaskv2) |
| **Request URI** | `GET /governance/api/v2/my/tasks/{taskId}` |
| **Scopes required** | `okta.accessRequests.tasks.read` |
| **Admin roles required** | None (standard Okta user) |

##### Request example

```bash
curl -v -X GET \
  'https://{yourOktaDomain}/governance/api/v2/my/tasks/68b0ed9802df442e8b601807' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {yourOktaAccessToken}'
```

##### Response example

```json
{
  "id": "68b0ed9802df442e8b601807",
  "assignees": [
    {
      "externalId": "00u1a2b3c4d5e6f7g8h9",
      "type": "OKTA_USER"
    }
  ],
  "status": "COMPLETED",
  "label": "Why is access required?",
  "requestId": "req42kjDgk1EubTwo0g4",
  "createdAt": "2026-04-24T14:15:22Z",
  "updatedAt": "2019-04-25T15:25:00Z",
  "type": "QUESTION",
  "value": "For fulfilling some responsibilities",
  "isEscalated": true,
  "isDelegated": false,
  "originalAssigneeId": "00u9a8b7c6d5e4f3g2h1",
  "completedBy": {
    "externalId": "00u1a2b3c4d5e6f7g8h9",
    "type": "OKTA_USER"
  }
}
```

### Resolve my task

Use the [Resolve my task](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/my-tasks/resolvemytaskv2) request to complete a task assigned to you, such as approving or denying an access request.

| **API** | My Tasks |
| ------- | ----------- |
| **Request** | [Resolve my task](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/my-tasks/resolvemytaskv2) |
| **Request URI** | `POST /governance/api/v2/my/tasks/{taskId}/resolve` |
| **Required Scopes** | `okta.accessRequests.tasks.manage` |
| **Required Admin Roles** | None (standard Okta user) |

##### Request example

```bash
curl -v -X POST \
  'https://{yourOktaDomain}/governance/api/v2/my/tasks/68b0ed9802df442e8b601807/resolve' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {yourOktaAccessToken}' \
  -d '{
    "value": "APPROVED"
  }'
```

##### Response example

```json
{
  "id": "68b0ed9802df442e8b601807",
  "assignees": [
    {
      "externalId": "00u1a2b3c4d5e6f7g8h9",
      "type": "OKTA_USER"
    },
    {
      "externalId": "00u1a2b3c4d5e6f7g8h8",
      "type": "OKTA_USER"
    }
  ],
  "status": "COMPLETED",
  "label": "This is an approval task",
  "requestId": "req42kjDgk1EubTwo0g4",
  "createdAt": "2026-05-24T10:15:22Z",
  "updatedAt": "2026-05-27T15:30:13Z",
  "type": "APPROVAL",
  "value": "APPROVED",
  "completedBy": {
    "externalId": "00u1a2b3c4d5e6f7g8h9",
    "type": "OKTA_USER"
  }
}
```

### Cancel my request

Use the [Update my request](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/my-requests/updatemyrequestv2) API to cancel an access request that you submitted and no longer need. Set the request `status` to `CANCELED`. After a request is canceled, no further actions can be taken on it.

> **Note:** You can't cancel a request if any of its tasks are already resolved.

| **API** | My Requests |
| ------- | ----------- |
| **Request** | [Update my request](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/my-requests/updatemyrequestv2) |
| **Request URI** | `PATCH /governance/api/v2/my/catalogs/default/entries/{entryId}/requests/{requestId}` |
| **Scopes required** | `okta.accessRequests.request.manage` |
| **Admin roles required** | None (standard Okta user) |

##### Request example

This example cancels the access request with `req42kjDgk1EubTwo0g4` ID for the catalog entry with `cenb0oADRXTBKOLGLNR` ID.

```bash
curl -v -X PATCH \
  'https://{yourOktaDomain}/governance/api/v2/my/catalogs/default/entries/cenb0oADRXTBKOLGLNR/requests/req42kjDgk1EubTwo0g4' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {yourOktaAccessToken}' \
  -d '{
    "status": "CANCELED"
  }'
```

##### Response example

```json
{
  "id": "req42kjDgk1EubTwo0g4",
  "created": "2026-03-24T14:15:22Z",
  "createdBy": "00ub0oNGTSWTBKOLGLNR",
  "lastUpdated": "2026-03-25T10:25:30Z",
  "lastUpdatedBy": "00ub0oNGTSWTBKOLGLNR",
  "status": "CANCELED",
  "requestedBy": {
    "type": "OKTA_USER",
    "externalId": "00ub0oNGTSWTBKOLGLNR"
  },
  "requestedFor": {
    "type": "OKTA_USER",
    "externalId": "00ub0oNGTSWTBKOLGLNR"
  },
  "requesterFieldValues": [
    {
      "id": "05c87fe9-11f6-4d40-a033-b155b39dcdbe",
      "label": "What is the business justification for the request?",
      "type": "TEXT",
      "value": "I need access to complete a task."
    }
  ],
  "requested": {
    "entryId": "cenb0oADRXTBKOLGLNR",
    "resourceId": "0oafxqCAJWWGELFTYASJ",
    "resourceType": "APPLICATION",
    "accessScopeId": "0oafxqCAJWWGELFTYASJ",
    "accessScopeType": "APPLICATION"
  },
  "_links": {
    "catalogEntry": {
      "href": "https://{yourOktaDomain}/governance/api/v1/catalogs/default/entries/cenb0oADRXTBKOLGLNR",
      "type": "application/json"
    },
    "self": {
      "href": "https://{yourOktaDomain}/governance/api/v1/requests/req42kjDgk1EubTwo0g4",
      "type": "application/json"
    }
  }
}
```

## System Logs

The following System Logs are triggered when you manage access requests and their tasks:

* [access.request.cancel](https://developer.okta.com/docs/reference/api/event-types/?q=access.request.cancel): When an access request has been canceled
* [access.request.update](https://developer.okta.com/docs/reference/api/event-types/?q=access.request.update): When an update to an access request has been made, such as changes to the request tasks. These task changes include a status change, an assignee change, or a question is answered for the first time.
