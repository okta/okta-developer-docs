---
title: Key Management
category: management
excerpt:
  The Key Management API provides a CRUD interface for registering key
  endpoints to use with Hooks.
---

# Key Management API

The Okta Key Management API provides a CRUD interface for JSON Web Keys (JWK) used with other parts of the application, such as inline hooks. For information on how to create inline hooks, see [Inline hooks management API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook).

<ApiAuthMethodWarning />

## Get started

Explore the Key Management API:[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/a36f6c129009072f78b5)

## Key Management operations

The Key Management API has the following CRUD operations:

* [Create a key](#create-a-key)
* [Get a key](#get-a-key)
* [List keys](#list-keys)
* [Get a public key](#get-a-public-key)
* [Update a key](#update-a-key)
* [Delete a key](#delete-a-key)

### Create a key

<ApiOperation method="post" url="/api/v1/hook-keys" />

To create a key, use the [key request object](#key-request-object) as the JSON payload. This JSON object represents the required information about the key that you are creating.

> **Note:** The new key that you create is accessed by the key name for use with inline hooks.

The total number of keys that you can create in an Okta org is limited to 50.

##### Request parameters

| Parameter   | Description                                                                                  | Param Type   | DataType                                    | Required |
| ----------- | -------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------- | -------- |
| key | A valid request object that specifies the details of the key that you create   | Body         | [key request object](#key-request-object)  | TRUE     |

##### Response parameters

The response is a [Key object](#key-object) that represents the key that you create. The `id` property in the response serves as the unique ID for the key, which you can specify when invoking other CRUD operations.
The `keyId` provided in the response is the alias of the public key that you can use to get details of the public key data in a separate call.

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "name" : "Test Name",
}' "https://${yourOktaDomain}/api/v1/hook-keys"
```

##### Response example

```json
{
  "id": "HKY1p7jWLndGQV9M60g4",
  "keyId": "7fbc27fd-e3df-4522-86bf-1930110256ad",
  "name": "My new key",
  "created": "2022-08-31T18:09:58.000Z",
  "lastUpdated": "2022-08-31T18:09:58.000Z",
  "isUsed": false,
  "_embedded": {
    "kty": "RSA",
    "alg": "RSA",
    "kid": "7fbc27fd-e3df-4522-86bf-1930110256ad",
    "use": null,
    "e": "AQAB",
    "n": "2naqCnv6r4xNQs7207lRtKQvdtnlVND-8k5iYBIiqoKGY3CqUmRm1jleoOniiQoMkFX8Wj2DmVqr002efF3vOQ7_gjtTatBTVUNbNIQLybun4dkVoUtfP7pRc5SLpcP3eGPRVar734ZrpQXzmCEdpqBt3jrVjwYjNE5DqOjbYXFJtMsy8CWE9LRJ3kyHEoHPzo22dG_vMrXH0_sAQoCk_4TgNCbvyzVmGVYXI_BkUnp0hv2pR4bQVRYzGB9dKJdctOh8zULqc_EJ8tiYsS05YnF7whrWEyARK0rH-e4d4W-OmBTga_zhY4kJ4NsoQ4PyvcatZkxjPO92QHQOFDnf3w"
  }
}
```

> **Note:** The `keyId` is the alias of the public key that you can use to retrieve the public key.

### Get a key

<ApiOperation method="get" url="/api/v1/hook-keys/${id}" />

##### Request parameters

| Parameter | Description               | Param Type   | DataType   | Required |
| --------- | ------------------------- | ------------ | ---------- | -------- |
| `id`      | A valid key ID   | Path         | String     | TRUE     |

> **Note:** The `?expand=publickey` query parameter optionally returns the full object including the details of the public key in the response body's `_embedded` property.

##### Response parameters

The response is a [Key object](#key-object) that represents the key that matches the `id` that you specify.

##### Request example

```bash
curl -v -X GET \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/hook-keys/${id}"
```

##### Response example

```json
{
  "id": "HKY1p7jWLndGQV9M60g4",
  "keyId": "7fbc27fd-e3df-4522-86bf-1930110256ad",
  "name": "My new key",
  "created": "2022-08-31T18:09:58.000Z",
  "lastUpdated": "2022-08-31T18:09:58.000Z",
  "isUsed": false,
  "_embedded": {
    "kty": "RSA",
    "alg": "RSA",
    "kid": "7fbc27fd-e3df-4522-86bf-1930110256ad",
    "use": null,
    "e": "AQAB",
    "n": "2naqCnv6r4xNQs7207lRtKQvdtnlVND-8k5iYBIiqoKGY3CqUmRm1jleoOniiQoMkFX8Wj2DmVqr002efF3vOQ7_gjtTatBTVUNbNIQLybun4dkVoUtfP7pRc5SLpcP3eGPRVar734ZrpQXzmCEdpqBt3jrVjwYjNE5DqOjbYXFJtMsy8CWE9LRJ3kyHEoHPzo22dG_vMrXH0_sAQoCk_4TgNCbvyzVmGVYXI_BkUnp0hv2pR4bQVRYzGB9dKJdctOh8zULqc_EJ8tiYsS05YnF7whrWEyARK0rH-e4d4W-OmBTga_zhY4kJ4NsoQ4PyvcatZkxjPO92QHQOFDnf3w"
  }
}
```

### List keys

<ApiOperation method="get" url="/api/v1/hook-keys" />

Lists all keys

##### Request examples

```bash
curl -v -X GET \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/hook-keys"
```

##### Response example

```json
[{
  "id": "HKY1i2htmXF5UNQhL0g4",
  "keyId": "bb5bed7d-6e4d-488f-9c86-59b93a2bb3fb",
  "name": "My new key",
  "created": "2022-08-22T16:34:33.000Z",
  "lastUpdated": "2022-08-22T16:34:33.000Z",
  "isUsed": true
}, {
  "id": "HKY1p7jWLndGQV9M60g4",
  "keyId": "7fbc27fd-e3df-4522-86bf-1930110256ad",
  "name": "Test Key",
  "created": "2022-08-31T18:09:58.000Z",
  "lastUpdated": "2022-08-31T18:09:58.000Z",
  "isUsed": false
}]
```

### Get a public key

<ApiOperation method="get" url="/api/v1/hook-keys/${keyId}" />

Retrieves the public portion of the Key object using the `keyId` parameter

##### Request parameters

| Parameter | Description               | Param Type   | DataType   | Required |
| --------- | ------------------------- | ------------ | ---------- | -------- |
| `keyId`      | A valid key ID   | Path         | String     | TRUE     |

> **Note:** `keyId` is the alias of the public key.

##### Response parameters

The response represents the key that matches the `keyId` that you specify.

##### Request example

```bash
curl -v -X GET \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/hook-keys/${KeyId}"
```

##### Response example

You can find the details of the response in [public key details](#public-key-details).

```json
{
  "kty": "RSA",
  "alg": "RSA",
  "kid": "bb5bed7d-6e4d-488f-9c86-59b93a2bb3fb",
  "use": null,
  "e": "AQAB",
  "n": "togCavBd7yQ7fuTEdvRURfK04LSgxqbKlptc7Gy9l6Swk2nhJbfIuB2Eezrn_JX-Azh-8usMMKau8vkq6AR2pW5mgDNIJG0OnCdwK24BdohxWlVQRZ5fD5DYg-noWwIbDjCGxMq3BKhOJP8cGAXx-olfrkC2NRy-HiJZOPiONII_GnlBiVS29BmULbbhKNeSGtoe90tR_OsXozfBsRRKFnF4ewQG3QwE23q6W3uNsUTr87fD9OO0FxNXyjnR3UrMTq36W6QLhqgLxlSiqxXGALnhK5z7WfXxyGfYrytrg2tFIhiHi0hT300xRI4A6SqhPFSCegx_O8iZQlTeaiHgjQ"
}
```

### Update a key

<ApiOperation method="put" url="/api/v1/hook-keys/${id}" />

##### Request parameters

| Parameter  | Description                                                                     | Param Type   | DataType                                    | Required |
| ---------- | ------------------------------------------------------------------------------- | ------------ | ------------------------------------------- | -------- |
| id         | The ID of the key that you want to update                                   | Path         | String                                      | TRUE     |
| key request | An object that represents the updated properties that you want to apply   | Body         |[key request object](#key-request-object)  | TRUE     |

The submitted key request replaces the existing properties after passing validation.

> **Note:** The only parameter that you can update is the name of the key, which needs to be unique at all times.

##### Response parameters

The response is a [Key object](#key-object) that represents the updated key.

##### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "name" : "Test key"
}' "https://${yourOktaDomain}/api/v1/hook-keys/${id}"
```

##### Response example

```json
{
  "id": "HKY1p7jWLndGQV9M60g4",
  "keyId": "7fbc27fd-e3df-4522-86bf-1930110256ad",
  "name": "My updated new key",
  "created": "2022-08-31T18:09:58.000Z",
  "lastUpdated": "2022-08-31T18:16:59.000Z",
  "isUsed": false,
  "_embedded": {
    "kty": "RSA",
    "alg": "RSA",
    "kid": "7fbc27fd-e3df-4522-86bf-1930110256ad",
    "use": null,
    "e": "AQAB",
    "n": "2naqCnv6r4xNQs7207lRtKQvdtnlVND-8k5iYBIiqoKGY3CqUmRm1jleoOniiQoMkFX8Wj2DmVqr002efF3vOQ7_gjtTatBTVUNbNIQLybun4dkVoUtfP7pRc5SLpcP3eGPRVar734ZrpQXzmCEdpqBt3jrVjwYjNE5DqOjbYXFJtMsy8CWE9LRJ3kyHEoHPzo22dG_vMrXH0_sAQoCk_4TgNCbvyzVmGVYXI_BkUnp0hv2pR4bQVRYzGB9dKJdctOh8zULqc_EJ8tiYsS05YnF7whrWEyARK0rH-e4d4W-OmBTga_zhY4kJ4NsoQ4PyvcatZkxjPO92QHQOFDnf3w"
  }
}
```

### Delete a key

<ApiOperation method="delete" url="/api/v1/hook-keys/${id}" />

##### Request parameters

| Parameter | Description                            | Param Type   | DataType   | Required |
| --------- | -------------------------------------- | ------------ | ---------- | -------- |
| `id`      | The ID of the key to delete   | Path         | String     | TRUE     |

Deletes the key that matches the provided `id`. After it's deleted, the key is unrecoverable. As a safety precaution, only keys that aren't being used are eligible for deletion.

##### Response parameters

All responses return a 204 status with no content.

##### Request example

```bash
curl -v -X DELETE \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/hook-keys/${id}"
```

##### Response example

204 with no content

## Key Management objects

The Key Management API has the following objects:

* [Key Request object](/#key-request-object)
* [Key object](#key-object)
* [Public key details](#public-key-details)

### Key Request object

| Property       | Description                                                                                         | DataType                            | Nullable   | Unique   | ReadOnly   | Validation                                        |
| -------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------- | -------- | ---------- | ------------------------------------------------- |
| name           | Display name for the key                                                                | String                              | FALSE      | TRUE     | FALSE      | Must be between one and 255 characters in length   |


```json
{
    "name" : "My new key"
}
```

### Key object

| Property       | Description                                                                                         | DataType                            | Nullable   | Unique   | ReadOnly   | Validation                                        |
| -------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------- | -------- | ---------- | ------------------------------------------------- |
| id             | Unique key                                                                  | String                              | FALSE      | TRUE     | TRUE       | System assigned                                          |
| keyId         | Alias of the public key                                      | String                              | FALSE      | TRUE    | TRUE      | System assigned            |
| name           | Display name for the key                                                                   | String                              | FALSE      | TRUE     | FALSE      | Must be between one and 255 characters in length   |
| isUsed           | Declares if this item is currently in use by other applications   | String(Boolean)                      | FALSE      | FALSE    | TRUE       | System assigned             |
| created        | Date of key creation                                                                       | String (Date)                       | TRUE       | FALSE    | TRUE       | System assigned                                          |
| lastUpdated    | Date of key update                                                                         | String (Date)                       | TRUE       | FALSE    | TRUE       | System assigned                                          |
| \_embedded    | [Public Key Details](#public-key-details)                                                                         | JSON                     | FALSE     | TRUE   | TRUE      | System assigned                                        |

```json
{
  "id": "HKY1p7jWLndGQV9M60g4",
  "keyId": "7fbc27fd-e3df-4522-86bf-1930110256ad",
  "name": "My new key",
  "created": "2022-08-31T18:09:58.000Z",
  "lastUpdated": "2022-08-31T18:09:58.000Z",
  "isUsed": false,
  "_embedded": {
    "kty": "RSA",
    "alg": "RSA",
    "kid": "7fbc27fd-e3df-4522-86bf-1930110256ad",
    "use": null,
    "e": "AQAB",
    "n": "2naqCnv6r4xNQs7207lRtKQvdtnlVND-8k5iYBIiqoKGY3CqUmRm1jleoOniiQoMkFX8Wj2DmVqr002efF3vOQ7_gjtTatBTVUNbNIQLybun4dkVoUtfP7pRc5SLpcP3eGPRVar734ZrpQXzmCEdpqBt3jrVjwYjNE5DqOjbYXFJtMsy8CWE9LRJ3kyHEoHPzo22dG_vMrXH0_sAQoCk_4TgNCbvyzVmGVYXI_BkUnp0hv2pR4bQVRYzGB9dKJdctOh8zULqc_EJ8tiYsS05YnF7whrWEyARK0rH-e4d4W-OmBTga_zhY4kJ4NsoQ4PyvcatZkxjPO92QHQOFDnf3w"
  }
}
```

### Public Key Details

The Public Key Details are defined in the `_embedded` property of the Key object.

| Property       | Description                                                                                         | DataType                            | Nullable   | Unique   | ReadOnly   | Validation                                        |
| -------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------- | -------- | ---------- | ------------------------------------------------- |
 kty            | Cryptographic algorithm family for the certificate's keypair                                                                  | String                              | FALSE      | FALSE     | TRUE       | System assigned                                          |
| alg         | Algorithm used in the key                                      | String                              | FALSE      | FALSE    | TRUE      | System assigned            |
| kid           | Unique identifier for the certificate                                                                   | String                              | FALSE      | TRUE     | TRUE      | System assigned    |
| use           |Acceptable use of the certificate  | String                     | TRUE      | FALSE    | TRUE       | System assigned             |
| e        | RSA key value (exponent) for key binding                                                                       | String                        | FALSE       | FALSE    | TRUE       | System assigned                                          |
| n    | RSA key value (modulus) for key binding                                                                        | String                       | FALSE       | FALSE    | TRUE       | System assigned                                          |

```json
{
  "_embedded": {
    "kty": "RSA",
    "alg": "RSA",
    "kid": "7fbc27fd-e3df-4522-86bf-1930110256ad",
    "use": null,
    "e": "AQAB",
    "n": "2naqCnv6r4xNQs7207lRtKQvdtnlVND-8k5iYBIiqoKGY3CqUmRm1jleoOniiQoMkFX8Wj2DmVqr002efF3vOQ7_gjtTatBTVUNbNIQLybun4dkVoUtfP7pRc5SLpcP3eGPRVar734ZrpQXzmCEdpqBt3jrVjwYjNE5DqOjbYXFJtMsy8CWE9LRJ3kyHEoHPzo22dG_vMrXH0_sAQoCk_4TgNCbvyzVmGVYXI_BkUnp0hv2pR4bQVRYzGB9dKJdctOh8zULqc_EJ8tiYsS05YnF7whrWEyARK0rH-e4d4W-OmBTga_zhY4kJ4NsoQ4PyvcatZkxjPO92QHQOFDnf3w"
  }
}
```
