---
title: Manage access request tasks
meta:
  - name: description
    content: How to manage access request tasks using Okta Identity Governance APIs
layout: Guides
---

This guide describes how to manage access request in-flight tasks using the Okta Identity Governance (OIG) APIs.

---

#### Learning outcomes

* Learn how to use Okta Identity Governance (OIG) admin [Tasks](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/tasks) and end user [My Tasks](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/my-tasks) APIs to manage access request tasks in your custom app or workflow.

#### What you need

* An Okta org that's subscribed to OIG
* Okta Workflows or Postman to follow this guide and test the OIG APIs

---

## Overview

The Okta Identity Governance (OIG) Tasks and My Tasks APIs enable you to programmatically manage in-flight access request tasks. When users submit access requests, OIG generates tasks (such as approval steps or information requests) that require action before a request can reach resolution. By leveraging the Tasks API, you can automate task routing, resolve process bottlenecks, and embed access request workflows directly into your enterprise apps.

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

If your workflow uses an OIDC client for user-based access, you don't need to assign an admin role to the OIDC client. For user-based access, Okta reviews the admin or end user role that's assigned to the authenticated user and determines whether they have permission to perform the operation.

## Admin tasks

With admin permissions, use these API requests to manage in-flight access requests in your org.

### List all tasks in your org

Use the [List all tasks](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/tasks/listalltasksv2) request to retrieve a list of access request tasks from your org that matches a specific condition. For example, you can retrieve a list of outstanding (`OPEN`) tasks that were created over two weeks ago.

| **API** | Access Requests - V2 > Tasks |
| ------- | ----------------------- |
| **Request** | [List all tasks](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/tasks/listalltasksv2) |
| **Request URI** | `GET /governance/api/v2/tasks` |
| **Scopes required** | `okta.accessRequests.tasks.read` |
| **Admin role required** | Super admin (`SUPER_ADMIN`) or access requests admin (`ACCESS_REQUESTS_ADMIN`) |

##### Request example

```bash
curl -v -X GET \
  'https://{yourOktaDomain}/governance/api/v2/tasks?filter=status%20eq%20%22OPEN%22' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {yourOktaAccessToken}'
```

##### Response example

This response example shows xxxxx

```json
{
  "data": [
    {
      "id": "68b0a1576dd8db837f5ee55d",
      "requestId": "req42kjDgk1EubTwo0g4",
      "status": "OPEN",
      "type": "APPROVAL",
      "title": "Manager Approval",
      "assignee": {
        "externalId": "00u1234567890abcdef"
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

### Retrieve a task

Use the [Retrieve a task](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/tasks/gettaskv2) request to view details for a specific access request task by its unique ID.

| **API** | Access Requests - V2 |
| ------- | ----------------------- |
| **Request** | [Retrieve a task](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/tasks/gettaskv2)|
| **Request URI** | `GET /governance/api/v2/tasks/{taskId}` |
| **Scopes required** | `okta.accessRequests.tasks.read` |
| **Admin role required** | Super admin (`SUPER_ADMIN`) or access requests admin (`ACCESS_REQUESTS_ADMIN`)|

##### Request example

This xxx

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
  "requestId": "req_88a0b1234cd",
  "status": "OPEN",
  "type": "APPROVAL",
  "title": "Manager Approval",
  "description": "Approve access to Salesforce for John Doe",
  "assignee": {
    "id": "00u1234567890abcdef",
    "email": "manager@example.com"
  },
  "createdAt": "2026-07-01T10:00:00.000Z",
  "updatedAt": "2026-07-01T10:00:00.000Z"
}
```

### Update a task

Use the [Update a task](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/tasks/updatetaskv2) request to reassign an in-flight task to another user or update task properties.

| **API** | Access Requests - V2 |
| ------- | ----------------------- |
| **Request** | [Update a task]() |
| **Request URI** | `PATCH /governance/api/v2/tasks/{taskId}` |
| **Scopes required** | `okta.accessRequests.tasks.manage` |
| **Admin role required** | Super admin (`SUPER_ADMIN`) or access requests admin (`ACCESS_REQUESTS_ADMIN`) |

##### Request example

This request example cccc

```bash
curl -v -X PATCH \
  'https://{yourOktaDomain}/governance/api/v2/tasks/68b0a1576dd8db837f5ee55d' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {yourOktaAccessToken}' \
  -d '{
    "assignee": {
      "id": "00u9876543210fedcba"
    }
  }'
```

##### Response example

```json
{
  "id": "68b0a1576dd8db837f5ee55d",
  "requestId": "req_88a0b1234cd",
  "status": "OPEN",
  "type": "APPROVAL",
  "title": "Manager Approval",
  "assignee": {
    "id": "00u9876543210fedcba",
    "email": "new_approver@example.com"
  },
  "createdAt": "2026-07-01T10:00:00.000Z",
  "updatedAt": "2026-07-02T14:30:00.000Z"
}
```

### Resolve a task

Use the [Resolve a task](https://www.google.com/search?q=https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/tasks/resolvetaskv2) request to complete an in-flight task by rendering a decision (such as approving or denying an approval task).

| **API** | Access Requests - V2 |
| ------- | --------- |
| **Request** | Resolve a task |
| **Endpoint** | `POST /governance/api/v2/tasks/{taskId}/resolve` |
| **Scopes required** | `okta.accessRequests.tasks.manage` |
| **Admin role required** | Super admin (`SUPER_ADMIN`) or access requests admin (`ACCESS_REQUESTS_ADMIN`) |

##### Request examples

This example bbbb

```bash
curl -v -X POST \
  'https://{yourOktaDomain}/governance/api/v2/tasks/68b0a1576dd8db837f5ee55d/resolve' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {yourOktaAccessToken}' \
  -d '{
    "action": "APPROVED",
    "comment": "Approved following prerequisite check."
  }'
```

The following example returns xxxx

```bash
{
  "id": "68b0a1576dd8db837f5ee55d",
  "requestId": "req_88a0b1234cd",
  "status": "RESOLVED",
  "resolution": "APPROVED",
  "comment": "Approved following prerequisite check.",
  "resolvedBy": {
    "id": "00u9876543210fedcba"
  },
  "resolvedAt": "2026-07-02T14:35:00.000Z"
}
```

## End user tasks

The following API requests allow users to retrieve and resolve tasks assigned to them.

### List all my tasks

Use the List all my tasks request to retrieve a list of tasks assigned to you from access requests managed by Okta Identity Governance (OIG) access request conditions.

| **API** | My Tasks |
| ------- | ----------- |
| **Request** | [List all my tasks](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/my-tasks/listallmytasksv2) |
| **Request URI** | `GET /governance/api/v2/my/tasks` |
| **Scopes required** | `okta.accessRequests.tasks.read` |
| **Admin roles required** | None (standard Okta user) |

##### Request example

```bash
curl -v -X GET \
  'https://{yourOktaDomain}/governance/api/v2/my/tasks?filter=status%20eq%20%22OPEN%22&limit=20' \
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
      "createdAt": "2019-08-24T14:15:22Z",
      "updatedAt": "2019-08-24T14:15:22Z",
      "isEscalated": false,
      "isDelegated": false
    }
  ],
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/governance/api/v2/my/tasks?limit=20"
    }
  }
}
```

### Retrieve my task

Use the Retrieve my task request to view details for a specific task assigned to you by its unique ID.

| **API** | My Tasks |
| ------- | ----------- |
| **Request** | [Retrieve my task]() |
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
  "status": "OPEN",
  "label": "This is an approval task",
  "requestId": "req42kjDgk1EubTwo0g4",
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z",
  "type": "APPROVAL",
  "isEscalated": false,
  "isDelegated": false
}
```

### Resolve my task

Use the [Resolve my task](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/my-tasks/resolvemytaskv2) request to fulfill or complete a task assigned to you, such as approving or denying an access request.

| **API** | My Tasks |
| ------- | ----------- |
| **Request** | [Resolve my task](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/my-tasks/resolvemytaskv2) |
| **Request URI** | `POST /governance/api/v2/my/tasks/{taskId}/resolve` |
| **Required Scopes** | `okta.accessRequests.tasks.managee` |
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
    }
  ],
  "status": "COMPLETED",
  "label": "This is an approval task",
  "requestId": "req42kjDgk1EubTwo0g4",
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z",
  "type": "APPROVAL",
  "value": "APPROVED",
  "completedBy": {
    "externalId": "00u1a2b3c4d5e6f7g8h9",
    "type": "OKTA_USER"
  }
}
```

##  behavior

