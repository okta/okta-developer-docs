---
title: Key Management
category: management
excerpt:
  The Key Management API provides a CRUD interface for registering key
  endpoints to use with Hooks.
---

# Key Management API
For information on how to create inline hooks, see [inline hooks](/docs/reference/api/inline-hooks/). The following documentation is only for the key management API which will be used in other parts of application such as inline hooks.

## Get started

Explore the key management API:[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/a36f6c129009072f78b5?action=collection%2Fimport)

## Key operations

### Create key

<ApiOperation method="post" url="/api/v1/hook-keys" />

To register a key you need to use [key request](#key-request-object) as JSON payload. This JSON object represents the required information about the key that you are registering.

> **Note:** The new key that you create will appear with the name that you choose here at the inline hook creation time .

The total number of keys that you can create in an Okta org is limited to 50.

##### Request parameters

| Parameter   | Description                                                                                  | Param Type   | DataType                                    | Required |
| ----------- | -------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------- | -------- |
| key | A valid request object that specifies the details of key that you are registering   | Body         | [key request](#key-request-object)  | TRUE     |

##### Response parameters

The response is an [key object](#key-object)  that represents the key that was registered. The `id` property returned in the response serves as the unique ID for the registered key, which you can specify when invoking other CRUD operations.
The keyId provided in the response is the alias of the public key that can be used to get details of public key in a seperate call.

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

### Get specific key

<ApiOperation method="get" url="/api/v1/hook-keys/${id}" />

##### Request parameters

| Parameter | Description               | Param Type   | DataType   | Required |
| --------- | ------------------------- | ------------ | ---------- | -------- |
| `id`      | A valid key ID   | Path         | String     | TRUE     |

> **Note:** The ?expand=publickey query parameter optionally returns the full object including the details of public key in the response body's _embedded property.

##### Response parameters

The response is an [key object](#key-object) that represents the registered key that matches the `id` you specify.

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

Returns a list of registered keys

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
### Get public key

<ApiOperation method="get" url="/api/v1/hook-keys/${keyId}" />

##### Request parameters

| Parameter | Description               | Param Type   | DataType   | Required |
| --------- | ------------------------- | ------------ | ---------- | -------- |
| `KeyId`      | A valid key ID   | Path         | String     | TRUE     |

> **Note:** KeyId is the alias of the public key that has been provided at the creation time of the key.

##### Response parameters

The response represents the registered key that matches the `KeyId` you specify.

##### Request example


```bash
curl -v -X GET \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/hook-keys/${KeyId}"
```

##### Response example
The details of response can be found [public Key details](#public-key-details) .

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

### Update key

<ApiOperation method="put" url="/api/v1/hook-keys/${id}" />

##### Request parameters

| Parameter  | Description                                                                     | Param Type   | DataType                                    | Required |
| ---------- | ------------------------------------------------------------------------------- | ------------ | ------------------------------------------- | -------- |
| id         | The ID of the key that you want to update                                   | Path         | String                                      | TRUE     |
| key request | An `request` object that represents the updated properties that you want to apply   | Body         |[key request](#key-request-object)  | TRUE     |

The submitted key request replace the existing properties after passing validation.

> **Note:** The only  parameter that can be updated is the name of the key which needs to be unique at all time.

##### Response parameters

The response is an [key object](#key-object) that represents the updated key.

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

### Delete key

<ApiOperation method="delete" url="/api/v1/hook-keys/${id}" />

##### Request parameters

| Parameter | Description                            | Param Type   | DataType   | Required |
| --------- | -------------------------------------- | ------------ | ---------- | -------- |
| `id`      | The ID of the key to delete   | Path         | String     | TRUE     |

Deletes the key that matches the provided `id`. After it is deleted, the key is unrecoverable. As a safety precaution, only keys that are not being used in the system eligible for deletion.

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


### Key request object

| Property       | Description                                                                                         | DataType                            | Nullable   | Unique   | ReadOnly   | Validation                                        |
| -------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------- | -------- | ---------- | ------------------------------------------------- |
| name           | Display name for the key                                                                | String                              | FALSE      | TRUE     | FALSE      | Must be between 1 and 255 characters in length   |



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
| name           | Display name for the key                                                                   | String                              | FALSE      | TRUE     | FALSE      | Must be between 1 and 255 characters in length   |
| isUsed           | Declares if this item is currently is used by other applications.   | String(Boolean)                      | FALSE      | FALSE    | TRUE       | System assigned             |
| created        | Date of key creation                                                                       | String (Date)                       | TRUE       | FALSE    | TRUE       | System assigned                                          |
| lastUpdated    | Date of key update                                                                         | String (Date)                       | TRUE       | FALSE    | TRUE       | System assigned                                          |
```json
{
  "id": "HKY1p7jWLndGQV9M60g4",
  "keyId": "7fbc27fd-e3df-4522-86bf-1930110256ad",
  "name": "My new key",
  "created": "2022-08-31T18:09:58.000Z",
  "lastUpdated": "2022-08-31T18:09:58.000Z",
  "isUsed": false
}
```
> **Note:** The response body's _embedded property will provide details of public key.


### Public key details

| Property       | Description                                                                                         | DataType                            | Nullable   | Unique   | ReadOnly   | Validation                                        |
| -------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------- | -------- | ---------- | ------------------------------------------------- |
 kty            | cryptographic algorithm family for the certificate's keypair                                                                  | String                              | FALSE      | FALSE     | TRUE       | System assigned                                          |
| alg         | Algorithm used in the key                                      | String                              | FALSE      | FALSE    | TRUE      | System assigned            |
| kid           | unique identifier for the certificate                                                                   | String                              | FALSE      | TRUE     | TRUE      | System assigned    |
| use           |acceptable usage of the certificate  | String                     | TRUE      | FALSE    | TRUE       | System assigned             |
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
