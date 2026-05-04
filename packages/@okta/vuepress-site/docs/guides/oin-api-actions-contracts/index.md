---
title: API Integration Actions schema contracts
meta:
  - name: description
    content: Provides references to API Integration Actions schema contracts inorder to create flows for API actions.
---

This reference provides the API Integration Actions schema contracts supported in the Integration Builder. Use them to create API action flows to your APIs.

## Universal Logout

The following are schema contracts for Universal Logout action.

### Proprietary Universal Logout

The following are input (requests) and outputs (responses) for the **Proprietary Universal Logout** action.

#### Input

| Field | Definition | Type | Required |
| ----- | ----- | ----- | ----- |
| externalUserId | The external user ID | string |  |
| externalUserName | The external username | string |  |
| oktaUserId | The Okta user ID | string |  |

#### Output

| Fields | Definition | Type |
| ----- | ----- | ----- |
| executionStatus | Object that indicates whether the logout request execution succeeded or failed, and may include error details. Object properties include:<br> <ul> <li>`status`: reports `SUCCEEDED` or `FAILED`</li><li>`errors`: contains any returned error objects with details such as code, summary, HTTP status, request ID, and error type. </li></ul> | object |
| logoutStatus | Final logout outcome returned by the action (`SUCCESS` or `FAILURE`) | string |

## Provisioning action contracts

The following are the schema contracts for each provisioning action (includes Entitlement Management actions).

