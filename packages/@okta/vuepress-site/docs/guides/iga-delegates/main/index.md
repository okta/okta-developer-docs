---
title: Manage delegates for governance
meta:
  - name: description
    content: How to manage delegate assignments and settings using Okta Identity Governance APIs
layout: Guides
---

This guide describes how to manage governance delegate assignments and settings using the Okta Identity Governance (OIG) APIs.

---

#### Learning outcomes

* As an admin, learn how to configure your org for governance delegation with [Okta Identity Governance (OIG) APIs](https://developer.okta.com/docs/api/iga/).
* As an admin, learn how to appoint delegates for users with OIG APIs.
* As an end user, learn how to appoint your own delegates with OIG APIs.

#### What you need

* An Okta org that's subscribed to OIG
* Okta Workflows or Postman to follow this guide and test the OIG APIs

---

## Overview

Delegations allow users to appoint others to act on their behalf for tasks such as access certification reviews and access request approvals. See how [governance delegates](https://help.okta.com/okta_help.htm?type=oie&id=csh-governance-delegates) are used in the Admin Console.

This guide describes how to manage delegate assignments and settings using the [Okta Identity Governance (OIG) APIs](https://developer.okta.com/docs/api/iga/). You can use delegated flows in [Okta Workflows](https://help.okta.com/okta_help.htm?type=wf) or in your own custom app to make governance delegation API requests.

## Make secure API requests with OAuth 2.0

<CreateOAuth2Token/><br>

For either user-based or service-based API access, grant the following scopes during the OAuth 2.0 client setup:

* `okta.governance.principalSettings.manage`
* `okta.governance.delegates.read`
* `okta.governance.settings.manage`

In addition, you have to grant an admin role to the service-based OAuth 2.0 client. Without user context, the service app acts as a principal and requires the `SUPER_ADMIN` role to perform all admin delegation tasks.

If your workflow uses an OIDC client for user-based access, you don't need to assign an admin role to the OIDC client. For user-based access, Okta reviews the admin role that's assigned to the authenticated user and determines whether they have permission to perform the delegation tasks.

## Admin tasks

Use these API requests to manage delegation configuration in the org or for specific users.

### View org delegate settings

Use the [Retrieve the org settings](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/org-governance-settings/getorgsettings) request to view governance settings for your org, including delegate settings.

| **API** | Org Governance settings |
| ------- | ----------------------- |
| **Request** | [Retrieve the org settings](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/org-governance-settings/getorgsettings) |
| **Request URI** | `GET /governance/api/v1/settings` |
| **Scopes required** | `okta.governance.settings.read` |
| **Admin role required** | Super admin (`SUPER_ADMIN`) |

##### Request example

```bash
curl -v -X GET \
  'https://{yourOktaDomain}/governance/api/v1/settings' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {yourOktaAccessToken}' \
```

##### Response example

This response example shows that users in the org can assign their own delegates, but the delegates are restricted to only their direct manager or immediate team members.

```json
{
  "delegates": {
    "enduser": {
      "permissions": [
        "WRITE"
      ],
      "onlyFor": [
        {
          "type": "MANAGER"
        },
        {
          "type": "PEERS"
        }
      ]
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
curl -i -X PATCH \
  'https://{yourOktaDomain}/governance/api/v1/principal-settings/{targetPrincipalId} \
  -H 'Authorization: Bearer <YOUR_ACCESS_TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
    "delegates": {
      "appointments": [
        {
          "delegate": {
            "type": "OKTA_USER",
            "externalId": "00u2lxfQaw8WRlkQt0g4"
          },
          "note": "Assigning delegate for parental leave"
        }
      ]
    }
  }
'
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
curl -v -X GET \
  'https://${yourOktaDomain}/governance/api/v1/delegates?limit=20' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {yourOktaAccessToken}' \
```

The following example returns the delegate appointment for a specific Okta user ID (`00ub0oNGTSWTBKOLGLNR`).

```bash
curl -v -X GET \
  'https://${yourOktaDomain}/governance/api/v1/delegates?filter=delegatorId%20eq%20%2200ub0oNGTSWTBKOLGLNR%22' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer {yourOktaAccessToken}' \
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
{
  "campaignId": "icitdyhndQ6qstyvR8g5",
  "resourceId": "00gco5q3vQ20oPncs8g5",
  "decided": "2019-08-24T14:15:22Z",
  "principalProfile": {
    "id": "00u28w6vzKKultXP98g5",
    "email": "jessie.smith@example.com",
    "firstName": "Jessie",
    "lastName": "Smith",
    "status": "ACTIVE"
  },
  "reviewerProfile": {
    "id": "00u5v5viPvg84h0W68g4",
    "email": "bob@example.com",
    "firstName": "Bob",
    "lastName": "Manager",
    "status": "ACTIVE"
  },
  "delegated": "TRUE",
  "delegatorProfile": {
    "id": "00u5v5viTvo24h2Q47b5",
    "email": "alana@example.com",
    "firstName": "Alana",
    "lastName": "Johnson",
    "status": "ACTIVE"
  },
  "decision": "APPROVE",
  "remediationStatus": "SUCCESS",
  "note": {
    "id": "389dhie83",
    "note": "reason for approval"
  },
  "id": "icrtg6mwccZTRc6Ub8g5",
  "reviewerType": "USER",
  "created": "2019-08-24T14:15:22Z",
  "createdBy": "00ub0oNGTSWTBKOLGLNR",
  "lastUpdated": "2019-08-24T14:15:22Z",
  "lastUpdatedBy": "00ub0oNGTSWTBKOLGLNR",
  "_links": {
    "self": {
      "href": "https://myorg.okta.com/governance/api/v1/reviews/icrtg6mwccZTRc6Ub8g5"
    },
    "reassignReview": {
      "href": "https://myorg.okta.com/governance/api/v1/campaigns/icitdyhndQ6qstyvR8g5/reviews/reassign"
    }
  }
}
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
{
  "delegates": {
    "appointments": [
      {
        "id": "gda123ABCXYZ456DEF",
        "delegate": {
          "type": "OKTA_USER",
          "externalId": "00u2lxfQaw8WRlkQt0g4"
        },
        "note": "I am on PTO",
        "created": "2025-08-08T14:15:22Z",
        "createdBy": "00u2lxfQaw8WRlkQt0g4",
        "lastUpdated": "2025-08-28T14:15:22Z",
        "lastUpdatedBy": "00u2lxfQaw8WRlkQt0g4"
      }
    ]
  }
}
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
{
  "data": [
    {
      "id": "00u28w6vzKKultXP98g5",
      "email": "jessie.smith@example.com",
      "firstName": "Jessie",
      "lastName": "Smith"
    },
    {
      "id": "00u28w6vzKKultXP97g5",
      "email": "jacky.chan@example.com",
      "firstName": "Jacky",
      "lastName": "Chan"
    },
    {
      "id": "00u28w6vzKKultXP97g6",
      "email": "BruceLee@example.com",
      "firstName": "Bruce",
      "lastName": "Lee"
    }
  ],
  "_links": {
    "self": {
      "href": "https://myorg.okta.com/governance/api/v1/my/settings/delegates/users"
    }
  }
}
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
curl -v -X PATCH \
  'https://${yourOktaDomain}/governance/api/v1/my/settings' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {yourOktaAccessToken}' \
  -d '{
    "delegates": {
      "appointments": [
        {
          "delegate": {
            "type": "OKTA_USER",
            "externalId": "00ub0oNGTSWTBKOLGLNR"
          },
          "note": "I am on parental leave"
          "startTime": "2026-02-08T23:15:22Z",
          "endTime": "2027-02-08T00:00:00Z",
        }
      ]
    }
  }'
```

## Appointed delegate behavior

The following lists functional behavior after a delegate is appointed for governance tasks:

* New campaign review or access request tasks are automatically assigned to the delegate.
* Existing campaign review and access request tasks remain unchanged (users must reassign the reviews manually to their delegate).
* An email is sent to notify the delegates of their task assignment.
* Requesters can view the delegate assigned to their access request.
* Governance delegated tasks aren't automatically transitive.

  For example, if user A assigns user B as their delegate, and user B assigns user C as their delegate (A to B to C).  In this case, tasks assigned to user A aren't automatically assigned to user C. Governance tasks for user A are assigned to user B. Only an admin or the request assignee can reassign tasks to user C.
* Admins can monitor updates to user-delegate configurations with the `governance.principal.settings.update` System Log event.
