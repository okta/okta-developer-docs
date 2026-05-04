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

The following are input (requests) and outputs (responses) for the **Provisioning action contracts** action. These also include Entitlement Management action contracts.

### Provisioning Create User

This action schema contract is for provisioning user actions.

### Provisioning Update User

This action schema contract is for provisioning user actions.

### Provisioning Update User Password

This action schema contract is for provisioning user actions.

### Provisioning Activate User

This action schema contract is for provisioning user actions.


### Provisioning Deactivate User

This action schema contract is for provisioning user actions.

### Provisioning Get User by ID

This action schema contract is for provisioning user actions.


### Provisioning Get User by UserName

This action schema contract is for provisioning user actions.

### Provisioning List Users

This action schema contract is for provisioning user actions.

### Provisioning Create Group

This action schema contract is for provisioning group actions.

### Provisioning Update Group

This action schema contract is for provisioning group actions.

### Provisioning Remove Group

This action schema contract is for provisioning group actions.


### Provisioning Add Group Members

This action schema contract is for provisioning group actions.

### Provisioning Remove Group Members

This action schema contract is for provisioning group actions.

### Provisioning List Group Members

This action schema contract is for provisioning group actions.

### Provisioning Get Group by ID

This action schema contract is for provisioning group actions.

### Provisioning List Groups

This action schema contract is for provisioning group actions.

### Provisioning List Groups by Display Name

This action schema contract is for provisioning group actions.

### Provisioning List User Schema

This action schema contract is for provisioning Entitlement Management actions.

### Provisioning List Entitlement Schema

This action schema contract is for provisioning Entitlement Management actions.


### Provisioning List User Schema Property Values

This action schema contract is for provisioning Entitlement Management actions.


### Provisioning List Entitlement Schema Property Values

This action schema contract is for provisioning Entitlement Management actions.

